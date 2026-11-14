/**
 * Timescales decide what a model can show: the post's fast-slow model, computed.
 * The trait variance V is restored by mating, so each generation it moves half
 * of the way to its fixed point, 0.006: V' = V + (0.006 - V) / 2, from V = 0. The
 * trait mean moves by the selection gradient (0.1) times the variance each
 * generation: z' = z + 0.1 V. Both are drawn on one time axis (log scale), with
 * two moments at which a run could be read.
 */
import { svg, xticks, yticks, scale, L, P, C, T } from './lib.mjs';

export default function draw() {
  const Vstar = 0.006,
    grad = 0.1,
    tmax = 1200;
  const V = [0],
    Z = [0];
  for (let t = 1; t <= tmax; t++) {
    V.push(V[t - 1] + (Vstar - V[t - 1]) / 2);
    Z.push(Z[t - 1] + grad * V[t]);
  }

  const x0 = 56,
    x1 = 450;
  const sx = scale(Math.log10(1), Math.log10(tmax), x0, x1);
  const gx = (t) => sx(Math.log10(t));
  // the generations to plot: every one up to 12, then spaced evenly on the log axis
  const ts = new Set();
  for (let t = 1; t <= 12; t++) ts.add(t);
  for (let i = 0; i <= 90; i++) ts.add(Math.round(10 ** (Math.log10(12) + ((Math.log10(tmax) - Math.log10(12)) * i) / 90)));
  const gens = [...ts].sort((a, b) => a - b);

  // top panel: variance; bottom panel: mean
  const t1 = { y0: 112, y1: 62 };
  const t2 = { y0: 258, y1: 166 };
  const sv = scale(0, 0.0072, t1.y0, t1.y1);
  const sz = scale(0, 0.72, t2.y0, t2.y1);

  const short = 30,
    long = 1000;

  return svg(
    { h: 308, a: 'teal', b: 'sand' },
    // variance
    L(x0, t1.y0, x1, t1.y0, 'ax'),
    L(x0, t1.y0, x0, t1.y1, 'ax'),
    T(x0, t1.y1 - 8, 'trait variance (fast)', 'tb'),
    yticks(sv, x0, [[0], [Vstar, '0.006']]),
    L(x0, sv(Vstar), x1, sv(Vstar), 'ln dash'),
    P(gens.map((t) => [gx(t), sv(V[t])]), 'lb'),
    // mean
    L(x0, t2.y0, x1, t2.y0, 'ax'),
    L(x0, t2.y0, x0, t2.y1, 'ax'),
    T(x0, t2.y1 - 8, 'trait mean shift (slow)', 'ta'),
    yticks(sz, x0, [[0], [0.3], [0.6]]),
    P(gens.map((t) => [gx(t), sz(Z[t])]), 'la'),
    // two moments at which the run could be read
    [short, long].map((t) => [
      L(gx(t), 36, gx(t), t2.y0, 'ln dash'),
      C(gx(t), sv(V[t]), 3.6, 'fbd'),
      C(gx(t), sz(Z[t]), 3.6, 'fad'),
    ]),
    T(gx(short), 28, 'short run', 'tm', 'middle'),
    T(gx(long), 28, 'long run', 'tm', 'middle'),
    xticks(gx, t2.y0, [[1], [10], [100], [1000]]),
    T(x1, t2.y0 + 30, 'generations', 'tm', 'end'),
  );
}
