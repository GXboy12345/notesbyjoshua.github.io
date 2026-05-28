#!/usr/bin/env node
/**
 * Convert legacy AP Chem practice MCQs to remark-directive blocks.
 *
 * Usage:
 *   node scripts/codemod-chem-mcq.mjs [--dry-run] [--write] [--only <basename.md>]
 *
 * Default (no flags): dry-run—print files that would change.
 * --dry-run: same as default.
 * --write: apply replacements in place.
 * --only: process a single file under Notes/APs/AP Chem/ (e.g. kinetics.md).
 *
 * Scope: Notes/APs/AP Chem/*.md except cheatsheet.md
 *
 * Transforms Practice ### MCQ sections from:
 *   1. question...
 *      (A) choice<br>
 *   ...
 * To:
 *   :::practice
 *   :::mcq{id=chem-{file}-{n} correct=X}
 *   question...
 *   - [ ] choice
 *   :::solution
 *   (body from ## Solutions / ### MCQ / ### Solution N)
 *   :::
 *   :::
 *   :::
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, join, relative } from 'node:path';

const ROOT = process.cwd();
const CHEM_DIR = join(ROOT, 'Notes', 'APs', 'AP Chem');
const SKIP_FILES = new Set(['cheatsheet.md']);

const SOLUTION_THEOREM =
  /:::theorem\s*\n### Solution (\d+)\s*\n([\s\S]*?):::/g;
const BOXED_ANSWER = /\\boxed\{\\text\{([A-D])\}\}/g;
const CHOICE_LINE = /^\s+\(([A-D])\)\s+(.+)$/;
const QUESTION_START = /^(\d+)\.\s*(.*)$/;
const MCQ_BLOCK =
  /:::mcq\{[^}]*\}\s*\n([\s\S]*?)\n:::\s*\n:::/g;

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
    console.error('--only requires a filename (e.g. kinetics.md).');
    process.exit(1);
  }
  return { write, dryRun, only };
}

function listChemFiles(only) {
  if (only) {
    const name = only.endsWith('.md') ? only : `${only}.md`;
    if (SKIP_FILES.has(name)) return [];
    return [join(CHEM_DIR, name)];
  }
  return readdirSync(CHEM_DIR)
    .filter((n) => n.endsWith('.md') && !SKIP_FILES.has(n))
    .map((n) => join(CHEM_DIR, n));
}

/** @returns {Map<number, { correct: string, body: string }>} */
function parseSolutions(src) {
  const solutionsIdx = src.indexOf('\n## Solutions');
  if (solutionsIdx === -1) return new Map();

  const tail = src.slice(solutionsIdx);
  const mcqIdx = tail.indexOf('\n### MCQ');
  if (mcqIdx === -1) return new Map();

  const frqIdx = tail.indexOf('\n### FRQ', mcqIdx + 1);
  const mcqBlock =
    frqIdx === -1 ? tail.slice(mcqIdx) : tail.slice(mcqIdx, frqIdx);

  /** @type {Map<number, { correct: string, body: string }>} */
  const map = new Map();

  for (const m of mcqBlock.matchAll(SOLUTION_THEOREM)) {
    const num = Number(m[1]);
    const body = m[2].replace(/^\n+|\n+$/g, '');
    let correct = '';
    const boxed = [...body.matchAll(BOXED_ANSWER)];
    if (boxed.length > 0) {
      correct = boxed[boxed.length - 1][1];
    }
    map.set(num, { correct, body });
  }

  return map;
}

function stripChoiceSuffix(text) {
  return text.replace(/<br\s*\/?>\s*$/i, '').trimEnd();
}

/**
 * @param {string} block—text after "### MCQ\n"
 * @returns {{ num: number, stem: string, choices: string[], raw?: string }[]}
 */
function parseMcqSection(block) {
  /** @type {{ num: number, stem: string, choices: string[], raw?: string }[]} */
  const items = [];

  // Unwrap lone :::practice ... ::: wrapper for parsing
  let text = block.replace(/^\s*:::practice\s*\n/, '').replace(/\n:::\s*$/, '');

  // Already-converted :::mcq blocks
  let lastEnd = 0;
  for (const m of text.matchAll(MCQ_BLOCK)) {
    const before = text.slice(lastEnd, m.index);
    if (before.trim()) items.push(...parseLegacyBlock(before));

    const inner = m[1].trimEnd();
    const numMatch = inner.match(/^(\d+)\./);
    const num = numMatch ? Number(numMatch[1]) : items.length + 1;
    items.push({
      num,
      stem: inner,
      choices: [],
      raw: `:::mcq{id=legacy correct=A}\n${inner}\n:::\n:::`,
    });
    lastEnd = (m.index ?? 0) + m[0].length;
  }

  const rest = text.slice(lastEnd);
  if (rest.trim()) items.push(...parseLegacyBlock(rest));

  return items;
}

