import type { ReactNode } from "react";
import { useId } from "react";
import s from "./illustrations.module.css";

/* ------------------------------------------------------------------
   Icons for the "After the visit" list on the composite build-up page
   (40px grid). Same family as icons.tsx, rct-icons.tsx and fmr-icons.tsx:
   2px ink stroke, round caps and joins, soft red-tint fill (#F6D4D4),
   paper highlights, one #D71920 detail, no backdrop circle. Decorative
   (aria-hidden); the sentence beside each icon carries the meaning.

   The page also uses two icons that already exist: IconCleaning and
   IconCheckup (icons.tsx). Only the two that were missing are drawn here.
   ------------------------------------------------------------------ */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg className={s.ic} viewBox="0 0 40 40" width={40} height={40} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

const T = s.icTint;
const P = s.icPaper;
const R = s.icRed;

/** Molar-style tooth (crown and two roots), centred on cx, cusps at `top`. Same shape as rct-icons.tsx. */
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

/** Numbness: a tooth with its left side tinted and a small crossed bite mark beside it. */
export function IconNumb() {
  const id = useId().replace(/:/g, "");
  const d = tooth(21, 11, 1.32);
  return (
    <Icon>
      <defs>
        <clipPath id={`${id}l`}>
          <rect x="0" y="0" width="21" height="40" />
        </clipPath>
      </defs>
      <path className={P} d={d} />
      <path className={T} d={d} clipPath={`url(#${id}l)`} stroke="none" />
      <path d="M21 12.2V34" strokeDasharray="2.4 2.8" strokeWidth="1.5" />
      <path d={d} />
      <path className={R} d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" />
    </Icon>
  );
}

/** Sensitivity: a tooth with short lines radiating from it. */
export function IconSensitive() {
  return (
    <Icon>
      <path className={T} d={tooth(20, 12.5, 1.32)} />
      <path className={R} d="M20 2.5V6.5M10.5 4.5L12.8 7.8M29.5 4.5L27.2 7.8M4 13.5L7.6 14.8M36 13.5L32.4 14.8" />
    </Icon>
  );
}
