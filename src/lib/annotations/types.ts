export type AnnotationKind = 'highlight' | 'bookmark';
export type AnchorKind = 'text' | 'heading' | 'block' | 'page';

export type TextQuoteSelector = {
  exact: string;
  prefix?: string;
  suffix?: string;
};

export type TextPositionSelector = {
  start: number;
  end: number;
};

export type AnnotationAnchor = {
  kind: AnchorKind;
  pageId: string;
  pageTitle: string;
  contentHashAtCreate: string;
  headingId?: string;
  headingText?: string;
  poiId?: string;
  blockKind?: string;
  blockLabel?: string;
  quote?: TextQuoteSelector;
  position?: TextPositionSelector;
};

export type AnnotationRecord = {
  id: string;
  kind: AnnotationKind;
  anchor: AnnotationAnchor;
  /** Denormalized for IndexedDB queries — always mirror anchor.pageId. */
  pageId: string;
  color?: string;
  comment?: string;
  createdAt: number;
  updatedAt: number;
  stale?: boolean;
};

export type AnnotationTombstone = {
  id: string;
  deletedAt: number;
};

export type AnnotationExportV1 = {
  schemaVersion: 1;
  exportedAt: number;
  site: 'notesbyjoshua';
  annotations: AnnotationRecord[];
  tombstones?: AnnotationTombstone[];
};

export type ImportMergeResult = {
  added: number;
  updated: number;
  skipped: number;
  conflicts: number;
};

export const ANNOTATION_COLORS = [
  'amber',
  'sage',
  'sky',
  'rose',
  'lavender',
  'graphite',
] as const;

export type AnnotationColor = (typeof ANNOTATION_COLORS)[number];

export const DEFAULT_ANNOTATION_COLOR: AnnotationColor = 'amber';

export const MAX_COMMENT_LENGTH = 4096;

export const ANNOTATIONS_CHANGED = 'annotations:changed';

export type AnnotationPageMeta = {
  pageId: string;
  pageTitle: string;
  contentHash: string;
};
