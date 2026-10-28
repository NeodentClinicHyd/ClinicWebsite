import { f, type Pt } from "./geometry";

/* ------------------------------------------------------------------
   Shared geometry for the root canal treatment scenes (viewBox space
   640 x 480, like the implant scenes). One lower molar, cut lengthwise,
   centred on x = 320. Every scene re-uses these numbers so the crown, the
   gumline, the bone crest, the canals and the root tips sit at the same
   coordinates from scene to scene.
   Everything is defined for cx = 320 and shifted with `at(pts, cx)`.
   ------------------------------------------------------------------ */

/** Vertical proportions: crown compressed to 0.857, roots to 0.917. */
const sy = (y: number) => (y < 204 ? 204 - (204 - y) * 0.857 : y > 226 ? 226 + (y - 226) * 0.917 : y);
const T = (pts: Pt[]): Pt[] => pts.map(([x, y]) => [x, sy(y)] as Pt);

export const R = {
  cx: 320,
  /** Highest cusp tip. */
  crownTop: Math.round(sy(78)),
  /** Cemento-enamel junction (crown ends, root begins). */
  cej: 204,
  /** Gum margin where the gum meets the tooth (same level as the implant scenes). */
  gumline: 203,
  /** Bone crest (the implant scenes' G.crest). */
  crest: 232,
  /** Root tips (lowest outline points). */
  tipM: [290, Math.round(sy(361))] as Pt,
  tipD: [350, Math.round(sy(361))] as Pt,
  /** Bone floor of the root canal scenes (about 40 below the root tips). */
  floor: 384,
  /** Distance between neighbouring molar centres. */
  pitch: 126,
  /** Slab for the single-tooth scenes (R1 leaves room for labels). */
  slab: [150, 490] as Pt,
  /** Slab for the three-tooth comparison row. */
  row: [78, 562] as Pt,
} as const;

export const at = (pts: Pt[], cx: number): Pt[] =>
  cx === 320 ? pts : pts.map(([x, y]) => [x + cx - 320, y] as Pt);

export const poly = (pts: Pt[]) =>
  pts.map((p, i) => `${i ? "L" : "M"}${f(p[0])} ${f(p[1])}`).join("");

/** Closed Catmull-Rom spline as cubic Bezier path data. */
export function closedCurve(pts: Pt[]): string {
  const m = pts.length;
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < m; i++) {
    const p0 = pts[(i - 1 + m) % m];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % m];
    const p3 = pts[(i + 2) % m];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + "Z";
}

