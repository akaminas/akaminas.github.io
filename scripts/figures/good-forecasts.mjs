/**
 * A reliability diagram for two made-up forecasters over 5000 seeded events.
 *
 * Each event has a true probability p (drawn from a Beta(0.9, 0.9), so many events are
 * fairly clear-cut) and the outcome is a draw with that probability. The calibrated
 * forecaster says p. The overconfident forecaster says sigmoid(2 logit(p)), the same
 * ordering with the probabilities pushed towards 0 and 1. Forecasts are grouped in ten
 * bins of width 0.1; each dot is the mean forecast in a bin against how often the event
 * happened. Brier score: the mean of (forecast - outcome)^2, lower is better.
 *
 * `results()` is exported so the post can quote the scores, which are computed here.
 */
import { svg, axes, xticks, yticks, hgrid, scale, rng, gauss, L, P, C, R, T } from './lib.mjs';

const N = 5000;
const SEED = 5;
const A = 0.9;

const logit = (p) => Math.log(p / (1 - p));
const sigmoid = (z) => 1 / (1 + Math.exp(-z));

export function results() {
  const r = rng(SEED);
  const gamma = (k) => {
    if (k < 1) return gamma(k + 1) * Math.pow(r(), 1 / k);
    const d = k - 1 / 3,
      c = 1 / Math.sqrt(9 * d);
    for (;;) {
      let x, v;
      do {
        x = gauss(r);
        v = 1 + c * x;
      } while (v <= 0);
      v = v * v * v;
      const u = r();
      if (u < 1 - 0.0331 * x ** 4 || Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
    }
  };
  const p = [],
    y = [];
  for (let i = 0; i < N; i++) {
    const g1 = gamma(A),
      g2 = gamma(A);
    const q = Math.min(0.999, Math.max(0.001, g1 / (g1 + g2)));
    p.push(q);
    y.push(r() < q ? 1 : 0);
  }
  const base = y.reduce((a, b) => a + b, 0) / N;
  const forecasters = [
    { name: 'calibrated', f: p },
    { name: 'overconfident', f: p.map((q) => sigmoid(2 * logit(q))) },
  ].map(({ name, f }) => {
    const bins = Array.from({ length: 10 }, () => ({ n: 0, sf: 0, sy: 0 }));
    f.forEach((v, i) => {
      const b = Math.min(9, Math.floor(v * 10));
      bins[b].n++;
      bins[b].sf += v;
      bins[b].sy += y[i];
    });
    return {
      name,
      brier: f.reduce((t, v, i) => t + (v - y[i]) ** 2, 0) / N,
      bins: bins.map((b) => ({ n: b.n, forecast: b.n ? b.sf / b.n : null, observed: b.n ? b.sy / b.n : null })),
    };
  });
  return { base, climatology: base * (1 - base), forecasters };
}

export default function draw() {
  const { forecasters } = results();
  const x0 = 56,
    x1 = 446,
    y0 = 186,
    y1 = 34;
  const sx = scale(0, 1, x0, x1);
  const sy = scale(0, 1, y0, y1);
  const ticks = [[0], [0.25], [0.5], [0.75], [1]];
  const tones = ['a', 'b'];

  const curves = forecasters.map((fc, k) => {
    const pts = fc.bins.filter((b) => b.n >= 30).map((b) => [sx(b.forecast), sy(b.observed)]);
    return [P(pts, 'l' + tones[k]), pts.map(([x, y]) => C(x, y, 3.4, 'f' + tones[k] + 'd'))];
  });

  // how often each forecast was used, on the same horizontal scale
  const base = 280,
    top = 246,
    maxN = Math.max(...forecasters.flatMap((f) => f.bins.map((b) => b.n)));
  const sh = scale(0, maxN, 0, base - top);
  const bw = (x1 - x0) / 10;
  const bars = forecasters.map((fc, k) =>
    fc.bins.map((b, i) => (b.n ? R(x0 + i * bw + 3 + k * (bw / 2 - 3), base - sh(b.n), bw / 2 - 3, sh(b.n), 'f' + tones[k]) : '')),
  );

  return svg(
    { h: 300, a: 'lilac', b: 'sand' },
    hgrid(x0, x1, [sy(0.5), sy(1)]),
    axes({ x0, y0, x1, y1, xlabel: 'forecast probability', ylabel: 'how often it happened' }),
    xticks(sx, y0, ticks),
    yticks(sy, x0, ticks),
    L(x0, y0, x1, y1, 'ln dash'),
    curves,
    T(sx(0.9), sy(0.98), 'calibrated', 'ta halo', 'end'),
    T(sx(0.98), sy(0.43), 'overconfident', 'tb halo', 'end'),
    T(x0, top - 10, 'forecasts issued', 'tm'),
    L(x0, base, x1, base, 'ax'),
    bars,
  );
}
