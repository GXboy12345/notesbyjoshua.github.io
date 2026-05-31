// Minimap controller: scaled DOM-clone preview with feathered viewport unblur,
// heading labels, bookmark stars, draggable viewport thumb, and scroll-spy active state.
// Skipped entirely under reduced motion or below the desktop breakpoint.

import { readPageMeta, reAnchorRecord, scrollTargetForRecord } from '../lib/annotations/anchors';
import { listAnnotationsForPage } from '../lib/annotations/db';
import { MINIMAP_NOTE_ICON, MINIMAP_STAR_ICON } from '../lib/annotations/icons';
import { excerptForRecord } from '../lib/annotations/search';
import { ANNOTATIONS_CHANGED, type AnnotationRecord } from '../lib/annotations/types';
import { scrollToY } from './hash-scroll.ts';

const DESKTOP_QUERY = '(min-width: 1100px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const MIN_THUMB_PX = 12;
const LABEL_MIN_GAP_PX = 11;
const STAR_MIN_GAP_PX = 10;

type Heading = { depth: 2 | 3; slug: string; text: string };

type Geometry = {
  articleWidth: number;
  articleHeight: number;
  previewWidth: number;
  previewHeight: number;
  scale: number;
  topInset: number;
  leftInset: number;
  renderedWidth: number;
  renderedHeight: number;
  articleTopInRoot: number;
};

type Controller = { destroy(): void };

// ─── Utilities ────────────────────────────────────────────────────────────────

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function cssPropPx(el: HTMLElement, prop: string, fallback: number): number {
  const raw = getComputedStyle(el).getPropertyValue(prop).trim();
  const val = parseFloat(raw);
  return Number.isFinite(val) ? val : fallback;
}

// ─── Clone ────────────────────────────────────────────────────────────────────

function buildClone(article: HTMLElement): HTMLElement {
  const clone = article.cloneNode(true) as HTMLElement;
  clone.classList.add('doc-minimap__clone');
  clone.setAttribute('aria-hidden', 'true');
  clone.setAttribute('inert', '');

  // Duplicate IDs cause broken anchors and querySelector collisions.
  clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));

  // Anchors: strip navigation so any pointer-events that leak don't navigate.
  clone.querySelectorAll<HTMLAnchorElement>('a').forEach((a) => {
    a.removeAttribute('href');
    a.removeAttribute('target');
    a.removeAttribute('rel');
  });

  // Open details so their expanded content contributes to height.
  clone.querySelectorAll<HTMLDetailsElement>('details').forEach((d) => {
    d.open = true;
  });

  // Remove runtime-only elements that bring no visual value to the minimap.
  clone.querySelectorAll('script, style, iframe, video, audio, canvas').forEach((el) => el.remove());

  // Simplify images: no need for responsive selection variants in a tiny preview.
  clone.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
    img.loading = 'eager';
    img.decoding = 'async';
    img.removeAttribute('srcset');
  });

  return clone;
}

// ─── Geometry ─────────────────────────────────────────────────────────────────

function measureArticleTopInRoot(scrollRoot: HTMLElement, article: HTMLElement): number {
  const rootRect = scrollRoot.getBoundingClientRect();
  const articleRect = article.getBoundingClientRect();
  return scrollRoot.scrollTop + articleRect.top - rootRect.top;
}

