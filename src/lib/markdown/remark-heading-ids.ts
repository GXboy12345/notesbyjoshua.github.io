import type { Heading, Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import { assignHeadingSlug } from './slugify';

export type DocHeading = { depth: number; slug: string; text: string };

export function remarkHeadingIds() {
  return (tree: Root) => {
    visit(tree, 'heading', (node: Heading) => {
      const text = toString(node);
      const id = assignHeadingSlug(text);
      const data = node.data ?? (node.data = {});
      const props = (data.hProperties ??= {}) as Record<string, unknown>;
      props.id = id;
    });
  };
}

export function headingsFromMdast(tree: Root): DocHeading[] {
  const out: DocHeading[] = [];
  visit(tree, 'heading', (node: Heading) => {
    const text = toString(node);
    const depth = node.depth;
    const id = (node.data?.hProperties as { id?: string } | undefined)?.id ?? '';
    if (depth >= 2 && depth <= 3 && id) {
      out.push({ depth, slug: id, text });
    }
  });
  return out;
}
