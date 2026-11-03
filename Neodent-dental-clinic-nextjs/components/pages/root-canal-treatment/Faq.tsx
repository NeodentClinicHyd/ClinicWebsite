import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { AppButton } from "@/components/ui/AppButton";
import { FAQ_CTA_TITLE, FAQ_HEADING, RCT_FAQ, type RctFaqItem } from "@/lib/root-canal-treatment-page";
import { ctaTelPhone } from "@/lib/site-data";
import { LinkedText } from "./LinkedText";
import { SectionHeader } from "./SectionHeader";
import styles from "./Faq.module.css";

const HALF = Math.ceil(RCT_FAQ.length / 2);

/* Root canal treatment: your questions (ivory)
   Native details/summary items, the first open, every answer in the DOM, no
   numbers. Desktop: two columns of five (questions 1 to 5, then 6 to 10) so
   neither side is empty; one column below 1024 px. Beneath: the "Ready to
   talk it through?" card, a full-width ivory card (labels unchanged). The
   accordion and the FAQPage JSON-LD read the same RCT_FAQ array. */
export function Faq() {
  const column = (items: RctFaqItem[], offset: number) => (
    <div className={styles.column}>
      {items.map((item, index) => (
        <details className={styles.item} key={item.question} open={offset + index === 0}>
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
  );

  return (
    <section className={styles.section} aria-labelledby="rct-faq-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="rct-faq-title"
            sans={FAQ_HEADING.sans}
            accent={FAQ_HEADING.accent}
            plain
          />
        </Reveal>

        <Reveal className={styles.faq} stagger={70}>
          {column(RCT_FAQ.slice(0, HALF), 0)}
          {column(RCT_FAQ.slice(HALF), HALF)}
        </Reveal>

        <Reveal as="aside" className={styles.ask} aria-labelledby="rct-ask-title" delay={80}>
          <h3 id="rct-ask-title" className={styles.askTitle}>
            {FAQ_CTA_TITLE}
          </h3>
          <div className={styles.askActions}>
            <AppButton href={ctaTelPhone} variant="dark">
              Call us
            </AppButton>
            <AppButton href="/contact" variant="primary">
              Send an enquiry
            </AppButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
