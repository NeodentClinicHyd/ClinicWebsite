"use client";

import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type RefObject,
} from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { visitImage } from "@/lib/site-data";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { AppButton } from "@/components/ui/AppButton";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./WhatToExpect.module.css";

/* ------------------------------------------------------------------
   Homepage Section 06 — "What to expect".

   Visual system follows the refined sections above it: DM Serif Display
   title with a red italic accent, .section-lede body copy and the site's
   primary CTA button.

   Composition (reference Part 6.7):
   - Desktop: the team photograph sits above a vertical stepper in the
     left column; the reception photograph fills the right column up to
     --media-max-h.
   - Mobile: the two photographs form one scroll-snap row (team first,
     reception second), then the stepper at full width.

   Photographs are cropped on purpose: .media-frame caps the height
   (--media-max-h / --media-max-h-compact) and object-fit: cover crops
   around the --focal point set on each frame.

   Stepper: the sequence is shown by a line and a dot per stage, never by
   numbers. The line is drawn by scroll position (see useStepperProgress)
   and the stages fade in one after another (<Reveal stagger>). */

type Step = {
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    title: "Arrival & check-in",
    description:
      "You're welcomed at reception and any paperwork is handled before you're shown through.",
  },
  {
    title: "Consultation",
    description:
      "A direct conversation with a Neodent specialist about what's on your mind.",
  },
  {
    title: "Treatment",
    description:
      "Your procedure is carried out in the treatment room, at a measured, unhurried pace.",
  },
  {
    title: "Follow-up",
    description:
      "Clear guidance on next steps and aftercare before you leave, so nothing feels uncertain.",
  },
];

const doctorsImage = "/assets/neodent-dental-hospital-doctors.jpeg";

/* Focal points (x y), chosen per photograph.
   Team: the group runs edge to edge and the tallest head starts about 4%
   from the top, so anchor at the top of the frame (the 4:1 banner trims
   the lower body, never a head). Reception: the red upper-floor railings
   sit at the top right and the red armchairs in the middle, so bias right
   and slightly above centre. */
const TEAM_FOCAL = "50% 5%";
const RECEPTION_FOCAL = "64% 38%";

/** Where on screen (fraction of viewport height) the line has "arrived". */
const REFERENCE_LINE = 0.62;

/* Draws the stepper line with scroll.
   Each step owns the line segment from its dot to the next dot and
   exposes how much of it has been reached as --p (0 to 1); the dot is
   marked data-reached once the reference line passes it. Only transforms
   are animated in CSS (scaleY of the segment, scale of the dot).

   Not CSS animation-timeline: view() on purpose. An ancestor with
   overflow: hidden (`.site` in globals.css) makes that timeline static,
   so the line would just sit fully drawn (see the P3 note in
   HOME_REDESIGN_CHANGELOG.md).

   Without JS, with reduced motion, or before this runs, the CSS default
   is the finished state (every segment drawn, every dot reached). */
function useStepperProgress(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const items = [...root.querySelectorAll<HTMLElement>("[data-step]")].map(
      (step) => ({
        step,
        dot: step.querySelector<HTMLElement>("[data-dot]"),
      }),
    );

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * REFERENCE_LINE;
      for (const { step, dot } of items) {
        if (!dot) continue;
        const rect = dot.getBoundingClientRect();
        const dotY = rect.top + rect.height / 2;
        const progress = Math.min(
          1,
          Math.max(0, (line - dotY) / step.offsetHeight),
        );
        step.style.setProperty("--p", progress.toFixed(3));
        if (line >= dotY) step.setAttribute("data-reached", "");
        else step.removeAttribute("data-reached");
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    root.setAttribute("data-armed", "");
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root.removeAttribute("data-armed");
    };
  }, [rootRef]);
}

export function WhatToExpect() {
  const journeyRef = useRef<HTMLDivElement>(null);
  useStepperProgress(journeyRef);

  return (
    <section
      className={styles.section}
      id="visit"
      aria-labelledby="visit-title"
    >
      <div className={styles.container}>
        <Reveal as="header" className={styles.header}>
          <h2 id="visit-title" className={styles.title}>
            What to expect from a visit to <span>Neodent Dental Hospital</span>
          </h2>
          <p className={`${styles.lede} section-lede`}>
            A considered dental appointment, from the first hello to the final
            goodbye, with every stage designed to keep you informed,
            comfortable and clear about what comes next.{" "}
            <EditorialHighlight tone="primary">Specialist-led care</EditorialHighlight>{" "}
            is shaped around your concerns, with clear conversations and a
            measured approach, so your visit feels{" "}
            <EditorialHighlight tone="secondary">
              reassuring, personal and precise
            </EditorialHighlight>
            .
          </p>
        </Reveal>

        <div className={styles.composition}>
          {/* One scroll-snap row on mobile (team first); on desktop this
              wrapper disappears (display: contents) and each photograph
              takes its own grid cell. */}
          <div
            className={styles.media}
            role="region"
            aria-label="Our team and our reception"
            tabIndex={0}
          >
            <Reveal
              as="figure"
              className={`media-frame media-frame--compact ${styles.photo} ${styles.photoTeam}`}
              style={{ "--focal": TEAM_FOCAL } as CSSProperties}
            >
              <Image
                src={doctorsImage}
                alt="Five people in clinical attire standing together in front of red-framed consultation chamber doors at Neodent Dental Hospitals"
                fill
                sizes="(min-width: 1228px) 1180px, (min-width: 900px) calc(100vw - 48px), min(533px, 92vw)"
              />
            </Reveal>

            <Reveal
              as="figure"
              delay={120}
              className={`media-frame ${styles.photo} ${styles.photoVisit}`}
              style={{ "--focal": RECEPTION_FOCAL } as CSSProperties}
            >
              <Image
                src={visitImage}
                alt="Reception and waiting area at Neodent Dental Hospital, with a red-framed reception counter, red armchairs and consultation chamber doors"
                fill
                sizes="(min-width: 1228px) 570px, (min-width: 900px) calc((100vw - 84px) / 2), clamp(150px, 42vw, 240px)"
              />
            </Reveal>
          </div>

          <div ref={journeyRef} className={styles.journey}>
            <Reveal
              as="ol"
              stagger={140}
              className={styles.steps}
              aria-label="Your visit, step by step"
            >
              {steps.map((step) => (
                <li key={step.title} className={styles.step} data-step>
                  <span className={styles.dot} data-dot aria-hidden="true" />
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>

        <Reveal className={styles.ctaRow}>
          <AppButton href="/clinic" variant="primary">
            Plan your visit <ArrowRight size={15} aria-hidden="true" />
          </AppButton>
        </Reveal>
      </div>
    </section>
  );
}
