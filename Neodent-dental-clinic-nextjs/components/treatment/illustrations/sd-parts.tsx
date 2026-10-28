import { useId, type ReactNode } from "react";
import { FrontTooth } from "./cbu-parts";
import { poly } from "./rct-geometry";
import s from "./illustrations.module.css";
import d from "./sd-illustrations.module.css";
import cb from "./cbu-illustrations.module.css";
import { curve, f, rng, type Pt } from "./geometry";
import { blobPts, closedCurve, crownMap, toothPath } from "./archGeometry";
import {
  chipShape,
  ORIGINAL_D,
  PREPARED_D,
  SLIVER_D,
  placeAll,
  sdGum,
  shellPath,
  toScene,
  type SdGumGeo,
  type SdPlaced,
  type SdSpecs,
} from "./sd-geometry";

/* ------------------------------------------------------------------
   Parts for the smile design scenes. The frontal teeth are drawn from the
   kit's upper-arch geometry (archGeometry.ts) with the same gradients and
   the same top-left light as ArchFront, but each tooth can be moved,
   turned, widened, shortened, shaded, chipped or worn on its own, which
   ArchFront cannot do. Gradients: IllustrationDefs ("neo-"), CbuDefs
   (resin) and SdDefs ("neo-sd-"). Every id made here starts "neo-sd-".
   ------------------------------------------------------------------ */

const u = (n: string) => `url(#neo-${n})`;
const idOf = (raw: string) => raw.replace(/:/g, "");

/* ---------- one tooth, in its local frame (edge at 0, neck above) ---------- */

