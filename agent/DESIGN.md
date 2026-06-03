# Design Specification — Ovidius Theme (Recreation Target)

Design tokens, layout rules, and component styling extracted from **[ovidius-astro-theme](https://github.com/JustGoodUI/ovidius-astro-theme)** for recreation in **personal-blog** (React/TSX + Astro). This document is visual/UX only; implementation sequencing lives in [VISION.md](./VISION.md).

**Source of truth in reference repo:** `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/*`, `src/pages/*`.

---

## 1. Design principles

| Principle | Manifestation |
|-----------|----------------|
| **Light-only** | White body, slate text; no dark mode |
| **Single accent** | Teal `primary` for links, CTAs, labels, decorative bars |
| **Magazine rhythm** | Narrow prose column (`max-w-3xl`) inside wider image bands (`max-w-6xl`) |
| **Editorial hierarchy** | Uppercase meta lines, bold slate-900 headings, generous vertical spacing |
| **Soft depth** | Ring shadows on avatar/CTAs; glassmorphism on mobile nav |
| **Rounded geometry** | Pills for buttons/inputs; `rounded-md` / `rounded-lg` for images |

---

## 2. Design tokens

### 2.1 Colors

| Token | Value | Tailwind usage |
|-------|--------|----------------|
| **Primary** | `#02738f` | `bg-primary`, `text-primary`, `border-primary`, `after:bg-primary` |
| **Body background** | white | `bg-white` |
| **Alt surface** | slate-50 | `bg-slate-50` (header band, subscribe card, pagination buttons) |
| **Body text** | slate-700 | `text-slate-700` |
| **Headings** | slate-900 | `text-slate-900` |
| **Meta / secondary** | slate-500 | `text-slate-500` |
| **Borders** | slate-100, slate-200 | `border-slate-100`, `border-slate-200` |
| **Border (subtle)** | slate-200/70 | nav item dividers in menu |
| **Placeholder** | slate-500 | `placeholder:text-slate-500` |
| **CTA text** | white | `text-white` on `bg-primary` |
| **Menu panel** | white @ 75% + white/40 border | `bg-white/75`, `border-white/40` |

Define in Tailwind v4 `@theme`:

```css
@theme {
  --font-sans: 'Figtree Variable', sans-serif;
  --color-primary: #02738f;
  --shadow-avatar: 0 0 0 11px --alpha(var(--color-primary) / 15%),
                   0 0 0 22px --alpha(var(--color-primary) / 10%);
  --shadow-button: 0 0 0 6px --alpha(var(--color-primary) / 17.5%);
}
```

### 2.2 Typography

| Role | Font | Notes |
|------|------|--------|
| **UI & prose** | Figtree Variable | `@fontsource-variable/figtree` + italic variant |
| **Rendering** | `antialiased` on `<html>` | `wrap-break-word` on `<html>` |

**Scale (extracted class patterns):**

| Element | Classes |
|---------|---------|
| Site title (no logo) | `text-xl font-bold sm:text-2xl` |
| Hero title | `text-4xl font-bold text-slate-900 sm:text-5xl` |
| Static page H1 | `text-4xl font-bold text-slate-900 sm:text-5xl` |
| Post H1 | `text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl` |
| Featured card H2 | `text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl` |
| Standard card H2 | `text-3xl font-bold text-slate-900` |
| Read-next H3 | `text-2xl font-bold text-slate-900` |
| Section label | `text-sm tracking-wider text-slate-900 uppercase` + underline bar |
| Post meta | `text-sm tracking-wider uppercase text-slate-500` |
| Featured label | `text-primary` within meta line |
| Footer copyright | `text-xs tracking-wider uppercase text-center text-slate-700` |
| Subscribe title | `text-2xl font-bold text-slate-900 sm:text-3xl` |
| Subscribe body | `text-slate-700 sm:text-lg` |
| Hero body | `text-slate-700 sm:text-lg` |
| Share row | `text-sm` → `sm:text-base`; label `font-semibold` |
| Image caption | `text-xs` → `sm:text-sm` on posts; `text-xs` on static pages |
| Pagination label | `text-sm tracking-wider uppercase text-slate-500` |

**Date format:** `en-US`, long month — e.g. `October 12, 2025` (`toLocaleDateString`).

### 2.3 Spacing & layout

**Page shell:**

```
html/body: min-h-screen flex flex-col
main: flex-1, py-12 sm:py-16
horizontal padding: px-4 sm:px-8
```

**Max widths:**

| Container | Class | Use |
|-----------|--------|-----|
| Prose / text | `max-w-3xl mx-auto` | Headings, excerpts, article body, subscribe, footer nav |
| Wide media | `max-w-6xl mx-auto` | Featured images, home featured block |
| Blog list (XL) | `max-w-3xl mx-auto xl:max-w-6xl` | Post preview list |
| Subscribe inner | `max-w-xl` on title/text inside `max-w-3xl` section |

**Vertical rhythm (common gaps):**

| Context | Spacing |
|---------|---------|
| Between post cards | `mb-12 sm:mb-16` |
| Section blocks (home) | `mb-12 sm:mb-16` |
| Featured block bottom border | `mb-12 border-b border-slate-200 sm:mb-16` |
| Post header below meta | `mb-6 sm:mb-8` |
| Feature image vertical | `my-6 sm:my-8 lg:my-12` (post detail) |
| Share below prose | `mt-8 sm:mt-12` |
| Read-next section | `mb-12 sm:mb-16`; heading `mb-8 sm:mb-12` |
| Subscribe margins | `mt-12 sm:mt-16` (home); `my-12 sm:my-16` (blog); `mt-16 mb-12 sm:mt-24 sm:mb-16` (post) |

**Header / footer padding:**

- Header: `py-4 sm:py-6` inside `px-4 sm:px-8`
- Footer: `py-8 sm:py-12` with `px-4 sm:px-8`
- Hero section: `py-12 sm:py-16` with `px-4 sm:px-8`

### 2.4 Borders & radii

| Element | Radius / border |
|---------|-----------------|
| Images (cards, read-next) | `rounded-md` |
| Post detail hero image | `rounded-lg` |
| Buttons, email input | `rounded-full` |
| Social icon buttons | `rounded-full`, `h-11 w-11` |
| Menu toggle | `rounded-full`, `w-10 h-10` |
| Pagination arrows | `rounded-full`, `w-10 h-10` |
| Subscribe card | `rounded-md`, `border border-slate-200` |
| Mobile menu panel | `border-radius: 26px` |
| Avatar | `rounded-full`, `border-2 border-primary` |

### 2.5 Shadows & effects

| Token | CSS | Applied to |
|-------|-----|------------|
| `shadow-avatar` | dual ring, primary @ 15% / 10% | Hero avatar (`w-32`, `aspect-square`) |
| `shadow-button` | 6px ring @ 17.5% primary | Primary buttons, menu toggle hover, social hover |
| Menu panel | `box-shadow: 0 4px 30px rgba(0,0,0,0.1)` | Flyout nav |
| Menu backdrop | `backdrop-filter: blur(5px)` | Flyout nav |
| Hero BG image | `opacity-20`, `object-cover`, full bleed | Behind hero content |

**Transitions (default interaction):** `transition duration-300` on links, buttons, social pills; menu uses custom cubic-bezier (see §7).

---

## 3. Global layout

### 3.1 Base layout

```
┌─────────────────────────────────────────────┐
│ Header (optional bg-slate-50 + border-b)    │
├─────────────────────────────────────────────┤
│ <main class="grow">                         │
│   … page content …                          │
├─────────────────────────────────────────────┤
│ Footer (centered, max-w-3xl inner groups)   │
└─────────────────────────────────────────────┘
```

- **Body:** `bg-white text-slate-700`
- **Default header** (non-home): `bg-slate-50 border-b border-slate-100`
- **Home header band:** wrapper `relative border-b border-slate-100 bg-slate-50` containing Header + Hero

### 3.2 Section heading pattern

Used for “Latest Articles”, “Read Next”, etc.:

```html
<h2 class="after:bg-primary text-sm tracking-wider text-slate-900 uppercase
           after:mt-4 after:block after:h-px after:w-16 after:content-['']">
```

- 16px (`w-16`) primary line below label
- Optional bottom margin on heading: `mb-8 sm:mb-12`

---

## 4. Component specifications

### 4.1 Header

**Structure:** flex row — logo (or site title link) left, nav right.

| Part | Specification |
|------|----------------|
| Container | `flex items-center justify-between gap-6 px-4 py-4 sm:px-8 sm:py-6` |
| Logo | `max-h-12`, eager load |
| Title fallback | `text-xl font-bold sm:text-2xl` → `/` |
| Nav | Single **menu toggle** on all breakpoints (no desktop inline links) |

**Menu toggle button:**

```
w-10 h-10 rounded-full bg-primary text-white
hover:shadow-button
transition-shadow duration-300
z-20 relative
```

Icon: 1×1px white dot; `:before`/`:after` pseudo-elements as flanking dots → animate to X when `.is-active` (see §7).

**Flyout menu (`#menu-items`):**

| Property | Value |
|----------|--------|
| Position | `absolute -top-3 -right-3 z-10` |
| Size | `width: calc(100vw - 0.5rem); max-width: 18.75rem` |
| Padding | `px-8 pt-16 pb-10` → `sm:px-12 sm:pt-20 sm:pb-16` |
| Surface | `bg-white/75`, `border border-white/40`, 26px radius, shadow + blur |
| Items | `text-lg font-bold sm:text-xl`, `text-slate-700 hover:text-slate-500` |
| Item separator | `border-b border-slate-200/70`, `mb-1` |
| Active link | `HeaderNavLink`: `after:` 6px primary dot, absolute right |

### 4.2 Hero

**Background image (optional):** absolute inset-0, `opacity-20`, `pointer-events-none`, responsive `sizes="100vw"`.

**Content:** centered column `max-w-3xl mx-auto text-center`.

| Element | Specification |
|---------|----------------|
| Avatar wrapper | `p-6 mb-6` |
| Avatar | `w-32 aspect-square object-cover rounded-full border-2 border-primary shadow-avatar` |
| Title | Hero H1 scale (§2.2) |
| Text | `text-slate-700 sm:text-lg`, `mt-4` if title present |
| Social row | `flex flex-wrap justify-center gap-x-4 gap-y-3`, `mt-8` if title/text |
| Social pills | `bg-white hover:bg-primary hover:shadow-button text-slate-700 hover:text-white` + SocialLink base |

### 4.3 Social link

```
inline-flex h-11 w-11 items-center justify-center rounded-full
transition duration-300
target="_blank" rel="noopener noreferer"
Icon: w-5 h-5 fill-current overflow-visible
```

**Footer variant:** `hover:bg-primary hover:shadow-button bg-slate-50 text-slate-700 hover:text-white`.

**Supported icons:** arrow-left, arrow-right, bluesky, codepen, dev, facebook, github, instagram, linkedin, mastodon, medium, reddit, x, youtube (SVG assets, `fill-current`).

### 4.4 Primary button (CTA)

Shared pattern for “View All Posts”, “Continue Reading”, Subscribe submit:

```
bg-primary hover:shadow-button
inline-flex items-center justify-center gap-1.5
rounded-full px-8 py-2.5
font-semibold text-white
transition duration-300
```

Subscribe button: full width on mobile (`w-full`), `sm:w-auto`.

### 4.5 Post preview (archive / latest)

**Default (mobile → lg):** stacked — meta, title, image, excerpt.

| Part | Classes |
|------|---------|
| Article | `mb-12 post-card sm:mb-16` |
| Meta | §2.2 meta + optional `Featured` in `text-primary` |
| Title link | `text-3xl font-bold text-slate-900` |
| Thumbnail | `mt-6 mb-6`, `rounded-md`, linked |
| Excerpt | `prose prose-slate sm:prose-lg max-w-none` in `mt-4` |

**XL grid (`min-width: 1280px`):** CSS grid on `.post-card`:

```
grid-template-columns: 1fr 768px 1fr
grid-template-areas:
  'thumbnail header'
  'thumbnail content'
gap-x-8
```

Areas: `post-card-header`, `post-card-thumbnail`, `post-card-content`.

### 4.6 Featured post preview (home)

| Part | Specification |
|------|----------------|
| Header | `max-w-3xl mx-auto`; meta always includes `Featured` in primary |
| Title | Featured H2 scale |
| Image | `max-w-6xl mx-auto my-6 sm:my-8`, full width `rounded-md` |
| Excerpt | `max-w-3xl mx-auto mt-6`, prose |
| CTA | `max-w-3xl mx-auto mt-8`, primary button → post URL |

### 4.7 Post detail

| Zone | Layout |
|------|--------|
| Article wrapper | `max-w-6xl mx-auto mb-12 sm:mb-16` |
| Text header | `max-w-3xl mx-auto mb-6 sm:mb-8` |
| Feature image | full width in wrapper, `rounded-lg`, caption below |
| Body | `max-w-3xl mx-auto` → `prose prose-slate sm:prose-lg max-w-none` |
| Share | flex wrap, links `text-primary hover:text-slate-700` |

### 4.8 Read next

Horizontal card at `sm+`:

```
flex flex-col sm:flex-row gap-x-8 gap-y-6 mb-12
header: grow — meta + h3 (2xl bold)
figure: shrink-0 sm:w-40 — thumbnail rounded-md
```

### 4.9 Subscribe block

```
section: max-w-3xl mx-auto, flex flex-col items-center gap-4
         rounded-md border border-slate-200 bg-slate-50
         px-6 py-8 sm:px-12 sm:py-14 text-center
form: flex flex-col gap-2.5 sm:flex-row w-full max-w-xl
email: h-11 rounded-full border border-slate-200 bg-white px-5 py-2
       focus:outline-hidden
honeypot: position absolute left -5000px
```

### 4.10 Footer

```
footer: px-4 py-8 sm:px-8 sm:py-12
secondary nav: flex wrap justify-center max-w-3xl gap-x-6 gap-y-1
  links: text-slate-700 hover:text-slate-500 transition
social row: same centering, gap-x-4 gap-y-3
copyright: uppercase xs, links underline text-primary hover:no-underline
```

### 4.11 Pagination

```
nav: max-w-3xl pt-12 mx-auto my-12 border-t border-slate-200 sm:my-16 sm:pt-16
inner: relative px-12 text-center
prev/next: absolute left-0 / right-0, vertically centered
  w-10 h-10 rounded-full bg-slate-50 text-slate-700
  hover:bg-primary hover:shadow-button hover:text-white
label: text-sm tracking-wider uppercase text-slate-500
```

### 4.12 Static pages (About, etc.)

- H1: `text-4xl font-bold sm:text-5xl`, header `mb-9`
- Optional feature image: `mb-9`, `rounded-md`
- Body: same prose stack as posts

---

## 5. Prose / article content

**Wrapper:** `prose prose-slate sm:prose-lg max-w-none`

### 5.1 Global prose overrides (`global.css`)

**Links:**

```css
.prose a {
  @apply text-primary underline decoration-1 underline-offset-2 hover:no-underline;
}
```

**Blockquotes:**

| Property | Value |
|----------|--------|
| Layout | centered, no border, `not-italic`, semibold |
| Size | `text-[1.375em] leading-snug` → `sm:text-[1.66667em]` |
| Outdent | `lg:-mx-24 xl:-mx-40` |
| Decor | `:before` — primary bar `h-0.75 w-15`, `mb: 1.375em` |
| Decor | `:after` — primary bar `h-0.75 w-7.5`, `mt: 1.375em` |

### 5.2 Excerpt treatment

Post excerpts render **inside** a prose wrapper (can include HTML/markdown-derived markup), not plain text only.

---

## 6. Imagery

### 6.1 Custom image behavior

- **Optimized:** Astro `Image` when `src` is `ImageMetadata`
- **Static string:** plain `<img>` when `src` is URL string
- **Default loading:** `lazy`; hero/logo may use `eager` + `fetchpriority="high"`

### 6.2 Responsive widths / sizes (reference)

| Context | `widths` | `sizes` |
|---------|----------|---------|
| Hero background | 640–1920 | `100vw` |
| Avatar | 128, 256 | `128px` |
| Card thumbnail | 160–1200 | `(min-width: 1280px) 160px, (min-width: 832px) 768px, calc(100vw - 32px)` |
| Featured home | 480–1600 | `(min-width: 1216px) 1152px, calc(100vw - 32px)` |
| Post detail | 480–1600 | same as featured |
| Read-next thumb | 160–640 | `(min-width: 640px) 160px, calc(100vw - 32px)` |

### 6.3 Logo

`max-h-12` in header.

---

## 7. Motion & interaction

### 7.1 Mobile menu

| State | Behavior |
|-------|----------|
| Closed | `opacity: 0`, `scale(0.6)`, `visibility: hidden`, origin top-right |
| Open (`.is-visible`) | `opacity: 1`, `scale(1)`, `visibility: visible` |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Toggle icon | Three-dot → X via pseudo-elements; `is-active` on icon |

Re-bind on `astro:after-swap` when using view transitions.

### 7.2 Standard hovers

- Text links: color shift (`hover:text-slate-500` or `hover:text-slate-700`)
- Primary surfaces: `hover:shadow-button` (no color change required on filled buttons)
- Footer/theme links: `hover:no-underline` on underlined primary links

### 7.3 View transitions

`ClientRouter` in layout head — preserve header (`transition:persist` not used in Ovidius header, but menu script re-inits after swap).

---

## 8. Responsive breakpoints

Primary Tailwind defaults. Notable **custom** breakpoint:

| Breakpoint | Behavior |
|------------|----------|
| `sm` (640px) | Increased padding, typography steps, horizontal subscribe form |
| `md` (768px) | Featured/post H1 → `text-5xl` |
| `lg` (1024px) | Post detail image margins `lg:my-12`; blockquote negative margin |
| `xl` (1280px) | Post card grid layout; blog list `xl:max-w-6xl` |
| `xl` (1280px) | Blockquote `xl:-mx-40` |

**Navigation:** same hamburger pattern at all viewport sizes.

---

## 9. Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Menu button | `aria-expanded`, `aria-controls="menu-items"`, label toggles Open/Close |
| Primary nav | `aria-label="Primary navigation"` |
| Footer nav | `aria-label="Footer navigation"` |
| Pagination | `aria-label="Pagination"`; prev/next `aria-label` with page numbers |
| Social | `aria-label` per link (text prop) |
| Blog index | `h1.sr-only` “Blog” |
| Subscribe email | `aria-label="Email address"` |
| Honeypot | `aria-hidden="true"`, `tabindex="-1"` |
| Dates | `<time datetime={ISO}>` |

---

## 10. Meta & editorial labels

**Featured label:** `Featured` in `text-primary`, followed by ` / ` then date.

**Updated date:** `(Updated on {date})` appended in meta line, same `text-sm` block.

**Share row prefix:** `Share:` in `font-semibold`.

---

## 11. What to adapt for personal-blog (not copy verbatim)

| Ovidius default | personal-blog adaptation |
|-----------------|---------------------------|
| Primary `#02738f` | Keep or re-tune to brand (document final hex in PR) |
| Figtree font | Acceptable default; Geist optional if brand requires |
| Footer “Created with Ovidius theme” | Remove; use Adam Sokacz copyright only |
| Demo hero copy / avatar | Replace with `site-config` content |
| Mailchimp subscribe URL | Replace or disable until provider chosen |
| GPL demo images | New assets under `src/assets/` |
| Share link set | Keep platforms relevant to author (e.g. LinkedIn over Facebook) |

---

## 12. Component → React mapping checklist

When implementing in TSX, each row in §4 should map 1:1 to a component with props for variants (e.g. `SocialLink` `variant: 'hero' | 'footer'`).

| Reference component | Recreation target |
|--------------------|-------------------|
| `Header.astro` + scoped CSS | `Header.tsx` + CSS module or Tailwind `@layer` |
| `Hero.astro` | `Hero.tsx` |
| `Footer.astro` | `Footer.tsx` |
| `PostPreview.astro` + grid CSS | `PostPreview.tsx` |
| `FeaturedPostPreview.astro` | `FeaturedPostPreview.tsx` |
| `ReadNextPostPreview.astro` | `ReadNextPostPreview.tsx` |
| `Subscribe.astro` | `Subscribe.tsx` |
| `SocialLink.astro` + `Icon.astro` | `SocialLink.tsx` + icon map |
| `CustomImage.astro` | `CustomImage.tsx` (or Astro wrapper feeding React) |
| `HeaderNavLink.astro` | `HeaderNavLink.tsx` (active state from pathname) |
| `FormattedDate.astro` | `FormattedDate.tsx` |
| `global.css` `@theme` + prose | `src/styles/global.css` (shared) |

---

## 13. Verification checklist

Before marking design parity complete:

- [ ] Primary color and shadow tokens match §2.1
- [ ] Figtree (or documented alternative) loads with preload
- [ ] Home: slate-50 header band, hero, featured, latest, CTA, subscribe
- [ ] Post card grid activates at 1280px
- [ ] Mobile menu animation matches §7.1
- [ ] Prose links and blockquotes match §5.1
- [ ] All heading scales match §2.2 per page type
- [ ] No dark-mode styles present
- [ ] Lighthouse: contrast acceptable on primary/white and slate-700/white

---

## References

- Ovidius source: `/ovidius-astro-theme/src/`
- Implementation plan: [VISION.md](./VISION.md)
