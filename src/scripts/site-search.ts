import type { SearchHit, SearchRecord } from '../lib/search-types';
import { searchIndex } from '../lib/search-query';
import { p } from '../lib/paths';

let indexPromise: Promise<SearchRecord[]> | null = null;

function loadIndex(): Promise<SearchRecord[]> {
  if (!indexPromise) {
    indexPromise = fetch(p('search-index.json'))
      .then((res) => {
        if (!res.ok) throw new Error(`search index ${res.status}`);
        return res.json() as Promise<SearchRecord[]>;
      })
      .catch(() => []);
  }
  return indexPromise;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlight(text: string, query: string): string {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return escapeHtml(text);

  const pattern = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  return escapeHtml(text).replace(pattern, '<mark>$1</mark>');
}

export function initSiteSearch(root: HTMLElement) {
  if (root.dataset.searchBound === '1') return;
  root.dataset.searchBound = '1';

  const input = root.querySelector<HTMLInputElement>('.header-search-input');
  const panel = root.querySelector<HTMLDivElement>('.header-search-panel');
  const list = root.querySelector<HTMLUListElement>('.header-search-results');
  const status = root.querySelector<HTMLParagraphElement>('.header-search-status');

  if (!input || !panel || !list || !status) return;

  let records: SearchRecord[] = [];
  let hits: SearchHit[] = [];
  let active = -1;

  void loadIndex().then((data) => {
    records = data;
  });

  const setOpen = (open: boolean) => {
    panel.hidden = !open;
    input.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (!open) input.removeAttribute('aria-activedescendant');
  };

  const render = (keepActive = false) => {
    const q = input.value.trim();
    hits = searchIndex(records, q);
    if (!keepActive) active = hits.length ? 0 : -1;
    list.innerHTML = '';

    if (!q) {
      status.textContent = '';
      setOpen(false);
      return;
    }

    if (!records.length) {
      status.textContent = 'Search index unavailable.';
      setOpen(true);
      return;
    }

    if (!hits.length) {
      status.textContent = `No results for “${q}”.`;
      setOpen(true);
      return;
    }

    status.textContent = `${hits.length} result${hits.length === 1 ? '' : 's'}.`;
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

    if (active < 0) input.removeAttribute('aria-activedescendant');
  };

  const goActive = () => {
    if (active < 0 || active >= hits.length) return;
    window.location.href = p(hits[active].url);
  };

  input.addEventListener('input', render);
  input.addEventListener('focus', () => {
    if (input.value.trim()) render();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      input.value = '';
      setOpen(false);
      input.blur();
      return;
    }
    if (!hits.length) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      active = Math.min(active + 1, hits.length - 1);
      render(true);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      active = Math.max(active - 1, 0);
      render(true);
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
