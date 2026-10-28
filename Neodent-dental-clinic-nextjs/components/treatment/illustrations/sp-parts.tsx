import { useId, type ReactNode } from "react";
import s from "./illustrations.module.css";
import p from "./sp-illustrations.module.css";
import { f } from "./geometry";
import { Bone, DimensionLine } from "./parts";
import { FrontTooth } from "./cbu-parts";
import {
  GUM_HEALTHY,
  fleckPath,
  gumShape,
  plaqueShape,
  stainPath,
  tartarShape,
  xAt,
  type GumCfg,
  type Side,
} from "./sp-geometry";

/* ------------------------------------------------------------------
   Parts for the scaling and polishing scenes. The side-on tooth, gum and
   bone are the kit's (cbu-parts FrontTooth, parts Bone); this file adds the
   gum with its groove, the deposits, the instruments and a few small
   annotation helpers. Gradients: IllustrationDefs ("neo-"), RctDefs
   ("neo-rct-", used by FrontTooth) and SpDefs ("neo-sp-").
   Stacking order in a section:
     Bone -> tooth -> groove shadow -> gum -> deposits -> instruments -> labels.
   ------------------------------------------------------------------ */

const u = (n: string) => `url(#neo-${n})`;
const idOf = (raw: string) => raw.replace(/:/g, "");

/* ---------- gum with a groove ---------- */

function GumSide({ side, cfg }: { side: Side; cfg: GumCfg }) {
  const g = gumShape(side, cfg);
  return (
    <g>
      <path d={g.gap} className={p.gap} />
      <path d={g.fill} fill={u("gum")} className={s.eGum} strokeOpacity="0.7" />
      <path d={g.top} transform="translate(0 3.4)" fill="none" stroke="#F7CDC8" strokeOpacity="0.85" strokeWidth="3.2" strokeLinecap="round" />
      <path d={g.top} fill="none" className={s.eGum} />
    </g>
  );
}

/**
 * The tooth, its gum and the bone, cut front to back. `above` is drawn after
 * the gum (deposits, instruments); `below` between the tooth and the gum.
 */
export function SpSection({
  gum = GUM_HEALTHY,
  below,
  children,
}: {
  gum?: GumCfg;
  below?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <g>
      <Bone x0={112} x1={528} floor={392} />
      <FrontTooth />
      {below}
      <GumSide side="labial" cfg={gum} />
      <GumSide side="lingual" cfg={gum} />
      {children}
    </g>
  );
}

/** Soft ivory fade across the bottom of a cropped section. */
export function SectionFade({ viewBox, from = 0.7 }: { viewBox: string; from?: number }) {
  const [x, y, w, h] = viewBox.split(" ").map(Number);
  return <rect x={x - 1} y={y + h * from} width={w + 2} height={h * (1 - from) + 1} fill={u("sp-fade-b")} stroke="none" />;
}

/* ---------- deposits ---------- */

export function Plaque({
  side,
  y0,
  y1,
  thin = 2.4,
  thick = 4.6,
  seed = 3,
}: {
  side: Side;
  y0: number;
  y1: number;
  thin?: number;
  thick?: number;
  seed?: number;
}) {
  const d = plaqueShape(side, y0, y1, thin, thick, seed);
  return (
    <g>
      <path d={d} className={p.plaque} />
      <path d={d} fill={u("sp-stipple")} stroke="none" />
    </g>
  );
}

export function Tartar({
  side,
  y0,
  y1,
  peak,
  thick,
  seed = 7,
  limit,
}: {
  side: Side;
  y0: number;
  y1: number;
  peak: number;
  thick: number;
  seed?: number;
  limit?: (y: number) => number;
}) {
  const t = tartarShape(side, y0, y1, peak, thick, seed, limit);
  return (
    <g>
      <path d={t.d} className={p.tartar} />
      <path d={t.facets} className={p.tartarFacet} />
    </g>
  );
}

