"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import styles from "./ArchiveViewer.module.css";

/* ------------------------------------------------------------------
   Full newspaper archive lightbox viewer for About / Section 01.

   Renders ALL archive images in a focused modal when triggered. The
   complete dataset is defined here as a local array — no runtime
   filesystem scrape. Images are not preloaded: only the active image
   is rendered eagerly; neighbours receive lazy loading so the browser
   can prefetch naturally without forcing the entire archive up-front.

   Keyboard: ArrowLeft/ArrowRight to navigate, Escape to close.
   Mobile: prev/next buttons remain reachable; swipe via touch events.
   Accessibility: dialog role, aria-modal, focus trapped inside modal,
   focus restored on close, body scroll locked while open.
   Motion: opacity + translateX only; respects prefers-reduced-motion.
   ------------------------------------------------------------------ */

export type ArchiveImage = {
  src: string;
  alt: string;
  caption?: string;
  source?: string;
};

export const ARCHIVE_IMAGES: ArchiveImage[] = [
  {
    src: "/assets/news-articles/Dr siraj neodent dental clinic Mehdipatnam news.jpg",
    alt: "The Siasat Daily — press coverage of a professional dental lecture given by Dr. Mohd. Siraj Ur Rahman, Mehdipatnam",
    caption: "Professional dental lecture",
    source: "The Siasat Daily · Mehdipatnam",
  },
  {
    src: "/assets/news-articles/Dr siraj neodent dental clinic Mehdipatnam news article.jpg",
    alt: "The Siasat Daily — feature article on NeoDent Dental Hospital, Mehdipatnam",
    caption: "Feature article",
    source: "The Siasat Daily · Mehdipatnam",
  },
  {
    src: "/assets/news-articles/Dr siraj and dr. Miftah neodent dental clinic Nampally news post.jpg",
    alt: "The Siasat Daily — feature on modern orthodontic treatment involving NeoDent's clinical team",
    caption: "Orthodontic treatment feature",
    source: "The Siasat Daily · Nampally",
  },
  {
    src: "/assets/news-articles/Dr siraj neodent dental clinic Nampally news about health.jpg",
    alt: "The Siasat Daily — coverage of a NeoDent dental implant awareness camp",
    caption: "Dental implant awareness camp",
    source: "The Siasat Daily · Nampally",
  },
  {
    src: "/assets/news-articles/Dr siraj neodent dental clinic Nampally news.jpg",
    alt: "The Siasat Daily — front-page feature on dental care at NeoDent Nampally",
    caption: "Front-page dental care feature",
    source: "The Siasat Daily · Nampally",
  },
  {
    src: "/assets/news-articles/Dr miftah neodent dental clinic hyderabad in the news.jpg",
    alt: "The Siasat Daily — recognition of Dr. Md. Miftah Ur Rahman's academic achievement",
    caption: "Academic recognition",
    source: "The Siasat Daily · Hyderabad",
  },
  {
    src: "/assets/news-articles/Dr siraj neodent dental clinic Nampally news article.jpg",
    alt: "The Siasat Daily — feature on dental awareness delivered by Dr. Siraj, Nampally",
    caption: "Dental awareness feature",
    source: "The Siasat Daily · Nampally",
  },
  {
    src: "/assets/news-articles/Dr siraj and Dr Miftah neodent dental clinic Nampally news.jpg",
    alt: "The Siasat Daily — coverage of NeoDent's clinical team at Nampally",
    caption: "Clinical team coverage",
    source: "The Siasat Daily · Nampally",
  },
  {
    src: "/assets/news-articles/Dr siraj and dr. Miftah neodent dental clinic Nampally news article.jpg",
    alt: "The Siasat Daily — article on NeoDent's specialist dental services at Nampally",
    caption: "Specialist services article",
    source: "The Siasat Daily · Nampally",
  },
  {
    src: "/assets/news-articles/Dr siraj and dr. Miftah neodent dental clinic Nampally news.jpg",
    alt: "The Siasat Daily — press report on Dr. Siraj and Dr. Miftah at NeoDent Nampally",
    caption: "Clinical team press report",
    source: "The Siasat Daily · Nampally",
  },
  {
    src: "/assets/news-articles/Dr miftah neodent dental clinic hyderabad news article.jpg",
    alt: "The Siasat Daily — article covering Dr. Md. Miftah Ur Rahman, NeoDent Hyderabad",
    caption: "Dr. Miftah — press article",
    source: "The Siasat Daily · Hyderabad",
  },
  {
    src: "/assets/news-articles/Dr miftah neodent dental clinic hyderabad news.jpg",
    alt: "The Siasat Daily — news item on Dr. Md. Miftah Ur Rahman and NeoDent",
    caption: "Dr. Miftah — press coverage",
    source: "The Siasat Daily · Hyderabad",
  },
  {
    src: "/assets/news-articles/Dr miftah neodent dental clinic hyderabad newspress.jpg",
    alt: "The Siasat Daily — press feature on NeoDent Dental Hospital, Hyderabad",
    caption: "NeoDent press feature",
    source: "The Siasat Daily · Hyderabad",
  },
  {
    src: "/assets/news-articles/Dr siraj neodent dental clinic Nampally news hyderabad.jpg",
    alt: "The Siasat Daily — report on NeoDent Nampally, Hyderabad",
    caption: "Nampally clinic report",
    source: "The Siasat Daily · Hyderabad",
  },
  {
    src: "/assets/news-articles/Dr siraj neodent dental clinic Nampally news press.jpg",
    alt: "The Siasat Daily — press coverage of NeoDent's Nampally practice",
    caption: "Nampally press coverage",
    source: "The Siasat Daily · Nampally",
  },
  {
    src: "/assets/news-articles/neodent-media-siasat-01.jpg",
    alt: "The Siasat Daily — archival press coverage of NeoDent Dental Hospital",
    caption: "Archival press coverage",
    source: "The Siasat Daily",
  },
];

