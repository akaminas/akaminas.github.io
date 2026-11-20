# Building a Professional Researcher Website with Astro + GitHub Pages

A complete, abstract reference for designing, building, and operating a personal
academic/research profile site. It's not a spec of any one specific site — it's a
general recipe covering everything from information architecture down to DNS records,
so that following it end-to-end produces a finished, deployed, maintainable site.

**How to use this guide:** read sections 1–4 before writing any code (they shape every
later decision); use sections 5–15 as an implementation reference while building;
use sections 16–19 at launch time and beyond.

---

## Table of contents

1. Define goals and audience
2. Information architecture
3. Content modeling (data, not markup)
4. Visual design system
5. Accessibility
6. Project setup
7. Astro project structure and conventions
8. SEO and discoverability
9. Performance
10. The CV: HTML + PDF
11. Analytics and privacy
12. Domain and DNS
13. GitHub repository setup
14. GitHub Actions CI/CD
15. Testing and QA
16. Pre-launch checklist
17. Post-launch maintenance
18. Troubleshooting common issues
19. Appendix: reference snippets

---

## 1. Define goals and audience

Before any design or code, write down (even just to yourself) what this site is *for*.
A researcher site typically serves some subset of these jobs — be explicit about which
ones apply to you, because they drive every later tradeoff:

- **Credibility at a glance.** A visitor — a hiring committee member, a journalist, a
  prospective student, a conference organizer — should understand who you are and what
  you work on within seconds of landing on the page.
- **A canonical, linkable record.** The thing you put in an email signature, a grant
  application, or a conference bio instead of a stale PDF attachment or a LinkedIn URL.
- **Publication discoverability.** Many visitors arrive from a Google Scholar link or a
  paper's author-affiliation footer, not your homepage — every page should stand
  reasonably on its own, not assume the visitor started at `/`.
- **Low maintenance cost.** You will update this rarely (new paper, new position, new
  talk) and usually under time pressure. The site must be editable in minutes, not
  hours, and the update workflow must still make sense to you a year from now.
- **Longevity and independence.** No subscription, no vendor lock-in, no dependency on
  a service that might shut down or paywall a feature. Plain files you could still read
  and rebuild in twenty years.
- **Fast, everywhere.** Visitors may be on a conference-venue wifi network or a phone.
  The site should not test that connection's patience.

**Audience.** Write for three overlapping readers: (1) a non-specialist skimmer
deciding in 10 seconds whether to keep reading, (2) a specialist peer evaluating your
work in detail, and (3) a search engine / citation tool trying to parse who you are and
what you've published. Section 3 and 8 address the third reader directly.

These goals argue strongly for a **static site**: no database, no CMS login, no
server to patch. Content lives as text/markdown/data files in the repo, and the whole
site rebuilds and redeploys automatically on every push.

---

## 2. Information architecture

Most credible researcher sites converge on a similar structure. Treat this as a menu —
include the pages that are true of you and skip the rest. Resist adding pages "just in
case"; an empty or stale page hurts credibility more than a missing one.

| Page | Purpose | Priority |
|---|---|---|
| **Home / About** | Who you are, field, affiliation, current focus — the 10-second read | Required |
| **Research / Interests** | The questions/themes you work on, for an educated non-specialist | Strongly recommended |
| **Publications** | Structured list: title, authors, venue, year, links | Required |
| **CV** | HTML rendering and/or downloadable PDF | Strongly recommended |
| **Projects / Software** | Repos, tools, datasets you maintain | If applicable |
| **Talks / Teaching** | Slides, recordings, course pages | If applicable |
| **News / Updates** | Short dated entries: "paper accepted," "joined X" | Optional |
| **Contact** | Email + the 1–2 professional links that matter | Required |
| **404** | Friendly not-found page with a way back to Home | Required |

Navigation guidance:

- Keep the top-level nav to 4–6 items. A researcher site is reference material, not a
  marketing funnel — favor a flat structure over nested dropdown menus.
- Every page should link back to Home and expose the same nav, so a visitor who lands
  on `/publications/` from Google Scholar can still explore the rest of the site.
- Put Contact information in the footer of every page, not only on a dedicated page —
  people don't want to hunt for your email.
- Consider whether "News" is worth the maintenance burden. A stale "Latest updates"
  section with a last entry from three years ago is worse than not having one — if you
  won't keep it updated, cut it entirely.
- Decide early whether you want a blog/long-form-writing section. It's a different
  commitment (regular writing) from a profile site (occasional updates) — don't add a
  blog page that will sit empty.

A minimal, complete sitemap:

```
/                  Home / About
/research/         Research interests
/publications/     Publication list
/cv/               CV (HTML), links to /cv.pdf
/contact/          Contact + links
/404               Not found
```

---

## 3. Content modeling (data, not markup)

The single highest-leverage decision for long-term maintainability: **model
publications, talks, and projects as structured data, not hand-written HTML.** Adding a
paper should be a one-entry diff in a data file, never editing markup.

### 3.1 Astro Content Collections (recommended)

Astro's [Content Collections](https://docs.astro.build/en/guides/content-collections/)
give you a typed, validated schema for structured content, defined once in
`src/content/config.ts` (or `src/content.config.ts` in newer Astro versions):

