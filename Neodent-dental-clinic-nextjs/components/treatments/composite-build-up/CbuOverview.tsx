import { OVERVIEW } from "@/lib/composite-build-up-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./CbuSlot";
import styles from "./CbuOverview.module.css";

/* 2. What is a composite build-up? (tan)
   Pattern: the implants / root canal overview. Heading and lede across the
   top. Below: "What it is" and "Who might be offered one" stacked beside the
   tooth cross-section (C1, the dominant element, 4:3, never stretched), so
   the two small cards end level with the frame. Then "What an assessment
   checks" as one wide card with its four items in two columns, and the dark
   "Other names you may hear" card, the page's only synonym list. */
export function CbuOverview() {
  const { what, pair, names } = OVERVIEW;

  return (
    <section className={styles.section} aria-labelledby="cbu-overview-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.head}>
            <SectionHeader
              titleId="cbu-overview-title"
              sans={OVERVIEW.sans}
              accent={OVERVIEW.accent}
            />
            <p className={styles.lede}>
              <RichText parts={OVERVIEW.lede} />
            </p>
          </div>

          <div className={styles.stack}>
            <article className={styles.card} aria-labelledby="cbu-what-title">
              <h3 id="cbu-what-title" className={styles.cardTitle}>
                {what.title}
              </h3>
              <p className={styles.cardText}>{what.text}</p>
            </article>
            <article className={styles.card} aria-labelledby="cbu-who-title">
              <h3 id="cbu-who-title" className={styles.cardTitle}>
                {pair.who.title}
              </h3>
              <p className={styles.cardText}>{pair.who.text}</p>
            </article>
          </div>

          <div className={styles.media}>
            <Slot id="C1" caption={ILLUSTRATION_NOTE} />
          </div>
        </div>

        <article className={styles.check} aria-labelledby="cbu-check-title">
          <h3 id="cbu-check-title" className={styles.cardTitle}>
            {pair.check.title}
          </h3>
          <ul className={styles.list}>
            {pair.check.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className={styles.names} aria-labelledby="cbu-names-title">
          <h3 id="cbu-names-title" className={styles.namesTitle}>
            {names.title}
          </h3>
          <p className={styles.namesText}>{names.text}</p>
        </article>
      </div>
    </section>
  );
}
