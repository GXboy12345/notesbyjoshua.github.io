import { pathActiveFromPathname } from '../lib/paths';

/** Re-apply active states after ClientRouter navigation (`transition:persist` freezes SSR attrs). */
export function syncSidebarActive() {
  const sidebar = document.getElementById('doc-sidebar');
  if (!sidebar) return;

  const current = window.location.pathname;
  const links = [...sidebar.querySelectorAll<HTMLAnchorElement>('a[href]')];

  let best: HTMLAnchorElement | null = null;
  let bestLen = -1;

  for (const link of links) {
    const linkPath = new URL(link.href, window.location.origin).pathname;
    if (!pathActiveFromPathname(current, linkPath)) continue;
    if (linkPath.length > bestLen) {
      bestLen = linkPath.length;
      best = link;
    }
  }

  for (const link of links) {
    link.removeAttribute('aria-current');
  }
  best?.setAttribute('aria-current', 'page');

  syncTreeOpenToActive(sidebar);
}

function syncTreeOpenToActive(sidebar: HTMLElement) {
  sidebar.querySelectorAll('details').forEach((details) => {
    details.removeAttribute('open');
  });

  const active = sidebar.querySelector('a[aria-current="page"]');
  if (!active) return;

  let node: Element | null = active;
  while (node && node !== sidebar) {
    if (node instanceof HTMLDetailsElement) node.open = true;
    node = node.parentElement;
  }
}
