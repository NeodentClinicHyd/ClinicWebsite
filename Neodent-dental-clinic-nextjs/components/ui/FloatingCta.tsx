import { Phone } from "lucide-react";
import { ctaPhone, ctaTelPhone } from "@/lib/site-data";

export function FloatingCta() {
  return (
    <div className="floating-cta" aria-label="NeoDent contact actions">
      <a className="floating-cta-icon floating-cta-call" href={ctaTelPhone} aria-label="Call NeoDent" data-testid="link-floating-call">
        <Phone aria-hidden="true" />
        <span className="floating-cta-tooltip">Call {ctaPhone}</span>
      </a>
    </div>
  );
}
