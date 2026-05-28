import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import matter from 'gray-matter';
import type { DocEntry } from './resolve-doc';
import { routeSlug } from './routes';
import {
  renderMarkdownToHtml,
  headingsFromMarkdownFallback,
  type DocHeading,
} from './markdown/render-pipeline';

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
  for (const name of ['how-to-use-these-notes.md']) {
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

export type { DocHeading };

export function renderDocHtml(md: string): string {
  return renderMarkdownToHtml(md).html;
}

export function renderDoc(md: string): { html: string; headings: DocHeading[] } {
  return renderMarkdownToHtml(md);
}

export function headingsFromMarkdown(md: string): DocHeading[] {
  try {
    return renderMarkdownToHtml(md).headings;
  } catch {
    return headingsFromMarkdownFallback(md);
  }
}
