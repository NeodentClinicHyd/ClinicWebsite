import { useId, type ReactNode } from "react";
import s from "./illustrations.module.css";
import { X, curve, f, type Pt } from "./geometry";
import {
  ArchFront,
  archGeometry,
  biteY,
  toothTransform,
  type ArchSpec,
} from "./arch";
import { toothPath } from "./archGeometry";
import {
  Abutment,
  Annot,
  Arrow,
  Bone,
  Callout,
  Crown,
  DimensionLine,
  Gum,
  Implant,
  Label,
  Magnifier,
  NaturalTooth,
  PreparedStump,
  Scene,
  crownD,
  rootD,
} from "./parts";

/* ------------------------------------------------------------------
   Scenes for /treatments/full-mouth-rehabilitation. Every frontal scene is
   a composition of ArchFront tooth states in the shared 640 x 480 space, so
   one tooth looks the same wherever it appears. Annotations follow the
   implant pages: red hairline leaders with 4px dots, 24-unit ink labels
   (about 12px at phone width), dashed red zones, red arrows.
   M1 shows an examination (conditions), M5c shows work in progress; nothing
   here is a result.
   ------------------------------------------------------------------ */

type P = { className?: string };

/** Same 4:3 framing for the four "when might it be discussed" scenes. */
const CROP = "126 92 388 291";
const FULL = "0 0 640 480";
const CHOICE_CROP = "70 64 500 375";

const place = (cx: number, cy: number, k: number) =>
  `translate(${cx} ${cy}) scale(${k}) translate(-320 -240)`;
/** Scene point of arch point (x, y) after `place`. */
const at = (cx: number, cy: number, k: number, x: number, y: number): Pt => [
  cx + (x - 320) * k,
  cy + (y - 240) * k,
];

/** Soft ivory fade on the left and right edges of a tight crop, so the arch
 *  dissolves into the frame instead of ending in a hard vertical cut. */
function EdgeFade({ viewBox, w = 22 }: { viewBox: string; w?: number }) {
  const [x, y, vw, vh] = viewBox.split(" ").map(Number);
  return (
    <g>
      <rect x={x - 1} y={y - 1} width={w + 1} height={vh + 2} fill="url(#neo-edge-l)" stroke="none" />
      <rect x={x + vw - w} y={y - 1} width={w + 1} height={vh + 2} fill="url(#neo-edge-r)" stroke="none" />
    </g>
  );
}

function ArcArrow({ x1, x2, y, lift = 7 }: { x1: number; x2: number; y: number; lift?: number }) {
  const xm = (x1 + x2) / 2;
  const d = `M${f(x1)} ${f(y)}Q${f(xm)} ${f(y - lift * 2)} ${f(x2)} ${f(y)}`;
  const head = (px: number, dirX: number) => {
    const len = Math.hypot(dirX, lift * 2);
    const ux = dirX / len;
    const uy = (lift * 2) / len;
    const bx = px - ux * 11;
    const by = y - uy * 11;
    const nx = -uy;
    const ny = ux;
    return `${f(px)},${f(y)} ${f(bx + nx * 5.5)},${f(by + ny * 5.5)} ${f(bx - nx * 5.5)},${f(by - ny * 5.5)}`;
  };
  return (
    <g>
      <path d={d} fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="4.5" />
      <path d={d} className={s.redLine} />
      <polygon points={head(x1, x1 - xm)} className={s.redFill} />
      <polygon points={head(x2, x2 - xm)} className={s.redFill} />
    </g>
  );
}

/* ================= M1 - Examination view ================= */

