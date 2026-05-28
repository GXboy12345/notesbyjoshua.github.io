export type SearchRecord = {
  title: string;
  url: string;
  excerpt: string;
  text: string;
};

export type SearchHit = SearchRecord & {
  score: number;
};
