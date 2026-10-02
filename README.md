# PESOS Web

## 📚 Documentation
| | |
|---|---|
| [⚙️ Architecture](docs/architecture.md) | System design, components and flow |
| [📁 Structure](docs/structure.md) | Project organization and responsibilities |
| [🚀 Installation](docs/installation.md) | Requirements and steps to run the project |
| [🧠 Technical decisions](docs/decisions.md) | Trade-offs and design justifications |
| [📖 Usage guide](docs/usage.md) | Editing content, adding projects, wiring filters and forms |

---

## Description

The website for **PESOS (PES Open Source)**, the student-run open-source club at PES University (founded 2012, re-launched as "OSIRIS" in Feb 2026).

- **What it does:** a static site that explains why open source matters, how to join the club (one PR to [`pesos/members-list`](https://github.com/pesos/members-list)), what the club builds (Grofer, Rshark, browser-history), and its history, blog, resources and code of conduct.
- **What problem it solves:** replaces the old `pesos.github.io` Jekyll site with one place for onboarding. Content lives in typed data files, so updating a project or archive entry doesn't mean editing markup.
- **Real use case:** a new student lands on `/`, reads `/getting-started/`, follows the five steps on `/about/how-to-join/`, then picks a "good first issue" from `/showcase/projects/grofer/`.

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
```

## Technologies used

| Category | Tech |
|---|---|
| Framework | [Astro](https://astro.build) `^7.3.2`, `output: 'static'` |
| Language | TypeScript (`astro/tsconfigs/strict`) |
| Styling | One hand-written stylesheet (`src/styles/global.css`) with CSS custom-property tokens; Inter + JetBrains Mono from Google Fonts |
| Client JS | Vanilla TS modules, no UI framework |
| Forms | [Formspree](https://formspree.io) endpoint for the contact form |

## Quick installation

1. Install Node `^20.19.0` or `>=22.12.0`.
2. `npm install`
3. `npm run build`: the static output goes to `dist/`.

Full steps: [docs/installation.md](docs/installation.md).

## Architecture (summary)

Astro renders every page at build time from `.astro` templates plus typed arrays in `src/data/*.ts`. Every page is wrapped in `BaseLayout`, which also loads a single client script (`src/scripts/main.ts`). That script adds behavior to elements by looking up `data-*` attributes: theme toggle, filters, tabs, accordion, count-up and form submission. The one dynamic route, `/showcase/projects/[slug]/`, is expanded at build time from the `PROJECTS` array. There is no backend. See [docs/architecture.md](docs/architecture.md).

## Project structure

```
src/
├── pages/        # one folder per wireframe section: getting-started/, about/, blogs/, showcase/
├── layouts/      # BaseLayout: <head>, theme bootstrap, Nav, Footer, main.ts
├── components/   # Nav, Footer, Search, SectionTabs, ErrorPage, Wordmark, Crumb, SectionHeader, ImgPlaceholder, HeroGlyphs
├── data/         # all content: site (incl. the NAV site map), projects, guide, blogs, resources, archive, events, perks, errors
├── scripts/      # main.ts: all shared client behavior
└── styles/       # global.css: tokens + every component style
public/           # pesos-logo.svg (favicon)
```

Details: [docs/structure.md](docs/structure.md).
