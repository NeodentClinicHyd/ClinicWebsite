import { useId, type ReactNode } from "react";
import s from "./illustrations.module.css";
import { G, crestY, curve, f, rng, type Pt } from "./geometry";

/* ------------------------------------------------------------------
   Reusable anatomical parts. Everything is drawn in the shared 640 x 480
   scene space (see geometry.ts) with the light source at the top-left:
   highlights sit left / top, shading falls right / bottom.
   Stacking order inside a scene is always
     Bone -> roots and crowns -> Gum -> implant parts -> annotations.
   ------------------------------------------------------------------ */

export const cn = (...n: (string | false | undefined | null)[]) =>
  n.filter(Boolean).join(" ");

/** `url(#neo-x)` helper for gradient / pattern / filter references. */
const u = (name: string) => `url(#neo-${name})`;

/* ---------- Scene wrapper ---------- */

export function Scene({
  viewBox,
  title,
  desc,
  className,
  children,
  backdrop = false,
}: {
  viewBox: string;
  title: string;
  desc: string;
  className?: string;
  children: ReactNode;
  backdrop?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const [vx, vy, vw, vh] = viewBox.split(" ").map(Number);
  return (
    <svg
      className={cn(s.illus, className)}
      viewBox={viewBox}
      role="img"
      aria-labelledby={`${id}t ${id}d`}
    >
      <title id={`${id}t`}>{title}</title>
      <desc id={`${id}d`}>{desc}</desc>
      {backdrop ? (
        <rect x={vx} y={vy} width={vw} height={vh} fill={u("canvas")} stroke="none" />
      ) : null}
      {children}
    </svg>
  );
}

/** Group that carries the one-time entrance animation. */
export function Annot({ children }: { children: ReactNode }) {
  return <g className={s.annot}>{children}</g>;
}

/* ---------- Tooth geometry ---------- */

const H = G.crownW / 2; // 48
const N = G.neck; // 31

/** Premolar-like crown outline, 96 wide, cusps at y=70, neck at y=202. */
export function crownD(cx: number, v = 0, bottom = 202): string {
  const a = 70 + v * 3; // left cusp tip
  const b = 70 - v * 3; // right cusp tip
  const fis = 86 + v;
  let d = `M${f(cx - N)} ${bottom}`;
  if (bottom > 202) d += `L${f(cx - N)} 202`;
  d += `C${f(cx - N - 4)} 178 ${f(cx - H)} 158 ${f(cx - H)} 126`;
  d += `C${f(cx - H)} 100 ${f(cx - 38)} ${a + 4} ${f(cx - 22)} ${a}`;
  d += `C${f(cx - 12)} ${a - 2} ${f(cx - 6)} ${fis - 4} ${f(cx)} ${fis}`;
  d += `C${f(cx + 6)} ${fis - 4} ${f(cx + 12)} ${b - 2} ${f(cx + 22)} ${b}`;
  d += `C${f(cx + 38)} ${b + 4} ${f(cx + H)} 100 ${f(cx + H)} 126`;
  d += `C${f(cx + H)} 158 ${f(cx + N + 4)} 178 ${f(cx + N)} 202`;
  if (bottom > 202) d += `L${f(cx + N)} ${bottom}`;
  return d + "Z";
}

/** Single tapering root, 130 long from the gumline, with a slight bend. */
export function rootD(cx: number, v = 0): string {
  const bend = v * 4;
  return (
    `M${f(cx - N + 1)} 196` +
    `C${f(cx - N + 2)} 242 ${f(cx - 19 + bend)} 292 ${f(cx - 7 + bend)} 322` +
    `Q${f(cx + 1 + bend)} 336 ${f(cx + 9 + bend)} 322` +
    `C${f(cx + 21 + bend)} 292 ${f(cx + N - 2)} 242 ${f(cx + N - 1)} 196Z`
  );
}

/** Crown with enamel / porcelain shading. */
function CrownBody({
  cx,
  v = 0,
  fill = "enamel",
  bottom = 202,
}: {
  cx: number;
  v?: number;
  fill?: "enamel" | "porcelain";
  bottom?: number;
}) {
  const d = crownD(cx, v, bottom);
  return (
    <g>
      <path d={d} fill={u(fill)} className={s.eEnamel} />
      <path d={d} fill={u("shade-r")} className={s.noStroke} />
      <path d={d} fill={u("shade-b")} className={s.noStroke} />
      <path d={d} fill={u("hi")} className={s.noStroke} />
      {/* fissure and enamel highlight */}
      <path
        d={`M${f(cx)} ${86 + v}C${f(cx - 2)} 94 ${f(cx - 3)} 102 ${f(cx - 2)} 110`}
        fill="none"
        className={s.eEnamel}
        strokeOpacity="0.55"
      />
      <path
        d={`M${f(cx - 38)} 116C${f(cx - 40)} 132 ${f(cx - 37)} 150 ${f(cx - 30)} 166`}
        fill="none"
        stroke="#fff"
        strokeWidth="4.5"
        strokeOpacity="0.9"
        strokeLinecap="round"
        filter={u("blur1")}
      />
    </g>
  );
}

/** Root with dentin shading, lamina line and ligament space. */
function RootBody({ cx, v = 0 }: { cx: number; v?: number }) {
  const d = rootD(cx, v);
  return (
    <g>
      <path d={d} fill="none" stroke="#C9A97A" strokeOpacity="0.28" strokeWidth="6" />
      <path d={d} fill={u("root")} className={s.eDentin} />
      <path d={d} fill={u("shade-r")} className={s.noStroke} />
      <path d={d} className={s.lig} />
      <path
        d={`M${f(cx - 12)} 236C${f(cx - 13)} 262 ${f(cx - 9)} 290 ${f(cx - 4)} 312`}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="3"
        filter={u("blur1")}
      />
    </g>
  );
}

/** Healthy neighbouring tooth: root in its socket, crown above. */
export function NaturalTooth({ cx, v = 0 }: { cx: number; v?: number }) {
  return (
    <g>
      <RootBody cx={cx} v={v} />
      <CrownBody cx={cx} v={v} />
    </g>
  );
}

/* ---------- Bone ---------- */

type BoneProps = {
  x0: number;
  x1: number;
  dip?: number;
  floor?: number;
  /** Extra overall lowering of the crest (resorbed ridge). */
  drop?: number;
};

function crestPts(x0: number, x1: number, dip: number, drop: number): Pt[] {
  const pts: Pt[] = [];
  for (let x = x0; x < x1; x += 16) pts.push([x, crestY(x, dip) + drop]);
  pts.push([x1, crestY(x1, dip) + drop]);
  return pts;
}

export function Bone({ x0, x1, dip = 0, floor = G.floor, drop = 0 }: BoneProps) {
  const id = useId().replace(/:/g, "");
  const top = crestPts(x0, x1, dip, drop);
  const r = 16;
  const outer =
    curve(top) +
    `L${x1} ${floor - r}Q${x1} ${floor} ${x1 - r} ${floor}L${x0 + r} ${floor}Q${x0} ${floor} ${x0} ${floor - r}Z`;
  const rng2 = rng(5);
  const thick = (x: number) => 13 + 2.4 * Math.sin(x * 0.07) + rng2() * 0.6;
  const under: Pt[] = top.map(([x, y]) => [x, y + thick(x)]);
  const band = curve(top) + curve([...under].reverse(), false) + "Z";
  return (
    <g>
      <defs>
        <path id={`${id}o`} d={outer} />
      </defs>
      <use href={`#${id}o`} fill="#EFE2C6" stroke="none" />
      <use href={`#${id}o`} fill={u("trab")} stroke="none" />
      <use href={`#${id}o`} fill={u("trab2")} stroke="none" />
      <use href={`#${id}o`} fill={u("bone-depth")} stroke="none" />
      <clipPath id={`${id}c`}>
        <use href={`#${id}o`} />
      </clipPath>
      <g clipPath={`url(#${id}c)`}>
        <rect x={x0} y={floor - 8} width={x1 - x0} height={10} fill={u("cortical")} stroke="none" />
        <path d={`M${x0} ${floor - 8}H${x1}`} fill="none" className={s.eBone} strokeOpacity="0.5" />
      </g>
      <path d={band} fill={u("cortical")} stroke="none" />
      <path d={curve(under)} fill="none" className={s.eBone} strokeOpacity="0.55" />
      <path d={curve(top)} fill="none" className={s.eBone} />
      <use href={`#${id}o`} fill="none" className={s.eBone} />
    </g>
  );
}

/* ---------- Gum ---------- */

export type SiteState = "tooth" | "dome" | "open" | "cover" | "flat";

type GumProps = {
  x0: number;
  x1: number;
  /** 1 = three tooth slots (narrow block), 2 = five (wide block). */
  half?: 1 | 2;
  site?: SiteState;
  dip?: number;
  drop?: number;
  /** Tooth slots that are edentulous in addition to the centre site. */
  empty?: number[];
};

function gumPieces(p: GumProps): Pt[][] {
  const half = p.half ?? 1;
  const site = p.site ?? "tooth";
  const empty = new Set(p.empty ?? []);
  const type = (i: number): "tooth" | "dome" =>
    site === "flat" || empty.has(i) || (i === 0 && site !== "tooth") ? "dome" : "tooth";
  const pieces: Pt[][] = [];
  let pts: Pt[] = [[p.x0, site === "flat" ? 223 : 194]];
  for (let i = -half; i <= half; i++) {
    const c = G.cx + i * G.pitch;
    const t = type(i);
    if (site === "flat") {
      pts.push([c - 40, 227], [c, 228.5], [c + 40, 227]);
      continue;
    }
    if (i === 0 && site === "open") {
      /* gum opened gently: both sides end in a lifted, rounded flap */
      pts.push([c - 58, 180]);
      pieces.push(pts);
      pts = [[c + 58, 180]];
      continue;
    }
    const left = i === -half ? 178 : type(i - 1) === "tooth" && t === "tooth" ? G.papilla : 188;
    if (i === -half) pts.push([c - 49, left]);
    else if (!(i - 1 === 0 && site === "open"))
      pts.push([c - 49, left]);
    if (t === "tooth") {
      pts.push([c - 24, 200.5], [c, 205], [c + 24, 200.5]);
    } else {
      const top = site === "cover" ? 209 : 212 + (p.dip ? p.dip * 0.12 : 0);
      pts.push([c - 30, 204], [c - 12, top - 2], [c, top], [c + 12, top - 2], [c + 30, 204]);
    }
    if (i === half) pts.push([c + 49, 178]);
  }
  pts.push([p.x1, site === "flat" ? 223 : 194]);
  pieces.push(pts);
  return pieces;
}

export function Gum(props: GumProps) {
  const { dip = 0, drop = 0, site = "tooth" } = props;
  const pieces = gumPieces(props);
  return (
    <g>
      {pieces.map((pts, idx) => {
        const xa = pts[0][0];
        const xb = pts[pts.length - 1][0];
        const bottom: Pt[] = [];
        for (let x = xb; x >= xa; x -= 12) bottom.push([x, crestY(x, dip) + drop + 3]);
        bottom.push([xa, crestY(xa, dip) + drop + 3]);
        const open = site === "open";
        const first = idx === 0;
        const by = bottom[0][1];
        const ay = bottom[bottom.length - 1][1];
        const ye = pts[pts.length - 1][1];
        const d =
          curve(pts) +
          (open && first
            ? `C${f(xb + 7)} ${f(ye + 8)} ${f(xb + 11)} ${f(by - 16)} ${f(xb - 1)} ${f(by)}`
            : `L${f(xb)} ${f(by)}`) +
          curve(bottom, false) +
          (open && !first
            ? `C${f(xa - 11)} ${f(ay - 16)} ${f(xa - 7)} ${f(pts[0][1] + 8)} ${f(xa)} ${f(pts[0][1])}`
            : "") +
          "Z";
        const top = curve(pts);
        return (
          <g key={idx}>
            <path d={d} fill={u("gum")} className={s.eGum} strokeOpacity="0.7" />
            <path
              d={top}
              transform="translate(0 3.4)"
              fill="none"
              stroke="#F7CDC8"
              strokeOpacity="0.85"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path d={top} fill="none" className={s.eGum} />
          </g>
        );
      })}
    </g>
  );
}

/* ---------- Titanium implant ---------- */

const IL = G.implantL; // 150
const HW0 = G.implantW / 2; // 23
const HWA = 15;
const hw = (y: number) => HW0 + (HWA - HW0) * Math.pow(Math.min(y, IL) / IL, 0.85);
const PITCH = 11.4;
const DEPTH = 5.2;
const THREADS = 10;
const yr = (k: number) => 18 + k * PITCH;
const yl = (k: number) => yr(k) + PITCH / 2;

function buildBody() {
  const right: Pt[] = [[26, 0], [26, 10], [hw(11) - DEPTH, 11]];
  const left: Pt[] = [[-26, 0], [-26, 10], [-(hw(11) - DEPTH), 11]];
  for (let k = 0; k < THREADS; k++) {
    for (const [arr, sign, yc] of [[right, 1, yr(k)], [left, -1, yl(k)]] as const) {
      arr.push(
        [sign * (hw(yc - 4.2) - DEPTH), yc - 4.2],
        [sign * hw(yc - 1.7), yc - 1.7],
        [sign * hw(yc + 1.7), yc + 1.7],
        [sign * (hw(yc + 4.2) - DEPTH), yc + 4.2],
      );
    }
  }
  /* Apex: continue at the thread-root radius, then taper to a rounded tip
     that is narrower than the last thread (no bulb). */
  const yEnd = 132;
  const r = hw(yEnd) - DEPTH + 0.6;
  right.push([r, yEnd]);
  left.push([-r, yEnd]);
  let d = `M${f(left[0][0])} ${left[0][1]}`;
  for (const p of right) d += `L${f(p[0])} ${f(p[1])}`;
  d += `C${f(r)} ${yEnd + 9} ${f(r * 0.5)} ${IL} 0 ${IL}C${f(-r * 0.5)} ${IL} ${f(-r)} ${yEnd + 9} ${f(-r)} ${yEnd}`;
  for (const p of [...left].reverse().slice(0, -1)) d += `L${f(p[0])} ${f(p[1])}`;
  d += "Z";
  return { d, right, left };
}

const BODY = buildBody();

function threadLines() {
  let hi = "";
  let sh = "";
  let groove = "";
  for (let k = 0; k < THREADS; k++) {
    const xr = hw(yr(k)) + 1;
    const xl = -(hw(yl(k)) + 1);
    hi += `M${f(xl)} ${f(yl(k) - 2.1)}L${f(xr)} ${f(yr(k) - 2.1)}`;
    sh += `M${f(xl)} ${f(yl(k) + 2.7)}L${f(xr)} ${f(yr(k) + 2.7)}`;
    if (k < THREADS - 1) {
      const nxr = hw(yr(k + 1)) + 1;
      const nxl = -(hw(yl(k + 1)) + 1);
      groove += `M${f(xl)} ${f(yl(k) + 3.2)}L${f(xr)} ${f(yr(k) + 3.2)}L${f(nxr)} ${f(yr(k + 1) - 2.6)}L${f(nxl)} ${f(yl(k + 1) - 2.6)}Z`;
    }
  }
  return { hi, sh, groove };
}

const TL = threadLines();

/** Outline points of the implant surface, for contact highlights. */
export function implantEdge(side: "left" | "right"): Pt[] {
  return (side === "right" ? BODY.right : BODY.left).slice(2);
}

/** Implant artwork at the origin (platform centre at 0,0). */
function ImplantArt({ id, shadow }: { id: string; shadow: boolean }) {
  return (
    <g>
      <defs>
        <path id={`${id}b`} d={BODY.d} />
        <clipPath id={`${id}c`}>
          <use href={`#${id}b`} />
        </clipPath>
      </defs>
      {shadow ? (
        <use
          href={`#${id}b`}
          transform="translate(3 3.5)"
          fill="#3d2f16"
          fillOpacity="0.15"
          stroke="none"
          filter={u("blur3")}
        />
      ) : null}
      <use href={`#${id}b`} fill={u("ti")} className={s.eTi} />
      <g clipPath={`url(#${id}c)`}>
        <path d={TL.groove} fill="#1E2A30" fillOpacity="0.34" stroke="none" />
        <path d={TL.sh} className={s.thSh} />
        <path d={TL.hi} className={s.thHi} />
        <path
          d={`M${f(-9)} 14L${f(-7)} ${IL - 22}`}
          fill="none"
          stroke="#fff"
          strokeOpacity="0.45"
          strokeWidth="3"
          filter={u("blur1")}
        />
      </g>
      {/* collar with a slight platform */}
      <rect x="-26" y="0" width="52" height="11" rx="3" fill={u("ti")} className={s.eTi} />
      <path d="M-23.5 2H20" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.2" />
      <path d="M-24 9.2H24" fill="none" stroke="#2f3a40" strokeOpacity="0.4" strokeWidth="1.2" />
    </g>
  );
}

type ImplantSpot = { cx: number; top: number; scale?: number; rot?: number };

const place = (p: ImplantSpot) =>
  `translate(${p.cx} ${p.top})${p.rot ? ` rotate(${f(p.rot)})` : ""}${p.scale && p.scale !== 1 ? ` scale(${p.scale})` : ""}`;

export function Implant({
  cx = G.cx,
  top = G.crest,
  scale = 1,
  shadow = true,
}: {
  cx?: number;
  top?: number;
  scale?: number;
  shadow?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <g transform={place({ cx, top, scale })}>
      <ImplantArt id={id} shadow={shadow} />
    </g>
  );
}

/** Several identical implants: the artwork is drawn once and re-used. */
export function ImplantSet({ spots }: { spots: ImplantSpot[] }) {
  const id = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <g id={`${id}i`}>
          <ImplantArt id={`${id}a`} shadow />
        </g>
      </defs>
      {spots.map((p) => (
        <use key={`${p.cx}-${p.top}`} href={`#${id}i`} transform={place(p)} />
      ))}
    </g>
  );
}
/* ---------- Abutment, cover screw, healing abutment ---------- */

