"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import type { ClinicLocation } from "@/lib/clinic-data";
import { branchContent } from "./branch-content";
import { useReveal } from "../useReveal";
import shared from "../ClinicShared.module.css";
import styles from "./BranchVisit.module.css";

/* ------------------------------------------------------------------
   Branch page -- closing red card.

   Pattern: the /clinic closing card (the home red statement card).
   Actions are this branch's own call number and directions, plus the
   shared /contact enquiry page.
   ------------------------------------------------------------------ */

export function BranchVisit({ clinic }: { clinic: ClinicLocation }) {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  const content = branchContent[clinic.slug];

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.ivory} ${styles.visit}`}
      id="visit"
      aria-labelledby="branch-visit-title"
    >
      <div className={shared.container}>
        <div className={styles.card} data-reveal>
          <h2 id="branch-visit-title" className={styles.title}>
            {content.visitTitle[0]} <em>{content.visitTitle[1]}</em>
          </h2>
          <div className={styles.actions}>
            <AppButton href={clinic.tel} variant="light">
              <Phone size={15} aria-hidden="true" /> Call {clinic.phone}
              <span className={shared.srOnly}> Neodent {clinic.name}</span>
            </AppButton>
            <a
              href={clinic.directions}
              target="_blank"
              rel="noopener noreferrer"
              className={`button button-ghost ${styles.ghost}`}
            >
              <MapPin size={15} aria-hidden="true" /> Get directions
              <span className={shared.srOnly}>
                {" "}
                to Neodent {clinic.name} (opens in a new tab)
              </span>
            </a>
            <Link href="/contact" className={`button button-ghost ${styles.ghost}`}>
              Send an enquiry <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
