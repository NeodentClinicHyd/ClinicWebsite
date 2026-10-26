"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { visitImage } from "@/lib/site-data";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { AppButton } from "@/components/ui/AppButton";
import styles from "./WhatToExpect.module.css";

/* ------------------------------------------------------------------
   Homepage Section 06 — "What to expect".

   The four-stage visit copy is carried over verbatim from the legacy
   Experience.tsx source. Visual system follows the refined sections
   above it (Sections 02-05): DM Serif Display title with a red italic
   accent, .section-lede body copy, hairline-bordered paper panels and
   the site's primary CTA button.

   Composition: the reception/waiting-area photograph runs the full
   height of the left column; on the right the team photograph sits
   above the visit journey -- a stepped cascade of four stages, each under
   its own rule whose red run grows from 1/4 to the full width. No cards,
   arrows, badges or icons. */

type Step = {
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    title: "Arrival & check-in",
    description:
      "You're welcomed at reception and any paperwork is handled before you're shown through.",
  },
  {
    title: "Consultation",
    description:
      "A direct conversation with Dr. Md. Siraj Ur Rahman about what's on your mind.",
  },
  {
    title: "Treatment",
    description:
      "Your procedure is carried out in the treatment room, at a measured, unhurried pace.",
  },
  {
    title: "Follow-up",
    description:
      "Clear guidance on next steps and aftercare before you leave, so nothing feels uncertain.",
  },
];

const doctorsImage = "/assets/neodent-dental-hospital-doctors.jpeg";

export function WhatToExpect() {
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
      id="visit"
      aria-labelledby="visit-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="visit-title" className={styles.title}>
            What to expect from a visit to <span>NeoDent Dental Hospital</span>
          </h2>
          <p className={`${styles.lede} section-lede`}>
            A considered{" "}
            <EditorialHighlight tone="primary">dental appointment</EditorialHighlight>{" "}
            from the first hello to the final goodbye. Every stage is designed
            to keep you informed, comfortable and clear about what comes
            next. <EditorialHighlight tone="quiet">Specialist-led care</EditorialHighlight>{" "}
            is shaped around your concerns, with{" "}
            <EditorialHighlight tone="secondary">clear conversations</EditorialHighlight>{" "}
            and a{" "}
            <EditorialHighlight tone="quiet">
              measured approach to treatment
            </EditorialHighlight>
            , so your experience feels{" "}
            <EditorialHighlight tone="primary">
              reassuring, personal and precise
            </EditorialHighlight>
            .
          </p>
        </header>

        <div className={styles.composition}>
          <figure className={`${styles.photo} ${styles.photoTall}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={visitImage}
              alt="Reception and waiting area at Neodent Dental Hospital, with a red-framed reception counter, red armchairs and consultation chamber doors"
              loading="lazy"
            />
          </figure>

          <div className={styles.column}>
            <figure className={`${styles.photo} ${styles.photoWide}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={doctorsImage}
                alt="Five people in clinical attire standing together in front of red-framed consultation chamber doors at Neodent Dental Hospitals"
                loading="lazy"
              />
            </figure>

            <ol className={styles.steps}>
              {/* Rule, red run and step-in are drawn in CSS on the list items;
                  the ordered list carries the sequence for assistive tech. */}
              {steps.map((step) => (
                <li key={step.title} className={styles.step}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={styles.ctaRow}>
          <AppButton href="#contact" variant="primary">
            Explore your visit <ArrowRight size={15} aria-hidden="true" />
          </AppButton>
        </div>
      </div>
    </section>
  );
}
