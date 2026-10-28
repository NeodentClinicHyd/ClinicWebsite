import type { ReactNode } from "react";
import s from "./illustrations.module.css";

/* ------------------------------------------------------------------
   Icons for the smile design page: "what your dentist may check" (48px
   grid) and "looking after your smile" (40px grid). Same family as
   icons.tsx, fmr-icons.tsx and cbu-icons.tsx: 2px ink stroke, round caps
   and joins, soft red-tint fill (#F6D4D4), paper highlights, exactly one
   #D71920 detail, no backdrop circle. Decorative (aria-hidden); the text
   beside each icon carries the meaning.
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

/** Molar-style tooth (crown and two roots), centred on cx, cusps at `top`. Same shape as fmr-icons.tsx. */
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

/** Front tooth: rounded block, flat top, rounder bottom. */
const front = (x: number, t: number, w: number, h: number, r = 4) =>
  `M${x + 1.5} ${t}H${x + w - 1.5}Q${x + w} ${t} ${x + w} ${t + 1.5}V${t + h - r}Q${x + w} ${t + h} ${x + w - r} ${t + h}H${x + r}Q${x} ${t + h} ${x} ${t + h - r}V${t + 1.5}Q${x} ${t} ${x + 1.5} ${t}Z`;

/* ---------- 48px: what your dentist may check ---------- */

/** Teeth: three front teeth in a row, the middle one a little larger. */
export function IconSdTeeth() {
  /* incisor: narrow at the neck, widest at the biting edge */
  const inc = (cx: number, top: number, w: number, h: number) => {
    const a = w * 0.34;
    const b = w / 2;
    return `M${cx - a} ${top}H${cx + a}C${cx + b * 0.92} ${top} ${cx + b} ${top + h * 0.1} ${cx + b} ${top + h * 0.26}L${cx + b} ${top + h * 0.82}Q${cx + b} ${top + h} ${cx + b * 0.55} ${top + h}H${cx - b * 0.55}Q${cx - b} ${top + h} ${cx - b} ${top + h * 0.82}L${cx - b} ${top + h * 0.26}C${cx - b} ${top + h * 0.1} ${cx - b * 0.92} ${top} ${cx - a} ${top}Z`;
  };
  return (
    <Icon size={48}>
      <path className={P} d={inc(10, 12, 13, 25)} />
      <path className={P} d={inc(38, 12, 13, 25)} />
      <path className={T} d={inc(24, 8, 16, 31)} />
      <path className={R} d="M19.5 34.5Q24 36.6 28.5 34.5" />
    </Icon>
  );
}
/** Gums: a scalloped gum margin with the teeth hanging from it. */
export function IconSdGums() {
  const margin = "M4 19C4 21 7.5 17 10.5 17C13.5 17 15.5 23.5 17.5 23.5C19.5 23.5 21 17 24 17C27 17 29 23.5 31 23.5C33 23.5 34.5 17 37.5 17C40.5 17 44 21 44 19";
  return (
    <Icon size={48}>
      <path className={P} d={front(6, 14, 10.5, 27, 5)} />
      <path className={P} d={front(18.75, 14, 10.5, 27, 5)} />
      <path className={P} d={front(31.5, 14, 10.5, 27, 5)} />
      <path className={T} d={`M4 7H44V19C44 21 40.5 17 37.5 17C34.5 17 33 23.5 31 23.5C29 23.5 27 17 24 17C21 17 19.5 23.5 17.5 23.5C15.5 23.5 13.5 17 10.5 17C7.5 17 4 21 4 19Z`} />
      <path className={R} d={margin} />
    </Icon>
  );
}

/** Bite: upper and lower teeth meeting, with a thin bite line between. */
export function IconSdBite() {
  return (
    <Icon size={48}>
      <path className={T} d={front(5, 5, 11, 16, 5)} />
      <path className={T} d={front(18.5, 5, 11, 16, 5)} />
      <path className={T} d={front(32, 5, 11, 16, 5)} />
      <path className={P} d="M7 44.5H14Q16 44.5 16 42.5V30.5Q16 27 12.5 27H8.5Q5 27 5 30.5V42.5Q5 44.5 7 44.5Z" />
      <path className={P} d="M20.5 44.5H27.5Q29.5 44.5 29.5 42.5V30.5Q29.5 27 26 27H22Q18.5 27 18.5 30.5V42.5Q18.5 44.5 20.5 44.5Z" />
      <path className={P} d="M34 44.5H41Q43 44.5 43 42.5V30.5Q43 27 39.5 27H35.5Q32 27 32 30.5V42.5Q32 44.5 34 44.5Z" />
      <path className={R} d="M3 24H45" />
    </Icon>
  );
}

