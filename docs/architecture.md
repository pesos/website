# Architecture

## Overview

PESOS Web is a **fully static, multi-page site** built with Astro. Nothing runs on a server at request time. `astro build` writes plain HTML, one CSS bundle and one JS bundle to `dist/`, and any static host can serve that folder.

```
src/data/*.ts ──► src/pages/*.astro ──► BaseLayout.astro ──► dist/<route>/index.html
   (content)        (templates)          (shell + script)        (build output)
                                              │
                                              └─► src/scripts/main.ts (bundled, runs in browser)
```

`astro.config.mjs`:

```js
site: 'https://pesos.example.org',   // canonical base URL (placeholder domain)
output: 'static',
build: { format: 'directory' },      // /about/ → dist/about/index.html
```

## Components and responsibilities

| Layer | Files | Responsibility |
|---|---|---|
| Content | `src/data/*.ts` | Typed arrays and constants (`PROJECTS`, `ARCHIVE_ENTRIES`, `RESOURCES`, `GUIDE_SECTIONS`, `JOIN_STEPS`, `ACTIVITIES`, `PERKS`, `NAV`, `LINKS`, …). The only place real content should change. |
| Pages | `src/pages/*.astro` | Import data, map it to markup, add `data-*` hooks for client behavior. Some small page-local arrays (for example `activities` in `getting-started/why-our-club.astro`, `goals` in `about/goals.astro`, `faqs` in `contact.astro`) live in the page frontmatter. |
| Layout | `src/layouts/BaseLayout.astro` | `<head>`, `<title>` (`"{title} · PESOS"`, or `SITE.full` when no title is given), meta description, the inline theme bootstrap, decorative background layers, `Nav`, `Footer`, the `Search` dialog, and the `main.ts` import. |
| Components | `src/components/*.astro` | Presentational pieces with no client state. `HeroGlyphs` is the one exception: it ships its own `<script>`. |
| Behavior | `src/scripts/main.ts` | A single module that runs on every page. Each `init*()` function queries for its hook and returns right away when the hook is absent. |
| Styling | `src/styles/global.css` | Design tokens on `:root` (dark), overrides on `:root[data-theme='light']`, and every component's CSS. |

## Request / render flow

1. **Build time**: Astro runs each page's frontmatter, then renders it with `BaseLayout`. `showcase/projects/[slug].astro` exports `getStaticPaths()`, which returns one path per item in `PROJECTS`. Each project page gets its entry as `props.p`, and optional fields fall back to defaults (`stats`, `info`, `install`).
2. **First paint**: an `is:inline` script in `<head>` reads `localStorage.theme` and sets `data-theme` on `<html>` before the body renders, so the page never flashes the wrong theme.
3. **Hydration-free enhancement**: `main.ts` runs `boot()` on `DOMContentLoaded`, which calls:

| Function | Hook | What it does |
|---|---|---|
| `initTheme` | `[data-theme-toggle]` | Toggles `dark`/`light` and saves the choice to `localStorage` |
| `initNav` | `.nav`, `[data-nav-toggle]`, `.nav__drawer` | Sticky-nav shadow, mobile drawer, and active highlighting: a section on any page under its `base`, a child link on an exact match |
| `initReveal` | `.reveal` | Fades elements in as they scroll into view, using `IntersectionObserver` (skipped under reduced motion) |
| `initGlow` | `.card--spotlight`, `.hero__visual` | Makes a highlight follow the cursor by setting the `--mx`/`--my` CSS variables |
| `initCount` | `[data-count]` | Animates the number in a value such as `"633+"` or `"30+"` and keeps the suffix |
| `initTabs` | `[data-tabs]` → `[data-tab]` / `[data-panel]` | Switches between in-page panels (used on the project detail page) |
| `initFilters` | `[data-filter-root]` | Filters cards with chips, selects and a search box (see below) |
| `initAccordion` | `.accordion__btn` | Opens and closes panels by animating `max-height` (contact FAQ) |
| `initForms` | `[data-mock-form]` | Validates required fields, then POSTs to `action` or shows a mock success message |
| `initCalendar` | `[data-calendar]` | Month-grid calendar. No page uses it at the moment (see [decisions.md](decisions.md)) |
| `initToggleGroups` | `[data-toggle-group]` | Keeps one button active per group |

`HeroGlyphs.astro` runs its own animation loop on the home page. It draws an animated field of characters with a sine-based noise function, responds to the pointer, and respects `prefers-reduced-motion`.

## The filter engine

`initFilters` is the most reused piece of logic. It drives `/showcase/projects/`, `/showcase/archive/`, `/blogs/resources/`, `/blogs/`, `/about/events/` and `/about/perks/`.

- Each filterable card carries `data-item` plus a `data-<key>` attribute for each field it can be filtered on (`data-cat`, `data-status`, `data-year`, …).
- Chips (`[data-filter][data-filter-key]`) and selects (`[data-filter-select="<key>"]`) write their value into `state[key]`.
- A card is shown only if it matches **every** active key. A value of `all`, an empty value, or a value starting with `__` means "no filter".
- A card can list several values for one key, separated by `|` (for example `data-stack="Go|CLI|Linux"`).
- Comparison is case-insensitive and removes one trailing `s`, so `Guides` matches `Guide`.
- `[data-filter-search]` matches against the card's whole `textContent`. `[data-filter-count]` shows how many cards are visible.

## Data / persistence

There is no database. The only state kept at runtime is:

- `localStorage.theme`: `"dark"` or `"light"`.
- Contact form submissions, which go to Formspree (`LINKS.formspree` in `src/data/site.ts`) as `multipart/form-data` with `Accept: application/json`.

Project stats (stars, forks, contributors) are **hard-coded snapshots**. A comment in `src/data/projects.ts` says they were pulled from the GitHub API on 2026-09-11.

## Theming

Every color, radius, shadow and font is a CSS custom property. The dark palette is the default on `:root`, and the light theme only overrides tokens under `:root[data-theme='light']`, so component CSS never branches on the theme. The palette comes from Supabase's "Select" page: a green-tinted near-black background with `#3ecf8e` as the accent.
