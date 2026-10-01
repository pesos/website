# Usage guide

For club maintainers updating the site's content. Assumes `npm run dev` is running.

## Add or update a project

Edit `PROJECTS` in `src/data/projects.ts`. Each entry becomes a card on `/showcase/projects/` **and** its own page at `/showcase/projects/<slug>/`.

```ts
{
  slug: 'my-tool',                         // URL segment; must be unique
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
| `stats` | Stars/Forks/Open Issues shown as `N/A`, Contributors from `contributors` |
| `info` | Language = `stack[0]`, Status = `status` |
| `install` | `# Clone the repository` + `$ git clone <repo>` |
| `about` | `blurb` |
| `features`, `learningPath`, `goodFirstIssues` | Section is hidden |

`install` lines are styled by prefix: `#` lines are shown as comments, and `$` lines get a prompt.

Keep **exactly one** project with `featured: true`. `projects.astro` uses a non-null `find(p => p.featured)!` and will fail if none is featured.

If you add a new stack or category, also add it to `PROJECT_FILTERS` so it appears in the dropdowns.

A repo that doesn't need its own page goes in `OTHER_PROJECTS` instead (`name`, `repo`, `blurb`).

## Publish a blog post

Add a markdown file to `blogs/` at the repo root. Nothing else needs to change: the post gets its own page, a card on `/blogs/`, a search entry and (for a new tag) a filter chip.

1. Copy `blogs/_TEMPLATE.md` to `blogs/<slug>.md`. The file name is the URL: `blogs/my-first-pr.md` → `/blogs/my-first-pr/`. Use lowercase and hyphens, and don't name a post `resources.md` (that URL is the Resources page).
2. Fill in the front matter:

   | Field | Required | Notes |
   |---|---|---|
   | `title` | yes | |
   | `description` | yes | Card text on `/blogs/` and in search |
   | `date` | yes | `YYYY-MM-DD`; the list is newest first |
   | `author` | no | |
   | `tag` | no | Defaults to `Community`; a new value gets its own filter chip |
   | `featured` | no | Listed first, with a green tag |
   | `draft` | no | `true` shows the post in `npm run dev` only |

3. Write the post in markdown below the front matter. Use `##` for sections; the page title comes from `title`. Code blocks are syntax-highlighted for the language you name (e.g. ```` ```bash ````).

Files starting with `_` are ignored. A missing or malformed required field fails the build with an error naming the file.

Posts appear on the live site when it's next built and deployed. Under `npm run dev` they appear as soon as the file is saved (restart the dev server once after pulling this change, since it reads the content config at startup).

To migrate an old post from `pesos/pesos.github.io`, add it to `blogs/` and delete its entry from `src/data/blogs.ts`.

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
| Join step | `guide.ts` | `JOIN_STEPS` | none |
| Activity | `events.ts` | `ACTIVITIES` | `ACTIVITY_TYPES`; keep exactly one `featured: true` |
| Perk | `perks.ts` | `PERKS` | `PERK_CATEGORIES`; keep exactly one `featured: true` |

## Change navigation, socials or site identity

All in `src/data/site.ts`:

- `NAV`: the site map. Each section has a `label`, an `href` (where the nav item goes), a `base` URL prefix and its `children` pages. The nav, its dropdowns, the mobile drawer, every page's `SectionTabs`, the footer's club links and the search index all read from it.
- `FOOTER.socialLinks`.
- `LINKS`: GitHub, members repo, Slack invite, Instagram, Twitter, Formspree endpoint.
- `SITE.tagline`: shown in the home hero and the footer.

The nav highlights a section on every page under its `base`, so Showcase and Engagement stays highlighted on `/showcase/projects/grofer/`. Dropdown and drawer links are highlighted only on an exact match.

To add a page to a section: create it under that section's folder in `src/pages/`, add it to the section's `children` in `NAV`, put `<SectionTabs section="…" />` in its header, and add a one-line description to `PAGE_DESC` in `src/pages/search.json.ts`. Link only to pages in the same section.

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

## Common problems

- **Build error `Cannot read properties of undefined` on `/showcase/projects/`, `/about/events/` or `/about/perks/`**: no entry has `featured: true`.
- **A new card doesn't show up under a filter**: its `data-<key>` value doesn't match the chip or option value, or the new value is missing from the `*_FILTERS` / `*_YEARS` array.
- **A new page isn't reachable**: add it to its section's `children` in `NAV`.
