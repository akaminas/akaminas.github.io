# Design system

An illustrated personal site in the manner of an interactive academic homepage, in an Aegean palette: one blue (#007BA7) for the bar, links, sea and domes over white paper (#F4F4F4), deep slate text, monospaced headings over a slab-serif text face. The home page carries the site's one illustration: an island of white Cycladic houses drawn as a toy-brick model, whose parts are the site's map.

## Principles

1. **One illustration, and it is the map.** The island on the home page is the only picture besides the portrait. Every part of it leads somewhere: the sea to marine work, the island, its gulls and the pelican to island ecology, the three figures to social and economic systems, the wind turbine to sustainability, and each house to a page. A plain-text key under the figure repeats every link.
2. **Two colours.** White paper and one Aegean blue; text in deep slate; pale blue-grey surfaces. The island uses the same blue for the sea and the domes and the same white for the houses, with sand, olive grass and wood around them. Nothing is neon.
3. **Mono over slab.** Headings, the wordmark, the navigation, labels, dates and buttons are Roboto Mono at 500–700; text is Roboto Slab at 400. The monospaced face is set small and tight (headings 1.9–2.5 rem) so it reads as a label, not a banner.
4. **No annotation layer.** There are no figure numbers, plate numbers, zone numbers or clause numbers. Sections are headings with a hairline under them.
5. **Progressive enhancement, no scripted motion.** Navigation, content and the island work without JavaScript; JavaScript adds only the mobile menu toggle and the colour-scheme toggle. The island's hover and focus effects are CSS transitions of 140–220 ms and collapse under `prefers-reduced-motion`.

## Typography

| Role | Face | Size / weight | Notes |
| --- | --- | --- | --- |
| Headings, wordmark, navigation, home tagline | Roboto Mono | display scale `--disp-1` … `--disp-4` (≈ 1.9–2.5 rem for H1), 500 | line-height 1.2, tracking −0.01 em |
| Body | Roboto Slab | 17–18 px, 400 | line-height 1.65, measure 68ch |
| Labels, dates, chips, buttons, footer, island labels | Roboto Mono | 0.9–1 rem, 500–700 | |
| Code | Roboto Mono | 0.9 em | |

Both fonts are self-hosted from `public/fonts/` as Latin-subset variable WOFF2 (Roboto Mono 100–700 upright and italic, SIL OFL 1.1; Roboto Slab 100–900, Apache 2.0; see `ASSET_PROVENANCE.md`), preloaded, `font-display: swap`. No remote font requests.

## Colour

Light and dark schemes follow `prefers-color-scheme` by default. A header toggle (sun/moon icon, accessible name "Switch to dark/light theme") sets `data-theme` on `<html>`; the choice is kept in one `localStorage` entry only while it differs from the system scheme and expires after 180 days (see `src/scripts/theme.ts` and `COMPLIANCE_NOTES.md`). An inline script in the head applies a stored choice before first paint.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#f4f4f4` | `#0f1c24` | paper |
| `--surface` | `#e8eef2` | `#16262f` | cards, asides |
| `--bar` / `--bar-ink` | `#007ba7` / `#f4f4f4` | `#0b3a4f` / `#e9f3f7` | the header bar and its text (7.8:1 / 9.9:1) |
| `--ink` | `#243541` | `#e4edf2` | body text (12.6:1 / 13.0:1) |
| `--heading` | `#123b4f` | `#f1f7fa` | headings (10.1:1 / 14.2:1) |
| `--muted` | `#5a6b76` | `#a3b6c1` | secondary text (6.1:1 / 7.4:1) |
| `--link` | `#007ba7` | `#5fc0e6` | links (6.6:1 / 8.0:1) |
| `--accent` / `--accent-soft` | `#007ba7` / `#d9ecf4` | `#5fc0e6` / `#123a4b` | terracotta: buttons, chips, active states, the "ongoing" dot (5.5:1 / 8.2:1) |
| `--badge` / `--badge-ink` / `--badge-gold` | `#123b4f` / `#f4f4f4` / `#7fc8e6` | `#e9f3f7` / `#0f1c24` / `#007ba7` | the dark strip and the island's hover labels |
| `--line` / `--line-strong` | `#dfe5e9` / `#b8c6cf` | `#223641` / `#3b5565` | hairlines, card borders |
| `--focus` | `#007ba7` | `#5fc0e6` | focus ring |

A second palette, **Sand** (warm apricot bar, deep brown headings, burnt-orange accent, Greek-blue links), is defined in the same stylesheet and switched on with `data-palette="sand"` on `<html>` in `src/layouts/Base.astro`. Blue and orange are complements, so the island stands further off the page. The comment above the tokens lists the six other places that carry a hard-coded colour and must be changed with it: the theme-color meta tags and the pre-paint script in `Base.astro`, `src/scripts/theme.ts`, `public/site.webmanifest`, `public/favicon.svg` (then re-render the icons), and `scripts/og.html`. Both palettes, in both schemes, were checked against every text/background pair.

The island itself uses fixed colours (sea and domes `#007ba7`, houses `#f4f4f4`, sand `#e6d2a0`, grass `#7fb069`) in both schemes, with three tones per colour (top lighter, left as is, right darker) and studs on every top surface.

All text/background pairs meet WCAG 2.2 AA (4.5:1) in both schemes. Colour never carries information alone: the status dot always sits beside a word, the active navigation item is also underlined, and every island part has a text label and a key entry.

## The island

`scripts/make-island.mjs` draws `src/components/island.svg` from a few isometric primitives (plates, bricks, cylinders, domes) in world units of studs, with a 2:1 isometric projection and a painter's-order sort. The wind turbine's rotor uses one more: a flat part, extruded along the rotor axis, drawn in the single vertical plane that projects to screen horizontal and vertical, so its blades carry a lit face, a rim and a shadowed back like every brick around them rather than reading as a drawing laid over the scene. Studs are an SVG `<pattern>` per colour and height, aligned to the stud grid. `src/components/Island.astro` inlines the SVG and adds the CSS: each link group (`<a class="hot">`) lifts by 8 px (`hot--lift`) or brightens (`hot--glow`, for the sea and the island) on hover and focus, and reveals a label (`.hot__label`) styled as the badge. The SVG root is `role="group"` with a title and description; each link has an `aria-label`, and the labels inside are `aria-hidden`. The figure is about 80 kB of static SVG and ships no script.

To change the island, edit the scene section of the script and run `node scripts/make-island.mjs`.

## Layout

- Reading column `--container` (46 rem); island and card grids `--wide` (72 rem). Gutter `clamp(1rem, 4vw, 2.5rem)`.
- 4 px base grid via `--space-1` (0.25 rem) to `--space-9` (6 rem).
- Corners: `--radius` 10 px on cards, portraits and asides; `--radius-s` 6 px on badges; pills on buttons and chips.
- Breakpoints: 42 rem (ledger columns, two-column cards, portrait beside text), 48 rem (mobile menu ↔ inline nav, footer columns), 52 rem (project aside beside prose, three scope columns).

## Components

- **Header** — the blue bar: name, navigation (active item underlined), profile links (GitHub, ORCID, Scholar) and the theme toggle. Menu button and toggle appear only with JS.
- **Footer** — name, position and affiliation, email, profile links, and the copyright line, which links to the privacy notice.
- **PageHeader** — H1, optional lede, slot.
- **Section** — heading with a hairline, optional intro, content; `wide` widens to the card grid.
- **Island** — see above.
- **ProjectCard** — a card: the project's line drawing and domain, title and question as one link, a meta line (status, period, first methods).
- **PublicationItem** — title (DOI link), authors with the owner emphasised, venue, and a mono identifier line (year, status, DOI, licence, note).
- **Motif** — seven original line drawings (`patches`, `bipartite`, `fold`, `hypervolume`, `nested`, `records`, `field`), `aria-hidden`, in `currentColor` with one accent dot.
- **Chips** — rounded pastel tags for methods and tools. Never proficiency bars.
- **Buttons** — pill-shaped, purple; primary is filled. 44 px minimum height.
- **Badge** — the dark rounded strip with a pale outline, for one highlighted line.
- **Status** — a coloured dot and a word; purple for "ongoing".
- **Ledger** — dated rows: a mono period column and a content column, hairlines between rows.

## Interaction and motion rules

- Hover: links shift to the accent; cards lift 2 px; island parts lift 8 px or brighten and show their label.
- Focus: 3 px focus ring in `--focus` with 3 px offset on every interactive element (`:focus-visible`), including the island's links.
- Targets: ≥ 44 × 44 CSS px for nav links, buttons and footer links; inline text links are exempt as permitted by WCAG 2.2 SC 2.5.8.
- Reduced motion: transitions collapse to ~0 ms; the island's lift becomes a brightening.
- Sticky header, opaque.

## Accessibility principles

- Landmarks on every page: skip link, `header`, `nav` (labelled), `main`, `footer`; sections are labelled by their headings.
- The island is a group of named links with a description; the same links are repeated in text in the key under it, so nothing depends on hovering or on seeing the drawing.
- Every image has alt text or is `aria-hidden` with its meaning in text.
