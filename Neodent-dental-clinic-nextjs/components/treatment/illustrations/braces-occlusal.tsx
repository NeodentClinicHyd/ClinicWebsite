import { useId, type ReactNode } from "react";
import s from "./illustrations.module.css";
import b from "./braces-illustrations.module.css";
import { closedCurve } from "./archGeometry";
import { curve, f, rng, type Pt } from "./geometry";
import { WirePath } from "./braces-parts";
import {
  OCC_END,
  OCC_TEETH,
  occAtS,
  occContact,
  occOutline,
  occPt,
  type OccTooth,
} from "./braces-geometry";

/* ------------------------------------------------------------------
   Occlusal (top-down) parts: ArchOcclusal, the fixed retainer, the
   removable retainer, a generic removable appliance and a headgear. The
   arch geometry is ONE superellipse centre line with 14 teeth (braces-
   geometry.ts); the upper and the lower scenes both use it, so a matched
   pair stays at one scale. Front of the mouth is at the bottom, the back at
   the top. All tooth shapes are built in scene coordinates (no rotated
   groups), so the paint gradients keep the light at the top left.
   ------------------------------------------------------------------ */

const u = (name: string) => `url(#neo-${name})`;
const mir = (p: Pt): Pt => [-p[0], p[1]];
const RIGHT = OCC_TEETH.slice(7);

/** Where retainer wires go into the plate, measured inwards from the arch line. */
const IN = -29;

/** A wire end where it leaves the acrylic. */
function Emerge({ p }: { p: Pt }) {
  return (
    <g>
      <ellipse cx={f(p[0])} cy={f(p[1])} rx="3.4" ry="2.9" fill="#DB8080" stroke="#B96A6A" strokeWidth="0.8" />
      <ellipse cx={f(p[0] - 0.8)} cy={f(p[1] - 0.9)} rx="1.2" ry="0.9" fill="#fff" fillOpacity="0.6" />
    </g>
  );
}

/** Tooth depth (bucco-lingual) at arc length s. */
const dAt = (sArc: number): number => {
  /* linear between tooth centres, so outlines run smoothly along the arch */
  if (sArc <= RIGHT[0].s) return RIGHT[0].d;
  for (let k = 1; k < RIGHT.length; k++) {
    if (sArc <= RIGHT[k].s) {
      const a = RIGHT[k - 1];
      const t = (sArc - a.s) / (RIGHT[k].s - a.s);
      return a.d + (RIGHT[k].d - a.d) * t;
    }
  }
  return RIGHT[RIGHT.length - 1].d;
};

const poly = (pts: Pt[], close = false) =>
  `M${pts.map((p) => `${f(p[0])} ${f(p[1])}`).join("L")}${close ? "Z" : ""}`;

/** Offset line along the arch, left molar to right molar. `off(s)` is the
 *  outward offset at arc length s. */
function fullLine(to: number, off: (sArc: number) => number, step = 4): Pt[] {
  const right: Pt[] = [];
  for (let sArc = 0; sArc <= to + 0.01; sArc += step) right.push(occAtS(sArc, off(sArc)).p);
  const left = right.slice(1).map(mir).reverse();
  return [...left, ...right];
}

/* ---------- gum and the tissue inside the arch ---------- */

function Gum({ floor }: { floor: boolean }) {
  const end = OCC_END + 8;
  const outer = fullLine(end, (sArc) => dAt(sArc) / 2 + 9);
  const inner = fullLine(end, (sArc) => -(dAt(sArc) / 2 + (floor ? 16 : 10))).reverse();
  const ring = `${poly(outer)}L${poly(inner).slice(1)}Z`;
  /* tissue between the two sides of the arch (tongue side of a lower arch) */
  const innerPts = fullLine(end, (sArc) => -(dAt(sArc) / 2 + 14), 6);
  const yBack = innerPts[0][1] - 6;
  const floorD = closedCurve([...innerPts, [innerPts[innerPts.length - 1][0], yBack], [0, yBack - 6], [innerPts[0][0], yBack]]);
  return (
    <g>
      <path d={ring} fill="#BE6B69" fillOpacity="0.55" stroke="#BE6B69" strokeWidth="1.2" />
      <path d={ring} fill={u("gum")} stroke="none" />
      <path d={poly(outer)} fill="none" stroke="#F7CDC8" strokeOpacity="0.8" strokeWidth="3" transform="translate(0 -3)" />
      {floor ? (
        <g>
          <path d={floorD} fill={u("gum")} fillOpacity="0.8" stroke="none" />
          <path d={poly(innerPts)} fill="none" stroke="#B5605F" strokeOpacity="0.22" strokeWidth="14" filter={u("blur3")} />
        </g>
      ) : null}
      <rect x="-170" y={f(yBack - 20)} width="340" height={f(-yBack + 40 + 20)} fill={u("brc-back-fade")} stroke="none" />
    </g>
  );
}

