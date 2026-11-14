/**
 * Two kinds of randomness. A birth-death process in discrete time: each year every
 * individual survives with probability S = 0.7, and each individual also gives
 * birth to a Poisson number of young with mean B * e, where e is that year's
 * environment, one number shared by everyone, lognormal with mean 1 and a standard
 * deviation of the logarithm of SIGMA = 0.3. The mean growth rate is zero (S + B = 1).
 * The dots are the standard deviation of the per-capita growth rate N'/N - 1,
 * from many simulated years at each population size N. The dashed lines are the two
 * terms of its variance: demographic, (B + S (1 - S)) / N, and environmental,
 * B^2 Var(e). Computed, seeded; the draws are exact (no normal approximations).
 */
import { svg, axes, xticks, yticks, hgrid, scale, rng, gauss, L, C, T, P, n } from './lib.mjs';

const S = 0.7;
const B = 0.3;
const SIGMA = 0.3;
const REPS = 40000;
const LF = [0];
for (let i = 1; i < 40; i++) LF.push(LF[i - 1] + Math.log(i));
const SIZES = [5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];

export default function draw() {
  const r = rng(2027);

  // Exact draws in constant time: Hormann's transformed rejection for the Poisson (PTRS)
  // and the binomial (BTRS), with a plain method where the mean is small.
  const logFact = (k) => (k < 40 ? LF[k] : (k + 0.5) * Math.log(k) - k + 0.5 * Math.log(2 * Math.PI) + 1 / (12 * k) - 1 / (360 * k ** 3) + 1 / (1260 * k ** 5));
  const poisson = (lam) => {
    if (lam < 10) {
      const l = Math.exp(-lam);
      let k = 0,
        p = r();
      while (p > l) {
        k++;
        p *= r();
      }
      return k;
    }
    const slam = Math.sqrt(lam),
      loglam = Math.log(lam),
      b = 0.931 + 2.53 * slam,
      a = -0.059 + 0.02483 * b,
      invalpha = 1.1239 + 1.1328 / (b - 3.4),
      vr = 0.9277 - 3.6224 / (b - 2);
    for (;;) {
      const u = r() - 0.5,
        v = r(),
        us = 0.5 - Math.abs(u),
        k = Math.floor(((2 * a) / us + b) * u + lam + 0.43);
      if (us >= 0.07 && v <= vr) return k;
      if (k < 0 || (us < 0.013 && v > us)) continue;
      if (Math.log(v) + Math.log(invalpha) - Math.log(a / (us * us) + b) <= -lam + k * loglam - logFact(k)) return k;
    }
  };
  const binomial = (count, p) => {
    const q = Math.min(p, 1 - p);
    let k;
    if (count * q < 10) {
      const lg = Math.log(1 - q);
      let pos = 0;
      k = 0;
      for (;;) {
        pos += Math.floor(Math.log(1 - r()) / lg) + 1;
        if (pos > count) break;
        k++;
      }
    } else {
      const spq = Math.sqrt(count * q * (1 - q)),
        b = 1.15 + 2.53 * spq,
        a = -0.0873 + 0.0248 * b + 0.01 * q,
        c = count * q + 0.5,
        vr = 0.92 - 4.2 / b,
        alpha = (2.83 + 5.1 / b) * spq,
        lpq = Math.log(q / (1 - q)),
        m = Math.floor((count + 1) * q),
        h = logFact(m) + logFact(count - m);
      for (;;) {
        const u = r() - 0.5;
        let v = r();
        const us = 0.5 - Math.abs(u);
        k = Math.floor(((2 * a) / us + b) * u + c);
        if (k < 0 || k > count) continue;
        if (us >= 0.07 && v <= vr) break;
        v = Math.log((v * alpha) / (a / (us * us) + b));
        if (v <= h - logFact(k) - logFact(count - k) + (k - m) * lpq) break;
      }
    }
    return p <= 0.5 ? k : count - k;
  };

  const mu = -(SIGMA * SIGMA) / 2;
  const sims = SIZES.map((N) => {
    let sum = 0,
      sum2 = 0;
    for (let k = 0; k < REPS; k++) {
      const e = Math.exp(mu + SIGMA * gauss(r));
      const next = binomial(N, S) + poisson(N * B * e);
      const g = next / N - 1;
      sum += g;
      sum2 += g * g;
    }
    const m = sum / REPS;
    return Math.sqrt(sum2 / REPS - m * m);
  });

  const demCoef = B + S * (1 - S);
  const floor = Math.sqrt(B * B * (Math.exp(SIGMA * SIGMA) - 1));

  const x0 = 56,
    x1 = 446,
    y0 = 214,
    y1 = 34;
  const sx = scale(Math.log10(5), 5, x0, x1);
  const sy = scale(Math.log(0.04), Math.log(0.4), y0, y1);
  const X = (N) => sx(Math.log10(N));
  const Y = (v) => sy(Math.log(v));

  // the demographic term alone, drawn down to the bottom of the plot
  const nBottom = demCoef / 0.04 ** 2;
  const dem = [5, nBottom].map((N) => [X(N), Y(Math.sqrt(demCoef / N))]);

  const pts = SIZES.map((N, i) => [X(N), Y(sims[i])]);

  return svg(
    { h: 262, a: 'teal', b: 'sand' },
    hgrid(x0, x1, [Y(0.05), Y(0.1), Y(0.2)]),
    axes({ x0, y0, x1, y1, xlabel: 'population size', ylabel: 'standard deviation of growth rate' }),
    xticks(sx, y0, [[1], [2], [3], [4], [5]].map(([k]) => [k, k <= 3 ? String(10 ** k) : k === 4 ? '10,000' : '100,000'])),
    yticks(Y, x0, [[0.05, '0.05'], [0.1, '0.1'], [0.2, '0.2']]),
    L(x0, Y(floor), x1, Y(floor), 'ln dash'),
    P(dem, 'ln dash'),
    P(pts, 'la'),
    pts.map(([px, py]) => C(px, py, 3.2, 'fad')),
    T(x1, Y(floor) - 9, 'environmental', 'tm', 'end'),
    T(X(250), Y(0.056), 'demographic', 'tm'),
    T(X(300), Y(0.128), 'simulated', 'ta halo'),
  );
}
