import type { DocEntry } from './resolve-doc';
import { routePath } from './routes';
import { p } from './paths';

export type TreeNode = {
  label: string;
  path?: string;
  href?: string;
  children: TreeNode[];
};

type InternalNode = TreeNode & { _k: string };

function leafTitle(entry: DocEntry, fallback: string): string {
  return entry.data.title ?? fallback.replace(/\.md$/, '');
}

function insert(root: InternalNode[], parts: string[], entry: DocEntry) {
  let level = root;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const isLeaf = i === parts.length - 1;
    const key = parts.slice(0, i + 1).join('/').toLowerCase();
    let node = level.find((n) => n._k === key);
    if (!node) {
      node = {
        label: part.replace(/\.md$/i, ''),
        children: [],
        _k: key,
      };
      level.push(node);
    }
    if (isLeaf) {
      node.label = leafTitle(entry, part);
      node.path = routePath(entry);
      node.href = p(node.path);
    }
    level = node.children as InternalNode[];
  }
}

export function buildNotesTree(entries: DocEntry[]): TreeNode[] {
  const notes = entries.filter((e) => e.collection === 'notes');
  const children: InternalNode[] = [];

  for (const entry of notes) {
    insert(children, entry.id.split('/').filter(Boolean), entry);
  }

  const sortNodes = (nodes: InternalNode[]) => {
    nodes.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));
    for (const n of nodes) sortNodes(n.children as InternalNode[]);
  };
  sortNodes(children);

  return [
    {
      label: 'All notes',
      path: '/Notes/notes/',
      href: p('/Notes/notes/'),
      children: children as TreeNode[],
    },
  ];
}
