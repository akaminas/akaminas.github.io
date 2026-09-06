/**
 * Signature visual for the home page: isolated populations climbing a slowly
 * shifting adaptive landscape, drawn as a live contour map.
 *
 * Model (deliberately small, but a real one):
 *   Trait space z = (z₁, z₂) ∈ [0, 1]². The adaptive landscape is a sum of K
 *   Gaussian peaks whose positions θ_k(t) and heights h_k(t) change slowly:
 *
 *     W̄(z̄, t) = ε + Σ_k h_k(t) · exp( −‖z̄ − θ_k(t)‖² / (2 (ω_k² + P)) )
 *
 *   For a population with a Gaussian phenotype distribution of (isotropic)
 *   variance P on a Gaussian peak of width ω_k, the mean fitness has exactly this
 *   form; the constant factor ω_k²/(ω_k² + P) is absorbed into h_k, and ε is a
 *   small floor so that ln W̄ is finite everywhere.
 *
 *   Each of M isolated populations j lives in its own local environment, which
 *   displaces every optimum by a fixed offset δ_j (local adaptation), and has a
 *   mean phenotype z̄_j that follows Lande's equation for the response to
 *   selection with an isotropic G matrix (G = g_j·I), written in continuous time:
 *
 *     dz̄_j / dt = g_j · ∇ ln W̄(z̄_j − δ_j, t)
 *
 *   Populations on different sides of a ridge climb different peaks, and
 *   populations on the same peak settle at slightly different points because
 *   their local optima differ. Because the peaks drift, rise and sink, a
 *   population can find its peak flattening under it and slide to a neighbour:
 *   a peak shift, briefly highlighted.
 *
 * Numerics: the gradient is analytic; integration is a midpoint (RK2) step with
 * a capped step length so the flow stays smooth whatever the frame rate. The
 * contours are ln W̄ at fixed levels, extracted by marching squares on a grid
 * that follows the canvas size.
 *
 * It is decorative: the canvas is aria-hidden and the page reads fully without
 * it. It respects prefers-reduced-motion (static frame), pauses when hidden or
 * off-screen, throttles to ~30 fps, caps device-pixel-ratio at 2, and can be
 * paused with an accessible button.
 */

interface Peak {
  /** Resting centre of the peak in trait space. */
  base: [number, number];
  /** Drift amplitude and angular frequencies for the slow wander of the centre. */
  amp: number;
  wx: number;
  wy: number;
  px: number;
  py: number;
  /** Angular frequency and phase of the slow rise and fall of the height. */
  wh: number;
  ph: number;
  /** Effective width squared, ω² + P. */
  s2: number;
  // Current state (updated each step).
  x: number;
  y: number;
  h: number;
}

interface Population {
  x: number;
  y: number;
  /** Local environmental offset δ_j of this population's optima. */
  ox: number;
  oy: number;
  /** Additive genetic variance g_j (rate of response). */
  g: number;
  /** Index of the peak that contributes most to its mean fitness. */
  peak: number;
  /** Steps since the last peak shift; large at start so nothing is highlighted. */
  age: number;
  /** Recent positions, newest last, stored every TRAIL_EVERY steps. */
  trail: number[];
}

interface Params {
  /** Number of isolated populations. */
  m: number;
  /** Median additive genetic variance (isotropic G = g·I); sets the speed of climbing. */
  g: number;
  /** Standard deviation of the per-population environmental offset δ_j. */
  offsetSd: number;
  /** Fitness floor ε. */
  eps: number;
  /** Model time per animation frame. */
  dt: number;
  /** Maximum displacement per frame, in trait units, for numerical safety. */
  maxStep: number;
  /** Contour levels of ln W̄: lowest level, count and spacing. */
  levelMin: number;
  levelCount: number;
  levelStep: number;
  /** Target contour-grid cell size in CSS pixels. */
  cell: number;
  /** Rebuild the contour paths every this many frames (the landscape moves slowly). */
  contourEvery: number;
}

