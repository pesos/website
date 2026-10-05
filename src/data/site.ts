export const SITE = {
  name: 'PESOS',
  full: 'PESOS | PES Open Source',
  tagline: 'The Open Source Club of PES University RR Campus',
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
    href: '/about/goals/',
    base: '/about/',
    children: [
      { label: 'Goals', href: '/about/goals/' },
      { label: 'How to Join', href: '/about/how-to-join/' },
      { label: 'Perks', href: '/about/perks/' },
    ],
  },
  { label: 'Upcoming Events', href: '/events/', base: '/events/', children: [] },
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
  {
    label: 'Projects and Archive',
    href: '/showcase/archive/',
    base: '/showcase/',
    children: [
      { label: 'Archive', href: '/showcase/archive/' },
      { label: 'Projects', href: '/showcase/projects/' },
    ],
  },
  { label: 'Contact Us', href: '/contact/', base: '/contact/', children: [] },
];

export const navSection = (label: string) => {
  const sec = NAV.find((s) => s.label === label);
  // a renamed section would otherwise crash later with "reading 'children'"
  if (!sec) throw new Error(`No NAV section labelled "${label}" (labels: ${NAV.map((s) => s.label).join(', ')})`);
  return sec;
};

// real, published channels; see github.com/pesos/members-list and the
// (archived) get-started/communication-channels page on the old site
export const LINKS = {
  github: 'https://github.com/pesos',
  membersRepo: 'https://github.com/pesos/members-list',
  whatsapp: 'https://chat.whatsapp.com/EQaaQJFSkU9A3AGgKDNIr4',
  discord: 'https://discord.gg/JkzrNhtGc8',
  linkedin: "https://www.linkedin.com/company/pesososiris/",
  instagram: 'https://www.instagram.com/pes.opensource?igsh=MXhxNHJqanBtcDl2cA==',
  youtube: "https://youtube.com/@pesopensource4653?si=QhqkZDuvOSg8UpWK",
  twitter: 'https://twitter.com/pesopensource',
  facebook: "https://www.facebook.com/groups/pesosc/",
};

export const SECTIONS = [
  { n: '01', label: 'Start', title: 'Getting Started', desc: 'Learn why open source matters and how to make your first contribution.', href: '/getting-started/', cta: 'Explore' },
  { n: '02', label: 'About', title: 'About', desc: 'Our goals, how to join and member perks.', href: '/about/goals/', cta: 'Learn more' },
  { n: '03', label: 'Upcoming Events', title: 'Upcoming Events', desc: 'Hosted events, activities and talks', href: '/events/', cta: 'View events' },
  { n: '04', label: 'Blogs', title: 'Blogs and Resources', desc: 'Articles, tutorials, curated tools and repositories from our members.', href: '/blogs/', cta: 'Read more' },
  { n: '05', label: 'Contact', title: 'Contact Us', desc: 'Reach out, propose a project, or just come say hello in our community.', href: '/contact/', cta: 'Get in touch' },
  { n: '06', label: 'Showcase', title: 'Projects and Archive', desc: 'Our project archive and the open-source projects we build.', href: '/showcase/archive/', cta: 'Explore' },
];

export const FOOTER = {
  clubLinks: NAV.map((s) => ({ label: s.label, href: s.href })),
  socialLinks: [
    { label: 'Github', href: LINKS.github },
    { label: 'Discord', href: LINKS.discord },
    { label: 'Whatsapp', href: LINKS.whatsapp },
    { label: 'LinkedIn', href: LINKS.linkedin },
    { label: 'Youtube', href: LINKS.youtube },
    { label: 'Instagram', href: LINKS.instagram },
    { label: 'Twitter / X', href: LINKS.twitter },
  ],
};