function SdToothArt({ p, uid }: { p: SdPlaced; uid: string }) {
  const { g, spec } = p;
  const look = spec.look ?? "natural";
  const { w, h, kind } = g;
  const w2 = w / 2;
  const worn = look === "worn";
  const porcelain = look === "crown" || look === "veneer";
  const hh = worn ? h * (1 - (spec.wear ?? (kind === "central" ? 0.27 : 0.24))) : h;
  const path = toothPath(g, { h: hh, flat: worn });
  const M = crownMap("upper", h);
  const P = (x: number, y: number) => {
    const [a, b] = M(x, y);
    return `${f(a)} ${f(b)}`;
  };
  const ptsMap = (pts: Pt[]) => pts.map(([x, y]) => M(x, y));
  const cid = `neo-sd-${uid}-k${p.i}`;
  const cut = spec.chip ? chipShape(w, h, spec.chip.side, spec.chip.w, spec.chip.h) : null;
  const r = rng(40 + p.i * 3);
  const tone = 0.05 + r() * 0.12;
  const dist = Math.abs(p.i - 4.5) - 0.5;
  const hiW = Math.max(2.6, w * 0.085);
  const front = kind === "central" || kind === "lateral";

  let deco: ReactNode = null;
  if (look === "filled") {
    const blob = blobPts(0.05 * w, 0.52 * hh, (front ? 0.3 : 0.31) * w, (front ? 0.17 : 0.2) * hh, 11 + p.i);
    const big = blobPts(0.05 * w, 0.52 * hh, (front ? 0.3 : 0.31) * w * 1.25, (front ? 0.17 : 0.2) * hh * 1.4, 11 + p.i);
    const patch = closedCurve(ptsMap(blob));
    deco = (
      <g>
        <path d={closedCurve(ptsMap(big))} fill="#A9834E" fillOpacity="0.2" stroke="none" filter={u("blur1")} />
        <path d={patch} fill="#CFCABB" stroke="none" />
        <path d={patch} fill="none" stroke="#8A6B40" strokeOpacity="0.62" strokeWidth="1.2" strokeDasharray="17 6 5 6" />
      </g>
    );
  } else if (spec.decay) {
    const core = closedCurve(ptsMap(blobPts(-0.14 * w, 0.4 * hh, 0.15 * w, 0.085 * hh, 5 + p.i)));
    const halo = closedCurve(ptsMap(blobPts(-0.14 * w, 0.42 * hh, 0.26 * w, 0.15 * hh, 6 + p.i)));
    deco = (
      <g>
        <path d={halo} fill="#A47A3E" fillOpacity="0.38" stroke="none" filter={u("blur1")} />
        <path d={core} fill="#5A3D20" fillOpacity="0.95" stroke="#3E2A15" strokeOpacity="0.6" strokeWidth="1" />
        <path d={closedCurve(ptsMap(blobPts(-0.16 * w, 0.39 * hh, 0.07 * w, 0.04 * hh, 9 + p.i)))} fill="#2F2010" stroke="none" />
      </g>
    );
  } else if (worn) {
    const t = 0.17 * hh;
    const band = `M${P(-w2 + 3.6, hh)}L${P(-w2 + 3.6, hh - t * 0.6)}Q${P(0, hh - t * 1.2)} ${P(w2 - 3.6, hh - t * 0.6)}L${P(w2 - 3.6, hh)}Z`;
    const [ex, ey] = M(0, hh - t * 0.45);
    deco = (
      <g>
        <path d={band} fill={u("arch-wear")} stroke="#C7AE7C" strokeWidth="0.9" />
        <ellipse cx={f(ex)} cy={f(ey)} rx={f(w * 0.26)} ry="1.6" fill="#9C7A47" fillOpacity="0.55" stroke="none" />
      </g>
    );
  }

  const fill = porcelain ? u("arch-ceramic") : u("enamel");
  const body = (
    <g>
      <path d={path} fill={fill} className={s.eEnamel} stroke={porcelain ? "#AEB8BD" : undefined} />
      <clipPath id={cid}>
        <path d={path} />
      </clipPath>
      <g clipPath={`url(#${cid})`}>
        {!porcelain ? <path d={path} fill="#E4D0A0" fillOpacity={tone} stroke="none" /> : null}
        {!porcelain ? <path d={path} fill={u("cervical-u")} stroke="none" /> : null}
        <path d={path} fill={u("incisal-u")} stroke="none" />
        <path d={path} fill={u("shade-r")} stroke="none" />
        {dist > 0 ? <path d={path} fill="#7C6A48" fillOpacity={0.032 * dist} stroke="none" /> : null}
        {spec.shade ? <path d={path} fill={`url(#neo-sd-shade-${spec.shade})`} stroke="none" /> : null}
        <g fill="none">
          <path d={`M${P(-0.14 * w, 0.12 * hh)}C${P(-0.16 * w, 0.4 * hh)} ${P(-0.12 * w, 0.62 * hh)} ${P(-0.1 * w, 0.84 * hh)}`} stroke="#CFC4B0" strokeOpacity="0.4" strokeWidth="1" />
          <path d={`M${P(0.16 * w, 0.14 * hh)}C${P(0.18 * w, 0.4 * hh)} ${P(0.14 * w, 0.62 * hh)} ${P(0.12 * w, 0.84 * hh)}`} stroke="#CFC4B0" strokeOpacity="0.3" strokeWidth="1" />
          <path d={`M${P(-0.3 * w, 0.2 * hh)}C${P(-0.34 * w, 0.42 * hh)} ${P(-0.31 * w, 0.62 * hh)} ${P(-0.22 * w, 0.8 * hh)}`} stroke="#fff" strokeOpacity="0.9" strokeWidth={hiW} filter={u("blur1")} />
        </g>
        <path d={path} fill={u("hi")} stroke="none" />
        {look === "crown" ? (
          <path d={`M${P(-0.37 * w, 0.14 * hh)}Q${P(0, 0.2 * hh)} ${P(0.37 * w, 0.14 * hh)}`} fill="none" stroke="#8F9CA3" strokeOpacity="0.9" strokeWidth="1.4" />
        ) : null}
        {look === "veneer" ? (
          <path d={`M${P(-0.36 * w, 0.1 * hh)}C${P(-0.4 * w, 0.4 * hh)} ${P(-0.4 * w, 0.8 * hh)} ${P(-0.3 * w, 0.95 * hh)}Q${P(0, hh * 1.02)} ${P(0.3 * w, 0.95 * hh)}C${P(0.4 * w, 0.8 * hh)} ${P(0.4 * w, 0.4 * hh)} ${P(0.36 * w, 0.1 * hh)}`} fill="none" stroke="#AEB8BD" strokeOpacity="0.95" strokeWidth="1.3" />
        ) : null}
        {deco}
      </g>
    </g>
  );

  if (!cut || !spec.chip) return body;
  const cutId = `${cid}x`;
  const polyId = `${cid}p`;
  return (
    <g>
      <clipPath id={cutId}>
        <path d={`M-200 -260H200V60H-200Z${cut.cut}`} clipRule="evenodd" />
      </clipPath>
      <clipPath id={polyId}>
        <path d={cut.cut} />
      </clipPath>
      <g clipPath={`url(#${cutId})`}>{body}</g>
      {spec.chip.resin ? (
        <g>
          <g clipPath={`url(#${polyId})`}>
            <path d={path} fill="url(#neo-cbu-resin)" stroke="none" />
            <path d={path} fill={u("shade-r")} stroke="none" opacity="0.4" />
            <path d={path} fill={u("hi")} stroke="none" opacity="0.6" />
            <path d={path} fill="none" className={cb.eResin} />
          </g>
          <path d={cut.brk} transform="translate(0.7 1)" fill="none" stroke="#fff" strokeOpacity="0.9" strokeWidth="1.4" />
          <path d={cut.brk} className={cb.incr} />
          <g clipPath={`url(#${polyId})`}>
            <path d={path} className={d.halo} strokeWidth="5px" />
            <path d={path} className={d.redDash} />
          </g>
        </g>
      ) : (
        <g>
          <path d={cut.brk} transform="translate(0.6 1.2)" fill="none" stroke="#EFE0B8" strokeWidth="1.8" />
          <path d={cut.brk} className={d.eBreak} />
        </g>
      )}
    </g>
  );
}

