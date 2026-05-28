const DESKTOP_QUERY = '(min-width: 1100px)';

type ParallaxController = {
  destroy: () => void;
  refresh: () => void;
};

let active: ParallaxController | null = null;

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getParallaxRate(docMain: HTMLElement): number {
  if (prefersReducedMotion()) return 0;
  const raw = getComputedStyle(docMain).getPropertyValue('--canvas-parallax-rate').trim();
  const rate = Number.parseFloat(raw);
  return Number.isFinite(rate) ? clamp(rate, 0, 1) : 0.58;
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

function headerHeight(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim();
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 52;
}

function getLocalScroll(root: HTMLElement, docMain: HTMLElement): number {
  if (root === document.documentElement) {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const start = docMain.offsetTop - headerHeight();
    const max = Math.max(0, docMain.offsetHeight - window.innerHeight);
    return clamp(scrollY - start, 0, max);
  }
  return root.scrollTop;
}

function getMaxLocalScroll(root: HTMLElement, docMain: HTMLElement): number {
  if (root === document.documentElement) {
    return Math.max(0, docMain.offsetHeight - window.innerHeight);
  }
  return Math.max(0, root.scrollHeight - root.clientHeight);
}

function bindParallax(docMain: HTMLElement, canvas: HTMLElement): ParallaxController {
  let rate = getParallaxRate(docMain);
  let root = getScrollRoot(docMain);
  let raf = 0;

  const apply = () => {
    rate = getParallaxRate(docMain);
    root = getScrollRoot(docMain);

    const maxScroll = getMaxLocalScroll(root, docMain);
    const parallaxSpan = maxScroll * rate;
    const viewportHeight = docMain.clientHeight;
    // Extra height is parallax slack only; wrap clips to the reading pane / content box.
    canvas.style.height =
      rate === 0 ? '100%' : `${viewportHeight + parallaxSpan}px`;
    canvas.style.transform =
      rate === 0 ? 'none' : `translate3d(0, ${getLocalScroll(root, docMain) * rate}px, 0)`;
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
  const onMotionChange = () => schedule();
  motionQuery.addEventListener('change', onMotionChange);

  const desktopQuery = window.matchMedia(DESKTOP_QUERY);
  const onDesktopChange = () => {
    root.removeEventListener('scroll', onScroll);
    root = getScrollRoot(docMain);
    root.addEventListener('scroll', onScroll, { passive: true });
    schedule();
  };
  desktopQuery.addEventListener('change', onDesktopChange);

  const resizeObserver =
    typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => schedule())
      : null;
  resizeObserver?.observe(docMain);
  const prose = docMain.querySelector('article.prose');
  if (prose) resizeObserver?.observe(prose);

  apply();

  return {
    refresh: schedule,
    destroy: () => {
      if (raf) cancelAnimationFrame(raf);
      root.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      motionQuery.removeEventListener('change', onMotionChange);
      desktopQuery.removeEventListener('change', onDesktopChange);
      resizeObserver?.disconnect();
      canvas.style.height = '';
      canvas.style.transform = '';
    },
  };
}

export function initDocCanvasParallax() {
  active?.destroy();
  active = null;

  const docMain = document.querySelector<HTMLElement>('.doc-main');
  const canvas = docMain?.querySelector<HTMLElement>('.doc-main__canvas');
  if (!docMain || !canvas) return;

  active = bindParallax(docMain, canvas);
}

let pageLoadBound = false;

export function bindDocCanvasParallax() {
  initDocCanvasParallax();

  if (pageLoadBound) return;
  pageLoadBound = true;
  document.addEventListener('astro:page-load', initDocCanvasParallax);
}
