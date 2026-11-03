import { ChevronDown } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { Reveal } from "@/components/motion/Reveal";
import { BRACES_FAQ, FAQ_CTA_TITLE, FAQ_HEADING } from "@/lib/braces-orthodontics-page";
import { ctaTelPhone } from "@/lib/site-data";
import { LinkedText } from "./LinkedText";
import { SectionHeader } from "./SectionHeader";
import styles from "./FaqSection.module.css";

/* 11. Braces and orthodontics: your questions (ivory). Plan 4.7.
   Heading keeps its red-italic accent. Left: the eleven questions as native
   <details> (first open, every answer in the DOM, no numbers, hairline
   dividers, chevron, the answer fades up on open). Right: the sticky dark
   card with the two contact actions, in the DOM at every width. The
   accordion and the FAQPage JSON-LD in page.tsx read the same BRACES_FAQ
   array. */
export function FaqSection() {
  return (
    <section className={styles.section} aria-labelledby="brc-faq-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <Reveal className={styles.head}>
            <SectionHeader
              titleId="brc-faq-title"
              sans={FAQ_HEADING.sans}
              accent={FAQ_HEADING.accent}
            />
          </Reveal>

          <Reveal className={styles.faq} stagger={60}>
            {BRACES_FAQ.map((item, index) => (
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

          <div className={styles.askCol}>
            <Reveal delay={120}>
              <aside className={styles.ask} aria-labelledby="brc-ask-title">
                <h3 id="brc-ask-title" className={styles.askTitle}>
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
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
