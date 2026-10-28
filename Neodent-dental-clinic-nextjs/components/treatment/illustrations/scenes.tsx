import { useId, type ReactNode } from "react";
import s from "./illustrations.module.css";
import { G, X, crestY, curve, f, type Pt } from "./geometry";
import {
  Abutment,
  AbutmentSet,
  Annot,
  Arrow,
  Bone,
  BridgeConnector,
  Callout,
  CoverScrew,
  Crown,
  CrownOnStump,
  DentureBase,
  DentureTeeth,
  DimensionLine,
  GraftGranules,
  Gum,
  ImplantSet,
  HealingAbutment,
  Implant,
  Label,
  Magnifier,
  Membrane,
  NaturalTooth,
  Osteotomy,
  Pontic,
  Scene,
  ThreadDetail,
  crownD,
  implantEdge,
  rootD,
} from "./parts";

/* ------------------------------------------------------------------
   The scenes. Each is a composition of the shared parts in the shared
   640 x 480 geometry, so the same tooth sits at the same coordinates in
   every drawing. Names match the exports the page already imports.
   ------------------------------------------------------------------ */

const [NX0, NX1] = G.narrow;
const [WX0, WX1] = G.wide;
const TILE = "28 14 584 438"; // 4:3 crop of the full section, floor included
const WIDE = "40 40 560 420"; // wide 4:3 crop for the comparison trio

type P = { className?: string };

/** The two healthy neighbours of the narrow block. */
function Neighbours() {
  return (
    <>
      <NaturalTooth cx={X.n1} v={-1} />
      <NaturalTooth cx={X.n2} v={1} />
    </>
  );
}

/** Wide row: outer natural teeth too. */
function OuterTeeth() {
  return (
    <>
      <NaturalTooth cx={X.o1} v={1} />
      <NaturalTooth cx={X.o2} v={-1} />
    </>
  );
}

/* ================= S1 - Anatomy ================= */

export function ImplantAnatomy({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox="10 8 620 465"
      title="Diagram of a dental implant showing the implant post, abutment and crown"
      desc="Side cross-section of the jaw. The gum sits on the jawbone between two natural teeth. In the gap, a threaded titanium implant post is anchored in the bone, an abutment rises through the gum, and a crown sits on top. Labels mark the crown, abutment, implant, gum and jawbone. Illustration, not to scale."
    >
      <Bone x0={NX0} x1={NX1} />
      <Neighbours />
      <Crown cut />
      <Gum x0={NX0} x1={NX1} />
      <Implant />
      <Abutment />
      <Annot>
        <Callout pts={[[148, 46], [302, 46], [302, 78]]} />
        <Callout pts={[[148, 330], [176, 330]]} />
        <Callout pts={[[492, 150], [334, 150]]} />
        <Callout pts={[[492, 212], [476, 212]]} />
        <Callout pts={[[492, 352], [333, 352]]} />
      </Annot>
      <Label x={138} y={46} anchor="end">Crown</Label>
      <Label x={138} y={330} anchor="end">Jawbone</Label>
      <Label x={502} y={150}>Abutment</Label>
      <Label x={502} y={212}>Gum</Label>
      <Label x={502} y={352}>Implant</Label>
    </Scene>
  );
}

/* ================= S2 - Part tiles (1:1) ================= */

function Tile({ children }: { children: ReactNode }) {
  return (
    <>
      <rect x="3" y="3" width="94" height="94" rx="14" fill="url(#neo-tile)" stroke="#D8CDB6" strokeWidth="1" />
      <ellipse cx="50" cy="86" rx="25" ry="4.6" fill="#3d2f16" fillOpacity="0.2" stroke="none" filter="url(#neo-blur3)" />
      {children}
    </>
  );
}

export function PartIconImplant({ className }: P) {
  return (
    <Scene className={className} viewBox="0 0 100 100" backdrop={false} title="Implant post" desc="A threaded titanium implant post with a smooth collar.">
      <Tile>
        <Implant cx={50} top={8} scale={0.5} shadow={false} />
      </Tile>
    </Scene>
  );
}

