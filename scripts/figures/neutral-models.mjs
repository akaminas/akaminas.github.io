/**
 * A neutral model as a baseline. A zero-sum community of J = 1000 individuals,
 * every one ecologically equivalent. At each step one individual, chosen at
 * random, dies. With probability m it is replaced by an immigrant drawn from a
 * metacommunity; otherwise by the offspring of another individual in the
 * community, chosen at random. The metacommunity has 380 species whose
 * abundances follow Fisher's log-series (Fisher's alpha = 50, about 10^5
 * individuals). Each curve is the rank-abundance curve of one community after
 * 5000 generations (a generation is J deaths), for three values of m. Computed,
 * seeded.
 */
import { svg, axes, xticks, yticks, hgrid, scale, rng, P, T } from './lib.mjs';

const J = 1000;
const ALPHA = 50;
const JM = 100000;
const GENERATIONS = 5000;
const RATES = [0.003, 0.03, 0.5];

/** Species abundances of the metacommunity: the log-series, rounded so that the counts add up. */
function metacommunity() {
  const x = JM / (JM + ALPHA);
  const phi = [];
  for (let k = 1; k <= JM; k++) {
    const v = (ALPHA * x ** k) / k;
    if (v < 1e-9 && k > 1000) break;
    phi.push(v);
  }
  const cum = new Array(phi.length + 2).fill(0);
  let c = 0;
  for (let k = phi.length; k >= 1; k--) {
    c += phi[k - 1];
    cum[k] = c;
  }
  const abund = [];
  for (let k = phi.length; k >= 1; k--) {
    const count = Math.round(cum[k]) - Math.round(cum[k + 1]);
    for (let i = 0; i < count; i++) abund.push(k);
  }
  return abund;
}

/** One community, run for a number of generations; returns the abundances, largest first. */
function simulate(meta, m, seed) {
  const r = rng(seed);
  const total = meta.reduce((a, b) => a + b, 0);
  const cdf = [];
  let c = 0;
  for (const a of meta) {
    c += a / total;
    cdf.push(c);
  }
  const immigrant = () => {
    const u = r();
    let lo = 0,
      hi = cdf.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cdf[mid] < u) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };
  const comm = new Int32Array(J);
  for (let i = 0; i < J; i++) comm[i] = immigrant();
  for (let g = 0; g < GENERATIONS; g++) {
    for (let s = 0; s < J; s++) {
      const i = Math.floor(r() * J);
      if (r() < m) comm[i] = immigrant();
      else {
        let j = Math.floor(r() * (J - 1));
        if (j >= i) j++;
        comm[i] = comm[j];
      }
    }
  }
  const count = new Map();
  for (const sp of comm) count.set(sp, (count.get(sp) || 0) + 1);
  return [...count.values()].sort((a, b) => b - a);
}

export default function draw() {
  const meta = metacommunity();
  const runs = RATES.map((m, i) => simulate(meta, m, 11 + i));

  const x0 = 56,
    x1 = 446,
    y0 = 214,
    y1 = 34;
  const sx = scale(0, 140, x0, x1);
  const sy = scale(0, Math.log(1000), y0, y1);
  const Y = (v) => sy(Math.log(v));
  const curve = (ab) => ab.map((v, k) => [sx(k + 1), Y(v)]);

  return svg(
    { h: 262, a: 'teal', b: 'sand' },
    hgrid(x0, x1, [Y(10), Y(100), Y(1000)]),
    axes({ x0, y0, x1, y1, xlabel: 'rank of the species', ylabel: 'individuals of the species' }),
    xticks(sx, y0, [[1], [50], [100]]),
    yticks(Y, x0, [[1], [10], [100], [1000, '1000']]),
    P(curve(runs[2]), 'sa'),
    P(curve(runs[0]), 'sa'),
    P(curve(runs[1]), 'la'),
    T(sx(5), Y(300), 'm = 0.003', 'ta halo'),
    T(sx(30), Y(14), 'm = 0.03', 'ta halo'),
    T(sx(64), Y(5), 'm = 0.5', 'ta halo'),
  );
}
