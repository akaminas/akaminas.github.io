/**
 * Signature visual for the home page: a small stochastic simulation of two
 * populations connected by rare migration.
 *
 * Model (deliberately simple, but a real one):
 *   Each individual i lives in patch p_i ∈ {A, B} and has a location x_i
 *   (horizontal) and a trait value z_i (vertical). Both follow
 *   Ornstein–Uhlenbeck dynamics:
 *     dx = -k_x (x - c_p) dt + s_x dW      (returns to its patch centre)
 *     dz = -k_z (z - θ_p(t)) dt + s_z dW   (stabilising selection to the patch optimum)
 *   The optima θ_A(t), θ_B(t) drift slowly, so populations track a moving target.
 *   With probability m·dt per step an individual migrates: p_i flips, and the
 *   individual is then pulled to the other patch and selected towards the
 *   other optimum. Faint links join individuals that are close in (x, z).
 *
 * It is decorative: the canvas is aria-hidden and the page reads fully without it.
 * It respects prefers-reduced-motion (static frame), pauses when hidden or
 * off-screen, throttles to ~30 fps, caps device-pixel-ratio at 2, and can be
 * paused with an accessible button.
 */

interface Individual {
  x: number; // canvas-space location, in [0, 1]
  z: number; // trait, in [0, 1]
  p: 0 | 1; // patch
  age: number; // steps since last migration, for a brief highlight
  trail: number[]; // recent (x, z) pairs, newest last
}

const TRAIL = 14;

interface Params {
  n: number;
  kx: number;
  kz: number;
  sx: number;
  sz: number;
  m: number; // migration probability per step
  linkRadius: number; // fraction of canvas diagonal
  dt: number;
}

const DEFAULTS: Params = {
  n: 56,
  kx: 1.4,
  kz: 1.1,
  sx: 0.11,
  sz: 0.105,
  m: 0.0007,
  linkRadius: 0.075,
  dt: 1 / 30,
};

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