export function ExamArch({ className }: P) {
  const zone = (x0: number, y0: number, x1: number, y1: number) => (
    <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx="16" fill="#D71920" fillOpacity="0.05" className={s.redDash} />
  );
  return (
    <Scene
      className={className}
      viewBox={FULL}
      title="Examination view of the upper and lower teeth showing the kinds of problem a dentist looks for"
      desc="Front view of the upper and lower teeth. One upper tooth is missing, the upper front teeth are worn flat, a canine carries a large filling with a stained edge, and the gum has pulled back from two lower teeth. Four dashed red zones are labelled missing teeth, worn or damaged teeth, gum health and bite. This shows conditions found at an examination, not a treatment result. Illustration, not to scale."
    >
      <ArchFront
        upper={{
          1: { state: "missing" },
          3: { state: "worn" },
          4: { state: "worn" },
          5: { state: "worn" },
          6: { state: "worn" },
          7: { state: "largeFilling" },
        }}
        lower={{ 7: { gum: "recession" }, 8: { gum: "recession" } }}
      />
      <Annot>
        {zone(112, 148, 174, 254)}
        {zone(206, 144, 482, 260)}
        {zone(396, 292, 494, 350)}
        {zone(492, 210, 568, 276)}
        <Callout pts={[[143, 70], [143, 148]]} />
        <Callout pts={[[344, 70], [344, 144]]} />
        <Callout pts={[[445, 424], [445, 350]]} />
        <Callout pts={[[598, 70], [598, 243], [568, 243]]} />
      </Annot>
      <Label x={34} y={52}>Missing teeth</Label>
      <Label x={250} y={52}>Worn or damaged teeth</Label>
      <Label x={598} y={52} anchor="middle">Bite</Label>
      <Label x={445} y={444} anchor="middle">Gum health</Label>
    </Scene>
  );
}
/* ================= M2 - When might it be discussed (4:3 crops) ================= */

export function MissingTeethScene({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={CROP}
      title="Several missing teeth"
      desc="Front view of the upper and lower teeth with three upper teeth and one lower tooth missing, leaving gaps in the gum ridge."
    >
      <ArchFront
        upper={{ 2: { state: "missing" }, 3: { state: "missing" }, 8: { state: "missing" } }}
        lower={{ 6: { state: "missing" } }}
      />
          <EdgeFade viewBox={CROP} w={24} />
    </Scene>
  );
}

export function WornTeethScene({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={CROP}
      title="Worn, cracked and heavily filled teeth"
      desc="Front view of the teeth. The upper front teeth are worn short with flat edges and a band of darker dentin, one has a hairline crack, and a canine carries a large filling with a stained edge. A lower tooth has a large filling too."
    >
      <ArchFront
        upper={{
          3: { state: "worn" },
          4: { state: "worn" },
          5: { state: "cracked" },
          6: { state: "worn" },
          7: { state: "largeFilling" },
        }}
        lower={{ 2: { state: "largeFilling" }, 5: { state: "worn" }, 6: { state: "worn" } }}
      />
          <EdgeFade viewBox={CROP} w={24} />
    </Scene>
  );
}

export function BiteGrindScene({ className }: P) {
  const Tl = archGeometry("lower");
  const Tu = archGeometry("upper");
  const yU = Tu[0].yInc - Tu[0].h + 4;
  const yL = Tl[0].yInc + Tl[0].h - 2;
  return (
    <Scene
      className={className}
      viewBox={CROP}
      title="Bite and grinding"
      desc="Front view of the upper and lower teeth with the front teeth worn flat. Two red double-headed arcs run along the bite line to show grinding from side to side, and a red dimension line on the left measures the height between the upper and lower gum."
    >
      <ArchFront
        upper={{ 3: { state: "worn" }, 4: { state: "worn" }, 5: { state: "worn" }, 6: { state: "worn" }, 2: { state: "worn" }, 7: { state: "worn" } }}
        lower={{ 3: { state: "worn" }, 4: { state: "worn" }, 5: { state: "worn" }, 6: { state: "worn" } }}
      />
      <Annot>
        <ArcArrow x1={158} x2={262} y={biteY(210) + 3} lift={6} />
        <ArcArrow x1={378} x2={482} y={biteY(430) + 3} lift={6} />
        <path d={`M320 ${f(yU + 10)}V${f(yL - 10)}`} stroke="#fff" strokeOpacity="0.85" strokeWidth="6" fill="none" style={{ vectorEffect: "non-scaling-stroke" }} />
        <DimensionLine x1={320} y1={yU} x2={320} y2={yL} tick={9} />
      </Annot>
          <EdgeFade viewBox={CROP} w={24} />
    </Scene>
  );
}

