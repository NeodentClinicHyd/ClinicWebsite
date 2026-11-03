import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { AppButton } from "@/components/ui/AppButton";
import {
  FAQ,
  FAQ_CTA_TITLE,
  FAQ_HEADING,
  type ScalingFaqItem,
} from "@/lib/scaling-and-polishing-page";
import { ctaTelPhone } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import styles from "./Faq.module.css";

const HALF = Math.ceil(FAQ.length / 2);

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Renders the answer text exactly as stored, turning only the words listed
 *  in `links` into links. The stored string is what the FAQPage JSON-LD uses. */
function Answer({ item }: { item: ScalingFaqItem }) {
  const links = item.links ?? [];
  if (links.length === 0) return <>{item.answer}</>;

  const pattern = new RegExp(`(${links.map((l) => escape(l.text)).join("|")})`);
  return (
    <>
      {item.answer.split(pattern).map((part, index) => {
        const link = links.find((l) => l.text === part);
        return link ? (
          <Link className={styles.link} href={link.href} key={index}>
            {part}
          </Link>
        ) : (
          part
        );
      })}
    </>
  );
}

/* Scaling and polishing questions, answered (tan)
   Native details/summary items, the first open, every answer in the DOM, no
   numbers. Desktop: two columns of five (questions 1 to 5, then 6 to 10) so
   neither side is empty; one column below 1024 px. Beneath: the "Ready to
   talk it through?" card, a full-width paper card with a red top edge (labels
   unchanged), not a second dark block next to the dark Locations band. The
   accordion and the FAQPage JSON-LD read the same FAQ array. Plain heading. */
export function Faq() {
  const column = (items: ScalingFaqItem[], offset: number) => (
    <div className={styles.column}>
      {items.map((item, index) => (
        <details className={styles.item} key={item.question} open={offset + index === 0}>
          <summary className={styles.summary}>
            <h3 className={styles.question}>{item.question}</h3>
            <ChevronDown className={styles.chevron} size={20} aria-hidden="true" />
          </summary>
          <p className={styles.answer}>
            <Answer item={item} />
          </p>
        </details>
      ))}
    </div>
  );

  return (
    <section className={styles.section} aria-labelledby="sp-faq-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="sp-faq-title"
            sans={FAQ_HEADING.sans}
            accent={FAQ_HEADING.accent}
            plain
          />
        </Reveal>

        <Reveal className={styles.faq} stagger={70}>
          {column(FAQ.slice(0, HALF), 0)}
          {column(FAQ.slice(HALF), HALF)}
        </Reveal>

        <Reveal as="aside" className={styles.ask} aria-labelledby="sp-ask-title" delay={80}>
          <h3 id="sp-ask-title" className={styles.askTitle}>
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
