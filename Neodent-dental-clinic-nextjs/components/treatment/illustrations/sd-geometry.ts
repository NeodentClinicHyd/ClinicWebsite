import { curve, f, type Pt } from "./geometry";
import { archGeometry, type ToothGeo } from "./archGeometry";
import { INCISOR } from "./cbu-geometry";
import { poly, sample } from "./rct-geometry";

/* ------------------------------------------------------------------
   Shared geometry for the smile design scenes (neo-sd-*), drawn in the
   kit's 640 x 480 scene space.

   1. FRONTAL: every frontal scene is built from the kit's UPPER arch
      geometry (archGeometry.ts), so a central incisor has the same shape,
      size and place in every scene. A scene only says how a tooth differs
      from the standard one: shifted, turned, wider, shorter, a shade
      darker, chipped or worn.
   2. SECTION: the front-tooth cross-section (cbu-geometry.ts INCISOR) and
      the strip of labial enamel that is removed for a veneer.
   ------------------------------------------------------------------ */

export const UPPER: ToothGeo[] = archGeometry("upper");

export type SdLook = "natural" | "worn" | "crown" | "veneer" | "filled";

export type SdTooth = {
  look?: SdLook;
  dx?: number;
  dy?: number;
  /** Extra rotation in degrees. */
  rot?: number;
  /** Width and crown-height factors (1 = the standard tooth). */
  sw?: number;
  sh?: number;
  /** 0 = the standard enamel, 1 to 3 = a progressively yellower / browner natural shade. */
  shade?: 0 | 1 | 2 | 3;
  /** A broken corner: which side (+1 right, -1 left) and its size as a fraction of width / height. */
  chip?: { side: 1 | -1; w: number; h: number; resin?: boolean };
  /** Small decayed spot on the face. */
  decay?: boolean;
  /** Fraction of the crown lost to wear (look "worn"). */
  wear?: number;
};

export type SdSpecs = Record<number, SdTooth>;

export type SdPlaced = {
  i: number;
  g: ToothGeo;
  spec: SdTooth;
  /** Position of the biting edge and total turn in degrees. */
  x: number;
  y: number;
  rot: number;
  /** transform that puts the tooth's local frame (edge at 0, neck above) into the scene. */
  tf: string;
  /** Scene point of the neck centre. */
  neck: Pt;
};

/** Where tooth `i` ends up: its standard place, then the scene's changes. */
export function placeTooth(i: number, spec: SdTooth = {}): SdPlaced {
  const base = UPPER[i];
  const w = base.w * (spec.sw ?? 1);
  const h = base.h * (spec.sh ?? 1);
  const g: ToothGeo = { ...base, w, h };
  /* Taller or shorter teeth keep their neck where it was, so the edge moves. */
  const x = base.cx + (spec.dx ?? 0);
  const y = base.yInc - base.h + h + (spec.dy ?? 0);
  const rot = base.rot + (spec.rot ?? 0);
  const a = (rot * Math.PI) / 180;
  return {
    i,
    g,
    spec,
    x,
    y,
    rot,
    tf: `translate(${f(x)} ${f(y)}) rotate(${f(rot)})`,
    neck: [x + h * Math.sin(a), y - h * Math.cos(a)],
  };
}

/** Local (edge at 0,0, neck above) to scene coordinates. */
export function toScene(p: SdPlaced, lx: number, ly: number): Pt {
  const a = (p.rot * Math.PI) / 180;
  return [p.x + lx * Math.cos(a) - ly * Math.sin(a), p.y + lx * Math.sin(a) + ly * Math.cos(a)];
}

export function placeAll(range: [number, number], specs: SdSpecs = {}): SdPlaced[] {
  const out: SdPlaced[] = [];
  for (let i = range[0]; i <= range[1]; i++) out.push(placeTooth(i, specs[i]));
  return out;
}

/**
 * Re-flows a run of teeth so neighbours keep touching after some were made
 * wider or narrower: the midline (between teeth 4 and 5) stays put and each
 * tooth sits against the previous one. Existing dx values are kept as extras.
 */