export function GumHealthScene({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={CROP}
      title="Gum health"
      desc="Front view of healthy-looking teeth. The gum has pulled back from several upper teeth, exposing the yellower root surface, and the gum edge around the lower front teeth is red and swollen."
    >
      <ArchFront
        upper={{
          2: { gum: "recession" },
          3: { gum: "recession" },
          4: { gum: "inflamed" },
          5: { gum: "inflamed" },
          7: { gum: "recession" },
          8: { gum: "recession" },
        }}
        lower={{ 3: { gum: "inflamed" }, 4: { gum: "inflamed" }, 5: { gum: "inflamed" }, 6: { gum: "inflamed" } }}
      />
          <EdgeFade viewBox={CROP} w={24} />
    </Scene>
  );
}

/* ================= M3 - What a plan can include (4:3) ================= */

const ROW = "-10 -90 660 495";

export function IncludeRestorative({ className }: P) {
  const id = useId().replace(/:/g, "");
  const root = (cx: number, v = 0) => (
    <g>
      <path d={rootD(cx, v)} fill="url(#neo-root)" className={s.eDentin} />
      <path d={rootD(cx, v)} className={s.lig} />
    </g>
  );
  const cutY = 142; // the biting surface above this line is removed
  const lift = 124;
  return (
    <Scene
      className={className}
      viewBox={ROW}
      title="Restorative care: a crown, an onlay and an implant crown"
      desc="Cut-away of the jaw with five teeth. On the left a tooth shaped for a crown has a porcelain crown hovering above it. In the middle a tooth with its biting surface removed has a porcelain onlay hovering above it. On the right an implant post and abutment carry a crown. Two natural teeth frame the row. Illustration, not to scale."
    >
      <clipPath id={`${id}k`}>
        <rect x="230" y={cutY} width="180" height="320" />
      </clipPath>
      <clipPath id={`${id}t`}>
        <rect x="230" y="-90" width="180" height={cutY + 90 - lift} />
      </clipPath>
      <Bone x0={66} x1={574} floor={388} />
      <NaturalTooth cx={X.o1} v={1} />
      <NaturalTooth cx={X.o2} v={-1} />
      {root(X.n1, -1)}
      <PreparedStump cx={X.n1} />
      <g clipPath={`url(#${id}k)`}>
        <NaturalTooth cx={320} />
      </g>
      <path
        d={`M${320 - 41} ${cutY}Q320 ${cutY - 9} ${320 + 41} ${cutY}L${320 + 42} ${cutY + 5}Q320 ${cutY + 12} ${320 - 42} ${cutY + 5}Z`}
        fill="url(#neo-arch-stump)"
        className={s.eDentin}
      />
      <Gum x0={66} x1={574} half={2} />
      <Implant cx={X.n2} />
      <Abutment cx={X.n2} />
      <Annot>
        <g transform={`translate(0 ${-lift})`}>
          <Crown cx={X.n1} v={-1} cut />
        </g>
        <g clipPath={`url(#${id}t)`}>
          <g transform={`translate(0 ${-lift})`}>
            <Crown cx={320} />
          </g>
        </g>
        <path
          d={`M${320 - 41} ${cutY - lift}Q320 ${cutY - lift + 7} ${320 + 41} ${cutY - lift}L${320 + 41} ${cutY - lift - 6}Q320 ${cutY - lift + 1} ${320 - 41} ${cutY - lift - 6}Z`}
          fill="#D9CFB9"
          stroke="#B5A88E"
          strokeWidth="1.2"
        />
        <g transform={`translate(0 ${-lift})`}>
          <Crown cx={X.n2} v={1} cut />
        </g>
        <Arrow x1={X.n1} y1={86} x2={X.n1} y2={114} w={3.4} head={13} spread={8} />
        <Arrow x1={320} y1={36} x2={320} y2={128} w={3.4} head={13} spread={8} />
        <Arrow x1={X.n2} y1={82} x2={X.n2} y2={100} w={3.4} head={12} spread={7.5} />
      </Annot>
    </Scene>
  );
}
export function IncludeGum({ className }: P) {
  const sulcus = "M352 178C352.4 192 351.6 208 350 227";
  return (
    <Scene
      className={className}
      viewBox="112 30 416 312"
      title="Gum health: the gum edge and the depth of the groove beside a tooth"
      desc="Cut-away of the jaw with three teeth and the gum between them. A thin dark groove runs down beside the middle tooth between tooth and gum, and a red dimension line beside it shows how deep that groove goes. Illustration, not to scale."
    >
      <Bone x0={150} x1={490} />
      <NaturalTooth cx={X.n1} v={-1} />
      <NaturalTooth cx={320} />
      <NaturalTooth cx={X.n2} v={1} />
      <Gum x0={150} x1={490} />
      <path d={sulcus} fill="none" stroke="#7E3F3D" strokeOpacity="0.75" strokeWidth="3.4" strokeLinecap="round" />
      <path d={sulcus} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1" transform="translate(-1.8 0)" />
      <Annot>
        <path d="M356 178H378M356 227H378" className={s.hair} />
        <DimensionLine x1={374} y1={178} x2={374} y2={227} tick={8} />
      </Annot>
    </Scene>
  );
}

