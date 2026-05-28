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
import { remarkDirectives } from './remark-directives';
import { remarkStripOrphanFences } from './remark-strip-orphan-fences';
import { headingsFromMdast, remarkHeadingIds, type DocHeading } from './remark-heading-ids';
import { resetSlugCounts } from './slugify';

export type { DocHeading };

const mdastToHast = unified()
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeKatex);

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
const applyDirectives = remarkDirectives(mdastFragmentToHtml);
const applyHeadingIds = remarkHeadingIds();

export function renderMarkdownToHtml(rawMd: string): { html: string; headings: DocHeading[] } {
  const md = convertLegacyHtmlToDirectives(preprocessMarkdown(rawMd));
  resetSlugCounts();

  const tree = markdownParser.parse(md) as Root;
  applyStripOrphanFences(tree);
  applyDirectives(tree);
  applyStripOrphanFences(tree);
  applyHeadingIds(tree);
  const headings = headingsFromMdast(tree);
  return { html: mdastTreeToHtml(tree), headings };
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
