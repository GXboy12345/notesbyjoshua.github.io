import { normalizePlainText } from './sanitize';
import type { AnnotationAnchor, AnnotationPageMeta, AnnotationRecord } from './types';
import {
  buildTextStream,
  offsetsToRange,
  quoteFromOffsets,
  rangeToOffsets,
  streamOffsetAtRangeBoundary,
  type TextStream,
} from './text-stream';

export function readPageMeta(article: HTMLElement): AnnotationPageMeta {
  return {
    pageId: article.dataset.pageId ?? normalizePagePath(window.location.pathname),
    pageTitle: article.dataset.pageTitle ?? document.title.replace(/\s·.*$/, ''),
    contentHash: article.dataset.contentHash ?? '',
  };
}

export function normalizePagePath(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let path = pathname;
  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || '/';
  }
  return path.endsWith('/') ? path : `${path}/`;
}

export function nearestHeading(
  root: HTMLElement,
  node: Node,
): { headingId: string; headingText: string } | null {
  const headings = root.querySelectorAll<HTMLElement>('h2[id], h3[id]');
  let best: HTMLElement | null = null;
  for (const heading of headings) {
    if (heading.contains(node)) {
      best = heading;
      break;
    }
    const relation = heading.compareDocumentPosition(node);
    if (relation & Node.DOCUMENT_POSITION_FOLLOWING) {
      best = heading;
    }
  }
  if (!best) return null;
  return { headingId: best.id, headingText: best.textContent?.trim() ?? '' };
}

export function anchorFromTextRange(
  article: HTMLElement,
  range: Range,
  meta: AnnotationPageMeta,
): AnnotationAnchor | null {
  const stream = buildTextStream(article);
  let offsets = rangeToOffsets(stream, range);

  if (!offsets) {
    offsets = offsetsFromRangeText(stream, range);
  }
  if (!offsets) return null;

  offsets = refineTextOffsets(stream, article, range, offsets);
  if (!offsets) return null;

  const quote = quoteFromOffsets(stream, offsets.start, offsets.end);
  const heading = nearestHeading(article, range.startContainer);
  return {
    kind: 'text',
    pageId: meta.pageId,
    pageTitle: meta.pageTitle,
    contentHashAtCreate: meta.contentHash,
    headingId: heading?.headingId,
    headingText: heading?.headingText,
    quote,
    position: offsets,
  };
}

function offsetsFromRangeText(
  stream: TextStream,
  range: Range,
): { start: number; end: number } | null {
  const exact = normalizePlainText(range.toString());
  if (!exact) return null;

  const direct = rangeToOffsets(stream, range);
  if (direct) return direct;

  try {
    const near = streamOffsetAtRangeBoundary(stream, range.startContainer, range.startOffset);
    if (near === null) return null;
    const prefix = stream.text.slice(Math.max(0, near - 32), near);
    const suffix = stream.text.slice(near, Math.min(stream.text.length, near + 32));
    const idx = findQuoteIndex(stream.text, { exact, prefix, suffix });
    if (idx < 0) return null;
    const end = endOffsetForExactAt(stream, idx, exact);
    if (end === null) return null;
    return { start: idx, end };
  } catch {
    return null;
  }
}

function endOffsetForExactAt(stream: TextStream, start: number, exact: string): number | null {
  const maxEnd = Math.min(stream.text.length, start + exact.length + 48);
  for (let end = start + 1; end <= maxEnd; end += 1) {
    if (normalizePlainText(stream.text.slice(start, end)) === exact) return end;
  }
  return null;
}

function refineTextOffsets(
  stream: TextStream,
  article: HTMLElement,
  range: Range,
  offsets: { start: number; end: number },
): { start: number; end: number } | null {
  const exact = normalizePlainText(range.toString());
  if (!exact) return null;

  const end = endOffsetForExactAt(stream, offsets.start, exact);
  if (end !== null) {
    offsets = { start: offsets.start, end };
  }

  const quote = quoteFromOffsets(stream, offsets.start, offsets.end);
  const byPos = offsetsToRange(article, stream, offsets.start, offsets.end);
  if (byPos && normalizePlainText(byPos.toString()) === normalizePlainText(quote.exact)) {
    return offsets;
  }

  const direct = rangeToOffsets(stream, range);
  if (direct) {
    const directEnd = endOffsetForExactAt(stream, direct.start, exact);
    if (directEnd !== null) return { start: direct.start, end: directEnd };
  }

  return offsets;
}

export function anchorFromHeading(
  meta: AnnotationPageMeta,
  headingId: string,
  headingText: string,
): AnnotationAnchor {
  return {
    kind: 'heading',
    pageId: meta.pageId,
    pageTitle: meta.pageTitle,
    contentHashAtCreate: meta.contentHash,
    headingId,
    headingText,
  };
}

export function anchorFromBlock(
  meta: AnnotationPageMeta,
  el: HTMLElement,
): AnnotationAnchor {
  const heading = nearestHeading(
    el.closest('article.prose') as HTMLElement,
    el,
  );
  return {
    kind: 'block',
    pageId: meta.pageId,
    pageTitle: meta.pageTitle,
    contentHashAtCreate: meta.contentHash,
    poiId: el.dataset.poiId,
    blockKind: el.dataset.blockKind,
    blockLabel: blockLabel(el),
    headingId: heading?.headingId,
    headingText: heading?.headingText,
  };
}

