/**
 * The average outbreak never happens. A stochastic SIR epidemic in a population of
 * N = 1000 with R0 = 2 (infection rate 2 S I / N, recovery rate 1 per infectious
 * person) and one initial case. For each of 10,000 seeded runs, the number of people
 * infected by the end, counting the first case. The histogram is the share of runs per
 * bin of 20. The solid line is the deterministic final size, from z = 1 - exp(-R0 z);
 * the dashed line is the average over all runs. Computed, not drawn by hand.
 */
import { svg, axes, xticks, yticks, hgrid, scale, rng, L, R, T, P, n } from './lib.mjs';

const N = 1000;
const R0 = 2;
const RUNS = 10000;
const BIN = 20;

export default function draw() {
  const r = rng(2027);
  const sizes = [];
  for (let k = 0; k < RUNS; k++) {
    let S = N - 1,
      I = 1,
      ever = 1;
    while (I > 0) {
      const infect = (R0 * S) / N; // relative rate of an infection; recoveries have relative rate 1
      if (r() < infect / (infect + 1)) {
        S--;
        I++;
        ever++;
      } else I--;
    }
    sizes.push(ever);
  }
  const mean = sizes.reduce((a, b) => a + b, 0) / RUNS;

  // the deterministic final size: the fraction z solves z = 1 - exp(-R0 z)
  let z = 0.5;
  for (let i = 0; i < 200; i++) z = 1 - Math.exp(-R0 * z);
  const det = z * N;

  const bins = new Array(N / BIN + 1).fill(0);
  for (const s of sizes) bins[Math.min(Math.floor(s / BIN), N / BIN)]++;
  const share = bins.map((b) => b / RUNS);

  const x0 = 56,
    x1 = 446,
    y0 = 214,
    y1 = 34;
  const ymax = 0.18;
  const sx = scale(0, N, x0, x1);
  const sy = scale(0, ymax, y0, y1);
  const top = sy(0.16); // the first bar is cut here

  const bars = share.map((v, i) => {
    if (v < 0.0005) return '';
    const h = Math.min(v, 0.16);
    return R(sx(i * BIN), sy(h), sx(BIN) - sx(0), y0 - sy(h), 'fa');
  });
  // a break across the first bar
  const bx = sx(0),
    bw = sx(BIN) - sx(0);
  const cut = [
    R(bx - 1, top + 9, bw + 2, 5, 'fp'),
    P(
      [
        [bx - 1, top + 15],
        [bx + bw + 1, top + 9],
      ],
      'ln',
    ),
    P(
      [
        [bx - 1, top + 9],
        [bx + bw + 1, top + 3],
      ],
      'ln',
    ),
  ];

  return svg(
    { h: 262, a: 'coral', b: 'sand' },
    hgrid(x0, x1, [sy(0.05), sy(0.1), sy(0.15)]),
    bars,
    axes({ x0, y0, x1, y1, xlabel: 'people infected by the end', ylabel: 'share of runs' }),
    xticks(sx, y0, [[0], [250], [500], [750], [1000]]),
    yticks(sy, x0, [[0], [0.05, '5%'], [0.1, '10%'], [0.15, '15%']]),
    cut,
    L(sx(mean), y0, sx(mean), y1 + 6, 'ln dash'),
    L(sx(det), y0, sx(det), y1 + 6, 'lb'),
    T(sx(det) - 7, y1 + 12, `deterministic model: ${Math.round(det)}`, 'tb halo', 'end'),
    T(sx(mean) + 7, sy(0.085), `average run: ${Math.round(mean)}`, 'tm halo'),
    T(sx(BIN) + 8, sy(0.15) - 6, `${Math.round(share[0] * 100)}% of runs`, 'ta halo'),
  );
}
