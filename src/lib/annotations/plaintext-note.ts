import { reAnchorRecord } from './anchors';
import { escapeHtml } from './sanitize';
import { buildTextStream, offsetsToRange } from './text-stream';
import type { AnnotationRecord } from './types';

export type PlaintextNoteEntry = {
  id: string;
  range: Range;
  dashElements: HTMLButtonElement[];
  card: HTMLElement;
};

const ENTRIES: PlaintextNoteEntry[] = [];
const PENDING_FALLBACK_RANGES = new Map<string, Range>();
/** Persists until fly-in animation completes — not cleared at flush start. */
const FLY_IN_WANTED = new Set<string>();
const AUTO_FLY_IN_MS = 4000;
let layer: HTMLElement | null = null;
let layerArticle: HTMLElement | null = null;
let expandedId: string | null = null;
let layoutBound = false;

/** Layout constants — tab width must match `.annotation-text-note-card__tab` flex-basis. */
const CARD_WIDTH_PX = 240;
const TAB_WIDTH_PX = 22;   // must match .annotation-text-note-card__tab flex-basis (1.35rem ≈ 21.6px)
const BESIDE_GAP_PX = 8;
/** Slide distance for collapsed tab fly-in — full panel width minus visible tab strip. */
const FLY_IN_SLIDE_PX = CARD_WIDTH_PX - TAB_WIDTH_PX;
const CARD_SLIDE_MS = 360;
const CARD_SLIDE_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

function cancelNoteCardAnimations(card: HTMLElement): void {
  for (const anim of card.getAnimations()) {
    anim.cancel();
  }
}

function cardSlideOptions(): KeyframeAnimationOptions {
  return { duration: CARD_SLIDE_MS, easing: CARD_SLIDE_EASING, fill: 'none' };
}

function resolveSlideLefts(entry: PlaintextNoteEntry): {
  union: DOMRect;
  tocRect: DOMRect | null;
  collapsedLeft: number;
  expandedLeft: number;
} | null {
  const union = rangeUnion(entry);
  if (!union) return null;
  const tocRect = tocColumnRect();
  const collapsedLeft = tocRect
    ? collapsedTabRestLeft(tocRect)
    : window.innerWidth - CARD_WIDTH_PX;
  const expandedLeft = expandedCardLeft(union, tocRect);
  return { union, tocRect, collapsedLeft, expandedLeft };
}

function primeCardSlideBase(entry: PlaintextNoteEntry, union: DOMRect, left: number): void {
  const card = entry.card;
  card.style.top = `${union.top}px`;
  card.style.width = `${CARD_WIDTH_PX}px`;
  card.style.left = `${left}px`;
}

function runCardSlideAnimation(
  entry: PlaintextNoteEntry,
  opts: {
    fromLeft: number;
    toLeft: number;
    baseLeft: number;
    animClass: 'is-note-expanding' | 'is-note-collapsing';
    onFinish: () => void;
  },
): void {
  const card = entry.card;
  const union = rangeUnion(entry);
  if (!union) return;

  cancelNoteCardAnimations(card);
  primeCardSlideBase(entry, union, opts.baseLeft);

  const delta = opts.fromLeft - opts.baseLeft;
  const startTransform = `translateX(${delta}px)`;
  card.style.transform = startTransform;
  void card.offsetWidth;

  card.classList.add(opts.animClass);

  const anim = card.animate(
    [{ transform: startTransform }, { transform: 'translateX(0)' }],
    cardSlideOptions(),
  );

  anim.onfinish = () => {
    anim.cancel();
    card.style.transform = '';
    card.classList.remove(opts.animClass);
    opts.onFinish();
    applyCardGeometry(entry);
    layoutDashRects(entry);
  };
}

function collapsedTabRestLeft(tocRect: DOMRect): number {
  return tocRect.left - TAB_WIDTH_PX;
}

function expandedCardLeft(union: DOMRect, tocRect: DOMRect | null): number {
  if (!tocRect) {
    return Math.min(union.right + BESIDE_GAP_PX, window.innerWidth - CARD_WIDTH_PX - 12);
  }
  const beside = union.right + BESIDE_GAP_PX;
  const leftOfMinimap = tocRect.left - CARD_WIDTH_PX - BESIDE_GAP_PX;
  return Math.max(BESIDE_GAP_PX, Math.min(beside, leftOfMinimap));
}

