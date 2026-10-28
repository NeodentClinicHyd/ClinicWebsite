import { useId, type ReactNode } from "react";
import s from "./illustrations.module.css";
import c from "./cbu-illustrations.module.css";
import { crestY, curve, f, type Pt } from "./geometry";
import { Label } from "./parts";
import { PulpTissue, ToothSection } from "./rct-parts";
import { ribbon, poly, sample } from "./rct-geometry";
import {
  CAV_CUT_D,
  CHIP_BREAK_D,
  CHIP_CUT_D,
  CORNER,
  CORNER_D,
  CRACK_D,
  DECAY_D,
  FILL_D,
  INCISOR,
  INCISOR_CANAL,
  INCISOR_CHAMBER_D,
  INCISOR_CROWN_D,
  INCISOR_D,
  INCR_Y,
  WALL_D,
  WEAR_D,
  WEAR_LINE_D,
  belowD,
  incisorCoreD,
  incrD,
} from "./cbu-geometry";

/* ------------------------------------------------------------------
   Parts for the composite build-up scenes. Same craft as parts.tsx and
   rct-parts.tsx: gradients, tinted edge strokes of 1 to 1.5px, a soft
   shadow on the right and below, and a highlight at the top left. The tooth
   itself is the root canal kit's ToothSection (enamel, dentine, pulp);
   this file adds the cavity, the five materials and the front tooth.
   Gradients live in CbuDefs ("neo-cbu-*"), RctDefs ("neo-rct-*") and
   IllustrationDefs ("neo-*").
   ------------------------------------------------------------------ */

const u = (n: string) => `url(#neo-${n})`;
const ur = (n: string) => `url(#neo-rct-${n})`;
const uc = (n: string) => `url(#neo-cbu-${n})`;
const idOf = (raw: string) => raw.replace(/:/g, "");

/** Box that covers the missing corner (gradients are sized to it). */
const BOX = { x: 338, y: 94, width: 62, height: 66 };

/* ---------- a two-line (or one-line) scene label ---------- */

export function Tag({
  x,
  y,
  lines,
  anchor = "start",
}: {
  x: number;
  y: number;
  lines: string[];
  anchor?: "start" | "end" | "middle";
}) {
  return (
    <>
      {lines.map((t, i) => (
        <Label key={t} x={x} y={y + i * 27} anchor={anchor}>
          {t}
        </Label>
      ))}
    </>
  );
}

/** A soft white line along the lit edge of a material (top left). */
function Rim({ dx = 3.4, dy = 3.2, w = 2.6, o = 0.95 }: { dx?: number; dy?: number; w?: number; o?: number }) {
  return (
    <g transform={`translate(${dx} ${dy})`}>
      <path d={CORNER_D} fill="none" stroke="#fff" strokeOpacity={o} style={{ strokeWidth: `${w}px` }} filter={u("blur1")} />
    </g>
  );
}

/* ---------- the materials, each drawn inside the missing corner ---------- */

function Void() {
  return (
    <g>
      <rect {...BOX} fill={uc("void")} stroke="none" />
      <g transform="translate(1.8 2.4)">
        <path d={WALL_D} fill="none" stroke="#5E4A28" strokeOpacity="0.5" style={{ strokeWidth: "11px" }} filter={ur("soft")} />
      </g>
      <path d="M368 150.6L388 150.6" fill="none" stroke="#fff" strokeOpacity="0.55" style={{ strokeWidth: "2.4px" }} filter={u("blur1")} />
    </g>
  );
}

function Resin({ bands }: { bands: number }) {
  const edges = [162, ...INCR_Y, 90];
  return (
    <g>
      <rect {...BOX} fill={uc("resin")} stroke="none" />
      {[0, 2].map((i) =>
        i < bands ? (
          <rect key={i} x={BOX.x} y={edges[i + 1]} width={BOX.width} height={edges[i] - edges[i + 1]} fill="#D4BF86" fillOpacity="0.14" stroke="none" />
        ) : null,
      )}
      <rect {...BOX} fill={u("shade-r")} stroke="none" opacity="0.85" />
      <rect {...BOX} fill={u("shade-b")} stroke="none" opacity="0.7" />
      {INCR_Y.slice(0, Math.max(0, bands - 1)).map((y) => (
        <g key={y}>
          <path d={incrD(y)} className={c.incr} />
          <path d={incrD(y + 1.5)} className={c.incrHi} />
        </g>
      ))}
      <Rim />
    </g>
  );
}

