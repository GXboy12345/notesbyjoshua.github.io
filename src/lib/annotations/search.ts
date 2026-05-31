import MiniSearch from 'minisearch';
import type { AnnotationRecord } from './types';
import { listAllAnnotations } from './db';
import { queryTerms } from '../search-tokenize';

export type LibrarySearchHit = {
  id: string;
  score: number;
  record: AnnotationRecord;
};

let engine: MiniSearch<AnnotationRecord> | null = null;
let enginePromise: Promise<MiniSearch<AnnotationRecord>> | null = null;

function searchDoc(record: AnnotationRecord): AnnotationRecord & { searchText: string } {
  const quote = record.anchor.quote?.exact ?? '';
  const block = record.anchor.blockLabel ?? '';
  const heading = record.anchor.headingText ?? '';
  const searchText = [
    record.anchor.pageTitle,
    heading,
    block,
    quote,
    record.comment ?? '',
  ]
    .filter(Boolean)
    .join('\n');

  return Object.assign({}, record, { searchText });
}

export async function loadLibrarySearchEngine(): Promise<MiniSearch<AnnotationRecord>> {
  if (engine) return engine;
  if (!enginePromise) {
    enginePromise = (async () => {
      const records = await listAllAnnotations();
      const ms = new MiniSearch({
        fields: ['searchText', 'anchor.pageTitle', 'comment'],
        storeFields: [
          'id',
          'kind',
          'anchor',
          'color',
          'comment',
          'createdAt',
          'updatedAt',
          'stale',
        ],
        searchOptions: {
          prefix: true,
          fuzzy: 0.15,
          boost: { searchText: 2, comment: 1.5, 'anchor.pageTitle': 1.2 },
        },
      });
      ms.addAll(records.map(searchDoc) as (AnnotationRecord & { searchText: string })[]);
      engine = ms;
      return ms;
    })();
  }
  return enginePromise;
}

export async function rebuildLibrarySearchIndex(): Promise<void> {
  engine = null;
  enginePromise = null;
  await loadLibrarySearchEngine();
}

export async function searchLibrary(
  query: string,
  limit = 50,
  filter?: { kind?: 'highlight' | 'bookmark'; stale?: boolean },
): Promise<LibrarySearchHit[]> {
  const ms = await loadLibrarySearchEngine();
  const terms = queryTerms(query);
  let records: AnnotationRecord[];

  if (!terms.length) {
    records = await listAllAnnotations();
  } else {
    const hits = ms.search(terms.join(' '), { combineWith: 'AND' });
    const all = await listAllAnnotations();
    const byId = new Map(all.map((r) => [r.id, r]));
    records = hits.map((h) => byId.get(String(h.id))).filter((r): r is AnnotationRecord => !!r);
  }

  if (filter?.kind) records = records.filter((r) => r.kind === filter.kind);
  if (filter?.stale === true) records = records.filter((r) => r.stale);
  if (filter?.stale === false) records = records.filter((r) => !r.stale);

  return records.slice(0, limit).map((record, i) => ({
    id: record.id,
    score: limit - i,
    record,
  }));
}

export function excerptForRecord(record: AnnotationRecord): string {
  if (record.comment) return record.comment;
  if (record.anchor.quote?.exact) return record.anchor.quote.exact;
  if (record.anchor.blockLabel) return record.anchor.blockLabel;
  if (record.anchor.headingText) return record.anchor.headingText;
  if (record.anchor.kind === 'page') return 'Page bookmark';
  return record.kind === 'highlight' ? 'Highlight' : 'Bookmark';
}

/** Primary preview line for library cards (quote/block context, not the user note). */
export function previewTextForRecord(record: AnnotationRecord): string {
  if (record.kind === 'highlight' && record.anchor.quote?.exact) {
    return record.anchor.quote.exact;
  }
  if (record.anchor.blockLabel) return record.anchor.blockLabel;
  if (record.anchor.headingText) return record.anchor.headingText;
  if (record.anchor.kind === 'page') return 'Page bookmark';
  return record.kind === 'highlight' ? 'Highlight' : 'Bookmark';
}
