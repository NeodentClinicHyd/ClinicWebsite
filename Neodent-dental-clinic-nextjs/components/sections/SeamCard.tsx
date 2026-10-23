"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import styles from "./SeamCard.module.css";

/* ------------------------------------------------------------------
   SeamCard — the Neodent brand-statement card that sits ON the seam
   between two sections.

   Drop `<SeamCard />` directly between two sibling sections. It renders
   a ZERO-HEIGHT, position:relative wrapper in normal flow; the card is
   absolutely positioned inside it, overlapping the bottom of the section
   above and the top of the section below, with a drawn 1px hairline on
   the seam behind it. Neither neighbour may be absolute/fixed.

   Because the card leaves the flow, each neighbour reserves room for its
   share of it with the SAME tokens the card is sized from (app/globals.css,
   "SEAM CARD" block):
     - section above:  padding-bottom: var(--seam-pad-above)
     - section below:  padding-top:    var(--seam-pad-below)
   Text-only cards (no `image`) are shorter and use the `-text` tokens.

   The wrapper sits OUTSIDE both neighbours on purpose: sections such as
   .exp-intro and .archive are overflow:hidden and would clip the card.

   Content is passed via props; the defaults are the homepage statement.
   The portrait is opt-in and never defaulted, so a page whose context does
   not call for that person simply omits `image`.

   image.topTrim / bottomTrim: % of the source height that is empty
   transparent pixels above / below the subject, and image.focusX: where the
   subject's face and hands are centred horizontally, in %. The card is
   compact, so the portrait is a small panel that shows the central part of
   the cut-out: the subject's real bottom edge is seated on the card's
   bottom edge (not the empty band) and the crop is centred on focusX.

   Motion: a 3D pointer tilt, the card's only animation. It runs only for a
   fine hovering pointer, no reduced-motion preference and a viewport wide
   enough for the side-by-side layout. Everywhere else the card is static.
   ------------------------------------------------------------------ */

export type SeamCardImage = {
  src: string;
  alt: string;
  /* Intrinsic pixel size of the source file (reserves space, no CLS). */
  width: number;
  height: number;
  topTrim?: number;
  bottomTrim?: number;
  focusX?: number;
};

export type SeamCardProps = {
  ariaLabel?: string;
  label?: string;
  lead?: string;
  emphasis?: string;
  attribution?: string | null;
  location?: string | null;
  image?: SeamCardImage | null;
  /* Set when the emphasis line is much longer than "peak performance"
     (16 chars); it is sized to sit on one line at desktop width. */
  longEmphasis?: boolean;
};

/* Tilt tuning: the maxima asked for in the brief, a time-constant lerp for
   the follow and a slower one for the return (settles in ~600ms). */
const MAX_ROTATE_Y = 5;
const MAX_ROTATE_X = 4;
const MAX_ROTATE_Z = 0.4;
const MAX_SCALE = 0.01;
const TAU_FOLLOW = 110;
const TAU_RETURN = 120;
/* Below these the remaining motion is invisible: snap to rest. */
const EPS: Record<keyof TiltState, number> = { rx: 0.02, ry: 0.02, rz: 0.01, s: 0.0003, t: 0.004 };

type TiltState = { rx: number; ry: number; rz: number; s: number; t: number };

