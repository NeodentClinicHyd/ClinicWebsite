import type { ReactNode } from "react";
import s from "./illustrations.module.css";
import d from "./sd-illustrations.module.css";
import { f, curve, type Pt } from "./geometry";
import { biteY } from "./archGeometry";
import { Annot, Arrow, Bone, Callout, Crown, Label, PreparedStump, Scene, rootD } from "./parts";
import { ToothGum } from "./rct-parts";
import { FrontGum } from "./cbu-parts";
import { EdgeFade } from "./braces-scenes";
import { ArchFront } from "./arch";
import { BracesHardware } from "./braces-parts";
import { PRESETS, scaleOffsets } from "./braces-geometry";
import { Magnifier } from "./parts";
import { placeTooth, sdGum } from "./sd-geometry";
import { toothPath } from "./archGeometry";
import { BiteLine, Marker, SHADES, SdSegment, SectionIncisor, ShadeStrip, VeneerOutline, VeneerShell, Zone } from "./sd-parts";
import { pack, placeAll, toScene, type SdSpecs } from "./sd-geometry";

/* ------------------------------------------------------------------
   Scenes for /treatments/smile-design (SD1 to SD5, SD7). Frontal scenes
   share one anterior segment (the kit's upper arch, sd-geometry.ts), so
   one tooth looks the same wherever it appears. Every scene shows a
   condition, an option, a step or a plan, never a finished or ideal smile.
   Annotations follow the other treatment pages: red hairline leaders with
   4px dots, dashed red zones, red arrows, Manrope labels.
   Label sizes are in scene units; each scene's size is chosen so the text
   is 12px or more at a 390px viewport.
   ------------------------------------------------------------------ */

type P = { className?: string };
const cls = (c?: string) => [d.sd, c].filter(Boolean).join(" ");

const midY = (x: number) => biteY(x) + 3;

/* ================= SD1 - Planning view ================= */

const SD1_VB = "96 22 448 336";

const SD1_SPECS: SdSpecs = (() => {
  const base = pack(
    {
      2: { rot: 5, shade: 2 },
      3: { rot: -10 },
      4: { sw: 0.93 },
      6: { sh: 0.86 },
    },
    [1, 8],
  );
  /* a small gap between the two central teeth' right neighbours */
  for (const i of [6, 7, 8]) base[i] = { ...base[i], dx: (base[i].dx ?? 0) + 3.4 };
  return base;
})();

export function PlanningView({ className }: P) {
  const P = placeAll([1, 8], SD1_SPECS);
  const t = (i: number) => P.find((p) => p.i === i)!;
  const box = (i: number, padX = 3, top = -8) => {
    const p = t(i);
    return { x: p.x - p.g.w / 2 - padX, y: p.neck[1] + top, w: p.g.w + padX * 2, h: p.y + 8 - (p.neck[1] + top) };
  };
  const zone = (i: number) => {
    const b = box(i);
    return <Zone x={b.x} y={b.y} w={b.w} h={b.h} rx={12} />;
  };
  const gx = (i: number) => t(i).x;
  const topY = 62;
  const botY = 322;
  const mid: Pt[] = [];
  for (let x = 110; x <= 530; x += 20) mid.push([x, midY(x) - 1]);
  return (
    <Scene
      className={cls(className)}
      viewBox={SD1_VB}
      title="Planning view of the upper front teeth with four areas marked: shape, colour, size and alignment"
      desc="Front view of eight upper teeth and the gum around them, drawn as an ordinary mouth: one canine is a shade yellower than its neighbours, one lateral incisor is turned, one central incisor is slightly narrower, one lateral incisor is shorter and a small gap sits beside it. Four dashed red zones with leader lines are labelled Shape, Colour, Size and Alignment, and a thin dashed red midline and biting-edge guide line are drawn across. This shows what a dentist and patient discuss when planning, not a result. Illustration, not to scale."
    >
      <SdSegment range={[1, 8]} specs={SD1_SPECS} />
      <EdgeFade viewBox={SD1_VB} w={20} />
      <Annot>
        <path d="M320 74V300" className={d.redThin} strokeOpacity="0.7" />
        <path d={curve(mid)} className={d.redThin} strokeOpacity="0.7" />
        {[2, 3, 4, 6].map((i) => (
          <g key={i}>{zone(i)}</g>
        ))}
        <Callout pts={[[gx(3) - 4, topY + 14], [gx(3) - 4, box(3).y]]} />
        <Callout pts={[[gx(6) + 2, topY + 14], [gx(6) + 2, box(6).y]]} />
        <Callout pts={[[gx(2) + 4, botY - 16], [gx(2) + 4, box(2).y + box(2).h]]} />
        <Callout pts={[[gx(4) - 6, botY - 16], [gx(4) - 6, box(4).y + box(4).h]]} />
      </Annot>
      <Label x={gx(3) - 4} y={topY} anchor="middle" size={19}>Alignment</Label>
      <Label x={gx(6) + 2} y={topY} anchor="middle" size={19}>Size</Label>
      <Label x={gx(2) + 4} y={botY} anchor="middle" size={19}>Colour</Label>
      <Label x={gx(4) - 6} y={botY} anchor="middle" size={19}>Shape</Label>
    </Scene>
  );
}

