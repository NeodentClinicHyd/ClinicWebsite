import s from "./illustrations.module.css";
import p from "./sp-illustrations.module.css";
import { f, type Pt } from "./geometry";
import { Annot, Callout, Scene } from "./parts";
import { ArchFront, type ArchSpec } from "./arch";
import { EdgeFade } from "./braces-scenes";
import { gumGeometry } from "./archGeometry";
import {
  Applicator,
  Check,
  Flecks,
  InterdentalBrush,
  Lens,
  Mirror,
  Plaque,
  Scaler,
  SectionFade,
  SpDim,
  SpLabel,
  SpSection,
  Stain,
  Tartar,
  Toothbrush,
} from "./sp-parts";
import { GUM_DEEP, GUM_HEALTHY, SECTION_VB, gapAt } from "./sp-geometry";

/* ------------------------------------------------------------------
   Scenes for /treatments/scaling-and-polishing (G1, G2a, G2b, G3, G4a to
   G4d). The side-on scenes all draw the same front tooth, cut front to back
   (cbu-geometry INCISOR) with the same gum, bone and framing, so G1, G2a
   and G2b compare at a glance. Every scene shows a condition, a step or an
   idea, never a result. No numbers, no measurements, no equipment brands.
   Annotations follow the other treatment pages: red hairline leaders with
   4px dots, red dimension lines, Manrope labels. Label sizes are in scene
   units; each scene's size is chosen so the text is 12px or more at a 390px
   viewport. Red is for emphasis only.
   ------------------------------------------------------------------ */

type P = { className?: string };
const cls = (c?: string) => [p.sp, c].filter(Boolean).join(" ");

const L = 16; // label size in the 340-wide section scenes

/* ================= G1 - Plaque and tartar at the gumline ================= */

export function GumMargin({ className }: P) {
  return (
    <Scene
      className={cls(className)}
      viewBox={SECTION_VB}
      title="A tooth cut front to back at the gumline, with plaque, tartar and a faint stain"
      desc="Side view of a front tooth cut lengthwise, set in gum and jawbone. A thin, soft, speckled grey film of plaque covers the crown on both sides, with a few faint stains on the enamel. At the gum edge a darker, rough, angular crust of tartar sits against the tooth, and a small groove runs between the gum and the tooth. Three labels name the plaque, the tartar and the gum. Illustration, not to scale."
    >
      <SpSection gum={GUM_HEALTHY}>
        <Stain side="labial" ranges={[[122, 138], [152, 166]]} />
        <Stain side="lingual" ranges={[[130, 146]]} />
        <Plaque side="labial" y0={114} y1={196} thin={2.2} thick={4.8} seed={3} />
        <Plaque side="lingual" y0={118} y1={196} thin={2} thick={4.4} seed={5} />
        <Tartar side="labial" y0={176} y1={206} peak={196} thick={10} seed={7} />
        <Tartar side="lingual" y0={180} y1={206} peak={197} thick={8} seed={9} />
      </SpSection>
      <SectionFade viewBox={SECTION_VB} from={0.74} />
      <EdgeFade viewBox={SECTION_VB} w={16} />
      <Annot>
        <Callout pts={[[236, 118], [275, 130]]} />
        <Callout pts={[[236, 168], [262, 183], [272, 192]]} />
        <Callout pts={[[404, 174], [404, 214]]} />
      </Annot>
      <SpLabel x={228} y={118} anchor="end" size={L}>Plaque</SpLabel>
      <SpLabel x={228} y={168} anchor="end" size={L}>Tartar</SpLabel>
      <SpLabel x={404} y={160} anchor="middle" size={L}>Gum</SpLabel>
    </Scene>
  );
}

/* ================= G2a / G2b - the same tooth, two kinds of clean ================= */

export function RoutineClean({ className }: P) {
  return (
    <Scene
      className={cls(className)}
      viewBox={SECTION_VB}
      title="A routine clean: the tooth surface above the gumline, cleaned"
      desc="Side view of the same front tooth cut lengthwise, with a healthy gum and a shallow groove at the gum edge. The surface of the tooth is clean: no film or crust is left. A red dimension line with arrow heads runs alongside the crown from the biting edge down to the gumline, labelled Above the gumline, and a red check mark sits on the enamel. Illustration, not to scale."
    >
      <SpSection gum={GUM_HEALTHY} />
      <SectionFade viewBox={SECTION_VB} from={0.74} />
      <EdgeFade viewBox={SECTION_VB} w={16} />
      <Annot>
        <SpDim x={259} y1={102} y2={196} />
        <Check x={291} y={126} size={0.72} />
      </Annot>
      <SpLabel x={241} y={140} anchor="end" size={L}>Above the</SpLabel>
      <SpLabel x={241} y={159} anchor="end" size={L}>gumline</SpLabel>
    </Scene>
  );
}

