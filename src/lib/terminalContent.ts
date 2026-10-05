// Build-time content manifest for the terminal UI (src/components/TerminalMode.astro).
//
// The terminal shows the website's own pages: every page under src/pages is
// rendered with Astro's container API, and the HTML inside its <main> is
// converted to markdown. Whatever a page says, wherever its text is written
// (src/data, the page's frontmatter or its markup), the terminal says too,
// with nothing to keep in sync by hand.
//
// Website-only widgets (filter chips, search boxes, image placeholders, …)
// are dropped by SKIP below. To hide anything else from the terminal, give
// it a `data-terminal-skip` attribute.
//
// File tree: a page's route is its path (/about/goals/ -> /about/goals). A
// route other pages live under becomes that directory's README
// (/showcase/projects/ -> /showcase/projects/README). Directory names and
// blurbs come from NAV and SECTIONS in src/data/site.ts.
//
// Served as /terminal-content.json by src/pages/terminal-content.json.ts.

import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import TurndownService from 'turndown';
import { SITE, NAV, SECTIONS } from '../data/site';
import { PROJECTS } from '../data/projects';
import { getAllPosts } from './posts';

type Entry = {
  title: string;
  type: 'home' | 'page' | 'post' | 'project';
  date: string;
  tags: string[];
  author: string;
  body: string;
  order: number;
  route: string;
};
type Dir = { title: string; blurb: string; route: string };
type PageModule = {
  default: any;
  getStaticPaths?: () => Promise<{ params: Record<string, string>; props?: Record<string, unknown> }[]> | any[];
};

// Per-page things to leave out of the terminal, by route.
const PAGE_SKIP: Record<string, string> = {
  // the home page's "Club Sections" cards: `ls` lists the same sections
  '/': 'section.section',
};

// Routes that intentionally have no terminal page.
const NO_TERMINAL_PAGE = new Set(['/404', '/500', '/error']);

// Website-only UI that means nothing as text.
const SKIP = [
  '[data-terminal-skip]', '[aria-hidden="true"]', '[hidden]',
  'script', 'style', 'svg', 'hr', 'input', 'select', 'textarea', 'label',
  'button.chip', 'button.tab', '.accordion__icon',
  '.crumb', 'nav.tabs', '.search', '.img-ph', '.doc__nav', '.doc__bar', '.brand__mark',
  '.sec-head__line', '.social-row__ico', '.post__pager', '.doc__pager',
].join(',');

const norm = (route: string) => '/' + route.replace(/^\/+|\/+$/g, '');
const is = (node: Node, selector: string) => node.nodeType === 1 && (node as HTMLElement).matches(selector);
const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim();

