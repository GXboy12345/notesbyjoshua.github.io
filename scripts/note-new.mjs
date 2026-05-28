#!/usr/bin/env node
/**
 * Scaffold a new unit note under Notes/.
 *
 * Usage:
 *   node scripts/note-new.mjs --course ap-chem --unit my-unit --title "My Unit"
 *   node scripts/note-new.mjs --course ap-chem --unit my-unit --title "My Unit" --force
 */

import { existsSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));

/** @type {Record<string, { dir: string; parent: string; permalinkPrefix: string }>} */
const COURSES = {
  'ap-chem': {
    dir: 'Notes/APs/AP Chem',
    parent: 'AP Chemistry',
    permalinkPrefix: '/notes/ap/chem',
  },
  'ap-stats': {
    dir: 'Notes/APs/AP Stats',
    parent: 'AP Statistics',
    permalinkPrefix: '/notes/ap/stats',
  },
  'ap-precalc': {
    dir: 'Notes/APs/AP Precalc',
    parent: 'AP Precalculus',
    permalinkPrefix: '/notes/ap/precalc',
  },
  'ap-calc': {
    dir: 'Notes/APs/AP Calc',
    parent: 'AP Calculus AB/BC',
    permalinkPrefix: '/notes/math',
  },
  'ap-physics-c-mech': {
    dir: 'Notes/APs/AP Physics C Mech',
    parent: 'AP Physics C Mechanics',
    permalinkPrefix: '/notes/ap/ap-physics-c-mechanics',
  },
  'ap-physics-c-em': {
    dir: 'Notes/APs/AP Physics C E&M',
    parent: 'AP Physics C E&M',
    permalinkPrefix: '/notes/ap/ap-physics-c-em',
  },
};

function usage() {
  const courses = Object.keys(COURSES).sort().join(', ');
  return `Usage: node scripts/note-new.mjs --course <slug> --unit <slug> --title <text> [--force]

Courses: ${courses}

Example:
  node scripts/note-new.mjs --course ap-chem --unit my-unit --title "My Unit"`;
}

function yamlString(value) {
  if (/[:#\n\r\t]/.test(value) || value.startsWith('"') || value.startsWith("'")) {
    return JSON.stringify(value);
  }
  return value.includes(' ') ? JSON.stringify(value) : value;
}

/**
 * @param {{ course: string; unit: string; title: string }} opts
 */
function buildNote({ course, unit, title }) {
  const meta = COURSES[course];
  const permalink = `${meta.permalinkPrefix}/${unit}/`;
  const mcqId = `${unit}-1`;

  return `---
layout: default
title: ${yamlString(title)}
parent: ${yamlString(meta.parent)}
nav_order: 99
permalink: ${permalink}
---

# ${title}

Brief intro for this unit.

---

## Section title

Content goes here.

---

## Practice

### MCQ

:::practice
:::mcq{id=${mcqId} correct=A}
1. Replace with your question stem.

   (A) Choice A<br>
   (B) Choice B<br>
   (C) Choice C<br>
   (D) Choice D

:::solution
Explain the reasoning, then give the final answer.

$$
\\boxed{\\text{A}}
$$
:::
:::
:::

### FRQ

2. Replace with a free-response prompt.

   $$(A)$$ Part (a)

   $$(B)$$ Part (b)

---

## Solutions

### MCQ

:::theorem
### Solution 1

Replace with the worked MCQ solution (or mirror content from the \`:::solution\` block above).

$$
\\boxed{\\text{A}}
$$
:::

### FRQ

:::theorem
### Solution 2

Replace with the FRQ rubric or model answer.
:::
`;
}

function main() {
  const { values, positionals } = parseArgs({
    options: {
      course: { type: 'string' },
      unit: { type: 'string' },
      title: { type: 'string' },
      force: { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
    allowPositionals: true,
  });

  if (values.help || positionals.includes('help')) {
    console.log(usage());
    process.exit(0);
  }

  const course = values.course?.trim();
  const unit = values.unit?.trim();
  const title = values.title?.trim();

  if (!course || !unit || !title) {
    console.error('Missing required flags: --course, --unit, and --title are required.\n');
    console.error(usage());
    process.exit(1);
  }

  if (!COURSES[course]) {
    console.error(`Unknown course "${course}". Known: ${Object.keys(COURSES).sort().join(', ')}\n`);
    process.exit(1);
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(unit)) {
    console.error(`Invalid unit slug "${unit}". Use lowercase letters, digits, and hyphens only.`);
    process.exit(1);
  }

  const outPath = join(ROOT, COURSES[course].dir, `${unit}.md`);
  if (existsSync(outPath) && !values.force) {
    console.error(`File already exists: ${outPath}`);
    console.error('Pass --force to overwrite.');
    process.exit(1);
  }

  writeFileSync(outPath, buildNote({ course, unit, title }), 'utf8');
  console.log(`Wrote ${outPath}`);
  console.log('Update nav_order and add a link on the course index page.');
}

main();
