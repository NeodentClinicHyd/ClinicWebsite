"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, X } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { ExperienceIntro } from "@/components/sections/ExperienceIntro";
import { SeamCard } from "@/components/sections/SeamCard";
import { LegacyStory } from "@/components/sections/LegacyStory";
import { Expertise } from "@/components/sections/Expertise";
import { ClinicalLeadership } from "@/components/sections/ClinicalLeadership";
import { PatientStories } from "@/components/sections/PatientStories";
import { WhatToExpect } from "@/components/sections/WhatToExpect";
import { SpacesDesignedAroundCare } from "@/components/sections/SpacesDesignedAroundCare";
import { ContactNextStep } from "@/components/sections/ContactNextStep";
import { LeadCapture } from "@/components/ui/LeadCapture";
import { AppButton } from "@/components/ui/AppButton";
import {
  ctaTelPhone,
  LEAD_CAPTURE_SESSION_KEY,
} from "@/lib/site-data";

export function Home() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [leadCaptureOpen, setLeadCaptureOpen] = useState(false);
  const leadCaptureShown = useRef(false);
  /* The fixed mobile call bar hides while any hero "Call for
     Consultation" button is on screen (reference Part 3.4). */
  const [heroCallVisible, setHeroCallVisible] = useState(true);

  useEffect(() => {
    // IntersectionObserver is in every supported browser; without it the
    // bar simply stays hidden and the hero's own call button remains.
    if (typeof IntersectionObserver === "undefined") return;
    const buttons = document.querySelectorAll<HTMLElement>("#home .hero-primary");
    if (buttons.length === 0) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setHeroCallVisible(visible.size > 0);
    });
    buttons.forEach((button) => observer.observe(button));
    return () => observer.disconnect();
  }, []);

  /* The site's floating call button (FloatingCta) hides on phones while
     any part of the hero is on screen; the CSS in the hero block of
     globals.css reads this attribute (home redesign P1c). */
  useEffect(() => {
    const root = document.documentElement;
    const hero = document.getElementById("home");
    if (!hero || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      root.dataset.heroInView = entry.isIntersecting ? "true" : "false";
    });
    observer.observe(hero);
    return () => {
      observer.disconnect();
      delete root.dataset.heroInView;
    };
  }, []);

  useEffect(() => {
    const original = document.body.style.overflow;
    if (lightbox || leadCaptureOpen)
      document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [lightbox, leadCaptureOpen]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(LEAD_CAPTURE_SESSION_KEY) === "1") {
        leadCaptureShown.current = true;
      }
    } catch {
      // sessionStorage unavailable; fall back to in-memory tracking only.
    }

    // The modal waits until half the page has been read on desktop, and
    // until about 70% on phones, where it covers most of the screen.
    const threshold = window.matchMedia("(max-width: 767px)").matches ? 0.7 : 0.5;

    const onScroll = () => {
      if (leadCaptureShown.current) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = window.scrollY / scrollable;
      if (progress >= threshold) {
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
  }, []);

  return (
    <div className="site">
      <Navbar />
      <main>
        <Hero />
        <ExperienceIntro />
        {/* Sits on the seam. Text-only (no portrait), so ExperienceIntro pads
            its bottom by var(--seam-pad-above-text). */}
        <SeamCard />
        <LegacyStory />
        <Expertise />
        <ClinicalLeadership />
        <PatientStories />
        <WhatToExpect />
        <SpacesDesignedAroundCare />
        <ContactNextStep />
      </main>
      <Footer />
      <div
        className="mobile-bar"
        data-hidden={heroCallVisible ? "true" : undefined}
        aria-hidden={heroCallVisible || undefined}
        inert={heroCallVisible}
      >
        <AppButton href={ctaTelPhone} variant="primary">
          <Phone size={14} /> Call Neodent <ArrowRight size={14} />
        </AppButton>
      </div>
      {leadCaptureOpen && (
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
