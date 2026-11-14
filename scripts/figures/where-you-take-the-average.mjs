/**
 * Where you take the average: three units with variances 1, 4 and 100, and the
 * spread of the square root. The square root is concave, so the mean of the
 * square roots (B) sits below the square root of the mean (A). The median
 * variance (C) answers a different question. All three values are computed from
 * the post's own numbers, and the labels print what the script computes.
 */
import { svg, axes, xticks, yticks, hgrid, scale, L, P, C, T } from './lib.mjs';

export default function draw() {
  const v = [1, 4, 100];
  const mean = v.reduce((s, x) => s + x, 0) / v.length;
  const sorted = [...v].sort((p, q) => p - q);
  const median = sorted[1];
  const A = Math.sqrt(mean);
  const B = v.map(Math.sqrt).reduce((s, x) => s + x, 0) / v.length;
  const Cc = Math.sqrt(median);

  const x0 = 56,
    x1 = 440,
    y0 = 222,
    y1 = 40;
  const sx = scale(0, 100, x0, x1);
  const sy = scale(0, 10.5, y0, y1);

  const curve = [];
  for (let x = 0; x <= 100; x += 2) curve.push([sx(x), sy(Math.sqrt(x))]);

  return svg(
    { h: 262, a: 'lilac', b: 'sand' },
    hgrid(x0, x1, [sy(5), sy(10)]),
    axes({ x0, y0, x1, y1, xlabel: 'variance', ylabel: 'spread (square root of the variance)' }),
    xticks(sx, y0, [[0], [25], [50], [75], [100]]),
    yticks(sy, x0, [[0], [5], [10]]),
    // the curve, the mean of the variances, and the gap between the two averages
    P(curve, 'ln'),
    L(sx(mean), y0, sx(mean), sy(B), 'ln dash'),
    L(sx(mean), sy(B), sx(mean), sy(A), 'la'),
    T(sx(mean) + 7, y0 - 8, 'mean variance', 'tm'),
    // the three units
    v.map((x) => C(sx(x), sy(Math.sqrt(x)), 3.2, 'fn')),
    // the three answers
    C(sx(mean), sy(A), 4.6, 'fad'),
    T(sx(mean) - 9, sy(A) - 8, `A  ${A.toFixed(2)}`, 'ta halo', 'end'),
    C(sx(mean), sy(B), 4.6, 'fbd'),
    T(sx(mean) + 11, sy(B) + 4, `B  ${B.toFixed(2)}`, 'tb halo'),
    C(sx(median), sy(Cc), 4.6, 'fn'),
    T(sx(median) + 11, sy(Cc) + 4, `C  ${Cc.toFixed(2)}`, 'tx halo'),
  );
}
