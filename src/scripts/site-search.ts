import type { SearchHit } from '../lib/search-types';
import { HEADER_RESULT_LIMIT } from '../lib/search-config';
import {
  highlight,
  preloadSearchIndex,
  querySearch,
  searchPageUrl,
} from '../lib/search-client';
import { p } from '../lib/paths';

export function initSiteSearch(root: HTMLElement) {
  if (root.dataset.searchBound === '1') return;
  root.dataset.searchBound = '1';

  const input = root.querySelector<HTMLInputElement>('.header-search-input');
  const panel = root.querySelector<HTMLDivElement>('.header-search-panel');
  const list = root.querySelector<HTMLUListElement>('.header-search-results');
  const status = root.querySelector<HTMLParagraphElement>('.header-search-status');
  const footer = root.querySelector<HTMLDivElement>('.header-search-footer');

  if (!input || !panel || !list || !status) return;

  let hits: SearchHit[] = [];
  let total = 0;
  let active = -1;
  let renderToken = 0;

  const setOpen = (open: boolean) => {
    panel.hidden = !open;
    input.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (!open) input.removeAttribute('aria-activedescendant');
  };

  const render = async (keepActive = false) => {
    const token = ++renderToken;
    const q = input.value.trim();
    list.innerHTML = '';
    if (footer) footer.innerHTML = '';

    if (!q) {
      status.textContent = '';
      hits = [];
      total = 0;
      if (!keepActive) active = -1;
      setOpen(false);
      return;
    }

    const result = await querySearch(q, HEADER_RESULT_LIMIT, 'header');
    if (token !== renderToken) return;

    hits = result.hits;
    total = result.total;
    if (!keepActive) active = hits.length ? 0 : -1;

    if (!result.engine) {
      status.textContent = 'Search index unavailable.';
      setOpen(true);
      return;
    }

    if (!hits.length) {
      status.textContent = `No results for “${q}”.`;
      if (footer) {
        footer.innerHTML = `<a class="header-search-more" href="${searchPageUrl(q)}">Open search page</a>`;
      }
      setOpen(true);
      return;
    }

    const shown = hits.length;
    const suffix =
      total > shown ? ` (showing ${shown} of ${total})` : '';
    status.textContent = `${total} result${total === 1 ? '' : 's'}${suffix}.`;
    setOpen(true);

    for (let i = 0; i < hits.length; i++) {
      const hit = hits[i];
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'header-search-hit';
      a.href = p(hit.url);
      a.role = 'option';
      a.dataset.index = String(i);
      if (i === active) {
        a.id = 'header-search-active';
        input.setAttribute('aria-activedescendant', a.id);
      }
      a.innerHTML = `<span class="header-search-hit-title">${highlight(hit.title, q)}</span><span class="header-search-hit-excerpt">${highlight(hit.excerpt, q)}</span>`;
      li.append(a);
      list.append(li);
    }

    if (footer) {
      footer.innerHTML = `<a class="header-search-more" href="${searchPageUrl(q)}">View all results</a>`;
    }

    if (active < 0) input.removeAttribute('aria-activedescendant');
  };

  const goActive = () => {
    if (active < 0 || active >= hits.length) return;
    window.location.href = p(hits[active].url);
  };

  input.addEventListener('input', () => {
    void render();
  });
  input.addEventListener('pointerenter', preloadSearchIndex, { once: true });
  input.addEventListener('focus', () => {
    preloadSearchIndex();
    if (input.value.trim()) void render();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      input.value = '';
      void render();
      input.blur();
      return;
    }

    const q = input.value.trim();
    if (event.key === 'Enter' && event.metaKey && q) {
      event.preventDefault();
      window.location.href = searchPageUrl(q);
      return;
    }

    if (!hits.length) {
      if (event.key === 'Enter' && q) {
        event.preventDefault();
        window.location.href = searchPageUrl(q);
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      active = Math.min(active + 1, hits.length - 1);
      void render(true);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      active = Math.max(active - 1, 0);
      void render(true);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      goActive();
    }
  });

  document.addEventListener('click', (event) => {
    if (!root.contains(event.target as Node)) setOpen(false);
  });

  document.addEventListener('astro:before-preparation', () => setOpen(false));
}

export function bindSiteSearch() {
  document.querySelectorAll<HTMLElement>('[data-site-search]').forEach(initSiteSearch);
}
