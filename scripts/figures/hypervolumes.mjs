/**
 * Two traits of 30 made-up species (seeded): the points, their convex hull (monotone
 * chain), and a kernel-density region. The density is a Gaussian product kernel with
 * the bandwidth of each axis set to 0.4 of Silverman's rule of thumb (sd * n^(-1/6)),
 * evaluated on a grid; the region is the contour (marching squares) at the density
 * level that encloses 90 per cent of the estimated mass. Nothing is drawn by hand.
 */
import { svg, axes, scale, rng, gauss, P, C, T, L, n } from './lib.mjs';

/** Convex hull by Andrew's monotone chain; returns the vertices in order. */
function hull(pts) {
  const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [];
  for (const q of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop();
    lower.push(q);
  }
  const upper = [];
  for (const q of [...p].reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop();
    upper.push(q);
  }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

/** Closed contours of a gridded field at `level` by marching squares; field[j][i], returns loops of [i, j] in grid units. */
function contours(field, level) {
  const ny = field.length,
    nx = field[0].length;
  const segs = []; // [keyA, keyB]
  const at = new Map(); // key -> [i, j] position
  // an edge is named by its lower-left grid node and its direction (h: along i, v: along j)
  const edge = (kind, i, j) => {
    const key = `${kind}${i},${j}`;
    if (!at.has(key)) {
      const [i2, j2] = kind === 'h' ? [i + 1, j] : [i, j + 1];
      const a = field[j][i],
        b = field[j2][i2];
      const t = (level - a) / (b - a);
      at.set(key, [i + t * (i2 - i), j + t * (j2 - j)]);
    }
    return key;
  };
  for (let j = 0; j < ny - 1; j++) {
    for (let i = 0; i < nx - 1; i++) {
      const v00 = field[j][i] >= level,
        v10 = field[j][i + 1] >= level,
        v11 = field[j + 1][i + 1] >= level,
        v01 = field[j + 1][i] >= level;
      const c = (v00 ? 1 : 0) | (v10 ? 2 : 0) | (v11 ? 4 : 0) | (v01 ? 8 : 0);
      if (c === 0 || c === 15) continue;
      const B = () => edge('h', i, j), // bottom
        T_ = () => edge('h', i, j + 1), // top
        Lf = () => edge('v', i, j), // left
        Rt = () => edge('v', i + 1, j); // right
      const centre = (field[j][i] + field[j][i + 1] + field[j + 1][i + 1] + field[j + 1][i]) / 4 >= level;
      const table = {
        1: [[Lf, B]],
        2: [[B, Rt]],
        3: [[Lf, Rt]],
        4: [[Rt, T_]],
        5: centre ? [[B, Rt], [Lf, T_]] : [[Lf, B], [Rt, T_]],
        6: [[B, T_]],
        7: [[Lf, T_]],
        8: [[Lf, T_]],
        9: [[B, T_]],
        10: centre ? [[Lf, B], [Rt, T_]] : [[B, Rt], [Lf, T_]],
        11: [[Rt, T_]],
        12: [[Lf, Rt]],
        13: [[B, Rt]],
        14: [[Lf, B]],
      };
      for (const [p, q] of table[c]) segs.push([p(), q()]);
    }
  }
  // chain the segments into loops
  const nbr = new Map();
  for (const [a, b] of segs) {
    if (!nbr.has(a)) nbr.set(a, []);
    if (!nbr.has(b)) nbr.set(b, []);
    nbr.get(a).push(b);
    nbr.get(b).push(a);
  }
  const seen = new Set();
  const loops = [];
  for (const start of nbr.keys()) {
    if (seen.has(start)) continue;
    const loop = [];
    let prev = null,
      cur = start;
    while (cur && !seen.has(cur)) {
      seen.add(cur);
      loop.push(at.get(cur));
      const next = nbr.get(cur).find((k) => k !== prev && !seen.has(k));
      prev = cur;
      cur = next;
    }
    if (loop.length > 2) loops.push(loop);
  }
  return loops;
}

const MASS = 0.9; // share of the estimated density the region holds

export default function draw() {
  const rand = rng(11);
  // 29 species along a curved band of trait combinations, plus one extreme species.
  const pts = [];
  for (let k = 0; k < 29; k++) {
    const th = Math.PI * (0.12 + 0.76 * rand());
    pts.push([1.3 * Math.cos(th) + 0.16 * gauss(rand), 0.85 * Math.sin(th) + 0.16 * gauss(rand)]);
  }
  pts.push([1.75, -0.2]);

  const N = pts.length;
  const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
  const sd = (a) => Math.sqrt(mean(a.map((v) => (v - mean(a)) ** 2)) * (a.length / (a.length - 1)));
  const hx = 0.4 * sd(pts.map((p) => p[0])) * N ** (-1 / 6);
  const hy = 0.4 * sd(pts.map((p) => p[1])) * N ** (-1 / 6);

  // density on a grid that reaches three bandwidths beyond the data
  const xmin = Math.min(...pts.map((p) => p[0])) - 3 * hx,
    xmax = Math.max(...pts.map((p) => p[0])) + 3 * hx,
    ymin = Math.min(...pts.map((p) => p[1])) - 3 * hy,
    ymax = Math.max(...pts.map((p) => p[1])) + 3 * hy;
  const nx = 110,
    ny = 90;
  const gx = (i) => xmin + ((xmax - xmin) * i) / (nx - 1),
    gy = (j) => ymin + ((ymax - ymin) * j) / (ny - 1);
  const field = [];
  let total = 0;
  const cells = [];
  for (let j = 0; j < ny; j++) {
    const row = [];
    for (let i = 0; i < nx; i++) {
      let d = 0;
      for (const [px, py] of pts) d += Math.exp(-0.5 * (((gx(i) - px) / hx) ** 2 + ((gy(j) - py) / hy) ** 2));
      row.push(d);
      total += d;
      cells.push(d);
    }
    field.push(row);
  }
  // the level that encloses 90 per cent of the mass
  cells.sort((a, b) => b - a);
  let acc = 0,
    level = cells[0];
  for (const d of cells) {
    acc += d;
    level = d;
    if (acc >= MASS * total) break;
  }

  // drawing frame: the data plus a margin, equal units on both axes
  const dxmin = Math.min(...pts.map((p) => p[0])) - 0.3,
    dxmax = Math.max(...pts.map((p) => p[0])) + 0.2,
    dymin = Math.min(...pts.map((p) => p[1])) - 0.25,
    dymax = Math.max(...pts.map((p) => p[1])) + 0.4;
  const x0 = 40,
    y1 = 40;
  const k = Math.min(422 / (dxmax - dxmin), 220 / (dymax - dymin));
  const x1 = x0 + k * (dxmax - dxmin);
  const y0 = y1 + k * (dymax - dymin);
  const sx = (v) => x0 + k * (v - dxmin),
    sy = (v) => y0 - k * (v - dymin);

  const H = hull(pts).map(([x, y]) => [sx(x), sy(y)]);
  const loops = contours(field, level).map((l) => l.map(([i, j]) => [sx(xmin + ((xmax - xmin) * i) / (nx - 1)), sy(ymin + ((ymax - ymin) * j) / (ny - 1))]));
  const d = loops.map((l) => l.map(([x, y], q) => `${q ? 'L' : 'M'}${n(x)} ${n(y)}`).join('') + 'Z').join('');
  const top = Math.min(...loops.flat().map((p) => p[1])),
    left = Math.min(...loops.flat().map((p) => p[0]));
  const far = pts[N - 1]; // the extreme species
  const [ex, ey] = [sx(far[0]), sy(far[1])];

  return svg(
    { h: Math.ceil(y0 + 36), a: 'teal', b: 'sand' },
    axes({ x0, y0, x1, y1, xlabel: 'trait 1', ylabel: 'trait 2' }),
    P(H, 'fbs dash', true),
    `<path class="fas" d="${d}"/>`,
    pts.map(([x, y]) => C(sx(x), sy(y), 3, 'fad')),
    T(left, top - 8, 'kernel density region', 'ta halo'),
    T(ex - 36, ey + 4, 'one extreme species', 'tb halo', 'end'),
    T(sx(-0.2), sy(0.0), 'convex hull', 'tb halo', 'middle'),
  );
}
