"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Volume2, VolumeX } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CASES, SHOW_FMR_CASE_IMAGES, SHOW_MIFTAH_FMR_PAIR } from "@/lib/full-mouth-rehabilitation-page";
import { Lightbox, type LightboxPhoto } from "./Lightbox";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import { SwipeRow } from "./SwipeRow";
import styles from "./ResultsCases.module.css";

/* Results, directly after the page header (plan 4.2).
   Desktop: heading and introduction on the left, one row of equal-height
   case cards on the right (the before and after pair, then the film), the
   consent strip under both. Below 1024 px the cards are one swipe row with
   progress dots. Every photograph opens a lightbox with the pair together.
   The film plays in place when the viewer presses play, starts muted (a
   sound button unmutes it) and pauses when it scrolls out of view.

   Dr. Miftah's pair is a third card that exists only while
   SHOW_MIFTAH_FMR_PAIR is true (it is false: question Q1). The whole
   section renders only while SHOW_FMR_CASE_IMAGES is true.

   The mosaic over the eyes is baked into the Mehdipatnam files. They are
   used exactly as supplied. */

type Pair = {
  key: "mehdipatnam" | "miftah";
  photos: [LightboxPhoto, LightboxPhoto];
  title: string;
  place: string;
  label: string;
};

const { mehdipatnam, miftah, video } = CASES;

const PAIRS: Pair[] = [
  {
    key: "mehdipatnam",
    photos: [
      { src: mehdipatnam.before, alt: mehdipatnam.beforeAlt, width: 960, height: 1280, label: "Before surgery" },
      { src: mehdipatnam.after, alt: mehdipatnam.afterAlt, width: 527, height: 704, label: "After surgery" },
    ],
    title: mehdipatnam.label,
    place: mehdipatnam.place,
    label: mehdipatnam.label,
  },
];

const MIFTAH: Pair = {
  key: "miftah",
  photos: [
    { src: miftah.before, alt: miftah.beforeAlt, width: 515, height: 486, label: "Before treatment" },
    { src: miftah.after, alt: miftah.afterAlt, width: 1600, height: 1280, label: "After treatment" },
  ],
  title: miftah.label,
  place: miftah.name,
  label: miftah.label,
};

export function ResultsCases() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [open, setOpen] = useState<Pair | null>(null);

  /* Pause the film whenever less than half of it is in view. */
  useEffect(() => {
    const el = videoRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.5 && !el.paused) el.pause();
      },
      { threshold: [0, 0.5, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!SHOW_FMR_CASE_IMAGES) return null;

  const pairs = SHOW_MIFTAH_FMR_PAIR ? [...PAIRS, MIFTAH] : PAIRS;
  const count = pairs.length + 1;

  const play = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    setMuted(true);
    setStarted(true);
    el.play().catch(() => {
      /* Native controls remain available if playback is refused. */
    });
  };

  const toggleSound = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <section id="results" className={styles.section} aria-labelledby="fmr-cases-title">
      <div className={styles.container}>
        <div className={styles.layout} data-count={count}>
          <div className={styles.head}>
            <Reveal>
              <SectionHeader titleId="fmr-cases-title" sans={CASES.sans} accent={CASES.accent} />
            </Reveal>
            <Reveal delay={90}>
              <p className={`${styles.lede} section-lede`}>
                <RichText parts={CASES.intro} />
              </p>
            </Reveal>
          </div>

          <SwipeRow count={count} label="Choose a case" rowClassName={styles.row} stagger={100}>
            {pairs.map((pair) => (
              <figure className={styles.card} key={pair.key}>
                <Reveal variant="mask" className={styles.media}>
                  <div className={styles.pair}>
                    {pair.photos.map((photo) => (
                      <button
                        key={photo.src}
                        type="button"
                        className={styles.thumb}
                        onClick={() => setOpen(pair)}
                        aria-haspopup="dialog"
                        aria-label={`Enlarge before and after photographs. ${photo.alt}`}
                      >
                        <Image
                          className={styles.image}
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 767px) 140px, (max-width: 1100px) 22vw, 200px"
                        />
                      </button>
                    ))}
                  </div>
                </Reveal>
                <div className={styles.labels}>
                  <p>{pair.photos[0].label}</p>
                  <p>{pair.photos[1].label}</p>
                </div>
                <figcaption className={styles.caption}>
                  <b>{pair.place}</b>
                  <span>{pair.label}</span>
                </figcaption>
              </figure>
            ))}

            <figure className={styles.card}>
              <Reveal variant="mask" className={styles.media}>
                <div className={`${styles.film} ${started ? styles.playing : ""}`}>
                  <video
                    ref={videoRef}
                    className={styles.video}
                    controls={started}
                    playsInline
                    muted
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
                      <span className={styles.playIcon}>
                        <Play size={20} aria-hidden="true" />
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.sound}
                      onClick={toggleSound}
                      aria-pressed={!muted}
                      aria-label={muted ? "Turn the sound on" : "Turn the sound off"}
                    >
                      {muted ? (
                        <VolumeX size={18} aria-hidden="true" />
                      ) : (
                        <Volume2 size={18} aria-hidden="true" />
                      )}
                    </button>
                  )}
                </div>
              </Reveal>
              <div className={styles.labels} aria-hidden="true" />
              <figcaption className={styles.caption}>
                <b>{video.place}</b>
                <span>{video.label}</span>
              </figcaption>
            </figure>
          </SwipeRow>
        </div>

        <Reveal className={styles.consent} delay={120}>
          <p className={styles.evidence}>{CASES.evidence}</p>
          <p className={styles.privacy}>
            {CASES.privacyLead}
            <Link className={styles.privacyLink} href={CASES.privacyHref}>
              {CASES.privacyLinkText}
            </Link>
            .
          </p>
        </Reveal>
      </div>

      {open ? (
        <Lightbox
          title={open.title}
          caption={open.place}
          photos={open.photos}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </section>
  );
}
