const STORAGE_KEY = 'doc-sidebar-collapsed';
const PROSE_MS = 300;
const SIDEBAR_MS = 340;

function isDesktop(): boolean {
  return window.matchMedia('(min-width: 1100px)').matches;
}

function layoutDoc(): HTMLElement | null {
  return document.querySelector('.layout-doc');
}

function isDesktopCollapsed(): boolean {
  return layoutDoc()?.classList.contains('sidebar-collapsed') ?? false;
}

let animating = false;

function persistCollapsed(collapsed: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
  } catch (_) {}
}

function setDesktopCollapsedImmediate(collapsed: boolean) {
  const layout = layoutDoc();
  if (!layout) return;
  layout.classList.remove('sidebar-anim-open-prose', 'sidebar-anim-close-prose');
  layout.classList.toggle('sidebar-collapsed', collapsed);
  persistCollapsed(collapsed);
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function animateDesktopSidebar(open: boolean) {
  const layout = layoutDoc();
  if (!layout || animating) return;

  animating = true;
  try {
    if (open) {
      layout.classList.add('sidebar-anim-open-prose');
      await wait(PROSE_MS);
      layout.classList.remove('sidebar-collapsed', 'sidebar-anim-open-prose');
      await wait(SIDEBAR_MS);
      persistCollapsed(false);
      return;
    }

    layout.classList.add('sidebar-collapsed');
    await wait(SIDEBAR_MS);
    layout.classList.add('sidebar-anim-close-prose');
    await wait(PROSE_MS);
    layout.classList.remove('sidebar-anim-close-prose');
    persistCollapsed(true);
  } finally {
    animating = false;
    const toggle = document.querySelector<HTMLButtonElement>('.sidebar-toggle');
    const sidebar = document.getElementById('doc-sidebar');
    if (toggle && sidebar) syncToggleState(toggle, sidebar);
  }
}

function setDesktopCollapsed(collapsed: boolean, animate = true) {
  if (!animate || !isDesktop()) {
    setDesktopCollapsedImmediate(collapsed);
    return;
  }

  if (collapsed === isDesktopCollapsed()) return;
  void animateDesktopSidebar(!collapsed);
}

function restoreDesktopSidebar() {
  if (!isDesktop()) return;
  let collapsed = false;
  try {
    collapsed = localStorage.getItem(STORAGE_KEY) === '1';
  } catch (_) {}
  setDesktopCollapsedImmediate(collapsed);
}

export function initSidebar() {
  const toggle = document.querySelector<HTMLButtonElement>('.sidebar-toggle');
  const sidebar = document.getElementById('doc-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');

  if (!toggle || !sidebar) return;

  restoreDesktopSidebar();

  if (sidebar.dataset.navBound === '1') {
    restoreDesktopSidebar();
    syncToggleState(toggle, sidebar);
    return;
  }
  sidebar.dataset.navBound = '1';

  const closeMobile = () => {
    sidebar.classList.remove('open');
    backdrop?.classList.remove('visible');
    backdrop?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('sidebar-open');
    syncToggleState(toggle, sidebar);
  };

  const openMobile = () => {
    sidebar.classList.add('open');
    backdrop?.classList.add('visible');
    backdrop?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('sidebar-open');
    syncToggleState(toggle, sidebar);
  };

  toggle.addEventListener('click', () => {
    if (isDesktop()) {
      const willExpand = isDesktopCollapsed();
      toggle.dataset.state = willExpand ? 'open' : 'closed';
      toggle.setAttribute('aria-expanded', willExpand ? 'true' : 'false');
      setDesktopCollapsed(!willExpand);
      return;
    }
    if (sidebar.classList.contains('open')) closeMobile();
    else openMobile();
  });

  backdrop?.addEventListener('click', closeMobile);

  sidebar.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (!isDesktop()) closeMobile();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (isDesktop()) {
        if (isDesktopCollapsed()) return;
        setDesktopCollapsed(true);
        syncToggleState(toggle, sidebar);
      } else {
        closeMobile();
      }
    }
  });

  document.addEventListener('astro:before-preparation', () => {
    if (!isDesktop()) closeMobile();
  });

  window.matchMedia('(min-width: 1100px)').addEventListener('change', () => {
    closeMobile();
    restoreDesktopSidebar();
    syncToggleState(toggle, sidebar);
  });

  syncToggleState(toggle, sidebar);
}

function syncToggleState(toggle: HTMLButtonElement, sidebar: HTMLElement) {
  const expanded = isDesktop() ? !isDesktopCollapsed() : sidebar.classList.contains('open');
  toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  toggle.dataset.state = expanded ? 'open' : 'closed';
  toggle.setAttribute(
    'aria-label',
    isDesktop()
      ? expanded
        ? 'Collapse notes sidebar'
        : 'Expand notes sidebar'
      : expanded
        ? 'Close notes menu'
        : 'Open notes menu',
  );
}

export { syncSidebarActive } from './sidebar-active.ts';