```ts
import { defineCollection, z } from 'astro:content';

const publications = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number().int(),
    type: z.enum(['journal', 'conference', 'preprint', 'thesis']),
    links: z.object({
      pdf: z.string().url().optional(),
      doi: z.string().url().optional(),
      arxiv: z.string().url().optional(),
      code: z.string().url().optional(),
      slides: z.string().url().optional(),
    }).optional(),
    abstract: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { publications };
```

Entries live as individual data files (JSON or YAML) under
`src/content/publications/*.json`, one per publication, or as a single array — either
works; individual files diff more cleanly in git and are easier to reorder.

Benefits of this approach over hand-rolled JSON:

- Build-time validation — a malformed entry fails the build with a clear error instead
  of silently rendering broken HTML.
- Type-safe access in `.astro` files via `getCollection('publications')`.
- Easy to sort, filter (e.g., `featured` for the homepage), and group by year/type.

### 3.2 Plain JSON (simpler alternative)

If Content Collections feel like overkill, a flat JSON file works fine for a small
publication list:

```json
[
  {
    "title": "Paper title",
    "authors": ["A. Author", "B. Author"],
    "venue": "Journal or Conference Name",
    "year": 2026,
    "type": "journal",
    "links": { "pdf": "/papers/foo.pdf", "doi": "https://doi.org/10.xxxx/xxxx" }
  }
]
```

Import it directly in the page (`import publications from '../data/publications.json'`)
and render with a loop, sorted by `year` descending. You lose schema validation but gain
simplicity — reasonable for under ~30 entries that one person maintains.

### 3.3 BibTeX as source of truth (advanced, optional)

If you already maintain a `.bib` file (common if you use LaTeX/Overleaf), consider
generating the JSON/YAML data file from BibTeX at build time (via a small Node script
or a library like `bibtex-parse`) rather than maintaining two parallel lists that can
drift out of sync. This is worth doing only if you update `.bib` more often than you'd
update a hand-written data file — otherwise it's an extra moving part for no benefit.

### 3.4 Sorting, grouping, and featured items

- Sort publications by year descending, then by whatever secondary order you prefer
  (e.g., alphabetical by first author within a year).
- Group by year with a heading per year if the list is long (>15 entries); a flat list
  is fine for fewer.
- A `featured: true` flag lets the homepage show your 2–3 most important papers without
  duplicating data.
- Consider a `type` field (journal / conference / preprint / thesis / dataset) if your
  field distinguishes these — some hiring committees care about this distinction.

### 3.5 CV content

If you render an HTML version of the CV (not just a PDF), model it as data too:
education, positions, grants, and awards as arrays of `{ title, org, start, end,
detail }` objects, rendered through a shared timeline component. This keeps the HTML
CV and the PDF CV generatable from the same source if you later automate PDF
generation (see §10).

---

## 4. Visual design system

Treat this as a small design system, not a one-off page. Define tokens once, reuse
everywhere. A researcher site does not need a novel visual identity — it needs
restraint, consistency, and legibility.

### 4.1 Typography

- **Pick one typeface family for body text**, either a well-hinted system/sans font
  (e.g., a modern system-font stack) or a single serif for a more "academic paper" feel.
  Avoid mixing more than two families (one for body, optionally one distinct one for
  headings).
- **Type scale**: define a small fixed set of sizes rather than ad hoc values, e.g.
  a ratio-based scale (12 / 14 / 16 / 20 / 24 / 32 / 40px, or the `rem` equivalents).
  Body text should sit at 16–18px minimum.
- **Line-height**: 1.5–1.7 for body copy, tighter (1.1–1.3) for large headings.
- **Line length**: constrain body text to ~60–75 characters per line (roughly a
  `max-width` of 65–75ch on the content column) — this is the single biggest factor in
  perceived readability of a text-heavy site.
- **Font loading**: prefer **self-hosted, subsetted** `woff2` files over a third-party
  CDN (avoids an external request, works offline, no dependency on that CDN's
  uptime). Use `font-display: swap` (or `optional` if you want zero layout shift at the
  cost of sometimes showing the fallback font) so text is never invisible while fonts
  load. If you do use Google Fonts, self-host by downloading the files rather than
  linking `fonts.googleapis.com`, both for performance and because linking pings Google
  on every visit.
- **Numerals**: if your field involves a lot of numbers/dates/statistics, check that
  your chosen font has legible, non-ambiguous digits (0 vs O, 1 vs l).

### 4.2 Color

- **Two or three colors total**: a background, a body-text color, and one accent color
  used sparingly (links, active nav item, headings). Avoid gradients, drop shadows, and
  decorative color blocks.
- **Contrast**: body text against background must meet **WCAG AA** — a contrast ratio
  of at least 4.5:1 for normal text, 3:1 for large text (≥24px or ≥19px bold). Check
  with a contrast checker (browser devtools has one built into the color picker) before
  finalizing any palette.
