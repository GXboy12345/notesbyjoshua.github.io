import MiniSearch from 'minisearch';
import type { SearchOptions } from 'minisearch';
import { miniSearchOptions } from './search-config';
import type { SearchHit, SearchIndexPayload } from './search-types';

function snippet(text: string, query: string, radius = 56): string {
  const terms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  if (!terms.length) return text.slice(0, radius * 2);

  const lower = text.toLowerCase();
  let idx = -1;
  for (const term of terms) {
    const at = lower.indexOf(term);
    if (at !== -1 && (idx === -1 || at < idx)) idx = at;
  }
  if (idx === -1) return text.slice(0, radius * 2);

  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + radius);
  const chunk = text.slice(start, end).trim();
  return start > 0 ? `…${chunk}` : chunk;
}

export function loadSearchEngine(payload: SearchIndexPayload): MiniSearch {
  const json =
    typeof payload.index === 'string' ? payload.index : JSON.stringify(payload.index);
  return MiniSearch.loadJSON(json, miniSearchOptions);
}

export function searchIndex(
  engine: MiniSearch,
  rawQuery: string,
  limit: number,
  options?: SearchOptions,
): SearchHit[] {
  const q = rawQuery.trim();
  if (!q) return [];

  const results = engine.search(q, {
    ...miniSearchOptions.searchOptions,
    ...options,
  });

  return results.slice(0, limit).map((result) => ({
    id: String(result.id),
    title: String(result.title),
    url: String(result.url),
    excerpt: snippet(String(result.excerpt ?? ''), q),
    collection: String(result.collection ?? ''),
    score: result.score,
  }));
}

export function countMatches(
  engine: MiniSearch,
  rawQuery: string,
  options?: SearchOptions,
): number {
  const q = rawQuery.trim();
  if (!q) return 0;
  return engine.search(q, {
    ...miniSearchOptions.searchOptions,
    ...options,
  }).length;
}