/* ================= SD2 - Concern tiles (same crop, same segment) ================= */

const SD2_VB = "170 74 300 225";
const R2: [number, number] = [1, 8];

function Tile({
  className,
  title,
  desc,
  children,
  specs,
  front,
}: {
  className?: string;
  title: string;
  desc: string;
  children?: ReactNode;
  specs: SdSpecs;
  front?: number[];
}) {
  return (
    <Scene className={cls(className)} viewBox={SD2_VB} title={title} desc={desc}>
      <SdSegment range={R2} specs={specs} front={front} />
      <EdgeFade viewBox={SD2_VB} w={14} />
      {children}
    </Scene>
  );
}

export function ConcernChipped({ className }: P) {
  const specs: SdSpecs = {
    4: { look: "worn", wear: 0.14 },
    6: { chip: { side: 1, w: 0.36, h: 0.26 } },
  };
  const P = placeAll(R2, specs);
  const p4 = P.find((p) => p.i === 4)!;
  const p6 = P.find((p) => p.i === 6)!;
  const wornC = toScene(p4, 0, -7);
  const chipC = toScene(p6, p6.g.w * 0.3, -9);
  return (
    <Tile
      className={className}
      specs={specs}
      title="Front teeth with a worn edge and a chipped corner"
      desc="Close view of upper front teeth. The left central incisor has worn down to a flat edge with a darker band of dentin, and the right lateral incisor has lost a small corner of its biting edge. A thin dashed red ring marks each area. Illustration, not to scale."
    >
      <Annot>
        <ellipse cx={f(wornC[0])} cy={f(wornC[1])} rx="36" ry="17" className={d.redDash} />
        <ellipse cx={f(chipC[0])} cy={f(chipC[1])} rx="24" ry="19" className={d.redDash} />
      </Annot>
    </Tile>
  );
}
export function ConcernColour({ className }: P) {
  const specs: SdSpecs = { 3: { shade: 1 }, 4: {}, 5: { shade: 3 }, 6: { shade: 1 } };
  return (
    <Tile
      className={className}
      specs={specs}
      title="Front teeth that differ in colour, beside a strip of shade samples"
      desc="Close view of four upper front teeth. The right central incisor is clearly yellower and browner than the left central incisor beside it, with the lateral incisors in between in a medium shade. Below the teeth a strip of four tooth-shaped shade samples runs from lighter to darker. The variation is natural; there is no decay. Illustration, not to scale."
    >
      <ShadeStrip x={290} y={258} chips={SHADES.slice(0, 4)} cw={24} ch={28} gap={6} />
    </Tile>
  );
}

