export const SITE = {
  name: 'PESOS',
  full: 'PESOS | PES Open Source',
  tagline: 'The Open Source Club of PES University',
  // The community re-launched itself under this nickname in Feb 2026;
  // see OSIRIS-members-list.md in github.com/pesos/members-list.
  communityName: 'OSIRIS',
  year: 2026,
  founded: 2012,
};

// The site map, mirroring the wireframe: five top-level sections, each with
// its own child pages. Nav, mobile drawer, per-section tabs and the footer
// all render from this. `base` is the URL prefix that marks a page as
// belonging to the section (used for the active state).
export type NavPage = { label: string; href: string };
export type NavSection = { label: string; href: string; base: string; children: NavPage[] };

export const NAV: NavSection[] = [
  {
    label: 'Getting Started',
    href: '/getting-started/',
    base: '/getting-started/',
    children: [
      { label: 'Main Hub', href: '/getting-started/' },
      { label: 'The Basics 101', href: '/getting-started/101/' },
      { label: 'Why our club', href: '/getting-started/why-our-club/' },
    ],
  },
  {
    label: 'About',
    href: '/about/events/',
    base: '/about/',
    children: [
      { label: 'Upcoming Events', href: '/about/events/' },
      { label: 'Goals', href: '/about/goals/' },
      { label: 'How to Join', href: '/about/how-to-join/' },
      { label: 'Perks', href: '/about/perks/' },
    ],
  },
  {
    label: 'Blogs and Resources',
    href: '/blogs/',
    base: '/blogs/',
    // blog "Details" are the posts themselves, which live on GitHub
    children: [
      { label: 'Blogs', href: '/blogs/' },
      { label: 'Resources', href: '/blogs/resources/' },
    ],
  },
  { label: 'Contact Us', href: '/contact/', base: '/contact/', children: [] },
  {
    label: 'Showcase and Engagement',
    href: '/showcase/archive/',
    base: '/showcase/',
    children: [
      { label: 'Archive', href: '/showcase/archive/' },
      { label: 'Projects', href: '/showcase/projects/' },
    ],
  },
];

export const navSection = (label: string) => NAV.find((s) => s.label === label)!;

// real, published channels; see github.com/pesos/members-list and the
// (archived) get-started/communication-channels page on the old site
export const LINKS = {
  github: 'https://github.com/pesos',
  membersRepo: 'https://github.com/pesos/members-list',
  slack:
    'https://join.slack.com/t/pes-os/shared_invite/enQtNzE3MzI2MjU5NzY2LWNjMjgwMjJkNTJlMTljNzI2MTkxZWM0MTA1NDQ4M2NiNGI0MjA3YTgzYTAzMTkwMzBmZTdmOGQwNjdlNzc5YmY',
  instagram: 'https://www.instagram.com/pes.opensource/',
  twitter: 'https://twitter.com/pesopensource',
  formspree: 'https://formspree.io/f/xnqokpre',
};

export const SECTIONS = [
  { n: '01', label: 'Start', title: 'Getting Started', desc: 'Learn why open source matters and how to make your first contribution.', href: '/getting-started/', cta: 'Explore' },
  { n: '02', label: 'About', title: 'About', desc: 'Upcoming events, our goals, how to join and member perks.', href: '/about/events/', cta: 'Learn more' },
  { n: '03', label: 'Blogs', title: 'Blogs and Resources', desc: 'Articles, tutorials, curated tools and repositories from our members.', href: '/blogs/', cta: 'Read more' },
  { n: '04', label: 'Contact', title: 'Contact Us', desc: 'Reach out, propose a project, or just come say hello in our community.', href: '/contact/', cta: 'Get in touch' },
  { n: '05', label: 'Showcase', title: 'Showcase and Engagement', desc: 'Our project archive and the open-source projects we build.', href: '/showcase/archive/', cta: 'Explore' },
];

export const FOOTER = {
  clubLinks: NAV.map((s) => ({ label: s.label, href: s.href })),
  socialLinks: [
    { label: 'GitHub', href: LINKS.github },
    { label: 'Slack', href: LINKS.slack },
    { label: 'Instagram', href: LINKS.instagram },
    { label: 'Twitter / X', href: LINKS.twitter },
  ],
};
