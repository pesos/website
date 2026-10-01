# Project structure

```
pesos-web/
├── astro.config.mjs          # site URL, static output, redirects, code highlighting
├── blogs/                    # blog posts as markdown, one file per post (_TEMPLATE.md is never published)
├── tsconfig.json             # extends astro/tsconfigs/strict; "@/*" → "src/*"
├── package.json              # dev / build / preview scripts; only dependency: astro
├── public/
│   └── pesos-logo.svg        # favicon, copied verbatim to dist/
└── src/
    ├── env.d.ts              # references .astro/types.d.ts (generated)
    ├── content.config.ts     # the `blog` collection: loads /blogs/*.md and validates front matter
    ├── lib/
    │   └── posts.ts          # merged, sorted post list for the blog index and search
    ├── layouts/
    │   └── BaseLayout.astro
    ├── components/
    │   ├── Nav.astro
    │   ├── Footer.astro
    │   ├── Search.astro
    │   ├── SectionTabs.astro
    │   ├── GuideDoc.astro
    │   ├── DocSection.astro
    │   ├── ErrorPage.astro
    │   ├── Crumb.astro
    │   ├── SectionHeader.astro
    │   ├── ImgPlaceholder.astro
    │   ├── HeroGlyphs.astro
    │   └── Wordmark.astro
    ├── pages/
    │   ├── index.astro
    │   ├── getting-started/
    │   │   ├── index.astro          # Main Hub
    │   │   ├── 101.astro
    │   │   └── why-our-club.astro
    │   ├── about/
    │   │   ├── events.astro
    │   │   ├── goals.astro
    │   │   ├── how-to-join.astro
    │   │   └── perks.astro
    │   ├── blogs/
    │   │   ├── index.astro
    │   │   ├── [slug].astro         # one page per markdown post
    │   │   └── resources.astro
    │   ├── contact.astro
    │   ├── showcase/
    │   │   ├── archive.astro
    │   │   └── projects/
    │   │       ├── index.astro
    │   │       └── [slug].astro
    │   ├── search.json.ts           # build-time search index
    │   ├── error.astro              # /error/?code=NNN
    │   ├── 404.astro
    │   └── 500.astro
    ├── data/
    │   ├── site.ts
    │   ├── projects.ts
    │   ├── guide.ts
    │   ├── resources.ts
    │   ├── archive.ts
    │   ├── events.ts
    │   ├── perks.ts
    │   ├── blogs.ts
    │   └── errors.ts
    ├── scripts/
    │   └── main.ts
    └── styles/
        └── global.css
```

Ignored or generated (see `.gitignore`): `node_modules/`, `dist/`, `.astro/`.

## `src/pages/`: routes

The file name is the URL (`build.format: 'directory'` means every route ends in a slash). The URL tree follows the site wireframe: five sections, each with its own child pages, defined once in `NAV` (`src/data/site.ts`).

| Section | Route | File | Content source |
|---|---|---|---|
| Home | `/` | `index.astro` | `SECTIONS`, `SITE.tagline`; `HeroGlyphs` animation |
| Getting Started | `/getting-started/` | `getting-started/index.astro` | Main Hub: `GUIDE_SECTIONS` |
| | `/getting-started/101/` | `getting-started/101.astro` | Long-form guide written in the page |
| | `/getting-started/why-our-club/` | `getting-started/why-our-club.astro` | Inline `activities`, stats |
| About | `/about/events/` | `about/events.astro` | `ACTIVITIES`, `ACTIVITY_TYPES` |
| | `/about/goals/` | `about/goals.astro` | Mission statement + inline `goals` |
| | `/about/how-to-join/` | `about/how-to-join.astro` | `JOIN_STEPS`, `LINKS` |
| | `/about/perks/` | `about/perks.astro` | `PERKS`, `PERK_CATEGORIES`, `PERK_STEPS` |
| Blogs and Resources | `/blogs/` | `blogs/index.astro` | `getAllPosts()`: markdown posts from `/blogs` plus legacy GitHub-hosted posts |
| | `/blogs/<slug>/` | `blogs/[slug].astro` | One page per `/blogs/<slug>.md`, styled by `.prose` |
| | `/blogs/resources/` | `blogs/resources.astro` | `RESOURCES`, `RESOURCE_FILTERS` |
| Contact Us | `/contact/` | `contact.astro` | Inline `socials`, `stats`, `faqs`; Formspree form |
| Showcase and Engagement | `/showcase/archive/` | `showcase/archive.astro` | `ARCHIVE_ENTRIES`, `ARCHIVE_STATS`, … |
| | `/showcase/projects/` | `showcase/projects/index.astro` | `PROJECTS`, `OTHER_PROJECTS`, `PROJECT_STATS`, `PROJECT_FILTERS` |
| | `/showcase/projects/<slug>/` | `showcase/projects/[slug].astro` | One page per `PROJECTS` entry |
| (search) | `/search.json` | `search.json.ts` | Index of every `NAV` page plus projects, posts, resources, archive, guide, events, join steps, perks |
| (errors) | 404 / 500 / `/error/?code=NNN` | `404.astro`, `500.astro`, `error.astro` | `ERRORS` via `ErrorPage` |

