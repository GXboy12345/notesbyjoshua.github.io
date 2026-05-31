import type { AnnotationColor, AnnotationRecord } from './types';
import { reAnchorRecord } from './anchors';
import { clearPlaintextNotes, renderPlaintextNotes } from './plaintext-note';
import { escapeHtml } from './sanitize';

const HIGHLIGHT_REGISTRY = new Map<string, Highlight>();
const OVERLAY_ENTRIES: { id: string; color: string; range: Range; elements: HTMLElement[] }[] = [];
const SUPPRESSED_HIGHLIGHT_IDS = new Set<string>();
let dragPreviewEntry: { id: string; color: string; range: Range; elements: HTMLElement[] } | null = null;
let overlayLayer: HTMLElement | null = null;
let overlayArticle: HTMLElement | null = null;
let selectionHighlight: Highlight | null = null;
let layoutBound = false;

export function supportsCssHighlights(): boolean {
  return typeof CSS !== 'undefined' && 'highlights' in CSS;
}

function highlightName(color: string): string {
  return `annotation-${color}`;
}

function getOrCreateHighlight(color: string): Highlight {
  const name = highlightName(color);
  let h = HIGHLIGHT_REGISTRY.get(name);
  if (!h) {
    h = new Highlight();
    HIGHLIGHT_REGISTRY.set(name, h);
    if (supportsCssHighlights()) {
      CSS.highlights.set(name, h);
    }
  }
  return h;
}

function ensureSelectionHighlight(): Highlight | null {
  if (!supportsCssHighlights()) return null;
  if (!selectionHighlight) {
    selectionHighlight = new Highlight();
    CSS.highlights.set('annotation-selected', selectionHighlight);
  }
  return selectionHighlight;
}

export function setSelectedHighlightRange(range: Range | null): void {
  const h = ensureSelectionHighlight();
  if (!h) return;
  h.clear();
  if (range) {
    try {
      h.add(range);
    } catch {
      /* invalid range */
    }
  }
}

function ensureOverlayLayer(article: HTMLElement): HTMLElement {
  if (overlayLayer && overlayArticle === article) return overlayLayer;
  overlayLayer?.remove();
  overlayLayer = document.createElement('div');
  overlayLayer.className = 'annotation-hl-layer';
  overlayLayer.setAttribute('aria-hidden', 'true');
  article.appendChild(overlayLayer);
  overlayArticle = article;
  bindOverlayLayout();
  return overlayLayer;
}

function relayoutOverlays(): void {
  for (const entry of OVERLAY_ENTRIES) {
    relayoutOverlayEntry(entry);
  }
  relayoutDragPreviewEntry();
}

function relayoutOverlayEntry(entry: {
  id: string;
  color: string;
  range: Range;
  elements: HTMLElement[];
}): void {
  const rects = [...entry.range.getClientRects()].filter((r) => r.width || r.height);
  while (entry.elements.length < rects.length) {
    const el = document.createElement('div');
    el.className = `annotation-hl-overlay annotation-hl-overlay--${entry.color}`;
    el.dataset.annotationId = entry.id;
    overlayLayer?.appendChild(el);
    entry.elements.push(el);
  }
  while (entry.elements.length > rects.length) {
    entry.elements.pop()?.remove();
  }
  for (let i = 0; i < rects.length; i += 1) {
    layoutOverlayRect(entry.elements[i], rects[i]);
  }
}

function relayoutDragPreviewEntry(): void {
  if (!dragPreviewEntry) return;
  const entry = dragPreviewEntry;
  const rects = [...entry.range.getClientRects()].filter((r) => r.width || r.height);
  while (entry.elements.length < rects.length) {
    const el = document.createElement('div');
    el.className = `annotation-hl-overlay annotation-hl-overlay--${entry.color} annotation-hl-overlay--drag-preview`;
    el.dataset.annotationId = entry.id;
    overlayLayer?.appendChild(el);
    entry.elements.push(el);
  }
  while (entry.elements.length > rects.length) {
    entry.elements.pop()?.remove();
  }
  for (let i = 0; i < rects.length; i += 1) {
    layoutOverlayRect(entry.elements[i], rects[i]);
  }
}

function bindOverlayLayout(): void {
  if (layoutBound) return;
  layoutBound = true;
  window.addEventListener('scroll', relayoutOverlays, true);
  window.addEventListener('resize', relayoutOverlays);
}

function layoutOverlayRect(el: HTMLElement, rect: DOMRect): void {
  el.style.position = 'fixed';
  el.style.top = `${rect.top}px`;
  el.style.left = `${rect.left}px`;
  el.style.width = `${rect.width}px`;
  el.style.height = `${rect.height}px`;
}

