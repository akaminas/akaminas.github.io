/**
 * Draws the figures of the blog posts: every scripts/figures/<name>.mjs (except
 * lib.mjs) exports a default function that returns the SVG as a string, and this
 * writes it to src/figures/<name>.svg. A post shows it with
 *
 *   ![What it shows](figure:<name> "Caption.")
 *
 *   npm run figures            all of them
 *   npm run figures -- name    one
 */
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const src = fileURLToPath(new URL('./figures/', import.meta.url));
const out = fileURLToPath(new URL('../src/figures/', import.meta.url));
mkdirSync(out, { recursive: true });

const only = process.argv.slice(2);
const names = readdirSync(src)
  .filter((f) => f.endsWith('.mjs') && f !== 'lib.mjs')
  .map((f) => f.slice(0, -4))
  .filter((name) => !only.length || only.includes(name));

let failed = 0;
for (const name of names) {
  try {
    const { default: draw } = await import(pathToFileURL(`${src}${name}.mjs`).href);
    const svg = draw();
    if (!svg.startsWith('<svg')) throw new Error('the function must return the SVG string');
    writeFileSync(`${out}${name}.svg`, svg);
    console.log(`${name}.svg  ${(svg.length / 1024).toFixed(1)} kB`);
  } catch (e) {
    failed++;
    console.error(`${name}: ${e.message}`);
  }
}
if (!names.length) console.error('No figure scripts found' + (only.length ? ` for: ${only.join(', ')}` : '') + '.');
process.exit(failed || !names.length ? 1 : 0);