export function pack(specs: SdSpecs, range: [number, number], overlap = 1.6): SdSpecs {
  const out: SdSpecs = {};
  const wOf = (i: number) => UPPER[i].w * (specs[i]?.sw ?? 1);
  let edge = 320;
  for (let i = 5; i <= range[1]; i++) {
    const cx = edge + wOf(i) / 2;
    out[i] = { ...specs[i], dx: cx - UPPER[i].cx + (specs[i]?.dx ?? 0) };
    edge = edge + wOf(i) - overlap;
  }
  edge = 320;
  for (let i = 4; i >= range[0]; i--) {
    const cx = edge - wOf(i) / 2;
    out[i] = { ...specs[i], dx: cx - UPPER[i].cx + (specs[i]?.dx ?? 0) };
    edge = edge - wOf(i) + overlap;
  }
  return out;
}

/* ---------- gum with scalloped margin and papillae ---------- */

const gumEdge = (x: number) => 126 + 28 * Math.pow(Math.min(1.1, Math.abs(x - 320) / 250), 1.6);

export type SdGumGeo = {
  fill: string;
  margin: string;
  /** Tip of each papilla (between neighbours), left to right. */
  papillae: Pt[];
  bulges: { x: number; y: number; rx: number; ry: number }[];
  /** Margin sub-paths (one per tooth) for tinting inflamed teeth. */
  perTooth: Record<number, string>;
};

/**
 * The upper gum round the placed teeth: the margin dips to a zenith at each
 * neck and rises into a papilla between neighbours (longer and blunter where
 * a gap opens). Same recipe as the kit's gumGeometry, but it follows teeth
 * that have been moved or resized.
 */
export function sdGum(P: SdPlaced[], opts: { inflamed?: number[] } = {}): SdGumGeo {
  const left = (p: SdPlaced) => p.x - p.g.w / 2;
  const right = (p: SdPlaced) => p.x + p.g.w / 2;
  const bx: number[] = [left(P[0]) - 2];
  for (let k = 1; k < P.length; k++) bx.push((right(P[k - 1]) + left(P[k])) / 2);
  bx.push(right(P[P.length - 1]) + 2);

  const infl = new Set(opts.inflamed ?? []);
  const zen = (p: SdPlaced) => p.neck[1] + 2.2 + (infl.has(p.i) ? 2.5 : 0);
  const pap = (p: SdPlaced, extra: number) =>
    p.neck[1] + 0.25 * p.g.h + extra + (infl.has(p.i) ? 5 : 0);
  const yB: number[] = [];
  for (let k = 0; k <= P.length; k++) {
    const a = P[k - 1];
    const b = P[k];
    const gap = a && b ? Math.max(0, left(b) - right(a)) : 0;
    const extra = Math.min(gap, 9) * 0.6;
    if (a && b) yB.push((pap(a, extra) + pap(b, extra)) / 2);
    else yB.push(pap(a ?? b, 0));
  }

  let margin = `M${f(bx[0])} ${f(yB[0])}`;
  const perTooth: Record<number, string> = {};
  const bulges: SdGumGeo["bulges"] = [];
  P.forEach((p, k) => {
    const x0 = bx[k];
    const x1 = bx[k + 1];
    const y0 = yB[k];
    const y1 = yB[k + 1];
    const apex = zen(p);
    const w = p.g.w;
    const cx = p.neck[0];
    const seg =
      `C${f(x0 + 0.04 * w)} ${f(y0 + (apex - y0) * 0.62)} ${f(cx - 0.3 * w)} ${f(apex)} ${f(cx)} ${f(apex)}` +
      `C${f(cx + 0.3 * w)} ${f(apex)} ${f(x1 - 0.04 * w)} ${f(y1 + (apex - y1) * 0.62)} ${f(x1)} ${f(y1)}`;
    margin += seg;
    perTooth[p.i] = `M${f(x0)} ${f(y0)}${seg}`;
    const span = Math.abs(gumEdge(cx) - apex);
    bulges.push({ x: cx, y: apex - span * 0.5, rx: 0.15 * w, ry: span * 0.3 });
  });

  const xe0 = bx[0];
  const xe1 = bx[bx.length - 1];
  const top: Pt[] = [];
  for (let x = xe1 + 6; x >= xe0 - 6; x -= 38) top.push([x, gumEdge(x)]);
  top.push([xe0 - 6, gumEdge(xe0 - 6)]);
  const fill =
    margin +
    `Q${f(xe1 + 14)} ${f(yB[yB.length - 1] - 10)} ${f(xe1 + 6)} ${f(gumEdge(xe1 + 6))}` +
    curve(top, false) +
    `Q${f(xe0 - 14)} ${f(yB[0] - 10)} ${f(xe0)} ${f(yB[0])}Z`;
  return { fill, margin, papillae: bx.slice(1, -1).map((x, k) => [x, yB[k + 1]] as Pt), bulges, perTooth };
}

