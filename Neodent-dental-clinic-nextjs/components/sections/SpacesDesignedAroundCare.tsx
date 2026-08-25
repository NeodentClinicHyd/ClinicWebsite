"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  mehdipatnamExteriorImage,
  mehdipatnamInteriorImage,
  nampallyExteriorImage,
  nampallyInteriorImage,
} from "@/lib/site-data";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import styles from "./SpacesDesignedAroundCare.module.css";

/* ------------------------------------------------------------------
   Homepage Section 07 — "Spaces designed around care."

   Answers where the NeoDent experience actually happens: the two
   Hyderabad branches. An editorial location atlas rather than two
   generic location cards -- a single dominant image plate (large
   primary + an offset secondary plate) switches as one coordinated
   unit with an 01/02 branch selector, a short description and its
   metadata, exactly like Section 05's story stage / Section 06's
   media plate switch on a single active index rather than rendering
   both branches at once.

   PRIMARY / SECONDARY IMAGE CHOICE (art-directed, not mechanical):
   Of the four real branch photographs, each pairing below was chosen
   after visual inspection for which frame carries the strongest
   architectural/spatial storytelling at large size, with the second
   frame chosen to complement rather than repeat that viewpoint:
     Mehdipatnam -> primary = interior (the waiting lounge corridor,
       strong converging perspective, chandelier as a focal point);
       secondary = exterior (the carved wooden entrance threshold).
     Nampally -> primary = interior (the double-height reception with
       its red staircase and mezzanine -- the strongest, most dramatic
       frame of all four, and closest in tone to the brand's red);
       secondary = exterior (the street-level signage/frontage).
   This deliberately differs from the Hero's Nampally plate/inset
   assignment (which was driven by native photo resolution, not
   composition) -- no new assets are introduced, only a different,
   more considered pairing for this section's larger presentation.

   Dark editorial surface -- a tonal shift from the light Sections 05
   and 06 immediately before it, and from TrustStrip immediately
   after, so Section 07 reads as a deliberate new chapter rather than
   a continuation. Scoped entirely to `.section`'s local CSS variables
   (mirroring ClinicalLeadership's dark-surface token pattern); nothing
   here edits globals.css or any locked section (01-06). ------------------------------------------------------------------ */

type BranchImage = { src: string; alt: string; position?: string; label: string };
type Branch = {
  index: "01" | "02";
  name: string;
  meta: string;
  description: string;
  primary: BranchImage;
  secondary: BranchImage;
};

const branches: Branch[] = [
  {
    index: "01",
    name: "Mehdipatnam",
    meta: "Mehdipatnam · Hyderabad",
    description:
      "A long-established NeoDent location in Hyderabad, bringing the clinic's patient-focused approach into a familiar, dedicated dental setting.",
    primary: {
      src: mehdipatnamInteriorImage,
      alt: "NeoDent Dental Hospital Mehdipatnam — the patient waiting lounge",
      // Shifted right of centre so the crop favours the corridor's
      // converging perspective and chandelier rather than the
      // promotional wall posters on the far left.
      position: "68% 42%",
      label: "Waiting lounge",
    },
    secondary: {
      src: mehdipatnamExteriorImage,
      alt: "NeoDent Dental Hospital Mehdipatnam — the carved entrance doorway",
      position: "62% 32%",
      label: "Entrance",
    },
  },
  {
    index: "02",
    name: "Nampally",
    meta: "Nampally · Hyderabad",
    description:
      "A NeoDent location in Hyderabad offering the same patient-focused approach across consultation, treatment and follow-up care.",
    primary: {
      src: nampallyInteriorImage,
      alt: "NeoDent Dental Hospital Nampally — the reception and consultation wing",
      // Keeps the double-height ceiling and red staircase visible;
      // the busy tiled floor at the very bottom is the least
      // interesting part of the frame, so it is the first to crop.
      position: "50% 26%",
      label: "Reception",
    },
    secondary: {
      src: nampallyExteriorImage,
      alt: "NeoDent Dental Hospital Nampally — the street frontage and signage",
      position: "50% 38%",
      label: "Street frontage",
    },
  },
];

