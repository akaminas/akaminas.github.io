/**
 * Helpers shared by the blog pages and the feed. A post is one Markdown file in
 * src/content/blog (see README.md → "Writing a blog post").
 */
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * Published posts, newest first. A post with `draft: true` appears only while
 * developing (`npm run dev`); it is left out of the built site, the list and the feed.
 */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** 2026-11-20, as the ledgers write dates. Dates are read as UTC so the day never shifts. */
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** 20 November 2026. */
export const longDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
