"use client";

import { ArrowRight, Phone } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { phone, telPhone } from "@/lib/site-data";

export function FinalCta({ onBook }: { onBook: () => void }) {
  return (
    <section className="final-cta" aria-labelledby="cta-title">
      <div className="eyebrow">Your next visit</div>
      <h2 id="cta-title">
        Let’s make your visit feel <span className="serif">simple.</span>
      </h2>
      <p>Choose your preferred location, then let&apos;s begin with a conversation.</p>
      <div className="final-actions">
        <AppButton onClick={onBook} variant="primary">
          Book an Appointment <ArrowRight size={14} />
        </AppButton>
        <AppButton href={telPhone} variant="ghost">
          <Phone size={14} /> Call {phone}
        </AppButton>
      </div>
    </section>
  );
}
