import { useId, type ReactNode } from "react";
import s from "./illustrations.module.css";
import { curve, f, rng, type Pt } from "./geometry";
import {
  archGeometry,
  biteY,
  blobPts,
  closedCurve,
  crownMap,
  gumGeometry,
  stubPath,
  stumpPath,
  toothPath,
  type ArchId,
  type GumFlags,
  type ToothGeo,
} from "./archGeometry";

/* ------------------------------------------------------------------
   Frontal arch parts for the full mouth rehabilitation scenes.
   ArchFront draws an upper and a lower arch (ten teeth each) in a smile
   view, in the shared 640 x 480 scene space, with the same materials,
   gradients and top-left light as the implant cross-sections. Scenes are
   compositions of per-tooth states, so they all share one geometry and one
   look. Stacking order: lower arch -> bite shadow -> upper arch -> splint,
   brackets, wire.
   ------------------------------------------------------------------ */

const u = (name: string) => `url(#neo-${name})`;

export type ToothState =
  | "natural"
  | "worn"
  | "missing"
  | "largeFilling"
  | "decayed"
  | "cracked"
  | "crown"
  | "implantCrown"
  | "pontic"
  | "prepared";

export type GumState = "healthy" | "recession" | "inflamed";

export type ToothSpec = {
  state?: ToothState;
  gum?: GumState;
  /** Zone tint, 1 = deepest red, 3 = lightest. */
  tint?: 1 | 2 | 3;
  /** Red outline and light red wash. */
  hilite?: boolean;
  /** Drawn in muted greys (everything else in a "focus" scene). */
  mute?: boolean;
  bracket?: boolean;
  dx?: number;
  dy?: number;
  /** Extra rotation in degrees. */
  rot?: number;
  /** Fraction of crown height lost, for "worn". */
  wear?: number;
};

/** Specs by tooth index, 0 (left second premolar) to 9 (right). */
export type ArchSpec = Record<number, ToothSpec>;

const TINT = { 1: 0.44, 2: 0.29, 3: 0.15 } as const;
const isRidge = (st?: ToothState) => st === "missing" || st === "pontic";

const toothTransform = (g: ToothGeo, sp: ToothSpec) =>
  `translate(${f(g.cx + (sp.dx ?? 0))} ${f(g.yInc + (sp.dy ?? 0))}) rotate(${f(g.rot + (sp.rot ?? 0))})`;

/** Scene-space point from crown coordinates of tooth `g`. */
export function toothPoint(g: ToothGeo, sp: ToothSpec, lx: number, cy: number): Pt {
  const [mx, my] = crownMap(g.arch, g.h)(lx, cy);
  const a = ((g.rot + (sp.rot ?? 0)) * Math.PI) / 180;
  return [
    g.cx + (sp.dx ?? 0) + mx * Math.cos(a) - my * Math.sin(a),
    g.yInc + (sp.dy ?? 0) + mx * Math.sin(a) + my * Math.cos(a),
  ];
}

/* ---------- one tooth ---------- */

