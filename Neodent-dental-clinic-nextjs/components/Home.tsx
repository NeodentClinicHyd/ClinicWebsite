"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, X } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { ExperienceIntro } from "@/components/sections/ExperienceIntro";
import { BrandStatementStrip } from "@/components/sections/BrandStatementStrip";
import { LegacyStory } from "@/components/sections/LegacyStory";
import { Expertise } from "@/components/sections/Expertise";
import { ClinicalLeadership } from "@/components/sections/ClinicalLeadership";
import { PatientStories } from "@/components/sections/PatientStories";
import { WhatToExpect } from "@/components/sections/WhatToExpect";
import { SpacesDesignedAroundCare } from "@/components/sections/SpacesDesignedAroundCare";
import { ContactNextStep } from "@/components/sections/ContactNextStep";
import { AppointmentModal } from "@/components/ui/AppointmentModal";
import { LeadCapture } from "@/components/ui/LeadCapture";
import { AppButton } from "@/components/ui/AppButton";
import { LEAD_CAPTURE_SESSION_KEY, telPhone } from "@/lib/site-data";

export function Home() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [leadCaptureOpen, setLeadCaptureOpen] = useState(false);
  const leadCaptureShown = useRef(false);

  useEffect(() => {
    const original = document.body.style.overflow;
    if (appointmentOpen || lightbox || leadCaptureOpen)
      document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [appointmentOpen, lightbox, leadCaptureOpen]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(LEAD_CAPTURE_SESSION_KEY) === "1") {
        leadCaptureShown.current = true;
      }
    } catch {
      // sessionStorage unavailable; fall back to in-memory tracking only.
    }

    const onScroll = () => {
      if (leadCaptureShown.current || appointmentOpen) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = window.scrollY / scrollable;
      if (progress >= 0.5) {
        leadCaptureShown.current = true;
        try {
          sessionStorage.setItem(LEAD_CAPTURE_SESSION_KEY, "1");
        } catch {
          // ignore storage errors
        }
        setLeadCaptureOpen(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [appointmentOpen]);

  return (
    <div className="site">
      <Navbar />
      <main>
        <Hero />
        <ExperienceIntro />
        <BrandStatementStrip />
        <LegacyStory />
        <Expertise />
        <ClinicalLeadership />
        <PatientStories />
        <WhatToExpect />
        <SpacesDesignedAroundCare />
        <ContactNextStep />
      </main>
      <Footer />
      <div className="mobile-bar">
        <AppButton href={telPhone} variant="ghost">
          <Phone size={14} /> Call
        </AppButton>
        <AppButton onClick={() => setAppointmentOpen(true)} variant="primary">
          Book Appointment <ArrowRight size={14} />
        </AppButton>
      </div>
      {appointmentOpen && <AppointmentModal onClose={() => setAppointmentOpen(false)} />}
      {!appointmentOpen && leadCaptureOpen && (
        <LeadCapture onClose={() => setLeadCaptureOpen(false)} />
      )}
      {lightbox && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setLightbox(null)}
        >
          <div
            className="modal"
            style={{
              padding: 10,
              width: "min(850px, 100%)",
              background: "var(--ink)",
            }}
          >
            <button
              className="modal-close"
              style={{ color: "var(--paper)" }}
              onClick={() => setLightbox(null)}
              aria-label="Close image"
              data-testid="button-close-gallery"
            >
              <X size={20} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              style={{
                display: "block",
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
