import MiniSearch from 'minisearch';
import { extractSearchText, excerptFromBody } from './extract-search-text';
import { allDocEntries } from './resolve-doc';
import { readDocSource } from './render-doc';
import { routePath, routeSlug } from './routes';
import { miniSearchOptions, SEARCH_INDEX_VERSION } from './search-config';
import type { SearchIndexPayload, SearchRecord } from './search-types';

const COLLECTION_LABELS: Record<string, string> = {
  notes: 'Notes',
  pages: 'Pages',
  siteBlog: 'Blog',
  practice: 'Practice',
  siteResources: 'Resources',
  siteFeedback: 'Feedback',
};

function collectionLabel(collection: string): string {
  return COLLECTION_LABELS[collection] ?? collection;
}

export async function buildSearchIndex(): Promise<SearchIndexPayload> {
  const entries = await allDocEntries();
  const documents: SearchRecord[] = [];

  for (const entry of entries) {
    const slug = routeSlug(entry);
    if (!slug || slug === 'index') continue;

    const { body } = readDocSource(entry);
    const title =
      (entry.data.title as string | undefined) ??
      slug.split('/').pop()?.replace(/-/g, ' ') ??
      slug;

    const extracted = extractSearchText(body);

    documents.push({
      id: slug,
      title,
      url: routePath(entry),
      excerpt: excerptFromBody(extracted.body),
      collection: collectionLabel(entry.collection),
      headings: extracted.headings,
      labels: extracted.labels,
      body: extracted.body,
      math: extracted.math,
    });
  }

  documents.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));

  const miniSearch = new MiniSearch(miniSearchOptions);
  miniSearch.addAll(documents);

  return {
    version: SEARCH_INDEX_VERSION,
    documentCount: documents.length,
    index: miniSearch.toJSON(),
  };
}
