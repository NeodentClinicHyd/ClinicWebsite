import type { ReactNode } from "react";
import s from "./illustrations.module.css";
import r from "./rct-illustrations.module.css";
import { f, type Pt } from "./geometry";
import { Annot, Arrow, Bone, Callout, Label, Magnifier, Scene } from "./parts";
import {
  CanalWallDetail,
  DashedArrow,
  DashedOutline,
  DentalDam,
  LoopArrow,
  NumbZone,
  SlashedArrow,
  ToothGum,
  ToothSection,
} from "./rct-parts";
import {
  CANAL_D,
  CANAL_M,
  R,
  chamberD,
  crownPts,
  poly,
  ribbon,
  sample,
  silhouetteD,
} from "./rct-geometry";

/* ------------------------------------------------------------------
   Scenes for /treatments/root-canal-treatment, drawn in the shared
   640 x 480 scene space on one lower molar (rct-geometry.ts). R4a-e share a
   single framing, so they read as a sequence; R3a-c share another, so the
   same tooth sits at the same scale in all three options. Each scene says
   one thing and shows conditions or work in progress, never a result.
   ------------------------------------------------------------------ */

type P = { className?: string };

const CX = R.cx;
const [SX0, SX1] = [140, 500] as Pt;
/** R4 / R5: one tooth in a slice of jaw. */
const STAGE = "84 38 472 354";
/** R3: a row of three molar positions. */
const ROW = "84 38 472 354";
const FLOOR = R.floor;

const NX = [CX - R.pitch, CX + R.pitch];

/* ================= R1 - Labelled cross-section ================= */

export function RctAnatomy({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox="40 20 540 405"
      title="Labelled cross-section of a lower molar tooth, showing enamel, dentine, pulp, root canals and a root tip"
      desc="A lower back tooth cut lengthwise, set in gum and jawbone. A white enamel cap covers the crown over cream dentine. A soft pink pulp chamber sits in the middle of the crown and a narrow canal runs down the centre of each of the two roots to its tip. Thin red leader lines label the enamel, dentine, pulp, root canals and root tip. Illustration, not to scale."
    >
      <Bone x0={215} x1={425} floor={410} />
      <ToothGum x0={215} x1={425} />
      <ToothSection />
      <Annot>
        <Callout pts={[[211, 56], [284, 56], [284, 99]]} />
        <Callout pts={[[211, 178], [318, 178]]} />
        <Callout pts={[[211, 292], [288, 292]]} />
        <Callout pts={[[439, 152], [357, 152]]} />
        <Callout pts={[[439, 346], [350, 346]]} />
      </Annot>
      <Label x={201} y={56} anchor="end">Enamel</Label>
      <Label x={201} y={178} anchor="end">Pulp</Label>
      <Label x={201} y={292} anchor="end">Root canals</Label>
      <Label x={449} y={152}>Dentine</Label>
      <Label x={449} y={346}>Root tip</Label>
    </Scene>
  );
}

/* ================= R3 - Options (same row, same scale) ================= */

function Row({
  children,
  gap = false,
}: {
  children: ReactNode;
  gap?: boolean;
}) {
  return (
    <>
      <Bone x0={93} x1={547} floor={FLOOR} dip={gap ? 12 : 0} />
      <ToothGum x0={93} x1={547} teeth={gap ? NX : [NX[0], CX, NX[1]]} gaps={gap ? [CX] : []} />
      <ToothSection cx={NX[0]} v={1} />
      <ToothSection cx={NX[1]} v={-1} />
      {children}
    </>
  );
}

export function OptionKeep({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={ROW}
      title="A root-treated molar with sealed canals and a crown"
      desc="Cross-section of three back teeth in the gum and jawbone. The middle tooth has its canals filled with a grey material and a porcelain crown over it. The teeth either side are untouched. Illustration, not to scale."
    >
      <Row>
        <ToothSection canals="filled" closure="final" crown />
      </Row>
    </Scene>
  );
}

export function OptionRetreat({ className }: P) {
  const wide = [
    ribbon(CANAL_M, 30, 20),
    ribbon(CANAL_D, 30, 20),
  ];
  return (
    <Scene
      className={className}
      viewBox={ROW}
      title="Treating a tooth that already has a canal filling again"
      desc="Cross-section of three back teeth. The middle tooth already has grey canal filling in both roots and a filling in the top. A dashed red outline marks the canals and a red looping arrow circles them, to say the canals are treated again. Illustration, not to scale."
    >
      <Row>
        <ToothSection canals="filled" closure="final" />
        <Annot>
          <DashedOutline ds={[chamberD(), ...wide]} />
          <LoopArrow cx={CX} cy={252} rx={76} ry={118} from={-40} sweep={292} />
        </Annot>
      </Row>
    </Scene>
  );
}

export function OptionRemove({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={ROW}
      title="The gap left after a tooth is removed"
      desc="Cross-section of the gum and jawbone with a tooth on each side of a gap. The gum and bone dip across the gap, and a dashed outline shows the space where a replacement tooth could go. Illustration, not to scale."
    >
      <Row gap>
        <Annot>
          <g transform={`translate(${CX} 214) scale(0.94) translate(${-CX} -214)`}>
            <DashedOutline ds={[silhouetteD()]} tone="ink" />
          </g>
        </Annot>
      </Row>
    </Scene>
  );
}

