import type { Options as MiniSearchOptions } from 'minisearch';
import {
  fuzzyForHeaderTerm,
  fuzzyForLandingTerm,
  processSearchTerm,
  tokenizeSearchText,
} from './search-tokenize.ts';

export const SEARCH_INDEX_VERSION = 2;

export const SEARCH_DOCUMENT_FIELDS = ['title', 'headings', 'labels', 'body', 'math'] as const;

export const SEARCH_STORE_FIELDS = ['title', 'url', 'excerpt', 'collection'] as const;

export const SEARCH_BOOST = {
  title: 7.5,
  headings: 4,
  labels: 3.25,
  math: 2.25,
  body: 1,
} as const;

export const HEADER_SEARCH_BOOST = {
  title: 10,
  headings: 5,
  labels: 4,
  math: 2.25,
  body: 1,
} as const;

export const MIN_AND_RESULTS = {
  header: 4,
  landing: 12,
} as const;

export type SearchMode = 'header' | 'landing';

export const miniSearchOptions: MiniSearchOptions = {
  idField: 'id',
  fields: [...SEARCH_DOCUMENT_FIELDS],
  storeFields: [...SEARCH_STORE_FIELDS],
  tokenize: tokenizeSearchText,
  processTerm: processSearchTerm,
  searchOptions: {
    boost: SEARCH_BOOST,
    prefix: (term: string) => term.length >= 3,
    fuzzy: fuzzyForLandingTerm,
    combineWith: 'AND',
  },
};

export const HEADER_RESULT_LIMIT = 8;
export const PAGE_RESULT_LIMIT = 100;
