/**
 * When the average is not typical: the running sample mean against sample size for
 * a Pareto sample with a small tail index (alpha = 1.2, so the mean is finite and
 * equal to alpha/(alpha - 1) = 6 but the variance is infinite) beside an
 * exponential sample with the same mean. Six independent samples of each, seeded.
 */
import { svg, axes, xticks, yticks, hgrid, scale, rng, L, T, n } from './lib.mjs';

const ALPHA = 1.2;
const MEAN = ALPHA / (ALPHA - 1);
const NMAX = 100000;
const PER_DECADE = 40;

/** The running mean of one sample, recorded on a log grid of sample sizes. */
function runningMean(draw, rand) {
  const grid = [];
  for (let k = 0; k <= 3 * PER_DECADE; k++) grid.push(Math.round(10 ** (2 + k / PER_DECADE)));
  const out = [];
  let s = 0,
    g = 0;
  for (let i = 1; i <= NMAX && g < grid.length; i++) {
    s += draw(rand);
    while (g < grid.length && grid[g] === i) {
      out.push([i, s / i]);
      g++;
    }
  }
  return out;
}

export default function draw() {
  const x0 = 56,
    x1 = 446,
    y0 = 214,
    y1 = 34;
  const sx = scale(2, 5, x0, x1);
  const ymax = 12;
  const sy = scale(0, ymax, y0, y1);
  const clip = (v) => Math.min(v, ymax);

  const path = (pts, cls, w) =>
    `<path class="${cls}" style="stroke-width:${w}" d="${pts
      .map(([i, m], k) => `${k ? 'L' : 'M'}${n(sx(Math.log10(i)))} ${n(sy(clip(m)))}`)
      .join('')}"/>`;

  const pareto = [];
  const expo = [];
  for (let seed = 1; seed <= 6; seed++) {
    pareto.push(runningMean((r) => (1 - r()) ** (-1 / ALPHA), rng(seed)));
  }
  for (let seed = 101; seed <= 106; seed++) {
    expo.push(runningMean((r) => -MEAN * Math.log(1 - r()), rng(seed)));
  }

  return svg(
    { h: 262, a: 'lilac', b: 'sand' },
    hgrid(x0, x1, [sy(3), sy(6), sy(9)]),
    axes({ x0, y0, x1, y1, xlabel: 'number of draws', ylabel: 'average of the draws so far' }),
    xticks(sx, y0, [
      [2, '100'],
      [3, '1000'],
      [4, '10,000'],
      [5, '100,000'],
    ]),
    yticks(sy, x0, [[0], [3], [6], [9]]),
    expo.map((p) => path(p, 'lb', 1.8)),
    pareto.map((p) => path(p, 'la', 1.4)),
    L(x0, sy(MEAN), x1, sy(MEAN), 'ln dash'),
    T(sx(2.05), sy(11.3), 'Pareto, alpha = 1.2', 'ta'),
    T(sx(2.05), sy(10.2), 'exponential', 'tb'),
  );
}
