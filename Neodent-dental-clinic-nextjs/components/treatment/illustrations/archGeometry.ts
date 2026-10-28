import { curve, f, rng, type Pt } from "./geometry";

/* ------------------------------------------------------------------
   Frontal arch geometry, drawn in the same 640 x 480 scene space as the
   implant cross-sections. One upper and one lower arch of ten teeth each
   (second premolar to second premolar), symmetrical about x = 320.

   Tooth widths are the apparent widths in a frontal smile view: central
   incisors are the widest and the teeth narrow towards the back (the
   perspective narrowing). Heights are the visible crown lengths. The bite
   line is a gentle smile curve that rises towards the back, and every tooth
   is turned a few degrees so that its edge follows that curve.

   All tooth outlines are built in "crown coordinates": x across the tooth,
   y from the neck (0, at the gum) to the biting edge (h). A mapper then puts
   the biting edge at the local origin and the neck above it (upper arch) or
   below it (lower arch), so one set of shapes serves both arches.
   ------------------------------------------------------------------ */

export type ArchId = "upper" | "lower";
export type ToothKind = "central" | "lateral" | "canine" | "pm1" | "pm2";

export const MID = 320;
export const BITE = { y: 246, rise: 15, span: 250 };
/** Bite line height at x. */
export const biteY = (x: number) =>
  BITE.y - BITE.rise * Math.pow(Math.min(1, Math.abs(x - MID) / BITE.span), 1.7);

const ORDER: ToothKind[] = ["central", "lateral", "canine", "pm1", "pm2"];
export const KINDS: ToothKind[] = [...ORDER].reverse().concat(ORDER);

/** [apparent width, crown height] per kind. */
const DIM: Record<ArchId, Record<ToothKind, [number, number]>> = {
  upper: { central: [62, 80], lateral: [47, 66], canine: [51, 74], pm1: [44, 60], pm2: [38, 54] },
  lower: { central: [42, 64], lateral: [44, 67], canine: [47, 74], pm1: [43, 60], pm2: [38, 55] },
};

export type ToothGeo = {
  i: number;
  arch: ArchId;
  kind: ToothKind;
  cx: number;
  w: number;
  h: number;
  /** Height of the biting edge on the bite curve. */
  yInc: number;
  /** Degrees; the edge follows the bite curve. */
  rot: number;
  /** +1 right of the midline, -1 left (mesial corner faces the midline). */
  side: 1 | -1;
};

const slope = (x: number) =>
  (Math.atan2(biteY(x + 5) - biteY(x - 5), 10) * 180) / Math.PI;

const geoCache: Partial<Record<ArchId, ToothGeo[]>> = {};

export function archGeometry(arch: ArchId): ToothGeo[] {
  const hit = geoCache[arch];
  if (hit) return hit;
  const right: ToothGeo[] = [];
  let x = MID;
  ORDER.forEach((kind, k) => {
    const [w, h] = DIM[arch][kind];
    const cx = x + w / 2;
    right.push({
      i: 5 + k, arch, kind, cx, w, h,
      yInc: biteY(cx) + (arch === "upper" ? 3 : -1),
      rot: slope(cx) * 0.9,
      side: 1,
    });
    x += w - 1.6;
  });
  const left: ToothGeo[] = right.map((g) => {
    const cx = 2 * MID - g.cx;
    return { ...g, i: 9 - g.i, cx, rot: slope(cx) * 0.9, side: -1 };
  });
  const all = [...left.reverse(), ...right];
  geoCache[arch] = all;
  return all;
}

/* ---------- tooth outlines ---------- */

type Seg = (["M" | "L", number, number] | ["C", number, number, number, number, number, number] | ["Q", number, number, number, number]);

function build(segs: Seg[], map: (x: number, y: number) => Pt): string {
  let d = "";
  for (const s of segs) {
    d += s[0];
    const out: string[] = [];
    for (let k = 1; k < s.length; k += 2) {
      const [x, y] = map(s[k] as number, s[k + 1] as number);
      out.push(`${f(x)} ${f(y)}`);
    }
    d += out.join(" ");
  }
  return d + "Z";
}

/** Maps crown coordinates (neck 0 -> edge h) with the biting edge at y = 0. */
export const crownMap = (arch: ArchId, H: number) => (x: number, y: number): Pt =>
  arch === "upper" ? [x, y - H] : [x, H - y];

/**
 * Outline of one crown. `h` is the drawn height (a worn tooth is shorter than
 * `H`, the original height, so its neck stays where it was).
 */
