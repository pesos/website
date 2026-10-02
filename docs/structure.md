# Project structure

```
pesos-web/
├── astro.config.mjs          # site URL, static output, directory-style URLs
├── tsconfig.json             # extends astro/tsconfigs/strict; "@/*" → "src/*"
├── package.json              # dev / build / preview scripts; only dependency: astro
├── public/
│   └── pesos-logo.svg        # logo + favicon, copied verbatim to dist/
└── src/
    ├── env.d.ts              # references .astro/types.d.ts (generated)
    ├── layouts/
    │   └── BaseLayout.astro
    ├── components/
    │   ├── Nav.astro
    │   ├── Footer.astro
    │   ├── Crumb.astro
    │   ├── GuideTabs.astro
    │   ├── SectionHeader.astro
    │   ├── ImgPlaceholder.astro
    │   └── HeroGlyphs.astro
    ├── pages/
    │   ├── index.astro
    │   ├── getting-started.astro
    │   ├── pesos-101.astro
    │   ├── how-to-join.astro
    │   ├── about.astro
    │   ├── blogs.astro
    │   ├── projects.astro
    │   ├── projects/[slug].astro
    │   ├── resources.astro
    │   ├── archive.astro
    │   ├── events.astro
    │   ├── perks.astro
    │   ├── contact.astro
    │   ├── code-of-conduct.astro
    │   └── 404.astro
    ├── data/
    │   ├── site.ts
    │   ├── projects.ts
    │   ├── guide.ts
    │   ├── resources.ts
    │   ├── archive.ts
    │   ├── events.ts
    │   └── perks.ts
    ├── scripts/
    │   └── main.ts
    └── styles/
        └── global.css
```

Ignored or generated (see `.gitignore`): `node_modules/`, `dist/`, `.astro/`.

## `src/pages/`: routes

The file name is the URL (`build.format: 'directory'` means every route ends in a slash).

| Route | File | Content source |
|---|---|---|
| `/` | `index.astro` | Inline `sections` + `SITE.tagline`; `HeroGlyphs` animation |
| `/getting-started/` | `getting-started.astro` | `GUIDE_SECTIONS`, `GUIDE_FILTERS`, `GUIDE_QUICK_REF` |
| `/pesos-101/` | `pesos-101.astro` | Long-form guide written directly in the page |
| `/how-to-join/` | `how-to-join.astro` | `JOIN_STEPS`, `LINKS` |
| `/about/` | `about.astro` | Inline `standards`, `activities`, `roles` |
| `/blogs/` | `blogs.astro` | Inline `featured` + `posts`, linking to markdown in `pesos/pesos.github.io` |
| `/projects/` | `projects.astro` | `PROJECTS`, `OTHER_PROJECTS`, `PROJECT_STATS`, `PROJECT_FILTERS` |
| `/projects/<slug>/` | `projects/[slug].astro` | One page per `PROJECTS` entry |
| `/resources/` | `resources.astro` | `RESOURCES`, `RESOURCE_FILTERS` |
| `/archive/` | `archive.astro` | `ARCHIVE_ENTRIES`, `ARCHIVE_STATS`, `ARCHIVE_YEARS`, … |
| `/events/` | `events.astro` | `ACTIVITIES`, `ACTIVITY_TYPES` |
| `/perks/` | `perks.astro` | `PERKS`, `PERK_CATEGORIES`, `PERK_STEPS` |
| `/contact/` | `contact.astro` | Inline `socials`, `stats`, `faqs`; Formspree form |
| `/code-of-conduct/` | `code-of-conduct.astro` | Inline `positive` / `negative` lists |
| 404 | `404.astro` | Static |

`/events/` and `/perks/` are built, but nothing in `NAV_LINKS`, `FOOTER` or any page links to them. A visitor can reach them only by typing the URL.

## `src/data/`: content

Each file exports a type and one or more arrays. Pages import from here instead of hard-coding content.

| File | Exports | Notes |
|---|---|---|
| `site.ts` | `SITE`, `NAV_LINKS`, `GUIDE_TABS`, `LINKS`, `FOOTER` | Global identity, navigation, external URLs (GitHub, Slack invite, Instagram, Twitter, Formspree) |
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
| `Nav` | none | Logo, `NAV_LINKS`, theme toggle, `$ Terminal` button (`data-terminal-toggle`), mobile drawer |
| `TerminalMode` | own `<script>` | The terminal UI, on every page. Content comes from `/terminal-content.json` (`src/lib/terminalContent.ts`). See [decisions.md](decisions.md#two-uis-one-content-source-the-terminal) |
| `Footer` | none | Tagline, `FOOTER.clubLinks`, `FOOTER.socialLinks` |
| `Crumb` | `items: {label, href?}[]` | Breadcrumb; the last item without an `href` is rendered as the current page |
| `GuideTabs` | `active: string` | Tab strip shared by the "Getting Started" pages (`GUIDE_TABS`) |
| `SectionHeader` | `num?`, `title`, `center?` | Numbered section divider |
| `ImgPlaceholder` | `label?`, `style?`, `class?` | Dashed box standing in for images that don't exist yet |
| `HeroGlyphs` | none | Animated glyph field on the home hero, with its own inline `<script>` |

**Does not belong here:** data fetching or content arrays. Components get content from props or `src/data`.

## `src/scripts/main.ts`

All shared client behavior. New interactive widgets go here as a new `init*()` function, added to `boot()`, that returns right away when its hook isn't on the page.

## `src/styles/global.css`

About 1,450 lines: tokens, reset, layout helpers (`.wrap`, `.grid-3`, `.split`, …), and component classes. It's imported once, in `BaseLayout`. Pages also use inline `style=""` attributes for one-off spacing.

## `public/`

Static files served from the site root. It currently contains only the logo.
