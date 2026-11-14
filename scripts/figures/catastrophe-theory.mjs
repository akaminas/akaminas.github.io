/**
 * A slice of the cusp: the equilibria of x^3 + a x + b = 0 at a = -1 as the control b
 * changes, so x^3 - x + b = 0, or b = x - x^3. Each point (b, x) of the curve is an
 * equilibrium; it is stable where the slope of the dynamics is negative, 3x^2 + a > 0,
 * that is |x| > 1/sqrt(3), and unstable between. The fold points are where 3x^2 - 1 = 0,
 * at x = +-1/sqrt(3), b = -+2/(3 sqrt(3)) (the edge of the wedge, 4a^3 + 27b^2 = 0).
 * An arrow from each fold point to the other stable branch is the jump a system resting
 * on the branch that vanishes there has to make; the two jumps are at different b.
 */
import { svg, axes, xticks, scale, P, C, T, n, arrowLine } from './lib.mjs';

/** A see-through band without an outline. */
const band = (x, y, w, h) =>
  `<rect class="fas" style="stroke:none" x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"/>`;

const a = -1;
const bOf = (x) => -(x ** 3 + a * x); // x^3 + a x + b = 0
const xFold = Math.sqrt(-a / 3); // 0.577
const bFold = Math.abs(bOf(xFold)); // 0.385
const stableLow = (b) => {
  // the stable root with x < -xFold at this b (b between -bFold and bFold, or beyond)
  let lo = -3,
    hi = -xFold;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    // on x < -xFold, bOf is decreasing in x (b grows as x falls)
    if (bOf(mid) > b) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
};

export default function draw() {
  const bMax = 0.85;
  const x0 = 56,
    x1 = 462,
    y0 = 236,
    y1 = 40;
  const sx = scale(-bMax, bMax, x0, x1);
  const sy = scale(-1.45, 1.45, y0, y1);

  // x on the upper stable branch runs from xFold out to where b reaches -bMax; the lower one is its mirror image.
  const xEnd = -stableLow(bMax);
  const grid = (u0, u1, k) => Array.from({ length: k + 1 }, (_, i) => u0 + ((u1 - u0) * i) / k);
  const upper = grid(xFold, xEnd, 60).map((x) => [sx(bOf(x)), sy(x)]);
  const lower = grid(-xFold, -xEnd, 60).map((x) => [sx(bOf(x)), sy(x)]);
  const middle = grid(-xFold, xFold, 30).map((x) => [sx(bOf(x)), sy(x)]);

  const landLow = stableLow(bFold); // where the jump at +bFold lands
  const landHigh = -stableLow(bFold); // where the jump at -bFold lands

  return svg(
    { h: 280, a: 'teal', b: 'coral' },
    // the range of b with two stable states
    band(sx(-bFold), y1, sx(bFold) - sx(-bFold), y0 - y1),
    axes({ x0, y0, x1, y1, xlabel: 'control b', ylabel: 'state x' }),
    xticks(sx, y0, [[-bFold, (-bFold).toFixed(3)], [0, '0'], [bFold, bFold.toFixed(3)]]),
    P(middle, 'ln dash'),
    P(upper, 'la'),
    P(lower, 'la'),
    // the jumps, one on the way up in b and one on the way back
    arrowLine(sx(bFold), sy(xFold), sx(bFold), sy(landLow) - 3, 'lb'),
    arrowLine(sx(-bFold), sy(-xFold), sx(-bFold), sy(landHigh) + 3, 'lb'),
    C(sx(bFold), sy(xFold), 3.6, 'fp'),
    C(sx(-bFold), sy(-xFold), 3.6, 'fp'),
    T((sx(-bFold) + sx(bFold)) / 2, sy(1.36), 'two stable states', 'tm', 'middle'),
    T(sx(bFold) + 10, sy(0.3), 'jumps down', 'tb halo'),
    T(sx(bFold) + 10, sy(0.3) + 14, 'as b rises', 'tb halo'),
    T(sx(-bFold) - 10, sy(-0.3), 'jumps up', 'tb halo', 'end'),
    T(sx(-bFold) - 10, sy(-0.3) + 14, 'as b falls', 'tb halo', 'end'),
    T(sx(-0.66), sy(0.9), 'stable', 'ta halo', 'middle'),
    T(sx(0.66), sy(-0.9), 'stable', 'ta halo', 'middle'),
    T(sx(0.07), sy(-0.12), 'unstable', 'tm halo'),
  );
}
