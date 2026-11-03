import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { AppButton } from "@/components/ui/AppButton";
import { FAQ, FAQ_CTA_TITLE, FAQ_HEADING, type SmileFaqItem } from "@/lib/smile-design-page";
import { ctaTelPhone } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import styles from "./Faq.module.css";

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Renders the answer text exactly as stored, turning only the words listed in
 *  `links` into links. The stored string is what the FAQPage JSON-LD uses. */
function Answer({ item }: { item: SmileFaqItem }) {
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

/* FAQ (ivory). The ten questions are native <details>/<summary> cards (first one
   open, every answer in the DOM, no numbers) in two columns of five, in reading
   order (1 to 5, then 6 to 10); one column on phones. Under them a full-width dark
   card with the two contact actions, so no column is left half empty (T.3). The
   accordion and the FAQPage JSON-LD read the same FAQ array. The section keeps
   the red-italic heading accent (one of the four accent sections). */
const HALF = Math.ceil(FAQ.length / 2);
const indexed = FAQ.map((item, index) => ({ item, index }));
const columns = [indexed.slice(0, HALF), indexed.slice(HALF)];

export function Faq() {
  return (
    <section className={styles.section} aria-labelledby="sd-faq-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.head}>
            <Reveal>
              <SectionHeader
                titleId="sd-faq-title"
                sans={FAQ_HEADING.sans}
                accent={FAQ_HEADING.accent}
              />
            </Reveal>
          </div>
          <Reveal className={styles.faq} stagger={60}>
            {columns.map((column, columnIndex) => (
              <div className={styles.column} key={columnIndex}>
                {column.map(({ item, index }) => (
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
            ))}
          </Reveal>

          <Reveal delay={120}>
          <aside className={styles.ask} aria-labelledby="sd-ask-faq-title">
            <h3 id="sd-ask-faq-title" className={styles.askTitle}>
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
    </section>
  );
}
