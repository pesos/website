// Ported from the old site's get-started/whats-in-it-for-me page.
export type GuideSection = {
  title: string;
  category: 'Industry' | 'Learning' | 'Soft Skills' | 'Satisfaction' | 'Community';
  filter: 'Why PESOS' | 'Career' | 'Learning' | 'Community';
  blurb: string;
  read: string;
  level: string;
  reason: string;
};

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    title: 'Because The Industry Cares About Open Source',
    category: 'Industry',
    filter: 'Career',
    blurb:
      'All the big players use open source — even Microsoft, once its "biggest enemy," now says "Microsoft ❤️ Open Source." If you want a job in this industry, experience in open source is highly valued.',
    read: '5 min read',
    level: 'Beginner',
    reason: 'Core reason #1',
  },
  {
    title: 'Because It Is The Best Way To Learn',
    category: 'Learning',
    filter: 'Learning',
    blurb:
      'Open source circumvents the meritocracy of formal software jobs — anyone can fork the code and start hacking. You get your hands on real code by real developers, and your fixes can be merged straight back into the original project.',
    read: '7 min read',
    level: 'All levels',
    reason: 'Core reason #2',
  },
  {
    title: 'Because It Improves Your Soft Skills',
    category: 'Soft Skills',
    filter: 'Career',
    blurb:
      'Open source almost always means collaborating in teams — resolving conflicts, organizing work and prioritizing tasks. Skills like these make you stand out in a saturated pool of developers.',
    read: '4 min read',
    level: 'Intermediate',
    reason: 'Core reason #3',
  },
  {
    title: 'Because Open Source Is Immensely Satisfying',
    category: 'Satisfaction',
    filter: 'Why PESOS',
    blurb:
      'You get a say in the world’s biggest software, or work on the next big idea. Your contributions have a real impact — and you make valuable friends and connections along the way.',
    read: '4 min read',
    level: 'All levels',
    reason: 'Core reason #4',
  },
  {
    title: 'Come For The Prospects, Stay For The Community',
    category: 'Community',
    filter: 'Community',
    blurb:
      'Open source embodies the African philosophy of Ubuntu: "I am what I am because of what we all are." Lifelong communities form here — cultural and geographical barriers crossed in service of building something better, together.',
    read: '5 min read',
    level: 'All levels',
    reason: 'Core reason #5',
  },
];

export const GUIDE_FILTERS = ['All', 'Why PESOS', 'Career', 'Learning', 'Community'];

export const GUIDE_QUICK_REF = [
  { n: '01', t: 'Industry Cares', d: '94% of devs use OSS at work — GitHub, 2017' },
  { n: '02', t: 'Best Way To Learn', d: 'Real code, real feedback' },
  { n: '03', t: 'Soft Skills', d: 'Teamwork, conflict resolution, planning' },
  { n: '04', t: 'Satisfaction', d: 'Ship things people actually use' },
  { n: '05', t: 'Community', d: 'Ubuntu: "I am because we are"' },
];

// Ported from the old site's get-started/join page + the current
// github.com/pesos/members-list README (as of the Feb 2026 "OSIRIS" revamp).
export const JOIN_STEPS = [
  {
    n: '01',
    tag: 'GitHub',
    title: 'Create a GitHub Account',
    desc: "Sign up for a free GitHub account if you don't already have one.",
    meta: ['~2 min', 'Free forever', 'github.com/signup'],
  },
  {
    n: '02',
    tag: 'Fork',
    title: 'Fork the Members Repo',
    desc: 'Go to the members-list repository and click Fork in the top right corner.',
    meta: ['~1 min', 'One click', 'github.com/pesos/members-list'],
  },
  {
    n: '03',
    tag: 'Edit',
    title: 'Add Your Name & Bio',
    desc: 'In your fork, open OSIRIS-members-list.md and add your name, SRN, GitHub profile and a short, genuine bio.',
    meta: ['~3 min', 'Any text editor', 'OSIRIS-members-list.md'],
  },
  {
    n: '04',
    tag: 'Pull Request',
    title: 'Open a Pull Request',
    desc: 'In your forked repository, click New Pull Request, select your fork, add a title and description, then Create Pull Request.',
    meta: ['~2 min', 'GitHub UI', 'Pull Requests tab'],
  },
  {
    n: '05',
    tag: 'Slack + Discord',
    title: 'Join Slack and Discord',
    desc: 'VERY IMPORTANT: join both our Slack and Discord after your PR is merged. Set Slack notifications to "All new messages" so you don\'t miss updates.',
    meta: ['~2 min', 'Required step', 'Slack workspace'],
  },
];