function Amalgam() {
  return (
    <g>
      <rect {...BOX} fill={uc("amalgam")} stroke="none" />
      <rect {...BOX} fill={uc("mottle")} stroke="none" />
      <rect {...BOX} fill={uc("metal-shade")} stroke="none" />
      <rect {...BOX} fill={uc("metal-sheen")} stroke="none" />
      <Rim dx={2.6} dy={2.6} w={2} o={0.55} />
    </g>
  );
}

function Ionomer() {
  return (
    <g>
      <rect {...BOX} fill={uc("ionomer")} stroke="none" />
      <rect {...BOX} fill={uc("speckle")} stroke="none" />
      <Rim dx={3} dy={3} w={2} o={0.35} />
    </g>
  );
}

/** Glossy highlights on a polished surface, along the lit side of the cusp. */
function Gloss() {
  const top = CORNER.slice(2, 14).map(([x, y]) => [x - 0.5, y + 4.6] as Pt);
  const side = CORNER.slice(16, 30).map(([x, y]) => [x - 5.4, y + 3] as Pt);
  return (
    <g>
      <path d={poly(sample(top.filter((_, i) => i % 3 === 0), 6))} fill="none" stroke="#fff" strokeOpacity="0.95" style={{ strokeWidth: "3px" }} filter={u("blur1")} />
      <path d={poly(sample(side.filter((_, i) => i % 4 === 0), 6))} fill="none" stroke="#fff" strokeOpacity="0.85" style={{ strokeWidth: "2.4px" }} filter={u("blur1")} />
      <path d="M351 111.4L356.2 111.4M353.6 108.8L353.6 114" fill="none" stroke="#fff" style={{ strokeWidth: "1.5px" }} />
    </g>
  );
}

/* ---------- a molar with the prepared cavity ---------- */

export type FillKind = "none" | "void" | "decay" | "resin" | "amalgam" | "ionomer" | "porcelain";

export type MolarProps = {
  /** Cut the corner away to leave the prepared cavity. */
  cavity?: boolean;
  fill?: FillKind;
  /** Resin increments to show, bottom up (4 = all, 0 = a smooth finished surface). */
  bands?: number;
  /** Part-filled: the fill stops at this height (the cavity above stays open). */
  level?: number;
  /** The thin red-tint bonding film on the cavity walls. */
  bond?: "none" | "thin" | "bold";
  /** Gloss highlights on a polished surface. */
  gloss?: boolean;
  /** Porcelain piece floats this far above its cavity. */
  lift?: number;
  /** Cement lining of the cavity (and the underside of the piece). */
  cement?: boolean;
  /** Worn biting surface (cusps flattened). */
  wear?: boolean;
  /** A fine crack in the crown. */
  crack?: boolean;
};

