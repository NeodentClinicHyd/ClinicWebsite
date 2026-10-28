import type { ReactNode } from "react";
import s from "./illustrations.module.css";

/* ------------------------------------------------------------------
   Icons for the scaling and polishing page: "cleaning at home" (G5d,
   48px), the signs list (G7a-G7d, 48px) and "balanced diet" (G6e, 40px).
   Same family as icons.tsx, sd-icons.tsx and braces-icons.tsx: 2px ink
   stroke, round caps and joins, soft red-tint fill (#F6D4D4), paper
   highlights, ONE #D71920 detail, no backdrop circle, no faces. Decorative
   (aria-hidden); the text beside each icon carries the meaning. Generic
   shapes only.
   ------------------------------------------------------------------ */

function Icon({ size, children }: { size: 48 | 40; children: ReactNode }) {
  return (
    <svg className={s.ic} viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

const T = s.icTint;
const P = s.icPaper;
const R = s.icRed;
const RF = s.icRedFill;

/** Molar-style tooth (crown and two roots), centred on cx, cusps at `top`. Same shape as sd-icons.tsx. */
const tooth = (cx: number, top: number, k: number) =>
  `M${cx - 7 * k} ${top + 4 * k}C${cx - 7 * k} ${top + 0.5 * k} ${cx - 4 * k} ${top - 0.5 * k} ${cx - 2 * k} ${top + 0.5 * k}` +
  `C${cx - 0.7 * k} ${top + 1.1 * k} ${cx + 0.7 * k} ${top + 1.1 * k} ${cx + 2 * k} ${top + 0.5 * k}` +
  `C${cx + 4 * k} ${top - 0.5 * k} ${cx + 7 * k} ${top + 0.5 * k} ${cx + 7 * k} ${top + 4 * k}` +
  `C${cx + 7 * k} ${top + 7 * k} ${cx + 5.8 * k} ${top + 8.5 * k} ${cx + 5.4 * k} ${top + 12 * k}` +
  `C${cx + 5 * k} ${top + 15.5 * k} ${cx + 4.2 * k} ${top + 17 * k} ${cx + 3 * k} ${top + 17 * k}` +
  `C${cx + 1.8 * k} ${top + 17 * k} ${cx + 1.6 * k} ${top + 13.5 * k} ${cx} ${top + 13.5 * k}` +
  `C${cx - 1.6 * k} ${top + 13.5 * k} ${cx - 1.8 * k} ${top + 17 * k} ${cx - 3 * k} ${top + 17 * k}` +
  `C${cx - 4.2 * k} ${top + 17 * k} ${cx - 5 * k} ${top + 15.5 * k} ${cx - 5.4 * k} ${top + 12 * k}` +
  `C${cx - 5.8 * k} ${top + 8.5 * k} ${cx - 7 * k} ${top + 7 * k} ${cx - 7 * k} ${top + 4 * k}Z`;

/** Front tooth: rounded block, flat top, rounder bottom. Same shape as sd-icons.tsx. */
const front = (x: number, t: number, w: number, h: number, r = 4) =>
  `M${x + 1.5} ${t}H${x + w - 1.5}Q${x + w} ${t} ${x + w} ${t + 1.5}V${t + h - r}Q${x + w} ${t + h} ${x + w - r} ${t + h}H${x + r}Q${x} ${t + h} ${x} ${t + h - r}V${t + 1.5}Q${x} ${t} ${x + 1.5} ${t}Z`;

/* ---------- 48px ---------- */

/** G5d. Cleaning at home: a toothbrush under a tooth, a red sparkle. */
export function IconSpHomeCleaning() {
  return (
    <Icon size={48}>
      <path className={P} d={tooth(21, 5, 1.4)} />
      <rect className={P} x="6" y="35" width="21" height="7" rx="1.8" />
      <path d="M10 35V30.5M14.5 35V30.5M19 35V30.5M23.5 35V30.5" />
      <path className={T} d="M27 36.5H42Q44 36.5 44 38.5Q44 40.5 42 40.5H27Z" />
      <path className={R} d="M39 7V14M35.5 10.5H42.5" />
    </Icon>
  );
}

/** G7a. Tartar and stain: a tooth with a rough crust at the neck and specks, a red stain drop. */
export function IconSpTartarStain() {
  return (
    <Icon size={48}>
      <path className={P} d={tooth(21, 6, 1.9)} />
      <path className={T} d="M8.6 22L12.2 18.4L15.8 21.2L19.4 17.4L23.2 20.8L27 17.4L30.6 20.8L34 18.4L33.6 23Z" />
      <path d="M16 11.5h.01M22.5 13h.01M28 10.5h.01M25 15h.01" />
      <path className={RF} d="M41 27C41 27 37.6 31.4 37.6 33.6A3.4 3.4 0 0 0 44.4 33.6C44.4 31.4 41 27 41 27Z" />
    </Icon>
  );
}

/** G7b. Bleeding gum: gum above, two teeth hanging from it, a red drop between them. */
export function IconSpBleedingGum() {
  return (
    <Icon size={48}>
      <path className={P} d={front(8, 12, 13, 27, 5)} />
      <path className={P} d={front(27, 12, 13, 27, 5)} />
      <path
        className={T}
        d="M4 5H44V14C44 16 40.5 13 37.5 13C34.5 13 33 19 31 19C29 19 27 13 24 13C21 13 19.5 19 17.5 19C15.5 19 13.5 13 10.5 13C7.5 13 4 16 4 14Z"
      />
      <path className={RF} d="M24 21C24 21 21.4 24.4 21.4 26.2A2.6 2.6 0 0 0 26.6 26.2C26.6 24.4 24 21 24 21Z" />
      <circle className={RF} cx="24" cy="35" r="1.8" />
    </Icon>
  );
}

/** G7c. Bad breath: a tooth with a few soft wave lines, the middle one red. */
export function IconSpBadBreath() {
  return (
    <Icon size={48}>
      <path className={P} d={tooth(14, 11, 1.5)} />
      <path d="M28 13Q32 9 36 13T44 13" />
      <path className={R} d="M28 24Q32 20 36 24T44 24" />
      <path d="M28 35Q32 31 36 35T44 35" />
    </Icon>
  );
}

/** G7d. Receding gum or loose tooth: a long tooth, a low gum edge, two red movement arcs. */
export function IconSpRecedingLoose() {
  return (
    <Icon size={48}>
      <path className={P} d="M17.5 6H30.5Q32 6 32 7.5V31Q32 41 24 43Q16 41 16 31V7.5Q16 6 17.5 6Z" />
      <path className={T} d="M3 34C9 34 14 36.5 18 36.5H30C34 36.5 39 34 45 34V42Q45 45 42 45H6Q3 45 3 42Z" />
      <path className={R} d="M10.5 12Q7 18 10.5 24M37.5 12Q41 18 37.5 24" />
    </Icon>
  );
}

/* ---------- 40px ---------- */

/** G6e. Balanced diet: an apple with a leaf. */
export function IconSpBalancedDiet() {
  return (
    <Icon size={40}>
      <path className={T} d="M20 12C15 8 6 11 7 21C8 30 14 36 20 34C26 36 32 30 33 21C34 11 25 8 20 12Z" />
      <path d="M20 12C20 9 21 7 23 5" />
      <path className={`${P} ${R}`} d="M23 9C26 5 31 6 31 6C30 10 27 11 23 9Z" />
    </Icon>
  );
}
