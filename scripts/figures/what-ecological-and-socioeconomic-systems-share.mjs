/**
 * What ecological and socioeconomic systems share: two columns of analogues, one
 * ecological and one socioeconomic, each pair feeding one shared piece of
 * structure. Only the pairs the post itself makes: predators and prey with
 * employment and wages (one feedback loop, Lotka and Volterra's equations in
 * Goodwin's model), a lake that is clear or turbid with an institution that is
 * hard to leave (a threshold, a way back that differs from the way in), and a
 * species count with a sustainability index (many dimensions folded into one
 * number). Conceptual: no data.
 */
import { svg, R, T, arrowLine } from './lib.mjs';

export default function draw() {
  const bw = 132,
    bh = 44,
    xl = 4,
    xm = 174,
    xr = 344,
    tops = [40, 102, 164];
  const rows = [
    { l: ['predators', 'and prey'], m: ['one feedback', 'loop'], r: ['employment', 'and wages'] },
    { l: ['a lake, clear', 'or turbid'], m: ['one threshold'], r: ['an institution', 'hard to leave'] },
    { l: ['species count'], m: ['many measures,', 'one number'], r: ['sustainability', 'index'] },
  ];
  const label = (x, top, lines) =>
    lines.map((s, i) => T(x + bw / 2, top + (lines.length === 1 ? 27 : 19 + i * 15), s, 'tx', 'middle'));

  return svg(
    { h: 224, a: 'teal', b: 'coral' },
    T(xl + bw / 2, 22, 'ecological', 'ta', 'middle'),
    T(xm + bw / 2, 22, 'in common', 'tm', 'middle'),
    T(xr + bw / 2, 22, 'socioeconomic', 'tb', 'middle'),
    rows.map((row, i) => {
      const top = tops[i],
        cy = top + bh / 2;
      return [
        R(xl, top, bw, bh, 'fa', 4),
        R(xm, top, bw, bh, 'fn', 4),
        R(xr, top, bw, bh, 'fb', 4),
        arrowLine(xl + bw + 3, cy, xm - 4, cy, 'la'),
        arrowLine(xr - 3, cy, xm + bw + 4, cy, 'lb'),
        label(xl, top, row.l),
        label(xm, top, row.m),
        label(xr, top, row.r),
      ];
    }),
  );
}
