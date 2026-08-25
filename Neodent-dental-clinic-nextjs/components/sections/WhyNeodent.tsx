"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const principles = [
  {
    number: "01",
    title: "Experienced specialists",
    description:
      "Care led by experienced dental professionals across multiple areas of dentistry.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Comprehensive treatment",
    description:
      "From preventive and restorative care to implants, orthodontics and cosmetic dentistry.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 20V24C6 25.1046 6.89543 26 8 26H24C25.1046 26 26 25.1046 26 24V20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 20C6 16 8 14 12 14H20C24 14 26 16 26 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect x="11" y="6" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Patient-first consultations",
    description:
      "Clear conversations, thoughtful treatment planning and care shaped around your individual needs.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 6V26M6 16H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Two Hyderabad locations",
    description:
      "Convenient access to NeoDent Dental Hospitals in Humayun Nagar and Nampally.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 26C16 26 24 20 24 13C24 8.58172 20.4183 5 16 5C11.5817 5 8 8.58172 8 13C8 20 16 26 16 26Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export function WhyNeodent() {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / window.innerHeight),
      );
      const translateY = (scrollProgress - 0.5) * 30;
      setParallaxY(translateY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section why ${isVisible ? "why-visible" : ""}`}
      aria-labelledby="why-title"
      style={{ "--parallax-y": `${parallaxY}px` } as CSSProperties}
    >
      <div className="why-floating-accent why-floating-accent-1" />
      <div className="why-floating-accent why-floating-accent-2" />
      <div className="container">
        <div className="why-header">
          <div>
            <div className="eyebrow">Why Neodent</div>
            <h2 id="why-title" className="section-heading">
              Quietly
              <br />
              <span className="serif">considered.</span>
            </h2>
          </div>
          <p className="section-intro">
            The details of a good visit matter: a calm room, a clear
            conversation and care that never feels rushed.
          </p>
        </div>
        <div className="principles">
          {principles.map((principle) => (
            <div className="principle" key={principle.number}>
              <div className="principle-icon">{principle.icon}</div>
              <div>
                <span className="principle-number">{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
