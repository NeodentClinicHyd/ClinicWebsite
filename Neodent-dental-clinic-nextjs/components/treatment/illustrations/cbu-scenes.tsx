import type { ReactNode } from "react";
import s from "./illustrations.module.css";
import r from "./rct-illustrations.module.css";
import c from "./cbu-illustrations.module.css";
import { f } from "./geometry";
import { Annot, Arrow, Bone, Callout, Label, Magnifier, Scene } from "./parts";
import { DashedOutline, DentalDam, LoopArrow, ToothGum } from "./rct-parts";
import { closedCurve, crownPts, poly, sample } from "./rct-geometry";
import { CbuMolar, FrontGum, FrontTooth, MarginDetail, ShortDim, Tag } from "./cbu-parts";
import { CHIP_HALO_D, DECAY_D, LIFT, WEAR_Y, cornerHaloD } from "./cbu-geometry";

/* ------------------------------------------------------------------
   Scenes for /treatments/composite-build-up, drawn in the shared 640 x 480
   scene space on one lower molar (rct-geometry.ts) with one prepared
   cavity (cbu-geometry.ts). C3a-d share a single framing, as do C4a-d and
   C2a-d, so each family reads as one drawing set at one scale. Each scene
   says one thing and shows a condition, a material, a step or a check,
   never a result.
   ------------------------------------------------------------------ */

type P = { className?: string };
const cn = (...n: (string | undefined)[]) => n.filter(Boolean).join(" ");

/** C1: wide labelled view. */
const C1_VB = "104 38 456 342";
/** C2: one square close-up per reason. */
const C2_VB = "224 76 192 192";
/** C3: the crown, close up, with room above it for the lifted piece. */
const C3_VB = "214 52 214 160";
/** C4: the tooth in its gum and bone, with room above for the labels. */
const C4_VB = "136 22 368 276";
/** C5: the tooth and the magnifier. */
const C5_VB = "130 30 400 300";

const BONE_FLOOR = 384;

/* ================= C1 - Labelled cross-section ================= */

export function CbuAnatomy({ className }: P) {
  return (
    <Scene
      className={cn(c.cbu, className)}
      viewBox={C1_VB}
      title="Labelled cross-section of a back tooth with a composite build-up on a damaged corner"
      desc="A back tooth cut lengthwise, set in gum and jawbone. A white enamel cap covers the crown over cream dentin, with the soft pink pulp in the middle. The corner of the right-hand cusp has been rebuilt: a warm tooth-coloured resin, laid in thin layers, sits on the prepared tooth. Thin red leader lines label the enamel, dentin, pulp and the composite build-up. Illustration, not to scale."
    >
      <Bone x0={238} x1={402} floor={372} />
      <ToothGum x0={238} x1={402} />
      <CbuMolar cavity fill="resin" bands={4} bond="thin" />
      <Annot>
        <Callout pts={[[222, 56], [284, 56], [284, 99]]} />
        <Callout pts={[[222, 128], [284, 128]]} />
        <Callout pts={[[222, 200], [320, 200]]} />
        <Callout pts={[[416, 133], [366, 133]]} />
      </Annot>
      <Label x={212} y={56} anchor="end">Enamel</Label>
      <Label x={212} y={128} anchor="end">Dentin</Label>
      <Label x={212} y={200} anchor="end">Pulp</Label>
      <Tag x={426} y={120} lines={["Composite", "build-up"]} />
    </Scene>
  );
}

/* ================= C2 - Reasons a build-up may be discussed ================= */

function Close({ children }: { children: ReactNode }) {
  return (
    <>
      <Bone x0={196} x1={444} floor={BONE_FLOOR} />
      {children}
    </>
  );
}

