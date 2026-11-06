# Design system

An illustrated personal site in the manner of an interactive academic homepage, in an Aegean palette: one blue (#007BA7) for the bar, links, sea and domes over white paper (#F4F4F4), deep slate text, monospaced headings over a slab-serif text face. The home page carries the site's one illustration: an island of white Cycladic houses drawn as a toy-brick model, whose parts are the site's map.

## Principles

1. **One illustration, and it is the map.** The island on the home page is the one large picture besides the portrait; each project has a small diorama built from the same parts (see Diorama). Every part of it leads somewhere: the sea to marine work, the island and its gulls to island ecology, the three figures to social and economic systems, the wind turbine to sustainability, the lighthouse at the end of the pier to scientific tool development, and each house to a page. A plain-text key under the figure repeats every link.
2. **One blue, and pastel tones for parts.** White paper and one Aegean blue for the bar, links and controls; text in deep slate; pale blue-grey surfaces. Eight muted pastel tones (below) colour the parts of a section: each project domain, each method area, each profile tile, and the chips that name them. A tone only ever sits on a drawing, a tinted panel, a chip or a rule under a heading; it never carries text. The island uses the same blue for the sea and the domes and the same white for the houses, with sand, olive grass and wood around them. Nothing is neon.
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

**Tones.** Eight muted pastels, defined once as `--tone-*` and the same on both schemes: teal `#86c1b3`, sea `#86b4cd`, sand `#dfc88f`, coral `#dfa795`, lilac `#b9adda`, sage `#aec693`, rose `#d9a8ba`, apricot `#e2b48f`. `src/data/tones.ts` says which belongs to what: the four project domains (ecology and evolution teal, sustainability and social systems coral, marine systems sea, scientific tool development lilac) and, on the Methods page, one tone per area. An element sets `--tone` (inline, via `toneStyle`) and everything inside reads it. A panel is the tone mixed into `--surface` (`--tint-amt`, 24 % light and 30 % dark); a chip is the same mix with a border; the "deep" accent inside a drawing is the tone darkened in its own hue on the light scheme and lightened on the dark one (`--deep-shade`, `--deep-amt`). Text on a tinted ground stays `--ink`, so contrast is that of ink on a pale or dark tint.

A second palette, **Sand** (warm apricot bar, deep brown headings, burnt-orange accent, Greek-blue links), is defined in the same stylesheet and switched on with `data-palette="sand"` on `<html>` in `src/layouts/Base.astro`. Blue and orange are complements, so the island stands further off the page. The comment above the tokens lists the six other places that carry a hard-coded colour and must be changed with it: the theme-color meta tags and the pre-paint script in `Base.astro`, `src/scripts/theme.ts`, `public/site.webmanifest`, `public/favicon.svg` (then re-render the icons), and `scripts/og.html`. Both palettes, in both schemes, were checked against every text/background pair.

The island itself uses fixed colours (sea and domes `#007ba7`, houses `#f4f4f4`, sand `#e6d2a0`, grass `#7fb069`) in both schemes, with three tones per colour (top lighter, left as is, right darker) and studs on every top surface.

All text/background pairs meet WCAG 2.2 AA (4.5:1) in both schemes. Colour never carries information alone: the status dot always sits beside a word, the active navigation item is also underlined, and every island part has a text label and a key entry.

## The island

`scripts/make-island.mjs` draws `src/components/island.svg` from a few isometric primitives (plates, bricks, cylinders, domes) in world units of studs, with a 2:1 isometric projection and a painter's-order sort. The wind turbine's rotor uses one more: a flat part, extruded along the rotor axis, drawn in the single vertical plane that projects to screen horizontal and vertical, so its blades carry a lit face, a rim and a shadowed back like every brick around them rather than reading as a drawing laid over the scene. Studs are an SVG `<pattern>` per colour and height, aligned to the stud grid. `src/components/Island.astro` inlines the SVG and adds the CSS: each link group (`<a class="hot">`) lifts by 8 px (`hot--lift`) or brightens (`hot--glow`, for the sea and the island) on hover and focus, and reveals a label (`.hot__label`) styled as the badge. The SVG root is `role="group"` with a title and description; each link has an `aria-label`, and the labels inside are `aria-hidden`. The boat only repeats the sea's destination, so that link is `aria-hidden` with `tabindex="-1"` (set with `repeat: true` in the script): it stays clickable, but each destination is announced and tabbed to once. The figure is about 90 kB of static SVG and ships no script.

To change the island, edit the scene section of the script and run `node scripts/make-island.mjs`.

## Layout

- **Two widths.** The column, `--container` (50 rem, about 800 px, as on the reference site), holds all text, lists and cards on every page, so every heading and paragraph starts at the same x. The page, `--wide` (72 rem), is the width of the header, the footer and the island, which is the only thing that leaves the column (`.breakout`, centred on it). Gutter `clamp(1.125rem, 5vw, 1.5rem)`. Body text runs the full column; there is no narrower measure.
- **One lead column.** `--lead` (10 rem) plus a `--lead-gap` of 1.5 rem is the left column of every ledger (dates), thumbnail listing (project and method drawings) and key/value row (tools). Pages do not set their own widths for it.
- **One rhythm.** Sections sit 3 rem apart (`--space-7`); an H2 has a hairline under it and 1 rem before the content; paragraphs and blocks are 1 rem apart; the page starts 3 rem under the header and ends 4.5 rem above the footer.
- No page nests a second grid beside the prose. Single-column pages (project, privacy) put the facts or contents in a panel above the text.
- 4 px base grid via `--space-1` (0.25 rem) to `--space-9` (6 rem).
- Corners: `--radius` 10 px on cards and panels; 8 px on thumbnails; `--radius-s` 6 px on badges; pills on buttons and chips.
- Breakpoints: 42 rem (lead column beside content, portrait floats left, cards stop being a single column), 64 rem (mobile menu ↔ inline nav; seven links and three profiles need the room), also 64 rem (footer in three parts).

## Components

- **Header** — the blue bar, with a soft shadow: name, navigation (Work, Methods, Publications, Teaching, About, CV, Contact; active item underlined), profile links (GitHub, ORCID, Scholar) and the theme toggle. Menu button and toggle appear only with JS.
- **Footer** — a tinted bar in three parts as on the reference (name, position and affiliation; profile links; email), then the copyright line, which links to the privacy notice.
- **PageHeader** — H1, optional lede, slot.
- **Section** — heading with a hairline, then content; always the width of the column. There are no subtitles under section headings. With a `tone` the rule under the heading takes that colour and everything inside inherits it.
- **Island** — see above; the figure breaks out of the column to the page width and its key sits in the column as an even grid.
- **Bio** — the portrait floats left and the text wraps it (home, About).
- **ProjectCard** — one markup, two layouts. `row` (Work page): the project's diorama on a 4:3 panel tinted with its domain tone, in the lead column (14 rem on the Work page, set with the `lead` prop of `Base`), then title, question and a meta line (status, period, first methods). `card` (home gallery, three across): the diorama on top, the domain as a tinted tag, title, question and status centred below. The title link covers the whole item.
- **Listing** — thumbnail panel in the lead column and text beside it (method areas); `.rows` stacks project rows.
- **PublicationItem** — title (DOI link), authors with the owner emphasised, venue, a mono identifier line (year, DOI, licence) and a note on its own line; a status only when the item is not yet published. The publications page sets these in a ledger by year.
- **Diorama** — one toy-brick scene per project, drawn by `scripts/make-dioramas.mjs` (`npm run dioramas`) from the island's primitives (studded plates, bricks, cylinders, domes, three tones per colour, 2:1 isometric) and written to `public/dioramas/<kind>.svg` with a size manifest in `src/data/dioramas.json`. Each stands on a baseplate in its domain's tone and shows the subject as a built object: two islands and a gull crossing the channel (`isolation`), a bipartite network as pegs and rods (`bipartite`), a stability landscape in brick columns with a ball and its ghost (`fold`), a hull of stacked plates inside three axes (`hypervolume`), institutions joined by a feedback road (`loop`), buoys marking records at sea (`records`), a bar chart in the four discipline tones (`swatches`), a relief map with a route of deepening tiles from broad terraces of concepts to four peaks (`atlas`), a four-tile board of lists and pastel cards, one card picked up, with a flag at its centre (`tessera`; the tiles are the colours of that project's own mark). Fixed colours, as for the island; decorative, so empty alt text.
- **Motif** — nine original line diagrams: one per method area (`compartments`, `walks`, `phase`, `graph`, `tree`, `scatter`, `survey`, `contours`) and one for the 404 page (`lost`); no two share a picture. One grammar: ink outlines in `currentColor`, the tone for fills, its deep mix for the thing being followed, dashes for what is not present. `aria-hidden`; the tone comes from the element around it.
- **Contact** — email, profile tiles (one tone each) and affiliation, from `site.ts`.
- **Chips** — rounded tags for methods, tools and project domains, tinted with the tone of their section (the reference tints its blog categories the same way). Never proficiency bars.
- **Buttons** — pill-shaped, purple; primary is filled. 44 px minimum height.
- **Badge** — the dark rounded strip with a pale outline, for one highlighted line.
- **Status** — a coloured dot and a word; purple for "ongoing".
- **Ledger** — dated rows: a mono period column (the lead column) and a content column, hairlines between rows. The same width on every page.

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
