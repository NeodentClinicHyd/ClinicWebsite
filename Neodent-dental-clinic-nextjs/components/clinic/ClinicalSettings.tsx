"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  clinicGalleryImages,
  mehdipatnamTreatmentRoomTwoImage,
  nampallyInteriorImage,
} from "@/lib/site-data";
import { useReveal } from "./useReveal";
import shared from "./ClinicShared.module.css";
import styles from "./ClinicalSettings.module.css";

/* ------------------------------------------------------------------
   Clinic -- "Different surroundings."

   Pattern: "What can we help you with?" -- light cards on a dark
   ground (the atlas card: 16px radius, #f3f0e8 surface, 19px / 600
   title, 14px line). Three different card types: one tall photograph
   card per branch, and the page's one solid red feature card (the
   LegacyStory / About "Recognition" card) carrying the existing line
   about the shared clinical approach.

   Alt text, captions and crops come from clinicGalleryImages, so each
   photograph keeps the branch it already belongs to.
   ------------------------------------------------------------------ */

const fromGallery = (src: string) => {
  const image = clinicGalleryImages.find((item) => item.src === src);
  if (!image) throw new Error(`Unknown clinic gallery image: ${src}`);
  return image;
};

const photoCards = [
  { image: fromGallery(mehdipatnamTreatmentRoomTwoImage), side: "left" },
  { image: fromGallery(nampallyInteriorImage), side: "right" },
] as const;

export function ClinicalSettings() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.dark} ${shared.charcoal}`}
      id="clinical-settings"
      aria-labelledby="settings-title"
    >
      <div className={shared.container}>
        <h2 id="settings-title" className={shared.title} data-reveal>
          Different surroundings. <span>The same approach to care.</span>
        </h2>

        <div className={styles.cards}>
          {photoCards.map(({ image, side }) => (
            <figure
              key={image.src}
              className={`${styles.photoCard} ${styles[side]}`}
              data-reveal
            >
              <div className={styles.photo}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 377px, 46vw"
                  style={{ objectPosition: image.position }}
                />
              </div>
              <figcaption className={styles.photoCaption}>
                <span className={styles.photoTitle}>{image.branch}</span>
                <span className={styles.photoLine}>{image.label}</span>
              </figcaption>
            </figure>
          ))}

          <div className={styles.red} data-reveal>
            <p className={styles.redText}>
              While the settings differ in character and location, both
              clinics follow the same <em>patient-focused approach</em> to
              consultation, treatment planning and follow-up care — the
              approach that has <em>defined Neodent since 1994</em>, carried
              forward across both Hyderabad branches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