const ALIGN_CROP = "148 92 344 258";

export function IncludeAlignment({ className }: P) {
  const spec: ArchSpec = {
    2: { dx: -9, dy: -7, rot: -7, bracket: true },
    3: { dx: 4, rot: 17, bracket: true },
    4: { bracket: true },
    5: { bracket: true },
    6: { dx: -4, rot: -13, bracket: true },
    7: { dx: 9, dy: -6, rot: 6, bracket: true },
  };
  return (
    <Scene
      className={className}
      viewBox={ALIGN_CROP}
      title="Alignment: teeth with small brackets and a wire, and arrows showing where they will move"
      desc="Front view of the upper front teeth. A canine on each side sits forward and the two lateral incisors are turned. Small brackets sit on the teeth and a thin wire runs through them. Short red arrows below the teeth show the direction each one will move."
    >
      <ArchFront show="upper" upper={spec} />
      <Annot>
        <Arrow x1={172} y1={272} x2={206} y2={272} w={3} head={11} spread={7} />
        <Arrow x1={468} y1={272} x2={434} y2={272} w={3} head={11} spread={7} />
        <Arrow x1={230} y1={288} x2={252} y2={288} w={3} head={10} spread={6.5} />
        <Arrow x1={410} y1={288} x2={388} y2={288} w={3} head={10} spread={6.5} />
      </Annot>
          <EdgeFade viewBox={ALIGN_CROP} w={16} />
    </Scene>
  );
}

export function IncludeBite({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={CROP}
      title="Bite: a clear night-guard splint over the upper teeth"
      desc="Front view of the upper and lower teeth with a thin clear splint fitted over the upper teeth, its edge following the biting edges and the tooth surfaces showing through."
    >
      <ArchFront splint="upper" />
          <EdgeFade viewBox={CROP} w={24} />
    </Scene>
  );
}