function ToothArt({ g, sp, uid }: { g: ToothGeo; sp: ToothSpec; uid: string }) {
  const state = sp.state ?? "natural";
  const { w, h, arch, kind } = g;
  const w2 = w / 2;
  const front = kind === "central" || kind === "lateral";
  const worn = state === "worn";
  const prepared = state === "prepared";
  const porcelain = state === "crown" || state === "implantCrown" || state === "pontic";
  const hh = worn ? h * (1 - (sp.wear ?? (kind === "central" ? 0.27 : 0.24))) : h;
  const d = prepared ? stumpPath(g) : toothPath(g, { h: hh, flat: worn });
  const M = crownMap(arch, h);
  const P = (x: number, y: number) => {
    const [a, b] = M(x, y);
    return `${f(a)} ${f(b)}`;
  };
  const cid = `${uid}k${arch[0]}${g.i}`;
  const r = rng(40 + g.i * 3 + (arch === "lower" ? 17 : 0));
  const tone = 0.05 + r() * 0.12;
  const dist = Math.abs(g.i - 4.5) - 0.5;
  const up = arch === "upper";
  const hiW = Math.max(2.6, w * 0.085);

  /* decorations in crown coordinates */
  const ptsMap = (pts: Pt[]) => pts.map(([x, y]) => M(x, y));
  let deco: ReactNode = null;
  if (state === "largeFilling") {
    const blob = blobPts(0.05 * w, 0.52 * hh, (front ? 0.3 : 0.31) * w, (front ? 0.17 : 0.2) * hh, 11 + g.i);
    const big = blobPts(0.05 * w, 0.52 * hh, (front ? 0.3 : 0.31) * w * 1.25, (front ? 0.17 : 0.2) * hh * 1.4, 11 + g.i);
    const patch = closedCurve(ptsMap(blob));
    deco = (
      <g>
        <path d={closedCurve(ptsMap(big))} fill="#A9834E" fillOpacity="0.2" stroke="none" filter={u("blur1")} />
        <path d={patch} fill="#CFCABB" stroke="none" />
        <path d={patch} fill="none" stroke="#8A6B40" strokeOpacity="0.62" strokeWidth="1.2" strokeDasharray="17 6 5 6" />
      </g>
    );
  } else if (state === "decayed") {
    const core = closedCurve(ptsMap(blobPts(-0.1 * w, 0.24 * hh, 0.15 * w, 0.085 * hh, 5 + g.i)));
    const halo = closedCurve(ptsMap(blobPts(-0.1 * w, 0.26 * hh, 0.26 * w, 0.15 * hh, 6 + g.i)));
    deco = (
      <g>
        <path d={halo} fill="#A47A3E" fillOpacity="0.38" stroke="none" filter={u("blur1")} />
        <path d={core} fill="#5A3D20" fillOpacity="0.95" stroke="#3E2A15" strokeOpacity="0.6" strokeWidth="1" />
        <path d={closedCurve(ptsMap(blobPts(-0.12 * w, 0.23 * hh, 0.07 * w, 0.04 * hh, 9 + g.i)))} fill="#2F2010" stroke="none" />
      </g>
    );
  } else if (state === "cracked") {
    const main = `M${P(0.13 * w, hh)}C${P(0.05 * w, 0.8 * hh)} ${P(0.17 * w, 0.62 * hh)} ${P(0.07 * w, 0.36 * hh)}`;
    const branch = `M${P(0.11 * w, 0.58 * hh)}C${P(0.02 * w, 0.52 * hh)} ${P(-0.05 * w, 0.54 * hh)} ${P(-0.12 * w, 0.44 * hh)}`;
    deco = (
      <g fill="none">
        <path d={main} stroke="#fff" strokeOpacity="0.85" strokeWidth="2.4" transform="translate(1.2 0)" />
        <path d={main} stroke="#6B5842" strokeOpacity="0.9" strokeWidth="1.3" />
        <path d={branch} stroke="#6B5842" strokeOpacity="0.75" strokeWidth="1" />
      </g>
    );
  } else if (worn) {
    const t = 0.17 * hh;
    const band = `M${P(-w2 + 3.6, hh)}L${P(-w2 + 3.6, hh - t * 0.6)}Q${P(0, hh - t * 1.2)} ${P(w2 - 3.6, hh - t * 0.6)}L${P(w2 - 3.6, hh)}Z`;
    deco = (
      <g>
        <path d={band} fill={u("arch-wear")} stroke="#C7AE7C" strokeWidth="0.9" />
        <ellipse cx={f(M(0, hh - t * 0.45)[0])} cy={f(M(0, hh - t * 0.45)[1])} rx={f(w * 0.26)} ry="1.6" fill="#9C7A47" fillOpacity="0.55" stroke="none" />
      </g>
    );
  }

  const glossy = !prepared;
  return (
    <g>
      {state !== "pontic" && !prepared ? <path d={stubPath(g)} fill={u("root")} className={s.eDentin} /> : null}
      {prepared ? <path d={stubPath(g)} fill={u("root")} className={s.eDentin} /> : null}
      <path d={d} fill={prepared ? u("arch-stump") : porcelain ? u("arch-ceramic") : u("enamel")} className={prepared ? s.eDentin : s.eEnamel} stroke={porcelain ? "#AEB8BD" : undefined} />
      <clipPath id={cid}>
        <path d={d} />
      </clipPath>
      <g clipPath={`url(#${cid})`}>
        {glossy && !porcelain ? <path d={d} fill="#E4D0A0" fillOpacity={tone} stroke="none" /> : null}
        {glossy && !porcelain ? <path d={d} fill={u(up ? "cervical-u" : "cervical-l")} stroke="none" /> : null}
        {glossy ? <path d={d} fill={u(up ? "incisal-u" : "incisal-l")} stroke="none" /> : null}
        <path d={d} fill={u("shade-r")} stroke="none" />
        {dist > 0 ? <path d={d} fill="#7C6A48" fillOpacity={0.032 * dist} stroke="none" /> : null}
        {glossy ? (
          <g fill="none">
            <path d={`M${P(-0.14 * w, 0.12 * hh)}C${P(-0.16 * w, 0.4 * hh)} ${P(-0.12 * w, 0.62 * hh)} ${P(-0.1 * w, 0.84 * hh)}`} stroke="#CFC4B0" strokeOpacity="0.4" strokeWidth="1" />
            <path d={`M${P(0.16 * w, 0.14 * hh)}C${P(0.18 * w, 0.4 * hh)} ${P(0.14 * w, 0.62 * hh)} ${P(0.12 * w, 0.84 * hh)}`} stroke="#CFC4B0" strokeOpacity="0.3" strokeWidth="1" />
            <path d={`M${P(-0.3 * w, 0.2 * hh)}C${P(-0.34 * w, 0.42 * hh)} ${P(-0.31 * w, 0.62 * hh)} ${P(-0.22 * w, 0.8 * hh)}`} stroke="#fff" strokeOpacity="0.9" strokeWidth={hiW} filter={u("blur1")} />
          </g>
        ) : (
          <path d={`M${P(-0.2 * w, 0.2 * hh)}C${P(-0.24 * w, 0.4 * hh)} ${P(-0.22 * w, 0.6 * hh)} ${P(-0.16 * w, 0.8 * hh)}`} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth={hiW} filter={u("blur1")} />
        )}
        {glossy ? <path d={d} fill={u("hi")} stroke="none" /> : null}
        {deco}
        {sp.tint ? <path d={d} fill="#D71920" fillOpacity={TINT[sp.tint]} stroke="none" /> : null}
      </g>
      {state === "implantCrown" ? (
        <g>
          <path
            d={`M${P(-0.28 * w, 0)}L${P(0.28 * w, 0)}L${P(0.29 * w, 5.5)}L${P(-0.29 * w, 5.5)}Z`}
            fill={u("ti-v")}
            fillOpacity="0.8"
            className={s.eTi}
          />
          <path d={`M${P(-0.25 * w, 0.8)}L${P(0.2 * w, 0.8)}`} fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="1" />
        </g>
      ) : null}
      {sp.hilite ? <path d={d} fill="#D71920" fillOpacity="0.14" stroke="#D71920" strokeWidth="2.4" /> : null}
    </g>
  );
}

