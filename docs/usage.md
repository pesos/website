# Usage guide

For club maintainers updating the site's content. Assumes `npm run dev` is running.

## Add or update a project

Edit `PROJECTS` in `src/data/projects.ts`. Each entry becomes a card on `/projects/` **and** its own page at `/projects/<slug>/`.

```ts
{
  slug: 'my-tool',                         // URL segment — must be unique
  name: 'my-tool',
  category: 'CLI',                         // matches PROJECT_FILTERS.category
  status: 'Looking for Contributors',      // 'Active' | 'Completed' | 'Looking for Contributors' | 'Archived'
  blurb: 'One-line description.',
  stack: ['Go', 'CLI'],                    // first item doubles as "Language" if `info` is omitted
  contributors: 3,
  repo: 'https://github.com/pesos/my-tool',
  branch: 'main',                          // used to build the CONTRIBUTING.md link
  // optional: featured, stats, info, goodFirstIssues, features, about, install, learningPath
}
```

What happens when optional fields are left out:

| Field | Fallback on the detail page |
|---|---|
| `stats` | Stars/Forks/Open Issues shown as `—`, Contributors from `contributors` |
| `info` | Language = `stack[0]`, Status = `status` |
| `install` | `# Clone the repository` + `$ git clone <repo>` |
| `about` | `blurb` |
| `features`, `learningPath`, `goodFirstIssues` | Section is hidden |

`install` lines are styled by prefix: `#` lines are shown as comments, and `$` lines get a prompt.

Keep **exactly one** project with `featured: true`. `projects.astro` uses a non-null `find(p => p.featured)!` and will fail if none is featured.

If you add a new stack or category, also add it to `PROJECT_FILTERS` so it appears in the dropdowns.

A repo that doesn't need its own page goes in `OTHER_PROJECTS` instead (`name`, `repo`, `blurb`).

## Add an archive entry

Append to `ARCHIVE_ENTRIES` in `src/data/archive.ts`:

```ts
{
  title: 'Hacktoberfest 2026',
  type: 'Past Events',            // 'Past Events' | 'Legacy Projects' | 'Historical Records'
  category: 'Hackathon',
  semester: 'Fall',
  year: '2026',
  date: 'Oct 2026',
  blurb: '…',
  href: 'https://…',              // optional
}
```

If the year is new, add it to `ARCHIVE_YEARS`, or the entry can't be picked from the Year dropdown. The "Total Entries" stat updates itself; "Years Spanned" and "Contributors" are hand-written strings.

## Add a resource, guide section, activity or perk

| Content | File | Array | Also update |
|---|---|---|---|
| Resource link | `resources.ts` | `RESOURCES` | `RESOURCE_FILTERS` for a new category |
| "Why open source" card | `guide.ts` | `GUIDE_SECTIONS` | `GUIDE_FILTERS` for a new `filter` value |
| Join step | `guide.ts` | `JOIN_STEPS` | — |
| Activity | `events.ts` | `ACTIVITIES` | `ACTIVITY_TYPES`; keep exactly one `featured: true` |
| Perk | `perks.ts` | `PERKS` | `PERK_CATEGORIES`; keep exactly one `featured: true` |

## Change navigation, socials or site identity

All in `src/data/site.ts`:

- `NAV_LINKS`: the header links and the mobile drawer.
- `GUIDE_TABS`: the tab strip on the Getting Started / 101 / About / How to Join pages.
- `FOOTER.clubLinks`, `FOOTER.socialLinks`.
- `LINKS`: GitHub, members repo, Slack invite, Instagram, Twitter, Formspree endpoint.
- `SITE.tagline`: shown in the home hero and the footer.

The nav highlights the active link by path prefix. Any link other than `/` is marked active on every page under it, so `/projects/` stays highlighted on `/projects/grofer/`.

## Make a new list filterable

No JS is needed. Use the attributes `initFilters` looks for:

```astro
<section data-filter-root>
  <input data-filter-search />
  <select data-filter-select="level">
    <option value="all">Any level</option>
    <option value="Beginner">Beginner</option>
  </select>
  <button class="chip is-active" data-filter="All" data-filter-key="cat">All</button>
  <button class="chip" data-filter="Talk" data-filter-key="cat">Talk</button>

  <span data-filter-count></span> shown

  {items.map((it) => (
    <article data-item data-cat={it.type} data-level={it.level} data-stack={it.stack.join('|')}>…</article>
  ))}
</section>
```

Rules:

- The key in `data-filter-select="level"` / `data-filter-key="level"` must match the card's `data-level`.
- `all`, an empty value, or a value starting with `__` turns that filter off.
- Separate multiple values with `|`.
- Matching ignores case and one trailing `s`.

## Contact form

`/contact/` POSTs to `LINKS.formspree`. To send submissions somewhere else, change that URL. Any absolute http(s) `action` works if the endpoint accepts `multipart/form-data` and returns 2xx.

To add a form elsewhere, reuse this structure:

```html
<form data-mock-form action="https://…" method="POST" novalidate>
  <label class="field">
    <input class="input" name="x" required />
    <span class="field__error">Required.</span>
  </label>
  <div class="form-success">Sent.</div>
  <div class="form-error" style="display:none">Failed.</div>
  <button type="submit">Send</button>
</form>
```

Without an http(s) `action`, the form only validates and shows `.form-success`. **Nothing is sent.**

## Other interactive hooks

| Want | Markup |
|---|---|
| Fade in on scroll | `class="reveal"`, with an optional `style="--d:120ms"` delay |
| Count-up number | `<span data-count="633+">633+</span>` |
| Cursor spotlight on a card | `class="card card--spotlight"` |
| In-page tabs | `data-tabs` wrapper, `data-tab="X"` buttons, `data-panel="X"` panels |
| Accordion | `.accordion__btn` immediately followed by its panel element |

## Adding a page (terminal UI)

Every route must also exist in the terminal, or `npm run build` fails with `[terminal] website routes with no terminal page: …`. Add an entry in `src/lib/terminalContent.ts` using the `page(path, route, title, body)` helper, and build the body from the same `src/data` module the page uses.

## Common problems

- **Build error `Cannot read properties of undefined` on `/projects/`, `/events/` or `/perks/`**: no entry has `featured: true`.
- **A new card doesn't show up under a filter**: its `data-<key>` value doesn't match the chip or option value, or the new value is missing from the `*_FILTERS` / `*_YEARS` array.
- **A new page isn't reachable**: add it to `NAV_LINKS` or `FOOTER.clubLinks`. `/events/` and `/perks/` currently have no inbound links.