export function CbuReasonDecay({ className }: P) {
  return (
    <Scene
      className={cn(c.cbu, className)}
      viewBox={C2_VB}
      title="A tooth with the decay removed, leaving a clean cavity"
      desc="Close view of the crown of a back tooth in cross-section. The corner of the right-hand cusp is missing, leaving a clean, empty cavity with smooth walls and a flat floor, well clear of the pulp. A dashed red outline marks the area a dentist may discuss rebuilding. Illustration, not to scale."
    >
      <Close>
        <ToothGum x0={196} x1={444} />
        <CbuMolar cavity fill="void" />
        <Annot>
          <DashedOutline ds={[cornerHaloD(1.24)]} />
        </Annot>
      </Close>
    </Scene>
  );
}

export function CbuReasonChip({ className }: P) {
  return (
    <Scene
      className={cn(c.cbu, className)}
      viewBox={C2_VB}
      title="A chipped front tooth missing its corner"
      desc="Close view of a front tooth in cross-section, in the gum and jawbone. The outer corner of the biting edge has broken off, leaving a rough, sloping break through the enamel and dentin. A dashed red outline marks the missing corner, the area a dentist may discuss rebuilding. Illustration, not to scale."
    >
      <Close>
        <FrontGum x0={196} x1={444} />
        <FrontTooth chipped />
        <Annot>
          <DashedOutline ds={[CHIP_HALO_D]} />
        </Annot>
      </Close>
    </Scene>
  );
}

export function CbuReasonCrack({ className }: P) {
  const zone = closedCurve([
    [301, 104], [320, 103], [339, 105], [346, 124], [340, 146], [320, 150], [300, 146], [294, 124],
  ]);
  return (
    <Scene
      className={cn(c.cbu, className)}
      viewBox={C2_VB}
      title="A cracked tooth"
      desc="Close view of the crown of a back tooth in cross-section. A fine crack runs down from the central groove through the enamel and into the dentin, stopping short of the pulp. A dashed red outline marks the area a dentist may discuss. Illustration, not to scale."
    >
      <Close>
        <ToothGum x0={196} x1={444} />
        <CbuMolar crack />
        <Annot>
          <DashedOutline ds={[zone]} />
        </Annot>
      </Close>
    </Scene>
  );
}

export function CbuReasonWear({ className }: P) {
  /* the original cusp profile, from the worn surface up over both cusps and back down */
  const profile = poly(
    sample(crownPts(), 8).filter((p) => p[1] < WEAR_Y + 1.2),
  );
  const top = 100.4;
  return (
    <Scene
      className={cn(c.cbu, className)}
      viewBox={C2_VB}
      title="A worn tooth with a flattened biting surface"
      desc="Close view of the crown of a back tooth in cross-section. The cusps have worn down to a flat biting surface with the cream dentin showing through the enamel. A dashed red line marks the original cusp profile, and a short dimension line shows how much height has been lost. Illustration, not to scale."
    >
      <Close>
        <ToothGum x0={196} x1={444} />
        <CbuMolar wear />
        <Annot>
          <path d={profile} className={r.halo} style={{ strokeWidth: "6px" }} />
          <path d={profile} className={r.redDashed} style={{ strokeWidth: "3.2px" }} />
          <path d={`M358 ${top}L402 ${top}`} className={r.redDashed} style={{ strokeWidth: "3px" }} />
          <ShortDim x={398} y1={top} y2={WEAR_Y - 1} />
        </Annot>
      </Close>
    </Scene>
  );
}

/* ================= C3 - The same cavity, filled four ways ================= */

function Crown({ children }: { children: ReactNode }) {
  return (
    <>
      <ToothGum x0={150} x1={490} />
      {children}
    </>
  );
}

export function CbuMaterialResin({ className }: P) {
  return (
    <Scene
      className={cn(c.cbu, className)}
      viewBox={C3_VB}
      title="Resin composite built up in layers in the prepared cavity"
      desc="Close view of the crown of a back tooth in cross-section. The prepared cavity is filled with a warm tooth-coloured resin built up in thin horizontal layers, bonded to the cavity walls by a very thin red-tinted film. Illustration, not to scale."
    >
      <Crown>
        <CbuMolar cavity fill="resin" bands={4} bond="thin" />
      </Crown>
    </Scene>
  );
}

