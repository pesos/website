// Real posts from the PES Open Source community blog. Sources link to the
// markdown in github.com/pesos/pesos.github.io while the site itself is
// being rebuilt.
export const BLOG_REPO = 'https://github.com/pesos/pesos.github.io/blob/master/_posts';

export type Post = {
  tag: string;
  title: string;
  blurb: string;
  author?: string;
  meta: string;
  file: string;
};

export const FEATURED_POST: Post = {
  tag: 'Deep Dive',
  title: '0.1 + 0.2 is not 0.3 (and other ways to make money disappear)',
  blurb:
    'A tour of floating-point arithmetic — why it breaks intuition, and the practical ways it can quietly cost you money in production.',
  author: 'Atharva Raykar',
  meta: 'Jul 2020',
  file: '2020-07-22-01-plus-02-is-not-03.md',
};

export const POSTS: Post[] = [
  { tag: 'Tutorial', title: 'Terminal tips from PES Open Source', blurb: 'Short tricks for long commands — history search, reusing previous commands and more.', author: 'Aditi', meta: 'Sep 2019', file: '2019-09-08-terminal-tips.md' },
  { tag: 'Recap', title: 'Summary: Git Workshop, 16th October', blurb: 'A brief reference for PESOS’s first workshop — getting started with version control effectively.', meta: 'Oct 2019', file: '2019-10-27-git-workshop.md' },
  { tag: 'Guide', title: 'Living in the Terminal', blurb: 'A curated list of terminal applications — editors, file browsers and more — for getting comfortable off the GUI.', author: 'Anirudh H M', meta: 'Apr 2020', file: '2020-04-28-living-in-the-terminal.md' },
  { tag: 'Deep Dive', title: 'Delving into Docker', blurb: 'What Docker is, why containers matter, and how to start using them in your own projects.', author: 'Bhargav SNV and Aditi Ahuja', meta: 'Jul 2020', file: '2020-07-07-delving-into-docker.md' },
  { tag: 'Deep Dive', title: 'Building Android Kernels', blurb: 'What an Android kernel actually is, and how custom ROMs really affect performance and battery life.', author: 'Niranjan Bhaskar K', meta: 'Jul 2020', file: '2020-07-10-building-android-kernels.md' },
  { tag: 'Guide', title: 'What in the world is ricing!?', blurb: 'A history of "ricing" and a practical guide to customizing your Linux desktop.', author: 'Pranav Kesavarapu', meta: 'Jul 2020', file: '2020-07-14-what-is-ricing.md' },
  { tag: 'Guide', title: 'How Linux made me a better developer', blurb: 'A personal account of switching to Linux, and the developer instincts it forced into being.', author: 'Anirudh H M', meta: 'Aug 2020', file: '2020-08-03-how-linux-made-me-a-better-developer.md' },
  { tag: 'Community', title: 'This Blog Belongs to You!', blurb: 'An open call for community blog submissions — got something worth sharing? Propose a post.', meta: 'Jul 2019', file: '2019-07-01-welcome.md' },
  { tag: 'Community', title: 'PES Open Source is Recruiting!', blurb: 'PESOS opens up its leadership roles to the next batch — the first phase of a new selection process.', author: 'Atharva Raykar', meta: 'Nov 2020', file: '2020-11-01-recruitments-2020.md' },
];

export const BLOG_TAGS = ['All', 'Tutorial', 'Deep Dive', 'Recap', 'Guide', 'Community'];
