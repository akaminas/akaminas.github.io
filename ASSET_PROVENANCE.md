# Asset provenance

Every non-original asset deployed with the site, with its licence and the reason reuse is permitted. Original assets (created for this site by its author) are listed at the end. Date checked: 2026-10-14.

## Fonts

| Local file(s) | Creator | Source | Licence | Attribution | Modified | Permission basis |
| --- | --- | --- | --- | --- | --- | --- |
| `public/fonts/texgyrepagella-regular.woff2` | GUST e-foundry (B. Jackowski, J. M. Nowacki) | Copied on 2026-10-14 from the Vellum repository (`docs/assets/fonts/`), which serves it as the web fallback for Palatino; original at <https://www.gust.org.pl/projects/e-foundry/tex-gyre/pagella> | GUST Font License (LPPL-based) | Not required for use; licence text shipped as `public/fonts/LICENSE-TeXGyrePagella-GUST.txt` | WOFF2 conversion, regular weight only | The GUST Font License permits use, bundling and redistribution; the file is unmodified and its licence travels with it |
| `public/fonts/lato-latin-{400-normal,400-italic,700-normal}.woff2` | Łukasz Dziedzic (tyPoland) | Google Fonts, fetched via the Google Fonts CSS2 API on 2026-10-14 (`family=Lato:ital,wght@0,400;0,700;1,400`); repository <https://github.com/google/fonts/tree/main/ofl/lato> | SIL OFL 1.1 | Not required for use; licence text shipped as `public/fonts/LICENSE-Lato-OFL.txt` (fetched from the `ofl/lato` directory of the repository) | Latin subsets as served by Google | OFL §1 permits use, bundling and redistribution in web pages; the family is used under its own name |

The font stacks are Vellum's: `'Palatino Linotype', 'TeX Gyre Pagella', Palatino, serif` for titles and `Corbel, Lato, 'Segoe UI', sans-serif` for text, so Windows and macOS render with their own Palatino and Corbel and the files above serve everywhere else.

Typeface history. IBM Plex was replaced on 2026-09-07 because it had become a common default in AI-generated and templated sites; Newsreader / Public Sans, Google Sans Flex, Roboto Slab / Roboto Mono and then Caveat Brush / Nunito followed on 2026-09-10 as the site was rebuilt as an illustrated homepage. On 2026-10-14 the site was restyled after the owner's Vellum figure system and the Caveat Brush and Nunito files and licences were removed from `public/fonts/`.

No font from the supplied Apple material was used. Apple's San Francisco typefaces are proprietary and were not considered.

## Photographs

| Local file(s) | Creator | Source | Licence | Attribution | Modified | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `public/images/portrait-{480,960}.{avif,webp}`, `portrait-640.jpg` | Photographer credited in the file's EXIF as "Leo" (Canon EOS RP, 30 May 2025) | Supplied by Alexandros Kaminas for this site | **Not yet documented** — copyright rests with the photographer unless assigned | None displayed; the privacy page states the photo remains the photographer's copyright | Cropped to 4:5, resized, re-encoded; all EXIF/IPTC metadata (including the artist name, camera and timestamps) stripped by `scripts/make-assets.mjs` | Owner approved publication on 2026-09-06 (his own likeness; no third parties depicted). Photographer's copyright: a commissioned portrait can normally be reproduced by the person portrayed under Dutch Auteurswet art. 19; the owner is responsible for holding the photographer's OK. |

The source photograph is not in the repository.

## Icons, logos and other third-party graphics

None. No third-party logos (university, funder, journal, conference, society) are reproduced. External services are referenced by name in plain text links. The textures and the home-page model are drawn by the site's own code from geometric primitives; they reproduce no trademarked element, product or logo.

## Reused own work

| Local file(s) | Source | Licence |
| --- | --- | --- |
| `public/images/vellum-surface3d-{light,dark}.webp` | Thumbnails of the "Two adaptive peaks" interactive figure from the owner's Vellum project (`docs/figures/interactive/thumbs/` in `akaminas/vellum`, drawn by `docs/assets/js/interactive/surface3d.js`) | CC BY 4.0 (Vellum's licence for its text and figures); the owner's own work |

## Original assets (© Alexandros Kaminas, created for this site)

| Asset | Description |
| --- | --- |
| `src/components/Texture.astro` | Five generative textures (voxels, stipple, contours, grid, network) drawn as inline SVG at build time from a seeded generator (`src/lib/rand.ts`); one per discipline, coloured by the theme. |
| `src/scripts/archipelago.ts` | The home-page model: an isometric voxel archipelago running an island-biogeography simulation on a canvas. Static code, no data, nothing stored. |
| `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | The mark: three ink nodes joined in a triangle and one indigo node reached by a single edge, on a cream tile — a connected community and an isolated one. The raster versions are rendered from the SVG by `scripts/render-assets.py` with a headless Edge or Chrome; the app icons are full-bleed squares, since the platform applies its own mask. |
| `public/og.png` | Social preview, rendered from `scripts/og.html` by `scripts/render-assets.py` (text and a voxel cluster; system Palatino and Corbel). |
| `public/documents/cv-alexandros-kaminas.pdf` | Web version of the CV, compiled from `cv/cv-web.tex`. Contains no third-party material. |

## Publications

The site links to publications by DOI; it does not reproduce publisher PDFs, figures or layouts. Licences shown on the publications page (CC BY 4.0 where indicated) were read from Crossref metadata on 2026-09-06 and describe the version of record at the publisher; they are informational, not a claim over the content.
