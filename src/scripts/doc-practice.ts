import renderMathInElement from 'katex/contrib/auto-render';

const BOUND = 'practiceBound';
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

function choiceElements(mcq: HTMLElement): HTMLElement[] {
  return [...mcq.querySelectorAll<HTMLElement>('[data-choice]')];
}

function selectedChoice(mcq: HTMLElement): string | null {
  const input = mcq.querySelector<HTMLInputElement>('[data-choice]:checked');
  if (input) return normalizeChoice(input.dataset.choice ?? input.value);

  const pressed = mcq.querySelector<HTMLElement>('[data-choice][aria-pressed="true"]');
  if (pressed) return normalizeChoice(pressed.dataset.choice);

  const marked = mcq.querySelector<HTMLElement>('[data-choice][data-selected="true"]');
  if (marked) return normalizeChoice(marked.dataset.choice);

  return null;
}

function syncChoiceUi(mcq: HTMLElement, letter: string | null) {
  for (const el of choiceElements(mcq)) {
    const value = normalizeChoice(el.dataset.choice);
    const on = letter !== null && value === letter;
    if (el instanceof HTMLInputElement) {
      el.checked = on;
      continue;
    }
    el.setAttribute('aria-pressed', on ? 'true' : 'false');
    el.dataset.selected = on ? 'true' : 'false';
  }
}

function setChoicesDisabled(mcq: HTMLElement, disabled: boolean) {
  for (const el of choiceElements(mcq)) {
    if (el instanceof HTMLInputElement || el instanceof HTMLButtonElement) {
      el.disabled = disabled;
    }
    el.setAttribute('aria-disabled', disabled ? 'true' : 'false');
  }
}

function feedbackEl(mcq: HTMLElement, kind: 'correct' | 'incorrect'): HTMLElement | null {
  return (
    mcq.querySelector<HTMLElement>(`[data-feedback="${kind}"]`) ??
    mcq.querySelector<HTMLElement>(`[data-feedback-${kind}]`)
  );
}

function setFeedback(mcq: HTMLElement, kind: 'correct' | 'incorrect' | null) {
  for (const node of mcq.querySelectorAll<HTMLElement>('[data-feedback], [data-feedback-correct], [data-feedback-incorrect]')) {
    const tag =
      node.dataset.feedback ??
      (node.hasAttribute('data-feedback-correct') ? 'correct' : node.hasAttribute('data-feedback-incorrect') ? 'incorrect' : '');
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

function bindMcq(mcq: HTMLElement) {
  if (mcq.dataset[BOUND] === '1') return;
  mcq.dataset[BOUND] = '1';

  const correct = normalizeChoice(mcq.dataset.correct);
  if (!correct) return;

  hideSolutions(mcq);
  mcq.dataset.practicePhase = 'idle';

  const checkBtn = mcq.querySelector<HTMLButtonElement>('[data-mcq-check]');
  const showBtn = mcq.querySelector<HTMLButtonElement>('[data-mcq-show-solution]');
  const skipBtn = mcq.querySelector<HTMLButtonElement>('[data-mcq-skip]');

  const runCheck = () => {
    if ((mcq.dataset.practicePhase as McqPhase) !== 'idle') return;

    const picked = selectedChoice(mcq);
    if (!picked) return;

    const isCorrect = picked === correct;
    mcq.dataset.practicePhase = 'answered';
    mcq.classList.toggle('mcq--correct', isCorrect);
    mcq.classList.toggle('mcq--incorrect', !isCorrect);
    setFeedback(mcq, isCorrect ? 'correct' : 'incorrect');
    markAnsweredChoices(mcq, correct);
    setChoicesDisabled(mcq, true);
    checkBtn && (checkBtn.disabled = true);
  };

  const runReveal = () => {
    revealSolutions(mcq);
    setChoicesDisabled(mcq, true);
    if (checkBtn) checkBtn.disabled = true;
    if (showBtn) showBtn.disabled = true;
    if (skipBtn) skipBtn.disabled = true;
  };

  for (const el of choiceElements(mcq)) {
    const value = normalizeChoice(el.dataset.choice);
    if (!value) continue;

    if (el instanceof HTMLInputElement) {
      el.addEventListener('change', () => {
        if ((mcq.dataset.practicePhase as McqPhase) !== 'idle') return;
        syncChoiceUi(mcq, el.checked ? value : null);
      });
      continue;
    }

    el.setAttribute('role', el.getAttribute('role') ?? 'radio');
    if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
    el.addEventListener('click', () => {
      if ((mcq.dataset.practicePhase as McqPhase) !== 'idle') return;
      syncChoiceUi(mcq, value);
    });
    el.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      el.click();
    });
  }

  checkBtn?.addEventListener('click', runCheck);
  showBtn?.addEventListener('click', runReveal);
  skipBtn?.addEventListener('click', runReveal);
}

function bindFrq(frq: HTMLElement) {
  if (frq.dataset[BOUND] === '1') return;
  frq.dataset[BOUND] = '1';

  hideSolutions(frq);
  frq.dataset.practicePhase = 'idle';

  const revealBtn =
    frq.querySelector<HTMLButtonElement>('[data-frq-reveal]') ??
    frq.querySelector<HTMLButtonElement>('[data-frq-show-solution]');

  revealBtn?.addEventListener('click', () => {
    revealSolutions(frq);
    revealBtn.disabled = true;
  });
}

function renderPracticeMath(prose: HTMLElement) {
  for (const block of prose.querySelectorAll<HTMLElement>('[data-mcq], [data-frq]')) {
    renderMathInElement(block, katexOpts);
  }
}

function bindAll() {
  const prose = proseRoot();
  if (!prose) return;

  prose.querySelectorAll<HTMLElement>('[data-mcq]').forEach(bindMcq);
  prose.querySelectorAll<HTMLElement>('[data-frq]').forEach(bindFrq);
  renderPracticeMath(prose);
}

let pageLoadBound = false;

export function initDocPractice() {
  bindAll();

  if (pageLoadBound) return;
  pageLoadBound = true;
  document.addEventListener('astro:page-load', bindAll);
}
