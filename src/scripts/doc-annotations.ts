import {
  anchorFromBlock,
  anchorFromHeading,
  anchorFromPage,
  anchorFromTextRange,
  readPageMeta,
  reAnchorRecord,
  scrollTargetForRecord,
} from '../lib/annotations/anchors';
import {
  deleteAnnotation,
  emitAnnotationsChanged,
  getAnnotation,
  getMeta,
  listAnnotationsForPage,
  putAnnotation,
  repairAnnotationPageIds,
  setMeta,
} from '../lib/annotations/db';
import { findBookmarkByAnchor, findBookmarksByAnchor } from '../lib/annotations/match';
import { findHighlightAtPoint, caretRangeFromPoint, rangeContainsPoint } from '../lib/annotations/highlight-hit';
import { MARK_ICON, NOTE_ICON } from '../lib/annotations/icons';
import {
  collapseAllPlaintextNotes,
  clearPlaintextNotes,
  enterPlaintextNoteEdit,
  expandPlaintextNote,
  expandedPlaintextNoteId,
  getPlaintextNoteEntry,
  readPlaintextNoteDraft,
  registerPlaintextNoteFallbackRange,
  relayoutPlaintextNotes,
  scheduleFlyInPlaintextNote,
  updatePlaintextNoteBody,
  updatePlaintextNoteRange,
} from '../lib/annotations/plaintext-note';
import {
  clearDragPreview,
  clearRenderedHighlights,
  highlightCssRegistered,
  rangeEndpointRects,
  refreshPersistedHighlights,
  renderHighlightsOnPage,
  setHighlightSuppressed,
  setSelectedHighlightRange,
  updateDragPreview,
} from '../lib/annotations/render';
import { rebuildLibrarySearchIndex } from '../lib/annotations/search';
import {
  ANNOTATIONS_CHANGED,
  ANNOTATION_COLORS,
  DEFAULT_ANNOTATION_COLOR,
  type AnnotationAnchor,
  type AnnotationColor,
  type AnnotationRecord,
} from '../lib/annotations/types';
import { selectionInsideBlockedSubtree } from '../lib/annotations/text-stream';
import { normalizePlainText } from '../lib/annotations/sanitize';
import { p } from '../lib/paths';

type CommentSaveHandler = (text: string, range: Range | null) => void;

let toolbarEl: HTMLElement | null = null;
let editToolbarEl: HTMLElement | null = null;
let handleLayerEl: HTMLElement | null = null;
let commentDialogEl: HTMLDialogElement | null = null;
let commentDialogTextarea: HTMLTextAreaElement | null = null;
let commentDialogSaveHandler: CommentSaveHandler | null = null;
let commentDialogCapturedRange: Range | null = null;
let toastEl: HTMLElement | null = null;
let selectionTimer = 0;
let bound = false;
let pendingAnnId: string | null = null;
let savedSelectionRange: Range | null = null;
let lastSelectionToolbarRect: DOMRect | null = null;
let commentPopoverMode: 'selection' | 'poi' | null = null;
let openPoiBlock: HTMLElement | null = null;
let keepPopoverOpen = false;
let toolbarPointerPending = false;
let selectedHighlight: { record: AnnotationRecord; range: Range } | null = null;
let pageRecordsCache: AnnotationRecord[] = [];
let handleDrag: {
  edge: 'start' | 'end';
  range: Range;
  recordId: string;
} | null = null;
let startHandleEl: HTMLButtonElement | null = null;
let endHandleEl: HTMLButtonElement | null = null;
let handleDragActive = false;

function proseArticle(): HTMLElement | null {
  return document.querySelector<HTMLElement>('article.prose[data-annotation-root]');
}

function newRecord(
  partial: Omit<AnnotationRecord, 'pageId'> & { anchor: AnnotationAnchor },
): AnnotationRecord {
  return { ...partial, pageId: partial.anchor.pageId };
}

function ensureToastHost(): HTMLElement {
  if (toastEl?.isConnected) return toastEl;
  toastEl = document.createElement('div');
  toastEl.className = 'annotation-toast-host';
  toastEl.setAttribute('aria-live', 'polite');
  document.body.appendChild(toastEl);
  return toastEl;
}

export function showAnnotationToast(message: string, durationMs = 5000): void {
  const host = ensureToastHost();
  const node = document.createElement('div');
  node.className = 'annotation-toast';
  node.textContent = message;
  host.appendChild(node);
  window.setTimeout(() => node.remove(), durationMs);
}

async function maybeFirstUseToast(): Promise<void> {
  const seen = await getMeta('firstAnnotationToastSeen');
  if (seen === '1') return;
  await setMeta('firstAnnotationToastSeen', '1');
  showAnnotationToast(
    'Annotations are saved in this browser only. Clearing site data will erase them.',
    8000,
  );
}

async function persistRecord(record: AnnotationRecord, options?: { emit?: boolean }): Promise<void> {
  await putAnnotation(record);
  await rebuildLibrarySearchIndex();
  if (options?.emit !== false) emitAnnotationsChanged();
  void maybeFirstUseToast();
}

async function updateStaleFlags(article: HTMLElement, records: AnnotationRecord[]): Promise<AnnotationRecord[]> {
  const meta = readPageMeta(article);
  const updated: AnnotationRecord[] = [];
  for (const record of records) {
    const { stale, element } = reAnchorRecord(article, record);
    const hashStale = meta.contentHash !== record.anchor.contentHashAtCreate;
    let nextStale = hashStale;
    if (record.anchor.kind === 'block' || record.anchor.kind === 'heading') {
      nextStale = hashStale || (stale && !element);
    }
    if (record.stale !== nextStale) {
      const patched = { ...record, stale: nextStale };
      await putAnnotation(patched);
      updated.push(patched);
    } else {
      updated.push(record);
    }
  }
  return updated;
}

