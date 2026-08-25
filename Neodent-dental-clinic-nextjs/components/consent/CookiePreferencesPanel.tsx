"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { OptionalConsent } from "@/lib/cookie-consent";
import styles from "./CookiePreferencesPanel.module.css";

/* ------------------------------------------------------------------
   Manage-preferences modal. Only lists categories that actually exist
   in this codebase (see lib/cookie-consent.ts) — Essential (always on)
   and Media/YouTube (the About page's embedded video archive). Do not
   add Analytics/Marketing/Functional entries unless the corresponding
   technology is actually introduced to the project.

   Accessibility: dialog role + aria-modal, focus trapped inside while
   open, focus restored to the trigger on close, Escape closes, body
   scroll locked while open — same mechanics as the existing
   ArchiveViewer modal (components/sections/about/ArchiveViewer.tsx). ------------------------------------------------------------------ */

interface CookiePreferencesPanelProps {
  initialValues: OptionalConsent;
  onSave: (values: OptionalConsent) => void;
  onClose: () => void;
}

export function CookiePreferencesPanel({
  initialValues,
  onSave,
  onClose,
}: CookiePreferencesPanelProps) {
  const [media, setMedia] = useState(initialValues.media);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener("keydown", handler);
    return () => dialog.removeEventListener("keydown", handler);
  }, []);

  return (
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
        aria-labelledby="cookie-preferences-title"
      >
        <div className={styles.topBar}>
          <span className={styles.eyebrow}>Cookie preferences</span>
          <button
            ref={closeRef}
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close cookie preferences"
            data-testid="button-close-cookie-preferences"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <h2 id="cookie-preferences-title" className={styles.title}>
          Manage your preferences
        </h2>
        <p className={styles.intro}>
          Choose which optional technologies NeoDent can use. Essential
          functionality is always active and cannot be turned off here.
        </p>

        <div className={styles.categories}>
          <div className={styles.category}>
            <div className={styles.categoryCopy}>
              <p className={styles.categoryName}>Essential</p>
              <p className={styles.categoryDesc}>
                These technologies are required for core website
                functionality and cannot be switched off through this
                preference panel.
              </p>
            </div>
            <span className={styles.statusLabel}>Always active</span>
          </div>

          <div className={styles.category}>
            <div className={styles.categoryCopy}>
              <p className={styles.categoryName}>Embedded media (YouTube)</p>
              <p className={styles.categoryDesc}>
                Loads YouTube&apos;s player when you choose to play a video
                on our About page. Until allowed, videos are shown as a
                thumbnail only and nothing is loaded from YouTube.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={media}
              aria-label="Embedded media (YouTube)"
              className={styles.switch}
              data-checked={media}
              onClick={() => setMedia((v) => !v)}
              data-testid="switch-media-consent"
            >
              <span className={styles.switchKnob} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className={styles.footerActions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnGhost}`}
            onClick={onClose}
            data-testid="button-cancel-cookie-preferences"
          >
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => onSave({ media })}
            data-testid="button-save-cookie-preferences"
          >
            Save preferences
          </button>
        </div>
      </div>
    </div>
  );
}
