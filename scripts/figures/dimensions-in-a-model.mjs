/**
 * Dimensions in a model: the share of a cube taken up by the ball inscribed in it,
 * pi^(d/2) / (Gamma(d/2 + 1) 2^d), for 1 to 12 dimensions, on a log axis so that
 * the last values can be read. Gamma comes from its recurrence (Gamma(x + 1) = x
 * Gamma(x), with Gamma(1) = 1 and Gamma(1/2) = sqrt(pi)), exact for every integer d.
 * The post quotes about 16 per cent at d = 5 and about 0.25 per cent at d = 10;
 * both come out of the same function.
 */
import { svg, axes, xticks, yticks, hgrid, scale, P, C, T, n } from './lib.mjs';

/** Gamma(d/2 + 1) for an integer d, by the recurrence. */
function gammaHalf(d) {
  let g = d % 2 === 0 ? 1 : Math.sqrt(Math.PI) / 2; // Gamma(1) or Gamma(3/2)
  for (let k = d % 2 === 0 ? 2 : 3; k <= d; k += 2) g *= k / 2; // Gamma(k/2 + 1) = (k/2) Gamma(k/2)
  return g;
}
/** Share of the cube [-1, 1]^d filled by the unit ball. */
const share = (d) => Math.PI ** (d / 2) / (gammaHalf(d) * 2 ** d);

export default function draw() {
  const x0 = 56,
    x1 = 462,
    y0 = 214,
    y1 = 36;
  const sx = scale(1, 12, x0 + 14, x1 - 6);
  const sy = (v) => y0 - ((Math.log10(v * 100) + 2) / 4) * (y0 - y1); // v is a share, 0.0001 to 1 -> 0.01% to 100%

  const dims = Array.from({ length: 12 }, (_, i) => i + 1);
  const pts = dims.map((d) => [sx(d), sy(share(d))]);
  const pct = (d) => {
    const v = share(d) * 100;
    return `${v >= 10 ? Math.round(v) : Number(v.toPrecision(2))}%`;
  };

  return svg(
    { h: 262, a: 'lilac', b: 'sand' },
    hgrid(x0, x1, [1, 0.1, 0.01, 0.001].map(sy)),
    axes({ x0, y0, x1, y1, xlabel: 'dimensions', ylabel: 'share of the cube the ball fills' }),
    xticks(sx, y0, dims.map((d) => [d])),
    yticks(sy, x0, [
      [1, '100%'],
      [0.1, '10%'],
      [0.01, '1%'],
      [0.001, '0.1%'],
      [0.0001, '0.01%'],
    ]),
    P(pts, 'la'),
    dims.map((d) => C(sx(d), sy(share(d)), d === 5 || d === 10 ? 4.5 : 2.5, d === 5 || d === 10 ? 'fad' : 'fa')),
    T(sx(5) + 9, sy(share(5)) - 8, pct(5), 'ta halo'),
    T(sx(10) + 9, sy(share(10)) - 8, pct(10), 'ta halo'),
  );
}
