/**
 * Why sustainability needs numbers: relative and absolute decoupling in one picture.
 * Impact = output x impact per unit of output. With output growing at g and impact
 * per unit falling at d, total impact changes by (1 + g)(1 - d) each year, so it
 * rises whenever g is larger than d / (1 - d). Made-up rates: output +3 per cent a
 * year, impact per unit -2 per cent a year, both indexed to 100 at the start.
 * Computed, not drawn by hand.
 */
import { svg, axes, xticks, yticks, hgrid, scale, P, T } from './lib.mjs';

const G = 0.03; // output growth per year
const D = 0.02; // fall in impact per unit of output per year
const YEARS = 40;

export default function draw() {
  const x0 = 50,
    x1 = 340,
    y0 = 214,
    y1 = 36;
  const sx = scale(0, YEARS, x0, x1);
  const sy = scale(0, 350, y0, y1);

  const yrs = Array.from({ length: YEARS + 1 }, (_, i) => i);
  const output = yrs.map((t) => 100 * (1 + G) ** t);
  const perUnit = yrs.map((t) => 100 * (1 - D) ** t);
  const total = yrs.map((t, i) => (output[i] * perUnit[i]) / 100);
  const line = (v) => v.map((y, i) => [sx(i), sy(y)]);
  const last = (v) => sy(v[YEARS]);

  return svg(
    { h: 262, a: 'teal', b: 'coral' },
    hgrid(x0, x1, [sy(100)]),
    axes({ x0, y0, x1, y1, xlabel: 'years', ylabel: 'index, 100 at the start' }),
    xticks(sx, y0, [[0], [10], [20], [30], [40]]),
    yticks(sy, x0, [[0], [100], [200], [300]]),
    P(line(output), 'sb'),
    P(line(perUnit), 'sa'),
    P(line(total), 'la'),
    T(x1 + 10, last(output) + 4, 'output', 'tb'),
    T(x1 + 10, last(total) + 4, 'total impact', 'ta'),
    T(x1 + 10, last(perUnit) - 2, 'impact per unit', 'ta'),
    T(x1 + 10, last(perUnit) + 13, 'of output', 'ta'),
  );
}
