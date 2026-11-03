import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { AppButton } from "@/components/ui/AppButton";
import { IMPLANT_FAQ, type ImplantFaq } from "@/lib/dental-implants-page";
import { SectionHeader } from "./SectionHeader";
import styles from "./FaqSection.module.css";

const QUESTIONS = [
  "Am I suitable now, or does anything need treating first?",
  "Do I need a scan or a bone graft?",
  "What are the alternatives, and what do they involve?",
  "Who does the surgery, and who makes the crown?",
  "What follow-up and maintenance will you arrange, and how often?",
  "What happens if the implant does not bond?",
];

/** Renders the answer text exactly as stored, turning only the words listed
 *  in `links` into links. The stored string is what the FAQPage JSON-LD uses. */
function Answer({ item }: { item: ImplantFaq }) {
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

/* "Dental implant questions, answered." (plan 4.8). Ivory ground. Left: the
   ten questions as native <details> (first open, no numbering, hairline
   dividers, chevron, the answer fades up on open). Right: the sticky dark
   "Questions to ask your dentist" card, in the DOM at every width. The
   accordion and the FAQPage JSON-LD read the same IMPLANT_FAQ array. */
export function FaqSection() {
  return (
    <section className={styles.section} aria-labelledby="di-questions-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <Reveal className={styles.head}>
            <SectionHeader
              titleId="di-questions-title"
              sans="Dental implant questions,"
              accent="answered."
            />
          </Reveal>

          <Reveal className={styles.faq} stagger={60}>
            {IMPLANT_FAQ.map((item, index) => (
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

          <div className={styles.askCol}>
            <Reveal delay={120}>
              <aside className={styles.ask} aria-labelledby="di-ask-title">
                <h3 id="di-ask-title" className={styles.askTitle}>
                  Questions to ask your dentist
                </h3>
                <ul className={styles.askList}>
                  {QUESTIONS.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
                <div className={styles.askAction}>
                  <AppButton href="/contact" variant="primary">
                    Send an enquiry <ArrowRight size={15} aria-hidden="true" />
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