function measureGeometry(
  article: HTMLElement,
  scrollRoot: HTMLElement,
  preview: HTMLElement,
  minimap: HTMLElement,
  toc: HTMLElement,
): Geometry {
  const aRect = article.getBoundingClientRect();
  const padX = cssPropPx(minimap, '--minimap-preview-pad-x', 10);
  const padY = cssPropPx(minimap, '--minimap-preview-pad-y', 8);

  // hidden/display:none yields 0×0 — fall back to the visible TOC column.
  let previewWidth = preview.getBoundingClientRect().width;
  let previewHeight = preview.getBoundingClientRect().height;
  if (previewWidth <= 0 || previewHeight <= 0) {
    const minimapRect = minimap.getBoundingClientRect();
    previewWidth = minimapRect.width;
    previewHeight = minimapRect.height;
  }
  if (previewWidth <= 0 || previewHeight <= 0) {
    const tocRect = toc.getBoundingClientRect();
    previewWidth = tocRect.width;
    previewHeight = Math.min(
      tocRect.height,
      window.innerHeight - parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) - 24,
    );
  }

  const articleWidth = aRect.width;
  const articleHeight = article.scrollHeight;

  // Fit within padded preview bounds so short pages keep side/bottom breathing room.
  const scale = Math.min(
    (previewWidth - 2 * padX) / articleWidth,
    (previewHeight - 2 * padY) / articleHeight,
  );
  if (!Number.isFinite(scale) || scale <= 0) {
    return {
      articleWidth,
      articleHeight,
      previewWidth,
      previewHeight,
      scale: 0,
      topInset: padY,
      leftInset: padX,
      renderedWidth: 0,
      renderedHeight: 0,
      articleTopInRoot: measureArticleTopInRoot(scrollRoot, article),
    };
  }

  const renderedWidth = articleWidth * scale;
  const renderedHeight = articleHeight * scale;
  const leftInset = Math.max(padX, (previewWidth - renderedWidth) / 2);
  const topInset = Math.max(padY, (previewHeight - renderedHeight) / 2);
  const articleTopInRoot = measureArticleTopInRoot(scrollRoot, article);

  return {
    articleWidth,
    articleHeight,
    previewWidth,
    previewHeight,
    scale,
    topInset,
    leftInset,
    renderedWidth,
    renderedHeight,
    articleTopInRoot,
  };
}

function applyGeometry(minimap: HTMLElement, g: Geometry) {
  // Custom properties cascade to .doc-minimap__scaled descendants via inheritance.
  minimap.style.setProperty('--article-width', `${g.articleWidth}px`);
  minimap.style.setProperty('--article-height', `${g.articleHeight}px`);
  minimap.style.setProperty('--minimap-scale', String(g.scale));
  minimap.style.setProperty('--preview-top-inset', `${g.topInset}px`);
  minimap.style.setProperty('--preview-left-inset', `${g.leftInset}px`);
}

// ─── Coordinate helpers ────────────────────────────────────────────────────────

/** Article-space Y → minimap-space Y (pixels from top of preview). */
function aToM(articleY: number, g: Geometry): number {
  return g.topInset + articleY * g.scale;
}

/** Minimap-space Y → article-space Y (pixels from article top). */
function mToA(miniY: number, g: Geometry): number {
  return clamp((miniY - g.topInset) / g.scale, 0, g.articleHeight);
}

function scrollMax(root: HTMLElement): number {
  return Math.max(0, root.scrollHeight - root.clientHeight);
}

/** Visible slice of the article mapped to article-space coordinates. */
function visibleArticleRange(
  scrollRoot: HTMLElement,
  article: HTMLElement,
): { top: number; bottom: number; articleHeight: number; snapFullBlock: boolean } {
  const articleTop = measureArticleTopInRoot(scrollRoot, article);
  const articleHeight = article.scrollHeight;
  const contentStart = articleTop;
  const contentEnd = articleTop + articleHeight;
  const viewStart = scrollRoot.scrollTop;
  const viewEnd = viewStart + scrollRoot.clientHeight;
  const maxScroll = scrollMax(scrollRoot);
  const snapFullBlock = maxScroll < 2;

  if (snapFullBlock) {
    return { top: 0, bottom: articleHeight, articleHeight, snapFullBlock: true };
  }

  const visStart = Math.max(viewStart, contentStart);
  const visEnd = Math.min(viewEnd, contentEnd, scrollRoot.scrollHeight);
  let top = clamp(visStart - articleTop, 0, articleHeight);
  let bottom = clamp(visEnd - articleTop, top, articleHeight);

  // Scroll root extent (padding, subpixel) can be shorter than articleTop + scrollHeight;
  // pin the band to the article end when the user has reached scroll bottom.
  if (scrollRoot.scrollTop >= maxScroll - 2) {
    const band = bottom - top;
    bottom = articleHeight;
    top = Math.max(0, articleHeight - band);
  }

  return { top, bottom, articleHeight, snapFullBlock: false };
}

