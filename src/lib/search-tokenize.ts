export function tokenizeSearchText(input: string): string[] {
  const normalized = input
    .normalize('NFKC')
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"');

  const raw =
    normalized.match(/[\p{Letter}\p{Number}]+(?:[._/-][\p{Letter}\p{Number}]+)*/gu) ?? [];

  const expanded: string[] = [];

  for (const token of raw) {
    expanded.push(token);
    if (/[-_./]/.test(token)) {
      expanded.push(...token.split(/[-_./]+/g).filter(Boolean));
    }
  }

  return expanded;
}

export function processSearchTerm(term: string, fieldName?: string): string | null {
  const t = term
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

  if (t.length === 1 && fieldName !== 'math') return null;
  if (fieldName === 'math' && /^[a-z]$/.test(t)) return null;

  return t;
}

export function fuzzyForLandingTerm(term: string): number | null {
  const t = term.toLowerCase();
  const n = [...t].length;

  if (n < 5) return null;
  if (/^\d+(\.\d+)?$/.test(t)) return null;
  if (/^[a-z]{1,3}\d+$/i.test(t)) return null;
  if (/^[a-z]\d?[a-z]?$/i.test(t)) return null;

  if (n <= 8) return 1 / n;
  if (n <= 16) return 2 / n;
  return 2 / n;
}

export function fuzzyForHeaderTerm(term: string): number | null {
  const n = [...term].length;
  if (n < 6) return null;
  if (/^\d+(\.\d+)?$/.test(term)) return null;
  if (/^[a-z]{1,3}\d+$/i.test(term)) return null;
  if (n <= 10) return 1 / n;
  return 2 / n;
}

export function queryTerms(rawQuery: string): string[] {
  return tokenizeSearchText(rawQuery)
    .map((token) => processSearchTerm(token))
    .filter((token): token is string => Boolean(token));
}
