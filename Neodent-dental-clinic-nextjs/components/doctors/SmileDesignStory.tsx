"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import media from "@/lib/miftah-treatment-media.json";
import { TreatmentEvidenceViewer } from "@/components/doctors/TreatmentEvidenceViewer";
import type { EvidenceItem } from "@/components/doctors/TreatmentEvidenceViewer";
import styles from "./SmileDesignStory.module.css";

/* ------------------------------------------------------------------
   Section 03 sub-chapter — one smile design case, folded behind its
   result.

   COLLAPSED  Step 06 (the finished smile) is the only photograph on
              screen. Steps 01–05 sit exactly underneath it — same box,
              no offset — and are visibility:hidden, so nothing of them
              can show (not even while Step 06 is still loading).
   EXPANDED   The stack unfolds: Step 06 settles into the last slot of a
              descending rail and 05 → 01 slide out from under it, each
              a beat later. The editorial copy is displaced to the left
              by the incoming photographs. Mobile deals the steps
              downward beneath Step 06 instead.
   CLOSED     The same transforms run back; the journey folds under
              Step 06 and the copy returns.

   One boolean drives everything (data-state on the root); all motion
   is CSS transform/opacity. The only script is a ResizeObserver that
   writes the rail geometry CSS cannot express (a length ÷ length
   scale factor). DOM order stays 01 → 06 throughout; layering is
   z-index only. Steps are labelled neutrally — no clinical claims.
   ------------------------------------------------------------------ */

const STEPS = [
  media.story01,
  media.story02,
  media.story03,
  media.story04,
  media.story05,
  media.story06,
] as const;

const TOTAL = STEPS.length;
const RAIL_QUERY = "(min-width: 768px)";
const MAX_STAGGER = 20;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function altFor(i: number) {
  return `Smile design case, Neodent Dental Hospital — clinical photograph, step ${i + 1} of ${TOTAL}`;
}

const VIEWER_ITEMS: EvidenceItem[] = STEPS.map((step, i) => ({
  kind: "image",
  src: step.src,
  width: step.width,
  height: step.height,
  alt: altFor(i),
  caption: `Smile design case — step ${pad(i + 1)} of ${pad(TOTAL)}`,
}));