/** @returns {{ num: number, stem: string, choices: string[] }[]} */
function parseLegacyBlock(text) {
  /** @type {{ num: number, stem: string, choices: string[] }[]} */
  const items = [];
  const lines = text.split('\n');

  /** @type {{ num: number, stemLines: string[], choices: string[] } | null} */
  let cur = null;

  const flush = () => {
    if (!cur) return;
    items.push({
      num: cur.num,
      stem: cur.stemLines.join('\n').trimEnd(),
      choices: cur.choices,
    });
    cur = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '' || trimmed === ':::practice' || trimmed === ':::') {
      if (cur && cur.stemLines.length > 0 && cur.choices.length > 0) flush();
      continue;
    }

    const qm = QUESTION_START.exec(line);
    if (qm && !line.startsWith('   ')) {
      flush();
      cur = {
        num: Number(qm[1]),
        stemLines: [qm[2] ? `${qm[1]}. ${qm[2]}` : `${qm[1]}.`],
        choices: [],
      };
      continue;
    }

    const cm = CHOICE_LINE.exec(line);
    if (cm && cur) {
      cur.choices.push(stripChoiceSuffix(cm[2]));
      continue;
    }

    if (cur) {
      if (cur.choices.length === 0) {
        cur.stemLines.push(line);
      } else {
        // Continuation after choices is unexpected; start new block guard
        flush();
      }
    }
  }

  flush();
  return items;
}

function formatMcq(slug, num, stem, choices, solutionBody, correct) {
  const id = `chem-${slug}-${num}`;
  const choiceLines = choices.map((c) => `- [ ] ${c}`).join('\n');
  const lines = [
    `:::mcq{id=${id} correct=${correct}}`,
    stem,
  ];
  if (choiceLines) lines.push('', choiceLines);
  lines.push('', ':::solution', solutionBody, ':::', ':::');
  return lines.join('\n');
}

function rebuildMcqFromParsed(item, slug, solutions) {
  if (item.raw && item.choices.length === 0) {
    const sol = solutions.get(item.num);
    const correct =
      sol?.correct ?? item.raw.match(/correct=([A-D])/)?.[1] ?? 'A';
    if (item.raw.includes(':::solution')) {
      return item.raw.replace(
        /^:::mcq\{[^}]*\}/,
        `:::mcq{id=chem-${slug}-${item.num} correct=${correct}}`,
      );
    }
    if (!sol?.body) {
      throw new Error(`missing solution for question ${item.num}`);
    }
    return formatMcq(slug, item.num, item.stem, [], sol.body, correct);
  }

  const sol = solutions.get(item.num);
  if (!sol?.correct) {
    throw new Error(`missing solution or boxed answer for question ${item.num}`);
  }
  if (item.choices.length !== 4) {
    throw new Error(
      `question ${item.num}: expected 4 choices, got ${item.choices.length}`,
    );
  }
  return formatMcq(
    slug,
    item.num,
    item.stem,
    item.choices,
    sol.body,
    sol.correct,
  );
}

function transformSource(src, fileSlug) {
  const practiceIdx = src.indexOf('\n## Practice');
  if (practiceIdx === -1) return { next: src, count: 0 };

  const mcqHeading = src.indexOf('\n### MCQ', practiceIdx);
  if (mcqHeading === -1) return { next: src, count: 0 };

  const frqHeading = src.indexOf('\n### FRQ', mcqHeading + 1);
  if (frqHeading === -1) return { next: src, count: 0 };

  const blockStart = mcqHeading + '\n### MCQ'.length + 1;
  const blockEnd = frqHeading;
  const mcqBody = src.slice(blockStart, blockEnd);

  const hasLegacy = CHOICE_LINE.test(mcqBody) || /^\d+\.\s/m.test(mcqBody.replace(MCQ_BLOCK, ''));
  const hasMcq = mcqBody.includes(':::mcq');
  if (!hasLegacy && !hasMcq) return { next: src, count: 0 };

  const solutions = parseSolutions(src);
  const items = parseMcqSection(mcqBody);

  if (items.length === 0) return { next: src, count: 0 };

  const mcqs = [];
  let legacyCount = 0;

  for (const item of items) {
    if (item.choices.length > 0) legacyCount += 1;
    try {
      mcqs.push(rebuildMcqFromParsed(item, fileSlug, solutions));
    } catch (err) {
      throw new Error(`Q${item.num}: ${err.message}`);
    }
  }

  const newBlock = `### MCQ\n\n:::practice\n${mcqs.join('\n\n')}\n:::\n\n`;
  const next =
    src.slice(0, mcqHeading + 1) + newBlock + src.slice(blockEnd + 1);

  if (next === src) return { next: src, count: 0 };

  return { next, count: legacyCount > 0 ? legacyCount : items.length };
}

function main() {
  const { write, dryRun, only } = parseArgs(process.argv.slice(2));
  const files = listChemFiles(only);

  let filesTouched = 0;
  let mcqsConverted = 0;

  for (const abs of files) {
    const rel = relative(ROOT, abs);
    const slug = basename(abs, '.md');
    const src = readFileSync(abs, 'utf8');

    let next;
    let count;
    try {
      ({ next, count } = transformSource(src, slug));
    } catch (err) {
      console.error(`${rel}: ${err.message}`);
      continue;
    }

    if (count === 0 && next === src) continue;

    filesTouched += 1;
    mcqsConverted += count;
    console.log(`${dryRun ? '[dry-run] ' : ''}${rel}: ${count} MCQ(s)`);

    if (write) writeFileSync(abs, next, 'utf8');
  }

  console.log(
    `\n${dryRun ? 'Would update' : 'Updated'} ${filesTouched} file(s), ${mcqsConverted} MCQ(s).`,
  );

  if (dryRun && filesTouched > 0) {
    console.log('Re-run with --write to apply.');
  }
}

main();
