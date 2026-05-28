import type { BlockContent, ContainerDirective, List, ListItem, Parent, PhrasingContent, Root } from 'mdast';
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

function isChoiceList(node: BlockContent): node is List {
  if (node.type !== 'list') return false;
  return node.children.length > 0 && node.children.length <= 6;
}

function extractChoices(list: List): { letter: string; html: string }[] {
  return list.children.map((item, idx) => {
    const letter = CHOICE_LETTERS[idx] ?? String(idx + 1);
    const inner = listItemHtml(item);
    return { letter, html: inner };
  });
}

function listItemHtml(item: ListItem): string {
  const parts: string[] = [];
  for (const child of item.children) {
    if (child.type === 'paragraph') {
      parts.push(inlineToHtml(child.children));
    } else if (child.type === 'text') {
      parts.push(escapeHtml(child.value));
    }
  }
  return parts.join(' ').replace(/^\[[ xX]\]\s*/, '');
}

function inlineToHtml(nodes: PhrasingContent[]): string {
  return nodes
    .map((n) => {
      if (n.type === 'text') return escapeHtml(n.value);
      if (n.type === 'inlineCode') return `<code>${escapeHtml(n.value)}</code>`;
      if (n.type === 'strong') return `<strong>${inlineToHtml(n.children)}</strong>`;
      if (n.type === 'emphasis') return `<em>${inlineToHtml(n.children)}</em>`;
      if (n.type === 'inlineMath') return `$${n.value}$`;
      return toString(n);
    })
    .join('');
}

function hasNestedDirective(dir: ContainerDirective): boolean {
  for (const child of dir.children ?? []) {
    if (child.type === 'containerDirective') return true;
  }
  return false;
}

function findLeafDirective(tree: Root): LeafDirective | null {
  let leaf: LeafDirective | null = null;
  visit(tree, 'containerDirective', (node, index, parent) => {
    if (leaf) return;
    if (!parent || index === undefined) return;
    const dir = node as ContainerDirective;
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
    replace(`<div class="practice-set" data-practice>${renderFragment(dir.children as BlockContent[])}</div>`);
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
    const choices = choiceList ? extractChoices(choiceList) : [];
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

  if (name === 'solution') {
    replace(
      `<div class="mcq-solution-block" data-solution hidden>${renderFragment(dir.children as BlockContent[])}</div>`,
    );
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
