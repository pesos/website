// Content collections. Blog posts are plain markdown files in /blogs at the
// repo root: every `blogs/<slug>.md` becomes a post at /blogs/<slug>/ on the
// next build (or instantly under `npm run dev`). Files starting with `_`
// (like _TEMPLATE.md) are ignored.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './blogs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    // one of the filter chips on /blogs/ (any value works; new ones get a chip)
    tag: z.string().default('Community'),
    featured: z.boolean().default(false),
    // drafts show up under `npm run dev` but are left out of the built site
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
