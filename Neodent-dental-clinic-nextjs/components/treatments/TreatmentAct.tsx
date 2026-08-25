"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Treatment } from "@/lib/treatment-data";
import styles from "./TreatmentAct.module.css";

interface TreatmentActProps {
  treatment: Treatment;
  index: number;
}

export function TreatmentAct({ treatment, index }: TreatmentActProps) {
  const [visible, setVisible] = useState(false);
  const actRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = actRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const hasBeforeAfter = !!treatment.beforeAfter;

  return (
    <article
      ref={actRef}
      className={`${styles.act} ${visible ? styles.visible : ""} ${hasBeforeAfter ? styles.withEvidence : ""}`}
      id={treatment.id}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className={styles.actContent}>
        <header className={styles.actHeader}>
          <div className={styles.actEyebrow}>{treatment.eyebrow}</div>
          <h2 className={styles.actTitle}>{treatment.title}</h2>
        </header>

        <div className={styles.actText}>{treatment.description}</div>

        {treatment.metadata && treatment.metadata.length > 0 && (
          <dl className={styles.metadata}>
            {treatment.metadata.map((item, i) => (
              <div key={i} className={styles.metadataItem}>
                <dt className={styles.metadataLabel}>{item.label}</dt>
                <dd className={styles.metadataValue}>{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {hasBeforeAfter && (
        <figure className={styles.evidencePlate}>
          <div className={styles.beforeAfter}>
            <div className={styles.caseImage}>
              <Image
                src={treatment.beforeAfter!.beforeSrc}
                alt={`${treatment.title} - ${treatment.beforeAfter!.beforeLabel}`}
                width={480}
                height={360}
                className={styles.image}
              />
              <span className={styles.caseLabel}>
                {treatment.beforeAfter!.beforeLabel}
              </span>
            </div>
            <div className={styles.caseImage}>
              <Image
                src={treatment.beforeAfter!.afterSrc}
                alt={`${treatment.title} - ${treatment.beforeAfter!.afterLabel}`}
                width={480}
                height={360}
                className={styles.image}
              />
              <span className={styles.caseLabel}>
                {treatment.beforeAfter!.afterLabel}
              </span>
            </div>
          </div>
          <figcaption className={styles.caption}>
            {treatment.beforeAfter!.caption}
          </figcaption>
        </figure>
      )}
    </article>
  );
}
