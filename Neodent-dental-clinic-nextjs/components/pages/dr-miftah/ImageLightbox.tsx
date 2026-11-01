"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import styles from "./ImageLightbox.module.css";

/* ------------------------------------------------------------------
   ImageLightbox -- the zoom viewer for the press archive (09) and the
   photograph wall. A native <dialog> opened with showModal(), so focus is
   trapped and the page behind is inert. It shows one photograph whole
   (object-fit: contain), its caption below it, previous and next buttons
   (44 px), a close button, Esc, arrow keys and swipe. Focus returns to
   the element that opened it, and the page does not scroll behind it.

   The enlarged image carries data-media-exempt: it is a viewer, so the
   70% media-height rule does not apply to it. The large file loads only
   when the viewer opens (the parent mounts this component on demand).
   Open and close are an opacity and 0.98 -> 1 scale fade of 250 ms,
   skipped under prefers-reduced-motion.
   ------------------------------------------------------------------ */

export type LightboxItem = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Visible caption; defaults to the alt text. */
  caption?: string;
};

type Props = {
  items: readonly LightboxItem[];
  /** Index of the photograph to show first. */
  initialIndex: number;
  /** Dialog title for assistive technology, e.g. "Press archive". */
  title: string;
  onClose: () => void;
};

const FADE_MS = 250;
const SWIPE_PX = 48;

export function ImageLightbox({ items, initialIndex, title, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef(false);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const [index, setIndex] = useState(initialIndex);
  const [shown, setShown] = useState(false);
  const total = items.length;
  const item = items[index];

  /* Open as a modal on mount, lock page scroll, remember the opener. */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    const frame = requestAnimationFrame(() => setShown(true));
    return () => {
      cancelAnimationFrame(frame);
      html.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      const opener = openerRef.current;
      if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, []);

  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShown(false);
    if (reduced) onClose();
    else window.setTimeout(onClose, FADE_MS);
  }, [onClose]);

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total),
    [total],
  );

  /* Esc fires `cancel`; run the same fade-out as the close button. */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      requestClose();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [requestClose]);

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    swipeRef.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1);
  };

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${shown ? styles.shown : ""}`}
      aria-label={title}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div className={styles.panel}>
        <div className={styles.bar}>
          <p className={styles.count} aria-live="polite">
            {title} &middot; {index + 1} of {total}
          </p>
          <button type="button" className={styles.close} onClick={requestClose} aria-label="Close viewer">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.stage} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
          {total > 1 && (
            <button
              type="button"
              className={`${styles.nav} ${styles.prev}`}
              onClick={() => step(-1)}
              aria-label="Previous photograph"
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
          )}
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            sizes="90vw"
            className={styles.image}
            data-media-exempt
            draggable={false}
          />
          {total > 1 && (
            <button
              type="button"
              className={`${styles.nav} ${styles.next}`}
              onClick={() => step(1)}
              aria-label="Next photograph"
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          )}
        </div>

        <p className={styles.caption}>{item.caption ?? item.alt}</p>
      </div>
    </dialog>
  );
}
