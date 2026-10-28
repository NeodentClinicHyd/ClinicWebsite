import type { ReactNode } from "react";
import s from "./illustrations.module.css";
import b from "./braces-illustrations.module.css";
import { curve, f, type Pt } from "./geometry";
import { archGeometry, toothPoint, toothTransform } from "./arch";
import { crownMap, toothPath, type ArchId, type ToothGeo } from "./archGeometry";
import type { Offsets } from "./braces-geometry";

/* ------------------------------------------------------------------
   Braces parts for the frontal arch, built as an OVERLAY on the kit's
   ArchFront (arch.tsx is not touched): the teeth are drawn by ArchFront from
   the offsets in braces-geometry.ts, and the hardware below is placed with the
   same toothPoint / toothTransform the kit exports, so brackets turn and
   move with their tooth.

   Light comes from the top left everywhere: steel highlights sit on the top
   and left edges, shadow edges on the bottom and right.
   ------------------------------------------------------------------ */

const u = (name: string) => `url(#neo-${name})`;

/* ---------- wire: a continuous steel round wire ---------- */

/** A steel wire along path `d`: soft contact shadow, body, highlight. Stroke
 *  widths are in scene units, so call it inside a `.fine` group. */
export function WirePath({ d, w = 2.3, shadow = true }: { d: string; w?: number; shadow?: boolean }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {shadow
        ? [1.9, 1.45, 1.1].map((k, i) => (
            <path
              key={k}
              d={d}
              stroke="#3D2F16"
              strokeOpacity={0.085 + i * 0.02}
              strokeWidth={w * k}
              transform={`translate(${f(w * 0.3)} ${f(w * 0.62)})`}
            />
          ))
        : null}
      <path d={d} stroke="#4A565D" strokeWidth={w} />
      <path d={d} stroke="#98A4AC" strokeWidth={w * 0.62} transform={`translate(${f(-w * 0.07)} ${f(-w * 0.12)})`} />
      <path d={d} stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth={w * 0.24} transform={`translate(${f(-w * 0.16)} ${f(-w * 0.3)})`} />
    </g>
  );
}

/* ---------- one bracket (local frame: centre at 0,0, slot along x) ---------- */

export type BracketMetrics = { a: number; h: number };
/** Half width and half height of the bracket on tooth g. */
export const bracketSize = (g: ToothGeo): BracketMetrics => {
  const a = Math.max(6.6, 0.235 * g.w);
  return { a, h: a * 0.8 };
};

