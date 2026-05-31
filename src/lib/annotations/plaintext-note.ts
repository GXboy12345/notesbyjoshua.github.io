import { reAnchorRecord } from './anchors';
import { escapeHtml } from './sanitize';
import type { AnnotationRecord } from './types';

export type PlaintextNoteEntry = {
  id: string;
  range: Range;
  dashElements: HTMLButtonElement[];
  card: HTMLElement;
};

const ENTRIES: PlaintextNoteEntry[] = [];
let layer: HTMLElement | null = null;
let layerArticle: HTMLElement | null = null;
let expandedId: string | null = null;
let layoutBound = false;

function unionRect(rects: DOMRect[]): DOMRect | null {
  if (!rects.length) return null;
  let top = Infinity;
  let left = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  for (const rect of rects) {
    if (!rect.width && !rect.height) continue;
    top = Math.min(top, rect.top);
    left = Math.min(left, rect.left);
    right = Math.max(right, rect.right);
    bottom = Math.max(bottom, rect.bottom);
  }
  if (!Number.isFinite(top)) return null;
  return new DOMRect(left, top, right - left, bottom - top);
}

function layoutFixedRect(el: HTMLElement, rect: DOMRect): void {
  el.style.top = `${rect.top}px`;
  el.style.left = `${rect.left}px`;
  el.style.width = `${rect.width}px`;
  el.style.height = `${rect.height}px`;
}

function ensureLayer(article: HTMLElement): HTMLElement {
  if (layer && layerArticle === article) return layer;
  layer?.remove();
  layer = document.createElement('div');
  layer.className = 'annotation-text-note-layer';
  layer.setAttribute('aria-hidden', 'true');
  article.appendChild(layer);
  layerArticle = article;
  bindLayout();
  return layer;
}

function layoutEntry(entry: PlaintextNoteEntry): void {
  const rects = [...entry.range.getClientRects()].filter((r) => r.width || r.height);
  for (let i = 0; i < entry.dashElements.length; i += 1) {
    if (rects[i]) layoutFixedRect(entry.dashElements[i], rects[i]);
  }

  const union = unionRect(rects);
  if (!union) return;

  const card = entry.card;
  const cardWidth = 240;
  card.style.top = `${union.top}px`;
  card.style.left = `${Math.min(union.right + 8, window.innerWidth - cardWidth - 12)}px`;
  card.style.width = `${cardWidth}px`;
}

export function relayoutPlaintextNotes(): void {
  for (const entry of ENTRIES) {
    layoutEntry(entry);
  }
  if (expandedId) {
    void collapsePlaintextNoteIfOffscreen(expandedId);
  }
}

function bindLayout(): void {
  if (layoutBound) return;
  layoutBound = true;
  window.addEventListener('scroll', relayoutPlaintextNotes, true);
  window.addEventListener('resize', relayoutPlaintextNotes);
}

function noteCardHtml(record: AnnotationRecord): string {
  const body = escapeHtml(record.comment ?? '');
  return `
    <button type="button" class="annotation-text-note-card__tab" data-text-note-tab="${escapeHtml(record.id)}" aria-label="Open note">Note</button>
    <div class="annotation-text-note-card__panel">
      <span class="annotation-text-note-card__label">Note</span>
      <p class="annotation-text-note-card__body" data-text-note-body>${body}</p>
      <textarea class="annotation-text-note-card__edit" hidden rows="4" maxlength="4096" data-text-note-input>${body}</textarea>
      <div class="annotation-text-note-card__actions">
        <button type="button" class="annotation-text-note-card__btn" data-text-note-edit>Edit</button>
        <button type="button" class="annotation-text-note-card__btn annotation-text-note-card__btn--danger" data-text-note-remove>Remove</button>
        <button type="button" class="annotation-text-note-card__btn" data-text-note-save hidden>Save</button>
        <button type="button" class="annotation-text-note-card__btn" data-text-note-cancel hidden>Cancel</button>
      </div>
    </div>
  `;
}

