/**
 * Fitting is not testing: ten noisy points from a smooth curve, fitted by least-squares
 * polynomials of degree 1, 3 and 9, and the error of each on 200 new points drawn from the
 * same curve with fresh noise. A degree-9 polynomial has ten coefficients, so it goes
 * through all ten points. Computed from a seeded generator; the numbers in the post come
 * from `stats()` below.
 */
import { svg, axes, xticks, yticks, hgrid, scale, L, P, C, T, rng, gauss } from './lib.mjs';

const truth = (x) => 0.3 + 0.8 * Math.sin(2.4 * x);
const SD = 0.2; // sd of the noise on every observation

/** Least-squares polynomial of the given degree, solved in a Chebyshev basis (well conditioned) by the normal equations. */
function fit(xs, ys, degree) {
  const k = degree + 1;
  const basis = (x) => {
    const t = [1, x];
    for (let j = 2; j < k; j++) t[j] = 2 * x * t[j - 1] - t[j - 2];
    return t.slice(0, k);
  };
  const A = Array.from({ length: k }, () => new Array(k + 1).fill(0));
  xs.forEach((x, i) => {
    const t = basis(x);
    for (let a = 0; a < k; a++) {
      for (let b = 0; b < k; b++) A[a][b] += t[a] * t[b];
      A[a][k] += t[a] * ys[i];
    }
  });
  for (let c = 0; c < k; c++) {
    let p = c;
    for (let r = c + 1; r < k; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]];
    for (let r = 0; r < k; r++) {
      if (r === c) continue;
      const f = A[r][c] / A[c][c];
      for (let q = c; q <= k; q++) A[r][q] -= f * A[c][q];
    }
  }
  const coef = A.map((row, i) => row[k] / row[i]);
  return (x) => basis(x).reduce((s, t, j) => s + t * coef[j], 0);
}

const rmse = (f, xs, ys) => Math.sqrt(xs.reduce((s, x, i) => s + (f(x) - ys[i]) ** 2, 0) / xs.length);

export function stats() {
  const rand = rng(11);
  const xs = Array.from({ length: 10 }, (_, i) => -1 + (2 * i) / 9);
  const ys = xs.map((x) => truth(x) + SD * gauss(rand));
  const nx = Array.from({ length: 200 }, () => -1 + 2 * rand());
  const ny = nx.map((x) => truth(x) + SD * gauss(rand));
  const fits = {};
  for (const d of [1, 3, 9]) {
    const f = fit(xs, ys, d);
    fits[d] = { f, train: rmse(f, xs, ys), test: rmse(f, nx, ny) };
  }
  return { xs, ys, fits, noise: SD };
}

export default function draw() {
  const { xs, ys, fits } = stats();
  const x0 = 56,
    x1 = 462,
    y0 = 232,
    y1 = 30;
  const sx = scale(-1, 1, x0 + 10, 402);
  const lo = -1.5,
    hi = 1.5;
  const sy = scale(lo, hi, y0, y1);

  /** A curve drawn over x in [-1, 1], cut where it leaves the plot so it never runs outside. */
  const curve = (f, cls) => {
    const parts = [];
    let cur = [];
    for (let i = 0; i <= 160; i++) {
      const x = -1 + (2 * i) / 160;
      const y = f(x);
      if (y >= lo && y <= hi) cur.push([sx(x), sy(y)]);
      else if (cur.length) (parts.push(cur), (cur = []));
    }
    if (cur.length) parts.push(cur);
    return parts.filter((p) => p.length > 1).map((p) => P(p, cls));
  };

  return svg(
    { h: 262, a: 'lilac', b: 'sand' },
    hgrid(x0, x1, [sy(0)]),
    axes({ x0, y0, x1, y1, xlabel: 'x', ylabel: 'y' }),
    xticks(sx, y0, [[-1], [0], [1]]),
    yticks(sy, x0, [[-1], [0], [1]]),
    curve(truth, 'ln dash'),
    curve(fits[1].f, 'sa'),
    curve(fits[3].f, 'la'),
    curve(fits[9].f, 'lb'),
    xs.map((x, i) => C(sx(x), sy(ys[i]), 3.6, 'fn')),
    T(sx(1) + 9, sy(fits[1].f(1)) + 4, 'degree 1', 'tm'),
    T(sx(0.1), sy(1.38), 'degree 3', 'ta halo'),
    T(sx(0.3), sy(-1.28), 'degree 9', 'tb halo'),
  );
}
