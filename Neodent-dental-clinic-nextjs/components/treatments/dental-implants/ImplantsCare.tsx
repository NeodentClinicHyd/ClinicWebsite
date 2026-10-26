import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { doctorImage } from "@/lib/site-data";
import { SectionHeader } from "./SectionHeader";
import styles from "./ImplantsCare.module.css";

const CARE = [
  "Clean around the implant every day, as your dentist shows you.",
  "Keep your check-ups. Your dentist sets how often, based on your own gum health and risk.",
  "Treat gum disease early, ideally before the implant is placed.",
  "If you smoke, stopping is strongly advised.",
  "If you grind your teeth, ask whether protection for your teeth is advised.",
];

/* Pattern: ClinicalLeadership ("A steady hand. A human approach."): dark
   ground, serif title with a red italic line, paper doctor card with
   label / value rows. It names one clinician only and does not claim he
   performs every implant. */
export function ImplantsCare() {
  return (
    <section className={styles.section} aria-labelledby="di-care-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.left}>
            <SectionHeader
              titleId="di-care-title"
              sans="How to look after"
              accent="a dental implant."
              tone="dark"
            >
              <p className="section-lede section-lede--on-dark">
                An implant itself cannot decay, but{" "}
                <EditorialHighlight tone="primary" onDark>
                  the gum and bone around it
                </EditorialHighlight>{" "}
                still need{" "}
                <EditorialHighlight tone="quiet" onDark>
                  daily care
                </EditorialHighlight>
                .
              </p>
            </SectionHeader>
            <ul className={styles.list}>
              {CARE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside className={styles.card} aria-labelledby="di-doctor-name">
            <div className={styles.portrait}>
              <Image
                className={styles.portraitImg}
                src={doctorImage}
                alt="Dr. Md. Miftah Ur Rahman, smiling, arms folded, in a white coat"
                fill
                sizes="(max-width: 1023px) 92vw, 36vw"
              />
              <div className={styles.identity}>
                <h3 id="di-doctor-name" className={styles.name}>
                  Dr. Md. Miftah Ur Rahman
                </h3>
                <p className={styles.label}>Prosthodontist and Implantologist</p>
              </div>
            </div>
            <dl className={styles.facts}>
              <div className={styles.fact}>
                <dt>Qualifications</dt>
                <dd className={styles.quals}>BDS, MDS, FICOI</dd>
              </div>
              <div className={styles.fact}>
                <dt>Your implant</dt>
                <dd>
                  Which clinician places and restores your implant is{" "}
                  <EditorialHighlight tone="primary">
                    confirmed at your consultation
                  </EditorialHighlight>
                  .
                </dd>
              </div>
            </dl>
            <div className={styles.cardAction}>
              <AppButton href="/doctors/dr-miftah-ur-rahman" variant="primary">
                View profile <ArrowRight size={15} aria-hidden="true" />
              </AppButton>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