export function PartIconAbutment({ className }: P) {
  return (
    <Scene className={className} viewBox="0 0 100 100" backdrop={false} title="Abutment" desc="A titanium abutment with a narrow neck and a flared shoulder.">
      <Tile>
        <g transform="translate(50 76) scale(0.5)">
          <path d="M-14 0L14 0L11 14Q0 18 -11 14Z" fill="url(#neo-ti)" className={s.eTi} />
          <Abutment cx={0} top={0} />
        </g>
      </Tile>
    </Scene>
  );
}

export function PartIconCrown({ className }: P) {
  /* The abutment helper above draws at scale 1; scale the whole part here. */
  return (
    <Scene className={className} viewBox="0 0 100 100" backdrop={false} title="Crown" desc="A porcelain crown, the visible part of the tooth.">
      <Tile>
        <g transform="translate(50 12) scale(0.55) translate(-320 -66)">
          <Crown cx={320} />
          <ellipse cx="320" cy="202" rx="31" ry="6" fill="#E1D8C5" className={s.eEnamel} />
        </g>
      </Tile>
    </Scene>
  );
}

/* ================= S3 - Replacement scope tiles (4:3) ================= */

export function ScopeSingle({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={TILE}
      title="One missing tooth replaced by one implant and crown"
      desc="Cut-away of the jaw. A single implant in the bone carries one crown between two natural teeth. Illustration, not to scale."
    >
      <Bone x0={NX0} x1={NX1} />
      <Neighbours />
      <Crown cut />
      <Gum x0={NX0} x1={NX1} />
      <Implant />
      <Abutment />
    </Scene>
  );
}

export function ScopeBridge({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={WIDE}
      title="Several missing teeth replaced by two implants and a three-unit bridge"
      desc="Cut-away of the jaw. Two implants each carry an abutment and a crown, joined by a replacement tooth between them to make a three-unit bridge. Illustration, not to scale."
    >
      <Bone x0={WX0} x1={WX1} />
      <OuterTeeth />
      <BridgeConnector x={X.n1 + G.pitch / 2} />
      <BridgeConnector x={X.n2 - G.pitch / 2} />
      <Crown cx={X.n1} v={-1} cut />
      <Crown cx={X.n2} v={1} cut />
      <Pontic />
      <Gum x0={WX0} x1={WX1} half={2} site="dome" />
      <ImplantSet spots={[{ cx: X.n1, top: G.crest }, { cx: X.n2, top: G.crest }]} />
      <Abutment cx={X.n1} />
      <Abutment cx={X.n2} />
    </Scene>
  );
}

