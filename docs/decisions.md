# Technical decisions

## Astro, static output, no UI framework

**Decision:** Astro with `output: 'static'`, no React/Vue/Svelte integration.

**Why:** the site is almost entirely content, and its interactive parts (filters, tabs, accordion, theme) are small DOM manipulations. A component framework would add runtime JS and hydration for no real gain. Astro keeps authoring in components while shipping plain HTML. Hosting only has to serve files, which suits a student club whose maintainers change every year.

**Trade-off:** any interactive state has to be written by hand in vanilla TS. That stays manageable only because the widgets are simple.

## Content in typed TS arrays, not Markdown collections

**Decision:** content lives in `src/data/*.ts` as typed arrays (`Project`, `ArchiveEntry`, `Resource`, …), not Astro content collections or Markdown.

**Why:** most content is structured cards (status, stack, year, semester) that feed filters, not long prose. TS types catch a missing field or a status typo at build time. `'Active' | 'Completed' | …` on `Project.status` is one example.

**Exception: blog posts.** Posts are long prose written by many members, so they live as markdown files in `/blogs` at the repo root and are loaded through an Astro content collection (`src/content.config.ts`, `glob` loader). Adding a post is a single new file in a pull request: no code changes, and the front matter is validated by a schema, so a missing `title` or a bad `date` fails the build instead of shipping a broken page. The posts from the old `pesos/pesos.github.io` Jekyll blog were migrated into `/blogs` (Liquid/Kramdown syntax removed, local images copied into `blogs/images/`).

**Inconsistency to be aware of:** some pages keep their data in their own frontmatter (`getting-started/why-our-club.astro`, `about/goals.astro`, `contact.astro`) instead of in `src/data`.

## One `main.ts` with feature-detected init functions

**Decision:** all client behavior is in a single module loaded on every page, and each `init*()` checks for its hook before doing anything.

**Why:** there's one bundle to cache, nothing to configure per page, and any page can use any widget just by adding the right `data-*` attribute. The unused code costs little because the file is small (~400 lines).

**Rejected alternative (implied by the code):** per-component `<script>` tags. Only `HeroGlyphs` does this, because its animation is specific to the home page.

## Declarative filtering via `data-*` attributes

**Decision:** one generic filter engine (`initFilters`) handles the filters on six pages, driven entirely by markup: `data-filter-root`, `data-item`, `data-<key>`, `data-filter`, `data-filter-select`, `data-filter-search`.

**Why:** the pages add filtering without any page-specific JS, and the pages are fully rendered on the server, so all content is still in the HTML when JS is off.

**Trade-offs:**
- Matching removes one trailing `s` from both sides (`norm()`). This makes `Guides` match `Guide`, but it could also make two values that differ only by a trailing "s" match each other.
- Search matches the card's whole `textContent`, including tags and button labels.

## Theme bootstrap inline in `<head>`

**Decision:** a tiny `is:inline` script sets `data-theme` before the body is parsed. `main.ts` only handles the toggle.

**Why:** the page never flashes the wrong theme. Dark is the default when nothing is saved. The code doesn't read `prefers-color-scheme` for the initial choice.

## Tokens-only theming

**Decision:** every color and shadow is a CSS custom property, and the light theme only overrides tokens.

**Why:** components never need theme-specific selectors, and the whole light palette sits in one block.

## Forms: real endpoint when `action` is an http(s) URL, otherwise a mock

**Decision:** `initForms` validates required fields on the client. If the form's `action` is an absolute http(s) URL, it `fetch`es that URL with `FormData`. If not, it shows the success message without sending anything.

**Why:** the site has no backend. Formspree (`LINKS.formspree`) takes submissions from a static page. Keeping the mock path means a form can be prototyped before an endpoint exists.

## Honest placeholders over invented data

The data files follow a clear rule: show real information or visible placeholders, not made-up specifics.
- `events.ts` describes **recurring activities** instead of a dated calendar, because dates are announced on Slack. The comment in that file explains this.
- Images are `ImgPlaceholder` boxes.
- Project stats are marked as a dated API snapshot.

As a result, `initCalendar` in `main.ts`, which was built for a dated events calendar, is still in the bundle but no page uses it. It also hard-codes the view to September 2026.

## Two UIs, one content source: the terminal

**Decision:** the site ships two UIs on every route: the normal website and a terminal (`src/components/TerminalMode.astro`, mounted by `BaseLayout`). The terminal reads a JSON manifest (`/terminal-content.json`) that `src/lib/terminalContent.ts` builds at build time **from the same `src/data/*` modules and `/blogs` markdown the pages render**.

**Why:** the terminal must offer everything the website does. Building both from one data source means an edit to a project, post or FAQ shows up in both. Content that only exists in page markup is mirrored instead (see trade-offs).

**How the two stay in sync:**
- **Parity guard:** the build fails if a route under `src/pages` has no terminal entry.
- **Routes:** every terminal file and directory records the website `route` it stands for. The terminal keeps the address bar on that route. Loading any URL in terminal mode opens its terminal page, and switching back loads the website page for the last thing opened.
- **Contact form:** the terminal's `send` command asks for the same fields, runs the same checks and posts to the same Formspree endpoint as the form on `/contact/`.

**Trade-offs:**
- Much of the prose (all of Getting Started, Goals, How to Join, and lead paragraphs elsewhere) exists only in page markup, so `terminalContent.ts` keeps a copy marked `mirrors <page>`. Update it when you edit those pages.
- The terminal's tree follows `NAV`: `/getting-started`, `/about`, `/blogs` (one file per markdown post, plus `/blogs/resources`), `/contact`, `/showcase/archive`, `/showcase/projects`.
- Mode is per session (`sessionStorage.pesosMode`), and a new session starts on the terminal's boot screen, which asks the visitor to choose a UI.
- Browsers reserve Ctrl+T, so the toggles that actually work are backtick and the nav's `>_ Terminal` button.
