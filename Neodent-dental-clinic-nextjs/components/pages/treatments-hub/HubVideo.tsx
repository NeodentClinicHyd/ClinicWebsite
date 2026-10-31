"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import styles from "./HubVideo.module.css";

/* Hub film. Native <video>, muted, playsInline, loop, preload="none" with
   a poster, no native controls. Two modes:

   - "autoplay": plays only while at least half of it is in view and
     pauses when it leaves. It never autoplays under prefers-reduced-motion
     or when the visitor has Save-Data on; the poster stays with a
     visible play button instead.
   - "tap": plays and pauses on tap or on the button.

   Only one hub film plays at a time. The play/pause button and the optional
   sound button are 44x44 px with aria-labels. */

const PLAY_EVENT = "neodent-hub-video-play";

type Props = {
  src: string;
  poster: string;
  label: string;
  mode?: "autoplay" | "tap";
  /** Show a sound button (the clinician speaks in this film). */
  hasSpeech?: boolean;
  className?: string;
  /** CSS object-position for the cover crop. */
  objectPosition?: string;
};

function motionAllowed() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !conn?.saveData;
}

export function HubVideo({
  src,
  poster,
  label,
  mode = "tap",
  hasSpeech = false,
  className = "",
  objectPosition,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  /* Set once the visitor presses pause, so in-view autoplay does not
     restart a film they stopped on purpose. */
  const userPausedRef = useRef(false);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: video }));
    void video.play().catch(() => undefined);
  }, []);

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
        if (!entry.isIntersecting || entry.intersectionRatio < 0.5) {
          video.pause();
          return;
        }
        if (mode === "autoplay" && !userPausedRef.current && motionAllowed()) play();
      },
      { threshold: [0, 0.5] },
    );
    observer.observe(frame);

    return () => {
      window.removeEventListener(PLAY_EVENT, onOtherPlays);
      observer.disconnect();
    };
  }, [mode, play]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      play();
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div ref={frameRef} className={`${styles.frame} ${className}`}>
      <video
        ref={videoRef}
        className={styles.video}
        style={objectPosition ? { objectPosition } : undefined}
        poster={poster}
        preload="none"
        muted
        loop
        playsInline
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={mode === "tap" ? toggle : undefined}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.btn} ${playing ? styles.btnQuiet : styles.btnLarge}`}
          onClick={toggle}
          aria-label={playing ? `Pause: ${label}` : `Play: ${label}`}
        >
          {playing ? (
            <Pause fill="currentColor" aria-hidden="true" />
          ) : (
            <Play fill="currentColor" aria-hidden="true" />
          )}
        </button>
        {hasSpeech && (
          <button
            type="button"
            className={`${styles.btn} ${styles.btnQuiet} ${styles.btnSound}`}
            onClick={toggleSound}
            aria-label={muted ? `Turn sound on: ${label}` : `Turn sound off: ${label}`}
            aria-pressed={!muted}
          >
            {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
          </button>
        )}
      </div>
    </div>
  );
}