export function ScopeArch({ className }: P) {
  /* Frontal cut-away of a full arch: six implants carrying abutments, and
     one curved bridge (teeth set in a gum-coloured base) that rests just
     above the gum. Everything follows the arch curve yAt(x). */
  const yAt = (x: number) => 118 + Math.pow((x - 320) / 230, 2) * 30;
  const tilt = (x: number) => 0.8 * ((Math.atan((2 * (x - 320) * 30) / (230 * 230)) * 180) / Math.PI);
  const xs = [145, 220, 290, 350, 420, 495];
  const teeth = [108, 160, 214, 268, 322, 376, 430, 482, 534];
  const vs = [1, -1, 0, 1, 0, -1, 1, 0, -1];
  const BX0 = 62;
  const BX1 = 578;
  const crest = (x: number) => yAt(x) + 104;
  const top: Pt[] = [];
  for (let x = BX0; x <= BX1; x += 22) top.push([x, crest(x)]);
  const bot: Pt[] = [];
  for (let x = BX1; x >= BX0; x -= 22) bot.push([x, yAt(x) + 252]);
  const bone = curve(top) + `L${BX1} ${f(bot[0][1])}` + curve(bot, false) + "Z";
  const gt: Pt[] = [];
  for (let x = BX0 + 6; x <= BX1 - 6; x += 22) gt.push([x, yAt(x) + 76]);
  const gb: Pt[] = [];
  for (let x = BX1 - 6; x >= BX0 + 6; x -= 22) gb.push([x, crest(x) + 3]);
  const gum = curve(gt) + `L${f(gb[0][0])} ${f(gb[0][1])}` + curve(gb, false) + "Z";
  /* bridge base: scalloped upper edge (rises between the teeth), smooth underside */
  const mids = teeth.slice(0, -1).map((t, i) => (t + teeth[i + 1]) / 2);
  const BA = 76;
  const baseTop: Pt[] = [];
  for (let x = BA; x <= 562; x += 6) {
    const bump = mids.reduce((a, m) => a + 8 * Math.exp(-(((x - m) / 9) ** 2)), 0);
    baseTop.push([x, yAt(x) + 30 - bump]);
  }
  const baseBot: Pt[] = [];
  for (let x = 562; x >= BA; x -= 22) baseBot.push([x, yAt(x) + 58]);
  const base =
    curve(baseTop) +
    `Q${f(570)} ${f(yAt(562) + 44)} ${f(562)} ${f(yAt(562) + 58)}` +
    curve(baseBot, false) +
    `Q${f(BA - 8)} ${f(yAt(BA) + 44)} ${f(BA)} ${f(yAt(BA) + 30)}Z`;
  const spots = xs.map((x) => ({ cx: x, top: crest(x), scale: 0.9, rot: tilt(x) }));
  const abut = xs.map((x) => ({ cx: x, top: crest(x) - 2, scale: 0.62, rot: tilt(x) }));
  return (
    <Scene
      className={className}
      viewBox="40 20 560 420"
      title="A full arch of teeth supported by implants and a curved bridge"
      desc="Front cut-away of the jaw. Six implant posts in the bone carry abutments that hold a single curved arch bridge of teeth just above the gum. Illustration, not to scale."
    >
      <path d={bone} fill="#EFE2C6" stroke="none" />
      <path d={bone} fill="url(#neo-trab)" stroke="none" />
      <path d={bone} fill="url(#neo-trab2)" stroke="none" />
      <path d={bone} fill="url(#neo-bone-depth)" stroke="none" />
      <path d={curve(top)} transform="translate(0 6)" fill="none" stroke="#D8C29B" strokeWidth="12" style={{ strokeLinecap: "butt" }} />
      <path d={bone} fill="none" className={s.eBone} />
      <ImplantSet spots={spots} />
      <path d={gum} fill="url(#neo-gum)" className={s.eGum} strokeOpacity="0.7" />
      <path d={curve(gt)} transform="translate(0 3.4)" fill="none" stroke="#F7CDC8" strokeOpacity="0.85" strokeWidth="3.2" />
      <path d={curve(gt)} fill="none" className={s.eGum} />
      <AbutmentSet spots={abut} />
      {teeth.map((x, i) => (
        <g key={x} transform={`translate(${x} ${f(yAt(x) + 40)}) rotate(${f(tilt(x))}) scale(0.56 0.62) translate(-320 -206)`}>
          <Crown cx={320} v={vs[i]} bottom={206} />
        </g>
      ))}
      <path d={base} fill="url(#neo-denture)" className={s.eDenture} />
      <path d={curve(baseTop)} transform="translate(0 3)" fill="none" stroke="#F4B9B6" strokeOpacity="0.9" strokeWidth="3" />
    </Scene>
  );
}

/* ================= S4 - Assessment ================= */

