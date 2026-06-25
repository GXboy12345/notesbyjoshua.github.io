#!/usr/bin/env node
/**
 * Insert a blank line before closing `:::` when it immediately follows content.
 * Without the blank line, CommonMark lazy continuation absorbs `:::` into the
 * preceding list item or paragraph, so it renders as literal text.
 *
 * Usage: node scripts/fix-lazy-fence-closers.mjs [--write]
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
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

function stripFrontmatter(src) {
  if (!src.startsWith('---')) return { body: src, prefix: '' };
  const end = src.indexOf('\n---', 3);
  if (end === -1) return { body: src, prefix: '' };
  const close = src.indexOf('\n', end + 4);
  if (close === -1) return { body: '', prefix: src };
  return { prefix: src.slice(0, close + 1), body: src.slice(close + 1) };
}

function fixBody(body) {
  const lines = body.split('\n');
  const out = [];
  let n = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === ':::' && out.length > 0) {
      const prevIdx = out.length - 1;
      const prevTrimmed = out[prevIdx].trim();
      if (prevTrimmed !== '' && prevTrimmed !== ':::') {
        out.push('');
        n += 1;
      }
    }

    out.push(line);
  }

  return { next: out.join('\n'), changed: n > 0, n };
}

const write = process.argv.includes('--write');
let filesChanged = 0;
let inserts = 0;

for (const abs of walkMd(NOTES)) {
  const src = readFileSync(abs, 'utf8');
  const { prefix, body } = stripFrontmatter(src);
  const { next, changed, n } = fixBody(body);
  if (!changed) continue;

  const rel = relative(ROOT, abs);
  console.log(write ? 'fixed' : '[dry-run]', rel, `(${n} blank line${n === 1 ? '' : 's'})`);
  filesChanged += 1;
  inserts += n;
  if (write) writeFileSync(abs, prefix + next, 'utf8');
}

console.log(
  `${write ? 'fixed' : 'would fix'} ${filesChanged} file(s), ${inserts} blank line(s) before closing :::`,
);
