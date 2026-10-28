import type { ReactNode } from "react";
import s from "./illustrations.module.css";

/* ------------------------------------------------------------------
   Icons for the root canal treatment page: six "signs" (48px) and four
   aftercare icons (40px). Same family as icons.tsx and fmr-icons.tsx: 2px
   ink stroke, round caps and joins, soft red-tint fill (#F6D4D4), paper
   highlights, one #D71920 detail, no backdrop circle. Decorative
   (aria-hidden); the text beside them carries the meaning. Generic shapes
   only, nothing here shows a diagnosis.
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

/** Molar-style tooth (crown and two roots), centred on (cx), cusps at `top`. */
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

/* ---------- 48px: signs a tooth should be checked ---------- */

/** Toothache: a tooth with short red lines radiating from it. */
export function IconToothache() {
  return (
    <Icon size={48}>
      <path className={T} d={tooth(24, 12, 1.7)} />
      <path className={R} d="M24 3.5V7M12 5.5L14.5 8.5M36 5.5L33.5 8.5M5 15L8.5 16.5M43 15L39.5 16.5" />
    </Icon>
  );
}

/** Sensitivity to hot or cold: a tooth, a droplet and a curl. */
export function IconSensitivity() {
  return (
    <Icon size={48}>
      <path className={T} d={tooth(19, 11, 1.6)} />
      <path className={RF} d="M38 5.5C38 5.5 34.4 9.8 34.4 12.4A3.6 3.6 0 0 0 41.6 12.4C41.6 9.8 38 5.5 38 5.5Z" />
      <path className={R} d="M36.5 22C33 24.5 40 26.5 36.5 30C34 32.5 38 34.5 36.5 38" />
    </Icon>
  );
}

/** Pain when biting: an arrow down onto the biting surface. */
export function IconBiting() {
  return (
    <Icon size={48}>
      <path className={T} d={tooth(24, 19, 1.45)} />
      <path className={R} d="M24 4V16M19.2 11.8L24 16.6L28.8 11.8" />
    </Icon>
  );
}

/** Gum swelling: a tooth with a raised, rounded bump of gum beside it. */
export function IconGumSwelling() {
  return (
    <Icon size={48}>
      <path className={P} d={tooth(17, 5, 1.55)} />
      <path
        className={T}
        d="M3 25C8 25 11 24 16 24C21 24 24 25 27 25C28.5 25 29.2 22 31 19.5C33.5 16 40 15.5 42 21C42.7 23 43 24.5 45 25V38C45 41 43 43 40 43H8C5 43 3 41 3 38Z"
      />
      <path className={R} d="M31.5 22.5C32.5 19.6 35 18.2 38 18.6" />
    </Icon>
  );
}

/** Facial swelling: an abstract cheek and jaw curve with a dashed outer bulge. No face. */
export function IconFacialSwelling() {
  return (
    <Icon size={48}>
      <path className={T} d="M31 6C21 8.5 13 16.5 13 28C13 36 18.5 41 26.5 42H37C40 42 42 40 42 37V11C42 8 40 6 37 6Z" />
      <path d="M22 29C26 32.5 32 33 37 30.5" />
      <path className={R} d="M26 2.5C12.5 5.5 5.5 16.5 5.5 29C5.5 38 10 44 17.5 45.5" strokeDasharray="3.6 3.6" />
    </Icon>
  );
}
/** A hole in the tooth: a dark cavity on the crown. */
export function IconHole() {
  return (
    <Icon size={48}>
      <path className={T} d={tooth(24, 9, 1.75)} />
      <path d="M21.5 17.5C21.5 14.5 24 13.6 26.5 14.4C29.5 15.4 30.3 18.8 28.4 21.2C26.6 23.4 22.6 22.8 21.5 20.2Z" fill="#263033" />
      <path className={R} d="M18 11.5L19.6 13" />
    </Icon>
  );
}

/* ---------- 40px: aftercare ---------- */

/** Rest the tooth: the biting arrow with a slash through it. */
export function IconRest() {
  return (
    <Icon size={40}>
      <path className={T} d={tooth(20, 20, 1.1)} />
      <path className={R} d="M20 2.5V16.5M16 12.6L20 16.6L24 12.6" />
      <path d="M15 9.6L25 4.4" stroke="#FFFEFA" strokeWidth="4.6" />
      <path className={R} d="M15 9.6L25 4.4" strokeWidth="2.2" />
    </Icon>
  );
}

/** Relief: a plain round tablet, no brand, no text. */
export function IconRelief() {
  return (
    <Icon size={40}>
      <path className={T} d="M6 17V23C6 27.4 12.3 31 20 31C27.7 31 34 27.4 34 23V17" />
      <ellipse className={P} cx="20" cy="17" rx="14" ry="7.6" />
      <path className={R} d="M12 17.6C16.5 19.8 23.5 19.8 28 17.6" />
    </Icon>
  );
}

/** Restoration: a crown on a prepared tooth. */
export function IconRestoration() {
  return (
    <Icon size={40}>
      <path className={T} d="M11 27.5H29L27.2 35.5Q26.8 36.5 25.7 36.5H14.3Q13.2 36.5 12.8 35.5Z" />
      <path className={P} d="M7.5 28C7.5 20.5 9 12 13.5 10.6C16.2 9.8 17.6 12.4 20 12.4C22.4 12.4 23.8 9.8 26.5 10.6C31 12 32.5 20.5 32.5 28Z" />
      <path className={R} d="M7 28H33" />
    </Icon>
  );
}

/** Review: a tooth and a check mark. */
export function IconReview() {
  return (
    <Icon size={40}>
      <path className={T} d={tooth(14.5, 6, 1.35)} />
      <path className={R} d="M24.5 26.5L29.5 31.5L38 20.5" />
    </Icon>
  );
}

/* ---------- Sets ---------- */

export const SignIcons = {
  toothache: IconToothache,
  sensitivity: IconSensitivity,
  biting: IconBiting,
  gumSwelling: IconGumSwelling,
  facialSwelling: IconFacialSwelling,
  hole: IconHole,
} as const;

export const RctAftercareIcons = {
  rest: IconRest,
  relief: IconRelief,
  restoration: IconRestoration,
  review: IconReview,
} as const;
