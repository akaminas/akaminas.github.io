/**
 * Schelling's segregation model on a 30 by 30 grid with walls (no wrap-around).
 * Two types of agent, about 10 per cent of the cells empty. An agent is content
 * if at least one third of its occupied neighbours (the eight surrounding cells)
 * are of its own type, and an agent with no neighbours is content. Content agents
 * stay. Each round, every discontent agent in a random order moves to a random
 * empty cell where it would be content (if there is none, it stays). The run
 * stops when everyone is content or after 200 rounds. Seeded.
 *
 * `run()` is exported so the post can quote the mean share of like neighbours
 * before and after, which is computed here and nowhere else.
 */
import { svg, rng, R, T, arrowLine, n } from './lib.mjs';

const N = 30;
const THRESHOLD = 1 / 3;
const EMPTY_SHARE = 0.1;
const SEED = 11;

function neighbours(g, i, j) {
  const out = [];
  for (let di = -1; di <= 1; di++)
    for (let dj = -1; dj <= 1; dj++) {
      if (!di && !dj) continue;
      const a = i + di,
        b = j + dj;
      if (a >= 0 && a < N && b >= 0 && b < N && g[a][b]) out.push(g[a][b]);
    }
  return out;
}
/** The share of like neighbours among occupied neighbours, or null if there are none. */
function like(g, i, j, type = g[i][j]) {
  const nb = neighbours(g, i, j);
  return nb.length ? nb.filter((t) => t === type).length / nb.length : null;
}
const content = (g, i, j, type = g[i][j]) => {
  const s = like(g, i, j, type);
  return s === null || s >= THRESHOLD - 1e-9;
};
/** The mean over agents that have at least one neighbour. */
function meanLike(g) {
  let s = 0,
    c = 0;
  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++)
      if (g[i][j]) {
        const v = like(g, i, j);
        if (v !== null) {
          s += v;
          c++;
        }
      }
  return s / c;
}

export function run() {
  const rand = rng(SEED);
  const cells = Array.from({ length: N * N }, (_, k) => k);
  // shuffle, then fill: the first block empty, the rest alternating 1 and 2
  for (let k = cells.length - 1; k > 0; k--) {
    const m = Math.floor(rand() * (k + 1));
    [cells[k], cells[m]] = [cells[m], cells[k]];
  }
  const empties = Math.round(N * N * EMPTY_SHARE);
  const g = Array.from({ length: N }, () => Array(N).fill(0));
  cells.forEach((c, k) => {
    if (k >= empties) g[Math.floor(c / N)][c % N] = 1 + (k % 2);
  });
  const start = g.map((r) => [...r]);
  const before = meanLike(g);

  let rounds = 0;
  let settled = false;
  for (; rounds < 200; rounds++) {
    const movers = [];
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) if (g[i][j] && !content(g, i, j)) movers.push([i, j]);
    if (!movers.length) {
      settled = true;
      break;
    }
    for (let k = movers.length - 1; k > 0; k--) {
      const m = Math.floor(rand() * (k + 1));
      [movers[k], movers[m]] = [movers[m], movers[k]];
    }
    for (const [i, j] of movers) {
      if (content(g, i, j)) continue;
      const type = g[i][j];
      const free = [];
      for (let a = 0; a < N; a++) for (let b = 0; b < N; b++) if (!g[a][b] && content(g, a, b, type)) free.push([a, b]);
      if (!free.length) continue;
      const [a, b] = free[Math.floor(rand() * free.length)];
      g[a][b] = type;
      g[i][j] = 0;
    }
  }
  const agents = g.flat().filter(Boolean).length;
  return { start, end: g, before, after: meanLike(g), rounds, settled, agents, empties: N * N - agents };
}

/** One path per type: runs of equal cells in a row become one rectangle. */
function paths(g, x, y, s, type) {
  let d = '';
  for (let i = 0; i < N; i++) {
    let j = 0;
    while (j < N) {
      if (g[i][j] !== type) {
        j++;
        continue;
      }
      let e = j;
      while (e < N && g[i][e] === type) e++;
      d += `M${n(x + j * s)} ${n(y + i * s)}h${n((e - j) * s)}v${n(s)}h${n(-(e - j) * s)}z`;
      j = e;
    }
  }
  return d;
}

export default function draw() {
  const { start, end } = run();
  const s = 6.9;
  const size = N * s;
  const gap = 30;
  const left = (480 - 2 * size - gap) / 2;
  const top = 6;
  const grid = (g, x) => [
    `<path class="fa" style="stroke:var(--_a);stroke-width:.5" d="${paths(g, x, top, s, 1)}"/>`,
    `<path class="fb" style="stroke:var(--_b);stroke-width:.5" d="${paths(g, x, top, s, 2)}"/>`,
    R(x, top, size, size, 'ln'),
  ];
  const x2 = left + size + gap;
  return svg(
    { h: 250, a: 'teal', b: 'coral' },
    grid(start, left),
    grid(end, x2),
    arrowLine(left + size + 6, top + size / 2, left + size + gap - 6, top + size / 2, 'ln', 5),
    T(left + size / 2, top + size + 22, 'random start', 'tx', 'middle'),
    T(x2 + size / 2, top + size + 22, 'settled', 'tx', 'middle'),
  );
}
