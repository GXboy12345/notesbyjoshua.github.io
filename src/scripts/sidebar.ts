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

function persistCollapsed(collapsed: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
  } catch (_) {}
}

function setDesktopCollapsed(collapsed: boolean, instant = false) {
  const layout = layoutDoc();
  if (!layout) return;
  if (instant) layout.classList.add('sidebar-no-transition');
  layout.classList.toggle('sidebar-collapsed', collapsed);
  persistCollapsed(collapsed);
  if (!instant) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => layout.classList.remove('sidebar-no-transition'));
  });
}

function restoreDesktopSidebar() {
  if (!isDesktop()) return;
  let collapsed = false;
  try {
    collapsed = localStorage.getItem(STORAGE_KEY) === '1';
  } catch (_) {}
  setDesktopCollapsed(collapsed, true);
}

export function initSidebar() {
  const toggles = [...document.querySelectorAll<HTMLButtonElement>('.sidebar-toggle')];
  const sidebar = document.getElementById('doc-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');

  if (!toggles.length || !sidebar) return;

  restoreDesktopSidebar();

  if (sidebar.dataset.navBound === '1') {
    restoreDesktopSidebar();
    syncToggleState(toggles, sidebar);
    return;
  }
  sidebar.dataset.navBound = '1';

  const closeMobile = () => {
    sidebar.classList.remove('open');
    backdrop?.classList.remove('visible');
    backdrop?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('sidebar-open');
    syncToggleState(toggles, sidebar);
  };

  const openMobile = () => {
    sidebar.classList.add('open');
    backdrop?.classList.add('visible');
    backdrop?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('sidebar-open');
    syncToggleState(toggles, sidebar);
  };

  const onToggleClick = () => {
    if (isDesktop()) {
      setDesktopCollapsed(!isDesktopCollapsed());
      syncToggleState(toggles, sidebar);
      return;
    }
    if (sidebar.classList.contains('open')) closeMobile();
    else openMobile();
  };

  for (const toggle of toggles) {
    toggle.addEventListener('click', onToggleClick);
  }

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
        syncToggleState(toggles, sidebar);
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
    syncToggleState(toggles, sidebar);
  });

  syncToggleState(toggles, sidebar);
}

function syncToggleState(toggles: HTMLButtonElement[], sidebar: HTMLElement) {
  const expanded = isDesktop() ? !isDesktopCollapsed() : sidebar.classList.contains('open');

  for (const toggle of toggles) {
    const isFab = toggle.classList.contains('sidebar-toggle--fab');
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    toggle.dataset.state = expanded ? 'open' : 'closed';

    toggle.setAttribute(
      'aria-label',
      isFab
        ? isDesktop()
          ? 'Show notes sidebar'
          : 'Open notes menu'
        : isDesktop()
          ? 'Hide notes sidebar'
          : 'Close notes menu',
    );
  }
}

export { syncSidebarActive } from './sidebar-active.ts';
