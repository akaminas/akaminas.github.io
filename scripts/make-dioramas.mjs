/**
 * Draws the project dioramas and writes them to public/dioramas/<kind>.svg.
 *
 *   node scripts/make-dioramas.mjs
 *
 * One small toy-brick scene per project, in the manner of the home-page island
 * (scripts/make-island.mjs) and from the same primitives: plates, bricks,
 * cylinders, domes, flat colours with three tones each, studs on every top
 * surface, a 2:1 isometric projection, world units in studs. Each scene stands
 * on a baseplate in its project domain's pastel tone (keep TONE in step with
 * --tone-* in src/styles/global.css) and shows the subject of the project as a
 * built object: two islands and a dispersing gull, a bipartite network as pegs
 * and rods, a stability landscape in brick columns with a ball, a hypervolume
 * as stacked plates, institutions joined by a feedback road, buoys marking
 * records at sea, a bar chart in the four discipline tones, a relief map with a
 * route to four peaks, and a four-tile board of cards.
 *
 * The scenes are static SVG files with fixed colours (like the island), used
 * as images. The viewBox of each is fitted to what was drawn.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../public/dioramas/', import.meta.url));
mkdirSync(OUT, { recursive: true });

const f1 = (n) => Number(n.toFixed(2));

// ---------- colour ----------
const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgb2hex = (c) => '#' + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const mix = (h, target, t) => rgb2hex(hex2rgb(h).map((v, i) => v + (target[i] - v) * t));
/** Blend two hex colours: 0 gives a, 1 gives b. */
const blend = (a, b, t) => mix(a, hex2rgb(b), t);
const lighten = (h, t) => mix(h, [255, 255, 255], t);
const darken = (h, t) => mix(h, [0, 0, 0], t);
const tones = (base) => ({ top: lighten(base, 0.14), left: base, right: darken(base, 0.22) });

/** The site's pastel tones (src/styles/global.css). */
const TONE = {
  teal: '#86c1b3',
  sea: '#86b4cd',
  sand: '#dfc88f',
  coral: '#dfa795',
  lilac: '#b9adda',
  sage: '#aec693',
  rose: '#d9a8ba',
  apricot: '#e2b48f',
};

/** Toy-brick colours shared with the island. */
const C = {
  foam: '#e6f2f7',
  sand: '#e6d2a0',
  grass: '#7fb069',
  grassDark: '#5f8f4c',
  rock: '#a08b70',
  stone: '#a6a8a6',
  white: '#f4f4f4',
  blue: '#007ba7',
  woodDark: '#6e4a26',
  olive: '#7c9a55',
  leaf: '#5f9e4e',
  yellow: '#f2c14e',
  red: '#d9625e',
  slate: '#5d6a73',
  panel: '#163b4d',
  orange: '#e58f3a',
  grey: '#8c8c88',
};

const PLATE = 0.4;

/**
 * A scene: its own projection origin, defs, bounds and drawing list, so each
 * file is self-contained. Primitives are the island's, with the bounds tracked
 * so the viewBox can be fitted afterwards.
 */
