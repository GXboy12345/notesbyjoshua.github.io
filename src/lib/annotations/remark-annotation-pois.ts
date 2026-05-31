const CALLOUT_PATTERN =
  /<div class="callout callout--([a-z-]+) theorem-box">/g;
const FIGURE_PATTERN = /<figure class="note-figure(?:s)?">/g;
const PRACTICE_PATTERN = /<div class="practice-set" data-practice>/g;
const MCQ_PATTERN =
  /<div class="mcq" data-mcq(?: data-correct="[^"]*")?(?: data-mcq-id="([^"]*)")?>/g;
const FRQ_PATTERN =
  /<div class="frq" data-frq(?: data-frq-id="([^"]*)")?/g;

function injectAttr(openTag: string, attrs: Record<string, string>): string {
  const attrStr = Object.entries(attrs)
    .map(([k, v]) => `${k}="${v.replace(/"/g, '&quot;')}"`)
    .join(' ');
  return openTag.replace(/>$/, ` ${attrStr}>`);
}

function slugSegment(value: string, fallback: string): string {
  const s = value
    .normalize('NFKC')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
  return s || fallback;
}

/** Inject stable POI ids into rendered note HTML at build time. */
export function injectAnnotationPois(html: string, pageSlug: string): string {
  const counters: Record<string, number> = {
    callout: 0,
    figure: 0,
    practice: 0,
    mcq: 0,
    frq: 0,
  };

  let out = html.replace(CALLOUT_PATTERN, (match, name: string) => {
    counters.callout += 1;
    const label = slugSegment(name, String(counters.callout));
    const poiId = `${pageSlug}:callout:${name}:${label}-${counters.callout}`;
    return injectAttr(match, {
      'data-poi-id': poiId,
      'data-block-kind': name,
    });
  });

  out = out.replace(FIGURE_PATTERN, (match) => {
    counters.figure += 1;
    const poiId = `${pageSlug}:figure:${counters.figure}`;
    return injectAttr(match, {
      'data-poi-id': poiId,
      'data-block-kind': 'figure',
    });
  });

  out = out.replace(PRACTICE_PATTERN, (match) => {
    counters.practice += 1;
    const poiId = `${pageSlug}:practice:${counters.practice}`;
    return injectAttr(match, {
      'data-poi-id': poiId,
      'data-block-kind': 'practice',
    });
  });

  out = out.replace(MCQ_PATTERN, (match, mcqId?: string) => {
    counters.mcq += 1;
    const idPart = mcqId ? slugSegment(mcqId, String(counters.mcq)) : String(counters.mcq);
    const poiId = `${pageSlug}:mcq:${idPart}`;
    return injectAttr(match, {
      'data-poi-id': poiId,
      'data-block-kind': 'mcq',
    });
  });

  out = out.replace(FRQ_PATTERN, (match, frqId?: string) => {
    counters.frq += 1;
    const idPart = frqId ? slugSegment(frqId, String(counters.frq)) : String(counters.frq);
    const poiId = `${pageSlug}:frq:${idPart}`;
    return injectAttr(match, {
      'data-poi-id': poiId,
      'data-block-kind': 'frq',
    });
  });

  return out;
}
