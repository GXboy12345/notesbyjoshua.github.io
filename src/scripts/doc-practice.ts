import {
  mountPracticeDebugPanel,
  practiceDebug,
  practiceDebugEnabled,
  practiceDebugLog,
} from './doc-practice-debug';

const DELEGATED = 'practiceDelegated';
const CHOICE = /^[A-F]$/;

type McqPhase = 'idle' | 'answered' | 'revealed';
type McqFeedback = 'correct' | 'retry' | 'exhausted';

let bindCount = 0;
let lastBindAt = 0;
let delegatedProse: HTMLElement | null = null;

function articleProseFrom(el: HTMLElement): HTMLElement | null {
  const article = el.closest('article.prose');
  return article instanceof HTMLElement ? article : null;
}

function isPracticeTarget(el: HTMLElement): boolean {
  return articleProseFrom(el) !== null;
}

function normalizeChoice(value: string | null | undefined): string | null {
  if (!value) return null;
  const letter = value.trim().toUpperCase().charAt(0);
  return CHOICE.test(letter) ? letter : null;
}

function mcqRoot(el: HTMLElement): HTMLElement | null {
  return el.closest<HTMLElement>('[data-mcq]');
}

function frqRoot(el: HTMLElement): HTMLElement | null {
  return el.closest<HTMLElement>('[data-frq]');
}

function choiceElements(mcq: HTMLElement): HTMLElement[] {
  return [...mcq.querySelectorAll<HTMLElement>('.mcq-choices [data-choice]')];
}

function selectedChoice(mcq: HTMLElement): string | null {
  const pressed = mcq.querySelector<HTMLElement>('.mcq-choices [data-choice][aria-pressed="true"]');
  if (pressed) return normalizeChoice(pressed.dataset.choice);

  const marked = mcq.querySelector<HTMLElement>('.mcq-choices [data-choice][data-selected="true"]');
  if (marked) return normalizeChoice(marked.dataset.choice);

  return null;
}

function syncChoiceUi(mcq: HTMLElement, letter: string | null) {
  for (const el of choiceElements(mcq)) {
    const value = normalizeChoice(el.dataset.choice);
    const on = letter !== null && value === letter;
    el.setAttribute('aria-pressed', on ? 'true' : 'false');
    el.dataset.selected = on ? 'true' : 'false';
  }
}

function setChoicesDisabled(mcq: HTMLElement, disabled: boolean) {
  for (const el of choiceElements(mcq)) {
    if (el instanceof HTMLButtonElement) {
      el.disabled = disabled;
    }
    el.setAttribute('aria-disabled', disabled ? 'true' : 'false');
  }
}

function setFeedback(mcq: HTMLElement, kind: McqFeedback | null) {
  for (const node of mcq.querySelectorAll<HTMLElement>('[data-feedback]')) {
    const tag = node.dataset.feedback;
    if (tag !== 'correct' && tag !== 'retry' && tag !== 'exhausted') continue;
    node.hidden = kind === null || tag !== kind;
  }
}

function choiceCount(mcq: HTMLElement): number {
  return choiceElements(mcq).length;
}

function wrongAttempts(mcq: HTMLElement): string[] {
  const raw = mcq.dataset.wrongAttempts ?? '';
  return raw ? raw.split(',').filter(Boolean) : [];
}

function recordWrongAttempt(mcq: HTMLElement, letter: string): string[] {
  const wrong = wrongAttempts(mcq);
  if (!wrong.includes(letter)) wrong.push(letter);
  mcq.dataset.wrongAttempts = wrong.join(',');
  return wrong;
}

function choiceButton(mcq: HTMLElement, letter: string): HTMLElement | null {
  return (
    choiceElements(mcq).find((el) => normalizeChoice(el.dataset.choice) === letter) ?? null
  );
}

function lockWrongChoice(el: HTMLElement) {
  el.classList.add('is-incorrect');
  el.classList.remove('is-selected', 'is-correct');
  el.setAttribute('aria-pressed', 'false');
  el.dataset.selected = 'false';
  if (el instanceof HTMLButtonElement) el.disabled = true;
  el.setAttribute('aria-disabled', 'true');
}

function markCorrectChoice(el: HTMLElement) {
  el.classList.add('is-correct', 'is-selected');
  el.setAttribute('aria-pressed', 'true');
  el.dataset.selected = 'true';
}

function applyChoiceMarks(mcq: HTMLElement, correct: string, revealCorrect: boolean) {
  const wrong = wrongAttempts(mcq);
  const picked = selectedChoice(mcq);

  for (const el of choiceElements(mcq)) {
    const value = normalizeChoice(el.dataset.choice);
    if (!value) continue;

    el.classList.remove('is-correct', 'is-selected');
    if (revealCorrect && value === correct) el.classList.add('is-correct');
    else if (wrong.includes(value)) el.classList.add('is-incorrect');
    else el.classList.remove('is-incorrect');

    if (value === picked) el.classList.add('is-selected');
  }
}

