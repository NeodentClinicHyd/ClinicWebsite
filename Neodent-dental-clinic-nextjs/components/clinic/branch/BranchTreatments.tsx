"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SwipeDots } from "@/components/pages/clinic-mehdipatnam/SwipeDots";
import { allTreatmentsHref, treatments as homeTreatments } from "@/components/sections/expertise-data";
import type { ClinicLocation } from "@/lib/clinic-data";
import { additionalServices } from "@/lib/treatment-data";
import { branchContent } from "./branch-content";
import styles from "./BranchTreatments.module.css";

/* ------------------------------------------------------------------
   Branch page -- S4 featured treatments and additional dental services.

   Titles and destination URLs come from the shared clinic data
   (clinic.treatments). The one-line summary, action word and icon are
   the home page's own for the same treatment, matched by destination,
   so they cannot drift from the home "What can we help you with?"
   cards. The cards say the treatment is offered at the branch; they do
   not name a clinician for any treatment.

   Layout: heading in plain ink (no red italic). Desktop: a four-column
   grid; the seven cards, then the existing "Explore all treatments"
   link as a dark eighth card (moved here, not duplicated). Below
   1024px the same eight cells are one snap-scrolling row with dots.
   Each card's DOM order (title, summary, action word) is unchanged;
   the icon is moved to the top with CSS. The additional services are a
   wide panel under the grid: heading and intro left, the groups as
   chip lists right. Every item is kept.
   ------------------------------------------------------------------ */

export function BranchTreatments({ clinic }: { clinic: ClinicLocation }) {
  const content = branchContent[clinic.slug];
  const rowRef = useRef<HTMLDivElement>(null);
  const cells = clinic.treatments.length + 1;

  return (
    <section className={styles.section} id="treatments" aria-labelledby="branch-treatments-title">
      <div className={styles.container}>
        <header className={styles.head}>
          <Reveal as="h2" variant="mask" stagger={90} id="branch-treatments-title" className={styles.title}>
            <span>{content.treatmentsTitle[0]} </span>
            <span>{content.treatmentsTitle[1]}</span>
          </Reveal>
          <Reveal as="p" className={styles.support} delay={140}>
            {content.treatmentsLede}
          </Reveal>
        </header>

        <div ref={rowRef} className={styles.wrap}>
          <Reveal as="ul" data-swipe stagger={90} className={styles.grid} tabIndex={0} aria-label="Featured dental treatments">
            {clinic.treatments.map((treatment) => {
              const home = homeTreatments.find((item) => item.href === treatment.href);
              const Icon = home?.icon;
              return (
                <li key={treatment.id} className={styles.item}>
                  <Link href={treatment.href} className={styles.card}>
                    <span className={styles.cardTitle}>{treatment.title}</span>
                    {home && <span className={styles.cardSummary}>{home.summary}</span>}
                    <span className={styles.cardBottom}>
                      {Icon && <Icon className={styles.icon} aria-hidden="true" />}
                      <span className={styles.action}>
                        <span className={styles.intent}>{home?.intent ?? "Explore"}</span>
                        <ArrowRight className={styles.arrow} aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
            <li className={styles.item}>
              <div className={`${styles.card} ${styles.all}`}>
                <Link href={allTreatmentsHref} className={styles.allLink}>
                  Explore all treatments
                  <ArrowRight className={styles.arrow} aria-hidden="true" />
                </Link>
              </div>
            </li>
          </Reveal>
          <SwipeDots listRef={rowRef} count={cells} noun="Treatment" className={styles.dots} />
        </div>

        <Reveal
          as="section"
          className={styles.additional}
          aria-labelledby="branch-additional-title"
        >
          <header className={styles.additionalHeader}>
            <h3 id="branch-additional-title" className={styles.additionalTitle}>
              Additional dental services
            </h3>
            <p className={styles.additionalIntro}>
              Neodent also provides the services below. The dentist can advise which options are suitable for your needs; contact this clinic to discuss your concern.
            </p>
          </header>
          <dl className={styles.groups}>
            {additionalServices.map((group) => (
              <div className={styles.group} key={group.title}>
                <dt>{group.title}</dt>
                <dd>
                  <ul>
                    {group.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