/** Several identical abutments (same placement rules as ImplantSet). */
export function AbutmentSet({ spots }: { spots: ImplantSpot[] }) {
  return (
    <g>
      {spots.map((p) => (
        <g key={`${p.cx}-${p.top}`} transform={place(p)}>
          <Abutment cx={0} top={0} />
        </g>
      ))}
    </g>
  );
}

const ABUT_D =
  "M-21 0L-17 -10Q-16.5 -18 -22 -26Q-27 -31 -27 -35L-21 -37L-16 -118Q-16 -128 -8 -128L8 -128Q16 -128 16 -118L21 -37L27 -35Q27 -31 22 -26Q16.5 -18 17 -10L21 0Z";

export function Abutment({
  cx = G.cx,
  top = G.crest,
}: {
  cx?: number;
  top?: number;
}) {
  return (
    <g transform={`translate(${cx} ${top})`}>
      <path d={ABUT_D} fill={u("ti")} className={s.eTi} />
      <path
        d="M-12 -118L-17 -40"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M-24 -31Q-19 -22 -15 -12" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.4" />
      <path d="M-26 -34.5L26 -34.5" fill="none" stroke="#2f3a40" strokeOpacity="0.35" strokeWidth="1.2" />
    </g>
  );
}

export function CoverScrew({ cx = G.cx, top = G.crest }: { cx?: number; top?: number }) {
  return (
    <g transform={`translate(${cx} ${top})`}>
      <path
        d="M-22 0L-22 -6Q-22 -10 -18 -10L18 -10Q22 -10 22 -6L22 0Z"
        fill={u("ti")}
        className={s.eTi}
      />
      <path d="M-18 -8.4H12" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.2" />
    </g>
  );
}

