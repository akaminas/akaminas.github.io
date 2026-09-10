/**
 * Draws the home-page island and writes it to src/components/island.svg.
 *
 *   node scripts/make-island.mjs
 *
 * Everything is built from a few isometric primitives (plates, bricks,
 * cylinders, domes) in the manner of a toy-brick model: flat colours, three
 * tones per colour, studs on every top surface. World units are studs; the
 * projection is the usual 2:1 isometric. The scene is static SVG; the only
 * behaviour is CSS on the link groups (lift + label on hover and focus).
 *
 * Link groups (class "hot") map parts of the model to parts of the site:
 * the sea to marine work, the island, its gulls and the pelican to island ecology, the
 * three figures to social systems, the wind turbine to sustainability, and
 * each house to a page.
 */
import { writeFileSync } from 'node:fs';
import path from 'node:path';

const S = 20; // px per stud
const X0 = 600;
const Y0 = 74;
const W = 1200;
const H = 780;
const PLATE = 0.4;
const OBJ = 0.96; // objects are drawn 4 % smaller than their footprint
const ISLE = 1.04; // the island's plates are 4 % larger, about its centre
const IC = 17; // island centre (studs)
const sc = (v) => IC + (v - IC) * ISLE;
const BRICK = 1.2;

// ---------- projection ----------
const px = (x, y) => X0 + (x - y) * 0.866 * S;
const py = (x, y, z) => Y0 + (x + y) * 0.5 * S - z * S;
const pt = (x, y, z) => `${px(x, y).toFixed(1)},${py(x, y, z).toFixed(1)}`;
const f1 = (n) => Number(n.toFixed(2));

// ---------- colour ----------
const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgb2hex = (c) => '#' + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const mix = (h, target, t) => rgb2hex(hex2rgb(h).map((v, i) => v + (target[i] - v) * t));
const lighten = (h, t) => mix(h, [255, 255, 255], t);
const darken = (h, t) => mix(h, [0, 0, 0], t);
const tones = (base) => ({ top: lighten(base, 0.14), left: base, right: darken(base, 0.22) });

// ---------- output buffers ----------
const defs = [];
const patterns = new Map();
let gradN = 0;

/** Stud pattern for a top face at height z, aligned to the stud grid. */
function studs(base, z) {
  const key = `${base}@${z}`;
  if (patterns.has(key)) return `url(#${patterns.get(key)})`;
  const id = `st${patterns.size}`;
  patterns.set(key, id);
  const t = tones(base);
  const a = 0.866 * S;
  const b = 0.5 * S;
  // Pattern space is world (x, y); patternTransform is the projection at height z.
  defs.push(
    `<pattern id="${id}" patternUnits="userSpaceOnUse" width="1" height="1" patternTransform="matrix(${f1(a)} ${f1(b)} ${f1(-a)} ${f1(b)} ${X0} ${f1(Y0 - z * S)})">` +
      `<rect width="1" height="1" fill="${t.top}"/>` +
      `<circle cx="0.64" cy="0.64" r="0.29" fill="${darken(base, 0.1)}"/>` +
      `<circle cx="0.5" cy="0.5" r="0.29" fill="${lighten(base, 0.24)}"/>` +
      `</pattern>`,
  );
  return `url(#${id})`;
}

function gradient(stops, dir = 'h') {
  const id = `g${gradN++}`;
  const attrs = dir === 'h' ? 'x1="0" y1="0" x2="1" y2="0"' : 'x1="0" y1="0" x2="0" y2="1"';
  defs.push(`<linearGradient id="${id}" ${attrs}>${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`);
  return `url(#${id})`;
}

// ---------- primitives ----------
/** A box from (x, y, z) with size (w, d, h). Top is studded unless flat. */
function box(x, y, z, w, d, h, base, { flat = false, top, noTop = false } = {}) {
  const t = tones(base);
  const zt = z + h;
  const out = [];
  // left (+y) face
  out.push(`<polygon points="${pt(x, y + d, z)} ${pt(x + w, y + d, z)} ${pt(x + w, y + d, zt)} ${pt(x, y + d, zt)}" fill="${t.left}"/>`);
  // right (+x) face
  out.push(`<polygon points="${pt(x + w, y, z)} ${pt(x + w, y + d, z)} ${pt(x + w, y + d, zt)} ${pt(x + w, y, zt)}" fill="${t.right}"/>`);
  if (!noTop) {
    const fill = top ?? (flat ? t.top : studs(base, zt));
    out.push(`<polygon points="${pt(x, y, zt)} ${pt(x + w, y, zt)} ${pt(x + w, y + d, zt)} ${pt(x, y + d, zt)}" fill="${fill}"/>`);
  }
  return out.join('');
}

