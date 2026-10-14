/**
 * The home-page model: an isometric voxel archipelago running a small
 * island-biogeography simulation on a canvas.
 *
 * A mainland on the left holds a pool of lineages, each a coloured block in one
 * of Vellum's six hue families. Every absent lineage reaches an island at a
 * rate that falls with the island's distance; every present lineage goes
 * extinct at a rate that falls with the island's area; on large islands a
 * lineage now and then splits into an endemic one. Near, large islands fill up;
 * far, small ones stay sparse. Nothing is stored and nothing leaves the page.
 *
 * Colours are read from the custom properties in src/styles/site.css, so the
 * model follows the theme. Under prefers-reduced-motion the model is run to
 * equilibrium once and drawn still.
 */
import { mulberry32 } from '../lib/rand';

type Family = 'teal' | 'terracotta' | 'indigo' | 'ochre' | 'mauve' | 'moss';
const FAMILIES: Family[] = ['teal', 'terracotta', 'indigo', 'ochre', 'mauve', 'moss'];

interface Faces {
  top: string;
  left: string;
  right: string;
}
interface Palette {
  land: Faces;
  edge: string;
  ripple: string;
  surface: string;
  fam: Record<Family, { tint: string; tone: string; deep: string }>;
}
interface Cell {
  i: number;
  j: number;
  h: number;
}
interface Species {
  id: number;
  family: Family;
  variant: number;
  endemic: boolean;
}
interface Occupant {
  sp: Species;
  cell: Cell;
  born: number;
  dying: number | null;
}
interface Island {
  ci: number;
  cj: number;
  r: number;
  cells: Cell[];
  dist: number;
  area: number;
  present: Map<number, Occupant>;
  inflight: Set<number>;
}
interface Propagule {
  sp: Species;
  island: Island;
  from: Cell;
  to: Cell;
  t0: number;
  dur: number;
}

const I_MAX = 23;
const J_MAX = 10;
const POOL = 18;
const IMM = 0.055; // immigration rate per absent lineage at zero distance, per second
const EXT = 0.13; // extinction rate per present lineage per unit of area, per second
const DIV = 0.003; // in-situ diversification rate per present lineage on large islands, per second
const POP = 0.4; // seconds for a block to appear
const SINK = 0.55; // seconds for a block to sink away

function readPalette(): Palette {
  const cs = getComputedStyle(document.documentElement);
  const v = (n: string) => cs.getPropertyValue(n).trim() || '#808080';
  const fam = {} as Palette['fam'];
  for (const f of FAMILIES) fam[f] = { tint: v(`--v-${f}-tint`), tone: v(`--v-${f}`), deep: v(`--v-${f}-deep`) };
  return {
    land: { top: v('--land-top'), left: v('--land-left'), right: v('--land-right') },
    edge: v('--land-edge'),
    ripple: v('--ripple'),
    surface: v('--v-surface'),
    fam,
  };
}

function facesFor(p: Palette, sp: Species): Faces {
  const f = p.fam[sp.family];
  if (sp.variant === 1) return { top: f.tint, left: f.tint, right: f.tone };
  if (sp.variant === 2) return { top: f.tone, left: f.deep, right: f.deep };
  return { top: f.tint, left: f.tone, right: f.deep };
}

class Model {
  rnd: () => number;
  t = 0;
  mainland: Cell[] = [];
  islands: Island[] = [];
  pool: Species[] = [];
  mainlandSlots = new Map<number, Cell>();
  propagules: Propagule[] = [];
  nextId = POOL;