const inGroove = (y: number) => (y > GUM_DEEP.lipY ? Math.max(0.6, gapAt(GUM_DEEP, y) * 0.78) : 99);

export function DeeperClean({ className }: P) {
  return (
    <Scene
      className={cls(className)}
      viewBox={SECTION_VB}
      title="A deeper cleaning: deposits reach below the gumline, into the space between tooth and gum"
      desc="Side view of the same front tooth cut lengthwise. The gum is slightly swollen and a deeper space opens between the tooth and the gum. Plaque and a rough dark crust of tartar sit on the tooth and continue below the gum edge into that space. A thin steel probe rests in the space, and a red dimension line with arrow heads runs along its depth, labelled Below the gumline. No measurements are shown. Illustration, not to scale."
    >
      <SpSection gum={GUM_DEEP}>
        <Stain side="labial" ranges={[[124, 138]]} />
        <Plaque side="labial" y0={114} y1={176} thin={2.2} thick={4.4} seed={3} />
        <Plaque side="lingual" y0={118} y1={176} thin={2} thick={4.2} seed={5} />
        <Tartar side="labial" y0={168} y1={226} peak={198} thick={10} seed={7} limit={inGroove} />
        <Tartar side="lingual" y0={172} y1={226} peak={199} thick={9} seed={9} limit={inGroove} />
        {/* probe: grip, bent shank, blunt end resting in the space */}
        <g>
          <path d="M160 100L214 138" className={p.handleEdge} />
          <path d="M160 100L214 138" className={p.handleBody} />
          <path d="M214 138C240 156 262 168 272 184L279.4 214" className={p.rodEdge} />
          <path d="M214 138C240 156 262 168 272 184L279.4 214" className={p.rodSteel} />
        </g>
      </SpSection>
      <SectionFade viewBox={SECTION_VB} from={0.74} />
      <EdgeFade viewBox={SECTION_VB} w={16} />
      <Annot>
        <SpDim x={259} y1={192} y2={227} />
      </Annot>
      <SpLabel x={241} y={196} anchor="end" size={L} onArt>Below the</SpLabel>
      <SpLabel x={241} y={215} anchor="end" size={L} onArt>gumline</SpLabel>
    </Scene>
  );
}

/* ================= G3 - healthy gum beside inflamed gum ================= */

const G3_VB = "0 0 640 440";
const PANEL_VB = "205 118 230 246";
const PANEL = { w: 294, h: 315, y: 22 };
const G3_X = [13, 333] as const;

const inflamedSpec: ArchSpec = Object.fromEntries(
  [2, 3, 4, 5, 6, 7].map((i) => [i, { gum: "inflamed" as const }]),
);

function Panel({ x, spec }: { x: number; spec: ArchSpec }) {
  return (
    <svg x={x} y={PANEL.y} width={PANEL.w} height={PANEL.h} viewBox={PANEL_VB}>
      <ArchFront upper={spec} lower={spec} shadow={false} />
      <EdgeFade viewBox={PANEL_VB} w={18} />
    </svg>
  );
}

export function GumsHealthyInflamed({ className }: P) {
  return (
    <Scene
      className={cls(className)}
      viewBox={G3_VB}
      title="Healthy gums beside inflamed gums, shown on the front teeth"
      desc="Two views of the front teeth and gums, side by side with a dashed line between them. On the left the gum edge is pale pink, thin and scalloped around each tooth. On the right the gum edge around the same teeth is darker red and puffier. The left is labelled Healthy gums and the right Inflamed gums. It shows two examples, not a diagnosis. Illustration, not to scale."
    >
      <Panel x={G3_X[0]} spec={{}} />
      <Panel x={G3_X[1]} spec={inflamedSpec} />
      <path d="M320 30V400" className={p.divider} />
      <SpLabel x={160} y={384} anchor="middle" size={26}>Healthy gums</SpLabel>
      <SpLabel x={480} y={384} anchor="middle" size={26}>Inflamed gums</SpLabel>
    </Scene>
  );
}

/* ================= G4a - gum check: magnified ring and a mirror ================= */

const G4A_VB = "120 90 400 300";
const MARGIN_FLAGS = Array.from({ length: 10 }, () => ({ ridge: false, rec: 0, infl: false }));

