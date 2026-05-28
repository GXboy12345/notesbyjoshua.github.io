const STORAGE_KEY = 'doc-sidebar-collapsed';

function isDesktop(): boolean {
  return window.matchMedia('(min-width: 1100px)').matches;
}

function layoutDoc(): HTMLElement | null {
  return document.querySelector('.layout-doc');
}

function isDesktopCollapsed(): boolean {
  return layoutDoc()?.classList.contains('sidebar-collapsed') ?? false;
}

function setDesktopCollapsed(collapsed: boolean) {
  const layout = layoutDoc();
  if (!layout) return;
  layout.classList.toggle('sidebar-collapsed', collapsed);
  try {
    localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
  } catch (_) {}
}

function restoreDesktopSidebar() {
  if (!isDesktop()) return;
  let collapsed = false;
  try {
    collapsed = localStorage.getItem(STORAGE_KEY) === '1';
  } catch (_) {}
  setDesktopCollapsed(collapsed);
}

export function initSidebar() {
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const sidebar = document.getElementById('doc-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');

  if (!toggle || !sidebar) {
    toggle?.setAttribute('hidden', '');
    return;
  }

  toggle.removeAttribute('hidden');
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
      setDesktopCollapsed(!isDesktopCollapsed());
      syncToggleState(toggle, sidebar);
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
  toggle.setAttribute(
    'aria-label',
    isDesktop() ? (expanded ? 'Collapse notes sidebar' : 'Expand notes sidebar') : 'Open menu',
  );
}

export { syncSidebarActive } from './sidebar-active.ts';