function makeTurndown(extraSkip = '') {
  const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
  // the terminal renders text as-is, so markdown escapes would show up as backslashes
  td.escape = (s: string) => s;
  // Rules added later are checked first, so the most specific ones (and
  // SKIP, last of all) come at the bottom.

  // the terminal has no images: show them as links
  td.addRule('img', {
    filter: 'img',
    replacement: (_c, node) => {
      const src = (node as HTMLElement).getAttribute('src');
      return src ? `[image: ${(node as HTMLElement).getAttribute('alt') || 'image'}](${src})` : '';
    },
  });
  // code blocks keep their language (Shiki) and their line breaks
  // (a <pre> of one <div> per line, like the projects' Quick Install)
  td.addRule('pre', {
    filter: 'pre',
    replacement: (_c, node) => {
      const el = node as HTMLElement;
      const lang = el.getAttribute('data-language') ?? '';
      const divs = Array.from(el.childNodes).filter((n) => n.nodeName === 'DIV');
      const code = divs.length ? divs.map((d) => d.textContent).join('\n') : (el.textContent ?? '').replace(/\n$/, '');
      return '\n\n```' + (lang === 'plaintext' ? '' : lang) + '\n' + code + '\n```\n\n';
    },
  });
  // a <br> inside a heading ("Execute.<br>Teach.") -> a space
  td.addRule('heading', {
    filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    replacement: (content, node) =>
      `\n\n${'#'.repeat(Number(node.nodeName[1]))} ${oneLine(content)}\n\n`,
  });
  // section dividers (<SectionHeader>) -> headings
  td.addRule('sectionHeader', {
    filter: (node) => is(node, '.sec-head'),
    replacement: (content) => `\n\n## ${oneLine(content).replace(/^(\d+) /, '$1 · ')}\n\n`,
  });
  // a stat tile or row ("374" over "Stars") -> one line
  td.addRule('stat', {
    filter: (node) => is(node, '.stat-card, .stat-box__row'),
    replacement: (content) => `- ${oneLine(content)}\n`,
  });
  // a numbered step ("1", title, description) -> one line
  td.addRule('step', {
    filter: (node) => is(node, '.step'),
    replacement: (content) => {
      const [n, title, ...rest] = content.trim().split(/\n+/).map(oneLine).filter(Boolean);
      return /^\d+$/.test(n ?? '') ? `${n}. **${title.replace(/^#+\s*/, '')}**  ${rest.join(' ')}\n` : `\n\n${content.trim()}\n\n`;
    },
  });
  // a small section label ("Find Us Online") -> bold, on its own line
  td.addRule('eyebrow', {
    filter: (node) => is(node, '.eyebrow') && !(node as HTMLElement).closest('a'),
    replacement: (content) => `\n\n**${oneLine(content)}**\n\n`,
  });
  // accordion question (FAQ) -> heading
  td.addRule('accordion', {
    filter: (node) => is(node, '.accordion__btn'),
    replacement: (content) => `\n\n### ${oneLine(content)}\n\n`,
  });
  // a whole card that is one link -> the card's text, then the link. A
  // trailing "Explore →" line becomes the link's label.
  td.addRule('cardLink', {
    filter: (node) => node.nodeName === 'A' && !!(node as HTMLElement).querySelector('div, p, h2, h3, br'),
    replacement: (content, node) => {
      const href = (node as HTMLElement).getAttribute('href');
      const lines = content.trim().split('\n');
      const cta = lines.at(-1)?.match(/^(.+?)\s*→$/)?.[1];
      const text = (cta ? lines.slice(0, -1) : lines).join('\n').trim();
      return `\n\n${text}\n\n` + (href ? `-> [${cta ?? 'open'}](${href})\n\n` : '');
    },
  });
  // the contact form -> point at the terminal's own `send` command
  td.addRule('form', {
    filter: 'form',
    replacement: () => '\n\nTIP: type `send` at the prompt to fill in the contact form right here in the terminal.\n\n',
  });
  // a filter bar (year/semester selects, chips, "9 entries shown"): only
  // the website can filter, so drop it unless it holds real content
  td.addRule('filterBar', {
    filter: (node) =>
      node.nodeName === 'DIV' &&
      !!(node as HTMLElement).querySelector('select, [data-filter], [data-filter-count]') &&
      !(node as HTMLElement).querySelector('p, h1, h2, h3, article'),
    replacement: () => '',
  });
  const skip = extraSkip ? SKIP + ',' + extraSkip : SKIP;
  td.addRule('skip', { filter: (node) => is(node, skip), replacement: () => '' });
  return td;
}

function htmlToMarkdown(td: TurndownService, html: string) {
  const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1] ?? '';
  // a space between adjacent tags, so <span>Go</span><span>CLI</span> reads
  // "Go CLI" (not inside <pre>, where it would change the code)
  const spaced = main
    .split(/(<pre[\s\S]*?<\/pre>)/)
    .map((part) => (part.startsWith('<pre') ? part : part.replace(/>\s*</g, '> <')))
    .join('');
  return td
    .turndown(spaced)
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// "/blogs/[slug].astro" -> "/blogs/[slug]"; "/about/index.astro" -> "/about"
const fileRoute = (file: string) =>
  norm(file.replace(/^\/src\/pages/, '').replace(/\.astro$/, '').replace(/\/?index$/, ''));

let cache: ReturnType<typeof build> | null = null;
export function getManifest() {
  // under `npm run dev`, rebuild on every request so page edits show up
  if (import.meta.env.DEV) return build();
  return (cache ??= build());
}

