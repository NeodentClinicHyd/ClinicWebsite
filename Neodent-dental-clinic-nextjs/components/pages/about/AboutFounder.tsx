"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { AboutBackdrop } from "./AboutBackdrop";
import shared from "./AboutShared.module.css";
import styles from "./AboutFounder.module.css";

/* ------------------------------------------------------------------
   About -- S4 "A career built on specialist care." (dark, split)

   Text, card rows, caption and alt are moved unchanged from the
   previous AboutFounder. The red italic accent stays on this heading
   (one of the three sections allowed to carry it). No highlight marks
   on dark body text: the words that were marked are plain here. The
   first paragraph is visible; the other four sit in a native <details>.
   ------------------------------------------------------------------ */

export function AboutFounder() {
  return (
    <section
      className={`${shared.section} ${shared.dark} ${styles.founder}`}
      id="founder"
      aria-labelledby="founder-title"
    >
      <AboutBackdrop />
      <div className={shared.container}>
        <div className={styles.grid}>
          <Reveal as="div" className={styles.head}>
            <h2 id="founder-title" className={shared.title}>
              A career built on{" "}
              <span className={shared.accent}>specialist care.</span>
            </h2>
          </Reveal>

          <Reveal as="div" className={styles.p1} delay={80}>
            <p className={shared.lede}>
              Dr. Mohd. Siraj Ur Rahman is the founder and director of Neodent
              Dental Hospital. He established the practice in Hyderabad in 1994
              and has led its clinical direction for more than three decades,
              building Neodent around the disciplines of dentistry,
              prosthodontics and implantology.
            </p>
          </Reveal>

          <figure className={`${shared.figure} ${styles.fig} ${styles.panel}`}>
            <Reveal variant="mask" className={styles.imgReveal}>
              <div className={styles.imgBox}>
                <Image
                  className={styles.portrait}
                  src="/assets/Dr. Mohd. Siraj Ur Rahman - Neodent Dental Hospital Hyd.png"
                  alt="Dr. Mohd. Siraj Ur Rahman, founder and director of Neodent Dental Hospital"
                  fill
                  sizes="(min-width: 1024px) 480px, (min-width: 768px) 70vw, 92vw"
                />
              </div>
            </Reveal>
            <figcaption className={styles.caption}>
              <span className={styles.captionName}>Dr. Mohd. Siraj Ur Rahman</span>
              <em className={styles.captionRole}>Founder · Director · Neodent</em>
            </figcaption>
          </figure>

          <Reveal as="div" className={styles.cardWrap} delay={120}>
            <div className={shared.card}>
              <div className={`${shared.cardHead} ${shared.withExp}`}>
                <div>
                  <h3 className={shared.cardName}>Dr. Mohd. Siraj Ur Rahman</h3>
                  <p className={shared.label}>Founder · Director · Neodent</p>
                </div>
                <p className={shared.exp}>
                  <strong>
                    <CountUp to={32} suffix="+" />
                  </strong>
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
          </Reveal>

          <details className={`${shared.more} ${styles.more}`}>
            <summary>Read more</summary>
            <div className={`${shared.moreBody} ${styles.cols}`}>
              <div>
                <p className={shared.lede}>
                  A dental surgeon by training, with BDS and MDS (Chennai)
                  qualifications and FCIP, his specialisation lies in
                  prosthodontics and implantology — the reconstruction and
                  replacement of teeth, and the surgical placement of dental
                  implants. That specialist grounding has informed
                  Neodent&apos;s clinical approach since its earliest years.
                </p>
                <p className={shared.lede}>
                  Alongside his clinical practice, Dr. Mohd. Siraj Ur Rahman
                  holds the position of Professor at Osmania Government Dental
                  College &amp; Hospital, Hyderabad, bringing an academic
                  dimension to his work that complements decades of hands-on
                  treatment. Teaching and clinical practice have run in
                  parallel throughout his career, each informing the other.
                </p>
              </div>
              <div>
                <p className={shared.lede}>
                  With 32+ years of experience in dentistry, Dr. Mohd. Siraj Ur
                  Rahman&apos;s clinical philosophy has always placed the
                  patient conversation ahead of the procedure — understanding
                  the concern before proposing the treatment. That approach,
                  established at Neodent&apos;s founding, continues to guide the
                  practice today.
                </p>
                <p className={shared.lede}>
                  As Director, Dr. Mohd. Siraj Ur Rahman continues to oversee
                  Neodent&apos;s two Hyderabad locations, Mehdipatnam and
                  Nampally, while remaining directly involved in clinical work
                  — a continuity that patients returning to Neodent over many
                  years have come to recognise. Learn more about{" "}
                  <a className={shared.inlineLink} href="/treatments">
                    Neodent&apos;s clinical expertise
                  </a>
                  .
                </p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