export function StageAssessment({ className }: P) {
  const clip = `${useId().replace(/:/g, "")}f`;
  const crestPts = (dip: number): Pt[] =>
    Array.from({ length: 14 }, (_, i) => [150 + i * 26, crestY(150 + i * 26, dip)] as Pt);
  const boneFilm = curve(crestPts(6)) + `L${490} 436L150 436Z`;
  return (
    <Scene
      className={className}
      viewBox={TILE}
      title="Diagram of assessment and planning: bone height and width measured at the gap, with an X-ray style inset"
      desc="Cross-section of the jaw with a gap between two teeth. Two red dimension lines mark the width and the height of the bone at the gap. A dark X-ray style panel beside it shows the same teeth and bone as pale line work."
    >
      <Bone x0={NX0} x1={NX1} dip={6} />
      <Neighbours />
      <Gum x0={NX0} x1={NX1} site="dome" dip={6} />
      <Annot>
        <DimensionLine x1={262} y1={262} x2={378} y2={262} tick={9} />
        <DimensionLine x1={320} y1={282} x2={320} y2={428} tick={9} />
      </Annot>
      {/* X-ray style inset */}
      <g>
        <rect x="490" y="30" width="122" height="156" rx="8" fill="#3d2f16" fillOpacity="0.18" stroke="none" filter="url(#neo-blur3)" transform="translate(2 3)" />
        <rect x="490" y="30" width="122" height="156" rx="8" fill="url(#neo-film)" stroke="#5A666B" strokeWidth="1.5" />
        <clipPath id={clip}>
          <rect x="492" y="32" width="118" height="152" rx="7" />
        </clipPath>
        <g clipPath={`url(#${clip})`}>
          <g transform="translate(496 46) scale(0.33) translate(-150 -66)">
            <path d={boneFilm} fill="#DCE6EA" fillOpacity="0.15" stroke="none" />
            <path d={boneFilm} fill="url(#neo-trab2)" fillOpacity="0.5" stroke="none" />
            <path d={crownD(X.n1, -1)} fill="#F1F5F6" fillOpacity="0.32" className={s.filmLine} />
            <path d={rootD(X.n1, -1)} fill="#F1F5F6" fillOpacity="0.2" className={s.filmLine} />
            <path d={`M${X.n1 - 1} 206L${X.n1 + 2} 316`} className={s.filmLine} strokeOpacity="0.5" />
            <path d={crownD(X.n2, 1)} fill="#F1F5F6" fillOpacity="0.32" className={s.filmLine} />
            <path d={rootD(X.n2, 1)} fill="#F1F5F6" fillOpacity="0.2" className={s.filmLine} />
            <path d={`M${X.n2 + 1} 206L${X.n2 + 6} 316`} className={s.filmLine} strokeOpacity="0.5" />
            <path d={curve(crestPts(6))} className={s.filmLine} strokeWidth="1.6px" />
            <path d="M150 428H490" className={s.filmLine} strokeOpacity="0.55" />
          </g>
          <path d="M500 168H602" stroke="#e9eef0" strokeOpacity="0.3" strokeWidth="1" />
          <path d="M500 174H574" stroke="#e9eef0" strokeOpacity="0.2" strokeWidth="1" />
        </g>
      </g>
    </Scene>
  );
}

/* ================= S5 - Preparation ================= */

export function StagePreparation({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={TILE}
      title="Diagram of preparation: bone-graft granules and a membrane placed over a low ridge in the gap"
      desc="Cross-section of the jaw with a gap between two teeth where the bone ridge is low. The gum is opened gently to each side. Pale bone-graft granules fill the low ridge and a thin grey membrane lies over them."
    >
      <Bone x0={NX0} x1={NX1} dip={46} />
      <Neighbours />
      <GraftGranules x0={264} x1={376} dip={46} />
      <Membrane x0={254} x1={386} />
      <Gum x0={NX0} x1={NX1} site="open" dip={46} />
    </Scene>
  );
}

/* ================= S6 - Placing ================= */

export function StagePlacement({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={TILE}
      title="Diagram of placing the implant: a threaded post being lowered into the prepared jawbone"
      desc="The gum is opened gently above a prepared site in the jawbone between two teeth. A titanium implant post hovers above it with a dashed guide line and a red arrow pointing down."
    >
      <Bone x0={NX0} x1={NX1} />
      <Osteotomy />
      <Neighbours />
      <Gum x0={NX0} x1={NX1} site="open" />
      <path d="M320 222V398" className={s.hairDash} />
      <Implant top={62} shadow={false} />
      <Annot>
        <Arrow x1={320} y1={8} x2={320} y2={52} w={5} head={18} spread={11} />
      </Annot>
    </Scene>
  );
}

