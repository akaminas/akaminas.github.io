# Compliance notes

Working notes on privacy, cookies, accessibility, copyright and Dutch/EU law for this site. Written by the site's builder, who is not a lawyer; the classification below distinguishes what is clearly addressed from what the owner must confirm. **Review date: 2026-09-06.** Re-review whenever the site's behaviour changes (see "Triggers for re-review").

## Jurisdiction and status assumed

- Owner: Alexandros Kaminas, a natural person resident in the Netherlands, publishing a personal professional/research portfolio.
- No commercial activity: nothing is sold, no services are offered for a fee, no contracts can be concluded through the site. It is not the website of a registered business (no KVK registration involved).
- Hosting: GitHub Pages (GitHub, Inc., USA / GitHub B.V., Amsterdam) at `https://akaminas.github.io`.
- Applicable law considered: GDPR/AVG and the Dutch implementation (UAVG); Telecommunicatiewet art. 11.7a (cookies); Auteurswet (copyright, portrait right); Directive 2019/882 (European Accessibility Act) and Dutch implementation; Dutch information duties for business websites; WCAG 2.2 as the technical accessibility standard.

## Privacy architecture (what the site actually does)

- Fully static HTML/CSS with three small inline scripts (mobile menu and colour-scheme toggle; a pre-paint reader for the stored colour-scheme choice; home-page canvas simulation). No frameworks loaded at runtime.
- No analytics, advertising, tracking pixels, fingerprinting, session replay, A/B testing or error reporting.
- No contact form, comments, newsletter, search backend or embeds. Contact is a `mailto:` link.
- No third-party requests at all: fonts, images, icons and scripts are served from the site's own origin. External profiles (GitHub, ORCID, Google Scholar, ResearchGate, RUG portal) are plain links.
- No cookies, `sessionStorage` or IndexedDB. One optional `localStorage` entry (`theme`): the colour scheme follows `prefers-color-scheme` by default; if the visitor uses the header toggle to choose the *other* scheme, that choice (`{"v":"dark"|"light","t":<timestamp>}`) is stored so it survives navigation, is ignored and removed after 180 days, and is removed immediately if the visitor toggles back to the system scheme. It holds no identifier and is never sent anywhere. Nothing is stored unless the toggle is used.
- `<meta name="referrer" content="strict-origin-when-cross-origin">` limits what outbound links reveal.
- The only processing on a visit is GitHub's own server logging.

### Audit result (production build, headless Chromium, clean profiles)

Run on 2026-09-06 with Playwright against the production build (`npm run build && astro preview`), 11 pages × 2 viewports × 2 colour schemes:

| Check | Result |
| --- | --- |
| Cookies set (`document.cookie` and browser cookie jar) | 0 |
| `localStorage` / `sessionStorage` entries | 0 / 0 without using the toggle; 1 / 0 (`theme`) after choosing the non-system scheme, removed again on toggling back (verified) |
| IndexedDB databases | 0 |
| Requests to hosts other than the site's own origin | 0 |
| Inline/external scripts | 3 inline (menu + theme toggle, theme pre-paint reader, simulation), 0 external |

**To repeat after deployment** (the hosting layer can differ from local preview): open `https://akaminas.github.io` in a fresh private window, then in DevTools check Application → Cookies / Local storage / Session storage / IndexedDB, and Network → filter by domain. Expected: no cookies, empty storage (unless you have used the theme toggle, in which case exactly one `localStorage` key, `theme`), all requests to `akaminas.github.io`. Record the date and result here. GitHub has not published a Pages-specific statement about cookies on `*.github.io`; the local audit shows the site itself sets none, and the post-deployment check is what confirms the hosting layer.

## Cookie / consent decision

- Telecommunicatiewet art. 11.7a requires informed consent before storing or reading information on a user's device, with exemptions for strictly necessary and low-privacy-impact functional/analytical uses (ACM: functional cookies may be placed without consent; AP: tracking cookies require consent, no implied consent, no cookie walls).
- This site sets no cookies and, by default, stores and reads nothing on the device. The one exception is the colour-scheme toggle (added 2026-09-06 at the owner's request): a single `localStorage` entry written only when the visitor explicitly chooses the scheme that differs from their system setting, read only to apply that choice, holding no identifier, and self-expiring after 180 days. The builder's reading is that this is a user-interface preference stored at the user's explicit request and strictly necessary to provide the requested behaviour across pages, which falls under the functional exemption in art. 11.7a(3) (the ACM's "functional cookies may be placed without consent"; the Article 29 Working Party's Opinion 04/2012 on cookie consent exemption treats UI-customisation preferences set by explicit user action the same way). This is an interpretation, not settled case law; the design keeps the stored data minimal (no storage at all unless the non-system scheme is chosen; removal when the choice becomes redundant; time limit) so that the point is as small as it can be.
- **Decision: no cookie banner and no separate cookie policy.** A short, accurate "Cookies and local storage" section in the privacy notice describes the theme entry. This is the builder's reading of the rule (the regulators' pages describe when consent *is* needed rather than stating this case explicitly), and it is the conventional one for a preference toggle.
- If any storage or third-party service is ever added, see "Triggers for re-review" before deploying.

