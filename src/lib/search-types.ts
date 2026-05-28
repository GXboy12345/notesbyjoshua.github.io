export type SearchRecord = {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  collection: string;
  headings: string;
  labels: string;
  body: string;
  math: string;
};

export type SearchHit = {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  collection: string;
  score: number;
};

export type SearchIndexPayload = {
  version: number;
  documentCount: number;
  index: Record<string, unknown>;
};