- **Define colors as CSS custom properties** (`--color-bg`, `--color-text`,
  `--color-accent`, `--color-muted`) on `:root` so they're reusable and themeable:

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-muted: #5c5c5c;
  --color-accent: #1d4ed8;
  --color-border: #e5e5e5;
}
```

- **Dark mode** (optional, only add if you'll maintain it): redefine the same tokens
  under `@media (prefers-color-scheme: dark)`, and re-check contrast ratios
  independently for the dark palette — colors that pass AA on white often fail on
  near-black and vice versa.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f1115;
    --color-text: #e8e8e8;
    --color-muted: #a0a0a0;
    --color-accent: #7aa2f7;
    --color-border: #2a2d34;
  }
}
```

### 4.3 Spacing and layout

- Use a consistent spacing scale (e.g., multiples of 4px or 8px: 4, 8, 12, 16, 24, 32,
  48, 64) for margins/padding instead of arbitrary pixel values — this alone makes a
  layout look "designed" rather than assembled ad hoc.
- **Whitespace over borders**: separate sections with vertical spacing, not boxes,
  card shadows, or horizontal rules everywhere. Use a rule sparingly, e.g. in a footer.
- **Single reading column**: a `max-width` container (e.g., 640–800px for text-heavy
  pages) centered on the page. You rarely need a multi-column grid on a profile site
  outside of things like a publication-year layout or an image gallery.
- **Consistent vertical rhythm**: headings and paragraphs should share a predictable
  spacing pattern across all pages, not be tuned per-page.

### 4.4 Imagery

- A professional headshot on the home/about page is common and helpful for
  recognizability at conferences — optional but recommended.
- Avoid stock photography and decorative illustration; if you include images beyond a
  headshot, prefer your own research figures/diagrams.
- Serve images in modern formats (AVIF/WebP with a fallback) at appropriate
  resolutions — see §9 on Astro's built-in `<Image />` component, which handles this
  automatically.

### 4.5 Iconography and motion

- If you use icons (external-link indicator, social links), pick **one** icon set and
  use it consistently — inline SVG, sized to match the surrounding text's line-height.
- **Motion policy**: default to none. If you add any transition (e.g., a hover
  underline), keep it under ~150ms and respect
  `@media (prefers-reduced-motion: reduce)` by disabling non-essential animation for
  users who've opted out at the OS level.
- Avoid client-side page-transition libraries, scroll-triggered animations, and
  parallax — they add JS weight and rarely help a reference-style site.

### 4.6 A one-line design philosophy to hold yourself to

If you want a gut-check while designing any new page or component, ask: *"Would a
skeptical reader trust this page more or less because of this visual choice?"*
Whitespace, one accent color, and fast load times consistently answer "more." Novel
layouts, animation, and decorative color rarely do, on this particular genre of site.

---

## 5. Accessibility

Accessibility is not a separate pass at the end — bake it in as you build.

- **Semantic HTML first**: use `<nav>`, `<main>`, `<header>`, `<footer>`, `<article>`,
  and a single, correctly nested heading hierarchy (`h1` once per page, then `h2`,
  `h3`, … without skipping levels). Screen reader users navigate by heading structure.
- **Landmark roles**: semantic elements above give you these for free — avoid `<div>`
  soup where a semantic tag exists.
- **Alt text**: every meaningful image needs descriptive `alt` text; purely decorative
  images should have `alt=""` (empty, not omitted) so screen readers skip them.
- **Link text**: avoid "click here" / "read more" with no context — link text should
  make sense read in isolation (important for screen-reader users who navigate by a
  list of links).
- **Keyboard navigation**: every interactive element (nav links, external links,
  any toggle like a dark-mode switch) must be reachable and operable via Tab/Enter
  alone. Test by unplugging your mouse for five minutes.
- **Focus states**: never remove `:focus` outlines with `outline: none` unless you
  replace them with an equally visible custom focus style. This is one of the most
  common accessibility regressions in hand-styled sites.
- **Color is never the only signal**: e.g., a "featured" publication shouldn't be
  distinguished by color alone — add a label or icon too.
- **Contrast**: covered in §4.2 — re-verify after any palette tweak.
- **Reduced motion**: covered in §4.6.
- **PDF accessibility**: if your CV/papers are PDFs, ideally export with a tagged
  structure (most modern LaTeX/Word exporters do this reasonably) so screen readers
  can parse them.