async function refreshPageAnnotations(): Promise<void> {
  const article = proseArticle();
  if (!article) return;
  await repairAnnotationPageIds();
  highlightCssRegistered();

  let records = await listAnnotationsForPage(readPageMeta(article).pageId);
  records = await updateStaleFlags(article, records);
  pageRecordsCache = records;

  if (selectedHighlight && !records.some((r) => r.id === selectedHighlight.record.id)) {
    deselectHighlight();
  } else if (selectedHighlight) {
    const fresh = records.find((r) => r.id === selectedHighlight!.record.id);
    if (fresh) {
      const { range, stale } = reAnchorRecord(article, fresh);
      if (range && !stale) {
        selectedHighlight = { record: fresh, range: range.cloneRange() };
      } else {
        deselectHighlight();
      }
    }
  }

  renderHighlightsOnPage(article, records, selectedHighlight?.record.id ?? null);
  syncPoiChrome(article, records);
  syncHeadingChrome(article, records);
  removeLegacyPageMarkSlot();

  if (selectedHighlight) {
    positionHighlightHandles(selectedHighlight.range);
    showEditToolbar(selectedHighlight.range);
  }

  const annParam = new URLSearchParams(window.location.search).get('ann') ?? pendingAnnId;
  if (annParam) {
    pendingAnnId = null;
    const record =
      records.find((r) => r.id === annParam) ?? (await getAnnotation(annParam));
    if (record) {
      void scrollToAnnotation(article, record);
    }
  }
}

async function scrollToAnnotation(article: HTMLElement, record: AnnotationRecord): Promise<void> {
  const target = scrollTargetForRecord(article, record);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  target.classList.add('annotation-flash');
  window.setTimeout(() => target.classList.remove('annotation-flash'), 1200);
}

function findExactHighlightForRange(
  article: HTMLElement,
  range: Range,
  records: AnnotationRecord[],
): { record: AnnotationRecord; range: Range } | null {
  const selectionAnchor = anchorFromTextRange(article, range, readPageMeta(article));
  if (!selectionAnchor?.position) return null;

  for (const record of records) {
    if (record.kind !== 'highlight' || record.stale || record.anchor.kind !== 'text') continue;
    const pos = record.anchor.position;
    if (!pos) continue;
    if (pos.start !== selectionAnchor.position.start || pos.end !== selectionAnchor.position.end) {
      continue;
    }
    const { range: anchored, stale } = reAnchorRecord(article, record);
    if (!anchored || stale) continue;
    return { record, range: anchored };
  }
  return null;
}

function syncSelectionToolbarForRange(bar: HTMLElement, range: Range): void {
  const article = proseArticle();
  if (!article) return;
  const match = findExactHighlightForRange(article, range, pageRecordsCache);
  bar.classList.toggle('annotation-toolbar--note-only', Boolean(match));
  if (match) {
    bar.dataset.matchedHighlightId = match.record.id;
  } else {
    delete bar.dataset.matchedHighlightId;
  }
}

async function saveHighlightComment(
  id: string,
  comment: string,
  fallbackRange?: Range | null,
): Promise<void> {
  const trimmed = comment.trim();
  if (!trimmed) return;
  const record = pageRecordsCache.find((r) => r.id === id) ?? (await getAnnotation(id));
  if (!record) return;

  await persistRecord({
    ...record,
    comment: trimmed,
    updatedAt: Date.now(),
  }, { emit: false });
  window.getSelection()?.removeAllRanges();
  dismissToolbar();
  if (fallbackRange) registerPlaintextNoteFallbackRange(id, fallbackRange);
  scheduleFlyInPlaintextNote(id);
  await refreshPageAnnotations();
  emitAnnotationsChanged({ skipPageRefresh: true });
}

function openSelectionNotePopover(): void {
  const range = savedSelectionRange?.cloneRange() ?? snapshotAnnotationRange() ?? activeRange();
  if (!range) {
    showAnnotationToast('Select text before adding a note.');
    return;
  }

  const bar = toolbarEl?.isConnected ? toolbarEl : null;
  const anchorRect =
    (lastSelectionToolbarRect?.width || lastSelectionToolbarRect?.height
      ? lastSelectionToolbarRect
      : null) ??
    (() => {
      const rangeRect = range.getBoundingClientRect();
      return rangeRect.width || rangeRect.height ? rangeRect : null;
    })() ??
    bar?.getBoundingClientRect() ??
    new DOMRect(window.innerWidth / 2 - 140, 120, 0, 0);

  const matchedId = toolbarEl?.dataset.matchedHighlightId;
  if (matchedId) {
    const record = pageRecordsCache.find((r) => r.id === matchedId);
    showCommentPopover(
      anchorRect,
      record?.comment ?? '',
      (text, captured) => {
        void saveHighlightComment(matchedId, text, captured);
      },
      'selection',
      false,
      range,
    );
    return;
  }

  showCommentPopover(
    anchorRect,
    '',
    (text, captured) => {
      void createHighlight(DEFAULT_ANNOTATION_COLOR, text, captured);
    },
    'selection',
    false,
    range,
  );
}

function createToolbar(): HTMLElement {
  const bar = document.createElement('div');
  bar.className = 'annotation-toolbar';
  bar.hidden = true;
  bar.innerHTML = `
    <span class="annotation-toolbar__label">Annotate</span>
    <div class="annotation-toolbar__colors" role="group" aria-label="Highlight color"></div>
    <button type="button" class="annotation-toolbar__btn annotation-toolbar__btn--icon" data-action="note" aria-label="Add note" title="Note">${NOTE_ICON}</button>
  `;
  const colors = bar.querySelector('.annotation-toolbar__colors');
  if (colors) {
    for (const color of ANNOTATION_COLORS) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `annotation-color-swatch annotation-color-swatch--${color}`;
      btn.dataset.color = color;
      btn.title = `Highlight (${color})`;
      btn.setAttribute('aria-label', `Highlight with ${color}`);
      colors.appendChild(btn);
    }
  }

  bar.addEventListener('mousedown', (e) => {
    snapshotAnnotationRange();
    toolbarPointerPending = true;
    if ((e.target as HTMLElement).closest('[data-action="note"]')) return;
    e.preventDefault();
  });

  bar.addEventListener(
    'pointerdown',
    (e) => {
      if (e.button !== 0) return;
      if (!(e.target as HTMLElement).closest('[data-action="note"]')) return;
      e.preventDefault();
      e.stopPropagation();
      snapshotAnnotationRange();
      toolbarPointerPending = false;
      openSelectionNotePopover();
    },
    true,
  );

  document.body.appendChild(bar);
  return bar;
}

function ensureSelectionToolbar(): HTMLElement {
  if (toolbarEl?.isConnected) return toolbarEl;
  toolbarEl = createToolbar();
  toolbarEl.addEventListener('click', onToolbarClick);
  return toolbarEl;
}