function scene(id, { S = 18 } = {}) {
  const defs = [];
  const patterns = new Map();
  const items = [];
  let gradN = 0;
  const b = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
  const track = (X, Y, rx = 0, ry = rx) => {
    b.x0 = Math.min(b.x0, X - rx);
    b.x1 = Math.max(b.x1, X + rx);
    b.y0 = Math.min(b.y0, Y - ry);
    b.y1 = Math.max(b.y1, Y + ry);
  };

  const px = (x, y) => (x - y) * 0.866 * S;
  const py = (x, y, z) => (x + y) * 0.5 * S - z * S;
  const pt = (x, y, z) => {
    const X = px(x, y);
    const Y = py(x, y, z);
    track(X, Y);
    return `${f1(X)},${f1(Y)}`;
  };

  function studs(base, z) {
    const key = `${base}@${z}`;
    if (patterns.has(key)) return `url(#${patterns.get(key)})`;
    const pid = `${id}-st${patterns.size}`;
    patterns.set(key, pid);
    const t = tones(base);
    const a = 0.866 * S;
    const h = 0.5 * S;
    defs.push(
      `<pattern id="${pid}" patternUnits="userSpaceOnUse" width="1" height="1" patternTransform="matrix(${f1(a)} ${f1(h)} ${f1(-a)} ${f1(h)} 0 ${f1(-z * S)})">` +
        `<rect width="1" height="1" fill="${t.top}"/>` +
        `<circle cx="0.64" cy="0.64" r="0.29" fill="${darken(base, 0.1)}"/>` +
        `<circle cx="0.5" cy="0.5" r="0.29" fill="${lighten(base, 0.24)}"/>` +
        `</pattern>`,
    );
    return `url(#${pid})`;
  }

  function gradient(stops) {
    const gid = `${id}-g${gradN++}`;
    defs.push(`<linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="0">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`);
    return `url(#${gid})`;
  }

  /** A box from (x, y, z) with size (w, d, h). Top is studded unless flat. */
  function box(x, y, z, w, d, h, base, { flat = false, top, noTop = false } = {}) {
    const t = tones(base);
    const zt = z + h;
    let out = `<polygon points="${pt(x, y + d, z)} ${pt(x + w, y + d, z)} ${pt(x + w, y + d, zt)} ${pt(x, y + d, zt)}" fill="${t.left}"/>`;
    out += `<polygon points="${pt(x + w, y, z)} ${pt(x + w, y + d, z)} ${pt(x + w, y + d, zt)} ${pt(x + w, y, zt)}" fill="${t.right}"/>`;
    if (!noTop) {
      const fill = top ?? (flat ? t.top : studs(base, zt));
      out += `<polygon points="${pt(x, y, zt)} ${pt(x + w, y, zt)} ${pt(x + w, y + d, zt)} ${pt(x, y + d, zt)}" fill="${fill}"/>`;
    }
    return out;
  }

  /** Vertical cylinder centred at (cx, cy), radius r, from z, height h. */
  function cylinder(cx, cy, z, r, h, base, { stud = false } = {}) {
    const rx = 1.2247 * r * S;
    const ry = 0.7071 * r * S;
    const X = px(cx, cy);
    const Yb = py(cx, cy, z);
    const Yt = py(cx, cy, z + h);
    track(X, Yt, rx, ry);
    track(X, Yb, rx, ry);
    const t = tones(base);
    const side = gradient([
      [0, lighten(base, 0.08)],
      [0.42, t.left],
      [1, t.right],
    ]);
    let out =
      `<path d="M${f1(X - rx)},${f1(Yt)} V${f1(Yb)} A${f1(rx)},${f1(ry)} 0 0 0 ${f1(X + rx)},${f1(Yb)} V${f1(Yt)} Z" fill="${side}"/>` +
      `<ellipse cx="${f1(X)}" cy="${f1(Yt)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="${t.top}"/>`;
    if (stud) out += cylinder(cx, cy, z + h, r * 0.55, 0.17, base);
    return out;
  }

  /** A dome of radius r sitting on height z at (cx, cy). */
  function dome(cx, cy, z, r, base) {
    const rx = 1.2247 * r * S;
    const ry = 0.7071 * r * S;
    const X = px(cx, cy);
    const Yb = py(cx, cy, z);
    const rise = r * S * 1.02;
    track(X, Yb - rise, rx, 0);
    track(X, Yb, rx, ry);
    const fill = gradient([
      [0, lighten(base, 0.2)],
      [0.5, base],
      [1, darken(base, 0.28)],
    ]);
    return (
      `<path d="M${f1(X - rx)},${f1(Yb)} A${f1(rx)},${f1(rise)} 0 0 1 ${f1(X + rx)},${f1(Yb)} A${f1(rx)},${f1(ry)} 0 0 1 ${f1(X - rx)},${f1(Yb)} Z" fill="${fill}"/>` +
      `<path d="M${f1(X - rx * 0.55)},${f1(Yb - rise * 0.55)} A${f1(rx * 0.5)},${f1(rise * 0.35)} 0 0 1 ${f1(X - rx * 0.05)},${f1(Yb - rise * 0.97)}" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2.5" stroke-linecap="round"/>`
    );
  }

  /** A sphere of radius r resting on height z at (cx, cy). */
  function sphere(cx, cy, z, r, base, opacity = 1) {
    const R = 1.2247 * r * S;
    const X = px(cx, cy);
    const Y = py(cx, cy, z + r);
    track(X, Y, R);
    const gid = `${id}-r${gradN++}`;
    defs.push(
      `<radialGradient id="${gid}" cx="0.36" cy="0.3" r="0.85"><stop offset="0" stop-color="${lighten(base, 0.5)}"/><stop offset="0.42" stop-color="${base}"/><stop offset="1" stop-color="${darken(base, 0.32)}"/></radialGradient>`,
    );
    return `<circle cx="${f1(X)}" cy="${f1(Y)}" r="${f1(R)}" fill="url(#${gid})"${opacity < 1 ? ` opacity="${opacity}"` : ''}/>`;
  }

  /** A flat strip (a rod or a road) between two ground points, with a little thickness. */
  function strip(x1, y1, x2, y2, z, w, base, thick = 0.12) {
    const L = Math.hypot(x2 - x1, y2 - y1);
    const nx = ((-(y2 - y1)) / L) * (w / 2);
    const ny = ((x2 - x1) / L) * (w / 2);
    const quad = (zz) => `${pt(x1 + nx, y1 + ny, zz)} ${pt(x2 + nx, y2 + ny, zz)} ${pt(x2 - nx, y2 - ny, zz)} ${pt(x1 - nx, y1 - ny, zz)}`;
    const t = tones(base);
    return `<polygon points="${quad(z)}" fill="${t.right}"/><polygon points="${quad(z + thick)}" fill="${t.top}"/>`;
  }

  /** A flat arrowhead on the ground at (x, y), pointing along (dx, dy). */
  function arrow(x, y, dx, dy, z, size, fill) {
    const L = Math.hypot(dx, dy);
    const ux = dx / L;
    const uy = dy / L;
    const tip = [x + ux * size, y + uy * size];
    const l = [x - ux * size * 0.7 - uy * size * 0.8, y - uy * size * 0.7 + ux * size * 0.8];
    const r = [x - ux * size * 0.7 + uy * size * 0.8, y - uy * size * 0.7 - ux * size * 0.8];
    return `<polygon points="${pt(tip[0], tip[1], z)} ${pt(l[0], l[1], z)} ${pt(r[0], r[1], z)}" fill="${fill}"/>`;
  }

  /** A soft contact shadow: the footprint pushed to one side, under the object. */
  function shadow(x, y, w, d, z, dx = 0.55, dy = 0.3, opacity = 0.16) {
    return `<polygon points="${pt(x + dx, y + dy, z + 0.02)} ${pt(x + w + dx, y + dy, z + 0.02)} ${pt(x + w + dx, y + d + dy, z + 0.02)} ${pt(x + dx, y + d + dy, z + 0.02)}" fill="#0b2230" opacity="${opacity}"/>`;
  }

  // Flat shapes drawn on a face (u, v in studs).
  const onRight = (xf, y0, z0) => `matrix(${f1(-0.866 * S)} ${f1(0.5 * S)} 0 ${f1(-S)} ${f1(px(xf, y0))} ${f1(py(xf, y0, z0))})`;
  const onLeft = (x0, yf, z0) => `matrix(${f1(0.866 * S)} ${f1(0.5 * S)} 0 ${f1(-S)} ${f1(px(x0, yf))} ${f1(py(x0, yf, z0))})`;
  const rect = (u, v, w, h, fill, extra = '') => `<rect x="${u}" y="${v}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;

  const add = (key, svg) => items.push({ key, svg });

  /** A soft shadow under a baseplate (two offset layers stand in for a blur). */
  const ground = (w, d) => add(-1200, shadow(0, 0, w, d, -0.05, 1.4, 1.0, 0.07) + shadow(0.2, 0.2, w - 0.4, d - 0.4, -0.04, 0.8, 0.55, 0.1));

  function finish(title) {
    const pad = 12;
    const w = b.x1 - b.x0 + pad * 2;
    const h = b.y1 - b.y0 + pad * 2;
    items.sort((p, q) => p.key - q.key);
    return (
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f1(b.x0 - pad)} ${f1(b.y0 - pad)} ${f1(w)} ${f1(h)}" width="${Math.round(w)}" height="${Math.round(h)}" role="img" aria-label="${title}">\n` +
      `<defs>\n${defs.join('\n')}\n</defs>\n${items.map((i) => i.svg).join('\n')}\n</svg>\n`
    );
  }

  return { px, py, pt, box, cylinder, dome, sphere, strip, arrow, shadow, ground, onRight, onLeft, rect, add, finish, S };
}

