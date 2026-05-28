/** Internal URL with Astro `base` (dev `/`, fork Pages `/notesbyjoshua.github.io/`). */
export function p(path: string): string {
  const base = import.meta.env.BASE_URL;
  if (path === '/' || path === '') return base;
  const tail = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${tail}`;
}

export function pathActive(current: string, target: string): boolean {
  const norm = (s: string) => {
    const href = p(s);
    return href.endsWith('/') ? href : `${href}/`;
  };
  const cur = norm(current);
  const tgt = norm(target);
  const home = norm('/');
  if (tgt === home) return cur === home;
  return cur === tgt || cur.startsWith(tgt);
}
