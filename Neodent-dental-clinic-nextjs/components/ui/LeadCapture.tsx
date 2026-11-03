"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Clock3, MapPin, Phone, X } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { ctaTelPhone, directions, heroPortraitImage } from "@/lib/site-data";

/* "Before you go" prompt. Desktop and tablet: a two-column panel, the
   founder's portrait on a soft red spotlight at the left, the copy and
   actions at the right. Phones (<= 560px): a bottom sheet with the
   portrait rising above its top edge beside his name. The portrait is
   the hero's transparent cut-out (heroPortraitImage). The spotlight is
   static: no animation on the gradient. */
export function LeadCapture({
  onClose,
}: {
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Modal focus: move focus into the dialog, keep Tab inside it, and
    // hand focus back to where it was when the dialog closes.
    const previous = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previous?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <div
      className="lead-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="lead-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-capture-title"
        tabIndex={-1}
      >
        <figure className="lead-portrait">
          <span className="lead-portrait-frame" aria-hidden="true" />
          <span className="lead-portrait-media">
            <Image
              src={heroPortraitImage}
              alt="Dr. Mohd. Siraj Ur Rahman, founder and Director of Neodent Dental Hospital"
              fill
              sizes="(max-width: 560px) 132px, 300px"
              className="lead-portrait-image"
            />
          </span>
          <figcaption className="lead-portrait-caption">
            <strong>Dr. Mohd. Siraj Ur Rahman</strong>
            <span>Dental Surgeon · Prosthodontist · Implantologist</span>
          </figcaption>
        </figure>

        <div className="lead-body">
          <span className="lead-handle" aria-hidden="true" />
          <button
            className="lead-close"
            onClick={onClose}
            aria-label="Dismiss"
            data-testid="button-close-lead-capture"
          >
            <X size={18} />
          </button>
          <div className="eyebrow lead-eyebrow">Before you go</div>
          <h2 id="lead-capture-title">Let&apos;s make it easy to visit.</h2>
          <p className="lead-sub">
            Call the clinic, or find your way to
            Humayun Nagar — whichever feels right.
          </p>
          <div className="lead-hours">
            <Clock3 size={14} strokeWidth={2} />
            <span>Open today, 10:00 AM – 08:00 PM</span>
          </div>
          <div className="lead-actions">
            <AppButton href={ctaTelPhone} variant="primary">
              <Phone size={14} /> Call the Clinic
            </AppButton>
          </div>
          <a className="lead-directions" href={directions} data-testid="link-lead-directions">
            <MapPin size={13} strokeWidth={2} /> Get directions to the clinic
          </a>
        </div>
      </div>
    </div>
  );
}
