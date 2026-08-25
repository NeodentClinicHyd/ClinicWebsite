"use client";

import { useEffect, useRef, useState } from "react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import {
  mehdipatnamExteriorImage,
  mehdipatnamInteriorImage,
} from "@/lib/site-data";
import styles from "./OurClinics.module.css";

/* ------------------------------------------------------------------
   Clinic page — Section 01 — "Our Clinics".

   Warm ivory editorial surface. Design language inherited directly
   from the About page's LegacyAndPeople component: oversized
   low-opacity serif chapter numeral bleeding into the eyebrow, DM
   Serif Display heading with a red-italic emphasis line, 10px/.2em
   uppercase eyebrow with a red hairline, and 15px/1.7 body copy.

   Composition: heading + two-paragraph narrative on the left, a
   large primary image (Mehdipatnam interior) with a smaller offset
   secondary image (exterior) on the right — an asymmetric editorial
   diptych, not a card grid. A location index (01 / MEHDIPATNAM,
   02 / NAMPALLY) closes the copy column as a quiet structural marker.

   This is the H1 section for the page.
   ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>(threshold = 0.14) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

export function OurClinics() {
  const [sectionRef, sectionVisible] = useReveal<HTMLElement>(0.06);
  const [headerRef, headerVisible] = useReveal<HTMLDivElement>(0.1);
  const [bodyRef, bodyVisible] = useReveal<HTMLDivElement>(0.1);
  const [mediaRef, mediaVisible] = useReveal<HTMLDivElement>(0.08);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${sectionVisible ? styles.visible : ""}`}
      id="our-clinics"
      aria-labelledby="clinic-title"
    >
      {/* Atmosphere geometry — inherits About/LegacyAndPeople vocabulary */}
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.arch} />
        <span className={styles.draftHorizontal} />
        <span className={styles.draftVertical} />
        <span className={styles.registrationDot} />
        <span className={styles.registrationDotSmall} />
      </div>

      {/* Top seam — chapter-start hairline */}
      <span className={styles.seam} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.composition}>
          {/* ---- LEFT — header + copy + location index ---- */}
          <div className={styles.copyCol}>
            <div
              ref={headerRef}
              className={`${styles.header} ${headerVisible ? styles.blockVisible : ""}`}
            >
              <span className={styles.numeral} aria-hidden="true">
                01
              </span>
              <div className={styles.eyebrow}>
                <span aria-hidden="true" className={styles.eyebrowRule} />
                01 / Our Clinics
              </div>
              <h1 id="clinic-title" className={styles.title}>
                Two locations.
                <br />
                <span>One NeoDent standard.</span>
              </h1>
            </div>

            <div
              ref={bodyRef}
              className={`${styles.body} ${bodyVisible ? styles.blockVisible : ""}`}
            >
              <p className={styles.paragraph}>
                NeoDent Dental Hospitals provides{" "}
                <EditorialHighlight tone="primary">
                  specialist-led dental care
                </EditorialHighlight>{" "}
                across two Hyderabad locations — in{" "}
                <EditorialHighlight tone="secondary">
                  Mehdipatnam and Nampally
                </EditorialHighlight>
                . Each clinic serves patients seeking restorative, implant,
                prosthodontic, preventive and smile-focused treatment within
                the same{" "}
                <EditorialHighlight tone="quiet">
                  NeoDent clinical environment
                </EditorialHighlight>
                .
              </p>
              <p className={styles.paragraph}>
                While the settings differ in character and location, both
                clinics follow the same{" "}
                <EditorialHighlight tone="primary">
                  patient-focused approach
                </EditorialHighlight>{" "}
                to consultation, treatment planning and follow-up care — the
                approach that has{" "}
                <EditorialHighlight tone="secondary">
                  defined NeoDent since 1994
                </EditorialHighlight>
                , carried forward across{" "}
                <EditorialHighlight tone="quiet">
                  both Hyderabad branches
                </EditorialHighlight>
                .
              </p>

              {/* Location index */}
              <div className={styles.locationIndex} aria-label="NeoDent clinic locations">
                <div className={styles.locationIndexSeam} aria-hidden="true" />
                <ol className={styles.locationIndexList}>
                  <li className={styles.locationIndexItem}>
                    <span className={styles.locationIndexNum} aria-hidden="true">01</span>
                    <div className={styles.locationIndexDetail}>
                      <span className={styles.locationIndexName}>Mehdipatnam</span>
                      <span className={styles.locationIndexSub}>Humayun Nagar · Hyderabad</span>
                    </div>
                    <span className={styles.locationIndexTick} aria-hidden="true" />
                  </li>
                  <li className={styles.locationIndexItem}>
                    <span className={styles.locationIndexNum} aria-hidden="true">02</span>
                    <div className={styles.locationIndexDetail}>
                      <span className={styles.locationIndexName}>Nampally</span>
                      <span className={styles.locationIndexSub}>Medwin Hospital Complex · Hyderabad</span>
                    </div>
                    <span className={styles.locationIndexTick} aria-hidden="true" />
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* ---- RIGHT — editorial image diptych ---- */}
          <figure
            ref={mediaRef}
            className={`${styles.mediaCol} ${mediaVisible ? styles.blockVisible : ""}`}
            aria-label="NeoDent clinic interior photographs"
          >
            {/* Primary plate — Mehdipatnam interior */}
            <div className={styles.primaryWrap}>
              <span className={styles.primaryOffsetFrame} aria-hidden="true" />
              <div className={styles.primaryFrame}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mehdipatnamInteriorImage}
                  alt="NeoDent Dental Hospital, Mehdipatnam — patient waiting lounge interior"
                  loading="eager"
                  style={{ objectPosition: "68% 42%" }}
                />
                <span className={styles.mediaShade} aria-hidden="true" />
                <span className={styles.mediaRegistration} aria-hidden="true" />
                <div className={styles.mediaMeta}>
                  <span>01 / MEHDIPATNAM</span>
                  <span>Hyderabad</span>
                </div>
              </div>
            </div>

            {/* Secondary plate — exterior, offset over primary */}
            <div className={styles.secondaryFrame}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mehdipatnamExteriorImage}
                alt="NeoDent Dental Hospital, Mehdipatnam — exterior entrance"
                loading="eager"
                style={{ objectPosition: "62% 32%" }}
              />
              <span className={styles.secondaryLabel}>Entrance</span>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