export function Bracket({ a, h, hook }: { a: number; h: number; hook?: "up" | "down" }) {
  const r = Math.min(2.3, h * 0.36);
  const g = Math.max(0.9, a * 0.1);
  const sh = h * 0.36;
  const wings: [number, number, number, number][] = [
    [-a, -h, -g, -sh],
    [g, -h, a, -sh],
    [-a, sh, -g, h],
    [g, sh, a, h],
  ];
  const nb = (x: number) => f(x);
  return (
    <g>
      {/* seat shadow on the enamel */}
      {[2.6, 1.7, 0.9].map((k, i) => (
        <rect
          key={k}
          x={nb(-a - 1 + 1.3 - k * 0.3)}
          y={nb(-h - 1 + 1.9 - k * 0.3)}
          width={nb(2 * a + 2 + k * 0.6)}
          height={nb(2 * h + 2 + k * 0.6)}
          rx={nb(r + 1 + k * 0.3)}
          fill="#3D2F16"
          fillOpacity={0.07 + i * 0.03}
        />
      ))}
      {hook ? <Hook a={a} h={h} dir={hook} /> : null}
      {/* base pad, then the body */}
      <rect x={nb(-a - 1)} y={nb(-h - 1)} width={nb(2 * a + 2)} height={nb(2 * h + 2)} rx={nb(r + 0.8)} fill={u("brc-steel-dark")} className={b.eSteel} />
      <rect x={nb(-a)} y={nb(-h)} width={nb(2 * a)} height={nb(2 * h)} rx={nb(r)} fill={u("brc-steel")} className={b.eSteel} />
      {/* grooves between the mesial and distal wings */}
      <rect x={nb(-g)} y={nb(-h)} width={nb(2 * g)} height={nb(h - sh)} fill={u("brc-steel-dark")} />
      <rect x={nb(-g)} y={nb(sh)} width={nb(2 * g)} height={nb(h - sh)} fill={u("brc-steel-dark")} />
      {/* the slot that holds the wire */}
      <rect x={nb(-a + 0.5)} y={nb(-sh)} width={nb(2 * a - 1)} height={nb(2 * sh)} rx={nb(sh * 0.45)} fill={u("brc-slot")} />
      {/* steel highlight on top and left edges, shadow on bottom and right */}
      <g fill="none" strokeLinecap="round">
        {wings.map(([x0, y0, x1, y1], i) => (
          <g key={i}>
            <path d={`M${nb(x0 + 0.9)} ${nb(y0 + 0.55)}H${nb(x1 - 0.7)}`} stroke="#FFFFFF" strokeOpacity="0.95" strokeWidth="0.8" />
            <path d={`M${nb(x0 + 0.5)} ${nb(y0 + 0.9)}V${nb(y1 - 0.9)}`} stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="0.7" />
            <path d={`M${nb(x0 + 0.8)} ${nb(y1 - 0.45)}H${nb(x1 - 0.4)}`} stroke="#2F3A40" strokeOpacity="0.4" strokeWidth="0.8" />
            <path d={`M${nb(x1 - 0.45)} ${nb(y0 + 0.8)}V${nb(y1 - 0.5)}`} stroke="#2F3A40" strokeOpacity="0.3" strokeWidth="0.7" />
          </g>
        ))}
        <path d={`M${nb(-a + 1.2)} ${nb(sh - 0.2)}H${nb(a - 1.2)}`} stroke="#9AA6AE" strokeOpacity="0.55" strokeWidth="0.6" />
      </g>
    </g>
  );
}

/** A small steel hook (a post with a ball end) for an elastic. */
function Hook({ a, h, dir }: { a: number; h: number; dir: "up" | "down" }) {
  const sgn = dir === "up" ? -1 : 1;
  const x = a * 0.5;
  const y0 = sgn * h;
  const y1 = sgn * (h + 5.2);
  return (
    <g>
      <path d={`M${f(x)} ${f(y0)}V${f(y1)}`} stroke="#4A565D" strokeWidth="2.1" strokeLinecap="round" fill="none" />
      <path d={`M${f(x - 0.4)} ${f(y0)}V${f(y1)}`} stroke="#C8D1D6" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      <circle cx={f(x)} cy={f(y1)} r="2.2" fill={u("brc-steel")} className={b.eSteel} />
      <circle cx={f(x - 0.7)} cy={f(y1 - 0.7)} r="0.7" fill="#fff" fillOpacity="0.9" />
    </g>
  );
}

/** A small neutral elastic tie around a bracket. */
function Tie({ a, h }: { a: number; h: number }) {
  const rx = a + 1;
  const ry = h + 1;
  const d = `M${f(-rx + ry * 0.8)} ${f(-ry)}H${f(rx - ry * 0.8)}Q${f(rx)} ${f(-ry)} ${f(rx)} ${f(-ry * 0.2)}V${f(ry * 0.2)}Q${f(rx)} ${f(ry)} ${f(rx - ry * 0.8)} ${f(ry)}H${f(-rx + ry * 0.8)}Q${f(-rx)} ${f(ry)} ${f(-rx)} ${f(ry * 0.2)}V${f(-ry * 0.2)}Q${f(-rx)} ${f(-ry)} ${f(-rx + ry * 0.8)} ${f(-ry)}Z`;
  return (
    <g fill="none" strokeLinejoin="round">
      <path d={d} stroke="#3D2F16" strokeOpacity="0.16" strokeWidth="2.3" transform="translate(0.6 1)" />
      <path d={d} stroke="#A39B88" strokeWidth="2.1" />
      <path d={d} stroke="#E8E3D7" strokeWidth="1.3" />
      <path d={`M${f(-rx + ry * 0.8)} ${f(-ry - 0.3)}H${f(rx - ry * 0.8)}`} stroke="#fff" strokeOpacity="0.85" strokeWidth="0.7" />
    </g>
  );
}

/* ---------- hardware on one arch ---------- */

