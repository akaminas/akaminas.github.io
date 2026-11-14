/**
 * What a composite index hides: eight made-up regions scored on three made-up
 * indicators (economic, social, environmental, each 0 to 100), ranked three ways.
 * The scores come from a seeded generator, so the drawing is the same every time;
 * the seed was chosen so that the movement is easy to see. The ranks are computed
 * from the scores, not typed in.
 *
 *   1  equal weights, arithmetic mean
 *   2  equal weights, geometric mean
 *   3  weights 1/4, 1/4, 1/2 (the environment counts double), arithmetic mean
 *
 * `stability()` is also exported: the share of random weightings (arithmetic
 * mean, weights drawn uniformly from the simplex) in which each region is first,
 * and the range of ranks it takes. The post quotes it.
 */
import { svg, hgrid, scale, rng, L, P, C, T } from './lib.mjs';

export const regions = 'ABCDEFGH'.split('');
const SEED = 37;

export function scores() {
  const r = rng(SEED);
  return regions.map(() => [0, 0, 0].map(() => Math.round(15 + r() * 80)));
}

const arith = (x, w) => x.reduce((t, v, i) => t + w[i] * v, 0);
const geom = (x, w) => Math.exp(x.reduce((t, v, i) => t + w[i] * Math.log(v), 0));

function ranksOf(sc) {
  const order = sc.map((_, i) => i).sort((a, b) => sc[b] - sc[a]);
  const rank = [];
  order.forEach((i, k) => (rank[i] = k + 1));
  return rank;
}

export const schemes = [
  { w: [1 / 3, 1 / 3, 1 / 3], f: arith },
  { w: [1 / 3, 1 / 3, 1 / 3], f: geom },
  { w: [0.25, 0.25, 0.5], f: arith },
];

export function allRanks() {
  const d = scores();
  return schemes.map((s) => ranksOf(d.map((x) => s.f(x, s.w))));
}

export function stability(draws = 10000) {
  const d = scores();
  const rand = rng(2024);
  const count = regions.map(() => Array(8).fill(0));
  for (let k = 0; k < draws; k++) {
    let w = [0, 0, 0].map(() => -Math.log(1 - rand()));
    const s = w[0] + w[1] + w[2];
    w = w.map((v) => v / s);
    ranksOf(d.map((x) => arith(x, w))).forEach((rk, i) => count[i][rk - 1]++);
  }
  return regions.map((name, i) => {
    const c = count[i];
    const lo = c.findIndex((v) => v > 0) + 1;
    const hi = 8 - [...c].reverse().findIndex((v) => v > 0);
    return { name, scores: d[i], first: (100 * c[0]) / draws, lo, hi };
  });
}

export default function draw() {
  const ranks = allRanks();
  const cols = [100, 240, 380];
  const sy = scale(1, 8, 66, 220);
  const heads = [
    ['equal weights', 'arithmetic mean'],
    ['equal weights', 'geometric mean'],
    ['environment doubled', 'arithmetic mean'],
  ];
  const FOLLOW = 'F';

  const lines = [];
  const dots = [];
  regions.forEach((name, i) => {
    const follow = name === FOLLOW;
    const pts = cols.map((x, k) => [x, sy(ranks[k][i])]);
    lines.push({ follow, el: P(pts, follow ? 'la' : 'sb') });
    pts.forEach(([x, y]) => dots.push({ follow, el: C(x, y, follow ? 4.6 : 3.6, follow ? 'fad' : 'fb') }));
  });
  const order = (arr) => [...arr.filter((o) => !o.follow), ...arr.filter((o) => o.follow)].map((o) => o.el);

  const labels = regions.map((name, i) => {
    const cls = name === FOLLOW ? 'ta halo' : 'tm';
    return (
      T(cols[0] - 10, sy(ranks[0][i]) + 4, name, cls, 'end') +
      T(cols[2] + 10, sy(ranks[2][i]) + 4, name, cls, 'start')
    );
  });

  return svg(
    { h: 240, a: 'coral', b: 'sand' },
    hgrid(cols[0], cols[2], Array.from({ length: 8 }, (_, k) => sy(k + 1))),
    heads.map(([a, b], k) => T(cols[k], 16, a, 'tm', 'middle') + T(cols[k], 30, b, 'tm', 'middle')),
    T(44, sy(1) + 4, '1st', 'ts', 'end'),
    T(44, sy(8) + 4, '8th', 'ts', 'end'),
    L(cols[0], 44, cols[0], 228, 'ax'),
    L(cols[1], 44, cols[1], 228, 'ax'),
    L(cols[2], 44, cols[2], 228, 'ax'),
    order(lines),
    order(dots),
    labels,
  );
}
