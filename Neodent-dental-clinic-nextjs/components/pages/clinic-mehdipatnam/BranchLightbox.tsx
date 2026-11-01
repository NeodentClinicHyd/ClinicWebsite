"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "./BranchLightbox.module.css";

/* ------------------------------------------------------------------
   Branch gallery lightbox. Forked from the /clinic hub's GalleryLightbox
   (the shared ClinicGalleryViewer stays as it was). A native <dialog>
   opened with showModal(): Escape closes it, focus is trapped inside
   while it is open and returns to the photograph that opened it, and the
   page behind is inert. Arrow keys and the two buttons move between the
   photographs. The photograph is shown whole (object-fit: contain)
   inside the media height cap, with its caption. Only the open
   photograph is rendered here; the gallery tiles stay in the page.
   ------------------------------------------------------------------ */

export type BranchLightboxItem = {
  src: string;
  alt: string;
  label: string;
};

export function BranchLightbox({
  items,
  heading,
  index,
  onIndexChange,
  onClose,
}: {
  items: readonly BranchLightboxItem[];
  /** Shown above each caption, e.g. the clinic name. */
  heading: string;
  index: number | null;
  onIndexChange: (next: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;
  const count = items.length;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const go = (step: number) => {
    if (index === null || count < 2) return;
    onIndexChange((index + step + count) % count);
  };

  const item = index === null ? null : items[index];

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-label="Photograph viewer"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        }
      }}
    >
      {item && (
        <div className={styles.frame}>
          <button
            type="button"
            className={`${styles.round} ${styles.close}`}
            onClick={onClose}
            aria-label="Close photograph"
            autoFocus
          >
            <X size={20} aria-hidden="true" />
          </button>

          <div className={styles.stage}>
            <Image
              key={item.src}
              className={styles.image}
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 900px, 96vw"
            />
          </div>

          <p className={styles.caption}>
            <span className={styles.captionHeading}>{heading}</span>
            <span className={styles.captionLabel}>{item.label}</span>
          </p>

          {count > 1 && (
            <>
              <button
                type="button"
                className={`${styles.round} ${styles.prev}`}
                onClick={() => go(-1)}
                aria-label="Previous photograph"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`${styles.round} ${styles.next}`}
                onClick={() => go(1)}
                aria-label="Next photograph"
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}
