"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SwipeDots } from "@/components/pages/clinic-mehdipatnam/SwipeDots";
import type { ClinicLocation } from "@/lib/clinic-data";
import styles from "./BranchConnections.module.css";

/* ------------------------------------------------------------------
   Branch page -- S6 clinician and the other branch (light band).

   Two equal-height cards. The clinician listed for this branch in the
   shared data is a dark contained card linking to his existing profile;
   the other Neodent clinic is a light card with a small photograph
   (at most 160 px tall), its hours and a link. The copy deliberately
   says nothing about which treatments he provides at which branch.
   Below 1024px the two cards are one snap-scrolling row with dots, and
   the photograph is at most 120 px tall, so large images never stack.
   Beneath: a quiet link back to the /clinic overview.
   ------------------------------------------------------------------ */

export function BranchConnections({
  clinic,
  other,
}: {
  clinic: ClinicLocation;
  other: ClinicLocation;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const doctor = clinic.doctors[0];
  const thumb = other.primaryImage;
  const cards = doctor ? 2 : 1;

  return (
    <section
      className={styles.section}
      id="clinician-and-other-clinic"
      aria-label="Clinician and our other clinic"
    >
      <div className={styles.container}>
        <div ref={rowRef} className={styles.wrap}>
          <Reveal as="div" data-swipe stagger={100} className={styles.cards}>
            {doctor && (
              <article className={`${styles.card} ${styles.doctor}`} aria-labelledby="doctor-name">
                <div className={styles.body}>
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
                    <span className={styles.srOnly}> — {doctor.name}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            )}

            <article className={`${styles.card} ${styles.other}`} aria-labelledby="other-branch-name">
              <div className={styles.body}>
                <p className={styles.label}>Our other clinic</p>
                <h2 id="other-branch-name" className={styles.name}>
                  Neodent Dental Hospital, {other.name}
                </h2>
                <p className={styles.role}>{other.locality}</p>
                <p className={styles.text}>
                  Open {other.weeklyHours}, {other.hours}.
                </p>
                <Link href={`/clinic/${other.slug}`} className={styles.cardLink}>
                  Visit the {other.name} clinic page
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <figure className={styles.thumb}>
                <Image
                  src={thumb.src}
                  alt={thumb.alt}
                  fill
                  sizes="(min-width: 1024px) 200px, 70vw"
                  className={styles.thumbImage}
                />
              </figure>
            </article>
          </Reveal>
          <SwipeDots listRef={rowRef} count={cards} noun="Card" className={styles.dots} />
        </div>

        <p className={styles.overview}>
          <Link href="/clinic" className={styles.overviewLink}>
            <ArrowLeft size={15} aria-hidden="true" />
            Back to the clinic overview
          </Link>
        </p>
      </div>
    </section>
  );
}
