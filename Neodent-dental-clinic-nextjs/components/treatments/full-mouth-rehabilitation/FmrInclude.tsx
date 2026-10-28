import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INCLUDE } from "@/lib/full-mouth-rehabilitation-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./FmrSlot";
import styles from "./FmrInclude.module.css";

/* 4. What a plan can include (dark, patterned)
   Pattern: the implants options section (treatment-atlas ground with light
   paper cards). Five kind-of-care cards (scene M3a-e, title, one line,
   examples, links to the Neodent treatment page) plus the red closing note
   as the sixth cell, so the grid is 3 x 2 with no gaps. */
export function FmrInclude() {
  return (
    <section className={styles.section} aria-labelledby="fmr-include-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="fmr-include-title"
          sans={INCLUDE.sans}
          accent={INCLUDE.accent}
          tone="dark"
        >
          <p className="section-lede section-lede--on-dark">
            <RichText parts={INCLUDE.intro} onDark />
          </p>
        </SectionHeader>

        <ul className={styles.grid}>
          {INCLUDE.cards.map((card) => (
            <li className={styles.cell} key={card.slot}>
              <article className={styles.card} aria-labelledby={`fmr-include-${card.slot}`}>
                <Slot id={card.slot} />
                <h3 id={`fmr-include-${card.slot}`} className={styles.title}>
                  {card.title}
                </h3>
                <p className={styles.text}>{card.text}</p>
                <p className={styles.examples}>
                  <b>{INCLUDE.examplesLabel}</b> {card.examples}
                </p>
                {card.links.length > 0 ? (
                  <ul className={styles.links}>
                    {card.links.map((link) => (
                      <li key={link.href}>
                        <Link className={styles.link} href={link.href}>
                          {link.label}
                          <ArrowRight size={15} aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </li>
          ))}
          <li className={styles.cell}>
            <div className={styles.note}>
              <p>{INCLUDE.note}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
