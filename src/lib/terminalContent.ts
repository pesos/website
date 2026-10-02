// Build-time content manifest for the terminal UI (src/components/TerminalMode.astro).
//
// Every page of the normal website has a terminal equivalent here, built from
// the same src/data/* modules the pages render, so the two UIs can't drift.
// A few lead paragraphs and prose blocks only exist in page markup; those are
// copied below and marked "mirrors <page>" so they're easy to find when
// editing the page.
//
// Each entry and directory carries the website `route` it stands for. The
// terminal uses it to keep the address bar in sync, and to land on the
// matching page when switching back to the normal website.
//
// Parity guard: getManifest() throws at build time if a route under
// src/pages has no terminal entry. Add a new page -> add it here.
//
// Served as /terminal-content.json by src/pages/terminal-content.json.ts.

import { SITE, LINKS } from '../data/site';
import { HOME_SECTIONS, HOME_TECH } from '../data/home';
import { GUIDE_SECTIONS, GUIDE_QUICK_REF, JOIN_STEPS } from '../data/guide';
import { STANDARDS, MISSION_ACTIVITIES, ROLES, ABOUT_STATS } from '../data/about';
import { BLOG_REPO, FEATURED_POST, POSTS, type Post } from '../data/blog';
import { PROJECTS, OTHER_PROJECTS, PROJECT_STATS, PROJECT_CRITERIA, type Project } from '../data/projects';
import { RESOURCES } from '../data/resources';
import { ARCHIVE_ENTRIES, ARCHIVE_STATS, ARCHIVE_TABS } from '../data/archive';
import { ACTIVITIES } from '../data/events';
import { PERKS, PERK_STEPS } from '../data/perks';
import { SOCIALS, CONTACT_STATS, CONTACT_SUBJECTS, FAQS } from '../data/contact';

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
const NO_TERMINAL_PAGE = new Set(['/404', '/terminal-content.json']);

const md = (...blocks: (string | false | undefined)[]) =>
  blocks.filter((b) => b !== false && b !== undefined).join('\n\n');
const link = (label: string, href: string) => `[${label}](${href})`;
const bullets = (items: string[]) => items.map((i) => '- ' + i).join('\n');
const kv = (rows: { k: string; v: string }[]) =>
  rows.map((r) => `- **${r.k}**  ${r.v}`).join('\n');
