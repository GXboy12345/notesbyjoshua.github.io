import renderMathInElement from 'katex/contrib/auto-render';

const DELEGATED = 'practiceDelegated';
const CHOICE = /^[A-D]$/;

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

type McqPhase = 'idle' | 'answered' | 'revealed';

function proseRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>('.prose');
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

function setFeedback(mcq: HTMLElement, kind: 'correct' | 'incorrect' | null) {
  for (const node of mcq.querySelectorAll<HTMLElement>('[data-feedback]')) {
    const tag = node.dataset.feedback;
    if (tag !== 'correct' && tag !== 'incorrect') continue;
    node.hidden = kind === null || tag !== kind;
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

function markAnsweredChoices(mcq: HTMLElement, correct: string) {
  const picked = selectedChoice(mcq);
  for (const el of choiceElements(mcq)) {
    const value = normalizeChoice(el.dataset.choice);
    if (!value) continue;
    el.classList.remove('is-correct', 'is-incorrect', 'is-selected');
    if (value === correct) el.classList.add('is-correct');
    else if (value === picked) el.classList.add('is-incorrect');
    if (value === picked) el.classList.add('is-selected');
  }
}

function prepareMcq(mcq: HTMLElement) {
  const correct = normalizeChoice(mcq.dataset.correct);
  if (!correct) return;

  hideSolutions(mcq);
  mcq.dataset.practicePhase = 'idle';

  for (const el of choiceElements(mcq)) {
    const value = normalizeChoice(el.dataset.choice);
    if (!value) continue;
    el.setAttribute('role', 'radio');
    if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
  }
}

function prepareFrq(frq: HTMLElement) {
  hideSolutions(frq);
  frq.dataset.practicePhase = 'idle';
}

function runCheck(mcq: HTMLElement) {
  if ((mcq.dataset.practicePhase as McqPhase) !== 'idle') return;

  const correct = normalizeChoice(mcq.dataset.correct);
  if (!correct) return;

  const picked = selectedChoice(mcq);
  if (!picked) return;

  const isCorrect = picked === correct;
  mcq.dataset.practicePhase = 'answered';
  mcq.classList.toggle('mcq--correct', isCorrect);
  mcq.classList.toggle('mcq--incorrect', !isCorrect);
  setFeedback(mcq, isCorrect ? 'correct' : 'incorrect');
  markAnsweredChoices(mcq, correct);
  setChoicesDisabled(mcq, true);

  const checkBtn = mcq.querySelector<HTMLButtonElement>('[data-mcq-check]');
  if (checkBtn) checkBtn.disabled = true;
}

function runMcqReveal(mcq: HTMLElement) {
  revealSolutions(mcq);
  setChoicesDisabled(mcq, true);
  for (const btn of mcq.querySelectorAll<HTMLButtonElement>(
    '[data-mcq-check], [data-mcq-show-solution], [data-mcq-skip]',
  )) {
    btn.disabled = true;
  }
}

function renderPracticeMath(prose: HTMLElement) {
  const targets = prose.querySelectorAll<HTMLElement>(
    '.mcq-stem, .mcq-solution, .frq-parts, .frq-solution',
  );
  for (const el of targets) {
    if (el.querySelector('.katex')) continue;
    renderMathInElement(el, katexOpts);
  }
}

function bindDelegatedHandlers(prose: HTMLElement) {
  if (prose.dataset[DELEGATED] === '1') return;
  prose.dataset[DELEGATED] = '1';

  prose.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const choice = target.closest<HTMLElement>('[data-choice]');
    if (choice) {
      const mcq = mcqRoot(choice);
      if (!mcq || (mcq.dataset.practicePhase as McqPhase) !== 'idle') return;
      const value = normalizeChoice(choice.dataset.choice);
      if (!value) return;
      syncChoiceUi(mcq, value);
      return;
    }

    if (target.closest('[data-mcq-check]')) {
      const mcq = mcqRoot(target);
      if (mcq) runCheck(mcq);
      return;
    }

    if (target.closest('[data-mcq-show-solution], [data-mcq-skip]')) {
      const mcq = mcqRoot(target);
      if (mcq) runMcqReveal(mcq);
      return;
    }

    if (target.closest('[data-frq-reveal], [data-frq-show-solution]')) {
      const frq = frqRoot(target);
      if (!frq) return;
      revealSolutions(frq);
      const btn = frq.querySelector<HTMLButtonElement>('[data-frq-reveal], [data-frq-show-solution]');
      if (btn) btn.disabled = true;
    }
  });

  prose.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const choice = target.closest<HTMLElement>('[data-choice]');
    if (!choice) return;
    event.preventDefault();
    choice.click();
  });
}

function bindAll() {
  const prose = proseRoot();
  if (!prose) return;

  bindDelegatedHandlers(prose);
  prose.querySelectorAll<HTMLElement>('[data-mcq]').forEach(prepareMcq);
  prose.querySelectorAll<HTMLElement>('[data-frq]').forEach(prepareFrq);
  renderPracticeMath(prose);
}

let pageLoadBound = false;

export function initDocPractice() {
  bindAll();

  if (pageLoadBound) return;
  pageLoadBound = true;
  document.addEventListener('astro:page-load', bindAll);
}
