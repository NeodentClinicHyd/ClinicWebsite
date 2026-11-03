"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import styles from "./Lightbox.module.css";

export type LightboxPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Visible label under the photograph ("Before surgery"). */
  label: string;
};

/* Native <dialog> opened with showModal(): the browser traps focus, makes the
   page behind inert, closes on Escape and returns focus to the opener. A tap
   on the backdrop also closes it. Photographs are shown whole (contain) so
   nothing is cropped; they are exactly the supplied files (any pixelation is
   baked into them). No download link. Rendered only while open. */
export function Lightbox({
  title,
  caption,
  photos,
  onClose,
}: {
  title: string;
  caption: string;
  photos: LightboxPhoto[];
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

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

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="di-lightbox-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.panel}>
        <div className={styles.head}>
          <div>
            <p id="di-lightbox-title" className={styles.title}>
              {title}
            </p>
            <p className={styles.caption}>{caption}</p>
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close enlarged photographs">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
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
      </div>
    </dialog>
  );
}