/** An olive tree: trunk and a leafy dome with a highlight. */
function tree(s, x, y, z, r = 1.0, leaf = C.olive) {
  return (
    s.cylinder(x, y, z, 0.3, 1.1, C.woodDark) +
    s.dome(x, y, z + 1.0, r, leaf) +
    `<circle cx="${f1(s.px(x, y) - r * s.S * 0.3)}" cy="${f1(s.py(x, y, z + 1.0) - r * s.S * 0.75)}" r="${f1(r * s.S * 0.18)}" fill="${lighten(leaf, 0.3)}"/>`
  );
}

/** A brick-built gull, as on the island; faces +x. */
function gull(s, x, y, z, k = 1) {
  const p = (dx, dy, dz, w, d, h, c) => s.box(x + dx * k, y + dy * k, z + dz * k, w * k, d * k, h * k, c, { flat: true });
  let g = '';
  g += p(0.2, -1.1, 0.45, 0.7, 0.6, 0.12, C.white);
  g += p(0.2, -1.4, 0.55, 0.7, 0.35, 0.12, C.grey);
  g += p(0.2, -0.55, 0.3, 0.7, 0.6, 0.12, C.white);
  g += p(-0.35, 0.1, 0.1, 0.35, 0.3, 0.1, C.white);
  g += p(0, 0, 0, 1.1, 0.5, 0.45, C.white);
  g += p(0.2, 0.5, 0.3, 0.7, 0.6, 0.12, C.white);
  g += p(0.2, 1.05, 0.45, 0.7, 0.6, 0.12, C.white);
  g += p(0.2, 1.6, 0.55, 0.7, 0.35, 0.12, C.grey);
  g += s.cylinder(x + 1.15 * k, y + 0.25 * k, z + 0.2 * k, 0.3 * k, 0.45 * k, C.white);
  g += p(1.45, 0.12, 0.35, 0.4, 0.25, 0.15, C.orange);
  g += `<circle cx="${f1(s.px(x + 1.3 * k, y + 0.25 * k) + 2 * k)}" cy="${f1(s.py(x + 1.3 * k, y + 0.25 * k, z + 0.5 * k))}" r="${f1(0.9 * k)}" fill="#222"/>`;
  return g;
}

/** A window on a face: coloured frame, pale glass. */
function windowOn(s, face, u, v, w = 0.7, h = 0.8, colour = C.blue) {
  return `<g transform="${face}">${s.rect(u, v, w, h, colour)}${s.rect(u + 0.1, v + 0.1, w - 0.2, h - 0.2, '#cfe6f7')}</g>`;
}
function doorOn(s, face, u, w = 0.9, h = 1.5, colour = C.blue) {
  return `<g transform="${face}">${s.rect(u, 0, w, h, colour)}${s.rect(u + 0.08, 0.08, w - 0.16, h - 0.16, lighten(colour, 0.12))}<circle cx="${u + w - 0.22}" cy="${h * 0.5}" r="0.06" fill="${C.yellow}"/></g>`;
}

const waves = (s, base, list, z = 0.6) => list.map(([x, y, w = 2, d = 1]) => s.box(x, y, z, w, d, 0.12, lighten(base, 0.22), { flat: true })).join('');
const manifest = {};
const write = (kind, svg) => {
  writeFileSync(OUT + kind + '.svg', svg);
  const [, w, h] = svg.match(/width="(\d+)" height="(\d+)"/);
  manifest[kind] = { w: Number(w), h: Number(h) };
  console.log(`${kind}: ${(svg.length / 1024).toFixed(1)} kB`);
};

