/**
 * The Levins model dp/dt = c p (1 - D - p) - e p, p being the fraction of all patches that
 * are occupied and D the fraction destroyed. Its equilibrium is p* = max(0, 1 - D - e/c),
 * positive only when c (1 - D) > e. The curves are that formula against c/e, for D = 0 and
 * D = 0.3. The dots are a stochastic simulation of 200 patches (exact, Gillespie): each
 * occupied patch goes extinct at rate e = 1; each empty, intact patch is colonised at rate
 * c times the occupied fraction of all patches. Each dot is the time-averaged occupied
 * fraction between t = 50 and t = 250 from one run; if the species dies out, the average is
 * what it was up to that point (zero afterwards). Seeded.
 *
 * `debt()` is exported for the post: how long the decline takes after destruction.
 */
import { svg, axes, xticks, yticks, hgrid, scale, rng, L, P, C, T } from './lib.mjs';

const PATCHES = 200;
const D = 0.3;

export function simulate(c, destroyed, rand, T0 = 50, T1 = 250) {
  const suitable = PATCHES - destroyed;
  let k = Math.round(suitable / 2);
  let t = 0;
  let area = 0;
  while (t < T1) {
    const ext = k; // e = 1
    const col = (c * k * (suitable - k)) / PATCHES;
    const total = ext + col;
    if (total === 0) break;
    const dt = -Math.log(1 - rand()) / total;
    const tNext = Math.min(T1, t + dt);
    // time-average of p over [T0, T1]
    const lo = Math.max(t, T0);
    if (tNext > lo) area += (k / PATCHES) * (tNext - lo);
    t = tNext;
    if (t >= T1) break;
    k += rand() < ext / total ? -1 : 1;
  }
  return area / (T1 - T0);
}

/** Time for the occupied fraction to fall below `below`, in units of a patch lifetime 1/e, by Euler steps. */
export function debt({ ce = 1.25, loss = 0.25, below = 0.01 } = {}) {
  const pStar = 1 - 1 / ce;
  let p = pStar;
  let t = 0;
  const dt = 0.001;
  while (p > below && t < 1e4) {
    p += dt * (ce * p * (1 - loss - p) - p);
    t += dt;
  }
  return { before: pStar, thresholdLoss: pStar, time: t };
}

export default function draw() {
  const x0 = 56,
    x1 = 446,
    y0 = 206,
    y1 = 36;
  const sx = scale(0, 4, x0, x1);
  const sy = scale(0, 1, y0, y1);
  const star = (r, loss) => Math.max(0, 1 - loss - 1 / r);

  const curve = (loss) => {
    const pts = [];
    for (let i = 0; i <= 80; i++) {
      const r = 0.3 + (3.7 * i) / 80;
      pts.push([sx(r), sy(star(r, loss))]);
    }
    return pts;
  };

  const rand = rng(21);
  const dots = [];
  for (let r = 0.5; r <= 4.001; r += 0.25) {
    const p0 = simulate(r, 0, rand);
    const p1 = simulate(r, Math.round(PATCHES * D), rand);
    dots.push(C(sx(r) + 3, sy(p1), 2.9, 'fbd'));
    dots.push(C(sx(r) - 3, sy(p0), 2.9, 'fad'));
  }

  const t1 = 1;
  const t2 = 1 / (1 - D);
  return svg(
    { h: 252, a: 'teal', b: 'coral' },
    hgrid(x0, x1, [sy(0.5), sy(1)]),
    axes({ x0, y0, x1, y1, xlabel: 'colonisation / extinction rate, c / e', ylabel: 'fraction of patches occupied' }),
    xticks(sx, y0, [[0], [1], [2], [3], [4]]),
    yticks(sy, x0, [[0], [0.5], [1]]),
    L(sx(t1), y0, sx(t1), y1 + 4, 'ln dash'),
    L(sx(t2), y0, sx(t2), y1 + 4, 'ln dash'),
    T(sx(t1) - 6, y1 + 10, 'c = e', 'tm', 'end'),
    T(sx(t2) + 6, y1 + 10, 'c (1 - D) = e', 'tm'),
    P(curve(0), 'la'),
    P(curve(D), 'lb'),
    dots,
    T(sx(3.95), sy(star(4, 0)) - 14, 'all patches intact', 'ta halo', 'end'),
    T(sx(3.95), sy(star(4, D)) - 14, '30% destroyed', 'tb halo', 'end'),
  );
}
