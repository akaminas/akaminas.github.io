/**
 * The pattern depends on the grain. Two simulated fields on a 64 x 64 grid. Each is
 * the sum of a broad pattern that both share (smoothed noise, scale about 6 cells)
 * and a fine-scale pattern that enters with opposite signs (smoothed noise, scale
 * about 1.2 cells), so they pull against each other cell by cell and agree over
 * large areas. The curve is the Pearson correlation between the two fields after
 * each is averaged over square blocks of 1, 2, 4, 8 and 16 cells a side. Shaded
 * cells are those above the median of their own field. All computed, seeded.
 */
import { svg, axes, xticks, yticks, hgrid, scale, rng, gauss, L, R, C, T, P, n } from './lib.mjs';

const G = 64;
const SD_BROAD = 6;
const SD_FINE = 1.2;
const W_BROAD = 0.8;
const SEED = 1;
const BLOCKS = [1, 2, 4, 8, 16];

/** Gaussian-smoothed white noise on a torus, scaled to mean 0 and variance 1. */
function smoothField(rand, sd) {
  const white = new Float64Array(G * G);
  for (let i = 0; i < white.length; i++) white[i] = gauss(rand);
  const R_ = Math.ceil(3 * sd);
  const k = [];
  for (let i = -R_; i <= R_; i++) k.push(Math.exp(-(i * i) / (2 * sd * sd)));
  const wrap = (v) => ((v % G) + G) % G;
  const tmp = new Float64Array(G * G);
  const out = new Float64Array(G * G);
  for (let y = 0; y < G; y++)
    for (let x = 0; x < G; x++) {
      let s = 0;
      for (let i = -R_; i <= R_; i++) s += k[i + R_] * white[y * G + wrap(x + i)];
      tmp[y * G + x] = s;
    }
  for (let y = 0; y < G; y++)
    for (let x = 0; x < G; x++) {
      let s = 0;
      for (let i = -R_; i <= R_; i++) s += k[i + R_] * tmp[wrap(y + i) * G + x];
      out[y * G + x] = s;
    }
  const m = out.reduce((a, v) => a + v, 0) / out.length;
  const sdv = Math.sqrt(out.reduce((a, v) => a + (v - m) ** 2, 0) / out.length);
  return out.map((v) => (v - m) / sdv);
}

function correlation(a, b) {
  const len = a.length;
  let ma = 0,
    mb = 0;
  for (let i = 0; i < len; i++) {
    ma += a[i];
    mb += b[i];
  }
  ma /= len;
  mb /= len;
  let sab = 0,
    saa = 0,
    sbb = 0;
  for (let i = 0; i < len; i++) {
    sab += (a[i] - ma) * (b[i] - mb);
    saa += (a[i] - ma) ** 2;
    sbb += (b[i] - mb) ** 2;
  }
  return sab / Math.sqrt(saa * sbb);
}

/** The mean of the field over square blocks of s x s cells. */
function blockMean(a, s) {
  const g = G / s;
  const out = new Float64Array(g * g);
  for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) out[Math.floor(y / s) * g + Math.floor(x / s)] += a[y * G + x] / (s * s);
  return out;
}

/** The cells above the median, as one path of horizontal runs. */
function shade(field, ox, oy, cell) {
  const sorted = Float64Array.from(field).sort();
  const med = (sorted[G * G / 2 - 1] + sorted[G * G / 2]) / 2;
  let d = '';
  for (let y = 0; y < G; y++) {
    let x = 0;
    while (x < G) {
      if (field[y * G + x] > med) {
        let x2 = x;
        while (x2 < G && field[y * G + x2] > med) x2++;
        d += `M${n(ox + x * cell)} ${n(oy + y * cell)}h${n((x2 - x) * cell)}v${n(cell)}h${n(-(x2 - x) * cell)}z`;
        x = x2;
      } else x++;
    }
  }
  return `<path class="fa" style="stroke:none" d="${d}"/>`;
}

export default function draw() {
  const r = rng(SEED);
  const broad = smoothField(r, SD_BROAD);
  const fine = smoothField(r, SD_FINE);
  const X = broad.map((v, i) => W_BROAD * v + fine[i]);
  const Y = broad.map((v, i) => W_BROAD * v - fine[i]);
  const corr = BLOCKS.map((s) => correlation(blockMean(X, s), blockMean(Y, s)));

  // The two fields
  const side = 138;
  const cell = side / G;
  const py = 24;
  const panel = (ox, field, name) => [
    R(ox, py, side, side, 'fn'),
    shade(field, ox, py, cell),
    // one block of 16 cells is a quarter of the side: its edges, as hairlines
    [1, 2, 3].map((k) => L(ox + (k * side) / 4, py, ox + (k * side) / 4, py + side, 'gr') + L(ox, py + (k * side) / 4, ox + side, py + (k * side) / 4, 'gr')),
    R(ox, py, side, side, 'ln'),
    T(ox, py - 8, name, 'tm'),
  ];

  // The curve
  const x0 = 56,
    x1 = 462,
    y0 = 270,
    y1 = 196;
  const sx = scale(0, 4, x0 + 28, x1 - 28);
  const sy = scale(-0.4, 1, y0, y1);
  const pts = corr.map((c, i) => [sx(i), sy(c)]);

  return svg(
    { h: 314, a: 'teal', b: 'sand' },
    panel(66, X, 'field X'),
    panel(276, Y, 'field Y'),
    hgrid(x0, x1, [sy(0)]),
    axes({ x0, y0, x1, y1, xlabel: 'cells per block side', ylabel: 'correlation between the fields' }),
    xticks(sx, y0, BLOCKS.map((b, i) => [i, String(b)])),
    yticks(sy, x0, [[0], [0.5, '0.5'], [1, '1']]),
    P(pts, 'la'),
    pts.map(([px, py_]) => C(px, py_, 3.6, 'fad')),
    pts.map(([px, py_], i) => T(px, py_ - 9, corr[i].toFixed(2), 'ta halo', 'middle')),
  );
}
