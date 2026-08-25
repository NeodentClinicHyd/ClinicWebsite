"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const principles = [
  {
    number: "01",
    title: "Experienced specialists",
    description:
      "Care led by experienced dental professionals across multiple areas of dentistry.",
  },
  {
    number: "02",
    title: "Comprehensive treatment",
    description:
      "From preventive and restorative care to implants, orthodontics and cosmetic dentistry.",
  },
  {
    number: "03",
    title: "Patient-first consultations",
    description:
      "Clear conversations, thoughtful treatment planning and care shaped around your individual needs.",
  },
  {
    number: "04",
    title: "Two Hyderabad locations",
    description:
      "Convenient access to NeoDent Dental Hospitals in Humayun Nagar and Nampally.",
  },
];

export function TrustStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const [activePrinciple, setActivePrinciple] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`trust ${isVisible ? "trust-visible" : ""}`}
      aria-label="Our care principles"
    >
      <div className="trust-decorative-bg">
        <div className="trust-glow trust-glow-1"></div>
        <div className="trust-glow trust-glow-2"></div>
      </div>
      <div className="container trust-content">
        <div className="trust-lead">
          <p>A clinic shaped by what patients need from dental care.</p>
          <span className="trust-lead-support">
            Good dental care begins with understanding what each patient needs —
            from the first conversation through treatment and follow-up.
          </span>
        </div>
        <div className="trust-principles">
          {principles.map((principle, index) => {
            return (
              <div
                className={`trust-item ${activePrinciple === index ? "trust-item-active" : ""}`}
                key={principle.number}
                onMouseEnter={() => setActivePrinciple(index)}
                onFocus={() => setActivePrinciple(index)}
                tabIndex={0}
                style={{
                  animationDelay: `${0.2 + index * 0.15}s`,
                }}
              >
                <div className="trust-item-number">{principle.number}</div>
                <div className="trust-item-content">
                  <h3 className="trust-item-title">{principle.title}</h3>
                  <p className="trust-item-description">
                    {principle.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="trust-footer-note">
          <span>Two locations. One standard of care.</span>
          <a href="#treatments">
            Discover our treatments <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