export function SpacesDesignedAroundCare() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [switching, setSwitching] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const active = branches[activeIndex];

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

  const selectBranch = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;

    if (prefersReducedMotion) {
      setActiveIndex(nextIndex);
      return;
    }

    // Crossfade the media plate + description as one coordinated unit,
    // matching PatientStories' story-switch pattern: fade out, swap
    // once hidden, fade back in. Frame aspect ratios stay fixed, so
    // section height never jumps mid-transition.
    setSwitching(true);
    window.setTimeout(() => {
      setActiveIndex(nextIndex);
      window.setTimeout(() => setSwitching(false), 20);
    }, 220);
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      id="clinics"
      aria-labelledby="clinics-title"
    >
      {/* Chapter-start seam -- top hairline + centred registration tick
          carrying the section's own micro-label, matching
          ClinicalLeadership's chapter-boundary mechanic. */}
      <span className={styles.seam} aria-hidden="true">
        <span className={styles.seamLabel}>07 / Location atlas</span>
      </span>

      {/* Architectural / location-atlas geometry -- a drafting cross
          near the media plate, two quiet red registration ticks and a
          compact coordinate-style tag. Deliberately distinct from
          Section 02's archive arches, Section 03's treatment grid,
          Section 04's portrait crosshairs and Section 06's journey
          rail: this is the site's only "site plan" motif, and it stays
          purely decorative (aria-hidden, no map pins, no literal map). */}
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.draftVertical} />
        <span className={styles.draftHorizontal} />
        <span className={styles.registrationDot} />
        <span className={styles.registrationDotSmall} />
        <span className={styles.coordTag}>HYD</span>
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.numeral} aria-hidden="true">
            07
          </span>
          <div className={styles.eyebrow}>NeoDent / Our clinics</div>
          <h2 id="clinics-title" className={styles.title}>
            Spaces designed
            <br />
            <span>around care.</span>
          </h2>
          <p className={styles.lede}>
            Across Mehdipatnam and Nampally, NeoDent brings the same{" "}
            <EditorialHighlight tone="primary" onDark>
              patient-focused approach
            </EditorialHighlight>{" "}
            into spaces designed for focused, comfortable dental care.
          </p>
        </header>

        <div className={styles.composition}>
          <div className={styles.panel}>
            <nav className={styles.selector} aria-label="Choose a NeoDent clinic location">
              <ol>
                {branches.map((branch, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <li key={branch.index}>
                      <button
                        type="button"
                        className={`${styles.selectorItem} ${isActive ? styles.selectorItemActive : ""}`}
                        onClick={() => selectBranch(index)}
                        aria-current={isActive ? "true" : undefined}
                        aria-label={`${branch.index}: ${branch.name}, NeoDent Dental Hospital, Hyderabad`}
                      >
                        <span className={styles.selectorIndex}>{branch.index}</span>
                        <span className={styles.selectorLabelGroup}>
                          <span className={styles.selectorName}>{branch.name}</span>
                          <span className={styles.selectorSub}>
                            NeoDent Dental Hospital
                            <br />
                            Hyderabad
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <p className={`${styles.description} ${switching ? styles.descriptionSwitching : ""}`}>
              {active.description}
            </p>
            <p className={`${styles.meta} ${switching ? styles.descriptionSwitching : ""}`}>{active.meta}</p>
            {active.index === "02" && (
              <p
                className={`${styles.description} ${styles.extended} ${switching ? styles.descriptionSwitching : ""}`}
              >
                At{" "}
                <EditorialHighlight tone="secondary" onDark>
                  NeoDent Dental Hospital, Nampally
                </EditorialHighlight>
                , patients can access{" "}
                <EditorialHighlight tone="primary" onDark>
                  multi-speciality dental care
                </EditorialHighlight>{" "}
                in a clinical environment built around clear consultations and
                personalised treatment. The team provides focused care across
                preventive, restorative and more complex dental needs, with
                attention to comfort and long-term oral health. Located in
                Nampally, Hyderabad, the clinic extends the same NeoDent
                approach to{" "}
                <EditorialHighlight tone="quiet" onDark>
                  specialist-led care and thoughtful patient support
                </EditorialHighlight>
                .
              </p>
            )}
          </div>

          {/* Connector -- a short hairline + registration dot bridging
              the active location row to the media plate's top-left
              corner, so the selector and photograph read as one
              registered composition (SELECTED -> FEATURED SPACE)
              rather than two parallel columns. Purely decorative. */}
          <div className={styles.connector} aria-hidden="true">
            <span className={styles.connectorLine} />
            <span className={styles.connectorDot} />
          </div>

          <figure className={styles.mediaCol}>
            <div className={styles.primaryWrap}>
              <span className={styles.primaryOffsetFrame} aria-hidden="true" />
              <div className={`${styles.primaryFrame} ${switching ? styles.frameSwitching : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.primary.src}
                  alt={active.primary.alt}
                  loading="lazy"
                  style={active.primary.position ? { objectPosition: active.primary.position } : undefined}
                />
                <span className={styles.mediaShade} aria-hidden="true" />
                <span className={styles.mediaRegistration} aria-hidden="true" />
                <div className={styles.mediaMeta}>
                  <span>
                    {active.index} / {active.name.toUpperCase()}
                  </span>
                  <span>Hyderabad</span>
                </div>
              </div>
            </div>

            <div className={`${styles.secondaryFrame} ${switching ? styles.frameSwitching : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.secondary.src}
                alt={active.secondary.alt}
                loading="lazy"
                style={active.secondary.position ? { objectPosition: active.secondary.position } : undefined}
              />
              <span className={styles.secondaryLabel}>{active.secondary.label}</span>
            </div>
          </figure>
        </div>

        {/* Closing beat -- brand line and CTA share one row bound by a
            single top rule, so "Two locations. One NeoDent standard."
            and "Explore our clinics" read as one intentional final
            statement rather than two separately-spaced elements. */}
        <div className={styles.ctaRow}>
          <p className={styles.brandLine}>
            <span className={styles.brandLineTick} aria-hidden="true" />
            Two locations. One NeoDent standard.
          </p>
          <a href="/clinic" className={styles.cta}>
            Explore our clinics <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
