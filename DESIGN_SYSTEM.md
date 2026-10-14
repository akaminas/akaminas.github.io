# Design system

The site is set in **Vellum**, the figure system at <https://akaminas.github.io/vellum/> (repository `akaminas/vellum`): a white page, warm cream panels, six muted earth pigments in three steps each, a serif claim over a sans body, small spaced capitals for labels, and a dark twin on warm charcoal. The colour tokens are copied verbatim from Vellum's `style/vellum.json`; the page tokens follow the current layer of Vellum's own `docs/assets/css/site.css`. Everything lives in `src/styles/site.css`.

## Principles

1. **One hue and one texture per discipline.** Ecology and evolution are teal and drawn as a stipple field; sustainability and social systems are terracotta voxels; marine systems are indigo bathymetric contours; tools are mauve figure anatomy. A fifth texture, a network, serves the methods page. The textures are generated at build time (`src/components/Texture.astro`), coloured by CSS variables so they follow the theme, and seeded by the project id so a tile keeps its drawing between builds. A project may override its domain's texture (`texture:` in its front matter) or replace it with a real figure (`image:`), as Vellum does. The map is in `src/data/domains.ts`.
2. **The illustration is a model.** The home page carries a live island-biogeography simulation drawn as an isometric voxel archipelago (`src/components/Hero.astro`, `src/scripts/archipelago.ts`): a mainland holds eighteen lineages in the six hue families; each absent lineage reaches an island at a rate that falls with distance, each present one goes extinct at a rate that falls with area, and on large islands a lineage now and then splits into an endemic one. Near, large islands fill; far, small ones stay sparse. The land is neutral (`--land-*` tokens) so the coloured blocks read as the data. Under `prefers-reduced-motion` the model is run to equilibrium once and drawn still; without JavaScript a still voxel texture stands in. Nothing is stored and nothing leaves the page.
3. **Little text, no subtitles.** Pages open with a serif title over a 56 px accent rule and at most one lead sentence. Section heads are spaced capitals over a rule, with one link at the right and no introduction under them. The home page says one sentence per section.
4. **Progressive enhancement.** Navigation, content and textures need no JavaScript. JavaScript adds the colour-scheme toggle and the live model, and nothing else.

## Typography

| Role | Face | Size / weight | Notes |
| --- | --- | --- | --- |
| Titles, tile and course titles, publication titles, the facts | Palatino Linotype → TeX Gyre Pagella → Palatino | 400; page titles `clamp(2.6rem, 1.8rem + 2.6vw, 3.8rem)`, the home title up to 4.6 rem | letter-spacing −0.005 em (−0.02 em on the home title), `text-wrap: balance` |
| Body | Corbel → Lato → Segoe UI | 17 px, 400 and 700 | line-height 1.6, measure 68ch, lining numerals |
| Labels: navigation, section heads, buttons, facts captions | Corbel → Lato | 0.74–0.82 rem, 700 for section heads | uppercase, letter-spacing 0.14–0.2 em |
| Eyebrows, identifiers, the spec keys | Consolas → Menlo | 0.72–0.76 rem | uppercase, letter-spacing 0.12 em |

As in Vellum, the system's own Palatino and Corbel are used first (Windows, macOS); the self-hosted TeX Gyre Pagella (GUST Font License) and Lato (SIL OFL 1.1) in `public/fonts/` serve everywhere else. No remote font requests.

## Colour

Light is the default; the dark twin follows `prefers-color-scheme` unless the header toggle chose otherwise (`data-theme` on `<html>`, stored only while it differs from the system scheme, 180-day expiry; see `src/scripts/theme.ts` and `COMPLIANCE_NOTES.md`).

Vellum's families, each in three steps (tint for areas, tone for lines and dots, deep for emphasis and text on a tint):

| Family | Light tint / tone / deep | Dark tint / tone / deep | Discipline |
| --- | --- | --- | --- |
| teal | `#A5D5D7` / `#419BA0` / `#004C50` | `#3F6C6E` / `#8AE2E7` / `#BFEFF2` | ecology and evolution |
| terracotta | `#E8C0B2` / `#A1644F` / `#613425` | `#7D5A4E` / `#E8A68F` / `#FFDCD0` | sustainability and social systems; the "ongoing" dot |
| indigo | `#BBCBEC` / `#415688` / `#304168` | `#556380` / `#8099CF` / `#D8E5FF` | marine systems; the accent (deep step) |
| ochre | `#DAC9A6` / `#806629` / `#533F0D` | `#706142` / `#E1C487` / `#F4E3BF` | statistics (methods) |
| mauve | `#E0BFD8` / `#AD78A1` / `#593351` | `#76596F` / `#B984AD` / `#FBD9F2` | tools and visualisation |
| moss | `#BAD3B4` / `#567E4D` / `#2D4B27` | `#546B4F` / `#93BD89` / `#D4EDCE` | simulation (methods) |

