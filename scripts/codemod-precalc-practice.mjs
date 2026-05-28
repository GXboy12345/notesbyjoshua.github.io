#!/usr/bin/env node
/**
 * Convert legacy AP Precalc practice items to remark-directive FRQ blocks.
 *
 * Usage:
 *   node scripts/codemod-precalc-practice.mjs [--dry-run] [--write] [--limit N] [--only <basename.md>]
 *
 * Default (no flags): dry-run—print files that would change.
 * --dry-run: same as default.
 * --write: apply replacements in place.
 * --limit N: convert at most N practice items per file (default: 3, pilot scope).
 * --only: process a single file under Notes/APs/AP Precalc/ (e.g. functions.md).
 *
 * Scope: Notes/APs/AP Precalc/*.md
 *
 * Transforms ## Practice numbered items from:
 *   1. question stem...
 *   2. another question...
 * To (first --limit items only):
 *   :::practice
 *   :::frq{id=precalc-{file}-{n}}
 *   1. question stem...
 *   :::solution
 *   (body from ## Solutions / ### Solution N inside :::theorem or legacy theorem-box)
 *   :::
 *   :::
 *   :::
 *
 * Remaining numbered items stay in legacy form until a later pass raises --limit.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join, relative } from 'node:path';

const ROOT = process.cwd();
const PRECALC_DIR = join(ROOT, 'Notes', 'APs', 'AP Precalc');

const SOLUTION_THEOREM =
  /:::theorem\s*\n### Solution (\d+)\s*\n([\s\S]*?):::/g;
const SOLUTION_THEOREM_BOX =
  /<div class="theorem-box" markdown="1">\s*\n### Solution (\d+)\s*\n([\s\S]*?)<\/div>/g;
const QUESTION_START = /^(\d+)\.\s*(.*)$/;
const FRQ_BLOCK =
  /:::frq\{[^}]*\}\s*\n([\s\S]*?)\n:::\s*\n:::/g;

function parseArgs(argv) {
  const write = argv.includes('--write');
  const dryRun = argv.includes('--dry-run') || !write;
  if (write && argv.includes('--dry-run')) {
    console.error('Use either --dry-run or --write, not both.');
    process.exit(1);
  }

  const onlyIdx = argv.indexOf('--only');
  const only =
    onlyIdx !== -1 && argv[onlyIdx + 1] ? argv[onlyIdx + 1] : null;
  if (onlyIdx !== -1 && !only) {
    console.error('--only requires a filename (e.g. functions.md).');
    process.exit(1);
  }

  const limitIdx = argv.indexOf('--limit');
  let limit = 3;
  if (limitIdx !== -1) {
    const raw = argv[limitIdx + 1];
    if (!raw || Number.isNaN(Number(raw)) || Number(raw) < 1) {
      console.error('--limit requires a positive integer (default: 3).');
      process.exit(1);
    }
    limit = Number(raw);
  }

  return { write, dryRun, only, limit };
}

function listPrecalcFiles(only) {
  if (only) {
    const name = only.endsWith('.md') ? only : `${only}.md`;
    return [join(PRECALC_DIR, name)];
  }
  return readdirSync(PRECALC_DIR)
    .filter((n) => n.endsWith('.md'))
    .map((n) => join(PRECALC_DIR, n));
}

/** @returns {Map<number, string>} */
function parseSolutions(src) {
  const solutionsIdx = src.indexOf('\n## Solutions');
  if (solutionsIdx === -1) return new Map();

  const tail = src.slice(solutionsIdx);
  /** @type {Map<number, string>} */
  const map = new Map();

  for (const re of [SOLUTION_THEOREM, SOLUTION_THEOREM_BOX]) {
    for (const m of tail.matchAll(re)) {
      const num = Number(m[1]);
      if (map.has(num)) continue;
      const body = m[2].replace(/^\n+|\n+$/g, '');
      map.set(num, body);
    }
  }

  return map;
}

/**
 * @param {string} block—text after "## Practice\n"
 * @returns {{ num: number, stem: string, raw?: string }[]}
 */
function parsePracticeSection(block) {
  /** @type {{ num: number, stem: string, raw?: string }[]} */
  const items = [];

  let text = block.replace(/^\s*:::practice\s*\n/, '').replace(/\n:::\s*$/, '');
  text = text.replace(/\n---\s*$/, '');

  let lastEnd = 0;
  for (const m of text.matchAll(FRQ_BLOCK)) {
    const before = text.slice(lastEnd, m.index);
    if (before.trim()) items.push(...parseLegacyBlock(before));

    const inner = m[1].trimEnd();
    const numMatch = inner.match(/^(\d+)\./);
    const num = numMatch ? Number(numMatch[1]) : items.length + 1;
    items.push({
      num,
      stem: inner,
      raw: m[0],
    });
    lastEnd = (m.index ?? 0) + m[0].length;
  }

  const rest = text.slice(lastEnd);
  if (rest.trim()) items.push(...parseLegacyBlock(rest));

  return items;
}