export function Stain({ side, ranges }: { side: Side; ranges: [number, number][] }) {
  return (
    <g>
      {ranges.map(([a, b]) => (
        <path key={a} d={stainPath(side, a, b)} className={p.stain} />
      ))}
    </g>
  );
}

/** Small hard flecks lifting off the surface. */
export function Flecks({ items }: { items: [number, number, number, number][] }) {
  return (
    <g>
      {items.map(([x, y, size, rot], i) => (
        <path key={i} d={fleckPath(x, y, size, rot, 11 + i)} className={p.fleck} />
      ))}
    </g>
  );
}

/* ---------- instruments (pointing along +x, tip at the origin) ---------- */

/** A generic hand-held scaler: grip, bent shank and a short red tip. */
export function Scaler({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${rot})`}>
      <path d="M-210 0H-100" className={p.handleEdge} />
      <path d="M-210 0H-100" className={p.handleBody} />
      <path d="M-186 0H-176M-166 0H-156M-146 0H-136M-126 0H-116" fill="none" stroke="#4a565d" strokeOpacity="0.5" strokeWidth="5.4" strokeLinecap="butt" style={{ vectorEffect: "none" }} />
      <path d="M-100 0H-52Q-34 0 -24 3.4" className={p.rodEdge} />
      <path d="M-100 0H-52Q-34 0 -24 3.4" className={p.rodSteel} />
      <path d="M-24 3.4Q-10 5.4 0 0" className={p.tip} />
    </g>
  );
}

/** A soft rounded applicator on a slim shank (no motor, no brand shape). */
export function Applicator({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${rot})`}>
      <path d="M-170 0H-100" className={p.handleEdge} />
      <path d="M-170 0H-100" className={p.handleBody} />
      <path d="M-100 0H-30" className={p.rodEdge} />
      <path d="M-100 0H-30" className={p.rodSteel} />
      <path d="M-30 -8C-30 -17 -4 -17 3 -7Q7 0 3 7C-4 17 -30 17 -30 8Z" fill={u("membrane")} className={p.soft} />
      <path d="M-24 -9Q-12 -12.4 -2 -6" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.2" strokeLinecap="round" style={{ vectorEffect: "none" }} />
    </g>
  );
}

/** A dental mirror: round head, slim neck, grip. Head centre at the origin. */
export function Mirror({ x, y, rot, r = 22 }: { x: number; y: number; rot: number; r?: number }) {
  const id = idOf(useId());
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${rot})`}>
      <path d={`M${r - 1} 0H${r + 42}`} className={p.rodEdge} />
      <path d={`M${r - 1} 0H${r + 42}`} className={p.rodSteel} />
      <path d={`M${r + 42} 0H${r + 130}`} className={p.handleEdge} />
      <path d={`M${r + 42} 0H${r + 130}`} className={p.handleBody} />
      <clipPath id={`neo-sp-${id}c`}>
        <circle cx="0" cy="0" r={r} />
      </clipPath>
      <circle cx="0" cy="0" r={r} fill="#FBF7EC" stroke="none" />
      <g clipPath={`url(#neo-sp-${id}c)`}>
        <circle cx="0" cy="0" r={r} fill={u("glass")} stroke="none" />
        <path d={`M${-r} ${r * 0.5}L${r * 0.5} ${-r}`} stroke="#fff" strokeOpacity="0.9" strokeWidth={r * 0.5} fill="none" style={{ vectorEffect: "none" }} />
        <path d={`M${-r * 0.2} ${r}L${r} ${-r * 0.2}`} stroke="#fff" strokeOpacity="0.6" strokeWidth={r * 0.18} fill="none" style={{ vectorEffect: "none" }} />
      </g>
      <circle cx="0" cy="0" r={r} className={p.glassRim} />
    </g>
  );
}