function finalizeMcq(mcq: HTMLElement, correct: string, feedback: McqFeedback) {
  mcq.dataset.practicePhase = feedback === 'correct' ? 'answered' : 'revealed';
  mcq.classList.toggle('mcq--correct', feedback === 'correct');
  mcq.classList.toggle('mcq--incorrect', feedback === 'exhausted');
  applyChoiceMarks(mcq, correct, true);
  revealSolutions(mcq);
  setFeedback(mcq, feedback);
  setChoicesDisabled(mcq, true);

  for (const btn of mcq.querySelectorAll<HTMLButtonElement>('[data-mcq-show-solution]')) {
    btn.disabled = true;
  }
}

function solutionBlocks(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>('[data-solution], [data-rubric]')];
}

function revealSolutions(root: HTMLElement) {
  for (const block of solutionBlocks(root)) {
    block.hidden = false;
    block.classList.add('is-revealed');
  }
  root.classList.add('practice-revealed');
  root.dataset.practicePhase = 'revealed';
}

function hideSolutions(root: HTMLElement) {
  for (const block of solutionBlocks(root)) {
    if (!block.hasAttribute('data-keep-visible')) {
      block.hidden = true;
      block.classList.remove('is-revealed');
    }
  }
}

function submitPick(mcq: HTMLElement, picked: string) {
  practiceDebug('check', {
    phase: mcq.dataset.practicePhase ?? null,
    picked,
    correct: mcq.dataset.correct ?? null,
    wrongAttempts: wrongAttempts(mcq),
  });

  if ((mcq.dataset.practicePhase as McqPhase) !== 'idle') return;

  const correct = normalizeChoice(mcq.dataset.correct);
  if (!correct) return;

  syncChoiceUi(mcq, picked);

  if (picked === correct) {
    const pickedEl = choiceButton(mcq, picked);
    if (pickedEl) markCorrectChoice(pickedEl);
    finalizeMcq(mcq, correct, 'correct');
    return;
  }

  const wrong = recordWrongAttempt(mcq, picked);
  const pickedEl = choiceButton(mcq, picked);
  if (pickedEl) lockWrongChoice(pickedEl);

  const maxWrong = Math.max(0, choiceCount(mcq) - 1);
  if (wrong.length >= maxWrong) {
    finalizeMcq(mcq, correct, 'exhausted');
    return;
  }

  syncChoiceUi(mcq, null);
  setFeedback(mcq, 'retry');
  mcq.classList.remove('mcq--correct', 'mcq--incorrect');
}

function prepareMcq(mcq: HTMLElement) {
  const correct = normalizeChoice(mcq.dataset.correct);
  if (!correct) {
    practiceDebug('bind-skip', { reason: 'missing-correct', id: mcq.dataset.mcqId ?? null });
    return;
  }

  hideSolutions(mcq);
  mcq.dataset.practicePhase = 'idle';
  delete mcq.dataset.wrongAttempts;
  mcq.classList.remove('mcq--correct', 'mcq--incorrect', 'practice-revealed');

  for (const el of choiceElements(mcq)) {
    const value = normalizeChoice(el.dataset.choice);
    if (!value) continue;
    el.classList.remove('is-correct', 'is-incorrect', 'is-selected');
    el.setAttribute('role', 'radio');
    if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
    if (el instanceof HTMLButtonElement) el.disabled = false;
    el.setAttribute('aria-disabled', 'false');
    el.setAttribute('aria-pressed', 'false');
    el.dataset.selected = 'false';
  }

  setFeedback(mcq, null);

  for (const btn of mcq.querySelectorAll<HTMLButtonElement>('[data-mcq-show-solution]')) {
    btn.disabled = false;
  }
}

function prepareFrq(frq: HTMLElement) {
  hideSolutions(frq);
  frq.dataset.practicePhase = 'idle';
}

function runMcqReveal(mcq: HTMLElement) {
  practiceDebug('reveal', { id: mcq.dataset.mcqId ?? null });
  const correct = normalizeChoice(mcq.dataset.correct);
  if (correct) {
    finalizeMcq(mcq, correct, 'exhausted');
    return;
  }
  revealSolutions(mcq);
  setChoicesDisabled(mcq, true);
  for (const btn of mcq.querySelectorAll<HTMLButtonElement>('[data-mcq-show-solution]')) {
    btn.disabled = true;
  }
}

let documentClickBound = false;

