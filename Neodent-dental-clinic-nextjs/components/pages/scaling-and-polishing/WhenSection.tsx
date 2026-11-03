import { Reveal } from "@/components/motion/Reveal";
import { WHEN } from "@/lib/scaling-and-polishing-page";
import { SectionHeader } from "./SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./Slot";
import styles from "./WhenSection.module.css";

/* When might a clean be discussed? (ivory)
   Heading and line, then two columns. Left: the four signs as a 2 x 2 grid of
   equal-height paper cards (one icon size; the lead sign "Visible tartar or
   stains" is first). Right: the healthy-versus-inflamed gum pair (G3), capped
   at min(46dvh, 440px) tall. The tinted note closes the section. Below 1024
   px the diagram comes first, then the signs as compact rows. */
export function WhenSection() {
  const { lead, signs } = WHEN;
  const all = [lead, ...signs];

  return (
    <section className={styles.section} aria-labelledby="sp-when-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader titleId="sp-when-title" sans={WHEN.sans} accent={WHEN.accent} plain>
            <p className="section-lede">
              <RichText parts={WHEN.intro} />
            </p>
          </SectionHeader>
        </Reveal>

        <div className={styles.layout}>
          <Reveal as="ul" className={styles.signs} stagger={80}>
            {all.map((sign) => (
              <li className={styles.sign} key={sign.slot}>
                <Slot id={sign.slot} />
                <div className={styles.body}>
                  <h3 className={styles.title}>{sign.title}</h3>
                  <p className={styles.text}>{sign.text}</p>
                </div>
              </li>
            ))}
          </Reveal>

          <Reveal variant="mask" className={styles.media} delay={120}>
            <div className={styles.diagram}>
              <Slot id="G3" caption={WHEN.mediaCaption} />
            </div>
          </Reveal>
        </div>

        <Reveal as="p" className={styles.note} delay={100}>
          {WHEN.note}
        </Reveal>
      </div>
    </section>
  );
}