export function toothPath(g: ToothGeo, opts: { h?: number; flat?: boolean } = {}): string {
  const { w, kind, side, arch } = g;
  const h = opts.h ?? g.h;
  const m = crownMap(arch, g.h);
  const w2 = w / 2;
  const a = 0.37 * w;
  const top = -9;
  const segs: Seg[] = [];

  if (kind === "central" || kind === "lateral" || opts.flat) {
    const rM = opts.flat ? 0.07 * w : 0.1 * w;
    const rD = opts.flat ? 0.09 * w : 0.24 * w;
    const rl = side > 0 ? rM : rD;
    const rr = side > 0 ? rD : rM;
    const bulge = opts.flat ? 0 : 1.6;
    segs.push(
      ["M", -a, top],
      ["C", -a - 0.6, 0.1 * h, -w2, 0.28 * h, -w2, 0.55 * h],
      ["L", -w2, h - rl],
      ["C", -w2, h - 0.45 * rl, -w2 + 0.45 * rl, h, -w2 + rl, h],
      bulge ? ["Q", 0, h + bulge, w2 - rr, h] : ["L", w2 - rr, h],
      ["C", w2 - 0.45 * rr, h, w2, h - 0.45 * rr, w2, h - rr],
      ["L", w2, 0.55 * h],
      ["C", w2, 0.28 * h, a + 0.6, 0.1 * h, a, top],
    );
  } else if (kind === "canine") {
    segs.push(
      ["M", -a, top],
      ["C", -a - 0.6, 0.08 * h, -w2, 0.24 * h, -w2, 0.5 * h],
      ["C", -w2, 0.74 * h, -0.22 * w, 0.92 * h, -0.05 * w, h],
      ["Q", 0, h + 2.4, 0.05 * w, h],
      ["C", 0.22 * w, 0.92 * h, w2, 0.74 * h, w2, 0.5 * h],
      ["C", w2, 0.24 * h, a + 0.6, 0.08 * h, a, top],
    );
  } else {
    segs.push(
      ["M", -a, top],
      ["C", -a - 0.6, 0.08 * h, -w2, 0.26 * h, -w2, 0.52 * h],
      ["C", -w2, 0.82 * h, -0.3 * w, h, -0.07 * w, h],
      ["Q", 0, h + 1.6, 0.07 * w, h],
      ["C", 0.3 * w, h, w2, 0.82 * h, w2, 0.52 * h],
      ["C", w2, 0.26 * h, a + 0.6, 0.08 * h, a, top],
    );
  }
  return build(segs, m);
}

/** The part of the root that sits under the gum (shows when the gum recedes). */
export function stubPath(g: ToothGeo): string {
  const { w } = g;
  const a = 0.37 * w;
  const m = crownMap(g.arch, g.h);
  return build(
    [
      ["M", -a, 3],
      ["C", -a, -9, -0.27 * w, -17, -0.2 * w, -24],
      ["L", 0.2 * w, -24],
      ["C", 0.27 * w, -17, a, -9, a, 3],
    ],
    m,
  );
}

/** A tooth ground down for a crown: a short, tapered stump. */
export function stumpPath(g: ToothGeo): string {
  const { w } = g;
  const h = g.h * 0.7;
  const a = 0.37 * w;
  const m = crownMap(g.arch, g.h);
  return build(
    [
      ["M", -a - 1, -9],
      ["C", -a - 1, 0.1 * h, -0.34 * w, 0.35 * h, -0.3 * w, 0.8 * h],
      ["Q", -0.29 * w, h, -0.2 * w, h],
      ["L", 0.2 * w, h],
      ["Q", 0.29 * w, h, 0.3 * w, 0.8 * h],
      ["C", 0.34 * w, 0.35 * h, a + 1, 0.1 * h, a + 1, -9],
    ],
    m,
  );
}

/** Smooth closed curve through points. */
export function closedCurve(pts: Pt[]): string {
  const n = pts.length;
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + "Z";
}

/** Slightly irregular blob (fillings, stains), in crown coordinates. */
export function blobPts(cx: number, cy: number, rx: number, ry: number, seed: number): Pt[] {
  const r = rng(seed);
  return Array.from({ length: 8 }, (_, k) => {
    const ang = (k / 8) * Math.PI * 2;
    const rr = 1 + (r() - 0.5) * 0.3;
    return [cx + Math.cos(ang) * rx * rr, cy + Math.sin(ang) * ry * rr] as Pt;
  });
}

/* ---------- gum ---------- */

export type GumFlags = { ridge: boolean; rec: number; infl: boolean };

export type GumGeo = {
  fill: string;
  margin: string;
  /** Margin sub-paths of inflamed teeth. */
  inflamed: string[];
  /** Ridge (tooth-less) stretches of the margin, for extra shading. */
  ridges: string[];
  /** Root-prominence ellipses. */
  bulges: { x: number; y: number; rx: number; ry: number }[];
  /** Outer edge sample (for clip shapes and shadows). */
  edge: (x: number) => number;
};

