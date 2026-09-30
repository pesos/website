# Installation

## Prerequisites

- **Node.js** `^20.19.0` or `>=22.12.0` (this is the `engines` range Astro 7 declares in `package-lock.json`)
- **npm** (the repo commits a `package-lock.json`)
- No database, API keys or environment variables are needed

## Steps

### 1. Clone

```bash
git clone <repo-url> pesos-web
cd pesos-web
```

### 2. Install dependencies

```bash
npm ci
```

`npm ci` installs exactly what's in the lockfile. Astro is the only direct dependency.

### 3. Environment variables

None. All external URLs (Slack invite, Formspree endpoint, socials) are constants in `src/data/site.ts` → `LINKS`.

### 4. Run the dev server

```bash
npm run dev
```

It serves at <http://localhost:4321> with hot reload.

### 5. Production build

```bash
npm run build     # → dist/
npm run preview   # serves dist/ locally
```

## Verify it works

A successful build ends with:

```
[build] 17 page(s) built in …
[build] Complete!
```

and `dist/` contains one folder per route (`about/`, `projects/grofer/`, …), plus `404.html` and `_astro/` (the hashed CSS and JS).

Then check these in the browser:

- `/`: the hero glyph animation runs, and the theme toggle switches dark and light and keeps the choice after a reload.
- `/projects/`: the status chips and search box filter the cards.
- `/projects/grofer/`: the Overview / Contribution Guide / Issues / Pull Requests tabs switch.

## Deploying

`dist/` is plain static files and can go on any static host. Before deploying:

- Set `site` in `astro.config.mjs` to the real domain. It is currently `https://pesos.example.org`.
- Have the host serve `404.html` for unknown paths.
