import Dexie, { type Table } from 'dexie';
import type { AnnotationRecord, AnnotationTombstone, AnnotationsChangedDetail, ImportMergeResult } from './types';
import { ANNOTATIONS_CHANGED } from './types';

export type MetaRow = { key: string; value: string };

export type ImportAuditRow = {
  id: string;
  importedAt: number;
  added: number;
  updated: number;
  skipped: number;
  conflicts: number;
};

class AnnotationsDb extends Dexie {
  annotations!: Table<AnnotationRecord, string>;
  meta!: Table<MetaRow, string>;
  tombstones!: Table<AnnotationTombstone, string>;
  imports!: Table<ImportAuditRow, string>;

  constructor() {
    super('notesbyjoshua.annotations.v1');
    this.version(1).stores({
      annotations: 'id, pageId, updatedAt, kind, stale',
      meta: 'key',
      tombstones: 'id, deletedAt',
      imports: 'id, importedAt',
    });
  }
}

let dbInstance: AnnotationsDb | null = null;
let repairPromise: Promise<void> | null = null;

export function getAnnotationsDb(): AnnotationsDb {
  if (!dbInstance) dbInstance = new AnnotationsDb();
  return dbInstance;
}

export function normalizeStoredPageId(pageId: string): string {
  if (!pageId) return '/';
  return pageId.endsWith('/') ? pageId : `${pageId}/`;
}

function withPageId(record: AnnotationRecord): AnnotationRecord {
  return { ...record, pageId: normalizeStoredPageId(record.anchor.pageId) };
}

/** Backfill pageId on rows written before denormalization was enforced. */
export async function repairAnnotationPageIds(): Promise<void> {
  if (!repairPromise) {
    repairPromise = (async () => {
      const db = getAnnotationsDb();
      const all = await db.annotations.toArray();
      const fixes = all.filter((row) => !row.pageId && row.anchor?.pageId);
      if (!fixes.length) return;
      await db.transaction('rw', db.annotations, async () => {
        for (const row of fixes) {
          await db.annotations.put(withPageId(row));
        }
      });
    })();
  }
  return repairPromise;
}

export async function getMeta(key: string): Promise<string | null> {
  const row = await getAnnotationsDb().meta.get(key);
  return row?.value ?? null;
}

export async function setMeta(key: string, value: string): Promise<void> {
  await getAnnotationsDb().meta.put({ key, value });
}

export async function listAnnotationsForPage(pageId: string): Promise<AnnotationRecord[]> {
  await repairAnnotationPageIds();
  const norm = normalizeStoredPageId(pageId);
  const indexed = await getAnnotationsDb().annotations.where('pageId').equals(norm).toArray();
  if (indexed.length) return indexed;

  const all = await getAnnotationsDb().annotations.toArray();
  return all.filter((row) => normalizeStoredPageId(row.anchor.pageId) === norm);
}

export async function listAllAnnotations(): Promise<AnnotationRecord[]> {
  await repairAnnotationPageIds();
  return getAnnotationsDb().annotations.orderBy('updatedAt').reverse().toArray();
}

export async function getAnnotation(id: string): Promise<AnnotationRecord | undefined> {
  return getAnnotationsDb().annotations.get(id);
}

export async function putAnnotation(record: AnnotationRecord): Promise<void> {
  await getAnnotationsDb().annotations.put(withPageId(record));
}

export async function deleteAnnotation(id: string): Promise<void> {
  const db = getAnnotationsDb();
  await db.annotations.delete(id);
  await db.tombstones.put({ id, deletedAt: Date.now() });
}

export async function listTombstones(): Promise<AnnotationTombstone[]> {
  return getAnnotationsDb().tombstones.toArray();
}

export async function recordImportAudit(result: ImportMergeResult): Promise<void> {
  await getAnnotationsDb().imports.put({
    id: crypto.randomUUID(),
    importedAt: Date.now(),
    ...result,
  });
}

export function emitAnnotationsChanged(detail?: AnnotationsChangedDetail): void {
  document.dispatchEvent(new CustomEvent(ANNOTATIONS_CHANGED, { detail }));
}