export function ConcernSize({ className }: P) {
  const specs = pack(
    {
      3: { sw: 0.82, sh: 0.88 },
      4: { sw: 1.06, sh: 1.04 },
      5: { sw: 0.92, sh: 0.93 },
      6: { sw: 1.14, sh: 1.1 },
    },
    R2,
  );
  return (
    <Tile
      className={className}
      specs={specs}
      title="Front teeth that differ in width, length and outline"
      desc="Close view of four upper front teeth that are not matched: the left lateral incisor is narrow and short, the left central incisor is wide and long, the right central incisor is narrower and shorter than its partner, and the right lateral incisor is wide and long. Illustration, not to scale."
    />
  );
}

export function ConcernGaps({ className }: P) {
  const base = pack({ 3: { rot: -13, dx: 7 } }, R2);
  const specs: SdSpecs = { ...base };
  for (const i of [6, 7, 8]) specs[i] = { ...specs[i], dx: (specs[i].dx ?? 0) + 9 };
  specs[2] = { ...specs[2], dx: (specs[2].dx ?? 0) + 4 };
  return (
    <Tile
      className={className}
      specs={specs}
      front={[3]}
      title="A gap between two front teeth and a turned, overlapping pair"
      desc="Close view of four upper front teeth. On the right a small gap opens between the central and lateral incisor. On the left the lateral incisor is turned and overlaps the edge of the central incisor. Illustration, not to scale."
    />
  );
}


/* ================= cross-sections ================= */

const place = (cx: number, y0: number, k: number, lx: number, ly: number) =>
  `translate(${cx} ${y0}) scale(${k}) translate(${-lx} ${-ly})`;
const at = (cx: number, y0: number, k: number, lx: number, ly: number, x: number, y: number): Pt => [
  cx + (x - lx) * k,
  y0 + (y - ly) * k,
];

/* ---------- SD7 - Enamel and veneer preparation ---------- */

const SD7_K = 1.9;
const SD7_Y0 = 84;

export function EnamelPreparation({ className }: P) {
  const uid = "sd7";
  const panels = [
    { cx: 185, x0: 24, x1: 314, prep: false },
    { cx: 505, x0: 326, x1: 616, prep: true },
  ];
  const L = (cx: number, x: number, y: number) => at(cx, SD7_Y0, SD7_K, 316, 96, x, y);
  const enamelDot = L(185, 287.6, 134.5);
  const veneerDot = L(505, 285.4, 134.5);
  const br0 = L(505, 270, 112);
  const br1 = L(505, 270, 198);
  return (
    <Scene
      className={cls(className)}
      viewBox="0 0 640 480"
      title="A front tooth cut front to back, before and after a thin layer of enamel is removed for a veneer"
      desc="Two views of the same front tooth cut lengthwise, side by side. On the left the natural tooth has a full layer of white enamel over cream dentin, with the gum at its neck. On the right a thin layer of enamel has been removed from the front surface and a porcelain veneer is drawn in dashed outline on the prepared surface. A dashed red bracket on the front surface is labelled Small amount of enamel removed. A red arrow between the two views points from the natural tooth to the prepared tooth. Illustration, not to scale."
    >
      {panels.map((p, n) => (
        <g key={n}>
          <clipPath id={`neo-sd-${uid}-p${n}`}>
            <rect x={p.x0} y="54" width={p.x1 - p.x0} height="356" />
          </clipPath>
          <g clipPath={`url(#neo-sd-${uid}-p${n})`}>
            <g transform={place(p.cx, SD7_Y0, SD7_K, 316, 96)}>
              <FrontGum x0={196} x1={444} />
              <SectionIncisor prepared={p.prep} />
              {p.prep ? <VeneerOutline /> : null}
            </g>
            <rect x={p.x0} y="296" width={p.x1 - p.x0} height="112" fill="url(#neo-sd-fade-b)" stroke="none" />
            <rect x={p.x0 - 1} y="54" width="20" height="356" fill={n === 0 ? "url(#neo-edge-l)" : "none"} stroke="none" />
            <rect x={p.x1 - 19} y="54" width="20" height="356" fill={n === 1 ? "url(#neo-edge-r)" : "none"} stroke="none" />
          </g>
        </g>
      ))}
      <path d="M320 58V404" className={s.hair} strokeOpacity="0.4" />
      <Annot>
        <g transform={place(505, SD7_Y0, SD7_K, 316, 96)}>
          <path d="M278 112H270V198H278" className={d.redDash} />
        </g>
        <Callout pts={[[96, enamelDot[1]], [enamelDot[0], enamelDot[1]]]} />
        <Callout pts={[[444, 82], [444, 100], [veneerDot[0] + 2, veneerDot[1] - 12]]} />
        <Callout pts={[[br0[0], (br0[1] + br1[1]) / 2 + 0], [br0[0] - 0, (br0[1] + br1[1]) / 2]]} />
        <path d={`M${f(br0[0])} ${f(br1[1] + 4)}V404`} className={s.redLine} />
        <Arrow x1={296} y1={236} x2={346} y2={236} w={4} head={15} spread={9} />
      </Annot>
      <Label x={185} y={26} anchor="middle" size={26}>Natural tooth</Label>
      <Label x={505} y={26} anchor="middle" size={26}>After preparation</Label>
      <Label x={88} y={enamelDot[1]} anchor="end" size={26}>Enamel</Label>
      <Label x={450} y={66} anchor="end" size={26}>Veneer</Label>
      <Label x={br0[0] - 26} y={426} size={26}>Small amount of</Label>
      <Label x={br0[0] - 26} y={456} size={26}>enamel removed</Label>
    </Scene>
  );
}

