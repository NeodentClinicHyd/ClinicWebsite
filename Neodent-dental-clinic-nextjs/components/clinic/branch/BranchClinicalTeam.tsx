"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import type { ClinicLocation } from "@/lib/clinic-data";
import { clinicalTeam } from "@/lib/clinical-team";
import { useReveal } from "../useReveal";
import shared from "../ClinicShared.module.css";
import styles from "./BranchClinicalTeam.module.css";

export function BranchClinicalTeam({ clinic }: { clinic: ClinicLocation }) {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.dark} ${shared.charcoal} ${styles.team}`}
      id="clinical-team"
      aria-labelledby="branch-team-title"
    >
      <div className={shared.container}>
        <header className={styles.header} data-reveal>
          <h2 id="branch-team-title" className={shared.title}>
            The people behind <span>your care.</span>
          </h2>
          <p className={`${shared.lede} ${styles.lede}`}>
            These clinicians and team members are part of the wider Neodent
            practice. Schedules can vary by day, so call the {clinic.name} clinic
            to ask who is available for your visit.
          </p>
        </header>

        <div className={styles.layout} data-reveal>
          <figure className={styles.figure}>
            <Image
              src="/assets/neodent-dental-hospital-doctors.jpeg"
              alt="Neodent clinicians and team members gathered inside the hospital"
              width={3840}
              height={1728}
              sizes="(max-width: 767px) 92vw, (max-width: 1023px) 100vw, 56vw"
              className={styles.image}
            />
            <figcaption className={styles.caption}>
              The Neodent clinical team
            </figcaption>
          </figure>

          <div className={styles.roster}>
            <p className={styles.rosterLabel}>Clinical team</p>
            <ul>
              {clinicalTeam.map((member) => (
                <li key={member.id}>
                  <div>
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
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <Link href="/doctors" className={styles.allDoctors}>
              Meet our doctors <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