Sources: <https://www.autoriteitpersoonsgegevens.nl/en/themes/internet-and-smart-devices/cookies>; <https://www.acm.nl/nl/verkoop-aan-consumenten/reclame-en-verleiden/online-beinvloeden/cookies-plaatsen>.

## GDPR / AVG

- **Household exemption does not apply.** Publishing to an indefinite public on the internet is not a "purely personal or household activity" (CJEU C-101/01 *Lindqvist*, para. 47; GDPR Recital 18). The owner is therefore treated as a controller for any processing he determines, and the site carries a privacy notice.
- **Processing identified:** (1) GitHub's logging of visitor IP addresses for security purposes when a Pages site is visited (GitHub docs, "What is GitHub Pages" → Data collection). GitHub performs this for its own purposes; the owner has no access to the logs and GitHub publishes no retention period. The notice describes this accurately and attributes it to GitHub. (2) Email correspondence initiated by visitors.
- **Legal bases stated in the notice:** Art. 6(1)(f) legitimate interest (secure hosting) and Art. 6(1)(b)/(f) for replying to email.
- **Art. 13 information duties covered:** controller identity and contact, purposes and legal basis, recipients/processors (GitHub; Google as mail provider), international transfers (GitHub states reliance on SCCs and EU-US Data Privacy Framework certification), retention (GitHub: not published; email: duration of correspondence), data-subject rights, right to complain to the Autoriteit Persoonsgegevens (linked).
- **Not applicable:** DPO (Art. 37 thresholds not met), DPIA (no high-risk processing), records of processing beyond this document (Art. 30(5) small-scale, occasional processing).

Sources: <https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages>; <https://docs.github.com/site-policy/privacy-policies/github-privacy-statement>; <https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A62001CJ0101>; <https://www.autoriteitpersoonsgegevens.nl/en>.

## Personal-data and doxxing audit of published content

Reviewed the supplied CV against what is published.

| Item in source CV | Published? | Note |
| --- | --- | --- |
| Personal mobile number (+30 …) | **No** | Removed from the web CV (`cv/cv-web.tex`) and never placed in site content. |
| Email address (kaminas.alex@gmail.com) | Yes | Owner approved publication (2026-09-06). To add a second (rug.nl) address, edit `src/data/site.ts`, the About and Privacy pages, and `cv/cv-web.tex`. |
| Secondary school and school grade | **No** | Removed from the web CV as unnecessary for a doctoral-level CV and mildly identifying (home town). Owner may restore it. |
| Home address, date of birth, ID numbers, signature, nationality | Not in source; not published | "Greek (native)" appears as a language skill only. |
| Supervised student's name | **No** | Owner decided (2026-09-06) not to name the student; the thesis title and year are shown without a name. |
| Collaborators' names | Yes | Co-authors and supervisors in their professional capacity only. |
| Photo metadata | Stripped | Artist name, camera and timestamps removed from all published derivatives. |
| PDF metadata (web CV) | Set deliberately | Title, author, subject only; no producer-embedded personal paths. |
| Git history | Clean | Reference material (source CV `.tex`, Apple document, source photo) was never added; `.gitignore` blocks `*.pdf` outside `public/documents/` and common reference folder names. Verified with `git log --all --name-only`. |

## Copyright audit

- Fonts: Newsreader, Public Sans, JetBrains Mono, SIL OFL 1.1, self-hosted with licence files. Compliant.
- Graphics: all original (favicon, motifs, simulation, OG image). No third-party logos or stock imagery.
- Portrait: **pending** — photographer permission to be confirmed by the owner (see `ASSET_PROVENANCE.md`). Under Dutch Auteurswet art. 19 a person portrayed in a commissioned portrait may reproduce it, but the photographer holds copyright; documenting consent avoids any doubt.
- Publications: linked by DOI only; no publisher PDFs or figures reproduced.
- Supplied reference material (Apple Style Guide, source CV, photo original) is not in the repository and not deployed.
- Repository licence: none added, per instruction. The site's own text and graphics are © the owner; the footer says so and distinguishes third-party licences.

## Accessibility