function applyOverlayHighlight(article: HTMLElement, range: Range, id: string, color: string): void {
  const layer = ensureOverlayLayer(article);
  const entry = { id, color, range: range.cloneRange(), elements: [] as HTMLElement[] };
  OVERLAY_ENTRIES.push(entry);
  const rects = [...range.getClientRects()].filter((r) => r.width || r.height);
  for (const rect of rects) {
    const el = document.createElement('div');
    el.className = `annotation-hl-overlay annotation-hl-overlay--${color}`;
    el.dataset.annotationId = id;
    layoutOverlayRect(el, rect);
    layer.appendChild(el);
    entry.elements.push(el);
  }
}

export function setHighlightSuppressed(id: string, suppressed: boolean): void {
  if (suppressed) SUPPRESSED_HIGHLIGHT_IDS.add(id);
  else SUPPRESSED_HIGHLIGHT_IDS.delete(id);
}

export function isHighlightSuppressed(id: string): boolean {
  return SUPPRESSED_HIGHLIGHT_IDS.has(id);
}

/** Live preview while resize handles drag — updates in place without full page re-render. */
export function updateDragPreview(
  article: HTMLElement,
  recordId: string,
  range: Range,
  color: string,
): void {
  setHighlightSuppressed(recordId, true);
  ensureOverlayLayer(article);

  if (!dragPreviewEntry || dragPreviewEntry.id !== recordId) {
    clearDragPreviewElements();
    dragPreviewEntry = { id: recordId, color, range: range.cloneRange(), elements: [] };
  } else {
    dragPreviewEntry.range = range.cloneRange();
    dragPreviewEntry.color = color;
  }

  relayoutDragPreviewEntry();
}

export function clearDragPreview(recordId?: string): void {
  if (recordId) setHighlightSuppressed(recordId, false);
  else if (dragPreviewEntry) setHighlightSuppressed(dragPreviewEntry.id, false);
  clearDragPreviewElements();
  dragPreviewEntry = null;
}

function clearDragPreviewElements(): void {
  dragPreviewEntry?.elements.forEach((el) => el.remove());
  if (dragPreviewEntry) dragPreviewEntry.elements.length = 0;
}

/** Re-apply stored highlights without touching drag preview or notes. */
export function refreshPersistedHighlights(article: HTMLElement, records: AnnotationRecord[]): void {
  for (const h of HIGHLIGHT_REGISTRY.values()) {
    h.clear();
  }
  for (const entry of OVERLAY_ENTRIES) {
    for (const el of entry.elements) el.remove();
  }
  OVERLAY_ENTRIES.length = 0;

  const highlights = records.filter((r) => r.kind === 'highlight');
  for (const record of highlights) {
    if (SUPPRESSED_HIGHLIGHT_IDS.has(record.id)) continue;
    const { range, stale } = reAnchorRecord(article, record);
    const color = record.color ?? 'amber';
    const isTextNote = Boolean(record.comment?.trim() && record.anchor.kind === 'text');
    if (range && !stale && !isTextNote) {
      applyHighlightRange(article, range, record.id, color);
    }
  }
}

export function clearRenderedHighlights(): void {
  clearDragPreview();
  for (const h of HIGHLIGHT_REGISTRY.values()) {
    h.clear();
  }
  for (const entry of OVERLAY_ENTRIES) {
    for (const el of entry.elements) el.remove();
  }
  OVERLAY_ENTRIES.length = 0;
  SUPPRESSED_HIGHLIGHT_IDS.clear();
  overlayLayer?.remove();
  overlayLayer = null;
  overlayArticle = null;
  selectionHighlight?.clear();
  clearPlaintextNotes();
  document.querySelectorAll('.annotation-stale-badge').forEach((el) => el.remove());
  document.querySelectorAll('.annotation-on-page-note').forEach((el) => el.remove());
}

function rangeToElement(range: Range): HTMLElement | null {
  const node = range.startContainer;
  const el = node.nodeType === Node.ELEMENT_NODE ? (node as Element) : node.parentElement;
  return (el as HTMLElement | null) ?? null;
}

function applyHighlightRange(article: HTMLElement, range: Range, id: string, color: string): boolean {
  if (supportsCssHighlights()) {
    try {
      getOrCreateHighlight(color).add(range);
      return true;
    } catch {
      /* fall through to overlay */
    }
  }
  try {
    applyOverlayHighlight(article, range, id, color);
    return true;
  } catch {
    return false;
  }
}

