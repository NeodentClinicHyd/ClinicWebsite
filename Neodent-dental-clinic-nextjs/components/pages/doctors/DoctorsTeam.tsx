import { Reveal } from "@/components/motion/Reveal";
import { DoctorPortrait, type FrameSizes } from "@/components/ui/DoctorPortrait";
import { homepageSpecialists } from "@/lib/clinical-team";
import { DOCTORS_TEAM_HEADING } from "@/lib/pages/doctors-content";
import { DoctorsBackdrop } from "./DoctorsBackdrop";
import { DoctorsTeamTrack } from "./DoctorsTeamTrack";
import styles from "./DoctorsTeam.module.css";

/* ------------------------------------------------------------------
   Doctors -- S4 the wider clinical team (dark). Every member of the
   home page's "Our clinical team" row, in the home order, read from
   lib/clinical-team.ts (names, details, portraits and crops are never
   retyped). Card: portrait on the shared 4:5 charcoal frame (the
   monogram plate where there is no portrait), name as h3, the detail
   lines under it. One list: no grouping by specialty, no clinic tabs,
   no links (none of these doctors has a profile page).
   ------------------------------------------------------------------ */

const MEMBER_FRAME: FrameSizes = [
  ["(max-width: 767px)", "66vw"],
  ["(max-width: 1023px)", "28vw"],
  ["(max-width: 1279px)", "230px"],
  [null, "200px"],
];

export function DoctorsTeam() {
  const members = homepageSpecialists;
  const names = members.map((member) => member.nameLines.join(" "));

  return (
    <section className={styles.section} id="team" aria-labelledby="team-title">
      <DoctorsBackdrop />
      <div className={styles.container}>
        <Reveal as="header" className={styles.header} stagger={80}>
          <p className={styles.eyebrow}>{DOCTORS_TEAM_HEADING.eyebrow}</p>
          <h2 id="team-title" className={styles.title}>
            {DOCTORS_TEAM_HEADING.title}
          </h2>
          <p className={styles.lede}>{DOCTORS_TEAM_HEADING.lede}</p>
        </Reveal>

        <DoctorsTeamTrack label="Clinical team" names={names}>
          {members.map((member, index) => (
            <li className={styles.item} key={member.id}>
              <div className={styles.card}>
                <Reveal variant="mask" delay={100} className={styles.portrait}>
                  <DoctorPortrait
                    member={member}
                    frame={MEMBER_FRAME}
                    className={styles.frame}
                  />
                </Reveal>
                <h3 className={styles.name}>{names[index]}</h3>
                <p className={styles.detail}>
                  {member.detailLines.map((line, i) => (
                    <span key={line}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </DoctorsTeamTrack>
      </div>
    </section>
  );
}
