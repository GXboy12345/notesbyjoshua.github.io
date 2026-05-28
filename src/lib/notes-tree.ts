import type { DocEntry } from './resolve-doc';
import { routePath } from './routes';
import { p, pathActive } from './paths';

export type TreeNode = {
  label: string;
  path?: string;
  href?: string;
  children: TreeNode[];
};

type InternalNode = TreeNode & { _k: string };

const SEGMENT_LABELS: Record<string, string> = {
  aps: 'AP',
  APs: 'AP',
  'ap-calc': 'AP Calculus',
  'ap-chem': 'AP Chemistry',
  'ap-stats': 'AP Statistics',
  'ap-precalc': 'AP Precalc',
  'ap-physics-c-mechanics': 'AP Physics C: Mechanics',
  'ap-physics-c-em': 'AP Physics C: E&M',
  fma: 'F=ma',
  usapho: 'USAPhO',
  physics: 'Physics',
  math: 'Math',
  notes: 'Notes',
};

function humanizeSegment(raw: string): string {
  const segment = raw.replace(/\.md$/i, '');
  const known = SEGMENT_LABELS[segment] ?? SEGMENT_LABELS[segment.toLowerCase()];
  if (known) return known;
  if (/[\s_]/.test(segment) || /[A-Z].*[A-Z]/.test(segment)) return segment.replace(/_/g, ' ');

  return segment
    .replace(/-/g, ' ')
    .replace(/\b(ap|c|em|ab|bc)\b/gi, (word) => word.toUpperCase())
    .replace(/\bfma\b/gi, 'F=ma')
    .replace(/\b\w+/g, (word) => {
      if (word === 'AP' || word === 'F=ma' || word === 'USAPhO') return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
}

function leafTitle(entry: DocEntry, fallback: string): string {
  return entry.data.title ?? humanizeSegment(fallback);
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
        label: humanizeSegment(part),
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

export function treeContainsActive(node: TreeNode, current: string): boolean {
  if (node.path && pathActive(current, node.path)) return true;
  return node.children.some((child) => treeContainsActive(child, current));
}

export function branchIsOpen(node: TreeNode, current: string, depth: number): boolean {
  if (depth < 1) return true;
  return treeContainsActive(node, current);
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

  return children as TreeNode[];
}
