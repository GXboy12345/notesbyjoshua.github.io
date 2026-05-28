import renderMathInElement from 'katex/contrib/auto-render';

export const katexRenderOpts = {
  delimiters: [
    { left: '$$', right: '$$', display: true },
    { left: '\\[', right: '\\]', display: true },
    { left: '\\(', right: '\\)', display: false },
    { left: '$', right: '$', display: false },
  ],
  throwOnError: false,
  strict: false,
} as const;

export function renderKatexIn(el: HTMLElement): void {
  renderMathInElement(el, katexRenderOpts);
}
