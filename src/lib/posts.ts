// Every blog post from /blogs as one list (featured first, then newest
// first). Used by the blog index and the site search index.
import { getCollection } from 'astro:content';

export type PostCard = {
  title: string;
  description: string;
  tag: string;
  author?: string;
  date: Date;
  dateLabel: string;
  href: string;
  featured: boolean;
  readMins: number;
};

const WORDS_PER_MIN = 220;

export const readingMinutes = (body = '') =>
  Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / WORDS_PER_MIN));

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Markdown posts from /blogs, newest first; drafts only appear in `npm run dev`. */
export async function getBlogEntries() {
  const entries = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getAllPosts(): Promise<PostCard[]> {
  const posts: PostCard[] = (await getBlogEntries()).map((e) => ({
    title: e.data.title,
    description: e.data.description,
    tag: e.data.tag,
    author: e.data.author,
    date: e.data.date,
    dateLabel: formatDate(e.data.date),
    href: `/blogs/${e.id}/`,
    featured: e.data.featured,
    readMins: readingMinutes(e.body),
  }));
  // featured posts lead, then newest first
  return posts.sort(
    (a, b) => Number(b.featured) - Number(a.featured) || b.date.valueOf() - a.date.valueOf()
  );
}