/* ---------- one tooth seen from above ---------- */

function Cusp({ c, rx, ry }: { c: Pt; rx: number; ry: number }) {
  return <ellipse cx={f(c[0] - 1.2)} cy={f(c[1] - 1.6)} rx={f(rx)} ry={f(ry)} fill={u("hi")} stroke="none" />;
}

function Tooth({ t, seed }: { t: OccTooth; seed: number }) {
  const P = (fx: number, fy: number) => occPt(t, fx, fy);
  const line = (pts: [number, number][]) => curve(pts.map(([x, y]) => P(x, y)));
  const body = closedCurve(occOutline(t));
  const r = rng(seed);
  const tone = 0.04 + r() * 0.1;
  const rx = t.w * 0.2;
  const ry = t.d * 0.2;
  const shade = (pts: [number, number][], o: number) => (
    <path d={closedCurve(pts.map(([x, y]) => P(x, y)))} fill="#8F7A57" fillOpacity={o} stroke="none" />
  );
  const groove = (pts: [number, number][], o = 0.55) => (
    <path d={line(pts)} fill="none" stroke="#B3A689" strokeOpacity={o} strokeWidth="1.1" />
  );
  let detail: ReactNode = null;
  if (t.kind === "incisor") {
    detail = (
      <>
        {shade([[-0.95, -0.05], [-0.4, 0.06], [0.4, 0.06], [0.95, -0.05], [0.9, -0.6], [0.5, -0.9], [0, -1], [-0.5, -0.9], [-0.9, -0.6]], 0.17)}
        {groove([[-0.8, 0.12], [0, 0.18], [0.8, 0.12]], 0.5)}
        <path d={line([[-0.62, 0.62], [0, 0.7], [0.62, 0.62]])} fill="none" stroke="#fff" strokeOpacity="0.9" strokeWidth="2.6" />
        {groove([[-0.4, -0.45], [0, -0.38], [0.4, -0.45]], 0.35)}
      </>
    );
  } else if (t.kind === "canine") {
    detail = (
      <>
        {shade([[0, 1.05], [0.95, 0.2], [0.8, -0.6], [0, -0.9]], 0.13)}
        {groove([[0, 0.95], [0.04, 0.2], [0, -0.7]], 0.7)}
        <Cusp c={P(-0.36, 0.28)} rx={rx} ry={ry * 1.3} />
      </>
    );
  } else if (t.kind === "premolar") {
    detail = (
      <>
        {groove([[-0.75, 0.04], [-0.2, -0.04], [0.3, 0.06], [0.75, 0]], 0.7)}
        <Cusp c={P(-0.1, 0.52)} rx={rx * 1.2} ry={ry} />
        <Cusp c={P(-0.1, -0.5)} rx={rx} ry={ry * 0.9} />
        {shade([[0.3, 0.9], [0.9, 0.4], [0.9, -0.5], [0.3, -0.9], [0.5, 0]], 0.1)}
      </>
    );
  } else {
    detail = (
      <>
        {groove([[-0.82, 0.05], [-0.2, -0.02], [0.4, 0.06], [0.82, 0]], 0.7)}
        {groove([[0.04, 0.82], [-0.04, 0.2], [0.05, -0.3], [0, -0.8]], 0.7)}
        <Cusp c={P(-0.46, 0.5)} rx={rx} ry={ry} />
        <Cusp c={P(0.34, 0.5)} rx={rx * 0.9} ry={ry * 0.9} />
        <Cusp c={P(-0.42, -0.5)} rx={rx * 0.9} ry={ry * 0.9} />
        <Cusp c={P(0.42, -0.5)} rx={rx * 0.8} ry={ry * 0.8} />
      </>
    );
  }
  return (
    <g>
      <path d={closedCurve(occOutline(t, 2))} transform="translate(1.6 2.6)" fill="#5A4829" fillOpacity="0.28" stroke="none" filter={u("blur3")} />
      <path d={body} fill={u("enamel")} className={s.eEnamel} />
      <path d={body} fill="#E4D0A0" fillOpacity={tone} stroke="none" />
      {detail}
      <path d={body} fill={u("shade-r")} stroke="none" />
      <path d={body} fill={u("shade-b")} stroke="none" />
    </g>
  );
}

