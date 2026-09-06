# akaminas.github.io

Professional website of **Alexandros Kaminas** — mathematical and computational modelling of complex systems. Live at <https://akaminas.github.io>.

Static site built with [Astro](https://astro.build), semantic HTML, hand-written CSS and two small scripts. No framework runtime, no analytics, no cookies, no third-party requests. Deployed to GitHub Pages by GitHub Actions on every push to `main`.

Companion documents: [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) (visual system and rules), [`ASSET_PROVENANCE.md`](ASSET_PROVENANCE.md) (licences of every non-original asset), [`COMPLIANCE_NOTES.md`](COMPLIANCE_NOTES.md) (privacy, cookies, accessibility, copyright, legal review).

## Working on the site

Requirements: Node.js 20 or newer (22 recommended), npm, Git. Open the folder in VS Code; the Astro extension is recommended automatically.

```bash
npm install        # once, and after pulling dependency changes
npm run dev        # local preview with live reload — Astro prints the URL (usually http://localhost:4321)
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run check      # type-check .astro/.ts files
```

Publishing is just Git:

```bash
git add .
git commit -m "content: add 2027 paper"
git push
```

The workflow in `.github/workflows/deploy.yml` builds and deploys automatically (Settings → Pages → Source must be set to **GitHub Actions** once). A deployment takes about a minute; progress is under the repository's *Actions* tab.

## Repository layout

```
.github/workflows/deploy.yml   GitHub Pages deployment
cv/cv-web.tex                  LaTeX source of the web CV (no private details)
public/                        Files copied verbatim to the site root
  documents/cv-alexandros-kaminas.pdf
  fonts/                       IBM Plex (self-hosted, OFL)
  images/                      Portrait derivatives (AVIF/WebP/JPEG)
  favicon.svg, og.png, robots.txt, site.webmanifest, icons
scripts/make-assets.mjs        Regenerates icons and portrait variants
scripts/og.html                Template for the social preview image
src/
  content.config.ts            Schemas for the content collections
  content/projects/*.md        One case study per project
  content/publications/*.json  One publication per file
  content/talks/*.json         One talk/poster per file
  content/teaching/*.md        Supervision, teaching, service, outreach
  data/site.ts                 Name, email, affiliation, profile links, navigation
  layouts/Base.astro           <head>, metadata, header/footer
  components/                  Header, Footer, ProjectCard, PublicationItem, Motif, SystemField, PageHeader
  pages/                       Routes (index, work, methods, publications, teaching, about, cv, privacy, 404)
  scripts/system-field.ts      Home-page simulation
  styles/global.css            Tokens, typography, layout primitives
```

## Updating content

Everything routine is a content file. Field names are validated at build time by `src/content.config.ts`; a typo in a field name fails the build with a clear message rather than publishing something broken.

### Add a publication

Create `src/content/publications/<firstauthor-year-keyword>.json`:

```json
{
  "year": 2027,
  "authors": ["Kaminas, A.", "van Doorn, G. S.", "Etienne, R. S."],
  "title": "Title exactly as published",
  "venue": "Journal name",
  "volume": "12",
  "issue": "3",
  "pages": "100–120",
  "doi": "10.xxxx/xxxxx",
  "status": "published",
  "licence": "CC BY 4.0",
  "highlight": true,
  "projects": ["evolutionary-consequences-of-isolation"]
}
```

`status` must be one of `published`, `accepted`, `preprint`, `manuscript`, `in-progress` and is displayed as written — nothing unreviewed will look peer reviewed. Write your own name as `Kaminas, A.` so it is highlighted. For very long author lists give the first few and add `"etAl": 173`. `highlight: true` puts it in the "Selected" list. `projects` links it to case studies (use the file name of the project without `.md`). The publication also appears automatically on the CV page.

### Add a project (case study)

Create `src/content/projects/<slug>.md` with the front matter used by the existing files (`title`, `question`, `summary`, `domain`, `role`, `period`, `status`, `methods`, `tools`, `institutions`, `collaborators`, `funding`, `publications`, `talks`, `links`, `motif`, `featured`, `order`) and a body with `## Question`, `## System`, `## Model structure`/`## Approach`, `## Status` sections. `featured: true` shows it on the home page; `order` sorts it; `domain` places it under the right heading on the Work page; `motif` picks one of the drawings in `src/components/Motif.astro`. The URL becomes `/work/<slug>/`.

### Add a talk or poster

Create `src/content/talks/<event-year-keyword>.json` with `title`, `event`, `location`, `date` (`YYYY-MM`), `type` (`oral`, `poster`, `invited`, `seminar`), `authors`, optional `abstract`, `note`, `project`. It appears on the Work page (Talks), on the linked project page and on the CV page.

### Add a supervised student or teaching role

Create `src/content/teaching/<slug>.md` with `title`, `role`, `institution`, `period`, `kind` (`supervision`, `teaching`, `service`, `outreach`), and for supervision `thesis`, optionally `student` (only with the student's agreement) and `project`. The body is a short description of the work.

### Replace the CV

Edit `cv/cv-web.tex` (keep private details out), then:

```bash
cd cv && pdflatex cv-web.tex && pdflatex cv-web.tex && cd ..
copy cv\cv-web.pdf public\documents\cv-alexandros-kaminas.pdf     # Windows
```

The HTML CV page (`src/pages/cv.astro`) has its own short tables for education, roles and awards; publications and talks come from the content collections. Update both when something changes.

### Replace the profile photo

Keep the original outside the repository. Run:

```bash
node scripts/make-assets.mjs "C:\Users\User\Documents\Website_References\photos\portrait.jpg"
```

This writes the AVIF/WebP/JPEG variants to `public/images/` with all metadata stripped, and rebuilds the icons. Update `ASSET_PROVENANCE.md` with the photographer and permission.

### Edit the home page copy, affiliation or links

- Headline, lede and section text: `src/pages/index.astro`.
- Name, position, affiliation, email, profile URLs, navigation: `src/data/site.ts`.
- About page biography and timelines: `src/pages/about.astro`.
- Methods page: `src/pages/methods.astro` (each method lists the projects that evidence it — keep that honest).

### Social preview image

Edit `scripts/og.html`, then render it at 1200×630 to `public/og.png` (for example `npx playwright screenshot --viewport-size=1200,630 scripts/og.html public/og.png`, or a browser screenshot).

## Custom domain later

Buy the domain, add a `CNAME` file in `public/` containing it, set it in Settings → Pages, and change `site` in `astro.config.mjs`. Nothing else references the address.

## Privacy and reference material

Raw reference material (full CV, source photos, manuscripts, the Apple document) must stay outside this repository, for example in `..\Website_References\`. `.gitignore` blocks common folder names and all PDFs except the web CV, but check `git status` before committing. Nothing becomes public unless it is deliberately placed in `public/` or `src/`.

Astro's anonymous telemetry is a developer-machine setting; disable it once with `npx astro telemetry disable`.

## Licence

No open-source licence has been applied to this repository. Site text and original graphics © Alexandros Kaminas. Fonts are IBM Plex under the SIL Open Font License 1.1 (see `public/fonts/LICENSE-IBM-Plex-OFL.txt`).
