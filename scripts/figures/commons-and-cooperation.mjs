/**
 * Replicator dynamics for a two-strategy game, x being the share of cooperators:
 *
 *   dx/dt = x (1 - x) (f_C - f_D),   f_C = R x + S (1 - x),   f_D = T x + P (1 - x)
 *
 * with R the payoff for cooperating with a cooperator, S for cooperating with a
 * defector, T for defecting against a cooperator and P for defecting against a
 * defector. Two payoff matrices:
 *
 *   dilemma       T > R > P > S: defecting pays whatever the others do
 *   coordination  R > T and P > S: cooperating pays when enough others cooperate
 *
 * The curves, the equilibria and which of them are stable are all computed from the
 * matrices. Exported so the post can quote the tipping point and the end states.
 */
import { svg, scale, L, D, C, T, arrowLine } from './lib.mjs';

export const dilemma = { R: 3, S: 0, T: 5, P: 1 };
export const coordination = { R: 4, S: 0, T: 3, P: 2 };

export const growth = (g) => (x) => x * (1 - x) * ((g.R - g.T) * x + (g.S - g.P) * (1 - x));

/** Equilibria of the share, each with its stability (stable when the growth falls through zero). */
export function equilibria(g) {
  const f = growth(g);
  const xs = [0, 1];
  const inner = (g.P - g.S) / (g.R - g.T + (g.P - g.S));
  if (inner > 0 && inner < 1) xs.push(inner);
  xs.sort((a, b) => a - b);
  const h = 1e-4;
  return xs.map((x) => {
    const slope = (f(Math.min(1, x + h)) - f(Math.max(0, x - h))) / (Math.min(1, x + h) - Math.max(0, x - h));
    return { x, stable: slope < 0 };
  });
}

/** Where a population that starts with share x0 ends up, by Euler steps. */
export function endState(g, x0, steps = 20000, dt = 0.01) {
  const f = growth(g);
  let x = x0;
  for (let t = 0; t < steps; t++) x += dt * f(x);
  return x;
}

export default function draw() {
  const x0 = 56,
    x1 = 446;
  const sx = scale(0, 1, x0, x1);
  const k = 150; // units per unit of growth
  const panels = [
    { g: dilemma, zero: 52, tone: 'b', label: 'defection dominates' },
    { g: coordination, zero: 178, tone: 'a', label: 'two stable outcomes' },
  ];
  const yAxis = 242;

  const parts = [L(x0, 28, x0, yAxis, 'gr'), L(x1, 28, x1, yAxis, 'gr')];
  for (const { g, zero, tone, label } of panels) {
    const f = growth(g);
    const eq = equilibria(g);
    // the zero line: the share neither grows nor falls
    parts.push(L(x0, zero, x1, zero, 'ln'));
    // the curve
    const pts = Array.from({ length: 101 }, (_, i) => [sx(i / 100), zero - k * f(i / 100)]);
    parts.push(D(pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(''), 'l' + tone));
    // arrows on the zero line, one in the middle of each stretch between equilibria
    const spots = eq.slice(0, -1).flatMap((e, i) => {
      const a = e.x,
        b = eq[i + 1].x;
      const m = b - a > 0.5 ? [a + (b - a) * 0.25, a + (b - a) * 0.7] : [a + (b - a) * 0.5];
      return m;
    });
    for (const xm of spots) {
      const dir = Math.sign(f(xm));
      parts.push(arrowLine(sx(xm) - 11 * dir, zero, sx(xm) + 11 * dir, zero, 'ln', 5));
    }
    // equilibria: filled where the share stays, open where it leaves
    for (const e of eq) parts.push(C(sx(e.x), zero, 5, e.stable ? 'f' + tone + 'd' : 'fp'));
    parts.push(T(x0 + 8, zero - 18, label, 't' + tone));
    const tip = eq.find((e) => !e.stable && e.x > 0 && e.x < 1);
    if (tip) parts.push(T(sx(tip.x), zero - 18, 'tipping point', 'tm', 'middle'));
  }

  // the share of cooperators runs along the bottom
  parts.push(L(x0, yAxis, x1, yAxis, 'ax'), L(x0, yAxis, x0, yAxis + 4, 'ax'), L(x1, yAxis, x1, yAxis + 4, 'ax'));
  parts.push(T(x0, yAxis + 17, '0', 'ts', 'middle'), T(x1, yAxis + 17, '1', 'ts', 'middle'));
  parts.push(T(x1, yAxis + 34, 'share of cooperators', 'tm', 'end'));
  parts.push(T(x0, 16, 'growth of the share', 'tm'));

  return svg({ h: 290, a: 'teal', b: 'coral' }, parts);
}
