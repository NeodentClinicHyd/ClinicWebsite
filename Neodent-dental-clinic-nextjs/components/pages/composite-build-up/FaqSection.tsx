import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { AppButton } from "@/components/ui/AppButton";
import { COMPOSITE_FAQ, FAQ_CTA_TITLE, FAQ_HEADING } from "@/lib/composite-build-up-page";
import { ctaTelPhone } from "@/lib/site-data";
import { LinkedText } from "./LinkedText";
import { SectionHeader } from "./SectionHeader";
import styles from "./FaqSection.module.css";

/* 9. FAQ (tan). Plan 4.7.
   Native <details>/<summary> cards (first one open, every answer in the server
   HTML, no numbers). Desktop: two columns. Left: the heading (red accent
   line, one of the four that keep it) and, below it, the sticky "Ready to talk
   it through?" card, so the column is never an empty gap while the list
   scrolls. Right: the ten questions, wide enough for 65 to 72 character answer
   lines. The DOM order stays heading, questions, card (phones read in that
   order). The accordion and the FAQPage JSON-LD in page.tsx read the same
   COMPOSITE_FAQ array. The card's labels stay "Call us" and "Send an
   enquiry" (decision D1 covers the page header only).
   NB: sticky needs the chrome's overflow: clip (not hidden) on `.site`. */
export function FaqSection() {
  return (
    <section className={styles.section} aria-labelledby="cbu-faq-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <Reveal className={styles.head}>
            <SectionHeader
              titleId="cbu-faq-title"
              sans={FAQ_HEADING.sans}
              accent={FAQ_HEADING.accent}
            />
          </Reveal>

          <Reveal className={styles.faq} stagger={60}>
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
          </Reveal>

          <Reveal as="aside" className={styles.ask} aria-labelledby="cbu-ask-title" delay={120}>
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