const TRAIL_POINTS = 36;
const TRAIL_EVERY = 4;
const HIGHLIGHT_STEPS = 120;

const DEFAULTS: Params = {
  m: 30,
  g: 0.0042,
  offsetSd: 0.04,
  eps: 0.002,
  dt: 1 / 30,
  maxStep: 0.004,
  levelMin: -4.6,
  levelCount: 15,
  levelStep: 0.34,
  cell: 5.5,
  contourEvery: 3,
};

/** Three peaks, spaced so that a sunken peak's basin is captured by a neighbour. */
function makePeaks(): Peak[] {
  const two = Math.PI * 2;
  const spec: Array<[number, number, number, number, number]> = [
    // base x, base y, width ω, height period (s), height phase
    [0.33, 0.4, 0.115, 110, 0.6],
    [0.67, 0.34, 0.125, 140, 2.9],
    [0.5, 0.69, 0.105, 95, 4.6],
  ];
  const P = 0.045 * 0.045;
  return spec.map(([bx, by, w, T, ph], k) => ({
    base: [bx, by],
    amp: 0.06,
    wx: two / (62 + 17 * k),
    wy: two / (81 + 13 * k),
    px: 1.1 * k,
    py: 2.3 * k + 0.7,
    wh: two / T,
    ph,
    s2: w * w + P,
    x: bx,
    y: by,
    h: 1,
  }));
}

