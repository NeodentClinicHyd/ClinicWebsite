"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import {
  mehdipatnamExteriorImage,
  mehdipatnamInteriorImage,
  nampallyExteriorImage,
  nampallyInteriorImage,
  telPhone,
  nampallyTelPhone,
  directions,
  nampallyDirections,
} from "@/lib/site-data";
import styles from "./ClinicalSettings.module.css";

/* ------------------------------------------------------------------
   Clinic page — Section 02 — "Two Clinical Settings".

   Deep charcoal editorial surface — deliberate tonal shift from
   Section 01's ivory. Design language directly inherits from
   SpacesDesignedAroundCare and ClinicalLeadership: local
   --charcoal/--ivory/--muted/--red tokens, the same oversized serif
   chapter numeral, 10px/.2em eyebrow with a red hairline, and the
   same drafting/registration atmosphere vocabulary.

   Composition: two branches (Mehdipatnam, Nampally), each with an
   editorial exterior + interior image diptych, a concise branch
   description, address, phone, and a Get Directions link. The two
   branches are separated by a constrained editorial seam. Neither
   branch is a card — the information sits embedded in the page's
   compositional fabric.
   ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>(threshold = 0.1) {
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

export function ClinicalSettings() {
  const [sectionRef, sectionVisible] = useReveal<HTMLElement>(0.05);
  const [headerRef, headerVisible] = useReveal<HTMLDivElement>(0.1);
  const [mehdiRef, mehdiVisible] = useReveal<HTMLDivElement>(0.08);
  const [nampallyRef, nampallyVisible] = useReveal<HTMLDivElement>(0.08);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${sectionVisible ? styles.visible : ""}`}
      id="clinical-settings"
      aria-labelledby="settings-title"
    >
      {/* Chapter-start seam */}
      <span className={styles.seam} aria-hidden="true">
        <span className={styles.seamLabel}>02 / Clinical settings</span>
      </span>

      {/* Atmosphere geometry — site-plan / location-atlas vocabulary */}
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.draftVertical} />
        <span className={styles.draftHorizontal} />
        <span className={styles.registrationDot} />
        <span className={styles.registrationDotSmall} />
        <span className={styles.coordTag}>HYD</span>
      </div>

      <div className={styles.container}>
        {/* ---- Section header ---------------------------------------- */}
        <div
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.blockVisible : ""}`}
        >
          <span className={styles.numeral} aria-hidden="true">
            02
          </span>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            02 / Two Clinical Settings
          </div>
          <h2 id="settings-title" className={styles.title}>
            Different surroundings.
            <br />
            <span>The same approach to care.</span>
          </h2>
        </div>

        {/* ---- Branch 01 — Mehdipatnam ------------------------------- */}
        <div
          ref={mehdiRef}
          className={`${styles.branch} ${mehdiVisible ? styles.blockVisible : ""}`}
          id="mehdipatnam"
        >
          {/* Branch index label */}
          <div className={styles.branchIndex} aria-hidden="true">
            <span className={styles.branchIndexNum}>01</span>
            <span className={styles.branchIndexLine} />
          </div>

          <div className={styles.branchGrid}>
            {/* Image diptych — exterior (primary) + interior (secondary) */}
            <figure className={styles.branchMedia} aria-label="NeoDent Mehdipatnam — exterior and interior">
              <div className={styles.branchPrimary}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mehdipatnamExteriorImage}
                  alt="NeoDent Dental Hospital Mehdipatnam — carved entrance doorway and exterior"
                  loading="lazy"
                  style={{ objectPosition: "50% 36%" }}
                />
                <span className={styles.branchPrimaryShade} aria-hidden="true" />
                <div className={styles.branchPrimaryMeta}>
                  <span>01 / MEHDIPATNAM</span>
                  <span>Exterior</span>
                </div>
              </div>
              <div className={styles.branchSecondary}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mehdipatnamInteriorImage}
                  alt="NeoDent Dental Hospital Mehdipatnam — patient waiting lounge interior"
                  loading="lazy"
                  style={{ objectPosition: "68% 42%" }}
                />
                <span className={styles.branchSecondaryLabel}>Interior</span>
              </div>
            </figure>

            {/* Branch information */}
            <div className={styles.branchInfo}>
              <div className={styles.branchMeta}>
                <span className={styles.branchMetaLocation}>Mehdipatnam · Hyderabad</span>
                <span className={styles.branchMetaName}>NeoDent Dental Hospital</span>
              </div>

              <p className={styles.branchDescription}>
                NeoDent&apos;s{" "}
                <EditorialHighlight tone="primary" onDark>
                  Mehdipatnam clinic
                </EditorialHighlight>{" "}
                in Humayun Nagar is the original Hyderabad location, providing
                patients access to{" "}
                <EditorialHighlight tone="secondary" onDark>
                  specialist-led dental care
                </EditorialHighlight>{" "}
                across restorative, prosthodontic, implant and preventive needs
                — the practice that{" "}
                <EditorialHighlight tone="quiet" onDark>
                  began here in 1994
                </EditorialHighlight>{" "}
                and continues today.
              </p>

              {/* Address block */}
              <address className={styles.branchAddress}>
                <span className={styles.branchAddressIcon} aria-hidden="true">
                  <MapPin size={11} />
                </span>
                <span>
                  10-3-14B/11/1, Humayun Nagar Rd
                  <br />
                  near Azzia Masjid, Royal Colony
                  <br />
                  Humayun Nagar, Hyderabad 500006
                </span>
              </address>

              {/* Phone */}
              <a href={telPhone} className={styles.branchPhone} aria-label="Call NeoDent Mehdipatnam">
                <span className={styles.branchPhoneIcon} aria-hidden="true">
                  <Phone size={11} />
                </span>
                090306 48393
              </a>

              {/* Directions */}
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.branchDirections}
                aria-label="Get directions to NeoDent Mehdipatnam"
              >
                Get Directions
                <ArrowRight size={12} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* ---- Inter-branch editorial seam ----------------------------- */}
        <div className={styles.interSeam} aria-hidden="true">
          <span className={styles.interSeamLine} />
          <span className={styles.interSeamDot} />
          <span className={styles.interSeamLine} />
        </div>

        {/* ---- Branch 02 — Nampally ----------------------------------- */}
        <div
          ref={nampallyRef}
          className={`${styles.branch} ${styles.branchReverse} ${nampallyVisible ? styles.blockVisible : ""}`}
          id="nampally"
        >
          {/* Branch index label */}
          <div className={styles.branchIndex} aria-hidden="true">
            <span className={styles.branchIndexNum}>02</span>
            <span className={styles.branchIndexLine} />
          </div>

          <div className={styles.branchGrid}>
            {/* Branch information — left on this branch for asymmetry */}
            <div className={styles.branchInfo}>
              <div className={styles.branchMeta}>
                <span className={styles.branchMetaLocation}>Nampally · Hyderabad</span>
                <span className={styles.branchMetaName}>NeoDent Dental Hospital</span>
              </div>

              <p className={styles.branchDescription}>
                The{" "}
                <EditorialHighlight tone="primary" onDark>
                  Nampally clinic
                </EditorialHighlight>{" "}
                brings the same NeoDent clinical approach to central Hyderabad,
                supporting patients through{" "}
                <EditorialHighlight tone="secondary" onDark>
                  consultation, treatment planning, treatment and follow-up
                </EditorialHighlight>{" "}
                care within the{" "}
                <EditorialHighlight tone="quiet" onDark>
                  Medwin Hospital Complex
                </EditorialHighlight>
                .
              </p>

              {/* Address block */}
              <address className={styles.branchAddress}>
                <span className={styles.branchAddressIcon} aria-hidden="true">
                  <MapPin size={11} />
                </span>
                <span>
                  Medwin Hospital Complex
                  <br />
                  Pillar #A1270, Nampally
                  <br />
                  Hyderabad, Telangana 500001
                </span>
              </address>

              {/* Phone */}
              <a href={nampallyTelPhone} className={styles.branchPhone} aria-label="Call NeoDent Nampally">
                <span className={styles.branchPhoneIcon} aria-hidden="true">
                  <Phone size={11} />
                </span>
                090305 98081
              </a>

              {/* Directions */}
              <a
                href={nampallyDirections}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.branchDirections}
                aria-label="Get directions to NeoDent Nampally"
              >
                Get Directions
                <ArrowRight size={12} aria-hidden="true" />
              </a>
            </div>

            {/* Image diptych — exterior + interior */}
            <figure className={styles.branchMedia} aria-label="NeoDent Nampally — exterior and interior">
              <div className={styles.branchPrimary}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={nampallyExteriorImage}
                  alt="NeoDent Dental Hospital Nampally — street frontage and signage"
                  loading="lazy"
                  style={{ objectPosition: "50% 38%" }}
                />
                <span className={styles.branchPrimaryShade} aria-hidden="true" />
                <div className={styles.branchPrimaryMeta}>
                  <span>02 / NAMPALLY</span>
                  <span>Exterior</span>
                </div>
              </div>
              <div className={styles.branchSecondary}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={nampallyInteriorImage}
                  alt="NeoDent Dental Hospital Nampally — reception and consultation wing interior"
                  loading="lazy"
                  style={{ objectPosition: "50% 26%" }}
                />
                <span className={styles.branchSecondaryLabel}>Interior</span>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
