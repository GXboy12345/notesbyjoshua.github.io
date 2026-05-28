#!/usr/bin/env node
/**
 * Normalize closing fences for :::practice / :::mcq / :::solution (remark-directive).
 *
 * Before :::mcq / :::frq (except the first in a practice block): exactly two `:::`
 * Before ### FRQ or ## Solutions (end of a practice block): exactly three `:::`
 *
 * Usage: node scripts/fix-mcq-closing-fences.mjs [--write]
 */

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const TARGET_DIRS = [
  join(ROOT, 'Notes', 'APs', 'AP Chem'),
  join(ROOT, 'Notes', 'APs', 'AP Precalc'),
];

function listMdFiles() {
  const out = [];
  for (const dir of TARGET_DIRS) {
    for (const name of readdirSync(dir)) {
      if (name.endsWith('.md')) out.push(join(dir, name));
    }
  }
  return out;
}

function nextSignificantLine(lines, from) {
  let j = from + 1;
  while (j < lines.length && lines[j].trim() === '') j += 1;
  return j < lines.length ? lines[j].trim() : '';
}

function countFollowingClosers(lines, from) {
  let j = from + 1;
  let n = 0;
  while (j < lines.length && lines[j].trim() === ':::') {
    n += 1;
    j += 1;
  }
  return n;
}

/** Close :::frq / :::practice when legacy prose follows pilot blocks. */
function ensureFrqClosers(body) {
  const lines = body.split('\n');
  const out = [];
  let inFrq = false;
  let practiceOpen = true;
  let afterSolutionClose = false;

  const trailingClosers = () => {
    let k = out.length - 1;
    let n = 0;
    while (k >= 0 && out[k].trim() === ':::') {
      n += 1;
      k -= 1;
    }
    return n;
  };

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (/^\d+\.\s/.test(trimmed) && practiceOpen && !trimmed.startsWith(':::frq')) {
      if (trailingClosers() === 2) out.push(':::');
      practiceOpen = false;
    }

    if (trimmed.startsWith(':::frq')) {
      inFrq = true;
      afterSolutionClose = false;
    } else if (trimmed === ':::solution') {
      afterSolutionClose = false;
    } else if (trimmed === ':::' && inFrq) {
      const next = nextSignificantLine(lines, i);
      const extra = countFollowingClosers(lines, i);
      const needsFrqClose =
        afterSolutionClose ||
        /^\d+\.\s/.test(next) ||
        next === '## Solutions' ||
        next.startsWith(':::frq');

      if (needsFrqClose && extra === 0) {
        out.push(lines[i], ':::');
        afterSolutionClose = false;
        if (next === '## Solutions' || next.startsWith(':::frq')) inFrq = false;
        continue;
      }

      if (extra >= 1) {
        afterSolutionClose = false;
        if (next.startsWith(':::frq') || next === '## Solutions') inFrq = false;
      } else {
        afterSolutionClose = true;
      }
    } else if (trimmed.startsWith('## Solutions')) {
      if (practiceOpen && trailingClosers() < 3) {
        const need = 3 - trailingClosers();
        for (let n = 0; n < need; n++) out.push(':::');
      }
      inFrq = false;
      practiceOpen = false;
      afterSolutionClose = false;
    }

    out.push(lines[i]);
  }

  return out.join('\n');
}

function normalizePracticeSection(body) {
  let text = ensureFrqClosers(body);

  text = text.replace(/^(:::(?:mcq|frq))/m, '$1');

  text = text.replace(/\n(?:\s*:::\s*)+\n*(?=:::mcq)/g, '\n:::\n:::\n\n');
  text = text.replace(/\n(?:\s*:::\s*)+\n*(?=:::frq)/g, '\n:::\n:::\n\n');

  text = text.replace(/\n(?:\s*:::\s*)+\n*(?=### FRQ)/g, '\n:::\n:::\n:::\n\n');
  text = text.replace(/\n(?:\s*:::\s*)+\n*(?=## Solutions)/g, '\n:::\n:::\n:::\n\n');

  return text;
}

function fixSource(src) {
  if (!src.includes(':::practice')) return src;

  const parts = src.split(':::practice');
  let out = parts[0];

  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    const frqIdx = chunk.indexOf('\n### FRQ');
    const solIdx = chunk.indexOf('\n## Solutions');
    const endCandidates = [frqIdx, solIdx].filter((n) => n > 0);
    const end = endCandidates.length ? Math.min(...endCandidates) : chunk.length;
    const body = chunk.slice(0, end);
    const tail = chunk.slice(end);
    out += ':::practice' + normalizePracticeSection(body) + tail;
  }

  return out;
}

function main() {
  const write = process.argv.includes('--write');
  let touched = 0;

  for (const abs of listMdFiles()) {
    const src = readFileSync(abs, 'utf8');
    if (!src.includes(':::practice')) continue;
    const next = fixSource(src);
    if (next === src) continue;
    touched += 1;
    console.log(relative(ROOT, abs));
    if (write) writeFileSync(abs, next, 'utf8');
  }

  console.log(`\n${write ? 'Updated' : 'Would update'} ${touched} file(s).`);
  if (!write && touched) console.log('Re-run with --write');
}

main();
