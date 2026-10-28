import { useId, type ReactNode } from "react";
import s from "./illustrations.module.css";
import r from "./rct-illustrations.module.css";
import { crestY, curve, f, type Pt } from "./geometry";
import { Arrow } from "./parts";
import {
  CANAL_D,
  CANAL_M,
  R,
  RIM,
  at,
  channelD,
  chamberD,
  closedCurve,
  coreD,
  crownD,
  crownPts,
  edjPts,
  poly,
  ribbon,
  rootLineD,
  sample,
  silhouetteD,
  surfaceLine,
  surfY,
} from "./rct-geometry";

/* ------------------------------------------------------------------
   Parts for the root canal treatment scenes. Same craft as parts.tsx:
   gradients, tinted edge strokes of 1 to 1.5px, soft contact shadows and a
   highlight at the top left. Gradients and patterns live in RctDefs
   ("neo-rct-*"); the shared kit's "neo-*" gradients are reused where they
   fit (porcelain, gum, shade, glass, blur).
   Stacking order inside a scene:
     Bone -> ToothGum -> ToothSection -> dam / annotations.
   ------------------------------------------------------------------ */

const u = (name: string) => `url(#neo-${name})`;
const ur = (name: string) => `url(#neo-rct-${name})`;
const idOf = (raw: string) => raw.replace(/:/g, "");

/* ---------- a cavity: a space or a filling cut into the tooth ---------- */

type Mat = "bore" | "pulp" | "hollow" | "clean" | "fill" | "paste" | "temp" | "closure";

const MAT: Record<Mat, { fill: string; edge: string; shade: string; op: number; hi: number }> = {
  bore: { fill: ur("bore"), edge: r.eCanal, shade: "#5E4A28", op: 0.5, hi: 0.35 },
  pulp: { fill: ur("pulp"), edge: r.ePulp, shade: "#9C5A57", op: 0.34, hi: 0.5 },
  hollow: { fill: ur("hollow"), edge: r.eCanal, shade: "#6E5A36", op: 0.55, hi: 0.5 },
  clean: { fill: ur("clean"), edge: r.eCanal, shade: "#6E5A36", op: 0.42, hi: 0.8 },
  fill: { fill: ur("fill"), edge: r.eFill, shade: "#35312B", op: 0.16, hi: 0.7 },
  paste: { fill: ur("paste"), edge: r.eDam, shade: "#4C5256", op: 0.12, hi: 0.6 },
  temp: { fill: ur("temp"), edge: r.eTemp, shade: "#6E6753", op: 0.18, hi: 0.8 },
  closure: { fill: ur("closure"), edge: r.eClosure, shade: "#7E6A45", op: 0.16, hi: 0.9 },
};

