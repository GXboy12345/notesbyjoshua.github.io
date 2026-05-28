#!/usr/bin/env node
/**
 * Fix double `:::` closers and trailing :::practice close in migrated notes.
 * Usage: node scripts/fix-orphan-fences.mjs [--write]
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const NOTES = join(ROOT, 'Notes');

function walkMd(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkMd(p, out);
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function fix(src) {
  let next = src;
  let n = 0;

  const double = /\n:::\n:::\n/g;
  while (double.test(next)) {
    next = next.replace(double, '\n:::\n');
    n += 1;
  }

  // Trailing practice close before FRQ or Solutions
  const practiceClose = /(:::practice[\s\S]*?)\n:::\n(\n### FRQ|\n## Solutions)/g;
  if (practiceClose.test(next)) {
    next = next.replace(practiceClose, '$1$2');
    n += 1;
  }

  return { next, changed: next !== src, n };
}

const write = process.argv.includes('--write');

for (const abs of walkMd(NOTES)) {
  const src = readFileSync(abs, 'utf8');
  const { next, changed } = fix(src);
  if (!changed) continue;
  const rel = relative(ROOT, abs);
  console.log(write ? 'fixed' : '[dry-run]', rel);
  if (write) writeFileSync(abs, next, 'utf8');
}