function attachPlaintextNote(article: HTMLElement, range: Range, record: AnnotationRecord): void {
  if (!record.comment?.trim()) return;
  const noteLayer = ensureLayer(article);
  const entry: PlaintextNoteEntry = {
    id: record.id,
    range: range.cloneRange(),
    dashElements: [],
    card: document.createElement('div'),
  };

  entry.card.className = 'annotation-text-note-card is-collapsed';
  entry.card.dataset.textNoteId = record.id;
  entry.card.innerHTML = noteCardHtml(record);

  for (const rect of range.getClientRects()) {
    if (!rect.width && !rect.height) continue;
    const dash = document.createElement('button');
    dash.type = 'button';
    dash.className = 'annotation-text-note-dash';
    dash.dataset.textNoteDash = record.id;
    dash.setAttribute('aria-label', 'Show note');
    layoutFixedRect(dash, rect);
    noteLayer.appendChild(dash);
    entry.dashElements.push(dash);
  }

  if (!entry.dashElements.length) {
    const fallback = range.getBoundingClientRect();
    if (fallback.width || fallback.height) {
      const dash = document.createElement('button');
      dash.type = 'button';
      dash.className = 'annotation-text-note-dash';
      dash.dataset.textNoteDash = record.id;
      dash.setAttribute('aria-label', 'Show note');
      layoutFixedRect(dash, fallback);
      noteLayer.appendChild(dash);
      entry.dashElements.push(dash);
    }
  }

  if (!entry.dashElements.length) return;

  document.body.appendChild(entry.card);
  ENTRIES.push(entry);
  layoutEntry(entry);
}

/** Mount dashed box + side card; use fallback range when re-anchor fails right after save. */
export function mountPlaintextNote(
  article: HTMLElement,
  record: AnnotationRecord,
  fallbackRange?: Range | null,
): boolean {
  if (record.kind !== 'highlight' || !record.comment?.trim() || record.anchor.kind !== 'text') {
    return false;
  }
  if (getPlaintextNoteEntry(record.id)) return true;

  const { range: resolved } = reAnchorRecord(article, record);
  const range = resolved ?? fallbackRange ?? null;
  if (!range) return false;

  attachPlaintextNote(article, range, record);
  return Boolean(getPlaintextNoteEntry(record.id));
}

export function renderPlaintextNotes(article: HTMLElement, records: AnnotationRecord[]): void {
  clearPlaintextNotes();
  for (const record of records) {
    if (record.kind !== 'highlight' || !record.comment?.trim()) continue;
    if (record.anchor.kind !== 'text') continue;
    mountPlaintextNote(article, record);
  }
}

export function clearPlaintextNotes(): void {
  for (const entry of ENTRIES) {
    for (const dash of entry.dashElements) dash.remove();
    entry.card.remove();
  }
  ENTRIES.length = 0;
  expandedId = null;
  layer?.remove();
  layer = null;
  layerArticle = null;
}

export function updatePlaintextNoteRange(id: string, range: Range): void {
  const entry = getPlaintextNoteEntry(id);
  if (!entry) return;
  entry.range = range.cloneRange();

  const noteLayer =
    entry.dashElements[0]?.parentElement ??
    (layerArticle ? ensureLayer(layerArticle) : null);
  if (!noteLayer) return;

  const rects = [...range.getClientRects()].filter((r) => r.width || r.height);
  while (entry.dashElements.length < rects.length) {
    const dash = document.createElement('button');
    dash.type = 'button';
    dash.className = 'annotation-text-note-dash';
    dash.dataset.textNoteDash = id;
    dash.setAttribute('aria-label', 'Show note');
    noteLayer.appendChild(dash);
    entry.dashElements.push(dash);
  }
  while (entry.dashElements.length > rects.length) {
    entry.dashElements.pop()?.remove();
  }
  for (let i = 0; i < rects.length; i += 1) {
    layoutFixedRect(entry.dashElements[i], rects[i]);
  }
  layoutEntry(entry);
}

export function getPlaintextNoteEntry(id: string): PlaintextNoteEntry | undefined {
  return ENTRIES.find((e) => e.id === id);
}