The page:

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#FFFFFF` | `#2A2520` | the page |
| `--panel` / `--soft` | `#F7F6F3` / `#F3F1EC` | `#302B26` / `#34302A` | panels, chips, hover grounds |
| `--line` / `--frame` | `#ECE9E3` / `#D9D5CC` | `#3A352F` / `#4D463F` | hairlines; tile frames |
| `--v-ink` / `--v-secondary` / `--v-muted` | `#2A2825` / `#5A5650` / `#8A857C` | `#ECE7DF` / `#C9C4BB` / `#A29E96` | text in three weights |
| `--accent` / `--accent-soft` | `#304168` / `#E6E9F1` | `#A9B9DF` / `#333847` | links, rules, focus, the isolated node of the mark |
| `--land-top` / `--land-left` / `--land-right` / `--land-edge` / `--ripple` | `#F1EEE8` / `#E2DDD4` / `#C9C4BA` / `#FFFFFF` / `#E6E2DA` | `#474139` / `#39332D` / `#272320` / `#5A544D` / `#3A352F` | the model's land and water |

Every text/background pair in both schemes was taken from Vellum, which checks its contrast (minimum 3.27:1 for marks; ink on page 13:1). Colour never carries information alone: the status dot sits beside a word, the active navigation item is underlined, every texture is decorative and labelled where it is not.

## Textures

`Texture.astro` draws a 600 × 400 SVG (`preserveAspectRatio="xMidYMid slice"`, so it fills any frame) from a seeded generator (`src/lib/rand.ts`: FNV-1a hash, Mulberry32, value noise):

- **voxels** — an isometric cluster of cubes on a 9 × 9 grid, heights from noise under a radial mask, three faces in tint / tone / deep with gradient shading, white seams, and a few blocks drifting free (after Isomorphic Labs' cube renders).
- **stipple** — ~200 dots sampled from two Gaussian peaks, deep where the density is high, every eleventh ringed, over three lineage curves in the tint.
- **contours** — eight nested, harmonically deformed contour lines around two centres, the innermost two filled with the tint, and a dotted line of ringed records across the foot.
- **grid** — a figure's anatomy: a claim bar, a unit line, a hairline grid, a dotted reference, two series with ringed end dots and end-label bars, a footer bar.
- **network** — 26 nodes joined to their two nearest neighbours, three hubs in the deep step, one node left isolated.

`grain` adds a faint film grain (feTurbulence, multiply) and is used on the project-page bands. Tiles crop the texture to 3 : 2 with a 1 px `--frame` border and a 6 px radius; pillars crop it to 16 : 9; the methods page shows it in a 72 px disc.

## Layout

- Content width `--page` (1180 px) with a 24 px gutter (16 px under 620 px). Reading measure 68ch. Radius 12 px on panels, 6 px on tile frames.
- Header 76 px: the mark and name, navigation in spaced capitals (scrolls sideways under 900 px; no menu button), the theme toggle and a GitHub link.
- Page heads centred; the home page splits 5 : 7 between the introduction and the model (one column under 960 px).
- Sections are 112 px apart (80 px on phones). Tile grids run 3 → 2 → 1 columns at 960 and 560 px; pillars and course panels likewise.
- Project pages open with a full-bleed texture band (`.bleed`, 260–420 px tall) and a title card laid over its lower left, then a 15 rem sticky aside beside the prose.

## Components

- **Header**, **Footer** — see `src/components/`.
- **PageHeader** — eyebrow, title with rule, optional lead, slot.
- **Section** — spaced-caps head with rule and an optional link; slot.
- **Hero** — the live model, its no-script fallback and a one-line caption.
- **Texture** — see above.
- **ProjectTile** — texture or figure, serif title, one line of domain · period · status.
- **PublicationItem** — serif title linked to the DOI, authors with the owner in bold, venue, a mono line of year · status · DOI · licence · note.
- **Pillars**, **facts**, **feature**, **courses**, **methods**, **ledger** (dated rows), **spec** (key–value), **chips**, **toc** pills, **buttons** (square, uppercase; solid in ink, outline in a 1 px ink border) — classes in `site.css`.

## Interaction and motion

- Hover: links thicken their underline; tile frames turn to the accent and lift a soft shadow; textures and figures scale 4 % over 0.6 s; section links and buttons turn to the accent.
- Focus: a 2 px accent ring with 2 px offset on every interactive element.
- Targets: navigation links, buttons and icon buttons are at least 44 px tall.
- Reduced motion: all transitions collapse; the model is drawn still.
- The model runs at the display's frame rate only while visible on screen and while the tab is visible.

## Accessibility

- Landmarks on every page: skip link, `header`, `nav` (labelled), `main`, `footer`; sections are labelled by their heads.
- The canvas has `role="img"` and a description; the no-script fallback is a labelled SVG. Decorative textures are `aria-hidden`.
- Headings keep their order; tile titles are `h3` inside the link, the page title is the only `h1`.
