# PESOS — club website

Static marketing/content site for **PESOS** (PES Open Source), built with **Astro SSG**.
The separate "TUI / Terminal" experience is out of scope here — the header keeps a
`$ Terminal` button that currently links nowhere.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # -> dist/
npm run preview    # serve dist/
```

## Stack & structure

- Astro 4, `output: 'static'`, zero UI framework.
- `src/styles/global.css` — all design tokens + component CSS. Dark theme is the default
  (`:root`); light theme overrides tokens under `:root[data-theme="light"]`.
- `src/scripts/main.ts` — one guarded module: theme toggle (persisted in `localStorage`),
  scroll-reveal, sticky nav + mobile drawer, cursor-glow, count-up, tabs, filters,
  accordion, events calendar, mock form validation.
- `src/data/*.ts` — all sample content (projects, events, perks, resources, archive,
  guide sections, nav). Edit these, not the pages.
- `src/components/` — `Nav`, `Footer`, `SectionHeader`, `ImgPlaceholder`, `Crumb`,
  `GuideTabs`. `src/layouts/BaseLayout.astro` wraps every page.

## Pages

`/` home · `/getting-started/` · `/pesos-101/` · `/how-to-join/` · `/about/` · `/blogs/`
· `/projects/` + `/projects/<slug>/` · `/events/` · `/perks/` · `/resources/` ·
`/archive/` · `/contact/` · `404`

## Placeholders to replace before launch

- **`[tagline placeholder]`** — appears on the home hero and in `src/data/site.ts`
  (`SITE.tagline`) and `src/components/Footer.astro`. Search the repo for it.
- All images are dashed `ImgPlaceholder` boxes.
- Contact and "join" forms are **front-end only** — they validate and show a fake
  success message, but nothing is sent. Wire up a form backend (Formspree, a serverless
  function, etc.) in `src/scripts/main.ts` → `initForms()`.
- Social / GitHub / Discord / Slack links are `#`.
- Sample data (project stats, member names, event dates, perks) is illustrative.
