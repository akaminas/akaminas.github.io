/**
 * Better a simple and correct model than a complex and erroneous one: a sketch of
 * a model as a list of mechanisms. Each one that stays has a source for its form,
 * a test, and a decision to keep it. A mechanism with a missing anchor is
 * dropped (dashed), so the model shrinks. A conceptual diagram, not data.
 */
import { svg, L, R, C, T } from './lib.mjs';

export default function draw() {
  const rows = [
    { source: true, test: true },
    { source: true, test: true },
    { source: false, test: true },
    { source: true, test: true },
    { source: false, test: false },
    { source: true, test: true },
  ];
  const top = 62,
    pitch = 34,
    h = 24;
  const bx = 48,
    bw = 112;
  const cx = { source: 244, test: 334, decision: 404 };

  const parts = [
    T(bx + bw / 2, 34, 'mechanism', 'tm', 'middle'),
    T(cx.source, 34, 'source', 'tm', 'middle'),
    T(cx.test, 34, 'test', 'tm', 'middle'),
    T(cx.decision, 34, 'decision', 'tm'),
  ];
  rows.forEach((r, i) => {
    const y = top + i * pitch;
    const mid = y + h / 2;
    const kept = r.source && r.test;
    const line = kept ? 'ln' : 'ln dash';
    parts.push(
      // the chain: mechanism, source, test, decision
      L(bx + bw, mid, cx.source - 7, mid, line),
      L(cx.source + 7, mid, cx.test - 7, mid, line),
      L(cx.test + 7, mid, cx.decision - 8, mid, line),
      R(bx, y, bw, h, kept ? 'fa' : 'fn dash', 5),
      C(cx.source, mid, 6, r.source ? 'fad' : 'fn dash'),
      C(cx.test, mid, 6, r.test ? 'fad' : 'fn dash'),
      T(cx.decision, mid + 4, kept ? 'keep' : 'delete', kept ? 'tt' : 'tm'),
    );
  });
  return svg({ h: top + rows.length * pitch - 4, a: 'lilac', b: 'sand' }, parts);
}
