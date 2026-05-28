import type { BlockContent, ContainerDirective, List, ListItem, Parent, Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

const CALLOUT_NAMES = new Set([
  'theorem',
  'example',
  'proof',
  'tip',
  'warning',
  'note',
  'exam',
  'key',
  'summary',
  'solution',
  'placeholder',
]);

const CHOICE_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

type FragmentRenderer = (children: BlockContent[]) => string;

type LeafDirective = { parent: Parent; index: number; dir: ContainerDirective };

function attrs(node: ContainerDirective): Record<string, string> {
  const raw = node.attributes ?? {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (v === undefined || v === null) continue;
    out[k] = String(v);
  }
  return out;
}

function labelText(node: ContainerDirective): string | undefined {
  if (typeof node.label === 'string' && node.label.trim()) return node.label.trim();
  return undefined;
}

function htmlNode(value: string): { type: 'html'; value: string } {
  return { type: 'html', value };
}

function calloutHtml(name: string, title: string | undefined, bodyHtml: string): string {
  const label = title
    ? `<div class="callout__label">${escapeHtml(title)}</div>`
    : defaultLabel(name);
  return `<div class="callout callout--${name} theorem-box"><div class="callout__body">${label}${bodyHtml}</div></div>`;
}

function defaultLabel(name: string): string {
  const labels: Record<string, string> = {
    theorem: 'Theorem',
    example: 'Example',
    proof: 'Proof',
    tip: 'Tip',
    warning: 'Warning',
    note: 'Note',
    exam: 'On the exam',
    key: 'Key formula',
    summary: 'Summary',
    solution: 'Solution',
    placeholder: 'Coming soon',
  };
  const text = labels[name] ?? name;
  return `<div class="callout__label">${text}</div>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isOrphanFenceParagraph(node: BlockContent): boolean {
  if (node.type !== 'paragraph') return false;
  const lines = toString(node)
    .trim()
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.length > 0 && lines.every((line) => /^:::+\s*$/.test(line));
}

function withoutOrphanFenceParagraphs(nodes: BlockContent[]): BlockContent[] {
  return nodes.filter((node) => !isOrphanFenceParagraph(node));
}

function isChoiceList(node: BlockContent): node is List {
  if (node.type !== 'list') return false;
  if (node.ordered) return false;
  return node.children.length > 0 && node.children.length <= 6;
}

function choiceHtml(item: ListItem, renderFragment: FragmentRenderer): string {
  const html = renderFragment(item.children as BlockContent[]);
  return html
    .replace(/^\[[ xX]\]\s*/i, '')
    .replace(/^<p>\[[ xX]\]\s*/i, '<p>')
    .replace(/^<p>([\s\S]*)<\/p>\s*$/i, '$1')
    .trim();
}

function extractChoices(list: List, renderFragment: FragmentRenderer): { letter: string; html: string }[] {
  return list.children.map((item, idx) => {
    const letter = CHOICE_LETTERS[idx] ?? String(idx + 1);
    return { letter, html: choiceHtml(item, renderFragment) };
  });
}

function hasNestedDirective(dir: ContainerDirective): boolean {
  for (const child of dir.children ?? []) {
    if (child.type !== 'containerDirective') continue;
    const childName = (child as ContainerDirective).name;
    if ((dir.name === 'mcq' || dir.name === 'frq') && childName === 'solution') continue;
    return true;
  }
  return false;
}

function parentDirective(parent: Parent): ContainerDirective | null {
  if (parent.type === 'containerDirective') return parent as ContainerDirective;
  return null;
}

function findLeafDirective(tree: Root): LeafDirective | null {
  let leaf: LeafDirective | null = null;
  visit(tree, 'containerDirective', (node, index, parent) => {
    if (leaf) return;
    if (!parent || index === undefined) return;
    const dir = node as ContainerDirective;
    const parentDir = parentDirective(parent);
    if (dir.name === 'solution' && parentDir && (parentDir.name === 'mcq' || parentDir.name === 'frq')) {
      return;
    }
    if (hasNestedDirective(dir)) return;
    leaf = { parent, index, dir };
  });
  return leaf;
}

function processLeaf(leaf: LeafDirective, renderFragment: FragmentRenderer) {
  const { parent, index, dir } = leaf;
  const name = dir.name;
  const replace = (html: string) => {
    parent.children[index] = htmlNode(html);
  };

  if (CALLOUT_NAMES.has(name)) {
    const title = labelText(dir);
    const body = renderFragment(dir.children as BlockContent[]);
    replace(calloutHtml(name, title, body));
    return;
  }

  if (name === 'figure' || name === 'figures') {
    const a = attrs(dir);
    const w = a.width ?? a.w;
    const widthClass = w ? ` note-img--w${w}` : '';
    const parts = dir.children as BlockContent[];
    let imgHtml = '';
    let caption = '';

        for (const child of parts) {
          if (child.type === 'image') {
            imgHtml = `<img class="note-img${widthClass}" src="${escapeHtml(child.url)}" alt="${escapeHtml(child.alt ?? '')}" loading="lazy" decoding="async" />`;
            continue;
          }
          if (child.type === 'paragraph') {
            const text = toString(child);
            const imgMatch = /!\[([^\]]*)\]\(([^)]+)\)/.exec(text);
            if (imgMatch) {
              imgHtml = `<img class="note-img${widthClass}" src="${escapeHtml(imgMatch[2])}" alt="${escapeHtml(imgMatch[1])}" loading="lazy" decoding="async" />`;
            } else if (!caption) {
              caption = text;
            }
          }
        }

    const cap = caption ? `<figcaption class="note-figure__caption">${escapeHtml(caption)}</figcaption>` : '';
    const wrap =
      name === 'figures'
        ? `<figure class="note-figures">${imgHtml}${cap}</figure>`
        : `<figure class="note-figure">${imgHtml}${cap}</figure>`;
    replace(wrap);
    return;
  }

  if (name === 'practice') {
    const body = withoutOrphanFenceParagraphs(dir.children as BlockContent[]);
    replace(`<div class="practice-set" data-practice>${renderFragment(body)}</div>`);
    return;
  }

  if (name === 'mcq') {
    const a = attrs(dir);
    const correct = (a.correct ?? 'A').toUpperCase();
    const id = a.id ?? '';

    let solutionNodes: BlockContent[] = [];
    const stemNodes: BlockContent[] = [];
    let choiceList: List | null = null;

    for (const child of dir.children as BlockContent[]) {
      if (child.type === 'containerDirective' && (child as ContainerDirective).name === 'solution') {
        solutionNodes = (child as ContainerDirective).children as BlockContent[];
        continue;
      }
      if (child.type === 'list' && isChoiceList(child)) {
        choiceList = child;
        continue;
      }
      stemNodes.push(child);
    }

    const stemHtml = renderFragment(stemNodes);
    const choices = choiceList ? extractChoices(choiceList, renderFragment) : [];
    const choicesHtml = choices
      .map(
        ({ letter, html }) =>
          `<li><button type="button" class="mcq-choice" data-choice="${letter}">${html}</button></li>`,
      )
      .join('');

    const solutionHtml = renderFragment(solutionNodes);

    replace(
      `<div class="mcq" data-mcq data-correct="${correct}"${id ? ` data-mcq-id="${escapeHtml(id)}"` : ''}>
<div class="mcq-stem">${stemHtml}</div>
<ul class="mcq-choices">${choicesHtml}</ul>
<div class="mcq-actions">
<button type="button" data-mcq-check>Check</button>
<button type="button" data-mcq-show-solution>Show solution</button>
<button type="button" data-mcq-skip>Skip</button>
</div>
<p class="mcq-feedback" data-feedback="correct" hidden>Correct.</p>
<p class="mcq-feedback" data-feedback="incorrect" hidden>Not quite — try again or show the solution.</p>
<div class="mcq-solution" data-solution hidden>${solutionHtml}</div>
</div>`,
    );
    return;
  }

  if (name === 'frq') {
    const a = attrs(dir);
    const id = a.id ?? '';
    let solutionNodes: BlockContent[] = [];
    const bodyNodes: BlockContent[] = [];

    for (const child of dir.children as BlockContent[]) {
      if (child.type === 'containerDirective' && (child as ContainerDirective).name === 'solution') {
        solutionNodes = (child as ContainerDirective).children as BlockContent[];
        continue;
      }
      bodyNodes.push(child);
    }

    const bodyHtml = renderFragment(bodyNodes);
    const solutionHtml = renderFragment(solutionNodes);

    replace(
      `<div class="frq" data-frq${id ? ` data-frq-id="${escapeHtml(id)}"` : ''}>
<div class="frq-parts">${bodyHtml}</div>
<div class="frq-actions"><button type="button" data-frq-reveal>Show solution</button></div>
<div class="frq-solution" data-solution hidden>${solutionHtml}</div>
</div>`,
    );
    return;
  }

}

export function remarkDirectives(renderFragment: FragmentRenderer) {
  return (tree: Root) => {
    for (;;) {
      const leaf = findLeafDirective(tree);
      if (!leaf) break;
      processLeaf(leaf, renderFragment);
    }
  };
}