export function CbuMolar({
  cavity = false,
  fill = "none",
  bands = 0,
  level,
  bond = "none",
  gloss = false,
  lift = 0,
  cement = false,
  wear = false,
  crack = false,
}: MolarProps) {
  const id = idOf(useId());
  const open = cavity || fill !== "none";
  const clipBase = open ? `url(#${id}cut)` : wear ? `url(#${id}wear)` : undefined;
  const partial = level !== undefined;

  const edge =
    fill === "resin" ? c.eResin : fill === "amalgam" ? c.eAmalgam : fill === "ionomer" ? c.eIonomer : fill === "porcelain" ? c.ePorcelain : fill === "decay" ? c.eDecay : c.eVoid;

  let material: ReactNode = null;
  if (fill === "void" || fill === "decay" || fill === "porcelain" || partial) material = <Void />;

  let fillLayer: ReactNode = null;
  if (fill === "resin") fillLayer = <Resin bands={bands} />;
  else if (fill === "amalgam") fillLayer = <Amalgam />;
  else if (fill === "ionomer") fillLayer = <Ionomer />;

  return (
    <g>
      <defs>
        <clipPath id={`${id}cut`}>
          <path d={CAV_CUT_D} clipRule="evenodd" />
        </clipPath>
        <clipPath id={`${id}wear`}>
          <path d={WEAR_D} />
        </clipPath>
        <clipPath id={`${id}fill`}>
          <path d={FILL_D} />
        </clipPath>
        {partial ? (
          <clipPath id={`${id}lv`}>
            <path d={belowD(level)} />
          </clipPath>
        ) : null}
      </defs>

      {/* the tooth, with the corner cut away or the cusps worn down */}
      <g clipPath={clipBase}>
        <ToothSection />
      </g>

      {/* worn biting surface: a flat, slightly cupped cut through enamel and dentine */}
      {wear ? (
        <g>
          <path d={WEAR_LINE_D} fill="none" stroke="#C9B98F" style={{ strokeWidth: "1.3px" }} />
          <path d={WEAR_LINE_D} transform="translate(0 1.7)" fill="none" stroke="#fff" strokeOpacity="0.85" style={{ strokeWidth: "1.2px" }} />
        </g>
      ) : null}

      {/* crack */}
      {crack ? (
        <g>
          <path d={CRACK_D} fill="none" stroke="#6E5A36" strokeOpacity="0.28" style={{ strokeWidth: "4px" }} filter={u("blur1")} />
          <path d={CRACK_D} transform="translate(1.3 0.2)" className={c.crackHi} />
          <path d={CRACK_D} className={c.crack} />
        </g>
      ) : null}

      {/* the prepared wall and what sits in the cavity */}
      {open ? (
        <g>
          <path d={WALL_D} fill="none" className={c.eWall} />
          {cement ? (
            <g>
              <path d={WALL_D} className={c.cement} />
              <path d={WALL_D} className={c.cementEdge} />
            </g>
          ) : null}

          <g clipPath={`url(#${id}fill)`}>
            {material}
            {fill === "decay" ? (
              <g>
                <path d={DECAY_D} fill={uc("decay")} className={c.eDecay} />
                <path d={DECAY_D} transform="translate(-1.6 -1.6)" fill="none" stroke="#fff" strokeOpacity="0.35" style={{ strokeWidth: "1.6px" }} filter={u("blur1")} />
              </g>
            ) : null}
            {fillLayer ? (
              <g clipPath={partial ? `url(#${id}lv)` : undefined}>{fillLayer}</g>
            ) : null}
            {partial && fill === "resin" ? (
              <g>
                <path d={incrD(level)} className={c.eResin} fill="none" />
                <path d={incrD(level + 1.6)} className={c.incrHi} />
              </g>
            ) : null}
          </g>

          {bond !== "none" ? <path d={WALL_D} className={bond === "bold" ? c.bondBold : c.bond} /> : null}

          {fill !== "none" && fill !== "porcelain" ? (
            <path
              d={CORNER_D}
              fill="none"
              className={edge}
              strokeOpacity={fill === "void" || fill === "decay" ? 0.55 : 1}
            />
          ) : null}
          {fill === "resin" && gloss ? (
            <g clipPath={`url(#${id}fill)`}>
              <Gloss />
            </g>
          ) : null}
        </g>
      ) : null}

      {/* a lab-made piece: porcelain, lifted or seated, with a cement line at the margin */}
      {fill === "porcelain" ? (
        <g transform={`translate(0 ${-lift})`}>
          <defs>
            <clipPath id={`${id}pc`}>
              <path d={FILL_D} />
            </clipPath>
          </defs>
          <path d={FILL_D} fill={u("porcelain")} stroke="none" />
          <g clipPath={`url(#${id}pc)`}>
            <rect {...BOX} fill={u("shade-r")} stroke="none" opacity="0.9" />
            <rect {...BOX} fill={u("shade-b")} stroke="none" opacity="0.8" />
            <Rim dx={3.4} dy={3.2} w={3} o={0.95} />
          </g>
          <path d={FILL_D} fill="none" className={c.ePorcelain} />
          <path d={WALL_D} className={c.cement} />
          <path d={WALL_D} className={c.cementEdge} />
        </g>
      ) : null}
    </g>
  );
}

/* ---------- front tooth ---------- */

/** Gum band for a front tooth: rises to meet the neck on both sides. */
export function FrontGum({ x0, x1 }: { x0: number; x1: number }) {
  const upper: Pt[] = [
    [x0, 206],
    [240, 205],
    [266, 202.5],
    [279, 198.2],
    [320, 203],
    [354, 198.2],
    [372, 203],
    [400, 206],
    [x1, 206],
  ];
  const lower: Pt[] = [];
  for (let x = x1; x >= x0; x -= 12) lower.push([x, crestY(x) + 3]);
  lower.push([x0, crestY(x0) + 3]);
  const d = curve(upper) + `L${f(x1)} ${f(lower[0][1])}` + curve(lower, false) + "Z";
  const edgeD = curve(upper);
  return (
    <g>
      <path d={d} fill={u("gum")} className={s.eGum} strokeOpacity="0.7" />
      <path d={edgeD} transform="translate(0 3.4)" fill="none" stroke="#F7CDC8" strokeOpacity="0.85" strokeWidth="3.2" strokeLinecap="round" />
      <path d={edgeD} fill="none" className={s.eGum} />
    </g>
  );
}