function positionFixedEl(el: HTMLElement, rect: DOMRect, opts?: { alignRight?: boolean; below?: boolean }): void {
  const pad = 8;
  const width = el.offsetWidth || 280;
  const height = el.offsetHeight || 40;
  const alignRight = opts?.alignRight ?? false;
  const below = opts?.below ?? true;

  let top = below ? rect.bottom + pad : rect.top - height - pad;
  let left = alignRight ? rect.right - width : rect.left;

  top = Math.max(pad, Math.min(window.innerHeight - height - pad, top));
  left = Math.max(pad, Math.min(window.innerWidth - width - pad, left));

  el.style.top = `${top}px`;
  el.style.left = `${left}px`;
}

function positionToolbar(bar: HTMLElement, rect: DOMRect): void {
  positionFixedEl(bar, rect, { below: false });
  const pad = 8;
  const top = Math.max(pad, rect.top - bar.offsetHeight - pad);
  bar.style.top = `${top}px`;
}

function dismissToolbar(clearSavedRange = true, hideBar = true): void {
  if (toolbarEl?.isConnected && hideBar) toolbarEl.hidden = true;
  if (clearSavedRange) savedSelectionRange = null;
}

function clearSelectionAndDismissToolbar(): void {
  clearTextSelection();
  dismissToolbar();
  if (commentPopoverMode === 'selection') hideCommentPopover();
}

function deselectHighlight(): void {
  selectedHighlight = null;
  setSelectedHighlightRange(null);
  if (editToolbarEl?.isConnected) editToolbarEl.hidden = true;
  if (handleLayerEl?.isConnected) handleLayerEl.hidden = true;
}

function selectHighlight(record: AnnotationRecord, range: Range): void {
  dismissToolbar();
  hideCommentPopover();
  window.getSelection()?.removeAllRanges();
  selectedHighlight = { record, range: range.cloneRange() };
  setSelectedHighlightRange(range);
  showEditToolbar(range);
  positionHighlightHandles(range);
}

function ensureHandleLayer(): HTMLElement {
  if (handleLayerEl?.isConnected) return handleLayerEl;
  handleLayerEl = document.createElement('div');
  handleLayerEl.className = 'annotation-hl-handles';
  handleLayerEl.hidden = true;
  handleLayerEl.innerHTML = `
    <button type="button" class="annotation-hl-handle annotation-hl-handle--start" data-hl-handle="start" aria-label="Adjust highlight start"></button>
    <button type="button" class="annotation-hl-handle annotation-hl-handle--end" data-hl-handle="end" aria-label="Adjust highlight end"></button>
  `;
  startHandleEl = handleLayerEl.querySelector('[data-hl-handle="start"]');
  endHandleEl = handleLayerEl.querySelector('[data-hl-handle="end"]');
  startHandleEl?.addEventListener('mousedown', (e) => beginHandleDrag(e, 'start'));
  endHandleEl?.addEventListener('mousedown', (e) => beginHandleDrag(e, 'end'));
  document.body.appendChild(handleLayerEl);
  return handleLayerEl;
}

function positionHighlightHandles(range: Range): void {
  const layer = ensureHandleLayer();
  const endpoints = rangeEndpointRects(range);
  if (!endpoints || !startHandleEl || !endHandleEl) {
    layer.hidden = true;
    return;
  }
  layer.hidden = false;
  const pad = 6;
  startHandleEl.style.top = `${endpoints.start.top + endpoints.start.height / 2 - pad}px`;
  startHandleEl.style.left = `${endpoints.start.left - pad}px`;
  endHandleEl.style.top = `${endpoints.end.top + endpoints.end.height / 2 - pad}px`;
  endHandleEl.style.left = `${endpoints.end.right - pad}px`;
}

function beginHandleDrag(e: MouseEvent, edge: 'start' | 'end'): void {
  if (!selectedHighlight) return;
  e.preventDefault();
  e.stopPropagation();

  const article = proseArticle();
  const record = selectedHighlight.record;
  const range = selectedHighlight.range;
  const color = record.color ?? DEFAULT_ANNOTATION_COLOR;
  const isTextNote = Boolean(record.comment?.trim() && record.anchor.kind === 'text');

  handleDragActive = true;
  handleDrag = {
    edge,
    range: range.cloneRange(),
    recordId: record.id,
  };

  if (article) {
    setHighlightSuppressed(record.id, true);
    refreshPersistedHighlights(article, pageRecordsCache);
    if (isTextNote) {
      updatePlaintextNoteRange(record.id, range);
    } else {
      updateDragPreview(article, record.id, range, color);
    }
  }
  setSelectedHighlightRange(null);

  document.addEventListener('mousemove', onHandleDragMove);
  document.addEventListener('mouseup', onHandleDragEnd, { once: true });
}

function isTextNoteRecord(record: AnnotationRecord): boolean {
  return Boolean(record.comment?.trim() && record.anchor.kind === 'text');
}

function syncHandleDragVisual(range: Range): void {
  if (!selectedHighlight || !handleDrag) return;
  const article = proseArticle();
  if (!article) return;

  const { record } = selectedHighlight;
  const color = record.color ?? DEFAULT_ANNOTATION_COLOR;

  if (isTextNoteRecord(record)) {
    updatePlaintextNoteRange(record.id, range);
  } else {
    updateDragPreview(article, record.id, range, color);
  }

  positionHighlightHandles(range);
  positionEditToolbar(range);
}

function onHandleDragMove(e: MouseEvent): void {
  if (!handleDrag || !selectedHighlight) return;
  const article = proseArticle();
  if (!article) return;

  const probe = caretRangeFromPoint(e.clientX, e.clientY);
  if (!probe || !article.contains(probe.startContainer)) return;

  const next = handleDrag.range.cloneRange();
  try {
    if (handleDrag.edge === 'start') {
      next.setStart(probe.startContainer, probe.startOffset);
    } else {
      next.setEnd(probe.startContainer, probe.startOffset);
    }
  } catch {
    return;
  }

  if (next.collapsed || !normalizePlainText(next.toString())) return;
  if (selectionInsideBlockedSubtree(next)) return;

  handleDrag.range = next;
  selectedHighlight.range = next.cloneRange();
  syncHandleDragVisual(next);
}

