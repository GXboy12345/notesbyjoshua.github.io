import type { Parent, Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

/** Remove paragraph nodes that are only `:::` — invalid extra closes from nested directives. */
export function remarkStripOrphanFences() {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      if (!parent || index === undefined) return;
      if (node.type !== 'paragraph') return;

      const lines = toString(node)
        .trim()
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean);
      if (!lines.length || !lines.every((line) => /^:::+\s*$/.test(line))) return;

      (parent as Parent).children.splice(index, 1);
      return index;
    });
  };
}
