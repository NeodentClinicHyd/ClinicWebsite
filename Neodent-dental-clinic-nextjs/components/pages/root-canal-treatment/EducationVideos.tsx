"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { EDUCATION_VIDEOS } from "@/lib/root-canal-treatment-page";
import { SectionHeader } from "./SectionHeader";
import styles from "./EducationVideos.module.css";

type VideoItem = (typeof EDUCATION_VIDEOS.items)[number];

/* Educational films (beige), between the crown section and the aftercare.
   Click-to-load: each card first shows only its supplied thumbnail (a
   next/image, lazy by default) and a play button. No <video> element exists
   until the visitor presses play, so no video bytes are requested on page
   load. On press, a native <video controls preload="none"> is mounted over
   the thumbnail and play() is called from that same user gesture; the
   browser then fetches the file. The thumbnail stays underneath until the
   first frame paints, and the frame keeps its 9 / 16 box throughout, so
   nothing shifts. Native controls give pause, resume, seek and replay.
   Starting one film pauses the other. If the file cannot be played, the card
   shows a short message with a retry button. */
export function EducationVideos() {
  const players = useRef<Record<string, HTMLVideoElement | null>>({});

  const pauseOthers = (id: string) => {
    for (const [key, el] of Object.entries(players.current)) {
      if (key !== id && el && !el.paused) el.pause();
    }
  };

  return (
    <section className={styles.section} aria-labelledby="rct-videos-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="rct-videos-title"
            sans={EDUCATION_VIDEOS.sans}
            accent={EDUCATION_VIDEOS.accent}
            plain
          >
            <p className="section-lede">{EDUCATION_VIDEOS.intro}</p>
          </SectionHeader>
        </Reveal>

        <Reveal className={styles.grid} stagger={100}>
          {EDUCATION_VIDEOS.items.map((item) => (
            <VideoCard
              key={item.id}
              item={item}
              register={(el) => {
                players.current[item.id] = el;
              }}
              onPlaying={() => pauseOthers(item.id)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function VideoCard({
  item,
  register,
  onPlaying,
}: {
  item: VideoItem;
  register: (el: HTMLVideoElement | null) => void;
  onPlaying: () => void;
}) {
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLVideoElement | null>(null);

  /* Start playback from the press that mounted the element. If the browser
     refuses, the native controls are still there. */
  useEffect(() => {
    if (!active || failed) return;
    ref.current?.play().catch(() => {});
  }, [active, failed]);

  const titleId = `rct-video-${item.id}`;

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.frame}>
        <Image
          className={styles.thumb}
          src={item.poster}
          alt={item.alt}
          fill
          sizes="(max-width: 1100px) 280px, 260px"
        />
        {active && !failed ? (
          <video
            ref={(el) => {
              ref.current = el;
              register(el);
            }}
            className={styles.video}
            src={item.src}
            controls
            playsInline
            preload="none"
            width={EDUCATION_VIDEOS.width}
            height={EDUCATION_VIDEOS.height}
            aria-label={item.title}
            onPlaying={onPlaying}
            onError={() => setFailed(true)}
          />
        ) : null}
        {!active && !failed ? (
          <button
            type="button"
            className={styles.play}
            onClick={() => setActive(true)}
            aria-label={`${EDUCATION_VIDEOS.playPrefix}${item.title}`}
          >
            <span className={styles.playIcon}>
              <Play size={22} aria-hidden="true" />
            </span>
          </button>
        ) : null}
        {failed ? (
          <div className={styles.error} role="alert">
            <p>{EDUCATION_VIDEOS.errorText}</p>
            <button
              type="button"
              className={styles.retry}
              onClick={() => {
                setFailed(false);
                setActive(false);
              }}
            >
              {EDUCATION_VIDEOS.retryText}
            </button>
          </div>
        ) : null}
      </div>
      <div className={styles.body}>
        <h3 id={titleId} className={styles.title}>
          {item.title}
        </h3>
        <p className={styles.note}>{item.note}</p>
      </div>
    </article>
  );
}