function gaussian(): number {
  // Box–Muller
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function cssVar(el: Element, name: string, fallback: string): string {
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  return v || fallback;
}

/** Parse "#rrggbb" to "r, g, b" for use in rgba(); falls back to the string as given. */
function rgb(hex: string): string {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export function mountSystemField(root: HTMLElement): void {
  const canvas = root.querySelector<HTMLCanvasElement>('canvas');
  const button = root.querySelector<HTMLButtonElement>('button[data-toggle]');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = window.matchMedia('(max-width: 47.99rem)');
  const params: Params = narrow.matches ? { ...DEFAULTS, m: 22, cell: 7 } : { ...DEFAULTS };

  let width = 0;
  let height = 0;
  let dpr = 1;
  let colContour = '141, 147, 140';
  let colPop = '70, 82, 92';
  let colShift = '178, 106, 74';

  const peaks = makePeaks();
  const pops: Population[] = [];
  let t = 0;
  let shifts = 0;
  let frames = 0;

  const readouts = {
    t: root.querySelector<HTMLElement>('[data-readout="t"]'),
    shifts: root.querySelector<HTMLElement>('[data-readout="shifts"]'),
    m: root.querySelector<HTMLElement>('[data-readout="m"]'),
    k: root.querySelector<HTMLElement>('[data-readout="k"]'),
  };
  const updateReadouts = () => {
    if (readouts.t) readouts.t.textContent = t.toFixed(1);
    if (readouts.shifts) readouts.shifts.textContent = String(shifts);
  };
  if (readouts.m) readouts.m.textContent = String(params.m);
  if (readouts.k) readouts.k.textContent = String(peaks.length);

  // --- model ---

  const updatePeaks = (time: number) => {
    for (const p of peaks) {
      p.x = p.base[0] + p.amp * Math.sin(p.wx * time + p.px);
      p.y = p.base[1] + p.amp * Math.cos(p.wy * time + p.py);
      const s = 0.5 + 0.5 * Math.sin(p.wh * time + p.ph);
      p.h = 0.03 + 0.97 * s * s; // rises and sinks, lingering near the floor
    }
  };

  /** Mean fitness W̄ and its gradient at (x, y); also the dominant peak. */
  const fitness = (x: number, y: number): { w: number; gx: number; gy: number; peak: number } => {
    let w = params.eps;
    let gx = 0;
    let gy = 0;
    let best = 0;
    let bestW = -1;
    for (let k = 0; k < peaks.length; k++) {
      const p = peaks[k];
      const dx = x - p.x;
      const dy = y - p.y;
      const wk = p.h * Math.exp(-(dx * dx + dy * dy) / (2 * p.s2));
      w += wk;
      gx -= (wk * dx) / p.s2;
      gy -= (wk * dy) / p.s2;
      if (wk > bestW) {
        bestW = wk;
        best = k;
      }
    }
    return { w, gx, gy, peak: best };
  };

  const lnW = (x: number, y: number): number => {
    let w = params.eps;
    for (const p of peaks) {
      const dx = x - p.x;
      const dy = y - p.y;
      w += p.h * Math.exp(-(dx * dx + dy * dy) / (2 * p.s2));
    }
    return Math.log(w);
  };

  /** Velocity of a population mean: g_j ∇ ln W̄ at (z̄ − δ_j), capped in length. */
  const velocity = (q: Population, x: number, y: number): [number, number] => {
    const f = fitness(x - q.ox, y - q.oy);
    let vx = (q.g * f.gx) / f.w;
    let vy = (q.g * f.gy) / f.w;
    const cap = params.maxStep / params.dt;
    const v = Math.hypot(vx, vy);
    if (v > cap) {
      vx *= cap / v;
      vy *= cap / v;
    }
    return [vx, vy];
  };

  const reset = () => {
    pops.length = 0;
    for (let i = 0; i < params.m; i++) {
      pops.push({
        x: 0.06 + 0.88 * Math.random(),
        y: 0.08 + 0.84 * Math.random(),
        ox: params.offsetSd * gaussian(),
        oy: params.offsetSd * gaussian(),
        g: params.g * Math.exp(0.3 * gaussian()),
        peak: -1,
        age: 9999,
        trail: [],
      });
    }
    t = 0;
    shifts = 0;
    updatePeaks(0);
    for (const q of pops) q.peak = fitness(q.x - q.ox, q.y - q.oy).peak;
  };

  const step = () => {
    const { dt } = params;
    t += dt;
    updatePeaks(t);
    for (const q of pops) {
      // Midpoint (RK2) step of dz̄/dt = g ∇ ln W̄.
      const [v1x, v1y] = velocity(q, q.x, q.y);
      const mx = q.x + 0.5 * dt * v1x;
      const my = q.y + 0.5 * dt * v1y;
      const [v2x, v2y] = velocity(q, mx, my);
      q.x += dt * v2x;
      q.y += dt * v2y;
      // The landscape is defined everywhere; keep the drawing inside the frame.
      if (q.x < 0.02) q.x = 0.02;
      if (q.x > 0.98) q.x = 0.98;
      if (q.y < 0.03) q.y = 0.03;
      if (q.y > 0.97) q.y = 0.97;
      q.age += 1;
      const dom = fitness(q.x - q.ox, q.y - q.oy).peak;
      if (dom !== q.peak) {
        q.peak = dom;
        if (q.age > HIGHLIGHT_STEPS) shifts += 1;
        q.age = 0;
      }
      if (frames % TRAIL_EVERY === 0) {
        q.trail.push(q.x, q.y);
        if (q.trail.length > TRAIL_POINTS * 2) q.trail.splice(0, 2);
      }
    }
    frames += 1;
    if (frames % 10 === 0) updateReadouts();
  };

  // --- contour extraction ---

  let nx = 2;
  let ny = 2;
  let grid = new Float32Array(4);

  const gridResize = () => {
    nx = Math.max(8, Math.min(160, Math.round(width / params.cell) + 1));
    ny = Math.max(8, Math.min(160, Math.round(height / params.cell) + 1));
    grid = new Float32Array(nx * ny);
  };

  const gridFill = () => {
    for (let j = 0; j < ny; j++) {
      const y = j / (ny - 1);
      for (let i = 0; i < nx; i++) {
        grid[j * nx + i] = lnW(i / (nx - 1), y);
      }
    }
  };

  /**
   * Marching squares for one level. Edge numbering per cell: 0 bottom (a–b),
   * 1 right (b–c), 2 top (d–c), 3 left (a–d), with a = (i, j), b = (i+1, j),
   * c = (i+1, j+1), d = (i, j+1). Saddle cells use the centre value.
   */
  const contour = (level: number): Path2D => {
    const path = new Path2D();
    const sx = width / (nx - 1);
    const sy = height / (ny - 1);
    for (let j = 0; j < ny - 1; j++) {
      for (let i = 0; i < nx - 1; i++) {
        const a = grid[j * nx + i];
        const b = grid[j * nx + i + 1];
        const c = grid[(j + 1) * nx + i + 1];
        const d = grid[(j + 1) * nx + i];
        const idx = (a > level ? 1 : 0) | (b > level ? 2 : 0) | (c > level ? 4 : 0) | (d > level ? 8 : 0);
        if (idx === 0 || idx === 15) continue;
        const x0 = i * sx;
        const y0 = j * sy;
        // Crossing point on each edge (only computed when needed).
        const pt = (edge: number): [number, number] => {
          switch (edge) {
            case 0:
              return [x0 + (sx * (level - a)) / (b - a), y0];
            case 1:
              return [x0 + sx, y0 + (sy * (level - b)) / (c - b)];
            case 2:
              return [x0 + (sx * (level - d)) / (c - d), y0 + sy];
            default:
              return [x0, y0 + (sy * (level - a)) / (d - a)];
          }
        };
        const seg = (e0: number, e1: number) => {
          const p = pt(e0);
          const q = pt(e1);
          path.moveTo(p[0], p[1]);
          path.lineTo(q[0], q[1]);
        };
        switch (idx) {
          case 1:
          case 14:
            seg(3, 0);
            break;
          case 2:
          case 13:
            seg(0, 1);
            break;
          case 3:
          case 12:
            seg(3, 1);
            break;
          case 4:
          case 11:
            seg(1, 2);
            break;
          case 6:
          case 9:
            seg(0, 2);
            break;
          case 7:
          case 8:
            seg(3, 2);
            break;
          case 5:
          case 10: {
            const centreAbove = (a + b + c + d) / 4 > level;
            const isolateAC = idx === 5 ? !centreAbove : centreAbove;
            if (isolateAC) {
              seg(3, 0);
              seg(1, 2);
            } else {
              seg(0, 1);
              seg(3, 2);
            }
            break;
          }
        }
      }
    }
    return path;
  };

  let contours: Path2D[] = [];
  let contourAge = Infinity;
  const refreshContours = (force: boolean) => {
    if (!force && contourAge < params.contourEvery) {
      contourAge += 1;
      return;
    }
    gridFill();
    contours = [];
    for (let l = 0; l < params.levelCount; l++) contours.push(contour(params.levelMin + l * params.levelStep));
    contourAge = 1;
  };

  // --- drawing ---

  const readColours = () => {
    colContour = rgb(cssVar(root, '--canvas-contour', '#8d938c'));
    colPop = rgb(cssVar(root, '--canvas-pop', '#46525c'));
    colShift = rgb(cssVar(root, '--canvas-shift', '#b26a4a'));
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    gridResize();
    contourAge = Infinity; // rebuild the contours for the new size on the next draw
  };

  const draw = (withTrails: boolean) => {
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, width, height); // transparent: the SVG grid beneath stays visible

    // Landscape: contours of ln W̄, fainter towards the floor, denser on steep flanks.
    refreshContours(!withTrails);
    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';
    for (let l = 0; l < contours.length; l++) {
      const a = 0.16 + 0.6 * (l / (params.levelCount - 1));
      ctx.strokeStyle = `rgba(${colContour}, ${a.toFixed(3)})`;
      ctx.stroke(contours[l]);
    }

    // Peak summits: a small cross, fading as the peak sinks.
    for (const p of peaks) {
      const px = p.x * width;
      const py = p.y * height;
      ctx.strokeStyle = `rgba(${colContour}, ${(0.25 + 0.6 * p.h).toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(px - 4, py);
      ctx.lineTo(px + 4, py);
      ctx.moveTo(px, py - 4);
      ctx.lineTo(px, py + 4);
      ctx.stroke();
    }

    // Trails: the recent path of each population mean, fading towards its start
    // (one stroke per trail; the fade is a gradient from oldest to newest point).
    if (withTrails) {
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';
      for (const q of pops) {
        const n = q.trail.length / 2;
        if (n < 2) continue;
        const recent = q.age < HIGHLIGHT_STEPS;
        const col = recent ? colShift : colPop;
        const x0 = q.trail[0] * width;
        const y0 = q.trail[1] * height;
        const x1 = q.trail[2 * n - 2] * width;
        const y1 = q.trail[2 * n - 1] * height;
        if (Math.hypot(x1 - x0, y1 - y0) < 1) continue;
        const grad = ctx.createLinearGradient(x0, y0, x1, y1);
        grad.addColorStop(0, `rgba(${col}, 0)`);
        grad.addColorStop(1, `rgba(${col}, ${recent ? 0.7 : 0.32})`);
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        for (let k = 1; k < n; k++) ctx.lineTo(q.trail[2 * k] * width, q.trail[2 * k + 1] * height);
        ctx.stroke();
      }
    }

    // Population means: a dot with a soft halo for the phenotypic spread.
    for (const q of pops) {
      const px = q.x * width;
      const py = q.y * height;
      const recent = q.age < HIGHLIGHT_STEPS;
      const col = recent ? colShift : colPop;
      const fade = recent ? 1 - q.age / HIGHLIGHT_STEPS : 0;
      ctx.beginPath();
      ctx.arc(px, py, 9 + 6 * fade, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col}, ${(0.07 + 0.1 * fade).toFixed(3)})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(px, py, 2.6 + 0.8 * fade, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col}, 0.92)`;
      ctx.fill();
    }
  };

  // --- loop and wiring ---

  let running = false;
  let userPaused = false;
  let visible = true;
  let inView = true;
  let raf = 0;
  let last = 0;
  const frameInterval = 1000 / 30;

  const loop = (now: number) => {
    if (!running) return;
    raf = requestAnimationFrame(loop);
    if (now - last < frameInterval) return;
    last = now;
    step();
    draw(true);
  };

  const shouldRun = () => !userPaused && visible && inView && !reduced.matches;

  const update = () => {
    const want = shouldRun();
    if (want && !running) {
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    } else if (!want && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
    if (button) {
      button.setAttribute('aria-pressed', String(userPaused));
      button.textContent = userPaused ? 'Play simulation' : 'Pause simulation';
    }
  };

  const staticFrame = (burnIn: number) => {
    // Run the model for a while, then draw once without trails or highlights.
    for (let i = 0; i < burnIn; i++) step();
    for (const q of pops) q.age = 9999;
    shifts = 0; // basin crossings during the initial climb are not peak shifts
    updateReadouts();
    draw(false);
  };

  readColours();
  reset();
  resize();
  // Live: a short burn-in so the first frames show populations still climbing.
  // Reduced motion: a long one, so the single frame shows a settled landscape.
  staticFrame(reduced.matches ? 900 : 90);

  const ro = new ResizeObserver(() => {
    resize();
    if (!running) draw(false);
  });
  ro.observe(canvas);

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries.some((e) => e.isIntersecting);
        update();
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);
  }
  document.addEventListener('visibilitychange', () => {
    visible = document.visibilityState === 'visible';
    update();
  });
  reduced.addEventListener('change', () => {
    update();
    if (reduced.matches) draw(false);
  });
  const recolour = () => {
    readColours();
    if (!running) draw(false);
  };
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', recolour);
  document.addEventListener('themechange', recolour);
  if (button) {
    button.hidden = reduced.matches;
    button.addEventListener('click', () => {
      userPaused = !userPaused;
      update();
    });
  }
  update();
}
