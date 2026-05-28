#!/usr/bin/env node
/**
 * Drop ## Solutions sections that only point at inline Show solution UI.
 *
 * Usage: node scripts/remove-solutions-stubs.mjs [--write]
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const NOTE_DIRS = [
  join(ROOT, 'Notes', 'APs', 'AP Chem'),
  join(ROOT, 'Notes', 'APs', 'AP Precalc'),
];

function isPointerOnlySolutionsSection(tail) {
  if (!tail.startsWith('## Solutions')) return false;

  const lines = tail
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines[0] !== '## Solutions') return false;

  for (const line of lines.slice(1)) {
    if (line.startsWith('>')) continue;
    if (line === '### MCQ' || line === '### FRQ') continue;
    return false;
  }

  return lines.some((line) => line.startsWith('>'));
}

function listNoteFiles() {
  const out = [];
  for (const dir of NOTE_DIRS) {
    for (const name of readdirSync(dir)) {
      if (name.endsWith('.md') && name !== 'cheatsheet.md') {
        out.push(join(dir, name));
      }
    }
  }
  return out;
}

function transform(src) {
  const solIdx = src.indexOf('\n## Solutions');
  if (solIdx === -1) return { next: src, changed: false };

  const tail = src.slice(solIdx + 1).trimStart();
  if (!isPointerOnlySolutionsSection(tail)) return { next: src, changed: false };

  const next = `${src.slice(0, solIdx).trimEnd()}\n`;
  return { next, changed: true };
}

const write = process.argv.includes('--write');
let touched = 0;

for (const abs of listNoteFiles()) {
  const src = readFileSync(abs, 'utf8');
  const { next, changed } = transform(src);
  if (!changed) continue;
  touched += 1;
  console.log(write ? 'updated' : '[dry-run]', relative(ROOT, abs));
  if (write) writeFileSync(abs, next, 'utf8');
}

console.log(`\n${write ? 'Removed stubs from' : 'Would update'} ${touched} file(s).`);
