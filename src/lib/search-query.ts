import MiniSearch from 'minisearch';
import type { SearchResult } from 'minisearch';
import {
  HEADER_SEARCH_BOOST,
  MIN_AND_RESULTS,
  miniSearchOptions,
  SEARCH_BOOST,
  type SearchMode,
} from './search-config.ts';
import { fuzzyForHeaderTerm, fuzzyForLandingTerm, queryTerms } from './search-tokenize.ts';
import type { SearchHit, SearchIndexPayload, SearchSnippetBlock } from './search-types.ts';

type StoredSearchResult = SearchResult & {
  excerpt?: string;
};

let snippetMap: Record<string, SearchSnippetBlock[]> = {};

export function setSearchSnippets(snippets: Record<string, SearchSnippetBlock[]>): void {
  snippetMap = snippets;
}

function blockWeight(kind: SearchSnippetBlock['kind']): number {
  switch (kind) {
    case 'title':
      return 5;
    case 'heading':
      return 3.5;
    case 'label':
      return 3;
    case 'math':
      return 2.5;
    case 'body':
      return 1;
  }
}

function fallbackSnippet(text: string, terms: string[], radius = 56): string {
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

function renderSnippetBlock(block: SearchSnippetBlock, mode: SearchMode): string {
  if (block.kind === 'math') {
    const formula = block.displayMath ? `Formula: ${block.displayMath}` : 'Formula match';
    if (mode === 'header') return formula;
    const context = block.text && block.text !== 'Formula match' ? ` — ${block.text}` : '';
    return `${formula}${context}`;
  }

  if (block.heading && block.kind !== 'heading' && block.kind !== 'title') {
    return `${block.heading}: ${block.text}`;
  }

  return block.text;
}

export function pickSnippet(result: StoredSearchResult, rawQuery: string, mode: SearchMode): string {
  const blocks = snippetMap[String(result.id)] ?? [];
  const fallback = String(result.excerpt ?? '');
  const terms = queryTerms(rawQuery);

  if (!blocks.length) return fallbackSnippet(fallback, terms);

  let best: { block: SearchSnippetBlock; score: number } | null = null;

  for (const block of blocks) {
    const haystack = [
      block.text,
      block.heading ?? '',
      block.normalizedMath ?? '',
      block.displayMath ?? '',
    ]
      .join(' ')
      .toLowerCase();

    let score = 0;
    for (const term of terms) {
      if (haystack.includes(term)) score += 1;
    }
    score *= blockWeight(block.kind);

    if (!best || score > best.score) best = { block, score };
  }

  if (!best || best.score <= 0) return fallbackSnippet(fallback, terms);
  return renderSnippetBlock(best.block, mode);
}

function mergeResults(primary: StoredSearchResult[], fallback: StoredSearchResult[]): StoredSearchResult[] {
  const seen = new Set(primary.map((result) => result.id));
  const merged = [...primary];

  for (const result of fallback) {
    if (seen.has(result.id)) continue;
    merged.push({
      ...result,
      score: result.score * 0.72,
    });
  }

  return merged.sort((a, b) => b.score - a.score || String(a.title).localeCompare(String(b.title)));
}

function baseSearchOptions(mode: SearchMode) {
  return {
    boost: mode === 'header' ? HEADER_SEARCH_BOOST : SEARCH_BOOST,
    prefix: (term: string) => term.length >= (mode === 'header' ? 2 : 3),
    fuzzy: mode === 'header' ? fuzzyForHeaderTerm : fuzzyForLandingTerm,
  };
}

function runSearch(engine: MiniSearch, rawQuery: string, mode: SearchMode): StoredSearchResult[] {
  const q = rawQuery.trim();
  if (!q) return [];

  const options = baseSearchOptions(mode);
  const tokens = queryTerms(q);

  if (tokens.length <= 1) {
    return engine.search(q, {
      ...options,
      combineWith: 'OR',
    }) as StoredSearchResult[];
  }

  const andResults = engine.search(q, {
    ...options,
    combineWith: 'AND',
  }) as StoredSearchResult[];

  if (andResults.length >= MIN_AND_RESULTS[mode]) return andResults;

  const orResults = engine.search(q, {
    ...options,
    combineWith: 'OR',
    fuzzy: (term: string) => {
      const fuzzy = mode === 'header' ? fuzzyForHeaderTerm(term) : fuzzyForLandingTerm(term);
      if (mode === 'header' && fuzzy != null && term.length < 9) return null;
      return fuzzy;
    },
  }) as StoredSearchResult[];

  return mergeResults(andResults, orResults);
}

export function loadSearchEngine(payload: SearchIndexPayload): MiniSearch {
  setSearchSnippets(payload.snippets ?? {});
  const json =
    typeof payload.index === 'string' ? payload.index : JSON.stringify(payload.index);
  return MiniSearch.loadJSON(json, miniSearchOptions);
}

function toHit(result: StoredSearchResult, rawQuery: string, mode: SearchMode): SearchHit {
  return {
    id: String(result.id),
    title: String(result.title),
    url: String(result.url),
    excerpt: pickSnippet(result, rawQuery, mode),
    collection: String(result.collection ?? ''),
    score: result.score,
  };
}

export function searchIndex(
  engine: MiniSearch,
  rawQuery: string,
  limit: number,
  mode: SearchMode,
): SearchHit[] {
  return runSearch(engine, rawQuery, mode)
    .slice(0, limit)
    .map((result) => toHit(result, rawQuery, mode));
}

export function countMatches(engine: MiniSearch, rawQuery: string, mode: SearchMode): number {
  return runSearch(engine, rawQuery, mode).length;
}
