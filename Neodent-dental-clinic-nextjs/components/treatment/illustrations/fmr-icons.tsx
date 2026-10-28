import type { ReactNode } from "react";
import s from "./illustrations.module.css";

/* ------------------------------------------------------------------
   Icons for "how a plan is made" (48px grid). Same family as the implant
   page icons (icons.tsx): 2px ink stroke, round caps and joins, soft
   red-tint fill (#F6D4D4), paper highlights, one #D71920 detail, no
   backdrop. Decorative: aria-hidden, the text beside them carries the
   meaning.
   ------------------------------------------------------------------ */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg className={s.ic} viewBox="0 0 48 48" width={48} height={48} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

const T = s.icTint;
const P = s.icPaper;
const R = s.icRed;

/** Molar-style crown outline, centred on (cx, base) at the given scale. */
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

/** Clipboard with a tooth: your medical and dental history. */
export function IconHistory() {
  return (
    <Icon>
      <rect className={P} x="9" y="7" width="30" height="35" rx="4" />
      <rect className={T} x="16.5" y="3.5" width="15" height="8" rx="2.5" />
      <path className={T} d={tooth(24, 15.5, 1.05)} />
      <path className={R} d="M16 37H32" />
    </Icon>
  );
}

/** Radiograph film with a jaw outline: examination and X-rays. */
export function IconXray() {
  return (
    <Icon>
      <rect className={P} x="4.5" y="8" width="39" height="32" rx="4.5" />
      {[14.5, 24, 33.5].map((cx) => (
        <path
          key={cx}
          className={T}
          strokeWidth="1.7"
          d={`M${cx - 4.2} 20.5Q${cx - 4.2} 15.5 ${cx} 15.5Q${cx + 4.2} 15.5 ${cx + 4.2} 20.5L${cx + 3} 25.5L${cx + 1.6} 33.5Q${cx} 35 ${cx - 1.6} 33.5L${cx - 3} 25.5Z`}
        />
      ))}
      <path className={R} d="M8.5 27.5H39.5" strokeDasharray="3 3" />
    </Icon>
  );
}

/** Tooth model on an impression tray: scans or impressions. */
export function IconScan() {
  return (
    <Icon>
      <path className={P} d="M5 33H43L40 41.5Q39.6 42.5 38.5 42.5H9.5Q8.4 42.5 8 41.5Z" />
      <path className={T} d={tooth(24, 14, 1.05)} />
      <path className={R} d="M12 11Q24 3.5 36 11" />
    </Icon>
  );
}
