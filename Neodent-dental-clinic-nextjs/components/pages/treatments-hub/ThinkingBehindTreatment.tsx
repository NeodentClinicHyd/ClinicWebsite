import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { DOCTORS } from "@/lib/treatments-hub";
import { Backdrop } from "./Backdrop";
import { ResponsiveDetails } from "./ResponsiveDetails";
import shared from "./TreatmentsHub.module.css";
import styles from "./ThinkingBehindTreatment.module.css";

/* S4. The thinking behind treatment (patterns P10 and P3) on the dark
   band. Two equal-height doctor cards (dark glass; portrait panel,
   definition list, profile link on Dr. Miftah's card), then the three
   paragraphs in two balanced columns. Phones: the cards become a swipe
   row (next card peeks) and paragraphs 2 and 3 move into a disclosure.
   No marker highlights on dark text; key phrases are semibold ivory.
   Doctor names, roles, rows and alt text come from DOCTORS unchanged. */

const focus: Record<string, { position: string; zoom?: number; origin?: string }> = {
  siraj: { position: "50% 6%" },
  miftah: { position: "100% 6%", zoom: 1.5, origin: "100% 12%" },
};

export function ThinkingBehindTreatment() {
  return (
    <section
      className={`${shared.dark} ${styles.section}`}
      aria-labelledby="thinking-title"
    >
      <Backdrop />
      <div className={shared.container}>
        <Reveal as="h2" id="thinking-title" className={`${shared.title} ${styles.title}`}>
          The thinking behind treatment.
        </Reveal>

        <Reveal
          as="ul"
          stagger={100}
          className={styles.docs}
          tabIndex={0}
          aria-label="Neodent doctors"
        >
          {DOCTORS.map((doctor) => {
            const f = focus[doctor.id] ?? { position: "50% 10%" };
            return (
              <li key={doctor.id} className={styles.doc}>
                <div className={styles.portrait}>
                  <Image
                    src={doctor.image}
                    alt={doctor.alt}
                    fill
                    sizes="(max-width: 767px) 80vw, 560px"
                    style={{
                      objectPosition: f.position,
                      ...(f.zoom
                        ? { transform: `scale(${f.zoom})`, transformOrigin: f.origin }
                        : {}),
                    }}
                  />
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{doctor.name}</h3>
                  <p className={styles.role}>{doctor.role}</p>
                  <dl className={styles.facts}>
                    {doctor.rows.map((row) => (
                      <div key={row.label} className={styles.fact}>
                        <dt>{row.label}</dt>
                        <dd>{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {doctor.href && (
                    <Link className={`${shared.action} ${styles.link}`} href={doctor.href}>
                      <span>View Dr. Md. Miftah Ur Rahman&rsquo;s profile</span>
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </Reveal>

        <Reveal stagger={90} className={styles.body}>
          <p className={shared.lede}>
            Treatment at Neodent begins with{" "}
            <span className={shared.strong}>understanding the patient&apos;s concern</span>. Not
            every dental condition requires the same response — some patients need care
            focused on a single affected tooth, while others may benefit from a more
            comprehensive treatment plan addressing multiple areas of the mouth.
          </p>
          <ResponsiveDetails summary="More on treatment planning">
            <p className={shared.lede}>
              Clinical assessment considers{" "}
              <span className={shared.strong}>oral health, function and aesthetic goals together</span>.
              Where appropriate, the team discusses suitable treatment options, explains what
              each approach involves, and helps patients understand the clinical
              considerations relevant to their condition.
            </p>
            <p className={shared.lede}>
              Treatment planning at Neodent is not a fixed sequence — it is shaped by{" "}
              <span className={shared.strong}>each patient&apos;s specific condition</span>. The
              clinical team outlines available options, explains what each approach involves,
              and ensures that every decision is made with the patient&apos;s informed
              understanding.
            </p>
          </ResponsiveDetails>
        </Reveal>
      </div>
    </section>
  );
}
