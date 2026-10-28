import type { ReactNode } from "react";
import s from "./illustrations.module.css";

/* ------------------------------------------------------------------
   Icons for the braces and orthodontics page: three "is it right for me"
   icons (B2, 48px), three "who is it for" icons (B6, 48px) and four daily
   care icons (B7, 40px). Same family as icons.tsx, fmr-icons.tsx and
   rct-icons.tsx: 2px ink stroke, round caps and joins, soft red-tint fill
   (#F6D4D4), paper highlights, ONE #D71920 detail, no backdrop circle, no
   faces. Decorative (aria-hidden); the text beside them carries the
   meaning. Generic shapes only.
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

/** Front tooth crown seen from the front: gum line on top, edge at the bottom. */
const crown = (x: number, y: number, w: number, h: number) =>
  `M${x} ${y + 3}Q${x} ${y} ${x + 3} ${y}H${x + w - 3}Q${x + w} ${y} ${x + w} ${y + 3}V${y + h * 0.62}Q${x + w} ${y + h} ${x + w * 0.72} ${y + h}H${x + w * 0.28}Q${x} ${y + h} ${x} ${y + h * 0.62}Z`;

/* ---------- 48px: is it right for me ---------- */

/** Crowding: four front teeth overlapping and turned. */
export function IconCrowding() {
  return (
    <Icon size={48}>
      <g transform="rotate(9 36.5 24)">
        <path className={T} d={crown(30, 9, 13, 27)} />
      </g>
      <g transform="rotate(-8 17.5 24)">
        <path className={T} d={crown(11, 9, 13, 27)} />
      </g>
      <g transform="rotate(-11 11.5 24)">
        <path className={P} d={crown(5, 10, 13, 27)} />
      </g>
      <g transform="rotate(7 27 24)">
        <path className={P} d={crown(20.5, 9, 13, 27)} />
      </g>
      <circle className={RF} cx="19.2" cy="26" r="2.3" />
    </Icon>
  );
}

/** Gaps: four teeth with spaces between them. */
export function IconGaps() {
  const xs = [2.4, 12.4, 22.4, 40.2];
  return (
    <Icon size={48}>
      {xs.map((x, i) => (
        <path key={x} className={i % 2 ? T : P} d={crown(x, 9, 5.6, 29)} />
      ))}
      <path className={RF} strokeWidth="0.8" d="M29 23.5L32.6 20.9V26.1ZM39.4 23.5L35.8 20.9V26.1Z" />
      <path className={R} d="M32 23.5H36.4" strokeWidth="1.8" />
    </Icon>
  );
}

/** Bite: side view of an upper and a lower front tooth, one in front of the other. */
export function IconBite() {
  return (
    <Icon size={48}>
      <path className={T} d="M5 2.5H43V7Q24 10.5 5 7Z" />
      <path className={T} d="M5 44.5H43V40Q24 36.5 5 40Z" />
      <path className={P} d="M25 40.5V37Q25 22 28.5 17.5Q31 14.5 34 17.5Q36.5 22 37.5 37V40.5Z" />
      <path className={T} d="M14 8.5H27L26 24.5Q25.4 29.5 21.8 29.5Q18.4 29.5 17.6 25Z" />
      <path className={R} d="M21.8 34H30.2M21.8 31.4V36.6M30.2 31.4V36.6" strokeWidth="1.8" />
    </Icon>
  );
}

/* ---------- 48px: who is it for ---------- */

/** Adult path: one tooth with a bracket and a wire. */
export function IconAdult() {
  return (
    <Icon size={48}>
      <path className={T} d={crown(12, 6, 24, 34)} />
      <rect className={P} x="18.5" y="17" width="11" height="9" rx="2" />
      <path d="M18.5 21.5H29.5" strokeWidth="1.6" />
      <path className={R} d="M3.5 21.5H44.5" />
    </Icon>
  );
}