export function HealingAbutment({ cx = G.cx, top = G.crest }: { cx?: number; top?: number }) {
  return (
    <g transform={`translate(${cx} ${top})`}>
      <path
        d="M-22 0L-19 -10L-19 -42Q-19 -48 -12 -48L12 -48Q19 -48 19 -42L19 -10L22 0Z"
        fill={u("ti")}
        className={s.eTi}
      />
      <path d="M-13 -44.5H8" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="1.4" />
      <path d="M-14 -40L-14 -12" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  );
}

/* ---------- Crown (restoration) ---------- */

export function Crown({
  cx = G.cx,
  v = 0,
  cut = false,
  bottom = 202,
}: {
  cx?: number;
  v?: number;
  /** Cut-away: the crown is a shell and the abutment shows inside it. */
  cut?: boolean;
  bottom?: number;
}) {
  const inner = `translate(${cx} 202) scale(0.8 0.89) translate(${-cx} -202)`;
  return (
    <g>
      <CrownBody cx={cx} v={v} fill="porcelain" bottom={bottom} />
      {cut ? (
        <g>
          <path
            d={crownD(cx, v)}
            transform={inner}
            fill="#D9CFB9"
            stroke="#B5A88E"
            strokeWidth="1.5"
          />
          <path
            d={crownD(cx, v)}
            transform={inner}
            fill={u("shade-r")}
            className={s.noStroke}
          />
          <path
            d={crownD(cx, v)}
            transform={inner}
            fill={u("shade-b")}
            className={s.noStroke}
          />
        </g>
      ) : null}
      {/* contact highlights where the crown meets its neighbours */}
      <ellipse cx={cx - 43} cy="128" rx="2" ry="8" fill="#fff" fillOpacity="0.6" stroke="none" />
    </g>
  );
}

