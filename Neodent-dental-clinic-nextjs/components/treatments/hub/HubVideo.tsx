"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import styles from "./hub.module.css";

/* Poster-first film: preload="none" with a poster, no autoplay, native
   controls appear once playback is started from the play button (which
   is a real <button>, 56px). Only one hub film plays at a time, and a
   film pauses when it scrolls out of view. The aria-label describes the
   poster frame as well as the film. */

const PLAY_EVENT = "neodent-hub-video-play";

export function HubVideo({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame) return;

    const onOtherPlays = (event: Event) => {
      if ((event as CustomEvent<HTMLVideoElement>).detail !== video) video.pause();
    };
    window.addEventListener(PLAY_EVENT, onOtherPlays);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(frame);

    return () => {
      window.removeEventListener(PLAY_EVENT, onOtherPlays);
      observer.disconnect();
    };
  }, []);

  const start = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: video }));
    void video.play().catch(() => undefined);
    video.focus();
  };

  return (
    <div ref={frameRef} className={`${styles.video} ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        preload="none"
        playsInline
        controls={started}
        aria-label={label}
        onPlay={() =>
          window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: videoRef.current }))
        }
      >
        <source src={src} type="video/mp4" />
      </video>
      {!started && (
        <button
          type="button"
          className={styles.play}
          onClick={start}
          aria-label={`Play: ${label}`}
        >
          <Play fill="currentColor" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
