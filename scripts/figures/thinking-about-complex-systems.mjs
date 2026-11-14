/**
 * Levins's trade-off between generality, realism and precision, as a triangle with
 * one corner for each. Each kind of model keeps two and gives up the third, so it
 * sits on the side between the two it keeps: a verbal model keeps generality and
 * realism (gives up precision), an analytical one keeps generality and precision
 * (gives up realism), a simulation keeps realism and precision (gives up
 * generality). The positions are schematic; nothing here is data.
 */
import { svg, P, C, T } from './lib.mjs';

export default function draw() {
  const apex = [240, 46], // generality
    bl = [122, 226], // realism
    br = [358, 226]; // precision
  const centre = [(apex[0] + bl[0] + br[0]) / 3, (apex[1] + bl[1] + br[1]) / 3];

  /** The marker for a kind of model: the middle of a side, pushed a little inside. */
  const onSide = (p, q, push = 15) => {
    const mx = (p[0] + q[0]) / 2,
      my = (p[1] + q[1]) / 2;
    const dx = centre[0] - mx,
      dy = centre[1] - my,
      len = Math.hypot(dx, dy);
    return [mx + (dx / len) * push, my + (dy / len) * push, mx, my];
  };
  const verbal = onSide(apex, bl),
    analytical = onSide(apex, br),
    simulation = onSide(bl, br);

  return svg(
    { h: 276, a: 'lilac', b: 'sand' },
    P([apex, bl, br], 'fbs', true),
    T(apex[0], apex[1] - 12, 'generality', 'tx', 'middle'),
    T(bl[0], bl[1] + 19, 'realism', 'tx', 'middle'),
    T(br[0], br[1] + 19, 'precision', 'tx', 'middle'),
    C(verbal[0], verbal[1], 5.5, 'fad'),
    T(verbal[2] - 17, verbal[3] + 1, 'verbal', 'ta', 'end'),
    T(verbal[2] - 17, verbal[3] + 16, 'gives up precision', 'ts', 'end'),
    C(analytical[0], analytical[1], 5.5, 'fad'),
    T(analytical[2] + 17, analytical[3] + 1, 'analytical', 'ta'),
    T(analytical[2] + 17, analytical[3] + 16, 'gives up realism', 'ts'),
    C(simulation[0], simulation[1], 5.5, 'fad'),
    T(simulation[2], simulation[3] + 22, 'simulation', 'ta', 'middle'),
    T(simulation[2], simulation[3] + 37, 'gives up generality', 'ts', 'middle'),
  );
}