export function expandedPlaintextNoteId(): string | null {
  return expandedId;
}

export function collapseAllPlaintextNotes(): void {
  for (const entry of ENTRIES) {
    entry.card.classList.add('is-collapsed');
    entry.card.classList.remove('is-expanded', 'is-editing');
    resetCardEditUi(entry.card);
  }
  expandedId = null;
}

function resetCardEditUi(card: HTMLElement): void {
  const body = card.querySelector<HTMLElement>('[data-text-note-body]');
  const input = card.querySelector<HTMLTextAreaElement>('[data-text-note-input]');
  const editBtn = card.querySelector<HTMLElement>('[data-text-note-edit]');
  const removeBtn = card.querySelector<HTMLElement>('[data-text-note-remove]');
  const saveBtn = card.querySelector<HTMLElement>('[data-text-note-save]');
  const cancelBtn = card.querySelector<HTMLElement>('[data-text-note-cancel]');
  body?.removeAttribute('hidden');
  if (input) input.hidden = true;
  editBtn?.removeAttribute('hidden');
  removeBtn?.removeAttribute('hidden');
  saveBtn?.setAttribute('hidden', '');
  cancelBtn?.setAttribute('hidden', '');
}

export function expandPlaintextNote(id: string): void {
  const entry = getPlaintextNoteEntry(id);
  if (!entry) return;
  collapseAllPlaintextNotes();
  entry.card.classList.remove('is-collapsed');
  entry.card.classList.add('is-expanded');
  expandedId = id;
  layoutEntry(entry);
}

export async function collapsePlaintextNoteIfOffscreen(id: string): Promise<boolean> {
  const entry = getPlaintextNoteEntry(id);
  if (!entry || expandedId !== id) return false;

  const rects = [...entry.range.getClientRects()].filter((r) => r.width || r.height);
  const union = unionRect(rects);
  if (!union) {
    collapseAllPlaintextNotes();
    return true;
  }

  const margin = 48;
  const inView =
    union.bottom >= margin &&
    union.top <= window.innerHeight - margin &&
    union.right >= margin &&
    union.left <= window.innerWidth - margin;

  if (!inView) {
    collapseAllPlaintextNotes();
    return true;
  }
  return false;
}

export function enterPlaintextNoteEdit(id: string): void {
  const entry = getPlaintextNoteEntry(id);
  if (!entry) return;
  expandPlaintextNote(id);
  const card = entry.card;
  card.classList.add('is-editing');
  const body = card.querySelector<HTMLElement>('[data-text-note-body]');
  const input = card.querySelector<HTMLTextAreaElement>('[data-text-note-input]');
  const editBtn = card.querySelector<HTMLElement>('[data-text-note-edit]');
  const removeBtn = card.querySelector<HTMLElement>('[data-text-note-remove]');
  const saveBtn = card.querySelector<HTMLElement>('[data-text-note-save]');
  const cancelBtn = card.querySelector<HTMLElement>('[data-text-note-cancel]');
  body?.setAttribute('hidden', '');
  if (input) {
    input.hidden = false;
    input.focus({ preventScroll: true });
  }
  editBtn?.setAttribute('hidden', '');
  removeBtn?.setAttribute('hidden', '');
  saveBtn?.removeAttribute('hidden');
  cancelBtn?.removeAttribute('hidden');
}

export function readPlaintextNoteDraft(id: string): string {
  const entry = getPlaintextNoteEntry(id);
  return entry?.card.querySelector<HTMLTextAreaElement>('[data-text-note-input]')?.value ?? '';
}

export function updatePlaintextNoteBody(id: string, text: string): void {
  const entry = getPlaintextNoteEntry(id);
  if (!entry) return;
  const body = entry.card.querySelector<HTMLElement>('[data-text-note-body]');
  const input = entry.card.querySelector<HTMLTextAreaElement>('[data-text-note-input]');
  if (body) body.textContent = text;
  if (input) input.value = text;
  resetCardEditUi(entry.card);
  entry.card.classList.remove('is-editing');
}
