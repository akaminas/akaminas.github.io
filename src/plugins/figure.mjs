/**
 * Figures in a post. A paragraph that holds nothing but an image whose address
 * starts with "figure:" is replaced by the inline SVG of that name in
 * src/figures, with the image's title as the caption and its alt text as the
 * accessible name:
 *
 *   ![What the figure shows](figure:ricker-map "Caption under the figure.")
 *
 * The SVG is placed in the page itself, not loaded as an image, so it takes
 * the site's colours in both themes. The files are written by scripts/figures
 * (see README.md → "Figures in a post").
 */
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('../figures/', import.meta.url));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const figure = {
  name: 'figure',
  paragraph(node, ctx) {
    if (node.children.length !== 1) return;
    const img = node.children[0];
    if (img.type !== 'image' || !img.url.startsWith('figure:')) return;
    const name = img.url.slice('figure:'.length);
    const file = `${dir}${name}.svg`;
    if (!existsSync(file)) throw new Error(`Figure "${name}" not found: expected ${file}`);
    const svg = readFileSync(file, 'utf8')
      .trim()
      .replace('<svg ', `<svg role="img" aria-label="${esc(img.alt ?? '')}" `);
    const caption = img.title ? `<figcaption>${esc(img.title)}</figcaption>` : '';
    ctx.replaceNode(node, { type: 'html', value: `<figure class="fig">${svg}${caption}</figure>` });
  },
};
