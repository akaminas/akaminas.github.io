/**
 * Drawing helpers for the figures in the blog posts. One drawing grammar for
 * all of them, the same as the motifs on the project pages:
 *
 *   ink outlines and axes; one pastel tone (A) for areas; the deep mix of that
 *   tone for the thing being followed; a second tone (B) for the thing it is
 *   compared with; dashes for what is not actually there (an unstable state, a
 *   limit, a threshold, an assumption); labels written on the drawing, not in a
 *   legend; no title (the caption under the figure carries the claim).
 *
 * The drawings are plain SVG that uses classes from src/styles/global.css
 * (.fig svg ...), so the colours follow the site's palette in both themes.
 * Every figure is 480 units wide, so type that is 12 units high is about 16 px
 * on a desktop and about 8.5 px on a phone: keep the words few.
 *
 * Classes (see global.css for what each one draws):
 *   lines   ax axis · gr grid hairline · ln ink line · dash (dashes, add to any line)
 *           la  followed line, tone A · lb followed line, tone B · sa soft line A · sb soft line B
 *   shapes  fa area A · fb area B · fad deep A · fbd deep B · fas / fbs see-through A / B · fn neutral · fp paper
 *   text    tx ink · tm muted · ta deep A · tb deep B · ts small muted (10.5) · tt bold ink
 *           halo (add to any text, e.g. 'ta halo') puts a page-coloured outline round it, for a label that sits on dots or lines
 */

export const W = 480;

/** One decimal, no "-0": keeps the files small. */
export const n = (v) => {
  const s = String(Math.round(v * 10) / 10);
  return s === '-0' ? '0' : s;
};
/** Two decimals, for small coordinates. */
export const n2 = (v) => {
  const s = String(Math.round(v * 100) / 100);
  return s === '-0' ? '0' : s;
};
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * The whole drawing. `a` and `b` are the two tones (teal, sea, sand, coral,
 * lilac, sage, rose, apricot); use one tone per discipline, and B for the
 * comparison. `h` is the height in units (the width is always 480).
 */
export function svg({ h = 260, a = 'teal', b = 'coral' } = {}, ...parts) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${h}" class="f" ` +
    `style="--tone:var(--tone-${a});--tone-b:var(--tone-${b})">${parts.flat(Infinity).filter(Boolean).join('')}</svg>\n`
  );
}

/** A straight line. */
export const L = (x1, y1, x2, y2, c = 'ln') => `<path class="${c}" d="M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}"/>`;
/** A polyline through [x, y] points; `close` closes it into a shape. */
export const P = (pts, c = 'ln', close = false) =>
  `<path class="${c}" d="${pts.map(([x, y], i) => `${i ? 'L' : 'M'}${n(x)} ${n(y)}`).join('')}${close ? 'Z' : ''}"/>`;
/** A path from a raw `d` string. */
export const D = (d, c = 'ln') => `<path class="${c}" d="${d}"/>`;
export const C = (x, y, r, c = 'fa') => `<circle class="${c}" cx="${n(x)}" cy="${n(y)}" r="${n(r)}"/>`;
export const R = (x, y, w, h, c = 'fa', rx = 0) =>
  `<rect class="${c}" x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"${rx ? ` rx="${rx}"` : ''}/>`;
export const E = (x, y, rx, ry, c = 'fa', rot = 0) =>
  `<ellipse class="${c}" cx="${n(x)}" cy="${n(y)}" rx="${n(rx)}" ry="${n(ry)}"${rot ? ` transform="rotate(${n(rot)} ${n(x)} ${n(y)})"` : ''}/>`;
/** Text. `anchor` is start, middle or end. */
export const T = (x, y, s, c = 'tx', anchor = 'start') =>
  `<text class="${c}" x="${n(x)}" y="${n(y)}"${anchor === 'start' ? '' : ` text-anchor="${anchor}"`}>${esc(s)}</text>`;
/** An open arrowhead whose tip is at (x, y), pointing along `deg` (0 = right, 90 = down). */
export const arrow = (x, y, deg, c = 'ln', s = 5) =>
  `<path class="${c} ah" d="M${-s} ${n(-s * 0.7)}L0 0L${-s} ${n(s * 0.7)}" transform="translate(${n(x)} ${n(y)}) rotate(${n(deg)})"/>`;
/** A line with an arrowhead at its end. */
export const arrowLine = (x1, y1, x2, y2, c = 'ln', s = 5) =>
  L(x1, y1, x2, y2, c) + arrow(x2, y2, (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI, c.split(' ')[0], s);

/** A linear scale from a data range to a pixel range. */
export const scale = (d0, d1, r0, r1) => (v) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);

/**
 * Axes with the unit line in place of a rotated y label: the y label sits above
 * the axis at its left end, the x label under the right end. (x0, y0) is the
 * origin, x1 the right end, y1 the top (a smaller number than y0).
 */
export function axes({ x0, y0, x1, y1, xlabel = '', ylabel = '' }) {
  return [
    L(x0, y0, x1, y0, 'ax'),
    L(x0, y0, x0, y1, 'ax'),
    ylabel && T(x0, y1 - 8, ylabel, 'tm'),
    xlabel && T(x1, y0 + 30, xlabel, 'tm', 'end'),
  ];
}
/** Small ticks with numbers under the x axis; `ticks` are [value, label?] pairs. */
export const xticks = (sx, y0, ticks) =>
  ticks.map(([v, lab]) => L(sx(v), y0, sx(v), y0 + 4, 'ax') + T(sx(v), y0 + 17, lab ?? String(v), 'ts', 'middle'));
/** Small ticks with numbers left of the y axis. */
export const yticks = (sy, x0, ticks) =>
  ticks.map(([v, lab]) => L(x0 - 4, sy(v), x0, sy(v), 'ax') + T(x0 - 8, sy(v) + 4, lab ?? String(v), 'ts', 'end'));
/** Horizontal hairline grid across [x0, x1] at the given y values. */
export const hgrid = (x0, x1, ys) => ys.map((y) => L(x0, y, x1, y, 'gr'));

/** A seeded random number generator (mulberry32), so a figure is the same every time it is drawn. */
export function rng(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/** A standard normal draw from a uniform generator. */
export const gauss = (rand) => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
