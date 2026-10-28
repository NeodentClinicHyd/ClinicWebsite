import { crestY, curve, f, rng, type Pt } from "./geometry";
import { INCISOR } from "./cbu-geometry";
import { poly, sample } from "./rct-geometry";

/* ------------------------------------------------------------------
   Geometry for the scaling and polishing scenes (neo-sp-*), in the kit's
   640 x 480 scene space.

   The side-on scenes (G1, G2a, G2b, G4b, G4c) all draw the SAME tooth: the
   front tooth cut front to back from cbu-geometry (INCISOR, labial side on
   the left, lingual on the right, crown y 96 to 206, bone crest about 232).
   This file gives the surface of that tooth as two lines, x(y), and builds
   the gum and the deposits relative to those lines, so a film, a crust or a
   groove always sits exactly on the artwork.
   ------------------------------------------------------------------ */

/** Shared framing of the three cross-section tiles (4 : 3). */
export const SECTION_VB = "150 64 340 255";

export type Side = "labial" | "lingual";

/** +1 for the right of the tooth (lingual), -1 for the left (labial). */
export const out = (side: Side) => (side === "labial" ? -1 : 1);

const LAB = sample(
  [INCISOR[0], INCISOR[27], INCISOR[26], INCISOR[25], INCISOR[24], INCISOR[23], INCISOR[22], INCISOR[21], INCISOR[20], INCISOR[19]],
  10,
);
const LING = sample(INCISOR.slice(2, 15), 10);
const LINE = { labial: LAB, lingual: LING } as const;

/** x of the tooth surface at height y (y must lie in 98..350). */
export function xAt(side: Side, y: number): number {
  const pts = LINE[side];
  if (y <= pts[0][1]) return pts[0][0];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    if (y >= y0 && y <= y1 && y1 !== y0) return x0 + ((x1 - x0) * (y - y0)) / (y1 - y0);
  }
  return pts[pts.length - 1][0];
}

