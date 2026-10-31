import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./ClinicalLeadership.module.css";
import { Reveal } from "@/components/motion/Reveal";
import {
  homepageLeadership,
  homepageSpecialists,
  type ClinicalTeamMember,
} from "@/lib/clinical-team";

/* ------------------------------------------------------------------
   Home: "A steady hand. A human approach." (reference Part 6.5)

   Two leadership cards (Dr. Siraj, Dr. Miftah), one compact
   "Dr. Miftah at work" band that links to his profile, then the five
   specialists. Every portrait is a transparent cut-out placed on the
   same charcoal backdrop in a 4:5 frame; the per-file placement
   (lib/clinical-team.ts `crop`) puts every face at the same height and
   size. A doctor with no portrait gets a monogram plate in the same
   frame. Dr. Miftah's portfolio and films live on
   /doctors/dr-miftah-ur-rahman, not here.
   ------------------------------------------------------------------ */

/** Section tone. Light paper and dark were compared on the live page
    (HOME_REDESIGN_CHANGELOG.md, P5); "dark" is also supported. */
const TONE: "light" | "dark" = "light";

const AT_WORK = {
  src: "/assets/dr-miftah/Dr Miftah ur Rahman at Neodent Dental Hospital.jpeg",
  // Baseline alt restored (ledger home-a0ae50c15, rule R5).
  alt:
    "Dr. Md. Miftah Ur Rahman, Prosthodontist and Implantologist, standing beside the dental chair in a treatment room at Neodent Dental Hospital, Hyderabad, holding a dental study model",
  width: 960,
  height: 1280,
};

const MIFTAH_PROFILE = "/doctors/dr-miftah-ur-rahman";

function fullName(member: ClinicalTeamMember) {
  return member.nameLines.join(" ");
}

/** Frame width per breakpoint; the cut-out's `sizes` is scaled by its
    crop width so zoomed files are fetched at the size they render. */
type FrameSizes = readonly (readonly [media: string | null, width: string])[];

