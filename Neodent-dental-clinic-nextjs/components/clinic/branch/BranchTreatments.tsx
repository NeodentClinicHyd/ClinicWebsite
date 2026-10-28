"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allTreatmentsHref, treatments as homeTreatments } from "@/components/sections/expertise-data";
import type { ClinicLocation } from "@/lib/clinic-data";
import { additionalServices } from "@/lib/treatment-data";
import { branchContent } from "./branch-content";
import { useReveal } from "../useReveal";
import shared from "../ClinicShared.module.css";
import styles from "./BranchTreatments.module.css";

/* ------------------------------------------------------------------
   Branch page -- featured treatments and additional dental services.

   Titles and destination URLs come from the shared clinic data
   (clinic.treatments). The one-line summary, action word and icon are
   the home page's own for the same treatment, matched by destination,
   so they cannot drift from the home "What can we help you with?"
   cards. The cards say the treatment is offered at the branch; they do
   not name a clinician for any treatment.
   ------------------------------------------------------------------ */

export function BranchTreatments({ clinic }: { clinic: ClinicLocation }) {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  const content = branchContent[clinic.slug];

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.ivory} ${shared.grid}`}
      id="treatments"
      aria-labelledby="branch-treatments-title"
    >
      <div className={shared.container}>
        <header className={styles.header} data-reveal>
          <h2 id="branch-treatments-title" className={shared.title}>
            {content.treatmentsTitle[0]} <span>{content.treatmentsTitle[1]}</span>
          </h2>
          <p className={`${shared.lede} ${styles.lede}`}>{content.treatmentsLede}</p>
        </header>

        <ul className={styles.grid} data-reveal>
          {clinic.treatments.map((treatment) => {
            const home = homeTreatments.find((item) => item.href === treatment.href);
            const Icon = home?.icon;
            return (
              <li key={treatment.id}>
                <Link href={treatment.href} className={styles.card}>
                  <span className={styles.cardTitle}>{treatment.title}</span>
                  {home && <span className={styles.cardSummary}>{home.summary}</span>}
                  <span className={styles.cardBottom}>
                    {Icon && <Icon className={styles.icon} aria-hidden="true" />}
                    <span className={styles.action}>
                      <span className={styles.intent}>
                        {home?.intent ?? "Explore"}
                      </span>
                      <ArrowRight className={styles.arrow} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <section className={styles.additional} aria-labelledby="branch-additional-title" data-reveal>
          <header className={styles.additionalHeader}>
            <h3 id="branch-additional-title" className={styles.additionalTitle}>
              Additional dental services
            </h3>
            <p className={styles.additionalIntro}>
              Neodent also provides the services below. The dentist can advise which options are suitable for your needs; contact this clinic to discuss your concern.
            </p>
          </header>
          <dl className={styles.additionalGroups}>
            {additionalServices.map((group) => (
              <div className={styles.additionalGroup} key={group.title}>
                <dt>{group.title}</dt>
                <dd>
                  <ul>
                    {group.services.map((service) => <li key={service}>{service}</li>)}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <p className={styles.all} data-reveal>
          <Link href={allTreatmentsHref} className={styles.allLink}>
            Explore all treatments
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
