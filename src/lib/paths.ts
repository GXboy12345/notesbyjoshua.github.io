/** Normalize a route target (e.g. `/about/`) to a trailing-slash site path with base. */
function normTarget(s: string): string {
  const href = p(s);
  return href.endsWith('/') ? href : `${href}/`;
}

/** Normalize the current URL pathname (already includes base when configured). */
function normCurrent(pathname: string): string {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

/** Internal URL with Astro `base` (dev `/`, fork Pages `/notesbyjoshua.github.io/`). */
export function p(path: string): string {
  const base = import.meta.env.BASE_URL;
  if (path === '/' || path === '') return base;
  const tail = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${tail}`;
}

export function pathActive(current: string, target: string): boolean {
  const cur = normCurrent(current);
  const tgt = normTarget(target);
  const home = normTarget('/');
  if (tgt === home) return cur === home;
  return cur === tgt || cur.startsWith(tgt);
}

/** Compare two browser pathnames (both already include base when configured). */
export function pathActiveFromPathname(currentPathname: string, linkPathname: string): boolean {
  const cur = normCurrent(currentPathname);
  const link = normCurrent(linkPathname);
  const home = normCurrent(normTarget('/'));
  if (link === home) return cur === home;
  return cur === link || cur.startsWith(link);
}
