# Asset provenance

Every non-original asset deployed with the site, with its licence and the reason reuse is permitted. Original assets (created for this site by its author) are listed at the end. Date checked: 2026-09-06.

## Fonts

| Local file(s) | Creator | Source | Licence | Attribution | Modified | Permission basis |
| --- | --- | --- | --- | --- | --- | --- |
| `public/fonts/newsreader-latin-400-{normal,italic}.woff2` | Google Fonts (Production Type, David Jonathan Ross) | <https://github.com/google/fonts/tree/main/ofl/newsreader>, fetched via the Google Fonts CSS2 API | SIL Open Font License 1.1 | Not required for use; licence text shipped as `public/fonts/LICENSE-Newsreader-OFL.txt` | Subset to Latin by Google Fonts (no other changes) | OFL §1 permits use, bundling and redistribution in web pages; the CSS family name used, "Editorial Serif", is a local alias, not the reserved font name |
| `public/fonts/public-sans-latin-wght-{normal,italic}.woff2` | USWDS / 18F, distributed via Google Fonts | <https://github.com/google/fonts/tree/main/ofl/publicsans>, fetched via the Google Fonts CSS2 API | SIL OFL 1.1 | As above; licence text shipped as `public/fonts/LICENSE-PublicSans-OFL.txt` | Latin subset; variable weight axis (100–900) | As above; local alias "Civic Sans" |
| `public/fonts/jetbrains-mono-latin-400-normal.woff2` | JetBrains s.r.o. | <https://github.com/google/fonts/tree/main/ofl/jetbrainsmono>, fetched via the Google Fonts CSS2 API | SIL OFL 1.1 | As above; licence text shipped as `public/fonts/LICENSE-JetBrainsMono-OFL.txt` | Latin subset | As above; local alias "Grid Mono" |

Licence files: `public/fonts/LICENSE-{Newsreader,PublicSans,JetBrainsMono}-OFL.txt`, each fetched from the corresponding `ofl/` directory of <https://github.com/google/fonts> on 2026-09-07, confirming all three ship under the OFL (not Apache or UFL) in Google's own repository.

IBM Plex (the previous typeface) was replaced on 2026-09-07 because it had become a common default in AI-generated and templated sites, undermining the intent of a deliberately chosen typeface; its files and licence were removed from `public/fonts/`.

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
| `src/scripts/system-field.ts` | Home-page simulation: adaptive-landscape contours and climbing populations, drawn live on a canvas from the model in the file. |
| `public/documents/cv-alexandros-kaminas.pdf` | Web version of the CV, compiled from `cv/cv-web.tex`. Contains no third-party material. |

## Publications

The site links to publications by DOI; it does not reproduce publisher PDFs, figures or layouts. Licences shown on the publications page (CC BY 4.0 where indicated) were read from Crossref metadata on 2026-09-06 and describe the version of record at the publisher; they are informational, not a claim over the content.
