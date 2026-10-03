"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowRight, Phone, Play } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { TreatmentDossier, sectionId } from "@/components/doctors/TreatmentDossier";
import { TreatmentEvidenceViewer } from "@/components/doctors/TreatmentEvidenceViewer";
import type { EvidenceItem } from "@/components/doctors/TreatmentEvidenceViewer";
import type { TreatmentDossier as Dossier } from "@/lib/miftah-treatment-dossiers";
import { RCT_FILMS, RCT_STAGES, RCT_XRAY_ITEMS, pairItems } from "@/lib/miftah-treatment-evidence";
import treatmentMedia from "@/lib/miftah-treatment-media.json";
import { nampallyPhone, nampallyTelPhone, phone, telPhone } from "@/lib/site-data";
import styles from "./TreatmentDetailDialog.module.css";

/* ------------------------------------------------------------------
   Treatment detail dialog — the editorial dossier behind each
   Section 03 specialty card.

   Same modal mechanics as TreatmentEvidenceViewer (portal to <body>,
   Escape, Tab trap, body scroll lock, focus restored to the opener),
   plus: every other <body> child is made `inert` while open, so the
   page behind is unreachable by keyboard, pointer and assistive tech.

   Evidence in section 10 opens the EXISTING TreatmentEvidenceViewer.
   It portals as a later <body> child (so it is not inert) and handles
   its own Escape / Tab; while it is open this dialog ignores both, so
   Escape closes only the viewer and focus returns to the thumbnail.
   ------------------------------------------------------------------ */

const FOCUSABLE = 'button:not([disabled]), [href], video, [tabindex]:not([tabindex="-1"])';

type ViewerState = { title: string; items: EvidenceItem[]; index: number } | null;

function EvidenceThumb({
  src,
  objectPosition,
  alt,
  label,
  caption,
  onOpen,
}: {
  src: string;
  objectPosition?: string;
  alt: string;
  label: string;
  caption: string;
  onOpen: () => void;
}) {
  return (
    <figure className={styles.thumb}>
      <button type="button" className={styles.thumbBtn} onClick={onOpen} aria-label={label} data-dialog-evidence>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 767px) 44vw, 220px"
          className={styles.thumbImage}
          style={{ objectPosition }}
        />
      </button>
      <figcaption className={styles.thumbCaption} aria-hidden="true">
        {caption}
      </figcaption>
    </figure>
  );
}

function DossierEvidence({ dossier, onOpen }: { dossier: Dossier; onOpen: (v: NonNullable<ViewerState>) => void }) {
  const ev = dossier.evidence;
  if (ev.kind === "rct") {
    const title = "Root canal treatment · Radiographs";
    return (
      <div className={styles.evidence}>
        <div className={styles.thumbs}>
          {RCT_STAGES.map(({ key, label, stage }, index) => (
            <EvidenceThumb
              key={key}
              src={treatmentMedia[key].src}
              objectPosition={treatmentMedia[key].objectPosition}
              alt={`Root canal treatment radiograph — ${stage} stage`}
              label={`Open root canal X-ray ${index + 1} of 3: ${stage} stage`}
              caption={label}
              onOpen={() => onOpen({ title, items: RCT_XRAY_ITEMS, index })}
            />
          ))}
        </div>
        <div className={styles.films}>
          {RCT_FILMS.map((film, index) => (
            <button
              key={film.short}
              type="button"
              className={styles.filmBtn}
              onClick={() =>
                onOpen({ title: "Root canal treatment · Films", items: RCT_FILMS.map((f) => f.item), index })
              }
              aria-label={`Play film: ${film.item.kind === "video" ? film.item.label : film.short}`}
              data-dialog-evidence
              data-dialog-film
            >
              <Play size={11} aria-hidden="true" /> {film.short} film
            </button>
          ))}
        </div>
      </div>
    );
  }
  const items = pairItems(dossier.name, ev.before, ev.after);
  return (
    <div className={styles.evidence}>
      <div className={`${styles.thumbs} ${styles.thumbsPair}`}>
        {(
          [
            [ev.before, "Before", 0],
            [ev.after, "After", 1],
          ] as const
        ).map(([key, when, index]) => {
          const item = items[index];
          return (
            <EvidenceThumb
              key={key}
              src={treatmentMedia[key].src}
              objectPosition={treatmentMedia[key].objectPosition}
              alt={item.kind === "image" ? item.alt : ""}
              label={`Open ${dossier.name.toLowerCase()} ${when.toLowerCase()}-treatment image`}
              caption={when}
              onOpen={() => onOpen({ title: dossier.name, items, index })}
            />
          );
        })}
      </div>
    </div>
  );
}

