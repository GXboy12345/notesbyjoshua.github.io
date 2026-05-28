import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

const ARRAY_STRETCH = String.raw`\def\arraystretch{1.35} `;

/** Two-column centered arrays read better as r|l lookup tables. */
const TWO_COL_CENTER = /\\begin\{array\}\{c\|c\}(?!\|)/g;

function improveArraySpacing(value: string): string {
  if (!value.includes(String.raw`\begin{array}`)) return value;

  let next = value;
  if (!next.includes(String.raw`\arraystretch`)) {
    next = ARRAY_STRETCH + next;
  }
  next = next.replace(TWO_COL_CENTER, String.raw`\begin{array}{r|l}`);
  return next;
}

export function remarkKatexArraySpacing() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type !== 'math' && node.type !== 'inlineMath') return;
      if (!('value' in node) || typeof node.value !== 'string') return;
      node.value = improveArraySpacing(node.value);
    });
  };
}