- **Testing tools**: run [axe DevTools](https://www.deque.com/axe/devtools/) or Chrome
  Lighthouse's Accessibility audit on every page before launch, and periodically after.
  Both are free browser extensions/built-ins and catch the majority of common issues
  automatically (though manual keyboard/screen-reader spot checks still matter).

---

## 6. Project setup

### 6.1 Prerequisites

- **Node.js**: use an LTS version (Node 20 or 22 as of this writing). Astro's
  `engines` field in `package.json` should pin a minimum version so contributors (or
  future you) don't hit surprising incompatibilities.
- **Package manager**: `npm` is the safest default (no extra install step, works
  everywhere CI does). `pnpm` is a fine alternative if you already use it elsewhere and
  want faster installs/disk usage — just be consistent between local dev and CI.
- **Editor tooling**: install the official Astro VS Code extension for syntax
  highlighting and type-checking inside `.astro` files.

### 6.2 Scaffold

```bash
npm create astro@latest
# choose: "Empty" or minimal template
# TypeScript: Strict (recommended — catches data-shape bugs in content collections)
# Install dependencies: yes
# Initialize git repo: yes (or skip if you'll init manually, see §13)
```

### 6.3 Recommended integrations

```bash
npx astro add sitemap     # generates sitemap.xml automatically at build time
```

Optional, add only if needed:

```bash
npx astro add mdx         # if you want a blog/long-form section in Markdown+JSX
npx astro add rss         # if you add a News/blog section and want a feed
```

Don't add integrations speculatively — every dependency is something to keep updated.

### 6.4 Linting and formatting (recommended)

- **Prettier** with the official `prettier-plugin-astro` for consistent formatting of
  `.astro` files.
- **ESLint** (optional for a small static site, but useful if you'll have any
  non-trivial TypeScript logic) with `eslint-plugin-astro`.
- An `.editorconfig` file to keep indentation/line-ending settings consistent across
  editors/contributors.

```
# .editorconfig
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

### 6.5 TypeScript configuration

Use Astro's strictest preset in `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

This catches mistakes in content-collection schema usage and component props at build
time rather than at runtime in a visitor's browser.

---

## 7. Astro project structure and conventions

Recommended baseline layout:

```
src/
  layouts/
    BaseLayout.astro        # <html>, <head>, nav, footer — shared page shell
  pages/
    index.astro              # Home / About
    research.astro
    publications.astro
    cv.astro
    contact.astro
    404.astro
  components/
    Nav.astro
    Footer.astro
    PublicationList.astro
    PublicationEntry.astro
  content/
    config.ts                 # content collection schemas
    publications/
      2026-paper-slug.json
      2025-paper-slug.json
  data/                        # non-collection structured data (if not using collections)
  styles/
    global.css                 # design tokens, resets, base typography
public/
  cv.pdf
  favicon.svg
  favicon-32.png
  apple-touch-icon.png
  og-image.png
  robots.txt
  CNAME                        # only if using a custom domain, see §12
astro.config.mjs
package.json
tsconfig.json
.github/
  workflows/
    deploy.yml
```

Conventions worth adopting:

- **One layout, composed pages.** A single `BaseLayout.astro` handles `<head>`,
  metadata, nav, and footer; every page wraps its content in it. Avoid duplicating the
  `<head>` boilerplate per page.
- **Props for metadata.** Pass `title` and `description` into `BaseLayout` as props
  per page so each page gets correct, unique `<title>` and meta description tags (see
  §8) without repeating the `<head>` markup.
- **Components stay dumb.** Presentation components (`PublicationEntry.astro`) take
  data as props; they don't fetch or import content collections themselves — keeps them
  reusable and testable in isolation.
- **No unused client-side JS.** Astro ships zero JS for `.astro` components by default;
  only reach for a framework island (`client:load`, etc.) if you have genuine
  client-side interactivity (e.g., a filter/search box on the publication list). Most
  researcher sites need none.

### 7.1 `astro.config.mjs` for a GitHub Pages user site

A **user site** (`<username>.github.io`, deployed from that exact repo name) is served
from the domain root, so no `base` path is needed:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://<username>.github.io',
  trailingSlash: 'always',
  build: {
    format: 'directory',       // /publications/ instead of /publications.html
    inlineStylesheets: 'auto', // inline small stylesheets, reduces requests
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
    }),
  ],
  prefetch: false, // opt out of default link prefetching if you want minimal JS/network use
});
```

A **project site** (any other repo, served at `<username>.github.io/<repo>/`) needs a
`base` path too:

```js
export default defineConfig({
  site: 'https://<username>.github.io',
  base: '/<repo-name>',
  // ...
});
```

Forgetting `base` on a project site is the single most common cause of a GitHub Pages
Astro deploy that "builds fine but shows a blank page" — see §18.

### 7.2 Images

Use Astro's built-in `<Image />` / `<Picture />` components (from `astro:assets`)
instead of raw `<img>` tags for any image bundled in the repo. They automatically:

- resize to the dimensions you request,
- convert to modern formats (WebP/AVIF) with fallbacks,
- infer `width`/`height` to prevent layout shift,
- and lazy-load below-the-fold images by default.

```astro
---
import { Image } from 'astro:assets';
import headshot from '../assets/headshot.jpg';
---
<Image src={headshot} alt="Portrait of [Name]" width={320} height={320} />
```

Requires the `sharp` package (installed automatically as a peer dependency in recent
Astro versions) for the build-time processing to work.

### 7.3 Favicons and app icons

Provide a full icon set, not just a single `favicon.ico`:

- `favicon.svg` — modern browsers, scales cleanly.
- `favicon-32.png`, `favicon-16.png` — fallback for browsers without SVG favicon
  support.
- `apple-touch-icon.png` (180×180) — iOS home-screen bookmark icon.
- Reference them all in `BaseLayout.astro`'s `<head>`; a generator like
  [RealFaviconGenerator](https://realfavicongenerator.net/) can produce the full set
  and the exact `<link>` tags from one source image if you don't want to hand-build
  each size.

---

## 8. SEO and discoverability

A researcher site's most important "SEO" is really just: be crawlable, be correctly
described, and be linked from the places people already look (ORCID, Google Scholar,
your institution's directory page).

### 8.1 Per-page metadata

Every page needs a unique, accurate `<title>` and meta description — never a single
generic title reused site-wide:

```astro
<title>{title} — [Your Name]</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalUrl} />
```

### 8.2 Open Graph and Twitter Card tags

So links shared on social platforms/Slack/email render a proper preview card:

```html
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content="https://<username>.github.io/og-image.png" />
<meta property="og:url" content={canonicalUrl} />
<meta name="twitter:card" content="summary_large_image" />
```

Create one static `og-image.png` (1200×630px) for site-wide use — a simple design with
your name and field is enough; you don't need a per-page dynamic image generator for a
site this size.

### 8.3 Structured data (JSON-LD)

Add a `Person` schema on the homepage so search engines and knowledge panels can parse
your identity correctly:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "url": "https://<username>.github.io/",
  "sameAs": [
    "https://orcid.org/0000-0000-0000-0000",
    "https://scholar.google.com/citations?user=XXXXXXX",
    "https://github.com/<username>"
  ],
  "jobTitle": "Your title",
  "affiliation": {
    "@type": "Organization",
    "name": "Your institution"
  }
}
</script>
```

