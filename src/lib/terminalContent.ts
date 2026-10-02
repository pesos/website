// Build-time content manifest for the terminal UI (src/components/TerminalMode.astro).
//
// Every page of the normal website has a terminal equivalent here, built from
// the same src/data/* modules (and /blogs markdown) the pages render, so the
// two UIs can't drift. Prose that only exists in page markup is copied below
// and marked "mirrors <page>" so it's easy to find when editing the page.
//
// The terminal's tree follows the site's NAV (src/data/site.ts):
//   /getting-started  /about  /blogs (+ /blogs/resources)  /contact
//   /showcase/archive  /showcase/projects
//
// Each entry and directory carries the website `route` it stands for. The
// terminal uses it to keep the address bar in sync, and to land on the
// matching page when switching back to the normal website.
//
// Parity guard: getManifest() throws at build time if a route under
// src/pages has no terminal entry. Add a new page -> add it here.
//
// Served as /terminal-content.json by src/pages/terminal-content.json.ts.

import { SITE, LINKS, SECTIONS } from '../data/site';
import { HOME_TECH } from '../data/home';
import { PROJECTS, OTHER_PROJECTS, PROJECT_STATS, PROJECT_CRITERIA, type Project } from '../data/projects';
import { RESOURCES } from '../data/resources';
import { ARCHIVE_ENTRIES, ARCHIVE_STATS, ARCHIVE_TABS } from '../data/archive';
import { ACTIVITIES } from '../data/events';
import { PERKS, PERK_STEPS } from '../data/perks';
import { SOCIALS, CONTACT_STATS, CONTACT_SUBJECTS, FAQS } from '../data/contact';
import { getBlogEntries, formatDate, readingMinutes } from './posts';

type Entry = {
  title: string;
  type: 'home' | 'page' | 'post' | 'project' | 'list';
  date: string;
  tags: string[];
  author: string;
  body: string;
  order: number;
  route: string;
};
type Dir = { title: string; blurb: string; route: string };

// Routes that intentionally have no terminal page.
const NO_TERMINAL_PAGE = new Set(['/404', '/500', '/error', '/search.json', '/terminal-content.json']);

const md = (...blocks: (string | false | undefined)[]) =>
  blocks.filter((b) => b !== false && b !== undefined).join('\n\n');
const link = (label: string, href: string) => `[${label}](${href})`;
const bullets = (items: string[]) => items.map((i) => '- ' + i).join('\n');
const kv = (rows: { k: string; v: string }[]) =>
  rows.map((r) => `- **${r.k}**  ${r.v}`).join('\n');
