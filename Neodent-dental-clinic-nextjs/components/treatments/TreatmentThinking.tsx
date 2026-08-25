"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import styles from "./TreatmentThinking.module.css";

/* ------------------------------------------------------------------
   Treatments page — Section 03 — "The Thinking Behind Treatment."

   Dark charcoal editorial surface. Design language inherited from the
   homepage's canonical .archive-* system and the About page's
   act-based editorial grammar (LegacyAndPeople.tsx): DM Serif Display
   headings, red italic emphasis, 10px/.2em eyebrow with 34px red
   hairline, oversized low-opacity serif chapter numeral bleeding into
   the eyebrow via negative margin, and 15px/1.7 muted body copy.

   Three internal acts, each separated by a constrained border-top
   seam (not the chapter-level EditorialSeam component):
     03.1 — Treatment Philosophy
     03.2 — Clinical Expertise Behind Treatment
     03.3 — Clinical Education (DMLS educational video)

   Doctor presentation is open editorial plates — no card wrappers,
   no experience badge overlays, no background panels. Portrait frames
   follow the About page's founderPortrait / openingImage pattern.

   DMLS video: portrait / reel format (~13s). Presented at aspect-ratio
   9/16 with object-fit: contain so the native composition is preserved
   without cropping or distorting the speaker. Max-height constrained
   so the plate does not balloon the section height.
   ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

export function TreatmentThinking() {
  const [sectionRef] = useReveal<HTMLElement>(0.06);
  const [philosophyRef, philosophyVisible] = useReveal<HTMLDivElement>(0.1);
  const [teamRef, teamVisible] = useReveal<HTMLDivElement>(0.1);
  const [educationRef, educationVisible] = useReveal<HTMLDivElement>(0.1);
  const [processRef, processVisible] = useReveal<HTMLDivElement>(0.1);

  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause video when section leaves viewport
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoRef.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => undefined);
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="thinking-title"
    >
      {/* Background geometry — treatment/clinical drafting motif */}
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.verticalRail} />
        <span className={styles.draftHorizontal} />
        <span className={styles.registrationDot} />
      </div>

      <div className={styles.container}>

        {/* ---- ACT 03.1 — Treatment Philosophy ---------------------- */}
        <div
          ref={philosophyRef}
          className={`${styles.act} ${styles.actPhilosophy} ${philosophyVisible ? styles.actVisible : ""}`}
        >
          <header className={styles.header}>
            {/* Chapter numeral bleeds into eyebrow via negative margin —
                same mechanic as LegacyAndPeople .numeral and
                ClinicalLeadership .numeral */}
            <span className={styles.numeral} aria-hidden="true">03</span>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              03 / Treatment philosophy
            </div>
            <h2 id="thinking-title" className={styles.title}>
              The thinking<br /><span>behind treatment.</span>
            </h2>
          </header>

          <div className={styles.philosophyBody}>
            <p className={styles.paragraph}>
              Treatment at NeoDent begins with{" "}
              <EditorialHighlight tone="primary" onDark>
                understanding the patient's concern
              </EditorialHighlight>
              . Not every dental condition requires the same response — some
              patients need care focused on a{" "}
              <EditorialHighlight tone="secondary" onDark>
                single affected tooth
              </EditorialHighlight>
              , while others may benefit from a{" "}
              <EditorialHighlight tone="quiet" onDark>
                more comprehensive treatment plan
              </EditorialHighlight>
              {" "}addressing multiple areas of the mouth.
            </p>

            <p className={styles.paragraph}>
              Clinical assessment considers{" "}
              <EditorialHighlight tone="primary" onDark>
                oral health, function and aesthetic goals together
              </EditorialHighlight>
              . Where appropriate, the team discusses{" "}
              <EditorialHighlight tone="secondary" onDark>
                suitable treatment options
              </EditorialHighlight>
              , explains what each approach involves, and helps patients
              understand the{" "}
              <EditorialHighlight tone="quiet" onDark>
                clinical considerations
              </EditorialHighlight>
              {" "}relevant to their condition.
            </p>

            <p className={styles.paragraph}>
              Treatment planning at NeoDent is not a fixed sequence — it is
              shaped by{" "}
              <EditorialHighlight tone="primary" onDark>
                each patient's specific condition
              </EditorialHighlight>
              . The clinical team outlines available options,
              explains what{" "}
              <EditorialHighlight tone="secondary" onDark>
                each approach involves
              </EditorialHighlight>
              , and ensures that every decision is{" "}
              <EditorialHighlight tone="quiet" onDark>
                made with the patient's informed understanding
              </EditorialHighlight>
              .
            </p>
          </div>
        </div>

        {/* ---- Internal act seam — constrained, About page pattern -- */}
        <div className={styles.actSeam} aria-hidden="true" />

        {/* ---- ACT 03.2 — Clinical Expertise Behind Treatment -------- */}
        <div
          ref={teamRef}
          className={`${styles.act} ${styles.actTeam} ${teamVisible ? styles.actVisible : ""}`}
        >
          <div className={styles.actEyebrow}>
            03.2 / Clinical expertise behind treatment
          </div>

          <div className={styles.doctors}>
            {/* Dr. Siraj — left / senior figure */}
            <article
              className={`${styles.doctor} ${styles.doctorSiraj}`}
              style={{ "--stagger": "0ms" } as React.CSSProperties}
            >
              <figure className={styles.doctorPortrait}>
                <span className={styles.portraitRegistration} aria-hidden="true" />
                <Image
                  src="/assets/Dr. Mohd. Siraj Ur Rahman - Neodent Dental Hospital Hyd.png"
                  alt="Dr. Mohd. Siraj Ur Rahman, Prosthodontist and Implantologist, founder and director of NeoDent Dental Hospitals"
                  width={320}
                  height={420}
                  className={styles.portraitImage}
                />
                <figcaption className={styles.portraitCaption}>
                  Dr. Mohd. Siraj Ur Rahman / Founder &amp; Director
                </figcaption>
              </figure>
              <div className={styles.doctorInfo}>
                <h3 className={styles.doctorName}>Dr. Mohd. Siraj<br />Ur Rahman</h3>
                <p className={styles.doctorMeta}>BDS · FCIP · MDS (Chennai)</p>
                <p className={styles.doctorSpecialty}>Prosthodontist &amp; Implantologist</p>
                <p className={styles.doctorContext}>
                  Specialist training in prosthodontics and implantology, and
                  35+ years of clinical practice, inform how NeoDent assesses
                  and plans treatment for each patient.
                </p>
              </div>
            </article>

            {/* Connecting hairline — editorial geometry between the two figures */}
            <span className={styles.doctorBridge} aria-hidden="true" />

            {/* Dr. Miftah — right / offset stagger */}
            <article
              className={`${styles.doctor} ${styles.doctorMiftah}`}
              style={{ "--stagger": "120ms" } as React.CSSProperties}
            >
              <figure className={styles.doctorPortrait}>
                <span className={styles.portraitRegistration} aria-hidden="true" />
                <Image
                  src="/assets/dr-miftah/Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital.png"
                  alt="Dr. Md. Miftah Ur Rahman, Prosthodontist and Implantologist, assistant director of NeoDent Dental Hospitals"
                  width={320}
                  height={420}
                  className={styles.portraitImage}
                />
                <figcaption className={styles.portraitCaption}>
                  Dr. Md. Miftah Ur Rahman / Prosthodontist
                </figcaption>
              </figure>
              <div className={styles.doctorInfo}>
                <h3 className={styles.doctorName}>Dr. Md. Miftah<br />Ur Rahman</h3>
                <p className={styles.doctorMeta}>BDS · MDS · FICOI (U.S.A.)</p>
                <p className={styles.doctorRecognition}>Gold Medallist</p>
                <p className={styles.doctorSpecialty}>Prosthodontist &amp; Implantologist</p>
                <p className={styles.doctorContext}>
                  Specialist qualifications in prosthodontics and implantology,
                  including FICOI (U.S.A.), underpin his approach to restorative
                  and implant-based treatment at NeoDent.
                </p>
              </div>
            </article>
          </div>
        </div>

        {/* ---- Internal act seam ------------------------------------ */}
        <div className={styles.actSeam} aria-hidden="true" />

        {/* ---- ACT 03.3 — Clinical Education ------------------------- */}
        <div
          ref={educationRef}
          className={`${styles.act} ${styles.actEducation} ${educationVisible ? styles.actVisible : ""}`}
        >

          <div className={styles.actEyebrow}>
            03.3 / Clinical education
          </div>

          <div className={styles.educationLayout}>
            {/* Left — text */}
            <div className={styles.educationText}>
              <h3 className={styles.educationTitle}>
                Understanding DMLS Crowns<br />
                <span>&amp; Functional Strength</span>
              </h3>
              <p className={styles.paragraph}>
                Dr. Md. Miftah Ur Rahman explains the{" "}
                <EditorialHighlight tone="primary" onDark>
                  functional characteristics of DMLS crowns
                </EditorialHighlight>
                , including their{" "}
                <EditorialHighlight tone="secondary" onDark>
                  masticatory efficiency
                </EditorialHighlight>
                {" "}and clinical strength. Part of NeoDent's approach to
                helping patients understand the{" "}
                <EditorialHighlight tone="quiet" onDark>
                  materials and methods
                </EditorialHighlight>
                {" "}used in their treatment.
              </p>
              <div className={styles.educationMeta}>
                <span className={styles.educationMetaName}>Dr. Md. Miftah Ur Rahman</span>
                <span className={styles.educationMetaSub}>BDS · MDS · FICOI (U.S.A.)</span>
                <span className={styles.educationMetaSub}>Prosthodontist &amp; Implantologist</span>
              </div>
            </div>

            {/* Right — portrait video plate, aspect-ratio 9/16 preserved */}
            <div className={styles.educationVideo}>
              <figure className={styles.videoPlate}>
                <span className={styles.videoRegistration} aria-hidden="true" />
                <div className={styles.videoFrame}>
                  {/* DMLS video: portrait/reel format, ~13s.
                      object-fit: contain preserves native composition.
                      Max-height constrains the plate so it does not
                      dominate the section. */}
                  <video
                    ref={videoRef}
                    className={styles.video}
                    poster="/assets/neodent-dmls-crowns-dental-model-front-view.jpg"
                    preload="metadata"
                    playsInline
                    aria-label="Dr. Md. Miftah Ur Rahman explaining DMLS crowns and masticatory efficiency"
                  >
                    <source
                      src="/assets/treatment-video/dr-miftah-explains-dmls-crowns-masticatory-efficiency.mp4"
                      type="video/mp4"
                    />
                  </video>
                  {/* Top label overlay */}
                  <div className={styles.videoTopLabel} aria-hidden="true">
                    <span>CLINICAL EDUCATION</span>
                    <span>DMLS CROWNS</span>
                  </div>
                  {/* Play / pause — ClinicalLeadership .control pattern */}
                  <button
                    type="button"
                    className={styles.videoControl}
                    onClick={toggleVideo}
                    aria-label={playing ? "Pause video" : "Play video"}
                  >
                    {playing ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                </div>
                <figcaption className={styles.videoCaption}>
                  Dr. Md. Miftah Ur Rahman / DMLS Crowns &amp; Masticatory Efficiency
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* ---- Internal act seam ------------------------------------ */}
        <div className={styles.actSeam} aria-hidden="true" />

        {/* ---- ACT 03.4 — How Treatment Takes Shape ------------------ */}
        <div
          ref={processRef}
          className={`${styles.act} ${styles.actProcess} ${processVisible ? styles.actVisible : ""}`}
        >
          <div className={styles.actEyebrow}>
            03.4 / How treatment takes shape
          </div>

          <div className={styles.processHeader}>
            <h3 className={styles.processTitle}>
              How treatment<br /><span>takes shape.</span>
            </h3>
            <p className={styles.processParagraph}>
              Every treatment begins with{" "}
              <EditorialHighlight tone="primary" onDark>
                understanding the patient's concern
              </EditorialHighlight>
              , followed by clinical assessment and{" "}
              <EditorialHighlight tone="secondary" onDark>
                treatment planning
              </EditorialHighlight>
              . The approach then moves into appropriate treatment and{" "}
              <EditorialHighlight tone="quiet" onDark>
                follow-up according to the patient's clinical situation
              </EditorialHighlight>
              .
            </p>
          </div>

          {/* Four editorial steps — horizontal on desktop, 2×2 on tablet, stacked on mobile */}
          <ol className={styles.processList} aria-label="Treatment process steps">
            {[
              {
                n: "01",
                label: "Understand",
                text: "Understand the patient's concern, symptoms and goals.",
              },
              {
                n: "02",
                label: "Assess",
                text: "Evaluate the dental condition and areas requiring attention.",
              },
              {
                n: "03",
                label: "Plan",
                text: "Consider suitable treatment options based on the clinical situation.",
              },
              {
                n: "04",
                label: "Treat",
                text: "Carry out the selected treatment and appropriate follow-up.",
              },
            ].map((step, i) => (
              <li
                key={step.n}
                className={styles.processStep}
                style={{ "--step-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <span className={styles.processStepNumber}>{step.n}</span>
                <span className={styles.processStepRule} aria-hidden="true" />
                <strong className={styles.processStepLabel}>{step.label}</strong>
                <p className={styles.processStepText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}
