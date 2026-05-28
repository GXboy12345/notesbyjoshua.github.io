const DELEGATED = 'practiceDelegated';
const CHOICE = /^[A-F]$/;
const GRADER_URL =
  import.meta.env.PUBLIC_FRQ_GRADER_URL ?? 'http://127.0.0.1:8787/grade-frq';
const ANON_ID_KEY = 'notes_frq_anon_id';

type McqPhase = 'idle' | 'answered' | 'revealed';
type McqFeedback = 'correct' | 'retry' | 'exhausted';

let documentClickBound = false;

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
  if (!correct) return;

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
  const output = frq.querySelector<HTMLElement>('[data-frq-grade-output]');
  if (output) {
    output.hidden = true;
    output.textContent = '';
    output.classList.remove('is-error', 'is-loading');
  }
  const gradeBtn = frq.querySelector<HTMLButtonElement>('[data-frq-grade]');
  if (gradeBtn) gradeBtn.disabled = false;
}

function graderPagePath(): string {
  const base = import.meta.env.BASE_URL ?? '/';
  let path = location.pathname;
  if (base !== '/' && base !== '') {
    const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
    if (path.startsWith(prefix)) {
      path = path.slice(prefix.length) || '/';
    }
  }
  return path.endsWith('/') ? path : `${path}/`;
}

function getAnonUserId(): string {
  try {
    let value = localStorage.getItem(ANON_ID_KEY);
    if (!value) {
      value = `anon_${crypto.randomUUID()}`;
      localStorage.setItem(ANON_ID_KEY, value);
    }
    return value;
  } catch {
    return 'anon_ephemeral';
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return map[c] ?? c;
  });
}

type GradePart = {
  partId?: string;
  score?: number;
  maxScore?: number;
  verdict?: string;
  feedback?: string;
  missing?: string[];
  strengths?: string[];
};

type GradeResponse = {
  totalScore?: number;
  maxScore?: number;
  overallFeedback?: string;
  nextStep?: string;
  parts?: GradePart[];
  error?: string;
  retryAfter?: number;
};

function verdictClass(verdict: string | undefined): string {
  switch (verdict) {
    case 'correct':
    case 'mostly_correct':
      return 'frq-grade-part--good';
    case 'partial':
      return 'frq-grade-part--partial';
    case 'incorrect':
      return 'frq-grade-part--bad';
    default:
      return '';
  }
}

function verdictLabel(verdict: string | undefined): string {
  switch (verdict) {
    case 'correct':
      return 'Correct';
    case 'mostly_correct':
      return 'Mostly correct';
    case 'partial':
      return 'Partial credit';
    case 'incorrect':
      return 'Incorrect';
    case 'unclear':
      return 'Unclear';
    default:
      return verdict ? verdict.replace(/_/g, ' ') : '';
  }
}

