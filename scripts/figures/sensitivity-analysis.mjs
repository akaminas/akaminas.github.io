/**
 * Sensitivity analysis: first-order and total variance-based indices of the Ishigami
 * function f = sin x1 + a sin^2 x2 + b x3^4 sin x1 (a = 7, b = 0.1; the inputs are uniform
 * on [-pi, pi]), estimated by Monte Carlo and set against the exact values. The first-order
 * estimator is Saltelli's (2010), the total is Jansen's; the interval is a bootstrap over
 * the sample. Everything is computed from a seeded generator; `stats()` gives the numbers
 * the post quotes.
 */
import { svg, axes, xticks, hgrid, scale, L, C, T, rng } from './lib.mjs';

const a = 7,
  b = 0.1;
const f = (x) => Math.sin(x[0]) + a * Math.sin(x[1]) ** 2 + b * x[2] ** 4 * Math.sin(x[0]);

/** Exact indices (Ishigami and Homma 1990; Sobol' and Levitan 1999). */
export function exact() {
  const V = a * a / 8 + (b * Math.PI ** 4) / 5 + (b * b * Math.PI ** 8) / 18 + 0.5;
  const V1 = 0.5 * (1 + (b * Math.PI ** 4) / 5) ** 2;
  const V2 = (a * a) / 8;
  // Only x1 and x3 interact (through b x3^4 sin x1), so the interaction variance V13 is what is left.
  const V13 = V - V1 - V2;
  return {
    V,
    first: [V1 / V, V2 / V, 0],
    total: [(V1 + V13) / V, V2 / V, V13 / V],
  };
}

const mean = (v) => v.reduce((s, x) => s + x, 0) / v.length;

/** Estimates from fA, fB and fAB[i] (the evaluations), for the rows listed in `idx`. */
function indices(fA, fB, fAB, idx) {
  const A = idx.map((j) => fA[j]);
  const B = idx.map((j) => fB[j]);
  const m = mean(A.concat(B));
  const V = mean(A.concat(B).map((v) => (v - m) ** 2));
  const first = [],
    total = [];
  for (let i = 0; i < 3; i++) {
    const AB = idx.map((j) => fAB[i][j]);
    first.push(mean(B.map((v, j) => v * (AB[j] - A[j]))) / V);
    total.push(mean(A.map((v, j) => (v - AB[j]) ** 2)) / 2 / V);
  }
  return { first, total };
}

export function stats(N = 1000, seed = 5) {
  const rand = rng(seed);
  const U = () => Math.PI * (2 * rand() - 1);
  const A = Array.from({ length: N }, () => [U(), U(), U()]);
  const B = Array.from({ length: N }, () => [U(), U(), U()]);
  const fA = A.map(f);
  const fB = B.map(f);
  const fAB = [0, 1, 2].map((i) => A.map((row, j) => f(row.map((v, k) => (k === i ? B[j][k] : v)))));
  const all = Array.from({ length: N }, (_, j) => j);
  const est = indices(fA, fB, fAB, all);
  // bootstrap: resample the N rows with replacement
  const reps = [];
  for (let r = 0; r < 300; r++) {
    const idx = all.map(() => Math.floor(rand() * N));
    reps.push(indices(fA, fB, fAB, idx));
  }
  const q = (v, p) => [...v].sort((x, y) => x - y)[Math.round(p * (v.length - 1))];
  const ci = (kind, i) => {
    const v = reps.map((r) => r[kind][i]);
    return [q(v, 0.025), q(v, 0.975)];
  };
  return {
    N,
    runs: N * 5,
    est,
    ci: { first: [0, 1, 2].map((i) => ci('first', i)), total: [0, 1, 2].map((i) => ci('total', i)) },
    exact: exact(),
  };
}

export default function draw() {
  const { est, ci, exact: ex } = stats();
  const x0 = 70,
    x1 = 462,
    y0 = 234,
    y1 = 24;
  const sx = scale(-0.1, 0.75, x0, x1);
  const rows = [];
  const names = ['x1', 'x2', 'x3'];
  const top = 40,
    gap = 70,
    off = 22;
  const parts = [];
  [0, 0.2, 0.4, 0.6].forEach((v) => parts.push(L(sx(v), y0, sx(v), y1 + 8, 'gr')));
  for (let g = 0; g < 3; g++) {
    const yA = top + g * gap;
    const yB = yA + off;
    parts.push(T(x0 - 14, yA + 16, names[g], 'tt', 'end'));
    for (const [kind, y, soft, deep, tick] of [
      ['first', yA, 'sa', 'fad', ex.first[g]],
      ['total', yB, 'sb', 'fbd', ex.total[g]],
    ]) {
      const [lo, hi] = ci[kind][g];
      parts.push(L(sx(lo), y, sx(hi), y, soft));
      parts.push(L(sx(tick), y - 7, sx(tick), y + 7, 'ln'));
      parts.push(C(sx(est[kind][g]), y, 4.2, deep));
    }
  }
  // direct labels, on the first group
  parts.push(T(sx(ci.first[0][0]) - 9, top + 4, 'first-order', 'ta halo', 'end'));
  parts.push(T(sx(ci.total[0][0]) - 9, top + off + 4, 'total', 'tb halo', 'end'));
  return svg(
    { h: 266, a: 'lilac', b: 'sand' },
    parts,
    axes({ x0, y0, x1, y1: y1, xlabel: 'share of the variance of the output' }),
    xticks(sx, y0, [[0], [0.2, '0.2'], [0.4, '0.4'], [0.6, '0.6']]),
  );
}
