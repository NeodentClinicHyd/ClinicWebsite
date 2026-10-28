import Link from "next/link";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import {
  ctaTelPhone,
  directions,
  mehdipatnamHours,
  nampallyDirections,
  nampallyHours,
  nampallyTelPhone,
  telPhone,
} from "@/lib/site-data";
import { TREATMENTS_FAQ } from "@/lib/treatments-hub";
import styles from "./hub.module.css";

/* Questions about treatment. Left: native <details> accordion (answers
   are always in the DOM, first one open, one open at a time via the
   shared `name`). Right: the sticky contact card, built from the
   branch values in lib/site-data.ts. */
const branches = [
  {
    name: "Mehdipatnam",
    hours: mehdipatnamHours,
    tel: telPhone,
    directions,
  },
  {
    name: "Nampally",
    hours: nampallyHours,
    tel: nampallyTelPhone,
    directions: nampallyDirections,
  },
];

export function HubQuestions() {
  return (
    <section className={styles.faq} aria-labelledby="questions-title">
      <div className={`${styles.container} ${styles.faqGrid}`}>
        <div className={styles.faqMain}>
          <h2 id="questions-title" className={styles.title}>
            Questions <span>about treatment</span>
          </h2>
          <div className={styles.accordion}>
            {TREATMENTS_FAQ.map((item, index) => (
              <details
                key={item.question}
                className={styles.qa}
                name="treatments-faq"
                open={index === 0}
              >
                <summary>
                  <h3>{item.question}</h3>
                  <ChevronDown aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <aside className={styles.contact} aria-labelledby="treatments-contact-title">
          <h3 id="treatments-contact-title">Ready to discuss your dental concerns?</h3>
          <p className="section-lede section-lede--on-dark">
            Call us to arrange a consultation. You don&apos;t need to know which
            treatment you need before reaching out. You can also{" "}
            <Link href="/contact">send an enquiry</Link> on our contact page.
          </p>
          <div className={styles.contactActions}>
            <AppButton href={ctaTelPhone} variant="primary">
              <Phone size={16} aria-hidden="true" /> Call Neodent{" "}
              <ArrowRight size={14} aria-hidden="true" />
            </AppButton>
          </div>
          <ul className={styles.branches}>
            {branches.map((branch) => (
              <li key={branch.name} className={styles.branch}>
                <span className={styles.branchName}>{branch.name}</span>
                <span className={styles.branchHours}>{branch.hours}</span>
                <span className={styles.branchLinks}>
                  <a href={branch.tel} aria-label={`Call Neodent ${branch.name}`}>
                    Call
                  </a>
                  <a
                    href={branch.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Directions to Neodent ${branch.name} (opens in a new tab)`}
                  >
                    Directions
                  </a>
                </span>
              </li>
            ))}
          </ul>
          <p className={styles.holiday}>Sunday holiday</p>
        </aside>
      </div>
    </section>
  );
}
