"use client";

import { useRef } from "react";
import type { ClinicLocation } from "@/lib/clinic-data";
import { useReveal } from "../useReveal";
import shared from "../ClinicShared.module.css";
import styles from "./BranchPatientStory.module.css";

/** A branch-specific patient film with the verified words shown alongside it. */
export function BranchPatientStory({ clinic }: { clinic: ClinicLocation }) {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.ivory} ${styles.section}`}
      id="patient-story"
      aria-labelledby="branch-story-title"
    >
      <div className={shared.container}>
        <header className={styles.header} data-reveal>
          <h2 id="branch-story-title" className={shared.title}>
            A patient’s experience <span>in their own words.</span>
          </h2>
          <p className={`${shared.lede} ${styles.lede}`}>
            Hear from a patient who shared their experience after care at
            Neodent Dental Hospital, {clinic.name}.
          </p>
        </header>

        <figure className={styles.story} data-reveal>
          <div className={styles.videoFrame}>
            <video
              controls
              playsInline
              preload="metadata"
              aria-label={clinic.patientStory.alt}
            >
              <source src={clinic.patientStory.video} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </div>
          <figcaption className={styles.caption}>
            <span className={styles.captionLabel}>
              Patient testimonial · {clinic.name}
            </span>
            <blockquote>&ldquo;{clinic.patientStory.quote}&rdquo;</blockquote>
            <p>
              Shared with permission. Individual experiences vary; your dentist
              can explain what to expect for your care.
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
