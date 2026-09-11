// Curated links carried over from the old PES Open Source resources page.
export type Resource = {
  title: string;
  category: 'Guides' | 'Tools' | 'Repositories';
  blurb: string;
  href: string;
};

export const RESOURCES: Resource[] = [
  {
    title: 'GitHub Open Source Guide',
    category: 'Guides',
    blurb: 'GitHub’s own guide to understanding, using and contributing to open source.',
    href: 'https://opensource.guide',
  },
  {
    title: "DigitalOcean's Introduction to Open Source",
    category: 'Guides',
    blurb: 'A tutorial series covering the fundamentals of open-source software and communities.',
    href: 'https://www.digitalocean.com/community/tutorial_series/an-introduction-to-open-source',
  },
  {
    title: 'First Contributions',
    category: 'Guides',
    blurb: 'A hands-on repo that walks you through making your literal first pull request.',
    href: 'https://github.com/firstcontributions/first-contributions',
  },
  {
    title: "Hello World of GitHub",
    category: 'Guides',
    blurb: 'GitHub’s own beginner walkthrough — branches, commits, and your first pull request.',
    href: 'https://guides.github.com/activities/hello-world/',
  },
  {
    title: 'Up For Grabs',
    category: 'Tools',
    blurb: 'A curated list of projects with beginner-friendly, help-wanted issues.',
    href: 'https://up-for-grabs.net/#/',
  },
  {
    title: 'CodeTriage',
    category: 'Tools',
    blurb: 'Get open-source issues from your favorite repos delivered straight to your inbox.',
    href: 'https://www.codetriage.com/',
  },
  {
    title: 'IssueHub',
    category: 'Tools',
    blurb: 'Search across GitHub for issues that match your skills and interests.',
    href: 'http://issuehub.io/',
  },
  {
    title: 'Learn how to write a proper Git commit message',
    category: 'Tools',
    blurb: 'The classic, widely-cited guide to writing commits maintainers actually want to read.',
    href: 'https://chris.beams.io/posts/git-commit/',
  },
  {
    title: 'tldr-pages',
    category: 'Repositories',
    blurb: 'Simplified, community-driven man pages for the Linux CLI — a great first-PR repo.',
    href: 'https://github.com/tldr-pages/tldr',
  },
  {
    title: 'nand2tetris',
    category: 'Repositories',
    blurb: 'Build a modern computer from first principles — from NAND gates up to a working OS.',
    href: 'http://www.nand2tetris.org/',
  },
  {
    title: 'Hacktoberfest',
    category: 'Repositories',
    blurb: 'DigitalOcean’s month-long celebration of open source — a great time to make your first PRs.',
    href: 'https://hacktoberfest.digitalocean.com/',
  },
  {
    title: 'Google Summer of Code',
    category: 'Repositories',
    blurb: 'A stipended program pairing students with open-source orgs over the (northern) summer.',
    href: 'https://summerofcode.withgoogle.com/',
  },
];

export const RESOURCE_FILTERS = ['All', 'Guides', 'Tools', 'Repositories'];