/* ---------- gum ---------- */

function flagsOf(spec: ArchSpec): GumFlags[] {
  return Array.from({ length: 10 }, (_, i) => {
    const sp = spec[i] ?? {};
    return {
      ridge: isRidge(sp.state),
      rec: sp.gum === "recession" ? 12 + (i % 2) * 3 : 0,
      infl: sp.gum === "inflamed",
    };
  });
}

function GumArt({ arch, spec, uid, mute }: { arch: ArchId; spec: ArchSpec; uid: string; mute: boolean }) {
  const dir = arch === "upper" ? 1 : -1;
  const gum = gumGeometry(arch, flagsOf(spec));
  const cid = `${uid}g${arch[0]}`;
  return (
    <g filter={mute ? u("mute") : undefined}>
      <clipPath id={cid}>
        <path d={gum.fill} />
      </clipPath>
      <path d={gum.fill} fill={u("gum")} stroke="none" />
      <g clipPath={`url(#${cid})`}>
        {gum.bulges.map((b) => (
          <ellipse key={b.x} cx={f(b.x)} cy={f(b.y)} rx={f(b.rx)} ry={f(b.ry)} fill="#F7CDC8" fillOpacity="0.22" stroke="none" filter={u("blur3")} />
        ))}
        <path d={gum.margin} transform={`translate(0 ${f(-dir * 3.6)})`} fill="none" stroke="#F7CDC8" strokeOpacity="0.85" strokeWidth="3.4" />
        {gum.ridges.map((rd, k) => (
          <g key={k}>
            <path d={rd} transform={`translate(0 ${f(-dir * 7)})`} fill="none" stroke="#F7CDC8" strokeOpacity="0.55" strokeWidth="9" filter={u("blur3")} />
            <path d={rd} transform={`translate(0 ${f(-dir * 11)})`} fill="none" stroke="#B5605F" strokeOpacity="0.18" strokeWidth="6" filter={u("blur3")} />
          </g>
        ))}
        {gum.inflamed.map((p, k) => (
          <g key={k} fill="none">
            <path d={p} transform={`translate(0 ${f(-dir * 4)})`} stroke="#C2474A" strokeOpacity="0.5" strokeWidth="9" filter={u("blur1")} />
            <path d={p} transform={`translate(0 ${f(-dir * 2)})`} stroke="#B23B3E" strokeOpacity="0.55" strokeWidth="3.2" />
          </g>
        ))}
        <path d={gum.fill} fill={u(arch === "upper" ? "gum-fade-u" : "gum-fade-l")} stroke="none" />
      </g>
      <path d={gum.margin} fill="none" className={s.eGum} />
    </g>
  );
}

