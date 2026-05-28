#!/usr/bin/env node
/**
 * Convert legacy theorem-box divs to remark-directive fences in Notes markdown.
 *
 * Usage:
 *   node scripts/codemod-theorem-box.mjs [--dry-run] [--write]
 *
 * Default (no flags): dry-run — print files that would change.
 * --dry-run: same as default.
 * --write: apply replacements in place.
 *
 * Transforms:
 *   <div class="theorem-box" markdown="1"> ... </div>
 *     -> :::theorem|example\n...\n:::
 *
 * If the first non-empty inner line is **Theorem.** or **Example.** (optional
 * trailing text on the same line), the fence type is theorem or example and that
 * label prefix is removed from the body.
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const NOTES_DIR = join(ROOT, 'Notes');

const OPEN =
  /<div\s+class="theorem-box"\s+markdown="1"\s*>\s*([\s\S]*?)\s*<\/div>/gi;

const TITLE_LINE = /^\*\*(Theorem|Example)\.\*\*(.*)$/;

function convertTheoremBox(inner) {
  const body = inner.replace(/^\n+|\n+$/g, '');
  const lines = body.split('\n');

  let i = 0;
  while (i < lines.length && lines[i].trim() === '') i += 1;

  let directive = 'theorem';
  if (i < lines.length) {
    const m = TITLE_LINE.exec(lines[i].trim());
    if (m) {
      directive = m[1].toLowerCase();
      const rest = m[2].trim();
      if (rest) lines[i] = rest;
      else lines.splice(i, 1);
    }
  }

  const converted = lines.join('\n').trim();
  return `:::${directive}\n${converted}\n:::`;
}

function transformSource(src) {
  let count = 0;
  const next = src.replace(OPEN, (_, inner) => {
    count += 1;
    return convertTheoremBox(inner);
  });
  return { next, count };
}

function walkMd(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkMd(p, out);
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function parseArgs(argv) {
  const write = argv.includes('--write');
  const dryRun = argv.includes('--dry-run') || !write;
  if (write && argv.includes('--dry-run')) {
    console.error('Use either --dry-run or --write, not both.');
    process.exit(1);
  }
  return { write, dryRun };
}

const { write, dryRun } = parseArgs(process.argv.slice(2));

let filesTouched = 0;
let boxesConverted = 0;

for (const abs of walkMd(NOTES_DIR)) {
  const rel = relative(ROOT, abs);
  const src = readFileSync(abs, 'utf8');
  const { next, count } = transformSource(src);
  if (count === 0) continue;

  filesTouched += 1;
  boxesConverted += count;
  console.log(`${dryRun ? '[dry-run] ' : ''}${rel}: ${count} box(es)`);

  if (write) writeFileSync(abs, next, 'utf8');
}

console.log(
  `\n${dryRun ? 'Would update' : 'Updated'} ${filesTouched} file(s), ${boxesConverted} theorem-box(es).`,
);

if (dryRun && filesTouched > 0) {
  console.log('Re-run with --write to apply.');
}
