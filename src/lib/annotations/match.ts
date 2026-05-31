import type { AnnotationAnchor, AnnotationRecord } from './types';
import { listAnnotationsForPage } from './db';

export function anchorKey(anchor: AnnotationAnchor): string {
  if (anchor.kind === 'page') return `page:${anchor.pageId}`;
  if (anchor.kind === 'heading') return `heading:${anchor.pageId}:${anchor.headingId ?? ''}`;
  if (anchor.kind === 'block') return `block:${anchor.pageId}:${anchor.poiId ?? ''}`;
  if (anchor.kind === 'text') {
    const pos = anchor.position
      ? `${anchor.position.start}-${anchor.position.end}`
      : anchor.quote?.exact ?? '';
    return `text:${anchor.pageId}:${pos}`;
  }
  return `${anchor.kind}:${anchor.pageId}`;
}

export async function findBookmarksByAnchor(
  anchor: AnnotationAnchor,
): Promise<AnnotationRecord[]> {
  const records = await listAnnotationsForPage(anchor.pageId);
  const key = anchorKey(anchor);
  return records.filter((r) => r.kind === 'bookmark' && anchorKey(r.anchor) === key);
}

export async function findBookmarkByAnchor(
  anchor: AnnotationAnchor,
): Promise<AnnotationRecord | undefined> {
  const matches = await findBookmarksByAnchor(anchor);
  return matches[0];
}
