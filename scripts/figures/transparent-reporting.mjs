/**
 * A conceptual diagram, not data: the four links between data and the sentence a reader
 * sees, with what has to be written down at each, and the route a reader takes back.
 */
import { svg, R, T, L, D, arrowLine, arrow } from './lib.mjs';

const links = [
  ['data', 'source', 'what repeats'],
  ['code', 'version', 'what it checks'],
  ['number', 'estimator', 'interval'],
  ['sentence', 'compared with', 'margin'],
];

export default function draw() {
  const w = 84,
    h = 38,
    y = 40,
    pitch = 120,
    left = 10;
  const cx = (i) => left + w / 2 + i * pitch;
  const out = [];
  links.forEach(([name, a, b], i) => {
    out.push(R(cx(i) - w / 2, y, w, h, 'fas', 4));
    out.push(T(cx(i), y + h / 2 + 4, name, 'tt', 'middle'));
    out.push(T(cx(i), y + h + 26, a, 'tm', 'middle'));
    out.push(T(cx(i), y + h + 43, b, 'tm', 'middle'));
    if (i < links.length - 1) out.push(arrowLine(cx(i) + w / 2 + 5, y + h / 2, cx(i + 1) - w / 2 - 5, y + h / 2, 'ln'));
  });
  // the route back: from the sentence to the data, under the records
  const yb = y + h + 70;
  out.push(
    D(`M${cx(3)} ${y + h + 54}V${yb}H${cx(0)}V${y + h + 54}`, 'lb'),
    arrow(cx(0), y + h + 54, -90, 'lb'),
    T((cx(0) + cx(3)) / 2, yb + 22, 'a reader traces it back', 'tb halo', 'middle'),
  );
  return svg({ h: 188, a: 'lilac', b: 'sand' }, out);
}
