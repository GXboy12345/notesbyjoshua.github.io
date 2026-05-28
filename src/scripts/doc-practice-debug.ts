export type PracticeDebugEvent =
  | 'init'
  | 'bind'
  | 'bind-skip'
  | 'delegate'
  | 'click'
  | 'choice'
  | 'check'
  | 'reveal'
  | 'frq-reveal'
  | 'error';

export type PracticeDebugEntry = {
  t: number;
  event: PracticeDebugEvent;
  detail?: Record<string, unknown>;
};

const LOG: PracticeDebugEntry[] = [];
const MAX = 200;

function enabled(): boolean {
  if (typeof window === 'undefined') return false;
  if (import.meta.env.DEV) return true;
  try {
    if (localStorage.getItem('practice:debug') === '1') return true;
  } catch {
    /* private mode */
  }
  return new URLSearchParams(window.location.search).has('practiceDebug');
}

function push(event: PracticeDebugEvent, detail?: Record<string, unknown>) {
  if (!enabled()) return;
  const entry: PracticeDebugEntry = { t: Date.now(), event, detail };
  LOG.push(entry);
  if (LOG.length > MAX) LOG.shift();
  console.debug('[practice]', event, detail ?? '');
}

export function practiceDebug(event: PracticeDebugEvent, detail?: Record<string, unknown>) {
  push(event, detail);
}

export function practiceDebugLog(): PracticeDebugEntry[] {
  return [...LOG];
}

export function practiceDebugEnabled(): boolean {
  return enabled();
}

export function mountPracticeDebugPanel(state: () => Record<string, unknown>) {
  if (!enabled() || typeof document === 'undefined') return;

  const existing = document.getElementById('practice-debug-panel');
  if (existing) {
    existing.remove();
  }

  const panel = document.createElement('aside');
  panel.id = 'practice-debug-panel';
  panel.setAttribute('aria-label', 'Practice debug');
  panel.innerHTML = `
<style>
#practice-debug-panel {
  position: fixed;
  right: 0.75rem;
  bottom: 0.75rem;
  z-index: 2147483001;
  width: min(22rem, calc(100vw - 1.5rem));
  max-height: min(40vh, 20rem);
  overflow: auto;
  padding: 0.55rem 0.65rem;
  border: 1px solid color-mix(in srgb, #c45 55%, #888);
  border-radius: 8px;
  background: color-mix(in srgb, #120 92%, #000);
  color: #f4f4f4;
  font: 11px/1.35 ui-monospace, SFMono-Regular, Menlo, monospace;
  box-shadow: 0 8px 28px rgba(0,0,0,0.35);
  pointer-events: auto;
}
#practice-debug-panel h2 {
  margin: 0 0 0.35rem;
  font: 600 11px/1.2 ui-monospace, monospace;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #ffb4a8;
}
#practice-debug-panel dl {
  margin: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.15rem 0.45rem;
}
#practice-debug-panel dt { opacity: 0.65; }
#practice-debug-panel dd { margin: 0; word-break: break-word; }
#practice-debug-panel ol {
  margin: 0.45rem 0 0;
  padding-left: 1rem;
}
#practice-debug-panel li { margin: 0.1rem 0; }
</style>
<h2>Practice debug</h2>
<dl id="practice-debug-state"></dl>
<ol id="practice-debug-log" reversed></ol>
`;

  document.body.append(panel);

  const stateDl = panel.querySelector('#practice-debug-state')!;
  const logOl = panel.querySelector('#practice-debug-log')!;

  const render = () => {
    const snap = state();
    stateDl.innerHTML = Object.entries(snap)
      .map(
        ([k, v]) =>
          `<dt>${k}</dt><dd>${typeof v === 'string' ? v : JSON.stringify(v)}</dd>`,
      )
      .join('');

    logOl.innerHTML = practiceDebugLog()
      .slice(-12)
      .reverse()
      .map((e) => {
        const d = e.detail ? ` ${JSON.stringify(e.detail)}` : '';
        return `<li>${new Date(e.t).toISOString().slice(11, 23)} ${e.event}${d}</li>`;
      })
      .join('');
  };

  render();
  window.setInterval(render, 400);
}