// ─── Sharp-layer feathered mask ───────────────────────────────────────────────

// Two clone layers are stacked: a globally-blurred base and a sharp top layer
// masked to the viewport band with a soft gradient feather. This produces the
// "defocused document with sharp window" effect without a single-element hack.

function applySharpMask(
  layer: HTMLElement,
  miniTop: number,
  miniBottom: number,
  feather: number,
  totalHeight: number,
) {
  const a = clamp(miniTop - feather, 0, totalHeight);
  const b = clamp(miniTop, 0, totalHeight);
  const c = clamp(miniBottom, 0, totalHeight);
  const d = clamp(miniBottom + feather, 0, totalHeight);
  const mask = `linear-gradient(to bottom, transparent ${a}px, black ${b}px, black ${c}px, transparent ${d}px)`;
  layer.style.maskImage = mask;
  (layer.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = mask;
}

// ─── Heading labels ───────────────────────────────────────────────────────────

function buildLabelElements(container: HTMLElement, headings: Heading[]) {
  const frag = document.createDocumentFragment();
  for (const h of headings) {
    const a = document.createElement('a');
    a.className = 'doc-minimap__label';
    a.dataset.slug = h.slug;
    a.dataset.depth = String(h.depth);
    a.textContent = h.text;
    a.href = `#${h.slug}`;
    frag.appendChild(a);
  }
  container.replaceChildren(frag);
}

function positionLabels(
  container: HTMLElement,
  headings: Heading[],
  article: HTMLElement,
  g: Geometry,
) {
  const articleTop = article.getBoundingClientRect().top;

  for (const h of headings) {
    const label = container.querySelector<HTMLElement>(
      `.doc-minimap__label[data-slug="${CSS.escape(h.slug)}"]`,
    );
    const el = document.getElementById(h.slug);
    if (!label) continue;
    if (!el) {
      label.style.opacity = '0';
      label.style.pointerEvents = 'none';
      continue;
    }
    const headingArticleY = el.getBoundingClientRect().top - articleTop;
    label.style.top = `${aToM(clamp(headingArticleY, 0, g.articleHeight), g)}px`;
    label.style.opacity = '';
    label.style.pointerEvents = '';
  }

  // Colliding H3 labels: hide (never move — true position is the invariant).
  const labels = [...container.querySelectorAll<HTMLElement>('.doc-minimap__label')].sort(
    (a, b) => parseFloat(a.style.top || '0') - parseFloat(b.style.top || '0'),
  );
  let lastBottom = -Infinity;
  for (const label of labels) {
    const y = parseFloat(label.style.top || '0');
    if (label.dataset.depth === '3' && y < lastBottom + LABEL_MIN_GAP_PX) {
      label.style.opacity = '0';
      label.style.pointerEvents = 'none';
    } else if (!label.style.opacity) {
      lastBottom = y;
    }
  }
}

// ─── Scroll spy ───────────────────────────────────────────────────────────────

function setupScrollSpy(
  scrollRoot: HTMLElement,
  headings: Heading[],
  onActive: (slug: string) => void,
): IntersectionObserver {
  const els = headings
    .map((h) => document.getElementById(h.slug))
    .filter((el): el is HTMLElement => Boolean(el));

  let current: string | null = null;

  // Observer fires on changes; inside the callback, re-query live positions.
  // This avoids the instability of relying on the entries order alone.
  const observer = new IntersectionObserver(
    () => {
      const rootTop = scrollRoot.getBoundingClientRect().top;
      const candidates = els
        .map((el) => ({ id: el.id, y: el.getBoundingClientRect().top - rootTop }))
        .filter((x) => x.y <= scrollRoot.clientHeight * 0.3)
        .sort((a, b) => b.y - a.y);

      const next = candidates[0]?.id ?? els[0]?.id ?? null;
      if (next && next !== current) {
        current = next;
        onActive(next);
      }
    },
    { root: scrollRoot, rootMargin: '0px 0px -70% 0px', threshold: [0, 1] },
  );

  for (const el of els) observer.observe(el);

  // Sync initial active state.
  requestAnimationFrame(() => {
    const first = els[0]?.id;
    if (first) onActive(first);
  });

  return observer;
}

type MinimapMarkerKind = 'bookmark' | 'note';

type MinimapMarker = {
  record: AnnotationRecord;
  articleY: number;
  kind: MinimapMarkerKind;
};

function articleYForTarget(article: HTMLElement, target: HTMLElement): number {
  const articleTop = article.getBoundingClientRect().top;
  return target.getBoundingClientRect().top - articleTop;
}

function articleYForRange(article: HTMLElement, range: Range): number {
  const articleTop = article.getBoundingClientRect().top;
  const rects = [...range.getClientRects()].filter((r) => r.width || r.height);
  const y = rects.length ? rects[0].top : range.getBoundingClientRect().top;
  return y - articleTop;
}

function markerLabel(record: AnnotationRecord): string {
  return excerptForRecord(record);
}

function buildMinimapMarkers(
  container: HTMLElement,
  markers: MinimapMarker[],
  onJump: (record: AnnotationRecord) => void,
) {
  const frag = document.createDocumentFragment();
  for (const { record, articleY, kind } of markers) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className =
      kind === 'bookmark' ? 'doc-minimap__star' : 'doc-minimap__poi doc-minimap__poi--note';
    btn.dataset.annotationId = record.id;
    btn.dataset.markerKind = kind;
    const label = markerLabel(record);
    btn.setAttribute('aria-label', label);
    btn.title = label;
    btn.style.top = `${articleY}px`;
    btn.innerHTML = kind === 'bookmark' ? MINIMAP_STAR_ICON : MINIMAP_NOTE_ICON;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      onJump(record);
    });
    frag.appendChild(btn);
  }
  container.replaceChildren(frag);
}