const slugify = (s: string) =>
  s.toLowerCase().replace(/['’`]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const postSlug = (p: Post) => p.file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
const norm = (route: string) => '/' + route.replace(/^\/+|\/+$/g, '');

function projectBody(p: Project) {
  const stats = p.stats ?? [
    { label: 'Stars', value: '—' },
    { label: 'Forks', value: '—' },
    { label: 'Open Issues', value: '—' },
    { label: 'Contributors', value: String(p.contributors) },
  ];
  const info = p.info ?? [
    { label: 'Language', value: p.stack[0] ?? '—' },
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
    '## Related Projects\n\n' + bullets(related.map((r) => `${link(r.name, `/projects/${r.slug}/`)}  ${r.blurb}`)),
    `Screenshots and a full README live on ${link('GitHub', p.repo)}.`
  );
}

let cache: ReturnType<typeof build> | null = null;
export function getManifest() {
  return (cache ??= build());
}

function build() {
  const entries: Record<string, Entry> = {};
  const dirs: Record<string, Dir> = {};
  const page = (path: string, route: string, title: string, body: string, extra: Partial<Entry> = {}) => {
    entries[path] = { title, type: 'page', date: '', tags: [], author: '', order: Object.keys(entries).length, route, body, ...extra };
  };
  // Directory order here is the order `ls` shows them in.
  dirs['/getting-started'] = { title: 'Getting Started', blurb: 'New here? Why open source matters, the basics, and how to join.', route: '/getting-started/' };
  dirs['/projects'] = { title: 'Projects', blurb: 'Real open-source tools built by PESOS members, out in the open.', route: '/projects/' };
  dirs['/blog'] = { title: 'Blogs & Resources', blurb: 'Articles, tutorials and field notes written by PESOS members over the years.', route: '/blogs/' };
  dirs['/resources'] = { title: 'Resources', blurb: 'Guides, tools and open-source repositories curated by our members.', route: '/resources/' };
  dirs['/archive'] = { title: 'Archive', blurb: 'A permanent record of past events, completed projects and club history.', route: '/archive/' };
  dirs['/community'] = { title: 'Community', blurb: 'What we run, and what members get.', route: '/events/' };

  // --- home (mirrors index.astro) -----------------------------------------
  entries['/'] = {
    title: SITE.full, type: 'home', date: '', tags: [], author: '', order: 0, route: '/',
    body: md(
      '# Build in the open with PESOS',
      `${SITE.tagline} We build, contribute to and support software that solves real problems — and we teach you how to do the same.`,
      `-> ${link('Join the club', '/how-to-join/')}   -> ${link('Explore the club', '/getting-started/')}`,
      '## Club Sections',
      bullets(HOME_SECTIONS.map((s) => `${link(s.title, s.href)}  ${s.desc}`)),
      HOME_TECH.map((t) => '`' + t + '`').join(' '),
      '## Want to start your own project?',
      'Have an idea for a compiler, a tool, or a developer utility? PESOS provides infrastructure, guidance, and peer contributors to help launch your initiative.',
      `-> ${link('Propose a project', '/contact/')}`,
      'Type `ls` to look around, `cat <name>` to read, `help` for everything.'
    ),
  };

  // --- getting-started/ ---------------------------------------------------
  // mirrors getting-started.astro
  page('/getting-started/why-open-source', '/getting-started/', 'Why Should I Care About Open Source?', md(
    '# Why Should I Care About Open Source?',
    'Here we address exactly why you, as a college student, would want to care about Open Source.',
    '## 01 · Because The Industry Cares',
    'KEY INSIGHT: **94% of employed developers use open source at work**',
    '> "Virtually all (94%) of those who are employed use open source at least sometimes in their professional work (81% use it frequently), and 65% of those who contribute back do so as part of their work duties." — GitHub Open Source Survey, 2017',
    bullets([
      'Even Microsoft — once open source\'s "biggest enemy" — now says "Microsoft ❤️ Open Source"',
      'The transparency of open development is now often the default way software gets made',
      'Industry-wide · All disciplines',
    ]),
    'Beginner Friendly · 5 min read',
    `-> ${link('Read more', '/pesos-101/')}   -> ${link('Get started', '/how-to-join/')}`,
    '## 02 · All Guide Sections',
    GUIDE_SECTIONS.map((s) => md(`### ${s.title}`, `${s.category} · ${s.filter} · ${s.read} · ${s.level} · ${s.reason}`, s.blurb)).join('\n\n'),
    '## 03 · Quick Reference',
    GUIDE_QUICK_REF.map((q) => `${q.n}  **${q.t}**  ${q.d}`).join('\n'),
    '## 04 · Related Reading',
    `Looking for more context? Browse our curated list of articles, talks, and resources on open source contribution: ${link('View resources', '/resources/')}`
  ));
  // mirrors pesos-101.astro
  page('/getting-started/pesos-101', '/pesos-101/', 'PESOS 101', md(
    '# PESOS 101',
    "Open Source — A Beginner's Guide",
    '## 1. What does "Open Source" actually mean?',
    'When a piece of software is Open Source, it means you can see its source code. That opens the door to a lot of awesome things:',
    bullets([
      'Anyone can freely read, reuse and modify open-source software — and send their improvements back to the project.',
      'Collaboration happens at scale: a whole community of shared ideas and expertise can form around a single project.',
      'You get a real chance to work on software the world depends on, and make a real-world impact.',
      'You learn best practices straight from the community, through feedback and advice from project collaborators.',
    ]),
    "## 2. I'm sold. Now how do I actually contribute?",
    "Ahh, now that's the tricky part. Contributing to open source can be intimidating, especially for first-timers — you're often dealing with large codebases, and it's hard to know where to even start. Then the doubts creep in: am I good enough? What if I do something wrong?",
    'This is exactly what PES Open Source aims to address. We want to provide a platform where members support each other, until everyone can comfortably and confidently make a real impact through open-source collaboration.',
    `NOTE: Still not sure *why* you should bother with open source in the first place? ${link('Read "Why Should I Care About Open Source?"', '/getting-started/')}`,
    `-> ${link('Why Our Club', '/about/')}`
  ));
  // mirrors how-to-join.astro
  page('/getting-started/how-to-join', '/how-to-join/', 'How to Join PESOS', md(
    '# How to Join PESOS',
    'Joining is easy — all you have to do is add your name to our members list in the organisation repository via a Pull Request.',
    '## 01 · The Join Process',
    'Fork our members repository, add a little about yourself, and open a Pull Request. A maintainer will review and merge it — and you\'re in!',
    bullets(['5 simple steps · ~10 minutes', 'Requires a free GitHub account', 'Join Slack & Discord after — very important!']),
    `Beginner Friendly · Open to all skill levels   -> ${link('View repo', LINKS.membersRepo)}`,
    '## 02 · Step-by-Step Guide',
    JOIN_STEPS.map((s) => md(`### ${s.n} · ${s.title}`, `${s.tag} · ${s.meta.join(' · ')}`, s.desc, `-> ${link('View step', s.href)}`)).join('\n\n'),
    '## 03 · After You Join',
    '> For those of you new to Open Source — congrats! You just made your very first Open Source contribution by opening that Pull Request.',
    `WARNING: **Very Important: Join Slack & Discord.** Set Slack notifications to "All new messages" — do not skip this or you will miss important updates. ${link('Join Slack', LINKS.slack)}`,
    `**Having trouble joining?** If you have any difficulties, reach out and we'll get back to you as soon as possible. ${link('Contact us', '/contact/')}`
  ));

  // --- projects/ (mirrors projects.astro + projects/[slug].astro) ---------
  const featured = PROJECTS.find((p) => p.featured);
  page('/projects/README', '/projects/', 'Projects', md(
    '# Projects',
    `We at PES Open Source are building an inclusive community of hackers that make awesome projects together — all run like real-world open-source projects, out in the open under ${link('github.com/pesos', LINKS.github)}.`,
    !!featured && `## 01 · Featured Project\n\n**${featured.name}**  ${featured.category} · ${featured.status}\n\n${featured.blurb}\n\n${featured.contributors} contributors   -> ${link('View project', `/projects/${featured.slug}/`)}`,
    '## 02 · All Projects',
    'These are the projects deemed most accessible, well documented and thoroughly vetted — each has its own `#project-help` Slack channel.',
    PROJECTS.map((p) => md(`### ${p.name}`, `${p.category} · ${p.status} · ${p.stack.join(' · ')} · ${p.contributors} contributors`, p.blurb, `-> ${link('View details', `/projects/${p.slug}/`)}`)).join('\n\n'),
    PROJECT_STATS.map((s) => `**${s.num}** ${s.label}`).join('   ·   '),
    '## 03 · Other Projects To Contribute To',
    'Maintained by individual community members. Smaller in scope, no dedicated Slack channel — ask in `#projects` instead.',
    bullets(OTHER_PROJECTS.map((p) => `${link(p.name, p.repo)}  ${p.blurb}`)),
    '## Want to start your own project?',
    "Get to be the maintainer of your very own project under PES Open Source, and leverage the community to get contributions. Here's what we look for:",
    bullets(PROJECT_CRITERIA),
    `-> ${link('Pitch a project', '/contact/')}`
  ), { order: -1 });
  PROJECTS.forEach((p, i) => {
    page('/projects/' + p.slug, `/projects/${p.slug}/`, p.name, projectBody(p), { type: 'project', tags: p.stack, order: i });
  });

  // --- blog/ (mirrors blogs.astro) ----------------------------------------
  [FEATURED_POST, ...POSTS].forEach((p, i) => {
    page('/blog/' + postSlug(p), '/blogs/', p.title, md(
      `# ${p.title}`,
      (i === 0 ? 'Featured · ' : '') + [p.tag, p.author, p.meta].filter(Boolean).join(' · '),
      p.blurb,
      `-> ${link('Read the full post', `${BLOG_REPO}/${p.file}`)}`
    ), { type: 'post', date: p.meta, tags: [slugify(p.tag)], author: p.author ?? '', order: i });
  });

  // --- resources/ (mirrors resources.astro) — one file per category -------
  [...new Set(RESOURCES.map((r) => r.category))].forEach((cat, i) => {
    const items = RESOURCES.filter((r) => r.category === cat);
    page('/resources/' + slugify(cat), '/resources/', cat, md(
      `# ${cat}`,
      items.map((r) => md(`### ${r.title}`, r.blurb, `-> ${link('View resource', r.href)}`)).join('\n\n')
    ), { type: 'list', order: i });
  });

  // --- archive/ (mirrors archive.astro) — one file per tab ----------------
  ARCHIVE_TABS.forEach((tab, i) => {
    const items = ARCHIVE_ENTRIES.filter((e) => e.type === tab);
    page('/archive/' + slugify(tab), '/archive/', tab, md(
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

  // --- community/ (mirrors events.astro, perks.astro) ---------------------
  const featuredActivity = ACTIVITIES.find((a) => a.featured);
  page('/community/events', '/events/', 'Events & Activities', md(
    '# Events & Activities',
    "We don't keep a public calendar with fixed dates — specific meet-ups, workshops and talks are announced on Slack and Discord as they're scheduled. Here's the shape of what we actually run, and how often.",
    `-> ${link("See what's next on Slack", LINKS.slack)}`,
    !!featuredActivity && `## 01 · Our Most Regular Activity\n\n### ${featuredActivity.title}\n\n${featuredActivity.type} · ${featuredActivity.cadence}\n\n${featuredActivity.blurb}\n\n-> ${link('How to join in', '/how-to-join/')}`,
    '## 02 · Everything Else We Run',
    ACTIVITIES.filter((a) => !a.featured).map((a) => md(`### ${a.title}`, `${a.type} · ${a.cadence}`, a.blurb)).join('\n\n'),
    `Looking for what we've already done? Browse workshops, hackathons and other past events in the ${link('archive', '/archive/')}.`
  ), { order: 0 });
  const featuredPerk = PERKS.find((p) => p.featured);
  page('/community/perks', '/perks/', 'Member Perks', md(
    '# Member Perks',
    'Active members and contributors unlock a curated set of tools, server credits, developer packs and learning materials. Perks unlock dynamically based on project participation.',
    !!featuredPerk && `## Featured Perk\n\n### ${featuredPerk.title}\n\n${featuredPerk.category}\n\n${featuredPerk.blurb}`,
    '## 01 · All Perks',
    PERKS.filter((p) => !p.featured).map((p) => md(`### ${p.title}`, p.category, p.blurb)).join('\n\n'),
    '## 02 · How to claim perks',
    PERK_STEPS.map((s) => `**${s.step} · ${s.title}**  ${s.desc}`).join('\n')
  ), { order: 1 });

  // --- about (mirrors about.astro) ----------------------------------------
  page('/about', '/about/', 'About PESOS', md(
    '# About PESOS',
    `PES Open Source is a student-run Open Source community from PES University, Bangalore. We aim to create a thriving culture based around Open Source in our campus. Since Feb 2026, our community goes by the nickname **${SITE.communityName}**.`,
    '## Mission Statement',
    '> "PES Open Source serves to facilitate technical skills and knowledge by fostering a community around contributing to, creating, critiquing, and advocating for Open Source Projects." In other words — we want to create a culture of open-source collaboration in our college.',
    bullets(MISSION_ACTIVITIES.map((a) => `**${a.t}.** ${a.d}`)),
    ABOUT_STATS.map((s) => `**${s.num}** ${s.label}`).join('   ·   '),
    '## 01 · Our Standards',
    `From our ${link('Code of Conduct', '/code-of-conduct/')} — the driving principle behind every meet-up, PR review and Slack thread.`,
    STANDARDS.map((s) => `${s.n}  **${s.t}**  ${s.d}`).join('\n'),
    "## 02 · How we're organised",
    'The Core Committee is elected by the community every year by instant-runoff vote. No committee member serves indefinitely.',
    ROLES.map((r) => `### ${r.r}\n\n${r.d}`).join('\n\n'),
    `## Come build with us\n\nOpen to every branch and every skill level.  -> ${link('Join PESOS', '/how-to-join/')}`
  ), { order: 20 });

  // --- contact (mirrors contact.astro) ------------------------------------
  page('/contact', '/contact/', 'Get in Touch', md(
    '# Get in Touch',
    "Have a question, proposal, or just want to say hello? Fill in the form below, or reach us directly on Slack — either way, we'll get back to you.",
    kv(CONTACT_STATS),
    '## Send a Message',
    'TIP: type `send` at the prompt to fill in the contact form right here in the terminal.',
    `Subjects: ${CONTACT_SUBJECTS.join(' · ')}`,
    'Your details are used solely to respond to your message and are never shared with third parties.',
    '## Find Us Online',
    bullets(SOCIALS.map((s) => `${link(s.h, s.href)}  ${s.s}`)),
    '## Location',
    `📍 PES University, Bangalore. We meet on campus, twice a week during the semester. Exact day, time and room are announced on Slack — ${link('join to find out', LINKS.slack)}.`,
    '## Code of Conduct',
    `To report a Code of Conduct concern, use the form and mark it as such, or reach the Community Relations Head directly on Slack. Read the full ${link('Code of Conduct', '/code-of-conduct/')}.`,
    '## Frequently Asked Questions',
    FAQS.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')
  ), { order: 21 });

  // --- website route -> terminal path -------------------------------------
  // A route with exactly one file (e.g. /projects/ -> projects/README) opens
  // that file; a route split over several files (/blogs/, /archive/, …)
  // opens their directory.
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
      return r === '/projects/[slug]' ? PROJECTS.map((p) => '/projects/' + p.slug) : [r];
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
      posts: POSTS.length + 1,
      founded: SITE.founded,
      formspree: LINKS.formspree,
      subjects: CONTACT_SUBJECTS,
      generatedAt: new Date().toISOString(),
    },
  };
}
