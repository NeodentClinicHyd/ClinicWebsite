"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Award, Clock3, Sparkles } from "lucide-react";
import { recognitionImage } from "@/lib/site-data";

export function Recognition() {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / window.innerHeight),
      );
      const translateY = (scrollProgress - 0.5) * 40;
      setParallaxY(translateY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`recognition ${isVisible ? "recognition-visible" : ""}`}
      aria-labelledby="recognition-title"
      style={{ "--parallax-y": `${parallaxY}px` } as CSSProperties}
    >
      <div className="recognition-background" aria-hidden="true" />
      <div className="container recognition-container">
        <div className="recognition-header">
          <p className="recognition-eyebrow">
            <Sparkles size={16} strokeWidth={2} aria-hidden="true" />
            Professional recognition
          </p>
          <h2 id="recognition-title">
            A commitment to considered clinical care.
          </h2>
          <p className="recognition-intro">
            A professional standard carried into every consultation — with precise
            planning, continued learning and a patient experience that feels clear
            from the first conversation.
          </p>
        </div>

        <div className="recognition-content-grid">
          <div className="recognition-featured">
            <div className="recognition-parallax">
              <div className="recognition-featured-frame" aria-hidden="true" />
              <figure className="recognition-featured-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={recognitionImage}
                  alt="Dr. Md. Sirajur Rahman receiving professional recognition"
                  loading="lazy"
                />
                <div
                  className="recognition-badge-overlay"
                  aria-label="Professional excellence award"
                >
                  <Award size={28} strokeWidth={2.5} />
                </div>
              </figure>
            </div>
          </div>

          <div className="recognition-credentials">
            <div className="recognition-credential recognition-credential-1">
              <div className="recognition-credential-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle className="icon-path" cx="24" cy="18" r="10" />
                  <path className="icon-path" d="M19 18L22.5 21.5L29 14" />
                  <path className="icon-path" d="M17 25L12 39L20 34L24 41L28 34L36 39L31 25" />
                </svg>
              </div>
              <h3>Professional Excellence</h3>
              <p>
                Maintaining the highest standards of clinical practice through
                ongoing education, certification, and peer-reviewed methods.
              </p>
            </div>

            <div className="recognition-credential recognition-credential-2">
              <div className="recognition-credential-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="icon-path"
                    d="M24 37C24 37 8 26.5 8 15.5C8 10.5 12 7 16.5 7C19.7 7 22.6 8.9 24 12C25.4 8.9 28.3 7 31.5 7C36 7 40 10.5 40 15.5C40 26.5 24 37 24 37Z"
                  />
                  <path className="icon-path" d="M13 19H18L21 12L27 28L30 19H35" />
                </svg>
              </div>
              <h3>Patient Trust</h3>
              <p>
                Earned through consistent care, clear communication, and
                treatment outcomes that reflect each patient&apos;s individual needs.
              </p>
            </div>

            <div className="recognition-credential recognition-credential-3">
              <div className="recognition-credential-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="icon-path"
                    d="M17 8C13 8 9 11 9 15.5C9 19 9.8 22 11 25.5C11.6 27.3 12.3 29 13.3 29C14.3 29 14.8 27 15.2 25C15.5 23.5 16.2 23 17 23C17.8 23 18.5 23.5 18.8 25C19.2 27 19.7 29 20.7 29C21.7 29 22.4 27.3 23 25.5C24.2 22 25 19 25 15.5C25 11 21 8 17 8Z"
                  />
                  <circle className="icon-path" cx="34" cy="32" r="8" />
                  <path className="icon-path" d="M30.5 32L33 34.5L37.5 29.5" />
                </svg>
              </div>
              <h3>Consistent Care</h3>
              <p>
                Every appointment reflects our commitment to precision,
                transparency, and creating a welcoming clinical environment.
              </p>
            </div>
          </div>
        </div>

        <div className="recognition-footer">
          <Clock3 size={18} strokeWidth={2} aria-hidden="true" />
          Evening appointments available at NeoDent Dental Hospitals: 04:00 PM – 09:00 PM
        </div>
      </div>
    </section>
  );
}