/* ---------- SD4c / SD4d - one canvas, one scale ---------- */

const CS_VB = "100 -56 440 330";
const CS_K = 0.74;
const CS_Y = 130;
const CS_LABEL = 30;

export function OptionVeneer({ className }: P) {
  const gap = 30;
  const M = (x: number, y: number) => at(320, CS_Y, CS_K, 316, 206, x, y);
  const shellDot = M(288 - gap, 116);
  const toothDot = M(333, 128);
  return (
    <Scene
      className={cls(className)}
      viewBox={CS_VB}
      title="A thin porcelain veneer lifted off the front of a tooth"
      desc="A front tooth cut front to back, set in gum and jawbone, with white enamel over cream dentin. A very thin porcelain shell shaped to the front surface is lifted slightly away from the tooth, and a small red arrow shows it going onto the tooth. Labels name the veneer and the tooth. Illustration, not to scale."
    >
      <g transform={place(320, CS_Y, CS_K, 316, 206)}>
        <Bone x0={146} x1={486} floor={384} />
        <FrontGum x0={146} x1={486} />
        <SectionIncisor />
        <VeneerShell gap={gap} />
      </g>
      <Annot>
        <Arrow x1={M(196, 160)[0]} y1={M(196, 160)[1]} x2={M(248, 160)[0]} y2={M(248, 160)[1]} w={4.4} head={15} spread={9} />
        <Callout pts={[[238, 10], [shellDot[0], shellDot[1]]]} />
        <Callout pts={[[358, 72], [toothDot[0], toothDot[1]]]} />
      </Annot>
      <Label x={230} y={10} anchor="end" size={CS_LABEL}>Veneer</Label>
      <Label x={366} y={72} size={CS_LABEL}>Tooth</Label>
    </Scene>
  );
}

