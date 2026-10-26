"use client";

import { useRef } from "react";
import Image from "next/image";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { useReveal } from "./useReveal";
import shared from "./shared.module.css";
import styles from "./AboutFounder.module.css";

/* ------------------------------------------------------------------
   About -- "A career built on specialist care."

   Pattern: ClinicalLeadership's profile row ("A steady hand. A human
   approach."): label / value card on the left, a large portrait on the
   right, the narrative split into two balanced columns beneath. On the
   ivory ground the portrait sits in the same charcoal panel the home
   page uses behind the founder cut-out. No red surface here -- the red
   card on this page is reserved for the recognition chapter.
   ------------------------------------------------------------------ */

export function AboutFounder() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.ivory}`}
      id="founder"
      aria-labelledby="founder-title"
    >
      <div className={shared.container}>
        <h2 id="founder-title" className={shared.title}>
          A career built on <span>specialist care.</span>
        </h2>

        <div className={styles.feature}>
          <div className={styles.cardCol} data-reveal>
            <div className={shared.card}>
              <div className={`${shared.cardHead} ${shared.withExp}`}>
                <div>
                  <h3 className={shared.cardName}>Dr. Mohd. Siraj Ur Rahman</h3>
                  <p className={shared.label}>Founder · Director · Neodent</p>
                </div>
                <p className={shared.exp}>
                  <strong>30+</strong>
                  <span>Years of experience</span>
                </p>
              </div>
              <dl className={shared.facts}>
                <div className={shared.fact}>
                  <dt>Qualifications</dt>
                  <dd className={shared.strong}>BDS · MDS (Chennai) · FCIP</dd>
                </div>
                <div className={shared.fact}>
                  <dt>Specialism</dt>
                  <dd>Prosthodontics and implantology</dd>
                </div>
                <div className={shared.fact}>
                  <dt>Academic post</dt>
                  <dd>
                    Professor, Osmania Government Dental College &amp; Hospital,
                    Hyderabad
                  </dd>
                </div>
                <div className={shared.fact}>
                  <dt>Oversees</dt>
                  <dd>Mehdipatnam and Nampally</dd>
                </div>
              </dl>
            </div>
          </div>

          <figure className={shared.figure} data-reveal>
            <div className={styles.panel}>
              <Image
                className={styles.portrait}
                src="/assets/Dr. Mohd. Siraj Ur Rahman - Neodent Dental Hospital Hyd.png"
                alt="Dr. Mohd. Siraj Ur Rahman, founder and director of Neodent Dental Hospital"
                fill
                sizes="(min-width: 1024px) 480px, (min-width: 768px) 70vw, 92vw"
              />
            </div>
            <figcaption className={shared.caption}>
              <span className={shared.source}>Dr. Mohd. Siraj Ur Rahman</span>
              <em className={shared.medium}>Founder · Director · Neodent</em>
            </figcaption>
          </figure>
        </div>

        <div className={`${shared.cols} ${styles.narrative}`} data-reveal>
          <div>
            <p className={shared.lede}>
              Dr. Mohd. Siraj Ur Rahman is the{" "}
              <EditorialHighlight tone="primary">
                founder and director
              </EditorialHighlight>{" "}
              of Neodent Dental Hospital. He established the practice in
              Hyderabad in 1994 and has led its clinical direction for more
              than three decades, building Neodent around the disciplines of
              dentistry, prosthodontics and implantology.
            </p>
            <p className={shared.lede}>
              A dental surgeon by training, with BDS and MDS (Chennai)
              qualifications and FCIP, his specialisation lies in
              prosthodontics and implantology — the reconstruction and
              replacement of teeth, and the surgical placement of dental
              implants. That specialist grounding has informed Neodent&apos;s
              clinical approach since its earliest years.
            </p>
            <p className={shared.lede}>
              Alongside his clinical practice, Dr. Mohd. Siraj Ur Rahman holds
              the position of{" "}
              <EditorialHighlight tone="secondary">
                Professor at Osmania Government Dental College &amp; Hospital,
                Hyderabad
              </EditorialHighlight>
              , bringing an academic dimension to his work that complements
              decades of hands-on treatment. Teaching and clinical practice
              have run in parallel throughout his career, each informing the
              other.
            </p>
          </div>
          <div>
            <p className={shared.lede}>
              With{" "}
              <EditorialHighlight tone="quiet">
                30+ years of experience
              </EditorialHighlight>{" "}
              in dentistry, Dr. Mohd. Siraj Ur Rahman&apos;s clinical
              philosophy has always placed the patient conversation ahead of
              the procedure — understanding the concern before proposing the
              treatment. That approach, established at Neodent&apos;s founding,
              continues to guide the practice today.
            </p>
            <p className={shared.lede}>
              As Director, Dr. Mohd. Siraj Ur Rahman continues to oversee
              Neodent&apos;s two Hyderabad locations, Mehdipatnam and Nampally,
              while remaining directly involved in clinical work — a
              continuity that patients returning to Neodent over many years
              have come to recognise. Learn more about{" "}
              <a className={shared.inlineLink} href="/treatments">
                Neodent&apos;s clinical expertise
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