/* ================= R4 - A visit (same molar, same framing) ================= */

function Stage({ children, tooth }: { children?: ReactNode; tooth: ReactNode }) {
  return (
    <>
      <Bone x0={SX0} x1={SX1} floor={FLOOR} />
      <ToothGum x0={SX0} x1={SX1} />
      {children}
      {tooth}
    </>
  );
}

export function VisitNumb({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={STAGE}
      title="A numbed tooth with a dental dam around it"
      desc="Cross-section of a back tooth in the gum and jawbone. Soft red arcs round the tooth show the area is numb. A thin grey rubber sheet lies flat across the gum and is stretched round the neck of the tooth, with a clean hole round the crown. Illustration, not to scale."
    >
      <Stage tooth={<ToothSection />}>
        <Annot>
          <NumbZone />
        </Annot>
      </Stage>
      <DentalDam />
    </Scene>
  );
}

export function VisitOpen({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={STAGE}
      title="Making a small opening to reach the pulp chamber"
      desc="Cross-section of a back tooth. A small opening runs from the biting surface down into the pulp chamber, which is visible with its soft pink pulp. A dashed red arrow points into the opening. Illustration, not to scale."
    >
      <Stage tooth={<ToothSection opened />} />
      <Annot>
        <DashedArrow x1={CX} y1={52} x2={CX} y2={92} />
      </Annot>
    </Scene>
  );
}

export function VisitClean({ className }: P) {
  const cx = 468;
  const cy = 250;
  return (
    <Scene
      className={className}
      viewBox={STAGE}
      title="Cleaning and shaping the canals"
      desc="Cross-section of a back tooth with the opening made. The chamber and both canals are empty, clean and widened along their length. A red arrow runs down one canal, and a round magnifier shows the smooth, clean wall of a canal. Illustration, not to scale."
    >
      <Stage tooth={<ToothSection opened canals="cleaned" />} />
      <Annot>
        <Arrow x1={347} y1={256} x2={352} y2={326} w={3.4} head={13} spread={7} />
        <circle cx="352" cy="294" r="22" className={r.redDashed} />
        <path d={`M${f(374)} 292L${f(cx - 54)} ${f(cy + 30)}`} className={s.redLine} />
      </Annot>
      <Magnifier cx={cx} cy={cy} r={50}>
        <CanalWallDetail cx={cx} cy={cy} r={50} />
      </Magnifier>
    </Scene>
  );
}

export function VisitTemporary({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={STAGE}
      title="A temporary filling in the tooth"
      desc="Cross-section of a back tooth with clean canals. A small grey tint at the entrance of each canal marks a medicated dressing, and a cream-grey temporary filling sits in the opening in the biting surface. Illustration, not to scale."
    >
      <Stage tooth={<ToothSection canals="cleaned" closure="temp" dressing />} />
    </Scene>
  );
}

export function VisitFilled({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={STAGE}
      title="Canals filled and the opening closed"
      desc="Cross-section of a back tooth. Both canals are filled with a grey material right down to the root tips, and a filling closes the opening in the biting surface. Illustration, not to scale."
    >
      <Stage tooth={<ToothSection canals="filled" closure="final" />} />
    </Scene>
  );
}

/* ================= R5 - Restoring the tooth (closer crop) ================= */

const CLOSE = "190 48 256 192";

export function RestoreTemporary({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={CLOSE}
      title="A temporary filling that should not be chewed on"
      desc="Close view of the top of a back tooth and its upper roots. A cream-grey temporary filling sits in the biting surface. A red arrow points down onto it with a slash through it, to say avoid chewing on this tooth. Illustration, not to scale."
    >
      <Bone x0={186} x1={454} floor={FLOOR} />
      <ToothGum x0={186} x1={454} />
      <ToothSection canals="filled" closure="temp" />
      <Annot>
        <SlashedArrow x1={CX} y1={50} x2={CX} y2={86} />
      </Annot>
    </Scene>
  );
}

export function RestoreCrown({ className }: P) {
  const hug = `translate(${CX} 204) scale(1.05 1.07) translate(${-CX} -204)`;
  const hugLine = poly(sample(crownPts(), 8));
  return (
    <Scene
      className={className}
      viewBox={CLOSE}
      title="A porcelain crown protecting a root-treated tooth"
      desc="Close view of the top of a back tooth and its upper roots. A porcelain crown covers the treated tooth, with grey canal filling inside. A thin dashed red outline hugs the crown to show it is protected. Illustration, not to scale."
    >
      <Bone x0={186} x1={454} floor={FLOOR} />
      <ToothGum x0={186} x1={454} />
      <ToothSection canals="filled" closure="final" crown />
      <Annot>
        <g transform={hug}>
          <DashedOutline ds={[hugLine]} />
        </g>
      </Annot>
    </Scene>
  );
}
