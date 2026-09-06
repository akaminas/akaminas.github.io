# Design system

The site belongs to a modeller of complex systems. The design language is taken from that work, not from ecology imagery and not from software-portfolio conventions: entities, interactions, trajectories and limited flow between compartments. Everything else is typography and space.

## Principles

1. **Hierarchy through type, not boxes.** One serif for headings, one sans for text, one mono for labels, all from a single family (IBM Plex). Sections are separated by hairline rules, not cards.
2. **Restraint.** One accent colour, used only for signal: the active nav marker, the "ongoing" status dot, migrants in the simulation, hover states. Everything else is ink on paper.
3. **The modelling language persists, the subject changes.** Every project has a small line drawing in the same grammar (dots = entities, lines = interactions or paths, dashes = limited flow). The home-page simulation is a real, tiny model rather than decorative particles.
4. **Nothing is only visual.** The simulation is captioned and labelled decorative; every claim on the methods page is linked to the project where the method was used; publication status is written out.
5. **Progressive enhancement.** Navigation, content and layout work without JavaScript. JavaScript adds the mobile menu toggle and the simulation, and both fail silently.
6. **Meaningful motion only.** (The watchers are the one indulgence: rare, short, silent, and in the margins.) Transitions are 140–220 ms and limited to colour and small transforms. The simulation stops when off-screen, when the tab is hidden, when the visitor pauses it, and never starts under `prefers-reduced-motion` (a static frame is drawn instead).

The attached Apple document turned out to be the *Apple Style Guide* (editorial), not the Human Interface Guidelines. Its transferable advice was applied to copy rather than layout: consistent terminology across pages, active voice, plain language, no idioms, jargon defined at first use.

## Typography

| Role | Face | Weights | Notes |
| --- | --- | --- | --- |
| Headings, publication titles, dates | IBM Plex Serif | 400, 500 (+ italics) | `letter-spacing: -0.012em`, `text-wrap: balance` |
| Body, UI | IBM Plex Sans (variable) | 100–700 axis; 400/500/600 used | 17–18.4 px body, line-height 1.6 |
| Labels, metadata, tags | IBM Plex Mono | 400 | Uppercase, 0.06–0.08 em tracking, 0.74–0.84 rem |

All fonts are self-hosted from `public/fonts/` as Latin-subset WOFF2 (SIL OFL 1.1; see `ASSET_PROVENANCE.md`). Two files are preloaded (sans regular, serif regular); the rest load with `font-display: swap`. No remote font requests.

Fluid type scale (`--step--1` … `--step-5`), clamped between 360 px and 1280 px viewports. Reading measure is 66ch. Paragraphs never exceed it; lists and tables are exempt.

## Colour

Light ("paper") and dark ("slate") schemes follow `prefers-color-scheme`; there is no toggle because storing a choice would require local storage, and the site stores nothing.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#f4f2ed` | `#141518` | page |
| `--ink` | `#191b1f` | `#e9e7e2` | text (15.4:1 / 14.8:1) |
| `--muted` | `#5b5f66` | `#a8abb2` | secondary text (5.7:1 / 7.9:1) |
| `--line` / `--line-strong` | `#d6d2c9` / `#b9b4aa` | `#2d3036` / `#454950` | rules, borders (non-text) |
| `--accent` | `#a63e16` | `#f0935c` | signal only (5.65:1 / 7.85:1) |
| `--focus` | `#1f4bd8` | `#8fb0ff` | focus ring |

All text/background pairs meet WCAG 2.2 AA (4.5:1) in both schemes; contrast ratios were computed, not eyeballed. Colour never carries information alone: status dots are always accompanied by a word, patches in the simulation are also separated spatially and labelled.

## Spacing and layout

- 4 px base grid via `--space-1` (0.25 rem) to `--space-9` (7 rem). Section padding is `--space-8` (4.5 rem).
- Container `min(100% − 2·gutter, 76rem)`; gutter `clamp(1.25rem, 4vw, 3rem)`.
- The editorial grid `.grid-label` puts a sticky label column (10–16 rem) beside content from 52 rem upwards and stacks below.
- Lists of records (publications, talks, timeline) use `.ruled`: hairline rules between items, a serif date/year column, content column.
- Breakpoints: 42 rem (two-column records), 48 rem (mobile menu ↔ inline nav), 52 rem (label grid, two-column cards), 60 rem (hero side-by-side), 64 rem (two-column cards on Work).

## Components

- **Header**: wordmark (two-patch glyph + name), primary nav with underline active state (`aria-current="page"`). Below 48 rem, JS reveals a labelled "Menu" button (`aria-expanded`, `aria-controls`, Escape closes and returns focus). Without JS the list is simply visible.
- **Project card**: motif + domain label, linked title and question, status + period, up to three method tags. The link wraps only the title and question so the accessible name is clean.
- **Publication item**: year and status column; linked title (DOI), authors with the owner highlighted, venue, DOI and licence in mono.
- **Motif**: seven original SVG drawings (`patches`, `bipartite`, `fold`, `hypervolume`, `nested`, `records`, `field`), `aria-hidden`, drawn in `currentColor` with one accent dot.
- **SystemField**: the home simulation (see `src/scripts/system-field.ts` for the model). Canvas is `aria-hidden`; the figure caption states what it is and that it is decorative; a real `<button aria-pressed>` pauses it.
- **Watchers**: an abstract circular eye (pale disc, two thin concentric rings, round pupil, one glint) that surfaces from a soft round ink pool in the page margin, follows the pointer, blinks once or twice and sinks back. One at a time; first after 10–25 s, then every 25–70 s; 2.5–5 s each; sized to the free margin (76–180 px); lower corners only on narrow screens; never over the header or the text column; never under reduced motion. The drawing is original and deliberately minimal so it reads as a sleek motif, not a character or a jump-scare.
- **Tags**: mono labels in hairline pills. Never proficiency bars or percentages.
- **Buttons**: 44 px minimum height, 1 px border; primary is filled ink. Hover changes border/background, never only colour of text.

## Interaction and motion rules

- Hover: colour shift to accent and/or underline; arrow links translate the arrow 0.2 em.
- Focus: 3 px focus ring in `--focus` with 3 px offset on every interactive element (`:focus-visible`).
- Targets: ≥ 44 × 44 CSS px for nav links, buttons and footer links; inline text links are exempt as permitted by WCAG 2.2 SC 2.5.8.
- Reduced motion: all transitions and animations collapse to ~0 ms; the simulation renders one static frame and hides its play/pause button.
- Sticky header uses a translucent background with backdrop blur; falls back to the solid background where unsupported.

## Accessibility principles

Semantic landmarks (`header`, `nav[aria-label]`, `main`, `footer`), one `h1` per page, sequential headings, skip link, `lang="en"`, descriptive titles ("Page · Alexandros Kaminas"), alt text on the single content image, `aria-hidden` on all decorative graphics, labelled lists (`aria-label`), no hover-only information, no auto-playing sound, no flashing. Verified with axe-core (0 violations, 44 page/viewport/scheme combinations), keyboard walkthroughs and 200 % zoom checks; see `COMPLIANCE_NOTES.md`.

## Writing rules

British English. Short paragraphs. Concrete nouns and verbs. No "passionate", "cutting-edge", "at the intersection of", "leveraging", "bridging the gap". Status words are literal: *ongoing*, *completed*, *published*, *not published*. Anything not peer reviewed says so.
