# Design system

The site belongs to a modeller of complex systems. The design language is taken from that work, not from ecology imagery and not from software-portfolio conventions: entities, interactions, trajectories and limited flow between compartments. Everything else is typography and space.

## Principles

1. **Hierarchy through type, not boxes.** One text family throughout (Google Sans Flex, variable), with hierarchy carried by weight, size and tracking rather than by a second typeface; one mono for labels (JetBrains Mono). Sections are separated by hairline rules, not cards.
2. **Restraint.** One accent colour, used only for signal: the active nav marker, the "ongoing" status dot, the reticulation edges in the home-page network, hover states. Everything else is ink on paper — and the paper is blue. The light scheme takes its pairing from technical drawings and printed scientific plates: a ground tinted a definite cool blue rather than an off-white, near-navy ink, and iron red for annotation.
3. **The modelling language persists, the subject changes.** Every project has a small line drawing in the same grammar (dots = entities, lines = interactions or paths, dashes = limited flow). The home-page figure is a phylogenetic network — a figure of the kind the work itself produces, not decorative particles.
4. **Nothing is only visual.** The network figure is captioned, and the caption says plainly that it is a schematic rather than data; every claim on the methods page is linked to the project where the method was used; publication status is written out.
5. **Progressive enhancement.** Navigation, content and layout work without JavaScript. The only client-side JavaScript is the mobile menu toggle and the colour-scheme toggle; both fail silently.
6. **Meaningful motion only.** Transitions are 140–220 ms and limited to colour and small transforms. Nothing on the site animates by itself.

The attached Apple document turned out to be the *Apple Style Guide* (editorial), not the Human Interface Guidelines. Its transferable advice was applied to copy rather than layout: consistent terminology across pages, active voice, plain language, no idioms, jargon defined at first use.

## Typography

| Role | Face | Weights | Notes |
| --- | --- | --- | --- |
| Headings, publication titles, dates | Google Sans Flex | 500 | `letter-spacing: -0.02em` (−0.012em at record sizes), `text-wrap: balance` |
| Body, UI | Google Sans Flex | 400/500/600 | 17–18.4 px body, line-height 1.6 |
| Labels, metadata, tags | JetBrains Mono | 400 | Uppercase, 0.06–0.08 em tracking, 0.74–0.84 rem |

Google Sans Flex is one variable face carrying a weight axis (1–1000) and a slant axis. It is declared with `font-style: oblique 0deg 10deg`, so `<em>` resolves to a true oblique instead of a synthesised skew. One family covers headings and text; the `.display` utility is weight and tracking, not a second face.

All fonts are self-hosted from `public/fonts/` as Latin-subset WOFF2 (SIL OFL 1.1; see `ASSET_PROVENANCE.md`). The text face is preloaded; the mono loads with `font-display: swap`. No remote font requests. Chosen deliberately over IBM Plex, and over the serif/sans display pairing it replaced — both have become common defaults across AI-generated and templated sites.

Fluid type scale (`--step--1` … `--step-5`), clamped between 360 px and 1280 px viewports. Reading measure is 66ch. Paragraphs never exceed it; lists and tables are exempt.

## Colour

Light ("cyanotype") and dark ("slate") schemes follow `prefers-color-scheme` by default. A header toggle (sun/moon icon, accessible name "Switch to dark/light theme") sets `data-theme` on `<html>`; the choice is kept in one `localStorage` entry only while it differs from the system scheme and expires after 180 days (see `src/scripts/theme.ts` and `COMPLIANCE_NOTES.md`). An inline script in the head applies a stored choice before first paint.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#e6ecf1` | `#10161c` | page |
| `--surface` | `#dae3ea` | `#19212a` | raised ground |
| `--ink` | `#101f2b` | `#e3e9ee` | text (14.1:1 / 14.9:1) |
| `--muted` | `#47586a` | `#a3aeb8` | secondary text (6.1:1 / 8.1:1) |
| `--line` / `--line-strong` | `#c3d0db` / `#8599ab` | `#262f39` / `#414d59` | rules, borders (non-text) |
| `--accent` | `#a8321c` | `#f0916f` | signal only (5.62:1 / 7.79:1) |
| `--on-accent` | `#ffffff` | `#10161c` | text on a filled accent (6.69:1 / 7.79:1) |
| `--focus` | `#1231c9` | `#8fb0ff` | focus ring (7.64:1 / 8.51:1 against the page) |
| `--tree-edge` / `--tree-cloud` | `#2f4a5e` / `#6d879c` | `#b6c2cc` / `#76889a` | network figure only: consensus lineages, and the discordant histories behind them (non-text, drawn with alpha) |

