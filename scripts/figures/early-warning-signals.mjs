/**
 * Early-warning signals: critical slowing down. A state x relaxes towards 0 at rate
 * lambda(t) and is kicked by noise, dx = -lambda(t) x dt + sigma dW (Euler-Maruyama,
 * step 0.1, recorded once per time unit, 1000 records). The rate falls in a straight
 * line from 1 to 0.05, the simplest stand-in for a system approaching a threshold
 * (near a fold the rate falls as the square root of the distance to it). This is the
 * linearised model only: it has no tipping in it, and it shows what the two indicators
 * do while the rate falls. The indicators are the variance and the lag-1 autocorrelation
 * in a rolling window of 200 records. Seeded; `stats()` gives the numbers the post quotes.
 */
import { svg, scale, L, P, T, rng, gauss } from './lib.mjs';

const SIGMA = 0.3,
  TOTAL = 1000,
  WINDOW = 200,
  DT = 0.1;
export const lambda = (t) => 1 - 0.95 * (t / TOTAL);

const variance = (v) => {
  const m = v.reduce((s, x) => s + x, 0) / v.length;
  return v.reduce((s, x) => s + (x - m) ** 2, 0) / (v.length - 1);
};
/** Pearson correlation between each value in the window and the next one. */
const lag1 = (v) => {
  const a = v.slice(0, -1),
    b = v.slice(1);
  const ma = a.reduce((s, x) => s + x, 0) / a.length;
  const mb = b.reduce((s, x) => s + x, 0) / b.length;
  let sab = 0,
    saa = 0,
    sbb = 0;
  for (let i = 0; i < a.length; i++) {
    sab += (a[i] - ma) * (b[i] - mb);
    saa += (a[i] - ma) ** 2;
    sbb += (b[i] - mb) ** 2;
  }
  return sab / Math.sqrt(saa * sbb);
};

export function stats(seed = 21) {
  const rand = rng(seed);
  const x = [0];
  let cur = 0;
  for (let i = 1; i <= TOTAL; i++) {
    for (let s = 0; s < 1 / DT; s++) {
      const t = (i - 1) + s * DT;
      cur += -lambda(t) * cur * DT + SIGMA * Math.sqrt(DT) * gauss(rand);
    }
    x.push(cur);
  }
  const roll = [];
  for (let t = WINDOW; t <= TOTAL; t++) {
    const w = x.slice(t - WINDOW + 1, t + 1);
    roll.push({ t, v: variance(w), r: lag1(w) });
  }
  return { x, roll, window: WINDOW, sigma: SIGMA };
}

export default function draw() {
  const { x, roll } = stats();
  const x0 = 56,
    x1 = 462;
  const sx = scale(0, TOTAL, x0, x1 - 6);
  const parts = [];
  const panel = (top, h, ymin, ymax, ticks, label) => {
    const sy = scale(ymin, ymax, top + h, top);
    parts.push(L(x0, top + h, x1, top + h, 'ax'), L(x0, top + h, x0, top, 'ax'));
    for (const [v, lab] of ticks) {
      parts.push(L(x0 - 4, sy(v), x0, sy(v), 'ax'), T(x0 - 8, sy(v) + 4, lab ?? String(v), 'ts', 'end'));
    }
    parts.push(T(x0 + 8, top + 12, label, 'tm'));
    return sy;
  };
  const syX = panel(16, 96, -1.6, 1.6, [[-1], [0], [1]], 'state');
  parts.push(L(x0, syX(0), x1, syX(0), 'gr'));
  parts.push(P(x.filter((_, i) => i % 2 === 0).map((v, i) => [sx(2 * i), syX(v)]), 'sa'));

  const vmax = Math.max(...roll.map((r) => r.v));
  const vTop = Math.ceil(vmax * 20) / 20;
  const syV = panel(132, 56, 0, vTop, [[0], [vTop, vTop.toFixed(2)]], 'rolling variance');
  parts.push(P(roll.filter((_, i) => i % 4 === 0).map((r) => [sx(r.t), syV(r.v)]), 'la'));

  const syR = panel(212, 56, 0, 1, [[0], [0.5, '0.5'], [1]], 'rolling lag-1 autocorrelation');
  parts.push(L(x0, syR(0.5), x1, syR(0.5), 'gr'));
  parts.push(P(roll.filter((_, i) => i % 4 === 0).map((r) => [sx(r.t), syR(Math.max(0, r.r))]), 'la'));

  const yb = 268;
  for (const t of [0, 200, 400, 600, 800, 1000]) {
    parts.push(L(sx(t), yb, sx(t), yb + 4, 'ax'), T(sx(t), yb + 17, String(t), 'ts', 'middle'));
  }
  parts.push(T(x1, yb + 30, 'time', 'tm', 'end'));
  return svg({ h: 304, a: 'teal', b: 'sand' }, parts);
}
