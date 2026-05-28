/** Pre-markdown transforms for legacy Jekyll note sources. */
export function preprocessMarkdown(src: string): string {
  return normalizeMathDelimiters(
    src
      .replace(/\{\{[\s\S]*?\|\s*relative_url[\s\S]*?\}\}/g, (m) => {
        const inner = m.replace(/^\{\{\s*|\s*\}\}$/g, '').split('|')[0].trim();
        return inner.replace(/^['"\u2018\u2019\u201c\u201d`]|['"\u2018\u2019\u201c\u201d`]$/g, '').trim();
      })
      .replace(/\{%[\s\S]*?%\}/g, '')
      .replace(/^- ### \[/gm, '- ['),
  );
}

/**
 * Notes use $$…$$ for both inline and display math. KaTeX auto-render treats $$ as
 * display-only, so inline uses must become $...$ while block equations stay as $$.
 */
export function normalizeMathDelimiters(src: string): string {
  const display: string[] = [];

  const stash = (body: string) => {
    const token = `\u0000DISPLAY${display.length}\u0000`;
    display.push(body.trim());
    return token;
  };

  let out = src;

  // Multiline display blocks: $$\n … \n$$
  out = out.replace(/\$\$\s*\n+([\s\S]*?)\n+\s*\$\$/g, (_, body) =>
    stash(body.replace(/\s*\n\s*/g, ' ')),
  );

  // Single-line display: a line containing only $$ … $$
  out = out.replace(/^[ \t]*\$\$([^$\n]+?)\$\$[ \t]*$/gm, (_, body) => stash(body));

  // Remaining $$ … $$ is inline math in running text.
  out = out.replace(/\$\$([^$\n]+?)\$\$/g, (_, body) => `$${body.trim()}$`);

  out = out.replace(/\u0000DISPLAY(\d+)\u0000/g, (_, i) => `$$${display[Number(i)]}$$`);

  return out;
}