async function onHandleDragEnd(): Promise<void> {
  document.removeEventListener('mousemove', onHandleDragMove);
  handleDragActive = false;

  if (!handleDrag || !selectedHighlight) {
    handleDrag = null;
    return;
  }

  const article = proseArticle();
  const record = selectedHighlight.record;
  const recordId = record.id;
  const range = handleDrag.range.cloneRange();
  handleDrag = null;

  clearDragPreview(recordId);
  setHighlightSuppressed(recordId, false);

  if (!article || range.collapsed || !normalizePlainText(range.toString())) {
    await refreshPageAnnotations();
    return;
  }

  if (selectionInsideBlockedSubtree(range) || !article.contains(range.commonAncestorContainer)) {
    showAnnotationToast('Could not re-anchor highlight after resize.');
    await refreshPageAnnotations();
    return;
  }

  const anchor = anchorFromTextRange(article, range, readPageMeta(article));
  if (!anchor) {
    showAnnotationToast('Could not re-anchor highlight after resize.');
    await refreshPageAnnotations();
    return;
  }

  const updated: AnnotationRecord = {
    ...record,
    anchor,
    updatedAt: Date.now(),
    stale: false,
  };

  await persistRecord(updated, { emit: false });
  selectedHighlight = { record: updated, range: range.cloneRange() };
  pageRecordsCache = pageRecordsCache.map((r) => (r.id === updated.id ? updated : r));
  emitAnnotationsChanged();
  await refreshPageAnnotations();
}

function createEditToolbar(): HTMLElement {
  const bar = document.createElement('div');
  bar.className = 'annotation-toolbar annotation-toolbar--edit';
  bar.hidden = true;
  bar.innerHTML = `
    <span class="annotation-toolbar__label">Highlight</span>
    <div class="annotation-toolbar__colors" role="group" aria-label="Highlight color"></div>
    <button type="button" class="annotation-toolbar__btn" data-edit-action="remove">Remove</button>
  `;
  const colors = bar.querySelector('.annotation-toolbar__colors');
  if (colors) {
    for (const color of ANNOTATION_COLORS) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `annotation-color-swatch annotation-color-swatch--${color}`;
      btn.dataset.editColor = color;
      btn.title = `Set color (${color})`;
      btn.setAttribute('aria-label', `Set highlight color to ${color}`);
      colors.appendChild(btn);
    }
  }
  bar.addEventListener('mousedown', (e) => {
    snapshotAnnotationRange();
    e.preventDefault();
  });
  bar.addEventListener('click', onEditToolbarClick);
  document.body.appendChild(bar);
  return bar;
}

function ensureEditToolbar(): HTMLElement {
  if (editToolbarEl?.isConnected) return editToolbarEl;
  editToolbarEl = createEditToolbar();
  return editToolbarEl;
}

function positionEditToolbar(range: Range): void {
  const bar = ensureEditToolbar();
  positionToolbar(bar, range.getBoundingClientRect());
}

function showEditToolbar(range: Range): void {
  const bar = ensureEditToolbar();
  bar.hidden = false;
  positionEditToolbar(range);
  bar.querySelectorAll<HTMLElement>('[data-edit-color]').forEach((btn) => {
    btn.classList.toggle(
      'is-active',
      btn.dataset.editColor === (selectedHighlight?.record.color ?? DEFAULT_ANNOTATION_COLOR),
    );
  });
}

async function updateHighlightColor(color: AnnotationColor): Promise<void> {
  if (!selectedHighlight) return;
  await persistRecord({
    ...selectedHighlight.record,
    color,
    updatedAt: Date.now(),
  });
  await refreshPageAnnotations();
}

async function removeSelectedHighlight(): Promise<void> {
  if (!selectedHighlight) return;
  const id = selectedHighlight.record.id;
  deselectHighlight();
  await deleteAnnotation(id);
  await rebuildLibrarySearchIndex();
  emitAnnotationsChanged();
  await refreshPageAnnotations();
}

function onEditToolbarClick(e: Event): void {
  const target = (e.target as HTMLElement).closest<HTMLElement>('[data-edit-action], [data-edit-color]');
  if (!target || !selectedHighlight) return;
  e.preventDefault();
  e.stopPropagation();

  const color = target.dataset.editColor as AnnotationColor | undefined;
  if (color) {
    void updateHighlightColor(color);
    return;
  }

  if (target.dataset.editAction === 'remove') {
    void removeSelectedHighlight();
  }
}

async function removeTextNote(id: string): Promise<void> {
  collapseAllPlaintextNotes();
  if (selectedHighlight?.record.id === id) deselectHighlight();
  await deleteAnnotation(id);
  await rebuildLibrarySearchIndex();
  emitAnnotationsChanged();
  await refreshPageAnnotations();
}

async function saveTextNoteEdit(id: string, text: string): Promise<void> {
  const trimmed = text.trim();
  const record = pageRecordsCache.find((r) => r.id === id) ?? (await getAnnotation(id));
  if (!record) return;

  if (!trimmed) {
    await removeTextNote(id);
    return;
  }

  await persistRecord({
    ...record,
    comment: trimmed,
    updatedAt: Date.now(),
  });
  await refreshPageAnnotations();
  collapseAllPlaintextNotes();
}

async function removeBlockNoteById(id: string): Promise<void> {
  const record = pageRecordsCache.find((r) => r.id === id) ?? (await getAnnotation(id));
  if (!record || record.anchor.kind !== 'block') return;
  const block = proseArticle()?.querySelector<HTMLElement>(
    `[data-poi-id="${CSS.escape(record.anchor.poiId ?? '')}"]`,
  );
  if (block) {
    await saveBlockNote(block, '');
  } else {
    await deleteAnnotation(id);
    await rebuildLibrarySearchIndex();
    emitAnnotationsChanged();
    await refreshPageAnnotations();
  }
}

function beginBlockNoteEdit(id: string): void {
  const host = document.querySelector<HTMLElement>(`[data-note-for="${CSS.escape(id)}"]`);
  if (!host) return;
  host.classList.add('is-editing');
  host.querySelector<HTMLElement>('[data-block-note-body]')?.setAttribute('hidden', '');
  const input = host.querySelector<HTMLTextAreaElement>(`[data-block-note-input="${CSS.escape(id)}"]`);
  if (input) {
    input.hidden = false;
    input.focus({ preventScroll: true });
  }
  host.querySelector<HTMLElement>(`[data-block-note-edit="${CSS.escape(id)}"]`)?.setAttribute('hidden', '');
  host.querySelector<HTMLElement>(`[data-block-note-remove="${CSS.escape(id)}"]`)?.setAttribute('hidden', '');
  host.querySelector<HTMLElement>(`[data-block-note-save="${CSS.escape(id)}"]`)?.removeAttribute('hidden');
  host.querySelector<HTMLElement>(`[data-block-note-cancel="${CSS.escape(id)}"]`)?.removeAttribute('hidden');
}