/** An upper front tooth cut front to back: enamel, dentine, pulp and a long root. */
export function FrontTooth({ chipped = false }: { chipped?: boolean }) {
  const id = idOf(useId());
  const core = incisorCoreD();
  const chamber = INCISOR_CHAMBER_D;
  const canal = ribbon(INCISOR_CANAL, 8, 3.5, 320);
  const rootLine = poly(sample(INCISOR.slice(9, 22), 6));

  return (
    <g clipPath={chipped ? `url(#${id}cut)` : undefined}>
      <defs>
        <clipPath id={`${id}sil`}>
          <path d={INCISOR_D} />
        </clipPath>
        <clipPath id={`${id}crown`}>
          <path d={INCISOR_CROWN_D} />
        </clipPath>
        <clipPath id={`${id}cut`}>
          <path d={`M0 0H640V480H0Z${CHIP_CUT_D}`} clipRule="evenodd" />
        </clipPath>
        <clipPath id={`${id}top`}>
          <rect x="0" y="0" width="640" height="199" />
        </clipPath>
      </defs>
      <path d={rootLine} fill="none" stroke="#C9A97A" strokeOpacity="0.28" style={{ strokeWidth: "6px" }} />
      <path d={INCISOR_D} fill={ur("dentine")} stroke="none" />
      <g clipPath={`url(#${id}sil)`}>
        <path d={core} fill={ur("tub-crown")} stroke="none" />
        <rect x="260" y="207" width="120" height="180" fill={ur("tub-root")} stroke="none" />
        <path d={rootLine} fill="none" stroke="#FAF0D4" strokeOpacity="0.6" style={{ strokeWidth: "5px" }} />
        <path d={INCISOR_D} fill={u("shade-r")} stroke="none" />
        <path d={INCISOR_D} fill={u("shade-b")} stroke="none" opacity="0.7" />
        <path
          d={poly(sample([[296, 240], [293, 275], [297, 315], [304, 345]], 5))}
          fill="none"
          stroke="#fff"
          strokeOpacity="0.5"
          style={{ strokeWidth: "3px" }}
          filter={u("blur1")}
        />
      </g>
      {/* enamel cap */}
      <g clipPath={`url(#${id}crown)`}>
        <path d={`${INCISOR_CROWN_D}${core}`} fillRule="evenodd" fill={ur("enamel")} stroke="none" />
        <path d={`${INCISOR_CROWN_D}${core}`} fillRule="evenodd" fill={u("shade-r")} stroke="none" opacity="0.7" />
        <path d={INCISOR_CROWN_D} fill={u("hi")} stroke="none" opacity="0.75" />
      </g>
      <path d={core} fill="none" stroke="#D9C9A4" strokeOpacity="0.9" style={{ strokeWidth: "1px" }} />
      <path
        d={poly(sample(INCISOR.slice(22).concat(INCISOR.slice(0, 2)).map(([x, y]) => [x + 3.6, y + 3.4] as Pt), 6))}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.95"
        style={{ strokeWidth: "2.4px" }}
        filter={u("blur1")}
      />
      <path d={INCISOR_D} fill="none" className={s.eEnamel} clipPath={`url(#${id}top)`} />
      <path d={rootLine} fill="none" className={s.eDentin} />
      <path d={rootLine} fill="none" className={s.lig} />
      <path d={INCISOR_D} fill="none" className={s.eDentin} clipPath={`url(#${id}sil)`} style={{ opacity: 0 }} />
      <PulpTissue ds={[chamber, canal]} clip={`${id}sil`} />
      {chipped ? (
        <g>
          <path d={CHIP_BREAK_D} transform="translate(0.6 1.4)" fill="none" stroke="#fff" strokeOpacity="0.9" style={{ strokeWidth: "1.4px" }} />
          <path d={CHIP_BREAK_D} fill="none" stroke="#C3B28A" style={{ strokeWidth: "1.4px" }} />
        </g>
      ) : null}
    </g>
  );
}

/* ---------- zoomed margin (C5) ---------- */

