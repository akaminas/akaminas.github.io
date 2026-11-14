/**
 * Three kinds of uncertainty in one projection. A population of 100 grows towards a
 * carrying capacity K under theta-logistic growth, dN/dt = r N (1 - (N / K)^theta), where
 * theta = 1 is the logistic. All three panels are projected 30 years ahead and share one
 * scale. They start from the same present state (N = 100 and a per-capita growth rate of
 * 0.2 per year at that size) and the same unit of time; the made-up numbers are in the
 * constants below.
 *
 *   parameters  500 draws of the present growth rate and of K (independent lognormals,
 *               sd 0.15 on the log scale), the logistic form, no noise
 *   model form  the logistic, theta = 1/3 and theta = 3, each with r set so that it gives
 *               the same present growth rate, at the central values of the parameters
 *   chance      1000 replicates of the logistic at the central parameter values, with a
 *               lognormal multiplicative shock each year (sd 0.1 on the log scale)
 *
 * `stats()` gives the numbers the post quotes.
 */
import { svg, scale, L, P, T, rng, gauss } from './lib.mjs';

const N0 = 100,
  K0 = 1000,
  G0 = 0.2,
  YEARS = 30,
  SD_PAR = 0.15,
  SD_ENV = 0.1;

/** Projection of N over `YEARS` years, one value per year (index 0 is the present). Euler with 20 steps a year. */
function project({ g0, K, theta, noise }) {
  const r = g0 / (1 - (N0 / K) ** theta);
  const out = [N0];
  let N = N0;
  for (let y = 1; y <= YEARS; y++) {
    for (let s = 0; s < 20; s++) N += (r * N * (1 - (N / K) ** theta)) / 20;
    if (noise) N *= Math.exp(SD_ENV * noise());
    out.push(N);
  }
  return out;
}

const quantile = (v, p) => {
  const s = [...v].sort((a, b) => a - b);
  return s[Math.round(p * (s.length - 1))];
};
/** For each year, the 5th and 95th percentiles of a set of projections. */
const band = (runs) => Array.from({ length: YEARS + 1 }, (_, y) => [quantile(runs.map((r) => r[y]), 0.05), quantile(runs.map((r) => r[y]), 0.95)]);

export function stats() {
  const rand = rng(3);
  const g = () => gauss(rand);
  const central = project({ g0: G0, K: K0, theta: 1 });
  const par = Array.from({ length: 500 }, () =>
    project({ g0: G0 * Math.exp(SD_PAR * g()), K: K0 * Math.exp(SD_PAR * g()), theta: 1 }),
  );
  const forms = [1 / 3, 1, 3].map((theta) => project({ g0: G0, K: K0, theta }));
  const chance = Array.from({ length: 1000 }, () => project({ g0: G0, K: K0, theta: 1, noise: g }));
  const formBand = Array.from({ length: YEARS + 1 }, (_, y) => [Math.min(...forms.map((f) => f[y])), Math.max(...forms.map((f) => f[y]))]);
  return { central, par, forms, chance, parBand: band(par), formBand, chanceBand: band(chance), samples: chance.slice(0, 4) };
}

export default function draw() {
  const s = stats();
  const x0 = 56,
    x1 = 462;
  const sx = scale(0, YEARS, x0, x1);
  const ymax = 1400;
  const ph = 66, // panel height
    gap = 24,
    top = 22;
  const parts = [];
  const panels = [
    { label: 'parameters', band: s.parBand, lines: [[s.central, 'la']] },
    { label: 'model form', band: s.formBand, lines: [[s.forms[0], 'sa'], [s.forms[2], 'sa'], [s.forms[1], 'la']] },
    { label: 'chance', band: s.chanceBand, lines: [...s.samples.map((r) => [r, 'sa']), [s.central, 'la']] },
  ];
  panels.forEach((p, i) => {
    const yb = top + i * (ph + gap) + ph; // baseline of this panel
    const sy = scale(0, ymax, yb, yb - ph);
    const years = Array.from({ length: YEARS + 1 }, (_, y) => y);
    const upper = years.map((y) => [sx(y), sy(p.band[y][1])]);
    const lower = years.map((y) => [sx(y), sy(p.band[y][0])]).reverse();
    parts.push(L(x0, sy(1000), x1, sy(1000), 'gr'));
    parts.push(P([...upper, ...lower], 'fas', true));
    for (const [r, cls] of p.lines) parts.push(P(years.map((y) => [sx(y), sy(r[y])]), cls));
    parts.push(L(x0, yb, x1, yb, 'ax'));
    parts.push(L(x0, yb, x0, yb - ph, 'ax'));
    parts.push(L(x0 - 4, sy(1000), x0, sy(1000), 'ax'));
    parts.push(T(x0 - 8, sy(1000) + 4, '1000', 'ts', 'end'));
    parts.push(T(x0 - 8, yb + 4, '0', 'ts', 'end'));
    parts.push(T(x0 + 8, yb - ph + 12, p.label, 'ta'));
  });
  const yb = top + 2 * (ph + gap) + ph;
  for (const t of [0, 10, 20, 30]) {
    parts.push(L(sx(t), yb, sx(t), yb + 4, 'ax'));
    parts.push(T(sx(t), yb + 17, String(t), 'ts', 'middle'));
  }
  parts.push(T(x1, yb + 30, 'years from now', 'tm', 'end'));
  parts.push(T(x0, 12, 'population', 'tm'));
  return svg({ h: yb + 40, a: 'teal', b: 'sand' }, parts);
}
