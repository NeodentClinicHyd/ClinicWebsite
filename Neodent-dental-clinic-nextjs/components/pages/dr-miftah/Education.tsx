"use client";

import { useRef } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { DrMiftahBackdrop } from "./DrMiftahBackdrop";
import { SectionHead } from "./SectionHead";
import { SwipeDots } from "./SwipeDots";
import styles from "./Education.module.css";

/* ------------------------------------------------------------------
   05 Education and training (pattern P8 stepper, with photographs).
   Dark band. Five stages in a vertical stepper whose connecting line
   draws with scroll (scroll-driven where supported, drawn in full
   otherwise), and the two ceremony photographs on the right. Under
   1024 px the photographs follow the stepper as a two-card swipe row.
   Every stage, school and label of the old section is kept; the fifth
   stage "Gold Medallist" is a normal, fully visible step.
   ------------------------------------------------------------------ */

const ACADEMIC_FRAME_IMAGE = {
  src: "/assets/dr-miftah/Award presented to Dr Miftah ur Rahman by Dr K Mahendranadh Reddy.jpeg",
  width: 1170,
  height: 1150,
  alt: "Dr. Md. Miftah Ur Rahman receiving a framed certificate presented by Dr. K Mahendranadh Reddy",
};

const CEREMONY_FRAME_IMAGE = {
  src: "/assets/dr-miftah/dr-miftah-award-recognition.jpg",
  width: 1280,
  height: 960,
  alt: "Dr. Md. Miftah Ur Rahman receiving a certificate at a professional ceremony",
};

const EDUCATION_STEPS: {
  kicker: string;
  title: string;
  lines: string[];
  final?: boolean;
}[] = [
  {
    kicker: "Dental school",
    title: "BDS",
    lines: ["Sri Sai College of Dental Surgery", "Dr. NTR University of Health Sciences"],
  },
  {
    kicker: "Clinical internship",
    title: "Internship",
    lines: ["Osmania Government Dental College, Hyderabad"],
  },
  {
    kicker: "Specialist training",
    title: "MDS \u2014 Prosthodontics & Implantology",
    lines: ["Sri Sai College of Dental Surgery", "Kaloji Narayana Rao University of Health Sciences"],
  },
  {
    kicker: "Fellowship",
    title: "FICOI (U.S.A.)",
    lines: [],
  },
  {
    kicker: "Formal recognition",
    title: "Gold Medallist",
    lines: [],
    final: true,
  },
];

export function Education() {
  const platesRef = useRef<HTMLDivElement>(null);
  return (
    <section className={styles.section} aria-labelledby="miftah-edu-title">
      <DrMiftahBackdrop />
      <div className={styles.container}>
        <SectionHead
          tone="dark"
          eyebrow="05 / EDUCATION & TRAINING"
          id="miftah-edu-title"
          title="A foundation"
          accent="built formally."
          lede="His specialist practice rests on formal training in prosthodontics and implantology, carried through dental school, clinical internship, fellowship and formal recognition."
        />

        <div className={styles.grid}>
          <div className={styles.journey}>
            <Reveal as="ol" className={styles.steps} stagger={100}>
              {EDUCATION_STEPS.map((step, index) => (
                <li className={`${styles.step} ${step.final ? styles.final : ""}`} key={step.title}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.node} aria-hidden="true" />
                  <div className={styles.stepBody}>
                    <span className={styles.kicker}>{step.kicker}</span>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    {step.lines.map((line) => (
                      <p className={styles.stepLine} key={line}>
                        {line}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </Reveal>
            <Reveal className={styles.facts} aria-hidden="true">
              <span>05 Stages</span>
              <span>04 Institutions</span>
              <span>FICOI &mdash; U.S.A.</span>
            </Reveal>
          </div>

          <div ref={platesRef} className={styles.platesWrap}>
            <Reveal as="div" className={styles.plates} stagger={150} data-swipe>
              <figure className={styles.plate}>
                <div className={styles.frame}>
                  <Image
                    src={ACADEMIC_FRAME_IMAGE.src}
                    alt={ACADEMIC_FRAME_IMAGE.alt}
                    fill
                    sizes="(max-width: 1023px) 84vw, 440px"
                    className={styles.image}
                    style={{ objectPosition: "50% 38%" }}
                  />
                </div>
                <figcaption className={styles.caption}>
                  <span className={styles.label}>Recognition</span>
                  <span>Award presented to Dr. Miftah Ur Rahman by Dr. K. Mahendranadh Reddy</span>
                </figcaption>
              </figure>
              <figure className={`${styles.plate} ${styles.plateSmall}`}>
                <div className={styles.frame}>
                  <Image
                    src={CEREMONY_FRAME_IMAGE.src}
                    alt={CEREMONY_FRAME_IMAGE.alt}
                    fill
                    sizes="(max-width: 1023px) 84vw, 260px"
                    className={styles.image}
                    style={{ objectPosition: "50% 45%" }}
                  />
                </div>
                <figcaption className={styles.caption}>
                  <span className={styles.label} aria-hidden="true">
                    ii
                  </span>
                  <span>Professional ceremony</span>
                </figcaption>
              </figure>
            </Reveal>
            <SwipeDots listRef={platesRef} count={2} noun="Photograph" tone="dark" className={styles.dots} />
          </div>
        </div>
      </div>
    </section>
  );
}
