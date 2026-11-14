/**
 * Complexity and stability: May's (1972) random communities. A community of S species has
 * the matrix A = -I + M, where each off-diagonal entry of M is zero, or with probability C
 * a draw from a normal distribution with mean 0 and standard deviation sigma. The diagonal
 * is the self-regulation, set to -1. The community is stable when every eigenvalue of A has
 * a negative real part. May's rule for large S is that this happens when
 * sigma sqrt(S C) is below 1. Here the share of stable matrices among 200 random ones is
 * computed for each S and three connectances, by finding the eigenvalues with a Hessenberg
 * reduction and the shifted QR algorithm (the same routine as in the standard libraries,
 * checked against numpy). Seeded. `stats()` gives the numbers the post quotes.
 */
import { svg, axes, xticks, yticks, hgrid, scale, L, P, T, rng, gauss } from './lib.mjs';

/** Eigenvalues (real and imaginary parts) of a real square matrix a (it is overwritten): Hessenberg form, then Francis QR. */
export function eigenvalues(a) {
  const n = a.length;
  // reduction to upper Hessenberg form by stabilised elementary similarity transformations
  for (let m = 1; m < n - 1; m++) {
    let x = 0,
      i = m;
    for (let j = m; j < n; j++) if (Math.abs(a[j][m - 1]) > Math.abs(x)) ((x = a[j][m - 1]), (i = j));
    if (i !== m) {
      for (let j = m - 1; j < n; j++) [a[i][j], a[m][j]] = [a[m][j], a[i][j]];
      for (let j = 0; j < n; j++) [a[j][i], a[j][m]] = [a[j][m], a[j][i]];
    }
    if (x !== 0) {
      for (let i2 = m + 1; i2 < n; i2++) {
        let y = a[i2][m - 1];
        if (y !== 0) {
          y /= x;
          a[i2][m - 1] = y;
          for (let j = m; j < n; j++) a[i2][j] -= y * a[m][j];
          for (let j = 0; j < n; j++) a[j][m] += y * a[j][i2];
        }
      }
    }
  }
  for (let i = 2; i < n; i++) for (let j = 0; j < i - 1; j++) a[i][j] = 0;

  const wr = new Array(n).fill(0),
    wi = new Array(n).fill(0);
  const sign = (u, v) => (v >= 0 ? Math.abs(u) : -Math.abs(u));
  let anorm = 0;
  for (let i = 0; i < n; i++) for (let j = Math.max(i - 1, 0); j < n; j++) anorm += Math.abs(a[i][j]);
  let nn = n - 1,
    t = 0;
  while (nn >= 0) {
    let its = 0,
      l;
    do {
      for (l = nn; l >= 1; l--) {
        let s = Math.abs(a[l - 1][l - 1]) + Math.abs(a[l][l]);
        if (s === 0) s = anorm;
        if (Math.abs(a[l][l - 1]) + s === s) {
          a[l][l - 1] = 0;
          break;
        }
      }
      let x = a[nn][nn];
      if (l === nn) {
        wr[nn] = x + t;
        wi[nn--] = 0;
      } else {
        let y = a[nn - 1][nn - 1];
        let w = a[nn][nn - 1] * a[nn - 1][nn];
        if (l === nn - 1) {
          const p = 0.5 * (y - x);
          const q = p * p + w;
          let z = Math.sqrt(Math.abs(q));
          x += t;
          if (q >= 0) {
            z = p + sign(z, p);
            wr[nn - 1] = wr[nn] = x + z;
            if (z) wr[nn] = x - w / z;
            wi[nn - 1] = wi[nn] = 0;
          } else {
            wr[nn - 1] = wr[nn] = x + p;
            wi[nn - 1] = -(wi[nn] = z);
          }
          nn -= 2;
        } else {
          if (its === 60) throw new Error('too many iterations');
          if (its === 10 || its === 20) {
            t += x;
            for (let i = 0; i <= nn; i++) a[i][i] -= x;
            const s = Math.abs(a[nn][nn - 1]) + Math.abs(a[nn - 1][nn - 2]);
            y = x = 0.75 * s;
            w = -0.4375 * s * s;
          }
          ++its;
          let m, p, q, r, z;
          for (m = nn - 2; m >= l; m--) {
            z = a[m][m];
            r = x - z;
            let s = y - z;
            p = (r * s - w) / a[m + 1][m] + a[m][m + 1];
            q = a[m + 1][m + 1] - z - r - s;
            r = a[m + 2][m + 1];
            s = Math.abs(p) + Math.abs(q) + Math.abs(r);
            p /= s;
            q /= s;
            r /= s;
            if (m === l) break;
            const u = Math.abs(a[m][m - 1]) * (Math.abs(q) + Math.abs(r));
            const v = Math.abs(p) * (Math.abs(a[m - 1][m - 1]) + Math.abs(z) + Math.abs(a[m + 1][m + 1]));
            if (u + v === v) break;
          }
          for (let i = m + 2; i <= nn; i++) {
            a[i][i - 2] = 0;
            if (i !== m + 2) a[i][i - 3] = 0;
          }
          for (let k = m; k <= nn - 1; k++) {
            if (k !== m) {
              p = a[k][k - 1];
              q = a[k + 1][k - 1];
              r = 0;
              if (k !== nn - 1) r = a[k + 2][k - 1];
              if ((x = Math.abs(p) + Math.abs(q) + Math.abs(r)) !== 0) {
                p /= x;
                q /= x;
                r /= x;
              }
            }
            const s = sign(Math.sqrt(p * p + q * q + r * r), p);
            if (s !== 0) {
              if (k === m) {
                if (l !== m) a[k][k - 1] = -a[k][k - 1];
              } else a[k][k - 1] = -s * x;
              p += s;
              x = p / s;
              y = q / s;
              z = r / s;
              q /= p;
              r /= p;
              for (let j = k; j <= nn; j++) {
                p = a[k][j] + q * a[k + 1][j];
                if (k !== nn - 1) {
                  p += r * a[k + 2][j];
                  a[k + 2][j] -= p * z;
                }
                a[k + 1][j] -= p * y;
                a[k][j] -= p * x;
              }
              const mmin = nn < k + 3 ? nn : k + 3;
              for (let i = l; i <= mmin; i++) {
                p = x * a[i][k] + y * a[i][k + 1];
                if (k !== nn - 1) {
                  p += z * a[i][k + 2];
                  a[i][k + 2] -= p * r;
                }
                a[i][k + 1] -= p * q;
                a[i][k] -= p;
              }
            }
          }
        }
      }
    } while (l < nn - 1);
  }
  return { re: wr, im: wi };
}

