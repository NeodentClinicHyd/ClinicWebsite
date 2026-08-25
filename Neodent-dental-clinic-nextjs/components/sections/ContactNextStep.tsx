"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  directions,
  nampallyDirections,
  nampallyTelPhone,
  telPhone,
} from "@/lib/site-data";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import styles from "./ContactNextStep.module.css";

/* ------------------------------------------------------------------
   Homepage Section 08 — "The Next Step / Get in Touch".

   The homepage's closing chapter: after the experience, legacy,
   treatments, people, patient stories, visit journey and clinics,
   this section answers one remaining question -- how do I actually
   reach NeoDent? It is a CONTACT chapter, not a booking flow: no
   date/time picker, no calendar, no scheduling form. Booking already
   has its own dedicated entry points elsewhere on the page (navbar,
   floating CTA, sticky mobile bar); this section deliberately does
   not duplicate that mechanic.

   Two branch-specific "information plates" (Mehdipatnam, Nampally)
   sit as the functional layer beneath the heading -- editorial rules
   and typography, never rounded cards, icon grids or pill buttons.
   Design language inherited directly from Section 02's canonical
   .archive-* system (serif/red-italic heading, 10px/.2em eyebrow with
   a 34px red hairline, numeral-bleeds-into-eyebrow mechanic) and from
   Section 07's dark-surface / brand-line pattern, on a genuinely
   distinct charcoal value so this reads as its own closing room
   rather than a continuation of Section 07. Nothing here edits
   globals.css or any locked section (01-07). ------------------------------------------------------------------ */

type Branch = {
  index: "01" | "02";
  name: string;
  meta: string;
  phoneLabel: string;
  tel: string;
  directionsHref: string;
};

const branches: Branch[] = [
  {
    index: "01",
    name: "Mehdipatnam",
    meta: "Mehdipatnam · Hyderabad",
    phoneLabel: "090306 48393",
    tel: telPhone,
    directionsHref: directions,
  },
  {
    index: "02",
    name: "Nampally",
    meta: "Nampally · Hyderabad",
    phoneLabel: "090305 98081",
    tel: nampallyTelPhone,
    directionsHref: nampallyDirections,
  },
];

export function ContactNextStep() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      id="get-in-touch"
      aria-labelledby="get-in-touch-title"
    >
      {/* Closing-frame geometry -- a single restrained arc anchored
          behind the chapter numeral, a vertical axis + horizontal
          registration line that cross directly above the branch
          grid (the composition's anchor point), and two quiet red
          registration points. Purely decorative (aria-hidden); no
          map pins, no tooth icons, no phone illustrations. */}
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.arc} />
        <span className={styles.axisLine} />
        <span className={styles.registrationLine} />
        <span className={styles.registrationDot} />
        <span className={styles.registrationDotSmall} />
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.numeral} aria-hidden="true">
            08
          </span>
          <div className={styles.eyebrow}>The next step / Get in touch</div>
          <h2 id="get-in-touch-title" className={styles.title}>
            Let&apos;s make your next step
            <br />
            <span>feel simple.</span>
          </h2>
          <p className={styles.lede}>
            Whether you have a{" "}
            <EditorialHighlight tone="secondary" onDark>
              dental concern
            </EditorialHighlight>
            , want to understand your{" "}
            <EditorialHighlight tone="quiet" onDark>
              treatment options
            </EditorialHighlight>
            , or simply want to{" "}
            <EditorialHighlight tone="primary">
              speak with our team
            </EditorialHighlight>
            , we&apos;re here to help you take the next step with clarity.
          </p>
        </header>

        <div className={styles.branches}>
          {branches.map((branch) => (
            <article
              className={`${styles.branch} ${branch.index === "02" ? styles.branchAlt : ""}`}
              key={branch.index}
            >
              <p className={styles.branchIndex}>
                {branch.index} / {branch.name.toUpperCase()}
              </p>
              <h3 className={styles.branchName}>NeoDent Dental Hospital</h3>
              <p className={styles.branchMeta}>{branch.meta.toUpperCase()}</p>
              <a
                href={branch.tel}
                className={styles.branchPhone}
                data-testid={`link-contact-phone-${branch.index}`}
              >
                {branch.phoneLabel}
              </a>
              <div className={styles.branchActions}>
                <a
                  href={branch.tel}
                  className={styles.actionPrimary}
                  data-testid={`link-call-${branch.name.toLowerCase()}`}
                >
                  Call {branch.name} <ArrowRight size={13} aria-hidden="true" />
                </a>
                <a
                  href={branch.directionsHref}
                  className={styles.actionSecondary}
                  data-testid={`link-directions-${branch.name.toLowerCase()}`}
                >
                  Get directions <ArrowRight size={12} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.signature}>
          <span className={styles.signatureTick} aria-hidden="true" />
          <span className={styles.signatureLine}>Two locations.</span>
          <span className={styles.signatureEmphasis}>One NeoDent standard.</span>
        </p>
      </div>
    </section>
  );
}
