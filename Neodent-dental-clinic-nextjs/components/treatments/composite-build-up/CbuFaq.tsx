import { ChevronDown } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { FAQ_CTA_TITLE, FAQ_HEADING, COMPOSITE_FAQ } from "@/lib/composite-build-up-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { ctaTelPhone } from "@/lib/site-data";
import { LinkedText } from "./LinkedText";
import styles from "./CbuFaq.module.css";

/* 9. FAQ (tan)
   Pattern: FmrFaq. Two columns. Left: the FAQ as native <details>/<summary>
   cards (first one open, every answer in the DOM, no numbers). Right: a
   sticky dark card with the two contact actions. The accordion and the
   FAQPage JSON-LD read the same COMPOSITE_FAQ array. */
export function CbuFaq() {
  return (
    <section className={styles.section} aria-labelledby="cbu-faq-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.head}>
            <SectionHeader
              titleId="cbu-faq-title"
              sans={FAQ_HEADING.sans}
              accent={FAQ_HEADING.accent}
            />
          </div>
          <div className={styles.faq}>
            {COMPOSITE_FAQ.map((item, index) => (
              <details className={styles.item} key={item.question} open={index === 0}>
                <summary className={styles.summary}>
                  <h3 className={styles.question}>{item.question}</h3>
                  <ChevronDown className={styles.chevron} size={20} aria-hidden="true" />
                </summary>
                <p className={styles.answer}>
                  <LinkedText text={item.answer} links={item.links} linkClassName={styles.link} />
                </p>
              </details>
            ))}
          </div>

          <aside className={styles.ask} aria-labelledby="cbu-ask-title">
            <h3 id="cbu-ask-title" className={styles.askTitle}>
              {FAQ_CTA_TITLE}
            </h3>
            <div className={styles.askActions}>
              <AppButton href={ctaTelPhone} variant="light">
                Call us
              </AppButton>
              <AppButton href="/contact" variant="primary">
                Send an enquiry
              </AppButton>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
