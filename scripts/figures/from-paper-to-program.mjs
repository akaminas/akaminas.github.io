/**
 * From a model in a paper to a claim the model supports: the six steps of the
 * post, each with the check that belongs to it. A conceptual diagram, no data.
 */
import { svg, R, T, L, arrowLine } from './lib.mjs';

const steps = [
  ['read the model', 'four things written down'],
  ['design the algorithm', 'one step worked by hand'],
  ['implement it', 'state and parameters apart'],
  ['check it', 'a known answer, the moments'],
  ['run experiments', 'same random numbers, replicates'],
  ['draw conclusions', 'a claim about the model only'],
];

export default function draw() {
  const bx = 12,
    bw = 160,
    bh = 30,
    top = 30,
    pitch = 44;
  const tx = 196;
  const parts = [T(bx, 14, 'step', 'tm'), T(tx, 14, 'its check', 'tm')];
  steps.forEach(([step, check], i) => {
    const y = top + i * pitch;
    parts.push(
      R(bx, y, bw, bh, 'fas', 6),
      T(bx + bw / 2, y + bh / 2 + 4, step, 'tt', 'middle'),
      L(bx + bw, y + bh / 2, tx - 8, y + bh / 2, 'ln'),
      T(tx, y + bh / 2 + 4, check, 'tx'),
    );
    if (i < steps.length - 1) parts.push(arrowLine(bx + bw / 2, y + bh, bx + bw / 2, y + pitch - 1, 'ln'));
  });
  return svg({ h: top + (steps.length - 1) * pitch + bh + 8, a: 'lilac', b: 'sand' }, parts);
}
