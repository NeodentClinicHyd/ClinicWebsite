"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ClinicLocation } from "@/lib/clinic-data";
import { photoSize } from "./branch-content";
import { useReveal } from "../useReveal";
import shared from "../ClinicShared.module.css";
import styles from "./BranchConnections.module.css";

/* ------------------------------------------------------------------
   Branch page -- clinician, the other branch and the overview.

   Left: the clinician listed for this branch in the shared data, linking
   to his existing profile. The copy deliberately says nothing about
   which treatments he provides at which branch. Right: a card for the
   other Neodent clinic (its hours and a photograph at its true aspect
   ratio). Beneath: a link back to the /clinic overview.
   ------------------------------------------------------------------ */

export function BranchConnections({
  clinic,
  other,
}: {
  clinic: ClinicLocation;
  other: ClinicLocation;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  const doctor = clinic.doctors[0];
  const thumb = other.primaryImage;
  const { width, height } = photoSize(thumb.src);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.ivory} ${styles.connections}`}
      id="clinician-and-other-clinic"
      aria-label="Clinician and our other clinic"
    >
      <div className={shared.container}>
        <div className={styles.cards}>
          {doctor && (
            <article
              className={`${styles.card} ${styles.doctor}`}
              aria-labelledby="doctor-name"
              data-reveal
            >
              <p className={styles.label}>Clinician · {clinic.name}</p>
              <h2 id="doctor-name" className={styles.name}>
                {doctor.name}
              </h2>
              <p className={styles.role}>{doctor.role}</p>
              <p className={styles.text}>
                His profile covers his background, qualifications and
                experience. If you would like to know which clinician is best
                placed to see you for a particular treatment, mention it when
                you call the clinic.
              </p>
              <Link href={doctor.href} className={styles.cardLink}>
                View his profile
                <span className={shared.srOnly}> — {doctor.name}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          )}

          <article
            className={`${styles.card} ${styles.other}`}
            aria-labelledby="other-branch-name"
            data-reveal
          >
            <div className={styles.otherCopy}>
              <p className={styles.label}>Our other clinic</p>
              <h2 id="other-branch-name" className={styles.name}>
                Neodent Dental Hospital, {other.name}
              </h2>
              <p className={styles.role}>{other.locality}</p>
              <p className={styles.text}>
                Open {other.weeklyHours}, {other.hours}.
              </p>
              <Link
                href={`/clinic/${other.slug}`}
                className={`${styles.cardLink} ${styles.cardLinkRed}`}
              >
                Visit the {other.name} clinic page
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <figure className={styles.thumb}>
              <Image
                src={thumb.src}
                alt={thumb.alt}
                width={width}
                height={height}
                sizes="160px"
                className={styles.thumbImage}
              />
            </figure>
          </article>
        </div>

        <p className={styles.overview} data-reveal>
          <Link href="/clinic" className={styles.overviewLink}>
            <ArrowLeft size={15} aria-hidden="true" />
            Back to the clinic overview
          </Link>
        </p>
      </div>
    </section>
  );
}