Optionally add `ScholarlyArticle` structured data per publication if you want richer
indexing — usually not worth the maintenance overhead for a small personal list;
`Person` alone covers the main benefit.

### 8.4 Sitemap and robots.txt

- `@astrojs/sitemap` (added in §6.3) generates `sitemap.xml` automatically at build
  time from your routes — no manual maintenance.
- Add a minimal `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://<username>.github.io/sitemap-index.xml
```

### 8.5 Canonical identifiers

Link out to (and from) the identifiers that matter in your field:

- **ORCID** — the closest thing to a universal researcher ID; link it prominently.
- **Google Scholar profile** — where most citation tracking happens; keep it synced.
- **Institutional profile page**, if one exists — often what people find first via
  search, so make sure it links back to your site.
- **DOI links** on every publication entry, not just a PDF — DOIs are stable, PDFs
  move or 404.

### 8.6 Search Console

After launch, submit the site to [Google Search Console](https://search.google.com/search-console)
and verify ownership (a DNS TXT record or an HTML file works fine for a static site).
This isn't required for indexing but gives you visibility into crawl errors and search
queries that land people on your site.

---

## 9. Performance

A static Astro site with minimal JS should score near-perfectly on Core Web Vitals by
default — the goal here is to not undo that default through unnecessary additions.

- **Ship near-zero JavaScript.** Don't add a JS framework, animation library, or
  analytics script unless it earns its weight. Every KB of JS costs parse/execute time
  on a visitor's phone.
- **Fonts**: self-host, subset to the character set you actually use (especially if
  using a serif with many weights — only ship the weights you use), `font-display:
  swap`.
- **Images**: use `astro:assets` (see §7.2) so every image is correctly sized and
  served in a modern format — don't drop a 4000px-wide photo straight from your camera
  into `public/`.
- **Inline critical CSS**: Astro's `inlineStylesheets: 'auto'` config (see §7.1)
  inlines small stylesheets automatically, avoiding a render-blocking request for tiny
  pages.
- **Avoid render-blocking third-party scripts** — if you add analytics (§11), load it
  `async`/`defer` and prefer a script that's a few KB, not a full tag-manager bundle.
- **Core Web Vitals targets** to check against in Lighthouse/PageSpeed Insights:
  - LCP (Largest Contentful Paint) < 2.5s
  - CLS (Cumulative Layout Shift) < 0.1
  - INP (Interaction to Next Paint) < 200ms
  A static, low-JS Astro site typically clears all three by a wide margin without
  special effort — if it doesn't, the likely culprit is an unoptimized image or an
  added third-party script.
- **Lighthouse CI (optional)**: add a GitHub Action step that runs Lighthouse against
  the built site on every PR and fails/warns if scores regress below a threshold. Only
  worth adding once the site is established and you want a regression guardrail.

---

## 10. The CV: HTML + PDF

Offer both formats — they serve different purposes:

- **HTML version** (`/cv/`): fast to skim, always up to date with the rest of the
  site, indexable by search engines, works on any device without a download.
- **PDF version** (`/cv.pdf`, linked prominently from the HTML page): what people
  actually want to download, print, or attach to an application form. Many
  institutional/grant systems require a PDF upload specifically.

Practical approaches, roughly in order of effort:

1. **Manually maintained PDF** (simplest): write/export the CV in LaTeX, Word, or
   Google Docs as you normally would, export to PDF, drop it in `public/cv.pdf`. Model
   the same content as structured data (§3.5) for the HTML version, accepting that
   you'll update both by hand when the CV changes. Fine for most people — CVs don't
   change *that* often.
2. **Print stylesheet on the HTML page**: add a `@media print` stylesheet to the HTML
   CV page so "Print to PDF" from the browser produces a clean, ink-friendly PDF
   without nav/footer clutter — removes the need to maintain a separate PDF file at all
   for some use cases, though a LaTeX-typeset PDF usually still looks more polished for
   formal submissions.
3. **Automated PDF generation from the same data** (advanced, optional): a build step
   that renders the CV data into a PDF (e.g., via a headless-browser print, or a
   templating tool) so the PDF and HTML page can never drift out of sync. Only worth
   the complexity if you update your CV frequently enough that manual double-editing
   becomes a real burden.

Print stylesheet example for a hand-rolled "print to PDF" flow:

```css
@media print {
  nav, footer, .no-print { display: none; }
  body { font-size: 11pt; color: #000; }
  a { color: #000; text-decoration: none; }
  a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 9pt; }
}
```

Version the CV filename or add a "last updated" date visibly on the CV page, so
someone who saved an old copy can tell it's stale.

---

## 11. Analytics and privacy

Decide deliberately rather than defaulting to "add Google Analytics":

- **Consider skipping analytics entirely.** For a low-traffic profile site, GitHub's
  built-in repo traffic graphs (Insights → Traffic, 14-day rolling window) or referral
  logs from Google Search Console may tell you everything useful, with zero JS shipped
  and zero privacy consideration needed.
- **If you want analytics**, prefer a privacy-respecting, cookieless option (e.g., a
  self-hosted or EU-hosted analytics tool that doesn't set tracking cookies or collect
  personal data) — this typically means you don't need a cookie-consent banner, which
  itself is a UX and legal-complexity cost worth avoiding.
- **Avoid full tag-manager scripts** (large JS payload, third-party request waterfall)
  in favor of a single small async snippet if you do add tracking.
- **No dark patterns**: don't add anything that tracks visitors more than the minimum
  needed to answer "is anyone reading this."
- **If you do collect any analytics data**, a one-line privacy note in the footer or a
  short `/privacy` page is good practice, even if not strictly legally required for a
  personal academic site — it costs little and signals good faith.

---

## 12. Domain and DNS

### 12.1 GitHub's default domain (no setup required)

A **user site** repo named exactly `<username>.github.io` is automatically served at
`https://<username>.github.io/` once Pages is enabled — no DNS work needed, HTTPS is
automatic and free via GitHub's certificate.

### 12.2 Custom domain (optional)

If you own a domain (e.g., `yourname.com` or `yourname.academic.org`):

1. Add a `public/CNAME` file containing exactly the domain, e.g.:
   ```
   yourname.com
   ```
   (GitHub Actions' Pages deploy step will publish this file as-is; it must exist with
   no trailing content beyond the domain.)
2. Configure DNS at your registrar:
   - For an **apex domain** (`yourname.com`): four `A` records pointing to GitHub
     Pages' IPs (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`), plus
     optionally an `AAAA` set for IPv6.
   - For a **subdomain** (`www.yourname.com` or `research.yourname.com`): a `CNAME`
     record pointing to `<username>.github.io`.
3. In the repo's Settings → Pages, enter the custom domain and enable **Enforce
   HTTPS** once GitHub finishes issuing the certificate (can take up to ~24h after DNS
   propagates).
4. Update `site` in `astro.config.mjs` to the new domain so canonical URLs, the
   sitemap, and OG tags are all correct.
5. Keep the `CNAME` file — GitHub Pages deploys will otherwise reset the custom domain
   setting on the next deploy if it's removed from the repo.

### 12.3 Redirects

If you migrate from an old URL (old personal site, old university page), a static
`<meta http-equiv="refresh">` redirect page or a simple redirect rule at the old host
(if you control it) preserves any inbound links/citations pointing at the old address.
GitHub Pages itself has no server-side redirect config — handle redirects at the DNS/
old-host level, or via a client-side redirect page as a last resort.

---

## 13. GitHub repository setup

- **Repo name**: for a user site, must be exactly `<username>.github.io` (case
  doesn't matter, but conventionally lowercase). For a project site, any name — the
  site is then served at `<username>.github.io/<repo>/`.
- **Default branch**: `main`.
- **`.gitignore`**: at minimum `node_modules/`, `dist/`, `.astro/`, and any `.env`
  file — Astro's scaffold generates a reasonable default; verify it before your first
  commit so `node_modules` never gets committed.
- **`LICENSE`**: pick one deliberately. Code-only licenses (MIT) are common, but note
  that a license on the *code* doesn't automatically cover your *content* (CV,
  writing, photos) — consider whether you want a separate statement about content
  reuse (e.g., "text and code MIT-licensed; photos and papers are not").
- **`README.md`**: short — what the site is, how to run it locally (`npm install &&
  npm run dev`), how to build (`npm run build`), and a one-line note on the deploy
  process (pushes to `main` auto-deploy via GitHub Actions). This is for future-you as
  much as for anyone else.
- **Branch protection** (optional, mainly useful if others will ever contribute):
  require the build to pass before merging to `main` if you set up a PR-based
  workflow rather than pushing directly.
- **Issues/Discussions**: usually unnecessary to enable for a personal site; leave
  disabled unless you have a specific reason (e.g., accepting corrections from
  readers).

---

## 14. GitHub Actions CI/CD

### 14.1 Enable Pages

In the repo's **Settings → Pages**, set **Source: GitHub Actions** (not the legacy
"Deploy from a branch" option — the Actions-based flow is what the workflow below
targets, and it's what lets the build step run `astro build` rather than serving raw
source).

