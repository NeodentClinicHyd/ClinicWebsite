"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { visitImage } from "@/lib/site-data";

const visitSteps: { number: string; title: string; description: string; icon: ReactNode }[] = [
  {
    number: "01",
    title: "Arrival & check-in",
    description:
      "You're welcomed at reception and any paperwork is handled before you're shown through.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect className="icon-path" x="12" y="9" width="24" height="32" rx="2.5" />
        <path
          className="icon-path"
          d="M18 9V6.5C18 5.7 18.7 5 19.5 5H28.5C29.3 5 30 5.7 30 6.5V9"
        />
        <path className="icon-path" d="M18 23L22 27L31 17" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Consultation",
    description:
      "A direct conversation with Dr. Md. Sirajur Rahman about what's on your mind.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="icon-path"
          d="M8 14.5C8 11.5 10.5 9 13.5 9H34.5C37.5 9 40 11.5 40 14.5V26.5C40 29.5 37.5 32 34.5 32H21L14 39V32H13.5C10.5 32 8 29.5 8 26.5V14.5Z"
        />
        <path className="icon-path" d="M16 17.5H32" />
        <path className="icon-path" d="M16 23.5H26" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Treatment",
    description:
      "Your procedure is carried out in the treatment room, at a measured, unhurried pace.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="icon-path"
          d="M24 6C18 6 13 10.5 13 16.5C13 21.5 14.2 25.5 15.8 30.5C16.6 33 17.4 35.5 18.9 35.5C20.2 35.5 20.9 32.7 21.4 30C21.9 27.7 22.8 27 24 27C25.2 27 26.1 27.7 26.6 30C27.1 32.7 27.8 35.5 29.1 35.5C30.6 35.5 31.4 33 32.2 30.5C33.8 25.5 35 21.5 35 16.5C35 10.5 30 6 24 6Z"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Follow-up",
    description:
      "Clear guidance on next steps and aftercare before you leave, so nothing feels uncertain.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect className="icon-path" x="8" y="11" width="32" height="29" rx="2.5" />
        <path className="icon-path" d="M8 19H40" />
        <path className="icon-path" d="M15 6V13" />
        <path className="icon-path" d="M33 6V13" />
        <path className="icon-path" d="M17 29L21.5 33.5L31 24" />
      </svg>
    ),
  },
];

export function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const [lineFill, setLineFill] = useState<number[]>([0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);

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
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(
          0,
          Math.min(1, (window.innerHeight - rect.top) / window.innerHeight),
        );
        setParallaxY((scrollProgress - 0.5) * 30);
      }

      if (timelineRef.current) {
        const trect = timelineRef.current.getBoundingClientRect();
        const overall = Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight - trect.top) / (window.innerHeight + trect.height),
          ),
        );
        setLineFill([0, 1, 2].map((i) => Math.max(0, Math.min(1, overall * 3 - i))));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`experience ${isVisible ? "experience-visible" : ""}`}
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="experience-ambient" aria-hidden="true" />
      <div className="container experience-layout">
        <div className="experience-intro">
          <div className="eyebrow">Patient experience</div>
          <h2 id="experience-title" className="experience-heading">
            What to expect from a visit to Neodent.
          </h2>
          <p className="section-intro experience-lede">
            A considered appointment from the first hello to the final goodbye.
          </p>
          <figure className="experience-photo">
            <div
              className="experience-photo-frame"
              style={{ "--parallax-y": `${parallaxY}px` } as CSSProperties}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={visitImage}
                alt="Dr. Md. Sirajur Rahman with a patient seated for treatment at Neodent"
                loading="lazy"
              />
            </div>
          </figure>
        </div>

        <ol className="experience-timeline" ref={timelineRef}>
          {visitSteps.map((step, index) => (
            <li key={step.number} className={`experience-step experience-step-${index + 1}`}>
              <div className="experience-step-marker">
                <div className="experience-step-icon" aria-hidden="true">
                  {step.icon}
                </div>
              </div>
              <div className="experience-step-content">
                <span className="experience-step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < visitSteps.length - 1 && (
                <div className="experience-connector" aria-hidden="true">
                  <span className="experience-connector-track" />
                  <span
                    className="experience-connector-fill"
                    style={{ height: `${lineFill[index] * 100}%` }}
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