function endBlockNoteEdit(id: string): void {
  const host = document.querySelector<HTMLElement>(`[data-note-for="${CSS.escape(id)}"]`);
  if (!host) return;
  host.classList.remove('is-editing');
  host.querySelector<HTMLElement>('[data-block-note-body]')?.removeAttribute('hidden');
  const input = host.querySelector<HTMLTextAreaElement>(`[data-block-note-input="${CSS.escape(id)}"]`);
  if (input) input.hidden = true;
  host.querySelector<HTMLElement>(`[data-block-note-edit="${CSS.escape(id)}"]`)?.removeAttribute('hidden');
  host.querySelector<HTMLElement>(`[data-block-note-remove="${CSS.escape(id)}"]`)?.removeAttribute('hidden');
  host.querySelector<HTMLElement>(`[data-block-note-save="${CSS.escape(id)}"]`)?.setAttribute('hidden', '');
  host.querySelector<HTMLElement>(`[data-block-note-cancel="${CSS.escape(id)}"]`)?.setAttribute('hidden', '');
}

async function saveBlockNoteEdit(id: string): Promise<void> {
  const host = document.querySelector<HTMLElement>(`[data-note-for="${CSS.escape(id)}"]`);
  const input = host?.querySelector<HTMLTextAreaElement>(`[data-block-note-input="${CSS.escape(id)}"]`);
  const text = input?.value ?? '';
  const record = pageRecordsCache.find((r) => r.id === id);
  if (!record || record.anchor.kind !== 'block') return;
  const block = proseArticle()?.querySelector<HTMLElement>(
    `[data-poi-id="${CSS.escape(record.anchor.poiId ?? '')}"]`,
  );
  if (!block) return;
  endBlockNoteEdit(id);
  await saveBlockNote(block, text);
}

function onPageNoteClick(e: Event): void {
  const target = e.target as HTMLElement;

  const dashId = target.closest<HTMLElement>('[data-text-note-dash]')?.dataset.textNoteDash;
  if (dashId) {
    e.preventDefault();
    e.stopPropagation();
    if (expandedPlaintextNoteId() === dashId) {
      collapseAllPlaintextNotes();
    } else {
      expandPlaintextNote(dashId);
    }
    return;
  }

  const tabId = target.closest<HTMLElement>('[data-text-note-tab]')?.dataset.textNoteTab;
  if (tabId) {
    e.preventDefault();
    if (expandedPlaintextNoteId() === tabId) {
      collapseAllPlaintextNotes();
    } else {
      expandPlaintextNote(tabId);
    }
    return;
  }

  const card = target.closest<HTMLElement>('.annotation-text-note-card');
  const cardId = card?.dataset.textNoteId;

  if (target.closest('[data-text-note-edit]') && cardId) {
    e.preventDefault();
    enterPlaintextNoteEdit(cardId);
    return;
  }

  if (target.closest('[data-text-note-remove]') && cardId) {
    e.preventDefault();
    void removeTextNote(cardId);
    return;
  }

  if (target.closest('[data-text-note-save]') && cardId) {
    e.preventDefault();
    void saveTextNoteEdit(cardId, readPlaintextNoteDraft(cardId));
    return;
  }

  if (target.closest('[data-text-note-cancel]') && cardId) {
    e.preventDefault();
    const entry = getPlaintextNoteEntry(cardId);
    if (entry) {
      updatePlaintextNoteBody(cardId, entry.card.querySelector('[data-text-note-body]')?.textContent ?? '');
    }
    return;
  }

  const blockEditId = target.closest<HTMLElement>('[data-block-note-edit]')?.getAttribute('data-block-note-edit');
  if (blockEditId) {
    e.preventDefault();
    beginBlockNoteEdit(blockEditId);
    return;
  }

  const blockRemoveId = target.closest<HTMLElement>('[data-block-note-remove]')?.getAttribute('data-block-note-remove');
  if (blockRemoveId) {
    e.preventDefault();
    void removeBlockNoteById(blockRemoveId);
    return;
  }

  const blockSaveId = target.closest<HTMLElement>('[data-block-note-save]')?.getAttribute('data-block-note-save');
  if (blockSaveId) {
    e.preventDefault();
    void saveBlockNoteEdit(blockSaveId);
    return;
  }

  const blockCancelId = target.closest<HTMLElement>('[data-block-note-cancel]')?.getAttribute('data-block-note-cancel');
  if (blockCancelId) {
    e.preventDefault();
    endBlockNoteEdit(blockCancelId);
    return;
  }
}

const NOTE_UI_SELECTOR =
  '.annotation-text-note-card, .annotation-text-note-dash, .annotation-text-note-layer, .annotation-on-page-note';

const ANNOTATION_UI_SELECTOR = `${NOTE_UI_SELECTOR}, .annotation-toolbar, .annotation-toolbar--edit, .annotation-comment-popover, .annotation-poi-chrome, .annotation-heading-chrome, .annotation-hl-handles`;

function isAnnotationUiTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && !!target.closest(ANNOTATION_UI_SELECTOR);
}

function hasLiveAnnotatableSelection(): boolean {
  const article = proseArticle();
  if (!article) return false;

  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || sel.rangeCount === 0) return false;

  const range = sel.getRangeAt(0);
  if (!article.contains(range.commonAncestorContainer)) return false;
  if (selectionInsideBlockedSubtree(range)) return false;
  if (!range.toString().trim()) return false;

  const rect = range.getBoundingClientRect();
  return Boolean(rect.width || rect.height);
}

/** Preserve range before toolbar mousedown collapses the browser selection. */
function snapshotAnnotationRange(from?: Range | null): Range | null {
  const article = proseArticle();
  if (!article) return savedSelectionRange;

  if (from) {
    savedSelectionRange = from.cloneRange();
    return savedSelectionRange;
  }

  const sel = window.getSelection();
  if (sel && !sel.isCollapsed && sel.rangeCount > 0) {
    const live = sel.getRangeAt(0);
    if (
      article.contains(live.commonAncestorContainer) &&
      !selectionInsideBlockedSubtree(live) &&
      live.toString().trim()
    ) {
      savedSelectionRange = live.cloneRange();
    }
  }

  return savedSelectionRange;
}

function clearTextSelection(): void {
  window.getSelection()?.removeAllRanges();
  savedSelectionRange = null;
}

function trySelectHighlightAt(x: number, y: number): boolean {
  const article = proseArticle();
  if (!article) return false;
  const hit = findHighlightAtPoint(article, pageRecordsCache, x, y);
  if (!hit) return false;
  selectHighlight(hit.record, hit.range);
  return true;
}