type Placed = {
  g: ToothGeo;
  c: Pt;
  ax: Pt;
  a: number;
  h: number;
  local: Pt;
  tf: string;
};

function place(arch: ArchId, offsets: Offsets, teeth: number[]): Placed[] {
  return archGeometry(arch)
    .filter((g) => teeth.includes(g.i))
    .map((g) => {
      const sp = offsets[g.i] ?? {};
      const { a, h } = bracketSize(g);
      const rot = ((g.rot + (sp.rot ?? 0)) * Math.PI) / 180;
      return {
        g,
        c: toothPoint(g, sp, 0, 0.5 * g.h),
        ax: [Math.cos(rot), Math.sin(rot)] as Pt,
        a,
        h,
        local: crownMap(arch, g.h)(0, 0.5 * g.h),
        tf: toothTransform(g, sp),
      };
    });
}

/** The wire path through the slots (straight inside each slot, flexing in
 *  between), or null when fewer than two brackets. */
export function wirePath(arch: ArchId, offsets: Offsets, teeth: number[], reach = 16): string {
  const P = place(arch, offsets, teeth);
  if (P.length < 2) return "";
  const pts: Pt[] = [];
  const first = P[0];
  const last = P[P.length - 1];
  pts.push([first.c[0] - first.ax[0] * (first.a + reach), first.c[1] - first.ax[1] * (first.a + reach) + 0.5]);
  for (const p of P) {
    pts.push([p.c[0] - p.ax[0] * p.a * 0.9, p.c[1] - p.ax[1] * p.a * 0.9]);
    pts.push(p.c);
    pts.push([p.c[0] + p.ax[0] * p.a * 0.9, p.c[1] + p.ax[1] * p.a * 0.9]);
  }
  pts.push([last.c[0] + last.ax[0] * (last.a + reach), last.c[1] + last.ax[1] * (last.a + reach) + 0.5]);
  return curve(pts);
}

/** Brackets on `teeth` and the wire through their slots. The pieces are
 *  returned in drawing order so that scenes can put the wire between the
 *  brackets and the ties. */
export function BracesHardware({
  arch,
  offsets = {},
  teeth,
  ties = false,
  hooks = {},
  wire = true,
  wireWidth = 2.3,
}: {
  arch: ArchId;
  offsets?: Offsets;
  teeth: number[];
  ties?: boolean;
  hooks?: Record<number, "up" | "down">;
  wire?: boolean;
  wireWidth?: number;
}) {
  const P = place(arch, offsets, teeth);
  const d = wire ? wirePath(arch, offsets, teeth) : "";
  const here = (p: Placed, kids: ReactNode) => (
    <g key={p.g.i} transform={toothTransform(p.g, offsets[p.g.i] ?? {})}>
      <g transform={`translate(${f(p.local[0])} ${f(p.local[1])})`}>{kids}</g>
    </g>
  );
  return (
    <g className={b.fine}>
      {P.map((p) => here(p, <Bracket a={p.a} h={p.h} hook={hooks[p.g.i]} />))}
      {d ? <WirePath d={d} w={wireWidth} /> : null}
      {ties ? P.map((p) => here(p, <Tie a={p.a} h={p.h} />)) : null}
    </g>
  );
}

/** Scene-space position of the elastic hook on a tooth's bracket. */
export function hookPoint(arch: ArchId, offsets: Offsets, i: number, dir: "up" | "down"): Pt {
  const g = archGeometry(arch)[i];
  const sp = offsets[i] ?? {};
  const { a, h } = bracketSize(g);
  const x = a * 0.5;
  const y = (dir === "up" ? -1 : 1) * (h + 5.2);
  const [lx, ly] = crownMap(arch, g.h)(0, 0.5 * g.h);
  const k = ((g.rot + (sp.rot ?? 0)) * Math.PI) / 180;
  const px = lx + x;
  const py = ly + y;
  return [
    g.cx + (sp.dx ?? 0) + px * Math.cos(k) - py * Math.sin(k),
    g.yInc + (sp.dy ?? 0) + px * Math.sin(k) + py * Math.cos(k),
  ];
}

/* ---------- elastic band stretched between two points ---------- */

