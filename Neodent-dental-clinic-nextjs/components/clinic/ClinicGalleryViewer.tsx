"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import type { ClinicGalleryImage } from "@/lib/site-data";
import styles from "./ClinicGalleryViewer.module.css";

/* ------------------------------------------------------------------
   Full-image preview lightbox for the clinic page's "Spaces designed
   around care." photo mosaic (InsideNeoDent). Mirrors the About
   page's ArchiveViewer mechanics exactly (keyboard nav, touch swipe,
   focus trap, body scroll lock, dot strip) but is scoped to this
   page's own ClinicGalleryImage dataset (branch + label) rather than
   ArchiveViewer's press caption/source fields — kept as a separate,
   local component rather than generalising ArchiveViewer, since the
   two datasets and their card fields differ.

   Keyboard: ArrowLeft/ArrowRight to navigate, Escape to close.
   Accessibility: dialog role, aria-modal, focus trapped inside modal,
   focus restored on close, body scroll locked while open.
   Motion: opacity + scale/translate only; respects
   prefers-reduced-motion.
   ------------------------------------------------------------------ */

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface ClinicGalleryViewerProps {
  images: readonly ClinicGalleryImage[];
  initialIndex?: number;
  onClose: () => void;
}

export function ClinicGalleryViewer({
  images,
  initialIndex = 0,
  onClose,
}: ClinicGalleryViewerProps) {
  const total = images.length;
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (i < total - 1 ? i + 1 : i));
  }, [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      else if (e.key === "Escape") { onClose(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.body.style.overflow = original; };
  }, []);

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

  const item = images[index];

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
        aria-label={`NeoDent clinic gallery — image ${index + 1} of ${total}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Top bar */}
        <div className={styles.topBar}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            Inside NeoDent
          </span>
          <span className={styles.counter} aria-live="polite" aria-atomic="true">
            {pad(index + 1)}&thinsp;/&thinsp;{pad(total)}
          </span>
          <button
            ref={closeRef}
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close gallery viewer"
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
            style={item.position ? { objectPosition: item.position } : undefined}
          />
        </div>

        {/* Caption */}
        <div className={styles.caption}>
          <span className={styles.captionText}>{item.label}</span>
          <span className={styles.captionSource}>{item.branch} · Hyderabad</span>
        </div>

        {/* Navigation */}
        <div className={styles.nav}>
          <button
            type="button"
            className={`${styles.navBtn} ${index === 0 ? styles.navDisabled : ""}`}
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous gallery image"
            aria-disabled={index === 0}
          >
            <span aria-hidden="true">←</span>
            <span className={styles.navLbl}>PREV</span>
          </button>
          <span className={styles.navDots} aria-hidden="true">
            {images.map((_, i) => (
              <span
                key={i}
                className={`${styles.navDot} ${i === index ? styles.navDotActive : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </span>
          <button
            type="button"
            className={`${styles.navBtn} ${index === total - 1 ? styles.navDisabled : ""}`}
            onClick={next}
            disabled={index === total - 1}
            aria-label="Next gallery image"
            aria-disabled={index === total - 1}
          >
            <span className={styles.navLbl}>NEXT</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