// ======================================================================
// isolation: two islands and a gull crossing the channel (ecology, teal)
// ======================================================================
{
  const s = scene('isolation');
  const t = TONE.teal;
  s.ground(15, 12.5);
  s.add(-1000, s.box(0, 0, 0, 15, 12.5, 0.6, t) + waves(s, t, [[0.8, 0.8], [3.6, 0.5], [12.4, 8.6], [13, 11], [8.6, 11], [0.8, 11.4], [7.2, 8.4], [11.2, 0.6, 2, 1]]));

  // island A: front left, larger
  let a = s.box(0.4, 4.8, 0.6, 8.6, 7.4, 0.08, C.foam, { flat: true });
  a += s.shadow(0.9, 5.3, 7.6, 6.4, 0.6, 0.5, 0.3);
  a += s.box(0.9, 5.3, 0.6, 7.6, 6.4, PLATE, C.sand);
  a += s.box(1.6, 5.9, 1.0, 6.2, 5.0, PLATE, C.grass);
  a += s.box(2.2, 6.5, 1.4, 2.6, 2.6, 0.8, C.rock, { noTop: true });
  a += s.box(2.2, 6.5, 2.2, 2.6, 2.6, PLATE, C.grassDark);
  a += tree(s, 7.0, 6.9, 1.4, 1.1);
  a += tree(s, 5.6, 9.9, 1.4, 1.25);
  a += tree(s, 2.6, 10.0, 1.4, 0.95);
  a += s.box(6.8, 5.5, 1.0, 1.4, 1.2, 0.6, C.stone, { flat: true });
  s.add(14, a);

  // island B: back right, smaller
  let bb = s.box(8.9, 0.3, 0.6, 6.0, 5.4, 0.08, C.foam, { flat: true });
  bb += s.shadow(9.4, 0.8, 5.0, 4.4, 0.6, 0.5, 0.3);
  bb += s.box(9.4, 0.8, 0.6, 5.0, 4.4, PLATE, C.sand);
  bb += s.box(9.9, 1.3, 1.0, 4.0, 3.4, PLATE, C.grass);
  bb += tree(s, 13.0, 3.9, 1.4, 1.0);
  bb += tree(s, 10.9, 2.3, 1.4, 0.85);
  s.add(11, bb);

  // the arrival: a gull between the two
  s.add(100, gull(s, 7.2, 3.6, 4.4, 1.45));
  write('isolation', s.finish('Two brick islands with a gull flying between them'));
}

// ======================================================================
// bipartite: a mutualistic network as pegs and rods (ecology, teal)
// ======================================================================
{
  const s = scene('bipartite');
  const t = TONE.teal;
  s.ground(13, 10);
  s.add(-1000, s.box(0, 0, 0, 13, 10, 0.6, t));
  const left = [
    [2.2, 1.6, 0.55, 1.1],
    [2.2, 3.8, 0.7, 1.5],
    [2.2, 6.0, 0.6, 1.2],
    [2.2, 8.2, 0.5, 0.9],
  ];
  const right = [
    [10.2, 2.6, 0.95, 1.9],
    [10.2, 5.4, 0.8, 1.5],
    [10.2, 8.0, 0.7, 1.2],
  ];
  const edges = [[0, 0], [0, 1], [1, 0], [1, 1], [1, 2], [2, 1], [2, 2], [3, 1], [3, 0]];
  let rods = '';
  for (const [i, j] of edges) {
    rods += s.strip(left[i][0], left[i][1], right[j][0], right[j][1], 0.6, 0.3, C.sand);
  }
  // the highlighted interaction
  rods += s.strip(left[1][0], left[1][1], right[1][0], right[1][1], 0.74, 0.5, C.orange);
  s.add(-500, rods);
  left.forEach(([x, y, r, h]) => s.add(x + y, s.shadow(x - r, y - r, r * 2, r * 2, 0.6, 0.45, 0.25) + s.cylinder(x, y, 0.6, r, h, C.white, { stud: true })));
  right.forEach(([x, y, r, h]) => s.add(x + y, s.shadow(x - r, y - r, r * 2, r * 2, 0.6, 0.55, 0.3) + s.cylinder(x, y, 0.6, r, h, darken(t, 0.32), { stud: true })));
  write('bipartite', s.finish('A network of pegs joined by rods, two kinds of species'));
}

// ======================================================================
// fold: a stability landscape in brick columns, a ball and its jump (ecology, teal)
// ======================================================================
{
  const s = scene('fold');
  const t = TONE.teal;
  const heights = [3.4, 3.0, 2.4, 1.7, 1.1, 1.1, 1.7, 2.6, 3.8, 2.6, 1.7, 1.1, 1.1, 1.7, 2.4, 3.0, 3.4];
  const n = heights.length;
  const D = 5;
  s.ground(n, D + 0.6);
  s.add(-1000, s.box(0, 0, 0, n, D + 0.6, 0.6, darken(t, 0.1)));
  heights.forEach((h, i) => {
    // wells deep teal, crests a lighter teal (never as pale as the panel behind)
    const colour = blend('#3f8e7d', '#a9dccd', Math.min(1, (h - 1.1) / 2.7));
    s.add(i, s.box(i, 0.3, 0.6, 1, D, h, colour));
  });
  const top = (i) => 0.6 + heights[i];
  // the ball sits in the left well, its ghost in the right
  const bx = 4.6;
  const gx = 12.4;
  const by = 3.0;
  s.add(200, s.shadow(bx - 0.8, by - 0.8, 1.6, 1.6, top(4), 0.5, 0.3, 0.2) + s.sphere(bx, by, top(4), 0.85, C.white));
  s.add(201, s.sphere(gx, by, top(12), 0.85, C.white, 0.45));
  // the jump over the ridge, as a trail of orange beads
  const z0 = top(4) + 0.85;
  const z1 = top(12) + 0.85;
  for (let k = 1; k <= 5; k++) {
    const u = k / 6;
    s.add(210 + k, s.sphere(bx + (gx - bx) * u, by, z0 + (z1 - z0) * u + 4.4 * 4 * u * (1 - u) - 0.25, 0.27, C.orange));
  }
  write('fold', s.finish('A landscape of brick columns with two wells, a ball in one and its ghost in the other'));
}

