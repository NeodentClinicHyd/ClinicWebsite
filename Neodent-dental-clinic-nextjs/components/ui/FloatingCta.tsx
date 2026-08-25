import { Phone } from "lucide-react";
import { phone, telPhone, whatsappLink } from "@/lib/site-data";

function WhatsAppMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="floating-cta-whatsapp-mark">
      <path fill="currentColor" d="M16 3.5a12.5 12.5 0 0 0-10.7 19l-1.6 5.8 6-1.6A12.5 12.5 0 1 0 16 3.5Zm0 22.8a10.2 10.2 0 0 1-5.2-1.4l-.4-.2-3.5.9.9-3.4-.3-.4A10.2 10.2 0 1 1 16 26.3Z" />
      <path fill="currentColor" d="M21.8 18.3c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2c-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.7.1-.3.1-.5 0-.7l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.2 3.2c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.8.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.5-.1-.2-.3-.3-.6-.5Z" />
    </svg>
  );
}

export function FloatingCta() {
  return (
    <div className="floating-cta" aria-label="NeoDent contact actions">
      <a className="floating-cta-icon floating-cta-call" href={telPhone} aria-label="Call NeoDent" data-testid="link-floating-call">
        <Phone aria-hidden="true" />
        <span className="floating-cta-tooltip">Call {phone}</span>
      </a>
      <a className="floating-cta-icon floating-cta-whatsapp" href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp NeoDent" data-testid="link-floating-whatsapp">
        <WhatsAppMark />
        <span className="floating-cta-tooltip">WhatsApp NeoDent</span>
      </a>
    </div>
  );
}