function Cavity({
  ds,
  mat,
  shine,
  clip,
}: {
  ds: string[];
  mat: Mat;
  /** Highlight lines (white, blurred) laid along the lit side. */
  shine?: string[];
  /** id of a clipPath that keeps the cavity inside the tooth. */
  clip?: string;
}) {
  const id = idOf(useId());
  const m = MAT[mat];
  return (
    <g clipPath={clip ? `url(#${clip})` : undefined}>
      <defs>
        <clipPath id={`${id}c`}>
          {ds.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </clipPath>
      </defs>
      {/* Outline first, twice the width: the fills below hide the inner half,
          so overlapping shapes read as one outline. */}
      {ds.map((d, i) => (
        <path key={`e${i}`} d={d} fill="none" className={m.edge} style={{ strokeWidth: "2.4px" }} />
      ))}
      {ds.map((d, i) => (
        <path key={`f${i}`} d={d} fill={m.fill} stroke="none" />
      ))}
      <g clipPath={`url(#${id}c)`}>
        <g transform="translate(1.6 2.3)">
          {ds.map((d, i) => (
            <path
              key={`s${i}`}
              d={d}
              fill="none"
              stroke={m.shade}
              strokeOpacity={m.op}
              style={{ strokeWidth: "9px" }}
              filter={ur("soft")}
            />
          ))}
        </g>
        {(shine ?? []).map((d, i) => (
          <path
            key={`h${i}`}
            d={d}
            fill="none"
            stroke="#fff"
            strokeOpacity={m.hi}
            style={{ strokeWidth: "2.2px" }}
            filter={u("blur1")}
          />
        ))}
      </g>
    </g>
  );
}

/** Soft tissue in the chamber and canals: a pale pink-cream tint, not nerves or vessels. */
export function PulpTissue({ ds, shine, clip }: { ds: string[]; shine?: string[]; clip?: string }) {
  return <Cavity ds={ds} mat="pulp" shine={shine} clip={clip} />;
}

/** The empty space of a chamber or canal. `cleaned` is brighter, with smooth walls. */
export function CanalSpace({
  ds,
  cleaned = false,
  shine,
  clip,
}: {
  ds: string[];
  cleaned?: boolean;
  shine?: string[];
  clip?: string;
}) {
  return <Cavity ds={ds} mat={cleaned ? "clean" : "hollow"} shine={shine} clip={clip} />;
}

/** Neutral warm-grey canal-fill material with a highlight. No brand, no name. */
export function CanalFill({ ds, shine, clip }: { ds: string[]; shine?: string[]; clip?: string }) {
  return <Cavity ds={ds} mat="fill" shine={shine} clip={clip} />;
}

/* ---------- access opening and fillings ---------- */

/** Open channel through the biting surface (clip it to the tooth). */
export function AccessOpening({ cx = 320, clip }: { cx?: number; clip?: string }) {
  return <Cavity ds={[channelD(cx)]} mat="bore" clip={clip} />;
}

/** A filling that sits flush in the opening. `temp` is cream-grey, `final` a tooth-like cream. */
export function TempFilling({
  cx = 320,
  kind = "temp",
  clip,
}: {
  cx?: number;
  kind?: "temp" | "final";
  clip?: string;
}) {
  const mat: Mat = kind === "temp" ? "temp" : "closure";
  const line = surfaceLine(cx);
  return (
    <g>
      <Cavity ds={[channelD(cx)]} mat={mat} clip={clip} shine={[`M${f(RIM.l + cx - 320 + 4)} ${f(surfY(RIM.l + cx - 320 + 4, cx) + 5)}L${f(RIM.l + cx - 320 + 6)} 134`]} />
      <g clipPath={clip ? `url(#${clip})` : undefined}>
        <path d={line} fill="none" className={kind === "temp" ? r.eTemp : r.eClosure} />
        <path d={line} transform="translate(0 1.6)" fill="none" stroke="#fff" strokeOpacity="0.85" style={{ strokeWidth: "1.2px" }} />
      </g>
    </g>
  );
}

/* ---------- the tooth ---------- */

export type ToothProps = {
  cx?: number;
  /** Cusp variety, -1 / 0 / 1. */
  v?: number;
  /** What fills the chamber and canals. */
  canals?: "pulp" | "cleaned" | "filled";
  /** Channel cut through the biting surface into the chamber. */
  opened?: boolean;
  /** Filling in the opening: cream-grey temporary, or a final one that also closes the chamber. */
  closure?: "none" | "temp" | "final";
  /** Small tint of medicated dressing at the canal entrances. */
  dressing?: boolean;
  /** Porcelain crown over a reduced tooth. */
  crown?: boolean;
  /** Draw the thin ligament line round the roots. */
  ligament?: boolean;
};


/** Reduced tooth that a crown sits on (inside the crown shell, a little smaller). */
function stumpD(cx: number) {
  const k = (dx: number, y: number) => `${f(cx + dx)} ${y}`;
  return `M${k(-40, 207)}C${k(-43, 190)} ${k(-46, 168)} ${k(-45, 148)}C${k(-44, 132)} ${k(-38, 120)} ${k(-26, 118)}L${k(26, 118)}C${k(38, 120)} ${k(44, 132)} ${k(45, 148)}C${k(46, 168)} ${k(43, 190)} ${k(40, 207)}`;
}
export function ToothSection({
  cx = 320,
  v = 0,
  canals = "pulp",
  opened = false,
  closure = "none",
  dressing = false,
  crown = false,
  ligament = true,
}: ToothProps) {
  const id = idOf(useId());
  const sil = silhouetteD(cx, v);
  const crownP = crownD(cx, v);
  const core = coreD(cx, v);
  const edj = poly(sample(edjPts(cx, v), 8));
  const roots = rootLineD(cx);
  const isOpen = !crown && (opened || closure !== "none");

  const wide = canals !== "pulp";
  const w0 = wide ? 14 : 11;
  const w1 = wide ? 8 : 5;
  const mRib = ribbon(CANAL_M, w0, w1, cx);
  const dRib = ribbon(CANAL_D, w0, w1, cx);
  const chamber = chamberD(cx);
  const shineM = poly(sample(at(CANAL_M, cx), 6).map(([x, y]) => [x - 2.2, y] as Pt).slice(8, 34));
  const shineD = poly(sample(at(CANAL_D, cx), 6).map(([x, y]) => [x - 2.2, y] as Pt).slice(8, 34));
  const stump = stumpD(cx);
  const hollow = closedCurve(crownPts(cx, v).map(([x, y]) => [cx + (x - cx) * 0.88, 204 - (204 - y) * 0.9] as Pt));

  /* chamber + canals */
  let spaces: ReactNode;
  const clip = `${id}sil`;
  if (canals === "pulp") {
    spaces = <PulpTissue ds={[chamber, mRib, dRib]} clip={clip} shine={[shineM, shineD]} />;
  } else if (canals === "cleaned") {
    spaces = <CanalSpace cleaned ds={[chamber, mRib, dRib]} clip={clip} shine={[shineM, shineD]} />;
  } else {
    spaces = (
      <>
        {closure === "none" && !crown ? (
          <CanalSpace cleaned ds={[chamber]} clip={clip} />
        ) : (
          <Cavity ds={[chamber]} mat="closure" clip={clip} shine={[]} />
        )}
        <CanalFill ds={[mRib, dRib]} clip={clip} shine={[shineM, shineD]} />
      </>
    );
  }

  /* opening, filling and dressing */
  const dress = (x: number) =>
    closedCurve([
      [x - 8, 212],
      [x - 4, 207],
      [x + 4, 207],
      [x + 8, 212],
      [x + 4, 217],
      [x - 4, 217],
    ]);
  return (
    <g>
      <defs>
        <clipPath id={`${id}sil`}>
          <path d={sil} />
        </clipPath>
        <clipPath id={`${id}crown`}>
          <path d={crownP} />
        </clipPath>
        <clipPath id={`${id}stump`}>
          <path d={stump} />
        </clipPath>
        {/* everything except the mouth of the opening: lets the crown outline skip it */}
        <clipPath id={`${id}rim`}>
          <path
            clipRule="evenodd"
            d={`M0 0H640V480H0Z M${f(RIM.l + cx - 320 - 1)} 60H${f(RIM.r + cx - 320 + 1)}V130H${f(RIM.l + cx - 320 - 1)}Z`}
          />
        </clipPath>
        <clipPath id={`${id}top`}>
          <rect x="0" y="0" width="640" height="199" />
        </clipPath>
        <clipPath id={`${id}neck`}>
          <rect x="0" y="198" width="640" height="34" />
        </clipPath>
        <clipPath id={`${id}below`}>
          <rect x="0" y={R.crest + 2} width="640" height="260" />
        </clipPath>
      </defs>

      {/* root surface halo, where the root meets the bone */}
      <g clipPath={`url(#${id}below)`}>
        <path d={roots} fill="none" stroke="#C9A97A" strokeOpacity="0.28" style={{ strokeWidth: "6px" }} />
      </g>

      {/* dentine body: crown and both roots in one piece */}
      <path d={sil} fill={ur("dentine")} stroke="none" />
      <g clipPath={`url(#${id}sil)`}>
        {!crown ? <path d={core} fill={ur("tub-crown")} stroke="none" /> : null}
        <rect x={cx - 70} y="207" width="140" height="170" fill={ur("tub-root")} stroke="none" />
        {/* cementum: a pale rim just inside the root surface */}
        <path d={roots} fill="none" stroke="#FAF0D4" strokeOpacity="0.6" style={{ strokeWidth: "5px" }} />
        <path d={sil} fill={u("shade-r")} stroke="none" />
        <path d={sil} fill={u("shade-b")} stroke="none" opacity="0.7" />
        {/* soft light down the left of each root */}
        <path
          d={poly(sample(at([[283, 236], [279, 270], [277, 306], [281, 332]], cx), 5))}
          fill="none"
          stroke="#fff"
          strokeOpacity="0.5"
          style={{ strokeWidth: "3.5px" }}
          filter={u("blur1")}
        />
        <path
          d={poly(sample(at([[343, 262], [341, 290], [343, 320]], cx), 5))}
          fill="none"
          stroke="#fff"
          strokeOpacity="0.4"
          style={{ strokeWidth: "3px" }}
          filter={u("blur1")}
        />
      </g>

      {/* enamel cap: a ring between the outline and the dentine core */}
      {!crown ? (
        <g>
          <g clipPath={`url(#${id}crown)`}>
            <path d={`${crownP}${core}`} fillRule="evenodd" fill={ur("enamel")} stroke="none" />
            <path d={`${crownP}${core}`} fillRule="evenodd" fill={u("shade-r")} stroke="none" opacity="0.7" />
            <path d={crownP} fill={u("hi")} stroke="none" opacity="0.75" />
          </g>
          <path d={edj} fill="none" stroke="#D9C9A4" strokeOpacity="0.9" style={{ strokeWidth: "1px" }} />
          {/* edge highlight along the lit cusps */}
          <path
            d={poly(sample(crownPts(cx, v).slice(1, 8).map(([x, y]) => [x + 3.4, y + 3.2] as Pt), 6))}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.95"
            style={{ strokeWidth: "2.4px" }}
            filter={u("blur1")}
          />
          <g clipPath={isOpen ? `url(#${id}rim)` : undefined}>
            <path d={sil} fill="none" className={s.eEnamel} clipPath={`url(#${id}top)`} />
          </g>
        </g>
      ) : null}

      {/* root outline and ligament line */}
      <path d={roots} fill="none" className={s.eDentin} />
      {ligament ? <path d={roots} fill="none" className={s.lig} /> : null}
      <g clipPath={`url(#${id}neck)`}>
        <path d={sil} fill="none" className={s.eDentin} />
      </g>

      {/* the opening, the spaces and what fills them */}
      {isOpen && closure === "none" ? <AccessOpening cx={cx} clip={`${id}sil`} /> : null}
      {crown ? (
        <>
          {spaces}
          {/* cement layer, then the porcelain shell, both as rings round the stump */}
          <g clipPath={`url(#${id}crown)`}>
            <path d={`${hollow}${stump}`} fillRule="evenodd" fill="#F1E9D5" stroke="none" />
            <path d={`${hollow}${stump}`} fillRule="evenodd" fill={u("shade-r")} stroke="none" opacity="0.3" />
            <path d={`${crownP}${hollow}`} fillRule="evenodd" fill={u("porcelain")} stroke="none" />
            <path d={`${crownP}${hollow}`} fillRule="evenodd" fill={u("shade-r")} stroke="none" opacity="0.4" />
            <path d={crownP} fill={u("hi")} stroke="none" opacity="0.6" />
          </g>
          <path d={stump} fill="none" className={r.eStump} />
          <path d={sil} fill="none" className={s.eEnamel} clipPath={`url(#${id}top)`} />
          <path
            d={poly(sample(crownPts(cx, v).slice(1, 8).map(([x, y]) => [x + 3.4, y + 3.2] as Pt), 6))}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.95"
            style={{ strokeWidth: "2.4px" }}
            filter={u("blur1")}
          />
          <path
            d={poly(sample(crownPts(cx, v).slice(1, 6).map(([x, y]) => [x + 6.5, y + 4] as Pt), 6))}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.9"
            style={{ strokeWidth: "4px" }}
            filter={u("blur1")}
          />
        </>
      ) : (
        <>
          {spaces}
          {dressing ? (
            <Cavity ds={[dress(cx - 10), dress(cx + 10)]} mat="paste" clip={`${id}sil`} />
          ) : null}
          {closure !== "none" ? (
            <TempFilling cx={cx} kind={closure === "temp" ? "temp" : "final"} clip={`${id}sil`} />
          ) : null}
        </>
      )}
    </g>
  );
}

/* ---------- gum with a scalloped margin ---------- */

/**
 * Gum band cut through, to sit behind the tooth. The margin rises into a thin
 * cuff against each tooth neck and into a papilla where two teeth meet; over a
 * missing tooth it sags into a soft ridge.
 */
export function ToothGum({
  x0,
  x1,
  teeth = [R.cx],
  gaps = [],
}: {
  x0: number;
  x1: number;
  teeth?: number[];
  gaps?: number[];
}) {
  const base = 207;
  const g = (x: number, mu: number, sig: number) => Math.exp(-(((x - mu) / sig) ** 2));
  const top = (x: number) => {
    let y = base;
    for (const c of teeth) {
      y -= 8 * g(x, c - 49, 10) + 8 * g(x, c + 49, 10);
      y -= 5 * g(x, c, 40);
    }
    for (const c of gaps) y += 7 * g(x, c, 42);
    // papillae where two teeth sit side by side
    for (let i = 0; i < teeth.length - 1; i++) {
      const m = (teeth[i] + teeth[i + 1]) / 2;
      if (!gaps.some((gp) => gp > teeth[i] && gp < teeth[i + 1])) y -= 16 * g(x, m, 12);
    }
    // the gum rises a little at the cut edge of the slab
    y -= 12 * g(x, x0, 26) + 12 * g(x, x1, 26);
    return y;
  };
  const upper: Pt[] = [];
  for (let x = x0; x <= x1; x += 6) upper.push([x, top(x)]);
  if (upper[upper.length - 1][0] < x1) upper.push([x1, top(x1)]);
  const lower: Pt[] = [];
  for (let x = x1; x >= x0; x -= 12) lower.push([x, crestY(x) + 3]);
  lower.push([x0, crestY(x0) + 3]);
  const d = curve(upper) + `L${f(x1)} ${f(lower[0][1])}` + curve(lower, false) + "Z";
  const edge = curve(upper);
  return (
    <g>
      <path d={d} fill={u("gum")} className={s.eGum} strokeOpacity="0.7" />
      <path d={d} fill="none" stroke="#fff" strokeOpacity="0" />
      <path d={edge} transform="translate(0 3.4)" fill="none" stroke="#F7CDC8" strokeOpacity="0.85" strokeWidth="3.2" strokeLinecap="round" />
      <path d={edge} fill="none" className={s.eGum} />
    </g>
  );
}

/* ---------- dental dam and numbing ---------- */

/** Thin neutral sheet stretched flat across the gum and tucked round the tooth neck. */
export function DentalDam({ cx = R.cx, y = 184, x0 = 0, x1 = 640 }: { cx?: number; y?: number; x0?: number; x1?: number }) {
  const id = idOf(useId());
  const t = 6.5;
  const neck = 199;
  const half = 50;
  /* One band per side: flat, then sweeping down to grip the neck. */
  const band = (sign: 1 | -1) => {
    const xe = cx + sign * half;
    const xs = cx + sign * 112;
    const xo = sign === -1 ? x0 : x1;
    const k = sign;
    return (
      `M${f(xo)} ${y}H${f(xs)}C${f(xs - k * 30)} ${y} ${f(xe + k * 18)} ${y + 6} ${f(xe)} ${neck}` +
      `L${f(xe + k * 1.5)} ${neck + t}C${f(xe + k * 22)} ${y + 6 + t} ${f(xs - k * 30)} ${y + t} ${f(xs)} ${y + t}H${f(xo)}Z`
    );
  };
  const hi = (sign: 1 | -1) => {
    const xe = cx + sign * half;
    const xs = cx + sign * 112;
    const xo = sign === -1 ? x0 : x1;
    const k = sign;
    return `M${f(xo)} ${y + 1}H${f(xs)}C${f(xs - k * 30)} ${y + 1} ${f(xe + k * 18)} ${y + 7} ${f(xe + k * 0.5)} ${neck}`;
  };
  return (
    <g>
      <defs>
        <path id={`${id}l`} d={band(-1)} />
        <path id={`${id}r`} d={band(1)} />
      </defs>
      {[`${id}l`, `${id}r`].map((h) => (
        <g key={h}>
          <use href={`#${h}`} transform="translate(1.5 5)" fill="#3d2f16" fillOpacity="0.22" stroke="none" filter={u("blur3")} />
          <use href={`#${h}`} fill={ur("dam")} className={r.eDam} />
        </g>
      ))}
      {[-1, 1].map((k) => (
        <path key={k} d={hi(k as 1 | -1)} fill="none" stroke="#fff" strokeOpacity="0.85" style={{ strokeWidth: "1.1px" }} />
      ))}
    </g>
  );
}
/** Soft concentric red-tint arcs round the tooth: the area is numb. */
export function NumbZone({ cx = R.cx, cy = 232 }: { cx?: number; cy?: number }) {
  const rings = [
    { rx: 112, ry: 176, o: 0.42, w: 4 },
    { rx: 150, ry: 208, o: 0.28, w: 4 },
    { rx: 188, ry: 240, o: 0.16, w: 4 },
  ];
  const arc = (rx: number, ry: number, a0: number, a1: number) => {
    const p = (a: number) => `${f(cx + rx * Math.cos(a))} ${f(cy + ry * Math.sin(a))}`;
    return `M${p(a0)}A${rx} ${ry} 0 0 1 ${p(a1)}`;
  };
  const d2r = Math.PI / 180;
  return (
    <g>
      {rings.map((g) => (
        <g key={g.rx}>
          {/* left and right sweeps, leaving the bottom and top open */}
          <path d={arc(g.rx, g.ry, 118 * d2r, 232 * d2r)} className={r.numbArc} strokeOpacity={g.o} style={{ strokeWidth: `${g.w}px` }} />
          <path d={arc(g.rx, g.ry, -52 * d2r, 62 * d2r)} className={r.numbArc} strokeOpacity={g.o} style={{ strokeWidth: `${g.w}px` }} />
        </g>
      ))}
    </g>
  );
}

/* ---------- annotation helpers built on the Arrow look ---------- */

/** Arrow head only, pointing along (ux, uy) with its tip at (x, y). */
function Head({ x, y, ux, uy, head = 13, spread = 8.5 }: { x: number; y: number; ux: number; uy: number; head?: number; spread?: number }) {
  const bx = x - ux * head;
  const by = y - uy * head;
  const px = -uy;
  const py = ux;
  return (
    <polygon
      points={`${f(x)},${f(y)} ${f(bx + px * spread)},${f(by + py * spread)} ${f(bx - px * spread)},${f(by - py * spread)}`}
      className={s.redFill}
    />
  );
}

/** A red arrow that loops round an area (an elliptical arc ending in a head). */
export function LoopArrow({
  cx,
  cy,
  rx,
  ry,
  from = 210,
  sweep = 290,
  w = 3.4,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  /** Start angle in degrees (0 = right, 90 = down). */
  from?: number;
  /** Degrees travelled clockwise on screen. */
  sweep?: number;
  w?: number;
}) {
  const d2r = Math.PI / 180;
  const pts: Pt[] = [];
  const n = Math.max(12, Math.round(sweep / 8));
  for (let i = 0; i <= n; i++) {
    const a = (from + (sweep * i) / n) * d2r;
    pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
  }
  const e = pts[n];
  const p = pts[n - 1];
  const len = Math.hypot(e[0] - p[0], e[1] - p[1]) || 1;
  const ux = (e[0] - p[0]) / len;
  const uy = (e[1] - p[1]) / len;
  const d = curve(pts.slice(0, -1).concat([[e[0] - ux * 9, e[1] - uy * 9]]));
  return (
    <g>
      <path d={d} className={r.halo} style={{ strokeWidth: `${w + 3.4}px` }} />
      <path d={d} className={r.redThin} style={{ strokeWidth: `${w}px` }} />
      <Head x={e[0]} y={e[1]} ux={ux} uy={uy} head={14} spread={9} />
    </g>
  );
}

/** A red arrow with a slash through it: "do not". */
export function SlashedArrow({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const k = 13;
  return (
    <g>
      <Arrow x1={x1} y1={y1} x2={x2} y2={y2} w={5} head={18} spread={11} />
      <path d={`M${f(mx - k)} ${f(my + k)}L${f(mx + k)} ${f(my - k)}`} stroke="#FFFAF0" style={{ strokeWidth: "10px" }} strokeLinecap="round" />
      <path d={`M${f(mx - k)} ${f(my + k)}L${f(mx + k)} ${f(my - k)}`} stroke="#D71920" style={{ strokeWidth: "4px" }} strokeLinecap="round" />
    </g>
  );
}

/**
 * Dashed outline round one shape, or round the union of several (the parts
 * that fall inside the union are masked away, so only the outer line shows).
 */
export function DashedOutline({
  ds,
  tone = "red",
  fill,
}: {
  ds: string[];
  tone?: "red" | "ink";
  fill?: string;
}) {
  const id = idOf(useId());
  const cls = tone === "red" ? r.redDashed : r.inkDashed;
  return (
    <g>
      <defs>
        <mask id={`${id}m`} maskUnits="userSpaceOnUse" x="-40" y="-40" width="720" height="560">
          <rect x="-40" y="-40" width="720" height="560" fill="#fff" />
          {ds.map((d, i) => (
            <path key={i} d={d} fill="#000" stroke="none" />
          ))}
        </mask>
      </defs>
      {fill ? ds.map((d, i) => <path key={`f${i}`} d={d} fill={fill} stroke="none" />) : null}
      <g mask={`url(#${id}m)`}>
        {tone === "red"
          ? ds.map((d, i) => <path key={`h${i}`} d={d} className={r.halo} style={{ strokeWidth: "6px" }} />)
          : null}
        {ds.map((d, i) => (
          <path key={i} d={d} className={cls} style={{ strokeWidth: "3.2px" }} />
        ))}
      </g>
    </g>
  );
}

/** A dashed red arrow: dashed shaft, solid head. */
export function DashedArrow({
  x1,
  y1,
  x2,
  y2,
  head = 15,
  spread = 9.5,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  head?: number;
  spread?: number;
}) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  return (
    <g>
      <path
        d={`M${f(x1)} ${f(y1)}L${f(x2 - ux * (head - 2))} ${f(y2 - uy * (head - 2))}`}
        className={r.redDashed}
        style={{ strokeWidth: "3px", strokeDasharray: "7 5" }}
      />
      <Head x={x2} y={y2} ux={ux} uy={uy} head={head} spread={spread} />
    </g>
  );
}
/** Magnified view of a clean canal wall: dentine either side of a smooth, pale canal. */
export function CanalWallDetail({ cx, cy, r: rad }: { cx: number; cy: number; r: number }) {
  const id = idOf(useId());
  const x0 = cx - rad;
  const y0 = cy - rad;
  const w = rad * 2;
  const wall = (side: -1 | 1) => {
    const a = cx + side * 15;
    return `M${f(a)} ${f(y0 - 4)}C${f(a - side * 3)} ${f(cy - 18)} ${f(a + side * 4)} ${f(cy + 14)} ${f(a)} ${f(y0 + w + 4)}`;
  };
  const chan = `M${f(cx - 15)} ${f(y0 - 4)}C${f(cx - 18)} ${f(cy - 18)} ${f(cx - 11)} ${f(cy + 14)} ${f(cx - 15)} ${f(y0 + w + 4)}L${f(cx + 15)} ${f(y0 + w + 4)}C${f(cx + 19)} ${f(cy + 14)} ${f(cx + 12)} ${f(cy - 18)} ${f(cx + 15)} ${f(y0 - 4)}Z`;
  return (
    <g>
      <defs>
        <clipPath id={`${id}c`}>
          <rect x={x0} y={y0} width={w} height={w} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}c)`}>
        <rect x={x0} y={y0} width={w} height={w} fill={ur("dentine")} stroke="none" />
        <rect x={x0} y={y0} width={w} height={w} fill={ur("tub-root")} stroke="none" transform={`translate(${f(cx)} ${f(cy)}) scale(2.4) translate(${f(-cx)} ${f(-cy)})`} />
        <rect x={x0} y={y0} width={w} height={w} fill={u("shade-r")} stroke="none" />
        <path d={chan} fill={ur("clean")} stroke="none" />
        <path d={chan} fill="none" stroke="#7E6A45" strokeOpacity="0.3" style={{ strokeWidth: "10px" }} filter={ur("soft")} transform="translate(2 2)" />
        <path d={chan} fill={ur("clean")} stroke="none" opacity="0.25" />
        <path d={wall(-1)} fill="none" className={r.eCanal} style={{ strokeWidth: "1.6px" }} />
        <path d={wall(1)} fill="none" className={r.eCanal} style={{ strokeWidth: "1.6px" }} />
        <path d={`M${f(cx + 8)} ${f(cy - 34)}C${f(cx + 6)} ${f(cy - 8)} ${f(cx + 9)} ${f(cy + 18)} ${f(cx + 7)} ${f(cy + 40)}`} fill="none" stroke="#fff" strokeOpacity="0.9" style={{ strokeWidth: "2.4px" }} filter={u("blur1")} />
        <path d={`M${f(cx - 26)} ${f(cy - 30)}C${f(cx - 28)} ${f(cy - 8)} ${f(cx - 26)} ${f(cy + 14)} ${f(cx - 29)} ${f(cy + 38)}`} fill="none" stroke="#fff" strokeOpacity="0.5" style={{ strokeWidth: "4px" }} filter={u("blur1")} />
      </g>
    </g>
  );
}


