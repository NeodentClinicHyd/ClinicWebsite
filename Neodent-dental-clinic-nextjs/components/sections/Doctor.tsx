"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { treatmentVideo } from "@/lib/site-data";

const credentials = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M16 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 14V20L24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="20" r="2" fill="currentColor" />
      </svg>
    ),
    label: "Prosthodontist",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M16 10V30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M16 10C13 10 11 12 11 15V18H21V15C21 12 19 10 16 10Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="30" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    label: "Implantologist",
  },
];

export function Doctor() {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 },
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
      if (!sectionRef.current || !imageContainerRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / window.innerHeight),
      );
      const translateY = (scrollProgress - 0.5) * 50;
      setParallaxY(translateY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section doctor ${isVisible ? "doctor-visible" : ""}`}
      id="doctor"
      aria-labelledby="doctor-title"
      style={{ "--parallax-y": `${parallaxY}px` } as CSSProperties}
    >
      <div className="doctor-decorative-bg">
        <div className="doctor-glow doctor-glow-1" />
        <div className="doctor-glow doctor-glow-2" />
      </div>
      <div className="doctor-floating-accent doctor-floating-accent-1" />
      <div className="doctor-floating-accent doctor-floating-accent-2" />
      <div className="container doctor-grid">
        <figure className="doctor-image">
          <div className="doctor-image-inner" ref={imageContainerRef}>
            <video
              className="doctor-treatment-video"
              src={treatmentVideo}
              aria-label="Dr. Miftah Ur Rahman demonstrating treatment at Neodent"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
          <figcaption>Care in practice</figcaption>
        </figure>
        <div className="doctor-copy">
          <div className="eyebrow">Meet the doctor</div>
          <h2 id="doctor-title" className="section-heading">
            A steady hand.
            <br />
            <span className="serif">A human approach.</span>
          </h2>
          <p className="section-intro">
            Neodent is directed by Dr. Md. Sirajur Rahman, whose work brings
            specialist clinical focus and a personal presence to every conversation.
          </p>
          <h3 className="doctor-name">Dr. Md. Sirajur Rahman</h3>
          <div className="doctor-credentials">
            {credentials.map((credential) => (
              <div className="doctor-credential" key={credential.label}>
                <div className="doctor-credential-icon">{credential.icon}</div>
                <span>{credential.label}</span>
              </div>
            ))}
          </div>
          <p className="doctor-description">Director — Neodent Dental Hospitals</p>
          <a className="text-link doctor-link" href="#appointment">
            Book a consultation <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
