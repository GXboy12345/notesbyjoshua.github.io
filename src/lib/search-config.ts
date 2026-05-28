import type { Options as MiniSearchOptions, SearchOptions } from 'minisearch';

export const SEARCH_INDEX_VERSION = 1;

export const SEARCH_DOCUMENT_FIELDS = ['title', 'headings', 'labels', 'body', 'math'] as const;

export const SEARCH_STORE_FIELDS = ['title', 'url', 'excerpt', 'collection'] as const;

export const miniSearchOptions: MiniSearchOptions = {
  idField: 'id',
  fields: [...SEARCH_DOCUMENT_FIELDS],
  storeFields: [...SEARCH_STORE_FIELDS],
  tokenize: (string) =>
    string
      .split(/[\s\-_/]+/)
      .map((token) => token.trim())
      .filter((token) => token.length > 0),
  processTerm: (term) => term.toLowerCase(),
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
    boost: {
      title: 5,
      headings: 3,
      labels: 2.5,
      math: 1.75,
      body: 1,
    },
    combineWith: 'AND',
  },
};

export const headerSearchOptions: SearchOptions = {
  ...miniSearchOptions.searchOptions,
};

export const pageSearchOptions: SearchOptions = {
  ...miniSearchOptions.searchOptions,
  fuzzy: 0.25,
};

export const HEADER_RESULT_LIMIT = 8;
export const PAGE_RESULT_LIMIT = 100;
