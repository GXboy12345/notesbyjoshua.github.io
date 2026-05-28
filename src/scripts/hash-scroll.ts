const EASE_OUT = (t: number) => 1 - (1 - t) ** 3;

let animFrame = 0;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getScrollRoot(): HTMLElement {
  const docMain = document.querySelector<HTMLElement>('.doc-main');
  if (docMain) {
    const { overflowY } = getComputedStyle(docMain);
    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') return docMain;
  }
  return document.documentElement;
}

function getScrollTop(root: HTMLElement): number {
  return root === document.documentElement ? window.scrollY : root.scrollTop;
}

function setScrollTop(root: HTMLElement, y: number) {
  if (root === document.documentElement) window.scrollTo(0, y);
  else root.scrollTop = y;
}

function blurLayer(root: HTMLElement): HTMLElement | null {
  if (root.classList.contains('doc-main')) {
    return root.querySelector<HTMLElement>('.prose');
  }
  return (
    document.querySelector<HTMLElement>('.doc-main .prose') ??
    document.querySelector<HTMLElement>('.home-main') ??
    document.querySelector<HTMLElement>('main')
  );
}

function scrollYForElement(root: HTMLElement, el: HTMLElement): number {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const elRect = el.getBoundingClientRect();

  if (root === document.documentElement) {
    return Math.max(0, window.scrollY + elRect.top - margin);
  }

  const rootRect = root.getBoundingClientRect();
  return Math.max(0, root.scrollTop + (elRect.top - rootRect.top) - margin);
}

function endScrollFx(root: HTMLElement, layer: HTMLElement | null) {
  root.classList.remove('hash-scroll-active');
  layer?.classList.remove('hash-scroll-blur');
  root.style.removeProperty('--hash-scroll-blur');
}

function clearScrollFx() {
  document.querySelectorAll<HTMLElement>('.hash-scroll-active').forEach((root) => {
    endScrollFx(root, blurLayer(root));
  });
}

function animateScrollTo(root: HTMLElement, targetY: number) {
  if (animFrame) cancelAnimationFrame(animFrame);
  clearScrollFx();

  const startY = getScrollTop(root);
  const delta = targetY - startY;
  if (Math.abs(delta) < 2) {
    setScrollTop(root, targetY);
    return;
  }

  const layer = blurLayer(root);
  root.classList.add('hash-scroll-active');
  layer?.classList.add('hash-scroll-blur');

  const duration = Math.min(920, Math.max(340, Math.abs(delta) * 0.5));
  const t0 = performance.now();
  let lastY = startY;
  let lastT = t0;

  const frame = (now: number) => {
    const t = Math.min(1, (now - t0) / duration);
    const y = startY + delta * EASE_OUT(t);
    setScrollTop(root, y);

    const dt = Math.max(8, now - lastT);
    const velocity = Math.abs(y - lastY) / dt;
    const blur = Math.min(3.25, velocity * 0.14);
    root.style.setProperty('--hash-scroll-blur', `${blur.toFixed(2)}px`);

    lastY = y;
    lastT = now;

    if (t < 1) {
      animFrame = requestAnimationFrame(frame);
      return;
    }

    animFrame = 0;
    setScrollTop(root, targetY);
    endScrollFx(root, layer);
  };

  animFrame = requestAnimationFrame(frame);
}

export function scrollToHashTarget(
  target: HTMLElement,
  behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth',
) {
  const root = getScrollRoot();
  const y = scrollYForElement(root, target);

  if (behavior === 'auto' || prefersReducedMotion()) {
    if (animFrame) cancelAnimationFrame(animFrame);
    endScrollFx(root, blurLayer(root));
    setScrollTop(root, y);
    return;
  }

  animateScrollTo(root, y);
}

/** Scroll to the current URL hash after navigation (ClientRouter does not always). */
export function scrollToCurrentHash(behavior?: ScrollBehavior) {
  const raw = window.location.hash;
  if (!raw || raw === '#') return;

  const id = decodeURIComponent(raw.slice(1));
  const target = document.getElementById(id);
  if (!target) return;

  scrollToHashTarget(target, behavior ?? (prefersReducedMotion() ? 'auto' : 'smooth'));
}

export function initHashScroll() {
  scrollToCurrentHash();

  document.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
    if (!link) return;

    const url = new URL(link.href, window.location.origin);
    if (url.pathname !== window.location.pathname || !url.hash || url.hash === '#') return;

    const id = decodeURIComponent(url.hash.slice(1));
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
    scrollToHashTarget(target);
  });
}
