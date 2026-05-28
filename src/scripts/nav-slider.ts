import { pathActiveFromPathname } from '../lib/paths';

const SLIDER_CLASS = 'nav-slider';

function ensureSlider(nav: HTMLElement): HTMLElement {
  let slider = nav.querySelector<HTMLElement>(`.${SLIDER_CLASS}`);
  if (!slider) {
    slider = document.createElement('span');
    slider.className = SLIDER_CLASS;
    slider.setAttribute('aria-hidden', 'true');
    nav.prepend(slider);
  }
  return slider;
}

/** Set data-nav-active on the best-matching link within a nav track (longest prefix wins). */
export function syncTrackActive(nav: HTMLElement, currentPath = window.location.pathname) {
  const links = [...nav.querySelectorAll<HTMLAnchorElement>('a[href]')];
  let best: HTMLAnchorElement | null = null;
  let bestLen = -1;

  for (const link of links) {
    const linkPath = new URL(link.href, window.location.origin).pathname;
    if (!pathActiveFromPathname(currentPath, linkPath)) continue;
    const len = linkPath.length;
    if (len > bestLen) {
      bestLen = len;
      best = link;
    }
  }

  for (const link of links) {
    link.removeAttribute('data-nav-active');
  }
  best?.setAttribute('data-nav-active', '');
}

/** Move the highlight pill to the active link (or hide it when none). */
export function syncNavSlider(nav: HTMLElement, instant = false) {
  const slider = ensureSlider(nav);
  const active = nav.querySelector<HTMLElement>('a[data-nav-active]');

  if (instant) nav.classList.add('nav-slider--instant');

  if (!active) {
    slider.style.opacity = '0';
    if (instant) {
      requestAnimationFrame(() => {
        nav.classList.remove('nav-slider--instant');
        nav.classList.add('nav-slider--ready');
      });
    }
    return;
  }

  const navRect = nav.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();

  slider.style.width = `${activeRect.width}px`;
  slider.style.height = `${activeRect.height}px`;
  slider.style.transform = `translate(${activeRect.left - navRect.left}px, ${activeRect.top - navRect.top}px)`;
  slider.style.opacity = '1';

  if (instant) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nav.classList.remove('nav-slider--instant');
        nav.classList.add('nav-slider--ready');
      });
    });
  } else {
    nav.classList.add('nav-slider--ready');
  }
}

function observeNav(nav: HTMLElement) {
  const ro = new ResizeObserver(() => syncNavSlider(nav));
  ro.observe(nav);
  nav.querySelectorAll('a').forEach((link) => ro.observe(link));
}

/** Attach slider behavior to a nav track (idempotent). */
export function initNavSlider(nav: HTMLElement | null) {
  if (!nav) return;

  nav.classList.add('nav-slider-track');

  if (nav.dataset.sliderInit === '1') {
    syncNavSlider(nav);
    return;
  }
  nav.dataset.sliderInit = '1';

  ensureSlider(nav);
  syncNavSlider(nav, true);
  observeNav(nav);

  window.addEventListener(
    'resize',
    () => syncNavSlider(nav),
    { passive: true },
  );
}
