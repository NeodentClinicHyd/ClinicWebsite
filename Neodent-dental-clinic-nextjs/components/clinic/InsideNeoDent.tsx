"use client";

import { useEffect, useRef, useState } from "react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { clinicGalleryImages } from "@/lib/site-data";
import { ClinicGalleryViewer } from "./ClinicGalleryViewer";
import styles from "./InsideNeoDent.module.css";

/* ------------------------------------------------------------------
   Clinic page — Section 03 — "Inside NeoDent".

   Warm ivory editorial surface. Design language inherits from the
   About page's LegacyAndPeople and the homepage's LegacyStory
   canonical reference (Section 02). Echoes the homepage's
   "Spaces designed around care" heading, but is a distinct
   composition — not a duplicate.

   Composition: heading + single paragraph, full width, followed by a
   dense editorial photo mosaic of every available branch photograph
   (Mehdipatnam: entrance, reception, director's office, two treatment
   chambers, two waiting areas; Nampally: reception/staircase and
   street frontage). Two frames (each branch's strongest interior) are
   given "feature" weight — a 2x2 plate rather than an equal card — and
   one frame ("Waiting hall") breaks the rhythm as a wide plate, so the
   mosaic reads as art-directed rather than a mechanical grid. Every
   tile carries a quiet bottom tag: branch name (red) paired with a
   short description of what the photograph shows (ivory) — the same
   text-over-shade convention used by SpacesDesignedAroundCare's
   .mediaMeta and ClinicalSettings' .branchPrimaryMeta, not a new
   pill/badge mechanism.

   Closes with a quiet geographic signature line:
   MEHDIPATNAM · NAMPALLY · HYDERABAD
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

export function InsideNeoDent() {
  const [sectionRef, sectionVisible] = useReveal<HTMLElement>(0.05);
  const [headerRef, headerVisible] = useReveal<HTMLDivElement>(0.1);
  const [galleryRef, galleryVisible] = useReveal<HTMLDivElement>(0.05);
  const [sigRef, sigVisible] = useReveal<HTMLDivElement>(0.1);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${sectionVisible ? styles.visible : ""}`}
      id="inside-neodent"
      aria-labelledby="inside-title"
    >
      {/* Chapter-start seam — constrained to container width */}
      <span className={styles.seam} aria-hidden="true" />

      {/* Atmosphere geometry */}
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.draftHorizontal} />
        <span className={styles.registrationDot} />
        <span className={styles.registrationDotSmall} />
      </div>

      <div className={styles.container}>
        {/* ---- Header + copy — full width, gallery follows below ---- */}
        <div
          ref={headerRef}
          className={`${styles.copyCol} ${headerVisible ? styles.blockVisible : ""}`}
        >
          <header className={styles.header}>
            <span className={styles.numeral} aria-hidden="true">
              03
            </span>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              03 / Inside NeoDent
            </div>
            <h2 id="inside-title" className={styles.title}>
              Spaces designed
              <br />
              <span>around care.</span>
            </h2>
          </header>

          <p className={styles.paragraph}>
            Across{" "}
            <EditorialHighlight tone="secondary">
              Mehdipatnam and Nampally
            </EditorialHighlight>
            , NeoDent&apos;s clinical spaces are shaped around the practical
            needs of dental care — from{" "}
            <EditorialHighlight tone="primary">
              consultation and treatment
            </EditorialHighlight>{" "}
            to follow-up. The surroundings differ between the two locations,
            but both reflect the same focus on clear, comfortable and{" "}
            <EditorialHighlight tone="quiet">
              clinically focused patient care
            </EditorialHighlight>
            .
          </p>
        </div>

        {/* ---- Photo mosaic — every available branch photograph ---- */}
        <div
          ref={galleryRef}
          className={`${styles.gallery} ${galleryVisible ? styles.galleryVisible : ""}`}
          aria-label="Photographs of NeoDent Dental Hospital, Mehdipatnam and Nampally"
        >
          {clinicGalleryImages.map((image, index) => (
            <figure
              key={image.src}
              className={`${styles.tile} ${image.span ? styles[image.span] : ""}`}
              style={{ transitionDelay: `${Math.min(index * 55, 420)}ms` }}
            >
              <button
                type="button"
                className={styles.tileButton}
                onClick={() => setViewerIndex(index)}
                aria-label={`View full photograph: ${image.branch} — ${image.label}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index < 2 ? "eager" : "lazy"}
                  style={image.position ? { objectPosition: image.position } : undefined}
                />
                <span className={styles.tileShade} aria-hidden="true" />
                <span className={styles.tileZoomHint} aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M15 15l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <figcaption className={styles.tileTag}>
                  <span className={styles.tileTagBranch}>{image.branch}</span>
                  <span className={styles.tileTagLabel}>{image.label}</span>
                </figcaption>
              </button>
            </figure>
          ))}
        </div>

        {/* ---- Closing geographic signature ---- */}
        <div
          ref={sigRef}
          className={`${styles.signature} ${sigVisible ? styles.blockVisible : ""}`}
          aria-label="NeoDent clinic locations"
        >
          <span className={styles.signatureTick} aria-hidden="true" />
          <span className={styles.signatureText}>
            Mehdipatnam
            <span className={styles.signatureDot} aria-hidden="true">·</span>
            Nampally
            <span className={styles.signatureDot} aria-hidden="true">·</span>
            Hyderabad
          </span>
        </div>
      </div>

      {/* ---- Gallery preview viewer ------------------------------- */}
      {viewerIndex !== null && (
        <ClinicGalleryViewer
          images={clinicGalleryImages}
          initialIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </section>
  );
}
