/**
 * Independent lies: one question put to differently built models. A harvested
 * population has carrying capacity 1, grows at rate r = 0.8 when rare, and is
 * now at 0.7 of carrying capacity. How far does the equilibrium density fall if
 * the harvest rate is raised by half? Four models answer it, each fitted to the
 * same three facts: a logistic equation, a Beverton-Holt map, a two-stage model
 * in which only adults are harvested, and a two-patch model with a refuge. For
 * comparison, the logistic model is fitted five times to survey estimates of the
 * current density that differ by about 0.01. Computed, not drawn by hand.
 */
import { svg, axes, xticks, hgrid, scale, L, T, C, rng, gauss, n } from './lib.mjs';

const r = 0.8; // growth rate when rare, per year
const rise = 1.5; // harvest rate after the rise, relative to now

function bisect(f, lo, hi) {
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (f(lo) * f(mid) <= 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}

// Each model: equilibrium density as a function of the harvest rate h (carrying capacity = 1).
const logistic = (h) => 1 - h / r;
const R = Math.exp(r);
const bevertonHolt = (h) => ((Math.exp(-h) * R) - 1) / (R - 1); // harvest fraction 1 - exp(-h) each year, after breeding
const m = 1,
  mu = 0.4,
  b = (r * r + (m + mu) * r + m * mu) / m,
  c = (b * m) / mu - m; // juveniles mature at m, adults die at mu, density dependence in juvenile survival
const stages = (h) => ((b * m) / (mu + h) - m) / c;
function refuge(h) {
  // Two patches with exchange between them; the harvest falls on patch 1 only, at 2h, so the average rate is h.
  const e = 0.5,
    dt = 0.01;
  let x1 = 0.5,
    x2 = 0.5;
  for (let t = 0; t < 100000; t++) {
    const d1 = r * x1 * (1 - x1) - 2 * h * x1 - e * (x1 - x2);
    const d2 = r * x2 * (1 - x2) + e * (x1 - x2);
    x1 += dt * d1;
    x2 += dt * d2;
  }
  return (x1 + x2) / 2;
}

/** Per cent fall of the equilibrium density when the harvest rate that matches `now` is raised by half. */
function fall(model, now) {
  const h0 = bisect((h) => model(h) - now, 1e-6, 0.79);
  return (100 * (model(h0) - model(h0 * rise))) / model(h0);
}

export function results() {
  const now = 0.7;
  const rand = rng(39); // a seed whose five survey estimates are centred on 0.7
  const fits = Array.from({ length: 5 }, () => now + 0.01 * gauss(rand));
  return {
    models: {
      logistic: fall(logistic, now),
      'Beverton-Holt': fall(bevertonHolt, now),
      'two stages': fall(stages, now),
      refuge: fall(refuge, now),
    },
    fits: fits.map((x) => ({ now: x, fall: fall(logistic, x) })),
  };
}

export default function draw() {
  const { models, fits } = results();
  const x0 = 164,
    x1 = 462,
    y0 = 210,
    y1 = 20;
  const sx = scale(0, 25, x0, x1);
  const rows = [40, 72, 104, 136, 168];
  const order = ['logistic', 'Beverton-Holt', 'two stages', 'refuge'];
  const lo = Math.min(...order.map((k) => models[k])),
    hi = Math.max(...order.map((k) => models[k]));

  return svg(
    { h: 254, a: 'teal', b: 'sand' },
    // the range the four models span
    `<rect class="fas" style="stroke:none" x="${n(sx(lo) - 10)}" y="${n(rows[1] - 15)}" width="${n(sx(hi) - sx(lo) + 20)}" height="${n(rows[4] - rows[1] + 30)}" rx="4"/>`,
    hgrid(x0, x1, rows),
    axes({ x0, y0, x1, y1, xlabel: 'fall in density, per cent' }),
    xticks(sx, y0, [[0], [5], [10], [15], [20], [25]]),
    // five fits of one model: they agree closely because they share the form
    T(8, rows[0] + 4, 'logistic, five fits', 'tm'),
    fits.map((f) => C(sx(f.fall), rows[0], 4.5, 'fbs')),
    // four different models, each fitted to the same facts
    order.map((name, i) => [T(8, rows[i + 1] + 4, name, 'tx'), C(sx(models[name]), rows[i + 1], 5, 'fad')]),
    T((sx(lo) + sx(hi)) / 2, rows[4] + 31, 'the size differs', 'ta', 'middle'),
  );
}
