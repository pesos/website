// One list of every blog post (featured first, then newest first): the markdown posts in /blogs
// (rendered on this site at /blogs/<slug>/) plus the older posts that still
// live on GitHub (src/data/blogs.ts, shown with an external-link arrow).
// Used by the blog index and the site search index.
import { getCollection } from 'astro:content';
import { FEATURED_POST, POSTS, POST_REPO } from '@/data/blogs';

export type PostCard = {
  title: string;
  description: string;
  tag: string;
  author?: string;
  date: Date;
  /** what to print: full date for markdown posts, "Mon YYYY" for legacy ones */
  dateLabel: string;
  href: string;
  external: boolean;
  featured: boolean;
  readMins?: number;
};

const WORDS_PER_MIN = 220;

export const readingMinutes = (body = '') =>
  Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / WORDS_PER_MIN));

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Markdown posts from /blogs; drafts only appear in `npm run dev`. */
export async function getBlogEntries() {
  const entries = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getAllPosts(): Promise<PostCard[]> {
  const local: PostCard[] = (await getBlogEntries()).map((e) => ({
    title: e.data.title,
    description: e.data.description,
    tag: e.data.tag,
    author: e.data.author,
    date: e.data.date,
    dateLabel: formatDate(e.data.date),
    href: `/blogs/${e.id}/`,
    external: false,
    featured: e.data.featured,
    readMins: readingMinutes(e.body),
  }));

  // legacy posts only carry "Mon YYYY"; pin them to the 1st of that month
  const legacy: PostCard[] = [
    { ...FEATURED_POST, featured: true },
    ...POSTS.map((p) => ({ ...p, href: `${POST_REPO}/${p.file}`, featured: false })),
  ].map((p) => ({
    title: p.title,
    description: p.blurb,
    tag: p.tag,
    author: 'author' in p ? p.author : undefined,
    date: new Date(`1 ${p.meta} UTC`),
    dateLabel: p.meta,
    href: p.href,
    external: true,
    featured: p.featured,
  }));

  // featured posts lead, then newest first
  return [...local, ...legacy].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || b.date.valueOf() - a.date.valueOf()
  );
}
