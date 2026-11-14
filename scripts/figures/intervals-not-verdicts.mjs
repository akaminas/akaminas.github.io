/**
 * Intervals, not verdicts: a forest plot of eight replicate studies of one true
 * effect. Each study draws 40 values per group from normal distributions with
 * standard deviation 1 whose means differ by TRUE (0.4), and reports the
 * difference in means with its 95 per cent interval (estimate +- 1.96 standard
 * errors, the standard error from the pooled sample variance) and the two-sided
 * p-value from the normal approximation. Seeded; the seed was fixed before the
 * run and not chosen from several.
 */
import { svg, xticks, scale, L, R, T, n, rng, gauss } from './lib.mjs';

export const TRUE = 0.4;
export const N = 40;
export const SEED = 1;

/** Standard normal CDF (Abramowitz and Stegun 7.1.26, error below 1.5e-7). */
export function Phi(z) {
  const t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-(z * z) / 2);
  return z >= 0 ? 0.5 * (1 + y) : 0.5 * (1 - y);
}
export const pTwoSided = (z) => 2 * (1 - Phi(Math.abs(z)));

export function study(rand, nPer = N, effect = TRUE) {
  const a = [],
    b = [];
  for (let i = 0; i < nPer; i++) {
    a.push(effect + gauss(rand));
    b.push(gauss(rand));
  }
  const mean = (v) => v.reduce((p, q) => p + q, 0) / v.length;
  const ss = (v) => {
    const m = mean(v);
    return v.reduce((p, q) => p + (q - m) ** 2, 0);
  };
  const est = mean(a) - mean(b);
  const s2 = (ss(a) + ss(b)) / (2 * nPer - 2);
  const se = Math.sqrt((2 * s2) / nPer);
  return { est, se, lo: est - 1.96 * se, hi: est + 1.96 * se, p: pTwoSided(est / se) };
}

export function compute() {
  const rand = rng(SEED);
  return Array.from({ length: 8 }, () => study(rand));
}

export default function draw() {
  const studies = compute();
  const x0 = 40,
    x1 = 396,
    top = 52,
    gap = 25;
  const sx = scale(-0.4, 1.2, x0, x1);
  const y0 = top + gap * 8 - 6;
  const parts = [
    L(x0, y0, x1, y0, 'ax'),
    xticks(sx, y0, [[-0.4, '-0.4'], [0, '0'], [0.4, '0.4'], [0.8, '0.8'], [1.2, '1.2']]),
    T(x1, y0 + 30, 'difference in means', 'tm', 'end'),
    L(sx(0), top - 14, sx(0), y0, 'sb dash'),
    L(sx(TRUE), top - 14, sx(TRUE), y0, 'sa dash'),
    T(sx(0) - 5, top - 20, 'zero', 'tb', 'end'),
    T(sx(TRUE) + 5, top - 20, 'true effect', 'ta'),
  ];
  studies.forEach((s, i) => {
    const y = top + gap * i + 8;
    parts.push(
      T(18, y + 4, String(i + 1), 'ts', 'middle'),
      L(sx(s.lo), y, sx(s.hi), y, 'la'),
      R(sx(s.est) - 3.5, y - 3.5, 7, 7, 'fad'),
      T(474, y + 4, `p = ${s.p < 0.001 ? s.p.toFixed(4) : s.p.toFixed(3)}`, 'ts', 'end'),
    );
  });
  return svg({ h: 296, a: 'lilac', b: 'sand' }, parts);
}
