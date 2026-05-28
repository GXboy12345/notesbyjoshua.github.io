#!/usr/bin/env node
/**
 * Scan Notes markdown for :::frq blocks; emit public/generated/frq-manifest.json.
 *
 * Usage: node scripts/build-frq-manifest.mjs
 */

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const NOTES = join(ROOT, 'Notes');
const OUT_DIR = join(ROOT, 'public', 'generated');
const OUT_FILE = join(OUT_DIR, 'frq-manifest.json');
const OUT_WORKER = join(ROOT, 'worker', 'src', 'frq-manifest.json');

const FRQ_OPEN = /^:::frq\{([^}]*)\}\s*$/;
const PART_RE = /\$\$\(([A-Z])\)\$\$|\(([A-Z])\)(?=\s|$)/g;

/** @param {string} attrs */
function parseAttrs(attrs) {
  const out = {};
  for (const m of attrs.matchAll(/(\w+)\s*=\s*([^,\s}]+)/g)) {
    out[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return out;
}

/** @param {string} rel Notes-relative path e.g. APs/AP Chem/kinetics.md */
function pathMeta(rel) {
  const parts = rel.replace(/\.md$/, '').split('/');
  const domain = parts[0] ?? '';
  let courseFolder;
  if (domain === 'APs' && parts.length > 2) {
    courseFolder = parts[1];
  }
  return { domain, courseFolder };
}

/** @param {string} text */
function extractParts(text) {
  const ids = new Set();
  let m;
  PART_RE.lastIndex = 0;
  while ((m = PART_RE.exec(text)) !== null) {
    ids.add(m[1] ?? m[2]);
  }
  const ordered = [...ids].sort();
  return ordered.map((id) => ({
    id,
    stemMarkdown: '',
  }));
}

/** @param {string} text */
function keywordsFrom(text) {
  const words = new Set();
  for (const line of text.split('\n')) {
    const hm = /^(#{1,3})\s+(.+)$/.exec(line.trim());
    if (hm) {
      for (const w of hm[2].toLowerCase().split(/[^a-z0-9]+/)) {
        if (w.length > 2) words.add(w);
      }
    }
  }
  return [...words].slice(0, 24);
}

/** @param {string} src @param {number} start */
function nearbyContext(src, start) {
  const before = src.slice(0, start);
  const noSolutions = before.replace(/\n## Solutions[\s\S]*$/i, '');
  const trimmed = noSolutions.trimEnd();
  const max = 8000;
  return trimmed.length <= max ? trimmed : trimmed.slice(trimmed.length - max);
}

/**
 * @param {string} src
 * @returns {Array<{ attrs: Record<string,string>, question: string, solution: string, start: number, end: number }>}
 */
function parseFrqBlocks(src) {
  const lines = src.split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const open = FRQ_OPEN.exec(lines[i]?.trim() ?? '');
    if (!open) {
      i += 1;
      continue;
    }

    const attrs = parseAttrs(open[1]);
    const start = lines.slice(0, i).join('\n').length;
    i += 1;
    const body = [];
    let solution = null;

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed === ':::solution' || /^:::solution\[/.test(trimmed)) {
        i += 1;
        const solLines = [];
        while (i < lines.length && lines[i].trim() !== ':::') {
          solLines.push(lines[i]);
          i += 1;
        }
        if (i < lines.length && lines[i].trim() === ':::') i += 1;
        solution = solLines.join('\n').trim();
        continue;
      }

      if (trimmed === ':::' || trimmed === '::::') {
        i += 1;
        break;
      }

      body.push(line);
      i += 1;
    }

    const end = lines.slice(0, i).join('\n').length;
    blocks.push({
      attrs,
      question: body.join('\n').trim(),
      solution: solution ?? '',
      start,
      end,
    });
  }

  return blocks;
}

/** @param {string} dir */
function walkMd(dir) {
  /** @type {string[]} */
  const out = [];
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, name.name);
    if (name.isDirectory()) out.push(...walkMd(full));
    else if (name.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function sitePathFromPermalink(permalink, rel) {
  if (permalink) {
    const p = permalink.replace(/^\/+|\/+$/g, '');
    return `/${p}/`;
  }
  const slug = rel.replace(/\.md$/, '').toLowerCase().replace(/\s+/g, '-');
  return `/notes/${slug}/`;
}

function main() {
  const items = {};
  const files = walkMd(NOTES);

  for (const abs of files) {
    const rel = relative(NOTES, abs).replace(/\\/g, '/');
    const raw = readFileSync(abs, 'utf8');
    const { data, content } = matter(raw);
    const permalink = typeof data.permalink === 'string' ? data.permalink : undefined;
    const sitePath = sitePathFromPermalink(permalink, rel);
    const { domain, courseFolder } = pathMeta(rel);
    const title = typeof data.title === 'string' ? data.title : undefined;
    const tags = keywordsFrom(raw);

    for (const block of parseFrqBlocks(content)) {
      const id = block.attrs.id;
      if (!id) {
        console.warn(`skip FRQ without id in ${rel}`);
        continue;
      }

      const parts = extractParts(block.question);
      items[id] = {
        id,
        domain,
        courseFolder,
        sourcePath: `Notes/${rel}`,
        sitePath,
        title,
        questionMarkdown: block.question,
        solutionMarkdown: block.solution,
        parts,
        nearbyContextMarkdown: nearbyContext(content, block.start),
        tags,
      };
    }
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const manifest = {
    generatedAt: new Date().toISOString(),
    itemCount: Object.keys(items).length,
    items,
  };
  writeFileSync(OUT_FILE, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  mkdirSync(dirname(OUT_WORKER), { recursive: true });
  writeFileSync(OUT_WORKER, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${OUT_FILE} (${manifest.itemCount} FRQs)`);
  console.log(`Wrote ${OUT_WORKER}`);
}

main();