/** Teenager path: a removable appliance plate with a wire. */
export function IconTeen() {
  return (
    <Icon size={48}>
      <path className={T} d="M5 6H16V24Q16 31 24 31Q32 31 32 24V6H43V26Q43 41 24 41Q5 41 5 26Z" />
      <path className={P} d="M16 6H32V24Q32 31 24 31Q16 31 16 24Z" strokeWidth="1.6" />
      <path className={R} d="M9 33Q9 45 24 45Q39 45 39 33" />
    </Icon>
  );
}

/** Parent path: a checklist with three lines and ticks. */
export function IconParent() {
  return (
    <Icon size={48}>
      <rect className={P} x="9" y="7" width="30" height="36" rx="4" />
      <rect className={T} x="16.5" y="3.5" width="15" height="8" rx="2.5" />
      <path className={R} d="M14 20.5L16.6 23.3L21 17.8" />
      <path d="M25 20.5H34" />
      <path d="M14 29.5L16.6 32.3L21 26.8" />
      <path d="M25 29.5H34" />
      <path d="M14 38.5L16.6 41.3L21 35.8" />
      <path d="M25 38.5H31" />
    </Icon>
  );
}

/* ---------- 40px: daily care ---------- */

/** Brushing: a toothbrush angled at a bracketed tooth. */
export function IconBrushing() {
  return (
    <Icon size={40}>
      <path className={T} d={crown(3.5, 14, 17, 22)} />
      <rect className={P} x="8.4" y="21.5" width="7.2" height="6.5" rx="1.6" strokeWidth="1.6" />
      <path d="M6 24.8H18" strokeWidth="1.6" />
      <g transform="rotate(-38 28 12)">
        <path className={T} d="M26 9.2H36Q38 9.2 38 11.2Q38 13.2 36 13.2H26Z" />
        <rect className={RF} x="15.5" y="8" width="10.5" height="6.4" rx="1.6" />
        <path className={R} d="M18 8V4.6M21 8V4.6M24 8V4.6" strokeWidth="1.6" />
      </g>
    </Icon>
  );
}

/** Cleaning between teeth: a small interdental brush beside a bracket and wire. */
export function IconInterdental() {
  return (
    <Icon size={40}>
      <path className={T} d={crown(2.5, 4, 16, 24)} />
      <rect className={P} x="7" y="11.4" width="7.2" height="6.4" rx="1.6" strokeWidth="1.6" />
      <path d="M2 14.6H18.5" strokeWidth="1.6" />
      <g transform="rotate(-10 28 38)">
        <rect className={T} x="25" y="25" width="6" height="13" rx="3" />
        <path d="M28 25V16" />
        <path className={R} d="M28 16V9.5M25.4 14.6L24 10.6M30.6 14.6L32 10.6M25.6 12L23.4 9.6M30.4 12L32.6 9.6" strokeWidth="1.6" />
      </g>
    </Icon>
  );
}

/** Foods to avoid: a wrapped sweet with a prohibition slash. */
export function IconSweet() {
  return (
    <Icon size={40}>
      <path className={P} d="M9 20L2.5 14.5V25.5Z" />
      <path className={P} d="M31 20L37.5 14.5V25.5Z" />
      <ellipse className={T} cx="20" cy="20" rx="11.5" ry="8.2" />
      <path d="M13.5 16C16 14.4 19 14 21.5 14.4" strokeWidth="1.6" />
      <path className={R} d="M7 7L34 34" strokeWidth="2.6" />
    </Icon>
  );
}

/** Wax: a bracket with a small round wax bead over a wire end. */
export function IconWax() {
  return (
    <Icon size={40}>
      <rect className={P} x="6" y="13.5" width="17" height="13" rx="3" />
      <path d="M6 20H23" strokeWidth="1.6" />
      <path d="M2 20H34" />
      <circle className={RF} cx="31.5" cy="20" r="5.2" />
    </Icon>
  );
}

/* ---------- Sets ---------- */

export const SignIcons = {
  crowding: IconCrowding,
  gaps: IconGaps,
  bite: IconBite,
} as const;

export const ReaderIcons = {
  adult: IconAdult,
  teen: IconTeen,
  parent: IconParent,
} as const;

export const CareIcons = {
  brushing: IconBrushing,
  interdental: IconInterdental,
  sweet: IconSweet,
  wax: IconWax,
} as const;