/* ---------- Bridge parts ---------- */

/** Prepared (reduced) natural tooth shown inside a crown shell. */
export function PreparedStump({ cx }: { cx: number }) {
  const d = `M${f(cx - 29)} 204C${f(cx - 29)} 176 ${f(cx - 25)} 146 ${f(cx - 19)} 128Q${f(cx - 17)} 120 ${f(cx - 8)} 119L${f(cx + 8)} 119Q${f(cx + 17)} 120 ${f(cx + 19)} 128C${f(cx + 25)} 146 ${f(cx + 29)} 176 ${f(cx + 29)} 204Z`;
  return (
    <g>
      <path d={d} fill={u("dentin")} className={s.eDentin} />
      <path d={d} fill={u("shade-r")} className={s.noStroke} />
      <path
        d={`M${f(cx - 14)} 132L${f(cx - 20)} 188`}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="3"
        filter={u("blur1")}
      />
    </g>
  );
}

/** Crown shell over a prepared stump (cut-away). */
export function CrownOnStump({ cx, v = 0 }: { cx: number; v?: number }) {
  const inner = `translate(${cx} 202) scale(0.8 0.89) translate(${-cx} -202)`;
  return (
    <g>
      <CrownBody cx={cx} v={v} fill="porcelain" />
      <path d={crownD(cx, v)} transform={inner} fill="#D9CFB9" stroke="#B5A88E" strokeWidth="1.5" />
      <path d={crownD(cx, v)} transform={inner} fill={u("shade-r")} className={s.noStroke} />
      <PreparedStump cx={cx} />
      <ellipse cx={cx - 43} cy="128" rx="2" ry="8" fill="#fff" fillOpacity="0.6" stroke="none" />
    </g>
  );
}

