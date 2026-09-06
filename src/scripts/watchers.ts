/**
 * "Watchers": abstract eyes that occasionally surface from an ink pool in the
 * page margins, follow the pointer, blink, and sink back.
 *
 * Constraints (all deliberate):
 * - Purely decorative: fixed layer, aria-hidden, pointer-events: none, below the header.
 * - Never spawns under prefers-reduced-motion, in print, or while the tab is hidden.
 * - Infrequent: first appearance after 10–25 s, then every 25–70 s; at most one at a time.
 * - Each appearance lasts 2.5–5 s, so no instance exceeds WCAG 2.2.2's five-second
 *   threshold for moving content that would otherwise need a pause control.
 * - Placed only in empty space: the outer margins beside the content column, or the
 *   lower corners on narrow screens, never over the header.
 * - Cheap: a handful of DOM nodes, CSS transforms, and a requestAnimationFrame loop
 *   that runs only while an eye is on screen.
 * - Original drawing, generated per appearance: a brush-edged pale shape with a single
 *   dark irregular pupil, in the manner of an ink sketch.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

interface Eye {
  root: HTMLDivElement;
  pupil: SVGGElement;
  lids: SVGGElement;
  cx: number; // viewport centre x
  cy: number; // viewport centre y
  born: number;
  life: number;
  blinkAt: number;
  blinking: boolean;
  removed: boolean;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/**
 * A closed, smoothly curved but irregular shape around an ellipse (cx, cy, rx, ry):
 * `n` points with radial jitter of ±`jitter`, joined by quadratic curves through
 * the midpoints so the edge reads as a loaded brush stroke rather than a polygon.
 */
