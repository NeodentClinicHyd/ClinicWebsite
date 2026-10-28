/* ------------------------------------------------------------------
   Shared geometry for the dental-implant cross-section scenes.
   Every scene is drawn in the same 640 x 480 coordinate space, so the
   gumline, bone crest, implant axis and neighbouring teeth line up
   identically from scene to scene.

   Adjusted from the starting brief: the neighbours sit 98px either side of
   the implant (not 130) so the crowns meet at a natural contact point
   instead of leaving a 34px hole in the arch.
   ------------------------------------------------------------------ */

export type Pt = [number, number];

export const VB_W = 640;
export const VB_H = 480;

export const G = {
  crownTop: 70,
  gumline: 200,
  crest: 232,
  floor: 440,
  cx: 320,
  implantW: 46,
  implantL: 150,
  crownW: 96,
  rootL: 130,
  /** Distance between neighbouring tooth centres. */
  pitch: 98,
  /** Half width of a tooth at the gumline. */
  neck: 31,
  /** Height of an interdental papilla tip. */
  papilla: 170,
  /** Section block, narrow (labelled scenes) and wide (comparison scenes). */
  narrow: [150, 490] as Pt,
  wide: [66, 574] as Pt,
} as const;

export const X = {
  n1: G.cx - G.pitch,
  n2: G.cx + G.pitch,
  o1: G.cx - 2 * G.pitch,
  o2: G.cx + 2 * G.pitch,
} as const;

/** Number to a short string (1 decimal, no trailing zero). */
export const f = (n: number) => {
  const r = Math.round(n * 10) / 10;
  return Object.is(r, -0) ? "0" : String(r);
};

/** Catmull-Rom spline through points, as cubic Bezier path data. */
export function curve(pts: Pt[], move = true): string {
  if (pts.length < 2) return "";
  let d = move ? `M${f(pts[0][0])} ${f(pts[0][1])}` : `L${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/** Deterministic pseudo-random numbers (so server and client agree). */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Bone crest height at x. `dip` lowers the ridge around the implant site. */
export function crestY(x: number, dip = 0, siteX: number = G.cx, half = 62): number {
  const wave = 2.6 * Math.sin((x - G.cx) * 0.052);
  let d = 0;
  const t = Math.abs(x - siteX) / half;
  if (dip && t < 1) d = dip * (1 + Math.cos(Math.PI * t)) / 2;
  return G.crest + wave + d;
}
