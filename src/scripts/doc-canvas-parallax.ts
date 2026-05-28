const DESKTOP_QUERY = '(min-width: 1100px)';

// --- Compact 2D Perlin noise ---
function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function lerpN(a: number, b: number, t: number): number {
  return a + t * (b - a);
}
function grad2(h: number, x: number, y: number): number {
  const hh = h & 3;
  return ((hh & 1) ? -x : x) + ((hh & 2) ? -y : y);
}

class Perlin {
  private p: Uint8Array;
  constructor(seed = 42) {
    const src = new Uint8Array(256);
    for (let i = 0; i < 256; i++) src[i] = i;
    let s = seed >>> 0;
    for (let i = 255; i > 0; i--) {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      const j = s % (i + 1);
      const tmp = src[i]; src[i] = src[j]; src[j] = tmp;
    }
    this.p = new Uint8Array(512);
    for (let i = 0; i < 512; i++) this.p[i] = src[i & 255];
  }
  noise(x: number, y: number): number {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const a = this.p[xi] + yi;
    const b = this.p[xi + 1] + yi;
    return lerpN(
      lerpN(grad2(this.p[a], xf, yf), grad2(this.p[b], xf - 1, yf), u),
      lerpN(grad2(this.p[a + 1], xf, yf - 1), grad2(this.p[b + 1], xf - 1, yf - 1), u),
      v,
    );
  }
}

const perlin = new Perlin(42);

// --- Helpers ---
function isDesktop(): boolean {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getRate(docMain: HTMLElement): number {
  if (prefersReducedMotion()) return 1;
  const raw = getComputedStyle(docMain).getPropertyValue('--canvas-parallax-rate').trim();
  const r = parseFloat(raw);
  return isFinite(r) ? Math.max(0, Math.min(1, r)) : 0.25;
}

function getScrollRoot(docMain: HTMLElement): HTMLElement {
  if (isDesktop()) {
    const { overflowY } = getComputedStyle(docMain);
    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') return docMain;
  }
  return document.documentElement;
}

function getScrollTop(root: HTMLElement): number {
  return root === document.documentElement
    ? (window.scrollY || document.documentElement.scrollTop || 0)
    : root.scrollTop;
}

// --- Draw ---
// Angled wave direction — ~28 degrees off horizontal
const WAVE_COS = Math.cos(Math.PI / 6.5);
const WAVE_SIN = Math.sin(Math.PI / 6.5);
// Wavelength in world-space pixels (controls band width)
const WAVELENGTH = 210;
const WAVE_FREQ = (Math.PI * 2) / WAVELENGTH;
// Perlin perturbation scale
const NOISE_SCALE = 0.038;

function dotRadius(worldX: number, worldY: number, baseRadius: number): number {
  // Project position onto wave direction, get sine value
  const proj = worldX * WAVE_COS + worldY * WAVE_SIN;
  const wave = Math.sin(proj * WAVE_FREQ); // [-1, 1]

  // Perlin adds organic irregularity so wave edges aren't sharp/mechanical
  const n = perlin.noise(worldX * NOISE_SCALE, worldY * NOISE_SCALE);
  const noise = n * (1 / 0.7); // normalize to ~[-1, 1]

  // 70% wave shape, 30% noise irregularity
  const combined = wave * 0.7 + noise * 0.3;
  const t = combined * 0.5 + 0.5; // [0, 1]

  return baseRadius * (0.45 + 0.85 * t);
}

function drawDots(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  scrollTop: number,
  rate: number,
  dotColor: string,
  spacing: number,
  baseRadius: number,
): void {
  ctx.clearRect(0, 0, W, H);
  if (W === 0 || H === 0) return;

  ctx.fillStyle = dotColor;

  const worldYStart = scrollTop * rate;
  const rowStart = Math.floor(worldYStart / spacing) - 1;
  const rowEnd = Math.ceil((worldYStart + H) / spacing) + 1;
  const colEnd = Math.ceil(W / spacing) + 1;

  for (let gy = rowStart; gy <= rowEnd; gy++) {
    const worldY = gy * spacing;
    const canvasY = worldY - worldYStart;
    for (let gx = 0; gx <= colEnd; gx++) {
      const worldX = gx * spacing;
      const r = dotRadius(worldX, worldY, baseRadius);
      if (r < 0.1) continue;
      ctx.beginPath();
      ctx.arc(worldX, canvasY, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// --- Controller ---
type Controller = { destroy(): void };
let active: Controller | null = null;

function bindParallax(docMain: HTMLElement, canvas: HTMLCanvasElement): Controller {
  const ctx = canvas.getContext('2d');
  if (!ctx) return { destroy: () => {} };

  let root = getScrollRoot(docMain);
  let raf = 0;

  function viewportH(): number {
    return isDesktop() ? docMain.clientHeight : window.innerHeight;
  }

  function syncSize(): void {
    const w = docMain.clientWidth;
    const h = viewportH();
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }

  function draw(): void {
    const style = getComputedStyle(docMain);
    const dotColor = style.getPropertyValue('--canvas-dot').trim() || 'rgba(20,24,32,0.2)';
    const spacing = parseFloat(style.getPropertyValue('--canvas-dot-spacing').trim()) || 28;
    const baseRadius = parseFloat(style.getPropertyValue('--canvas-dot-size').trim()) || 1.5;
    drawDots(ctx, canvas.width, canvas.height, getScrollTop(root), getRate(docMain), dotColor, spacing, baseRadius);
  }

  function schedule(): void {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      syncSize();
      draw();
    });
  }

  const onScroll = () => schedule();
  const onResize = () => schedule();

  root.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });

  const mediaQuery = window.matchMedia(DESKTOP_QUERY);
  const onMediaChange = () => {
    root.removeEventListener('scroll', onScroll);
    root = getScrollRoot(docMain);
    root.addEventListener('scroll', onScroll, { passive: true });
    schedule();
  };
  mediaQuery.addEventListener('change', onMediaChange);

  // Redraw when theme toggles (data-theme attribute changes on <html>)
  const themeObserver = new MutationObserver(() => schedule());
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => schedule()) : null;
  ro?.observe(docMain);

  syncSize();
  draw();

  return {
    destroy() {
      if (raf) cancelAnimationFrame(raf);
      root.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      mediaQuery.removeEventListener('change', onMediaChange);
      themeObserver.disconnect();
      ro?.disconnect();
    },
  };
}

export function initDocCanvasParallax(): void {
  active?.destroy();
  active = null;

  const docMain = document.querySelector<HTMLElement>('.doc-main');
  const canvas = docMain?.querySelector<HTMLCanvasElement>('.doc-main__canvas');
  if (!docMain || !canvas) return;

  active = bindParallax(docMain, canvas);
}

let pageLoadBound = false;

export function bindDocCanvasParallax(): void {
  initDocCanvasParallax();
  if (pageLoadBound) return;
  pageLoadBound = true;
  document.addEventListener('astro:page-load', initDocCanvasParallax);
}
