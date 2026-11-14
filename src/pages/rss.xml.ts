/**
 * The blog's RSS feed, written by hand so the site needs no feed package:
 * title, link, date and summary of each published post, newest first.
 */
import type { APIRoute } from 'astro';
import { getPosts } from '../data/blog';
import { site } from '../data/site';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const items = posts
    .map((p) => {
      const url = `${site.url}/blog/${p.id}/`;
      return [
        '    <item>',
        `      <title>${esc(p.data.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${p.data.date.toUTCString()}</pubDate>`,
        `      <description>${esc(p.data.summary)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${esc(site.name)} · Blog</title>`,
    `    <link>${site.url}/blog/</link>`,
    `    <description>${esc(`A blog by ${site.name}, with a new note about every two weeks.`)}</description>`,
    '    <language>en-gb</language>',
    `    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />`,
    posts[0] ? `    <lastBuildDate>${posts[0].data.date.toUTCString()}</lastBuildDate>` : '',
    items,
    '  </channel>',
    '</rss>',
    '',
  ]
    .filter((line) => line !== '')
    .join('\n');

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