export function OptionCrown({ className }: P) {
  const lift = 95;
  const M = (x: number, y: number) => at(320, CS_Y, CS_K, 320, 202, x, y);
  const capEdge = M(275, 70 - lift + 56);
  const stump = M(346, 170);
  const a0 = M(320, 70 - lift + 18);
  const a1 = M(320, 110);
  return (
    <Scene
      className={cls(className)}
      viewBox={CS_VB}
      title="A crown cap lifted above a tooth that has been shaped to receive it"
      desc="A natural tooth cut front to back, with its root in the gum and jawbone. The top of the tooth has been reduced to a smaller, tapered shape. A porcelain crown, a hollow cap that covers the whole tooth, is lifted above it, with a red arrow showing it going down over the prepared tooth. Labels name the crown and the prepared tooth. This is a natural tooth, not an implant. Illustration, not to scale."
    >
      <g transform={place(320, CS_Y, CS_K, 320, 202)}>
        <Bone x0={150} x1={490} floor={388} />
        <path d={rootD(320)} fill="url(#neo-root)" className={s.eDentin} />
        <path d={rootD(320)} className={s.lig} />
        <PreparedStump cx={320} />
        <ToothGum x0={150} x1={490} teeth={[320]} />
        <g transform={`translate(0 ${-lift})`}>
          <Crown cx={320} cut />
        </g>
      </g>
      <Annot>
        <Arrow x1={a0[0]} y1={a0[1] + 8} x2={a1[0]} y2={a1[1]} w={4.4} head={15} spread={9} />
        <Callout pts={[[246, -8], [capEdge[0], capEdge[1]]]} />
        <Callout pts={[[350, 90], [stump[0] - 6, stump[1] - 4]]} />
      </Annot>
      <Label x={238} y={-8} anchor="end" size={CS_LABEL}>Crown</Label>
      <Label x={358} y={58} size={CS_LABEL}>Prepared</Label>
      <Label x={358} y={90} size={CS_LABEL}>tooth</Label>
    </Scene>
  );
}
/* ================= SD4 - Option tiles (frontal: a, b, e) ================= */

const SD4_VB = "170 92 300 225";
const R4: [number, number] = [1, 8];
const L4 = 17;

export function OptionWhitening({ className }: P) {
  const specs: SdSpecs = { 4: { shade: 1 }, 5: { look: "crown" }, 6: { look: "filled" } };
  return (
    <Scene
      className={cls(className)}
      viewBox={SD4_VB}
      title="Whitening: it lightens a natural tooth but not a crown or a filling"
      desc="Close view of three upper front teeth. The natural tooth on the left is a little yellow, with a lighter shade sample below it and a small red arrow pointing from the tooth to the sample. The tooth beside it carries a crown and the next tooth a filling; both stay as they are. Labels read Lightens over the natural tooth and No change over the crown and the filled tooth. Illustration, not to scale."
    >
      <SdSegment range={R4} specs={specs} />
      <EdgeFade viewBox={SD4_VB} w={14} />
      <Annot>
        <Callout pts={[[289, 120], [289, 172]]} />
        <Callout pts={[[351, 120], [351, 172]]} />
        <Callout pts={[[404, 120], [404, 172]]} />
        <Arrow x1={289} y1={255} x2={289} y2={277} w={3.6} head={11} spread={7} />
      </Annot>
      <ShadeStrip x={265} y={280} chips={[SHADES[0]]} cw={30} ch={24} />
      <Label x={262} y={106} anchor="middle" size={L4}>Lightens</Label>
      <Label x={388} y={106} anchor="middle" size={L4}>No change</Label>
    </Scene>
  );
}

export function OptionBonding({ className }: P) {
  const specs: SdSpecs = { 5: { chip: { side: 1, w: 0.62, h: 0.5, resin: true } } };
  return (
    <Scene
      className={cls(className)}
      viewBox={SD4_VB}
      title="Bonding: tooth-coloured resin built up on a chipped corner"
      desc="Close view of upper front teeth. The corner of the right central incisor that had broken off is filled with a resin in a slightly different tint, and a thin dashed red outline follows the original edge of the tooth around it. Illustration, not to scale."
    >
      <SdSegment range={R4} specs={specs} front={[5]} />
      <EdgeFade viewBox={SD4_VB} w={14} />
    </Scene>
  );
}

