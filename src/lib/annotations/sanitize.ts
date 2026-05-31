export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function sanitizeComment(raw: string): string {
  return raw.trim().slice(0, 4096);
}

export function normalizePlainText(input: string): string {
  return input.normalize('NFKC').replace(/\s+/g, ' ').trim();
}