export function CbuMaterialAmalgam({ className }: P) {
  return (
    <Scene
      className={cn(c.cbu, className)}
      viewBox={C3_VB}
      title="Amalgam filling in the prepared cavity"
      desc="Close view of the crown of a back tooth in cross-section. The same prepared cavity is filled with a solid, mid-dark metallic grey material with a subtle mottled texture. Illustration, not to scale."
    >
      <Crown>
        <CbuMolar cavity fill="amalgam" />
      </Crown>
    </Scene>
  );
}

export function CbuMaterialIonomer({ className }: P) {
  return (
    <Scene
      className={cn(c.cbu, className)}
      viewBox={C3_VB}
      title="Glass ionomer filling in the prepared cavity"
      desc="Close view of the crown of a back tooth in cross-section. The same prepared cavity is filled with a matte cream material with a fine speckle. Illustration, not to scale."
    >
      <Crown>
        <CbuMolar cavity fill="ionomer" />
      </Crown>
    </Scene>
  );
}

export function CbuMaterialInlay({ className }: P) {
  return (
    <Scene
      className={cn(c.cbu, className)}
      viewBox={C3_VB}
      title="A lab-made inlay or onlay lifted above the prepared cavity"
      desc="Close view of the crown of a back tooth in cross-section. The same prepared cavity is empty and lined with a thin cream cement layer. A white porcelain piece, made in a laboratory to fit it, floats just above it, and a short red arrow shows it being seated. Illustration, not to scale."
    >
      <Crown>
        <CbuMolar cavity fill="porcelain" lift={LIFT} cement />
        <Annot>
          <Arrow x1={405} y1={66} x2={405} y2={112} w={4} head={15} spread={9.5} />
        </Annot>
      </Crown>
    </Scene>
  );
}

/* ================= C4 - The visit (same tooth, same framing) ================= */

function Stage({ children }: { children: ReactNode }) {
  return (
    <>
      <Bone x0={110} x1={530} floor={BONE_FLOOR} />
      <ToothGum x0={110} x1={530} />
      {children}
    </>
  );
}

export function CbuVisitPrepare({ className }: P) {
  return (
    <Scene
      className={cn(c.cbu, className)}
      viewBox={C4_VB}
      title="The tooth kept dry with a rubber dam"
      desc="Cross-section of a back tooth in the gum and jawbone. A thin grey rubber sheet lies flat across the gum and is stretched round the neck of the tooth, leaving the crown clear and dry. Illustration, not to scale."
    >
      <Stage>
        <CbuMolar />
      </Stage>
      <DentalDam x0={110} x1={530} />
      <g className={c.hideSmall}>
        <Annot>
          <Callout pts={[[170, 92], [170, 186]]} />
        </Annot>
        <Tag x={146} y={48} lines={["Tooth kept", "dry"]} />
      </g>
    </Scene>
  );
}

export function CbuVisitRemove({ className }: P) {
  /* decayed tissue, grown a little so the dashed line sits clear of it */
  const halo = DECAY_D;
  return (
    <Scene
      className={cn(c.cbu, className)}
      viewBox={C4_VB}
      title="Decay being removed and the cavity shaped"
      desc="Cross-section of a back tooth. The corner of the right-hand cusp has been opened into a clean cavity outline. A darker patch of softened dentin lining the floor sits inside a dashed red outline, and a red arrow shows it being lifted out. Illustration, not to scale."
    >
      <Stage>
        <CbuMolar cavity fill="decay" />
      </Stage>
      <Annot>
        <g transform="translate(369 143) scale(1.28) translate(-369 -143)">
          <DashedOutline ds={[halo]} />
        </g>
        <Arrow x1={374} y1={126} x2={374} y2={80} w={4.4} head={16} spread={10} />
      </Annot>
      <g className={c.hideSmall}>
        <Annot>
          <Callout pts={[[250, 73], [414, 73], [414, 148], [388, 148]]} />
        </Annot>
        <Tag x={146} y={48} lines={["Decay", "removed"]} />
      </g>
    </Scene>
  );
}

