const DESKTOP_QUERY = '(min-width: 1100px)';

type ParallaxController = {
  destroy: () => void;
};

let active: ParallaxController | null = null;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getParallaxRate(docMain: HTMLElement): number {
  if (prefersReducedMotion()) return 0;
  const raw = getComputedStyle(docMain).getPropertyValue('--canvas-parallax-rate').trim();
  const rate = Number.parseFloat(raw);
  return Number.isFinite(rate) ? Math.max(0, Math.min(1, rate)) : 0.25;
}

function getScrollRoot(docMain: HTMLElement): HTMLElement {
  if (window.matchMedia(DESKTOP_QUERY).matches) {
    const { overflowY } = getComputedStyle(docMain);
    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
      return docMain;
    }
  }
  return document.documentElement;
}

function getScrollTop(root: HTMLElement): number {
  if (root === document.documentElement) {
    return window.scrollY || document.documentElement.scrollTop || 0;
  }
  return root.scrollTop;
}

function bindParallax(docMain: HTMLElement): ParallaxController {
  let root = getScrollRoot(docMain);
  let raf = 0;

  // Background is painted with background-attachment: local, meaning it scrolls
  // 1:1 with content by default. We offset it by -(scrollTop * (1 - rate)) to
  // slow it down: at rate 0.58, the pattern moves 42% slower than the text.
  const apply = () => {
    root = getScrollRoot(docMain);
    const rate = getParallaxRate(docMain);
    if (rate === 0) {
      docMain.style.removeProperty('--canvas-bg-offset');
      return;
    }
    const scrollTop = getScrollTop(root);
    const offset = scrollTop * (1 - rate);
    docMain.style.setProperty('--canvas-bg-offset', `${offset}px`);
  };

  const schedule = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      apply();
    });
  };

  const onScroll = () => schedule();
  const onResize = () => schedule();

  root.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionQuery.addEventListener('change', () => schedule());

  const desktopQuery = window.matchMedia(DESKTOP_QUERY);
  const onDesktopChange = () => {
    root.removeEventListener('scroll', onScroll);
    root = getScrollRoot(docMain);
    root.addEventListener('scroll', onScroll, { passive: true });
    schedule();
  };
  desktopQuery.addEventListener('change', onDesktopChange);

  apply();

  return {
    destroy: () => {
      if (raf) cancelAnimationFrame(raf);
      root.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      desktopQuery.removeEventListener('change', onDesktopChange);
      docMain.style.removeProperty('--canvas-bg-offset');
    },
  };
}

export function initDocCanvasParallax() {
  active?.destroy();
  active = null;

  const docMain = document.querySelector<HTMLElement>('.doc-main');
  if (!docMain) return;

  active = bindParallax(docMain);
}

let pageLoadBound = false;

export function bindDocCanvasParallax() {
  initDocCanvasParallax();

  if (pageLoadBound) return;
  pageLoadBound = true;
  document.addEventListener('astro:page-load', initDocCanvasParallax);
}
