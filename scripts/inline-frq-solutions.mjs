#!/usr/bin/env node
/**
 * Move FRQ solutions from ## Solutions into :::frq blocks under ## Practice.
 *
 * Usage: node scripts/inline-frq-solutions.mjs [--write]
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join, relative } from 'node:path';

const ROOT = process.cwd();
const CHEM = join(ROOT, 'Notes', 'APs', 'AP Chem');

const SOLUTION_BLOCK = /:::solution(?:\[Solution (\d+)\])?\s*\n([\s\S]*?):::/g;

function listChem() {
  return readdirSync(CHEM)
    .filter((n) => n.endsWith('.md') && n !== 'cheatsheet.md')
    .map((n) => join(CHEM, n));
}

/** @returns {Map<number, string>} */
function parseSolutionBlocks(text) {
  const map = new Map();
  let m;
  SOLUTION_BLOCK.lastIndex = 0;
  while ((m = SOLUTION_BLOCK.exec(text)) !== null) {
    const num = m[1] ? Number(m[1]) : map.size + 1;
    let body = m[2].trimEnd();
    body = body.replace(/^### Solution \d+\s*\n+/, '');
    map.set(num, body);
  }
  return map;
}

function parseFrqQuestions(body) {
  const items = [];
  let cur = null;

  for (const line of body.split('\n')) {
    const qm = /^(\d+)\.\s(.*)$/.exec(line);
    if (qm) {
      if (cur) items.push(cur);
      cur = { num: Number(qm[1]), lines: [line] };
      continue;
    }
    if (cur) cur.lines.push(line);
  }
  if (cur) items.push(cur);

  return items.map((item) => ({
    num: item.num,
    text: item.lines.join('\n').trimEnd(),
  }));
}

function formatFrq(slug, num, questionText, solutionBody) {
  return [
    `:::frq{id=chem-${slug}-frq-${num}}`,
    questionText,
    '',
    ':::solution',
    solutionBody.trimEnd(),
    ':::',
    ':::',
  ].join('\n');
}

function transform(src, slug) {
  if (!src.includes(':::mcq') || !src.includes('\n## Solutions')) {
    return { next: src, changed: false };
  }
  if (src.includes(':::frq{')) {
    return { next: src, changed: false };
  }

  const practiceIdx = src.indexOf('\n## Practice');
  if (practiceIdx === -1) return { next: src, changed: false };

  const firstFrq = src.indexOf('\n### FRQ', practiceIdx);
  const solutionsIdx = src.indexOf('\n## Solutions');
  if (firstFrq === -1 || solutionsIdx === -1 || firstFrq > solutionsIdx) {
    return { next: src, changed: false };
  }

  const solFrqIdx = src.indexOf('\n### FRQ', solutionsIdx);
  if (solFrqIdx === -1) return { next: src, changed: false };

  const practiceFrqStart = firstFrq + '\n### FRQ'.length + 1;
  let practiceFrqBody = src.slice(practiceFrqStart, solutionsIdx).trimEnd();
  practiceFrqBody = practiceFrqBody.replace(/\n---\s*$/, '').trimEnd();

  const solTail = src.slice(solFrqIdx + '\n### FRQ'.length + 1);
  const solutions = parseSolutionBlocks(solTail);
  if (solutions.size === 0) return { next: src, changed: false };

  const questions = parseFrqQuestions(practiceFrqBody);
  if (questions.length === 0) return { next: src, changed: false };

  const solutionList = [...solutions.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, body]) => body);

  if (solutionList.length < questions.length) {
    throw new Error(
      `expected ${questions.length} FRQ solutions, found ${solutionList.length}`,
    );
  }

  const frqs = questions.map((q, idx) => {
    const body = solutionList[idx];
    if (!body) {
      throw new Error(`missing solution for FRQ ${idx + 1} (question ${q.num})`);
    }
    return formatFrq(slug, q.num, q.text, body);
  });

  const newPracticeFrq = `### FRQ\n\n${frqs.join('\n\n')}\n\n`;

  let solFrqEnd = src.length;
  const nextSection = src.indexOf('\n## ', solFrqIdx + 1);
  if (nextSection !== -1) solFrqEnd = nextSection;

  const next =
    src.slice(0, firstFrq + 1) +
    newPracticeFrq +
    src.slice(solutionsIdx, solFrqIdx).trimEnd() +
    (nextSection !== -1 ? src.slice(nextSection) : '\n');

  return { next, changed: next !== src };
}

const write = process.argv.includes('--write');
let touched = 0;

for (const abs of listChem()) {
  const slug = basename(abs, '.md');
  const src = readFileSync(abs, 'utf8');
  try {
    const { next, changed } = transform(src, slug);
    if (!changed) continue;
    touched += 1;
    console.log(write ? 'updated' : '[dry-run]', relative(ROOT, abs));
    if (write) writeFileSync(abs, next, 'utf8');
  } catch (err) {
    console.error(relative(ROOT, abs), err.message);
  }
}

console.log(`\n${write ? 'Updated' : 'Would update'} ${touched} file(s).`);
if (!write && touched) console.log('Re-run with --write');