/**
 * Occlusal arch: gum, optional `under` layer (between gum and teeth, e.g. a
 * plate), the 14 teeth, and an `over` layer (wires, beads). `floor` adds the
 * soft tongue-side tissue of a lower arch.
 */
export function ArchOcclusal({
  floor = false,
  under,
  over,
}: {
  floor?: boolean;
  under?: ReactNode;
  over?: ReactNode;
}) {
  return (
    <g>
      <Gum floor={floor} />
      {under}
      {OCC_TEETH.map((t) => (
        <Tooth key={t.i} t={t} seed={30 + Math.min(t.i, 13 - t.i) * 5} />
      ))}
      {over}
    </g>
  );
}

/* ================= fixed retainer (lower arch) ================= */

/** Lingual points of the six front teeth, left canine to right canine. */
function lingualPts(k = 0.2): Pt[] {
  const r = RIGHT.slice(0, 3).map((t) => occAtS(t.s, -k * t.d).p);
  return [...[...r].reverse().map(mir), ...r];
}

/** A thin wire along the tongue side of the front teeth, one bonded bead on
 *  each of the six teeth. */
export function FixedRetainer() {
  const pts = lingualPts();
  const ends: Pt[] = [
    [pts[0][0] - 3, pts[0][1] + 1],
    ...pts,
    [pts[pts.length - 1][0] + 3, pts[pts.length - 1][1] + 1],
  ];
  return (
    <g className={b.fine}>
      <WirePath d={curve(ends)} w={2.1} />
      {pts.map((p, i) => {
        const rr = i === 0 || i === 5 ? 6.8 : 6;
        return (
          <g key={i}>
            <ellipse cx={f(p[0] + 1.3)} cy={f(p[1] + 2.2)} rx={f(rr + 0.8)} ry={f(rr)} fill="#3D2F16" fillOpacity="0.2" filter={u("blur1")} />
            <ellipse cx={f(p[0])} cy={f(p[1])} rx={f(rr)} ry={f(rr * 0.9)} fill={u("brc-bead")} stroke="#A79D87" strokeWidth="0.8" />
            <ellipse cx={f(p[0] - rr * 0.35)} cy={f(p[1] - rr * 0.38)} rx={f(rr * 0.3)} ry={f(rr * 0.22)} fill="#fff" fillOpacity="0.85" />
          </g>
        );
      })}
    </g>
  );
}

/* ================= removable retainer ================= */

/** Outline of the acrylic plate that covers the palate. */
function plateRing(): Pt[] {
  const S = OCC_TEETH[13].s;
  const right: Pt[] = [];
  for (let sArc = 0; sArc <= S; sArc += 9) right.push(occAtS(sArc, -0.3 * dAt(sArc)).p);
  const yr = right[right.length - 1][1];
  const xr = right[right.length - 1][0];
  const rear: Pt[] = [[xr * 0.9, yr - 9], [xr * 0.58, yr - 18], [0, yr - 22], [-xr * 0.58, yr - 18], [-xr * 0.9, yr - 9]];
  const left = right.slice(1).map(mir).reverse();
  return [...right, ...rear, ...left];
}

export function plateD(): string {
  return closedCurve(plateRing());
}

/** The acrylic plate: opaque pink, polished, with a visible edge thickness. */
export function AcrylicPlate({ d, shadow = false }: { d: string; shadow?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <g>
      {shadow ? <path d={d} transform="translate(4 7)" fill="#3D2F16" fillOpacity="0.24" stroke="none" filter={u("blur6")} /> : null}
      <path d={d} transform="translate(1.6 2.8)" fill="#B65F5F" stroke="#A85858" strokeWidth="1" />
      <path d={d} fill={u("brc-acrylic")} className={s.eDenture} />
      <clipPath id={id}>
        <path d={d} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <path d={d} transform="translate(1.7 1.9)" fill="none" stroke="#FFE6E6" strokeOpacity="0.7" strokeWidth="2.4" />
        <path d={d} transform="translate(-2 -2.4)" fill="none" stroke="#B65F5F" strokeOpacity="0.3" strokeWidth="5" filter={u("blur3")} />
      </g>
    </g>
  );
}

/** Soft polish highlight on a plate: ellipse at (cx, cy). */
export function Gloss({ cx, cy, rx, ry, rot = -20 }: { cx: number; cy: number; rx: number; ry: number; rot?: number }) {
  return <ellipse cx={f(cx)} cy={f(cy)} rx={f(rx)} ry={f(ry)} transform={`rotate(${rot} ${f(cx)} ${f(cy)})`} fill={u("brc-polish")} stroke="none" />;
}

