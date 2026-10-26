"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import styles from "./ContactNextStep.module.css";

/* ------------------------------------------------------------------
   Homepage Section 08 — "Let's make your next step feel simple."

   A single floating card in normal document flow: the title on one
   side, the supporting message and one clear link to the contact page
   on the other. Branch phone numbers and directions live in Section 07
   ("Spaces designed around care") and are deliberately not repeated
   here. The card is not absolutely positioned, so it can never overlap
   the navigation or the footer. ------------------------------------ */

export function ContactNextStep() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      id="get-in-touch"
      aria-labelledby="get-in-touch-title"
    >
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 id="get-in-touch-title" className={styles.title}>
            Let&apos;s make your next step <span>feel simple.</span>
          </h2>

          <div className={styles.body}>
            <p className={`${styles.lede} section-lede section-lede--on-dark`}>
              Whether you have a{" "}
              <EditorialHighlight tone="secondary" onDark>
                dental concern
              </EditorialHighlight>
              , want to understand your{" "}
              <EditorialHighlight tone="quiet" onDark>
                treatment options
              </EditorialHighlight>
              , or simply want to{" "}
              <EditorialHighlight tone="primary">
                speak with our team
              </EditorialHighlight>
              , we&apos;re here to help you take the next step with clarity.
              You can also send an enquiry through our contact page.
            </p>
            <Link
              href="/contact"
              className={styles.cta}
              data-testid="link-contact-enquiry"
            >
              Send an enquiry <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