export function TreatmentDetailDialog({
  dossier,
  opener: openerEl,
  onClose,
}: {
  dossier: Dossier;
  /** The triggering control; focus returns here on close (Safari does
      not focus buttons on click, so activeElement is not reliable). */
  opener?: HTMLElement | null;
  onClose: () => void;
}) {
  const titleId = useId();
  const backdropRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [viewer, setViewer] = useState<ViewerState>(null);
  const viewerOpen = useRef(false);
  useEffect(() => {
    viewerOpen.current = viewer !== null;
  }, [viewer]);
  const idPrefix = "dossier-dlg-";

  /* Keyboard: Escape closes, Tab is trapped — both yield to the nested
     evidence viewer while it is open. */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (viewerOpen.current || e.defaultPrevented) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.getClientRects().length > 0,
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !dialog.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !dialog.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Open: lock body scroll, make the rest of the page inert, move focus
     in. Close: undo all three and restore focus to the opener. */
  useEffect(() => {
    const opener = openerEl ?? (document.activeElement as HTMLElement | null);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const madeInert: Element[] = [];
    for (const child of document.body.children) {
      if (child === backdropRef.current || child.hasAttribute("inert")) continue;
      child.setAttribute("inert", "");
      madeInert.push(child);
    }
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = originalOverflow;
      for (const el of madeInert) el.removeAttribute("inert");
      opener?.focus?.({ preventScroll: true });
    };
    // Mount/unmount only — the opener is fixed for the dialog's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (key: string) => {
    const scroller = scrollRef.current;
    const heading = document.getElementById(sectionId(idPrefix, dossier.id, key));
    const section = heading?.closest("section");
    if (!scroller || !heading || !section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = section.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 8;
    scroller.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  };

  const stages = dossier.sections.find((s) => s.steps)?.steps ?? [];

  return createPortal(
    <div
      ref={backdropRef}
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-dialog-backdrop
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-treatment-dialog={dossier.id}
      >
        <header className={styles.header}>
          <span className={styles.number} aria-hidden="true">
            {dossier.cardNumber}
          </span>
          <div className={styles.headCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              {dossier.eyebrow} · Treatment dossier
            </p>
            <h2 id={titleId} className={styles.title}>
              {dossier.title}
            </h2>
            <p className={styles.subtitle}>{dossier.subtitle}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label={`Close ${dossier.name.toLowerCase()} details`}
            data-dialog-close
          >
            <span className={styles.closeLbl}>Close</span>
            <span aria-hidden="true">✕</span>
          </button>
        </header>

        <div ref={scrollRef} className={styles.scroll} data-dialog-scroll>
          <div className={styles.layout}>
            <nav className={styles.rail} aria-label={`${dossier.name} — sections`}>
              <ol className={styles.index}>
                {dossier.sections.map((s) => (
                  <li key={s.key}>
                    <button type="button" className={styles.indexBtn} onClick={() => goTo(s.key)}>
                      <span className={styles.indexNum} aria-hidden="true">
                        {s.number}
                      </span>
                      {s.heading}
                    </button>
                  </li>
                ))}
              </ol>
              {stages.length > 0 && (
                <div className={styles.stages} aria-hidden="true">
                  <span className={styles.stagesLabel}>Stages</span>
                  {stages.map((s) => (
                    <span key={s.number} className={styles.stage}>
                      <b>{s.number}</b> {s.title}
                    </span>
                  ))}
                </div>
              )}
            </nav>

            <div className={styles.main}>
              <TreatmentDossier
                dossier={dossier}
                idPrefix={idPrefix}
                sectionLevel={3}
                renderEvidence={() => <DossierEvidence dossier={dossier} onOpen={setViewer} />}
              />
              <section className={styles.cta} aria-labelledby={`${idPrefix}${dossier.id}-cta`}>
                <h3 id={`${idPrefix}${dossier.id}-cta`} className={styles.ctaTitle}>
                  {dossier.cta.label} <ArrowRight size={18} aria-hidden="true" />
                </h3>
                <p className={styles.ctaNote}>
                  Book a consultation at either Neodent clinic in Hyderabad to have your teeth assessed and your
                  options explained.
                </p>
                <div className={styles.ctaActions}>
                  <AppButton href={nampallyTelPhone} variant="primary">
                    <Phone size={14} aria-hidden="true" /> Call Nampally · {nampallyPhone}
                  </AppButton>
                  <AppButton href={telPhone} variant="ghost">
                    <Phone size={14} aria-hidden="true" /> Call Mehdipatnam · {phone}
                  </AppButton>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {viewer && (
        <TreatmentEvidenceViewer
          key={`${viewer.title}-${viewer.index}`}
          title={viewer.title}
          items={viewer.items}
          initialIndex={viewer.index}
          onClose={() => setViewer(null)}
        />
      )}
    </div>,
    document.body,
  );
}
