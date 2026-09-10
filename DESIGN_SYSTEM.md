# Design system

The site belongs to a modeller of complex systems, and it is drawn the way that work is drawn: as a set of sheets. The visual language is the technical drawing and the printed scientific plate — blue paper with a faint drafting grid, near-navy ink, iron-red annotation, plates with numbered header strips, numbered zones, and a title block at the foot of every sheet. Everything else is typography and space.

## Principles

1. **A sheet, not a page.** Every page is a drawing sheet: the drafting grid sits behind everything, the header is the index strip, sections are numbered zones with an annotated left margin, and the footer is a title block whose cells carry real facts (who drew it, where they work, which sheet, when it was built, how to reach them).
2. **Two layers of type.** Text is one variable family (Google Sans Flex); hierarchy comes from weight, size and tracking, never from a second text face. The annotation layer — labels, numbers, dates, the title block, the navigation — is mono (JetBrains Mono), small, tracked and uppercase, so it reads as a drafter's note rather than as prose.
3. **One accent, for annotation only.** Iron red marks what a drafter would mark in red: zone numbers, plate numbers, clause numbers, the active tab, the "ongoing" status, reticulations in the home figure, hover. Nothing decorative is red.
4. **Figures are plates.** The home network, the project cards and the portrait share one frame: a header strip with a plate number on the left and a caption label on the right, a figure area on finer graph paper where there is a drawing, and a caption below. Plates in a grid share hairlines.
5. **Nothing is only visual.** Every number is a real count (zones, plates, clauses, references); every plate has a caption; the home figure says it is a schematic; every method is linked to the project where it was used; publication status is written out.
6. **Progressive enhancement, no motion.** Navigation, content and layout work without JavaScript; JavaScript adds only the mobile menu toggle and the colour-scheme toggle, and both fail silently. Nothing animates by itself; transitions are 140–220 ms and limited to colour and small transforms.

## Typography

| Role | Face | Size / weight | Notes |
| --- | --- | --- | --- |
| Headings | Google Sans Flex | fluid scale, 500 | `letter-spacing: −0.022em` (−0.03em on H1), `text-wrap: balance` |
| Body, UI | Google Sans Flex | 17–18.4 px, 400/500/600 | line-height 1.6, measure 64ch |
| Annotation: labels, numbers, dates, nav, title block | JetBrains Mono | 0.68–0.74 rem | uppercase, 0.06–0.1 em tracking, tabular numerals |

Google Sans Flex is one variable face carrying a weight axis (1–1000) and a slant axis, declared with `font-style: oblique 0deg 10deg` so `<em>` resolves to a true oblique. Both fonts are self-hosted from `public/fonts/` as Latin-subset WOFF2 (SIL OFL 1.1; see `ASSET_PROVENANCE.md`); the text face is preloaded, the mono loads with `font-display: swap`. No remote font requests.

Fluid type scale (`--step--1` … `--step-5`), clamped between 360 px and 1280 px viewports. Annotation sizes are fixed (`--ann`, `--ann-s`).

## Colour

Light ("cyanotype") and dark ("negative") schemes follow `prefers-color-scheme` by default. A header toggle (sun/moon icon, accessible name "Switch to dark/light theme") sets `data-theme` on `<html>`; the choice is kept in one `localStorage` entry only while it differs from the system scheme and expires after 180 days (see `src/scripts/theme.ts` and `COMPLIANCE_NOTES.md`). An inline script in the head applies a stored choice before first paint.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#e6ecf1` | `#0e1a26` | the sheet |
| `--surface` | `#dce4eb` | `#142434` | raised ground |
| `--ink` | `#101f2b` | `#dbe6f0` | text (14.1:1 / 14.9:1) |
| `--muted` | `#47586a` | `#9fb4c6` | secondary text and annotation (6.1:1 / 8.6:1) |
| `--line` / `--line-strong` | `#c3d0db` / `#8599ab` | `#22364a` / `#3e5872` | hairlines; frames, dimension lines, the grid of the title block |
| `--accent` | `#a8321c` | `#f0916f` | annotation only (5.62:1 / 7.6:1) |
| `--on-accent` | `#ffffff` | `#0e1a26` | text on a filled accent |
| `--focus` | `#1231c9` | `#8fb0ff` | focus ring (7.6:1 / 8.5:1 against the sheet) |
| `--grid` | ink at 7 % | ink at 6 % | the drafting grid, 2 rem pitch (1 rem inside plate figure areas) |
| `--tree-edge` / `--tree-cloud` | `#2f4a5e` / `#6d879c` | `#b3c7d8` / `#6f8aa2` | home figure only: consensus lineages and the discordant histories behind them |

The light scheme is a cyanotype positive — blue paper, navy ink, red annotation; the dark scheme is the negative — pale lines on Prussian blue. Both carry the same blue cast, so the toggle changes the light level and not the identity. Two off-whites were tried and rejected before this: a warm beige, which read as templated, and a neutral cool grey, which read as a default rather than a choice.