function wantsFlyIn(record: AnnotationRecord): boolean {
  if (FLY_IN_WANTED.has(record.id)) return true;
  const age = Date.now() - record.updatedAt;
  const isFresh = age >= 0 && age < AUTO_FLY_IN_MS;
  return isFresh && record.createdAt === record.updatedAt;
}

function rangeFromStoredPosition(article: HTMLElement, record: AnnotationRecord): Range | null {
  if (record.anchor.kind !== 'text' || !record.anchor.position) return null;
  const stream = buildTextStream(article);
  return offsetsToRange(
    article,
    stream,
    record.anchor.position.start,
    record.anchor.position.end,
  );
}

function tocColumnRect(): DOMRect | null {
  if (!window.matchMedia('(min-width: 1100px)').matches) return null;
  const toc = document.querySelector<HTMLElement>('.doc-toc');
  if (!toc) return null;
  const rect = toc.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  return rect;
}

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

function rangeUnion(entry: PlaintextNoteEntry): DOMRect | null {
  const rects = [...entry.range.getClientRects()].filter((r) => r.width || r.height);
  return unionRect(rects);
}

function isExpandedCard(card: HTMLElement): boolean {
  return card.classList.contains('is-expanded') || card.classList.contains('is-editing');
}

/**
 * Collapsed: tab sits at the LEFT edge of the minimap column; the rest of the 240px card
 * extends rightward INTO the minimap area and is covered by it (z-index 130 > 125).
 * No clip-path needed — the minimap column does the masking.
 *
 * Expanded: full card just left of the minimap, or beside the highlight when there's room.
 *
 * Mobile (no toc column): tab at the right viewport edge; panel off-screen to the right.
 */
function applyCardGeometry(entry: PlaintextNoteEntry): void {
  const union = rangeUnion(entry);
  if (!union) return;

  const card = entry.card;
  const expanded = isExpandedCard(card);
  const tocRect = tocColumnRect();

  card.style.top = `${union.top}px`;
  card.style.width = `${CARD_WIDTH_PX}px`;

  if (!tocRect) {
    // Mobile: tab peeks from the right viewport edge; panel is off-screen to the right.
    if (!expanded) {
      card.style.left = `${window.innerWidth - CARD_WIDTH_PX}px`;
    } else {
      const beside = union.right + BESIDE_GAP_PX;
      card.style.left = `${Math.min(beside, window.innerWidth - CARD_WIDTH_PX - 12)}px`;
    }
    return;
  }

  if (!expanded) {
    const left = collapsedTabRestLeft(tocRect);
    card.style.left = `${left}px`;
  } else {
    card.style.left = `${expandedCardLeft(union, tocRect)}px`;
  }
}

function layoutDashRects(entry: PlaintextNoteEntry): void {
  const rects = [...entry.range.getClientRects()].filter((r) => r.width || r.height);
  for (let i = 0; i < entry.dashElements.length; i += 1) {
    if (rects[i]) layoutFixedRect(entry.dashElements[i], rects[i]);
  }
}

function isNoteEnterAnimating(entry: PlaintextNoteEntry): boolean {
  return (
    entry.card.classList.contains('is-note-awaiting-enter') ||
    entry.card.classList.contains('is-note-flying-in') ||
    entry.card.classList.contains('is-note-expanding') ||
    entry.card.classList.contains('is-note-collapsing') ||
    FLY_IN_WANTED.has(entry.id)
  );
}

function layoutEntry(entry: PlaintextNoteEntry, opts?: { forceGeometry?: boolean }): void {
  layoutDashRects(entry);
  const skipGeometry = !opts?.forceGeometry && isNoteEnterAnimating(entry);
  if (skipGeometry) return;
  applyCardGeometry(entry);
}

