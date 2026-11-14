/**
 * Equilibria, and what noise does to them: the Ricker rule x' = x exp(r (1 - x)),
 * where it settles, where it cycles, where it looks random. The dots are the
 * values the rule visits after the first 600 steps, so a single dot is an
 * equilibrium and two dots a cycle of period two. Computed, not drawn by hand.
 */
import { svg, axes, xticks, yticks, hgrid, scale, L, T, n } from './lib.mjs';

export default function draw() {
  const x0 = 56,
    x1 = 462,
    y0 = 214,
    y1 = 34;
  const sx = scale(0.5, 3.0, x0, x1);
  const sy = scale(0, 2.6, y0, y1);

  // The attractor of the rule for each r, on a grid of about one unit so repeated values are drawn once.
  const seen = new Set();
  let dots = '';
  for (let i = 0; i <= 260; i++) {
    const r = 0.5 + (2.5 * i) / 260;
    let x = 0.5;
    for (let t = 0; t < 600; t++) x *= Math.exp(r * (1 - x));
    for (let t = 0; t < 120; t++) {
      x *= Math.exp(r * (1 - x));
      const px = sx(r),
        py = sy(x);
      const key = `${Math.round(px / 1.1)}/${Math.round(py / 1.1)}`;
      if (!seen.has(key)) {
        seen.add(key);
        dots += `M${n(px)} ${n(py)}h0`;
      }
    }
  }

  return svg(
    { h: 262, a: 'teal', b: 'coral' },
    hgrid(x0, x1, [sy(1), sy(2)]),
    axes({ x0, y0, x1, y1, xlabel: 'growth rate r', ylabel: 'density, in units of carrying capacity' }),
    xticks(sx, y0, [[1], [1.5], [2], [2.5], [3]]),
    yticks(sy, x0, [[0], [1], [2]]),
    // r = 2: the equilibrium gives way to a cycle
    L(sx(2), y0, sx(2), y1 + 6, 'ln dash'),
    T(sx(2) - 6, y1 + 12, 'r = 2', 'tm', 'end'),
    `<path class="la" style="stroke-width:1.5" d="${dots}"/>`,
    T(sx(1.05), sy(1) - 10, 'settles at 1', 'ta'),
    T(sx(2.18), sy(2.38), 'cycles', 'ta'),
    T(x1, y1 - 4, 'looks random', 'ta', 'end'),
  );
}