/* ---------- chip polygon (local tooth frame, edge at y = 0, neck above) ---------- */

/** The broken-off corner as a closed polygon, plus the jagged break line. */
export function chipShape(w: number, h: number, side: 1 | -1, cw: number, ch: number) {
  const w2 = w / 2;
  const sx = (x: number) => side * x;
  const cwu = cw * w;
  const chu = ch * h;
  const brk: Pt[] = [
    [sx(w2 - cwu), 0.5],
    [sx(w2 - cwu * 0.82), -chu * 0.2],
    [sx(w2 - cwu * 0.58), -chu * 0.3],
    [sx(w2 - cwu * 0.4), -chu * 0.52],
    [sx(w2 - cwu * 0.16), -chu * 0.64],
    [sx(w2 - cwu * 0.05), -chu * 0.92],
    [sx(w2 + 0.5), -chu],
  ];
  const cut: Pt[] = [[sx(w2 - cwu), 8], ...brk, [sx(w2 + 6), -chu], [sx(w2 + 6), 8]];
  return { brk: poly(brk), cut: poly(cut) + "Z", brkPts: brk, cutPts: cut };
}

/* ---------- front-tooth cross-section: the labial enamel strip ---------- */

/** Enamel thickness at the labial points (INCISOR indices 22..27, 0, 1). */
const LAB_IDX = [22, 23, 24, 25, 26, 27, 0, 1];
const LAB_ENAMEL = [0, 2, 3, 5, 6, 7, 8, 11];
const MID: Pt = [316, 158];

const inward = (p: Pt): Pt => {
  const dx = MID[0] - p[0];
  const dy = MID[1] - p[1];
  const l = Math.hypot(dx, dy) || 1;
  return [dx / l, dy / l];
};

/** Labial surface points, original (k = 0) or moved inwards by k x the local enamel thickness. */
export function labialPts(k = 0): Pt[] {
  return LAB_IDX.map((idx, n) => {
    const p = INCISOR[idx];
    const d = inward(p);
    /* The cut tapers to nothing at both ends so the surfaces blend. */
    const taper = n === 0 || n === LAB_IDX.length - 1 ? 0 : n === 1 || n === LAB_IDX.length - 2 ? 0.6 : 1;
    const m = k * LAB_ENAMEL[n] * taper;
    return [p[0] + d[0] * m, p[1] + d[1] * m] as Pt;
  });
}

/** The enamel that is removed (a thin sliver on the front surface), and the veneer that replaces it. */
export const SLIVER_K = 0.5;
export const SLIVER_D = (() => {
  const outer = sample(labialPts(0), 6);
  const inner = sample(labialPts(SLIVER_K), 6).reverse();
  return poly([...outer, ...inner]) + "Z";
})();
export const PREPARED_D = poly(sample(labialPts(SLIVER_K), 6));
export const ORIGINAL_D = poly(sample(labialPts(0), 6));

/**
 * A porcelain shell for the front surface of the incisor: it follows the
 * labial contour, is 4.5 units thick and a little proud of the tooth, from
 * the gum margin to the biting edge.
 */
export function shellPath(gap = 0, t = 5.5): { d: string; outer: Pt[]; inner: Pt[] } {
  const base = labialPts(0);
  const outer: Pt[] = base.map(([x, y]) => [x - gap, y] as Pt);
  const innerPts: Pt[] = base.map(([x, y]) => {
    const d = inward([x, y]);
    return [x - gap + d[0] * t, y + d[1] * t] as Pt;
  });
  const o = sample(outer, 6);
  const i = sample(innerPts, 6).reverse();
  return { d: poly([...o, ...i]) + "Z", outer: o, inner: i };
}
