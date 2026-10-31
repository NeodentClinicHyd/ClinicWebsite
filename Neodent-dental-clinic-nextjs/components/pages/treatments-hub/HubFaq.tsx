import Link from "next/link";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
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
import { Backdrop } from "./Backdrop";
import shared from "./TreatmentsHub.module.css";
import styles from "./HubFaq.module.css";

/* S9 + S10. Questions about treatment (pattern P14) on a light shell:
   left, a sticky column with the heading and an added "Send an enquiry"
   link; right, the six native <details> (first open, one open at a time,
   hairline dividers, red chevron). Every answer is in the server HTML.
   Then the consultation block the old page carried beside the FAQ,
   rebuilt as its own dark band: heading, paragraph with the enquiry link,
   "Call Neodent", both branches with hours, Call and Directions, and
   "Sunday holiday". All of its text and links are the old aside's own;
   the branch values come from lib/site-data.ts. */

const branches = [
  { name: "Mehdipatnam", hours: mehdipatnamHours, tel: telPhone, directions },
  { name: "Nampally", hours: nampallyHours, tel: nampallyTelPhone, directions: nampallyDirections },
];

export function HubFaq() {
  return (
    <>
      <section className={`${shared.light} ${styles.faq}`} aria-labelledby="questions-title">
        <div className={`${shared.container} ${styles.grid}`}>
          <div className={styles.side}>
            <Reveal as="h2" id="questions-title" className={`${shared.title} ${styles.title}`}>
              Questions about treatment
            </Reveal>
            <Reveal delay={100}>
              <Link href="/contact" className={`${shared.outline} ${styles.sideLink}`}>
                Send an enquiry
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <Reveal stagger={80} className={styles.list}>
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
          </Reveal>
        </div>
      </section>

      <section
        className={`${shared.dark} ${styles.consult}`}
        aria-labelledby="treatments-contact-title"
      >
        <Backdrop />
        <div className={`${shared.container} ${styles.consultGrid}`}>
          <Reveal className={styles.consultText}>
            <h3 id="treatments-contact-title" className={styles.consultTitle}>
              Ready to discuss your dental concerns?
            </h3>
            <p className={shared.lede}>
              Call us to arrange a consultation. You don&apos;t need to know which treatment
              you need before reaching out. You can also{" "}
              <Link href="/contact" className={styles.inlineLink}>
                send an enquiry
              </Link>{" "}
              on our contact page.
            </p>
            <div className={styles.consultActions}>
              <AppButton href={ctaTelPhone} variant="primary">
                <Phone size={16} aria-hidden="true" /> Call Neodent{" "}
                <ArrowRight size={14} aria-hidden="true" />
              </AppButton>
            </div>
          </Reveal>

          <div className={styles.branchWrap}>
            <Reveal as="ul" stagger={100} className={styles.branches}>
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
            </Reveal>
            <p className={styles.holiday}>Sunday holiday</p>
          </div>
        </div>
      </section>
    </>
  );
}