function runFlyInAnimation(entry: PlaintextNoteEntry): void {
  const card = entry.card;
  cancelNoteCardAnimations(card);
  if (!card.classList.contains('is-collapsed')) {
    card.classList.remove('is-note-awaiting-enter', 'is-note-flying-in');
    card.style.transform = '';
    FLY_IN_WANTED.delete(entry.id);
    return;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    card.classList.remove('is-note-awaiting-enter', 'is-note-flying-in');
    card.style.transform = '';
    FLY_IN_WANTED.delete(entry.id);
    applyCardGeometry(entry);
    return;
  }

  applyCardGeometry(entry);

  card.classList.remove('is-note-awaiting-enter');
  card.classList.add('is-note-flying-in');
  card.style.transform = `translateX(${FLY_IN_SLIDE_PX}px)`;
  void card.offsetWidth;

  const anim = card.animate(
    [
      { transform: `translateX(${FLY_IN_SLIDE_PX}px)` },
      { transform: 'translateX(0)' },
    ],
    {
      duration: 360,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards',
    },
  );

  anim.onfinish = () => {
    card.classList.remove('is-note-flying-in');
    card.style.transform = '';
    FLY_IN_WANTED.delete(entry.id);
  };
}

function flushPendingFlyIns(): void {
  const ids = new Set<string>(FLY_IN_WANTED);
  for (const entry of ENTRIES) {
    if (entry.card.classList.contains('is-note-awaiting-enter')) ids.add(entry.id);
  }

  if (!ids.size) return;

  requestAnimationFrame(() => {
    for (const id of ids) {
      const entry = getPlaintextNoteEntry(id);
      if (!entry) continue;
      runFlyInAnimation(entry);
    }
  });
}

export function scheduleFlyInPlaintextNote(id: string): void {
  FLY_IN_WANTED.add(id);
}

export function registerPlaintextNoteFallbackRange(id: string, range: Range): void {
  PENDING_FALLBACK_RANGES.set(id, range.cloneRange());
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
  if (wantsFlyIn(record)) {
    entry.card.classList.add('is-note-awaiting-enter');
    FLY_IN_WANTED.add(record.id);
  }
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
  layoutEntry(entry, { forceGeometry: true });
  if (entry.card.classList.contains('is-note-awaiting-enter')) {
    entry.card.style.transform = `translateX(${FLY_IN_SLIDE_PX}px)`;
  }
}

function removePlaintextNoteEntry(id: string): void {
  const index = ENTRIES.findIndex((entry) => entry.id === id);
  if (index === -1) return;

  const entry = ENTRIES[index];
  for (const dash of entry.dashElements) dash.remove();
  entry.card.remove();
  ENTRIES.splice(index, 1);
  FLY_IN_WANTED.delete(id);
  PENDING_FALLBACK_RANGES.delete(id);

  if (expandedId === id) expandedId = null;

  if (!ENTRIES.length) {
    layer?.remove();
    layer = null;
    layerArticle = null;
  }
}

function syncPlaintextNoteContent(entry: PlaintextNoteEntry, record: AnnotationRecord): void {
  if (entry.card.classList.contains('is-editing')) return;

  const text = record.comment ?? '';
  const body = entry.card.querySelector<HTMLElement>('[data-text-note-body]');
  const input = entry.card.querySelector<HTMLTextAreaElement>('[data-text-note-input]');
  if (body) body.textContent = text;
  if (input) input.value = text;
}

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
  const pendingFallback = PENDING_FALLBACK_RANGES.get(record.id);
  let range = resolved ?? fallbackRange ?? pendingFallback ?? rangeFromStoredPosition(article, record);
  if (!range) {
    return false;
  }

  attachPlaintextNote(article, range, record);
  if (pendingFallback) PENDING_FALLBACK_RANGES.delete(record.id);
  return Boolean(getPlaintextNoteEntry(record.id));
}

export function renderPlaintextNotes(article: HTMLElement, records: AnnotationRecord[]): void {
  const eligible = records.filter(
    (record) =>
      record.kind === 'highlight' &&
      record.comment?.trim() &&
      record.anchor.kind === 'text',
  );
  const wantedIds = new Set(eligible.map((record) => record.id));

  for (const entry of [...ENTRIES]) {
    if (!wantedIds.has(entry.id)) removePlaintextNoteEntry(entry.id);
  }

  for (const record of eligible) {
    const existing = getPlaintextNoteEntry(record.id);
    if (existing) {
      const { range, stale } = reAnchorRecord(article, record);
      if (range && !stale) {
        updatePlaintextNoteRange(record.id, range);
      }
      syncPlaintextNoteContent(existing, record);
      layoutEntry(existing);
      continue;
    }

    mountPlaintextNote(article, record);
  }

  flushPendingFlyIns();
}

