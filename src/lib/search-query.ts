import type { SearchHit, SearchRecord } from './search-types';

function snippet(text: string, terms: string[], radius = 56): string {
  const lower = text.toLowerCase();
  let idx = -1;
  for (const term of terms) {
    const at = lower.indexOf(term);
    if (at !== -1 && (idx === -1 || at < idx)) idx = at;
  }
  if (idx === -1) return text.slice(0, radius * 2);
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + radius);
  const chunk = text.slice(start, end).trim();
  return start > 0 ? `…${chunk}` : chunk;
}

export function searchIndex(records: SearchRecord[], rawQuery: string, limit = 8): SearchHit[] {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return [];

  const terms = q.split(/\s+/).filter(Boolean);
  const hits: SearchHit[] = [];

  for (const doc of records) {
    const title = doc.title.toLowerCase();
    let score = 0;
    for (const term of terms) {
      if (title.includes(term)) score += 12;
      if (doc.text.includes(term)) score += 2;
    }
    if (score === 0) continue;
    hits.push({
      ...doc,
      score,
      excerpt: snippet(doc.excerpt, terms),
    });
  }

  hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  return hits.slice(0, limit);
}
