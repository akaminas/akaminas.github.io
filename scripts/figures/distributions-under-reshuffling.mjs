/**
 * Distributions under reshuffling: the post's party example. Party A has 60 per
 * cent at one election and party B 40; at the next they have 55 and 45. Only the
 * totals are observed. The top drawing is the net transfer of 5 points from A to
 * B with nothing back; the bottom one is 15 points from A to B and 10 back. Both
 * give the same totals, so both are drawn from the same bars. The numbers are
 * the post's own; everything else is arithmetic on them (the script checks that
 * each scenario reproduces the totals).
 */
import { svg, D, R, T, n } from './lib.mjs';

const BEFORE = { A: 60, B: 40 };
const AFTER = { A: 55, B: 45 };
const SCENARIOS = [
  { AA: 55, AB: 5, BA: 0, BB: 40 }, // a net transfer of 5 points, nothing back
  { AA: 45, AB: 15, BA: 10, BB: 30 }, // 15 points one way and 10 back
];

export default function draw() {
  for (const s of SCENARIOS) {
    if (s.AA + s.AB !== BEFORE.A || s.BA + s.BB !== BEFORE.B || s.AA + s.BA !== AFTER.A || s.AB + s.BB !== AFTER.B)
      throw new Error('a scenario does not reproduce the totals');
  }
  const k = 1.05, // units per point
    gap = 8,
    xl = 66, // left bars, x of their right edge
    xr = 414, // right bars, x of their left edge
    bw = 16;
  const tops = [16, 160];
  const mid = (xl + xr) / 2;

  /** A ribbon from the left bar (y0..y1) to the right bar (y2..y3). */
  const ribbon = (y0, y1, y2, y3, c) =>
    D(
      `M${n(xl)} ${n(y0)}C${n(mid)} ${n(y0)} ${n(mid)} ${n(y2)} ${n(xr)} ${n(y2)}L${n(xr)} ${n(y3)}C${n(mid)} ${n(y3)} ${n(mid)} ${n(y1)} ${n(xl)} ${n(y1)}Z`,
      c,
    );
  /** Y of a ribbon's centre a fraction t of the way across (the curve is a smoothstep between its two ends). */
  const at = (ya, yb, t) => ya + (yb - ya) * (3 * t * t - 2 * t * t * t);

  const out = [];
  SCENARIOS.forEach((s, i) => {
    const t = tops[i];
    // bar tops: left A, left B, right A, right B
    const lA = t,
      lB = t + BEFORE.A * k + gap,
      rA = t,
      rB = t + AFTER.A * k + gap;
    // ribbons: stays first, then the crossing flows on top
    out.push(ribbon(lA, lA + s.AA * k, rA, rA + s.AA * k, 'fas'));
    out.push(ribbon(lB + s.BA * k, lB + (s.BA + s.BB) * k, rB + s.AB * k, rB + (s.AB + s.BB) * k, 'fbs'));
    out.push(ribbon(lA + s.AA * k, lA + (s.AA + s.AB) * k, rB, rB + s.AB * k, 'fad'));
    if (s.BA) out.push(ribbon(lB, lB + s.BA * k, rA + s.AA * k, rA + (s.AA + s.BA) * k, 'fbd'));
    // bars and their labels
    out.push(
      R(xl - bw, lA, bw, BEFORE.A * k, 'fa'),
      R(xl - bw, lB, bw, BEFORE.B * k, 'fb'),
      R(xr, rA, bw, AFTER.A * k, 'fa'),
      R(xr, rB, bw, AFTER.B * k, 'fb'),
      T(xl - bw - 6, lA + (BEFORE.A * k) / 2 + 4, `A ${BEFORE.A}`, 'tx', 'end'),
      T(xl - bw - 6, lB + (BEFORE.B * k) / 2 + 4, `B ${BEFORE.B}`, 'tx', 'end'),
      T(xr + bw + 6, rA + (AFTER.A * k) / 2 + 4, `A ${AFTER.A}`, 'tx'),
      T(xr + bw + 6, rB + (AFTER.B * k) / 2 + 4, `B ${AFTER.B}`, 'tx'),
    );
    // the numbers on the flows that cross
    const ab = [lA + (s.AA + s.AB / 2) * k, rB + (s.AB / 2) * k];
    const ba = [lB + (s.BA / 2) * k, rA + (s.AA + s.BA / 2) * k];
    if (s.BA) {
      out.push(T(xl + (xr - xl) * 0.22, at(ab[0], ab[1], 0.22) + 4, String(s.AB), 'tx halo', 'middle'));
      out.push(T(xl + (xr - xl) * 0.78, at(ba[0], ba[1], 0.78) + 4, String(s.BA), 'tx halo', 'middle'));
    } else {
      out.push(T(mid, at(ab[0], ab[1], 0.5) + 4, String(s.AB), 'tx halo', 'middle'));
    }
  });

  return svg({ h: 292, a: 'coral', b: 'sand' }, out);
}
