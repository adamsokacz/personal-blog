# Personal Blog — Theme Redesign Vision

This document is the execution plan for evolving **personal-blog** from the [Astro Micro](https://astro-micro.vercel.app/) layout into an **Ovidius-inspired** magazine-style site, implemented with **React + TypeScript (TSX)** for UI while keeping **Astro** for routing, content collections, and static generation.

**Reference theme:** [ovidius-astro-theme](https://github.com/JustGoodUI/ovidius-astro-theme) (layout, information architecture, visual patterns — not a direct copy).

**Production site:** `https://adamsokacz.ca` (unchanged until cutover).

---

## Goals

| Goal | Detail |
|------|--------|
| **Ovidius-like IA** | Hero intro, featured posts, paginated blog archive, static pages (About/Contact), newsletter block, image-forward post cards |
| **React/TSX UI** | Interactive and presentational components in TSX; Astro pages remain thin orchestration shells |
| **Preserve content** | Existing 5 blog posts, domain config (`vercel.json`), and `adamsokacz.ca` site URL |
| **Safe rollout** | All work on a long-lived feature branch; `main` stays deployable until explicit user approval |

## Non-goals (initial pass)

- Parity with every Astro Micro feature (Pagefind, Giscus, dark/light/system theme) — decide per phase below
- GPL theme assets or demo copy from Ovidius — only patterns and structure
- Changing hosting provider or primary domain

---

## Phase 1 — Branch off `main`

### 1.1 Preconditions

- `main` is clean and matches remote (`git status` shows nothing to commit).
- Dependencies installed (`npm install`).
- `npm run build` passes on `main`.

### 1.2 Create the feature branch

```bash
git checkout main
git pull origin main
git checkout -b theme/ovidius-react
git push -u origin theme/ovidius-react
```

**Branch name:** `theme/ovidius-react` (adjust if you prefer `feat/ovidius-redesign`).

### 1.3 Branch policy

| Rule | Rationale |
|------|-----------|
| **No direct commits to `main`** during redesign | Production stays on Micro until cutover |
| **PRs target `theme/ovidius-react`** (optional) | Review incremental work without touching `main` |
| **Periodic merges from `main` into feature branch** | `git fetch origin && git merge origin/main` — keeps branch current if `main` gets hotfixes |
| **Deploy previews from feature branch** | Vercel preview URLs for visual QA before cutover |

### 1.4 Milestone checkpoints on the branch

1. **Scaffold** — `@astrojs/react`, TSX toolchain, `site-config`, empty pages build
2. **Layout shell** — `BaseLayout`, Header, Footer, Hero (React)
3. **Content schema** — blog + pages collections migrated
4. **Post migration** — UUID folders → slug files (or redirects)
5. **Home + archive + post** — full Ovidius-like flows
6. **Polish** — SEO, RSS, sitemap, redirects, accessibility pass
7. **Cutover ready** — user sign-off (Phase 3)

---

## Phase 2 — Restructure (Ovidius IA + React/TSX)

### 2.1 Stack changes

Add to `package.json` (via `npx astro add react` or manual):

- `@astrojs/react`
- `react`, `react-dom`
- `@types/react`, `@types/react-dom`

Keep:

- Astro 5, Tailwind v4 (`@tailwindcss/vite`), MDX, RSS, sitemap
- TypeScript strict mode

Evaluate keep vs drop:

| Current (Micro) | Recommendation |
|-----------------|----------------|
| Pagefind search | **Defer** — Ovidius has none; re-add later if needed |
| Dark/light/system theme | **Defer** — Ovidius is light-only; adopt `slate` + `primary` token first |
| Giscus | **Defer** — wire after cutover with your repo |
| Geist fonts | **Replace** — Figtree or similar sans per Ovidius pattern |
| UUID post URLs | **Migrate** — slug-based URLs + redirects from old paths |
| Tags | **Optional** — not in Ovidius; keep only if still wanted |
| Projects collection | **Optional** — add to nav when content exists |
| PDF posts | **Keep** — extend post template for `pdf` frontmatter |

### 2.2 Target information architecture

Mirror Ovidius routing and page roles:

```text
/                     Home: Hero + featured + latest N + Subscribe + CTA
/blog                 Paginated archive (postsPerPage from config)
/blog/[slug]          Full post: meta, feature image, prose, share, read-next
/about, /contact, …   Static pages from `pages` content collection
/rss.xml              Blog (+ projects if retained)
/404                  Not found
```

**Remove or redirect:** `/tags/*` unless explicitly kept.

### 2.3 Target directory layout

```text
src/
├── assets/                    # images (avatar, hero, post feature images)
├── components/
│   ├── react/                 # TSX islands (client:load / client:visible as needed)
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Footer.tsx
│   │   ├── PostPreview.tsx
│   │   ├── FeaturedPostPreview.tsx
│   │   ├── Subscribe.tsx
│   │   ├── SocialLink.tsx
│   │   ├── ReadNextPostPreview.tsx
│   │   └── CustomImage.tsx    # wraps Astro Image or <img>
│   └── astro/                 # thin wrappers if needed (optional)
├── data/
│   └── site-config.ts         # single config (replaces scattered consts)
├── layouts/
│   └── BaseLayout.astro       # slots: header, default, footer
├── pages/
│   ├── index.astro
│   ├── blog/
│   │   ├── [...page].astro    # paginated index
│   │   └── [id].astro         # post detail (slug = id)
│   ├── [...id].astro          # static pages collection
│   ├── rss.xml.js
│   └── 404.astro
├── content/
│   ├── blog/                  # slug.md files (not UUID folders)
│   └── pages/                 # about.md, contact.md, …
├── styles/
│   └── global.css             # @theme tokens: --color-primary, Figtree, prose overrides
├── utils/
│   └── post-utils.ts
├── content.config.ts
└── types.ts
```

### 2.4 Configuration model

Consolidate `src/consts.ts` into `src/data/site-config.ts` (typed via `src/types.ts`):

- Site identity: title, description, logo, default OG image
- `primaryNavLinks`, `secondaryNavLinks`, `socialLinks`
- `hero`: title, text, avatar, backgroundImage
- `subscribe`: enabled, title, text, form action (Mailchimp/Formspree/etc.)
- `postsPerPage` (default `5`)

### 2.5 Content schema migration

**Blog collection** — align with Ovidius:

```ts
{
  title: string
  excerpt?: string
  publishDate: date        // rename from `date`
  updatedDate?: date
  featureImage?: { src, alt, caption? }
  isFeatured?: boolean     // default false
  draft?: boolean
  tags?: string[]          // optional, if kept
  pdf?: string             // keep for whitepaper posts
  seo?: { title?, description?, image?, pageType? }
}
```

**Pages collection** (new):

```ts
{ title, featureImage?, seo? }
```

**Content file migration** (per post):

1. Choose slug (e.g. `digital-commissioning-financing-custom-automation`)
2. Move `src/content/blog/<uuid>/index.md` → `src/content/blog/<slug>.md`
3. Map `date` → `publishDate`; add `excerpt` from `description` or first paragraph
4. Add `featureImage` under `src/assets/images/` when available
5. Mark one post `isFeatured: true` for homepage

### 2.6 React/TSX implementation rules

| Concern | Approach |
|---------|----------|
| **Where React lives** | `src/components/react/*.tsx` |
| **Where Astro lives** | `src/pages/*.astro`, `src/layouts/*.astro` — fetch collections, pass props to React |
| **Hydration** | `client:load` only for Header menu, Subscribe form focus, etc.; prefer static render |
| **Images** | `CustomImage.tsx` accepts `ImageMetadata \| string`; Astro pages pass resolved props |
| **Styling** | Tailwind utility classes in TSX; shared tokens in `global.css` `@theme` |
| **Types** | Shared `src/types.ts`; props interfaces exported from each component |

**Example page pattern:**

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import Hero from '@components/react/Hero';
import { getCollection } from 'astro:content';
// …sort, filter featured/latest…
---
<BaseLayout>
  <Hero client:load {...heroProps} />
  <!-- map posts to <PostPreview /> -->
</BaseLayout>
```

### 2.7 Visual / CSS direction (Ovidius-aligned)

From Ovidius `global.css` patterns:

- **Font:** Figtree Variable (or keep Geist if brand preference — document decision in PR)
- **Primary:** `#02738f` (or brand color for Adam Sokacz — tune in `@theme`)
- **Surfaces:** `bg-white`, `bg-slate-50`, borders `border-slate-100/200`
- **Typography:** `prose prose-slate sm:prose-lg` on article bodies
- **CTAs:** `rounded-full`, `bg-primary`, `hover:shadow-button`
- **Section headings:** uppercase + `after:bg-primary` underline bar
- **Post cards:** XL grid — thumbnail left, text right (`PostPreview` scoped CSS)

### 2.8 URL compatibility

After slug migration, add redirects (Vercel `vercel.json` or Astro redirects):

| Old | New |
|-----|-----|
| `/blog/<uuid>/` | `/blog/<slug>/` (301) |

Preserve existing `.com` → `.ca` host redirects.

### 2.9 Implementation order (recommended)

1. Add React integration + `site-config.ts` + types
2. `BaseLayout.astro` + React Header/Footer
3. `pages` collection + `[...id].astro` (About minimum)
4. Blog schema update + migrate one post as pilot
5. Home page (Hero, featured, latest, Subscribe)
6. Paginated `/blog/[...page].astro`
7. Post detail `[id].astro` + share links + read-next
8. Migrate remaining posts + redirects
9. RSS/sitemap/SEO audit
10. Remove deprecated Astro components (`ArrowCard`, `PageFind`, etc.) when unused

### 2.10 Acceptance criteria (before Phase 3)

- [ ] `npm run build` passes with zero type errors
- [ ] All 5 existing posts reachable at new slugs (old URLs redirect)
- [ ] Homepage shows hero, ≥1 featured post, latest posts, subscribe block
- [ ] `/blog` paginates correctly
- [ ] About (and Contact if desired) render from `pages` collection
- [ ] RSS includes all published posts
- [ ] `site` in `astro.config.mjs` remains `https://adamsokacz.ca`
- [ ] Preview deploy reviewed on mobile + desktop

---

## Phase 3 — Cutover: rebase `main` to the new theme

**Trigger:** Explicit user instruction only (e.g. “rebase main to the new theme” / “merge the redesign to main”). Do not cut over without it.

### 3.1 Pre-cutover checklist

- [ ] Feature branch builds and previews approved
- [ ] Content migration complete
- [ ] Redirects tested
- [ ] No secrets committed in `site-config` (API keys, etc.)

### 3.2 Cutover procedure (rebase onto `main`)

This replaces `main` history with the feature branch tip (linear history, no merge commit):

```bash
# On feature branch, ensure it is current and green
git checkout theme/ovidius-react
git fetch origin
git merge origin/main          # resolve any conflicts; run build
npm run build

# Rebase feature branch onto latest main (optional polish)
git rebase origin/main

# Move main to the new theme (local)
git checkout main
git reset --hard theme/ovidius-react

# Publish (requires force-with-lease — coordinate if others use the repo)
git push origin main --force-with-lease
```

**Alternative (merge, preserves merge commit):**

```bash
git checkout main
git pull origin main
git merge theme/ovidius-react
git push origin main
```

Use **rebase/reset** when the vision calls for a clean single line of history; use **merge** if others have open PRs against `main` and force-push is undesirable.

### 3.3 Post-cutover

1. Confirm Vercel production deploy succeeded
2. Smoke-test: home, blog, one post, about, RSS, old UUID URLs → 301
3. Delete or archive `theme/ovidius-react` after 1–2 weeks (optional)
4. Update root `README.md` (still says Astro Micro today)
5. Open follow-ups: Pagefind, Giscus, dark mode, projects page

### 3.4 Rollback

If production breaks after cutover:

```bash
git checkout main
git reset --hard <last-good-main-sha>
git push origin main --force-with-lease
```

Keep the feature branch until rollback is ruled out.

---

## What we keep from personal-blog (Adam-specific)

- Author identity and bio focus (Industrial AI, automation, finance, MBA)
- Existing post topics and PDF whitepaper support (`pdf` frontmatter)
- Domain: `adamsokacz.ca` + `vercel.json` host redirects
- LinkedIn / GitHub social links (mapped into `site-config`)

## What we adopt from Ovidius (structure, not code copy)

- Central `site-config.ts`
- Hero + featured + latest homepage flow
- Paginated blog index
- `pages` collection for About/Contact/Terms
- Image-forward cards with `featureImage` + `excerpt`
- Subscribe section
- Share links on posts
- `max-w-3xl` / `max-w-6xl` content width rhythm
- Primary color + slate palette + rounded CTAs

## Open decisions (resolve during Phase 2)

| Decision | Options |
|----------|---------|
| Post slugs | Human-readable vs shortened UUID retention |
| Featured post | Which of the 5 is `isFeatured` |
| Newsletter | Disable until provider chosen vs Mailchimp/Formspree URL |
| Tags | Remove routes vs keep parallel to Ovidius IA |
| Font | Figtree (Ovidius) vs Geist (current) |
| Dark mode | Drop vs re-implement after light theme ships |

---

## Agent instructions

When implementing this vision:

1. Work only on `theme/ovidius-react` unless fixing an urgent `main` hotfix.
2. Follow the implementation order in §2.9; do not skip content migration before URL redirects.
3. Prefer React/TSX for new UI; delete replaced `.astro` components when unused.
4. Do **not** push to `main` or run §3.2 until the user explicitly requests cutover.
5. After each milestone, run `npm run build` and note preview URL in PR description.

---

## References

- Current site: `src/consts.ts`, `src/pages/index.astro`, Astro Micro components
- Target IA/CSS patterns: `ovidius-astro-theme/src/data/site-config.ts`, `src/pages/index.astro`, `src/styles/global.css`
- Astro React integration: https://docs.astro.build/en/guides/integrations-guide/react/
