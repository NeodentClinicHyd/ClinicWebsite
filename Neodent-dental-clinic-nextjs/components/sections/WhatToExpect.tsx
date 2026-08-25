"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { visitImage } from "@/lib/site-data";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import styles from "./WhatToExpect.module.css";

/* ------------------------------------------------------------------
   Homepage Section 06 — "What to expect".

   Re-art-directed replacement for the old demo's green-icon "What to
   expect" timeline (components/sections/Experience.tsx, no longer
   rendered on the homepage but kept in the repo as legacy reference).
   Content — the four-stage visit journey and its copy — is carried
   over verbatim from that source; only the visual system changes.

   Design language inherited directly from Section 02's canonical
   .archive-* system (see LegacyStory.tsx / globals.css): the same
   10px/.2em uppercase eyebrow with a 34px red hairline, DM Serif
   Display headings with a red italic emphasis line, an oversized
   low-opacity serif chapter numeral bleeding into the eyebrow via
   negative margin, and 15px/1.7 muted body copy. Nothing here edits
   globals.css or any locked section (01-05).

   Composition is original to this section: a single real clinic
   interior plate (left) registered against a four-stage patient
   journey rail (right) via a short bridging hairline, rather than
   Section 03's drafting grid, Section 04's portrait/annotation rail
   or Section 05's video/quote stage. The active journey stage is
   driven by both hover/focus and scroll position (a single
   IntersectionObserver watching a thin band near the viewport's
   centre), never by hijacking scroll. */

type Step = {
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Arrival & check-in",
    description:
      "You're welcomed at reception and any paperwork is handled before you're shown through.",
  },
  {
    number: "02",
    title: "Consultation",
    description:
      "A direct conversation with Dr. Md. Sirajur Rahman about what's on your mind.",
  },
  {
    number: "03",
    title: "Treatment",
    description:
      "Your procedure is carried out in the treatment room, at a measured, unhurried pace.",
  },
  {
    number: "04",
    title: "Follow-up",
    description:
      "Clear guidance on next steps and aftercare before you leave, so nothing feels uncertain.",
  },
];

export function WhatToExpect() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Scroll-driven activation: a thin band near the viewport's centre
  // (rootMargin collapses the observer's root to roughly its middle
  // 10%) rather than a full-viewport threshold, so the active stage
  // updates naturally as the visitor scrolls past each marker instead
  // of jumping the moment a step merely enters view. Purely reactive
  // to native scroll -- nothing here moves the scroll position itself.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = stepRefs.current.indexOf(entry.target as HTMLLIElement);
          if (index !== -1) setActiveStep(index);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const mediaStyle: CSSProperties = prefersReducedMotion
    ? {}
    : {
        transform: `scale(${1 + activeStep * 0.006}) translateY(${activeStep * -3}px)`,
      };

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      id="visit"
      aria-labelledby="visit-title"
    >
      {/* Patient-journey / architectural-map geometry -- a vertical
          drafting line, a horizontal registration line and two quiet
          red registration points, deliberately distinct from Section
          03's clinical blueprint grid and Section 05's quotation/arc
          motif. Purely decorative: aria-hidden, no figurative marks. */}
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.draftVertical} />
        <span className={styles.draftHorizontal} />
        <span className={styles.registrationDot} />
        <span className={styles.registrationDotSmall} />
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.numeral} aria-hidden="true">
            06
          </span>
          <div className={styles.eyebrow}>Patient experience / What to expect</div>
          <h2 id="visit-title" className={styles.title}>
            What to expect from a visit
            <br />
            to <span>NeoDent.</span>
          </h2>
          <p className={styles.lede}>
            A considered{" "}
            <EditorialHighlight tone="primary">dental appointment</EditorialHighlight>{" "}
            from the first hello to the final goodbye. Every stage is designed
            to keep you informed, comfortable and clear about what comes
            next. At{" "}
            <EditorialHighlight tone="secondary">
              NeoDent Dental Hospital
            </EditorialHighlight>
            ,{" "}
            <EditorialHighlight tone="quiet">specialist-led care</EditorialHighlight>{" "}
            is shaped around your concerns, with{" "}
            <EditorialHighlight tone="secondary">clear conversations</EditorialHighlight>{" "}
            and a{" "}
            <EditorialHighlight tone="quiet">
              measured approach to treatment
            </EditorialHighlight>
            . From your consultation to the care that follows, each stage is
            designed to make your experience feel{" "}
            <EditorialHighlight tone="primary">
              reassuring, personal and precise
            </EditorialHighlight>
            .
          </p>
        </header>

        <div className={styles.composition}>
          <figure className={styles.mediaCol}>
            <span className={styles.mediaOffsetFrame} aria-hidden="true" />
            <div className={styles.mediaFrame} style={mediaStyle}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={visitImage}
                alt="A patient treatment room inside a NeoDent Dental Hospital"
                loading="lazy"
              />
              <span className={styles.mediaRegistration} aria-hidden="true" />
              <div className={styles.mediaMeta}>
                <span>01 / YOUR VISIT</span>
              </div>
            </div>
          </figure>

          <div className={styles.bridge} aria-hidden="true">
            <span className={styles.bridgeLine} />
            <span className={styles.bridgeDot} />
          </div>

          <ol className={styles.journey}>
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              const segmentClass =
                index < steps.length - 1
                  ? index < activeStep
                    ? styles.segmentFilled
                    : index === activeStep
                      ? styles.segmentCurrent
                      : ""
                  : "";
              return (
                <li
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className={`${styles.step} ${isActive ? styles.stepActive : ""} ${isPast ? styles.stepPast : ""}`}
                  tabIndex={0}
                  aria-current={isActive ? "step" : undefined}
                  onMouseEnter={() => setActiveStep(index)}
                  onFocus={() => setActiveStep(index)}
                >
                  <span className={styles.markerColumn} aria-hidden="true">
                    <span className={styles.marker} />
                    {index < steps.length - 1 && (
                      <span className={`${styles.segment} ${segmentClass}`} />
                    )}
                  </span>
                  <div className={styles.stepContent}>
                    <span className={styles.stepNumber}>{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className={styles.ctaRow}>
          <a className={styles.cta} href="#contact">
            Explore your visit <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