/* ---------- gum ---------- */

function SdGumArt({ geo, uid, swollen = [] }: { geo: SdGumGeo; uid: string; swollen?: number[] }) {
  const cid = `neo-sd-${uid}-gum`;
  return (
    <g>
      <clipPath id={cid}>
        <path d={geo.fill} />
      </clipPath>
      <path d={geo.fill} fill={u("gum")} stroke="none" />
      <g clipPath={`url(#${cid})`}>
        {geo.bulges.map((b) => (
          <ellipse key={b.x} cx={f(b.x)} cy={f(b.y)} rx={f(b.rx)} ry={f(b.ry)} fill="#F7CDC8" fillOpacity="0.22" stroke="none" filter={u("blur3")} />
        ))}
        <path d={geo.margin} transform="translate(0 -3.6)" fill="none" stroke="#F7CDC8" strokeOpacity="0.85" strokeWidth="3.4" />
        <path d={geo.fill} fill={u("gum-fade-u")} stroke="none" />
      </g>
      <path d={geo.margin} fill="none" className={s.eGum} />
      {swollen.map((k) => {
        const [x, y] = geo.papillae[k];
        return (
          <g key={k}>
            <ellipse cx={f(x)} cy={f(y - 3)} rx="13" ry="14" fill="#C2474A" fillOpacity="0.45" stroke="none" filter={u("blur1")} />
            <path d={`M${f(x - 8.5)} ${f(y - 14)}C${f(x - 10)} ${f(y + 2)} ${f(x - 4)} ${f(y + 11)} ${f(x)} ${f(y + 11)}C${f(x + 4)} ${f(y + 11)} ${f(x + 10)} ${f(y + 2)} ${f(x + 8.5)} ${f(y - 14)}Z`} fill="#CC6767" stroke="#B23B3E" strokeOpacity="0.75" strokeWidth="1.2" />
            <ellipse cx={f(x - 2.6)} cy={f(y - 4)} rx="2" ry="4.2" fill="#F7CDC8" fillOpacity="0.75" stroke="none" />
          </g>
        );
      })}
    </g>
  );
}

/* ---------- a run of teeth with their gum ---------- */

export function SdSegment({
  range = [0, 9],
  specs = {},
  swollen,
  front = [],
}: {
  range?: [number, number];
  specs?: SdSpecs;
  /** Papillae (index between neighbours, left to right) drawn red and swollen. */
  swollen?: number[];
  /** Teeth drawn last, so they overlap their neighbours. */
  front?: number[];
}) {
  const uid = idOf(useId());
  const P = placeAll(range, specs);
  const geo = sdGum(P);
  const ordered = [...P.filter((p) => !front.includes(p.i)), ...P.filter((p) => front.includes(p.i))];
  return (
    <g>
      {ordered.map((p) => (
        <g key={p.i} transform={p.tf}>
          <SdToothArt p={p} uid={uid} />
        </g>
      ))}
      <SdGumArt geo={geo} uid={uid} swollen={swollen} />
    </g>
  );
}

/* ---------- annotation parts ---------- */

/** Small red marker dot with a pale ring. */
export function Marker({ x, y, r = 5 }: { x: number; y: number; r?: number }) {
  return <circle cx={f(x)} cy={f(y)} r={r} className={d.marker} />;
}

/** Dashed red line along the biting edges with a dot at each end (a bite line). */
export function BiteLine({ P, lift = 3, r = 4 }: { P: SdPlaced[]; lift?: number; r?: number }) {
  const pts: Pt[] = P.map((p) => toScene(p, 0, lift));
  const first = P[0];
  const last = P[P.length - 1];
  const a = toScene(first, -first.g.w * 0.45, lift);
  const b = toScene(last, last.g.w * 0.45, lift);
  const all: Pt[] = [a, ...pts, b];
  return (
    <g>
      <path d={curve(all)} className={d.halo} />
      <path d={curve(all)} className={d.redDash} />
      <circle cx={f(a[0])} cy={f(a[1])} r={r} className={s.dot} />
      <circle cx={f(b[0])} cy={f(b[1])} r={r} className={s.dot} />
    </g>
  );
}

/** A zone: rounded rectangle, light red wash, dashed red edge. */
export function Zone({ x, y, w, h, rx = 14 }: { x: number; y: number; w: number; h: number; rx?: number }) {
  return <rect x={f(x)} y={f(y)} width={f(w)} height={f(h)} rx={rx} className={d.zone} />;
}

