"use client";

import { useEffect, useRef, useState } from "react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import styles from "./TreatmentsHero.module.css";

export function TreatmentsHero() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        const video = videoRef.current;
        if (!video) return;
        
        // Respect reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (entry.isIntersecting && !prefersReducedMotion) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="treatments-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.draftLine} />
        <span className={styles.draftLineVertical} />
        <span className={styles.draftLineHorizontal} />
        <span className={styles.arc} />
        <span className={styles.registrationDot} />
        <span className={styles.registrationDotSecondary} />
        <span className={styles.registrationDotTertiary} />
      </div>

      <div className={styles.container}>
        <div className={styles.editorial}>
          <header className={styles.header}>
            <span className={styles.numeral} aria-hidden="true">01</span>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowRule} />
              Dental Expertise / Treatments
            </div>
            <h1 id="treatments-title" className={styles.title}>
              Dental care for the concerns that <span>bring you to NeoDent.</span>
            </h1>
          </header>

          <div className={styles.narrative}>
            <p className={styles.paragraph}>
              From{" "}
              <EditorialHighlight tone="primary" onDark>
                dental implants
              </EditorialHighlight>
              {" "}and{" "}
              <EditorialHighlight tone="secondary" onDark>
                full mouth rehabilitation
              </EditorialHighlight>
              {" "}to orthodontic alignment, root canal treatment, crowns, dentures, veneers and smile-focused{" "}
              <EditorialHighlight tone="quiet" onDark>
                cosmetic dentistry
              </EditorialHighlight>
              , NeoDent brings different areas of dental care together around the concerns that matter to each patient. Whether the concern is a missing tooth, damaged or worn teeth, tooth pain, difficulty chewing, changes in alignment or the appearance of a smile, the right treatment begins with understanding what is happening clinically and what the patient wants to achieve.
            </p>

            <p className={styles.paragraph}>
              Every treatment begins with{" "}
              <EditorialHighlight tone="primary" onDark>
                careful assessment
              </EditorialHighlight>
              {" "}rather than a one-size-fits-all approach. The condition of the teeth and gums,{" "}
              <EditorialHighlight tone="secondary" onDark>
                bite and function
              </EditorialHighlight>
              , existing dental work, overall oral health and the patient's treatment goals can all influence the treatment plan. Depending on the concern, care may involve restorative dentistry, prosthodontics, implant dentistry, orthodontics or{" "}
              <EditorialHighlight tone="quiet" onDark>
                cosmetic treatment
              </EditorialHighlight>
              , with the approach shaped around what is clinically appropriate.
            </p>

            <p className={styles.paragraph}>
              For more complex concerns, treatment may involve several stages or more than one area of dentistry. Full mouth rehabilitation, for example, can require careful coordination of restorative and prosthodontic treatment to address multiple functional and dental concerns together. Similarly, replacing missing teeth with dental implants involves assessment, planning and restoration rather than simply placing an implant.
            </p>

            <p className={styles.paragraph}>
              Across these treatments, NeoDent's approach remains focused on clear clinical explanation, thoughtful planning and care that considers{" "}
              <EditorialHighlight tone="primary" onDark>
                oral health, function and appearance
              </EditorialHighlight>
              {" "}together. With locations in{" "}
              <EditorialHighlight tone="secondary" onDark>
                Mehdipatnam and Nampally, Hyderabad
              </EditorialHighlight>
              , the practice provides access to a broad range of{" "}
              <EditorialHighlight tone="quiet" onDark>
                specialist-led dental treatment
              </EditorialHighlight>
              {" "}within the same clinical environment.
            </p>
          </div>
        </div>

        <div className={styles.mediaPlate}>
          <div className={styles.videoFrame}>
            <video
              ref={videoRef}
              className={styles.video}
              poster="/assets/dr-miftah/Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital.png"
              preload="metadata"
              playsInline
              controls
              muted
              loop
              aria-label="Dr. Md. Miftah Ur Rahman explains DMLS crowns and masticatory efficiency"
            >
              <source
                src="/assets/treatment-video/dr-miftah-explains-dmls-crowns-masticatory-efficiency.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className={styles.videoMetadata}>
            <span className={styles.metadataLabel}>Clinical Education</span>
            <span className={styles.metadataName}>Dr. Md. Miftah Ur Rahman</span>
            <span className={styles.metadataCredentials}>BDS · MDS · FICOI (U.S.A.)</span>
            <span className={styles.metadataSpecialty}>Prosthodontist & Implantologist</span>
            <span className={styles.metadataTopic}>DMLS Crowns / Masticatory Efficiency</span>
          </div>
        </div>
      </div>
    </section>
  );
}
