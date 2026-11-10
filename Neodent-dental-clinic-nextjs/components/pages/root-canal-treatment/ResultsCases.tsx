"use client";

import { useEffect, useRef, useState, type ReactNode, type UIEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Volume2, VolumeX } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import {
  CASES,
  SHOW_RCT_CASE_MEDIA,
  SHOW_RCT_RADIOGRAPHS,
  type RadiographItem,
} from "@/lib/root-canal-treatment-page";
import { Lightbox, type LightboxPhoto } from "./Lightbox";
import { SectionHeader } from "./SectionHeader";
import styles from "./ResultsCases.module.css";

/* Results, directly after the page header (plan 4.2). Heading, then the
   cases. Case 1: one row of two equal-height cards, the radiograph series
   (before, during and after side by side) and the film. Case 2: the same
   series card on its own row. Below 1024 px each row becomes one swipe row
   (case 1: the three radiographs, then the film; case 2: the three
   radiographs) with its own progress dots; each series caption and the
   consent strip sit under their rows.
   Every radiograph opens a lightbox that steps through its own series only.
   The film plays in place on a user press, muted until the viewer turns the
   sound on, and pauses when it scrolls out of view.
   Rendered only while SHOW_RCT_CASE_MEDIA is true; the radiograph cards only
   while SHOW_RCT_RADIOGRAPHS is true. */

type Series = {
  title: string;
  items: RadiographItem[];
  width: number;
  height: number;
  caption: string;
};

const SERIES: Series[] = [CASES.radiographs, CASES.additional];

