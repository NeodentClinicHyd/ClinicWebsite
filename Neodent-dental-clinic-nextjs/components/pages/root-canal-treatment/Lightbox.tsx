"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "./Lightbox.module.css";

export type LightboxPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Visible label under the photograph ("Pre-treatment"). */
  label: string;
};

/* Native <dialog> opened with showModal(): the browser traps focus, makes the
   page behind inert, closes on Escape and returns focus to the opener. A tap
   on the backdrop also closes it. Radiographs are shown whole (contain), at
   most 72dvh tall, exactly as supplied. Previous and next step through the
   series (arrow keys work too). No download link. Rendered only while open. */
export function Lightbox({
  title,
  caption,
  photos,
  index,
  onIndex,
  onClose,
}: {
  title: string;
  caption: string;
  photos: LightboxPhoto[];
  index: number;
  onIndex: (next: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const photo = photos[index];
  const last = photos.length - 1;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  const step = (delta: number) => onIndex(Math.min(last, Math.max(0, index + delta)));

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="rct-lightbox-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") step(-1);
        if (event.key === "ArrowRight") step(1);
      }}
    >
      <div className={styles.panel}>
        <div className={styles.head}>
          <div>
            <p id="rct-lightbox-title" className={styles.title}>
              {title}
            </p>
            <p className={styles.caption}>{caption}</p>
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close enlarged radiograph">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <figure className={styles.figure}>
          <div className={styles.frame}>
            <button
              type="button"
              className={`${styles.nav} ${styles.prev}`}
              onClick={() => step(-1)}
              disabled={index === 0}
              aria-label="Previous radiograph"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <Image
              className={styles.image}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 767px) 92vw, 960px"
            />
            <button
              type="button"
              className={`${styles.nav} ${styles.next}`}
              onClick={() => step(1)}
              disabled={index === last}
              aria-label="Next radiograph"
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </div>
          <figcaption className={styles.label} aria-live="polite">
            {photo.label}
          </figcaption>
        </figure>
      </div>
    </dialog>
  );
}
