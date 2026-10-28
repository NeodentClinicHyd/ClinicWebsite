import type { ReactNode } from "react";
import s from "./illustrations.module.css";

/* ------------------------------------------------------------------
   Icon family for the dental-implant page.
   One grid per set (48px for "what may need attention", 40px for
   aftercare), 2px ink stroke, round caps and joins, soft red-tint fill
   (#F6D4D4) and a single #D71920 detail. No circles behind the icons.
   All icons are decorative (aria-hidden); the text beside them carries
   the meaning.
   ------------------------------------------------------------------ */

function Icon({ size, children }: { size: number; children: ReactNode }) {
  return (
    <svg
      className={s.ic}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const T = s.icTint;
const P = s.icPaper;
const R = s.icRed;
const RF = s.icRedFill;

/* ---------- 48px: what may need attention first ---------- */

export function IconGum() {
  return (
    <Icon size={48}>
      <path className={P} d="M7 28V15C7 10 10 7 14 7C16.5 7 17.5 8.5 18.5 9C19.5 8.5 21 7 22.5 7C23 7 23 8 23 9V28Z" />
      <path className={P} d="M25 28V9C25 8 25 7 26 7C28 7 29.5 8.5 30.5 9C31.5 8.5 32.5 7 35 7C39 7 41 10 41 15V28Z" />
      <path
        className={T}
        d="M3 25C7 25.5 11 27 15 27.5C19 27.5 21.5 26 24 20.5C26.5 26 29 27.5 33 27.5C37 27 41 25.5 45 25V38C45 41 43 43 40 43H8C5 43 3 41 3 38Z"
      />
      <path className={RF} d="M24 29.5C24 29.5 20.6 33.4 20.6 35.6A3.4 3.4 0 0 0 27.4 35.6C27.4 33.4 24 29.5 24 29.5Z" />
    </Icon>
  );
}

export function IconBone() {
  return (
    <Icon size={48}>
      <path
        className={T}
        d="M5 21C5 15.5 9 12 15 12H27C33 12 36 15.5 36 21V34C36 38 33.5 40 30.5 40H10.5C7 40 5 38 5 34Z"
      />
      <path d="M8.5 18.5C14 16.5 27 16.5 32.5 18.5" />
      <path d="M12 26C14.5 23.5 17 28 20 25.5M23 33C26 30.5 28.5 35 31.5 32.5M11.5 34C13 32.5 15 34.5 17 33" />
      <path className={R} d="M42 12V40M38.8 15.5L42 12L45.2 15.5M38.8 36.5L42 40L45.2 36.5" />
    </Icon>
  );
}

export function IconSmoking() {
  return (
    <Icon size={48}>
      <rect className={P} x="4" y="29" width="33" height="8" rx="2" />
      <path className={T} d="M6 29H14V37H6A2 2 0 0 1 4 35V31A2 2 0 0 1 6 29Z" />
      <path d="M14 29V37" />
      <rect className={RF} x="37" y="29" width="5" height="8" rx="1.5" />
      <path d="M38 24C35 21.5 41 19.5 38 15.5C36 12.5 40 11 39.5 7" />
      <path d="M30 24C28 22 32 20.5 30 17.5" />
    </Icon>
  );
}

export function IconHealth() {
  return (
    <Icon size={48}>
      <rect className={T} x="5" y="8" width="38" height="26" rx="4" />
      <path d="M24 34V40M15 41H33" />
      <path className={R} d="M9 22H17L20 14L25 28L28 20L30 22H39" />
    </Icon>
  );
}

export function IconGrinding() {
  return (
    <Icon size={48}>
      <path
        className={T}
        d="M9 5H39V13C39 18 36 21 33 21C30 21 28 18 24 18C20 18 18 21 15 21C12 21 9 18 9 13Z"
      />
      <path
        className={T}
        d="M9 43H39V35C39 30 36 27 33 27C30 27 28 30 24 30C20 30 18 27 15 27C12 27 9 30 9 35Z"
      />
      <path className={R} d="M4 24L11 22L17 26L23 22L29 26L35 22L41 26L44 24" />
    </Icon>
  );
}

export function IconMedicine() {
  return (
    <Icon size={48}>
      <g transform="rotate(-45 18 32)">
        <rect className={P} x="5" y="26" width="26" height="12" rx="6" />
        <path className={T} d="M11 26H18V38H11A6 6 0 0 1 11 26Z" />
        <path d="M18 26V38" />
      </g>
      <circle className={RF} cx="35" cy="13" r="2.4" />
      <path className={R} d="M35 4.5V7.5M43.5 13H40.5M41 7L38.8 9.2M41 19L38.8 16.8M29 7L31.2 9.2" />
    </Icon>
  );
}

/* ---------- 40px: aftercare ---------- */

export function IconCleaning() {
  return (
    <Icon size={40}>
      <g transform="rotate(-40 20 22)">
        <path className={T} d="M2 20.5H22Q24 20.5 24 22.5Q24 24.5 22 24.5H2Q0.5 24.5 0.5 22.5Q0.5 20.5 2 20.5Z" />
        <rect className={P} x="24" y="19" width="14" height="7" rx="1.5" />
        <path d="M27 19V13.5M31 19V13.5M35 19V13.5" />
      </g>
      <path className={R} d="M9 6V12M6 9H12" />
    </Icon>
  );
}

export function IconCheckup() {
  return (
    <Icon size={40}>
      <circle className={P} cx="15.5" cy="15.5" r="10" />
      <path className={R} d="M9.5 15C10 12 12 10 15 9.5" />
      <path className={T} d="M22 25.5L25.5 22L36 32.5Q37.5 34 36 35.5L35.5 36Q34 37.5 32.5 36Z" />
    </Icon>
  );
}

export function IconGumHealth() {
  return (
    <Icon size={40}>
      <path className={P} d="M5.5 22V12.5C5.5 8.5 8 6 11.5 6C13.5 6 14.5 7.3 15.5 7.8C16.5 7.3 17.5 6 18.5 6C19 6 19 7 19 8V22Z" />
      <path className={P} d="M21 22V8C21 7 21 6 22 6C23.5 6 24.5 7.3 25.5 7.8C26.5 7.3 27.5 6 29 6C32.5 6 35 8.5 35 12.5V22Z" />
      <path
        className={T}
        d="M3 21C6 21.5 9.5 23 12.5 23.5C16 23.5 18 22 20 18C22 22 24 23.5 27.5 23.5C30.5 23 34 21.5 37 21V32C37 35 35 36.5 32.5 36.5H7.5C5 36.5 3 35 3 32Z"
      />
      <path className={R} d="M9 14L12 17L17 10.5" />
    </Icon>
  );
}

export function IconNoSmoking() {
  return (
    <Icon size={40}>
      <rect className={P} x="3" y="22" width="28" height="7" rx="2" />
      <path className={T} d="M5 22H12V29H5A2 2 0 0 1 3 27V24A2 2 0 0 1 5 22Z" />
      <path d="M12 22V29" />
      <rect className={P} x="31" y="22" width="5" height="7" rx="1.5" />
      <path d="M33 17C30.5 15 35 13 33 9.5" />
      <path className={R} d="M7 7L34 34" strokeWidth="2.6" />
    </Icon>
  );
}

export function IconNightGuard() {
  return (
    <Icon size={40}>
      <path
        className={T}
        d="M4 29C4 15 11 8 20 8C29 8 36 15 36 29C36 32 34 33.5 32 33.5H28.5C26.5 33.5 25 32 25 30C25 24 23 19.5 20 19.5C17 19.5 15 24 15 30C15 32 13.5 33.5 11.5 33.5H8C6 33.5 4 32 4 29Z"
      />
      <path className={R} d="M9 28C9 18 13.5 12.5 20 12.5C26.5 12.5 31 18 31 28" />
    </Icon>
  );
}

/** Light tile for icons that sit on a dark ground (40px or 48px). */
export function IconTile({ size = 40, children }: { size?: number; children: ReactNode }) {
  return (
    <span
      className={s.iconTile}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

/* ---------- Sets ---------- */

export const NeedsAttentionIcons = {
  gum: IconGum,
  bone: IconBone,
  smoking: IconSmoking,
  health: IconHealth,
  grinding: IconGrinding,
  medicines: IconMedicine,
} as const;

export const AftercareIcons = {
  cleaning: IconCleaning,
  checkup: IconCheckup,
  gumHealth: IconGumHealth,
  smoking: IconNoSmoking,
  grinding: IconNightGuard,
} as const;
