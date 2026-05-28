#!/usr/bin/env node
// Lint all Notes/*.md files for migration and content health.
// Errors → exit 1. Warnings are printed only.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const NOTES_DIR = join(ROOT, 'Notes');

/** @type {{ errors: string[]; warnings: string[] }} */
const report = { errors: [], warnings: [] };

function rel(p) {
  return relative(ROOT, p).replace(/\\/g, '/');
}

function walkMd(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkMd(p, out);
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function stripFrontmatter(src) {
  if (!src.startsWith('---')) return src;
  const end = src.indexOf('\n---', 3);
  if (end === -1) return src;
  const close = src.indexOf('\n', end + 4);
  return close === -1 ? '' : src.slice(close + 1);
}

function stripHtmlComments(src) {
  return src.replace(/<!--[\s\S]*?-->/g, '');
}

/** @param {string} raw */
function extractAssetPath(raw) {
  const trimmed = raw.trim();
  const liquid = trimmed.match(
    /\{\{\s*(['"`\u2018\u2019\u201c\u201d`]?)(\/[^'"`|]+?)\1\s*\|\s*relative_url/i,
  );
  if (liquid) return liquid[2];
  const plain = trimmed.replace(/^['"`]|['"`]$/g, '');
  if (/^https?:\/\//i.test(plain) || /^\/\//.test(plain) || /^data:/i.test(plain)) return null;
  if (plain.startsWith('/') || plain.startsWith('./') || plain.startsWith('../')) return plain;
  return plain.includes('://') ? null : plain;
}

/** @param {string} urlPath @param {string} noteFile */
function resolveOnDisk(urlPath, noteFile) {
  let p = urlPath.split('#')[0].split('?')[0];
  try {
    p = decodeURIComponent(p);
  } catch {
    /* keep encoded */
  }

  if (p.startsWith('/assets/')) {
    return join(ROOT, 'assets', p.slice('/assets/'.length));
  }
  if (p.startsWith('/')) {
    return join(ROOT, 'public', p.slice(1));
  }
  return resolve(dirname(noteFile), p);
}

/** @param {string} urlPath @param {string} noteFile */
function assetExists(urlPath, noteFile) {
  const abs = resolveOnDisk(urlPath, noteFile);
  return abs && existsSync(abs);
}

/** @param {string} raw @param {string} noteFile @param {number} line */
function checkAsset(raw, noteFile, line, kind) {
  const path = extractAssetPath(raw);
  if (!path) return;
  if (!assetExists(path, noteFile)) {
    report.errors.push(`${rel(noteFile)}:${line}: missing ${kind} asset ${path}`);
  }
}

/** @param {string} body @param {string} noteFile */
function checkImages(body, noteFile) {
  const lines = body.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNo = i + 1;

    for (const m of line.matchAll(/<img\b[^>]*>/gi)) {
      if (!/\bnote-img\b/.test(m[0])) continue;
      const src = /(?:\bsrc=)(?:"([^"]*)"|'([^']*)')/i.exec(m[0]);
      const raw = src?.[1] ?? src?.[2];
      if (raw) checkAsset(raw, noteFile, lineNo, 'note-img');
    }

    for (const m of line.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
      checkAsset(m[1], noteFile, lineNo, 'markdown image');
    }
  }
}

/** @param {string} body @param {string} noteFile */
function checkDirectives(body, noteFile) {
  const stack = [];
  const lines = body.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === ':::') {
      if (stack.length === 0) {
        report.errors.push(`${rel(noteFile)}:${i + 1}: closing ::: without opener`);
      } else {
        stack.pop();
      }
      continue;
    }
    const open = /^:::\s*([\w-]+)/.exec(trimmed);
    if (open) {
      stack.push({ name: open[1], line: i + 1 });
    }
  }

  for (const { name, line } of stack) {
    report.errors.push(`${rel(noteFile)}:${line}: unclosed :::${name} directive`);
  }
}

/** @param {string} body @param {string} noteFile */
function checkWarnings(body, noteFile) {
  const lines = body.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNo = i + 1;
    if (/<div\b[^>]*\bclass="[^"]*\btheorem-box\b/.test(line)) {
      report.warnings.push(`${rel(noteFile)}:${lineNo}: legacy theorem-box div`);
    }
    if (/\|\s*relative_url/i.test(line)) {
      report.warnings.push(`${rel(noteFile)}:${lineNo}: Jekyll relative_url liquid`);
    }
  }
}

function lintFile(noteFile) {
  const raw = readFileSync(noteFile, 'utf8');
  const body = stripHtmlComments(stripFrontmatter(raw));
  checkImages(body, noteFile);
  checkDirectives(body, noteFile);
  checkWarnings(body, noteFile);
}

function main() {
  let files;
  try {
    files = walkMd(NOTES_DIR);
  } catch (err) {
    console.error(`lint-notes: cannot read ${rel(NOTES_DIR)}: ${err.message}`);
    process.exit(1);
  }

  for (const file of files.sort()) lintFile(file);

  for (const msg of report.warnings) console.warn(`warning: ${msg}`);
  for (const msg of report.errors) console.error(`error: ${msg}`);

  const summary = `${files.length} note(s): ${report.errors.length} error(s), ${report.warnings.length} warning(s)`;
  if (report.errors.length) {
    console.error(`lint-notes: ${summary}`);
    process.exit(1);
  }
  console.log(`lint-notes: ${summary}`);
}

main();
