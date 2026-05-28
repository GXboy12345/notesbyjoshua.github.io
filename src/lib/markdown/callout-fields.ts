export type CalloutFieldSpec = {
  /** Attribute on the opening directive line, e.g. `name=…` on `:::theorem`. */
  attr: string;
  defaultLabel: string;
};

/** Callouts that accept an optional named field beyond the type label. */
export const CALLOUT_FIELD_SPECS: Partial<Record<string, CalloutFieldSpec>> = {
  theorem: { attr: 'name', defaultLabel: 'Theorem' },
  example: { attr: 'title', defaultLabel: 'Example' },
  proof: { attr: 'of', defaultLabel: 'Proof' },
  key: { attr: 'name', defaultLabel: 'Key info' },
  exam: { attr: 'topic', defaultLabel: 'On the exam' },
  summary: { attr: 'title', defaultLabel: 'Summary' },
  tip: { attr: 'title', defaultLabel: 'Tip' },
};

export const CALLOUT_DEFAULT_LABELS: Record<string, string> = {
  theorem: 'Theorem',
  example: 'Example',
  proof: 'Proof',
  tip: 'Tip',
  warning: 'Warning',
  mistakes: 'Common mistakes',
  checklist: 'Working checklist',
  conditions: 'Conditions',
  equations: 'Key equations',
  note: 'Note',
  exam: 'On the exam',
  key: 'Key info',
  summary: 'Summary',
  solution: 'Solution',
  placeholder: 'Image placeholder',
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function calloutFieldValue(
  name: string,
  attributes: Record<string, string>,
  legacyLabel?: string,
): string | undefined {
  const spec = CALLOUT_FIELD_SPECS[name];
  if (!spec) return undefined;

  const raw = attributes[spec.attr] ?? legacyLabel;
  const trimmed = raw?.trim();
  return trimmed || undefined;
}

export function calloutLabelHtml(
  name: string,
  attributes: Record<string, string>,
  legacyLabel?: string,
): string {
  const defaultLabel = CALLOUT_DEFAULT_LABELS[name] ?? name;
  const fieldValue = calloutFieldValue(name, attributes, legacyLabel);

  if (!fieldValue || !CALLOUT_FIELD_SPECS[name]) {
    return `<div class="callout__label">${escapeHtml(defaultLabel)}</div>`;
  }

  return `<div class="callout__label callout__label--named"><span class="callout__type">${escapeHtml(defaultLabel)}</span><span class="callout__name">${escapeHtml(fieldValue)}</span></div>`;
}
