import type { CollectionEntry } from 'astro:content';

type Doc = CollectionEntry<'notes' | 'pages' | 'blog' | 'practice' | 'resources' | 'feedback'>;

export function routeSlug(entry: Doc): string {
  const p = entry.data.permalink;
  if (p) return p.replace(/^\/+|\/+$/g, '');
  return entry.id.replace(/\.md$/, '');
}

export function routePath(entry: Doc): string {
  const s = routeSlug(entry);
  return s ? `/${s}/` : '/';
}

export function allDocs(
  notes: Doc[],
  pages: Doc[],
  blog: Doc[],
  practice: Doc[],
  resources: Doc[],
  feedback: Doc[],
): Doc[] {
  return [...pages, ...notes, ...blog, ...practice, ...resources, ...feedback];
}
