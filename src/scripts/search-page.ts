import { PAGE_RESULT_LIMIT } from '../lib/search-config';
import {
  highlight,
  preloadSearchIndex,
  querySearch,
  searchPageUrl,
} from '../lib/search-client';
import { p } from '../lib/paths';

function readInitialQuery(root: HTMLElement): string {
  const preset = root.dataset.initialQuery?.trim();
  if (preset) return preset;
  return new URLSearchParams(window.location.search).get('q')?.trim() ?? '';
}

function syncQueryParam(query: string) {
  const url = new URL(window.location.href);
  if (query) url.searchParams.set('q', query);
  else url.searchParams.delete('q');
  window.history.replaceState({}, '', url);
}

export function initSearchPage(root: HTMLElement) {
  if (root.dataset.searchPageBound === '1') return;
  root.dataset.searchPageBound = '1';

  const form = root.querySelector<HTMLFormElement>('.search-page-form');
  const input = root.querySelector<HTMLInputElement>('.search-page-input');
  const status = root.querySelector<HTMLParagraphElement>('.search-page-status');
  const list = root.querySelector<HTMLUListElement>('.search-page-results');

  if (!form || !input || !status || !list) return;

  let renderToken = 0;
  input.value = readInitialQuery(root);

  const render = async () => {
    const token = ++renderToken;
    const q = input.value.trim();
    syncQueryParam(q);
    list.innerHTML = '';

    if (!q) {
      status.textContent = 'Search notes, callouts, math, and embedded components.';
      return;
    }

    status.textContent = 'Searching…';
    const { engine, hits, total } = await querySearch(q, PAGE_RESULT_LIMIT, 'landing');
    if (token !== renderToken) return;

    if (!engine) {
      status.textContent = 'Search index unavailable.';
      return;
    }

    if (!hits.length) {
      status.textContent = `No results for “${q}”. Try fewer words or check spelling.`;
      return;
    }

    const capped = total > hits.length;
    status.textContent = capped
      ? `${total} results — showing first ${hits.length}.`
      : `${total} result${total === 1 ? '' : 's'}.`;

    for (const hit of hits) {
      const li = document.createElement('li');
      li.className = 'search-page-hit';
      li.innerHTML = `
        <a class="search-page-hit-link" href="${p(hit.url)}">
          <span class="search-page-hit-head">
            <span class="search-page-hit-title">${highlight(hit.title, q)}</span>
            ${hit.collection ? `<span class="search-page-hit-collection">${highlight(hit.collection, q)}</span>` : ''}
          </span>
          <span class="search-page-hit-excerpt">${highlight(hit.excerpt, q)}</span>
        </a>`;
      list.append(li);
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    void render();
  });

  input.addEventListener('input', () => {
    void render();
  });

  void render();

  input.addEventListener('pointerenter', preloadSearchIndex, { once: true });
  input.addEventListener('focus', preloadSearchIndex);
}

export function bindSearchPage() {
  document.querySelectorAll<HTMLElement>('[data-search-page]').forEach(initSearchPage);
}

export { searchPageUrl };
