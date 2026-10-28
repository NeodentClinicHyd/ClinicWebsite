"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useReveal } from "./useReveal";
import shared from "./shared.module.css";
import styles from "./AboutExplore.module.css";

/* ------------------------------------------------------------------
   About -- the three onward links.

   Pattern: the small treatment cards of "What can we help you with?"
   (title, one line, small arrow) on the ivory ground. Link labels and
   targets are the ones the page already had.
   ------------------------------------------------------------------ */

const links = [
  {
    href: "/treatments",
    title: "Explore our expertise",
    line: "What Neodent treats.",
  },
  {
    href: "/clinic",
    title: "Visit our clinics",
    line: "Both locations in detail.",
  },
  {
    href: "/doctors/dr-miftah-ur-rahman",
    title: "Meet our clinical team",
    line: "The wider Neodent clinical team.",
  },
];

export function AboutExplore() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.ivory} ${styles.explore}`}
      aria-labelledby="explore-title"
    >
      <div className={shared.container}>
        <h2 id="explore-title" className={styles.srOnly}>
          Continue exploring Neodent
        </h2>
        <ul className={styles.grid} data-reveal>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.card}>
                <span className={styles.title}>{link.title}</span>
                <span className={styles.line}>{link.line}</span>
                <span className={styles.arrowRow}>
                  <ArrowRight
                    className={styles.arrow}
                    size={18}
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
