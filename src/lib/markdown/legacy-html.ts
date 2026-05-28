/** Convert legacy Jekyll HTML patterns to markdown directives before parse. */
export function convertLegacyHtmlToDirectives(src: string): string {
  let out = convertTheoremBoxes(src);
  out = convertNoteImages(out);
  return out;
}

function convertTheoremBoxes(src: string): string {
  const openRe = /<div\s+class="theorem-box"\s+markdown="1"\s*>\s*/gi;
  let result = '';
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = openRe.exec(src)) !== null) {
    result += src.slice(last, m.index);
    const start = m.index + m[0].length;
    const closeIdx = findClosingDiv(src, start);
    if (closeIdx === -1) {
      result += src.slice(m.index);
      return result;
    }

    const inner = src.slice(start, closeIdx).trim();
    const { directive, body } = classifyTheoremBody(inner);
    result += `:::${directive}\n${body}\n:::\n\n`;
    last = closeIdx + 6;
    openRe.lastIndex = last;
  }

  result += src.slice(last);
  return result;
}

function findClosingDiv(src: string, from: number): number {
  const close = src.indexOf('</div>', from);
  return close === -1 ? -1 : close;
}

function classifyTheoremBody(inner: string): { directive: string; body: string } {
  const lines = inner.split('\n');
  let i = 0;
  while (i < lines.length && !lines[i].trim()) i += 1;
  if (i >= lines.length) return { directive: 'theorem', body: inner };

  const first = lines[i].trim();
  const ex = /^\*\*Example\.?\*\*\s*(.*)$/i.exec(first);
  if (ex) {
    const rest = ex[1] ? `${ex[1]}\n` : '';
    const body = rest + lines.slice(i + 1).join('\n').trim();
    return { directive: 'example', body: body.trim() };
  }

  const th = /^\*\*Theorem\.?\*\*\s*(.*)$/i.exec(first);
  if (th) {
    const rest = th[1] ? `${th[1]}\n` : '';
    const body = rest + lines.slice(i + 1).join('\n').trim();
    return { directive: 'theorem', body: body.trim() };
  }

  return { directive: 'theorem', body: inner };
}

function convertNoteImages(src: string): string {
  return src.replace(
    /<img\s+class="note-img\s+note-img--w(\d+)"\s+src="\{\{\s*'([^']+)'\s*\|\s*relative_url\s*\}\}"\s+alt="([^"]*)"\s*[^>]*\/?>/gi,
    (_, width, path, alt) => `:::figure{width=${width}}\n![${alt}](${path.trim()})\n:::\n\n`,
  );
}