function collapseMarkerOverlap(container: HTMLElement) {
  const markers = [
    ...container.querySelectorAll<HTMLElement>('.doc-minimap__star, .doc-minimap__poi'),
  ].sort((a, b) => parseFloat(a.style.top || '0') - parseFloat(b.style.top || '0'));
  let lastBottom = -Infinity;
  for (const marker of markers) {
    const y = parseFloat(marker.style.top || '0');
    if (y < lastBottom + STAR_MIN_GAP_PX) {
      marker.hidden = true;
      marker.style.pointerEvents = 'none';
    } else {
      marker.hidden = false;
      marker.style.pointerEvents = '';
      lastBottom = y;
    }
  }
}

async function resolveMinimapMarkers(article: HTMLElement): Promise<MinimapMarker[]> {
  if (!article.dataset.pageId) return [];
  const records = await listAnnotationsForPage(readPageMeta(article).pageId);
  const out: MinimapMarker[] = [];

  for (const record of records) {
    if (record.kind === 'bookmark' && record.anchor.kind !== 'page') {
      const { stale, element } = reAnchorRecord(article, record);
      if (stale || !element) continue;
      const articleY = clamp(articleYForTarget(article, element), 0, article.scrollHeight);
      out.push({ record, articleY, kind: 'bookmark' });
      continue;
    }

    if (!record.comment?.trim()) continue;

    if (record.kind === 'highlight' && record.anchor.kind === 'text') {
      const { range, stale } = reAnchorRecord(article, record);
      if (stale || !range) continue;
      const articleY = clamp(articleYForRange(article, range), 0, article.scrollHeight);
      out.push({ record, articleY, kind: 'note' });
    }
  }

  out.sort((a, b) => a.articleY - b.articleY);
  return out;
}

// ─── Bookmark stars (legacy section label) ────────────────────────────────────

// ─── Main controller ──────────────────────────────────────────────────────────