const edgeFn = (arch: ArchId) => (x: number) => {
  const t = Math.min(1.1, Math.abs(x - MID) / 250);
  return arch === "upper" ? 126 + 28 * Math.pow(t, 1.6) : 354 - 30 * Math.pow(t, 1.6);
};

export function gumGeometry(arch: ArchId, flags: GumFlags[]): GumGeo {
  const T = archGeometry(arch);
  const dir = arch === "upper" ? 1 : -1;
  const edge = edgeFn(arch);
  const yc = (i: number) => T[i].yInc - dir * T[i].h;
  const yz = (i: number) => yc(i) + dir * (2.2 - flags[i].rec + (flags[i].infl ? 2.5 : 0));
  const yp = (i: number) =>
    yc(i) + dir * (0.25 * T[i].h - flags[i].rec * 0.5 + (flags[i].infl ? 5 : 0));
  const B = (k: number) =>
    k <= 0 ? T[0].cx - T[0].w / 2 - 2 : k >= 10 ? T[9].cx + T[9].w / 2 + 2
      : (T[k - 1].cx + T[k - 1].w / 2 + T[k].cx - T[k].w / 2) / 2;
  /* Height of the margin where tooth k-1 meets tooth k (ridge teeth borrow
     their neighbour's value). */
  const yB = (k: number) => {
    const l = k - 1 >= 0 && !flags[k - 1].ridge ? yp(k - 1) : null;
    const r = k <= 9 && !flags[k].ridge ? yp(k) : null;
    if (l !== null && r !== null) return (l + r) / 2;
    if (l !== null) return l;
    if (r !== null) return r;
    return yc(Math.min(9, Math.max(0, k))) + dir * 0.2 * T[Math.min(9, Math.max(0, k))].h;
  };

  let margin = `M${f(B(0))} ${f(yB(0))}`;
  const inflamed: string[] = [];
  const ridges: string[] = [];
  const bulges: GumGeo["bulges"] = [];
  let i = 0;
  while (i < 10) {
    if (flags[i].ridge) {
      let j = i;
      while (j + 1 < 10 && flags[j + 1].ridge) j++;
      const x0 = B(i);
      const x1 = B(j + 1);
      const L = x1 - x0;
      const hAvg = T.slice(i, j + 1).reduce((s, g) => s + g.h, 0) / (j - i + 1);
      const sag = dir * (0.2 + 0.03 * (j - i)) * hAvg;
      const seg = `C${f(x0 + 0.18 * L)} ${f(yB(i) + sag)} ${f(x1 - 0.18 * L)} ${f(yB(j + 1) + sag)} ${f(x1)} ${f(yB(j + 1))}`;
      margin += seg;
      ridges.push(`M${f(x0)} ${f(yB(i))}${seg}`);
      i = j + 1;
      continue;
    }
    const g = T[i];
    const x0 = B(i);
    const x1 = B(i + 1);
    const y0 = yB(i);
    const y1 = yB(i + 1);
    const apex = yz(i);
    const w = g.w;
    const seg =
      `C${f(x0 + 0.04 * w)} ${f(y0 + (apex - y0) * 0.62)} ${f(g.cx - 0.3 * w)} ${f(apex)} ${f(g.cx)} ${f(apex)}` +
      `C${f(g.cx + 0.3 * w)} ${f(apex)} ${f(x1 - 0.04 * w)} ${f(y1 + (apex - y1) * 0.62)} ${f(x1)} ${f(y1)}`;
    margin += seg;
    if (flags[i].infl) inflamed.push(`M${f(x0)} ${f(y0)}${seg}`);
    bulges.push({
      x: g.cx,
      y: apex - dir * Math.abs(edge(g.cx) - apex) * 0.5,
      rx: 0.15 * w,
      ry: Math.abs(edge(g.cx) - apex) * 0.3,
    });
    i++;
  }

  const xe0 = B(0);
  const xe1 = B(10);
  const topPts: Pt[] = [];
  for (let x = xe1 + 6; x >= xe0 - 6; x -= 38) topPts.push([x, edge(x)]);
  topPts.push([xe0 - 6, edge(xe0 - 6)]);
  const yEnd1 = yB(10);
  const yEnd0 = yB(0);
  const fill =
    margin +
    `Q${f(xe1 + 14)} ${f(yEnd1 - dir * 10)} ${f(xe1 + 6)} ${f(edge(xe1 + 6))}` +
    curve(topPts, false) +
    `Q${f(xe0 - 14)} ${f(yEnd0 - dir * 10)} ${f(xe0)} ${f(yEnd0)}Z`;
  return { fill, margin, inflamed, ridges, bulges, edge };
}
