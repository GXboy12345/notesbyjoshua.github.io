#!/usr/bin/env node
/**
 * Remove duplicate ## Solutions / ### MCQ blocks when interactive :::mcq exists.
 * Convert remaining ### Solution N theorem boxes under ## Solutions to :::solution.
 *
 * Usage: node scripts/strip-duplicate-solutions.mjs [--write]
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const NOTE_DIRS = [
  join(ROOT, 'Notes', 'APs', 'AP Chem'),
  join(ROOT, 'Notes', 'APs', 'AP Precalc'),
];

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
  if (!src.includes(':::practice')) {
    return { next: src, changed: false };
  }

  let next = src;
  const hasMcq = src.includes(':::mcq');
  const hasFrq = src.includes(':::frq');

  if (hasMcq) {
    const mcqSolutions = /\n## Solutions\r?\n\s*\n### MCQ\r?\n[\s\S]*?(?=\r?\n### FRQ\r?\n)/;
    if (mcqSolutions.test(next)) {
      next = next.replace(mcqSolutions, '\n## Solutions\n');
    }
  }

  const solIdx = next.indexOf('\n## Solutions');
  if (solIdx !== -1) {
    const tail = next.slice(solIdx);
    const duplicateFrqSolutions =
      hasFrq &&
      (/:::theorem\r?\n### Solution \d+/m.test(tail) ||
        /:::solution\[Solution \d+\]/m.test(tail));

    if (duplicateFrqSolutions) {
      next = `${next.slice(0, solIdx).trimEnd()}\n`;
    } else {
      let fixedTail = tail.replace(
        /:::theorem\r?\n### Solution (\d+)\r?\n/g,
        ':::solution[Solution $1]\n',
      );
      next = next.slice(0, solIdx) + fixedTail;
    }
  }

  return { next, changed: next !== src };
}

const write = process.argv.includes('--write');

for (const abs of listNoteFiles()) {
  const src = readFileSync(abs, 'utf8');
  const { next, changed } = transform(src);
  if (!changed) continue;
  const rel = relative(ROOT, abs);
  console.log(write ? 'updated' : '[dry-run]', rel);
  if (write) writeFileSync(abs, next, 'utf8');
}