/* ---------- arch ---------- */

function ArchHalf({
  arch,
  spec,
  uid,
  focus,
}: {
  arch: ArchId;
  spec: ArchSpec;
  uid: string;
  focus: boolean;
}) {
  const T = archGeometry(arch);
  return (
    <g>
      {T.map((g) => {
        const sp = spec[g.i] ?? {};
        if (sp.state === "missing") return null;
        const mute = focus && !sp.hilite;
        return (
          <g key={g.i} transform={toothTransform(g, sp)} filter={mute ? u("mute") : undefined}>
            <ToothArt g={g} sp={sp} uid={uid} />
          </g>
        );
      })}
      <GumArt arch={arch} spec={spec} uid={uid} mute={focus} />
    </g>
  );
}

/** Soft shadow that the upper edges cast on the lower teeth. */
function BiteShadow({ lower, upper, uid }: { lower: ArchSpec; upper: ArchSpec; uid: string }) {
  const L = archGeometry("lower");
  const U = archGeometry("upper");
  const cid = `${uid}bs`;
  const pts: Pt[] = U.filter((g) => upper[g.i]?.state !== "missing").map((g) => [g.cx, g.yInc + 5]);
  return (
    <g>
      <clipPath id={cid}>
        {L.map((g) => {
          const sp = lower[g.i] ?? {};
          return sp.state === "missing" ? null : (
            <path key={g.i} d={toothPath(g)} transform={toothTransform(g, sp)} />
          );
        })}
      </clipPath>
      <g clipPath={`url(#${cid})`}>
        <path d={curve(pts)} fill="none" stroke="#5A4829" strokeOpacity="0.17" strokeWidth="9" filter={u("blur3")} />
      </g>
    </g>
  );
}

function Splint({ arch, spec }: { arch: ArchId; spec: ArchSpec }) {
  const T = archGeometry(arch).filter((g) => spec[g.i]?.state !== "missing");
  const dir = arch === "upper" ? 1 : -1;
  const edge: Pt[] = T.map((g) => [g.cx, g.yInc + dir * 4.5]);
  const neck: Pt[] = T.map((g) => [g.cx, g.yInc - dir * 0.6 * g.h]);
  const first = T[0];
  const last = T[T.length - 1];
  const e0: Pt = [first.cx - first.w / 2 - 3, edge[0][1] - dir * 4];
  const e1: Pt = [last.cx + last.w / 2 + 3, edge[edge.length - 1][1] - dir * 4];
  const n0: Pt = [first.cx - first.w / 2 - 3, neck[0][1]];
  const n1: Pt = [last.cx + last.w / 2 + 3, neck[neck.length - 1][1]];
  const bottom = curve([e0, ...edge, e1]);
  const topRev = curve([n1, ...[...neck].reverse(), n0], false);
  const d = `${bottom}L${f(n1[0])} ${f(n1[1])}${topRev.replace(/^L[^LC]+/, "")}Z`;
  return (
    <g>
      <path d={d} fill={u("arch-splint")} stroke="#6F93A8" strokeOpacity="0.9" strokeWidth="1.4" />
      <path d={bottom} transform={`translate(0 ${f(-dir * 2.2)})`} fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="1.4" />
      <path d={curve([n0, ...neck, n1])} transform={`translate(0 ${f(dir * 3)})`} fill="none" stroke="#5E8197" strokeOpacity="0.4" strokeWidth="1" />
    </g>
  );
}

