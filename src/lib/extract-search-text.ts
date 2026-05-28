import type { ContainerDirective, Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { latexToSearchText } from './latex-search-text';
import { preprocessMarkdown } from './markdown-preprocess';
import { CALLOUT_DEFAULT_LABELS, CALLOUT_FIELD_SPECS } from './markdown/callout-fields';
import { convertLegacyHtmlToDirectives } from './markdown/legacy-html';
import { assignHeadingSlug, resetSlugCounts } from './markdown/slugify';
import type { SearchSnippetBlock } from './search-types';

const markdownParser = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkDirective)
  .use(remarkMath);

const SNIPPET_BODY_MAX = 200;

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function truncate(text: string, max = SNIPPET_BODY_MAX): string {
  const plain = normalizeWhitespace(text);
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max).trimEnd()}…`;
}

function directiveLabels(node: ContainerDirective): string[] {
  const parts: string[] = [];
  const name = node.name;
  const defaultLabel = CALLOUT_DEFAULT_LABELS[name];
  if (defaultLabel) parts.push(defaultLabel);

  const spec = CALLOUT_FIELD_SPECS[name];
  const attrs = node.attributes ?? {};
  if (spec) {
    const field = attrs[spec.attr];
    if (field != null && String(field).trim()) parts.push(String(field).trim());
  }

  if (typeof node.label === 'string' && node.label.trim()) parts.push(node.label.trim());

  for (const value of Object.values(attrs)) {
    if (value == null) continue;
    const text = String(value).trim();
    if (text) parts.push(text);
  }

  if (name === 'mcq' || name === 'frq' || name === 'figure' || name === 'figures') {
    parts.push(name.toUpperCase());
  }

  return parts;
}

function directiveSnippetText(node: ContainerDirective): string {
  const labels = directiveLabels(node);
  const body = truncate(toString(node));
  if (labels.length && body) return `${labels.join(' — ')}: ${body}`;
  if (labels.length) return labels.join(' — ');
  return body;
}

export type ExtractedSearchText = {
  body: string;
  math: string;
  labels: string;
  headings: string;
  snippetBlocks: SearchSnippetBlock[];
};

export function extractSearchText(rawMd: string): ExtractedSearchText {
  const md = convertLegacyHtmlToDirectives(preprocessMarkdown(rawMd));
  resetSlugCounts();
  const tree = markdownParser.parse(md) as Root;

  const mathParts: string[] = [];
  const labelParts: string[] = [];
  const headingParts: string[] = [];
  const snippetBlocks: SearchSnippetBlock[] = [];

  let currentHeading = '';
  let currentAnchor = '';

  visit(tree, (node) => {
    if (node.type === 'heading') {
      const text = toString(node).trim();
      if (!text) return;
      headingParts.push(text);
      currentHeading = text;
      currentAnchor = assignHeadingSlug(text);
      snippetBlocks.push({
        kind: 'heading',
        heading: text,
        anchor: currentAnchor,
        text,
      });
      return;
    }

    if (node.type === 'inlineMath' || node.type === 'math') {
      const latex = node.value.trim();
      if (!latex) return;
      const normalized = latexToSearchText(latex);
      mathParts.push(normalized);
      snippetBlocks.push({
        kind: 'math',
        heading: currentHeading || undefined,
        anchor: currentAnchor || undefined,
        text: currentHeading ? `${currentHeading} formula` : 'Formula match',
        displayMath: latex,
        normalizedMath: normalized,
      });
      return;
    }

    if (node.type === 'containerDirective' || node.type === 'leafDirective') {
      const dir = node as ContainerDirective;
      labelParts.push(...directiveLabels(dir));
      snippetBlocks.push({
        kind: 'label',
        heading: currentHeading || undefined,
        anchor: currentAnchor || undefined,
        text: directiveSnippetText(dir),
      });
    }
  });

  const body = normalizeWhitespace(toString(tree));

  return {
    body,
    math: normalizeWhitespace(mathParts.join(' ')),
    labels: normalizeWhitespace(labelParts.join(' ')),
    headings: normalizeWhitespace(headingParts.join(' ')),
    snippetBlocks,
  };
}

export function excerptFromBody(body: string, max = 160): string {
  if (body.length <= max) return body;
  return `${body.slice(0, max).trimEnd()}…`;
}