/** Replacement tooth that rests on the gum between two bridge crowns. */
export function Pontic({ cx = G.cx, v = 0 }: { cx?: number; v?: number }) {
  return (
    <g>
      <CrownBody cx={cx} v={v} fill="porcelain" bottom={212} />
      <ellipse cx={cx - 43} cy="128" rx="2" ry="8" fill="#fff" fillOpacity="0.6" stroke="none" />
    </g>
  );
}

/** Connector blocks that join bridge units. */
export function BridgeConnector({ x, y = 108, h = 36 }: { x: number; y?: number; h?: number }) {
  return (
    <g>
      <rect x={x - 13} y={y} width="26" height={h} rx="7" fill={u("porcelain")} className={s.eEnamel} />
      <rect x={x - 13} y={y} width="26" height={h} rx="7" fill={u("shade-r")} className={s.noStroke} />
    </g>
  );
}

/* ---------- Denture ---------- */

export function DentureTeeth({ xs, v = [0, 1, -1, 0, 1] }: { xs: number[]; v?: number[] }) {
  return (
    <g>
      {xs.map((x, i) => (
        <CrownBody key={x} cx={x} v={v[i % v.length]} fill="porcelain" bottom={206} />
      ))}
    </g>
  );
}

/** Acrylic base over the ridge. The underside sits 3px proud of the gum. */
export function DentureBase({ x0, x1, ridgeY = 224 }: { x0: number; x1: number; ridgeY?: number }) {
  const top: Pt[] = [];
  for (let x = x0; x <= x1; x += 12) {
    const k = (x - G.cx) / G.pitch;
    top.push([x, 190 + 5 * Math.cos(2 * Math.PI * k)]);
  }
  const bottom: Pt[] = [];
  for (let x = x1; x >= x0; x -= 12) bottom.push([x, ridgeY - 10 + 1.2 * Math.sin(x * 0.06)]);
  const d = curve(top) + `Q${x1 + 12} ${f(top[top.length - 1][1] + 12)} ${x1 + 2} ${f(bottom[0][1])}` + curve(bottom, false) + `Q${x0 - 12} ${f(top[0][1] + 12)} ${x0} ${f(top[0][1])}Z`;
  return (
    <g>
      <path d={d} fill={u("denture")} className={s.eDenture} />
      <path
        d={curve(top)}
        transform="translate(0 3.2)"
        fill="none"
        stroke="#F4B9B6"
        strokeOpacity="0.9"
        strokeWidth="3"
      />
    </g>
  );
}

