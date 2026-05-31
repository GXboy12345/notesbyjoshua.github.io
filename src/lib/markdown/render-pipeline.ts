import type { BlockContent, Root } from 'mdast';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { preprocessMarkdown } from '../markdown-preprocess';
import { convertLegacyHtmlToDirectives } from './legacy-html';
import { rehypeExternalLinks } from './rehype-external-links';
import { remarkDirectives } from './remark-directives';
import { remarkKatexArraySpacing } from './remark-katex-array-spacing';
import { remarkStripOrphanFences } from './remark-strip-orphan-fences';
import { headingsFromMdast, remarkHeadingIds, type DocHeading } from './remark-heading-ids';
import { resetSlugCounts } from './slugify';
import { contentHashFromMdast } from '../annotations/content-hash';
import { injectAnnotationPois } from '../annotations/remark-annotation-pois';

export type { DocHeading };

export type RenderMarkdownOptions = {
  pageSlug?: string;
  injectPois?: boolean;
};

const mdastToHast = unified()
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeKatex)
  .use(rehypeExternalLinks);

const hastToHtml = unified().use(rehypeStringify, { allowDangerousHtml: true });

function mdastFragmentToHtml(children: BlockContent[]): string {
  if (!children.length) return '';
  const tree: Root = { type: 'root', children };
  const hast = mdastToHast.runSync(tree);
  return String(hastToHtml.stringify(hast));
}

function mdastTreeToHtml(tree: Root): string {
  const hast = mdastToHast.runSync(tree);
  return String(hastToHtml.stringify(hast));
}

const markdownParser = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkDirective)
  .use(remarkMath);

const applyStripOrphanFences = remarkStripOrphanFences();
const applyKatexArraySpacing = remarkKatexArraySpacing();
const applyDirectives = remarkDirectives(mdastFragmentToHtml);
const applyHeadingIds = remarkHeadingIds();

export function renderMarkdownToHtml(
  rawMd: string,
  options: RenderMarkdownOptions = {},
): { html: string; headings: DocHeading[]; contentHash: string } {
  const md = convertLegacyHtmlToDirectives(preprocessMarkdown(rawMd));
  resetSlugCounts();

  const tree = markdownParser.parse(md) as Root;
  applyKatexArraySpacing(tree);
  applyStripOrphanFences(tree);
  applyHeadingIds(tree);
  applyDirectives(tree);
  applyStripOrphanFences(tree);
  const headings = headingsFromMdast(tree);
  const contentHash = contentHashFromMdast(tree);
  let html = mdastTreeToHtml(tree);
  if (options.injectPois && options.pageSlug) {
    html = injectAnnotationPois(html, options.pageSlug);
  }
  return { html, headings, contentHash };
}

/** Regex TOC fallback when full parse is unnecessary. */
export function headingsFromMarkdownFallback(md: string): DocHeading[] {
  const out: DocHeading[] = [];
  for (const line of md.split('\n')) {
    const m = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!m) continue;
    const text = m[2].replace(/\s+#+\s*$/, '').trim();
    out.push({
      depth: m[1].length,
      slug: text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-'),
      text,
    });
  }
  return out;
}
