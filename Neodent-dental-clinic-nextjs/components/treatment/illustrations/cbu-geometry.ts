import { curve, f, type Pt } from "./geometry";
import { closedCurve, crownPts, poly, sample } from "./rct-geometry";

/* ------------------------------------------------------------------
   Shared geometry for the composite build-up scenes. Everything is drawn
   in the same 640 x 480 scene space as the root canal scenes, on the same
   lower molar (rct-geometry.ts, centred on x = 320), so the crown, gumline
   and cusps sit at the same coordinates from scene to scene.

   One prepared cavity is shared by every scene that shows a restoration
   (C1, C3a-d, C4a-d, C5, C2a): the right-hand cusp and its outer wall are
   missing down to a floor at about y = 150, well clear of the pulp chamber.
   ------------------------------------------------------------------ */

export const CX = 320;

/** The crown outline, sampled (left neck over the cusps to the right neck). */
const SIL = sample(crownPts(), 12);
const iMid = SIL.findIndex((p) => p[0] >= 320);
const iA = SIL.findIndex((p, i) => i > iMid && p[0] >= 342.5);
const iF = SIL.findIndex((p, i) => i > iA && p[1] >= 150.4);

/** Where the cavity wall leaves the cusp slope, and where the floor meets the outer wall. */
export const A: Pt = SIL[iA];
export const F: Pt = SIL[iF];

/** The part of the crown outline that belongs to the missing corner (A down to F). */
export const CORNER: Pt[] = SIL.slice(iA, iF + 1);

/** Prepared wall of the cavity, from the surface (A) down and out to the outer wall (F). */
export const WALL: Pt[] = [
  A,
  [346.8, 113],
  [353, 125.5],
  [360.2, 137],
  [368.6, 146],
  [377.6, 150.2],
  F,
];
export const WALL_D = curve(WALL);

/** Cavity region, open to the air above and to the right (used to cut the tooth). */
export const CAV_OPEN_D = `${WALL_D}L412 ${f(F[1])}L412 60L${f(A[0])} 60Z`;
/** Same, plus a full-canvas rectangle: clip with evenodd to remove the cavity from the tooth. */
export const CAV_CUT_D = `M0 0H640V480H0Z${CAV_OPEN_D}`;

/** The missing tissue, exactly: the corner of the crown between the wall and the old outline. */
export const FILL_D =
  poly(CORNER) + curve([...WALL].reverse(), false) + "Z";
export const CORNER_D = poly(CORNER);

/** Tops of the composite increments, bottom to top (the last band runs up to the surface). */
export const INCR_Y = [139, 127, 115] as const;

/** A thin curved increment line across the cavity at height y. */
export const incrD = (y: number) => `M330 ${f(y)}Q364 ${f(y + 4)} 412 ${f(y - 2.4)}`;
/** The area of the cavity below a curved level at height y (for a part-filled cavity). */
export const belowD = (y: number) =>
  `M330 ${f(y)}Q364 ${f(y + 4)} 412 ${f(y - 2.4)}L412 170L330 170Z`;

/** Centre of the missing corner. */
export const CORNER_C: Pt = [366, 125];

/** The missing corner scaled about its centre, closed, as a dashed-outline path. */
export function cornerHaloD(k = 1.2): string {
  const pts: Pt[] = [...CORNER, ...WALL.slice(1, -1).reverse()].map(
    ([x, y]) => [CORNER_C[0] + (x - CORNER_C[0]) * k, CORNER_C[1] + (y - CORNER_C[1]) * k] as Pt,
  );
  return closedCurve(sample(pts, 1).filter((_, i) => i % 3 === 0));
}

/** Residual decayed tissue lining the floor and inner wall (C4b). */
export const DECAY_D = closedCurve([
  [353.8, 126],
  [360.6, 137],
  [369, 146.6],
  [378, 150.2],
  [385, 150.4],
  [385.5, 142.5],
  [377, 140.6],
  [369.5, 136.4],
  [364.6, 128.4],
  [360.5, 118.6],
  [355.5, 117.5],
]);

/* ---------- lifted inlay (C3d) ---------- */

/** How far the porcelain piece floats above its cavity. */
export const LIFT = 26;

/* ---------- worn crown (C2d) ---------- */