export function IncludeCosmetic({ className }: P) {
  const shades = ["#FDFAF3", "#F6EFDD", "#EDE0C2", "#E3D1A6", "#D8C18C"];
  return (
    <Scene
      className={className}
      viewBox={ALIGN_CROP}
      title="Cosmetic care: front teeth beside a strip of tooth shade samples"
      desc="Front view of the upper front teeth with a gentle highlight on each. Below them lies a strip of five small tooth-shaped shade samples running from lighter to darker, with one outlined in red."
    >
      <ArchFront
        show="upper"
        upper={{ 4: { state: "crown" }, 5: { state: "crown" }, 3: { state: "natural" }, 6: { state: "natural" } }}
      />
      <g>
        <rect x="212" y="268" width="216" height="40" rx="8" fill="#3d2f16" fillOpacity="0.16" stroke="none" transform="translate(2 3)" filter="url(#neo-blur3)" />
        <rect x="212" y="268" width="216" height="40" rx="8" fill="url(#neo-ti-v)" className={s.eTi} />
        {shades.map((c, i) => {
          const x = 222 + i * 40;
          const d = `M${x} 308L${x} 288Q${x} 278 ${x + 14} 278Q${x + 28} 278 ${x + 28} 288L${x + 28} 308Z`;
          return (
            <g key={c}>
              <path d={d} fill={c} stroke="#B5A88E" strokeWidth="1.1" />
              <path d={`M${x + 5} 288C${x + 4} 294 ${x + 5} 299 ${x + 7} 303`} fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="2" />
            </g>
          );
        })}
        <Annot>
          <path d="M302 308L302 288Q302 278 316 278Q330 278 330 288L330 308Z" fill="none" className={s.redLine} strokeWidth="2px" />
        </Annot>
      </g>
          <EdgeFade viewBox={ALIGN_CROP} w={16} />
    </Scene>
  );
}

/* ================= M5 - How a plan is made / stages (4:3) ================= */

const tints3 = (u: ArchSpec = {}): ArchSpec => {
  const out: ArchSpec = {};
  for (let i = 0; i < 10; i++) out[i] = { ...u[i], tint: i <= 2 ? 1 : i <= 6 ? 2 : 3 };
  return out;
};

function Film({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="9" fill="#3d2f16" fillOpacity="0.18" stroke="none" filter="url(#neo-blur3)" transform="translate(2 3)" />
      <rect x={x} y={y} width={w} height={h} rx="9" fill="url(#neo-film)" stroke="#5A666B" strokeWidth="1.5" />
      <clipPath id={`fmr-film-${x}-${y}`}>
        <rect x={x + 2} y={y + 2} width={w - 4} height={h - 4} rx="7" />
      </clipPath>
      <g clipPath={`url(#fmr-film-${x}-${y})`}>{children}</g>
    </g>
  );
}

export function PlanAssessment({ className }: P) {
  const k = 1.06;
  const A = (x: number, y: number) => at(296, 342, k, x, y);
  const [ax0] = A(258, 0);
  const [ax1] = A(382, 0);
  const yTop = A(0, 126)[1] - 16;
  const yU = A(0, 185)[1];
  const yL = A(0, 288)[1];
  const fx = 436;
  const fy = 22;
  const teeth = [0, 1, 2, 3, 4].map((n) => 320 + (n - 2) * 98);
  return (
    <Scene
      className={className}
      viewBox={FULL}
      title="Assessment: the teeth are measured and a small X-ray panel is studied"
      desc="Front view of the upper and lower teeth with a red dimension line across the two upper front teeth and another beside the arch. At the top right a dark X-ray style panel shows the teeth, their roots and the bone as pale line work."
    >
      <g transform={place(296, 342, k)}>
        <ArchFront
          upper={{ 1: { state: "missing" }, 4: { state: "worn" }, 5: { state: "worn" }, 7: { state: "largeFilling" } }}
          lower={{ 7: { gum: "recession" } }}
        />
      </g>
      <Annot>
        <DimensionLine x1={ax0} y1={yTop} x2={ax1} y2={yTop} tick={8} />
        <path d={`M12 ${f(yU)}H44M12 ${f(yL)}H44`} className={s.hairDash} />
        <DimensionLine x1={12} y1={yU} x2={12} y2={yL} tick={7} />
      </Annot>
      <Film x={fx} y={fy} w={192} h={170}>
        <g transform={`translate(${fx + 96} ${fy + 28}) scale(0.3) translate(-320 -66)`}>
          <path d="M-100 300C60 292 200 300 320 296C440 300 580 292 740 300L740 380L-100 380Z" fill="#DCE6EA" fillOpacity="0.14" stroke="none" />
          <path d="M-100 300C60 292 200 300 320 296C440 300 580 292 740 300" className={s.filmLine} strokeWidth="1.6px" />
          {teeth.map((cx, i) => (
            <g key={cx}>
              <path d={rootD(cx, i - 2)} fill="#F1F5F6" fillOpacity="0.18" className={s.filmLine} />
              <path d={crownD(cx, i - 2)} fill="#F1F5F6" fillOpacity="0.32" className={s.filmLine} />
            </g>
          ))}
        </g>
        <path d={`M${fx + 14} ${fy + 148}H${fx + 178}`} stroke="#e9eef0" strokeOpacity="0.28" strokeWidth="1" />
        <path d={`M${fx + 14} ${fy + 156}H${fx + 120}`} stroke="#e9eef0" strokeOpacity="0.2" strokeWidth="1" />
      </Film>
    </Scene>
  );
}