`/about/` and `/showcase/` have no page of their own; `astro.config.mjs` redirects them to the section's first child. The same `redirects` block keeps the old flat URLs (`/pesos-101/`, `/how-to-join/`, `/events/`, `/perks/`, `/resources/`, `/archive/`, `/projects/…`) working.

Pages in one section don't link to pages in another section. Getting Started pages all use `GuideDoc` (sidebar navigation); the other sections' pages use `SectionTabs`. Both list only their own section's pages.

## `src/data/`: content

Each file exports a type and one or more arrays. Pages import from here instead of hard-coding content.

| File | Exports | Notes |
|---|---|---|
| `site.ts` | `SITE`, `NAV`, `navSection`, `LINKS`, `SECTIONS`, `FOOTER` | Global identity, the site map (`NAV`), external URLs (GitHub, Slack invite, Instagram, Twitter, Formspree) |
| `blogs.ts` | `POSTS`, `FEATURED_POST`, `POST_REPO` | Legacy posts still hosted in `pesos/pesos.github.io`; delete each one once it's migrated to `/blogs` |
| `errors.ts` | `ERRORS` | Title and message per HTTP status code |
| `projects.ts` | `Project`, `PROJECTS`, `OTHER_PROJECTS`, `PROJECT_STATS`, `PROJECT_FILTERS` | `PROJECTS` drives both the listing and `getStaticPaths()` |
| `guide.ts` | `GUIDE_SECTIONS`, `GUIDE_FILTERS`, `GUIDE_QUICK_REF`, `JOIN_STEPS` | Ported from the old site's get-started pages |
| `resources.ts` | `RESOURCES`, `RESOURCE_FILTERS` | External links |
| `archive.ts` | `ARCHIVE_ENTRIES`, `ARCHIVE_STATS`, `ARCHIVE_YEARS`, `ARCHIVE_SEMESTERS`, `ARCHIVE_TABS` | `ARCHIVE_STATS[0]` is computed from `ARCHIVE_ENTRIES.length` |
| `events.ts` | `ACTIVITIES`, `ACTIVITY_TYPES` | Recurring activities, not dated events |
| `perks.ts` | `PERKS`, `PERK_CATEGORIES`, `PERK_STEPS` | |

**Does not belong here:** markup, CSS classes, or anything that runs in the browser.

## `src/components/`

| Component | Props | Purpose |
|---|---|---|
| `Nav` | none | `Wordmark`, `NAV` sections with hover/focus dropdowns, search button, theme toggle, placeholder `>_ Terminal` button, mobile drawer grouped by section |
| `Search` | none | Site search dialog: nav button, Ctrl/Cmd+K or `/`; fetches `/search.json` on first open |
| `SectionTabs` | `section: string` | Tab strip of one `NAV` section's child pages, current page highlighted |
| `GuideDoc` | `title`, `subtitle?` | Layout for every Getting Started page: sticky sidebar of the section's pages, breadcrumb, title, accent bar, prev/next buttons (all from `NAV`) |
| `DocSection` | `n`, `title` | One numbered section inside a `GuideDoc` page |
| `ErrorPage` | `code`, `dynamic?` | Error code, title, message and a search box; `dynamic` reads `?code=` at runtime |
| `Footer` | none | `Wordmark`, tagline, `FOOTER.clubLinks`, `FOOTER.socialLinks` |
| `Crumb` | `items: {label, href?}[]` | Breadcrumb; the last item without an `href` is rendered as the current page |
| `SectionHeader` | `num?`, `title`, `center?` | Numbered section divider |
| `ImgPlaceholder` | `label?`, `style?`, `class?` | Dashed box standing in for images that don't exist yet |
| `Wordmark` | none | Text logo "PESOS": green `PES`/`S`, `O` in `--text` (white on dark) |
| `HeroGlyphs` | none | Animated glyph field on the home hero, with its own inline `<script>` |

**Does not belong here:** data fetching or content arrays. Components get content from props or `src/data`.

## `src/scripts/main.ts`

All shared client behavior. New interactive widgets go here as a new `init*()` function, added to `boot()`, that returns right away when its hook isn't on the page.

## `src/styles/global.css`

About 1,450 lines: tokens, reset, layout helpers (`.wrap`, `.grid-3`, `.split`, …), and component classes. It's imported once, in `BaseLayout`. Pages also use inline `style=""` attributes for one-off spacing.

## `public/`

Static files served from the site root. It currently contains only `pesos-logo.svg`, which is used as the favicon.
