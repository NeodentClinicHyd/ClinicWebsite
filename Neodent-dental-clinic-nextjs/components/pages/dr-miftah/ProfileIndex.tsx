import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import styles from "./ProfileIndex.module.css";

/* ------------------------------------------------------------------
   01 Profile index (pattern P2 with a definition list).
   Light band. Same four facts as before, in a semantic <dl>. The two
   clinic names link to their clinic pages (words unchanged) and the
   number in "15+ years" counts up. The faded background photograph is a
   decorative layer at low opacity, masked away top and bottom.
   ------------------------------------------------------------------ */

export function ProfileIndex() {
  return (
    <section className={styles.section} aria-labelledby="miftah-index-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.head}>
            <Reveal as="p" className={styles.eyebrow}>
              01 / PROFILE INDEX
            </Reveal>
            <Reveal as="h2" id="miftah-index-title" className={styles.title} delay={80}>
              The record, in brief.
            </Reveal>
          </div>
          <Reveal as="dl" className={styles.rows} stagger={80}>
            <div className={styles.row}>
              <dt>Practising at</dt>
              <dd>
                <Link href="/clinic/mehdipatnam" className={styles.link}>
                  Mehdipatnam
                </Link>{" "}
                &middot;{" "}
                <Link href="/clinic/nampally" className={styles.link}>
                  Nampally
                </Link>
                , Hyderabad
              </dd>
            </div>
            <div className={styles.row}>
              <dt>Clinical focus</dt>
              <dd>Prosthodontics &amp; Implantology</dd>
            </div>
            <div className={styles.row}>
              <dt>Academic post</dt>
              <dd>
                Assistant Professor, Dept. of Prosthodontics, SB Patil Dental
                College &amp; Hospital
              </dd>
            </div>
            <div className={styles.row}>
              <dt>Experience</dt>
              <dd>
                <CountUp to={15} suffix="+" grouping={false} /> years
              </dd>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