### 14.2 The deploy workflow

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v7
      - name: Install, build and upload site
        uses: withastro/action@v6
        with:
          node-version: 22
          package-manager: npm@latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

Notes:

- `withastro/action` handles install + `astro build` + uploading the Pages build
  artifact in one step — you don't need to hand-roll `npm ci`, `npm run build`, and
  `actions/upload-pages-artifact` separately.
- The three `permissions` entries are the minimum GitHub Pages' OIDC-based deploy
  requires; omitting any of them causes the deploy step to fail with a permissions
  error.
- `concurrency` with `cancel-in-progress: true` prevents two deploys racing if you push
  twice in quick succession.
- `workflow_dispatch` lets you manually re-trigger a deploy from the Actions tab
  (useful if a deploy failed transiently, or you want to redeploy without an empty
  commit).
- Every push to `main` redeploys automatically — there is no separate "publish" step
  or manual trigger needed in normal operation.
- Pin action versions (`@v7`, `@v6`, `@v5` above) rather than `@main`/`@latest`, and
  update them deliberately (Dependabot, see §17, can automate the bump).

### 14.3 Optional CI additions

Add these as separate jobs/steps once the core deploy is solid — don't front-load them
before the site exists:

- **Type/content check**: run `astro check` (validates TypeScript and content
  collection schemas) as a required step before build, so a malformed publication
  entry fails CI loudly instead of silently breaking the live site.
