# akaminas.github.io

Professional website of **Alexandros Kaminas** — mathematical and computational modelling of complex systems. Live at <https://akaminas.github.io>.

Static site built with [Astro](https://astro.build), semantic HTML, and hand-written CSS.

## Writing a blog post

Posts are Markdown files in `src/content/blog`; the file name is the post's address (`/blog/<name>/`).

1. Run `npm run post -- "Title of the post"`. It creates the file with today's date and `draft: true`.
2. Write the post, and fill in `summary` (one or two sentences, 200 characters at most: it is the line under the title on the list and in the feed).
3. Preview it with `npm run dev`. Drafts show there, marked "draft", and nowhere else.
4. Set `draft: false` and commit. The post appears on `/blog/` and in the feed at `/rss.xml` once the site is deployed.
5. A draft keeps the date it was given. Change `date` to the day you publish if that differs, since the date is shown on the post and in the feed. (The clock below does this itself.)

Images go in `public/images/blog/` and are linked as `![Description of the image](/images/blog/name.png)`; always give them a description.

### Publishing on a clock

A workflow, `.github/workflows/publish-next.yml`, publishes the drafts one by one: every day at 06:17 UTC it asks `scripts/publish-next.mjs` whether 15 days have passed since the date of the last post that is not a draft. If so, it takes the next draft, sets `draft: false` and `date` to that day, commits it to `main` and starts the deploy. On the other days it does nothing.

- **The queue** is every post with `draft: true`, in the order of their `date`, then of their file names. The date of a draft is therefore its place in the queue, not the day it will appear. To move a post up or down the queue, change its date.
- **The cadence** counts from the newest published post, so publishing one by hand (set `draft: false`, set the date) restarts the 15 days from that date. The number of days is in the workflow (`--every 15`).
- **A post that would break the build** (a missing figure, no summary, a summary over 200 characters) is not published: the run fails and GitHub reports it.
- **Now, or to look**: from the Actions tab, run "Publish the next blog post" with *force* to publish the next draft at once. Locally, `npm run publish-next -- --dry-run` says what would happen and changes nothing (`--today 2026-12-01` pretends it is that day).
- **To pause**, disable the workflow in the Actions tab. GitHub also pauses scheduled workflows in a repository with no activity for 60 days; each publication counts as activity, so it only matters once the queue is empty.

### Figures in a post

Each post has one explanatory figure, drawn as an inline SVG so it takes the site's palette in the light and the dark theme.

1. Write `scripts/figures/<name>.mjs`. It default-exports a function that returns the SVG string, built with the helpers in `scripts/figures/lib.mjs` (the file header lists the drawing grammar and the class names). A figure that shows model output or data is computed in the script, with a seeded generator, so it can be redrawn and checked.
2. Run `npm run figures` (all of them) or `npm run figures -- <name>`. It writes `src/figures/<name>.svg`; commit both files.
3. In the post, on a paragraph of its own: `![What the figure shows, for a reader who cannot see it.](figure:<name> "Caption: the claim the figure supports.")`. The alt text becomes the accessible name of the drawing and the title becomes the caption. `src/plugins/figure.mjs` does the replacement when the site is built.

The drawings are 480 units wide with 12-unit type, so keep the words few. If a changed drawing does not show under `npm run dev`, save the post file again.
