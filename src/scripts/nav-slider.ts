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

function linkOffsets(active: HTMLElement, nav: HTMLElement) {
  let left = 0;
  let top = 0;
  let el: HTMLElement | null = active;

  while (el && el !== nav) {
    left += el.offsetLeft;
    top += el.offsetTop;
    el = el.offsetParent as HTMLElement | null;
  }

  if (el === nav) {
    return { left, top, width: active.offsetWidth, height: active.offsetHeight };
  }

  const navRect = nav.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();
  return {
    left: activeRect.left - navRect.left,
    top: activeRect.top - navRect.top,
    width: activeRect.width,
    height: activeRect.height,
  };
}

function markSliderReady(nav: HTMLElement, instant: boolean) {
  if (!instant) {
    nav.classList.add('nav-slider--ready');
    return;
  }
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      nav.classList.remove('nav-slider--instant');
      nav.classList.add('nav-slider--ready');
    });
  });
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
    markSliderReady(nav, instant);
    return;
  }

  const { left, top, width, height } = linkOffsets(active, nav);

  slider.style.width = `${width}px`;
  slider.style.height = `${height}px`;
  slider.style.transform = `translate(${left}px, ${top}px)`;
  slider.style.opacity = '1';

  markSliderReady(nav, instant);
}

/** Re-sync active state and slider position after layout settles. */
export function syncNavTrack(
  nav: HTMLElement,
  options: { instant?: boolean; path?: string; waitForLayout?: boolean } = {},
) {
  const { instant = false, path = window.location.pathname, waitForLayout = false } = options;
  syncTrackActive(nav, path);

  const run = () => syncNavSlider(nav, instant);
  if (waitForLayout) {
    requestAnimationFrame(() => requestAnimationFrame(run));
  } else {
    run();
  }
}

function observeNav(nav: HTMLElement) {
  // Layout-driven resyncs snap instantly—animated width/transform mid-reflow reads stale.
  const resync = () => syncNavSlider(nav, true);

  const ro = new ResizeObserver(resync);
  ro.observe(nav);
  nav.querySelectorAll('a').forEach((link) => ro.observe(link));

  const header = nav.closest('.site-header');
  const actions = header?.querySelector('.header-actions');
  if (header) ro.observe(header);
  if (actions) ro.observe(actions);

  const sidebar = nav.closest('.doc-sidebar, .doc-sidebar-column, .sidebar-inner');
  if (sidebar) ro.observe(sidebar);
}

function bindLayoutResync(nav: HTMLElement) {
  window.addEventListener('resize', () => syncNavSlider(nav, true), { passive: true });
  document.fonts?.ready.then(() => syncNavSlider(nav, true));
}

/** Attach slider behavior to a nav track (idempotent). */
export function initNavSlider(nav: HTMLElement | null) {
  if (!nav) return;

  nav.classList.add('nav-slider-track');

  if (nav.dataset.sliderInit === '1') {
    syncNavSlider(nav, true);
    return;
  }
  nav.dataset.sliderInit = '1';

  ensureSlider(nav);
  syncNavSlider(nav, true);
  observeNav(nav);
  bindLayoutResync(nav);
}
