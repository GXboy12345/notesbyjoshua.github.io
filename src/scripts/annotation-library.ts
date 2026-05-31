import {
  downloadExport,
  exportAnnotationsJson,
  formatImportToast,
  importAnnotationsJson,
} from '../lib/annotations/import-export';
import { deleteAnnotation, emitAnnotationsChanged } from '../lib/annotations/db';
import {
  previewTextForRecord,
  rebuildLibrarySearchIndex,
  searchLibrary,
  type LibrarySearchHit,
} from '../lib/annotations/search';
import { escapeHtml } from '../lib/annotations/sanitize';
import { ANNOTATIONS_CHANGED } from '../lib/annotations/types';
import { pageUrlWithAnnotation, setPendingAnnotationId, showAnnotationToast } from './doc-annotations';
import { p } from '../lib/paths';

type LibraryFilter = 'all' | 'highlight' | 'bookmark' | 'stale';

const DRAWER_OPEN_CLASS = 'is-open';
const DRAWER_MOTION_MS = 220;

let searchTimer = 0;
let currentFilter: LibraryFilter = 'all';
let bound = false;
let closeTimer = 0;

function drawer(): HTMLDialogElement | null {
  return document.getElementById('annotation-library-drawer') as HTMLDialogElement | null;
}

function listEl(): HTMLElement | null {
  return document.getElementById('annotation-library-list');
}

function searchInput(): HTMLInputElement | null {
  return document.getElementById('annotation-library-search') as HTMLInputElement | null;
}

function filterQuery(): { kind?: 'highlight' | 'bookmark'; stale?: boolean } | undefined {
  if (currentFilter === 'highlight') return { kind: 'highlight' };
  if (currentFilter === 'bookmark') return { kind: 'bookmark' };
  if (currentFilter === 'stale') return { stale: true };
  return undefined;
}

export function renderLibraryItemRow(hit: LibrarySearchHit, opts?: { navDataAttr?: boolean }): string {
  const { record } = hit;
  const preview = escapeHtml(previewTextForRecord(record));
  const title = escapeHtml(record.anchor.pageTitle);
  const kindLabel = record.kind === 'highlight' ? 'Highlight' : 'Bookmark';
  const color = record.color
    ? `<span class="annotation-library-color annotation-library-color--${escapeHtml(record.color)}"></span>`
    : '';
  const stale = record.stale
    ? `<span class="annotation-stale-badge annotation-stale-badge--inline" title="Annotation does not match current content version." aria-label="Annotation does not match current content version.">!</span>`
    : '';
  const navUrl = pageUrlWithAnnotation(record.anchor.pageId, record.id);
  const navAttr = opts?.navDataAttr ? ` data-nav-ann="${escapeHtml(record.id)}"` : '';
  const comment = record.comment?.trim()
    ? `<p class="annotation-library-item__comment">${escapeHtml(record.comment)}</p>`
    : '';

  return `
    <li class="annotation-library-item" data-id="${escapeHtml(record.id)}">
      <div class="annotation-library-item__head">
        <span class="annotation-library-item__kind">${kindLabel}</span>
        ${color}
        <span class="annotation-library-item__title">${title}</span>
        ${stale}
      </div>
      <div class="annotation-library-item__body">
        <p class="annotation-library-item__preview-text">${preview}</p>
        ${comment}
        <div class="annotation-library-item__actions">
          <a class="annotation-library-link" href="${escapeHtml(navUrl)}"${navAttr}>Go to note</a>
          <button type="button" class="annotation-library-delete" data-delete="${escapeHtml(record.id)}">Remove</button>
        </div>
      </div>
    </li>
  `;
}

async function renderList(): Promise<void> {
  const list = listEl();
  const input = searchInput();
  if (!list) return;

  const q = input?.value ?? '';
  const hits = await searchLibrary(q, 100, filterQuery());

  if (!hits.length) {
    list.innerHTML = '<li class="annotation-library-empty">No annotations yet.</li>';
    return;
  }

  list.innerHTML = hits.map((hit) => renderLibraryItemRow(hit, { navDataAttr: true })).join('');
}

function debouncedSearch(): void {
  window.clearTimeout(searchTimer);
  searchTimer = window.setTimeout(() => {
    void renderList();
  }, 120);
}