/* ---------- Bone graft + membrane ---------- */

export function GraftGranules({ x0, x1, dip }: { x0: number; x1: number; dip: number }) {
  const r = rng(9);
  const out: ReactNode[] = [];
  const mid = G.cx;
  const topAt = (x: number) => 233 - 17 * Math.max(0, 1 - Math.pow((x - mid) / ((x1 - x0) / 2), 2));
  let key = 0;
  const bedTop: Pt[] = [];
  const bedBot: Pt[] = [];
  for (let x = x0; x <= x1; x += 8) {
    bedTop.push([x, topAt(x) + 3]);
    bedBot.push([x, crestY(x, dip) + 2]);
  }
  out.push(
    <path
      key="bed"
      d={curve(bedTop) + curve([...bedBot].reverse(), false) + "Z"}
      fill="#E6D5AE"
      stroke="none"
    />,
  );
  for (let row = 0; row < 8; row++) {
    const y = G.crest + dip + 4 - row * 11;
    for (let x = x0 + (row % 2) * 6; x <= x1; x += 14) {
      const jx = x + (r() - 0.5) * 3;
      const jy = y + (r() - 0.5) * 3;
      if (jy < topAt(jx)) continue;
      const crest = crestY(jx, dip);
      if (jy > crest + 6) continue;
      const rad = 5.4 + r() * 2.2;
      out.push(
        <g key={key++}>
          <circle cx={f(jx)} cy={f(jy)} r={f(rad)} fill={u("graft")} className={s.eGraft} />
          <circle cx={f(jx - rad * 0.3)} cy={f(jy - rad * 0.32)} r={f(rad * 0.28)} fill="#fff" fillOpacity="0.8" stroke="none" />
        </g>,
      );
    }
  }
  return <g>{out}</g>;
}

export function Membrane({ x0, x1 }: { x0: number; x1: number }) {
  const c = G.cx;
  const d = curve([
    [x0, G.crest + 4],
    [x0 + 22, 229],
    [c - 26, 214],
    [c, 209.5],
    [c + 26, 214],
    [x1 - 22, 229],
    [x1, G.crest + 4],
  ]);
  return (
    <g>
      <path d={d} fill="none" stroke="#98A0A5" strokeWidth="5.4" strokeLinecap="round" />
      <path d={d} fill="none" stroke={u("membrane")} strokeWidth="3.6" strokeLinecap="round" />
      <path d={d} transform="translate(0 -0.8)" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1" />
    </g>
  );
}

