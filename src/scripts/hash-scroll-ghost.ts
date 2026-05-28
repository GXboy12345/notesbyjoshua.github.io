const SAMPLE_WEIGHTS = [0.34, 0.23, 0.16, 0.11, 0.075, 0.05, 0.035, 0.025, 0.018];

export type GhostBlurOptions = {
  sampleCount?: number;
  maxStreakPx?: number;
  minVisibleStreakPx?: number;
  /** 0–1; scales trail length, sample count, and opacity. */
  blurStrength?: number;
};

/** Exponential 0–1 blur weight from jump distance; short hops stay nearly sharp. */
export function blurStrengthFromJumpDistance(
  distancePx: number,
  refPx = 850,
  curvature = 2,
): number {
  if (distancePx <= 0) return 0;
  const t = Math.min(1, distancePx / refPx);
  if (t <= 0) return 0;
  return Math.expm1(curvature * t) / Math.expm1(curvature);
}

export type GhostBlurController = {
  update(scrollTop: number, streakPx: number, direction: -1 | 1): void;
  destroy(): void;
};

function isDocumentScroller(root: HTMLElement): boolean {
  return root === document.documentElement || root === document.body;
}

export function getRootScrollTop(root: HTMLElement): number {
  if (isDocumentScroller(root)) return window.scrollY || document.documentElement.scrollTop || 0;
  return root.scrollTop;
}

export function getMaxScrollTop(root: HTMLElement): number {
  if (isDocumentScroller(root)) {
    const el = document.documentElement;
    return Math.max(0, el.scrollHeight - el.clientHeight);
  }
  return Math.max(0, root.scrollHeight - root.clientHeight);
}

export function setRootScrollTop(root: HTMLElement, y: number) {
  if (isDocumentScroller(root)) {
    window.scrollTo({ top: y, left: window.scrollX, behavior: 'auto' });
    return;
  }
  root.scrollTop = y;
}

function getRootRect(root: HTMLElement): DOMRect {
  if (isDocumentScroller(root)) {
    return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
  }
  return root.getBoundingClientRect();
}

function getArticleTopInScrollContent(root: HTMLElement, article: HTMLElement): number {
  const rootRect = getRootRect(root);
  const articleRect = article.getBoundingClientRect();
  return articleRect.top - rootRect.top + getRootScrollTop(root);
}

function stripDuplicateIds(node: HTMLElement) {
  if (node.hasAttribute('id')) node.removeAttribute('id');
  node.querySelectorAll<HTMLElement>('[id]').forEach((el) => {
    el.removeAttribute('id');
  });
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export function createScrollGhostBlur(
  root: HTMLElement,
  article: HTMLElement,
  options: GhostBlurOptions = {},
): GhostBlurController | null {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  const blurStrength = clamp01(options.blurStrength ?? 1);
  const sampleCount = Math.max(
    3,
    Math.min(7, options.sampleCount ?? Math.round(3 + blurStrength * 4)),
  );
  const maxStreakPx = options.maxStreakPx ?? 3 + blurStrength * 67;
  const minVisibleStreakPx = options.minVisibleStreakPx ?? 1.5;

  const overlay = document.createElement('div');
  overlay.className = 'hash-scroll-ghost-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const samples: HTMLElement[] = [];
  const weights = SAMPLE_WEIGHTS.slice(0, sampleCount);
  const weightSum = weights.reduce((sum, n) => sum + n, 0);

  for (let i = 0; i < sampleCount; i += 1) {
    const sample = document.createElement('div');
    sample.className = 'hash-scroll-ghost-sample';

    const clone = article.cloneNode(true) as HTMLElement;
    stripDuplicateIds(clone);
    clone.classList.add('hash-scroll-ghost-clone');
    clone.setAttribute('aria-hidden', 'true');

    sample.appendChild(clone);
    overlay.appendChild(sample);
    samples.push(sample);
  }

  document.body.appendChild(overlay);

  article.classList.add('hash-scroll-ghost-source');
  document.body.classList.add('hash-scroll-source-hidden');
  root.classList.add('hash-scroll-active');

  let destroyed = false;
  let articleTopInScrollContent = getArticleTopInScrollContent(root, article);
  let syncFrame = 0;

  function syncOverlayRect() {
    const rootRect = getRootRect(root);
    const articleRect = article.getBoundingClientRect();
    const articleLeft = articleRect.left - rootRect.left;

    overlay.style.left = `${rootRect.left}px`;
    overlay.style.top = `${rootRect.top}px`;
    overlay.style.width = `${rootRect.width}px`;
    overlay.style.height = `${rootRect.height}px`;

    for (const sample of samples) {
      sample.style.left = `${articleLeft}px`;
      sample.style.width = `${articleRect.width}px`;

      const clone = sample.firstElementChild as HTMLElement | null;
      if (clone) {
        clone.style.width = `${articleRect.width}px`;
        clone.style.maxWidth = `${articleRect.width}px`;
      }
    }

    articleTopInScrollContent = getArticleTopInScrollContent(root, article);
  }

  syncOverlayRect();

  const resizeObserver = new ResizeObserver(() => {
    if (destroyed) return;
    cancelAnimationFrame(syncFrame);
    syncFrame = requestAnimationFrame(syncOverlayRect);
  });
  resizeObserver.observe(article);
  if (!isDocumentScroller(root)) resizeObserver.observe(root);

  function update(scrollTop: number, streakPxRaw: number, direction: -1 | 1) {
    if (destroyed) return;

    const streakPx = Math.max(0, Math.min(maxStreakPx, streakPxRaw));
    const activeSamples =
      streakPx < minVisibleStreakPx
        ? 1
        : Math.min(sampleCount, Math.max(3, Math.ceil(streakPx / 7) + 1));

    syncOverlayRect();

    for (let i = 0; i < samples.length; i += 1) {
      const sample = samples[i];
      if (i >= activeSamples) {
        sample.style.opacity = '0';
        continue;
      }

      const t = activeSamples === 1 ? 0 : i / (activeSamples - 1);
      const sampleScrollTop = scrollTop - direction * streakPx * t;
      const y = articleTopInScrollContent - sampleScrollTop;
      const opacity =
        activeSamples === 1
          ? 1
          : Math.min(0.72, (weights[i] / weightSum) * 1.65) * (0.3 + 0.7 * blurStrength);

      sample.style.transform = `translate3d(0, ${Math.round(y * 1000) / 1000}px, 0)`;
      sample.style.opacity = String(opacity);
    }
  }

  function destroy() {
    if (destroyed) return;
    destroyed = true;

    cancelAnimationFrame(syncFrame);
    resizeObserver.disconnect();
    article.classList.remove('hash-scroll-ghost-source');
    document.body.classList.remove('hash-scroll-source-hidden');
    root.classList.remove('hash-scroll-active');
    overlay.remove();
  }

  return { update, destroy };
}
