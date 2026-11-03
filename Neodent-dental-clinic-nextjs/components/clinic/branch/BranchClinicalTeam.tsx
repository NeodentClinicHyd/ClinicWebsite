import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { BranchBackdrop } from "@/components/pages/clinic-mehdipatnam/BranchBackdrop";
import type { ClinicLocation } from "@/lib/clinic-data";
import { clinicalTeam } from "@/lib/clinical-team";
import styles from "./BranchClinicalTeam.module.css";

/* ------------------------------------------------------------------
   Branch page -- S5 "The people behind your care." (dark band).

   Heading with the red italic on "your care." (kept), lede, group
   photograph with its caption, and the team as dark glass rows: every
   name, role and credential is read from lib/clinical-team.ts, in the
   same order, with the same profile links. "Meet our doctors" is a
   ghost button under the list.

   Desktop: photograph left (16:9, cover, focal point on the faces,
   capped at --media-max-h), roster right. Phones: photograph (16:9, well
   under 38dvh), then the rows. The seven rows are shorter than two phone
   screens, so none is collapsed.
   ------------------------------------------------------------------ */

export function BranchClinicalTeam({ clinic }: { clinic: ClinicLocation }) {
  return (
    <section className={styles.section} id="clinical-team" aria-labelledby="branch-team-title">
      <BranchBackdrop />
      <div className={styles.container}>
        <header className={styles.head}>
          <Reveal as="h2" variant="mask" stagger={90} id="branch-team-title" className={styles.title}>
            <span>The people behind </span>
            <span className={styles.accent}>your care.</span>
          </Reveal>
          <Reveal as="p" className={styles.support} delay={140}>
            These clinicians and team members are part of the wider Neodent
            practice. Schedules can vary by day, so call the {clinic.name} clinic
            to ask who is available for your visit.
          </Reveal>
        </header>

        <div className={styles.layout}>
          <figure className={styles.figure}>
            <Reveal variant="mask" className={styles.photoReveal}>
              <div className={styles.photo}>
                <Image
                  src="/assets/neodent-dental-hospital-doctors.jpeg"
                  alt="Neodent clinicians and team members gathered inside the hospital"
                  fill
                  sizes="(min-width: 1024px) 680px, 92vw"
                  className={styles.image}
                />
              </div>
            </Reveal>
            <figcaption className={styles.caption}>The Neodent clinical team</figcaption>
          </figure>

          <div className={styles.roster}>
            <p className={styles.rosterLabel}>Clinical team</p>
            <Reveal as="ul" stagger={80} className={styles.list}>
              {clinicalTeam.map((member) => (
                <li key={member.id} className={styles.row}>
                  <div className={styles.who}>
                    <h3>{member.nameLines.join(" ")}</h3>
                    {member.detailLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  {member.href && (
                    <Link
                      href={member.href}
                      className={styles.profileLink}
                      aria-label={`View ${member.nameLines.join(" ")} full profile`}
                    >
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  )}
                </li>
              ))}
            </Reveal>
            <Link href="/doctors" className={styles.allDoctors}>
              Meet our doctors <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