export function OptionStraightening({ className }: P) {
  const off = scaleOffsets(PRESETS.crowded.upper, 0.65);
  return (
    <Scene
      className={cls(className)}
      viewBox={SD4_VB}
      title="Straightening: braces on slightly crooked teeth, with arrows for the direction they will move"
      desc="Close view of the upper front teeth, a little crooked: the left lateral incisor is turned and sits forward, the right lateral incisor is turned the other way. A small metal bracket sits on each tooth with a thin wire through them. Three short red arrows below the teeth show the direction each will move. Illustration, not to scale."
    >
      <ArchFront show="upper" upper={off} />
      <BracesHardware arch="upper" offsets={off} teeth={[2, 3, 4, 5, 6, 7]} />
      <EdgeFade viewBox={SD4_VB} w={14} />
      <Annot>
        <Arrow x1={252} y1={268} x2={220} y2={268} w={3.6} head={12} spread={7.5} />
        <Arrow x1={398} y1={268} x2={430} y2={268} w={3.6} head={12} spread={7.5} />
      </Annot>
    </Scene>
  );
}

/* ================= SD5 - Stage scenes ================= */

const SD5_VB = "170 84 300 225";
const R5: [number, number] = [1, 8];
const L5 = 21;
const ordinary: SdSpecs = { 3: { rot: -3 }, 6: { rot: 3 } };

export function StageExamination({ className }: P) {
  const P = placeAll([2, 7], ordinary);
  const dots: Pt[] = [
    toScene(P[1], 4, -P[1].g.h * 0.5),
    toScene(P[3], P[3].g.w * 0.2, -P[3].g.h * 0.2),
    [P[4].neck[0] + 4, P[4].neck[1] - 8],
  ];
  return (
    <Scene
      className={cls(className)}
      viewBox={SD5_VB}
      title="Examination: front teeth with three marks and a dashed bite line"
      desc="Close view of the upper front teeth and gum as a dentist sees them at an examination. Three small red dots mark places the dentist may point out, one on a tooth surface, one on a biting edge and one on the gum, and a dashed red line runs along the bite with a dot at each end. No people are shown. Illustration, not to scale."
    >
      <SdSegment range={R5} specs={ordinary} />
      <EdgeFade viewBox={SD5_VB} w={14} />
      <Annot>
        <BiteLine P={P} lift={5} r={4.5} />
        {dots.map(([x, y], i) => (
          <Marker key={i} x={x} y={y} r={6.5} />
        ))}
      </Annot>
    </Scene>
  );
}

export function StageHealthyFirst({ className }: P) {
  const specs: SdSpecs = { ...ordinary, 6: { decay: true, rot: 3 } };
  const P = placeAll(R5, specs);
  const p5 = P.find((p) => p.i === 5)!;
  const p6 = P.find((p) => p.i === 6)!;
  const cx = (p5.x + p6.x) / 2 + 14;
  const cy = (p5.neck[1] + p6.y) / 2 + 8;
  return (
    <Scene
      className={cls(className)}
      viewBox={SD5_VB}
      title="A healthy mouth first: a small area of decay and a swollen gum edge are treated before cosmetic work"
      desc="Close view of the upper front teeth. One lateral incisor has a small dark spot of decay and the gum edge beside it is red and swollen. A dashed red ring encloses both and is labelled Treated first. Below the teeth a legend of three red swatches from deep to light sits between the words First and Then. Illustration, not to scale."
    >
      <SdSegment range={R5} specs={specs} swollen={[4]} />
      <EdgeFade viewBox={SD5_VB} w={14} />
      <Annot>
        <ellipse cx={f(cx)} cy={f(cy)} rx="38" ry="50" fill="#D71920" fillOpacity="0.05" className={d.redDash} />
      </Annot>
      <g className={d.hideSmall}>
        <Annot>
          <Callout pts={[[cx, 112], [cx, cy - 50]]} />
          {[0.5, 0.32, 0.17].map((o, i) => (
            <rect key={i} x={251 + i * 34} y={266} width="28" height="22" rx="4" fill="#D71920" fillOpacity={o} stroke="#B5121A" strokeOpacity="0.35" strokeWidth="1" />
          ))}
        </Annot>
        <Label x={cx - 12} y={98} anchor="middle" size={L5}>Treated first</Label>
        <Label x={243} y={277} anchor="end" size={L5}>First</Label>
        <Label x={360} y={277} size={L5}>Then</Label>
      </g>
    </Scene>
  );
}

