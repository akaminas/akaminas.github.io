# Asset provenance

Every non-original asset deployed with the site, with its licence and the reason reuse is permitted. Original assets (created for this site by its author) are listed at the end. Date checked: 2026-09-06.

## Fonts

| Local file(s) | Creator | Source | Licence | Attribution | Modified | Permission basis |
| --- | --- | --- | --- | --- | --- | --- |
| `public/fonts/google-sans-flex-latin-wght-slnt.woff2` | Google LLC | Google Fonts, fetched via the Google Fonts CSS2 API on 2026-09-10 (`family=Google+Sans+Flex:slnt,wght@-10..0,1..1000`) | SIL OFL 1.1 | Not required for use; licence text shipped as `public/fonts/LICENSE-GoogleSansFlex-OFL.txt` | Latin subset; variable weight (1–1000) and slant (−10–0) axes retained, all other axes (`opsz`, `wdth`, `GRAD`, `ROND`) instanced out by Google Fonts to keep the file at 78 kB | OFL §1 permits use, bundling and redistribution in web pages; the family is used under its own name, and the font declares no Reserved Font Name |
| `public/fonts/jetbrains-mono-latin-400-normal.woff2` | JetBrains s.r.o. | <https://github.com/google/fonts/tree/main/ofl/jetbrainsmono>, fetched via the Google Fonts CSS2 API | SIL OFL 1.1 | As above; licence text shipped as `public/fonts/LICENSE-JetBrainsMono-OFL.txt` | Latin subset | As above; local alias "Grid Mono" |

Licence basis for Google Sans Flex: the family is not published in the `google/fonts` GitHub repository, so the licence was verified from two other sources on 2026-09-10 — the Google Fonts family metadata endpoint (`https://fonts.google.com/metadata/fonts/Google%20Sans%20Flex`), which reports `"license": "ofl"`, and the font's own `name` table, which records the copyright "Copyright 2015 Google LLC. All Rights Reserved." and the licence URL <https://openfontlicense.org>. `public/fonts/LICENSE-GoogleSansFlex-OFL.txt` carries that copyright line above the standard OFL 1.1 text. `public/fonts/LICENSE-JetBrainsMono-OFL.txt` was fetched from the `ofl/` directory of <https://github.com/google/fonts> on 2026-09-07.

Typeface history. IBM Plex was replaced on 2026-09-07 because it had become a common default in AI-generated and templated sites. Its replacements — Newsreader (headings) and Public Sans (text) — were themselves replaced on 2026-09-10 by the single family Google Sans Flex, because the large-serif-heading-over-sans-body pairing carried the same problem; their files and licences were removed from `public/fonts/`.

No font from the supplied Apple material was used. Apple's San Francisco typefaces are proprietary and were not considered.

## Photographs

| Local file(s) | Creator | Source | Licence | Attribution | Modified | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `public/images/portrait-{480,960}.{avif,webp}`, `portrait-640.jpg` | Photographer credited in the file's EXIF as "Leo" (Canon EOS RP, 30 May 2025) | Supplied by Alexandros Kaminas for this site | **Not yet documented** — copyright rests with the photographer unless assigned | None displayed; the privacy page states the photo remains the photographer's copyright | Cropped to 4:5, resized, re-encoded; all EXIF/IPTC metadata (including the artist name, camera and timestamps) stripped by `scripts/make-assets.mjs` | Owner approved publication on 2026-09-06 (his own likeness; no third parties depicted). Photographer's copyright: a commissioned portrait can normally be reproduced by the person portrayed under Dutch Auteurswet art. 19; the owner is responsible for holding the photographer's OK. |

The source photograph is not in the repository.

## Icons, logos and other third-party graphics

None. No third-party logos (university, funder, journal, conference, society) are reproduced. External services are referenced by name in plain text links.

## Original assets (© Alexandros Kaminas, created for this site)

| Asset | Description |
| --- | --- |
| `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | Two-patch glyph (filled dot, ring, dashed link). Raster versions generated from the SVG by `scripts/make-assets.mjs`. |
| `public/og.png` | Social preview, rendered from `scripts/og.html` (text + glyph, self-hosted fonts). |
| `src/components/Motif.astro` | Seven line drawings used on project cards and pages. |
| `src/components/PhyloNetwork.astro` | Home-page figure: a schematic phylogenetic network — a consensus species tree over a cloud of discordant gene histories, with reticulation edges. Generated at build time from a seeded model in the file and emitted as static SVG; no data from any source is reproduced. |
| `public/documents/cv-alexandros-kaminas.pdf` | Web version of the CV, compiled from `cv/cv-web.tex`. Contains no third-party material. |

## Publications

The site links to publications by DOI; it does not reproduce publisher PDFs, figures or layouts. Licences shown on the publications page (CC BY 4.0 where indicated) were read from Crossref metadata on 2026-09-06 and describe the version of record at the publisher; they are informational, not a claim over the content.
