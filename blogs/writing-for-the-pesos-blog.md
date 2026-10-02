---
title: Writing for the PESOS blog
description: The blog now lives in our website repo as plain markdown files. Here's how to write a post and get it published with a single pull request.
date: 2026-10-01
tag: Guide
---

Got something worth sharing? A tool you love, a bug that took you a week to find, a recap of
the last meetup? The PESOS blog is written by members, and publishing a post works exactly like
contributing to any other open-source project: **you open a pull request**.

## How it works

Every post is a markdown file in the `blogs/` folder of the website repo. When a pull request
adding one is merged, the site is rebuilt and the post shows up on the blog automatically. No
one has to touch any website code.

## Publishing a post

1. Fork the website repo and create a branch.
2. Copy `blogs/_TEMPLATE.md` to `blogs/your-post-title.md`. The file name becomes the URL, so
   keep it short, lowercase and hyphenated.
3. Fill in the details at the top of the file, then write your post below them.
4. Preview it locally with `npm run dev` and open `/blogs/your-post-title/`.
5. Open a pull request. A maintainer will review it, just like a code contribution.

## The front matter

The block between the `---` lines at the top of a post tells the site about it:

```yaml
---
title: My first pull request
description: What I learned getting my first PR merged into a real project.
date: 2026-10-01
author: Your Name
tag: Tutorial
---
```

| Field | Required | What it does |
| --- | --- | --- |
| `title` | Yes | The post's headline |
| `description` | Yes | The summary on the blog index and in search |
| `date` | Yes | Publication date; posts are listed newest first |
| `author` | No | Shown under the title |
| `tag` | No | Which filter chip the post appears under |
| `draft` | No | `true` keeps it out of the published site while you work on it |

## What you can use

Posts support all the usual markdown: headings, **bold** and *italic* text,
[links](https://www.markdownguide.org/basic-syntax/), lists, tables, images and code.

> Tip: write the way you'd explain it to a friend at a meetup. Short paragraphs and real
> examples beat long walls of text.

Inline code like `git rebase -i` is styled automatically, and code blocks are highlighted for
the language you name:

```bash
git checkout -b blog/my-first-post
cp blogs/_TEMPLATE.md blogs/my-first-post.md
npm run dev
```

---

Not sure what to write about? Ask on Slack. Someone always has an idea, and a review partner.