const PLAN_CROP = "86 64 468 351";

export function PlanWritten({ className }: P) {
  const k = 1;
  const sw = [
    { x: 262, o: 0.5 },
    { x: 306, o: 0.32 },
    { x: 350, o: 0.17 },
  ];
  return (
    <Scene
      className={className}
      viewBox="86 66 468 351"
      title="A written plan: zones of the mouth tinted from deep to light red to show the order of treatment"
      desc="Front view of the upper and lower teeth. The teeth on the left are tinted deep red, the front teeth a medium red and the teeth on the right a light red. Below, a legend runs from a deep to a light swatch between the words First and Then."
    >
      <g transform={place(320, 196, k)}>
        <ArchFront upper={tints3()} lower={tints3()} />
      </g>
      <Annot>
        {sw.map((c) => (
          <rect key={c.x} x={c.x} y="364" width="38" height="30" rx="5" fill="#D71920" fillOpacity={c.o} stroke="#B5121A" strokeOpacity="0.35" strokeWidth="1" />
        ))}
      </Annot>
      <Label x={100} y={380} size={54}>First</Label>
      <Label x={404} y={380} size={54}>Then</Label>
          <EdgeFade viewBox="86 66 468 351" w={18} />
    </Scene>
  );
}

const restored = (): { upper: ArchSpec; lower: ArchSpec } => ({
  upper: {
    2: { state: "prepared" },
    5: { state: "crown" },
    6: { state: "pontic" },
    7: { state: "crown" },
    8: { state: "implantCrown" },
  },
  lower: { 8: { state: "crown" }, 9: { state: "crown" } },
});

export function PlanPhases({ className }: P) {
  const { upper, lower } = restored();
  return (
    <Scene
      className={className}
      viewBox={PLAN_CROP}
      title="Treatment in phases: some areas already restored while others are still natural"
      desc="Front view of the upper and lower teeth part-way through treatment. On the right side of the upper arch two crowns carry a replacement tooth between them as a bridge, and a crown sits on an implant. One upper tooth on the left is shaped for a crown. Two lower back teeth have crowns. The remaining teeth are still natural."
    >
      <g transform={place(320, 240, 1)}>
        <ArchFront upper={upper} lower={lower} />
      </g>
          <EdgeFade viewBox={PLAN_CROP} w={18} />
    </Scene>
  );
}

