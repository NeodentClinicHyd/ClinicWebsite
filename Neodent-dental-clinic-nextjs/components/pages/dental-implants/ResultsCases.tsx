"use client";

import { useEffect, useRef, useState, type UIEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SHOW_IMPLANT_CASE_IMAGES } from "@/lib/dental-implants-page";
import { Emphasis } from "./Emphasis";
import { Lightbox, type LightboxPhoto } from "./Lightbox";
import { SectionHeader } from "./SectionHeader";
import styles from "./ResultsCases.module.css";

/* Case 1: Nampally upper arch (960x1280 originals; the face mosaic is baked
   into the files and is never touched). */
const CASE_ONE_BEFORE =
  "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - before surgery.jpg";
const CASE_ONE_AFTER =
  "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - after surgery.jpg";
const CASE_ONE_BEFORE_ALT = "Upper arch before implant surgery, Nampally case";
const CASE_ONE_AFTER_ALT =
  "Upper arch rehabilitation with implants after surgery at Neodent Dental Hospital";

/* Case 2: Dr. Miftah's supplied pair (315x316 and 535x413). */
const CASE_TWO_BEFORE =
  "/assets/dr-miftah/treatments/web/dr-md-miftah-ur-rahman-dental-implants-before.webp";
const CASE_TWO_AFTER =
  "/assets/dr-miftah/treatments/web/dr-md-miftah-ur-rahman-dental-implants-after.webp";
const CASE_TWO_BEFORE_ALT =
  "Close-up of teeth before implant treatment, Dr. Md. Miftah Ur Rahman's case";
const CASE_TWO_AFTER_ALT =
  "Close-up of teeth after implant treatment, Dr. Md. Miftah Ur Rahman's case";

/* Case 3: film, source 1080x1920 (9:16), preload none. */
const VIDEO_SRC =
  "/assets/treatment-video/neodent-full-mouth-rehabilitation-using-dental-implants.mp4";
const VIDEO_POSTER =
  "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - after surgery.jpg";

type PairKey = "nampally" | "miftah";

const LIGHTBOX: Record<PairKey, { title: string; caption: string; photos: LightboxPhoto[] }> = {
  nampally: {
    title: "Upper arch rehabilitation with dental implants",
    caption: "Nampally",
    photos: [
      { src: CASE_ONE_BEFORE, alt: CASE_ONE_BEFORE_ALT, width: 960, height: 1280, label: "Before surgery" },
      { src: CASE_ONE_AFTER, alt: CASE_ONE_AFTER_ALT, width: 960, height: 1280, label: "After surgery" },
    ],
  },
  miftah: {
    title: "Before and after treatment",
    caption: "Dr. Md. Miftah Ur Rahman",
    photos: [
      { src: CASE_TWO_BEFORE, alt: CASE_TWO_BEFORE_ALT, width: 315, height: 316, label: "Before treatment" },
      { src: CASE_TWO_AFTER, alt: CASE_TWO_AFTER_ALT, width: 535, height: 413, label: "After treatment" },
    ],
  },
};

const CARD_COUNT = 3;

/* Results, directly after the page header (plan 4.2). Heading left and
   introduction right; three equal-height cards in one row (Case A pair,
   Case B pair, Case C film); a swipe row with progress dots on phones; the
   consent strip under the row. Every photograph opens a lightbox with the
   pair together. The film plays in place on a user press, muted until the
   viewer unmutes it, and pauses when it scrolls out of view.
   Rendered only while SHOW_IMPLANT_CASE_IMAGES is true. */
