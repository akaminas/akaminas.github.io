/**
 * Starts a blog post: copies src/content/blog/_template.md to a new file named
 * after the title, with today's date and draft: true.
 *
 *   npm run post -- "Title of the post"
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run post -- "Title of the post"');
  process.exit(1);
}

const d = new Date();
const today = [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');

// The file name is the post's address (/blog/<name>/). A title with no Latin letters or digits falls back to the date.
const slug =
  title
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `post-${today}`;

const dir = fileURLToPath(new URL('../src/content/blog/', import.meta.url));
const file = `${dir}${slug}.md`;
if (existsSync(file)) {
  console.error(`${file} already exists.`);
  process.exit(1);
}

const text = readFileSync(`${dir}_template.md`, 'utf8')
  .replace('TITLE', () => JSON.stringify(title))
  .replace('DATE', () => today);
writeFileSync(file, text);
console.log(`Created ${file}`);
