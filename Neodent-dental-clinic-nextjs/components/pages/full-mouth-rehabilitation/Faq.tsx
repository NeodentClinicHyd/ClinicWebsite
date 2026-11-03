import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { FAQ_CTA_TITLE, FAQ_HEADING, FMR_FAQ, type FmrFaqItem } from "@/lib/full-mouth-rehabilitation-page";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { ctaTelPhone } from "@/lib/site-data";
import styles from "./Faq.module.css";

/** Renders the answer text exactly as stored, turning only the words listed
 *  in `links` into links. The stored string is what the FAQPage JSON-LD uses. */
function Answer({ item }: { item: FmrFaqItem }) {
  const links = item.links ?? [];
  if (links.length === 0) return <>{item.answer}</>;

  const pattern = new RegExp(`(${links.map((l) => l.text).join("|")})`);
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

/* FAQ (tan).
   Two columns. Left: the FAQ as native <details>/<summary> cards (first one
   open, every answer in the server HTML, no numbers, smooth open). Right: a
   sticky dark card with the two contact actions, level with the first
   question. The accordion and the FAQPage JSON-LD in page.tsx read the same
   FMR_FAQ array. The heading keeps its red italic accent (one of the four
   planned). On a phone the card follows the list. */
export function Faq() {
  return (
    <section className={styles.section} aria-labelledby="fmr-faq-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <Reveal className={styles.head}>
            <SectionHeader
              titleId="fmr-faq-title"
              sans={FAQ_HEADING.sans}
              accent={FAQ_HEADING.accent}
            />
          </Reveal>
          <Reveal className={styles.faq} stagger={60}>
            {FMR_FAQ.map((item, index) => (
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
          </Reveal>

          <aside className={styles.ask} aria-labelledby="fmr-ask-title">
            <h3 id="fmr-ask-title" className={styles.askTitle}>
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