function brushShape(cx: number, cy: number, rx: number, ry: number, n: number, jitter: number): string {
  const pts: Array<[number, number]> = [];
  const phase = rand(0, Math.PI * 2);
  for (let i = 0; i < n; i++) {
    const a = phase + (i / n) * Math.PI * 2 + rand(-0.12, 0.12);
    const k = 1 + rand(-jitter, jitter);
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  const mid = (a: [number, number], b: [number, number]): [number, number] => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = '';
  for (let i = 0; i < n; i++) {
    const p0 = pts[i];
    const p1 = pts[(i + 1) % n];
    const m = mid(p0, p1);
    if (i === 0) d += `M${mid(pts[n - 1], p0).map((v) => v.toFixed(2)).join(' ')} `;
    d += `Q${p0[0].toFixed(2)} ${p0[1].toFixed(2)} ${m[0].toFixed(2)} ${m[1].toFixed(2)} `;
  }
  return d + 'Z';
}

export function mountWatchers(layer: HTMLElement): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  if (reduced.matches) return;

  let eye: Eye | null = null;
  let raf = 0;
  let timer = 0;
  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 3, known: false };

  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.known = true;
    },
    { passive: true },
  );

  const contentBox = (): { left: number; right: number } => {
    const el = document.querySelector<HTMLElement>('main .container') ?? document.querySelector('main');
    if (!el) return { left: 0, right: window.innerWidth };
    const r = el.getBoundingClientRect();
    return { left: r.left, right: r.right };
  };

  const headerBottom = (): number => {
    const h = document.querySelector<HTMLElement>('.site-header');
    return h ? h.getBoundingClientRect().bottom : 0;
  };

  /** Pick a spot in empty margin space; returns null when there is no room. */
  const place = (wanted: number): { x: number; y: number; size: number } | null => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { left, right } = contentBox();
    const top = headerBottom() + 32;
    const pad = 24;
    const minSize = 76;
    // Candidate margins beside the content column, with the size each can hold.
    const zones: Array<{ x0: number; x1: number; size: number }> = [];
    const leftRoom = left - pad * 2;
    const rightRoom = vw - right - pad * 2;
    if (leftRoom >= minSize) zones.push({ x0: pad, x1: left - pad, size: Math.min(wanted, leftRoom) });
    if (rightRoom >= minSize) zones.push({ x0: right + pad, x1: vw - pad, size: Math.min(wanted, rightRoom) });
    if (zones.length > 0) {
      const z = zones[Math.floor(Math.random() * zones.length)];
      const size = z.size;
      if (vh - top - pad - size <= 0) return null;
      return { x: rand(z.x0, z.x1 - size), y: rand(top, vh - pad - size), size };
    }
    // No usable margin (narrow screen): a small eye in a lower corner, where the
    // content column is usually empty (list rows end short of the edge).
    if (vh - top < 320) return null;
    const size = minSize;
    const x = Math.random() < 0.5 ? pad : vw - pad - size;
    return { x, y: rand(vh * 0.6, vh - pad - size), size };
  };

  const build = (wanted: number): Eye | null => {
    const spot = place(wanted);
    if (!spot) return null;
    const size = spot.size;
    const root = document.createElement('div');
    root.className = 'watcher';
    root.style.width = `${size}px`;
    root.style.height = `${size}px`;
    root.style.transform = `translate(${spot.x}px, ${spot.y}px)`;

    const pool = document.createElement('div');
    pool.className = 'watcher__pool';
    root.appendChild(pool);

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 120 120');
    svg.classList.add('watcher__eye');

    // Brush-drawn eye: an irregular pale shape with a rough edge and a single dark,
    // slightly irregular pupil. Every eye is generated fresh, so no two are alike.
    const lids = document.createElementNS(SVG_NS, 'g');
    lids.classList.add('watcher__lids');
    const tilted = document.createElementNS(SVG_NS, 'g');
    tilted.setAttribute('transform', `rotate(${rand(-14, 14).toFixed(1)} 60 60)`);
    lids.appendChild(tilted);

    const shapeD = brushShape(60, 60, rand(36, 42), rand(20, 26), 18, 0.17);
    const clipId = `w${Math.random().toString(36).slice(2, 8)}`;
    const clip = document.createElementNS(SVG_NS, 'clipPath');
    clip.setAttribute('id', clipId);
    const clipShape = document.createElementNS(SVG_NS, 'path');
    clipShape.setAttribute('d', shapeD);
    clip.appendChild(clipShape);
    const defs = document.createElementNS(SVG_NS, 'defs');
    defs.appendChild(clip);
    svg.appendChild(defs);

    const sclera = document.createElementNS(SVG_NS, 'path');
    sclera.setAttribute('d', shapeD);
    sclera.classList.add('watcher__sclera');

    // One or two stray brush flecks beside the shape.
    const flecks = document.createElementNS(SVG_NS, 'g');
    const nFlecks = Math.random() < 0.6 ? 1 : 2;
    for (let i = 0; i < nFlecks; i++) {
      const a = rand(0, Math.PI * 2);
      const fx = 60 + Math.cos(a) * rand(42, 50);
      const fy = 60 + Math.sin(a) * rand(26, 32);
      const fleck = document.createElementNS(SVG_NS, 'path');
      fleck.setAttribute('d', brushShape(fx, fy, rand(2, 4.5), rand(1.2, 2.6), 7, 0.3));
      fleck.classList.add('watcher__sclera');
      flecks.appendChild(fleck);
    }

    const clipped = document.createElementNS(SVG_NS, 'g');
    clipped.setAttribute('clip-path', `url(#${clipId})`);
    const pupil = document.createElementNS(SVG_NS, 'g');
    pupil.setAttribute('transform', 'translate(60 60)');
    clipped.appendChild(pupil);
    const core = document.createElementNS(SVG_NS, 'path');
    core.setAttribute('d', brushShape(0, 0, rand(7.5, 9.5), rand(6, 8), 9, 0.22));
    core.classList.add('watcher__pupil');
    pupil.appendChild(core);

    tilted.appendChild(sclera);
    tilted.appendChild(flecks);
    tilted.appendChild(clipped);
    svg.appendChild(lids);
    root.appendChild(svg);
    layer.appendChild(root);

    const now = performance.now();
    const e: Eye = {
      root,
      pupil,
      lids,
      cx: spot.x + size / 2,
      cy: spot.y + size / 2,
      born: now,
      life: rand(2500, 5000),
      blinkAt: now + rand(900, 2200),
      blinking: false,
      removed: false,
    };
    // Surface on the next frame so the transition runs.
    requestAnimationFrame(() => root.classList.add('is-up'));
    return e;
  };

  const remove = (e: Eye) => {
    if (e.removed) return;
    e.removed = true;
    e.root.classList.remove('is-up');
    e.root.classList.add('is-down');
    window.setTimeout(() => e.root.remove(), 900);
  };

  const tick = (now: number) => {
    if (!eye) return;
    raf = requestAnimationFrame(tick);
    const e = eye;
    const age = now - e.born;

    // Gaze: towards the pointer, or a slow drift when there is no fine pointer.
    let tx: number;
    let ty: number;
    if (finePointer.matches && pointer.known) {
      const dx = pointer.x - e.cx;
      const dy = pointer.y - e.cy;
      const d = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, d / 420);
      tx = (dx / d) * 20 * reach;
      ty = (dy / d) * 9 * reach;
    } else {
      tx = 14 * Math.sin(age / 900);
      ty = 5 * Math.cos(age / 1300);
    }
    e.pupil.setAttribute('transform', `translate(${60 + tx} ${60 + ty})`);

    // Blink: close and open, then schedule the next one.
    if (!e.blinking && now >= e.blinkAt) {
      e.blinking = true;
      e.lids.classList.add('is-blink');
      window.setTimeout(() => {
        e.lids.classList.remove('is-blink');
        e.blinking = false;
        e.blinkAt = performance.now() + rand(1400, 3200);
      }, 190);
    }

    if (age >= e.life) {
      remove(e);
      eye = null;
      cancelAnimationFrame(raf);
      schedule(rand(25000, 70000));
    }
  };

  const spawn = () => {
    if (document.visibilityState !== 'visible' || reduced.matches || eye) {
      schedule(rand(15000, 30000));
      return;
    }
    const e = build(rand(120, 180));
    if (!e) {
      schedule(rand(20000, 40000));
      return;
    }
    eye = e;
    raf = requestAnimationFrame(tick);
  };

  const schedule = (ms: number) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(spawn, ms);
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible' && eye) {
      remove(eye);
      eye = null;
      cancelAnimationFrame(raf);
    }
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      window.clearTimeout(timer);
      if (eye) {
        remove(eye);
        eye = null;
        cancelAnimationFrame(raf);
      }
    }
  });
  window.addEventListener('resize', () => {
    if (eye) {
      remove(eye);
      eye = null;
      cancelAnimationFrame(raf);
      schedule(rand(15000, 30000));
    }
  });

  schedule(rand(10000, 25000));
}
