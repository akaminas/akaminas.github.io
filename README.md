# akaminas.github.io

Professional website of **Alexandros Kaminas** — mathematical and computational modelling of complex systems. Live at <https://akaminas.github.io>.

Static site built with [Astro](https://astro.build), semantic HTML, and hand-written CSS.

## Writing a blog post

Posts are Markdown files in `src/content/blog`; the file name is the post's address (`/blog/<name>/`).

1. Run `npm run post -- "Title of the post"`. It creates the file with today's date and `draft: true`.
2. Write the post, and fill in `summary` (one or two sentences, 200 characters at most: it is the line under the title on the list and in the feed).
3. Preview it with `npm run dev`. Drafts show there, marked "draft", and nowhere else.
4. Set `draft: false` and commit. The post appears on `/blog/` and in the feed at `/rss.xml` once the site is deployed.
5. A draft keeps the date it was given. Change `date` to the day you publish if that differs, since the date is shown on the post and in the feed.

Images go in `public/images/blog/` and are linked as `![Description of the image](/images/blog/name.png)`; always give them a description.
