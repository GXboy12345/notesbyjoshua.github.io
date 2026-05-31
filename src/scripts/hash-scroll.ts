import {
  blurStrengthFromJumpDistance,
  createScrollGhostBlur,
  getMaxScrollTop,
  getRootScrollTop,
  setRootScrollTop,
  type GhostBlurController,
} from './hash-scroll-ghost.ts';

const EASE_OUT = (t: number) => 1 - (1 - t) ** 3;

let animFrame = 0;
let listenersBound = false;
let activeGhost: GhostBlurController | null = null;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function getScrollRoot(): HTMLElement {
  const docMain = document.querySelector<HTMLElement>('.doc-main');
  if (docMain && window.matchMedia('(min-width: 1100px)').matches) {
    const { overflowY } = getComputedStyle(docMain);
    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') return docMain;
  }
  return document.documentElement;
}

function getScrollArticle(root: HTMLElement): HTMLElement | null {
  if (root.classList.contains('doc-main')) {
    return root.querySelector<HTMLElement>('article.prose');
  }
  return (
    document.querySelector<HTMLElement>('.doc-main article.prose') ??
    document.querySelector<HTMLElement>('article.prose')
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

function destroyGhost() {
  activeGhost?.destroy();
  activeGhost = null;
}

function focusHashTarget(target: HTMLElement) {
  const hadTabIndex = target.hasAttribute('tabindex');
  if (!hadTabIndex) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  if (!hadTabIndex) {
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
  }
}

function animateScrollTo(root: HTMLElement, targetY: number, focusTarget?: HTMLElement) {
  if (animFrame) cancelAnimationFrame(animFrame);
  destroyGhost();

  const maxY = getMaxScrollTop(root);
  const clampedTargetY = clamp(targetY, 0, maxY);
  const startY = getRootScrollTop(root);
  const delta = clampedTargetY - startY;
  if (Math.abs(delta) < 2) {
    setRootScrollTop(root, clampedTargetY);
    if (focusTarget) focusHashTarget(focusTarget);
    return;
  }

  const jumpDistance = Math.abs(delta);
  const blurStrength = blurStrengthFromJumpDistance(jumpDistance);

  const article = getScrollArticle(root);
  activeGhost =
    article && blurStrength >= 0.03
      ? createScrollGhostBlur(root, article, { blurStrength })
      : null;

  // Position ghost clones before the first rAF so the source article isn't hidden
  // behind an empty overlay for a frame.
  activeGhost?.update(startY, 0, delta < 0 ? -1 : 1);

  const duration = Math.min(720, Math.max(380, jumpDistance * 0.48));
  const distancePeak = blurStrength * 70;
  const t0 = performance.now();
  let lastY = startY;
  let lastT = t0;

  const frame = (now: number) => {
    const t = Math.min(1, (now - t0) / duration);
    const intendedY = startY + delta * EASE_OUT(t);
    const y = clamp(intendedY, 0, maxY);
    setRootScrollTop(root, y);
    const actualY = getRootScrollTop(root);

    const dt = Math.max(1, now - lastT);
    const dy = actualY - lastY;
    const direction: -1 | 1 = dy < 0 ? -1 : 1;
    const velocity = Math.abs(dy) / dt;
    const envelope = Math.sin(Math.PI * t);
    const streak = clamp(velocity * 22 * blurStrength, 0, distancePeak) * envelope;

    activeGhost?.update(actualY, streak, direction);

    lastY = actualY;
    lastT = now;

    if (t < 1) {
      animFrame = requestAnimationFrame(frame);
      return;
    }

    animFrame = 0;
    setRootScrollTop(root, clampedTargetY);
    destroyGhost();
    if (focusTarget) focusHashTarget(focusTarget);
  };

  animFrame = requestAnimationFrame(frame);
}

export function scrollToHashTarget(
  target: HTMLElement,
  behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth',
) {
  const root = getScrollRoot();
  const y = clamp(scrollYForElement(root, target), 0, getMaxScrollTop(root));

  if (behavior === 'auto' || prefersReducedMotion()) {
    if (animFrame) cancelAnimationFrame(animFrame);
    destroyGhost();
    setRootScrollTop(root, y);
    return;
  }

  animateScrollTo(root, y, target);
}

/** Animated scroll to an absolute Y in the current scroll root (doc-main on desktop). */
export function scrollToY(
  targetY: number,
  behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth',
) {
  const root = getScrollRoot();
  const y = clamp(targetY, 0, getMaxScrollTop(root));

  if (behavior === 'auto' || prefersReducedMotion()) {
    if (animFrame) cancelAnimationFrame(animFrame);
    destroyGhost();
    setRootScrollTop(root, y);
    return;
  }

  animateScrollTo(root, y);
}

function isSameDocument(url: URL): boolean {
  const here = new URL(window.location.href);
  return url.pathname === here.pathname && url.search === here.search;
}

export function scrollToCurrentHash(behavior?: ScrollBehavior) {
  const raw = window.location.hash;
  if (!raw || raw === '#') return;

  const id = decodeURIComponent(raw.slice(1));
  const target = document.getElementById(id);
  if (!target) return;

  scrollToHashTarget(target, behavior ?? (prefersReducedMotion() ? 'auto' : 'smooth'));
}

function queueScrollToCurrentHash() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => scrollToCurrentHash());
  });
}

function onHashLinkClick(event: MouseEvent) {
  if (event.defaultPrevented) return;
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
  if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

  const url = new URL(link.href, window.location.href);
  if (!isSameDocument(url) || !url.hash || url.hash === '#') return;

  const id = decodeURIComponent(url.hash.slice(1));
  const target = document.getElementById(id);
  if (!target) return;

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  const next = `${url.pathname}${url.search}${url.hash}`;
  if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== next) {
    history.pushState(history.state, '', next);
  }

  scrollToHashTarget(target);
}

function onHashChange() {
  queueScrollToCurrentHash();
}

export function initHashScroll() {
  destroyGhost();
  if (!listenersBound) {
    listenersBound = true;
    document.addEventListener('click', onHashLinkClick, { capture: true });
    window.addEventListener('hashchange', onHashChange);
    document.addEventListener('astro:before-preparation', destroyGhost);
  }
  queueScrollToCurrentHash();
}
