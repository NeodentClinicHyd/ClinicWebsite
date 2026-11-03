"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "./DocumentViewer.module.css";

/* ------------------------------------------------------------------
   DocumentViewer -- lightbox for press cuttings and other documents.

   Shows one item whole at full size with its caption and alt. Focus is
   trapped inside the dialog, Escape closes, arrows (and the buttons)
   move between items, body scroll is locked while open, and focus
   returns to the element that opened it. No library. The crossfade is
   opacity and a small translate only, and is off under reduced motion.
   Written once for S6 and reused for S10.
   ------------------------------------------------------------------ */

export type DocumentItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  source: string;
};

type Props = {
  items: DocumentItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export function DocumentViewer({ items, index, onIndexChange, onClose }: Props) {
  const [opener] = useState(() => document.activeElement as HTMLElement | null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const last = items.length - 1;

  // The viewer is only rendered after a click, so `document` always exists.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = original;
      opener?.focus();
    };
  }, [opener]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        onIndexChange(index - 1);
      } else if (e.key === "ArrowRight" && index < last) {
        e.preventDefault();
        onIndexChange(index + 1);
      } else if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>("button:not([disabled])"),
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const lastEl = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, last, onClose, onIndexChange]);

  const touchX = useRef<number | null>(null);
  const item = items[index];

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
        aria-label={`${item.caption}, ${item.source}`}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(delta) < 48) return;
          if (delta < 0 && index < last) onIndexChange(index + 1);
          if (delta > 0 && index > 0) onIndexChange(index - 1);
        }}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close viewer"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className={styles.stage}>
          <Image
            key={item.src}
            className={styles.image}
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            sizes="100vw"
          />
        </div>

        <div className={styles.bar}>
          <button
            type="button"
            className={styles.nav}
            onClick={() => onIndexChange(index - 1)}
            disabled={index === 0}
            aria-label="Previous cutting"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <p className={styles.caption} aria-live="polite">
            <span className={styles.captionText}>{item.caption}</span>
            <span className={styles.captionSource}>
              {item.source} · {index + 1} of {items.length}
            </span>
          </p>
          <button
            type="button"
            className={styles.nav}
            onClick={() => onIndexChange(index + 1)}
            disabled={index === last}
            aria-label="Next cutting"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
