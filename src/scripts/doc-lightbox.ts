const BOUND = 'lightboxBound';
const OVERLAY_CLASS = 'doc-lightbox';

let overlay: HTMLDivElement | null = null;
let overlayImg: HTMLImageElement | null = null;
let overlayClose: HTMLButtonElement | null = null;
let overlayReady = false;
let keyListenerBound = false;

function ensureOverlay(): HTMLDivElement {
  if (overlay) return overlay;

  overlay = document.createElement('div');
  overlay.className = OVERLAY_CLASS;
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Enlarged figure');

  overlayClose = document.createElement('button');
  overlayClose.type = 'button';
  overlayClose.className = `${OVERLAY_CLASS}__close`;
  overlayClose.setAttribute('aria-label', 'Close');
  overlayClose.textContent = '×';

  overlayImg = document.createElement('img');
  overlayImg.className = `${OVERLAY_CLASS}__img`;
  overlayImg.alt = '';

  const backdrop = document.createElement('div');
  backdrop.className = `${OVERLAY_CLASS}__backdrop`;
  backdrop.setAttribute('data-lightbox-dismiss', '');

  overlay.append(backdrop, overlayImg, overlayClose);
  document.body.append(overlay);

  backdrop.addEventListener('click', closeLightbox);
  overlayClose.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay || event.target === backdrop) closeLightbox();
  });

  overlayReady = true;
  return overlay;
}

function closeLightbox() {
  if (!overlay) return;
  overlay.hidden = true;
  document.body.classList.remove('lightbox-open');
  if (overlayImg) {
    overlayImg.removeAttribute('src');
    overlayImg.alt = '';
  }
}

function openLightbox(img: HTMLImageElement) {
  const shell = ensureOverlay();
  if (!overlayImg) return;

  overlayImg.src = img.currentSrc || img.src;
  overlayImg.alt = img.alt || 'Enlarged figure';
  shell.hidden = false;
  document.body.classList.add('lightbox-open');
  overlayClose?.focus();
}

function bindFigureImages() {
  const prose = document.querySelector('.prose');
  if (!prose) return;

  prose.querySelectorAll<HTMLImageElement>('.note-figure img').forEach((img) => {
    if (img.dataset[BOUND] === '1') return;
    img.dataset[BOUND] = '1';
    img.style.cursor = 'zoom-in';

    img.addEventListener('click', (event) => {
      if (event.defaultPrevented) return;
      if ((event.target as Element).closest('a')) return;
      event.preventDefault();
      openLightbox(img);
    });
  });
}

function bindEscape() {
  if (keyListenerBound) return;
  keyListenerBound = true;
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay && !overlay.hidden) closeLightbox();
  });
  document.addEventListener('astro:before-preparation', closeLightbox);
}

let pageLoadBound = false;

export function initDocLightbox() {
  ensureOverlay();
  bindEscape();
  bindFigureImages();

  if (pageLoadBound) return;
  pageLoadBound = true;
  document.addEventListener('astro:page-load', bindFigureImages);
}
