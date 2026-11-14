/**
 * The clock behind the blog. Publishes the next draft when enough days have passed
 * since the last post went out, and does nothing otherwise, so it is safe to run every
 * day (the workflow in .github/workflows/publish-next.yml does).
 *
 *   - The last post is the newest one that is not a draft; the clock counts from its date.
 *   - The next post is the draft with the earliest `date`, then by file name. The dates of
 *     the drafts therefore set the order of the queue; they are not publication dates.
 *   - Publishing sets `draft: false` and sets `date` to today (UTC), the day it goes out.
 *   - A draft that would break the build (a missing figure, no summary, a summary over 200
 *     characters) is not published: the script stops with an error instead.
 *
 *   npm run publish-next -- --dry-run     say what would happen, change nothing
 *   npm run publish-next -- --force       publish the next draft now, whatever the date of the last
 *   options: --every 15 (days between posts) · --today 2026-12-01 (pretend it is that day)
 *            --root <dir> (a copy of the repository, for testing)
 */
import { appendFileSync, existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const args = process.argv.slice(2);
const has = (name) => args.includes(`--${name}`);
const opt = (name, fallback) => {
  const i = args.findIndex((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (i < 0) return fallback;
  return args[i].includes('=') ? args[i].split('=').slice(1).join('=') : args[i + 1];
};

const root = opt('root', fileURLToPath(new URL('../', import.meta.url)));
const every = Number(opt('every', 15));
const today = opt('today', new Date().toISOString().slice(0, 10));
const dryRun = has('dry-run');
const force = has('force');

const fail = (message) => {
  console.error(`publish-next: ${message}`);
  process.exit(1);
};
if (!Number.isFinite(every) || every < 1) fail(`--every must be a number of days, got "${opt('every')}".`);
if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) fail(`--today must be YYYY-MM-DD, got "${today}".`);

const days = (iso) => Date.parse(`${iso}T00:00:00Z`) / 86400000;
const addDays = (iso, k) => new Date((days(iso) + k) * 86400000).toISOString().slice(0, 10);

const dir = join(root, 'src', 'content', 'blog');
const field = (front, key) => front.match(new RegExp(`^${key}:[ \\t]*(.*?)[ \\t]*$`, 'm'))?.[1];
const unquote = (v = '') => {
  try {
    return JSON.parse(v);
  } catch {
    return v.replace(/^['"]|['"]$/g, '');
  }
};

const posts = readdirSync(dir)
  .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  .sort()
  .map((file) => {
    const text = readFileSync(join(dir, file), 'utf8');
    const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) fail(`${file} has no frontmatter.`);
    const date = field(m[1], 'date');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date ?? '')) fail(`${file} has no date in the form YYYY-MM-DD.`);
    return {
      file,
      slug: file.slice(0, -3),
      text,
      frontEnd: m[0].length,
      date,
      draft: field(m[1], 'draft') === 'true',
      title: unquote(field(m[1], 'title')),
      summary: unquote(field(m[1], 'summary')),
    };
  });

const published = posts.filter((p) => !p.draft);
const queue = posts.filter((p) => p.draft).sort((a, b) => a.date.localeCompare(b.date) || a.file.localeCompare(b.file));
const last = published.map((p) => p.date).sort().at(-1);
const due = last ? addDays(last, every) : today;

console.log(`${published.length} published, ${queue.length} in the queue.`);
console.log(last ? `Last post: ${last}. The next is due from ${due}.` : 'Nothing published yet.');

if (!queue.length) {
  console.log('The queue is empty: nothing to publish.');
  process.exit(0);
}
const next = queue[0];
if (!force && days(today) < days(due)) {
  console.log(`Today is ${today}, so nothing is published. Next in the queue: ${next.slug} ("${next.title}").`);
  process.exit(0);
}

// Refuse a draft that would break the build.
if (!next.title) fail(`${next.file} has no title.`);
if (!next.summary) fail(`${next.file} has no summary.`);
if (next.summary.length > 200) fail(`${next.file}: the summary is ${next.summary.length} characters, the limit is 200.`);
for (const [, name] of next.text.matchAll(/\]\(figure:([a-z0-9-]+)/g)) {
  if (!existsSync(join(root, 'src', 'figures', `${name}.svg`))) fail(`${next.file} uses the figure "${name}", but src/figures/${name}.svg does not exist.`);
}

if (dryRun) {
  console.log(`Would publish ${next.slug} ("${next.title}") with the date ${today}. Dry run: nothing changed.`);
  process.exit(0);
}

const head = next.text.slice(0, next.frontEnd);
const rest = next.text.slice(next.frontEnd);
const newHead = head.replace(/^draft:[ \t]*true[ \t]*$/m, 'draft: false').replace(/^date:[ \t]*\S+[ \t]*$/m, `date: ${today}`);
if (newHead === head) fail(`${next.file}: could not change the frontmatter.`);
writeFileSync(join(dir, next.file), newHead + rest);
console.log(`Published ${next.slug} ("${next.title}") with the date ${today}.`);

if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `published=${next.slug}\ntitle=${next.title}\n`);