/** Points along a Catmull-Rom spline (open), `n` per segment. */
export function sample(pts: Pt[], n = 8): Pt[] {
  const out: Pt[] = [];
  const m = pts.length;
  const get = (i: number): Pt => pts[Math.min(Math.max(i, 0), m - 1)];
  for (let i = 0; i < m - 1; i++) {
    const p0 = get(i - 1);
    const p1 = get(i);
    const p2 = get(i + 1);
    const p3 = get(i + 2);
    for (let k = 0; k < n; k++) {
      const t = k / n;
      const t2 = t * t;
      const t3 = t2 * t;
      const c = (a: number, b: number, cc: number, d: number) =>
        0.5 * (2 * b + (-a + cc) * t + (2 * a - 5 * b + 4 * cc - d) * t2 + (-a + 3 * b - 3 * cc + d) * t3);
      out.push([c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(pts[m - 1]);
  return out;
}

/* ---------- the tooth ---------- */

/** Crown outline, left neck over the cusps to the right neck. */
const CROWN: Pt[] = T([
  [272, 204], [264, 184], [257, 160], [254, 134], [258, 108], [268, 92], [282, 84], [298, 85], [310, 92],
  [320, 102],
  [330, 92], [342, 85], [358, 84], [372, 92], [382, 108], [386, 134], [383, 160], [376, 184], [368, 204],
]);
/** Root outline: distal side down to the tip, up to the furcation, mesial root. */
const ROOTS: Pt[] = T([
  [370, 226], [374, 258], [374, 292], [368, 324], [359, 346], [351, 361],
  [344, 350], [339, 326], [335, 298], [329, 274], [320, 262],
  [311, 274], [305, 298], [301, 326], [296, 350], [289, 361],
  [281, 356], [274, 342], [268, 320], [264, 292], [264, 258], [268, 226],
]);

/** Enamel thickness at each crown point (0 at the neck, thickest on the cusps). */
const ENAMEL_T = [0, 2, 5, 8, 11, 13, 14, 13, 11, 10, 11, 13, 14, 13, 11, 8, 5, 2, 0];

/** `v` lowers one cusp and raises the other by 3 for a little variety. */
function vary(pts: Pt[], v: number): Pt[] {
  if (!v) return pts;
  return pts.map(([x, y], i) => {
    if (i >= 3 && i <= 8) return [x, y + v * 3 * (1 - Math.abs(i - 6) / 4)] as Pt;
    if (i >= 11 && i <= 16) return [x, y - v * 3 * (1 - Math.abs(i - 13) / 4)] as Pt;
    return [x, y] as Pt;
  });
}

export const crownPts = (cx = 320, v = 0): Pt[] => at(vary(CROWN, v), cx);
export const rootPts = (cx = 320): Pt[] => at(ROOTS, cx);
export const silhouettePts = (cx = 320, v = 0): Pt[] => at([...vary(CROWN, v), ...ROOTS], cx);
export const silhouetteD = (cx = 320, v = 0) => closedCurve(silhouettePts(cx, v));
export const crownD = (cx = 320, v = 0) => closedCurve(crownPts(cx, v));
/** Open outline of the roots only, from the right neck round the tips to the left neck. */
export const rootLineD = (cx = 320) => {
  const pts = sample(rootPts(cx), 6);
  return poly(pts);
};

/** Boundary between enamel and dentine: the crown pulled inwards. */
export function edjPts(cx = 320, v = 0): Pt[] {
  const c = crownPts(cx, v);
  const mid: Pt = [cx, sy(160)];
  return c.map(([x, y], i) => {
    const dx = mid[0] - x;
    const dy = mid[1] - y;
    const len = Math.hypot(dx, dy) || 1;
    const t = ENAMEL_T[i];
    return [x + (dx / len) * t, y + (dy / len) * t] as Pt;
  });
}

/** Dentine core of the crown (reaches 3px below the junction so it overlaps). */
export function coreD(cx = 320, v = 0): string {
  const e = edjPts(cx, v);
  const first = e[0];
  const last = e[e.length - 1];
  return closedCurve([...e.slice(1, -1), [last[0] - 1, last[1] + 4], [first[0] + 1, first[1] + 4]]);
}

/** Height of the biting surface at x (crown top profile, cx = 320). */
const TOP = sample(CROWN, 12);
export function surfY(x: number, cx = 320): number {
  const xx = x - (cx - 320);
  let best = 999;
  for (let i = 0; i < TOP.length - 1; i++) {
    const [x0, y0] = TOP[i];
    const [x1, y1] = TOP[i + 1];
    if ((xx - x0) * (xx - x1) <= 0 && x0 !== x1) {
      const t = (xx - x0) / (x1 - x0);
      best = Math.min(best, y0 + (y1 - y0) * t);
    }
  }
  return best;
}

/* ---------- inside the tooth ---------- */

/** Pulp chamber with its two horns (clockwise from the left horn). */
const CHAMBER: Pt[] = T([
  [304, 127], [312, 136], [320, 139], [328, 136], [336, 127], [340, 142], [341, 168], [339, 192],
  [335, 208], [328, 217], [320, 220], [312, 217], [305, 208], [301, 192], [299, 168], [300, 142],
]);
export const chamberD = (cx = 320) => closedCurve(at(CHAMBER, cx));

/** Canal centre lines, orifice to apex. */
export const CANAL_M: Pt[] = T([[310, 212], [297, 244], [288, 278], [285, 312], [287, 336], [289, 350]]);
export const CANAL_D: Pt[] = T([[330, 212], [343, 244], [352, 278], [355, 312], [353, 336], [351, 350]]);

function ribbonSides(center: Pt[], w0: number, w1: number, cx: number) {
  const pts = sample(at(center, cx), 8);
  const n = pts.length;
  const left: Pt[] = [];
  const right: Pt[] = [];
  pts.forEach(([x, y], i) => {
    const a = pts[Math.max(i - 1, 0)];
    const b = pts[Math.min(i + 1, n - 1)];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const t = i / (n - 1);
    const w = (w0 + (w1 - w0) * Math.pow(t, 0.8)) / 2;
    left.push([x + nx * w, y + ny * w]);
    right.push([x - nx * w, y - ny * w]);
  });
  return { pts, left, right };
}

/** Canal as a closed tapering ribbon with a rounded apex. */
export function ribbon(center: Pt[], w0: number, w1: number, cx = 320): string {
  const { left, right } = ribbonSides(center, w0, w1, cx);
  const end = left[left.length - 1];
  const endR = right[right.length - 1];
  const tip: Pt = [(end[0] + endR[0]) / 2, (end[1] + endR[1]) / 2 + w1 * 0.55];
  return poly([...left, end, tip, endR, ...right.reverse()]) + "Z";
}

/** Centre line pulled `off` px to one side (for highlights). */
export function ribbonLine(center: Pt[], w0: number, w1: number, side: -1 | 1, off = 0.35, cx = 320): string {
  const { left, right } = ribbonSides(center, w0, w1, cx);
  const src = side === -1 ? left : right;
  const mid = ribbonSides(center, w0, w1, cx).pts;
  return poly(src.map((p, i) => [mid[i][0] + (p[0] - mid[i][0]) * off * 2, mid[i][1] + (p[1] - mid[i][1]) * off * 2] as Pt).slice(2, -4));
}

/** Rims of the access opening on the biting surface. */
export const RIM = { l: 306, r: 334 } as const;

/** Access channel: from the biting surface down into the chamber. The top is
 *  lifted clear of the tooth so a scene clips it to the tooth outline and no
 *  edge shows across the biting surface. */
export function channelD(cx = 320, depth = 150, lift = 12): string {
  const xl = RIM.l + cx - 320;
  const xr = RIM.r + cx - 320;
  const y0 = Math.min(surfY(xl, cx), surfY(xr, cx)) - lift;
  return (
    `M${f(xl - 2)} ${f(y0)}` +
    `L${f(xl + 2.5)} ${f(depth - 6)}Q${f(xl + 3)} ${depth} ${f(xl + 9)} ${depth}` +
    `L${f(xr - 9)} ${depth}Q${f(xr - 3)} ${depth} ${f(xr - 2.5)} ${f(depth - 6)}L${f(xr + 2)} ${f(y0)}Z`
  );
}

/** The biting surface between the two rims (for a flush-filling highlight). */
export function surfaceLine(cx = 320): string {
  const pts: Pt[] = [];
  for (let x = RIM.l - 2; x <= RIM.r + 2.01; x += 3) pts.push([x + cx - 320, surfY(x + cx - 320, cx)]);
  return poly(pts);
}
