export type UnderConstructionVariant = 'inline' | 'block';

export type UnderConstructionOptions = {
  variant: UnderConstructionVariant;
  /** Short label; defaults to "Under construction". */
  label?: string;
  /** Block body HTML (block variant only). */
  bodyHtml?: string;
};

const DEFAULT_LABEL = 'Under construction';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function underConstructionIconHtml(className = 'uc-icon'): string {
  return `<span class="${className}" aria-hidden="true">🚧</span>`;
}

export function underConstructionHtml(options: UnderConstructionOptions): string {
  const label = escapeHtml(options.label?.trim() || DEFAULT_LABEL);
  const icon = underConstructionIconHtml();

  if (options.variant === 'inline') {
    return `<span class="uc uc--inline" role="status" title="${label}">${icon}<span class="uc__label">${label}</span></span>`;
  }

  const body = options.bodyHtml?.trim()
    ? `<div class="uc__body">${options.bodyHtml}</div>`
    : '';

  return `<div class="uc uc--block" role="status" aria-label="${label}">
<div class="uc__head">${icon}<span class="uc__label">${label}</span></div>
${body}
</div>`;
}
