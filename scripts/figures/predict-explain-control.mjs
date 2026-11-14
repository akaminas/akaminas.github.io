/**
 * Prediction, explanation and control: one seeded system in which a hidden
 * common cause z drives both x and y (x = z + noise, y = z + noise), and y does
 * not depend on x at all. Left: x as it occurs, so x predicts y. Right: the same
 * units with x reassigned by us (an intervention), so x tells us nothing about y.
 * Both panels use the same y values and the same distribution of x.
 */
import { svg, axes, scale, L, T, n, rng, gauss } from './lib.mjs';

export function compute(N = 200, seed = 11) {
  const rand = rng(seed);
  const found = [];
  const set = [];
  for (let i = 0; i < N; i++) {
    const z = gauss(rand);
    const x = z + gauss(rand);
    const y = z + gauss(rand);
    found.push([x, y]);
  }
  // Intervention: x is drawn afresh, independent of z (same spread as before), y is unchanged.
  const sdx = Math.sqrt(2);
  for (let i = 0; i < N; i++) set.push([sdx * gauss(rand), found[i][1]]);
  return { found, set };
}

export function fit(pts) {
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
  const slope = sxy / sxx;
  return { slope, intercept: my - slope * mx, r: sxy / Math.sqrt(sxx * syy) };
}

export default function draw() {
  const { found, set } = compute();
  const R = 5;
  const y0 = 220,
    y1 = 54;
  const panels = [
    { x0: 40, x1: 214, pts: found, t: 'y against x as it occurs', s: 'sa', l: 'la', tc: 'ta' },
    { x0: 276, x1: 450, pts: set, t: 'y against x set by us', s: 'sb', l: 'lb', tc: 'tb' },
  ];
  const parts = [];
  for (const p of panels) {
    const sx = scale(-R, R, p.x0, p.x1);
    const sy = scale(-R, R, y0, y1);
    const f = fit(p.pts);
    let dots = '';
    for (const [x, y] of p.pts) if (Math.abs(x) < R && Math.abs(y) < R) dots += `M${n(sx(x))} ${n(sy(y))}h0`;
    const ya = f.intercept + f.slope * -R,
      yb = f.intercept + f.slope * R;
    parts.push(
      T(p.x0, 26, p.t, 'tt'),
      axes({ x0: p.x0, y0, x1: p.x1, y1, xlabel: 'x' }),
      L(p.x0, sy(0), p.x1, sy(0), 'gr'),
      `<path class="${p.s}" style="stroke-width:4.4" d="${dots}"/>`,
      L(sx(-R), sy(ya), sx(R), sy(yb), p.l),
      T(p.x0 + 8, y1 + 8, `slope ${f.slope.toFixed(2)}`, `${p.tc} halo`),
    );
  }
  return svg({ h: 262, a: 'lilac', b: 'sand' }, parts);
}
