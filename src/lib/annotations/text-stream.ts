import { normalizePlainText } from './sanitize';

const SKIP_SELECTOR = '[data-mcq], [data-frq], script, style, .annotation-toolbar, .annotation-poi-chrome, .annotation-stale-badge, .annotation-hl-layer, .annotation-hl-handles, .annotation-on-page-note, .annotation-text-note-layer, .annotation-text-note-card';

export type TextStreamSegment = {
  node: Text;
  start: number;
  length: number;
  /** Stream offset before each DOM code unit index in `node.data` (length = node length + 1). */
  domToStream: number[];
};

export type TextStream = {
  text: string;
  segments: TextStreamSegment[];
};

function textFromNode(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return (node as Text).data;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return '';
  const el = node as Element;
  if (el.matches(SKIP_SELECTOR)) return '';
  if (el.classList.contains('katex')) {
    const mathml = el.querySelector('.katex-mathml');
    if (mathml) return mathml.textContent ?? '';
    return el.textContent ?? '';
  }
  let out = '';
  for (const child of el.childNodes) {
    out += textFromNode(child);
  }
  return out;
}

function shouldSkipElement(el: Element): boolean {
  return el.matches(SKIP_SELECTOR) || !!el.closest(SKIP_SELECTOR);
}

/** Build normalized plain-text stream from prose root for anchoring. */
export function buildTextStream(root: HTMLElement): TextStream {
  const segments: TextStreamSegment[] = [];
  let text = '';
  let atWhitespace = false;

  const append = (raw: string, node: Text) => {
    const normalized = raw.normalize('NFKC');
    const domToStream = new Array<number>(normalized.length + 1);

    if (segments.length === 0 || segments[segments.length - 1].node !== node) {
      segments.push({ node, start: text.length, length: 0, domToStream });
    } else {
      segments[segments.length - 1].domToStream = domToStream;
    }
    const seg = segments[segments.length - 1];

    for (let i = 0; i < normalized.length; i += 1) {
      domToStream[i] = text.length;
      const ch = normalized[i];
      const isWs = /\s/.test(ch);
      if (isWs) {
        if (text.length === 0 || atWhitespace) continue;
        text += ' ';
        atWhitespace = true;
        continue;
      }
      atWhitespace = false;
      text += ch;
      seg.length += 1;
    }
    domToStream[normalized.length] = text.length;
  };

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      if (node.nodeType === Node.ELEMENT_NODE && shouldSkipElement(node as Element)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        const parent = node.parentElement;
        if (!parent || shouldSkipElement(parent)) return NodeFilter.FILTER_REJECT;
        if (parent.closest('.katex-mathml')) return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let current = walker.nextNode();
  while (current) {
    if (current.nodeType === Node.TEXT_NODE) {
      append((current as Text).data, current as Text);
    } else if (current.nodeType === Node.ELEMENT_NODE && (current as Element).classList.contains('katex')) {
      append(textFromNode(current), document.createTextNode('') as Text);
    }
    current = walker.nextNode();
  }

  return { text, segments };
}

function startOfSubtree(node: Node): { node: Text; offset: number } | null {
  if (node.nodeType === Node.TEXT_NODE) return { node: node as Text, offset: 0 };
  if (node.firstChild) return startOfSubtree(node.firstChild);
  return null;
}

function endOfSubtree(node: Node): { node: Text; offset: number } | null {
  if (node.nodeType === Node.TEXT_NODE) {
    const textNode = node as Text;
    return { node: textNode, offset: textNode.data.length };
  }
  if (node.lastChild) return endOfSubtree(node.lastChild);
  return null;
}

function boundaryToDomPoint(container: Node, offset: number): { node: Text; offset: number } | null {
  if (container.nodeType === Node.TEXT_NODE) {
    const node = container as Text;
    return { node, offset: Math.max(0, Math.min(offset, node.data.length)) };
  }
  if (container.nodeType !== Node.ELEMENT_NODE) return null;

  const el = container as Element;
  const { childNodes } = el;
  if (!childNodes.length) return null;

  if (offset >= childNodes.length) {
    return endOfSubtree(childNodes[childNodes.length - 1]);
  }

  return startOfSubtree(childNodes[offset]);
}

function streamOffsetForDomPoint(stream: TextStream, node: Text, domOffset: number): number | null {
  for (const seg of stream.segments) {
    if (seg.node !== node) continue;
    const idx = Math.max(0, Math.min(domOffset, seg.domToStream.length - 1));
    return seg.domToStream[idx];
  }
  return null;
}

export function streamOffsetAtRangeBoundary(
  stream: TextStream,
  container: Node,
  offset: number,
): number | null {
  const point = boundaryToDomPoint(container, offset);
  if (!point) return null;
  return streamOffsetForDomPoint(stream, point.node, point.offset);
}

export function rangeToOffsets(stream: TextStream, range: Range): { start: number; end: number } | null {
  const startPoint = boundaryToDomPoint(range.startContainer, range.startOffset);
  const endPoint = boundaryToDomPoint(range.endContainer, range.endOffset);
  if (!startPoint || !endPoint) return null;

  const start = streamOffsetForDomPoint(stream, startPoint.node, startPoint.offset);
  const end = streamOffsetForDomPoint(stream, endPoint.node, endPoint.offset);
  if (start === null || end === null || end <= start) return null;

  const selected = stream.text.slice(start, end);
  const fromRange = normalizePlainText(range.toString());
  if (fromRange && normalizePlainText(selected) !== fromRange) {
    return null;
  }

  return { start, end };
}

function domPointForStreamOffset(stream: TextStream, offset: number): { node: Text; offset: number } | null {
  for (const seg of stream.segments) {
    if (offset < seg.start || offset > seg.start + seg.length) continue;

    const map = seg.domToStream;
    for (let i = 0; i < map.length; i += 1) {
      if (map[i] === offset) return { node: seg.node, offset: i };
    }

    for (let i = map.length - 1; i >= 0; i -= 1) {
      if (map[i] <= offset) return { node: seg.node, offset: i };
    }

    return { node: seg.node, offset: 0 };
  }
  return null;
}

export function offsetsToRange(root: HTMLElement, stream: TextStream, start: number, end: number): Range | null {
  void root;
  if (start < 0 || end <= start || end > stream.text.length) return null;
  const startPoint = domPointForStreamOffset(stream, start);
  const endPoint = domPointForStreamOffset(stream, end);
  if (!startPoint || !endPoint) return null;
  const range = document.createRange();
  try {
    range.setStart(startPoint.node, startPoint.offset);
    range.setEnd(endPoint.node, endPoint.offset);
    return range;
  } catch {
    return null;
  }
}

export function quoteFromOffsets(
  stream: TextStream,
  start: number,
  end: number,
): { exact: string; prefix?: string; suffix?: string } {
  const exact = stream.text.slice(start, end);
  const prefix = stream.text.slice(Math.max(0, start - 32), start) || undefined;
  const suffix = stream.text.slice(end, Math.min(stream.text.length, end + 32)) || undefined;
  return { exact, prefix, suffix };
}

export function selectionInsideBlockedSubtree(range: Range): boolean {
  const common = range.commonAncestorContainer;
  const el =
    common.nodeType === Node.ELEMENT_NODE
      ? (common as Element)
      : common.parentElement;
  if (!el) return true;
  return !!el.closest('[data-mcq], [data-frq]');
}
