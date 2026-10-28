import type { ReactNode } from "react";
import { TreatmentDoctorCard } from "@/components/treatments/TreatmentDoctorCard";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import {
  IconCheckup,
  IconCleaning,
  IconGumHealth,
  IconNightGuard,
  IconNoSmoking,
  IconTile,
} from "./ImplantIllustrations";
import { SectionHeader } from "./SectionHeader";
import styles from "./ImplantsCare.module.css";

/* `icon` is the (future) 40px artwork slot: it renders only when artwork is
   supplied, otherwise the card carries the page's red dash marker. */
const CARE: { text: string; icon?: ReactNode }[] = [
  {
    text: "Clean around the implant every day, as your dentist shows you.",
    icon: <IconTile><IconCleaning /></IconTile>,
  },
  {
    text: "Keep your check-ups. Your dentist sets how often, based on your own gum health and risk.",
    icon: <IconTile><IconCheckup /></IconTile>,
  },
  {
    text: "Treat gum disease early, ideally before the implant is placed.",
    icon: <IconTile><IconGumHealth /></IconTile>,
  },
  {
    text: "If you smoke, stopping is strongly advised.",
    icon: <IconTile><IconNoSmoking /></IconTile>,
  },
  {
    text: "If you grind your teeth, ask whether protection for your teeth is advised.",
    icon: <IconTile><IconNightGuard /></IconTile>,
  },
];

/* Pattern: ClinicalLeadership ("A steady hand. A human approach."): dark
   ground, serif title with a red italic line, paper doctor card with
   label / value rows. It names one clinician only and does not claim he
   performs every implant. The five tips are a stacked card list. */
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
            <ul className={styles.tips}>
              {CARE.map(({ text, icon }) => (
                <li className={`${styles.tip} ${icon ? styles.hasIcon : ""}`} key={text}>
                  {icon ? <span className={styles.tipIcon}>{icon}</span> : null}
                  <span className={styles.tipText}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <TreatmentDoctorCard
            headingId="di-doctor-name"
            doctor={{
              name: "Dr. Md. Miftah Ur Rahman",
              designation: "Prosthodontist and Implantologist",
              qualifications: "BDS, MDS, FICOI",
              treatmentLabel: "Your implant",
              profileHref: "/doctors/dr-miftah-ur-rahman",
              imageAlt: "Dr. Md. Miftah Ur Rahman, smiling, arms folded, in a white coat",
            }}
            treatmentCopy={
              <>
                Which clinician places and restores your implant is{" "}
                <EditorialHighlight tone="primary">
                  confirmed at your consultation
                </EditorialHighlight>
                .
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
