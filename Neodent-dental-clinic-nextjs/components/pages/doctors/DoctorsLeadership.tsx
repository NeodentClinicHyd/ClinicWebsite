import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { DoctorPortrait, type FrameSizes } from "@/components/ui/DoctorPortrait";
import { clinicalTeam } from "@/lib/clinical-team";
import {
  DOCTORS_LEADERS,
  DOCTORS_LEADERSHIP_HEADING,
} from "@/lib/pages/doctors-content";
import styles from "./DoctorsLeadership.module.css";

/* ------------------------------------------------------------------
   Doctors -- S2 clinical leadership (light). The two existing cards in
   the home page's featured-card format: portrait (the shared cut-out
   on the 4:5 charcoal frame, DoctorPortrait) with the experience figure
   under it, then label, name (h3), credential line, paragraph and link.
   Text is the old page's own, moved unchanged (doctors-content.ts);
   portrait, years and the profile links come from lib/clinical-team.ts.

   Desktop: two cards side by side. Phones: cards stack and are compact
   (portrait about 104px wide beside label, name and credentials).
   ------------------------------------------------------------------ */

const LEADER_FRAME: FrameSizes = [
  ["(max-width: 640px)", "104px"],
  [null, "240px"],
];

const byId = new Map(clinicalTeam.map((member) => [member.id, member]));

export function DoctorsLeadership() {
  return (
    <section className={styles.section} id="leadership" aria-labelledby="leadership-title">
      <div className={styles.container}>
        <Reveal as="header" className={styles.header} stagger={80}>
          <p className={styles.eyebrow}>{DOCTORS_LEADERSHIP_HEADING.eyebrow}</p>
          <h2 id="leadership-title" className={styles.title}>
            {DOCTORS_LEADERSHIP_HEADING.title}
          </h2>
          <p className={styles.lede}>{DOCTORS_LEADERSHIP_HEADING.lede}</p>
        </Reveal>

        <Reveal className={styles.leaders} stagger={100}>
          {DOCTORS_LEADERS.map((leader) => {
            const member = byId.get(leader.id);
            if (!member) return null;
            const years = member.experienceYears;
            const yearsNumber = years ? Number.parseInt(years, 10) : NaN;
            const yearsSuffix = years ? years.replace(/\d/g, "") : "";
            const href = member.href;
            return (
              <article
                className={styles.leader}
                key={leader.id}
                aria-labelledby={`leader-${leader.id}`}
              >
                <div className={styles.aside}>
                  <div className={styles.media}>
                    <Reveal variant="mask" delay={120}>
                      <DoctorPortrait
                        member={member}
                        frame={LEADER_FRAME}
                        className={styles.portraitFrame}
                      />
                    </Reveal>
                  </div>
                  {Number.isFinite(yearsNumber) && (
                    <p className={styles.exp}>
                      <strong>
                        <CountUp to={yearsNumber} suffix={yearsSuffix} />
                      </strong>
                      <span>Years of experience</span>
                    </p>
                  )}
                </div>

                <div className={styles.head}>
                  <p className={styles.label}>{leader.label}</p>
                  <h3 id={`leader-${leader.id}`} className={styles.name}>
                    {leader.name}
                  </h3>
                  <p className={styles.credentials}>{leader.credentials}</p>
                </div>

                <p className={styles.body}>
                  {leader.paragraph.map((part, index) =>
                    typeof part === "string" ? (
                      part
                    ) : (
                      <Link key={index} href={part.href} className={styles.inline}>
                        {part.text}
                      </Link>
                    ),
                  )}
                </p>

                {href && (
                  <Link className={styles.profileLink} href={href}>
                    {leader.linkText}
                    {leader.id === "siraj" && (
                      <span className={styles.srOnly}> of {leader.name}</span>
                    )}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                )}
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
