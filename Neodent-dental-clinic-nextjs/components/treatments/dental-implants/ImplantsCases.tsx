"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { SHOW_IMPLANT_CASE_IMAGES } from "@/lib/dental-implants-page";
import { SectionHeader } from "./SectionHeader";
import styles from "./ImplantsCases.module.css";

/* Case 1 — Nampally upper arch (960x1280 originals; the face mosaic is
   baked into the files and is never cropped: images are shown at their
   own 3:4 ratio). */
const CASE_ONE_BEFORE =
  "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - before surgery.jpg";
const CASE_ONE_AFTER =
  "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - after surgery.jpg";

/* Case 2 — Dr. Miftah's supplied pair (315x316 and 535x413), shown at one
   shared height and never larger than their intrinsic size. */
const CASE_TWO_BEFORE =
  "/assets/dr-miftah/treatments/web/dr-md-miftah-ur-rahman-dental-implants-before.webp";
const CASE_TWO_AFTER =
  "/assets/dr-miftah/treatments/web/dr-md-miftah-ur-rahman-dental-implants-after.webp";

/* Same wiring as before: source is 1080x1920 (9:16), preload="none". */
const VIDEO_SRC =
  "/assets/treatment-video/neodent-full-mouth-rehabilitation-using-dental-implants.mp4";
const VIDEO_POSTER =
  "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - after surgery.jpg";

/* Rendered ONLY when SHOW_IMPLANT_CASE_IMAGES is true. A tidy bento: row 1
   is the two before / after cards at equal height; row 2 is the portrait
   film (9:16, filled edge to edge) beside a compact note card. */
export function ImplantsCases() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  if (!SHOW_IMPLANT_CASE_IMAGES) return null;

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    video.play().catch(() => {
      /* Native controls remain available if playback is refused. */
    });
  };

  return (
    <section className={styles.section} aria-labelledby="di-cases-title">
      <div className={styles.container}>
        <SectionHeader titleId="di-cases-title" sans="Dental implant cases" accent="from Neodent.">
          <p className="section-lede">
            Photographs from{" "}
            <EditorialHighlight tone="secondary">
              implant treatment at Neodent
            </EditorialHighlight>
            , shown so you can see what treatment can involve. Every case is
            different, and these images are{" "}
            <EditorialHighlight tone="quiet">
              not a prediction for your own mouth
            </EditorialHighlight>
            .
          </p>
        </SectionHeader>

        <div className={styles.rowOne}>
          <figure className={`${styles.card} ${styles.nampally}`}>
            <div className={styles.pair}>
              <div className={styles.plate}>
                <div className={styles.frame}>
                  <Image
                    src={CASE_ONE_BEFORE}
                    alt="Upper arch before implant surgery, Nampally case"
                    width={960}
                    height={1280}
                    sizes="(max-width: 767px) 46vw, 24vw"
                  />
                </div>
                <span className={styles.label}>Before surgery</span>
              </div>
              <div className={styles.plate}>
                <div className={styles.frame}>
                  <Image
                    src={CASE_ONE_AFTER}
                    alt="Upper arch rehabilitation with implants after surgery at Neodent Dental Hospital"
                    width={960}
                    height={1280}
                    sizes="(max-width: 767px) 46vw, 24vw"
                  />
                </div>
                <span className={styles.label}>After surgery</span>
              </div>
            </div>
            <figcaption className={styles.caption}>
              <b>Nampally</b>
              <span>Upper arch rehabilitation with dental implants</span>
            </figcaption>
          </figure>

          <figure className={`${styles.card} ${styles.miftah}`}>
            <div className={styles.smallPair}>
              <div className={styles.smallPlate}>
                <Image
                  className={styles.smallImage}
                  src={CASE_TWO_BEFORE}
                  alt="Close-up of teeth before implant treatment, Dr. Md. Miftah Ur Rahman's case"
                  width={315}
                  height={316}
                  sizes="(max-width: 767px) 40vw, 280px"
                />
                <span className={styles.label}>Before treatment</span>
              </div>
              <div className={styles.smallPlate}>
                <Image
                  className={styles.smallImage}
                  src={CASE_TWO_AFTER}
                  alt="Close-up of teeth after implant treatment, Dr. Md. Miftah Ur Rahman's case"
                  width={535}
                  height={413}
                  sizes="(max-width: 767px) 50vw, 360px"
                />
                <span className={styles.label}>After treatment</span>
              </div>
            </div>
            <figcaption className={styles.caption}>
              <b>Dr. Md. Miftah Ur Rahman</b>
              <span>Before and after treatment</span>
            </figcaption>
          </figure>
        </div>

        <div className={styles.rowTwo}>
          <figure className={styles.film}>
            <div className={styles.filmFrame}>
              <video
                ref={videoRef}
                className={styles.video}
                controls={started}
                playsInline
                preload="none"
                poster={VIDEO_POSTER}
                width={1080}
                height={1920}
                aria-label="Full-mouth rehabilitation using dental implants, Neodent Dental Hospital, Mehdipatnam"
                onPlay={() => setStarted(true)}
              >
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>
              {!started ? (
                <button
                  type="button"
                  className={styles.play}
                  onClick={play}
                  aria-label="Play the full-mouth rehabilitation film"
                >
                  <Play size={18} aria-hidden="true" />
                </button>
              ) : null}
            </div>
            <figcaption className={`${styles.caption} ${styles.filmCaption}`}>
              <b>Mehdipatnam</b>
              <span>Full-mouth rehabilitation using dental implants</span>
            </figcaption>
          </figure>

          <div className={styles.notes}>
            <p className={styles.evidence}>
              Supplied before and after clinical photographs from implant
              treatment at Neodent. Photographs are shown for patient
              understanding; implant treatment and its outcome vary from patient
              to patient.
            </p>
            <p className={styles.privacy}>
              Images are published in line with our{" "}
              <Link className={styles.privacyLink} href="/privacy-policy">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
