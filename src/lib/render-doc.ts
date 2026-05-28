import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import matter from 'gray-matter';
import { Marked, type Token } from 'marked';
import type { DocEntry } from './resolve-doc';
import { routeSlug } from './routes';

const root = process.cwd();

let slugToFile: Map<string, string> | null = null;

function walkMd(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkMd(p, out);
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function buildSlugMap(): Map<string, string> {
  const m = new Map<string, string>();
  const files: string[] = [];
  for (const dir of ['Notes', 'blog', 'Practice Problems', 'Resources', 'feedback']) {
    const p = join(root, dir);
    try {
      walkMd(p, files);
    } catch {
      /* missing dir */
    }
  }
  for (const name of ['about.md', 'how-to-use-these-notes.md']) {
    const p = join(root, name);
    try {
      statSync(p);
      files.push(p);
    } catch {
      /* missing */
    }
  }
  for (const abs of files) {
    const rel = relative(root, abs).replace(/\\/g, '/');
    const parsed = matter(readFileSync(abs, 'utf8'));
    const permalink = parsed.data.permalink as string | undefined;
    const slug = permalink
      ? permalink.replace(/^\/+|\/+$/g, '')
      : rel.replace(/\.md$/, '');
    m.set(slug, rel);
  }
  return m;
}

function pathMap(): Map<string, string> {
  if (!slugToFile) slugToFile = buildSlugMap();
  return slugToFile;
}

export function readDocSource(entry: DocEntry) {
  const slug = routeSlug(entry);
  const rel = pathMap().get(slug);
  if (!rel) throw new Error(`No markdown source for slug: ${slug}`);
  const parsed = matter(readFileSync(join(root, rel), 'utf8'));
  return { data: parsed.data, body: parsed.content, rel };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function headingPlainText(tokens: Token[]): string {
  let out = '';
  for (const token of tokens) {
    if (token.type === 'text') out += token.text;
    else if ('tokens' in token && Array.isArray(token.tokens)) out += headingPlainText(token.tokens);
  }
  return out.trim();
}

function assignHeadingSlug(text: string, counts: Map<string, number>): string {
  const base = slugify(text) || 'section';
  const seen = counts.get(base) ?? 0;
  counts.set(base, seen + 1);
  return seen === 0 ? base : `${base}-${seen + 1}`;
}

export function headingsFromMarkdown(md: string) {
  const out: { depth: number; slug: string; text: string }[] = [];
  for (const line of md.split('\n')) {
    const m = /^(#{1,6})\s+(.+)$/.exec(line.trim());
    if (!m) continue;
    const text = m[2].replace(/\s+#+\s*$/, '').trim();
    out.push({ depth: m[1].length, slug: slugify(text), text });
  }
  return out;
}

export function renderDocHtml(md: string): string {
  const slugCounts = new Map<string, number>();
  const parser = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const plain = headingPlainText(tokens);
        const id = assignHeadingSlug(plain, slugCounts);
        const inner = this.parser.parseInline(tokens);
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
    },
  });

  return parser.parse(md, { async: false }) as string;
}