// ======================================================================
// hypervolume: stacked plates around three axes, pegs as species (ecology, teal)
// ======================================================================
{
  const s = scene('hypervolume');
  const t = TONE.teal;
  s.ground(11, 11);
  s.add(-1000, s.box(0, 0, 0, 11, 11, 0.6, t));
  // axes at the back corner
  let axes = s.strip(0.7, 0.7, 10.3, 0.7, 0.6, 0.32, C.white);
  axes += s.strip(0.7, 0.7, 0.7, 10.3, 0.6, 0.32, C.white);
  axes += s.box(9.9, 0.4, 0.6, 0.8, 0.6, 0.55, C.orange, { flat: true });
  axes += s.box(0.4, 9.9, 0.6, 0.6, 0.8, 0.55, C.blue, { flat: true });
  axes += s.cylinder(0.7, 0.7, 0.6, 0.2, 3.4, C.white);
  axes += s.box(0.35, 0.35, 4.0, 0.7, 0.7, 0.7, C.yellow, { flat: true });
  s.add(-400, axes);

  const cx = 5.7;
  const cy = 5.7;
  const layers = [
    [4.0, 0.6], [5.8, 1.0], [7.0, 1.4], [7.6, 1.8], [7.6, 2.2], [7.0, 2.6], [5.8, 3.0], [4.4, 3.4], [2.8, 3.8],
  ];
  let hull = s.shadow(cx - 3.8, cy - 3.8, 7.6, 7.6, 0.6, 0.7, 0.4, 0.16);
  layers.forEach(([size, z], k) => {
    const colour = blend('#4a9a89', '#d6efe8', k / (layers.length - 1));
    hull += s.box(cx - size / 2, cy - size / 2, z, size, size, PLATE, colour);
  });
  s.add(60, hull);

  const topAt = (x, y) => {
    let z = 0.6;
    for (const [size, zz] of layers) if (Math.abs(x - cx) <= size / 2 && Math.abs(y - cy) <= size / 2) z = zz + PLATE;
    return z;
  };
  const pegs = [
    [cx + 0.2, cy - 0.5, C.orange],
    [cx - 0.7, cy + 0.6, C.white],
    [cx + 2.4, cy - 1.6, C.yellow],
    [cx - 2.4, cy + 1.6, C.red],
    [cx + 1.0, cy + 2.8, C.white],
    [cx - 1.2, cy - 2.7, C.sand],
    [cx + 3.0, cy + 1.2, C.orange],
    [cx - 3.1, cy - 0.7, C.yellow],
  ];
  pegs.forEach(([x, y, c]) => s.add(70 + x + y, s.cylinder(x, y, topAt(x, y), 0.42, 0.7, c, { stud: true })));
  write('hypervolume', s.finish('A hull of stacked plates inside three axes, with coloured pegs for species'));
}