/** Prepared site: a rounded slot in the bone. */
export function Osteotomy({ cx = G.cx, top = G.crest }: { cx?: number; top?: number }) {
  const w = 25;
  const d = `M${cx - w} ${top - 4}L${cx - w + 2} ${top + 138}Q${cx - 8} ${top + 160} ${cx} ${top + 161}Q${cx + 8} ${top + 160} ${cx + w - 2} ${top + 138}L${cx + w} ${top - 4}Z`;
  const id = useId().replace(/:/g, "");
  return (
    <g>
      <clipPath id={`${id}c`}>
        <path d={d} />
      </clipPath>
      <path d={d} fill="#BFA373" />
      <path d={d} fill="url(#neo-osteo)" stroke="none" />
      <g clipPath={`url(#${id}c)`}>
        <rect x={cx - w} y={top - 4} width={w * 2} height="170" fill="url(#neo-trab2)" stroke="none" opacity="0.55" />
        <path d={`M${cx - w + 1} ${top}L${cx - w + 3} ${top + 140}`} fill="none" stroke="#6E5530" strokeOpacity="0.5" strokeWidth="10" filter={u("blur3")} />
        <path d={`M${cx + w - 1} ${top}L${cx + w - 3} ${top + 140}`} fill="none" stroke="#6E5530" strokeOpacity="0.3" strokeWidth="8" filter={u("blur3")} />
        <path d={`M${cx - 12} ${top + 156}Q${cx} ${top + 162} ${cx + 12} ${top + 156}`} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" filter={u("blur1")} />
      </g>
      <path d={d} fill="none" className={s.eBone} />
    </g>
  );
}

/* ---------- Annotation primitives ---------- */