/** A tooth-shaped shade chip on a steel rail, in the enamel palette. */
export const SHADES = ["#FDFAF3", "#F6EFDD", "#EDE0C2", "#E3D1A6", "#D8C18C"] as const;

export function ShadeStrip({
  x,
  y,
  chips = SHADES.slice(0, 4) as readonly string[],
  cw = 30,
  ch = 40,
  gap = 8,
  mark,
}: {
  x: number;
  y: number;
  chips?: readonly string[];
  cw?: number;
  ch?: number;
  gap?: number;
  /** Index of the chip outlined in red. */
  mark?: number;
}) {
  const pad = 9;
  const n = chips.length;
  const W = n * cw + (n - 1) * gap + pad * 2;
  const H = ch + 10;
  return (
    <g className={d.fine}>
      <rect x={x} y={y} width={W} height={H} rx="7" fill="#3d2f16" fillOpacity="0.16" stroke="none" transform="translate(2 3)" filter={u("blur3")} />
      <rect x={x} y={y} width={W} height={H} rx="7" fill={u("ti-v")} className={s.eTi} />
      {chips.map((c, i) => {
        const cx0 = x + pad + i * (cw + gap);
        const top = y + 8;
        const dd = `M${f(cx0)} ${f(y + H - 2)}L${f(cx0)} ${f(top + cw * 0.5)}Q${f(cx0)} ${f(top)} ${f(cx0 + cw / 2)} ${f(top)}Q${f(cx0 + cw)} ${f(top)} ${f(cx0 + cw)} ${f(top + cw * 0.5)}L${f(cx0 + cw)} ${f(y + H - 2)}Z`;
        return (
          <g key={i}>
            <path d={dd} fill={c} stroke="#B5A88E" strokeWidth="1.1" />
            <path d={`M${f(cx0 + cw * 0.17)} ${f(top + cw * 0.55)}C${f(cx0 + cw * 0.14)} ${f(top + cw * 0.8)} ${f(cx0 + cw * 0.16)} ${f(top + ch * 0.82)} ${f(cx0 + cw * 0.24)} ${f(top + ch * 0.92)}`} fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="2" />
            {mark === i ? <path d={dd} fill="none" className={s.redLine} strokeWidth="2px" /> : null}
          </g>
        );
      })}
    </g>
  );
}


/* ---------- front-tooth cross-section parts (local space = cbu-geometry INCISOR) ---------- */

/**
 * The front tooth cut front to back (kit FrontTooth). With `prepared`, a thin
 * layer of the front enamel is taken off and the new surface is edged.
 */
export function SectionIncisor({ prepared = false }: { prepared?: boolean }) {
  const uid = idOf(useId());
  const cut = `neo-sd-${uid}-prep`;
  return (
    <g>
      {prepared ? (
        <clipPath id={cut}>
          <path d={`M0 0H640V480H0Z${SLIVER_D}`} clipRule="evenodd" />
        </clipPath>
      ) : null}
      <g clipPath={prepared ? `url(#${cut})` : undefined}>
        <FrontTooth />
      </g>
      {prepared ? (
        <g>
          <path d={PREPARED_D} transform="translate(-1.1 0.4)" fill="none" stroke="#fff" strokeOpacity="0.9" strokeWidth="1.2" />
          <path d={PREPARED_D} fill="none" stroke="#C9B98F" strokeWidth="1.3" />
        </g>
      ) : null}
    </g>
  );
}

/** A thin porcelain shell shaped to the front surface, `gap` units off the tooth. */
export function VeneerShell({ gap = 0, t = 8 }: { gap?: number; t?: number }) {
  const sh = shellPath(gap, t);
  return (
    <g>
      <path d={sh.d} transform="translate(2 2.6)" fill="#3d2f16" fillOpacity="0.16" stroke="none" filter={u("blur1")} />
      <path d={sh.d} fill="url(#neo-sd-veneer-v)" className={d.ePorcelain} />
      <path d={poly(sh.outer.filter((_, i) => i % 3 === 0))} transform="translate(1.6 0.6)" fill="none" stroke="#fff" strokeOpacity="0.95" strokeWidth="1.3" />
      <path d={poly(sh.inner.filter((_, i) => i % 3 === 0))} transform="translate(-0.8 0)" fill="none" stroke="#B9AE98" strokeOpacity="0.8" strokeWidth="1" />
    </g>
  );
}

/** Dashed outline of a veneer that is not yet fixed: the space the removed enamel leaves. */
export function VeneerOutline() {
  return (
    <g>
      <path d={SLIVER_D} fill="url(#neo-sd-veneer-v)" fillOpacity="0.7" stroke="none" />
      <path d={SLIVER_D} className={d.inkDash} strokeDasharray="3.2 2.6" />
    </g>
  );
}

export { ORIGINAL_D };
export { s as kitStyles, d as sdStyles };
export type { ReactNode };