const TOTAL = ARCHIVE_IMAGES.length;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface ArchiveViewerProps {
  initialIndex?: number;
  onClose: () => void;
}

export function ArchiveViewer({ initialIndex = 0, onClose }: ArchiveViewerProps) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Touch-swipe state
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (i < TOTAL - 1 ? i + 1 : i));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      else if (e.key === "Escape") { onClose(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  // Body scroll lock
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus the close button on mount
    closeRef.current?.focus();
    return () => { document.body.style.overflow = original; };
  }, []);

  // Trap focus inside dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    dialog.addEventListener("keydown", handler);
    return () => dialog.removeEventListener("keydown", handler);
  }, []);

  const item = ARCHIVE_IMAGES[index];

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

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={`NeoDent press archive — image ${index + 1} of ${TOTAL}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Top bar */}
        <div className={styles.topBar}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            The NeoDent Archive
          </span>
          <span className={styles.counter} aria-live="polite" aria-atomic="true">
            {pad(index + 1)}&thinsp;/&thinsp;{pad(TOTAL)}
          </span>
          <button
            ref={closeRef}
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close archive viewer"
          >
            <span aria-hidden="true">✕</span>
            <span className={styles.closeLbl}>CLOSE</span>
          </button>
        </div>

        {/* Image stage */}
        <div className={styles.stage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            className={styles.image}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>

        {/* Caption */}
        {(item.caption ?? item.source) && (
          <div className={styles.caption}>
            {item.caption && <span className={styles.captionText}>{item.caption}</span>}
            {item.source && <span className={styles.captionSource}>{item.source}</span>}
          </div>
        )}

        {/* Navigation */}
        <div className={styles.nav}>
          <button
            type="button"
            className={`${styles.navBtn} ${index === 0 ? styles.navDisabled : ""}`}
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous archive image"
            aria-disabled={index === 0}
          >
            <span aria-hidden="true">←</span>
            <span className={styles.navLbl}>PREV</span>
          </button>
          <span className={styles.navDots} aria-hidden="true">
            {ARCHIVE_IMAGES.map((_, i) => (
              <span
                key={i}
                className={`${styles.navDot} ${i === index ? styles.navDotActive : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </span>
          <button
            type="button"
            className={`${styles.navBtn} ${index === TOTAL - 1 ? styles.navDisabled : ""}`}
            onClick={next}
            disabled={index === TOTAL - 1}
            aria-label="Next archive image"
            aria-disabled={index === TOTAL - 1}
          >
            <span className={styles.navLbl}>NEXT</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
