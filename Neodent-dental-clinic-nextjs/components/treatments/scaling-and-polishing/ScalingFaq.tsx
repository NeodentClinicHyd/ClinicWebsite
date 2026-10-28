import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import {
  FAQ,
  FAQ_CTA_TITLE,
  FAQ_HEADING,
  type ScalingFaqItem,
} from "@/lib/scaling-and-polishing-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { ctaTelPhone } from "@/lib/site-data";
import styles from "./ScalingFaq.module.css";

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

/* 11. FAQ (tan)
   Pattern: the Smile Design / FMR FAQ. Two columns. Left: the FAQ as native
   <details>/<summary> cards (first one open, every answer in the DOM, no
   numbers). Right: a sticky dark card with the two contact actions. The
   accordion and the FAQPage JSON-LD read the same FAQ array. */
export function ScalingFaq() {
  return (
    <section className={styles.section} aria-labelledby="sp-faq-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.head}>
            <SectionHeader
              titleId="sp-faq-title"
              sans={FAQ_HEADING.sans}
              accent={FAQ_HEADING.accent}
            />
          </div>
          <div className={styles.faq}>
            {FAQ.map((item, index) => (
              <details className={styles.item} key={item.question} open={index === 0}>
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

          <aside className={styles.ask} aria-labelledby="sp-ask-faq-title">
            <h3 id="sp-ask-faq-title" className={styles.askTitle}>
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