/** What the magnifier shows: tooth and resin meeting in one clean, continuous margin. */
export function MarginDetail({ cx, cy, r: rad }: { cx: number; cy: number; r: number }) {
  const id = idOf(useId());
  const x0 = cx - rad;
  const y0 = cy - rad;
  const w = rad * 2;
  /* outer surface: both materials run flush to the same smooth curve */
  const surface = `M${f(cx + 30)} ${f(y0 - 4)}C${f(cx + 36)} ${f(cy - 30)} ${f(cx + 34)} ${f(cy + 26)} ${f(cx + 28)} ${f(y0 + w + 4)}`;
  const body = `M${f(x0 - 4)} ${f(y0 - 4)}L${f(cx + 30)} ${f(y0 - 4)}C${f(cx + 36)} ${f(cy - 30)} ${f(cx + 34)} ${f(cy + 26)} ${f(cx + 28)} ${f(y0 + w + 4)}L${f(x0 - 4)} ${f(y0 + w + 4)}Z`;
  /* margin line: a short, even curve from the dentine wall out to the surface */
  const margin = `M${f(x0 - 6)} ${f(cy + 18)}C${f(cx - 36)} ${f(cy + 12)} ${f(cx - 8)} ${f(cy + 2)} ${f(cx + 6)} ${f(cy - 4)}C${f(cx + 16)} ${f(cy - 8)} ${f(cx + 26)} ${f(cy - 10)} ${f(cx + 35)} ${f(cy - 11)}`;
  const above = `${margin}L${f(cx + 40)} ${f(y0 - 6)}L${f(x0 - 6)} ${f(y0 - 6)}Z`;
  return (
    <g>
      <defs>
        <clipPath id={`${id}b`}>
          <path d={body} />
        </clipPath>
        <clipPath id={`${id}a`}>
          <path d={above} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}b)`}>
        <rect x={x0} y={y0} width={w} height={w} fill={ur("enamel")} stroke="none" />
        <rect x={x0} y={y0} width={w} height={w} fill={u("shade-r")} stroke="none" />
        <path d={`M${f(x0)} ${f(cy + 40)}L${f(cx + 40)} ${f(cy + 40)}`} fill="none" stroke="#C7AE7C" strokeOpacity="0" />
        {/* resin above the margin */}
        <g clipPath={`url(#${id}a)`}>
          <rect x={x0} y={y0} width={w} height={w} fill={uc("resin")} stroke="none" />
          <rect x={x0} y={y0} width={w} height={w} fill={u("shade-r")} stroke="none" opacity="0.5" />
          <path d={`M${f(x0)} ${f(cy - 24)}Q${f(cx)} ${f(cy - 18)} ${f(cx + 40)} ${f(cy - 28)}`} fill="none" stroke="#BDA770" strokeOpacity="0.5" style={{ strokeWidth: "1.2px", vectorEffect: "none" }} />
        </g>
        <path d={margin} fill="none" stroke="#E29C98" strokeOpacity="0.95" style={{ strokeWidth: "4px", vectorEffect: "none" }} />
        <path d={margin} transform="translate(0 -2.6)" fill="none" stroke="#fff" strokeOpacity="0.75" style={{ strokeWidth: "1.6px", vectorEffect: "none" }} />
        <path d={margin} fill="none" stroke="#B7A57C" strokeOpacity="0.7" style={{ strokeWidth: "1.1px", vectorEffect: "none" }} />
        <path d={`M${f(x0 + 14)} ${f(y0 + 10)}C${f(x0 + 12)} ${f(cy - 20)} ${f(x0 + 16)} ${f(cy - 34)} ${f(x0 + 12)} ${f(cy - 40)}`} fill="none" stroke="#fff" strokeOpacity="0.55" style={{ strokeWidth: "7px", vectorEffect: "none" }} filter={u("blur3")} />
      </g>
      <path d={surface} fill="none" className={s.eEnamel} style={{ strokeWidth: "1.8px", vectorEffect: "none" }} />
    </g>
  );
}

/** A short vertical dimension line with end ticks and small arrowheads. */
export function ShortDim({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  const hd = 7;
  const sp = 3.8;
  const tick = 7;
  return (
    <g>
      <line x1={x} y1={y1 + hd * 0.7} x2={x} y2={y2 - hd * 0.7} className={s.redLine} />
      <polygon points={`${f(x)},${f(y1)} ${f(x - sp)},${f(y1 + hd)} ${f(x + sp)},${f(y1 + hd)}`} className={s.redFill} />
      <polygon points={`${f(x)},${f(y2)} ${f(x - sp)},${f(y2 - hd)} ${f(x + sp)},${f(y2 - hd)}`} className={s.redFill} />
      <line x1={x - tick} y1={y1} x2={x + tick} y2={y1} className={s.redLine} />
      <line x1={x - tick} y1={y2} x2={x + tick} y2={y2} className={s.redLine} />
    </g>
  );
}
