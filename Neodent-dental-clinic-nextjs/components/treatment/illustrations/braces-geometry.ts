import type { Pt } from "./geometry";

/* ------------------------------------------------------------------
   Braces geometry.

   1. Tooth-offset presets for the frontal arch. The kit's ArchFront takes a
      per-tooth { dx, dy, rot }; every braces scene picks one of these
      presets, so the same arch (crowded, partly aligned, near aligned ...)
      appears wherever the page talks about it. Index 0..9 runs from the
      upper left second premolar to the right one, as in ArchFront.

   2. The occlusal (top-down) arch used by the two retainer scenes and the
      removable appliance: 14 teeth along one superellipse centre line,
      middle of the front at the origin, the back of the mouth towards
      negative y.
   ------------------------------------------------------------------ */

export type Off = { dx?: number; dy?: number; rot?: number };
export type Offsets = Record<number, Off>;
export type ArchOffsets = { upper: Offsets; lower: Offsets };
export type BracesPreset = "natural" | "mild" | "crowded" | "partly" | "near";

/** Teeth that sit out of line before treatment (also the arrows in B5a). */
const CROWDED: ArchOffsets = {
  upper: {
    1: { dx: -3, rot: -5 },
    2: { dx: -11, dy: -5, rot: -10 },
    3: { dx: 7, dy: 1, rot: 19 },
    4: { dx: 2, rot: -7 },
    5: { dx: -1, dy: 2, rot: 6 },
    6: { dx: -6, dy: -2, rot: -17 },
    7: { dx: 11, dy: -5, rot: 9 },
    8: { dx: 4, rot: 5 },
  },
  lower: {
    2: { dx: -5, dy: -3, rot: -9 },
    3: { dx: 5, rot: 15 },
    4: { dx: 2, rot: -11 },
    5: { dx: -2, dy: 1, rot: 12 },
    6: { dx: -5, rot: -17 },
    7: { dx: 6, dy: -3, rot: 8 },
  },
};

export const scaleOffsets = (o: Offsets, k: number): Offsets => {
  const out: Offsets = {};
  for (const key of Object.keys(o)) {
    const v = o[Number(key)];
    out[Number(key)] = { dx: (v.dx ?? 0) * k, dy: (v.dy ?? 0) * k, rot: (v.rot ?? 0) * k };
  }
  return out;
};

export const PRESETS: Record<BracesPreset, ArchOffsets> = {
  natural: { upper: {}, lower: {} },
  /* two teeth slightly turned, everything else in line (overview, options) */
  mild: { upper: { 3: { dx: 2, rot: 12 } }, lower: { 6: { dx: -1, rot: -10 } } },
  crowded: CROWDED,
  /* about 40% of the way to the planned positions */
  partly: { upper: scaleOffsets(CROWDED.upper, 0.4), lower: scaleOffsets(CROWDED.lower, 0.4) },
  /* nearly there, with the small variation a real arch keeps */
  near: {
    upper: {
      2: { rot: -1.6 },
      3: { dx: 0.6, rot: 2.8 },
      4: { rot: -0.8 },
      5: { rot: 1.6, dy: 0.8 },
      6: { dx: -0.6, rot: -2.4 },
      7: { rot: 1.4, dy: -1 },
    },
    lower: { 3: { rot: -2.2 }, 4: { rot: 1.8 }, 5: { rot: -1 }, 6: { rot: 2.4 }, 7: { dy: -0.8, rot: 1 } },
  },
};

/* ================= occlusal arch ================= */

export type OccKind = "incisor" | "canine" | "premolar" | "molar";

type OccSpec = { kind: OccKind; w: number; d: number };
/** Central incisor to second molar: mesio-distal width, bucco-lingual depth. */
const OCC: OccSpec[] = [
  { kind: "incisor", w: 29, d: 27 },
  { kind: "incisor", w: 25, d: 25 },
  { kind: "canine", w: 31, d: 33 },
  { kind: "premolar", w: 29, d: 36 },
  { kind: "premolar", w: 28, d: 36 },
  { kind: "molar", w: 44, d: 45 },
  { kind: "molar", w: 42, d: 44 },
];

const A = 104;
const B = 80;
const N = 2.4;
const STEP = 1.5;

type Node = { s: number; p: Pt; t: Pt };
/** Centre line of the right half, front midline first. */
const NODES: Node[] = (() => {
  const raw: Pt[] = [];
  const q = 160;
  for (let k = 0; k <= q; k++) {
    const phi = (k / q) * (Math.PI / 2);
    const x = A * Math.pow(Math.sin(phi), 2 / N);
    const depth = B * (1 - Math.pow(Math.cos(phi), 2 / N));
    raw.push([x, -depth]);
  }
  /* straight, very slightly converging stretch for the molars */
  const last = raw[raw.length - 1];
  for (let k = 1; k <= 140; k++) raw.push([last[0] - 0.05 * k * 1.5, last[1] - k * 1.5]);
  const out: Node[] = [];
  let s = 0;
  for (let i = 0; i < raw.length; i++) {
    if (i > 0) s += Math.hypot(raw[i][0] - raw[i - 1][0], raw[i][1] - raw[i - 1][1]);
    const a = raw[Math.max(0, i - 2)];
    const b = raw[Math.min(raw.length - 1, i + 2)];
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    out.push({ s, p: raw[i], t: [(b[0] - a[0]) / l, (b[1] - a[1]) / l] });
  }
  return out;
})();