  constructor(seed: number) {
    this.rnd = mulberry32(seed);
    const rnd = this.rnd;
    for (let j = 0; j < J_MAX; j++) {
      const coast = 3 + Math.round(Math.sin(j * 1.1 + 0.4) * 1.2 + (rnd() - 0.5));
      for (let i = 0; i <= coast; i++) this.mainland.push({ i, j, h: i <= 1 ? 2 : 1 });
    }
    const defs = [
      { ci: 9.5, cj: 2.5, r: 2.3 },
      { ci: 10.5, cj: 7.5, r: 1.3 },
      { ci: 15, cj: 4.5, r: 1.9 },
      { ci: 19.5, cj: 1.5, r: 1.2 },
      { ci: 21, cj: 7, r: 1.6 },
    ];
    for (const d of defs) {
      const cells: Cell[] = [];
      for (let i = Math.floor(d.ci - d.r - 1); i <= Math.ceil(d.ci + d.r + 1); i++) {
        for (let j = Math.floor(d.cj - d.r - 1); j <= Math.ceil(d.cj + d.r + 1); j++) {
          if (j < 0 || j >= J_MAX || i >= I_MAX) continue;
          const dd = Math.hypot(i - d.ci, j - d.cj) + (rnd() - 0.5) * 0.5;
          if (dd <= d.r) cells.push({ i, j, h: dd <= d.r - 1.1 ? 2 : 1 });
        }
      }
      cells.sort((a, b) => b.h - a.h || a.i + a.j - (b.i + b.j));
      this.islands.push({ ...d, cells, dist: d.ci - 4, area: cells.length, present: new Map(), inflight: new Set() });
    }
    for (let k = 0; k < POOL; k++) this.pool.push({ id: k, family: FAMILIES[k % 6], variant: Math.floor(k / 6), endemic: false });
    const slots = this.mainland.filter((c) => c.h === 2).concat(this.mainland.filter((c) => c.h === 1));
    for (let k = slots.length - 1; k > 0; k--) {
      const m = Math.floor(rnd() * (k + 1));
      [slots[k], slots[m]] = [slots[m], slots[k]];
    }
    this.pool.forEach((sp, k) => this.mainlandSlots.set(sp.id, slots[k]));
  }

  freeCell(isl: Island): Cell | null {
    const taken = new Set([...isl.present.values()].map((o) => o.cell));
    return isl.cells.find((c) => !taken.has(c)) ?? null;
  }

  /** Advance the model by dt seconds. With animate, arrivals fly and losses sink; without, they happen at once. */
  step(dt: number, animate: boolean): void {
    const rnd = this.rnd;
    this.t += dt;
    const now = this.t;
    for (const isl of this.islands) {
      const lam = IMM / (1 + (isl.dist / 5) ** 2);
      const mu = EXT / isl.area;
      for (const sp of this.pool) {
        if (isl.present.has(sp.id) || isl.inflight.has(sp.id)) continue;
        if (rnd() >= lam * dt) continue;
        const to = this.freeCell(isl);
        if (!to) continue;
        if (animate) {
          const from = this.mainlandSlots.get(sp.id) ?? this.mainland[0];
          isl.inflight.add(sp.id);
          this.propagules.push({ sp, island: isl, from, to, t0: now, dur: 0.9 + isl.dist * 0.06 });
        } else {
          isl.present.set(sp.id, { sp, cell: to, born: now - POP, dying: null });
        }
      }
      for (const [id, occ] of isl.present) {
        if (occ.dying !== null) continue;
        if (rnd() < mu * dt) {
          if (animate) occ.dying = now;
          else isl.present.delete(id);
          continue;
        }
        if (isl.area >= 8 && rnd() < DIV * dt) {
          const to = this.freeCell(isl);
          if (!to) continue;
          const sp: Species = { id: this.nextId++, family: occ.sp.family, variant: (occ.sp.variant + 1) % 3, endemic: true };
          isl.present.set(sp.id, { sp, cell: to, born: animate ? now : now - POP, dying: null });
        }
      }
      if (animate) {
        for (const [id, occ] of isl.present) {
          if (occ.dying !== null && now - occ.dying >= SINK) isl.present.delete(id);
        }
      }
    }
    if (animate) {
      this.propagules = this.propagules.filter((p) => {
        if (now - p.t0 < p.dur) return true;
        p.island.inflight.delete(p.sp.id);
        const taken = [...p.island.present.values()].some((o) => o.cell === p.to);
        const cell = taken ? this.freeCell(p.island) : p.to;
        if (cell) p.island.present.set(p.sp.id, { sp: p.sp, cell, born: now, dying: null });
        return false;
      });
    }
  }
}

