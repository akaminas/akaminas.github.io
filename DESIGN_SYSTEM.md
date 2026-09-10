# Design system

A pastel, illustrated personal site in the manner of an interactive academic homepage: a soft lavender bar over warm off-white paper, brush-lettered headings, a rounded humanist text face, Greek-flag blue for links and a purple accent. The home page carries the site's one illustration: an island of white Cycladic houses drawn as a toy-brick model, whose parts are the site's map.

## Principles

1. **One illustration, and it is the map.** The island on the home page is the only picture besides the portrait. Every part of it leads somewhere: the sea to marine work, the island, its gulls and the pelican to island ecology, the three figures to social and economic systems, the wind turbine to sustainability, and each house to a page. A plain-text key under the figure repeats every link.
2. **White and blue, on lavender and cream.** The island is Santorini: white cubes, blue domes, blue doors and shutters, a blue sea. The page around it is pastel: lavender bar, cream paper, purple accents. Nothing is neon.
3. **Two faces, one of them handwritten.** Headings, the wordmark and the home tagline are Caveat Brush, a brush-marker script that reads as a hand-lettered sign; everything else — text, navigation, labels, dates, buttons — is Nunito, a rounded humanist sans, at 400 for text and 600–700 for the interface. The brush face is never used below heading size.
4. **No annotation layer.** There are no figure numbers, plate numbers, zone numbers or clause numbers. Sections are headings with a hairline under them.
5. **Progressive enhancement, no scripted motion.** Navigation, content and the island work without JavaScript; JavaScript adds only the mobile menu toggle and the colour-scheme toggle. The island's hover and focus effects are CSS transitions of 140–220 ms and collapse under `prefers-reduced-motion`.

## Typography

| Role | Face | Size / weight | Notes |
| --- | --- | --- | --- |
| Headings, wordmark, home tagline | Caveat Brush | display scale `--disp-1` … `--disp-4` (≈ 2.7–3.8 rem for H1), 400 | line-height 1.15, no tracking |
| Body | Nunito | 17–18 px, 400, italic for emphasis | line-height 1.65, measure 68ch |
| Navigation, labels, dates, chips, buttons, footer, island labels | Nunito | 0.9–1 rem, 600–700 | |
| Code | system monospace | 0.9 em | not self-hosted |

Both fonts are self-hosted from `public/fonts/` as Latin-subset WOFF2 (Caveat Brush static 400; Nunito variable 200–1000, upright and italic; both SIL OFL 1.1; see `ASSET_PROVENANCE.md`), preloaded, `font-display: swap`. No remote font requests. Patrick Hand and Kalam were tried in the same position and set aside: Patrick Hand is thinner and reads as a schoolbook hand, Kalam is closer to a pen than a brush; Caveat Brush has the weight to sit over the island.

## Colour

Light and dark schemes follow `prefers-color-scheme` by default. A header toggle (sun/moon icon, accessible name "Switch to dark/light theme") sets `data-theme` on `<html>`; the choice is kept in one `localStorage` entry only while it differs from the system scheme and expires after 180 days (see `src/scripts/theme.ts` and `COMPLIANCE_NOTES.md`). An inline script in the head applies a stored choice before first paint.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#fbf6ef` | `#1a1726` | paper |
| `--surface` | `#f3ecf9` | `#241f34` | cards, asides |
| `--bar` / `--bar-ink` | `#cbbfe6` / `#3f2a73` | `#2e2650` / `#e6dcf8` | the header bar and its text |
| `--ink` | `#2a2440` | `#ece7f5` | text (12.6:1 on paper) |
| `--heading` | `#33256b` | `#efe7ff` | headings (10.9:1) |
| `--muted` | `#625a7a` | `#b3abc7` | secondary text (6.0:1) |
| `--link` | `#1d5fb4` | `#8fbaf0` | links (Greek-flag blue; 5.9:1) |
| `--accent` / `--accent-soft` | `#7a4fb5` / `#ebe3f7` | `#c9b3ee` / `#35295a` | purple accent: buttons, chips, active states, the "ongoing" dot |
| `--badge` / `--badge-ink` / `--badge-gold` | `#2b2260` / `#f4eefb` / `#d9c4f5` | `#e6dcf8` / `#1a1726` / `#5a3fa0` | the dark rounded badge and the island's hover labels |
| `--line` / `--line-strong` | `#e4dbee` / `#c4b8d9` | `#342d4a` / `#4d4468` | hairlines, card borders |
| `--focus` | `#1d5fb4` | `#8fbaf0` | focus ring |

The island itself uses fixed toy-brick colours (sea `#3d8fd1`, sand `#e8c97e`, grass `#63b04a`, white `#f6f4ef`, blue `#2a5fbf`) in both schemes, with three tones per colour (top lighter, left as is, right darker) and studs on every top surface.

All text/background pairs meet WCAG 2.2 AA (4.5:1) in both schemes. Colour never carries information alone: the status dot always sits beside a word, the active navigation item is also bold and underlined, and every island part has a text label and a key entry.

## The island

`scripts/make-island.mjs` draws `src/components/island.svg` from a few isometric primitives (plates, bricks, cylinders, domes) in world units of studs, with a 2:1 isometric projection and a painter's-order sort. Studs are an SVG `<pattern>` per colour and height, aligned to the stud grid. `src/components/Island.astro` inlines the SVG and adds the CSS: each link group (`<a class="hot">`) lifts by 8 px (`hot--lift`) or brightens (`hot--glow`, for the sea and the island) on hover and focus, and reveals a label (`.hot__label`) styled as the badge. The SVG root is `role="group"` with a title and description; each link has an `aria-label`, and the labels inside are `aria-hidden`. The figure is about 80 kB of static SVG and ships no script.

To change the island, edit the scene section of the script and run `node scripts/make-island.mjs`.

## Layout

- Reading column `--container` (46 rem); island and card grids `--wide` (72 rem). Gutter `clamp(1rem, 4vw, 2.5rem)`.
- 4 px base grid via `--space-1` (0.25 rem) to `--space-9` (6 rem).
- Corners: `--radius` 10 px on cards, portraits and asides; `--radius-s` 6 px on badges; pills on buttons and chips.
- Breakpoints: 42 rem (ledger columns, two-column cards, portrait beside text), 48 rem (mobile menu ↔ inline nav, footer columns), 52 rem (project aside beside prose, three scope columns).

## Components

- **Header** — the lavender bar: name, navigation (active item bold and underlined), profile links (GitHub, ORCID, Scholar) and the theme toggle. Menu button and toggle appear only with JS.
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