export function renderHighlightsOnPage(
  article: HTMLElement,
  records: AnnotationRecord[],
  selectedId?: string | null,
): void {
  clearRenderedHighlights();
  const highlights = records.filter((r) => r.kind === 'highlight');
  let selectedRange: Range | null = null;

  for (const record of highlights) {
    if (SUPPRESSED_HIGHLIGHT_IDS.has(record.id)) continue;

    const { range, stale, element } = reAnchorRecord(article, record);
    const color = record.color ?? 'amber';
    const isTextNote = Boolean(record.comment?.trim() && record.anchor.kind === 'text');

    if (range && !stale && !isTextNote) {
      applyHighlightRange(article, range, record.id, color);
      if (selectedId === record.id) {
        selectedRange = range.cloneRange();
      }
    } else if (range && !stale && isTextNote && selectedId === record.id) {
      selectedRange = range.cloneRange();
    }

    const badgeTarget = element ?? (range ? rangeToElement(range) : null);
    if (stale && badgeTarget) {
      attachStaleBadge(badgeTarget, record.id);
    }
  }

  renderPlaintextNotes(
    article,
    highlights.filter(
      (r) => r.comment?.trim() && r.anchor.kind === 'text' && !SUPPRESSED_HIGHLIGHT_IDS.has(r.id),
    ),
  );

  if (selectedRange) {
    setSelectedHighlightRange(selectedRange);
  }

  for (const record of records.filter((r) => r.kind === 'bookmark')) {
    const { stale, element } = reAnchorRecord(article, record);
    if (stale && element) {
      attachStaleBadge(element, record.id);
    }
    if (record.comment && element && !stale) {
      attachOnPageNote(element, record);
    }
  }
}

function attachOnPageNote(target: HTMLElement | null, record: AnnotationRecord): void {
  if (!target || !record.comment) return;
  const host =
    target.closest<HTMLElement>('[data-poi-id]') ??
    target.closest<HTMLElement>('h2[id], h3[id]') ??
    target;
  if (host.querySelector(`[data-note-for="${record.id}"]`)) return;

  const note = document.createElement('div');
  note.className = 'annotation-on-page-note';
  note.dataset.noteFor = record.id;
  note.innerHTML = `
    <span class="annotation-on-page-note__label">Note</span>
    <p class="annotation-on-page-note__body" data-block-note-body="${escapeHtml(record.id)}">${escapeHtml(record.comment)}</p>
    <textarea class="annotation-on-page-note__edit" hidden rows="3" maxlength="4096" data-block-note-input="${escapeHtml(record.id)}">${escapeHtml(record.comment)}</textarea>
    <div class="annotation-on-page-note__actions">
      <button type="button" class="annotation-on-page-note__btn" data-block-note-edit="${escapeHtml(record.id)}">Edit</button>
      <button type="button" class="annotation-on-page-note__btn annotation-on-page-note__btn--danger" data-block-note-remove="${escapeHtml(record.id)}">Remove</button>
      <button type="button" class="annotation-on-page-note__btn" data-block-note-save="${escapeHtml(record.id)}" hidden>Save</button>
      <button type="button" class="annotation-on-page-note__btn" data-block-note-cancel="${escapeHtml(record.id)}" hidden>Cancel</button>
    </div>
  `;
  host.appendChild(note);
}

export function attachStaleBadge(target: HTMLElement, id: string): void {
  if (target.querySelector(`[data-stale-for="${id}"]`)) return;
  const badge = document.createElement('span');
  badge.className = 'annotation-stale-badge';
  badge.dataset.staleFor = id;
  badge.setAttribute('role', 'img');
  badge.setAttribute('aria-label', 'Annotation does not match current content version.');
  badge.title = 'Annotation does not match current content version.';
  badge.textContent = '!';
  const pos = getComputedStyle(target).position;
  if (pos === 'static') target.style.position = 'relative';
  target.appendChild(badge);
}

export function highlightCssRegistered(): void {
  if (!supportsCssHighlights()) return;
  for (const color of ['amber', 'sage', 'sky', 'rose', 'lavender', 'graphite'] as AnnotationColor[]) {
    getOrCreateHighlight(color);
  }
  ensureSelectionHighlight();
}

/** Client rects for handle placement (multi-line safe). */
export function rangeEndpointRects(range: Range): { start: DOMRect; end: DOMRect } | null {
  const rects = [...range.getClientRects()].filter((r) => r.width || r.height);
  if (!rects.length) return null;
  return { start: rects[0], end: rects[rects.length - 1] };
}
