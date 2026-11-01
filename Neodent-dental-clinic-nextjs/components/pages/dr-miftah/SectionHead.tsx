import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./SectionHead.module.css";

/* ------------------------------------------------------------------
   Section heading block shared by sections 03 to 10 of this page:
   a plain-word eyebrow, one h2 in one weight and colour (only 05 and 08
   pass `accent`, the red italic phrase the plan allows there), and an
   optional supporting line. Light or dark tone.
   ------------------------------------------------------------------ */

type Props = {
  eyebrow: string;
  id: string;
  title: ReactNode;
  /** Red italic closing phrase (sections 05 and 08 only). */
  accent?: string;
  lede?: ReactNode;
  tone?: "light" | "dark";
  /** Extra class for the wrapper (placement inside the section grid). */
  className?: string;
  children?: ReactNode;
};

export function SectionHead({
  eyebrow,
  id,
  title,
  accent,
  lede,
  tone = "light",
  className,
  children,
}: Props) {
  return (
    <header
      className={`${styles.head} ${tone === "dark" ? styles.dark : ""} ${className ?? ""}`}
    >
      <Reveal as="p" className={styles.eyebrow}>
        {eyebrow}
      </Reveal>
      <Reveal as="h2" id={id} className={styles.title} delay={80}>
        {title}
        {accent ? (
          <>
            {" "}
            <em className={styles.accent}>{accent}</em>
          </>
        ) : null}
      </Reveal>
      {lede ? (
        <Reveal as="p" className={styles.lede} delay={160}>
          {lede}
        </Reveal>
      ) : null}
      {children}
    </header>
  );
}