const LEADER_FRAME: FrameSizes = [["(max-width: 640px)", "38vw"], [null, "240px"]];
const MEMBER_FRAME: FrameSizes = [
  ["(max-width: 767px)", "66vw"],
  ["(max-width: 1023px)", "30vw"],
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

/** Cut-out on the shared backdrop, or the monogram plate. */
function Portrait({ member, frame }: { member: ClinicalTeamMember; frame: FrameSizes }) {
  if (!member.image) {
    return (
      <div className={`${styles.frame} ${styles.monogram}`} role="img" aria-label={fullName(member)}>
        <svg className={styles.tooth} viewBox="0 0 100 120" aria-hidden="true" focusable="false">
          <path d="M50 20C39 8 15 9 13 33c-2 20 10 32 13 51 3 17 5 28 11 28 7 0 7-19 13-29 6 10 6 29 13 29 6 0 8-11 11-28 3-19 15-31 13-51C85 9 61 8 50 20Z" />
        </svg>
        <span className={styles.initials} aria-hidden="true">{member.initials}</span>
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

export function ClinicalLeadership() {
  return (
    <section className={styles.section} data-tone={TONE} id="leadership" aria-labelledby="leadership-title">
      <div className={styles.container}>
        <Reveal as="header" className={styles.header}>
          <div className={styles.titleBlock}>
            <h2 id="leadership-title" className={styles.title}>
              A steady hand.<br /><span>A human approach.</span>
            </h2>
            {/* Plain supporting line under the brand headline (rule R3). */}
            <p className={styles.subtitle}>
              Dentists and specialists at Neodent Dental Hospital, Mehdipatnam
              and Nampally, Hyderabad.
            </p>
          </div>
          <p className={styles.lede}>
            Seven doctors across our Mehdipatnam and Nampally clinics, led by
            the specialists who plan and oversee your treatment.
          </p>
        </Reveal>

        <Reveal className={styles.leaders} stagger={90}>
          {homepageLeadership.map((member) => (
            <article className={styles.leader} key={member.id} aria-labelledby={`leader-${member.id}`}>
              <div className={styles.leaderHead}>
                <p className={styles.role}>{member.role}</p>
                <h3 id={`leader-${member.id}`} className={styles.leaderName}>{fullName(member)}</h3>
              </div>
              {/* Portrait with the experience figure under it, so the
                  photo column carries content to the same depth as the
                  text column. */}
              <div className={styles.leaderAside}>
                <div className={styles.leaderMedia}>
                  <Portrait member={member} frame={LEADER_FRAME} />
                </div>
                {member.experienceYears && (
                  <p className={styles.exp}>
                    <strong>{member.experienceYears}</strong>
                    <span>Years of experience</span>
                  </p>
                )}
              </div>
              <dl className={styles.facts}>
                {member.credentials?.map((row) => (
                  <div className={styles.fact} key={row.term}>
                    <dt>{row.term}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
              {member.href && (
                <Link className={styles.profileLink} href={member.href}>
                  View profile<span className={styles.srOnly}> of {fullName(member)}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              )}
            </article>
          ))}
        </Reveal>

        <Reveal as="aside" className={styles.atWork} aria-labelledby="miftah-at-work">
          <div className={styles.atWorkMedia}>
            <Image
              src={AT_WORK.src}
              alt={AT_WORK.alt}
              width={AT_WORK.width}
              height={AT_WORK.height}
              sizes="(max-width: 767px) 92vw, 420px"
              className={styles.atWorkImg}
            />
          </div>
          <div className={styles.atWorkBody}>
            <h3 id="miftah-at-work" className={styles.atWorkTitle}>Dr. Miftah at work</h3>
            <p className={styles.atWorkCopy}>
              A Prosthodontist and Implantologist, Dr. Md. Miftah Ur Rahman
              restores and replaces teeth, from crowns and dentures to dental
              implants, and starts every case with a full assessment before a
              plan is put forward.
            </p>
            <Link className={styles.profileLink} href={MIFTAH_PROFILE}>
              See his work and profile <ArrowRight size={16} aria-hidden="true" />
            </Link>

            {/* Second layer (reference Part 14.1): his former home-page bio,
                in its old order, plus recognition and his quote. Native
                <details>, so the text is in the server HTML and anyone can
                open it. Ledger rows home-t1df51668, -t61216309, -t62b46073,
                -tc65aff0a, -t2c0a991e, -tfea37852, -t305f1122, -t294609a7,
                -t7b639691.
                The quote wording is the owner's (30 Oct 2026). */}
            <details className={`home-more ${styles.more}`}>
              <summary>About Dr. Miftah</summary>
              <div className={`home-more-body ${styles.moreBody}`}>
                <p>
                  He practises across both Neodent locations in Hyderabad —
                  Mehdipatnam and Nampally — alongside the practice&apos;s
                  founder, Dr. Mohd. Siraj Ur Rahman, in the same specialist
                  disciplines Neodent has been built around since 1994.
                </p>
                <p>
                  His specialist grounding is in prosthodontics and
                  implantology — the rehabilitation and replacement of teeth,
                  from crowns, bridges and dentures through to the surgical
                  placement of dental implants. Much of that work is
                  reconstructive rather than routine, which is why a
                  consultation with him usually begins with a full assessment
                  before any treatment plan is put forward.
                </p>
                <p>
                  Alongside clinical dentistry he teaches as an Assistant
                  Professor at SB Patil Dental College &amp; Hospital, in the
                  Department of Prosthodontics. That academic involvement is
                  not separate from his practice at Neodent: teaching keeps the
                  clinical reasoning current, and the two have run in parallel
                  throughout his career.
                </p>
                <p>
                  He qualified BDS and MDS, holds FICOI (U.S.A.) certification
                  and is a Gold Medallist, with 15+ years in clinical dentistry.
                  As Assistant Director he carries that experience into how
                  Neodent plans and explains treatment — precision, clear
                  conversations, and care that stays personal even when the
                  work ahead is complex.
                </p>
                <Link className={styles.profileLink} href={MIFTAH_PROFILE}>
                  Full profile of Dr. Md. Miftah Ur Rahman <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </details>
          </div>
          {/* Recognition and quote: part of the "About Dr. Miftah" layer,
              shown only while it is open (CSS, from <details open>), and
              placed under the photo so both columns carry content. Still
              in the server HTML. Ledger rows home-t294609a7, -t7b639691. */}
          <div className={styles.atWorkExtra}>
            <p className={styles.recognition}>
              <span className={styles.recognitionLabel}>Recognition</span>
              University Gold Medalist · Madina Gold Medal (2023), awarded
              by Commissioner A. K. Khan
            </p>
            <blockquote className={styles.quote}>
              <p>&ldquo;Save the natural teeth till the last stage.&rdquo;</p>
            </blockquote>
          </div>
        </Reveal>

        <div className={styles.teamHead}>
          <h3 id="clinical-team-title" className={styles.teamTitle}>Our clinical team</h3>
        </div>
        <Reveal
          as="ul"
          className={styles.team}
          stagger={70}
          aria-labelledby="clinical-team-title"
          tabIndex={0}
        >
          {homepageSpecialists.map((member) => (
            <li className={styles.member} key={member.id}>
              <Portrait member={member} frame={MEMBER_FRAME} />
              <h4 className={styles.memberName}>{fullName(member)}</h4>
              <p className={styles.memberDetail}>
                {member.detailLines.map((line, index) => (
                  <span key={line}>{index > 0 && <br />}{line}</span>
                ))}
              </p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