/** Points of the surface from y0 to y1, evenly spaced. */
export function span(side: Side, y0: number, y1: number, step = 3): Pt[] {
  const n = Math.max(2, Math.round(Math.abs(y1 - y0) / step));
  return Array.from({ length: n + 1 }, (_, k) => {
    const y = y0 + ((y1 - y0) * k) / n;
    return [xAt(side, y), y] as Pt;
  });
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const smooth = (t: number) => {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
};

/* ---------- gum ---------- */

export type GumCfg = {
  /** Height of the gum edge where it meets the tooth. */
  lipY: number;
  /** Height of the bottom of the groove between tooth and gum. */
  bottomY: number;
  /** Width of the groove at the top and at the bottom. */
  gap0: number;
  gap1: number;
  /** How rounded and raised the gum edge is (0 = knife edge). */
  swell: number;
};

/** A healthy gum: a shallow groove, about 10 units deep. */
export const GUM_HEALTHY: GumCfg = { lipY: 197.5, bottomY: 207.5, gap0: 3.2, gap1: 0.5, swell: 0 };
/** A deeper groove, a slightly raised and rounder gum edge. No measurements are implied. */
export const GUM_DEEP: GumCfg = { lipY: 192, bottomY: 227, gap0: 9, gap1: 1.2, swell: 1 };

/** Width of the groove at height y. */
export function gapAt(cfg: GumCfg, y: number): number {
  const t = clamp01((y - cfg.lipY) / (cfg.bottomY - cfg.lipY));
  return lerp(cfg.gap0, cfg.gap1, Math.pow(t, 0.75));
}

const FAR = { labial: 112, lingual: 528 } as const;
const BASE_Y = 206;

export type GumShape = {
  /** Closed gum piece. */
  fill: string;
  /** The free edge from the far end to the tooth (for highlight and outline). */
  top: string;
  /** The groove between tooth and gum, to be filled with a shadow. */
  gap: string;
};

export function gumShape(side: Side, cfg: GumCfg): GumShape {
  const o = out(side);
  const lipX = xAt(side, cfg.lipY) + o * (cfg.gap0 + 0.6);
  const sw = cfg.swell ? 26 : 18;
  const pow = cfg.swell ? 1.6 : 1.4;

  /* free edge: from the far end, rising to the tip at the tooth */
  const dist = [150, 90, 60, 40, 26, 16, 9, 4, 0];
  const top: Pt[] = dist.map((d) => {
    const y = BASE_Y - (BASE_Y - cfg.lipY) * Math.exp(-Math.pow(d / sw, pow));
    return [lipX + o * d, d === 150 ? BASE_Y : y] as Pt;
  });

  /* inner edge: down the groove */
  const inner: Pt[] = [];
  for (let y = cfg.lipY + 3; y < cfg.bottomY; y += 3.5) inner.push([xAt(side, y) + o * gapAt(cfg, y), y]);
  inner.push([xAt(side, cfg.bottomY) + o * cfg.gap1, cfg.bottomY]);
  inner.push([xAt(side, cfg.bottomY + 1.5), cfg.bottomY + 1.5]);

  /* attached gum: flush with the tooth, down to the bone */
  const attach: Pt[] = [];
  for (let y = cfg.bottomY + 5; y <= 238; y += 6) attach.push([xAt(side, y), y]);

  /* underside follows the bone crest */
  const under: Pt[] = [];
  const xs = [0, 20, 50, 90, 140, 190].map((d) => xAt(side, 236) + o * d);
  for (const x of xs) under.push([x, crestY(x) + 3]);
  under.push([FAR[side], crestY(FAR[side]) + 3]);

  const topD = curve(top);
  const fill =
    topD +
    `L${f(inner[0][0])} ${f(inner[0][1])}` +
    curve(inner, false) +
    attach.map((p) => `L${f(p[0])} ${f(p[1])}`).join("") +
    curve(under, false) +
    "Z";

  const gapPts = [...inner.slice(0, -1), [xAt(side, cfg.bottomY), cfg.bottomY] as Pt];
  const back: Pt[] = [];
  for (let y = cfg.bottomY; y >= cfg.lipY; y -= 3.5) back.push([xAt(side, y) - o * 0.8, y]);
  const gap =
    `M${f(lipX)} ${f(cfg.lipY)}` +
    gapPts.map((p) => `L${f(p[0])} ${f(p[1])}`).join("") +
    back.map((p) => `L${f(p[0])} ${f(p[1])}`).join("") +
    "Z";

  /* the free edge as drawn: reverse so it runs from the tooth outwards is not needed */
  return { fill, top: topD, gap };
}

/* ---------- deposits ---------- */

/** Thin soft film on the surface from y0 to y1: thicker towards the gum. */
export function plaqueShape(side: Side, y0: number, y1: number, thin: number, thick: number, seed = 1) {
  const o = out(side);
  const r = rng(seed);
  const n = Math.max(6, Math.round((y1 - y0) / 7));
  const outer: Pt[] = [];
  for (let k = 0; k <= n; k++) {
    const t = k / n;
    const y = lerp(y0, y1, t);
    const ends = smooth(t / 0.12) * smooth((1 - t) / 0.12);
    const th = (lerp(thin, thick, Math.pow(t, 1.3)) + (r() - 0.5) * 0.9) * ends;
    outer.push([xAt(side, y) + o * Math.max(0.2, th), y]);
  }
  const inner = span(side, y1, y0, 4).map(([x, y]) => [x - o * 0.4, y] as Pt);
  const d = curve(outer) + `L${f(inner[0][0])} ${f(inner[0][1])}` + inner.map((p) => `L${f(p[0])} ${f(p[1])}`).join("") + "Z";
  return d;
}

/**
 * Hard deposit: an angular, bumpy crust on the surface between y0 and y1,
 * thickest at `peak`. `limit` can cap the thickness at a height (inside a
 * groove it must stay narrower than the groove). Straight segments only.
 */
export function tartarShape(
  side: Side,
  y0: number,
  y1: number,
  peak: number,
  thick: number,
  seed = 7,
  limit?: (y: number) => number,
) {
  const o = out(side);
  const r = rng(seed);
  const step = 3.4;
  const outer: Pt[] = [];
  for (let y = y0; y <= y1 + 0.01; y += step) {
    const reach = y < peak ? peak - y0 : y1 - peak;
    const bell = 1 - Math.pow(Math.min(1, Math.abs(y - peak) / Math.max(1, reach)), 1.6);
    const bump = 0.72 + r() * 0.56;
    let th = Math.max(0, thick * bell * bump);
    if (limit) th = Math.min(th, limit(y));
    outer.push([xAt(side, y) + o * th, y]);
  }
  /* angular: make every other point stick out a little further */
  const pts = outer.map(([x, y], i) => [x + (i % 2 ? o * 1.2 : 0), y] as Pt);
  const base = span(side, y1, y0, step).map(([x, y]) => [x - o * 0.6, y] as Pt);
  const d = poly(pts) + poly(base).replace(/^M/, "L") + "Z";
  /* a few facet lines inside the crust */
  const facets = pts
    .map((p, i) => ({ p, i }))
    .filter(({ i }) => i > 0 && i < pts.length - 2 && i % 2 === 1)
    .map(({ p, i }) => {
      /* from a bump down to the surface, a little above or below it */
      const yy = p[1] + (i % 4 === 1 ? 4 : -4);
      return `M${f(p[0])} ${f(p[1])}L${f(xAt(side, yy))} ${f(yy)}`;
    })
    .join("");
  return { d, facets, edge: pts };
}

/** A faint stain: short stretches just inside the surface. */
export function stainPath(side: Side, y0: number, y1: number): string {
  const o = out(side);
  return poly(span(side, y0, y1, 4).map(([x, y]) => [x - o * 1.8, y] as Pt));
}

/** Small angular flecks (for scaling): [x, y, size, rotation]. */
export function fleckPath(x: number, y: number, s: number, rot: number, seed: number): string {
  const r = rng(seed);
  const a = (rot * Math.PI) / 180;
  const pts: Pt[] = [
    [-1, -0.2 - r() * 0.3],
    [-0.2, -1 + r() * 0.2],
    [0.9, -0.3 + r() * 0.3],
    [0.5, 0.8],
    [-0.7, 0.6 + r() * 0.3],
  ];
  return (
    pts
      .map(([px, py], i) => {
        const rx = (px * Math.cos(a) - py * Math.sin(a)) * s;
        const ry = (px * Math.sin(a) + py * Math.cos(a)) * s;
        return `${i ? "L" : "M"}${f(x + rx)} ${f(y + ry)}`;
      })
      .join("") + "Z"
  );
}