export function StagePlanning({ className }: P) {
  const cur: SdSpecs = { ...ordinary, 4: { sh: 0.93 }, 6: { sw: 0.92, sh: 0.9, rot: 3 } };
  const t4 = placeTooth(4, { sh: 1.02, sw: 1.03 });
  const t6 = placeTooth(6, { sh: 1.0, rot: 1 });
  const cur6 = placeAll([6, 6], cur)[0];
  const gum = sdGum(placeAll(R5, cur)).fill;
  return (
    <Scene
      className={cls(className)}
      viewBox={SD5_VB}
      title="Planning the options: dashed outlines of planned changes and a shade strip with one sample marked"
      desc="Close view of the upper front teeth. Thin dashed red outlines on two teeth, a little longer or wider than the teeth as they are now, show what is being planned. Below, a strip of four tooth-shaped shade samples has one outlined in red. The labels read Plan and Shade. This shows planning, not a result. Illustration, not to scale."
    >
      <SdSegment range={R5} specs={cur} />
      <EdgeFade viewBox={SD5_VB} w={14} />
      <clipPath id="neo-sd-sd5c-below">
        <path d={`M0 0H640V480H0Z${gum}`} clipRule="evenodd" />
      </clipPath>
      <Annot>
        <g clipPath="url(#neo-sd-sd5c-below)">
          {[t4, t6].map((p) => (
            <path key={p.i} d={toothPath(p.g)} transform={p.tf} fill="#D71920" fillOpacity="0.045" className={d.redDash} />
          ))}
        </g>
      </Annot>
      <g className={d.hideSmall}>
        <Annot>
          <Callout pts={[[cur6.x + 6, 110], [cur6.x + 6, 182]]} />
          <Callout pts={[[344, 288], [304, 284]]} />
        </Annot>
        <Label x={cur6.x + 6} y={96} anchor="middle" size={L5}>Plan</Label>
        <Label x={352} y={288} size={L5}>Shade</Label>
      </g>
      <ShadeStrip x={188} y={268} chips={SHADES.slice(0, 4)} cw={24} ch={26} gap={6} mark={3} />
    </Scene>
  );
}

export function StageTreatment({ className }: P) {
  const specs: SdSpecs = { ...ordinary, 4: { look: "veneer" }, 5: { look: "crown" } };
  const P = placeAll([2, 7], specs);
  const mx = 392;
  const my = 252;
  const k = 1.6;
  return (
    <Scene
      className={cls(className)}
      viewBox={SD5_VB}
      title="Treatment and adjustment: front teeth with a veneer and a crown, a bite line and a check-up mirror"
      desc="Close view of the upper front teeth part-way through treatment. One tooth carries a veneer and its neighbour a crown, the rest are natural. A dashed red line runs along the bite, and a round check-up mirror with a short handle shows a magnified view of the biting edges with a short red check line across them. Illustration, not to scale."
    >
      <SdSegment range={R5} specs={specs} />
      <EdgeFade viewBox={SD5_VB} w={14} />
      <Annot>
        <BiteLine P={P} lift={4} r={4} />
      </Annot>
      <Magnifier cx={mx} cy={my} r={42}>
        <g transform={`translate(${mx} ${my}) scale(${k}) translate(-376 -236)`}>
          <SdSegment range={[4, 7]} specs={specs} />
          <path d={curve([[330, 248], [376, 249.5], [424, 247.5]])} className={d.redDash} strokeWidth="1.2px" />
        </g>
      </Magnifier>
    </Scene>
  );
}