/** The thin labial bow across the front teeth. */
export function bowD(): string {
  const cB = occContact(3);
  const r: Pt[] = [occAtS(cB, IN).p, occAtS(cB, 3).p, occAtS(cB - 5, dAt(cB - 5) / 2 + 3).p];
  for (let sArc = cB - 12; sArc > 3; sArc -= 8) r.push(occAtS(sArc, dAt(sArc) / 2 + 2.8).p);
  r.push(occAtS(0, dAt(0) / 2 + 2.8).p);
  const l = [...r.slice(0, -1)].map(mir);
  return curve([...l, ...[...r].reverse()]);
}

/** Small clasp wires that hold the plate on the first molars. */
export function claspD(side: 1 | -1): string {
  const sM = occContact(5);
  const sD = occContact(6);
  const d = RIGHT[5].d;
  const pts: Pt[] = [
    occAtS(sM + 1.5, IN).p,
    occAtS(sM + 1.5, 4).p,
    occAtS(sM + 5, d / 2 + 3.4).p,
    occAtS((sM + sD) / 2, d / 2 + 4.4).p,
    occAtS(sD - 5, d / 2 + 3.4).p,
    occAtS(sD - 1.5, 4).p,
    occAtS(sD - 1.5, IN).p,
  ];
  return curve(side === 1 ? pts : pts.map(mir));
}

/** Points where the retainer wires enter the plate. */
function retainerEnds(): Pt[] {
  const cB = occContact(3);
  const sM = occContact(5);
  const sD = occContact(6);
  const r: Pt[] = [occAtS(cB, IN).p, occAtS(sM + 1.5, IN).p, occAtS(sD - 1.5, IN).p];
  return [...r, ...r.map(mir)];
}

export function RetainerWires({ k = 1 }: { k?: number }) {
  return (
    <g className={b.fine}>
      <WirePath d={bowD()} w={2.4 * k} />
      <WirePath d={claspD(1)} w={2.2 * k} />
      <WirePath d={claspD(-1)} w={2.2 * k} />
      {retainerEnds().map((p, i) => (
        <Emerge key={i} p={p} />
      ))}
    </g>
  );
}

/** The removable retainer on its own (plate, bow, clasps), for placing next to
 *  an arch or on the arch. Origin = middle of the front of the arch. */
export function RemovableRetainer({ shadow = false, k = 1 }: { shadow?: boolean; k?: number }) {
  const d = plateD();
  return (
    <g>
      <AcrylicPlate d={d} shadow={shadow} />
      <Gloss cx={-28} cy={-62} rx={50} ry={20} rot={-24} />
      <Gloss cx={34} cy={-112} rx={26} ry={9} rot={-18} />
      <RetainerWires k={k} />
    </g>
  );
}





/* ================= generic removable appliance (B3b) ================= */

const APP_END = occContact(6) + 8;

function applianceD(): string {
  const outer = fullLine(APP_END, () => 22, 9);
  const inner = fullLine(APP_END, () => -22, 9).reverse();
  const capR = occAtS(APP_END + 12, 0).p;
  return closedCurve([...outer, capR, ...inner, mir(capR)]);
}

function applianceBowD(): string {
  const cB = occContact(3);
  const r: Pt[] = [occAtS(cB + 5, 8).p, occAtS(cB + 1, 30).p, occAtS(cB - 7, 40).p];
  for (let sArc = cB - 16; sArc > 3; sArc -= 9) r.push(occAtS(sArc, 41).p);
  r.push(occAtS(0, 41).p);
  return curve([...r.slice(0, -1).map(mir), ...[...r].reverse()]);
}

function applianceLoopD(side: 1 | -1): string {
  const sM = occContact(5);
  const sD = occContact(6);
  const pts: Pt[] = [
    occAtS(sM + 3, 12).p,
    occAtS(sM + 6, 33).p,
    occAtS((sM + sD) / 2, 38).p,
    occAtS(sD - 6, 33).p,
    occAtS(sD - 3, 12).p,
  ];
  return curve(side === 1 ? pts : pts.map(mir));
}

function applianceEnds(): Pt[] {
  const cB = occContact(3);
  const sM = occContact(5);
  const sD = occContact(6);
  const r: Pt[] = [occAtS(cB + 5, 8).p, occAtS(sM + 3, 12).p, occAtS(sD - 3, 12).p];
  return [...r, ...r.map(mir)];
}

/** An opaque acrylic horseshoe with a labial bow and two side loops, seen
 *  from above. Generic: no named appliance type. Origin = front middle. */
