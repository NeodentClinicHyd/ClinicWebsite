"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import styles from "./BeforeAfterCases.module.css";

const cases = [
  {
    id: "smile-design",
    title: "Anterior Smile Design",
    description: "Smile restoration following an accident, using zirconia crowns",
    before: "/assets/treatment/Neodent dental hospital Hyderabad - Anterior Smile design of an accident case with zirconia crowns -before treatment.jpg",
    after: "/assets/treatment/Neodent dental hospital Hyderabad - Anterior Smile design of an accident case with zirconia crowns -after treatment.jpg",
    alt: "Anterior smile design case at NeoDent",
  },
  {
    id: "full-mouth-mehdipatnam",
    title: "Full Mouth Rehabilitation with Implants",
    description: "Comprehensive rehabilitation using dental implants at Mehdipatnam",
    before: "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - before surgery.jpg",
    after: "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - after surgery.jpg",
    alt: "Full mouth rehabilitation case at NeoDent Mehdipatnam",
  },
  {
    id: "upper-arch-nampally",
    title: "Upper Arch Rehabilitation with Implants",
    description: "Upper arch restoration using implant-supported prosthetics at Nampally",
    before: "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - before surgery.jpg",
    after: "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - after surgery.jpg",
    alt: "Upper arch rehabilitation case at NeoDent Nampally",
  },
  {
    id: "scaling-polishing",
    title: "Scaling & Polishing",
    description: "Professional cleaning and polishing treatment",
    before: "/assets/treatment/neodent dental hospital mehdipatnam - scaling and polishing treatment before.jpg",
    after: "/assets/treatment/neodent dental hospital mehdipatnam - scaling and polishing treatment after.jpg",
    alt: "Scaling and polishing treatment at NeoDent",
  },
];

export function BeforeAfterCases() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="cases-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.numeral} aria-hidden="true">05</span>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            05 / Treatment outcomes
          </div>
          <h2 id="cases-title" className={styles.title}>
            Real cases.<br /><span>Visible outcomes.</span>
          </h2>
          <p className={styles.lead}>
            Selected cases from NeoDent showing{" "}
            <EditorialHighlight tone="primary">
              treatment outcomes
            </EditorialHighlight>{" "}
            across{" "}
            <EditorialHighlight tone="secondary">
              restorative, implant and smile procedures
            </EditorialHighlight>
            . Each case reflects the{" "}
            <EditorialHighlight tone="quiet">
              clinical work carried out at NeoDent
            </EditorialHighlight>
            .
          </p>
        </header>

        <div className={styles.grid}>
          {cases.map((caseItem, index) => (
            <article
              key={caseItem.id}
              className={styles.case}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={styles.comparison}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={caseItem.before}
                    alt={`${caseItem.alt} - before treatment`}
                    width={600}
                    height={400}
                    className={styles.image}
                  />
                  <span className={styles.label}>Before</span>
                </div>
                <div className={styles.imageWrapper}>
                  <Image
                    src={caseItem.after}
                    alt={`${caseItem.alt} - after treatment`}
                    width={600}
                    height={400}
                    className={styles.image}
                  />
                  <span className={styles.label}>After</span>
                </div>
              </div>
              <div className={styles.caseContent}>
                <h3 className={styles.caseTitle}>{caseItem.title}</h3>
                <p className={styles.caseDescription}>{caseItem.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
