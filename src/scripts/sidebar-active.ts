import { pathsRelated } from '../lib/paths';

function norm(pathname: string): string {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function linkScore(current: string, linkPath: string, zone: 'primary' | 'hub' | 'tree'): number {
  const cur = norm(current);
  const link = norm(linkPath);
  const zoneBoost = zone === 'primary' ? 2_000 : zone === 'hub' ? 1_000 : 0;
  if (cur === link) return 10_000 + zoneBoost;
  if (cur.startsWith(link)) return link.length + zoneBoost;
  if (link.startsWith(cur)) return cur.length + Math.floor(zoneBoost / 2);
  return -1;
}

function linkZone(link: HTMLAnchorElement): 'primary' | 'hub' | 'tree' {
  if (link.closest('.sidebar-primary')) return 'primary';
  if (link.closest('.sidebar-hubs')) return 'hub';
  return 'tree';
}

/** Re-apply active states after ClientRouter navigation (`transition:persist` freezes SSR attrs). */
export function syncSidebarActive() {
  const sidebar = document.getElementById('doc-sidebar');
  if (!sidebar) return;

  const current = window.location.pathname;
  const links = [...sidebar.querySelectorAll<HTMLAnchorElement>('a[href]')];

  let best: HTMLAnchorElement | null = null;
  let bestScore = -1;

  for (const link of links) {
    const linkPath = new URL(link.href, window.location.origin).pathname;
    const score = linkScore(current, linkPath, linkZone(link));
    if (score > bestScore) {
      bestScore = score;
      best = link;
    }
  }

  for (const link of links) {
    link.removeAttribute('aria-current');
  }
  best?.setAttribute('aria-current', 'page');

  syncTreeOpenToActive(sidebar, current);
}

function syncTreeOpenToActive(sidebar: HTMLElement, current: string) {
  sidebar.querySelectorAll<HTMLDetailsElement>('.notes-tree details').forEach((details) => {
    const links = details.querySelectorAll<HTMLAnchorElement>('a[href]');
    const open = [...links].some((link) => {
      const linkPath = new URL(link.href, window.location.origin).pathname;
      return pathsRelated(current, linkPath);
    });
    details.open = open;
  });
}
