"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./TreatmentEvidenceViewer.module.css";

/* ------------------------------------------------------------------
   Treatment evidence viewer — Dr. Miftah profile, Section 03.

   Local copy of the ClinicGalleryViewer mechanics (keyboard nav, touch
   swipe, focus trap, body scroll lock), per the codebase convention of
   page-local viewers, extended with:
     - focus restored to the opening control on close
     - video items: the <video> element is mounted ONLY while its item
       is active (nothing is fetched before the visitor asks), played
       from the opening click, and paused + unloaded on close/navigate,
       so at most one film exists at any time
   Portalled to <body> so the fixed overlay is never trapped by the
   section's reveal transform / overflow.
   ------------------------------------------------------------------ */

export type EvidenceItem =
  | {
      kind: "image";
      src: string;
      width: number;
      height: number;
      alt: string;
      caption: string;
    }
  | {
      kind: "video";
      src: string;
      caption: string;
      label: string;
    };

interface TreatmentEvidenceViewerProps {
  title: string;
  items: readonly EvidenceItem[];
  initialIndex?: number;
  onClose: () => void;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function FilmPlayer({ item }: { item: Extract<EvidenceItem, { kind: "video" }> }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    /* Called within the opening click's user-activation window. If the
       browser still refuses, native controls remain available. */
    video.play().catch(() => {});
    /* Only pause here. The <video> is unmounted with the player, which
       releases the media. Stripping `src` in cleanup breaks playback
       under React StrictMode (mount → cleanup → mount reuses the same
       element without re-applying the attribute). */
    return () => {
      video.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      className={styles.video}
      src={item.src}
      controls
      playsInline
      preload="auto"
      aria-label={item.label}
    />
  );
}

export function TreatmentEvidenceViewer({
  title,
  items,
  initialIndex = 0,
  onClose,
}: TreatmentEvidenceViewerProps) {
  const total = items.length;
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => setIndex((i) => (i > 0 ? i - 1 : i)), []);
  const next = useCallback(
    () => setIndex((i) => (i < total - 1 ? i + 1 : i)),
    [total],
  );

  /* Keyboard: arrows navigate, Escape closes, Tab is trapped. */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      /* Let the native video controls keep their own arrow seeking. */
      const inVideo = (e.target as HTMLElement | null)?.tagName === "VIDEO";
      if (e.key === "ArrowLeft" && !inVideo) {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight" && !inVideo) {
        e.preventDefault();
        next();
      } else if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = [
          ...dialog.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], video, [tabindex]:not([tabindex="-1"])',
          ),
        ];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !dialog.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !dialog.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  /* Body scroll lock + focus in on open, focus restore on close. */
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = original;
      opener?.focus?.();
    };
  }, []);

  const item = items[index];

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 48) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return createPortal(
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} — item ${index + 1} of ${total}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className={styles.topBar}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            {title}
          </span>
          <span
            className={styles.counter}
            aria-live="polite"
            aria-atomic="true"
            data-viewer-counter
          >
            {pad(index + 1)}&thinsp;/&thinsp;{pad(total)}
          </span>
          <button
            ref={closeRef}
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close viewer"
          >
            <span aria-hidden="true">✕</span>
            <span className={styles.closeLbl}>Close</span>
          </button>
        </div>

        <div className={styles.stage}>
          {item.kind === "image" ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className={styles.image}
              draggable={false}
              style={{ maxWidth: `min(100%, ${item.width}px)` }}
            />
          ) : (
            <FilmPlayer key={item.src} item={item} />
          )}
        </div>

        <div className={styles.caption}>
          <span className={styles.captionText}>{item.caption}</span>
          <span className={styles.captionSource}>
            Dr. Md. Miftah Ur Rahman · Neodent
          </span>
        </div>

        {total > 1 && (
          <div className={styles.nav}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={prev}
              disabled={index === 0}
              aria-label="Previous item"
            >
              <span aria-hidden="true">←</span>
              <span className={styles.navLbl}>Prev</span>
            </button>
            <button
              type="button"
              className={styles.navBtn}
              onClick={next}
              disabled={index === total - 1}
              aria-label="Next item"
            >
              <span className={styles.navLbl}>Next</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
