/**
 * Citizen-science records: reports against effort. The animals are spread evenly
 * over a grid of 10 x 5 cells (an expected one report per observer-hour in every
 * cell). The observers are not: they gather round a harbour and a dive site. The
 * reports in a cell are a Poisson draw with mean equal to the hours spent there,
 * so the reports map the observers, not the animals. Dividing by the hours
 * gives the even density back. Computed (seeded), not drawn by hand.
 */
import { svg, T, L, P, arrowLine, rng, n } from './lib.mjs';

export const COLS = 10,
  ROWS = 5;

/** A Poisson draw (Knuth for small means, a normal approximation above 30). */
function poisson(mean, rand) {
  if (mean > 30) return Math.max(0, Math.round(mean + Math.sqrt(mean) * Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand())));
  const lim = Math.exp(-mean);
  let k = 0,
    p = 1;
  do {
    k++;
    p *= rand();
  } while (p > lim);
  return k - 1;
}

/** The grid: hours of effort, reports and reports per hour in each cell, row by row. */
export function grid(seed = 5) {
  const rand = rng(seed);
  const harbour = [1.5, 2],
    dive = [7, 3];
  const cells = [];
  for (let j = 0; j < ROWS; j++)
    for (let i = 0; i < COLS; i++) {
      const d1 = (i - harbour[0]) ** 2 + (j - harbour[1]) ** 2;
      const d2 = (i - dive[0]) ** 2 + (j - dive[1]) ** 2;
      const hours = 8 + 70 * Math.exp(-d1 / (2 * 1.5 ** 2)) + 30 * Math.exp(-d2 / (2 * 1.1 ** 2));
      const reports = poisson(hours, rand); // one report per observer-hour, on average, everywhere
      cells.push({ i, j, hours, reports, rate: reports / hours });
    }
  return cells;
}

export function summary() {
  const cells = grid();
  const totalReports = cells.reduce((s, c) => s + c.reports, 0);
  const totalHours = cells.reduce((s, c) => s + c.hours, 0);
  const busiest = [...cells].sort((a, b) => b.reports - a.reports).slice(0, 10);
  const share = busiest.reduce((s, c) => s + c.reports, 0) / totalReports;
  const rates = cells.map((c) => c.rate);
  const mx = cells.reduce((s, c) => s + c.reports, 0) / cells.length;
  const my = cells.reduce((s, c) => s + c.hours, 0) / cells.length;
  const cov = cells.reduce((s, c) => s + (c.reports - mx) * (c.hours - my), 0);
  const vx = cells.reduce((s, c) => s + (c.reports - mx) ** 2, 0);
  const vy = cells.reduce((s, c) => s + (c.hours - my) ** 2, 0);
  return {
    totalReports,
    totalHours: Math.round(totalHours),
    rate: totalReports / totalHours,
    shareOfTenBusiest: share,
    minReports: Math.min(...cells.map((c) => c.reports)),
    maxReports: Math.max(...cells.map((c) => c.reports)),
    minRate: Math.min(...rates),
    maxRate: Math.max(...rates),
    correlation: cov / Math.sqrt(vx * vy),
  };
}

export default function draw() {
  const cells = grid();
  const s = summary();
  const size = 20,
    gap = 1;
  const px = [10, 270];
  const py = [24, 160];

  /** One panel: a frame, and the cells in LEVELS shades of one deep tone (one path per shade). */
  const LEVELS = 8;
  function panel(x, y, value, tone) {
    const byLevel = Array.from({ length: LEVELS }, () => '');
    for (const c of cells) {
      const v = Math.max(0, Math.min(1, value(c)));
      const lv = Math.min(LEVELS - 1, Math.floor(v * LEVELS));
      const cx = x + c.i * size,
        cy = y + c.j * size;
      byLevel[lv] += `M${n(cx + gap / 2)} ${n(cy + gap / 2)}h${size - gap}v${size - gap}h${-(size - gap)}z`;
    }
    return [
      byLevel.map((d, lv) =>
        d ? `<path class="${tone}" style="stroke:none;fill-opacity:${(0.1 + (0.8 * (lv + 0.5)) / LEVELS).toFixed(2)}" d="${d}"/>` : '',
      ),
      P(
        [
          [x, y],
          [x + COLS * size, y],
          [x + COLS * size, y + ROWS * size],
          [x, y + ROWS * size],
        ],
        'ln',
        true,
      ),
    ];
  }

  const maxHours = Math.max(...cells.map((c) => c.hours));
  const maxReports = Math.max(...cells.map((c) => c.reports));
  const mid = 0.5; // an even density is drawn at the middle shade; the rate panel is scaled to twice the pooled rate

  return svg(
    { h: 292, a: 'teal', b: 'coral' },
    // top row: what is there, and who is looking
    T(px[0], py[0] - 8, 'animals', 'ta'),
    panel(px[0], py[0], () => mid, 'fad'),
    T(px[1], py[0] - 8, 'observer hours', 'tb'),
    panel(px[1], py[0], (c) => c.hours / maxHours, 'fbd'),
    T((px[0] + px[1] + COLS * size) / 2, py[0] + (ROWS * size) / 2 + 4, 'x', 'tm', 'middle'),
    // bottom row: what is reported, and what is left when the effort is divided out
    T(px[0], py[1] - 8, 'reports', 'ta'),
    panel(px[0], py[1], (c) => c.reports / maxReports, 'fad'),
    T(px[1], py[1] - 8, 'reports per hour', 'ta'),
    panel(px[1], py[1], (c) => c.rate / (2 * s.rate), 'fad'),
    T((px[0] + px[1] + COLS * size) / 2, py[1] + (ROWS * size) / 2 - 8, 'per hour', 'ts', 'middle'),
    arrowLine(px[0] + COLS * size + 10, py[1] + (ROWS * size) / 2, px[1] - 10, py[1] + (ROWS * size) / 2, 'ln'),
  );
}
