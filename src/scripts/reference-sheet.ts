import renderMathInElement from 'katex/contrib/auto-render';
import { p } from '../lib/paths';

type ReferenceSheetItem = {
  prefix: string;
  label: string;
  url: string;
  html: string;
};

type ReferenceSheetPayload = {
  sheets: ReferenceSheetItem[];
};

const katexOpts = {
  delimiters: [
    { left: '$$', right: '$$', display: true },
    { left: '\\[', right: '\\]', display: true },
    { left: '\\(', right: '\\)', display: false },
    { left: '$', right: '$', display: false },
  ],
  throwOnError: false,
  strict: false,
};

let payloadPromise: Promise<ReferenceSheetPayload> | null = null;
let drawerBound = false;
let activeSheet: ReferenceSheetItem | null = null;

function loadPayload(): Promise<ReferenceSheetPayload> {
  if (!payloadPromise) {
    payloadPromise = fetch(p('reference-sheets.json'))
      .then((res) => {
        if (!res.ok) throw new Error(`reference sheets ${res.status}`);
        return res.json() as Promise<ReferenceSheetPayload>;
      })
      .catch(() => ({ sheets: [] }));
  }
  return payloadPromise;
}

function normPath(pathname: string): string {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function matchesPrefix(pathname: string, prefix: string): boolean {
  const cur = normPath(pathname);
  const pref = normPath(p(prefix));
  return cur === pref || cur.startsWith(pref);
}

function findSheet(sheets: ReferenceSheetItem[], pathname: string): ReferenceSheetItem | null {
  const matches = sheets.filter((s) => matchesPrefix(pathname, s.prefix));
  if (!matches.length) return null;
  return matches.sort((a, b) => b.prefix.length - a.prefix.length)[0];
}

function getDrawer(): HTMLDialogElement | null {
  return document.getElementById('ref-sheet-drawer') as HTMLDialogElement | null;
}

function closeDrawer() {
  const dialog = getDrawer();
  if (!dialog?.open) return;
  dialog.close();
  document.documentElement.classList.remove('ref-sheet-open');
}

function renderMath(body: HTMLElement | null) {
  if (!body) return;
  renderMathInElement(body, katexOpts);
}

function openDrawer(sheet: ReferenceSheetItem) {
  const dialog = getDrawer();
  const title = document.getElementById('ref-sheet-title');
  const body = document.getElementById('ref-sheet-body');
  if (!dialog || !title || !body) return;

  title.textContent = sheet.label;
  body.innerHTML = sheet.html;
  renderMath(body);

  if (!dialog.open) {
    document.documentElement.classList.add('ref-sheet-open');
    dialog.showModal();
  }
}

function bindDrawer() {
  if (drawerBound) return;
  drawerBound = true;

  const dialog = getDrawer();
  if (!dialog) return;

  dialog.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    if (t.dataset.refSheetClose !== undefined || t === dialog) closeDrawer();
  });

  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeDrawer();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dialog.open) closeDrawer();
  });
}

function syncHandle(sheets: ReferenceSheetItem[]) {
  const slot = document.getElementById('ref-sheet-handle');
  if (!slot) return;

  const sheet = findSheet(sheets, window.location.pathname);
  closeDrawer();

  if (!sheet) {
    slot.hidden = true;
    slot.replaceChildren();
    activeSheet = null;
    return;
  }

  activeSheet = sheet;
  slot.hidden = false;

  let btn = slot.querySelector<HTMLButtonElement>('.ref-sheet-handle-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ref-sheet-handle-btn';
    slot.replaceChildren(btn);
  }

  btn.textContent = sheet.label;
  btn.onclick = () => {
    if (activeSheet) openDrawer(activeSheet);
  };
}

export function initReferenceSheet() {
  bindDrawer();

  void loadPayload().then((payload) => {
    syncHandle(payload.sheets);
  });
}