/** Point on an Elastic's centre line at t (0..1). */
export function elasticAt(from: Pt, to: Pt, sag: number, t: number): Pt {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy);
  const bend = sag * 4 * t * (1 - t);
  return [from[0] + dx * t + (-dy / len) * bend, from[1] + dy * t + (dx / len) * bend];
}

export function Elastic({ from, to, sag = 3.5 }: { from: Pt; to: Pt; sag?: number }) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy);
  const nx = -dy / len;
  const ny = dx / len;
  const N = 24;
  /* half width: a little wider where the band wraps the hooks, taut between */
  const wd = (t: number) => 2.5 + 2.2 * Math.pow(Math.abs(2 * t - 1), 2.4);
  const top: Pt[] = [];
  const bot: Pt[] = [];
  const mid: Pt[] = [];
  for (let k = 0; k <= N; k++) {
    const t = k / N;
    const c = elasticAt(from, to, sag, t);
    top.push([c[0] + nx * wd(t), c[1] + ny * wd(t)]);
    bot.push([c[0] - nx * wd(t), c[1] - ny * wd(t)]);
    mid.push([c[0] - nx * wd(t) * 0.35, c[1] - ny * wd(t) * 0.35]);
  }
  /* round ends: half circles around the two hooks */
  const dirA = Math.atan2(-dy, -dx);
  const dirB = Math.atan2(dy, dx);
  const cap = (c: Pt, r: number, mid0: number, from0: -1 | 1) => {
    const out: Pt[] = [];
    for (let k = 1; k < 8; k++) {
      const ang = mid0 + from0 * (Math.PI / 2) - from0 * (k / 8) * Math.PI;
      out.push([c[0] + Math.cos(ang) * r, c[1] + Math.sin(ang) * r]);
    }
    return out;
  };
  const rB = wd(1);
  const rA = wd(0);
  const capB = cap(to, rB, dirB, 1);
  const capA = cap(from, rA, dirA, 1);
  const ring: Pt[] = [...top, ...capB, ...[...bot].reverse(), ...capA];
  const d = `M${ring.map((p) => `${f(p[0])} ${f(p[1])}`).join("L")}Z`;
  return (
    <g className={b.fine}>
      <path d={d} fill="#3D2F16" fillOpacity="0.18" transform="translate(1.1 1.9)" />
      <path d={d} fill={u("brc-elastic")} className={b.eBand} />
      <path d={`M${mid.map((p) => `${f(p[0])} ${f(p[1])}`).join("L")}`} fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="0.9" strokeLinecap="round" />
    </g>
  );
}
/* ---------- planning marks (red annotation layer) ---------- */

/** Faint dashed outline of the planned position of a tooth (natural place). */
export function IntendedOutline({ arch, i }: { arch: ArchId; i: number }) {
  const g = archGeometry(arch)[i];
  return (
    <path
      d={toothPath(g)}
      transform={toothTransform(g, {})}
      fill="#D71920"
      fillOpacity="0.045"
      className={s.redDash}
      strokeOpacity="0.55"
    />
  );
}

/** Dashed red arrow with a solid arrowhead. */
export function MoveArrow({ from, to, head = 11 }: { from: Pt; to: Pt; head?: number }) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const bx = to[0] - ux * head;
  const by = to[1] - uy * head;
  const hp = `${f(to[0])},${f(to[1])} ${f(bx - uy * 5.6)},${f(by + ux * 5.6)} ${f(bx + uy * 5.6)},${f(by - ux * 5.6)}`;
  const line = `M${f(from[0])} ${f(from[1])}L${f(bx + ux * 1.5)} ${f(by + uy * 1.5)}`;
  return (
    <g>
      <path d={line} fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="4.6" />
      <polygon points={hp} fill="#fff" fillOpacity="0.85" stroke="#fff" strokeOpacity="0.85" strokeWidth="2.4" />
      <path d={line} className={s.redDash} strokeDasharray="5 4" />
      <polygon points={hp} className={s.redFill} />
    </g>
  );
}

/** Centre of tooth `i`'s crown after its offset (scene space). */
export function crownCentre(arch: ArchId, offsets: Offsets, i: number, k = 0.5): Pt {
  const g = archGeometry(arch)[i];
  return toothPoint(g, offsets[i] ?? {}, 0, k * g.h);
}