export function CbuVisitBond({ className }: P) {
  return (
    <Scene
      className={cn(c.cbu, className)}
      viewBox={C4_VB}
      title="Bonding agent and the first thin layers of resin"
      desc="Cross-section of a back tooth. A very thin red-tinted film lines the cavity walls, and two thin layers of resin are stacked on the floor. Three short parallel red arrows from above show each layer being hardened by light. Illustration, not to scale."
    >
      <Stage>
        <CbuMolar cavity fill="resin" bands={2} level={127} bond="bold" />
      </Stage>
      <Annot>
        <Arrow x1={352} y1={48} x2={354} y2={96} w={3.6} head={14} spread={8.4} />
        <Arrow x1={368} y1={48} x2={370} y2={96} w={3.6} head={14} spread={8.4} />
        <Arrow x1={384} y1={48} x2={386} y2={96} w={3.6} head={14} spread={8.4} />
      </Annot>
      <g className={c.hideSmall}>
        <Annot>
          <Callout pts={[[300, 60], [334, 60], [334, 98], [364, 133]]} />
        </Annot>
        <Tag x={146} y={48} lines={["Built up in", "thin layers"]} />
      </g>
    </Scene>
  );
}

export function CbuVisitPolish({ className }: P) {
  return (
    <Scene
      className={cn(c.cbu, className)}
      viewBox={C4_VB}
      title="The finished restoration being shaped and polished"
      desc="Cross-section of a back tooth. The rebuilt cusp is contoured flush with the tooth and has a smooth glossy surface with a few bright highlights. A short curved red arrow over the cusp suggests polishing. Illustration, not to scale."
    >
      <Stage>
        <CbuMolar cavity fill="resin" bands={0} bond="thin" gloss />
      </Stage>
      <Annot>
        <LoopArrow cx={364} cy={126} rx={42} ry={38} from={-70} sweep={112} w={4} />
      </Annot>
      <g className={c.hideSmall}>
        <Annot>
          <Callout pts={[[262, 73], [338, 73], [356, 112]]} />
        </Annot>
        <Tag x={146} y={48} lines={["Shaped and", "polished"]} />
      </g>
    </Scene>
  );
}

/* ================= C5 - Checking the edge ================= */

export function CbuCheckup({ className }: P) {
  const lx = 452;
  const ly = 232;
  const rad = 62;
  /* a short red link from the margin on the tooth to the lens */
  const dx = lx - 383;
  const dy = ly - 150;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  return (
    <Scene
      className={cn(c.cbu, className)}
      viewBox={C5_VB}
      title="A check-up looking at the edge of a restoration"
      desc="Cross-section of a back tooth with a finished resin restoration on the right-hand cusp. A small dashed red circle marks the edge where the restoration meets the tooth, joined by a red line to a round magnifier. Inside the lens the edge is a single clean, even line with the two materials flush. Illustration, not to scale."
    >
      <Bone x0={100} x1={560} floor={BONE_FLOOR} />
      <ToothGum x0={100} x1={560} />
      <CbuMolar cavity fill="resin" bands={0} bond="thin" />
      <Annot>
        <circle cx="383" cy="150" r="15" className={r.redDashed} style={{ strokeWidth: "3px" }} />
        <path
          d={`M${f(383 + ux * 16)} ${f(150 + uy * 16)}L${f(lx - ux * rad)} ${f(ly - uy * rad)}`}
          className={s.redLine}
        />
        <Callout pts={[[394, 98], [394, 138]]} />
      </Annot>
      <Magnifier cx={lx} cy={ly} r={rad}>
        <MarginDetail cx={lx} cy={ly} r={rad} />
      </Magnifier>
      <Tag x={376} y={58} lines={["Edge of the", "restoration"]} />
    </Scene>
  );
}
