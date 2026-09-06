# Asset provenance

Every non-original asset deployed with the site, with its licence and the reason reuse is permitted. Original assets (created for this site by its author) are listed at the end. Date checked: 2026-09-06.

## Fonts

| Local file(s) | Creator | Source | Licence | Attribution | Modified | Permission basis |
| --- | --- | --- | --- | --- | --- | --- |
| `public/fonts/ibm-plex-sans-latin-wght-normal.woff2`, `…-italic.woff2` | IBM Corp. (Mike Abbink, Bold Monday) | npm `@fontsource-variable/ibm-plex-sans` 5.3.0, built from <https://github.com/IBM/plex> | SIL Open Font License 1.1 | Not required for use; licence text shipped as `public/fonts/LICENSE-IBM-Plex-OFL.txt` | Subset to Latin by Fontsource (no other changes) | OFL §1 permits use, bundling and redistribution in web pages; reserved font name "Plex" is not used as the family name in CSS |
| `public/fonts/ibm-plex-serif-latin-{400,500}-{normal,italic}.woff2` | IBM Corp. | npm `@fontsource/ibm-plex-serif` 5.3.0, from <https://github.com/IBM/plex> | SIL OFL 1.1 | As above | Latin subset | As above |
| `public/fonts/ibm-plex-mono-latin-400-normal.woff2` | IBM Corp. | npm `@fontsource/ibm-plex-mono` 5.3.0, from <https://github.com/IBM/plex> | SIL OFL 1.1 | As above | Latin subset | As above |

Licence file: `public/fonts/LICENSE-IBM-Plex-OFL.txt` (copied from the package; header lists IBM Plex Serif faces, the OFL text is identical for all Plex families). Verified against <https://github.com/IBM/plex/blob/master/LICENSE.txt> on 2026-09-06.

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
