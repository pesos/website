# Terminal UI

A second way to browse the site: a terminal (Tokyo Night theme) that shows every page as markdown. It's an add-on. The main website doesn't depend on it and isn't changed by it.

## Files

| File | Job |
|---|---|
| `src/components/TerminalMode.astro` | The terminal: markup, styles, script |
| `src/lib/terminalContent.ts` | Builds the terminal's content from the website's pages |
| `src/pages/terminal-content.json.ts` | Serves that content as `/terminal-content.json` |
| `turndown` (in `package.json`) | Converts page HTML to markdown |

`src/layouts/BaseLayout.astro` has the only two lines that mention it: the import and `<TerminalMode />` as the first thing in `<body>`.

## Removing it

1. In `src/layouts/BaseLayout.astro`, delete `import TerminalMode …` and `<TerminalMode />`.
2. Delete the three files above and this doc.
3. `npm uninstall turndown`.

The website is then exactly as it would be without the terminal. Nothing else in the site refers to it.

## How it hooks in without touching the website

- **Hiding the website:** in terminal mode every other child of `<body>` is faded out and made `inert`. No wrapper element is added.
- **Opening it:** backtick, or the nav's existing `>_ Terminal` button and drawer link, which the terminal finds by their class and text. The nav markup isn't changed.
- **Mode:** a new visit always starts on the normal website. Opening the terminal sets `sessionStorage.pesosMode` to `dev`, so it stays open across page loads for the rest of that session; `exit` (or backtick) switches back and sets it to `normal`.
- **Contact form:** the terminal's `send` command reads the subjects and destination from the rendered contact page's form, and posts to the same place.

## Content

The terminal shows the website's own pages. `terminalContent.ts` renders every page under `src/pages` with Astro's container API and converts the HTML inside `<main>` to markdown. Text written anywhere (`src/data`, page frontmatter, page markup, `/blogs` markdown) reaches the terminal with nothing to keep in sync by hand.

- **File tree:** a page's route is its terminal path (`/about/goals/` → `/about/goals`). A route other pages live under becomes that directory's `README` (`/showcase/projects/` → `/showcase/projects/README`). Directory names and blurbs come from `NAV` and `SECTIONS`.
- **Clean-up:** website-only widgets (filter bars, search, breadcrumbs, image placeholders, `aria-hidden`/`hidden` elements) are dropped by `SKIP`. A few patterns get custom markdown: section headers, stat tiles, numbered steps, card links, FAQ accordions, and the contact form (which becomes a pointer to `send`).
- **Per-page skips:** `PAGE_SKIP` in `terminalContent.ts`, by route (for example the home page's "Club Sections" cards, which `ls` already lists). Use this instead of adding attributes to website pages.
- **Leaving a page out:** add its route to `NO_TERMINAL_PAGE` (the error pages are).
- Under `npm run dev` the content is rebuilt on every request; in a build it's made once.

## Layout and zoom

The terminal always fills the window. Text is 15px (the website's body size, `--pt-font` in `TerminalMode.astro`), so browser zoom works like on any page: text gets bigger or smaller and lines reflow to fit. The nyan cat scrollbar and the matrix rain are sized in viewport units, so they stay the same size at any zoom.
