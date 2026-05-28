const slugCounts = new Map<string, number>();

export function resetSlugCounts() {
  slugCounts.clear();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function assignHeadingSlug(text: string): string {
  const base = slugify(text) || 'section';
  const seen = slugCounts.get(base) ?? 0;
  slugCounts.set(base, seen + 1);
  return seen === 0 ? base : `${base}-${seen + 1}`;
}
