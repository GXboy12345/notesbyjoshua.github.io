import type { DocEntry } from './resolve-doc';
import { routePath, routeSlug } from './routes';
import { p, pathsRelated } from './paths';

export type TreeNode = {
  label: string;
  path?: string;
  href?: string;
  order?: number;
  children: TreeNode[];
};

type InternalNode = TreeNode & { _k: string };

/** Unit-folder slug → hub-page slug (same parent). */
const BRANCH_HUB: Record<string, string> = {
  precalc: 'precalculus',
  chem: 'chemistry',
  stats: 'statistics',
};

const SEGMENT_LABELS: Record<string, string> = {
  aps: 'AP',
  ap: 'AP',
  'ap-calc': 'AP Calculus',
  'ap-chem': 'AP Chemistry',
  'ap-stats': 'AP Statistics',
  'ap-precalc': 'AP Precalc',
  precalc: 'AP Precalc',
  precalculus: 'AP Precalculus',
  calculus: 'AP Calculus',
  chemistry: 'AP Chemistry',
  statistics: 'AP Statistics',
  'ap-physics-c-mechanics': 'AP Physics C: Mechanics',
  'ap-physics-c-em': 'AP Physics C: E&M',
  fma: 'F=ma',
  usapho: 'USAPhO',
  physics: 'Physics',
  math: 'Math',
  notes: 'Notes',
  algebra: 'Algebra',
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

function slugParts(entry: DocEntry): string[] {
  const raw = routeSlug(entry).replace(/^\/+|\/+$/g, '');
  const parts = raw.split('/').filter(Boolean);
  if (parts[0]?.toLowerCase() === 'notes') parts.shift();
  return parts;
}

function insert(root: InternalNode[], parts: string[], entry: DocEntry) {
  let level = root;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const isLeaf = i === parts.length - 1;
    const key = parts
      .slice(0, i + 1)
      .map((s) => s.toLowerCase())
      .join('/');
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
      if (entry.data.nav_order != null) node.order = entry.data.nav_order;
    }
    level = node.children as InternalNode[];
  }
}

function sortNodes(nodes: InternalNode[]) {
  nodes.sort((a, b) => {
    const ao = a.order ?? Number.POSITIVE_INFINITY;
    const bo = b.order ?? Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    return a.label.localeCompare(b.label, undefined, { sensitivity: 'base' });
  });
  for (const n of nodes) sortNodes(n.children as InternalNode[]);
}

function mergeBranchHubs(nodes: InternalNode[]) {
  const tail = (k: string) => k.split('/').pop() ?? k;
  const byTail = new Map<string, InternalNode>();
  for (const node of nodes) byTail.set(tail(node._k), node);

  for (const [branch, hub] of Object.entries(BRANCH_HUB)) {
    const branchNode = byTail.get(branch);
    if (!branchNode?.children.length) continue;

    const hubNode = byTail.get(hub);
    if (hubNode) {
      hubNode.children.push(...(branchNode.children as InternalNode[]));
      const idx = nodes.indexOf(branchNode);
      if (idx !== -1) nodes.splice(idx, 1);
      byTail.delete(branch);
    } else {
      branchNode.label = humanizeSegment(hub);
    }
  }

  sortNodes(nodes);
  for (const n of nodes) mergeBranchHubs(n.children as InternalNode[]);
}

export function treeContainsActive(node: TreeNode, current: string): boolean {
  if (node.path && pathsRelated(current, node.path)) return true;
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
    const parts = slugParts(entry);
    if (!parts.length) continue;
    insert(children, parts, entry);
  }

  mergeBranchHubs(children);
  sortNodes(children);

  return children as TreeNode[];
}