/** Vertical cylinder centred at (cx, cy), radius r, from z, height h. */
function cylinder(cx, cy, z, r, h, base, { flat = true, stud = false } = {}) {
  const rx = 1.2247 * r * S;
  const ry = 0.7071 * r * S;
  const X = px(cx, cy);
  const Yb = py(cx, cy, z);
  const Yt = py(cx, cy, z + h);
  const t = tones(base);
  const side = gradient([
    [0, lighten(base, 0.08)],
    [0.42, t.left],
    [1, t.right],
  ]);
  let out =
    `<path d="M${f1(X - rx)},${f1(Yt)} V${f1(Yb)} A${f1(rx)},${f1(ry)} 0 0 0 ${f1(X + rx)},${f1(Yb)} V${f1(Yt)} Z" fill="${side}"/>` +
    `<ellipse cx="${f1(X)}" cy="${f1(Yt)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="${flat ? t.top : t.top}"/>`;
  if (stud) {
    const sr = r * 0.55;
    out += cylinder(cx, cy, z + h, sr, 0.17, base);
  }
  return out;
}

/** A dome of radius r sitting on height z at (cx, cy). */
function dome(cx, cy, z, r, base) {
  const rx = 1.2247 * r * S;
  const ry = 0.7071 * r * S;
  const X = px(cx, cy);
  const Yb = py(cx, cy, z);
  const rise = r * S * 1.02;
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

/** Transform for drawing flat shapes on the +x face at x = xf (u along y, v up). */
const onRight = (xf, y0, z0) => `matrix(${f1(-0.866 * S)} ${f1(0.5 * S)} 0 ${f1(-S)} ${f1(px(xf, y0))} ${f1(py(xf, y0, z0))})`;
/** Transform for the +y face at y = yf (u along x, v up). */
const onLeft = (x0, yf, z0) => `matrix(${f1(0.866 * S)} ${f1(0.5 * S)} 0 ${f1(-S)} ${f1(px(x0, yf))} ${f1(py(x0, yf, z0))})`;
/** Transform for a top face at height z (u along x, v along y). */
const onTop = (x0, y0, z) => `matrix(${f1(0.866 * S)} ${f1(0.5 * S)} ${f1(-0.866 * S)} ${f1(0.5 * S)} ${f1(px(x0, y0))} ${f1(py(x0, y0, z))})`;

const rectIn = (u, v, w, h, fill, extra = '') => `<rect x="${u}" y="${v}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;

// ---------- palette (toy-brick colours) ----------
const C = {
  sea: '#3d8fd1',
  seaLight: '#7cc0ea',
  foam: '#dff1fb',
  sand: '#e8c97e',
  grass: '#63b04a',
  grassDark: '#4c9a3c',
  rock: '#a68a6c',
  stone: '#9a9a97',
  white: '#f6f4ef',
  blue: '#2a5fbf',
  blueDeep: '#1f4a99',
  wood: '#9c6b3c',
  woodDark: '#7a4f28',
  leaf: '#5f9e4e',
  olive: '#7c9a55',
  pink: '#e0508a',
  yellow: '#f4c430',
  skin: '#f6c945',
  red: '#d13a2b',
  tan: '#d9b48a',
  dark: '#2b2b2b',
  panel: '#1b2a4a',
  orange: '#f08a24',
};

// ---------- scene ----------
const items = []; // { key, svg, hot }

function add(key, svg) {
  items.push({ key, svg });
}

function label(text, X, Y) {
  const w = text.length * 8.1 + 24;
  return (
    `<g class="hot__label" aria-hidden="true" transform="translate(${f1(X - w / 2)} ${f1(Y - 40)})">` +
    `<rect class="hot__pill" width="${f1(w)}" height="30" rx="7"/>` +
    `<text class="hot__text" x="${f1(w / 2)}" y="20" text-anchor="middle" font-size="13.5">${text}</text>` +
    `</g>`
  );
}

/** Wrap drawn parts in a link group. `mode` is 'lift' or 'glow'. */
function hot({ href, name, parts, lx, ly, mode = 'lift', id, anchor, shrink = OBJ }) {
  let body = parts;
  if (anchor) {
    // Scale the object about its ground point so it stays on the ground.
    const ax = f1(px(anchor[0], anchor[1])), ay = f1(py(anchor[0], anchor[1], anchor[2]));
    body = `<g transform="translate(${ax} ${ay}) scale(${shrink}) translate(${-ax} ${-ay})">${parts}</g>`;
  }
  return (
    `<a href="${href}" class="hot hot--${mode}" aria-label="${name}" data-hot="${id}">` +
    `<title>${name}</title>` +
    `<g class="hot__body">${body}</g>` +
    label(name, lx, ly) +
    `</a>`
  );
}

// -- Sea: one large plate with a few flat wave tiles and foam near the shore.
const SEA = 34;
let sea = box(0, 0, 0, SEA, SEA, 0.6, C.sea, { top: studs(C.sea, 0.6) });
const waveTiles = [
  [2, 4], [5, 2], [10, 1], [1, 11], [29, 3], [32, 7], [31, 31], [26, 32], [3, 28], [6, 32], [19, 1], [32, 20], [1, 19], [23, 33], [12, 31], [32, 12], [16, 33], [2, 24],
];
for (const [wx, wy] of waveTiles) sea += box(wx, wy, 0.6, 2, 1, 0.12, C.seaLight, { flat: true });
// foam: light plates hugging the island outline
const foam = [
  [6, 5, 4, 1], [10, 4, 8, 1], [18, 4, 6, 1], [24, 5, 4, 1], [28, 7, 1, 5], [29, 12, 1, 5], [30, 17, 1, 5], [30, 22, 1, 5], [29, 27, 1, 3], [25, 29, 4, 1], [18, 30, 7, 1],
  [10, 30, 8, 1], [6, 29, 4, 1], [4, 25, 1, 4], [3, 19, 1, 6], [3, 13, 1, 6], [4, 8, 1, 5], [5, 6, 1, 2],
];
for (const [fx, fy, fw, fd] of foam) sea += box(sc(fx), sc(fy), 0.6, fw * ISLE, fd * ISLE, 0.08, C.foam, { flat: true });

add(-1000, hot({ id: 'sea', href: '/work/#g-marine-systems', name: 'Marine systems', parts: sea, lx: px(5, 31), ly: py(5, 31, 0.6) - 4, mode: 'glow' }));

// -- Island: sand plates, then grass plates, then a rocky hill at the back.
let island = '';
const sand = [
  [6, 6, 22, 22], [4, 9, 4, 14], [26, 8, 4, 18], [10, 4, 14, 4], [7, 28, 20, 2],
];
for (const [x, y, w, d] of sand.sort((a, b) => a[0] + a[1] - (b[0] + b[1]))) island += box(sc(x), sc(y), 0.6, w * ISLE, d * ISLE, PLATE, C.sand);
const grass = [
  [7, 7, 20, 20], [5, 10, 3, 12], [27, 9, 2, 16], [12, 5, 10, 2], [8, 27, 18, 2],
];
for (const [x, y, w, d] of grass.sort((a, b) => a[0] + a[1] - (b[0] + b[1]))) island += box(sc(x), sc(y), 1.0, w * ISLE, d * ISLE, PLATE, C.grass);
// hill: rock brick with a grass plate on top, at the back-left
island += box(sc(6), sc(6), 1.4, 7 * ISLE, 6 * ISLE, BRICK, C.rock, { noTop: true });
island += box(sc(6), sc(6), 2.6, 7 * ISLE, 6 * ISLE, PLATE, C.grassDark);
// boulders
island += box(4, 23.3, 1.0, 2, 2, 0.9, C.stone, { flat: true });
island += box(27, 26.5, 1.0, 2, 1.5, 0.7, C.stone, { flat: true });

// olive trees: trunk + leafy dome
function tree(x, y, z, r = 1.1) {
  return cylinder(x, y, z, 0.3, 1.1, C.woodDark) + dome(x, y, z + 1.0, r, C.olive) + `<circle cx="${f1(px(x, y) - r * S * 0.3)}" cy="${f1(py(x, y, z + 1.0) - r * S * 0.75)}" r="${f1(r * S * 0.18)}" fill="${lighten(C.olive, 0.3)}"/>`;
}
island += tree(5.6, 17.5, 1.4, 1.0);
island += tree(26, 26, 1.4, 1.1);
island += tree(19, 5.5, 1.4, 0.9);
island += tree(27.3, 6.3, 1.0, 0.8);

// gulls, brick-built: a body brick, flat wing plates with grey tips, a round
// head and an orange beak. `s` scales the bird about its origin; the bird
// faces +x (front-right).
const GREY = '#8c8c88';
function brickGull(x, y, z, s = 1) {
  const b = (dx, dy, dz, w, d, h, c) => box(x + dx * s, y + dy * s, z + dz * s, w * s, d * s, h * s, c, { flat: true });
  let g = '';
  g += b(0.2, -1.1, 0.45, 0.7, 0.6, 0.12, C.white); // left wing, outer (raised)
  g += b(0.2, -1.4, 0.55, 0.7, 0.35, 0.12, GREY); // left tip
  g += b(0.2, -0.55, 0.3, 0.7, 0.6, 0.12, C.white); // left wing, inner
  g += b(-0.35, 0.1, 0.1, 0.35, 0.3, 0.1, C.white); // tail
  g += b(0, 0, 0, 1.1, 0.5, 0.45, C.white); // body
  g += b(0.2, 0.5, 0.3, 0.7, 0.6, 0.12, C.white); // right wing, inner
  g += b(0.2, 1.05, 0.45, 0.7, 0.6, 0.12, C.white); // right wing, outer (raised)
  g += b(0.2, 1.6, 0.55, 0.7, 0.35, 0.12, GREY); // right tip
  g += cylinder(x + 1.15 * s, y + 0.25 * s, z + 0.2 * s, 0.3 * s, 0.45 * s, C.white); // head
  g += b(1.45, 0.12, 0.35, 0.4, 0.25, 0.15, C.orange); // beak
  g += `<circle cx="${f1(px(x + 1.3 * s, y + 0.25 * s) + 2 * s)}" cy="${f1(py(x + 1.3 * s, y + 0.25 * s, z + 0.5 * s))}" r="${f1(0.9 * s)}" fill="#222"/>`;
  return g;
}
let gulls = brickGull(3, 21, 6.5, 1.3) + brickGull(8, 2.5, 7, 1.1) + brickGull(30.5, 12, 7.5, 1.25) + brickGull(28, 30, 5, 1.05) + brickGull(15, 1.5, 4.5, 0.9);
// one perched on the front-left boulder
gulls += brickGull(4, 23.8, 1.9, 1.0);

add(-900, hot({ id: 'island', href: '/work/#g-ecology-evolution', name: 'Island ecology and evolution', parts: island + gulls, lx: px(17, 30.5), ly: py(17, 30.5, 1.4) - 14, mode: 'glow' }));

// -- Houses (Cycladic: white cubes, blue doors and shutters, some with domes).
function door(face, w = 0.9, h = 1.5, u = 1.2, colour = C.blue) {
  return `<g transform="${face}">${rectIn(u, 0, w, h, colour)}${rectIn(u + 0.08, 0.08, w - 0.16, h - 0.16, lighten(colour, 0.12))}<circle cx="${u + w - 0.22}" cy="${h * 0.5}" r="0.06" fill="${C.yellow}"/></g>`;
}
function windowOn(face, u, v, w = 0.7, h = 0.8, colour = C.blue) {
  return `<g transform="${face}">${rectIn(u, v, w, h, colour)}${rectIn(u + 0.1, v + 0.1, w - 0.2, h - 0.2, '#cfe6f7')}${rectIn(u - 0.22, v, 0.2, h, colour)}${rectIn(u + w + 0.02, v, 0.2, h, colour)}</g>`;
}
function bougainvillea(x, y, z) {
  let s = cylinder(x, y, z, 0.28, 0.6, C.leaf);
  const dots = [
    [0, 0, 0.9], [0.35, 0.1, 0.7], [-0.3, 0.2, 0.75], [0.1, -0.35, 0.8], [0.15, 0.3, 1.1], [-0.2, -0.2, 1.05],
  ];
  for (const [dx, dy, dz] of dots) s += cylinder(x + dx, y + dy, z + dz - 0.1, 0.24, 0.16, C.pink);
  return s;
}

/** Plain cube house with a flat studded roof. */
function cube(x, y, z, w, d, h, opts = {}) {
  let s = box(x, y, z, w, d, h, C.white);
  const right = onRight(x + w, y, z);
  const left = onLeft(x, y + d, z);
  if (opts.door !== false) s += door(right, 0.9, 1.5, opts.doorU ?? (d - 1.9) / 2 + 0.5);
  (opts.winRight ?? []).forEach(([u, v]) => (s += windowOn(right, u, v)));
  (opts.winLeft ?? [[(w - 0.7) / 2, h * 0.5]]).forEach(([u, v]) => (s += windowOn(left, u, v)));
  return s;
}

// Publications: chapel with a blue dome and a bell arch.
{
  const x = 14.8, y = 7.4, z = 1.4, w = 6, d = 6, h = BRICK * 2;
  let s = cube(x, y, z, w, d, h, { doorU: 2.55, winRight: [[0.7, 1.2], [4.6, 1.2]], winLeft: [[1.0, 1.3], [4.3, 1.3]] });
  s += cylinder(x + 3, y + 3, z + h, 2.3, 0.5, C.white);
  s += dome(x + 3, y + 3, z + h + 0.5, 2.3, C.blue);
  // cross on the dome
  const cx = px(x + 3, y + 3), cy = py(x + 3, y + 3, z + h + 0.5) - 2.3 * S * 1.02;
  s += `<path d="M${f1(cx)},${f1(cy + 2)} v-14 M${f1(cx - 5)},${f1(cy - 8)} h10" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>`;
  // bell arch at the front-left corner of the roof
  s += box(x + 0.3, y + 4.4, z + h, 1.4, 1.4, 1.6, C.white, { flat: true });
  s += `<g transform="${onRight(x + 1.7, y + 4.4, z + h)}"><path d="M0.3,0 v0.9 a0.4,0.4 0 0 1 0.8,0 v-0.9 z" fill="${C.blue}"/><circle cx="0.7" cy="0.85" r="0.14" fill="${C.yellow}"/></g>`;
  add(x + y, hot({ id: 'publications', href: '/publications/', name: 'Publications', parts: s, lx: cx, ly: cy - 10, anchor: [x + 3, y + 3, z] }));
}

// Methods: the windmill on the hill.
{
  const x = 9.2, y = 8.7, z = 3.0, r = 1.9;
  let s = cylinder(x, y, z, r, 4.2, C.white);
  s += `<g transform="${onRight(x + 1.4, y - 0.8, z)}">${rectIn(0.2, 0, 0.9, 1.5, C.blue)}</g>`;
  s += `<g transform="${onRight(x + 1.4, y - 0.8, z)}">${rectIn(0.35, 2.4, 0.6, 0.7, C.blue)}</g>`;
  // thatched cap
  const rx = r * 1.2247 * S, ry = r * 0.7071 * S;
  const cx = px(x, y), cy = py(x, y, z + 4.2);
  s += `<path d="M${f1(cx - rx)},${f1(cy)} L${f1(cx)},${f1(cy - 2.6 * S)} L${f1(cx + rx)},${f1(cy)} A${f1(rx)},${f1(ry)} 0 0 1 ${f1(cx - rx)},${f1(cy)} Z" fill="${gradient([[0, lighten(C.wood, 0.18)], [0.5, C.wood], [1, darken(C.wood, 0.25)]])}"/>`;
  s += `<path d="M${f1(cx)},${f1(cy - 2.6 * S)} L${f1(cx)},${f1(cy + ry)}" stroke="${darken(C.wood, 0.3)}" stroke-width="1" opacity="0.5"/>`;
  // sails: hub on the +x side, six white triangular sails on wooden spars
  const hx = cx + rx * 0.62, hy = cy + 0.15 * S;
  let sails = '';
  for (let i = 0; i < 6; i++) {
    const a = (i * 60 + 20) * (Math.PI / 180);
    const L = 56;
    const ex = Math.cos(a) * L, ey = Math.sin(a) * L;
    const p1 = `${f1(Math.cos(a) * 12)},${f1(Math.sin(a) * 12)}`;
    const p2 = `${f1(ex)},${f1(ey)}`;
    const p3 = `${f1(Math.cos(a + 0.4) * 38)},${f1(Math.sin(a + 0.4) * 38)}`;
    sails += `<polygon points="${p1} ${p2} ${p3}" fill="#ffffff" stroke="#c9c6bf" stroke-width="0.8"/>`;
    sails += `<line x1="0" y1="0" x2="${f1(ex)}" y2="${f1(ey)}" stroke="${C.woodDark}" stroke-width="2.6" stroke-linecap="round"/>`;
  }
  s += `<g transform="translate(${f1(hx)} ${f1(hy)}) skewY(-12)">${sails}<circle r="5" fill="${C.woodDark}"/></g>`;
  add(x + y - 8, hot({ id: 'methods', href: '/methods/', name: 'Methods', parts: s, lx: cx, ly: cy - 2.8 * S - 8, anchor: [x, y, z] }));
}

// Sustainability: a brick-built wind turbine on a small terrace, with solar panels.
// The rotor is a real part, not a drawing: it lives in the one vertical plane
// that faces the viewer square on (spanned by (1,−1,0)/√2 and z, which project
// to screen horizontal and vertical), and every blade is extruded along the
// rotor axis, so it carries a lit face, a rim and a shadowed back like the
// bricks around it.
{
  const x = 25.2, y = 8.2, z = 1.4;
  let s = box(x - 1, y - 1, z, 2, 2, 0.35, C.stone, { flat: true });
  // Tower, stacked from two parts the way a tower is built.
  s += cylinder(x, y, z + 0.35, 0.66, 0.8, C.white);
  s += cylinder(x, y, z + 1.15, 0.44, 6.6, C.white);
  const zTop = z + 7.75;
  // Nacelle: a plain brick housing, studs on top. It stands taller than the
  // hub so its studded top stays in view behind the rotor.
  s += box(x - 0.8, y - 0.8, zTop, 1.6, 1.6, 1.4, C.white);

  // Screen basis of the rotor plane, and of the axis it is extruded along.
  const E1 = 1.2247 * S; // one world unit across the plane → screen x
  const E2 = -S; // one world unit up → screen y
  const DEPTH = 0.7071 * S * 0.34; // 0.34 studs of thickness → screen y (downwards)
  // Moving forward along the axis also moves down the screen, so the hub is
  // raised by the same amount and lands square in front of the nacelle.
  const AX = 0.85;
  const hx = px(x + AX, y + AX);
  const hy = py(x + AX, y + AX, zTop + 0.5 + AX);
  const at = (a, b) => [hx + a * E1, hy + b * E2];
  const spin = (u, v, th) => at(u * Math.cos(th) - v * Math.sin(th), u * Math.sin(th) + v * Math.cos(th));

  const face = lighten(C.white, 0.08);
  const rim = darken(C.white, 0.13);
  const back = darken(C.white, 0.3);
  const poly = (pts, fill, dy = 0) =>
    `<polygon points="${pts.map((p) => `${f1(p[0])},${f1(p[1] + dy)}`).join(' ')}" fill="${fill}"/>`;
  /** A flat part: shadowed back, a rim all round, then the lit face on top. */
  const part = (pts) => {
    let out = poly(pts, back);
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      out += poly([a, b, [b[0], b[1] + DEPTH], [a[0], a[1] + DEPTH]], rim);
    }
    return out + poly(pts, face, DEPTH);
  };

  // One blade, in plane coordinates: root, a wide shoulder, then a taper to the tip.
  const BLADE = [
    [0.36, 0.36], [1.35, 0.34], [2.35, 0.25], [2.9, 0.15],
    [2.9, -0.15], [2.35, -0.23], [1.35, -0.3], [0.36, -0.32],
  ];
  for (const deg of [90, 210, 330]) {
    const th = (deg * Math.PI) / 180;
    s += part(BLADE.map(([u, v]) => spin(u, v, th)));
  }
  // Hub, with the axle hole that gives the part away.
  const HUB = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    return at(Math.cos(a) * 0.62, Math.sin(a) * 0.62);
  });
  s += part(HUB);
  s += `<ellipse cx="${f1(hx)}" cy="${f1(hy + DEPTH)}" rx="${f1(0.2 * E1)}" ry="${f1(0.2 * S)}" fill="${darken(C.white, 0.42)}"/>`;

  // Solar array: tilted dark panels on the ground beside the mast.
  for (let i = 0; i < 3; i++) {
    const sx = x + 1.8, sy = y + 1 + i * 1.5;
    s += `<polygon points="${pt(sx, sy, z)} ${pt(sx, sy + 1.3, z)} ${pt(sx + 1.8, sy + 1.3, z + 1.0)} ${pt(sx + 1.8, sy, z + 1.0)}" fill="${C.panel}" stroke="#7f92b3" stroke-width="0.8"/>`;
  }
  add(x + y - 4, hot({ id: 'sustainability', href: '/work/sustainability-organisations-as-systems/', name: 'Sustainability', parts: s, lx: hx, ly: hy - 2.9 * S - 10, anchor: [x, y, z] }));
}

// About: house with a terrace, an external stair and a bougainvillea.
{
  const x = 5.4, y = 13.8, z = 1.4, w = 5, d = 5, h = BRICK * 2;
  let s = cube(x, y, z, w, d, h, { doorU: 1.2, winRight: [[3.4, 1.2]], winLeft: [[0.8, 1.3], [3.4, 1.3]] });
  // stair up the +y face
  for (let i = 0; i < 5; i++) s += box(x + 0.3 + i * 0.85, y + d, z + i * 0.48, 0.85, 0.9, 0.48, C.white, { flat: true });
  s += box(x, y, z + h, 1.0, d, 0.4, C.white); // roof parapet strip
  s += bougainvillea(x + w + 0.6, y + 3.9, z);
  add(x + y, hot({ id: 'about', href: '/about/', name: 'About me', parts: s, lx: px(x + 2.5, y + 2.5), ly: py(x + 2.5, y + 2.5, z + h) - 12, anchor: [x + 2.5, y + 2.5, z] }));
}

// Work: the largest house, two storeys, blue shutters and a rooftop room.
{
  const x = 21.4, y = 13.8, z = 1.4, w = 6, d = 6, h = BRICK * 2.5;
  let s = cube(x, y, z, w, d, h, { doorU: 2.5, winRight: [[0.7, 1.6], [4.6, 1.6], [0.7, 0.2], [4.6, 0.2]], winLeft: [[1.0, 1.7], [4.3, 1.7], [1.0, 0.25], [4.3, 0.25]] });
  s += cube(x + 0.6, y + 3.0, z + h, 2.6, 2.6, BRICK, { door: false, winLeft: [[0.95, 0.3]] });
  s += dome(x + 4.3, y + 1.7, z + h, 1.2, C.blue);
  s += bougainvillea(x - 0.7, y + 5.4, z);
  add(x + y, hot({ id: 'work', href: '/work/', name: 'Projects', parts: s, lx: px(x + 3, y + 3), ly: py(x + 3, y + 3, z + h + BRICK) - 16, anchor: [x + 3, y + 3, z] }));
}

// Teaching: a house with a striped awning and two benches.
{
  const x = 12.6, y = 19.4, z = 1.4, w = 5, d = 5, h = BRICK * 2;
  let s = cube(x, y, z, w, d, h, { doorU: 3.0, winRight: [[0.7, 1.3]], winLeft: [[0.8, 1.3], [3.4, 1.3]] });
  // awning over the door on the +x face: alternating blue/white strips on a sloped plate
  for (let i = 0; i < 6; i++) {
    const u0 = y + 2.0 + i * 0.5;
    s += `<polygon points="${pt(x + w, u0, z + 1.8)} ${pt(x + w, u0 + 0.5, z + 1.8)} ${pt(x + w + 1.3, u0 + 0.5, z + 1.45)} ${pt(x + w + 1.3, u0, z + 1.45)}" fill="${i % 2 ? C.white : C.blue}"/>`;
  }
  // benches
  s += box(x + w + 0.6, y + 0.3, z, 0.5, 1.6, 0.5, C.wood, { flat: true });
  s += box(x + 1.2, y + d + 0.6, z, 2.0, 0.5, 0.5, C.wood, { flat: true });
  add(x + y, hot({ id: 'teaching', href: '/teaching/', name: 'Teaching', parts: s, lx: px(x + 2.5, y + 2.5), ly: py(x + 2.5, y + 2.5, z + h) - 12, anchor: [x + 2.5, y + 2.5, z] }));
}

// CV: a small house by the pier with a signpost.
{
  const x = 23.6, y = 22.2, z = 1.4, w = 4, d = 4, h = BRICK * 1.6;
  let s = cube(x, y, z, w, d, h, { doorU: 2.2, winRight: [[0.5, 1.05]], winLeft: [[1.6, 1.0]] });
  s += dome(x + 2, y + 2, z + h, 1.4, C.blue);
  // signpost
  s += cylinder(x + w + 1.0, y + 0.8, z, 0.14, 2.0, C.woodDark);
  s += `<g transform="${onRight(x + w + 1.1, y + 0.3, z + 1.45)}">${rectIn(0, 0, 1.0, 0.4, C.wood)}<path d="M0,0 l-0.22,0.2 0.22,0.2" fill="${C.wood}"/></g>`;
  add(x + y, hot({ id: 'cv', href: '/cv/', name: 'Curriculum vitae', parts: s, lx: px(x + 2, y + 2), ly: py(x + 2, y + 2, z + h) - 34, anchor: [x + 2, y + 2, z] }));
}

// -- Three figures on the square in front of the houses.
function minifig(x, y, z, shirt, legs, hair, facing = 'right') {
  let s = '';
  // legs
  s += box(x, y, z, 0.55, 0.8, 1.05, legs, { flat: true });
  s += box(x + 0.6, y, z, 0.55, 0.8, 1.05, legs, { flat: true });
  s += box(x - 0.02, y - 0.02, z + 1.05, 1.19, 0.84, 0.3, darken(legs, 0.15), { flat: true });
  // torso
  s += box(x - 0.1, y - 0.05, z + 1.35, 1.35, 0.9, 1.15, shirt, { flat: true });
  // arms
  s += box(x - 0.45, y + 0.1, z + 1.55, 0.36, 0.6, 0.9, shirt, { flat: true });
  s += box(x + 1.25, y + 0.1, z + 1.55, 0.36, 0.6, 0.9, shirt, { flat: true });
  // hands
  s += cylinder(x - 0.27, y + 0.4, z + 1.35, 0.18, 0.22, C.skin);
  s += cylinder(x + 1.43, y + 0.4, z + 1.35, 0.18, 0.22, C.skin);
  // neck + head
  s += cylinder(x + 0.57, y + 0.4, z + 2.5, 0.28, 0.15, C.skin);
  s += cylinder(x + 0.57, y + 0.4, z + 2.65, 0.55, 0.95, C.skin);
  // face on the front-right of the head
  const fx = px(x + 0.57, y + 0.4) + (facing === 'right' ? 5 : -5);
  const fy = py(x + 0.57, y + 0.4, z + 3.2);
  s += `<circle cx="${f1(fx - 3.2)}" cy="${f1(fy - 1)}" r="1.1" fill="#222"/><circle cx="${f1(fx + 3.2)}" cy="${f1(fy - 1)}" r="1.1" fill="#222"/><path d="M${f1(fx - 3.2)},${f1(fy + 3)} q3.2,3 6.4,0" fill="none" stroke="#222" stroke-width="1.2" stroke-linecap="round"/>`;
  // hair
  s += cylinder(x + 0.57, y + 0.4, z + 3.6, 0.6, 0.3, hair);
  return s;
}
{
  let s = minifig(6, 21.6, 1.4, C.red, C.blue, C.dark, 'right');
  s += minifig(9.4, 24, 1.4, C.yellow, C.dark, C.woodDark, 'left');
  s += minifig(13.4, 26.4, 1.4, C.blue, C.tan, C.orange, 'right');
  add(13.4 + 26.4, hot({ id: 'people', href: '/work/#g-sustainability-social', name: 'Social and economic systems', parts: s, lx: px(10, 24), ly: py(10, 24, 5.6) - 8, anchor: [10, 24, 1.4] }));
}

// -- Pelican, brick-built and larger than the gulls, standing on the boulder.
{
  const x = 33.6, y = 19.9, z = 1.25, s = 1.5;
  const b = (dx, dy, dz, w, d, h, c) => box(x + dx * s, y + dy * s, z + dz * s, w * s, d * s, h * s, c, { flat: true });
  let g = '';
  g += b(0.85, 0.05, 0, 0.5, 0.28, 0.22, C.orange); // left foot
  g += b(0.85, 0.5, 0, 0.5, 0.28, 0.22, C.orange); // right foot
  g += b(-0.5, -0.1, 0.25, 1.6, 1.0, 0.8, C.white); // body
  g += b(-0.5, -0.35, 0.7, 1.1, 0.3, 0.2, C.white); // left folded wing
  g += b(-0.5, -0.35, 0.7, 0.35, 0.3, 0.2, GREY);
  g += b(-0.5, 0.85, 0.7, 1.1, 0.3, 0.2, C.white); // right folded wing
  g += b(-0.5, 0.85, 0.7, 0.35, 0.3, 0.2, GREY);
  g += b(-0.75, 0.2, 0.55, 0.3, 0.4, 0.15, C.white); // tail
  g += cylinder(x + 0.85 * s, y + 0.4 * s, z + 1.0 * s, 0.26 * s, 0.75 * s, C.white); // neck
  g += cylinder(x + 0.85 * s, y + 0.4 * s, z + 1.75 * s, 0.45 * s, 0.55 * s, C.white); // head
  g += b(1.15, 0.22, 1.95, 1.35, 0.36, 0.18, C.orange); // upper beak
  g += b(1.15, 0.22, 1.65, 0.9, 0.36, 0.3, '#f5b04a'); // pouch
  g += `<circle cx="${f1(px(x + 1.1 * s, y + 0.4 * s) + 3)}" cy="${f1(py(x + 1.1 * s, y + 0.4 * s, z + 2.1 * s))}" r="1.6" fill="#222"/>`;
  add(100, hot({ id: 'pelican', href: '/work/#g-ecology-evolution', name: 'Island ecology and evolution', parts: g, lx: px(x + 0.6, y + 0.4), ly: py(x + 0.6, y + 0.4, z + 2.4 * s) - 6, anchor: [x + 0.4, y + 0.4, z] }));
}

// -- Pier and boat (part of the marine link).
{
  let s = '';
  for (let i = 0; i < 3; i++) s += cylinder(30.5 + i * 2, 19.7, 0.2, 0.2, 1.1, C.woodDark) + cylinder(30.5 + i * 2, 21.3, 0.2, 0.2, 1.1, C.woodDark);
  s += box(29.5, 19.5, 1.0, 6.5, 2, 0.25, C.wood, { flat: true });
  // boat: hull + cabin + mast
  const bx = 31.5, by = 25.5;
  s += box(bx, by, 0.5, 4.2, 1.8, 0.6, C.white, { flat: true });
  s += box(bx - 0.5, by + 0.1, 0.5, 0.6, 1.6, 0.6, C.blue, { flat: true });
  s += box(bx + 0.6, by + 0.3, 1.1, 1.3, 1.2, 0.7, C.blue, { flat: true });
  s += cylinder(bx + 2.8, by + 0.9, 1.1, 0.09, 3.4, C.woodDark);
  const mx = px(bx + 2.8, by + 0.9), my = py(bx + 2.8, by + 0.9, 4.5);
  s += `<path d="M${f1(mx)},${f1(my)} l-30,30 h30 z" fill="#ffffff" stroke="#c9c6bf" stroke-width="0.8"/>`;
  add(31 + 25, hot({ id: 'boat', href: '/work/#g-marine-systems', name: 'Marine systems', parts: s, lx: px(bx + 2, by + 1), ly: my - 8, anchor: [bx + 2, by + 1, 0.6] }));
}

// ---------- assemble ----------
items.sort((a, b) => a.key - b.key);
const body = items.map((i) => i.svg).join('\n');
const svg =
  `<svg class="island" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="group" aria-labelledby="island-title" aria-describedby="island-desc">\n` +
  `<title id="island-title">An island of white houses, drawn as a toy-brick model</title>\n` +
  `<desc id="island-desc">A stepped island with white Cycladic houses, a windmill, a wind turbine, three figures, gulls, a pelican on the pier and a boat. Each part links to a section of the site: the sea to marine work, the island, its gulls and the pelican to ecology and evolution, the figures to social and economic systems, the turbine to sustainability, and the houses to the pages.</desc>\n` +
  `<style>.hot__label{display:none}.hot__pill{fill:#2b2260;stroke:#d9c4f5;stroke-width:1.5}.hot__text{fill:#f4eefb}</style>\n` +
  `<defs>\n${defs.join('\n')}\n</defs>\n${body}\n</svg>\n`;

const out = path.resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'), 'src/components/island.svg');
writeFileSync(out, svg);
console.log(`island: ${(svg.length / 1024).toFixed(1)} kB → ${out}`);
