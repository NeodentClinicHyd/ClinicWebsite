"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import {
  homepageLeadership,
  homepageSpecialists,
  type ClinicalTeamMember,
} from "@/lib/clinical-team";
import { SwipeRow } from "./SwipeRow";
import shared from "./AboutShared.module.css";
import styles from "./AboutTeam.module.css";

/* ------------------------------------------------------------------
   About -- "The Neodent clinical team." (light, new section after
   "Experience carried forward.")

   Lists the same seven doctors as the home page section "A steady hand.
   A human approach.", read from lib/clinical-team.ts (names, roles,
   credentials, years, portraits and crops are never retyped here):
   the two leadership cards first, then the rest of the clinical team.
   The supporting line and lede are the home page's own approved copy.
   Every portrait is a transparent cut-out in the same 4:5 charcoal
   frame, placed with the per-file crop from the data file; a doctor
   with no portrait gets the monogram plate. Dr. Siraj's data link is
   an anchor to this page (his own section is above), so only Dr.
   Miftah's "View profile" link is shown. Below 1024px the clinical team
   is one swipe row.
   ------------------------------------------------------------------ */

type FrameSizes = readonly (readonly [media: string | null, width: string])[];

const LEADER_FRAME: FrameSizes = [
  ["(max-width: 640px)", "38vw"],
  [null, "220px"],
];
const MEMBER_FRAME: FrameSizes = [
  ["(max-width: 767px)", "62vw"],
  ["(max-width: 1023px)", "34vw"],
  [null, "210px"],
];

function scaledSizes(frame: FrameSizes, scale: number) {
  return frame
    .map(([media, width]) => {
      const len = scale === 1 ? width : `calc(${width} * ${scale})`;
      return media ? `${media} ${len}` : len;
    })
    .join(", ");
}

function fullName(member: ClinicalTeamMember) {
  return member.nameLines.join(" ");
}

/** Cut-out on the shared charcoal backdrop, or the monogram plate. */
function Portrait({ member, frame }: { member: ClinicalTeamMember; frame: FrameSizes }) {
  if (!member.image) {
    return (
      <div className={`${styles.frame} ${styles.monogram}`} role="img" aria-label={fullName(member)}>
        <svg className={styles.tooth} viewBox="0 0 100 120" aria-hidden="true" focusable="false">
          <path d="M50 20C39 8 15 9 13 33c-2 20 10 32 13 51 3 17 5 28 11 28 7 0 7-19 13-29 6 10 6 29 13 29 6 0 8-11 11-28 3-19 15-31 13-51C85 9 61 8 50 20Z" />
        </svg>
        <span className={styles.initials} aria-hidden="true">
          {member.initials}
        </span>
      </div>
    );
  }
  const crop = member.crop ?? { file: [800, 1000] as const, width: 100, left: 0, top: 0 };
  return (
    <div className={styles.frame}>
      <Image
        className={styles.cutout}
        src={member.image}
        alt={member.alt}
        width={crop.file[0]}
        height={crop.file[1]}
        sizes={scaledSizes(frame, crop.width / 100)}
        style={{ width: `${crop.width}%`, left: `${crop.left}%`, top: `${crop.top}%` }}
      />
    </div>
  );
}

export function AboutTeam() {
  return (
    <section
      className={`${shared.section} ${shared.light} ${styles.team}`}
      id="team"
      aria-labelledby="team-title"
    >
      <div className={shared.container}>
        <Reveal as="header" className={styles.header} stagger={80}>
          <div>
            <h2 id="team-title" className={shared.title}>
              The Neodent clinical team.
            </h2>
            <p className={styles.subtitle}>
              Dentists and specialists at Neodent Dental Hospital, Mehdipatnam
              and Nampally, Hyderabad.
            </p>
          </div>
          <p className={shared.lede}>
            Seven doctors across our Mehdipatnam and Nampally clinics, led by
            the specialists who plan and oversee your treatment.
          </p>
        </Reveal>

        <Reveal as="div" className={styles.leaders} stagger={100}>
          {homepageLeadership.map((member) => (
            <article
              className={`${shared.card} ${styles.leader}`}
              key={member.id}
              aria-labelledby={`team-${member.id}`}
            >
              <div className={styles.media}>
                <Portrait member={member} frame={LEADER_FRAME} />
              </div>
              <div className={styles.identity}>
                <p className={shared.label}>{member.role}</p>
                <h3 id={`team-${member.id}`} className={styles.leaderName}>
                  {fullName(member)}
                </h3>
                {member.experienceYears && (
                  <p className={styles.years}>
                    <strong>{member.experienceYears}</strong>
                    <span>Years of experience</span>
                  </p>
                )}
              </div>
              <dl className={`${shared.facts} ${styles.facts}`}>
                {member.credentials?.map((row) => (
                  <div className={shared.fact} key={row.term}>
                    <dt>{row.term}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
              {member.href?.startsWith("/doctors/") && (
                <Link className={styles.profileLink} href={member.href}>
                  View profile
                  <span className={shared.vh}> of {fullName(member)}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              )}
            </article>
          ))}
        </Reveal>

        <Reveal as="div" className={styles.rest} delay={80}>
          <SwipeRow
            wide
            label="Clinical team"
            className={styles.row}
            itemClassName={styles.rowItem}
            items={homepageSpecialists.map((member) => ({
              key: member.id,
              node: (
                <div className={styles.member}>
                  <Portrait member={member} frame={MEMBER_FRAME} />
                  <h3 className={styles.memberName}>{fullName(member)}</h3>
                  <p className={styles.memberDetail}>
                    {member.detailLines.map((line, index) => (
                      <span key={line}>
                        {index > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              ),
            }))}
          />
        </Reveal>
      </div>
    </section>
  );
}
