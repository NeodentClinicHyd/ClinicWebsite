import type { ReactNode } from "react";
import { ArchFront } from "./arch";
import { Annot, Callout, Label, Magnifier, Scene } from "./parts";
import { BracesHardware, Elastic, IntendedOutline, elasticAt, MoveArrow, crownCentre, hookPoint } from "./braces-parts";
import { PRESETS, type BracesPreset } from "./braces-geometry";
import type { Pt } from "./geometry";
import {
  AcrylicPlate,
  ArchOcclusal,
  FixedRetainer,
  Gloss,
  Headgear,
  RemovableAppliance,
  RemovableRetainer,
  RetainerWires,
  plateD,
} from "./braces-occlusal";

/* ------------------------------------------------------------------
   Frontal scenes for /treatments/braces-and-orthodontics (B1, B3a, B3c,
   B5a-d). Every scene is a composition of ArchFront teeth (kit) with the
   braces hardware overlay from braces-parts.tsx, drawn in the shared
   640 x 480 scene space; the scenes crop it. One arch, five presets
   (braces-geometry.ts): B1 / B3 use "mild", B5a / B5b "crowded", B5c
   "partly", B5d "near".

   Labels follow the page rule: 12px or more at a 390px viewport, so each
   scene's label size is 12.5 * viewBox width / rendered width there.
   ------------------------------------------------------------------ */

type P = { className?: string };

export const ALL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/** Soft ivory fade on the left and right edges of a tight crop. */
export function EdgeFade({ viewBox, w = 22 }: { viewBox: string; w?: number }) {
  const [x, y, vw, vh] = viewBox.split(" ").map(Number);
  return (
    <g>
      <rect x={x - 1} y={y - 1} width={w + 1} height={vh + 2} fill="url(#neo-edge-l)" stroke="none" />
      <rect x={x + vw - w} y={y - 1} width={w + 1} height={vh + 2} fill="url(#neo-edge-r)" stroke="none" />
    </g>
  );
}

/** Both arches of one preset, with or without brackets and wire. */
export function ArchPair({
  preset,
  brackets = false,
  ties = false,
  hooksU = {},
  hooksL = {},
  children,
}: {
  preset: BracesPreset;
  brackets?: boolean;
  ties?: boolean;
  hooksU?: Record<number, "up" | "down">;
  hooksL?: Record<number, "up" | "down">;
  children?: ReactNode;
}) {
  const o = PRESETS[preset];
  return (
    <g>
      <ArchFront upper={o.upper} lower={o.lower} />
      {brackets ? (
        <>
          <BracesHardware arch="upper" offsets={o.upper} teeth={ALL} ties={ties} hooks={hooksU} />
          <BracesHardware arch="lower" offsets={o.lower} teeth={ALL} ties={ties} hooks={hooksL} />
        </>
      ) : null}
      {children}
    </g>
  );
}

const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

/* ================= B1 - Overview ================= */

const B1_VB = "70 55 500 375";

export function BracesOverview({ className }: P) {
  const o = PRESETS.mild;
  const bracket = crownCentre("upper", o.upper, 6);
  const wire = mid(crownCentre("upper", o.upper, 1), crownCentre("upper", o.upper, 2));
  return (
    <Scene
      className={className}
      viewBox={B1_VB}
      title="Upper and lower teeth with brackets and a wire"
      desc="Illustration of the upper and lower teeth in a closed bite. A small metal bracket is bonded to every tooth and one thin wire runs through all of the brackets along each arch. Two teeth are slightly turned. Two red leader lines label a bracket and the wire."
    >
      <ArchPair preset="mild" brackets />
      <Annot>
        <Callout pts={[[bracket[0] + 9, 88], [bracket[0] + 9, bracket[1] - 7]]} />
        <Callout pts={[[134, 88], [wire[0], wire[1] + 0.5]]} />
      </Annot>
      <Label x={bracket[0] + 9} y={72} anchor="middle" size={20}>Bracket</Label>
      <Label x={134} y={72} anchor="middle" size={20}>Wire</Label>
    </Scene>
  );
}

/* ================= B3 - Types ================= */

const B3A_VB = "150 112 340 255";