- **Link checking**: a broken-link checker (e.g., `lychee` or a similar action) run
  periodically (weekly cron) against the built site to catch link rot in publication
  PDFs/DOIs over time.
- **Lighthouse CI**: run against the built `dist/` output on PRs to catch performance
  or accessibility regressions before merge (see §9).
- **Preview deploys on PRs**: if you start accepting PRs (e.g., from a co-author fixing
  a typo), a preview-deploy action (e.g., to a PR-specific path or a service like
  Netlify/Cloudflare Pages just for previews) makes review easier — optional and
  arguably unnecessary complexity for a single-maintainer site.

---

## 15. Testing and QA

Before considering the site "done," verify across:

- **Responsive layout**: phone width (~360–400px), tablet, and desktop, using browser
  devtools' responsive mode at minimum, real devices if available.
- **Browsers**: current Chrome, Firefox, Safari at minimum (Safari catches CSS quirks
  the other two don't, especially around flexbox/grid edge cases and font rendering).
- **Accessibility**: axe DevTools or Lighthouse's Accessibility audit on every page
  (see §5); a manual keyboard-only pass (Tab through the whole page, confirm every
  link/control is reachable and its focus state is visible).
- **Links**: every internal link resolves, every external link (DOIs, PDFs, ORCID,
  Scholar) opens the right target — check this manually once at launch, then rely on
  an automated link checker (§14.3) going forward.
- **Print**: if you rely on a print stylesheet for the CV (§10), actually print-preview
  it — this is the step most likely to be skipped and to surprise you at launch.
- **Spelling/grammar**: a plain read-through, or a spell-check tool — small personal
  sites get surprisingly little proofreading otherwise since there's no second reviewer
  by default.
- **Build warnings**: `npm run build` should complete with zero warnings you don't
  understand — don't ship past an unexplained warning.

---

## 16. Pre-launch checklist

- [ ] `npm run build` succeeds locally with no unexplained errors/warnings.
- [ ] `astro check` passes (if configured).
- [ ] Every page has a distinct, accurate `<title>` and meta description.
- [ ] Open Graph / Twitter Card tags present and `og-image.png` renders correctly when
      pasted into Slack/Twitter/iMessage.
- [ ] `Person` JSON-LD present on the homepage; `sameAs` links (ORCID, Scholar, GitHub)
      correct.
- [ ] `sitemap.xml` and `robots.txt` exist and reference the correct production domain.
- [ ] All internal links use root-relative or Astro-resolved paths (correct under both
      local preview and the production `base`/domain).
- [ ] All images have meaningful `alt` text (or `alt=""` if decorative).
- [ ] CV PDF opens correctly and is not an outdated version; HTML CV (if present)
      matches it.
- [ ] Color contrast checked for both light and dark palettes (if dark mode is
      implemented).
- [ ] Keyboard-only navigation works across every page.
- [ ] Lighthouse run on the production build: Performance, Accessibility, Best
      Practices, SEO all in the green — investigate any that aren't.
- [ ] Favicon and app icons render correctly in browser tabs and when bookmarked on
      mobile.
- [ ] Contact email and all professional links (ORCID, Scholar, GitHub, institutional
      page) are correct and tested.
- [ ] Custom domain (if used): HTTPS enforced, `CNAME` file committed, DNS fully
      propagated.
- [ ] `LICENSE` and `README.md` present and accurate.
- [ ] GitHub Pages Source is set to **GitHub Actions**, and the deploy workflow has
      run green at least once against `main`.

---

## 17. Post-launch maintenance

- **New publication** → add one entry to the content collection/data file, commit,
  push. Deploy is automatic — nothing else to do.
- **New CV** → replace `public/cv.pdf` (and update the HTML CV data if maintained
  separately), commit, push.
- **Dependency updates**: periodically (every 3–6 months is plenty for a low-traffic
  static site) run `npm outdated` and update, especially Astro itself and
  `@astrojs/sitemap`. Enable **Dependabot** (Settings → Code security → Dependabot) for
  automated version-bump PRs on a schedule so this doesn't require remembering to do it
  manually.
- **Re-run Lighthouse/axe** after any non-trivial design change, not just at launch.
- **Link rot**: publication PDFs and DOIs do occasionally move — the periodic link
  checker from §14.3, or an annual manual pass, catches this.
- **Review analytics/traffic data** (if collected) occasionally to sanity-check that
  the deploy is actually reaching people and nothing's silently broken (e.g., a typo'd
  canonical domain after a custom-domain migration).

