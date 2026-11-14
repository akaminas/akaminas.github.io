/**
 * A null result is a result, if it is reported properly: one simulated study of
 * paired replicates with a true difference of zero (standard deviation 1), read
 * after ten pairs and again after twenty (the first ten plus ten more). The bars
 * are 90 per cent confidence intervals for the mean difference (t quantiles for
 * 9 and 19 degrees of freedom). The dashes are the equivalence margin, 0.5, the
 * post's own value. A test of difference passes both intervals; only the second
 * lies inside the margin. Seeded, so the figure is the same every time.
 */
import { svg, xticks, scale, rng, gauss, L, R, C, T } from './lib.mjs';

const T90 = { 9: 1.8331, 19: 1.7291 }; // t(0.95, df)

function interval(d) {
  const k = d.length;
  const m = d.reduce((s, x) => s + x, 0) / k;
  const sd = Math.sqrt(d.reduce((s, x) => s + (x - m) ** 2, 0) / (k - 1));
  const half = T90[k - 1] * (sd / Math.sqrt(k));
  return { m, lo: m - half, hi: m + half };
}

export default function draw() {
  const margin = 0.5;
  const rand = rng(3);
  const diffs = Array.from({ length: 20 }, () => gauss(rand));
  const small = interval(diffs.slice(0, 10));
  const large = interval(diffs);

  const verdict = (i) => (i.lo > -margin && i.hi < margin ? 'equivalent' : 'unresolved');
  if (verdict(small) !== 'unresolved' || verdict(large) !== 'equivalent') {
    throw new Error('the seed must give an unresolved interval with ten pairs and an equivalent one with twenty');
  }

  const x0 = 78,
    x1 = 456,
    y0 = 178,
    top = 50;
  const sx = scale(-1.2, 1.2, x0, x1);
  const rows = [
    { y: 94, i: small, c: 'lb', dot: 'fbd', t: 'tb', name: '10 pairs' },
    { y: 148, i: large, c: 'la', dot: 'fad', t: 'ta', name: '20 pairs' },
  ];

  return svg(
    { h: 216, a: 'lilac', b: 'sand' },
    // the equivalence margin: the band inside it, and its two edges
    R(sx(-margin), top, sx(margin) - sx(-margin), y0 - top, 'fas'),
    L(sx(-margin), top, sx(-margin), y0, 'ln dash'),
    L(sx(margin), top, sx(margin), y0, 'ln dash'),
    T(sx(-margin), top - 8, 'margin', 'tm', 'middle'),
    T(sx(margin), top - 8, 'margin', 'tm', 'middle'),
    L(sx(0), top, sx(0), y0, 'ln'),
    L(x0, y0, x1, y0, 'ax'),
    xticks(sx, y0, [[-1, '-1'], [-0.5, '-0.5'], [0], [0.5], [1]]),
    T(x1, y0 + 30, 'difference', 'tm', 'end'),
    rows.map(({ y, i, c, dot, t, name }) => [
      L(sx(i.lo), y, sx(i.hi), y, c),
      L(sx(i.lo), y - 6, sx(i.lo), y + 6, c),
      L(sx(i.hi), y - 6, sx(i.hi), y + 6, c),
      C(sx(i.m), y, 4.2, dot),
      T(sx(i.m), y - 14, verdict(i), `${t} halo`, 'middle'),
      T(x0 - 12, y + 4, name, 'tx', 'end'),
    ]),
  );
}
