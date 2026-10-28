"use client";

import { useRef } from "react";
import { MapPin, Phone, Star } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import type { ClinicLocation } from "@/lib/clinic-data";
import { branchContent } from "./branch-content";
import { useReveal } from "../useReveal";
import shared from "../ClinicShared.module.css";
import styles from "./BranchDetails.module.css";

/* ------------------------------------------------------------------
   Branch page -- local introduction + visit details.

   Left: this branch's own prose. Right: the About-style label / value
   facts in one inset panel (address, phone, hours, Google rating with
   its snapshot note), with the call and directions buttons. Every fact
   is read straight from the shared clinic data.
   ------------------------------------------------------------------ */

export function BranchDetails({ clinic }: { clinic: ClinicLocation }) {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  const content = branchContent[clinic.slug];

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.ivory} ${shared.grid} ${styles.details}`}
      id="visit-details"
      aria-labelledby="details-title"
    >
      <div className={`${shared.container} ${styles.layout}`}>
        <div className={styles.prose} data-reveal>
          <h2 id="details-title" className={shared.title}>
            {content.introTitle[0]} <span>{content.introTitle[1]}</span>
          </h2>
          <div className={styles.paragraphs}>
            {content.intro.map((paragraph) => (
              <p key={paragraph} className={shared.lede}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <aside
          className={styles.card}
          aria-labelledby="contact-card-title"
          data-reveal
        >
          <h3 id="contact-card-title" className={styles.cardTitle}>
            Visit &amp; contact
            <span className={shared.srOnly}> — Neodent {clinic.name}</span>
          </h3>

          <dl className={`${shared.facts} ${styles.facts}`}>
            <div className={shared.fact}>
              <dt>Address</dt>
              <dd>
                <address className={styles.address}>{clinic.address}</address>
              </dd>
            </div>
            <div className={shared.fact}>
              <dt>Phone</dt>
              <dd className={shared.strong}>
                <a
                  href={clinic.tel}
                  className={styles.phone}
                  aria-label={`Call Neodent ${clinic.name} on ${clinic.phone}`}
                >
                  {clinic.phone}
                </a>
              </dd>
            </div>
            <div className={shared.fact}>
              <dt>Hours</dt>
              <dd>
                {clinic.weeklyHours}
                <br />
                {clinic.hours} · {clinic.weeklyClosure}
              </dd>
            </div>
            <div className={shared.fact}>
              <dt>Google rating</dt>
              <dd>
                <span className={styles.rating}>
                  <Star size={15} aria-hidden="true" className={styles.star} />
                  <span>
                    <strong>{clinic.rating.score}</strong> / 5 from{" "}
                    {clinic.rating.count} Google reviews
                  </span>
                </span>
                <span className={styles.note}>{clinic.ratingNote}</span>
              </dd>
            </div>
          </dl>

          <div className={styles.actions}>
            <AppButton href={clinic.tel} variant="primary">
              <Phone size={15} aria-hidden="true" /> Call
              <span className={shared.srOnly}> Neodent {clinic.name}</span>
            </AppButton>
            <a
              href={clinic.directions}
              target="_blank"
              rel="noopener noreferrer"
              className={`button button-ghost ${styles.directions}`}
            >
              <MapPin size={15} aria-hidden="true" /> Get directions
              <span className={shared.srOnly}>
                {" "}
                to Neodent {clinic.name} (opens in a new tab)
              </span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