export function RemovableAppliance() {
  const d = applianceD();
  const groove = curve(fullLine(APP_END - 2, () => 3, 9));
  return (
    <g>
      <AcrylicPlate d={d} shadow />
      <path d={groove} fill="none" stroke="#B65F5F" strokeOpacity="0.5" strokeWidth="13" strokeLinecap="round" />
      <path d={groove} fill="none" stroke="#FFE6E6" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" transform="translate(-4.5 -4.5)" />
      <path d={groove} fill="none" stroke="#9E5050" strokeOpacity="0.35" strokeWidth="1.6" strokeLinecap="round" transform="translate(4.5 4.5)" />
      <Gloss cx={-52} cy={-70} rx={34} ry={12} rot={-40} />
      <Gloss cx={56} cy={-120} rx={18} ry={7} rot={-30} />
      <g className={b.fine}>
        <WirePath d={applianceBowD()} w={2.8} />
        <WirePath d={applianceLoopD(1)} w={2.6} />
        <WirePath d={applianceLoopD(-1)} w={2.6} />
        {applianceEnds().map((p, i) => (
          <Emerge key={i} p={p} />
        ))}
      </g>
    </g>
  );
}

/* ================= headgear (B3b) ================= */

/** A face-bow with a plain fabric neck strap, drawn without a head or face.
 *  Local frame: soldered joint of the two bows at (0, -20), arms upward. */
export function Headgear() {
  const inner = "M-38 -158C-38 -64 -26 -34 0 -34C26 -34 38 -64 38 -158";
  const outer = "M-116 -132C-116 -40 -62 -8 0 -8C62 -8 116 -40 116 -132";
  const strap = "M-116 -132C-128 -186 -68 -212 0 -212C68 -212 128 -186 116 -132";
  return (
    <g>
      {/* soft contact shadows */}
      <ellipse cx="6" cy="6" rx="124" ry="14" fill={u("brc-contact")} stroke="none" />
      <path d={strap} transform="translate(4 8)" fill="none" stroke="#3D2F16" strokeOpacity="0.22" strokeWidth="26" strokeLinecap="butt" filter={u("blur6")} />
      {/* strap: seam edge, fabric, weave, stitching */}
      <path d={strap} fill="none" stroke="#8F8777" strokeWidth="27" strokeLinecap="butt" />
      <path d={strap} fill="none" stroke={u("brc-fabric")} strokeWidth="25" strokeLinecap="butt" />
      <path d={strap} fill="none" stroke={u("brc-weave")} strokeWidth="25" strokeLinecap="butt" />
      <path d={strap} fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="5" strokeLinecap="butt" transform="translate(-1 -6)" />
      <path d={strap} fill="none" stroke="#8F8777" strokeOpacity="0.7" strokeWidth="0.9" strokeDasharray="3.4 3" strokeLinecap="butt" />
      <rect x="-26" y="-226" width="52" height="28" rx="5" fill="#BDB5A4" stroke="#9C9482" strokeWidth="1" />
      <rect x="-26" y="-226" width="52" height="28" rx="5" fill={u("brc-weave")} stroke="none" />
      <path d="M-22 -222H22M-22 -202H22" stroke="#8F8777" strokeOpacity="0.8" strokeWidth="0.9" strokeDasharray="3 2.6" fill="none" />
      <path d="M-24 -224H20" stroke="#fff" strokeOpacity="0.6" strokeWidth="1" fill="none" />
      {/* wire face-bow: inner bow nested in the outer bow, joined at the front */}
      <g className={b.fine}>
        <WirePath d={outer} w={3.2} />
        <WirePath d={inner} w={3.2} />
        <WirePath d="M0 -34V-8" w={3.2} />
        <circle cx="0" cy="-20" r="4.2" fill={u("brc-steel")} className={b.eSteel} />
        <circle cx="-1.3" cy="-21.3" r="1.2" fill="#fff" fillOpacity="0.9" />
        {[-116, 116].map((x) => (
          <g key={x}>
            <circle cx={x} cy="-132" r="6.4" fill="none" stroke="#3D2F16" strokeOpacity="0.2" strokeWidth="3.4" transform="translate(1 2)" />
            <circle cx={x} cy="-132" r="6.4" fill="none" stroke="#4A565D" strokeWidth="3.2" />
            <circle cx={x} cy="-132" r="6.4" fill="none" stroke="#B3BEC4" strokeWidth="1.8" />
          </g>
        ))}
        {[-38, 38].map((x) => (
          <g key={x}>
            <circle cx={x} cy="-158" r="3.4" fill={u("brc-steel")} className={b.eSteel} />
            <circle cx={x - 0.9} cy="-159" r="0.9" fill="#fff" fillOpacity="0.9" />
          </g>
        ))}
      </g>
    </g>
  );
}