export function ResultsCases() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [open, setOpen] = useState<PairKey | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) video.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (!SHOW_IMPLANT_CASE_IMAGES) return null;

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    video.play().catch(() => {
      /* Native controls remain available if playback is refused. */
    });
  };

  const onScroll = (event: UIEvent<HTMLElement>) => {
    const scroller = event.currentTarget;
    const first = scroller.children[0] as HTMLElement | undefined;
    if (!first) return;
    const step = first.getBoundingClientRect().width + 14;
    setActive(Math.min(CARD_COUNT - 1, Math.max(0, Math.round(scroller.scrollLeft / step))));
  };

  const goTo = (index: number) => {
    const scroller = wrapRef.current?.querySelector<HTMLElement>("[data-row]");
    const card = scroller?.children[index] as HTMLElement | undefined;
    if (!scroller || !card) return;
    scroller.scrollTo({ left: card.offsetLeft - scroller.offsetLeft, behavior: "smooth" });
  };

  const thumb = (pair: PairKey, src: string, alt: string) => (
    <button
      type="button"
      className={styles.thumb}
      onClick={() => setOpen(pair)}
      aria-haspopup="dialog"
      aria-label={`Enlarge before and after photographs. ${alt}`}
    >
      <Image
        className={styles.image}
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 767px) 140px, (max-width: 1100px) 22vw, 190px"
      />
    </button>
  );

  return (
    <section id="results" className={styles.section} aria-labelledby="di-cases-title">
      <div className={styles.container}>
        <div className={styles.head}>
          <Reveal className={styles.headTitle}>
            <SectionHeader titleId="di-cases-title" sans="Dental implant cases" accent="from Neodent." />
          </Reveal>
          <Reveal className={styles.headLede} delay={90}>
            <p className="section-lede">
              Photographs from{" "}
              <Emphasis tone="secondary">implant treatment at Neodent</Emphasis>, shown so you
              can see what treatment can involve. Every case is different, and these images are{" "}
              <Emphasis tone="quiet">not a prediction for your own mouth</Emphasis>.
            </p>
          </Reveal>
        </div>

        <div ref={wrapRef}>
          <Reveal className={styles.row} stagger={100} data-row="" onScroll={onScroll}>
            <figure className={styles.card}>
              <Reveal variant="mask" className={styles.media}>
                <div className={styles.pair}>
                  {thumb("nampally", CASE_ONE_BEFORE, CASE_ONE_BEFORE_ALT)}
                  {thumb("nampally", CASE_ONE_AFTER, CASE_ONE_AFTER_ALT)}
                </div>
              </Reveal>
              <div className={styles.labels}>
                <span>Before surgery</span>
                <span>After surgery</span>
              </div>
              <figcaption className={styles.caption}>
                <b>Nampally</b>
                <span>Upper arch rehabilitation with dental implants</span>
              </figcaption>
            </figure>

            <figure className={styles.card}>
              <Reveal variant="mask" className={styles.media}>
                <div className={styles.pair}>
                  {thumb("miftah", CASE_TWO_BEFORE, CASE_TWO_BEFORE_ALT)}
                  {thumb("miftah", CASE_TWO_AFTER, CASE_TWO_AFTER_ALT)}
                </div>
              </Reveal>
              <div className={styles.labels}>
                <span>Before treatment</span>
                <span>After treatment</span>
              </div>
              <figcaption className={styles.caption}>
                <b>Dr. Md. Miftah Ur Rahman</b>
                <span>Before and after treatment</span>
              </figcaption>
            </figure>

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
                      <span className={styles.playIcon}>
                        <Play size={20} aria-hidden="true" />
                      </span>
                    </button>
                  ) : null}
                </div>
              </Reveal>
              <div className={styles.labels} aria-hidden="true" />
              <figcaption className={styles.caption}>
                <b>Mehdipatnam</b>
                <span>Full-mouth rehabilitation using dental implants</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className={styles.dots} role="group" aria-label="Choose a case">
          {Array.from({ length: CARD_COUNT }, (_, index) => (
            <button
              key={index}
              type="button"
              className={styles.dotButton}
              onClick={() => goTo(index)}
              aria-label={`Show case ${index + 1} of ${CARD_COUNT}`}
              aria-current={active === index ? "true" : undefined}
            >
              <span className={styles.dot} />
            </button>
          ))}
        </div>

        <Reveal className={styles.consent} delay={120}>
          <p className={styles.evidence}>
            Supplied before and after clinical photographs from implant treatment at Neodent.
            Photographs are shown for patient understanding; implant treatment and its outcome
            vary from patient to patient.
          </p>
          <p className={styles.privacy}>
            Images are published in line with our{" "}
            <Link className={styles.privacyLink} href="/privacy-policy">
              privacy policy
            </Link>
            .
          </p>
        </Reveal>
      </div>

      {open ? (
        <Lightbox
          title={LIGHTBOX[open].title}
          caption={LIGHTBOX[open].caption}
          photos={LIGHTBOX[open].photos}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </section>
  );
}
