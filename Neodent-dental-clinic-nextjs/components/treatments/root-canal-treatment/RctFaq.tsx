import { ChevronDown } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { FAQ_CTA_TITLE, FAQ_HEADING, RCT_FAQ } from "@/lib/root-canal-treatment-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { ctaTelPhone } from "@/lib/site-data";
import { LinkedText } from "./LinkedText";
import styles from "./RctFaq.module.css";

/* 10. FAQ (light)
   Pattern: FmrFaq. Two columns. Left: the FAQ as native <details>/<summary>
   cards (first one open, every answer in the DOM, no numbers). Right: a
   sticky dark card with the two contact actions. The accordion and the
   FAQPage JSON-LD read the same RCT_FAQ array. */
export function RctFaq() {
  return (
    <section className={styles.section} aria-labelledby="rct-faq-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.head}>
            <SectionHeader
              titleId="rct-faq-title"
              sans={FAQ_HEADING.sans}
              accent={FAQ_HEADING.accent}
            />
          </div>
          <div className={styles.faq}>
            {RCT_FAQ.map((item, index) => (
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

          <aside className={styles.ask} aria-labelledby="rct-ask-title">
            <h3 id="rct-ask-title" className={styles.askTitle}>
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
