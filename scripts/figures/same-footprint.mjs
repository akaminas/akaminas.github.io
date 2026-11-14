/**
 * When two causes leave the same footprint: the post's own example, a model that
 * returns only the product y = a x b. Each curve is a set of (a, b) pairs that
 * give one output. (2, 3) and (6, 1) lie on the same curve, so y alone cannot
 * tell them apart. Computed from y = a b, not drawn by hand.
 */
import { svg, axes, xticks, yticks, scale, P, C, T } from './lib.mjs';

export default function draw() {
  const x0 = 56,
    x1 = 420,
    y0 = 262,
    y1 = 36;
  const sx = scale(0, 7, x0, x1);
  const sy = scale(0, 6, y0, y1);

  // the pairs (a, b) with a b = y, for a up to 7 and b up to 6
  const contour = (y, steps = 70) => {
    const aMin = y / 6;
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const a = aMin + ((7 - aMin) * i) / steps;
      pts.push([sx(a), sy(y / a)]);
    }
    return pts;
  };
  const end = (y) => [sx(7), sy(y / 7)];

  const p1 = [2, 3],
    p2 = [6, 1];
  const ridge = p1[0] * p1[1]; // the output the post uses: 6
  if (p2[0] * p2[1] !== ridge) throw new Error('both pairs must give the same output');
  const [lx6, ly6] = end(ridge);
  const [lx3, ly3] = end(3);
  const [lx12, ly12] = end(12);

  return svg(
    { h: 304, a: 'lilac', b: 'sand' },
    axes({ x0, y0, x1, y1, xlabel: 'a', ylabel: 'b' }),
    xticks(sx, y0, [[0], [2], [4], [6]]),
    yticks(sy, x0, [[2], [4], [6]]),
    // other outputs, for comparison
    P(contour(3), 'sb'),
    P(contour(12), 'sb'),
    T(lx3 + 6, ly3 + 4, 'y = 3', 'tm'),
    T(lx12 + 6, ly12 + 4, 'y = 12', 'tm'),
    // the output both pairs give
    P(contour(ridge), 'la'),
    T(lx6 + 6, ly6 + 4, `y = ${ridge}`, 'ta'),
    C(sx(p1[0]), sy(p1[1]), 4.6, 'fad'),
    T(sx(p1[0]) + 10, sy(p1[1]) - 9, `(${p1[0]}, ${p1[1]})`, 'tx halo'),
    C(sx(p2[0]), sy(p2[1]), 4.6, 'fad'),
    T(sx(p2[0]) + 8, sy(p2[1]) - 10, `(${p2[0]}, ${p2[1]})`, 'tx halo'),
  );
}
