/**
 * The MacArthur and Wilson picture, with isolation drawn as a rate. Immigration
 * falls with the number of species already on the island, I = a (1 - S / P);
 * extinction rises, E = e S / P. The island settles where the two cross. A far
 * island has the same extinction curve and an immigration curve that starts
 * lower: the gap between the two curves is the isolation. Straight lines, made-up
 * rates (a = 1 and 0.4, e = 0.5, in any unit of time), a pool of P species.
 */
import { svg, axes, scale, L, T, C, arrowLine, n } from './lib.mjs';

export const near = { a: 1.0 },
  far = { a: 0.4 },
  e = 0.5,
  P = 100;

/** The number of species at which immigration equals extinction. */
export const equilibrium = ({ a }) => (P * a) / (a + e);

export default function draw() {
  const x0 = 56,
    x1 = 456,
    y0 = 206,
    y1 = 34;
  const sx = scale(0, P, x0, x1);
  const sy = scale(0, 1.0, y0, y1 + 6);
  const imm = (m) => (s) => m.a * (1 - s / P);
  const ext = (s) => (e * s) / P;

  const sN = equilibrium(near),
    sF = equilibrium(far);
  const xb = x0 + 16; // where the isolation gap is marked
  const gapTop = sy(imm(near)((xb - x0) / (x1 - x0) * P)),
    gapBot = sy(imm(far)((xb - x0) / (x1 - x0) * P));

  return svg(
    { h: 250, a: 'teal', b: 'sand' },
    axes({ x0, y0, x1, y1, xlabel: 'species on the island', ylabel: 'rate' }),
    T(x1, y0 + 17, 'pool', 'ts', 'middle'),
    // extinction, the same for both islands
    L(sx(0), sy(0), sx(P), sy(ext(P)), 'ln'),
    T(x1 - 2, sy(ext(P)) - 9, 'extinction', 'tm', 'end'),
    // immigration to a far and a near island
    L(sx(0), sy(imm(far)(0)), sx(P), sy(0), 'sa'),
    L(sx(0), sy(imm(near)(0)), sx(P), sy(0), 'la'),
    T(x0 - 8, sy(1) + 4, 'near', 'ta', 'end'),
    T(x0 - 8, sy(far.a) + 4, 'far', 'tm', 'end'),
    // isolation: the drop from the near curve to the far curve
    arrowLine(xb, (gapTop + gapBot) / 2, xb, gapTop + 3, 'ln'),
    arrowLine(xb, (gapTop + gapBot) / 2, xb, gapBot - 3, 'ln'),
    T(xb + 9, (gapTop + gapBot) / 2 + 4, 'isolation', 'tx'),
    // where each island settles
    L(sx(sF), sy(imm(far)(sF)), sx(sF), y0, 'ln dash'),
    L(sx(sN), sy(imm(near)(sN)), sx(sN), y0, 'ln dash'),
    C(sx(sF), sy(imm(far)(sF)), 4.5, 'fa'),
    C(sx(sN), sy(imm(near)(sN)), 4.5, 'fad'),
  );
}