export function anchorFromPage(meta: AnnotationPageMeta): AnnotationAnchor {
  return {
    kind: 'page',
    pageId: meta.pageId,
    pageTitle: meta.pageTitle,
    contentHashAtCreate: meta.contentHash,
  };
}

function blockLabel(el: HTMLElement): string {
  const name = el.querySelector('.callout__name');
  if (name?.textContent) return name.textContent.trim();
  const type = el.querySelector('.callout__type');
  if (type?.textContent) return type.textContent.trim();
  const calloutLabel = el.querySelector('.callout__label, .theorem-box__label');
  if (calloutLabel?.textContent) return calloutLabel.textContent.replace(/\s+/g, ' ').trim();
  const caption = el.querySelector('.note-figure__caption, figcaption');
  if (caption?.textContent) return caption.textContent.trim();
  return el.dataset.blockKind ?? 'Block';
}

export type ReAnchorResult = {
  range: Range | null;
  stale: boolean;
  element: HTMLElement | null;
};

export function reAnchorRecord(
  article: HTMLElement,
  record: AnnotationRecord,
): ReAnchorResult {
  const meta = readPageMeta(article);
  const hashStale = meta.contentHash !== record.anchor.contentHashAtCreate;
  const anchor = record.anchor;

  if (anchor.kind === 'page') {
    return { range: null, stale: hashStale, element: article };
  }

  if (anchor.kind === 'heading' && anchor.headingId) {
    const el = article.querySelector<HTMLElement>(`#${CSS.escape(anchor.headingId)}`);
    return { range: null, stale: hashStale || !el, element: el };
  }

  if (anchor.kind === 'block' && anchor.poiId) {
    const el = article.querySelector<HTMLElement>(`[data-poi-id="${CSS.escape(anchor.poiId)}"]`);
    return { range: null, stale: hashStale || !el, element: el };
  }

  if (anchor.kind === 'text' && anchor.quote) {
    const stream = buildTextStream(article);
    const range = resolveTextAnchor(stream, article, anchor);
    return {
      range,
      stale: hashStale,
      element: range ? rangeToElement(range) : null,
    };
  }

  return { range: null, stale: true, element: null };
}

function rangeToElement(range: Range): HTMLElement | null {
  const node = range.startContainer;
  const el = node.nodeType === Node.ELEMENT_NODE ? (node as Element) : node.parentElement;
  return (el as HTMLElement | null) ?? null;
}

function resolveTextAnchor(
  stream: TextStream,
  article: HTMLElement,
  anchor: AnnotationAnchor,
): Range | null {
  const fromQuote = normalizePlainText(anchor.quote?.exact ?? '');

  if (anchor.position && fromQuote) {
    const end = endOffsetForExactAt(stream, anchor.position.start, fromQuote);
    if (end !== null) {
      const byPos = offsetsToRange(article, stream, anchor.position.start, end);
      if (byPos && normalizePlainText(byPos.toString()) === fromQuote) {
        return byPos;
      }
    }

    const byStored = offsetsToRange(article, stream, anchor.position.start, anchor.position.end);
    if (byStored && normalizePlainText(byStored.toString()) === fromQuote) {
      return byStored;
    }
  }

  const quote = anchor.quote;
  if (!quote?.exact) return null;

  const offsets = findQuoteOffsets(stream, quote, anchor.position);
  if (!offsets) return null;
  return offsetsToRange(article, stream, offsets.start, offsets.end);
}

function findQuoteOffsets(
  stream: TextStream,
  quote: { exact: string; prefix?: string; suffix?: string },
  position?: { start: number; end: number },
): { start: number; end: number } | null {
  const exact = normalizePlainText(quote.exact);
  if (!exact) return null;

  const matches: { start: number; end: number }[] = [];
  for (let start = 0; start < stream.text.length; start += 1) {
    const end = endOffsetForExactAt(stream, start, exact);
    if (end === null) continue;

    if (quote.prefix || quote.suffix) {
      const prefix = stream.text.slice(Math.max(0, start - 32), start);
      const suffix = stream.text.slice(end, Math.min(stream.text.length, end + 32));
      if (quote.prefix && !normalizePlainText(prefix).endsWith(normalizePlainText(quote.prefix))) {
        continue;
      }
      if (quote.suffix && !normalizePlainText(suffix).startsWith(normalizePlainText(quote.suffix))) {
        continue;
      }
    }

    matches.push({ start, end });
  }

  if (!matches.length) return null;

  if (position) {
    const exactPos = matches.find((m) => m.start === position.start && m.end === position.end);
    if (exactPos) return exactPos;
    const sameStart = matches.find((m) => m.start === position.start);
    if (sameStart) return sameStart;
  }

  return matches[0] ?? null;
}

function findQuoteIndex(haystack: string, quote: { exact: string; prefix?: string; suffix?: string }): number {
  const stream: TextStream = { text: haystack, segments: [] };
  return findQuoteOffsets(stream, quote)?.start ?? -1;
}

export function scrollTargetForRecord(
  article: HTMLElement,
  record: AnnotationRecord,
): HTMLElement | null {
  const { range, element } = reAnchorRecord(article, record);
  if (element) return element;
  if (range) {
    const el =
      range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
        ? (range.commonAncestorContainer as Element)
        : range.commonAncestorContainer.parentElement;
    return (el as HTMLElement | null) ?? null;
  }
  return null;
}