export function setupDocMinimap(): Controller | null {
  if (matchMedia(REDUCED_MOTION_QUERY).matches) return null;
  if (!matchMedia(DESKTOP_QUERY).matches) return null;

  const toc = document.querySelector<HTMLElement>('[data-doc-toc]');
  const minimap = document.querySelector<HTMLElement>('[data-doc-minimap]');
  const preview = document.querySelector<HTMLElement>('[data-minimap-preview]');
  const blurSlot = document.querySelector<HTMLElement>('[data-minimap-blur]');
  const sharpSlot = document.querySelector<HTMLElement>('[data-minimap-sharp]');
  const vpEl = document.querySelector<HTMLElement>('[data-minimap-viewport]');
  const labelsEl = document.querySelector<HTMLElement>('[data-minimap-labels]');
  const starsEl = document.querySelector<HTMLElement>('[data-minimap-stars]');
  const scrollRoot = document.querySelector<HTMLElement>('.doc-main');
  const article = scrollRoot?.querySelector<HTMLElement>('article.prose') ?? null;

  if (
    !toc || !minimap || !preview || !blurSlot || !sharpSlot ||
    !vpEl || !labelsEl || !starsEl || !scrollRoot || !article
  ) return null;

  const raw = toc.dataset.headings;
  if (!raw) return null;

  let headings: Heading[];
  try {
    headings = (JSON.parse(raw) as Heading[]).filter(
      (h) => (h.depth === 2 || h.depth === 3) && h.slug && h.text,
    );
  } catch {
    return null;
  }
  if (!headings.length) return null;

  let g: Geometry | null = null;
  let measureRaf = 0;
  let syncRaf = 0;
  let destroyed = false;
  const abort = new AbortController();
  const { signal } = abort;

  // ── Build clones ──

  blurSlot.replaceChildren(buildClone(article));
  sharpSlot.replaceChildren(buildClone(article));
  buildLabelElements(labelsEl, headings);

  // Must be in layout (not display:none) before measure; HTML starts with [hidden].
  minimap.removeAttribute('hidden');
  minimap.classList.add('doc-minimap--boot');

  function setMinimapActive(active: boolean) {
    toc.dataset.minimapActive = active ? 'true' : 'false';
    if (active) {
      minimap.removeAttribute('hidden');
      minimap.classList.remove('doc-minimap--boot');
      minimap.setAttribute('aria-hidden', 'false');
    } else {
      minimap.classList.add('doc-minimap--boot');
      minimap.hidden = true;
      minimap.setAttribute('aria-hidden', 'true');
    }
  }

  // ── Observers ──

  const ro = new ResizeObserver(() => scheduleMeasure());
  ro.observe(article);
  ro.observe(scrollRoot);
  ro.observe(preview);
  ro.observe(minimap);
  ro.observe(toc);

  scrollRoot.addEventListener('scroll', scheduleSync, { passive: true, signal });
  scrollRoot.addEventListener('scrollend', scheduleSync, { passive: true, signal });
  window.addEventListener('resize', scheduleMeasure, { passive: true, signal });
  document.addEventListener(ANNOTATIONS_CHANGED, scheduleMinimapMarkers, { signal });

  // ── Interaction ──

  preview.addEventListener('pointerdown', onPreviewDown, { signal });
  vpEl.addEventListener('pointerdown', onViewportDown, { signal });

  // Wheel over the minimap scrolls the article scaled by 1/scale (compression factor).
  // passive: false so preventDefault() suppresses the TOC column's own scroll.
  minimap.addEventListener('wheel', onMinimapWheel, { passive: false, signal });

  // Labels are real anchors; hash-scroll.ts intercepts them globally for animated jumps.

  // ── Active heading spy ──

  const spy = setupScrollSpy(scrollRoot, headings, (slug) => {
    labelsEl
      .querySelectorAll<HTMLElement>('.doc-minimap__label')
      .forEach((el) => { el.dataset.active = el.dataset.slug === slug ? 'true' : 'false'; });
  });

  // ── Image remeasure ──

  article.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
    if (!img.complete) {
      img.addEventListener('load', scheduleMeasure, { once: true, signal });
      img.addEventListener('error', scheduleMeasure, { once: true, signal });
    }
  });

  // ── Initial measure after fonts + layout settle ──

  document.fonts.ready
    .catch(() => undefined)
    .then(() => nextFrame())
    .then(() => nextFrame())
    .then(() => { if (!destroyed) measureAndSync(); });

  // ── Controller ──

  return {
    destroy() {
      if (destroyed) return;
      destroyed = true;
      abort.abort();
      cancelAnimationFrame(measureRaf);
      cancelAnimationFrame(syncRaf);
      ro.disconnect();
      spy.disconnect();
      blurSlot.replaceChildren();
      sharpSlot.replaceChildren();
      labelsEl.replaceChildren();
      starsEl.replaceChildren();
      setMinimapActive(false);
      minimap.classList.remove('doc-minimap--boot');
      ['--article-width', '--article-height', '--minimap-scale', '--preview-top-inset', '--preview-left-inset'].forEach(
        (p) => minimap.style.removeProperty(p),
      );
    },
  };

  // ── Internal helpers ──

  function scheduleMeasure() {
    cancelAnimationFrame(measureRaf);
    measureRaf = requestAnimationFrame(() => {
      measureRaf = 0;
      measureAndSync();
    });
  }

  function scheduleSync() {
    cancelAnimationFrame(syncRaf);
    syncRaf = requestAnimationFrame(() => {
      syncRaf = 0;
      syncScroll();
    });
  }

  function measureAndSync() {
    g = measureGeometry(article, scrollRoot, preview, minimap, toc);
    if (g.scale <= 0) {
      setMinimapActive(false);
      return;
    }
    setMinimapActive(true);
    applyGeometry(minimap, g);
    positionLabels(labelsEl, headings, article, g);
    void refreshMinimapMarkers();
    syncScroll();
  }

  async function refreshMinimapMarkers() {
    if (!g || g.scale <= 0) {
      starsEl.replaceChildren();
      return;
    }
    const markers = await resolveMinimapMarkers(article);
    if (destroyed) return;
    buildMinimapMarkers(
      starsEl,
      markers.map(({ record, articleY, kind }) => ({
        record,
        kind,
        articleY: aToM(clamp(articleY, 0, g!.articleHeight), g!),
      })),
      (record) => jumpToAnnotation(record),
    );
    collapseMarkerOverlap(starsEl);
  }

  function scheduleMinimapMarkers() {
    void refreshMinimapMarkers();
  }

  function jumpToAnnotation(record: AnnotationRecord) {
    if (!g) return;
    const target = scrollTargetForRecord(article, record);
    if (!target) return;
    let y: number;
    if (record.kind === 'highlight' && record.comment?.trim() && record.anchor.kind === 'text') {
      const { range, stale } = reAnchorRecord(article, record);
      if (stale || !range) return;
      y = clamp(articleYForRange(article, range), 0, g.articleHeight);
    } else {
      y = clamp(articleYForTarget(article, target), 0, g.articleHeight);
    }
    scrollToArticleY(y, true);
    if (record.kind === 'highlight' && record.comment?.trim() && record.anchor.kind === 'text') {
      window.dispatchEvent(
        new CustomEvent('annotations:focus-text-note', { detail: { id: record.id } }),
      );
    }
  }

  function syncScroll() {
    if (!g || g.scale <= 0) return;
    const { top, bottom, articleHeight, snapFullBlock } = visibleArticleRange(scrollRoot, article);

    let miniTop: number;
    let miniBot: number;
    if (snapFullBlock) {
      miniTop = g.topInset;
      miniBot = g.topInset + g.renderedHeight;
    } else {
      miniTop = g.topInset + top * g.scale;
      miniBot = g.topInset + bottom * g.scale;
    }

    const thumbH = Math.max(MIN_THUMB_PX, miniBot - miniTop);
    vpEl.style.top = `${miniTop}px`;
    vpEl.style.height = `${thumbH}px`;

    const featherMini = cssPropPx(minimap, '--minimap-feather', 18);
    const featherArticle = g.scale > 0 ? featherMini / g.scale : 0;
    const maskHeight = Math.max(articleHeight, g.articleHeight);
    applySharpMask(sharpSlot, top, bottom, featherArticle, maskHeight);
  }

  function scrollToArticleY(articleY: number, animated: boolean) {
    if (!g) return;
    const articleTop = measureArticleTopInRoot(scrollRoot, article);
    const targetY = clamp(
      articleTop + articleY - scrollRoot.clientHeight / 2,
      0,
      scrollMax(scrollRoot),
    );
    scrollToY(targetY, animated ? 'smooth' : 'auto');
  }

  function onPreviewDown(event: PointerEvent) {
    if (event.button !== 0 || !g) return;
    preview.setPointerCapture(event.pointerId);
    minimap.dataset.dragging = 'true';

    const gesture = new AbortController();
    signal.addEventListener('abort', () => gesture.abort(), { once: true });

    let dragged = false;
    const previewTop = preview.getBoundingClientRect().top;
    const articleYAt = (clientY: number) => mToA(clientY - previewTop, g!);

    const scrub = (ev: PointerEvent) => {
      dragged = true;
      scrollToArticleY(articleYAt(ev.clientY), false);
    };

    const end = (ev: PointerEvent) => {
      if (!dragged) scrollToArticleY(articleYAt(ev.clientY), true);
      minimap.dataset.dragging = 'false';
      gesture.abort();
    };

    preview.addEventListener('pointermove', scrub, { signal: gesture.signal });
    preview.addEventListener('pointerup', end, { once: true, signal: gesture.signal });
    preview.addEventListener('pointercancel', end, { once: true, signal: gesture.signal });
  }

  function onMinimapWheel(event: WheelEvent) {
    if (!g) return;
    event.preventDefault();

    // Normalize deltaY to pixels regardless of deltaMode.
    let deltaPx: number;
    switch (event.deltaMode) {
      case WheelEvent.DOM_DELTA_LINE: deltaPx = event.deltaY * 16; break;
      case WheelEvent.DOM_DELTA_PAGE: deltaPx = event.deltaY * scrollRoot.clientHeight; break;
      default: deltaPx = event.deltaY;
    }

    // Scale up by the inverse compression factor: 1 minimap-pixel = 1/scale article-pixels.
    scrollToY(
      clamp(scrollRoot.scrollTop + deltaPx / g.scale, 0, scrollMax(scrollRoot)),
      'auto',
    );
  }

  function onViewportDown(event: PointerEvent) {
    if (event.button !== 0 || !g) return;
    event.preventDefault();
    event.stopPropagation(); // Prevent preview's pointerdown from also firing.
    vpEl.setPointerCapture(event.pointerId);
    minimap.dataset.dragging = 'true';

    const gesture = new AbortController();
    signal.addEventListener('abort', () => gesture.abort(), { once: true });

    const previewTop = preview.getBoundingClientRect().top;
    const grabMiniY = event.clientY - previewTop;
    const grabOffset = grabMiniY - parseFloat(vpEl.style.top || '0');

    const drag = (ev: PointerEvent) => {
      if (!g) return;
      const thumbTopMini = ev.clientY - previewTop - grabOffset;
      const targetY = clamp(
        measureArticleTopInRoot(scrollRoot, article) + mToA(thumbTopMini, g),
        0,
        scrollMax(scrollRoot),
      );
      scrollToY(targetY, 'auto');
    };

    const end = () => { minimap.dataset.dragging = 'false'; gesture.abort(); };

    vpEl.addEventListener('pointermove', drag, { signal: gesture.signal });
    vpEl.addEventListener('pointerup', end, { once: true, signal: gesture.signal });
    vpEl.addEventListener('pointercancel', end, { once: true, signal: gesture.signal });
  }
}

// ─── Page lifecycle ───────────────────────────────────────────────────────────

let active: Controller | null = null;

function boot() {
  active?.destroy();
  active = null;

  if (matchMedia(REDUCED_MOTION_QUERY).matches || !matchMedia(DESKTOP_QUERY).matches) return;

  const init = () => {
    try {
      active?.destroy();
      active = setupDocMinimap();
    } catch {
      active = null;
    }
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(init, { timeout: 800 });
  } else {
    setTimeout(init, 1);
  }
}

export function initDocMinimap() {
  boot();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

document.addEventListener('astro:page-load', boot);
document.addEventListener('astro:before-swap', () => { active?.destroy(); active = null; });

matchMedia(REDUCED_MOTION_QUERY).addEventListener('change', boot);
matchMedia(DESKTOP_QUERY).addEventListener('change', boot);
