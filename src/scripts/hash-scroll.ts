/** Scroll to the current URL hash after navigation (ClientRouter does not always). */
export function scrollToCurrentHash(behavior: ScrollBehavior = 'smooth') {
  const raw = window.location.hash;
  if (!raw || raw === '#') return;

  const id = decodeURIComponent(raw.slice(1));
  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({ behavior, block: 'start' });
}

export function initHashScroll() {
  scrollToCurrentHash(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');

  document.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
    if (!link) return;

    const url = new URL(link.href, window.location.origin);
    if (url.pathname !== window.location.pathname || !url.hash || url.hash === '#') return;

    const id = decodeURIComponent(url.hash.slice(1));
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    history.pushState({}, '', url.hash);
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  });
}
