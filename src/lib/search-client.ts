import MiniSearch from 'minisearch';
import type { SearchMode } from './search-config';
import { p } from './paths';
import { countMatches, loadSearchEngine, searchIndex } from './search-query';
import type { SearchHit, SearchIndexPayload } from './search-types';

let enginePromise: Promise<MiniSearch | null> | null = null;

export function loadSearchEngineClient(): Promise<MiniSearch | null> {
  if (!enginePromise) {
    enginePromise = fetch(p('search-index.json'))
      .then((res) => {
        if (!res.ok) throw new Error(`search index ${res.status}`);
        return res.json() as Promise<SearchIndexPayload>;
      })
      .then((payload) => loadSearchEngine(payload))
      .catch(() => null);
  }
  return enginePromise;
}

export function preloadSearchIndex(): void {
  void loadSearchEngineClient();
}

export async function querySearch(
  query: string,
  limit: number,
  mode: SearchMode,
): Promise<{ engine: MiniSearch | null; hits: SearchHit[]; total: number }> {
  const engine = await loadSearchEngineClient();
  if (!engine) return { engine: null, hits: [], total: 0 };

  const hits = searchIndex(engine, query, limit, mode);
  const total = countMatches(engine, query, mode);
  return { engine, hits, total };
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function highlight(text: string, query: string): string {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return escapeHtml(text);

  const pattern = new RegExp(
    `(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi',
  );
  return escapeHtml(text).replace(pattern, '<mark>$1</mark>');
}

export function searchPageUrl(query: string): string {
  const q = query.trim();
  if (!q) return p('search/');
  return `${p('search/')}?q=${encodeURIComponent(q)}`;
}