// ======================================================================
// loop: three institutions joined by a feedback road (sustainability, coral)
// ======================================================================
{
  const s = scene('loop');
  const t = TONE.coral;
  s.ground(17, 15);
  s.add(-1000, s.box(0, 0, 0, 17, 15, 0.6, t));

  // the loop road: a triangle round a plaza, arrows showing the direction of travel
  const V = [[8.5, 5.4], [12.6, 10.2], [4.4, 10.2]];
  let road = '';
  for (let i = 0; i < 3; i++) {
    const a = V[i];
    const b = V[(i + 1) % 3];
    road += s.strip(a[0], a[1], b[0], b[1], 0.6, 1.0, C.slate, 0.1);
  }
  for (let i = 0; i < 3; i++) {
    const a = V[i];
    const b = V[(i + 1) % 3];
    road += s.arrow((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, b[0] - a[0], b[1] - a[1], 0.72, 0.8, C.white);
  }
  s.add(-500, road);

  // a small plaza and tree at the centre of the loop
  s.add(14, s.cylinder(8.5, 8.6, 0.6, 1.2, 0.2, C.white) + tree(s, 8.5, 8.6, 0.8, 0.75, C.leaf));

  // A: the tall tower, back
  {
    const x = 6.9, y = 0.5, w = 3.2, d = 3.2, h = 6.0;
    let o = s.shadow(x, y, w, d, 0.6, 0.9, 0.4);
    o += s.box(x, y, 0.6, w, d, h, C.white);
    const right = s.onRight(x + w, y, 0.6);
    const left = s.onLeft(x, y + d, 0.6);
    for (const v of [0.9, 2.3, 3.7, 5.0]) {
      o += windowOn(s, right, 0.5, v, 0.8, 0.8, t);
      o += windowOn(s, right, 1.9, v, 0.8, 0.8, t);
      o += windowOn(s, left, 0.5, v, 0.8, 0.8, t);
      o += windowOn(s, left, 1.9, v, 0.8, 0.8, t);
    }
    o += s.box(x - 0.2, y - 0.2, 0.6 + h, w + 0.4, d + 0.4, 0.4, darken(t, 0.12), { flat: true });
    s.add(x + y + 6, o);
  }
  // B: the domed hall, right
  {
    const x = 13.4, y = 8.6, w = 3.4, d = 3.4, h = 3.0;
    let o = s.shadow(x, y, w, d, 0.6, 0.8, 0.4);
    o += s.box(x, y, 0.6, w, d, h, C.white);
    const right = s.onRight(x + w, y, 0.6);
    const left = s.onLeft(x, y + d, 0.6);
    o += doorOn(s, right, 1.25, 0.95, 1.5, darken(t, 0.25));
    o += windowOn(s, right, 0.3, 1.5, 0.6, 0.8, t);
    o += windowOn(s, right, 2.5, 1.5, 0.6, 0.8, t);
    o += windowOn(s, left, 0.5, 1.2, 0.8, 1.0, t);
    o += windowOn(s, left, 2.0, 1.2, 0.8, 1.0, t);
    o += s.cylinder(x + w / 2, y + d / 2, 0.6 + h, 1.55, 0.35, C.white);
    o += s.dome(x + w / 2, y + d / 2, 0.6 + h + 0.35, 1.55, darken(t, 0.3));
    s.add(x + y + 5, o);
  }
  // C: the low block with solar panels, left
  {
    const x = 0.6, y = 9.2, w = 3.2, d = 3.6, h = 2.2;
    let o = s.shadow(x, y, w, d, 0.6, 0.8, 0.4);
    o += s.box(x, y, 0.6, w, d, h, C.white);
    const right = s.onRight(x + w, y, 0.6);
    const left = s.onLeft(x, y + d, 0.6);
    o += doorOn(s, right, 1.35, 0.9, 1.4, darken(t, 0.25));
    o += windowOn(s, left, 0.4, 0.8, 0.8, 0.9, t);
    o += windowOn(s, left, 1.9, 0.8, 0.8, 0.9, t);
    for (let i = 0; i < 2; i++) {
      const sx = x + 0.4, sy = y + 0.4 + i * 1.5;
      o += `<polygon points="${s.pt(sx, sy, 0.6 + h)} ${s.pt(sx, sy + 1.2, 0.6 + h)} ${s.pt(sx + 2.4, sy + 1.2, 0.6 + h + 0.9)} ${s.pt(sx + 2.4, sy, 0.6 + h + 0.9)}" fill="${C.panel}" stroke="#7f92b3" stroke-width="0.8"/>`;
    }
    s.add(x + y + 5, o);
  }
  write('loop', s.finish('Three brick buildings joined by a looping road with arrows'));
}

// ======================================================================
// records: buoys marking records at sea, a boat and a beach (marine, sea)
// ======================================================================
{
  const s = scene('records');
  const t = TONE.sea;
  s.ground(15, 12);
  s.add(-1000, s.box(0, 0, 0, 15, 12, 0.6, t) + waves(s, t, [[2, 4.5], [11, 5.5], [3.5, 10], [12.5, 10.3], [8.5, 8.2], [6, 2.8, 2, 1]]));

  // the beach along the back, with grass, trees and a small hut
  let beach = s.box(0, 0, 0.6, 15, 2.8, PLATE, C.sand);
  beach += s.box(0, 2.8, 0.6, 15, 0.5, 0.08, C.foam, { flat: true });
  beach += s.box(0.6, 0.4, 1.0, 7.6, 1.9, PLATE, C.grass);
  beach += tree(s, 1.8, 1.4, 1.4, 0.95);
  beach += tree(s, 7.4, 1.6, 1.4, 0.8);
  {
    const x = 3.4, y = 0.7, w = 2.4, d = 1.5, h = 1.6;
    beach += s.box(x, y, 1.4, w, d, h, C.white);
    beach += s.box(x - 0.2, y - 0.2, 1.4 + h, w + 0.4, d + 0.4, 0.3, C.blue, { flat: true });
    beach += doorOn(s, s.onRight(x + w, y, 1.4), 0.35, 0.7, 1.2);
  }
  s.add(0, beach);

  // the boat
  {
    const x = 6.2, y = 6.4;
    let o = s.shadow(x, y, 4.6, 1.9, 0.6, 0.5, 0.35);
    o += s.box(x, y, 0.6, 4.6, 1.9, 0.6, C.white, { flat: true });
    o += s.box(x - 0.55, y + 0.1, 0.6, 0.65, 1.7, 0.6, C.blue, { flat: true });
    o += s.box(x + 0.6, y + 0.3, 1.2, 1.5, 1.3, 0.8, C.blue, { flat: true });
    o += s.cylinder(x + 3.0, y + 0.95, 1.2, 0.09, 3.6, C.woodDark);
    const mx = s.px(x + 3.0, y + 0.95);
    const my = s.py(x + 3.0, y + 0.95, 4.8);
    o += `<path d="M${f1(mx)},${f1(my)} l-34,36 h34 z" fill="#ffffff" stroke="#c9c6bf" stroke-width="0.8"/>`;
    s.add(x + y + 2, o);
  }

  // buoys: white body, coloured band, a studded top and a little flag
  const buoy = (x, y, band) => {
    let o = s.shadow(x - 0.5, y - 0.5, 1, 1, 0.6, 0.5, 0.3);
    o += s.cylinder(x, y, 0.6, 0.55, 0.7, C.white);
    o += s.cylinder(x, y, 1.3, 0.55, 0.32, band, { stud: true });
    o += s.cylinder(x, y, 1.62, 0.06, 1.0, C.woodDark);
    o += `<g transform="${s.onRight(x + 0.06, y - 0.05, 2.2)}"><path d="M0,0 h0.7 l-0.2,0.25 l0.2,0.25 h-0.7 z" fill="${band}"/></g>`;
    return o;
  };
  [[3.6, 5.2, C.orange], [11.6, 4.6, C.red], [13.0, 9.0, C.yellow], [3.9, 9.4, C.red], [9.6, 10.2, C.orange]].forEach(([x, y, c]) => s.add(x + y + 1, buoy(x, y, c)));
  write('records', s.finish('A brick beach, a boat and buoys marking records at sea'));
}

// ======================================================================
// swatches: a bar chart in the four discipline tones before a figure panel (tools, lilac)
// ======================================================================
{
  const s = scene('swatches');
  const t = TONE.lilac;
  s.ground(13, 10);
  s.add(-1000, s.box(0, 0, 0, 13, 10, 0.6, t));

  // the figure panel at the back, with a grid, a line and four swatches
  {
    const x = 0.8, y = 0.7, w = 11.4, d = 0.5, h = 6.4;
    let o = s.box(x, y, 0.6, w, d, h, C.white, { flat: true });
    const face = s.onLeft(x, y + d, 0.6);
    let g = '';
    for (let i = 1; i < 5; i++) g += `<path d="M0.5 ${i * 1.15 + 0.5} H${w - 0.5}" stroke="#d3d8de" stroke-width="0.05"/>`;
    for (let i = 1; i < 6; i++) g += `<path d="M${i * 1.9 + 0.3} 0.5 V${h - 1.5}" stroke="#e1e5e9" stroke-width="0.05"/>`;
    g += `<path d="M0.5 0.5 V${h - 1.3} M0.5 0.5 H${w - 0.5}" stroke="#3f4a52" stroke-width="0.09" fill="none" stroke-linecap="round"/>`;
    const pts = [[1.8, 1.6], [4.1, 2.5], [6.4, 2.0], [8.7, 3.6], [10.6, 4.4]];
    g += `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="#3f4a52" stroke-width="0.13" stroke-linejoin="round" stroke-linecap="round"/>`;
    const dot = [TONE.teal, TONE.coral, TONE.sea, darken(TONE.lilac, 0.18), TONE.sage];
    pts.forEach((p, i) => (g += `<circle cx="${p[0]}" cy="${p[1]}" r="0.3" fill="${dot[i]}" stroke="#3f4a52" stroke-width="0.07"/>`));
    [TONE.teal, TONE.coral, TONE.sea, darken(TONE.lilac, 0.18)].forEach((c, i) => (g += s.rect(0.7 + i * 0.75, h - 0.95, 0.55, 0.55, c, 'rx="0.08" stroke="#3f4a52" stroke-width="0.05"')));
    o += `<g transform="${face}">${g}</g>`;
    s.add(-200, o);
  }

  // the bars, one per discipline tone
  const bars = [
    [1.5, TONE.teal, 2.0],
    [4.1, TONE.coral, 3.5],
    [6.7, TONE.sea, 2.7],
    [9.3, darken(TONE.lilac, 0.18), 4.4],
  ];
  bars.forEach(([x, c, h]) => s.add(x + 5, s.shadow(x, 4.0, 2.0, 2.2, 0.6, 0.6, 0.3) + s.box(x, 4.0, 0.6, 2.0, 2.2, h, c)));
  // the axis rail along the front
  s.add(100, s.box(0.7, 7.6, 0.6, 11.6, 0.4, 0.3, C.white, { flat: true }));
  write('swatches', s.finish('A brick bar chart in four tones in front of a figure panel'));
}

// ======================================================================
// tessera: the four-tile mark as a board of lists and cards, a flag at its centre (tools, lilac)
// ======================================================================
{
  const s = scene('tessera');
  const t = TONE.lilac;
  const W = 15;
  const D = 12.4;
  s.ground(W, D);
  s.add(-1000, s.box(0, 0, 0, W, D, 0.6, t));

  // the four tiles are the colours of the Tessera mark
  const TW = 6.2;
  const TD = 5.0;
  const ZT = 1.1; // top of a tile
  const CW = 5.0; // card width
  const CD = 1.1; // card depth
  const CH = 0.42; // card thickness
  const rows = [0.5, 1.95, 3.4];
  const people = [TONE.coral, TONE.sea, TONE.sage, TONE.apricot, TONE.rose];
  // `cards`: a pastel label per card, or null for an empty place; `lift` is the card that is picked up
  const tiles = [
    { x: 0.9, y: 0.9, c: '#419BA0', cards: [TONE.coral, TONE.sage, TONE.sand] },
    { x: 7.7, y: 0.9, c: '#DAC9A6', cards: [TONE.sea, null, TONE.rose], lift: 1 },
    { x: 0.9, y: 6.5, c: '#A1644F', cards: [TONE.apricot, TONE.teal] },
    { x: 7.7, y: 6.5, c: '#415688', cards: [TONE.sand, TONE.lilac, TONE.coral] },
  ];

  let n = 0;
  /** A card: white, a pastel label, two grey lines of "text" and one or two avatars. */
  const card = (x, y, z, accent, shadow = {}) => {
    n++;
    let o = s.shadow(x, y, CW, CD, shadow.z ?? z, shadow.dx ?? 0.3, shadow.dy ?? 0.2, shadow.o ?? 0.2);
    o += s.box(x, y, z, CW, CD, CH, C.white, { flat: true });
    o += s.box(x + 0.35, y + 0.24, z + CH, 1.1, 0.3, 0.06, accent, { flat: true });
    o += s.box(x + 0.35, y + 0.68, z + CH, 3.1, 0.15, 0.04, '#c4cbd1', { flat: true });
    for (let k = 0; k < 1 + (n % 2); k++) {
      o += s.cylinder(x + CW - 0.65 - k * 0.38, y + CD / 2, z + CH, 0.2, 0.1, people[(n + k * 2) % people.length]);
    }
    return o;
  };

  tiles.forEach((tl) => {
    const key = tl.x + tl.y;
    s.add(key, s.box(tl.x, tl.y, 0.6, TW, TD, ZT - 0.6, tl.c, { flat: true }));
    tl.cards.forEach((accent, r) => {
      const x = tl.x + 0.6;
      const y = tl.y + rows[r];
      if (accent === null) {
        // the card picked up leaves a recess and hangs just above it, its shadow on the recess
        s.add(key + 0.05, s.box(x, y, ZT, CW, CD, 0.04, darken(tl.c, 0.2), { flat: true }));
        s.add(key + 0.1 + r * 0.01, card(x, y, ZT + 0.75, TONE.apricot, { z: ZT + 0.04, dx: 0.9, dy: 0.55, o: 0.26 }));
      } else {
        s.add(key + 0.1 + r * 0.01, card(x, y, ZT, accent));
      }
    });
  });

  // a milestone flag at the centre of the four tiles, in the gap between them
  {
    const fx = tiles[0].x + TW + 0.3;
    const fy = tiles[0].y + TD + 0.3;
    s.add(fx + fy - 0.1, s.cylinder(fx, fy, 0.6, 0.15, 3.9, C.white) + s.box(fx - 0.05, fy, 3.2, 0.1, 1.6, 0.95, C.orange, { flat: true }));
  }
  write('tessera', s.finish('A board of four coloured lists with pastel cards, one picked up, and a flag at its centre'));
}

// ======================================================================
// atlas: a relief map with a route of deepening tiles from the foundations to four peaks (tools, lilac)
// ======================================================================
{
  const s = scene('atlas');
  const t = TONE.lilac;
  const W = 18;
  const D = 12;
  s.ground(W, D);
  s.add(-1000, s.box(0, 0, 0, W, D, 0.6, t));

  /** A stepped hill: tiers of the given heights and colours, each inset from the last. */
  const hill = (key, x, y, w, d, tiers, inset) => {
    let z = 0.6;
    tiers.forEach(([h, c], i) => {
      const o = i * inset;
      s.add(key + i * 0.01, s.box(x + o, y + o, z, w - 2 * o, d - 2 * o, h, c));
      z += h;
    });
    return z;
  };
  const shade = (c, n) => lighten(c, 0.1 * n);

  // the foundations in the west: three broad terraces in cyan
  const cyan = '#3f9fb0';
  const topF = hill(1.9, 0.9, 1.0, 4.8, 10.0, [[0.55, cyan], [0.55, shade(cyan, 1)], [0.55, shade(cyan, 2)]], 0.5);
  // concepts as pegs on the top terrace, with a few joins between them
  const pegs = [
    [2.7, 3.1, C.white], [4.1, 3.9, C.yellow], [2.9, 5.4, C.orange], [4.2, 6.6, C.white], [2.6, 7.7, C.red], [3.9, 8.9, C.yellow],
  ];
  const joins = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5]];
  let rods = '';
  joins.forEach(([i, j]) => (rods += s.strip(pegs[i][0], pegs[i][1], pegs[j][0], pegs[j][1], topF, 0.22, C.sand, 0.08)));
  s.add(5.1, rods);
  pegs.forEach(([x, y, c]) => s.add(x + y + 1, s.shadow(x - 0.3, y - 0.3, 0.6, 0.6, topF, 0.3, 0.18) + s.cylinder(x, y, topF, 0.3, 0.55, c, { stud: true })));

  // the four destinations in the east, the lowest in front so the route stays in view
  const peaks = [
    { x: 10.0, y: 1.0, c: '#5b8fb9', tiers: [1.2, 1.1, 1.0], cap: true },
    { x: 14.4, y: 1.0, c: '#e0a05a', tiers: [1.0, 0.9, 0.5] },
    { x: 14.4, y: 8.2, c: '#6fae86', tiers: [0.9, 0.8] },
    { x: 10.0, y: 8.2, c: '#cf7f86', tiers: [0.7, 0.6] },
  ];
  peaks.forEach((p) => {
    const top = hill(p.x + p.y, p.x, p.y, 2.8, 2.8, p.tiers.map((h, i) => [h, shade(p.c, i)]), 0.5);
    if (p.cap) s.add(p.x + p.y + 0.5, s.dome(p.x + 1.4, p.y + 1.4, top, 0.55, C.white));
  });

  // the route: a ribbon of tiles that deepens from pale to full cyan on the way to the hub
  const N = 10;
  for (let i = 0; i < N; i++) {
    const u = i / (N - 1);
    const x = 6.4 + 6.9 * u;
    const y = 6.1 + 1.1 * Math.sin(u * Math.PI * 2) * (1 - u * 0.6);
    s.add(x + y, s.box(x - 0.55, y - 0.55, 0.6, 1.1, 1.1, 0.26, blend('#c3edf3', '#0f93ad', u), { flat: true }));
  }
  // the hub: a round plinth at the crossing, with a flag
  {
    const hx = 13.95;
    const hy = 6.1;
    s.add(hx + hy + 0.6, s.cylinder(hx, hy, 0.6, 0.95, 0.3, C.white, { stud: true }));
    s.add(hx + hy + 0.7, s.cylinder(hx, hy, 0.9, 0.12, 2.6, C.white) + s.box(hx - 0.04, hy, 2.9, 0.08, 1.4, 0.8, C.orange, { flat: true }));
  }
  write('atlas', s.finish('A relief map: broad terraces of concepts in the west, a route of deepening tiles and four peaks in the east'));
}

// Intrinsic sizes, so the pages can reserve the space (src/components/Diorama.astro).
writeFileSync(fileURLToPath(new URL('../src/data/dioramas.json', import.meta.url)), JSON.stringify(manifest, null, 2) + '\n');