export function Arrow({
  x1,
  y1,
  x2,
  y2,
  w = 3.4,
  head = 13,
  spread = 8.5,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  w?: number;
  head?: number;
  spread?: number;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  const bx = x2 - ux * head;
  const by = y2 - uy * head;
  const pts: Pt[] = [
    [x1 + (px * w) / 2, y1 + (py * w) / 2],
    [bx + (px * w) / 2, by + (py * w) / 2],
    [bx + px * spread, by + py * spread],
    [x2, y2],
    [bx - px * spread, by - py * spread],
    [bx - (px * w) / 2, by - (py * w) / 2],
    [x1 - (px * w) / 2, y1 - (py * w) / 2],
  ];
  return <polygon points={pts.map((p) => `${f(p[0])},${f(p[1])}`).join(" ")} className={s.redFill} />;
}

/** Leader line (1.5px) from a label to a 4px end dot. */
export function Callout({ pts }: { pts: Pt[] }) {
  const end = pts[pts.length - 1];
  return (
    <g>
      <polyline points={pts.map((p) => `${f(p[0])},${f(p[1])}`).join(" ")} className={s.leader} />
      <circle cx={end[0]} cy={end[1]} r="4" className={s.dot} />
    </g>
  );
}

export function Label({
  x,
  y,
  anchor = "start",
  size,
  children,
}: {
  x: number;
  y: number;
  anchor?: "start" | "end" | "middle";
  size?: number;
  children: ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline="central"
      className={s.label}
      style={size ? { fontSize: size } : undefined}
    >
      {children}
    </text>
  );
}

/** Double-headed dimension line with extension ticks. */
export function DimensionLine({
  x1,
  y1,
  x2,
  y2,
  tick = 11,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tick?: number;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  const hd = 10;
  const sp = 5;
  const head = (x: number, y: number, dir: number): string => {
    const bx = x - ux * hd * dir;
    const by = y - uy * hd * dir;
    return `${f(x)},${f(y)} ${f(bx + px * sp)},${f(by + py * sp)} ${f(bx - px * sp)},${f(by - py * sp)}`;
  };
  return (
    <g>
      <line x1={x1 + ux * hd * 0.8} y1={y1 + uy * hd * 0.8} x2={x2 - ux * hd * 0.8} y2={y2 - uy * hd * 0.8} className={s.redLine} />
      <polygon points={head(x1, y1, -1)} className={s.redFill} />
      <polygon points={head(x2, y2, 1)} className={s.redFill} />
      <line x1={x1 + px * tick} y1={y1 + py * tick} x2={x1 - px * tick} y2={y1 - py * tick} className={s.redLine} />
      <line x1={x2 + px * tick} y1={y2 + py * tick} x2={x2 - px * tick} y2={y2 - py * tick} className={s.redLine} />
    </g>
  );
}

/** Circular magnifier: clipped content, rim, glass sheen and a short handle. */
export function Magnifier({
  cx,
  cy,
  r,
  children,
}: {
  cx: number;
  cy: number;
  r: number;
  children: ReactNode;
}) {
  const id = useId().replace(/:/g, "");
  const a = Math.PI / 4;
  const hx = cx + Math.cos(a) * (r + 2);
  const hy = cy + Math.sin(a) * (r + 2);
  return (
    <g>
      <g transform={`rotate(45 ${hx} ${hy})`}>
        <rect x={hx} y={hy - 6} width="30" height="12" rx="6" fill={u("ti-v")} className={s.eTi} />
      </g>
      <circle cx={cx + 2} cy={cy + 3} r={r} fill="#3d2f16" fillOpacity="0.15" stroke="none" filter={u("blur3")} />
      <clipPath id={`${id}c`}>
        <circle cx={cx} cy={cy} r={r} />
      </clipPath>
      <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} fill="#FBF7EC" stroke="none" clipPath={`url(#${id}c)`} />
      <g clipPath={`url(#${id}c)`}>{children}</g>
      <circle cx={cx} cy={cy} r={r} fill={u("glass")} stroke="none" clipPath={`url(#${id}c)`} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#263033" strokeOpacity="0.85" strokeWidth="2.4" />
      <circle cx={cx} cy={cy} r={r - 3} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.2" />
    </g>
  );
}

/** Magnified thread detail: bone filling the valleys between thread crests. */
export function ThreadDetail({ cx, cy, r, contact = true }: { cx: number; cy: number; r: number; contact?: boolean }) {
  const id = useId().replace(/:/g, "");
  const pitch = 50;
  const x0 = cx - 20;
  const v = x0; // thread root (valley floor)
  const c = x0 + 30; // thread crest
  const raw: Pt[] = [];
  for (let y = cy - r - pitch; y < cy + r + pitch; y += pitch) {
    raw.push([v, y + 6], [c, y + 19], [c, y + 31], [v, y + 44]);
  }
  /* round every corner a little so the profile reads as machined metal */
  const rr = 4;
  let line = `M${f(raw[0][0])} ${f(raw[0][1])}`;
  for (let i = 1; i < raw.length - 1; i++) {
    const a = raw[i - 1];
    const b = raw[i];
    const n = raw[i + 1];
    const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const l2 = Math.hypot(n[0] - b[0], n[1] - b[1]);
    const t1 = Math.min(rr, l1 / 2) / l1;
    const t2 = Math.min(rr, l2 / 2) / l2;
    const p1: Pt = [b[0] + (a[0] - b[0]) * t1, b[1] + (a[1] - b[1]) * t1];
    const p2: Pt = [b[0] + (n[0] - b[0]) * t2, b[1] + (n[1] - b[1]) * t2];
    line += `L${f(p1[0])} ${f(p1[1])}Q${f(b[0])} ${f(b[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  const last = raw[raw.length - 1];
  line += `L${f(last[0])} ${f(last[1])}`;
  const tiD = `${line}L${f(cx - r - 6)} ${f(last[1])}L${f(cx - r - 6)} ${f(raw[0][1])}Z`;
  const box = { x: cx - r, y: cy - r, width: r * 2, height: r * 2 };
  return (
    <g>
      <rect {...box} fill="#E9D8B1" stroke="none" />
      <g transform={`translate(${cx} ${cy}) scale(1.7) translate(${-cx} ${-cy})`}>
        <rect x={cx - r / 1.7 - 2} y={cy - r / 1.7 - 2} width={(r * 2) / 1.7 + 4} height={(r * 2) / 1.7 + 4} fill={u("trab")} stroke="none" />
        <rect x={cx - r / 1.7 - 2} y={cy - r / 1.7 - 2} width={(r * 2) / 1.7 + 4} height={(r * 2) / 1.7 + 4} fill={u("trab2")} stroke="none" />
      </g>
      {/* denser, newly formed bone hugging the implant surface */}
      <path d={line} fill="none" stroke="#C9AE7C" strokeOpacity="0.5" strokeWidth="14" filter={u("blur3")} />
      <clipPath id={`${id}c`}>
        <path d={tiD} />
      </clipPath>
      <path d={tiD} fill={u("ti")} className={s.eTi} />
      <g clipPath={`url(#${id}c)`}>
        <path d={line} transform="translate(0 -3.4)" fill="none" stroke="#fff" strokeOpacity="0.75" strokeWidth="2.2" />
        <path d={line} transform="translate(0 3.4)" fill="none" stroke="#2f3a40" strokeOpacity="0.5" strokeWidth="2.2" />
      </g>
      {contact ? <path d={line} fill="none" stroke="#D71920" strokeWidth="2.6" /> : null}
    </g>
  );
}