export function PlanReview({ className }: P) {
  const { upper, lower } = restored();
  const g = archGeometry("upper");
  const pts: Pt[] = [];
  for (let x = 118; x <= 522; x += 24) pts.push([x, biteY(x) + 3]);
  const edge = (i: number) => [g[i].cx, g[i].yInc] as Pt;
  void edge;
  return (
    <Scene
      className={className}
      viewBox="30 56 540 405"
      title="Review and maintenance: a check-up mirror and a line along the bite"
      desc="Front view of the restored upper and lower teeth. A dashed red line runs along the bite with a dot at each end, and a round check-up mirror with a short handle shows a magnified view of the upper teeth."
    >
      <g transform={place(300, 222, 1)}>
        <ArchFront upper={upper} lower={lower} />
        <Annot>
          <path d={curve(pts)} className={s.redDash} />
          <circle cx={pts[0][0]} cy={pts[0][1]} r="4" className={s.dot} />
          <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="4" className={s.dot} />
        </Annot>
      </g>
      <Magnifier cx={512} cy={382} r={64}>
        <g transform="translate(512 388) scale(1.7) translate(-398 -226)">
          <ArchFront show="upper" upper={upper} shadow={false} />
        </g>
      </Magnifier>
    </Scene>
  );
}

/* ================= M6 - Choosing how to treat many teeth (4:3) ================= */

export function ChoiceSeparate({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={CHOICE_CROP}
      title="Treating each tooth separately: one tooth treated on its own"
      desc="Front view of the upper and lower teeth shown in muted greys, with a single upper tooth carrying a large filling picked out in colour and outlined in red."
    >
      <g transform={place(320, 240, 1)}>
        <ArchFront focus upper={{ 7: { state: "largeFilling", hilite: true } }} />
      </g>
          <EdgeFade viewBox={CHOICE_CROP} w={14} />
    </Scene>
  );
}

export function ChoicePhased({ className }: P) {
  const k = 1;
  const spans: [number, number, number][] = [
    [88, 214, 0.85],
    [214, 426, 0.55],
    [426, 552, 0.35],
  ];
  return (
    <Scene
      className={className}
      viewBox={CHOICE_CROP}
      title="A phased full mouth plan: the whole mouth planned in zones, treated in order"
      desc="Front view of the upper and lower teeth tinted in three zones from deep red on the left through medium red at the front to light red on the right. Below the teeth, three red brackets mark the three zones."
    >
      <g transform={place(320, 236, k)}>
        <ArchFront upper={tints3()} lower={tints3()} />
        <Annot>
          {spans.map(([a, b, o]) => (
            <path key={a} d={`M${a + 4} 376V386H${b - 4}V376`} fill="none" stroke="#D71920" strokeOpacity={o} strokeWidth="2" style={{ vectorEffect: "non-scaling-stroke" }} />
          ))}
        </Annot>
      </g>
          <EdgeFade viewBox={CHOICE_CROP} w={14} />
    </Scene>
  );
}

export function ChoiceMonitor({ className }: P) {
  const g = archGeometry("upper")[5];
  const sp = { state: "worn" as const };
  return (
    <Scene
      className={className}
      viewBox={CHOICE_CROP}
      title="Review and monitor: a worn tooth watched at check-ups"
      desc="Front view of the upper and lower teeth. One worn upper front tooth is outlined with a dashed red line showing its earlier length, and a small red check mark in a ring above the arch points to it."
    >
      <g transform={place(320, 246, 1)}>
        <ArchFront upper={{ 5: sp }} />
        <Annot>
          <path d={toothPath(g)} transform={toothTransform(g, sp)} fill="none" className={s.redDash} />
        </Annot>
      </g>
      <Annot>
        <Callout pts={[[348, 112], [348, 170]]} />
        <circle cx="348" cy="94" r="18" fill="#fff" fillOpacity="0.9" stroke="#D71920" strokeWidth="1.5" />
        <path d="M339 94L346 101L358 87" fill="none" stroke="#D71920" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </Annot>
          <EdgeFade viewBox={CHOICE_CROP} w={14} />
    </Scene>
  );
}

