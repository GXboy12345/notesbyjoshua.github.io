import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { visit } from 'unist-util-visit';

function remarkJekyllUrls() {
  const rx = /\{\{\s*'([^']+)'\s*\|\s*relative_url\s*\}\}/g;
  const strip = (s) => s.replace(rx, (_, p) => p);
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'link' && typeof node.url === 'string') node.url = strip(node.url);
      if (node.type === 'text' && typeof node.value === 'string') node.value = strip(node.value);
    });
  };
}

export default defineConfig({
  site: 'https://notesbyjoshua.github.io',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkMath, remarkJekyllUrls],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [sitemap()],
});
