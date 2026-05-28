import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const base = process.env.ASTRO_BASE ?? '/';
const site =
  process.env.ASTRO_SITE ??
  (base === '/'
    ? 'https://notesbyjoshua.github.io'
    : 'https://gxboy12345.github.io/notesbyjoshua.github.io');

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
});
