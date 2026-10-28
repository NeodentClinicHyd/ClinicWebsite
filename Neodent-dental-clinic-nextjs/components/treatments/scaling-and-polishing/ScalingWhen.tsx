import { WHEN } from "@/lib/scaling-and-polishing-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./ScalingSlot";
import styles from "./ScalingWhen.module.css";

/* 3. When might a clean be discussed? (light)
   Own composition. Left: two cards of different kinds. The lead card is the
   one sign you can see for yourself (tartar and stains, icon G7a). Beneath
   it, one grouped card holds the three signs that are listed as warning
   signs of gum disease (icons G7b-d), told apart by a red top edge. Right:
   the healthy-versus-inflamed gum pair (G3, the dominant element). A tinted
   strip closes the section with the "an examination decides" line. */
export function ScalingWhen() {
  const { lead, signs } = WHEN;

  return (
    <section className={styles.section} aria-labelledby="sp-when-title">
      <div className={styles.container}>
        <SectionHeader titleId="sp-when-title" sans={WHEN.sans} accent={WHEN.accent}>
          <p className="section-lede">
            <RichText parts={WHEN.intro} />
          </p>
        </SectionHeader>

        <div className={styles.layout}>
          <div className={styles.left}>
            <article className={styles.lead} aria-labelledby="sp-when-lead">
              <Slot id={lead.slot} />
              <div className={styles.body}>
                <h3 id="sp-when-lead" className={styles.title}>
                  {lead.title}
                </h3>
                <p className={styles.text}>{lead.text}</p>
              </div>
            </article>

            <ul className={styles.signs}>
              {signs.map((sign) => (
                <li className={styles.sign} key={sign.slot}>
                  <Slot id={sign.slot} />
                  <div className={styles.body}>
                    <h3 className={styles.title}>{sign.title}</h3>
                    <p className={styles.text}>{sign.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.media}>
            <Slot id="G3" caption={WHEN.mediaCaption} />
          </div>
        </div>

        <p className={styles.note}>{WHEN.note}</p>
      </div>
    </section>
  );
}