/** Existing work: a tooth with a small filling beside a tooth under a crown cap. */
export function IconSdWork() {
  return (
    <Icon size={48}>
      <path className={P} d={tooth(13, 11, 1.38)} />
      <ellipse className={T} cx="12.6" cy="17.6" rx="4.4" ry="2.8" />
      <path className={T} d={tooth(35, 11, 1.38)} />
      <path className={R} d="M27.5 23.5Q35 25.8 42.5 23.5" />
    </Icon>
  );
}

/* ---------- 40px: looking after your smile ---------- */

/** Brushing: a toothbrush with a bead of paste on the bristles. */
export function IconSdBrushing() {
  return (
    <Icon size={40}>
      <g transform="rotate(-14 20 24)">
        <rect className={T} x="2" y="24" width="20" height="5.5" rx="2.75" />
        <rect className={P} x="21" y="22.5" width="16" height="8.5" rx="1.8" />
        <path d="M24.5 22.5V17M28.5 22.5V17M32.5 22.5V17M36 22.5V17" />
        <rect className={RF} x="23.5" y="11.5" width="13.5" height="4.6" rx="2.3" />
      </g>
    </Icon>
  );
}

/** Between the teeth: two teeth with a thread of floss drawn through the gap. */
export function IconSdFloss() {
  return (
    <Icon size={40}>
      <path className={P} d={tooth(11.5, 11, 1.2)} />
      <path className={T} d={tooth(28.5, 11, 1.2)} />
      <path className={R} d="M20 4C20 10 17.2 14 17.2 20S20.4 30 20 36" />
    </Icon>
  );
}

/** Check-up: a tooth with a check mark. */
export function IconSdCheckup() {
  return (
    <Icon size={40}>
      <path className={T} d={tooth(16, 8, 1.5)} />
      <path className={R} d="M21 27.5L26 32.5L35.5 21.5" />
    </Icon>
  );
}

/** Hard objects: a tooth beside a pen, struck through (not inside a circle). */
export function IconSdHardObjects() {
  return (
    <Icon size={40}>
      <path className={P} d={tooth(12, 10, 1.2)} />
      <g transform="rotate(32 29 22)">
        <rect className={P} x="26" y="7" width="6" height="25" rx="1.6" />
        <path className={T} d="M26 32H32L29 38Z" />
        <path d="M26 12H32" />
      </g>
      <path className={R} d="M6 6L35 35" strokeWidth="2.6" />
    </Icon>
  );
}

/** Staining drinks: a cup beside a tooth that carries a small stain drop. */
export function IconSdStain() {
  return (
    <Icon size={40}>
      <path className={P} d={tooth(11.5, 13, 1.2)} />
      <path className={RF} d="M10.5 15.5C10.5 15.5 8 18.8 8 20.4A2.5 2.5 0 0 0 13 20.4C13 18.8 10.5 15.5 10.5 15.5Z" />
      <path className={P} d="M23 15H37V25Q37 33 30 33Q23 33 23 25Z" />
      <path className={T} d="M23.2 19.5H36.8V25Q36.8 32.8 30 32.8Q23.2 32.8 23.2 25Z" />
      <path d="M37 18.5H38Q39.4 18.5 39.4 21Q39.4 24 37.4 24H36.6" />
      <path d="M21 36H39" />
    </Icon>
  );
}

/* ---------- sets, in the order of the page rows ---------- */

export const SdCheckIcons = {
  SD3a: IconSdTeeth,
  SD3b: IconSdGums,
  SD3c: IconSdBite,
  SD3d: IconSdWork,
} as const;

export const SdAftercareIcons = {
  SD8a: IconSdBrushing,
  SD8b: IconSdFloss,
  SD8c: IconSdCheckup,
  SD8d: IconSdHardObjects,
  SD8e: IconSdStain,
} as const;
