"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import shared from "./AboutShared.module.css";
import styles from "./AboutCrossLinks.module.css";

/* ------------------------------------------------------------------
   About -- S12 cross-link band (light). The three links, their labels,
   lines and targets are moved unchanged from the previous AboutExplore
   (A5, extra links, is unticked). The cards now size to their content:
   title and line on the left, the arrow on the right, so none is mostly
   empty. The screen-reader heading is kept. This is the last body
   section before the consultation block and it is light.
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

export function AboutCrossLinks() {
  return (
    <section
      className={`${shared.section} ${shared.light} ${styles.explore}`}
      aria-labelledby="explore-title"
    >
      <div className={shared.container}>
        <h2 id="explore-title" className={shared.vh}>
          Continue exploring Neodent
        </h2>
        <Reveal as="ul" stagger={80} className={styles.grid}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.card}>
                <span className={styles.text}>
                  <span className={styles.title}>{link.title}</span>
                  <span className={styles.line}>{link.line}</span>
                </span>
                <ArrowRight className={styles.arrow} size={20} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