/** Fixed braces, closer: the six front teeth of each arch, small neutral ties. */
export function FixedBraces({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={B3A_VB}
      title="Fixed braces on the front teeth"
      desc="Close view of the six front teeth of the upper and lower arch. Each tooth carries a small metal bracket with a slot, small wings and a steel highlight. A thin wire sits in every slot and a small neutral tie holds it in place."
    >
      <ArchPair preset="mild" brackets ties />
      <EdgeFade viewBox={B3A_VB} w={26} />
    </Scene>
  );
}

/** Removable appliance and headgear: two stand-alone objects, equal weight. */
export function ApplianceHeadgear({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox="0 0 560 420"
      title="A removable appliance and a headgear"
      desc="Illustration of two stand-alone objects side by side. On the left an opaque pink acrylic horseshoe with a thin wire bow and two wire loops, seen from above. On the right a wire face-bow with a plain fabric neck strap. Two labels name them."
    >
      <g transform="translate(140 280) scale(1)">
        <RemovableAppliance />
      </g>
      <g transform="translate(420 300) scale(1)">
        <Headgear />
      </g>
      <Label x={140} y={374} anchor="middle" size={24}>Removable appliance</Label>
      <Label x={420} y={374} anchor="middle" size={24}>Headgear</Label>
    </Scene>
  );
}

const B3C_VB = "100 75 440 330";

/** Elastics: one band each side between an upper and a lower bracket. */
export function ElasticsScene({ className }: P) {
  const o = PRESETS.mild;
  const hu = { 2: "down", 7: "down" } as const;
  const hl = { 0: "up", 9: "up" } as const;
  const bands = [
    [hookPoint("upper", o.upper, 2, "down"), hookPoint("lower", o.lower, 0, "up")],
    [hookPoint("upper", o.upper, 7, "down"), hookPoint("lower", o.lower, 9, "up")],
  ] as const;
  const m = elasticAt(bands[1][0], bands[1][1], -4, 0.5);
  return (
    <Scene
      className={className}
      viewBox={B3C_VB}
      title="Elastic bands between the upper and lower teeth"
      desc="Illustration of the upper and lower teeth with brackets and a wire. On each side a pale elastic band is stretched from a hook on an upper bracket to a hook on a lower bracket. One red leader line labels an elastic."
    >
      <ArchPair preset="mild" brackets hooksU={hu} hooksL={hl}>
        {bands.map(([a, b], i) => (
          <Elastic key={i} from={a} to={b} sag={i ? -4 : 4} />
        ))}
      </ArchPair>
      <Annot>
        <Callout pts={[[m[0], 112], [m[0], m[1]]]} />
      </Annot>
      <Label x={m[0]} y={96} anchor="middle" size={21}>Elastic</Label>
      <EdgeFade viewBox={B3C_VB} w={20} />
    </Scene>
  );
}

/* ================= B5 - Stages (one arch, one framing) ================= */

export const B5_VB = "100 75 440 330";

const PLAN_UPPER = [2, 3, 6, 7];
const PLAN_LOWER = [3, 6, 7];

/** Assessment and a plan: planned movement as dashed red arrows and faint
 *  dashed outlines of where the teeth are meant to end up. */
