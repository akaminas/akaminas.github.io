/**
 * Confounders, mediators and colliders. Left: the three structures as small
 * diagrams (z is the variable whose adjustment is in question). Right: a
 * collider at work. Two independent scores, x and y, are both drawn from a
 * standard normal; keeping only the units whose sum exceeds a threshold (a
 * funding list, a hospital admission, a published paper) makes them negatively
 * correlated in the units that are kept. Seeded and computed.
 */
import { svg, axes, scale, L, C, T, n, rng, gauss, arrowLine } from './lib.mjs';

export const THRESHOLD = 1;

export function compute(N = 500, seed = 7) {
  const rand = rng(seed);
  const pts = [];
  for (let i = 0; i < N; i++) pts.push([gauss(rand), gauss(rand)]);
  return pts;
}

export function corr(pts) {
  const m = pts.length;
  const mx = pts.reduce((s, p) => s + p[0], 0) / m;
  const my = pts.reduce((s, p) => s + p[1], 0) / m;
  let sxy = 0,
    sxx = 0,
    syy = 0;
  for (const [x, y] of pts) {
    sxy += (x - mx) * (y - my);
    sxx += (x - mx) ** 2;
    syy += (y - my) ** 2;
  }
  return sxy / Math.sqrt(sxx * syy);
}

export default function draw() {
  const pts = compute();
  const kept = pts.filter(([x, y]) => x + y > THRESHOLD);
  const rAll = corr(pts);
  const rKept = corr(kept);

  // --- the three diagrams ---
  const parts = [];
  const rad = 11;
  const edge = ([ax, ay], [bx, by], cls = 'ln') => {
    const d = Math.hypot(bx - ax, by - ay);
    const ux = (bx - ax) / d,
      uy = (by - ay) / d;
    return arrowLine(ax + ux * (rad + 2), ay + uy * (rad + 2), bx - ux * (rad + 4), by - uy * (rad + 4), cls, 5);
  };
  const cx = 118;
  const diagrams = [
    { name: 'confounder: adjust', arrows: [['z', 'x'], ['z', 'y'], ['x', 'y']] },
    { name: 'mediator: do not adjust', arrows: [['x', 'z'], ['z', 'y'], ['x', 'y']] },
    { name: 'collider: do not adjust', arrows: [['x', 'z'], ['y', 'z']] },
  ];
  diagrams.forEach((g, i) => {
    const top = 6 + i * 102;
    const pos = { z: [cx, top + 22], x: [cx - 62, top + 68], y: [cx + 62, top + 68] };
    for (const [a, b] of g.arrows) parts.push(edge(pos[a], pos[b]));
    for (const k of ['x', 'y', 'z']) {
      parts.push(C(pos[k][0], pos[k][1], rad, k === 'z' ? 'fa' : 'fn'), T(pos[k][0], pos[k][1] + 4, k, 'tt', 'middle'));
    }
    parts.push(T(cx, top + 98, g.name, 'tt', 'middle'));
  });

  // --- the scatter ---
  const x0 = 276,
    x1 = 460,
    y0 = 262,
    y1 = 62;
  const R = 3.5;
  const sx = scale(-R, R, x0, x1);
  const sy = scale(-R, R, y0, y1);
  let dotsAll = '',
    dotsKept = '';
  for (const [x, y] of pts) {
    if (Math.abs(x) >= R || Math.abs(y) >= R) continue;
    const d = `M${n(sx(x))} ${n(sy(y))}h0`;
    if (x + y > THRESHOLD) dotsKept += d;
    else dotsAll += d;
  }
  parts.push(
    T(x0, 26, 'two independent scores', 'tt'),
    axes({ x0, y0, x1, y1, xlabel: 'x', ylabel: 'y' }),
    `<path class="sb" style="stroke-width:4.4" d="${dotsAll}"/>`,
    `<path class="sa" style="stroke-width:4.4" d="${dotsKept}"/>`,
    // the selection boundary x + y = THRESHOLD
    L(sx(THRESHOLD - R), sy(R), sx(R), sy(THRESHOLD - R), 'ln dash'),
    T(x0 + 6, y0 - 8, `all: r = ${rAll.toFixed(2)}`, 'tb halo'),
    T(x1 - 4, y1 + 8, `kept: r = ${rKept.toFixed(2)}`, 'ta halo', 'end'),
  );
  return svg({ h: 312, a: 'lilac', b: 'sand' }, parts);
}