Both schemes carry the same faint blue cast, so the toggle changes the light level and not the identity. The light scheme is a cyanotype: blue paper, near-navy ink, iron-red annotation. Two off-whites were tried and rejected before it — the original warm beige, which read as templated, and a neutral cool grey-white, which read as a default rather than a choice.

`--on-accent` exists because a filled accent needs different text in each scheme; it replaced a `prefers-color-scheme` override that gave the wrong colour whenever a visitor forced the light theme on a dark system.

All text/background pairs meet WCAG 2.2 AA (4.5:1) in both schemes; contrast ratios were computed, not eyeballed. Colour never carries information alone: status dots are always accompanied by a word; in the network figure the reticulations are also distinguished by being dashed and arrow-headed.

## Spacing and layout

- 4 px base grid via `--space-1` (0.25 rem) to `--space-9` (7 rem). Section padding is `--space-8` (4.5 rem).
- Container `min(100% − 2·gutter, 76rem)`; gutter `clamp(1.25rem, 4vw, 3rem)`.
- The editorial grid `.grid-label` puts a sticky label column (10–16 rem) beside content from 52 rem upwards and stacks below.
- Lists of records (publications, talks, timeline) use `.ruled`: hairline rules between items, a medium-weight date/year column, content column.
- Breakpoints: 42 rem (two-column records), 48 rem (mobile menu ↔ inline nav), 52 rem (label grid, two-column cards), 60 rem (hero side-by-side), 64 rem (two-column cards on Work).

## Components

- **Header**: wordmark (two-patch glyph + name), primary nav with underline active state (`aria-current="page"`), and the colour-scheme toggle (icon button, 44 px target, shown only with JS; after the nav in DOM and layout on desktop, on the first row beside the menu button on narrow screens). Below 48 rem, JS reveals a labelled "Menu" button (`aria-expanded`, `aria-controls`, Escape closes and returns focus). Without JS the list is simply visible.
- **Project card**: motif + domain label, linked title and question, status + period, up to three method tags. The link wraps only the title and question so the accessible name is clean.
- **Publication item**: year and status column; linked title (DOI), authors with the owner highlighted, venue, DOI and licence in mono.
- **Motif**: seven original SVG drawings (`patches`, `bipartite`, `fold`, `hypervolume`, `nested`, `records`, `field`), `aria-hidden`, drawn in `currentColor` with one accent dot.
- **PhyloNetwork**: the home-page figure, a schematic phylogenetic network drawn as static SVG. Three layers: a pale cloud of seventy discordant gene histories (the species tree resampled with jittered divergence times and nearest-neighbour-interchange moves, tip positions held fixed, so conflicting histories cross — the densitree convention); the consensus species tree over it as a slanted cladogram; and two dashed accent arrows for reticulation, the gene flow that makes it a network rather than a tree. Everything is generated at build time from a seeded PRNG, so the figure is identical on every build; there is no client-side JavaScript, no canvas and no animation. The SVG is `aria-hidden` and the caption carries the meaning, including that it is a schematic and not data.
- **Tags**: mono labels in hairline pills. Never proficiency bars or percentages.
- **Buttons**: 44 px minimum height, 1 px border; primary is filled ink. Hover changes border/background, never only colour of text.

## Interaction and motion rules

- Hover: colour shift to accent and/or underline; arrow links translate the arrow 0.2 em.
- Focus: 3 px focus ring in `--focus` with 3 px offset on every interactive element (`:focus-visible`).
- Targets: ≥ 44 × 44 CSS px for nav links, buttons and footer links; inline text links are exempt as permitted by WCAG 2.2 SC 2.5.8.
- Reduced motion: all transitions collapse to ~0 ms. There is nothing else to stop — no element animates on its own.
- Sticky header uses a translucent background with backdrop blur; falls back to the solid background where unsupported.

## Accessibility principles

Semantic landmarks (`header`, `nav[aria-label]`, `main`, `footer`), one `h1` per page, sequential headings, skip link, `lang="en"`, descriptive titles ("Page · Alexandros Kaminas"), alt text on the single content image, `aria-hidden` on all decorative graphics, labelled lists (`aria-label`), no hover-only information, no auto-playing sound, no flashing. Verified with axe-core (0 violations, 44 page/viewport/scheme combinations), keyboard walkthroughs and 200 % zoom checks; see `COMPLIANCE_NOTES.md`.

## Writing rules

British English. Short paragraphs. Concrete nouns and verbs. No "passionate", "cutting-edge", "at the intersection of", "leveraging", "bridging the gap". Status words are literal: *ongoing*, *completed*, *published*, *not published*. Anything not peer reviewed says so.
