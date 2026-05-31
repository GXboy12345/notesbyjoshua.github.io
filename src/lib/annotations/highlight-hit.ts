import { reAnchorRecord } from './anchors';
import type { AnnotationRecord } from './types';

export function caretRangeFromPoint(x: number, y: number): Range | null {
  if (typeof document.caretRangeFromPoint === 'function') {
    return document.caretRangeFromPoint(x, y);
  }
  const pos = document.caretPositionFromPoint?.(x, y);
  if (!pos) return null;
  const range = document.createRange();
  range.setStart(pos.offsetNode, pos.offset);
  range.collapse(true);
  return range;
}

export function rangeContainsPoint(range: Range, x: number, y: number): boolean {
  const probe = caretRangeFromPoint(x, y);
  if (!probe) return false;
  try {
    return (
      range.compareBoundaryPoints(Range.END_TO_START, probe) <= 0 &&
      range.compareBoundaryPoints(Range.START_TO_END, probe) >= 0
    );
  } catch {
    return false;
  }
}

/** Topmost highlight wins when ranges overlap (most recently updated first). */
export function findHighlightAtPoint(
  article: HTMLElement,
  records: AnnotationRecord[],
  x: number,
  y: number,
): { record: AnnotationRecord; range: Range } | null {
  const highlights = records
    .filter((r) => r.kind === 'highlight' && !r.stale)
    .sort((a, b) => b.updatedAt - a.updatedAt);

  for (const record of highlights) {
    const { range, stale } = reAnchorRecord(article, record);
    if (!range || stale) continue;
    if (rangeContainsPoint(range, x, y)) {
      return { record, range: range.cloneRange() };
    }
  }
  return null;
}
