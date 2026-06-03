# Adam Sokacz — Personal Blog

A personal blog on manufacturing, finance, and industrial automation. Built with Astro, React/TSX, and Tailwind CSS. Deployed to Cloudflare Pages via Wrangler.

**Live:** [adamsokacz.ca](https://adamsokacz.ca)

---

## Stack

- **Astro 5** — static site generation, routing, content collections
- **React + TypeScript** — all UI components in TSX
- **Tailwind CSS v4** — utility-first styling with `@tailwindcss/typography`
- **Cloudflare Pages** — static hosting via `wrangler pages deploy`

## Project structure

```text
├── posts/                     # Blog posts (UID directories)
│   └── <uid>/
│       ├── index.md           # Markdown post with frontmatter
│       └── *.pdf / *.jpg      # Co-located assets
├── projects/                  # Project entries (UID directories)
├── src/
│   ├── components/react/      # React/TSX UI components
│   ├── data/
│   │   ├── site-config.ts     # Site-wide configuration
│   │   └── reading-list.ts    # Reading list data (TSX-driven)
│   ├── layouts/               # Astro layout shells
│   ├── pages/                 # Route files
│   ├── styles/global.css      # Tailwind + design tokens
│   └── content.config.ts      # Astro content collections
├── scripts/
│   └── sync-post-assets.mjs   # Copies post assets to public/
├── wrangler.toml              # Cloudflare Pages config
└── agent/                     # Planning docs (VISION, DESIGN, REQUIREMENTS)
```

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start local dev server (localhost:4321)
npm run build        # Type-check + build to dist/
npm run preview      # Preview production build locally
npm run deploy       # Build + deploy to Cloudflare Pages
```

## Adding content

### Blog post

Create a new directory under `posts/` with a unique ID:

```bash
mkdir posts/my-new-post
```

Add an `index.md` with frontmatter:

```yaml
---
title: "My Post Title"
excerpt: "A brief description."
publishDate: "2026-01-15"
tags:
  - topic
---

Markdown body here.
```

For PDF posts, set `type: "pdf"` and include the `pdf` field pointing to the co-located file.

### Project

Create `projects/<uid>/index.md` with `title`, `description`, `date`, and optional `demoURL`/`repoURL`.

### Reading list

Edit `src/data/reading-list.ts` — add items to the exported array. No markdown files needed.

## Deployment

Deployed via Cloudflare Pages. Use `npm run deploy` for manual deploys, or connect the repo to Cloudflare for automatic deploys on push.

Custom domain: configure `adamsokacz.ca` in the Cloudflare Pages dashboard.

## Design

Visual design follows the Ovidius theme pattern (see `agent/DESIGN.md`):
- Light-only theme with teal primary accent (`#02738f`)
- Figtree Variable font
- Magazine-style layout with hero, featured posts, paginated archive
- Responsive `max-w-3xl` / `max-w-6xl` content rhythm
