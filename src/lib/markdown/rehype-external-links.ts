import type { Element, Root } from 'hast';
import { visit } from 'unist-util-visit';

const EXTERNAL_HREF = /^(https?:|mailto:|tel:|\/\/)/i;

function isExternalHref(href: string): boolean {
  return EXTERNAL_HREF.test(href.trim());
}

function appendClass(existing: unknown, name: string): string | string[] {
  const parts =
    typeof existing === 'string'
      ? existing.split(/\s+/).filter(Boolean)
      : Array.isArray(existing)
        ? existing.map(String).filter(Boolean)
        : [];
  if (!parts.includes(name)) parts.push(name);
  return parts.length === 1 ? parts[0] : parts;
}

/** Open off-site prose links in a new tab and mark them for pop-out styling. */
export function rehypeExternalLinks() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'a') return;

      const props = node.properties ?? (node.properties = {});
      const href = props.href;
      if (typeof href !== 'string' || !isExternalHref(href)) return;

      props.target = '_blank';
      props.rel = 'noopener noreferrer';
      props.className = appendClass(props.className, 'link-external');
    });
  };
}