const slugify = (s: string) =>
  s.toLowerCase().replace(/['’`]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const norm = (route: string) => '/' + route.replace(/^\/+|\/+$/g, '');
// the terminal's markdown renderer has no images: show them as links
const imagesAsLinks = (s: string) =>
  s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => link(`image: ${alt || 'image'}`, src));

// mirrors showcase/projects/[slug].astro
function projectBody(p: Project) {
  const stats = p.stats ?? [
    { label: 'Stars', value: 'N/A' },
    { label: 'Forks', value: 'N/A' },
    { label: 'Open Issues', value: 'N/A' },
    { label: 'Contributors', value: String(p.contributors) },
  ];
  const info = p.info ?? [
    { label: 'Language', value: p.stack[0] ?? 'N/A' },
    { label: 'Status', value: p.status },
  ];
  const install = p.install ?? ['# Clone the repository', `$ git clone ${p.repo}`];
  const related = PROJECTS.filter((x) => x.slug !== p.slug).slice(0, 2);
  return md(
    `# ${p.name}`,
    `${p.category} · ${p.status} · ${p.stack.join(' · ')}`,
    p.blurb,
    `-> ${link('Contribute', `${p.repo}/issues`)}   -> ${link('GitHub', p.repo)}`,
    stats.map((s) => `**${s.value}** ${s.label}`).join('   ·   '),
    `## About ${p.name}`,
    p.about ?? p.blurb,
    !!p.features?.length &&
      '## Features\n\n' + p.features.map((f, i) => `${i + 1}. **${f.title}**  ${f.desc}`).join('\n'),
    !!p.learningPath && '## Learning path\n\n' + bullets(p.learningPath),
    '## Quick Install\n\n```bash\n' + install.join('\n') + '\n```',
    '## Project Info\n\n' + kv(info.map((r) => ({ k: r.label, v: r.value }))),
    !!p.goodFirstIssues &&
      '## New here?\n\n' +
        bullets(p.goodFirstIssues.map((g) => `Look for issues labeled \`${g.id}\` — ${g.title}.`)) +
        '\n\n' + link('View all issues', `${p.repo}/issues`),
    '## In the repository\n\n' +
      bullets([
        link('Contribution Guide', `${p.repo}/blob/${p.branch}/CONTRIBUTING.md`),
        link('Issues', `${p.repo}/issues`),
        link('Pull Requests', `${p.repo}/pulls`),
      ]),
    '## Related Projects\n\n' + bullets(related.map((r) => `${link(r.name, `/showcase/projects/${r.slug}/`)}  ${r.blurb}`)),
    `Screenshots and a full README live on ${link('GitHub', p.repo)}.`
  );
}

let cache: ReturnType<typeof build> | null = null;
export function getManifest() {
  return (cache ??= build());
}

async function build() {
  const entries: Record<string, Entry> = {};
  const dirs: Record<string, Dir> = {};
  const page = (path: string, route: string, title: string, body: string, extra: Partial<Entry> = {}) => {
    entries[path] = { title, type: 'page', date: '', tags: [], author: '', order: Object.keys(entries).length, route, body, ...extra };
  };
  const blogEntries = await getBlogEntries();

  // Directory order here is the order `ls` shows them in. A child directory
  // comes after its parent, so it wins a route they share in siteMap.
  dirs['/getting-started'] = { title: 'Getting Started', blurb: 'Why open source matters, and how to make your first contribution.', route: '/getting-started/' };
  dirs['/about'] = { title: 'About', blurb: 'Upcoming events, our goals, how to join and member perks.', route: '/about/events/' };
  dirs['/blogs'] = { title: 'Blogs and Resources', blurb: 'Articles, tutorials and field notes from PESOS members.', route: '/blogs/' };
  dirs['/blogs/resources'] = { title: 'Resources', blurb: 'Guides, tools and repositories curated by our members.', route: '/blogs/resources/' };
  dirs['/showcase'] = { title: 'Showcase and Engagement', blurb: 'Our project archive and the open-source projects we build.', route: '/showcase/archive/' };
  dirs['/showcase/archive'] = { title: 'Archive', blurb: 'Past events, legacy projects and club history.', route: '/showcase/archive/' };
  dirs['/showcase/projects'] = { title: 'Projects', blurb: 'Open-source projects maintained by PESOS members.', route: '/showcase/projects/' };

  // --- home (mirrors index.astro) -----------------------------------------
  entries['/'] = {
    title: SITE.full, type: 'home', date: '', tags: [], author: '', order: 0, route: '/',
    body: md(
      '# Execute. Teach. Contribute.',
      SITE.tagline,
      `-> ${link('Join the club', '/about/how-to-join/')}   -> ${link('Explore the club', '/getting-started/')}`,
      HOME_TECH.map((t) => '`' + t + '`').join(' '),
      '## Club Sections',
      bullets(SECTIONS.map((s) => `${link(s.title, s.href)}  ${s.desc}`)),
      'Type `ls` to look around, `cat <name>` to read, `help` for everything.'
    ),
  };

  // --- getting-started/ ---------------------------------------------------
  // mirrors getting-started/index.astro
  const playground = OTHER_PROJECTS.find((p) => p.name === 'contributor-playground');
  page('/getting-started/why-open-source', '/getting-started/', 'Why Should I Care About Open Source?', md(
    '# Why Should I Care About Open Source?',
    'Here we address exactly why you, as a college student, would want to care about Open Source.',
    "If you're a college student wondering whether open source is worth your time, the short answer is yes. Here are five reasons why, and how to get started.",
    '## The industry runs on it',
    'Open source isn\'t a side hobby next to "real" software work. It\'s how a lot of real software gets made. GitHub\'s 2017 Open Source Survey found that among employed developers:',
    bullets([
      '**94%** use open source at least sometimes in their work',
      '**81%** use it frequently',
      '**65%** of those who contribute back do it as part of their job',
    ]),
    'NOTE: Even Microsoft, a company that once called open source its biggest enemy, now says "Microsoft ♥ Open Source".',
    'When an employer sees open-source work on your profile, they see someone who already works the way their teams do.',
    "## It's the best way to learn",
    'Coursework hands you small, tidy problems with known answers. Open source hands you real code written by real developers. Nobody has to hire you first: fork a project, start hacking, and if your fix is good it gets merged straight back into the original. Along the way you learn:',
    bullets([
      'How large, real-world codebases are organised',
      'What a good commit and pull request look like',
      "How experienced maintainers review code, because they're reviewing yours",
    ]),
    '## It builds skills beyond code',
    "Open source almost always means working with a team you've never met. That teaches you to:",
    bullets([
      'Explain your changes clearly',
      'Take criticism without taking it personally',
      'Work through disagreements',
      'Split up work and decide what matters most',
    ]),
    'In a crowded pool of developers, these are what make you stand out.',
    '## Your work actually matters',
    "Your contribution doesn't sit in a folder after it's graded. It ships, and people use it. You might fix a bug in software the world depends on, or help build the next big idea from its first commit.",
    "## You'll find your people",
    'Open source runs on something close to the African philosophy of Ubuntu:',
    '> "I am what I am because of what we all are."',
    'People from different countries and backgrounds build things together that none of them could build alone, and the friendships made along the way often last for years. Come for the prospects, stay for the community.',
    '## How to get started',
    [
      `1. **Learn the basics**  Read ${link('The Basics 101', '/getting-started/101/')} to see what open source actually means and what contributing looks like.`,
      `2. **Practice your first pull request**  Try the fork, branch, PR and merge flow on any repository like ${playground ? link(playground.name, playground.repo) : 'contributor-playground'}, or anything you find fancy on our ${link('GitHub', LINKS.github)}.`,
      "3. **Pick a real issue**  Look for issues labelled good first issue on a project you like. They're picked to be approachable for newcomers.",
      `4. **Ask for help**  Stuck? Ask on the ${link('PESOS WhatsApp', LINKS.whatsapp)} or ${link('Discord', LINKS.discord)}. Someone will point you in the right direction.`,
    ].join('\n')
  ));
  // mirrors getting-started/101.astro
  page('/getting-started/basics-101', '/getting-started/101/', 'The Basics 101', md(
    '# The Basics 101',
    "Open Source: A Beginner's Guide",
    '## 1. What does "Open Source" actually mean?',
    'When a piece of software is Open Source, it means you can see its source code. That opens the door to a lot of awesome things:',
    bullets([
      'Anyone can freely read, reuse and modify open-source software, and send their improvements back to the project.',
      'Collaboration happens at scale: a whole community of shared ideas and expertise can form around a single project.',
      'You get a real chance to work on software the world depends on, and make a real-world impact.',
      'You learn best practices straight from the community, through feedback and advice from project collaborators.',
    ]),
    "## 2. I'm sold. Now how do I actually contribute?",
    "Ahh, now that's the tricky part. Contributing to open source can be intimidating, especially for first-timers: you're often dealing with large codebases, and it's hard to know where to even start. Then the doubts creep in: am I good enough? What if I do something wrong?",
    'This is exactly what PES Open Source aims to address. We want to provide a platform where members support each other, until everyone can comfortably and confidently make a real impact through open-source collaboration.'
  ));
  // mirrors getting-started/why-our-club.astro
  page('/getting-started/why-our-club', '/getting-started/why-our-club/', 'Why our club', md(
    '# Why our club',
    'PES Open Source is a student-run Open Source community from PES University, Bangalore. We aim to create a thriving culture based around Open Source in our campus.',
    '## 1. What we do',
    bullets([
      '**Workshops.** Hands-on sessions on the open-source movement, tools and technologies, from industry guests and community members alike.',
      '**Talks and Firesides.** Presentations from prominent open-source contributors around Bangalore, giving members a glimpse into real-world programming.',
      '**Community projects.** Collaborative work on projects hosted under github.com/pesos, reviewed and selected based on community interest.',
      '**A Hacktoberfest-style PR challenge.** Members hunt for help-wanted and low-hanging-fruit issues, with a dedicated event to hit a weekly pull-request target.',
      '**General meet-ups.** Once-weekly, casual sessions for coding, lightning talks, code review, elections and planning. Our most important activity.',
    ]),
    '## 2. PESOS in numbers',
    [`**${SITE.founded}** Founded`, '**27** Public Repositories', '**30+** Members', '**3** Active Flagship Projects'].join('   ·   '),
    '## 3. Come build with us',
    `Open to every branch and every skill level.  -> ${link('How to join', '/about/how-to-join/')}`
  ));

  // --- about/ -------------------------------------------------------------
  // mirrors about/events.astro (the featured activity's block is commented
  // out on the page, so it's left out here too)
  const featuredActivity = ACTIVITIES.find((a) => a.featured) ?? ACTIVITIES[0];
  page('/about/events', '/about/events/', 'Events & Activities', md(
    '# Events & Activities',
    "We don't keep a public calendar with fixed dates; specific meet-ups, workshops and talks are announced on Slack and Discord as they're scheduled. Here's the shape of what we actually run, and how often.",
    '## Everything We Host',
    ACTIVITIES.filter((a) => a !== featuredActivity)
      .map((a) => md(`### ${a.title}`, [a.type, a.cadence].filter(Boolean).join(' · '), a.blurb)).join('\n\n'),
    `Looking for what we've already done? Browse workshops, hackathons and other past events in the ${link('archive', '/showcase/archive/')}.`
  ), { order: 0 });
  // mirrors about/goals.astro
  page('/about/goals', '/about/goals/', 'Goals', md(
    '# Goals',
    'What PES Open Source sets out to do, straight from our mission statement.',
    '## Mission Statement',
    '> "PES Open Source serves to facilitate technical skills and knowledge by fostering a community around contributing to, creating, critiquing, and advocating for Open Source Projects."',
    'In other words, we want to create a culture of open-source collaboration in our college.',
    "## 01 · What we're working towards",
    [
      '01  **Contribute to open source**  Get members making real contributions to open-source projects, from their first pull request onwards.',
      '02  **Create open source**  Build and maintain our own projects in the open under github.com/pesos.',
      '03  **Critique open source**  Review each other’s code and ideas, and learn to give and take constructive criticism.',
      '04  **Advocate for open source**  Spread the word about open source on campus and beyond.',
      '05  **Build the culture**  Make open-source collaboration a normal part of student life at PES University.',
    ].join('\n')
  ), { order: 1 });
  // mirrors about/how-to-join.astro
  const FORM_LINK = 'https://docs.google.com/forms/d/e/1FAIpQLSeNcexCvYqQkwotRZGJqjoBx8e9ca69QnJMiMBIZ4eE54taPQ/viewform';
  page('/about/how-to-join', '/about/how-to-join/', 'How to Join PESOS', md(
    '# How to Join PESOS',
    "Fill one form. We'll take it from there.",
    '## 01 · The Process',
    `### 01 · Fill the Form\n\nTell us a bit about yourself, what technologies or areas you want to explore, and any past work if you have it.\n\n-> ${link('Apply Now', FORM_LINK)}`,
    '### 02 · Review & Shortlist\n\nThe team reviews applications on a rolling basis. Shortlisted candidates will be contacted via email with next steps.',
    '### 03 · Join and Contribute\n\nSelected candidates join the team and start contributing to active projects.',
    '## What to include',
    bullets(['A short intro about you', 'Areas or technologies you want to explore', 'Past work or projects (optional)']),
    '> Open year-round · Any PES University student can apply'
  ), { order: 2 });
  // mirrors about/perks.astro
  const featuredPerk = PERKS.find((p) => p.featured);
  page('/about/perks', '/about/perks/', 'Member Perks', md(
    '# Member Perks',
    'Active members and contributors unlock a curated set of tools, server credits, developer packs and learning materials. Perks unlock dynamically based on project participation.',
    !!featuredPerk && `## Featured Perk\n\n### ${featuredPerk.title}\n\n${featuredPerk.category}\n\n${featuredPerk.blurb}`,
    '## 01 · All Perks',
    PERKS.filter((p) => !p.featured).map((p) => md(`### ${p.title}`, p.category, p.blurb)).join('\n\n'),
    '## 02 · How to claim perks',
    PERK_STEPS.map((s) => `**${s.step} · ${s.title}**  ${s.desc}`).join('\n')
  ), { order: 3 });

  // --- blogs/ (mirrors blogs/[slug].astro) — one file per post in /blogs ---
  // featured first, then newest first: the blog index's order
  const posts = [...blogEntries].sort((a, b) => Number(b.data.featured) - Number(a.data.featured));
  posts.forEach((e, i) => {
    const { title, description, author, date, tag, featured } = e.data;
    page('/blogs/' + e.id, `/blogs/${e.id}/`, title, md(
      `# ${title}`,
      [featured && 'Featured', tag, author, formatDate(date), `${readingMinutes(e.body)} min read`].filter(Boolean).join(' · '),
      `> ${description}`,
      imagesAsLinks(e.body ?? '')
    ), { type: 'post', date: formatDate(date), tags: [slugify(tag)], author: author ?? '', order: i });
  });

  // --- blogs/resources/ (mirrors blogs/resources.astro) — one file per category
  [...new Set(RESOURCES.map((r) => r.category))].forEach((cat, i) => {
    const items = RESOURCES.filter((r) => r.category === cat);
    page('/blogs/resources/' + slugify(cat), '/blogs/resources/', cat, md(
      `# ${cat}`,
      items.map((r) => md(`### ${r.title}`, r.blurb, `-> ${link('View resource', r.href)}`)).join('\n\n')
    ), { type: 'list', order: i });
  });

  // --- contact (mirrors contact.astro) ------------------------------------
  page('/contact', '/contact/', 'Get in Touch', md(
    '# Get in Touch',
    "Have a question, proposal, or just want to say hello? Fill in the form below, or reach us directly on Slack. Either way, we'll get back to you.",
    kv(CONTACT_STATS),
    '## Send a Message',
    'TIP: type `send` at the prompt to fill in the contact form right here in the terminal.',
    `Subjects: ${CONTACT_SUBJECTS.join(' · ')}`,
    '## Find Us Online',
    bullets(SOCIALS.map((s) => `${link(s.h, s.href)}  ${s.s}`)),
    '## Location',
    `📍 PES University, Bangalore. We meet on campus, twice a week during the semester. Exact day, time and room are announced on Slack: ${link('join to find out', LINKS.slack)}.`,
    '## Code of Conduct',
    'To report a Code of Conduct concern, use the form and mark it as such, or reach the Community Relations Head directly on Slack.',
    '## Frequently Asked Questions',
    FAQS.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')
  ), { order: 21 });

  // --- showcase/archive/ (mirrors showcase/archive.astro) — one file per tab
  ARCHIVE_TABS.forEach((tab, i) => {
    const items = ARCHIVE_ENTRIES.filter((e) => e.type === tab);
    page('/showcase/archive/' + slugify(tab), '/showcase/archive/', tab, md(
      `# ${tab}`,
      kv(ARCHIVE_STATS),
      items.map((e) => md(
        `### ${e.title}`,
        `${e.date} · ${e.category} · ${e.semester} ${e.year}`,
        e.blurb,
        e.href ? `-> ${link('View entry', e.href)}` : 'No link available'
      )).join('\n\n')
    ), { type: 'list', order: i });
  });

  // --- showcase/projects/ (mirrors showcase/projects/index.astro) ---------
  const featured = PROJECTS.find((p) => p.featured);
  page('/showcase/projects/README', '/showcase/projects/', 'Projects', md(
    '# Projects',
    `We at PES Open Source are building an inclusive community of hackers that make awesome projects together, all run like real-world open-source projects, out in the open under ${link('github.com/pesos', LINKS.github)}.`,
    !!featured && `## 01 · Featured Project\n\n**${featured.name}**  ${featured.category} · ${featured.status}\n\n${featured.blurb}\n\n${featured.contributors} contributors   -> ${link('View project', `/showcase/projects/${featured.slug}/`)}`,
    '## 02 · All Projects',
    'These are the projects deemed most accessible, well documented and thoroughly vetted; each has its own `#project-help` Slack channel.',
    PROJECTS.map((p) => md(`### ${p.name}`, `${p.category} · ${p.status} · ${p.stack.join(' · ')} · ${p.contributors} contributors`, p.blurb, `-> ${link('View details', `/showcase/projects/${p.slug}/`)}`)).join('\n\n'),
    PROJECT_STATS.map((s) => `**${s.num}** ${s.label}`).join('   ·   '),
    '## 03 · Other Projects To Contribute To',
    'Maintained by individual community members. Smaller in scope, no dedicated Slack channel; ask in `#projects` instead.',
    bullets(OTHER_PROJECTS.map((p) => `${link(p.name, p.repo)}  ${p.blurb}`)),
    '## Want to start your own project?',
    "Get to be the maintainer of your very own project under PES Open Source, and leverage the community to get contributions. Here's what we look for:",
    bullets(PROJECT_CRITERIA),
    `-> ${link('Pitch a project', '/contact/')}`
  ), { order: -1 });
  PROJECTS.forEach((p, i) => {
    page('/showcase/projects/' + p.slug, `/showcase/projects/${p.slug}/`, p.name, projectBody(p), { type: 'project', tags: p.stack, order: i });
  });

  // --- website route -> terminal path -------------------------------------
  // A route with exactly one file (e.g. /showcase/projects/ -> its README)
  // opens that file; a route split over several files (/blogs/resources/,
  // /showcase/archive/) opens their directory.
  const siteMap: Record<string, string> = {};
  for (const [path, d] of Object.entries(dirs)) siteMap[norm(d.route)] = path;
  const byRoute = Object.groupBy(Object.entries(entries), ([, e]) => norm(e.route));
  for (const [route, files] of Object.entries(byRoute)) {
    if (files?.length === 1) siteMap[route] = files[0][0];
  }

  // Parity guard: every website route must be reachable in the terminal.
  const routes = Object.keys(import.meta.glob('/src/pages/**/*.{astro,md,ts,js}'))
    .flatMap((f) => {
      const r = norm(f.replace(/^\/src\/pages/, '').replace(/\.(astro|md|ts|js)$/, '').replace(/\/?index$/, ''));
      if (r === '/showcase/projects/[slug]') return PROJECTS.map((p) => '/showcase/projects/' + p.slug);
      if (r === '/blogs/[slug]') return blogEntries.map((e) => '/blogs/' + e.id);
      return [r];
    })
    .filter((r) => !NO_TERMINAL_PAGE.has(r));
  const missing = routes.filter((r) => !siteMap[r]);
  if (missing.length) {
    throw new Error(
      `[terminal] website routes with no terminal page: ${missing.join(', ')}. Add them in src/lib/terminalContent.ts.`
    );
  }

  return {
    entries,
    dirs,
    siteMap,
    meta: {
      pages: Object.keys(entries).length,
      posts: blogEntries.length,
      founded: SITE.founded,
      formspree: LINKS.formspree,
      subjects: CONTACT_SUBJECTS,
      generatedAt: new Date().toISOString(),
    },
  };
}