export function SmileDesignStory() {
  const stageId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLLIElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [rail, setRail] = useState(false);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  /* Desktop/tablet rail geometry. The rail spans the full content width
     W: six frames of width r, each `visible` × r from the next, so
     W = r × (1 + 5 × visible). Narrower widths expose less of each
     frame (more overlap) instead of overflowing. Frames are laid out
     at hero size and scaled DOWN into the rail, so they stay crisp. */
  useEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    if (!root || !hero) return;
    const mq = window.matchMedia(RAIL_QUERY);

    const measure = () => {
      setRail(mq.matches);
      const W = root.clientWidth;
      const heroW = hero.offsetWidth; /* layout size — ignores transforms */
      if (!W || !heroW) return;
      const heroH = heroW * 0.8;
      const visible = Math.min(0.7, Math.max(0.62, 0.62 + ((W - 700) / 480) * 0.08));
      const r = W / (1 + 5 * visible);
      const railH = r * 0.8;
      /* Rail + its timeline must fit inside the hero's height, so the
         section does not grow when the journey opens. */
      const stagger = Math.max(0, Math.min(MAX_STAGGER, (heroH - 44 - railH) / 5));
      const s = root.style;
      s.setProperty("--rail-scale", (r / heroW).toFixed(5));
      s.setProperty("--rail-w", `${r.toFixed(2)}px`);
      s.setProperty("--rail-h", `${railH.toFixed(2)}px`);
      s.setProperty("--rail-step", `${(r * visible).toFixed(2)}px`);
      s.setProperty("--rail-stagger", `${stagger.toFixed(2)}px`);
      /* Actual bottom of the unfolded rail (last frame's descended foot)
         + its through-line, so the expanded stage ends on the journey
         content instead of reserving the full hero height. */
      const railBottom = 5 * stagger + railH;
      s.setProperty("--rail-bottom", `${railBottom.toFixed(2)}px`);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, []);

  const movedFocus = useRef(false);
  const toggle = () => {
    movedFocus.current = true;
    setExpanded((v) => !v);
  };

  /* Two controls drive ONE state: the discovery CTA beside Step 06
     (collapsed) and "Close the journey" in the bar (expanded). Each is
     visibility:hidden in the other state, so after a user toggle focus
     moves to whichever control is now on screen — never lost. */
  useEffect(() => {
    if (!movedFocus.current) return;
    movedFocus.current = false;
    (expanded ? closeRef.current : ctaRef.current)?.focus({ preventScroll: true });
  }, [expanded]);

  /* Mobile end-of-journey close: fold, then bring the reader back to
     the start of the story (the journey above them is disappearing). */
  const closeFromEnd = () => {
    toggle();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rootRef.current?.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
  };

  const canOpen = expanded && rail;

  return (
    <div
      ref={rootRef}
      className={styles.story}
      data-state={expanded ? "expanded" : "collapsed"}
      data-story
      role="group"
      aria-labelledby="miftah-story-title"
    >
      <div className={styles.eyebrow}>Case story · Smile design</div>

      <div className={styles.body}>
        <div className={styles.introWrap}>
          <div className={styles.intro} data-story-intro>
            <h3 id="miftah-story-title" className={`section-heading ${styles.title}`}>
              The clinical thinking behind
              <br />
              <span className="serif">a confident smile.</span>
            </h3>
            <div className={styles.lede}>
              <p>
                A smile does not come together by changing teeth in
                isolation. It requires careful observation, planning and
                attention to how tooth shape, proportion, colour, alignment
                and the surrounding facial features work together. In this
                case, the treatment was planned step by step to create a
                result that looked natural to the patient&rsquo;s face
                rather than simply making the teeth appear different.
              </p>
              <p>
                The six photographs document the clinical progression of the
                smile design process, from the initial condition through the
                stages of treatment to the final result. They show the
                attention given to detail at each stage and how thoughtful
                planning can turn a dental treatment into a smile that feels
                natural, balanced and personal.
              </p>
            </div>
            {/* Case timeline — decorative; the frames carry the steps. */}
            <div className={styles.miniLine} aria-hidden="true">
              {STEPS.map((step, i) => (
                <span
                  key={step.src}
                  className={`${styles.miniStep} ${i === TOTAL - 1 ? styles.miniStepCurrent : ""}`}
                >
                  {pad(i + 1)}
                </span>
              ))}
            </div>
            <button
              ref={ctaRef}
              type="button"
              className={styles.cta}
              aria-expanded={expanded}
              aria-controls={stageId}
              onClick={toggle}
              data-story-toggle
            >
              <span className={styles.ctaKicker}>Click to view</span>
              <span className={styles.ctaArrow} aria-hidden="true">
                <span className={styles.ctaArrowLine} />
                <span className={styles.ctaArrowHead} />
              </span>
              <span className={styles.ctaTitle}>the smile journey</span>
            </button>
          </div>
        </div>

        <div className={styles.stage} data-story-stage>
          <ol id={stageId} className={styles.frames} aria-label="Smile design case, six steps">
            {STEPS.map((step, i) => {
              const isHero = i === TOTAL - 1;
              return (
                <li
                  key={step.src}
                  ref={isHero ? heroRef : undefined}
                  className={`${styles.frame} ${isHero ? styles.frameHero : ""}`}
                  style={{ "--i": i } as CSSProperties}
                  data-story-frame={i + 1}
                >
                  <figure className={styles.figure}>
                    <Image
                      src={step.src}
                      alt={altFor(i)}
                      fill
                      sizes="(max-width: 767px) calc(100vw - 32px), 440px"
                      className={styles.image}
                      style={{ objectPosition: step.objectPosition }}
                    />
                    <figcaption className={styles.index}>
                      <span className={styles.srOnly}>Step </span>
                      {pad(i + 1)}
                    </figcaption>
                  </figure>
                  {canOpen && (
                    <button
                      type="button"
                      className={styles.open}
                      onClick={() => setViewerIndex(i)}
                      aria-label={`Open step ${pad(i + 1)} of ${pad(TOTAL)} at full size`}
                      data-story-open
                    />
                  )}
                </li>
              );
            })}
          </ol>

          {/* The journey's through-line — decorative; the frames'
              captions carry the step numbers for assistive tech. */}
          <div className={styles.timeline} aria-hidden="true">
            <span className={styles.timelineLine}>
              <span className={styles.timelineFill} />
            </span>
            {STEPS.map((step, i) => (
              <span
                key={step.src}
                className={styles.station}
                style={{ "--i": i } as CSSProperties}
              >
                <span className={styles.stationDot} />
                <span className={styles.stationLabel}>{pad(i + 1)}</span>
              </span>
            ))}
          </div>

          <div className={styles.bar}>
            <span className={styles.barLabel} aria-hidden="true">
              {expanded ? `Steps 01 — ${pad(TOTAL)}` : `Final result · ${pad(TOTAL)} / ${pad(TOTAL)}`}
            </span>
            <button
              ref={closeRef}
              type="button"
              className={styles.toggle}
              aria-expanded={expanded}
              aria-controls={stageId}
              onClick={toggle}
              data-story-close
            >
              Close the journey <X size={11} aria-hidden="true" />
            </button>
          </div>

          {expanded && (
            <button
              type="button"
              className={styles.endClose}
              aria-controls={stageId}
              aria-expanded
              onClick={closeFromEnd}
              data-story-end-close
            >
              Close the journey <X size={11} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {viewerIndex !== null && (
        <TreatmentEvidenceViewer
          key={viewerIndex}
          title="Smile design case · Six steps"
          items={VIEWER_ITEMS}
          initialIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </div>
  );
}
