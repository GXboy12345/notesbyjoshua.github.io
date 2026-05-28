export const THEME_KEY = 'notes-site-theme';

export type SiteTheme = 'light' | 'dark';

export function readStoredTheme(): SiteTheme {
  try {
    const t = localStorage.getItem(THEME_KEY);
    if (t === 'dark' || t === 'light') return t;
  } catch (_) {}
  return 'light';
}

export function applyTheme(theme: SiteTheme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
}

export function persistTheme(theme: SiteTheme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (_) {}
}

export function currentTheme(): SiteTheme {
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'dark' ? 'dark' : 'light';
}

export function toggleTheme(): SiteTheme {
  const next: SiteTheme = currentTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  persistTheme(next);
  return next;
}

export function initTheme() {
  applyTheme(readStoredTheme());

  if (document.documentElement.dataset.themeBound === '1') return;
  document.documentElement.dataset.themeBound = '1';

  document.addEventListener('astro:page-load', () => {
    applyTheme(readStoredTheme());
    document.dispatchEvent(new CustomEvent('site-theme-change', { detail: { theme: readStoredTheme() } }));
  });
}