export function StageAssessment({ className }: P) {
  const c = PRESETS.crowded;
  const nat = PRESETS.natural;
  const arrow = (arch: "upper" | "lower", i: number, min: number) => {
    const a = crownCentre(arch, c[arch], i, 0.42);
    const t = crownCentre(arch, nat[arch], i, 0.42);
    const dx = t[0] - a[0];
    const dy = t[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    const k = Math.max(1, min / len);
    return <MoveArrow key={`${arch}${i}`} from={a} to={[a[0] + dx * k, a[1] + dy * k]} />;
  };
  return (
    <Scene
      className={className}
      viewBox={B5_VB}
      title="Assessment and a plan: teeth and the way they are planned to move"
      desc="Illustration of crowded upper and lower teeth without braces. Faint dashed red outlines show where several teeth are planned to sit and dashed red arrows point from each tooth towards its planned position."
    >
      <ArchPair preset="crowded" />
      <Annot>
        {PLAN_UPPER.map((i) => <IntendedOutline key={`u${i}`} arch="upper" i={i} />)}
        {PLAN_LOWER.map((i) => <IntendedOutline key={`l${i}`} arch="lower" i={i} />)}
        {PLAN_UPPER.map((i) => arrow("upper", i, 28))}
        {PLAN_LOWER.map((i) => arrow("lower", i, 24))}
      </Annot>
      <EdgeFade viewBox={B5_VB} w={18} />
    </Scene>
  );
}

/** Fitting the appliance: the same crowded arch, brackets and wire just fitted. */
export function StageFitting({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={B5_VB}
      title="Fitting the appliance: brackets and a wire on crowded teeth"
      desc="Illustration of the same crowded upper and lower teeth, now with a small metal bracket on every tooth and a thin wire running through the brackets of each arch."
    >
      <ArchPair preset="crowded" brackets />
      <EdgeFade viewBox={B5_VB} w={18} />
    </Scene>
  );
}

/** Adjustment: teeth partly aligned, a magnifier over one bracket and wire. */
export function StageAdjustment({ className }: P) {
  const o = PRESETS.partly;
  const c = crownCentre("upper", o.upper, 7);
  const k = 2.9;
  return (
    <Scene
      className={className}
      viewBox={B5_VB}
      title="An adjustment visit: a magnifier over a bracket and the wire"
      desc="Illustration of the same upper and lower teeth, now partly aligned, with brackets and a wire. A round magnifier over one upper bracket shows it enlarged with the wire seated in its slot."
    >
      <ArchPair preset="partly" brackets />
      <Magnifier cx={c[0]} cy={c[1]} r={56}>
        <g transform={`translate(${c[0]} ${c[1]}) scale(${k}) translate(${-c[0]} ${-c[1]})`}>
          <ArchFront show="upper" upper={o.upper} shadow={false} />
          <BracesHardware arch="upper" offsets={o.upper} teeth={ALL} />
        </g>
      </Magnifier>
      <EdgeFade viewBox={B5_VB} w={18} />
    </Scene>
  );
}


/* ================= B8 - Retainers (one arch, one scale) ================= */

const B8_VB = "-160 -200 320 240";

export function FixedRetainerScene({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={B8_VB}
      title="Fixed retainer: a thin wire behind the lower front teeth"
      desc="Illustration of the lower teeth seen from above, looking at the tongue side. A thin metal wire runs along the inside of the six front teeth, held to each tooth by a small bonded dot. One red leader line labels the fixed retainer."
    >
      <ArchOcclusal floor over={<FixedRetainer />} />
      <Annot>
        <Callout pts={[[0, -156], [0, -5.4]]} />
      </Annot>
      <Label x={0} y={-172} anchor="middle" size={18}>Fixed retainer</Label>
    </Scene>
  );
}

export function RemovableRetainerScene({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={B8_VB}
      title="Removable retainer: an acrylic plate with a wire across the front teeth"
      desc="Illustration of the upper teeth seen from above. An opaque pink acrylic plate covers the palate behind the teeth, a thin metal bow runs across the front of the front teeth and small clasp wires hold the plate at the back teeth. One red leader line labels the removable retainer."
    >
      <ArchOcclusal
        under={
          <>
            <AcrylicPlate d={plateD()} />
            <Gloss cx={-28} cy={-62} rx={50} ry={20} rot={-24} />
            <Gloss cx={34} cy={-112} rx={26} ry={9} rot={-18} />
          </>
        }
        over={<RetainerWires />}
      />
      <Annot>
        <Callout pts={[[0, -156], [0, -96]]} />
      </Annot>
      <Label x={0} y={-172} anchor="middle" size={18}>Removable retainer</Label>
    </Scene>
  );
}

/** Removal and retainers: the same arch, near aligned, no brackets, with the
 *  removable retainer (the B8b part) lying beside it at about 40% scale. */
export function StageRetainers({ className }: P) {
  const ox = 487;
  const oy = 403;
  const k = 0.4;
  return (
    <Scene
      className={className}
      viewBox={B5_VB}
      title="Removal and retainers: aligned teeth with a retainer beside them"
      desc="Illustration of the same upper and lower teeth after the brackets and wire have come off, close to the planned positions with the small natural differences teeth keep. A small removable retainer, a pink acrylic plate with a wire, lies beside the teeth. One red leader line labels the retainer."
    >
      <ArchPair preset="near" />
      <g transform={`translate(${ox} ${oy}) scale(${k})`}>
        <RemovableRetainer shadow k={1.8} />
      </g>
      <Annot>
        <Callout pts={[[420, 388], [ox - 24 * k, oy - 66 * k]]} />
      </Annot>
      <Label x={410} y={388} anchor="end" size={22}>Retainer</Label>
      <EdgeFade viewBox={B5_VB} w={18} />
    </Scene>
  );
}






