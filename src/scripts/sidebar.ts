export function initSidebar() {
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const sidebar = document.getElementById('doc-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');

  if (!toggle || !sidebar) {
    toggle?.setAttribute('hidden', '');
    return;
  }

  toggle.removeAttribute('hidden');

  if (sidebar.dataset.navBound === '1') return;
  sidebar.dataset.navBound = '1';

  const close = () => {
    sidebar.classList.remove('open');
    backdrop?.classList.remove('visible');
    backdrop?.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('sidebar-open');
  };

  const open = () => {
    sidebar.classList.add('open');
    backdrop?.classList.add('visible');
    backdrop?.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('sidebar-open');
  };

  toggle.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) close();
    else open();
  });

  backdrop?.addEventListener('click', close);

  sidebar.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 1099px)').matches) close();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  document.addEventListener('astro:before-preparation', close);
}

export { syncSidebarActive } from './sidebar-active.ts';
