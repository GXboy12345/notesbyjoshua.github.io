import { createHash } from 'node:crypto';
import type { Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import { normalizePlainText } from './sanitize';

/** Build normalized plain text from mdast for content fingerprinting. */
export function plainTextFromMdast(tree: Root): string {
  const parts: string[] = [];
  visit(tree, (node) => {
    if (node.type === 'heading' || node.type === 'paragraph' || node.type === 'listItem') {
      const text = normalizePlainText(toString(node));
      if (text) parts.push(text);
    }
  });
  return parts.join('\n');
}

export function contentHashFromPlainText(text: string): string {
  const normalized = normalizePlainText(text);
  return createHash('sha256').update(normalized).digest('hex').slice(0, 16);
}

export function contentHashFromMdast(tree: Root): string {
  return contentHashFromPlainText(plainTextFromMdast(tree));
}
