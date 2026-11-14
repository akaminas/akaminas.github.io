/**
 * One result told three ways: a most likely value, a range, and a frequency for the case
 * that matters. The result is a made-up one: the share of today's stock left in twenty
 * years, as a Beta(7.4, 10.6) distribution (mode 0.40). The mode, the central 90 per cent
 * interval and the chance of being below 20 per cent are all computed from it here.
 */
import { svg, xticks, scale, P, L, T, n } from './lib.mjs';

const A = 7.4,
  B = 10.6;
function lgamma(z) {
  // Lanczos approximation
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z);
  z -= 1;
  let x = c[0];
  for (let i = 1; i < 9; i++) x += c[i] / (z + i);
  const t = z + 7.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}
const logNorm = lgamma(A + B) - lgamma(A) - lgamma(B);
const pdf = (x) => (x <= 0 || x >= 1 ? 0 : Math.exp(logNorm + (A - 1) * Math.log(x) + (B - 1) * Math.log(1 - x)));
// cumulative distribution by the midpoint rule on a fine grid, and its inverse by bisection
const cdf = (x) => {
  const N = 4000;
  let s = 0;
  for (let i = 0; i < N; i++) s += pdf(((i + 0.5) / N) * x);
  return (s * x) / N;
};
const quantile = (p) => {
  let lo = 0,
    hi = 1;
  for (let i = 0; i < 40; i++) {
    const m = (lo + hi) / 2;
    if (cdf(m) < p) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
};

export default function draw() {
  const mode = (A - 1) / (A + B - 2); // 0.40
  const lo = quantile(0.05),
    hi = quantile(0.95);
  const below20 = cdf(0.2);
  const oneIn = Math.round(1 / below20 / 5) * 5; // "about 1 in 40"

  const x0 = 40,
    x1 = 462,
    y0 = 206,
    y1 = 70;
  const sx = scale(0, 1, x0, x1 - 10);
  const sy = scale(0, pdf(mode), y0, y1);

  const xs = Array.from({ length: 101 }, (_, i) => i / 100);
  const curve = xs.map((x) => [sx(x), sy(pdf(x))]);
  const tail = xs.filter((x) => x <= 0.2).map((x) => [sx(x), sy(pdf(x))]);

  return svg(
    { h: 252, a: 'lilac', b: 'sand' },
    // the interval, as a bar over the curve
    L(sx(lo), 44, sx(hi), 44, 'la'),
    L(sx(lo), 38, sx(lo), 50, 'la'),
    L(sx(hi), 38, sx(hi), 50, 'la'),
    T((sx(lo) + sx(hi)) / 2, 30, `9 times in 10, between ${Math.round(lo * 100)} and ${Math.round(hi * 100)}`, 'ta', 'middle'),
    P([[sx(0), y0], ...curve, [sx(1), y0]], 'fa', true),
    P([[sx(0), y0], ...tail, [sx(0.2), y0]], 'fb', true),
    L(x0, y0, x1, y0, 'ax'),
    T(x1, y0 + 30, 'stock left in 20 years, % of today', 'tm', 'end'),
    xticks(sx, y0, [0, 0.2, 0.4, 0.6, 0.8, 1].map((v) => [v, String(Math.round(v * 100))])),
    L(sx(mode), y0, sx(mode), sy(pdf(mode)), 'ln'),
    T(sx(mode) + 10, sy(pdf(mode)) - 2, `most likely, ${Math.round(mode * 100)}`, 'tt halo'),
    T(sx(0.02), y0 - 88, 'below 20:', 'tb halo'),
    T(sx(0.02), y0 - 74, `about 1 in ${oneIn}`, 'tb halo'),
    L(sx(0.13), y0 - 66, sx(0.15), y0 - 10, 'ln'),
  );
}
