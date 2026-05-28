import type { Heading, PhrasingContent, Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import { assignHeadingSlug } from './slugify';

export type DocHeading = { depth: number; slug: string; text: string };

type HeadingData = { headingText?: string; hProperties?: { id?: string } };

/** Slug/TOC text only—skips directives and injected HTML. */
export function headingPlainText(node: Heading): string {
  const parts: string[] = [];
  for (const child of node.children as PhrasingContent[]) {
    if (child.type === 'text') parts.push(child.value);
    else if (child.type === 'inlineCode') parts.push(child.value);
    else if (child.type === 'link') parts.push(toString(child));
  }
  return parts.join('').replace(/\s+/g, ' ').trim();
}

export function remarkHeadingIds() {
  return (tree: Root) => {
    visit(tree, 'heading', (node: Heading) => {
      const text = headingPlainText(node);
      const id = assignHeadingSlug(text);
      const data = (node.data ??= {}) as HeadingData;
      data.headingText = text;
      const props = (data.hProperties ??= {}) as Record<string, unknown>;
      props.id = id;
    });
  };
}

export function headingsFromMdast(tree: Root): DocHeading[] {
  const out: DocHeading[] = [];
  visit(tree, 'heading', (node: Heading) => {
    const data = node.data as HeadingData | undefined;
    const text = data?.headingText ?? headingPlainText(node);
    const depth = node.depth;
    const id = (node.data?.hProperties as { id?: string } | undefined)?.id ?? '';
    if (depth >= 2 && depth <= 3 && id) {
      out.push({ depth, slug: id, text });
    }
  });
  return out;
}