/** @returns {{ num: number, stem: string }[]} */
function parseLegacyBlock(text) {
  /** @type {{ num: number, stem: string }[]} */
  const items = [];
  const lines = text.split('\n');

  /** @type {{ num: number, stemLines: string[] } | null} */
  let cur = null;

  const flush = () => {
    if (!cur) return;
    items.push({
      num: cur.num,
      stem: cur.stemLines.join('\n').trimEnd(),
    });
    cur = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (
      trimmed === '' ||
      trimmed === ':::practice' ||
      trimmed === ':::' ||
      trimmed === '---'
    ) {
      continue;
    }

    const qm = QUESTION_START.exec(line);
    if (qm && !line.startsWith(' ') && !line.startsWith('\t')) {
      flush();
      cur = {
        num: Number(qm[1]),
        stemLines: [qm[2] ? `${qm[1]}. ${qm[2]}` : `${qm[1]}.`],
      };
      continue;
    }

    if (cur) {
      cur.stemLines.push(line);
    }
  }

  flush();
  return items;
}

function formatFrq(slug, num, stem, solutionBody) {
  const id = `precalc-${slug}-${num}`;
  return [`:::frq{id=${id}}`, stem, '', ':::solution', solutionBody, ':::'].join('\n');
}

function rebuildFrqFromParsed(item, slug, solutions) {
  if (item.raw) {
    const sol = solutions.get(item.num);
    if (item.raw.includes(':::solution')) {
      return item.raw.replace(
        /^:::frq\{[^}]*\}/,
        `:::frq{id=precalc-${slug}-${item.num}}`,
      );
    }
    if (!sol) {
      throw new Error(`missing solution for question ${item.num}`);
    }
    return formatFrq(slug, item.num, item.stem, sol);
  }

  const sol = solutions.get(item.num);
  if (!sol) {
    throw new Error(`missing solution for question ${item.num}`);
  }
  return formatFrq(slug, item.num, item.stem, sol);
}

function transformSource(src, fileSlug, limit) {
  const practiceIdx = src.indexOf('\n## Practice');
  if (practiceIdx === -1) return { next: src, count: 0 };

  const solutionsIdx = src.indexOf('\n## Solutions', practiceIdx + 1);
  if (solutionsIdx === -1) return { next: src, count: 0 };

  const blockStart = practiceIdx + '\n## Practice'.length + 1;
  const blockEnd = solutionsIdx;
  const practiceBody = src.slice(blockStart, blockEnd);

  const hasLegacy = /^\d+\.\s/m.test(
    practiceBody.replace(FRQ_BLOCK, '').replace(/^\s*:::practice\s*\n/, ''),
  );
  const hasFrq = practiceBody.includes(':::frq');
  if (!hasLegacy && !hasFrq) return { next: src, count: 0 };

  const solutions = parseSolutions(src);
  const items = parsePracticeSection(practiceBody);
  if (items.length === 0) return { next: src, count: 0 };

  const converted = [];
  /** @type {{ num: number, stem: string }[]} */
  const legacy = [];
  let newlyConverted = 0;

  for (const item of items) {
    const isLegacy = !item.raw;

    if (isLegacy && newlyConverted >= limit) {
      legacy.push({ num: item.num, stem: item.stem });
      continue;
    }

    try {
      converted.push(rebuildFrqFromParsed(item, fileSlug, solutions));
      if (isLegacy) newlyConverted += 1;
    } catch (err) {
      throw new Error(`Q${item.num}: ${err.message}`);
    }
  }

  if (newlyConverted === 0) {
    return { next: src, count: 0 };
  }

  const parts = ['## Practice', ''];
  if (converted.length > 0) {
    parts.push(':::practice', converted.join('\n\n'), '');
  }
  if (legacy.length > 0) {
    parts.push(legacy.map((i) => i.stem).join('\n'), '');
  }

  const newPracticeBlock = parts.join('\n').replace(/\n+$/, '\n\n');
  const next =
    src.slice(0, practiceIdx + 1) + newPracticeBlock + src.slice(blockEnd + 1);

  if (next === src) return { next: src, count: 0 };

  return { next, count: newlyConverted };
}

function main() {
  const { write, dryRun, only, limit } = parseArgs(process.argv.slice(2));
  const files = listPrecalcFiles(only);

  let filesTouched = 0;
  let itemsConverted = 0;

  for (const abs of files) {
    const rel = relative(ROOT, abs);
    const slug = basename(abs, '.md');
    const src = readFileSync(abs, 'utf8');

    let next;
    let count;
    try {
      ({ next, count } = transformSource(src, slug, limit));
    } catch (err) {
      console.error(`${rel}: ${err.message}`);
      continue;
    }

    if (count === 0 && next === src) continue;

    filesTouched += 1;
    itemsConverted += count;
    console.log(
      `${dryRun ? '[dry-run] ' : ''}${rel}: ${count} practice item(s)`,
    );

    if (write) writeFileSync(abs, next, 'utf8');
  }

  console.log(
    `\n${dryRun ? 'Would update' : 'Updated'} ${filesTouched} file(s), ${itemsConverted} practice item(s) (limit ${limit}/file).`,
  );

  if (dryRun && filesTouched > 0) {
    console.log('Re-run with --write to apply.');
  }
}

main();