function useTilt(
  stageRef: React.RefObject<HTMLDivElement | null>,
  cardRef: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    if (!stage || !card) return;

    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 768px)");
    const enabled = () => hover.matches && !reduce.matches && wide.matches;

    const cur: TiltState = { rx: 0, ry: 0, rz: 0, s: 0, t: 0 };
    const tgt: TiltState = { rx: 0, ry: 0, rz: 0, s: 0, t: 0 };
    const keys = Object.keys(cur) as (keyof TiltState)[];
    let inside = false;
    let raf = 0;
    let last = 0;

    const apply = () => {
      card.style.transform =
        `rotateX(${cur.rx.toFixed(3)}deg) rotateY(${cur.ry.toFixed(3)}deg) ` +
        `rotateZ(${cur.rz.toFixed(3)}deg) scale(${(1 + cur.s).toFixed(4)})`;
      card.style.setProperty("--t", cur.t.toFixed(4));
    };

    const rest = () => {
      card.style.transform = "";
      card.style.removeProperty("--t");
      card.style.willChange = "";
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const k = 1 - Math.exp(-dt / (inside ? TAU_FOLLOW : TAU_RETURN));
      let moving = false;
      for (const key of keys) {
        const d = tgt[key] - cur[key];
        cur[key] += d * k;
        if (Math.abs(d) > EPS[key]) moving = true;
      }
      if (moving || inside) {
        apply();
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        for (const key of keys) cur[key] = 0;
        rest();
      }
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      card.style.willChange = "transform";
      raf = requestAnimationFrame(tick);
    };

    const setTarget = (event: PointerEvent) => {
      // The stage never rotates, so its rect is a stable reference frame.
      const r = stage.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, ((event.clientX - r.left) / r.width) * 2 - 1));
      const ny = Math.max(-1, Math.min(1, ((event.clientY - r.top) / r.height) * 2 - 1));
      tgt.ry = nx * MAX_ROTATE_Y;
      tgt.rx = -ny * MAX_ROTATE_X;
      tgt.rz = nx * MAX_ROTATE_Z;
      tgt.s = MAX_SCALE;
      tgt.t = 1;
    };

    const onEnter = (event: PointerEvent) => {
      if (!enabled() || event.pointerType !== "mouse") return;
      inside = true;
      setTarget(event);
      start();
    };
    const onMove = (event: PointerEvent) => {
      if (!inside || !enabled()) return;
      setTarget(event);
      start();
    };
    const onLeave = () => {
      if (!inside) return;
      inside = false;
      for (const key of keys) tgt[key] = 0;
      start();
    };

    stage.addEventListener("pointerenter", onEnter);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("pointercancel", onLeave);
    return () => {
      stage.removeEventListener("pointerenter", onEnter);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("pointercancel", onLeave);
      if (raf) cancelAnimationFrame(raf);
      rest();
    };
  }, [stageRef, cardRef]);
}

export function SeamCard({
  ariaLabel = "Neodent brand statement",
  label = "Neodent Standard",
  lead = "We maintain",
  emphasis = "peak performance",
  attribution = "— Neodent Dental Hospital",
  location = "Mehdipatnam · Nampally",
  image = null,
  longEmphasis = false,
}: SeamCardProps = {}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  useTilt(stageRef, cardRef);

  const hasFoot = Boolean(attribution || location);
  const seamClass = [
    styles.seam,
    image ? "" : styles.textOnly,
    longEmphasis ? styles.longEmphasis : "",
  ]
    .filter(Boolean)
    .join(" ");

  /* How the cut-out sits in its panel (all fractions of the image box):
     its aspect, the empty bands above/below the subject, and where the
     face and hands are centred. The CSS sizes the figure from these. */
  const figureStyle = image
    ? ({
        "--seam-fig-aspect": image.width / image.height,
        "--seam-fig-opaque": 1 - ((image.topTrim ?? 0) + (image.bottomTrim ?? 0)) / 100,
        "--seam-fig-bottom": (image.bottomTrim ?? 0) / 100,
        "--seam-fig-focus": (image.focusX ?? 50) / 100,
      } as CSSProperties)
    : undefined;
  return (
    <div className={seamClass}>
      <div className={styles.stage} ref={stageRef}>
        <section className={styles.card} ref={cardRef} aria-label={ariaLabel}>
          <span className={styles.frame} aria-hidden="true">
            <svg className={styles.frameSvg} focusable="false">
              <rect className={styles.frameRect} x="0.75" y="0.75" />
            </svg>
          </span>
          <div className={styles.surface} aria-hidden="true" />
          {image && (
            <div className={styles.portrait} style={figureStyle}>
              <Image
                className={styles.figure}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="400px"
              />
            </div>
          )}
          <div className={styles.textLayer}>
            <div className={styles.copy}>
              <p className={styles.label}>{label}</p>
              <p className={styles.statement}>
                <span className={styles.lead}>{lead}</span>
                <span className={styles.emphasis}>{emphasis}</span>
              </p>
              {hasFoot && (
                <div className={styles.foot}>
                  {attribution && <p className={styles.attribution}>{attribution}</p>}
                  {location && <p className={styles.location}>{location}</p>}
                </div>
              )}
            </div>
          </div>        </section>
      </div>
    </div>
  );
}