function isCommentDialogOpen(): boolean {
  return Boolean(commentDialogEl?.isConnected && commentDialogEl.open);
}

function ensureCommentDialog(): HTMLDialogElement {
  if (commentDialogEl?.isConnected) return commentDialogEl;

  const dialog = document.createElement('dialog');
  dialog.className = 'annotation-comment-popover';
  dialog.innerHTML = `
    <label class="annotation-comment-popover__label" for="annotation-comment-input">Note</label>
    <textarea id="annotation-comment-input" class="annotation-comment-popover__input" rows="3" maxlength="4096"></textarea>
    <div class="annotation-comment-popover__actions">
      <button type="button" class="annotation-toolbar__btn" data-comment-save>Save</button>
      <button type="button" class="annotation-toolbar__btn" data-comment-cancel>Cancel</button>
    </div>
  `;

  const textarea = dialog.querySelector<HTMLTextAreaElement>('#annotation-comment-input');
  commentDialogTextarea = textarea;

  dialog.querySelector('[data-comment-save]')?.addEventListener('click', () => {
    commentDialogSaveHandler?.(textarea?.value ?? '', commentDialogCapturedRange);
    hideCommentPopover();
  });
  dialog.querySelector('[data-comment-cancel]')?.addEventListener('click', hideCommentPopover);
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    hideCommentPopover();
  });
  dialog.addEventListener('mousedown', (e) => {
    e.stopPropagation();
  });
  dialog.addEventListener('close', () => {
    if (keepPopoverOpen) return;
    commentPopoverMode = null;
    openPoiBlock = null;
  });

  document.body.appendChild(dialog);
  commentDialogEl = dialog;
  return dialog;
}

function hideCommentPopover(): void {
  keepPopoverOpen = false;
  commentPopoverMode = null;
  openPoiBlock = null;
  commentDialogSaveHandler = null;
  commentDialogCapturedRange = null;
  if (commentDialogEl?.open) commentDialogEl.close();
}

function showCommentPopover(
  anchorRect: DOMRect,
  initial: string,
  onSave: CommentSaveHandler,
  mode: 'selection' | 'poi',
  alignRight = false,
  rangeOverride?: Range | null,
): void {
  const capturedRange =
    mode === 'selection'
      ? (rangeOverride?.cloneRange() ?? snapshotAnnotationRange() ?? activeRange()?.cloneRange() ?? null)
      : null;
  if (capturedRange) savedSelectionRange = capturedRange.cloneRange();

  commentDialogSaveHandler = onSave;
  commentDialogCapturedRange = capturedRange;
  keepPopoverOpen = true;
  commentPopoverMode = mode;

  const dialog = ensureCommentDialog();
  if (commentDialogTextarea) commentDialogTextarea.value = initial;

  if (!dialog.open) {
    dialog.showModal();
  }
  positionFixedEl(dialog, anchorRect, { alignRight, below: true });

  window.setTimeout(() => {
    if (!isCommentDialogOpen()) return;
    commentDialogTextarea?.focus({ preventScroll: true });
  }, 0);
}

function activeRange(): Range | null {
  const sel = window.getSelection();
  if (sel && !sel.isCollapsed && sel.rangeCount > 0) {
    return sel.getRangeAt(0);
  }
  return savedSelectionRange;
}

async function createHighlight(
  color: AnnotationColor,
  comment?: string,
  rangeOverride?: Range | null,
): Promise<void> {
  const article = proseArticle();
  if (!article) return;
  const range = rangeOverride ?? activeRange();
  if (!range) {
    dismissToolbar();
    return;
  }
  if (selectionInsideBlockedSubtree(range)) return;
  if (!article.contains(range.commonAncestorContainer)) return;

  const anchor = anchorFromTextRange(article, range, readPageMeta(article));
  if (!anchor) {
    showAnnotationToast('Could not anchor highlight to this selection.');
    dismissToolbar();
    window.getSelection()?.removeAllRanges();
    return;
  }

  const savedRange = range.cloneRange();
  const now = Date.now();
  const id = crypto.randomUUID();
  const trimmedComment = comment?.trim() || undefined;
  await persistRecord(
    newRecord({
      id,
      kind: 'highlight',
      anchor,
      color,
      comment: trimmedComment,
      createdAt: now,
      updatedAt: now,
      stale: false,
    }),
    { emit: false },
  );
  window.getSelection()?.removeAllRanges();
  dismissToolbar();
  if (trimmedComment) {
    registerPlaintextNoteFallbackRange(id, savedRange);
    scheduleFlyInPlaintextNote(id);
  }
  await refreshPageAnnotations();
  emitAnnotationsChanged({ skipPageRefresh: true });
}

function buildBookmarkAnchor(
  kind: 'page' | 'heading' | 'block',
  blockEl?: HTMLElement,
  headingEl?: HTMLElement,
): AnnotationAnchor | null {
  const article = proseArticle();
  if (!article) return null;
  const meta = readPageMeta(article);
  if (kind === 'page') return anchorFromPage(meta);
  if (kind === 'block' && blockEl) return anchorFromBlock(meta, blockEl);
  if (kind === 'heading' && headingEl) {
    return anchorFromHeading(meta, headingEl.id, headingEl.textContent?.trim() ?? '');
  }
  return null;
}

async function toggleBookmark(
  kind: 'page' | 'heading' | 'block',
  blockEl?: HTMLElement,
  headingEl?: HTMLElement,
): Promise<void> {
  const anchor = buildBookmarkAnchor(kind, blockEl, headingEl);
  if (!anchor) return;

  const existing = await findBookmarksByAnchor(anchor);
  if (existing.length) {
    for (const row of existing) {
      await deleteAnnotation(row.id);
    }
    await rebuildLibrarySearchIndex();
    emitAnnotationsChanged();
  } else {
    const now = Date.now();
    await persistRecord(
      newRecord({
        id: crypto.randomUUID(),
        kind: 'bookmark',
        anchor,
        createdAt: now,
        updatedAt: now,
        stale: false,
      }),
    );
  }

  dismissToolbar();
  await refreshPageAnnotations();
}

