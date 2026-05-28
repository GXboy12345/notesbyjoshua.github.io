import type { ContainerDirective, Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { preprocessMarkdown } from './markdown-preprocess';
import { CALLOUT_DEFAULT_LABELS, CALLOUT_FIELD_SPECS } from './markdown/callout-fields';
import { convertLegacyHtmlToDirectives } from './markdown/legacy-html';

const GREEK: Record<string, string> = {
  alpha: 'alpha',
  beta: 'beta',
  gamma: 'gamma',
  delta: 'delta',
  epsilon: 'epsilon',
  varepsilon: 'epsilon',
  zeta: 'zeta',
  eta: 'eta',
  theta: 'theta',
  vartheta: 'theta',
  iota: 'iota',
  kappa: 'kappa',
  lambda: 'lambda',
  mu: 'mu',
  nu: 'nu',
  xi: 'xi',
  pi: 'pi',
  varpi: 'pi',
  rho: 'rho',
  varrho: 'rho',
  sigma: 'sigma',
  varsigma: 'sigma',
  tau: 'tau',
  upsilon: 'upsilon',
  phi: 'phi',
  varphi: 'phi',
  chi: 'chi',
  psi: 'psi',
  omega: 'omega',
  Gamma: 'gamma',
  Delta: 'delta',
  Theta: 'theta',
  Lambda: 'lambda',
  Xi: 'xi',
  Pi: 'pi',
  Sigma: 'sigma',
  Upsilon: 'upsilon',
  Phi: 'phi',
  Psi: 'psi',
  Omega: 'omega',
};

const markdownParser = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkDirective)
  .use(remarkMath);

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/** Turn LaTeX into extra searchable tokens (e.g. `\sigma` → `sigma`). */
function latexToSearchTokens(latex: string): string {
  const withGreek = latex.replace(/\\([A-Za-z]+)/g, (_, cmd: string) => {
    return GREEK[cmd] ?? cmd;
  });
  return normalizeWhitespace(
    withGreek
      .replace(/[{}^_\\$]/g, ' ')
      .replace(/[^\w\s+-]/g, ' ')
      .replace(/\s+/g, ' '),
  );
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

export type ExtractedSearchText = {
  body: string;
  math: string;
  labels: string;
  headings: string;
};

export function extractSearchText(rawMd: string): ExtractedSearchText {
  const md = convertLegacyHtmlToDirectives(preprocessMarkdown(rawMd));
  const tree = markdownParser.parse(md) as Root;

  const mathParts: string[] = [];
  const labelParts: string[] = [];
  const headingParts: string[] = [];

  visit(tree, (node) => {
    if (node.type === 'inlineMath' || node.type === 'math') {
      const latex = node.value.trim();
      if (!latex) return;
      mathParts.push(latex);
      mathParts.push(latexToSearchTokens(latex));
      return;
    }

    if (node.type === 'heading') {
      const text = toString(node).trim();
      if (text) headingParts.push(text);
      return;
    }

    if (node.type === 'containerDirective' || node.type === 'leafDirective') {
      labelParts.push(...directiveLabels(node as ContainerDirective));
    }
  });

  const body = normalizeWhitespace(toString(tree));

  return {
    body,
    math: normalizeWhitespace(mathParts.join(' ')),
    labels: normalizeWhitespace(labelParts.join(' ')),
    headings: normalizeWhitespace(headingParts.join(' ')),
  };
}

export function excerptFromBody(body: string, max = 160): string {
  if (body.length <= max) return body;
  return `${body.slice(0, max).trimEnd()}…`;
}