That's the whole lifecycle: edit data → `git push` → GitHub Actions rebuilds and
redeploys automatically. No server to maintain, no CMS to patch, no hosting bill.

---

## 18. Troubleshooting common issues

| Symptom | Likely cause | Fix |
|---|---|---|
| Site builds green in Actions but shows a blank/broken page live | Missing or wrong `base` path for a **project site** | Set `base: '/<repo-name>'` in `astro.config.mjs`; not needed for a user site (`<username>.github.io`) |
| 404 on every page except home | `trailingSlash`/`build.format` mismatch between config and actual links | Ensure internal links match the `trailingSlash: 'always'` + `format: 'directory'` convention consistently |
| Deploy workflow fails with a permissions error | Missing `pages: write` / `id-token: write` in workflow `permissions` | Add all three permissions shown in §14.2 |
| Custom domain shows "Domain does not resolve" in Pages settings | DNS not yet propagated, or `CNAME` file missing from `public/` | Re-check DNS records (§12.2); confirm `public/CNAME` is committed and deployed |
| Custom domain resets after every deploy | `CNAME` file not committed to the repo (someone set the domain only via the Settings UI) | Commit `public/CNAME` — GitHub Pages needs it present in the deployed artifact, not just configured in Settings |
| Fonts flash unstyled / flash of invisible text | No `font-display` set, or fonts loaded from a slow third-party host | Self-host fonts (§4.1), set `font-display: swap` |
| Images look blurry or oversized on mobile | Raw `<img>` with a single fixed-size source instead of `astro:assets` | Use `<Image />`/`<Picture />` (§7.2) for automatic responsive sizing |
| Old cached CSS/JS served after a deploy | Browser or CDN cache; GitHub Pages assets are typically hashed by Astro's build so this is rare, but can happen with `public/` static files | Hard-refresh; confirm the asset filename actually changed (Astro hashes build output automatically, `public/` files do not get hashed) |
| Build fails on a content collection entry | Data doesn't match the Zod schema in `content/config.ts` | Read the build error (it names the offending field/file) and fix the entry, not the schema, unless the schema itself was wrong |
| Sitemap missing pages or including a 404 page | Sitemap `filter` misconfigured, or `site` not set in `astro.config.mjs` | Confirm `site` is set to the production URL and adjust the `filter` callback in the sitemap integration config |
| Actions run doesn't trigger on push | Workflow file not on `main`, or a typo in the `on.push.branches` list | Confirm the workflow file is committed to `main` and the branch name matches exactly |

---

## 19. Appendix: reference snippets

### 19.1 `BaseLayout.astro` skeleton

```astro
---
interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
const canonicalUrl = new URL(Astro.url.pathname, Astro.site);
---
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title} — Your Name</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={new URL('/og-image.png', Astro.site)} />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="sitemap" href="/sitemap-index.xml" />
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header>
    <nav><!-- nav links --></nav>
  </header>
  <main id="main">
    <slot />
  </main>
  <footer><!-- contact + links --></footer>
</body>
</html>
```

### 19.2 Skip-link CSS (accessibility)

Lets keyboard users bypass repeated nav on every page load:

```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--color-bg);
  color: var(--color-text);
  padding: 0.5rem 1rem;
  z-index: 100;
}
.skip-link:focus {
  left: 0.5rem;
  top: 0.5rem;
}
```

### 19.3 Minimal `robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://<username>.github.io/sitemap-index.xml
```

### 19.4 Publication entry (Content Collection JSON)

`src/content/publications/2026-example-paper.json`:

```json
{
  "title": "An Example Paper Title",
  "authors": ["Your Name", "Coauthor Name"],
  "venue": "Example Journal",
  "year": 2026,
  "type": "journal",
  "links": {
    "doi": "https://doi.org/10.xxxx/xxxx",
    "pdf": "/papers/2026-example-paper.pdf",
    "code": "https://github.com/<username>/example-repo"
  },
  "featured": true
}
```

### 19.5 Rendering a sorted, grouped publication list

```astro
---
import { getCollection } from 'astro:content';
const pubs = (await getCollection('publications'))
  .sort((a, b) => b.data.year - a.data.year);
---
{pubs.map(({ data }) => (
  <article>
    <h3>{data.title}</h3>
    <p>{data.authors.join(', ')} — {data.venue}, {data.year}</p>
    <p>
      {data.links?.doi && <a href={data.links.doi}>DOI</a>}
      {data.links?.pdf && <a href={data.links.pdf}>PDF</a>}
      {data.links?.code && <a href={data.links.code}>Code</a>}
    </p>
  </article>
))}
```
