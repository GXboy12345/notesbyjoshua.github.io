import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const fm = z.object({
  title: z.string().optional(),
  layout: z.string().optional(),
  parent: z.string().optional(),
  permalink: z.string().optional(),
  nav_order: z.coerce.number().optional(),
  has_toc: z.boolean().optional(),
});

export const collections = {
  notes: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './Notes' }),
    schema: fm,
  }),
  pages: defineCollection({
    loader: glob({
      pattern: 'how-to-use-these-notes.md',
      base: '.',
    }),
    schema: fm.extend({ nav_order: z.coerce.number().optional() }),
  }),
  siteBlog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './blog' }),
    schema: fm,
  }),
  practice: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './Practice Problems' }),
    schema: fm,
  }),
  siteResources: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './Resources' }),
    schema: fm,
  }),
  siteFeedback: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './feedback' }),
    schema: fm.extend({
      feedback_form_embed_url: z.string().optional(),
    }),
  }),
};