function finishDrawerClose(d: HTMLDialogElement): void {
  window.clearTimeout(closeTimer);
  closeTimer = 0;
  if (!d.open) return;
  d.close();
  d.classList.remove(DRAWER_OPEN_CLASS);
  document.documentElement.classList.remove('annotation-library-open');
  document.body.classList.remove('annotation-library-open');
}

export function openAnnotationLibrary(): void {
  const d = drawer();
  if (!d) return;
  window.clearTimeout(closeTimer);
  document.documentElement.classList.add('annotation-library-open');
  document.body.classList.add('annotation-library-open');
  if (!d.open) {
    d.classList.remove(DRAWER_OPEN_CLASS);
    d.showModal();
    requestAnimationFrame(() => {
      d.classList.add(DRAWER_OPEN_CLASS);
    });
  } else {
    d.classList.add(DRAWER_OPEN_CLASS);
  }
  void renderList();
}

export function closeAnnotationLibrary(): void {
  const d = drawer();
  if (!d?.open || !d.classList.contains(DRAWER_OPEN_CLASS)) return;

  d.classList.remove(DRAWER_OPEN_CLASS);
  window.clearTimeout(closeTimer);
  closeTimer = window.setTimeout(() => finishDrawerClose(d), DRAWER_MOTION_MS + 40);
}

async function onExport(): Promise<void> {
  const data = await exportAnnotationsJson();
  downloadExport(data);
}

async function onImport(file: File): Promise<void> {
  try {
    const result = await importAnnotationsJson(file);
    await rebuildLibrarySearchIndex();
    emitAnnotationsChanged();
    showAnnotationToast(formatImportToast(result));
    await renderList();
  } catch (err) {
    showAnnotationToast(err instanceof Error ? err.message : 'Import failed');
  }
}

function onListClick(e: Event): void {
  const target = e.target as HTMLElement;

  const deleteId = target.closest('[data-delete]')?.getAttribute('data-delete');
  if (deleteId) {
    void deleteAnnotation(deleteId).then(async () => {
      await rebuildLibrarySearchIndex();
      emitAnnotationsChanged();
      await renderList();
    });
    return;
  }

  const nav = target.closest<HTMLAnchorElement>('[data-nav-ann]');
  if (nav) {
    e.preventDefault();
    const annId = nav.dataset.navAnn ?? '';
    setPendingAnnotationId(annId);
    closeAnnotationLibrary();
    if (window.location.pathname + window.location.search !== nav.pathname + nav.search) {
      window.location.assign(nav.href);
    }
  }
}

function bindLibraryEvents(): void {
  if (bound) return;
  bound = true;

  const d = drawer();
  d?.querySelectorAll('[data-annotation-library-close]').forEach((el) => {
    el.addEventListener('click', () => closeAnnotationLibrary());
  });

  d?.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeAnnotationLibrary();
  });

  d?.addEventListener('transitionend', (e) => {
    if (e.target !== d.querySelector('.annotation-library-panel')) return;
    if (e.propertyName !== 'transform') return;
    if (!d.classList.contains(DRAWER_OPEN_CLASS) && d.open) finishDrawerClose(d);
  });

  document.getElementById('annotation-library-open')?.addEventListener('click', () => {
    openAnnotationLibrary();
  });

  searchInput()?.addEventListener('input', debouncedSearch);

  document.querySelectorAll('[data-annotation-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentFilter = (btn.getAttribute('data-annotation-filter') as LibraryFilter) ?? 'all';
      document.querySelectorAll('[data-annotation-filter]').forEach((b) => {
        b.classList.toggle('is-active', b === btn);
      });
      void renderList();
    });
  });

  listEl()?.addEventListener('click', onListClick);

  document.getElementById('annotation-library-export')?.addEventListener('click', () => {
    void onExport();
  });

  const importInput = document.getElementById('annotation-library-import') as HTMLInputElement | null;
  importInput?.addEventListener('change', () => {
    const file = importInput.files?.[0];
    if (file) void onImport(file);
    importInput.value = '';
  });

  document.addEventListener(ANNOTATIONS_CHANGED, () => {
    if (drawer()?.open) void renderList();
  });
}

export function initAnnotationLibrary(): void {
  bindLibraryEvents();
}

export function libraryPageUrl(): string {
  return p('library/');
}