function renderGrade(data: GradeResponse): string {
  const parts = Array.isArray(data.parts) ? data.parts : [];
  const total = data.totalScore ?? '—';
  const max = data.maxScore ?? '—';
  const summary = data.overallFeedback
    ? `<section class="frq-grade-summary">
<h4 class="frq-grade-summary__title">Coach summary</h4>
<p class="frq-grade-overall">${escapeHtml(data.overallFeedback)}</p>
</section>`
    : '';
  const nextStep = data.nextStep
    ? `<p class="frq-grade-next"><strong>Next step:</strong> ${escapeHtml(data.nextStep)}</p>`
    : '';
  const partsHtml = parts
    .map((p) => {
      const cls = verdictClass(p.verdict);
      const label = verdictLabel(p.verdict);
      const verdictHtml = label
        ? `<p class="frq-grade-verdict">${escapeHtml(label)}</p>`
        : '';
      const missing =
        Array.isArray(p.missing) && p.missing.length
          ? `<ul class="frq-grade-missing">${p.missing.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
          : '';
      const strengths =
        Array.isArray(p.strengths) && p.strengths.length
          ? `<ul class="frq-grade-strengths">${p.strengths.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
          : '';
      const missingBlock = missing
        ? `<div class="frq-grade-block"><strong>Still missing</strong>${missing}</div>`
        : '';
      const strengthsBlock = strengths
        ? `<div class="frq-grade-block"><strong>What you did well</strong>${strengths}</div>`
        : '';
      const feedback = String(p.feedback ?? '').trim();
      return `<section class="frq-grade-part ${cls}">
<h4 class="frq-grade-part__title">Part ${escapeHtml(String(p.partId ?? '?'))} · ${escapeHtml(String(p.score ?? '?'))}/${escapeHtml(String(p.maxScore ?? '?'))}</h4>
${verdictHtml}
<p class="frq-grade-part__feedback">${escapeHtml(feedback)}</p>
${missingBlock}
${strengthsBlock}
</section>`;
    })
    .join('');
  return `<div class="frq-grade-result__inner">
<p class="frq-grade-score"><strong>Score:</strong> ${escapeHtml(String(total))}/${escapeHtml(String(max))}</p>
${summary}
${partsHtml}
${nextStep}
</div>`;
}

async function gradeFrq(frq: HTMLElement) {
  const frqId = frq.dataset.frqId;
  const textarea = frq.querySelector<HTMLTextAreaElement>('[data-frq-answer]');
  const output = frq.querySelector<HTMLElement>('[data-frq-grade-output]');
  const gradeBtn = frq.querySelector<HTMLButtonElement>('[data-frq-grade]');

  if (!frqId || !textarea || !output) return;

  const answer = textarea.value.trim();
  if (!answer) {
    output.hidden = false;
    output.classList.add('is-error');
    output.classList.remove('is-loading');
    output.textContent = 'Write an answer before grading.';
    return;
  }

  output.hidden = false;
  output.classList.add('is-loading');
  output.classList.remove('is-error');
  output.textContent = 'Grading…';
  if (gradeBtn) gradeBtn.disabled = true;

  try {
    const res = await fetch(GRADER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        frqId,
        pagePath: frq.dataset.frqPagePath ?? graderPagePath(),
        studentAnswer: textarea.value,
        anonUserId: getAnonUserId(),
      }),
    });

    let data: GradeResponse = {};
    try {
      data = (await res.json()) as GradeResponse;
    } catch {
      data = {};
    }

    if (!res.ok) {
      output.classList.remove('is-loading');
      output.classList.add('is-error');
      output.textContent =
        typeof data.retryAfter === 'number' && data.retryAfter > 0
          ? `Grader is rate-limited. Try again in ${data.retryAfter}s.`
          : 'Grader is temporarily unavailable.';
      return;
    }

    output.classList.remove('is-loading', 'is-error');
    output.innerHTML = renderGrade(data);
  } catch {
    output.classList.remove('is-loading');
    output.classList.add('is-error');
    output.textContent = 'Could not reach the grader. Is the worker running locally?';
  } finally {
    if (gradeBtn) gradeBtn.disabled = false;
  }
}

function runMcqReveal(mcq: HTMLElement) {
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

function bindDocumentHandlers() {
  if (documentClickBound) return;
  documentClickBound = true;

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!isPracticeTarget(target)) return;

    const choice = target.closest<HTMLElement>('[data-choice]');
    if (choice) {
      const mcq = mcqRoot(choice);
      if (!mcq) return;
      if ((mcq.dataset.practicePhase as McqPhase) !== 'idle') return;
      if (choice instanceof HTMLButtonElement && choice.disabled) return;
      const value = normalizeChoice(choice.dataset.choice);
      if (!value) return;
      submitPick(mcq, value);
      return;
    }

    if (target.closest('[data-mcq-show-solution]')) {
      const mcq = mcqRoot(target);
      if (mcq) runMcqReveal(mcq);
      return;
    }

    if (target.closest('[data-frq-grade]')) {
      const frq = frqRoot(target);
      if (frq) void gradeFrq(frq);
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
}

function bindDelegatedHandlers(prose: HTMLElement) {
  if (prose.dataset[DELEGATED] === '1') return;
  prose.dataset[DELEGATED] = '1';
}

function proseRoot(): HTMLElement | null {
  return (
    document.querySelector<HTMLElement>('article.prose') ??
    document.querySelector<HTMLElement>('.doc-main .prose') ??
    document.querySelector<HTMLElement>('.doc-main article')
  );
}

function bindAll() {
  bindDocumentHandlers();

  const prose = proseRoot();
  if (!prose) return;

  bindDelegatedHandlers(prose);

  prose.querySelectorAll<HTMLElement>('[data-mcq]').forEach(prepareMcq);
  prose.querySelectorAll<HTMLElement>('[data-frq]').forEach(prepareFrq);
}

let pageLoadBound = false;

export function initDocPractice() {
  bindAll();

  if (pageLoadBound) return;
  pageLoadBound = true;
  document.addEventListener('astro:page-load', bindAll);
}