/* ================= S7 - Healing ================= */

function InwardArrows({ ys, near = 292, far = 246 }: { ys: number[]; near?: number; far?: number }) {
  return (
    <>
      {ys.map((y) => (
        <g key={y}>
          <Arrow x1={far} y1={y} x2={near} y2={y} w={3} head={12} spread={7.5} />
          <Arrow x1={640 - far} y1={y} x2={640 - near} y2={y} w={3} head={12} spread={7.5} />
        </g>
      ))}
    </>
  );
}

export function StageHealing({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={TILE}
      title="Diagram of healing: bone bonding around the implant post under closed gum, with a magnified view"
      desc="The implant is seated in the jawbone with the gum closed over a small cover screw. Short red arrows point from the bone towards the post. A round magnifier shows new bone filling the grooves between the threads."
    >
      <Bone x0={NX0} x1={NX1} />
      <Neighbours />
      <Gum x0={NX0} x1={NX1} site="cover" />
      <Implant />
      <CoverScrew />
      <Annot>
        <InwardArrows ys={[300, 350]} far={252} near={294} />
        <circle cx="337" cy="326" r="15" className={s.redDash} />
        <path d="M352 328L476 350" className={s.redLine} />
      </Annot>
      <Magnifier cx={532} cy={364} r={56}>
        <ThreadDetail cx={532} cy={364} r={56} contact={false} />
      </Magnifier>
    </Scene>
  );
}

/* ================= S8 - The visible tooth ================= */

export function StageRestoration({ className }: P) {
  const margin = [
    [X.n1 - 40, 188], [X.n1 - 22, 197.5], [X.n1, 202], [X.n1 + 22, 197.5], [X.n1 + 49, 166],
    [G.cx - 22, 197.5], [G.cx, 202], [G.cx + 22, 197.5], [X.n2 - 49, 166],
    [X.n2 - 22, 197.5], [X.n2, 202], [X.n2 + 22, 197.5], [X.n2 + 40, 188],
  ] as Pt[];
  return (
    <Scene
      className={className}
      viewBox={TILE}
      title="Diagram of the visible tooth: a crown on an abutment on the implant post, level with its neighbours"
      desc="The crown sits on an abutment on the implant post, in line with the two neighbouring teeth. A dashed guide shows the crown tops level and a thin red line runs along the gum margin."
    >
      <Bone x0={NX0} x1={NX1} />
      <Neighbours />
      <Crown cut />
      <Gum x0={NX0} x1={NX1} />
      <Implant />
      <Abutment />
      <Annot>
        <path d="M168 58H472" className={s.hairDash} />
        <path d="M168 51V65M472 51V65" className={s.hair} />
        <path d={curve(margin)} className={s.redLine} />
        <circle cx={margin[0][0]} cy={margin[0][1]} r="4" className={s.dot} />
        <circle cx={margin[margin.length - 1][0]} cy={margin[margin.length - 1][1]} r="4" className={s.dot} />
      </Annot>
    </Scene>
  );
}

/* ================= S9 - S11 comparison (same frame, same scale) ================= */

export function OptionImplant({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={WIDE}
      title="Diagram of a dental implant replacing one tooth, with the screw post shown below the gum"
      desc="A row of teeth in the gum with a single crown filling the gap in the middle. A cut-away shows the titanium implant post in the bone and the abutment that holds the crown. Illustration, not to scale."
    >
      <Bone x0={WX0} x1={WX1} />
      <OuterTeeth />
      <Neighbours />
      <Crown cut />
      <Gum x0={WX0} x1={WX1} half={2} />
      <Implant />
      <Abutment />
    </Scene>
  );
}