async function saveBlockNote(block: HTMLElement, comment: string): Promise<void> {
  const anchor = buildBookmarkAnchor('block', block);
  if (!anchor) return;

  const trimmed = comment.trim();
  const existing = await findBookmarkByAnchor(anchor);
  const now = Date.now();

  if (!trimmed && existing) {
    await deleteAnnotation(existing.id);
    await rebuildLibrarySearchIndex();
    emitAnnotationsChanged();
  } else if (existing) {
    await persistRecord({ ...existing, comment: trimmed || undefined, updatedAt: now });
  } else if (trimmed) {
    await persistRecord(
      newRecord({
        id: crypto.randomUUID(),
        kind: 'bookmark',
        anchor,
        comment: trimmed,
        createdAt: now,
        updatedAt: now,
        stale: false,
      }),
    );
  }

  await refreshPageAnnotations();
}

const markAnimPending = new WeakMap<HTMLButtonElement, number>();

function clearMarkAnimation(btn: HTMLButtonElement): void {
  markAnimPending.delete(btn);
  btn.classList.remove('annotation-poi-btn--marking', 'annotation-poi-btn--unmarking');
}

function setMarkButtonState(
  btn: HTMLButtonElement | null,
  active: boolean,
  opts?: { animate?: boolean },
): void {
  if (!btn) return;
  const wasActive = btn.classList.contains('is-active');
  btn.classList.toggle('is-active', active);
  btn.setAttribute('aria-pressed', active ? 'true' : 'false');

  if (opts?.animate && wasActive !== active) {
    clearMarkAnimation(btn);
    void btn.offsetWidth;
    btn.classList.add(active ? 'annotation-poi-btn--marking' : 'annotation-poi-btn--unmarking');
    markAnimPending.set(btn, 1);
  }
}

function bindMarkButton(btn: HTMLButtonElement, onToggle: () => void): void {
  btn.addEventListener('animationend', (e) => {
    if (!(e.target instanceof Element)) return;
    if (!e.animationName.startsWith('annotation-mark')) return;
    const pending = markAnimPending.get(btn);
    if (pending === undefined) return;
    const next = pending - 1;
    if (next <= 0) {
      clearMarkAnimation(btn);
    } else {
      markAnimPending.set(btn, next);
    }
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const selecting = btn.getAttribute('aria-pressed') !== 'true';
    setMarkButtonState(btn, selecting, { animate: true });
    onToggle();
  });
}

function createPoiChrome(block: HTMLElement): HTMLElement {
  const chrome = document.createElement('div');
  chrome.className = 'annotation-poi-chrome';
  chrome.innerHTML = `
    <button type="button" class="annotation-poi-btn annotation-poi-btn--mark" data-poi-bookmark aria-pressed="false" aria-label="Bookmark" title="Bookmark">${MARK_ICON}</button>
    <button type="button" class="annotation-poi-btn annotation-poi-btn--note" data-poi-note aria-label="Note" title="Note">${NOTE_ICON}</button>
  `;

  chrome.addEventListener('mousedown', (e) => {
    e.stopPropagation();
  });

  const markBtn = chrome.querySelector<HTMLButtonElement>('[data-poi-bookmark]');
  const noteBtn = chrome.querySelector<HTMLButtonElement>('[data-poi-note]');

  bindMarkButton(markBtn!, () => {
    void toggleBookmark('block', block);
  });

  noteBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCommentDialogOpen() && openPoiBlock === block) {
      hideCommentPopover();
      return;
    }

    const article = proseArticle();
    if (!article || !noteBtn) return;

    openPoiBlock = block;
    const btnRect = noteBtn.getBoundingClientRect();
    const anchor = anchorFromBlock(readPageMeta(article), block);
    void findBookmarkByAnchor(anchor).then((existing) => {
      showCommentPopover(
        btnRect,
        existing?.comment ?? '',
        (text) => {
          void saveBlockNote(block, text);
        }, // range unused for POI notes
        'poi',
        true,
      );
    });
  });

  return chrome;
}

function syncPoiChrome(article: HTMLElement, records: AnnotationRecord[]): void {
  article.querySelectorAll<HTMLElement>('[data-poi-id]').forEach((block) => {
    block.classList.add('annotation-poi-host');
    let chrome = block.querySelector<HTMLElement>('.annotation-poi-chrome');
    if (!chrome) {
      chrome = createPoiChrome(block);
      block.appendChild(chrome);
    }

    const poiId = block.dataset.poiId;
    const bookmark = records.find(
      (r) => r.kind === 'bookmark' && r.anchor.kind === 'block' && r.anchor.poiId === poiId,
    );
    setMarkButtonState(chrome.querySelector('[data-poi-bookmark]'), Boolean(bookmark));
    chrome.querySelector('[data-poi-note]')?.classList.toggle('is-active', Boolean(bookmark?.comment));
  });
}

function syncHeadingChrome(article: HTMLElement, records: AnnotationRecord[]): void {
  const meta = readPageMeta(article);

  article.querySelectorAll<HTMLElement>('h1[id], h2[id], h3[id]').forEach((heading) => {
    const isPageTitle = heading.tagName === 'H1';
    heading.classList.add('annotation-heading-host');
    let chrome = heading.querySelector<HTMLElement>('.annotation-heading-chrome');
    if (!chrome) {
      chrome = document.createElement('span');
      chrome.className = 'annotation-heading-chrome';
      const label = isPageTitle ? 'Bookmark page' : 'Bookmark section';
      chrome.innerHTML = `<button type="button" class="annotation-poi-btn annotation-poi-btn--mark" data-heading-bookmark aria-pressed="false" aria-label="${label}" title="${label}">${MARK_ICON}</button>`;
      heading.appendChild(chrome);
      const btn = chrome.querySelector<HTMLButtonElement>('[data-heading-bookmark]');
      bindMarkButton(btn!, () => {
        if (isPageTitle) {
          void toggleBookmark('page');
        } else {
          void toggleBookmark('heading', undefined, heading);
        }
      });
    }

    const bookmark = isPageTitle
      ? records.find(
          (r) => r.kind === 'bookmark' && r.anchor.kind === 'page' && r.anchor.pageId === meta.pageId,
        )
      : records.find(
          (r) =>
            r.kind === 'bookmark' &&
            r.anchor.kind === 'heading' &&
            r.anchor.headingId === heading.id,
        );
    setMarkButtonState(chrome.querySelector('[data-heading-bookmark]'), Boolean(bookmark));
  });
}

function removeLegacyPageMarkSlot(): void {
  document.querySelector('[data-annotation-page-mark]')?.remove();
}

