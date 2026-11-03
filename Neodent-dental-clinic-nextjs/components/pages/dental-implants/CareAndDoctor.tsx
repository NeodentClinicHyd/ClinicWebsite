import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import {
  IconCheckup,
  IconCleaning,
  IconGumHealth,
  IconNightGuard,
  IconNoSmoking,
  IconTile,
} from "@/components/treatments/dental-implants/ImplantIllustrations";
import { Emphasis } from "./Emphasis";
import { SectionHeader } from "./SectionHeader";
import { TreatmentDoctorCard } from "./TreatmentDoctorCard";
import styles from "./CareAndDoctor.module.css";

const CARE: { text: string; icon: ReactNode }[] = [
  {
    text: "Clean around the implant every day, as your dentist shows you.",
    icon: (
      <IconTile>
        <IconCleaning />
      </IconTile>
    ),
  },
  {
    text: "Keep your check-ups. Your dentist sets how often, based on your own gum health and risk.",
    icon: (
      <IconTile>
        <IconCheckup />
      </IconTile>
    ),
  },
  {
    text: "Treat gum disease early, ideally before the implant is placed.",
    icon: (
      <IconTile>
        <IconGumHealth />
      </IconTile>
    ),
  },
  {
    text: "If you smoke, stopping is strongly advised.",
    icon: (
      <IconTile>
        <IconNoSmoking />
      </IconTile>
    ),
  },
  {
    text: "If you grind your teeth, ask whether protection for your teeth is advised.",
    icon: (
      <IconTile>
        <IconNightGuard />
      </IconTile>
    ),
  },
];

/* "How to look after a dental implant." with the doctor card (plan 4.7).
   Dark ground. Five care rows with icons on the left; the doctor card on the
   right, its portrait capped at 40dvh (34dvh on phones) and its profile
   button pinned to the bottom so the card ends level with the last row. It
   names one clinician only and does not claim he performs every implant.
   Plain heading (no accent). */
export function CareAndDoctor() {
  return (
    <section className={styles.section} aria-labelledby="di-care-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.left}>
            <Reveal>
              <SectionHeader
                titleId="di-care-title"
                sans="How to look after"
                accent="a dental implant."
                tone="dark"
                plain
              >
                <p className="section-lede section-lede--on-dark">
                  An implant itself cannot decay, but{" "}
                  <Emphasis tone="primary" onDark>
                    the gum and bone around it
                  </Emphasis>{" "}
                  still need{" "}
                  <Emphasis tone="quiet" onDark>
                    daily care
                  </Emphasis>
                  .
                </p>
              </SectionHeader>
            </Reveal>
            <Reveal as="ul" className={styles.tips} stagger={80}>
              {CARE.map(({ text, icon }) => (
                <li className={styles.tip} key={text}>
                  <span className={styles.tipIcon}>{icon}</span>
                  <span className={styles.tipText}>{text}</span>
                </li>
              ))}
            </Reveal>
          </div>

          <Reveal className={styles.doctor} delay={120}>
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
                  <Emphasis tone="primary">confirmed at your consultation</Emphasis>.
                </>
              }
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