/** Height of the worn biting surface. The unworn cusps reach y = 100. */
export const WEAR_Y = 120;
export const WEAR_D = `M120 ${WEAR_Y - 1}L252 ${WEAR_Y - 1}Q320 ${WEAR_Y + 5} 388 ${WEAR_Y - 1}L520 ${WEAR_Y - 1}L520 480L120 480Z`;
/** The worn surface, as a line. */
export const WEAR_LINE_D = `M254 ${WEAR_Y - 1}Q320 ${WEAR_Y + 5} 386 ${WEAR_Y - 1}`;

/* ---------- cracked crown (C2c) ---------- */

/** A fine crack from the central fissure into the dentine, stopping well short of the pulp. */
export const CRACK_PTS: Pt[] = [
  [321, 118],
  [319.4, 124],
  [322.2, 129.5],
  [319.6, 135],
  [320.6, 138],
];
export const CRACK_D = curve(CRACK_PTS);

/* ---------- anterior tooth (C2b) ---------- */

/** Upper front tooth, cut front to back (labial side on the left). Same scale as the
 *  molar: crown 96 to 206, root to 376. Clockwise from the labial incisal corner. */
export const INCISOR: Pt[] = [
  [296, 98], [310, 95.6], [326, 96],
  [334, 108], [337.4, 126], [338, 141], [337, 154], [340, 169], [347, 184], [352, 198], [352, 206],
  [350.6, 240], [346, 282], [339, 322], [331, 352], [322.4, 370], [316.6, 376],
  [309.6, 370], [301.4, 350], [294, 322], [288, 282], [283.6, 240], [281, 206],
  [280, 196], [279, 178], [280.4, 156], [283.6, 134], [288, 114],
];
/** Enamel thickness at each outline point. */
export const INCISOR_ENAMEL: number[] = [
  8, 11, 8,
  8, 7, 6, 5, 5, 4, 2, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  2, 3, 5, 6, 7,
];
export const INCISOR_D = closedCurve(INCISOR);
/** Crown only, closed across the neck (for clipping the enamel ring). */
export const INCISOR_CROWN_D = closedCurve([
  ...INCISOR.slice(0, 11),
  [352, 212],
  [281, 212],
  ...INCISOR.slice(22),
]);

/** Dentine core of the crown: the outline pulled in towards the axis by the enamel thickness. */
export function incisorCoreD(): string {
  const mid: Pt = [316, 158];
  const inset = (i: number): Pt => {
    const p = INCISOR[i];
    const dx = mid[0] - p[0];
    const dy = mid[1] - p[1];
    const len = Math.hypot(dx, dy) || 1;
    return [p[0] + (dx / len) * INCISOR_ENAMEL[i], p[1] + (dy / len) * INCISOR_ENAMEL[i]];
  };
  const idx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const lab = [23, 24, 25, 26, 27];
  return closedCurve([...idx.map(inset), [351, 217], [282, 217], ...lab.map(inset)]);
}

/** Pulp of the front tooth: a narrow chamber with one horn, then a single canal to the tip. */
export const INCISOR_CHAMBER_D = closedCurve([
  [317, 121], [322.4, 133], [325.6, 153], [327.4, 177], [327, 205], [324.4, 222],
  [318, 227], [311.6, 222], [309, 205], [308.6, 177], [310.4, 153], [312.6, 133],
]);
export const INCISOR_CANAL: Pt[] = [[318, 218], [318.4, 262], [317.8, 304], [317.2, 342], [316.8, 364]];

/** The break: from the labial surface up and across to the incisal edge. */
const BREAK: Pt[] = [
  [285.4, 128], [290.4, 120.4], [295.6, 116], [299.6, 110.4], [304.4, 106], [308.4, 101], [312.4, 98.4], [317.4, 96.4],
];
/** The corner that has broken off, as the cut that removes it from the tooth. */
export const CHIP_CUT_D =
  poly([[250, 70], [319, 70], ...BREAK.slice().reverse(), [284, 130], [250, 131]]) + "Z";
export const CHIP_BREAK_D = poly(BREAK);
/** The missing corner, as a dashed outline. */
export const CHIP_HALO_D = closedCurve([
  [288, 93], [302, 89.6], [318, 90], [323, 95.6], [315.6, 100], [309.6, 106], [304, 112.6],
  [298.4, 119.6], [292, 127], [286, 134.4], [281, 126], [281.6, 108],
]);