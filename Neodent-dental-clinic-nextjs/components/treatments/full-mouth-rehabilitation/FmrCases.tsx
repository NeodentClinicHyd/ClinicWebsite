"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { CASES, SHOW_FMR_CASE_IMAGES, SHOW_MIFTAH_FMR_PAIR } from "@/lib/full-mouth-rehabilitation-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import styles from "./FmrCases.module.css";

/* 8. Full mouth rehabilitation cases from Neodent (light)
   Rendered ONLY when SHOW_FMR_CASE_IMAGES is true. A bento in the style of
   the implants cases section: the Mehdipatnam before / after pair beside the
   portrait film (9:16 frame) and the compact note card. A face mosaic is
   baked into the Mehdipatnam files; they are shown whole (3:4, never
   cropped) and well under their own pixel size (the "after" is 527 x 704).
   Dr. Miftah's pair is a separate switch (SHOW_MIFTAH_FMR_PAIR, off): its
   "after" photograph shows an unmasked lower face. */
export function FmrCases() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  if (!SHOW_FMR_CASE_IMAGES) return null;

  const { mehdipatnam, miftah, video } = CASES;

  const play = () => {
    const el = videoRef.current;
    if (!el) return;
    setStarted(true);
    el.play().catch(() => {
      /* Native controls remain available if playback is refused. */
    });
  };

  return (
    <section className={styles.section} aria-labelledby="fmr-cases-title">
      <div className={styles.container}>
        <SectionHeader titleId="fmr-cases-title" sans={CASES.sans} accent={CASES.accent}>
          <p className="section-lede">
            <RichText parts={CASES.intro} />
          </p>
        </SectionHeader>

        <div className={styles.grid}>
          <figure className={`${styles.card} ${styles.pairCard}`}>
            <div className={styles.pair}>
              <div className={styles.plate}>
                <div className={styles.frame}>
                  <Image
                    src={mehdipatnam.before}
                    alt={mehdipatnam.beforeAlt}
                    width={960}
                    height={1280}
                    sizes="(max-width: 767px) 44vw, (max-width: 900px) 40vw, 22vw"
                  />
                </div>
                <span className={styles.label}>Before surgery</span>
              </div>
              <div className={styles.plate}>
                <div className={styles.frame}>
                  <Image
                    src={mehdipatnam.after}
                    alt={mehdipatnam.afterAlt}
                    width={527}
                    height={704}
                    sizes="(max-width: 767px) 44vw, (max-width: 900px) 40vw, 22vw"
                  />
                </div>
                <span className={styles.label}>After surgery</span>
              </div>
            </div>
            <figcaption className={styles.caption}>
              <b>{mehdipatnam.place}</b>
              <span>{mehdipatnam.label}</span>
            </figcaption>
          </figure>

          <figure className={`${styles.card} ${styles.filmCard}`}>
            <div className={styles.filmFrame}>
              <video
                ref={videoRef}
                className={styles.video}
                controls={started}
                playsInline
                preload="none"
                poster={encodeURI(video.poster)}
                width={1080}
                height={1920}
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
            <figcaption className={`${styles.caption} ${styles.filmCaption}`}>
              <b>{video.place}</b>
              <span>{video.label}</span>
            </figcaption>
            <div className={styles.notes}>
              <p className={styles.evidence}>{CASES.evidence}</p>
              <p className={styles.privacy}>
                {CASES.privacyLead}
                <Link className={styles.privacyLink} href={CASES.privacyHref}>
                  {CASES.privacyLinkText}
                </Link>
                .
              </p>
            </div>
          </figure>

          {SHOW_MIFTAH_FMR_PAIR ? (
            <figure className={`${styles.card} ${styles.miftahCard}`}>
              <div className={styles.smallPair}>
                <div className={styles.smallPlate}>
                  <div className={styles.smallFrame}>
                    <Image
                      src={miftah.before}
                      alt={miftah.beforeAlt}
                      fill
                      sizes="(max-width: 767px) 40vw, 260px"
                    />
                  </div>
                  <span className={styles.label}>Before treatment</span>
                </div>
                <div className={styles.smallPlate}>
                  <div className={styles.smallFrame}>
                    <Image
                      src={miftah.after}
                      alt={miftah.afterAlt}
                      fill
                      sizes="(max-width: 767px) 50vw, 340px"
                    />
                  </div>
                  <span className={styles.label}>After treatment</span>
                </div>
              </div>
              <figcaption className={styles.caption}>
                <b>{miftah.name}</b>
                <span>{miftah.label}</span>
              </figcaption>
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}
