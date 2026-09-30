export const SITE = {
  name: 'PESOS',
  full: 'PESOS — PES Open Source',
  tagline: 'The Open Source Club of PES University',
  // The community re-launched itself under this nickname in Feb 2026 —
  // see OSIRIS-members-list.md in github.com/pesos/members-list.
  communityName: 'OSIRIS',
  year: 2026,
  founded: 2012,
};

export const NAV_LINKS = [
  { label: 'Getting Started', href: '/getting-started/' },
  { label: 'About', href: '/about/' },
  { label: 'Blogs', href: '/blogs/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'Archive', href: '/archive/' },
  { label: 'Contact', href: '/contact/' },
];

export const GUIDE_TABS = [
  { label: 'Why Open Source', href: '/getting-started/' },
  { label: 'Open Source 101', href: '/pesos-101/' },
  { label: 'About PESOS', href: '/about/' },
  { label: 'How to Join', href: '/how-to-join/' },
  { label: 'PESOS Projects', href: '/projects/' },
];

// real, published channels — see github.com/pesos/members-list and the
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
  { n: '02', label: 'About', title: 'About Us', desc: 'Who we are, what we build, and how the club is run by students, for students.', href: '/about/', cta: 'Learn more' },
  { n: '06', label: 'Blogs', title: 'Blogs & Resources', desc: 'Articles, tutorials, curated tools and repositories from our members.', href: '/blogs/', cta: 'Read more' },
  { n: '08', label: 'Showcase', title: 'Projects', desc: 'CLI tools, systems programs, libraries and more', href: '/projects/', cta: 'View projects' },
  { n: '07', label: 'Contact', title: 'Contact', desc: 'Reach out, propose a project, or just come say hello in our community.', href: '/contact/', cta: 'Get in touch' },
];

export const FOOTER = {
  clubLinks: [
    { label: 'Getting Started', href: '/getting-started/' },
    { label: 'About', href: '/about/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Resources', href: '/resources/' },
    { label: 'Blogs', href: '/blogs/' },
  ],
  socialLinks: [
    { label: 'GitHub', href: LINKS.github },
    { label: 'Slack', href: LINKS.slack },
    { label: 'Instagram', href: LINKS.instagram },
    { label: 'Twitter / X', href: LINKS.twitter },
  ],
};