/** A lens ring over one spot: clipped, magnified content, a short handle. */
export function Lens({
  cx,
  cy,
  r,
  ang = -45,
  children,
}: {
  cx: number;
  cy: number;
  r: number;
  /** Handle direction in degrees (0 = right, -90 = up). */
  ang?: number;
  children: ReactNode;
}) {
  const id = idOf(useId());
  return (
    <g>
      <g transform={`translate(${f(cx)} ${f(cy)}) rotate(${ang})`}>
        <path d={`M${r - 1} 0H${r + 48}`} className={p.handleEdge} />
        <path d={`M${r - 1} 0H${r + 48}`} className={p.handleBody} />
      </g>
      <clipPath id={`neo-sp-${id}c`}>
        <circle cx={cx} cy={cy} r={r} />
      </clipPath>
      <circle cx={cx} cy={cy} r={r} fill="#FBF7EC" stroke="none" />
      <g clipPath={`url(#neo-sp-${id}c)`}>{children}</g>
      <circle cx={cx} cy={cy} r={r} fill={u("glass")} stroke="none" />
      <circle cx={cx} cy={cy} r={r} className={p.glassRim} />
      <circle cx={cx} cy={cy} r={r - 3} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.2" />
    </g>
  );
}

/** Toothbrush: bristles point along +y, the grip runs back along -x. Head centre at the origin. */
export function Toothbrush({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${rot})`}>
      <path d="M-150 -2.5Q-150 -6.5 -145 -6.5L-26 -5.5L-26 2.5L-145 3.5Q-150 3.5 -150 -2.5Z" className={p.brushTint} />
      <rect x="-26" y="-9" width="52" height="11" rx="3.4" className={p.brushBody} />
      {[-21, -14.5, -8, -1.5, 5, 11.5, 18].map((bx) => (
        <path key={bx} d={`M${bx} 2V14`} className={p.bristle} />
      ))}
    </g>
  );
}

/** Interdental brush: a thin wire with a short bristled tip, tip at the origin pointing +x. */
export function InterdentalBrush({ x, y, rot }: { x: number; y: number; rot: number }) {
  const rows = Array.from({ length: 9 }, (_, i) => -34 + i * 4);
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${rot})`}>
      <path d="M-120 0H-60" className={p.handleEdge} />
      <path d="M-120 0H-60" className={p.handleBody} />
      <path d="M-60 0H0" className={p.wire} />
      {rows.map((bx) => {
        const len = 6.4 - Math.max(0, bx + 6) * 0.42;
        return <path key={bx} d={`M${bx} ${-len}V${len}`} className={p.bristle} />;
      })}
    </g>
  );
}

/* ---------- annotation helpers ---------- */

/** A red check mark with a pale halo so it reads on enamel. */
export function Check({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  const d = `M${f(x)} ${f(y)}L${f(x + 9 * size)} ${f(y + 10 * size)}L${f(x + 26 * size)} ${f(y - 13 * size)}`;
  return (
    <g>
      <path d={d} className={p.halo} />
      <path d={d} className={p.check} />
    </g>
  );
}

/** Red double-headed dimension line with a halo, so it reads over gum as well as air. */
export function SpDim({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return (
    <g>
      <path d={`M${x} ${y1}V${y2}M${x - 11} ${y1}H${x + 11}M${x - 11} ${y2}H${x + 11}`} className={p.halo} />
      <DimensionLine x1={x} y1={y1} x2={x} y2={y2} />
    </g>
  );
}

/** A scene label; `onArt` adds a thin ivory outline for text that crosses gum or tooth. */
export function SpLabel({
  x,
  y,
  anchor = "start",
  size = 16,
  onArt = false,
  children,
}: {
  x: number;
  y: number;
  anchor?: "start" | "end" | "middle";
  size?: number;
  onArt?: boolean;
  children: ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline="central"
      className={onArt ? `${s.label} ${p.onArt}` : s.label}
      style={{ fontSize: size }}
    >
      {children}
    </text>
  );
}

export { p as spStyles, xAt };