export function OptionBridge({ className }: P) {
  return (
    <Scene
      className={className}
      viewBox={WIDE}
      title="Diagram of a dental bridge joining two crowned teeth across a gap"
      desc="A row of teeth in the gum. The two teeth beside the gap carry crowns, shown cut away so the shaped natural teeth inside are visible. A replacement tooth between them rests on the gum and joins the crowns into one bridge. Illustration, not to scale."
    >
      <Bone x0={WX0} x1={WX1} />
      <OuterTeeth />
      <NaturalTooth cx={X.n1} v={-1} />
      <NaturalTooth cx={X.n2} v={1} />
      <BridgeConnector x={X.n1 + G.pitch / 2} />
      <BridgeConnector x={X.n2 - G.pitch / 2} />
      <CrownOnStump cx={X.n1} v={-1} />
      <CrownOnStump cx={X.n2} v={1} />
      <Pontic />
      <Gum x0={WX0} x1={WX1} half={2} site="dome" />
    </Scene>
  );
}

export function OptionDenture({ className }: P) {
  const xs = [X.o1, X.n1, G.cx, X.n2, X.o2];
  return (
    <Scene
      className={className}
      viewBox={WIDE}
      title="Diagram of a removable denture, a gum-coloured plate carrying replacement teeth"
      desc="A pink acrylic base carrying a row of replacement teeth rests on the gum ridge. A thin gap line shows the base sits on the gum and can be lifted out. Illustration, not to scale."
    >
      <Bone x0={WX0} x1={WX1} drop={20} />
      <Gum x0={WX0} x1={WX1} half={2} site="flat" drop={20} />
      <DentureTeeth xs={xs} />
      <DentureBase x0={92} x1={548} ridgeY={228} />
      <Annot>
        <path d="M104 222.6H536" className={s.redLine} />
      </Annot>
    </Scene>
  );
}

/* ================= S13 - Healing detail (4:5) ================= */

export function HealingDetail({ className }: P) {
  const left = implantEdge("left");
  const right = implantEdge("right");
  const edge = (pts: Pt[]) =>
    `M${pts.map((p) => `${f(G.cx + p[0])} ${f(G.crest + p[1])}`).join("L")}`;
  return (
    <Scene
      className={className}
      viewBox="120 -30 400 500"
      title="How bone bonds to a dental implant during healing"
      desc="Close cross-section of a threaded implant post in the jawbone with the gum healed over a healing abutment. A red line marks where bone meets the threads, red arrows point from the surrounding bone towards the post, and a round magnifier shows the bone filling the grooves between the threads. Illustration, not to scale."
    >
      <Bone x0={NX0} x1={NX1} />
      <Neighbours />
      <Gum x0={NX0} x1={NX1} />
      <Implant />
      <HealingAbutment />
      <Annot>
        <path d={edge(left)} className={s.redLine} strokeWidth="2" />
        <path d={edge(right)} className={s.redLine} strokeWidth="2" />
        <InwardArrows ys={[268, 300]} far={254} near={296} />
        <circle cx="338" cy="338" r="15" className={s.redDash} />
        <path d="M353 344L378 352" className={s.redLine} />
        <Callout pts={[[296, 8], [296, 203]]} />
        <Callout pts={[[320, 444], [320, 388]]} />
      </Annot>
      <Magnifier cx={438} cy={372} r={58}>
        <ThreadDetail cx={438} cy={372} r={58} />
      </Magnifier>
      <Label x={320} y={-8} anchor="middle" size={17}>Gum heals around it</Label>
      <Label x={320} y={458} anchor="middle" size={17}>Bone bonds to the implant</Label>
    </Scene>
  );
}

/** Keeps a stable reference for tooling that wants every scene. */
export const ALL_SCENES = {
  ImplantAnatomy,
  PartIconImplant,
  PartIconAbutment,
  PartIconCrown,
  ScopeSingle,
  ScopeBridge,
  ScopeArch,
  StageAssessment,
  StagePreparation,
  StagePlacement,
  StageHealing,
  StageRestoration,
  OptionImplant,
  OptionBridge,
  OptionDenture,
  HealingDetail,
} as const;