class View {
  ctx: CanvasRenderingContext2D;
  pal: Palette;
  W = 0;
  H = 0;
  u = 10;
  ox = 0;
  oy = 0;

  constructor(public canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('no 2d context');
    this.ctx = ctx;
    this.pal = readPalette();
  }

  resize(): void {
    const r = this.canvas.getBoundingClientRect();
    this.W = Math.max(1, r.width);
    this.H = Math.max(1, r.height);
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.canvas.width = Math.round(this.W * dpr);
    this.canvas.height = Math.round(this.H * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.u = Math.min(this.W / 34, this.H / 20);
    this.ox = this.W / 2 - 6.5 * this.u;
    this.oy = this.H / 2 - 6.75 * this.u;
  }

  base(i: number, j: number): [number, number] {
    return [this.ox + (i - j) * this.u, this.oy + ((i + j) * this.u) / 2];
  }

  prism(x: number, y: number, hb: number, ht: number, s: number, faces: Faces, edge: string, alpha = 1, gloss = false): void {
    const ctx = this.ctx;
    const T: [number, number] = [x, y - ht * s];
    const R: [number, number] = [x + s, y + s / 2 - ht * s];
    const B: [number, number] = [x, y + s - ht * s];
    const L: [number, number] = [x - s, y + s / 2 - ht * s];
    const Rb: [number, number] = [x + s, y + s / 2 - hb * s];
    const Bb: [number, number] = [x, y + s - hb * s];
    const Lb: [number, number] = [x - s, y + s / 2 - hb * s];
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 1;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = edge;
    const face = (p: [number, number][], fill: string, a0: number, a1: number) => {
      ctx.beginPath();
      ctx.moveTo(p[0][0], p[0][1]);
      for (let k = 1; k < p.length; k++) ctx.lineTo(p[k][0], p[k][1]);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      if (a1 > 0) {
        const ys = p.map((q) => q[1]);
        const g = ctx.createLinearGradient(0, Math.min(...ys), 0, Math.max(...ys));
        g.addColorStop(0, `rgba(0,0,0,${a0})`);
        g.addColorStop(1, `rgba(0,0,0,${a1})`);
        ctx.fillStyle = g;
        ctx.fill();
      }
      ctx.stroke();
    };
    face([L, B, Bb, Lb], faces.left, 0, 0.14);
    face([B, R, Rb, Bb], faces.right, 0.05, 0.24);
    face([T, R, B, L], faces.top, 0, 0);
    if (gloss) {
      ctx.beginPath();
      ctx.moveTo(T[0], T[1]);
      ctx.lineTo(L[0], L[1]);
      ctx.lineTo(x, y + s / 2 - ht * s);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,0.28)';
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  draw(m: Model): void {
    const { ctx, u, pal } = this;
    const now = m.t;
    ctx.clearRect(0, 0, this.W, this.H);

    // Ripples around each island.
    ctx.strokeStyle = pal.ripple;
    ctx.lineWidth = 1;
    for (const isl of m.islands) {
      const [cx, cy] = this.base(isl.ci, isl.cj);
      for (const [k, a] of [
        [0.9, 0.95],
        [1.8, 0.5],
      ]) {
        const rx = (isl.r + k) * u * 1.95;
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.ellipse(cx, cy + u / 2, rx, rx / 2, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;

    type Item = { key: number; draw: () => void };
    const items: Item[] = [];
    const landCells = m.mainland.concat(...m.islands.map((i) => i.cells));
    for (const c of landCells) {
      const [x, y] = this.base(c.i, c.j);
      items.push({ key: c.i + c.j, draw: () => this.prism(x, y, 0, c.h, u, pal.land, pal.edge) });
    }
    const block = (sp: Species, cell: Cell, scale: number, alpha: number, sink: number) => {
      const [x, y] = this.base(cell.i, cell.j);
      const s = u * 0.74 * scale;
      const yb = y + u / 2 - cell.h * u - s / 2 + sink;
      this.prism(x, yb, 0, 1, s, facesFor(pal, sp), pal.surface, alpha, true);
      if (sp.endemic) {
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.ellipse(x, yb + s / 2 - s, s * 0.32, s * 0.16, 0, 0, Math.PI * 2);
        ctx.strokeStyle = pal.surface;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    };
    for (const sp of m.pool) {
      const cell = m.mainlandSlots.get(sp.id);
      if (cell) items.push({ key: cell.i + cell.j + 0.5, draw: () => block(sp, cell, 1, 1, 0) });
    }
    for (const isl of m.islands) {
      for (const occ of isl.present.values()) {
        const { cell } = occ;
        let scale = 1;
        let alpha = 1;
        let sink = 0;
        if (occ.dying !== null) {
          const p = Math.min(1, (now - occ.dying) / SINK);
          alpha = 1 - p;
          sink = p * u * 0.7;
        } else {
          const p = Math.min(1, (now - occ.born) / POP);
          const q = 1 - p;
          scale = 1 + 2.2 * q * q * q - 3.2 * q * q; // ease out back
          if (scale < 0.02) scale = 0.02;
        }
        items.push({ key: cell.i + cell.j + 0.5, draw: () => block(occ.sp, cell, scale, alpha, sink) });
      }
    }
    items.sort((a, b) => a.key - b.key);
    for (const it of items) it.draw();

    // Propagules in flight, above everything.
    for (const p of m.propagules) {
      const t = Math.min(1, (now - p.t0) / p.dur);
      const [x0, y0] = this.base(p.from.i, p.from.j);
      const [x1, y1] = this.base(p.to.i, p.to.j);
      const sx = x0;
      const sy = y0 + u / 2 - p.from.h * u - u * 0.74;
      const ex = x1;
      const ey = y1 + u / 2 - p.to.h * u - u * 0.3;
      const x = sx + (ex - sx) * t;
      const y = sy + (ey - sy) * t - Math.sin(Math.PI * t) * u * 2.6;
      ctx.beginPath();
      ctx.arc(x, y, u * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = pal.fam[p.sp.family].tone;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = pal.surface;
      ctx.stroke();
    }
  }
}

export function mountArchipelago(canvas: HTMLCanvasElement): void {
  const model = new Model(20261014);
  const view = new View(canvas);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Warm up: a long run for a still picture, a short one so the near islands are not empty at first paint.
  const warm = reduce ? 6000 : 120;
  for (let k = 0; k < warm; k++) model.step(0.1, false);

  const redraw = () => view.draw(model);
  const onResize = () => {
    view.resize();
    redraw();
  };
  onResize();
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(onResize).observe(canvas.parentElement ?? canvas);
  else window.addEventListener('resize', onResize);

  const recolour = () => {
    view.pal = readPalette();
    redraw();
  };
  new MutationObserver(recolour).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', recolour);

  if (reduce) return;

  let running = false;
  let raf = 0;
  let last = 0;
  const frame = (ts: number) => {
    if (!running) return;
    const dt = last ? Math.min(0.1, (ts - last) / 1000) : 0;
    last = ts;
    model.step(dt, true);
    view.draw(model);
    raf = requestAnimationFrame(frame);
  };
  let visible = true;
  let onScreen = true;
  const sync = () => {
    const should = visible && onScreen;
    if (should && !running) {
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    } else if (!should && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  };
  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
    sync();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((e) => e.isIntersecting);
        sync();
      },
      { threshold: 0.05 },
    ).observe(canvas);
  }
  sync();
}