export const SIGMA = 0.25;
export const CONNECTANCES = [0.2, 0.5, 1];
// the sizes tried for each connectance stop a little after the share of stable matrices reaches zero
const SIZES = {
  0.2: [4, 12, 24, 36, 48, 60, 68, 76, 84, 92, 100],
  0.5: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64],
  1: [4, 8, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 44],
};
const REPLICATES = 200;

/** A random community matrix: -1 on the diagonal, off-diagonals zero or N(0, sigma^2) with probability c. */
export function community(S, c, sigma, rand) {
  const a = Array.from({ length: S }, () => new Array(S).fill(0));
  for (let i = 0; i < S; i++)
    for (let j = 0; j < S; j++) a[i][j] = i === j ? -1 : rand() < c ? sigma * gauss(rand) : 0;
  return a;
}

/**
 * The same, with the pairs built as predator and prey: for each pair of species that interact
 * (probability c) one entry is positive and the other negative, each with the size of a normal draw.
 */
export function predatorPrey(S, c, sigma, rand) {
  const a = Array.from({ length: S }, (_, i) => Array.from({ length: S }, (_, j) => (i === j ? -1 : 0)));
  for (let i = 0; i < S; i++)
    for (let j = i + 1; j < S; j++)
      if (rand() < c) {
        const up = Math.abs(sigma * gauss(rand)),
          down = Math.abs(sigma * gauss(rand));
        if (rand() < 0.5) ((a[i][j] = up), (a[j][i] = -down));
        else ((a[j][i] = up), (a[i][j] = -down));
      }
  return a;
}

const shareStable = (make, S, c, replicates, rand) => {
  let stable = 0;
  for (let r = 0; r < replicates; r++) if (Math.max(...eigenvalues(make(S, c, SIGMA, rand)).re) < 0) stable++;
  return stable / replicates;
};

/** The size at which the share of stable matrices falls through one half, by linear interpolation. */
function half(sizes, share) {
  for (let i = 1; i < sizes.length; i++)
    if (share[i - 1] >= 0.5 && share[i] < 0.5)
      return sizes[i - 1] + ((sizes[i] - sizes[i - 1]) * (share[i - 1] - 0.5)) / (share[i - 1] - share[i]);
  return NaN;
}

export function stats(replicates = REPLICATES) {
  const rand = rng(1972);
  const share = {},
    halfway = {},
    threshold = {};
  for (const c of CONNECTANCES) {
    share[c] = SIZES[c].map((S) => shareStable(community, S, c, replicates, rand));
    halfway[c] = half(SIZES[c], share[c]);
    threshold[c] = 1 / (SIGMA * SIGMA * c); // sigma sqrt(S C) = 1
  }
  // a contrast: 40 species at connectance 0.5, random against predator-prey pairs, 200 matrices each
  const contrast = {
    S: 40,
    c: 0.5,
    random: shareStable(community, 40, 0.5, replicates, rand),
    predatorPrey: shareStable(predatorPrey, 40, 0.5, replicates, rand),
  };
  return { sizes: SIZES, share, threshold, halfway, contrast, replicates };
}

export default function draw() {
  const { sizes, share, threshold } = stats();
  const x0 = 56,
    x1 = 462,
    y0 = 214,
    y1 = 34;
  const sx = scale(0, 100, x0, x1 - 8);
  const sy = scale(0, 1, y0, y1);
  const parts = [
    hgrid(x0, x1, [sy(0.5), sy(1)]),
    axes({ x0, y0, x1, y1, xlabel: 'species, S', ylabel: 'share of random communities that are stable' }),
    xticks(sx, y0, [[0], [20], [40], [60], [80], [100]]),
    yticks(sy, x0, [[0], [0.5, '0.5'], [1]]),
  ];
  for (const c of CONNECTANCES) {
    // the predicted threshold, sigma sqrt(S C) = 1
    parts.push(L(sx(threshold[c]), y0, sx(threshold[c]), y1, 'ln dash'));
  }
  for (const c of CONNECTANCES) parts.push(P(sizes[c].map((S, i) => [sx(S), sy(share[c][i])]), 'la'));
  parts.push(
    T(sx(16) - 11, sy(0.5), 'C = 1', 'ta halo', 'end'),
    T(sx(41) + 8, sy(0.5), 'C = 0.5', 'ta halo'),
    T(sx(86) + 8, sy(0.78), 'C = 0.2', 'ta halo'),
    T(sx(80) + 8, sy(0.04), 'predicted', 'tm halo'),
  );
  return svg({ h: 262, a: 'teal', b: 'sand' }, parts);
}
