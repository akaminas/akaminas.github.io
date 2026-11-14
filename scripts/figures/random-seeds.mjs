/**
 * Random seeds: the spread of an estimated difference between two parameter
 * settings of one stochastic model, over 200 repeated experiments, when the two
 * settings use independent random numbers and when they use common random
 * numbers (the same stream of shocks).
 *
 * The model is a noisy Ricker rule, x' = x exp(r (1 - x) - h + s e), with e a
 * standard normal draw each generation, r = 2.5 and s = 0.3. A run starts at
 * x = 1, discards 50 generations and averages the density over the next 100. The
 * two settings are h = 0 and h = 0.05, and an experiment's estimate is the mean
 * density at h = 0 minus the mean density at h = 0.05. The long-run difference
 * is the average of 20000 experiments with common random numbers.
 */
import { svg, xticks, scale, L, T, n, rng, gauss } from './lib.mjs';

const R = 2.5,
  S = 0.3,
  BURN = 50,
  STEPS = 100;

export function run(h, rand) {
  let x = 1,
    sum = 0;
  for (let t = 0; t < BURN + STEPS; t++) {
    x *= Math.exp(R * (1 - x) - h + S * gauss(rand));
    if (t >= BURN) sum += x;
  }
  return sum / STEPS;
}

const diff = (seedA, seedB, h) => run(0, rng(seedA)) - run(h, rng(seedB));
export const H = 0.05;

export function compute(reps = 200) {
  const independent = [],
    common = [];
  for (let i = 1; i <= reps; i++) {
    independent.push(diff(i, 1000 + i, H));
    common.push(diff(2000 + i, 2000 + i, H));
  }
  let big = 0;
  const B = 20000;
  for (let i = 1; i <= B; i++) big += diff(100000 + i, 100000 + i, H);
  return { independent, common, longRun: big / B };
}

export const mean = (a) => a.reduce((p, q) => p + q, 0) / a.length;
export const sd = (a) => {
  const m = mean(a);
  return Math.sqrt(a.reduce((p, q) => p + (q - m) ** 2, 0) / (a.length - 1));
};

export default function draw() {
  const { independent, common, longRun } = compute();
  const x0 = 30,
    x1 = 450,
    y0 = 214;
  const sx = scale(-0.06, 0.1, x0, x1);
  const rand = rng(99);
  const rows = [
    { vals: independent, cy: 96, label: 'independent random numbers', dot: 'sb', tc: 'tb' },
    { vals: common, cy: 170, label: 'common random numbers', dot: 'sa', tc: 'ta' },
  ];
  const parts = [
    L(x0, y0, x1, y0, 'ax'),
    xticks(sx, y0, [
      [-0.05, '-0.05'],
      [0, '0'],
      [0.05, '0.05'],
      [0.1, '0.10'],
    ]),
    T(x1, y0 + 30, 'estimated difference', 'tm', 'end'),
    // zero and the long-run value
    L(sx(0), 40, sx(0), y0, 'sb dash'),
    L(sx(longRun), 40, sx(longRun), y0, 'sa dash'),
    T(sx(0) - 5, 34, 'no difference', 'tb', 'end'),
    T(sx(longRun) + 5, 34, 'long-run difference', 'ta'),
  ];
  for (const r of rows) {
    let dots = '';
    for (const v of r.vals) dots += `M${n(sx(v))} ${n(r.cy + (rand() - 0.5) * 30)}h0`;
    parts.push(
      L(x0, r.cy + 24, x1, r.cy + 24, 'gr'),
      `<path class="${r.dot}" style="stroke-width:4.4" d="${dots}"/>`,
      T(x0, r.cy - 22, r.label, `${r.tc} halo`),
      T(x1, r.cy - 22, `sd ${sd(r.vals).toFixed(3)}`, 'tm', 'end'),
    );
  }
  return svg({ h: 252, a: 'lilac', b: 'sand' }, parts);
}
