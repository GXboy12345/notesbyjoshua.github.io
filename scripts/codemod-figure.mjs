#!/usr/bin/env node
/**
 * Convert legacy note-img tags to remark-directive figure fences in Notes markdown.
 *
 * Usage:
 *   node scripts/codemod-figure.mjs [--dry-run] [--write]
 *
 * Default (no flags): dry-run—print files that would change.
 * --dry-run: same as default.
 * --write: apply replacements in place.
 *
 * Transforms:
 *   <img class="note-img note-img--w480" src="{{ 'PATH' | relative_url }}" alt="ALT" ... />
 *     -> :::figure{width=480}\n![ALT](PATH)\n:::
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const NOTES_DIR = join(ROOT, 'Notes');

const IMG =
  /<img\s+class="note-img\s+note-img--w(\d+)"\s+src="\{\{\s*'([^']*)'\s*\|\s*relative_url\s*\}\}"\s+alt="([^"]*)"(?:\s+[^>]*?)?\s*\/?>/gi;

function convertFigure(width, assetPath, alt) {
  return `:::figure{width=${width}}\n![${alt}](${assetPath})\n:::`;
}

function transformSource(src) {
  let count = 0;
  const next = src.replace(IMG, (_, width, assetPath, alt) => {
    count += 1;
    return convertFigure(width, assetPath, alt);
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
let figuresConverted = 0;

for (const abs of walkMd(NOTES_DIR)) {
  const rel = relative(ROOT, abs);
  const src = readFileSync(abs, 'utf8');
  const { next, count } = transformSource(src);
  if (count === 0) continue;

  filesTouched += 1;
  figuresConverted += count;
  console.log(`${dryRun ? '[dry-run] ' : ''}${rel}: ${count} figure(s)`);

  if (write) writeFileSync(abs, next, 'utf8');
}

console.log(
  `\n${dryRun ? 'Would update' : 'Updated'} ${filesTouched} file(s), ${figuresConverted} figure(s).`,
);

if (dryRun && filesTouched > 0) {
  console.log('Re-run with --write to apply.');
}
