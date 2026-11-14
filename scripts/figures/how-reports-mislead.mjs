/**
 * Simpson's paradox in the kidney-stone table: the success rate of each treatment
 * for small stones, for large stones and pooled. Every height is computed from the
 * counts in the post (successes, patients), so the figure cannot drift from the table.
 */
import { svg, axes, yticks, hgrid, scale, R, T, L } from './lib.mjs';

// [successes, patients] per treatment and stone size, as in the post's table.
const data = {
  small: { A: [81, 87], B: [234, 270] },
  large: { A: [192, 263], B: [55, 80] },
};
const sum = (t) => [data.small[t][0] + data.large[t][0], data.small[t][1] + data.large[t][1]];
const pooled = { A: sum('A'), B: sum('B') };
const pct = ([s, n]) => (100 * s) / n;

export default function draw() {
  const x0 = 44,
    x1 = 462,
    y0 = 196,
    y1 = 42;
  const sy = scale(0, 100, y0, y1);
  const bw = 56,
    gap = 4,
    gw = 2 * bw + gap,
    step = gw + 22,
    left = 62;

  const groups = [
    { name: 'small stones', n: `${data.small.A[1]} and ${data.small.B[1]} patients`, A: data.small.A, B: data.small.B, deep: false },
    { name: 'large stones', n: `${data.large.A[1]} and ${data.large.B[1]} patients`, A: data.large.A, B: data.large.B, deep: false },
    { name: 'both together', n: `${pooled.A[1]} patients each`, A: pooled.A, B: pooled.B, deep: true },
  ];

  const out = [];
  groups.forEach((g, i) => {
    const gx = left + i * step;
    const cx = gx + gw / 2;
    for (const [k, t] of [[0, 'A'], [1, 'B']]) {
      const v = pct(g[t]);
      const x = gx + k * (bw + gap);
      const cls = t === 'A' ? (g.deep ? 'fad' : 'fa') : g.deep ? 'fbd' : 'fb';
      out.push(R(x, sy(v), bw, y0 - sy(v), cls));
      out.push(T(x + bw / 2, sy(v) - 6, `${t} ${Math.round(v)}%`, t === 'A' ? 'ta' : 'tb', 'middle'));
    }
    out.push(T(cx, y0 + 18, g.name, 'tx', 'middle'));
    out.push(T(cx, y0 + 33, g.n, 'ts', 'middle'));
  });

  return svg(
    { h: 244, a: 'lilac', b: 'sand' },
    hgrid(x0, x1, [sy(50), sy(100)]),
    axes({ x0, y0, x1, y1 }),
    T(x0, y1 - 14, 'success rate', 'tm'),
    yticks(sy, x0, [[0, '0'], [50, '50'], [100, '100']]),
    out,
  );
}
