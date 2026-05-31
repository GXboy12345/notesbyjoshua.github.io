import type { AnnotationExportV1, AnnotationRecord, ImportMergeResult } from './types';
import { sanitizeComment } from './sanitize';
import { MAX_COMMENT_LENGTH } from './types';
import { getAnnotationsDb, listTombstones, putAnnotation, recordImportAudit } from './db';

function payloadEqual(a: AnnotationRecord, b: AnnotationRecord): boolean {
  return (
    a.kind === b.kind &&
    a.color === b.color &&
    a.comment === b.comment &&
    JSON.stringify(a.anchor) === JSON.stringify(b.anchor)
  );
}

function sanitizeRecord(raw: unknown): AnnotationRecord | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as AnnotationRecord;
  if (typeof r.id !== 'string' || typeof r.kind !== 'string') return null;
  if (r.kind !== 'highlight' && r.kind !== 'bookmark') return null;
  if (!r.anchor || typeof r.anchor !== 'object') return null;
  if (typeof r.anchor.pageId !== 'string') return null;
  if (typeof r.createdAt !== 'number' || typeof r.updatedAt !== 'number') return null;
  const comment =
    typeof r.comment === 'string' ? sanitizeComment(r.comment).slice(0, MAX_COMMENT_LENGTH) : undefined;
  return {
    id: r.id,
    kind: r.kind,
    anchor: r.anchor,
    pageId: r.anchor.pageId,
    color: typeof r.color === 'string' ? r.color : undefined,
    comment,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
    stale: Boolean(r.stale),
  };
}

export async function exportAnnotationsJson(): Promise<AnnotationExportV1> {
  const db = getAnnotationsDb();
  const annotations = await db.annotations.toArray();
  const tombstones = await db.tombstones.toArray();
  return {
    schemaVersion: 1,
    exportedAt: Date.now(),
    site: 'notesbyjoshua',
    annotations,
    tombstones,
  };
}

export function downloadExport(data: AnnotationExportV1): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `notes-annotations-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importAnnotationsJson(
  file: File,
): Promise<ImportMergeResult> {
  const text = await file.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('Invalid JSON file');
  }

  const envelope = parsed as AnnotationExportV1;
  if (envelope.schemaVersion !== 1 || !Array.isArray(envelope.annotations)) {
    throw new Error('Unsupported annotation export format');
  }

  const tombstoneIds = new Set((await listTombstones()).map((t) => t.id));
  for (const t of envelope.tombstones ?? []) {
    if (t?.id) tombstoneIds.add(t.id);
  }

  const db = getAnnotationsDb();
  const result: ImportMergeResult = { added: 0, updated: 0, skipped: 0, conflicts: 0 };

  await db.transaction('rw', db.annotations, db.tombstones, async () => {
    for (const raw of envelope.annotations) {
      const incoming = sanitizeRecord(raw);
      if (!incoming) {
        result.skipped += 1;
        continue;
      }
      if (tombstoneIds.has(incoming.id)) {
        result.skipped += 1;
        continue;
      }

      const existing = await db.annotations.get(incoming.id);
      if (!existing) {
        await putAnnotation({ ...incoming, stale: true });
        result.added += 1;
        continue;
      }

      if (payloadEqual(existing, incoming)) {
        result.skipped += 1;
        continue;
      }

      if (incoming.updatedAt > existing.updatedAt) {
        await putAnnotation({ ...incoming, stale: true });
        result.updated += 1;
      } else if (existing.updatedAt > incoming.updatedAt) {
        result.skipped += 1;
      } else {
        await putAnnotation({ ...incoming, stale: true });
        result.conflicts += 1;
        result.updated += 1;
      }
    }

    for (const t of envelope.tombstones ?? []) {
      if (t?.id) await db.tombstones.put(t);
    }
  });

  await recordImportAudit(result);
  return result;
}

export function formatImportToast(result: ImportMergeResult): string {
  const parts: string[] = ['Import complete'];
  if (result.added) parts.push(`+${result.added}`);
  if (result.updated) parts.push(`~${result.updated}`);
  if (result.skipped) parts.push(`${result.skipped} skipped`);
  if (result.conflicts) {
    parts.push(`${result.conflicts} conflict${result.conflicts === 1 ? '' : 's'} could not be auto-resolved`);
  }
  return `${parts.join(': ')}.`;
}
