"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "./Lightbox.module.css";

export type LightboxPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Visible label under the photograph ("Before Treatment"); may be empty. */
  label: string;
};

/* Native <dialog> opened with showModal(): the browser traps focus, makes the
   page behind inert, closes on Escape and returns focus to the opener. A tap
   on the backdrop also closes it. Photographs are shown whole (contain) so
   nothing is cropped; they are exactly the supplied files (any pixelation is
   baked into them). No download link. Rendered only while open.

   layout "pair":   every photograph side by side (before and after together).
   layout "series": one photograph at a time with previous and next buttons,
                    the arrow keys and progress dots (no "n / n" counter). */
export function Lightbox({
  title,
  caption,
  photos,
  layout,
  startIndex = 0,
  onClose,
}: {
  title: string;
  caption: string;
  photos: LightboxPhoto[];
  layout: "pair" | "series";
  startIndex?: number;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(startIndex);
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

  const step = (delta: number) => setIndex((i) => Math.min(last, Math.max(0, i + delta)));

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="sd-lightbox-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (layout !== "series") return;
        if (event.key === "ArrowLeft") step(-1);
        if (event.key === "ArrowRight") step(1);
      }}
    >
      <div className={styles.panel}>
        <div className={styles.head}>
          <div>
            <p id="sd-lightbox-title" className={styles.title}>
              {title}
            </p>
            <p className={styles.caption}>{caption}</p>
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close enlarged photographs">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {layout === "pair" ? (
          <div className={styles.photos}>
            {photos.map((photo) => (
              <figure className={styles.figure} key={photo.src}>
                <div className={styles.frame}>
                  <Image
                    className={styles.image}
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 767px) 92vw, 44vw"
                  />
                </div>
                <figcaption className={styles.label}>{photo.label}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className={styles.series}>
            <div className={styles.stage}>
              <button
                type="button"
                className={styles.nav}
                onClick={() => step(-1)}
                disabled={index === 0}
                aria-label="Previous photograph"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <figure className={styles.figure}>
                <div className={styles.frame}>
                  <Image
                    key={photos[index].src}
                    className={styles.image}
                    src={photos[index].src}
                    alt={photos[index].alt}
                    width={photos[index].width}
                    height={photos[index].height}
                    sizes="(max-width: 767px) 92vw, 70vw"
                  />
                </div>
              </figure>
              <button
                type="button"
                className={styles.nav}
                onClick={() => step(1)}
                disabled={index === last}
                aria-label="Next photograph"
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </div>
            <div className={styles.dots} role="group" aria-label="Choose a photograph">
              {photos.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  className={styles.dotButton}
                  onClick={() => setIndex(i)}
                  aria-label={`Show photograph ${i + 1} of ${photos.length}`}
                  aria-current={i === index ? "true" : undefined}
                >
                  <span className={styles.dot} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
