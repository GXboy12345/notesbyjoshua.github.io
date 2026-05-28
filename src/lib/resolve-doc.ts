import { getCollection, type CollectionEntry } from 'astro:content';
import { routeSlug } from './routes';

export type DocEntry = CollectionEntry<
  'notes' | 'pages' | 'siteBlog' | 'practice' | 'siteResources' | 'siteFeedback'
>;

let loadPromise: Promise<DocEntry[]> | null = null;

export async function allDocEntries(): Promise<DocEntry[]> {
  if (!loadPromise) {
    loadPromise = Promise.all([
      getCollection('pages'),
      getCollection('notes'),
      getCollection('siteBlog'),
      getCollection('practice'),
      getCollection('siteResources'),
      getCollection('siteFeedback'),
    ]).then(([pages, notes, siteBlog, practice, siteResources, siteFeedback]) => [
      ...pages,
      ...notes,
      ...siteBlog,
      ...practice,
      ...siteResources,
      ...siteFeedback,
    ]);
  }
  return loadPromise;
}

export async function docBySlug(slug: string): Promise<DocEntry | undefined> {
  const norm = slug.replace(/^\/+|\/+$/g, '');
  return (await allDocEntries()).find((e) => routeSlug(e) === norm);
}
