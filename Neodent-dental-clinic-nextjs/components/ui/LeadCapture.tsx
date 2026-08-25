"use client";

import { useEffect } from "react";
import { Clock3, MapPin, Phone, X } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { ctaTelPhone, directions } from "@/lib/site-data";

export function LeadCapture({
  onClose,
}: {
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="lead-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="lead-panel" role="dialog" aria-modal="true" aria-labelledby="lead-capture-title">
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
  );
}