All text/background pairs meet WCAG 2.2 AA (4.5:1) in both schemes; contrast ratios were computed, not eyeballed. Colour never carries information alone: status markers always sit beside a word; the reticulations in the home figure are also dashed and arrow-headed; the active navigation tab is also underlined.

## The sheet

- **Grid.** `body` carries the drafting grid as two `linear-gradient` layers at a 2 rem pitch, anchored to the top-left so it stays put on scroll. Plate figure areas use a 1 rem pitch. The grid is removed in print.
- **Dimension lines.** `.dim` draws a rule with a 9 px tick at each end, the way a drawing marks an extent. It is the top edge of every section, of the project body and of the privacy notice.
- **Zones.** `Section.astro` renders a numbered zone: a left margin (`--margin-col`, 9 rem, sticky from 52 rem) with the zone number from a CSS counter on `<main>` (`counter(sec, decimal-leading-zero)`, in the accent) and a mono label, then the body with the heading. Zones number themselves in document order, so a page never carries a stale number.
- **Plates.** `.plate` is the frame; `.plate__head` the strip (plate number left, label right); `.plate__caption` the caption. `.plates` is a grid of plates sharing 1 px hairlines (`gap: 1px` over a `--line-strong` background).
- **Clauses.** `.prose h2` numbers itself (`counter(clause)`) in the accent, so Markdown project bodies read as numbered specifications (01 Question, 02 System, …). `.prose--plain` turns the numbering off for pages that are not specifications.
- **Registers and ledgers.** `.register` numbers entries `[1]`, `[2]` … with a counter that lives on `.register-group`, so numbering runs across publications grouped by year. `.ledger` is the dated row: a mono period column with a scale tick, hairlines between rows.
- **Title block.** `Footer.astro` renders a bordered grid of labelled cells — Drawn by, Affiliation, Sheet (the current path), Built (the build date), Contact, Profiles, Source, Notes — with registration marks in two opposite corners.
- **Index strip.** `Header.astro` renders the wordmark, the navigation as numbered mono tabs (`01 Work … 06 CV`, active tab in ink with a red underline), and the theme toggle. Behaviour (mobile menu, Escape, focus return, no-JS fallback) is unchanged from the previous site.

## Spacing and layout

- 4 px base grid via `--space-1` (0.25 rem) to `--space-9` (7 rem).
- Container `min(100% − 2·gutter, 78rem)`; gutter `clamp(1.25rem, 4vw, 3rem)`.
- Corners are square everywhere: there is no `border-radius` in the system.
- Breakpoints: 42 rem (ledger columns), 48 rem (mobile menu ↔ inline nav), 52 rem (zone margin column, two-column plates), 60 rem (hero side by side), 64 rem (four-column title block).

## Components

- **Header** — see "Index strip".
- **Footer** — see "Title block".
- **PageHeader** — the sheet head: mono label, H1, lede, and a slot for anything under it.
- **Section** — a numbered zone; props `id`, `label`, `title`, `intro`, `note`, `tight`.
- **ProjectCard** — a project as a plate: header strip (`Pl. 03`, domain), the motif on graph paper, title and question as one link, and a two-column specification (status, period, methods). Plate numbers follow the full project order, so a plate keeps its number on every page.
- **PublicationItem** — one register entry: `[n]`, title (DOI link), authors with the owner emphasised, venue, and a mono identifier line (year, status, DOI, licence, note).
- **PhyloNetwork** — the home figure as Plate/Fig. 01: a schematic phylogenetic network drawn as static SVG at build time (a species tree over a cloud of seventy discordant gene histories, with two reticulation arrows in the accent). No client-side JavaScript, no canvas, no animation; `aria-hidden` with the meaning in the caption.
- **Motif** — seven original line drawings (`patches`, `bipartite`, `fold`, `hypervolume`, `nested`, `records`, `field`), `aria-hidden`, in `currentColor` with one accent dot.
- **Chips** — square mono labels for methods and tools. Never proficiency bars.
- **Buttons** — square, 1 px ink border, 44 px minimum height; primary is filled ink. Hover changes border/background to the accent, never only the text colour.
- **Status** — a square marker and a word; the marker is red for "ongoing".

## Interaction and motion rules

- Hover: colour shift to the accent and/or underline; arrow links translate the arrow 0.25 em.
- Focus: 3 px focus ring in `--focus` with 3 px offset on every interactive element (`:focus-visible`).
- Targets: ≥ 44 × 44 CSS px for nav links, buttons and footer links; inline text links are exempt as permitted by WCAG 2.2 SC 2.5.8.
- Reduced motion: all transitions collapse to ~0 ms. There is nothing else to stop.
- Sticky header uses a translucent background with backdrop blur; falls back to the solid background where unsupported.

## Accessibility principles

- Landmarks on every page: skip link, `header`, `nav` (labelled), `main`, `footer`; sections are labelled by their headings.
- Generated numbers (zones, plates, clauses, references) are decorative repetitions of document order and are `aria-hidden` or CSS-generated, never the only carrier of meaning.
- Every plate has a text caption; every figure area is `aria-hidden`.
- The drafting grid is far below the contrast threshold at which it could be mistaken for content (ink at 6–7 %).