export function GumCheck({ className }: P) {
  const lens = { cx: 400, cy: 190, r: 42, k: 2.1 };
  const margin = gumGeometry("upper", MARGIN_FLAGS).margin;
  return (
    <Scene
      className={cls(className)}
      viewBox={G4A_VB}
      title="A gum check: the front teeth with a magnified ring on one gum edge and a small dental mirror"
      desc="Front view of the upper and lower teeth and gums. A round lens, drawn with a short handle, sits over the gum edge of one upper tooth and shows it larger, with a thin dashed red line along the gum edge. A small round dental mirror on a slim handle rests by the lower back teeth. No probe is shown. Illustration, not to scale."
    >
      <ArchFront />
      <EdgeFade viewBox={G4A_VB} w={26} />
      <Mirror x={188} y={326} rot={135} r={24} />
      <Lens cx={lens.cx} cy={lens.cy} r={lens.r} ang={-45}>
        <g transform={`translate(${lens.cx} ${lens.cy}) scale(${lens.k}) translate(-404 -188)`}>
          <ArchFront show="upper" shadow={false} />
          <path d={margin} className={s.redDash} />
        </g>
      </Lens>
    </Scene>
  );
}

/* ================= G4b / G4c - scaling and polishing, side on ================= */

const TILE_VB = "200 90 240 180";

export function ScalingStep({ className }: P) {
  return (
    <Scene
      className={cls(className)}
      viewBox={TILE_VB}
      title="Scaling: a hand-held instrument tip at the gum edge, with small flecks lifting away"
      desc="Side view of the front tooth cut lengthwise. A plain steel hand instrument with a short red tip rests against a crust of tartar at the gum edge, and a few small dark flecks lift away from the tooth. Some tartar and a thin film remain on the other side. No motor, cable or water is shown, because the instrument is chosen by the dentist. Illustration, not to scale."
    >
      <SpSection gum={GUM_HEALTHY}>
        <Plaque side="labial" y0={114} y1={170} thin={2} thick={3.6} seed={3} />
        <Plaque side="lingual" y0={118} y1={196} thin={2} thick={4.2} seed={5} />
        <Tartar side="labial" y0={180} y1={206} peak={194} thick={6} seed={7} />
        <Tartar side="lingual" y0={180} y1={206} peak={197} thick={8} seed={9} />
        <Flecks items={[[258, 166, 4.2, 20], [248, 154, 3.2, 70], [263, 150, 2.6, 130], [241, 165, 2.4, 40], [254, 140, 2.2, 100]]} />
        <Scaler x={273} y={186} rot={20} />
      </SpSection>
      <SectionFade viewBox={TILE_VB} from={0.8} />
      <EdgeFade viewBox={TILE_VB} w={12} />
    </Scene>
  );
}

const arc = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const pt = (a: number): Pt => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
  const [x0, y0] = pt(a0);
  const [x1, y1] = pt(a1);
  return `M${f(x0)} ${f(y0)}A${r} ${r} 0 0 1 ${f(x1)} ${f(y1)}`;
};

export function PolishingStep({ className }: P) {
  return (
    <Scene
      className={cls(className)}
      viewBox={TILE_VB}
      title="Polishing: a smooth tooth with sheen marks and a soft rounded applicator"
      desc="Side view of the front tooth cut lengthwise, clean and smooth. A soft rounded applicator on a slim handle rests lightly on the front of the tooth, and three short curved sheen marks beside the upper corner show the surface shining. No motor or brand shape is shown. Illustration, not to scale."
    >
      <SpSection gum={GUM_HEALTHY}>
        <Applicator x={289} y={160} rot={12} />
      </SpSection>
      <SectionFade viewBox={TILE_VB} from={0.8} />
      <EdgeFade viewBox={TILE_VB} w={12} />
      <Annot>
        <path d={arc(286, 128, 18, 198, 252)} className={p.sheen} />
        <path d={arc(286, 128, 30, 198, 252)} className={p.sheen} />
        <path d={arc(286, 128, 42, 198, 252)} className={p.sheen} />
      </Annot>
    </Scene>
  );
}

/* ================= G4d - advice for home ================= */

const G4D_VB = "190 104 260 195";

export function HomeAdvice({ className }: P) {
  return (
    <Scene
      className={cls(className)}
      viewBox={G4D_VB}
      title="Advice for home: a toothbrush at the gum line and an interdental brush between two teeth"
      desc="Front view of the upper front teeth and gum. A toothbrush rests with its bristles at the gum line of one tooth, and a slim interdental brush with a short bristled tip points into the gap between two others. No calendar, clock or numbers are shown. Illustration, not to scale."
    >
      <ArchFront show="upper" shadow={false} />
      <EdgeFade viewBox={G4D_VB} w={18} />
      <Toothbrush x={238} y={160} rot={25} />
      <InterdentalBrush x={381} y={214} rot={-149} />
    </Scene>
  );
}
