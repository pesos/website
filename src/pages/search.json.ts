// Build-time search index for the site search dialog (src/components/Search.astro).
// Every page in NAV, plus the items rendered on those pages, each pointing at
// the page (or external link) where it lives.
import { NAV } from '@/data/site';
import { PROJECTS, OTHER_PROJECTS } from '@/data/projects';
import { RESOURCES } from '@/data/resources';
import { ARCHIVE_ENTRIES } from '@/data/archive';
import { GUIDE_SECTIONS, JOIN_STEPS } from '@/data/guide';
import { ACTIVITIES } from '@/data/events';
import { PERKS } from '@/data/perks';
import { FEATURED_POST, POSTS, POST_REPO } from '@/data/blogs';

export type SearchEntry = { t: string; d: string; s: string; u: string; x?: 1 };

const PAGE_DESC: Record<string, string> = {
  '/getting-started/': 'Why you, as a college student, should care about open source.',
  '/getting-started/101/': "Open source, a beginner's guide: what it means and how to start contributing.",
  '/getting-started/why-our-club/': 'Who we are, what we do, and the club in numbers.',
  '/about/events/': 'Meet-ups, workshops, talks, project sessions and PR challenges.',
  '/about/goals/': 'Our mission statement and what the club works towards.',
  '/about/how-to-join/': 'Joining PESOS is a single pull request to the members list.',
  '/about/perks/': 'Tools, cloud credits and learning material for active members.',
  '/blogs/': 'Articles, tutorials and field notes from PESOS members.',
  '/blogs/resources/': 'Guides, tools and repositories curated by our members.',
  '/contact/': 'Get in touch with PES Open Source.',
  '/showcase/archive/': 'Past events, legacy projects and club history.',
  '/showcase/projects/': 'Open-source projects maintained by PESOS members.',
};

export function GET() {
  const entries: SearchEntry[] = [];

  for (const sec of NAV) {
    const pages = sec.children.length ? sec.children : [{ label: sec.label, href: sec.href }];
    for (const p of pages) {
      entries.push({ t: p.label, d: PAGE_DESC[p.href] ?? '', s: sec.label, u: p.href });
    }
  }

  for (const p of PROJECTS) {
    entries.push({ t: p.name, d: p.blurb, s: 'Projects', u: `/showcase/projects/${p.slug}/` });
  }
  for (const p of OTHER_PROJECTS) {
    entries.push({ t: p.name, d: p.blurb, s: 'Projects', u: p.repo, x: 1 });
  }
  for (const p of [FEATURED_POST, ...POSTS]) {
    const href = 'href' in p ? p.href : `${POST_REPO}/${p.file}`;
    entries.push({ t: p.title, d: p.blurb, s: 'Blogs', u: href, x: 1 });
  }
  for (const r of RESOURCES) {
    entries.push({ t: r.title, d: r.blurb, s: 'Resources', u: r.href, x: 1 });
  }
  for (const a of ARCHIVE_ENTRIES) {
    entries.push({ t: a.title, d: `${a.date} · ${a.blurb}`, s: 'Archive', u: '/showcase/archive/' });
  }
  for (const g of GUIDE_SECTIONS) {
    entries.push({ t: g.title, d: g.blurb, s: 'Getting Started', u: '/getting-started/' });
  }
  for (const a of ACTIVITIES) {
    entries.push({ t: a.title, d: a.blurb, s: 'Upcoming Events', u: '/about/events/' });
  }
  for (const j of JOIN_STEPS) {
    entries.push({ t: j.title, d: j.desc, s: 'How to Join', u: '/about/how-to-join/' });
  }
  for (const p of PERKS) {
    entries.push({ t: p.title, d: p.blurb, s: 'Perks', u: '/about/perks/' });
  }

  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json' },
  });
}