async function build() {
  const container = await AstroContainer.create();
  const td = makeTurndown();
  const modules = import.meta.glob<PageModule>('/src/pages/**/*.astro', { eager: true });
  const posts = await getAllPosts();

  // ls order: NAV order, then posts as the blog index lists them, then
  // projects as the projects page lists them
  const rank = new Map<string, number>();
  NAV.flatMap((s) => (s.children.length ? s.children : [s])).forEach((p, i) => rank.set(norm(p.href), i));
  posts.forEach((p, i) => rank.set(norm(p.href), 100 + i));
  PROJECTS.forEach((p, i) => rank.set(`/showcase/projects/${p.slug}`, 200 + i));

  // --- render every page ----------------------------------------------------
  const pages: { route: string; title: string; body: string }[] = [];
  // the contact form, read off the rendered contact page: where it posts and
  // its subject options (the terminal's `send` asks the same things)
  let form: { action?: string; subjects: string[] } = { subjects: [] };
  for (const [file, mod] of Object.entries(modules)) {
    const pattern = fileRoute(file);
    if (NO_TERMINAL_PAGE.has(pattern)) continue;
    const variants = mod.getStaticPaths
      ? (await mod.getStaticPaths()).map((v: any) => ({
          route: pattern.replace(/\[(\w+)\]/g, (_: string, k: string) => v.params[k]),
          params: v.params,
          props: v.props ?? {},
        }))
      : [{ route: pattern, params: {}, props: {} }];
    for (const v of variants) {
      const html = await container.renderToString(mod.default, {
        params: v.params,
        props: v.props,
        request: new Request(new URL(v.route === '/' ? '/' : v.route + '/', 'http://localhost')),
      });
      const title = (html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '')
        .replace(/&amp;/g, '&')
        .replace(` · ${SITE.name}`, '');
      const pageTd = PAGE_SKIP[v.route] ? makeTurndown(PAGE_SKIP[v.route]) : td;
      pages.push({ route: v.route, title, body: htmlToMarkdown(pageTd, html) });
      const formTag = html.match(/<form\b[^>]*>[\s\S]*?<select[^>]*name="subject"[\s\S]*?<\/select>/);
      if (formTag) {
        form = {
          action: formTag[0].match(/^<form\b[^>]*\baction="([^"]+)"/)?.[1],
          subjects: [...formTag[0].matchAll(/<option(?: value="([^"]*)")?[^>]*>([^<]*)<\/option>/g)]
            .filter(([, value]) => value !== '')
            .map(([, , text]) => text.trim()),
        };
      }
    }
  }

  // --- route -> terminal path -----------------------------------------------
  const routes = new Set(pages.map((p) => p.route));
  const isParent = (r: string) => r !== '/' && [...routes].some((o) => o.startsWith(r + '/'));
  const pathFor = (r: string) => (isParent(r) ? r + '/README' : r);

  const entries: Record<string, Entry> = {};
  const postMeta = new Map(posts.map((p) => [norm(p.href), p]));
  for (const p of pages) {
    const post = postMeta.get(p.route);
    const project = PROJECTS.find((x) => p.route === `/showcase/projects/${x.slug}`);
    entries[pathFor(p.route)] = {
      title: p.route === '/' ? SITE.full : p.title,
      type: p.route === '/' ? 'home' : post ? 'post' : project ? 'project' : 'page',
      date: post?.dateLabel ?? '',
      tags: post ? [post.tag.toLowerCase()] : project?.stack ?? [],
      author: post?.author ?? '',
      body: p.body,
      order: isParent(p.route) ? -1 : rank.get(p.route) ?? 900,
      route: p.route === '/' ? '/' : p.route + '/',
    };
  }

  // --- directories --------------------------------------------------------
  // Declaration order is the order `ls` shows them in. NAV sections first,
  // then any other directory (e.g. /showcase/projects), which opens its
  // README's route.
  const dirs: Record<string, Dir> = {};
  for (const s of NAV) {
    if (!s.children.length) continue;
    const blurb = SECTIONS.find((x) => x.href === s.href)?.desc ?? '';
    dirs[norm(s.base)] = { title: s.label, blurb, route: s.href };
  }
  for (const r of routes) {
    if (!isParent(r) || dirs[r]) continue;
    const readme = entries[r + '/README'];
    dirs[r] = { title: readme.title, blurb: '', route: readme.route };
  }

  // A route with exactly one file opens that file; otherwise its directory.
  const siteMap: Record<string, string> = {};
  for (const [path, d] of Object.entries(dirs)) siteMap[norm(d.route)] = path;
  for (const [path, e] of Object.entries(entries)) siteMap[norm(e.route)] = path;

  return {
    entries,
    dirs,
    siteMap,
    meta: {
      pages: Object.keys(entries).length,
      posts: posts.length,
      founded: SITE.founded,
      formspree: form.action,
      subjects: form.subjects,
      generatedAt: new Date().toISOString(),
    },
  };
}