export function mountSystemField(root: HTMLElement): void {
  const canvas = root.querySelector<HTMLCanvasElement>('canvas');
  const button = root.querySelector<HTMLButtonElement>('button[data-toggle]');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = window.matchMedia('(max-width: 47.99rem)');
  const params: Params = { ...DEFAULTS, n: narrow.matches ? 40 : DEFAULTS.n };

  let width = 0;
  let height = 0;
  let dpr = 1;
  let colourA = '#a63e16';
  let colourB = '#33363c';
  let colourLink = 'rgba(0,0,0,0.12)';

  const centre = [0.27, 0.73]; // patch centres along x
  const theta = [0.42, 0.58]; // initial trait optima
  let t = 0;
  let migrations = 0;
  let frames = 0;
  const readouts = {
    t: root.querySelector<HTMLElement>('[data-readout="t"]'),
    mig: root.querySelector<HTMLElement>('[data-readout="migrations"]'),
    n: root.querySelector<HTMLElement>('[data-readout="n"]'),
    m: root.querySelector<HTMLElement>('[data-readout="m"]'),
  };
  const updateReadouts = () => {
    if (readouts.t) readouts.t.textContent = t.toFixed(1);
    if (readouts.mig) readouts.mig.textContent = String(migrations);
  };
  if (readouts.n) readouts.n.textContent = String(params.n);
  if (readouts.m) readouts.m.textContent = (params.m / params.dt).toFixed(3);

  const pop: Individual[] = [];
  const reset = () => {
    pop.length = 0;
    for (let i = 0; i < params.n; i++) {
      const p: 0 | 1 = i < params.n / 2 ? 0 : 1;
      pop.push({
        x: centre[p] + 0.09 * gaussian(),
        z: theta[p] + 0.07 * gaussian(),
        p,
        age: 999,
        trail: [],
      });
    }
  };

  const readColours = () => {
    colourA = cssVar(root, '--canvas-a', colourA);
    colourB = cssVar(root, '--canvas-b', colourB);
    colourLink = cssVar(root, '--canvas-link', colourLink);
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
  };

  const step = () => {
    const { kx, kz, sx, sz, m, dt } = params;
    t += dt;
    // Slowly drifting optima: the two patches favour different, moving trait values.
    const thA = 0.5 + 0.16 * Math.sin(0.11 * t);
    const thB = 0.5 - 0.16 * Math.sin(0.11 * t + 0.9);
    const sq = Math.sqrt(dt);
    for (const ind of pop) {
      const c = centre[ind.p];
      const th = ind.p === 0 ? thA : thB;
      ind.x += -kx * (ind.x - c) * dt + sx * sq * gaussian();
      ind.z += -kz * (ind.z - th) * dt + sz * sq * gaussian();
      // Keep inside the frame with soft reflection.
      if (ind.x < 0.03) ind.x = 0.03 + (0.03 - ind.x);
      if (ind.x > 0.97) ind.x = 0.97 - (ind.x - 0.97);
      if (ind.z < 0.06) ind.z = 0.06 + (0.06 - ind.z);
      if (ind.z > 0.94) ind.z = 0.94 - (ind.z - 0.94);
      ind.trail.push(ind.x, ind.z);
      if (ind.trail.length > TRAIL * 2) ind.trail.splice(0, 2);
      ind.age += 1;
      if (Math.random() < m) {
        ind.p = ind.p === 0 ? 1 : 0;
        ind.age = 0;
        migrations += 1;
      }
    }
    frames += 1;
    if (frames % 10 === 0) updateReadouts();
  };

  const draw = () => {
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, width, height); // transparent: the SVG grid beneath stays visible

    const r = params.linkRadius * Math.hypot(width, height);
    // Links (interaction network): pairs in the same patch closer than r.
    ctx.lineWidth = 1;
    ctx.strokeStyle = colourLink;
    ctx.beginPath();
    for (let i = 0; i < pop.length; i++) {
      const a = pop[i];
      const ax = a.x * width;
      const ay = a.z * height;
      for (let j = i + 1; j < pop.length; j++) {
        const b = pop[j];
        if (b.p !== a.p) continue;
        const bx = b.x * width;
        const by = b.z * height;
        const dx = ax - bx;
        const dy = ay - by;
        if (dx * dx + dy * dy < r * r) {
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
        }
      }
    }
    ctx.stroke();

    // Trails: short stochastic paths, faint; a recent migrant's path is drawn in its colour.
    ctx.lineWidth = 1;
    for (const ind of pop) {
      const n = ind.trail.length / 2;
      if (n < 2) continue;
      const recent = ind.age < 120;
      ctx.strokeStyle = ind.p === 0 ? colourA : colourB;
      ctx.globalAlpha = recent ? 0.55 : 0.16;
      ctx.beginPath();
      ctx.moveTo(ind.trail[0] * width, ind.trail[1] * height);
      for (let k = 1; k < n; k++) ctx.lineTo(ind.trail[2 * k] * width, ind.trail[2 * k + 1] * height);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Individuals
    for (const ind of pop) {
      const px = ind.x * width;
      const py = ind.z * height;
      const recent = ind.age < 60;
      ctx.beginPath();
      ctx.arc(px, py, recent ? 3.4 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = ind.p === 0 ? colourA : colourB;
      ctx.fill();
      if (recent) {
        ctx.beginPath();
        ctx.arc(px, py, 3.4 + (60 - ind.age) * 0.18, 0, Math.PI * 2);
        ctx.strokeStyle = ind.p === 0 ? colourA : colourB;
        ctx.globalAlpha = (ind.age / 60) * 0.45;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  };

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
    draw();
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

  const staticFrame = () => {
    // Burn in the process, then draw once with no trails.
    for (let i = 0; i < 240; i++) step();
    updateReadouts();
    draw();
  };

  // --- wiring ---
  readColours();
  reset();
  resize();
  staticFrame();

  const ro = new ResizeObserver(() => {
    resize();
    if (!running) staticFrame();
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
    if (reduced.matches) staticFrame();
  });
  const scheme = window.matchMedia('(prefers-color-scheme: dark)');
  scheme.addEventListener('change', () => {
    readColours();
    if (!running) staticFrame();
  });
  if (button) {
    button.hidden = reduced.matches;
    button.addEventListener('click', () => {
      userPaused = !userPaused;
      update();
    });
  }
  update();
}