function Hardware({ arch, spec }: { arch: ArchId; spec: ArchSpec }) {
  const T = archGeometry(arch);
  const withBracket = T.filter((g) => spec[g.i]?.bracket && spec[g.i]?.state !== "missing");
  if (!withBracket.length) return null;
  const dir = arch === "upper" ? 1 : -1;
  const centres: Pt[] = withBracket.map((g) => toothPoint(g, spec[g.i] ?? {}, 0, 0.5 * g.h));
  const first = centres[0];
  const last = centres[centres.length - 1];
  const wire = curve([[first[0] - 12, first[1] + 1], ...centres, [last[0] + 12, last[1] + 1]]);
  void dir;
  return (
    <g>
      <path d={wire} fill="none" stroke="#2F3A40" strokeOpacity="0.25" strokeWidth="3.6" transform="translate(0 1.4)" />
      <path d={wire} fill="none" stroke="#4A565D" strokeWidth="2.4" />
      <path d={wire} fill="none" stroke="#fff" strokeOpacity="0.75" strokeWidth="0.9" transform="translate(0 -0.8)" />
      {withBracket.map((g) => {
        const sp = spec[g.i] ?? {};
        const bw = Math.max(6, 0.2 * g.w);
        const [lx, ly] = crownMap(g.arch, g.h)(0, 0.5 * g.h);
        return (
          <g key={g.i} transform={toothTransform(g, sp)}>
            <rect x={f(lx - bw)} y={f(ly - bw * 0.8)} width={f(bw * 2)} height={f(bw * 1.6)} rx="2.4" fill={u("ti")} className={s.eTi} />
            <rect x={f(lx - bw + 1.4)} y={f(ly - bw * 0.8 + 1.2)} width={f(bw * 2 - 2.8)} height="2" rx="1" fill="#fff" fillOpacity="0.75" stroke="none" />
            <path d={`M${f(lx - bw + 1)} ${f(ly + 0.6)}H${f(lx + bw - 1)}`} fill="none" stroke="#2F3A40" strokeOpacity="0.7" strokeWidth="1.8" />
          </g>
        );
      })}
    </g>
  );
}

export function ArchFront({
  upper = {},
  lower = {},
  show = "both",
  splint,
  focus = false,
  shadow = true,
}: {
  upper?: ArchSpec;
  lower?: ArchSpec;
  show?: "both" | "upper" | "lower";
  splint?: ArchId;
  /** Mute everything except teeth with `hilite`. */
  focus?: boolean;
  shadow?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const showL = show !== "upper";
  const showU = show !== "lower";
  return (
    <g>
      {shadow && showL ? (
        <ellipse cx="320" cy="364" rx="196" ry="8" fill="#3d2f16" fillOpacity="0.16" stroke="none" filter={u("blur6")} />
      ) : null}
      {showL ? <ArchHalf arch="lower" spec={lower} uid={uid} focus={focus} /> : null}
      {showL && showU ? <BiteShadow lower={lower} upper={upper} uid={uid} /> : null}
      {showU ? <ArchHalf arch="upper" spec={upper} uid={uid} focus={focus} /> : null}
      {splint === "upper" && showU ? <Splint arch="upper" spec={upper} /> : null}
      {splint === "lower" && showL ? <Splint arch="lower" spec={lower} /> : null}
      {showU ? <Hardware arch="upper" spec={upper} /> : null}
      {showL ? <Hardware arch="lower" spec={lower} /> : null}
    </g>
  );
}

const KIND_INDEX = { central: 5, lateral: 6, canine: 7, pm1: 8, pm2: 9 } as const;

/**
 * A single tooth drawn on its own. The biting edge sits at (x, y); the neck
 * is below it for the lower arch (crown up, the usual textbook pose) and above
 * it for the upper arch. `cut` slices the crown at a fraction of its height
 * measured from the neck.
 */
export function ToothDisplay({
  kind,
  arch = "lower",
  state = "natural",
  x,
  y,
  scale = 1,
  spec,
}: {
  kind: keyof typeof KIND_INDEX;
  arch?: ArchId;
  state?: ToothState;
  x: number;
  y: number;
  scale?: number;
  spec?: ToothSpec;
}) {
  const uid = useId().replace(/:/g, "");
  const base = archGeometry(arch)[KIND_INDEX[kind]];
  const g: ToothGeo = { ...base, cx: 0, yInc: 0, rot: 0 };
  return (
    <g transform={`translate(${f(x)} ${f(y)}) scale(${scale})`}>
      <ToothArt g={g} sp={{ ...spec, state }} uid={uid} />
    </g>
  );
}
export { toothTransform };
/** Tooth geometry helpers for annotation placement. */
export { archGeometry, biteY };