export function ResultsCases() {
  const { video } = CASES;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [open, setOpen] = useState<{ series: number; index: number } | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !el.paused) el.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!SHOW_RCT_CASE_MEDIA) return null;

  const showXrays = SHOW_RCT_RADIOGRAPHS;

  const play = () => {
    const el = videoRef.current;
    if (!el) return;
    setStarted(true);
    el.play().catch(() => {
      /* Native controls remain available if playback is refused. */
    });
  };

  const toggleSound = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setSoundOn(!el.muted);
  };

  const photosFor = (series: Series): LightboxPhoto[] =>
    series.items.map((item) => ({
      src: encodeURI(item.src),
      alt: item.alt,
      width: item.width ?? series.width,
      height: item.height ?? series.height,
      label: item.label,
    }));

  const film = (
    <figure className={styles.filmCard} data-slide="">
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
            width={video.width}
            height={video.height}
            aria-label={video.ariaLabel}
            onPlay={() => setStarted(true)}
            onVolumeChange={(event) => setSoundOn(!event.currentTarget.muted)}
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
              aria-pressed={soundOn}
              aria-label={soundOn ? "Turn the film sound off" : "Turn the film sound on"}
            >
              {soundOn ? (
                <Volume2 size={18} aria-hidden="true" />
              ) : (
                <VolumeX size={18} aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </Reveal>
      <figcaption className={styles.caption}>
        <b>{video.place}</b>
        <span>{video.label}</span>
      </figcaption>
    </figure>
  );

  const openSeries = open !== null ? SERIES[open.series] : null;

  return (
    <section id="results" className={styles.section} aria-labelledby="rct-cases-title">
      <div className={styles.container}>
        <Reveal className={styles.head}>
          <SectionHeader titleId="rct-cases-title" sans={CASES.sans} accent={CASES.accent} />
        </Reveal>

        {SERIES.map((series, seriesIndex) => (
          <CaseRow
            key={series.title}
            series={series}
            seriesIndex={seriesIndex}
            showXrays={showXrays}
            film={seriesIndex === 0 ? film : null}
            onOpen={(index) => setOpen({ series: seriesIndex, index })}
          />
        ))}

        <Reveal as="aside" className={styles.consent} delay={120} aria-label="About these images">
          <p className={styles.evidence}>
            {CASES.evidence}
            <Link className={styles.privacyLink} href={CASES.privacyHref}>
              {CASES.privacyLinkText}
            </Link>
            .
          </p>
          <p className={styles.statement}>{CASES.statement}</p>
        </Reveal>
      </div>

      {open !== null && openSeries && showXrays ? (
        <Lightbox
          title={`Root canal radiographs, ${openSeries.title}`}
          caption={openSeries.caption}
          photos={photosFor(openSeries)}
          index={open.index}
          onIndex={(index) => setOpen({ series: open.series, index })}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </section>
  );
}

/* One case: its title, a row (the series card, plus the film in case 1),
   progress dots for the swipe row and the series caption. Each row keeps its
   own scroll position and active dot. */
function CaseRow({
  series,
  seriesIndex,
  showXrays,
  film,
  onOpen,
}: {
  series: Series;
  seriesIndex: number;
  showXrays: boolean;
  film: ReactNode;
  onOpen: (index: number) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const slideCount = (showXrays ? series.items.length : 0) + (film ? 1 : 0);
  const captionId = `rct-series-caption-${seriesIndex}`;
  const titleId = `rct-case-title-${seriesIndex}`;

  if (slideCount === 0) return null;

  const slides = () =>
    Array.from(wrapRef.current?.querySelectorAll<HTMLElement>("[data-slide]") ?? []);

  const onScroll = (event: UIEvent<HTMLElement>) => {
    const scroller = event.currentTarget;
    const items = slides();
    if (items.length < 2) return;
    const step = items[1].offsetLeft - items[0].offsetLeft || 1;
    setActive(Math.min(items.length - 1, Math.max(0, Math.round(scroller.scrollLeft / step))));
  };

  const goTo = (index: number) => {
    const scroller = wrapRef.current?.querySelector<HTMLElement>("[data-row]");
    const slide = slides()[index];
    if (!scroller || !slide) return;
    scroller.scrollTo({ left: slide.offsetLeft - scroller.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className={seriesIndex > 0 ? styles.caseNext : undefined}>
      {showXrays ? (
        <h3 id={titleId} className={styles.caseTitle}>
          {series.title}
        </h3>
      ) : null}

      <div ref={wrapRef}>
        <Reveal
          className={`${styles.row} ${film ? "" : styles.rowSolo}`}
          stagger={100}
          data-row=""
          onScroll={onScroll}
        >
          {showXrays ? (
            <figure
              className={styles.series}
              aria-labelledby={titleId}
              aria-describedby={captionId}
            >
              <div className={styles.plates}>
                {series.items.map((item, index) => (
                  <div className={styles.plate} key={item.src} data-slide="">
                    <Reveal variant="mask" className={styles.media}>
                      <button
                        type="button"
                        className={styles.thumb}
                        onClick={() => onOpen(index)}
                        aria-haspopup="dialog"
                        aria-label={`Enlarge radiograph. ${item.alt}`}
                      >
                        <Image
                          className={styles.image}
                          src={encodeURI(item.src)}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 767px) 80vw, (max-width: 1100px) 30vw, 280px"
                        />
                      </button>
                    </Reveal>
                    <span className={styles.label}>{item.label}</span>
                  </div>
                ))}
              </div>
            </figure>
          ) : null}

          {film}
        </Reveal>
      </div>

      <div className={styles.dots} role="group" aria-label={`Choose an image, ${series.title}`}>
        {Array.from({ length: slideCount }, (_, index) => (
          <button
            key={index}
            type="button"
            className={styles.dotButton}
            onClick={() => goTo(index)}
            aria-label={`Show item ${index + 1} of ${slideCount}`}
            aria-current={active === index ? "true" : undefined}
          >
            <span className={styles.dot} />
          </button>
        ))}
      </div>

      {showXrays ? (
        <p id={captionId} className={styles.seriesCaption}>
          {series.caption}
        </p>
      ) : null}
    </div>
  );
}