- Target: WCAG 2.2 Level AA. Implementation is described in `DESIGN_SYSTEM.md`.
- Automated: axe-core 4.x with tags wcag2a/aa, wcag21a/aa, wcag22aa, best-practice — **0 violations** on 11 pages × 2 viewports × 2 colour schemes (2026-09-06).
- Moving content (WCAG 2.2.2): the home simulation (the only moving content on the site) has a pause button and stops under reduced motion; its motion is smooth gradient flow with no flicker. The earlier decorative "watchers" were removed on 2026-09-06.
- Manual: keyboard walkthrough of every page (skip link → wordmark → nav → content; visible 3 px focus ring on all stops; mobile menu opens with Enter, closes with Escape and returns focus; simulation pause button operable); 200 % zoom equivalent (720 px viewport) without horizontal scrolling; reduced-motion mode verified (no animation frames requested, static frame drawn); dark and light schemes contrast-checked numerically.
- Screen reader: not tested with a real screen reader in this environment. Structure was verified via the accessibility tree (landmarks, headings, accessible names). **Recommended:** one pass with NVDA (Windows) on the deployed site.
- Legal applicability: the European Accessibility Act (Directive 2019/882) covers specified products and services placed on the market by economic operators (e-commerce, banking, transport, e-books, telecoms…), with a micro-enterprise exemption; Dutch government guidance frames it in terms of businesses above size thresholds. A non-commercial personal research site is outside its scope. Accessibility here is a design commitment, not a legal obligation. Sources: <https://eur-lex.europa.eu/eli/dir/2019/882/oj/eng>; <https://business.gov.nl/regulations/rules-for-accessibility-eaa/>; <https://www.w3.org/TR/WCAG22/>.

## Dutch business-website information duties

Trade name, KVK number, VAT ID and address obligations apply to registered businesses and online sellers/service providers (Business.gov.nl, "Rules for business correspondence"). This site offers no paid services and is not a business website; **no KVK/VAT/address disclosure is required and none is published.** If the site ever advertises paid consultancy, revisit this section before publishing and obtain the owner's explicit approval for any address or registration details. Source: <https://business.gov.nl/regulations/rules-business-correspondence/>.

## Security posture

- Static files only; no server code, database, forms or secrets. Nothing in the repository is sensitive (`git log --all --name-only` reviewed).
- No external JavaScript; two inline scripts authored in-repo.
- Dependencies: `astro`, `@astrojs/sitemap` (build-time); `sharp`, `@astrojs/check`, `typescript` (dev). `npm audit`: 0 vulnerabilities on 2026-09-06 after upgrading `sharp` to 0.35.x.
- HTTPS: enforced by GitHub Pages ("Enforce HTTPS" must be ticked once in repository Settings → Pages).
- CSP: GitHub Pages does not allow custom response headers. A `<meta http-equiv="Content-Security-Policy">` was **not** added because Astro inlines the two scripts and stylesheets, which would require nonces/hashes that change per build; the site makes no cross-origin requests, so the practical exposure a CSP would mitigate is already absent. Revisit if a CDN or custom domain with header control is introduced.
- Outbound links use `rel="noopener"`; profile links additionally `rel="me"`.

## Classification

**Clearly addressed:** privacy notice reachable from every page; no cookies/trackers, one documented optional preference entry; no third-party requests; hosting processing described accurately and attributed to GitHub; supervisory authority named; private CV details withheld; photo metadata stripped; fonts licensed; no third-party graphics; WCAG 2.2 AA implemented and tested; no secrets in repo.

**Apparently not applicable:** cookie consent banner; separate cookie policy; KVK/VAT/address disclosure; consumer/e-commerce rules; European Accessibility Act; DPO/DPIA.

**Implementation choices that reduce exposure:** mailto instead of a form processor; colour-scheme toggle that stores nothing unless the visitor departs from the system scheme, and then only the scheme name; self-hosted fonts; no analytics at all; DOI links instead of hosted PDFs.

**Requires owner confirmation:**
1. Owner approved publishing his portrait (2026-09-06), which settles his own portrait/personality right. Photographer's copyright permission is the owner's responsibility to hold; credit can be added to `ASSET_PROVENANCE.md`.
2. Owner approved publishing his email (2026-09-06). Gmail address is live; add the rug.nl address to `src/data/site.ts` if it should appear alongside.
3. ~~That the supervised student agrees to be named~~ — resolved: not named.
4. Post-deployment storage/cookie check on the live `github.io` domain (instructions above), then update the date in this file and in `src/data/site.ts` (`privacyRevised`) if anything differs.
5. Optional: a screen-reader pass with NVDA.

**Requires professional advice only if:** the site starts offering paid services, collecting data through forms, or using analytics; or a custom domain with a different hosting provider changes the processing.

## Triggers for re-review

Any of the following changes the analysis and must be handled *before* deploying: adding analytics or any third-party script/embed; adding a contact form or newsletter; any further use of local storage beyond the documented `theme` entry (or storing anything in it that could identify the visitor); adding cookies of any kind (then: cookie policy, consent before loading, equal accept/reject, withdrawal mechanism, documented categories/providers/lifetimes); reproducing publisher figures or logos; publishing photographs of other people; offering paid services; moving to a different host or domain.
