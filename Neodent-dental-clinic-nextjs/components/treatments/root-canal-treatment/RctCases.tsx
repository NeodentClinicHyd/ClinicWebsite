"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { CASES, SHOW_RCT_CASE_MEDIA, SHOW_RCT_RADIOGRAPHS } from "@/lib/root-canal-treatment-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import styles from "./RctCases.module.css";

/* 8. Root canal cases from Neodent (light)
   Rendered ONLY when SHOW_RCT_CASE_MEDIA is true. Pattern: FmrCases (paper
   cards on ivory, the PatientStories 9:16 film frame). A bento: the
   radiograph trio card across the top (only while SHOW_RCT_RADIOGRAPHS is
   true), then the film card beside a compact dark disclaimer card. With the
   radiographs off, the film and the disclaimer still sit together as one
   content-sized row. Radiographs are shown whole (never cropped) and never
   larger than their own 1458 x 1103 pixels. The video follows the FMR
   handling: controls appear once play is pressed, playsInline,
   preload="none", a poster, no autoplay, not muted. */
export function RctCases() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  if (!SHOW_RCT_CASE_MEDIA) return null;

  const { radiographs, video } = CASES;

  const play = () => {
    const el = videoRef.current;
    if (!el) return;
    setStarted(true);
    el.play().catch(() => {
      /* Native controls remain available if playback is refused. */
    });
  };

  return (
    <section className={styles.section} aria-labelledby="rct-cases-title">
      <div className={styles.container}>
        <SectionHeader titleId="rct-cases-title" sans={CASES.sans} accent={CASES.accent} />

        <div className={styles.grid}>
          {SHOW_RCT_RADIOGRAPHS ? (
            <figure className={`${styles.card} ${styles.xrayCard}`}>
              <div className={styles.xrays}>
                {radiographs.items.map((item) => (
                  <div className={styles.plate} key={item.src}>
                    <div className={styles.frame}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={radiographs.width}
                        height={radiographs.height}
                        sizes="(max-width: 767px) 80vw, (max-width: 1023px) 30vw, 360px"
                      />
                    </div>
                    <span className={styles.label}>{item.label}</span>
                  </div>
                ))}
              </div>
              <figcaption className={styles.xrayCaption}>{radiographs.caption}</figcaption>
            </figure>
          ) : null}

          <figure className={`${styles.card} ${styles.filmCard}`}>
            <div className={styles.filmFrame}>
              <video
                ref={videoRef}
                className={styles.video}
                controls={started}
                playsInline
                preload="none"
                poster={encodeURI(video.poster)}
                width={video.width}
                height={video.height}
                aria-label={video.ariaLabel}
                onPlay={() => setStarted(true)}
              >
                <source src={video.src} type="video/mp4" />
              </video>
              {!started ? (
                <button
                  type="button"
                  className={styles.play}
                  onClick={play}
                  aria-label={video.playLabel}
                >
                  <Play size={18} aria-hidden="true" />
                </button>
              ) : null}
            </div>
            <figcaption className={styles.filmCaption}>
              <b>{video.place}</b>
              <span>{video.label}</span>
            </figcaption>
          </figure>

          <aside className={`${styles.card} ${styles.noteCard}`} aria-label="About these images">
            <p className={styles.evidence}>
              {CASES.evidence}
              <Link className={styles.privacyLink} href={CASES.privacyHref}>
                {CASES.privacyLinkText}
              </Link>
              .
            </p>
            <p className={styles.statement}>{CASES.statement}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
