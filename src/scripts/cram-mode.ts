export const CRAM_MODE_KEY = 'notes-cram-mode';

const CALLOUT_SELECTOR = '.callout--proof, .callout--example';

export function readStoredCramMode(): boolean {
  try {
    return localStorage.getItem(CRAM_MODE_KEY) === 'true';
  } catch (_) {}
  return false;
}

export function isCramMode(): boolean {
  return document.documentElement.hasAttribute('data-cram-mode');
}

export function persistCramMode(on: boolean) {
  try {
    localStorage.setItem(CRAM_MODE_KEY, on ? 'true' : 'false');
  } catch (_) {}
}

function collapseCallout(el: HTMLElement, on: boolean) {
  el.classList.remove('is-expanded');

  if (el instanceof HTMLDetailsElement) {
    if (on) el.removeAttribute('open');
    else el.setAttribute('open', '');
    return;
  }

  if (on) el.classList.add('is-collapsed');
  else el.classList.remove('is-collapsed', 'is-expanded');

  const body = el.querySelector<HTMLElement>(':scope > .callout__body');
  if (body) {
    if (on) body.setAttribute('hidden', '');
    else body.removeAttribute('hidden');
  }
}

export function prepareCallouts(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>(CALLOUT_SELECTOR).forEach((el) => {
    collapseCallout(el, isCramMode());
  });
}

function bindCalloutLabels(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>(`${CALLOUT_SELECTOR} > .callout__label`).forEach((label) => {
    if (label.dataset.cramLabelBound === '1') return;
    label.dataset.cramLabelBound = '1';

    label.addEventListener('click', () => {
      if (!isCramMode()) return;
      const callout = label.closest<HTMLElement>(CALLOUT_SELECTOR);
      if (!callout || callout instanceof HTMLDetailsElement) return;

      const expand = callout.classList.contains('is-collapsed');
      callout.classList.toggle('is-collapsed', !expand);
      callout.classList.toggle('is-expanded', expand);

      const body = callout.querySelector<HTMLElement>(':scope > .callout__body');
      if (body) {
        if (expand) body.removeAttribute('hidden');
        else body.setAttribute('hidden', '');
      }
    });
  });
}

export function applyCramMode(on: boolean) {
  if (on) {
    document.documentElement.setAttribute('data-cram-mode', '');
  } else {
    document.documentElement.removeAttribute('data-cram-mode');
  }

  document.querySelectorAll<HTMLElement>(CALLOUT_SELECTOR).forEach((el) => {
    collapseCallout(el, on);
  });

  bindCalloutLabels(document);
}

export function toggleCramMode(): boolean {
  const next = !isCramMode();
  applyCramMode(next);
  persistCramMode(next);
  return next;
}

export function initCramMode() {
  applyCramMode(readStoredCramMode());

  if (document.documentElement.dataset.cramModeBound === '1') return;
  document.documentElement.dataset.cramModeBound = '1';

  document.addEventListener('astro:page-load', () => {
    applyCramMode(readStoredCramMode());
  });
}