function updateToolbarFromSelection(): void {
  const article = proseArticle();
  if (!article || handleDragActive) return;
  const bar = ensureSelectionToolbar();

  if (keepPopoverOpen && isCommentDialogOpen()) {
    dismissToolbar(false);
    return;
  }

  if (!hasLiveAnnotatableSelection()) {
    if (commentPopoverMode === 'selection' && !keepPopoverOpen) hideCommentPopover();
    if (toolbarPointerPending) {
      dismissToolbar(false, false);
      return;
    }
    dismissToolbar();
    return;
  }

  if (selectedHighlight) {
    deselectHighlight();
  }

  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  snapshotAnnotationRange(range);
  syncSelectionToolbarForRange(bar, range);
  lastSelectionToolbarRect = rect;
  bar.hidden = false;
  positionToolbar(bar, rect);
}

function onDocumentPointerDown(e: Event): void {
  if (!(e instanceof MouseEvent)) return;
  if (isAnnotationUiTarget(e.target)) return;

  if (expandedPlaintextNoteId()) collapseAllPlaintextNotes();

  const target = e.target as HTMLElement;
  if (isCommentDialogOpen() && !target.closest('.annotation-comment-popover')) {
    hideCommentPopover();
  }

  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
    dismissToolbar();
    return;
  }

  const article = proseArticle();
  if (!article) return;

  const range = sel.getRangeAt(0);
  if (!article.contains(range.commonAncestorContainer)) {
    clearSelectionAndDismissToolbar();
    return;
  }

  if (!rangeContainsPoint(range, e.clientX, e.clientY)) {
    clearSelectionAndDismissToolbar();
  }
}

function onSelectionChange(): void {
  if (handleDragActive || isCommentDialogOpen()) return;
  window.clearTimeout(selectionTimer);
  selectionTimer = window.setTimeout(updateToolbarFromSelection, 50);
}

function onToolbarClick(e: Event): void {
  const target = (e.target as HTMLElement).closest<HTMLElement>('[data-action], [data-color]');
  if (!target || !toolbarEl?.isConnected) return;
  e.preventDefault();
  e.stopPropagation();
  toolbarPointerPending = false;

  if (target.dataset.action === 'note') return;

  const color = target.dataset.color as AnnotationColor | undefined;
  if (color) {
    const range = snapshotAnnotationRange() ?? activeRange();
    void createHighlight(color, undefined, range);
  }
}

function onDocumentPointerUp(e: Event): void {
  if (isAnnotationUiTarget(e.target) || handleDragActive) return;

  window.setTimeout(() => {
    if (handleDragActive) return;
    if (!hasLiveAnnotatableSelection()) {
      dismissToolbar();
      if (e instanceof MouseEvent) {
        const hitTarget = e.target as HTMLElement;
        if (!hitTarget.closest(NOTE_UI_SELECTOR) && trySelectHighlightAt(e.clientX, e.clientY)) {
          return;
        }
      }
      if (selectedHighlight) deselectHighlight();
      return;
    }

    updateToolbarFromSelection();
  }, 0);
}

function destroyAnnotationChrome(): void {
  toolbarEl?.remove();
  toolbarEl = null;
  editToolbarEl?.remove();
  editToolbarEl = null;
  handleLayerEl?.remove();
  handleLayerEl = null;
  startHandleEl = null;
  endHandleEl = null;
  hideCommentPopover();
  commentDialogEl?.remove();
  commentDialogEl = null;
  commentDialogTextarea = null;
  commentDialogSaveHandler = null;
  commentDialogCapturedRange = null;
  toastEl?.remove();
  toastEl = null;
}

function teardownDocAnnotations(): void {
  handleDragActive = false;
  handleDrag = null;
  dismissToolbar(false, false);
  selectedHighlight = null;
  setSelectedHighlightRange(null);
  destroyAnnotationChrome();
  clearRenderedHighlights();
  clearPlaintextNotes();
  savedSelectionRange = null;
  lastSelectionToolbarRect = null;
  toolbarPointerPending = false;
  keepPopoverOpen = false;
  commentPopoverMode = null;
  openPoiBlock = null;
  pageRecordsCache = [];
}

function bindDocEvents(): void {
  if (bound) return;
  bound = true;
  document.addEventListener('selectionchange', onSelectionChange);
  document.addEventListener('mousedown', onDocumentPointerDown);
  document.addEventListener('mouseup', onDocumentPointerUp);
  document.addEventListener(
    'mouseup',
    () => {
      window.setTimeout(() => {
        toolbarPointerPending = false;
      }, 0);
    },
    true,
  );
  document.addEventListener('astro:before-swap', teardownDocAnnotations);
  document.addEventListener(ANNOTATIONS_CHANGED, (event) => {
    if (handleDragActive) return;
    if ((event as CustomEvent<{ skipPageRefresh?: boolean }>).detail?.skipPageRefresh) return;
    void refreshPageAnnotations();
  });
  document.addEventListener('annotations:focus-text-note', (event) => {
    const id = (event as CustomEvent<{ id: string }>).detail?.id;
    if (!id) return;
    expandPlaintextNote(id);
  });
  window.addEventListener(
    'scroll',
    () => {
      relayoutPlaintextNotes();
      if (handleDragActive && selectedHighlight) {
        syncHandleDragVisual(selectedHighlight.range);
        return;
      }
      if (selectedHighlight) {
        positionHighlightHandles(selectedHighlight.range);
        positionEditToolbar(selectedHighlight.range);
      }
    },
    true,
  );

  document.addEventListener('click', onPageNoteClick);

  document.addEventListener('click', (e) => {
    const overlay = (e.target as HTMLElement).closest<HTMLElement>('.annotation-hl-overlay');
    if (!overlay?.dataset.annotationId) return;
    const article = proseArticle();
    if (!article) return;
    const record = pageRecordsCache.find((r) => r.id === overlay.dataset.annotationId);
    if (!record || record.kind !== 'highlight') return;
    const { range, stale } = reAnchorRecord(article, record);
    if (!range || stale) return;
    e.preventDefault();
    selectHighlight(record, range);
  });
}

export function initDocAnnotations(): void {
  const article = proseArticle();
  if (!article) {
    teardownDocAnnotations();
    return;
  }

  bindDocEvents();
  ensureSelectionToolbar();
  void refreshPageAnnotations();
}

document.addEventListener('astro:page-load', () => {
  initDocAnnotations();
});

export function setPendingAnnotationId(id: string | null): void {
  pendingAnnId = id;
}

export function pageUrlWithAnnotation(pageId: string, annId: string): string {
  const base = p(pageId.startsWith('/') ? pageId.slice(1) : pageId);
  const url = new URL(base, window.location.origin);
  url.searchParams.set('ann', annId);
  return url.pathname + url.search;
}