function bindDocumentHandlers() {
  if (documentClickBound) return;
  documentClickBound = true;

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!isPracticeTarget(target)) return;

    practiceDebug('click', {
      tag: target.tagName,
      class: target.className || null,
      choice: target.closest('[data-choice]') ? true : false,
      mcqAction: target.closest('[data-mcq-show-solution]') ? true : false,
    });

    const choice = target.closest<HTMLElement>('[data-choice]');
    if (choice) {
      const mcq = mcqRoot(choice);
      if (!mcq) {
        practiceDebug('choice', { status: 'no-mcq-root' });
        return;
      }
      if ((mcq.dataset.practicePhase as McqPhase) !== 'idle') {
        practiceDebug('choice', { status: 'wrong-phase', phase: mcq.dataset.practicePhase ?? null });
        return;
      }
      if (choice instanceof HTMLButtonElement && choice.disabled) return;
      const value = normalizeChoice(choice.dataset.choice);
      if (!value) {
        practiceDebug('choice', { status: 'bad-value', raw: choice.dataset.choice ?? null });
        return;
      }
      syncChoiceUi(mcq, value);
      practiceDebug('choice', { status: 'selected', value, id: mcq.dataset.mcqId ?? null });
      return;
    }

    if (target.closest('[data-mcq-check]')) {
      const mcq = mcqRoot(target);
      if (mcq) runCheck(mcq);
      else practiceDebug('check', { status: 'no-mcq-root' });
      return;
    }

    if (target.closest('[data-mcq-show-solution], [data-mcq-skip]')) {
      const mcq = mcqRoot(target);
      if (mcq) runMcqReveal(mcq);
      else practiceDebug('reveal', { status: 'no-mcq-root' });
      return;
    }

    if (target.closest('[data-frq-reveal], [data-frq-show-solution]')) {
      const frq = frqRoot(target);
      if (!frq) return;
      practiceDebug('frq-reveal', { id: frq.dataset.frqId ?? null });
      revealSolutions(frq);
      const btn = frq.querySelector<HTMLButtonElement>('[data-frq-reveal], [data-frq-show-solution]');
      if (btn) btn.disabled = true;
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!isPracticeTarget(target)) return;
    const choice = target.closest<HTMLElement>('[data-choice]');
    if (!choice) return;
    event.preventDefault();
    choice.click();
  });

  practiceDebug('delegate', { status: 'document-bound' });
}

function bindDelegatedHandlers(prose: HTMLElement) {
  if (prose.dataset[DELEGATED] === '1') {
    practiceDebug('delegate', { status: 'already-prepared', tag: prose.tagName, class: prose.className });
    return;
  }
  prose.dataset[DELEGATED] = '1';
  delegatedProse = prose;

  practiceDebug('delegate', {
    status: 'prepared',
    tag: prose.tagName,
    class: prose.className,
    id: prose.id || null,
  });
}

function proseRoot(): HTMLElement | null {
  return (
    document.querySelector<HTMLElement>('article.prose') ??
    document.querySelector<HTMLElement>('.doc-main .prose') ??
    document.querySelector<HTMLElement>('.doc-main article')
  );
}

function bindAll() {
  bindCount += 1;
  lastBindAt = Date.now();

  bindDocumentHandlers();

  const prose = proseRoot();
  const allProse = document.querySelectorAll('.prose');

  if (!prose) {
    practiceDebug('bind', { status: 'no-prose', bindCount, proseCount: allProse.length });
    return;
  }

  bindDelegatedHandlers(prose);

  const mcqs = prose.querySelectorAll<HTMLElement>('[data-mcq]');
  const frqs = prose.querySelectorAll<HTMLElement>('[data-frq]');

  mcqs.forEach(prepareMcq);
  frqs.forEach(prepareFrq);

  practiceDebug('bind', {
    status: 'ok',
    bindCount,
    proseTag: prose.tagName,
    proseClass: prose.className,
    proseId: prose.id || null,
    proseCount: allProse.length,
    mcqCount: mcqs.length,
    frqCount: frqs.length,
    choiceCount: prose.querySelectorAll('[data-choice]').length,
    delegated: prose.dataset[DELEGATED] === '1',
    documentClickBound,
  });
}

let pageLoadBound = false;
let debugPanelMounted = false;

function debugState(): Record<string, unknown> {
  const prose = proseRoot();
  return {
    enabled: practiceDebugEnabled(),
    bindCount,
    lastBindAt: lastBindAt ? new Date(lastBindAt).toISOString().slice(11, 23) : 'never',
    prose: prose ? `${prose.tagName}.${prose.className}` : 'null',
    delegatedOn: delegatedProse ? `${delegatedProse.tagName}.${delegatedProse.className}` : 'null',
    documentClickBound,
    mcqs: prose?.querySelectorAll('[data-mcq]').length ?? 0,
    choices: prose?.querySelectorAll('[data-choice]').length ?? 0,
    proseNodes: document.querySelectorAll('.prose').length,
  };
}

export function initDocPractice() {
  practiceDebug('init', { href: typeof location !== 'undefined' ? location.pathname : null });

  try {
    bindAll();
  } catch (err) {
    practiceDebug('error', { where: 'bindAll', message: err instanceof Error ? err.message : String(err) });
    throw err;
  }

  if (practiceDebugEnabled() && !debugPanelMounted) {
    debugPanelMounted = true;
    mountPracticeDebugPanel(debugState);
  }

  if (pageLoadBound) return;
  pageLoadBound = true;
  document.addEventListener('astro:page-load', () => {
    practiceDebug('init', { source: 'astro:page-load', href: location.pathname });
    bindAll();
  });
}

if (typeof window !== 'undefined') {
  window.__practiceDebug = () => ({ ...debugState(), log: practiceDebugLog() });
}