const at = (s: number): Node => {
  let lo = 0;
  let hi = NODES.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (NODES[mid].s <= s) lo = mid;
    else hi = mid;
  }
  const a = NODES[lo];
  const b = NODES[hi];
  const k = b.s === a.s ? 0 : (s - a.s) / (b.s - a.s);
  return {
    s,
    p: [a.p[0] + (b.p[0] - a.p[0]) * k, a.p[1] + (b.p[1] - a.p[1]) * k],
    t: a.t,
  };
};

export type OccTooth = {
  /** 0 = left second molar ... 13 = right second molar (symmetrical). */
  i: number;
  /** +1 right, -1 left (the left side is the mirror image). */
  side: 1 | -1;
  /** 0 = central incisor ... 6 = second molar. */
  n: number;
  kind: OccKind;
  w: number;
  d: number;
  /** Arc length of the centre from the midline. */
  s: number;
  c: Pt;
  /** Unit tangent and outward normal of the right-hand frame. */
  t: Pt;
  o: Pt;
};

export const OCC_TEETH: OccTooth[] = (() => {
  const right: OccTooth[] = [];
  let s = 0;
  OCC.forEach((sp, n) => {
    const cs = s + sp.w / 2;
    const nd = at(cs);
    right.push({
      i: 7 + n,
      side: 1,
      n,
      kind: sp.kind,
      w: sp.w,
      d: sp.d,
      s: cs,
      c: nd.p,
      t: nd.t,
      o: [-nd.t[1], nd.t[0]],
    });
    s += sp.w - 1.2;
  });
  const left = right.map((r) => ({ ...r, i: 6 - r.n, side: -1 as const }));
  return [...left.reverse(), ...right];
})();

/** World point of a tooth from fractions of its half width / half depth
 *  (fx along the arch, fy outward: +1 = the outer, labial or buccal edge). */
export function occPt(t: OccTooth, fx: number, fy: number): Pt {
  const lx = fx * (t.w / 2);
  const ly = fy * (t.d / 2);
  const x = t.c[0] + t.t[0] * lx + t.o[0] * ly;
  const y = t.c[1] + t.t[1] * lx + t.o[1] * ly;
  return [t.side * x, y];
}

/** Outline fractions per kind (outer edge at +y, inner / tongue side at -y). */
const SHAPE: Record<OccKind, Pt[]> = {
  incisor: [
    [-1, 0.45], [-0.86, 0.88], [-0.4, 1.04], [0, 1.07], [0.4, 1.04], [0.86, 0.88], [1, 0.45],
    [0.94, -0.3], [0.72, -0.86], [0, -1], [-0.72, -0.86], [-0.94, -0.3],
  ],
  canine: [
    [-0.98, 0.2], [-0.7, 0.7], [-0.22, 1.04], [0, 1.15], [0.22, 1.04], [0.7, 0.7], [0.98, 0.2],
    [0.84, -0.6], [0.3, -0.98], [-0.3, -0.98], [-0.84, -0.6],
  ],
  premolar: [
    [-1, 0], [-0.88, 0.7], [-0.4, 1.02], [0.4, 1.02], [0.88, 0.7], [1, 0],
    [0.86, -0.7], [0.38, -1], [-0.38, -1], [-0.86, -0.7],
  ],
  molar: [
    [-1, 0.3], [-0.82, 0.9], [-0.2, 1.03], [0.5, 1.0], [0.95, 0.76], [1, 0],
    [0.92, -0.7], [0.4, -1], [-0.3, -1.03], [-0.86, -0.85], [-1.02, -0.3],
  ],
};

export const occOutline = (t: OccTooth, grow = 0): Pt[] =>
  SHAPE[t.kind].map(([fx, fy]) => occPt(t, fx * (1 + grow / (t.w / 2)), fy * (1 + grow / (t.d / 2))));

/** Centre line of the whole arch, left molar to right molar, offset
 *  `off` units outward (negative = towards the tongue / palate). */
export function occLine(from: number, to: number, off = 0): Pt[] {
  const out: Pt[] = [];
  const total = NODES[NODES.length - 1].s;
  const a = Math.max(0, Math.min(total, from));
  const b = Math.max(0, Math.min(total, to));
  for (let s = a; s <= b + 0.01; s += STEP * 4) {
    const nd = at(s);
    out.push([nd.p[0] + off * -nd.t[1], nd.p[1] + off * nd.t[0]]);
  }
  return out;
}

/** Point on the centre line at arc length s (right side), offset outward. */
export function occAtS(s: number, off = 0): { p: Pt; t: Pt; o: Pt } {
  const nd = at(s);
  const o: Pt = [-nd.t[1], nd.t[0]];
  return { p: [nd.p[0] + off * o[0], nd.p[1] + off * o[1]], t: nd.t, o };
}

/** Arc length where the last tooth ends. */
export const OCC_END = (() => {
  const l = OCC_TEETH[OCC_TEETH.length - 1];
  return l.s + l.w / 2;
})();

/** Arc length between teeth (n-1 and n), the contact point. */
export const occContact = (n: number): number => OCC_TEETH[7 + n - 1].s + OCC_TEETH[7 + n - 1].w / 2 - 0.6;

