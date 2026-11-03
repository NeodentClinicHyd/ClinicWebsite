import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CLINIC_FAQ } from "@/lib/pages/clinic-content";
import styles from "./ClinicFaq.module.css";

/* ------------------------------------------------------------------
   Clinics hub -- FAQ (PAGE_PLAN Q6, approved), between the treatments
   band and the consultation band. Native <details>, first open, one open
   at a time, hairline dividers, red chevron, no numbering. Every answer
   is in the server HTML. Questions and answers come from CLINIC_FAQ,
   the same array the FAQPage JSON-LD in app/clinic/page.tsx is built
   from.
   ------------------------------------------------------------------ */

export function ClinicFaq() {
  return (
    <section className={styles.faq} id="faq" aria-labelledby="clinic-faq-title">
      <div className={styles.grid}>
        <div className={styles.side}>
          <Reveal
            as="h2"
            variant="mask"
            id="clinic-faq-title"
            className={styles.title}
          >
            Questions about our clinics
          </Reveal>
        </div>

        <Reveal stagger={70} className={styles.list}>
          {CLINIC_FAQ.map((item, index) => (
            <details
              key={item.question}
              className={styles.qa}
              name="clinic-faq"
              open={index === 0}
            >
              <summary>
                <h3>{item.question}</h3>
                <ChevronDown aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
