# Requirements — Personal Blog Redesign

Product and technical requirements for the personal-blog redesign. Visual details are in [DESIGN.md](./DESIGN.md); delivery process is in [VISION.md](./VISION.md).

**Status:** Draft  
**Last updated:** 2026-06-03

---

## 1. Summary

Rebuild **adamsokacz.ca** as an Ovidius-styled site with a React/TSX UI, UID-based post folders, three primary content areas (Blog, Projects, Reading list), and deployment to **Cloudflare** via **Wrangler**.

---

## 2. Functional requirements

### FR-1 — Visual design parity with Ovidius

| ID | Requirement | Acceptance criteria |
|----|-------------|---------------------|
| FR-1.1 | The site SHALL match the look and feel of [ovidius-astro-theme](https://github.com/JustGoodUI/ovidius-astro-theme). | Layout, color tokens, typography, component styling, and spacing follow [DESIGN.md](./DESIGN.md). |
| FR-1.2 | Design reference SHALL be structure and styling only, not demo copy, GPL assets, or third-party branding. | Hero, nav labels, and footer reflect Adam Sokacz / `site-config`, not Ovidius demo content. |
| FR-1.3 | The site SHALL use a light theme only (no dark mode) unless explicitly added in a later phase. | No `dark:` variant requirement in v1. |

### FR-2 — React / TypeScript UI

| ID | Requirement | Acceptance criteria |
|----|-------------|---------------------|
| FR-2.1 | Interactive and presentational UI SHALL be implemented in **React + TSX**. | Components live under `src/components/react/` (or equivalent) with typed props. |
| FR-2.2 | Astro MAY be used for routing, static generation, and content loading, but user-facing UI blocks SHALL be React components unless statically impossible. | Header, Hero, cards, subscribe, footer, reading list UI, etc. are `.tsx`. |
| FR-2.3 | TypeScript SHALL be strict; `npm run build` SHALL pass type checking. | No `any` without documented exception. |

### FR-3 — Deployment on Cloudflare (Wrangler)

| ID | Requirement | Acceptance criteria |
|----|-------------|---------------------|
| FR-3.1 | Production deployment SHALL use **Cloudflare** with **Wrangler** CLI. | `wrangler.toml` (or `wrangler.jsonc`) present; deploy documented in README. |
| FR-3.2 | The build output SHALL be compatible with Cloudflare Pages and/or Workers (per chosen Astro adapter). | `npm run build` produces artifacts consumed by `wrangler deploy` or Pages CI. |
| FR-3.3 | Custom domain **adamsokacz.ca** SHALL remain supported on Cloudflare (DNS + SSL). | Deploy checklist includes domain binding; redirects from legacy hosts preserved if still required. |
| FR-3.4 | Vercel-specific config (`vercel.json`) SHALL be replaced or superseded by Cloudflare-compatible redirects/rules. | Host redirects (e.g. `.com` → `.ca`) work on Cloudflare. |

**Implementation note (non-binding):** Typical stack is `@astrojs/cloudflare` + `wrangler pages deploy ./dist` or Workers assets binding. Exact adapter choice is an architecture decision during implementation.

### FR-4 — Post content model (`posts/<uid>/`)

| ID | Requirement | Acceptance criteria |
|----|-------------|---------------------|
| FR-4.1 | Each post SHALL live in a dedicated directory: `posts/<post_uid>/`. | `post_uid` is stable, unique, and used in URLs. |
| FR-4.2 | A post directory MAY contain any combination of: markdown, PDF(s), images, and metadata files. | Example layouts below are valid. |
| FR-4.3 | A post SHALL be one of two primary types: **(a) markdown** or **(b) pdf**. | Type is inferred from presence of primary content (see FR-4.5). |
| FR-4.4 | `post_uid` SHALL NOT change after publish without a redirect from the old URL. | URL stability documented for authors. |
| FR-4.5 | Each post SHALL expose metadata required for listing and SEO (title, description, date, draft, optional tags, optional featured flag). | Metadata MAY live in frontmatter (`index.md`), a sidecar file (e.g. `meta.json`), or a convention documented in repo. |

**Valid directory examples:**

```text
posts/
  4caa5688-bc2d-4dfb-9a40-52526bfd29ab/
    index.md              # markdown post + frontmatter
    hero.jpg              # optional image

  17f9ef72-d506-4d4e-94c4-9922a1945892/
    meta.json             # title, description, date, …
    whitepaper.pdf        # pdf post (primary content)
    thumb.png

  my-custom-slug/
    post.md
    assets/
      diagram.png
```

**URL convention (default):** `/blog/<post_uid>/` for individual posts unless requirements change during implementation.

**Migration:** Existing `src/content/blog/<uuid>/index.md` posts SHALL map into `posts/<post_uid>/` without content loss.

### FR-5 — Required pages and navigation

| ID | Page | Requirement | Acceptance criteria |
|----|------|-------------|---------------------|
| FR-5.1 | **Home / Blog (default)** | The default route (`/`) SHALL show the **About hero** (Ovidius-style intro: avatar, title, bio, social) followed by the **Blog** content (featured + latest posts and/or paginated list per DESIGN). | Visiting `/` shows hero then blog; no separate “marketing-only” home without posts. |
| FR-5.2 | **Projects** | A dedicated **Projects** page SHALL list project entries with title, description, date, and optional links (demo, repo). | Route `/projects` (or documented alias) renders project collection/cards matching Ovidius card patterns. |
| FR-5.3 | **Reading list** | A **Reading list** page SHALL be driven by a **TSX (or TS) data module** that defines item metadata and **external URLs** (not markdown collection files). | Route `/reading-list` (or documented alias); adding an item does not require new markdown files—edit the TSX/TS source. |
| FR-5.4 | Primary navigation SHALL include access to Blog (home), Projects, and Reading list. | Header menu links resolve correctly on all viewports. |

**Reading list data shape (minimum):**

```ts
type ReadingListItem = {
  title: string;
  author?: string;
  url: string;           // external link
  note?: string;
  tags?: string[];
  dateAdded?: string;    // ISO or display string
};
```

**Optional later pages** (out of scope unless added): About as separate static page, Contact, Subscribe—see §4.

### FR-6 — Post rendering

| ID | Requirement | Acceptance criteria |
|----|-------------|---------------------|
| FR-6.1 | **Markdown posts** SHALL render as prose (Ovidius typography per DESIGN.md) with optional feature image, TOC if headings exist, and prev/next navigation. | Readable on mobile and desktop. |
| FR-6.2 | **PDF posts** SHALL display the PDF inline (embedded viewer) with fallback link to open/download. | Same UX goal as current personal-blog PDF posts. |
| FR-6.3 | Post list cards SHALL show title, date, excerpt/description, and thumbnail when available. | Matches Ovidius `PostPreview` / `FeaturedPostPreview` patterns. |

### FR-7 — Projects content

| ID | Requirement | Acceptance criteria |
|----|-------------|---------------------|
| FR-7.1 | Projects SHALL be maintainable as content (markdown/JSON under a `projects/` tree or collection) unless specified otherwise in implementation. | Empty state handled gracefully (“No projects listed”). |
| FR-7.2 | Project entries SHALL support at least: `title`, `description`, `date`, optional `demoURL`, optional `repoURL`, optional `draft`. | Aligns with existing personal-blog project schema where possible. |

---

## 3. Non-functional requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-1 | **Performance** | Static HTML where possible; optimized images; LCP acceptable on mobile. |
| NFR-2 | **Accessibility** | WCAG-oriented patterns from DESIGN.md (menu ARIA, semantic headings, focus states). |
| NFR-3 | **SEO** | Canonical URLs, Open Graph, sitemap, RSS for blog posts. |
| NFR-4 | **Maintainability** | Single `site-config` for site-wide settings; post UIDs for stable URLs. |
| NFR-5 | **Build** | `npm run build` succeeds in CI before `wrangler deploy`. |
| NFR-6 | **Security** | No secrets in repo; external forms (subscribe) use env or config outside git if needed. |

---

## 4. Out of scope (v1)

Unless explicitly added later:

- Dark / light / system theme toggle (Micro feature)
- Pagefind site search
- Giscus comments
- Tags index pages (may add if needed)
- Newsletter subscribe block (Ovidius has it; not listed in user pages—optional follow-up)
- Separate About/Contact static pages (hero on home covers “About”; contact can be link in hero/footer)
- Vercel deployment (replaced by Cloudflare)

---

## 5. Constraints and dependencies

| Constraint | Detail |
|------------|--------|
| **Design** | [DESIGN.md](./DESIGN.md) is the visual specification. |
| **Process** | [VISION.md](./VISION.md) branch/cutover rules apply until updated for Cloudflare. |
| **Domain** | `https://adamsokacz.ca` remains production URL. |
| **License** | Do not copy Ovidius GPL demo content or assets verbatim. |

---

## 6. Suggested repository layout (target)

```text
personal-blog/
├── posts/                          # FR-4: UID directories
│   └── <post_uid>/
├── projects/                       # FR-7 (or src/content/projects)
├── src/
│   ├── components/react/           # FR-2
│   ├── data/
│   │   ├── site-config.ts
│   │   └── reading-list.tsx        # FR-5.3 metadata + external links
│   ├── pages/
│   │   ├── index.astro             # FR-5.1 About hero + Blog
│   │   ├── projects.astro          # FR-5.2
│   │   └── reading-list.astro      # FR-5.3
│   └── styles/global.css           # FR-1
├── wrangler.toml                   # FR-3
└── agent/
    ├── REQUIREMENTS.md             # this file
    ├── DESIGN.md
    └── VISION.md
```

Exact paths MAY adjust during implementation if documented in README.

---

## 7. Acceptance test checklist (release)

- [ ] Visual review: side-by-side with Ovidius reference meets DESIGN.md
- [ ] All UI components implemented in React/TSX
- [ ] `wrangler deploy` (or Pages pipeline) succeeds; site live on Cloudflare
- [ ] `adamsokacz.ca` serves over HTTPS
- [ ] `/` shows About hero + blog content
- [ ] `/projects` lists projects
- [ ] `/reading-list` renders items from TSX data with working external links
- [ ] Markdown post under `posts/<uid>/` renders at `/blog/<uid>/`
- [ ] PDF post under `posts/<uid>/` embeds PDF with fallback link
- [ ] Legacy post URLs redirect if UIDs/paths changed
- [ ] `npm run build` passes with no type errors
- [ ] RSS and sitemap include published blog posts

---

## 8. Traceability

| User requirement | Requirement IDs |
|------------------|-----------------|
| Match Ovidius design | FR-1, DESIGN.md |
| React/TSX | FR-2 |
| Wrangler → Cloudflare | FR-3 |
| `posts/<uid>/` markdown or PDF | FR-4, FR-6 |
| Blog default under About hero | FR-5.1 |
| Projects page | FR-5.2, FR-7 |
| Reading list (TSX + external links) | FR-5.3 |

---

## 9. Open questions

Resolve before or during implementation:

| # | Question | Default if unresolved |
|---|----------|------------------------|
| 1 | Reading list route: `/reading-list` vs `/reading`? | `/reading-list` |
| 2 | Post metadata: frontmatter only vs `meta.json` for PDF-only posts? | Support both |
| 3 | Cloudflare: Pages vs Workers? | Pages + static assets |
| 4 | Keep RSS including projects? | Blog posts only in v1 |
| 5 | Featured post selection: manual flag in metadata? | `featured: true` in post metadata |
