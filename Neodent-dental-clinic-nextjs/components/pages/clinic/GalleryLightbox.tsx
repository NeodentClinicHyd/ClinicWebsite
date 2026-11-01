"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "./GalleryLightbox.module.css";

/* ------------------------------------------------------------------
   Gallery lightbox for the spaces section. A native <dialog> opened with
   showModal(): Escape closes it, focus is trapped inside while it is
   open, and the page behind is inert. Arrow keys and the two buttons move
   between the photographs of the same panel. The photograph is shown
   whole (object-fit: contain) inside the media height cap, with its
   caption. The grid tiles stay in the page as normal next/image elements
   whether or not the lightbox is open; only the open photograph is
   rendered here.
   ------------------------------------------------------------------ */

export type LightboxItem = {
  src: string;
  alt: string;
  branch: string;
  label: string;
};

export function GalleryLightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: readonly LightboxItem[];
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
            <span className={styles.captionBranch}>{item.branch}</span>
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
