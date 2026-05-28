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

function isMathLine(line: string): boolean {
  const t = line.trim();
  if (!t) return true;
  if (t.includes('<div') || t.includes('markdown=')) return false;
  if (/\*\*[A-Za-z]/.test(t)) return false;
  if (/^#{1,6}\s/.test(t)) return false;
  // Prose sentence with no TeX commands.
  if (/\\/.test(t)) return true;
  if (/\$/.test(t)) return true;
  if (/[=<>^_^{}\\]/.test(t)) return true;
  return !/\b(the|and|because|Find|Suppose|Example|Proof|must|considered)\b/i.test(t);
}

function isMathBlockBody(lines: string[]): boolean {
  const nonEmpty = lines.filter((line) => line.trim());
  if (nonEmpty.length === 0) return false;
  return nonEmpty.every(isMathLine);
}

/** Closing display-math line: `$$` optionally followed by punctuation only. */
function parseDisplayMathClose(line: string): { closes: boolean; suffix: string } {
  const trimmed = line.trim();
  if (trimmed === '$$') return { closes: true, suffix: '' };
  const match = /^(\$\$)([\s,;:.\-—–]*)$/.exec(trimmed);
  if (match) return { closes: true, suffix: match[2] ?? '' };
  return { closes: false, suffix: '' };
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

  // Line-delimited display blocks only: a $$ line, math body, closing $$ line.
  // Avoids pairing a closing $$ with the next opening $$ across prose/theorem-box HTML.
  const lines = src.split('\n');
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    if (lines[i].trim() === '$$') {
      const bodyLines: string[] = [];
      let j = i + 1;
      let suffix = '';
      while (j < lines.length) {
        const close = parseDisplayMathClose(lines[j]);
        if (close.closes) {
          suffix = close.suffix;
          break;
        }
        bodyLines.push(lines[j]);
        j++;
      }
      if (j < lines.length && isMathBlockBody(bodyLines)) {
        const body = bodyLines.join('\n').replace(/\s*\n\s*/g, ' ').trim();
        out.push(stash(body));
        if (suffix) out.push(suffix);
        i = j + 1;
        continue;
      }
    }
    out.push(lines[i]);
    i++;
  }

  let normalized = out.join('\n');

  // Single-line display: a line containing only $$ … $$ with optional trailing punctuation.
  normalized = normalized.replace(
    /^[ \t]*\$\$([^$\n]+?)\$\$([\s,;:.\-—–]*)[ \t]*$/gm,
    (_, body, suffix) => `${stash(body)}${suffix ?? ''}`,
  );

  // Remaining $$ … $$ is inline math in running text.
  normalized = normalized.replace(/\$\$([^$\n]+?)\$\$/g, (_, body) => `$${body.trim()}$`);

  normalized = normalized.replace(/\u0000DISPLAY(\d+)\u0000/g, (_, idx) => `$$${display[Number(idx)]}$$`);

  return normalized;
}
