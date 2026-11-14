/**
 * Forking paths: the chance of at least one false positive when k independent
 * tests are each run at the 0.05 level and every null hypothesis is true,
 * 1 - 0.95^k, drawn as a curve with simulated points (4000 simulated studies
 * per point, each test a two-sided z test). The lower line is the same chance
 * when every test is run at 0.05 / k (Bonferroni), 1 - (1 - 0.05 / k)^k.
 */
import { svg, axes, xticks, yticks, hgrid, scale, L, C, T, P, n, rng, gauss } from './lib.mjs';

const ALPHA = 0.05;
const Z = 1.959964; // two-sided 0.05 critical value of the standard normal
export const KS = [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 40, 50];
const REPS = 4000;

export const chance = (k, a = ALPHA) => 1 - (1 - a) ** k;

export function simulate(seed = 5) {
  const rand = rng(seed);
  return KS.map((k) => {
    let hits = 0;
    for (let r = 0; r < REPS; r++) {
      let any = false;
      for (let i = 0; i < k; i++) if (Math.abs(gauss(rand)) > Z) any = true;
      if (any) hits++;
    }
    return [k, hits / REPS];
  });
}

export default function draw() {
  const x0 = 54,
    x1 = 456,
    y0 = 214,
    y1 = 40;
  const sx = scale(0, 50, x0, x1);
  const sy = scale(0, 1, y0, y1);
  const sim = simulate();
  const curve = [],
    bonf = [];
  for (let k = 1; k <= 50; k++) {
    curve.push([sx(k), sy(chance(k))]);
    bonf.push([sx(k), sy(chance(k, ALPHA / k))]);
  }
  const p20 = chance(20);
  return svg(
    { h: 262, a: 'lilac', b: 'sand' },
    hgrid(x0, x1, [sy(0.5)]),
    axes({ x0, y0, x1, y1, xlabel: 'number of tests', ylabel: 'chance of at least one false positive' }),
    xticks(sx, y0, [[0], [10], [20], [30], [40], [50]]),
    yticks(sy, x0, [[0], [0.5], [1]]),
    P(bonf, 'lb'),
    P(curve, 'la'),
    sim.map(([k, v]) => C(sx(k), sy(v), 3, 'fn')),
    // 20 tests
    L(sx(20), y0, sx(20), sy(p20), 'ln dash'),
    L(x0, sy(p20), sx(20), sy(p20), 'ln dash'),
    C(sx(20), sy(p20), 4.5, 'fad'),
    T(sx(20) + 10, sy(p20) + 20, `20 tests: ${p20.toFixed(2)}`, 'ta halo'),
    T(x1, sy(0.72), 'each test at 0.05', 'ta', 'end'),
    T(x1, sy(0.05) - 10, 'Bonferroni', 'tb', 'end'),
  );
}
