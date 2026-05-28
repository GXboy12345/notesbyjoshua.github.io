import { referenceSheets } from '../data/reference-sheets';
import { preprocessMarkdown } from '../lib/markdown-preprocess';
import { readDocSource, renderDocHtml } from '../lib/render-doc';
import { p } from '../lib/paths';
import { docBySlug } from '../lib/resolve-doc';

export const prerender = true;

export async function GET() {
  const sheets = [];

  for (const ref of referenceSheets) {
    const entry = await docBySlug(ref.slug);
    if (!entry) {
      console.warn(`[reference-sheets] No doc for slug: ${ref.slug}`);
      continue;
    }

    const { body } = readDocSource(entry);
    const md = preprocessMarkdown(body);
    const html = renderDocHtml(md);

    sheets.push({
      prefix: ref.prefix,
      label: ref.label,
      url: p(`/${ref.slug}/`),
      html,
    });
  }

  return new Response(JSON.stringify({ sheets }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
