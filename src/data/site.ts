export const SITE = {
  name: 'PESOS',
  full: 'PESOS — PES Open Source',
  tagline: 'An Open Source initiative by the students of PES University.',
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

export const FOOTER = {
  clubLinks: [
    { label: 'Getting Started', href: '/getting-started/' },
    { label: 'About', href: '/about/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Resources', href: '/resources/' },
    { label: 'Blogs', href: '/blogs/' },
    { label: 'Code of Conduct', href: '/code-of-conduct/' },
  ],
  socialLinks: [
    { label: 'GitHub', href: LINKS.github },
    { label: 'Slack', href: LINKS.slack },
    { label: 'Instagram', href: LINKS.instagram },
    { label: 'Twitter / X', href: LINKS.twitter },
  ],
};