export function clearPlaintextNotes(): void {
  while (ENTRIES.length) {
    removePlaintextNoteEntry(ENTRIES[0].id);
  }
  expandedId = null;
  layer?.remove();
  layer = null;
  layerArticle = null;
  FLY_IN_WANTED.clear();
  PENDING_FALLBACK_RANGES.clear();
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
  layoutEntry(entry);
}

export function getPlaintextNoteEntry(id: string): PlaintextNoteEntry | undefined {
  return ENTRIES.find((e) => e.id === id);
}

export function expandedPlaintextNoteId(): string | null {
  return expandedId;
}

export function collapseAllPlaintextNotes(): void {
  const closingId = expandedId;
  for (const entry of ENTRIES) {
    collapsePlaintextNoteEntry(entry, { animate: entry.id === closingId });
  }
  expandedId = null;
}

function commitCollapsedGeometry(entry: PlaintextNoteEntry): void {
  const card = entry.card;
  card.classList.remove('is-expanded', 'is-editing', 'is-note-expanding', 'is-note-collapsing');
  card.classList.add('is-collapsed');
  card.style.transform = '';
  applyCardGeometry(entry);
  layoutDashRects(entry);
}

function collapsePlaintextNoteEntry(entry: PlaintextNoteEntry, opts?: { animate?: boolean }): void {
  const card = entry.card;
  const wasExpanded = card.classList.contains('is-expanded') || card.classList.contains('is-editing');
  cancelNoteCardAnimations(card);
  resetCardEditUi(card);

  const slide = resolveSlideLefts(entry);
  if (!slide) {
    commitCollapsedGeometry(entry);
    return;
  }

  const { collapsedLeft: toLeft } = slide;

  if (!opts?.animate || !wasExpanded) {
    commitCollapsedGeometry(entry);
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    commitCollapsedGeometry(entry);
    return;
  }

  const fromLeft = card.getBoundingClientRect().left;
  if (Math.abs(fromLeft - toLeft) < 2) {
    commitCollapsedGeometry(entry);
    return;
  }

  card.classList.remove('is-expanded', 'is-editing', 'is-note-expanding', 'is-note-collapsing', 'is-collapsed');
  card.style.transform = '';

  runCardSlideAnimation(entry, {
    fromLeft,
    toLeft,
    baseLeft: toLeft,
    animClass: 'is-note-collapsing',
    onFinish: () => {
      card.classList.add('is-collapsed');
    },
  });
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

/** @deprecated Prefer scheduleFlyInPlaintextNote before refresh; flush runs at end of render. */
export function flyInPlaintextNote(id: string): void {
  scheduleFlyInPlaintextNote(id);
  flushPendingFlyIns();
}

export function expandPlaintextNote(id: string): void {
  const entry = getPlaintextNoteEntry(id);
  if (!entry) return;

  for (const other of ENTRIES) {
    if (other.id !== id) collapsePlaintextNoteEntry(other, { animate: false });
  }

  const card = entry.card;
  cancelNoteCardAnimations(card);

  if (expandedId === id && card.classList.contains('is-expanded')) {
    return;
  }

  const slide = resolveSlideLefts(entry);
  if (!slide) {
    card.classList.remove('is-collapsed');
    card.classList.add('is-expanded');
    expandedId = id;
    layoutEntry(entry);
    return;
  }

  const { collapsedLeft: fromLeft, expandedLeft: toLeft } = slide;

  resetCardEditUi(card);
  card.classList.remove('is-expanded', 'is-editing', 'is-note-expanding', 'is-note-collapsing');
  card.classList.add('is-collapsed');
  card.style.transform = '';
  applyCardGeometry(entry);
  layoutDashRects(entry);
  expandedId = id;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || Math.abs(fromLeft - toLeft) < 2) {
    card.classList.remove('is-collapsed');
    card.classList.add('is-expanded');
    applyCardGeometry(entry);
    layoutDashRects(entry);
    return;
  }

  card.classList.remove('is-collapsed');

  runCardSlideAnimation(entry, {
    fromLeft,
    toLeft,
    baseLeft: toLeft,
    animClass: 'is-note-expanding',
    onFinish: () => {
      card.classList.add('is-expanded');
    },
  });
}

export async function collapsePlaintextNoteIfOffscreen(id: string): Promise<boolean> {
  const entry = getPlaintextNoteEntry(id);
  if (!entry || expandedId !== id) return false;

  const union = rangeUnion(entry);
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
