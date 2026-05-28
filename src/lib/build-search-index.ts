import { allDocEntries } from './resolve-doc';
import { readDocSource } from './render-doc';
import { routePath, routeSlug } from './routes';
import type { SearchRecord } from './search-types';

function stripMarkdown(src: string): string {
  return src
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$\n]+?\$/g, ' ')
    .replace(/\{%[\s\S]*?%\}/g, ' ')
    .replace(/\{\{[\s\S]*?\}\}/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_>`~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerpt(body: string, max = 160): string {
  const plain = stripMarkdown(body);
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max).trimEnd()}…`;
}

export async function buildSearchIndex(): Promise<SearchRecord[]> {
  const entries = await allDocEntries();
  const records: SearchRecord[] = [];

  for (const entry of entries) {
    const slug = routeSlug(entry);
    if (!slug || slug === 'index') continue;

    const { body } = readDocSource(entry);
    const title =
      (entry.data.title as string | undefined) ??
      slug.split('/').pop()?.replace(/-/g, ' ') ??
      slug;

    const plain = stripMarkdown(body);
    records.push({
      title,
      url: routePath(entry),
      excerpt: excerpt(body),
      text: `${title} ${plain}`.toLowerCase(),
    });
  }

  records.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
  return records;
}
