import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import {
  BRANCH_PAGE_HREF,
  FULL_MOUTH_REHAB_HREF,
  SCALING_HREF,
} from "@/lib/dental-implants-page";
import {
  ImplantAnatomy,
  PartIconAbutment,
  PartIconCrown,
  PartIconImplant,
  ILLUSTRATION_NOTE,
  ScopeArch,
  ScopeBridge,
  ScopeSingle,
} from "@/components/treatments/dental-implants/ImplantIllustrations";
import { Emphasis } from "./Emphasis";
import { IllustrationFrame } from "./IllustrationFrame";
import { SectionHeader } from "./SectionHeader";
import styles from "./WhatIsAnImplant.module.css";

const PARTS = [
  {
    name: "The implant",
    text: "The post that sits in the bone like a root.",
    Icon: PartIconImplant,
  },
  {
    name: "The abutment",
    text: "A connector between the post and the visible tooth.",
    Icon: PartIconAbutment,
  },
  {
    name: "The restoration",
    text: "A crown, or a bridge or denture when several teeth are missing.",
    Icon: PartIconCrown,
  },
];

const SCOPE: { title: string; art: ReactNode }[] = [
  { title: "A single missing tooth", art: <ScopeSingle /> },
  { title: "Several teeth", art: <ScopeBridge /> },
  { title: "Support a full arch of teeth", art: <ScopeArch /> },
];

/* "What is a dental implant?" (plan 4.3). Beige ground (the section above,
   Results, is ivory). Desktop: left column = heading, lede, "can replace"
   cards, two short paragraphs; right column = anatomy diagram (capped) and
   the dark "three parts" card. Under the columns: the osseointegration card
   beside the side-rule note, then the two matched cards. Below 1024 px the
   columns dissolve into one reading order: heading, lede, diagram,
   "can replace" rows, three parts, notes, cards. The heading is plain (the
   red accent is kept for the header, Results, Compare and FAQ). */
export function WhatIsAnImplant() {
  return (
    <section className={styles.section} aria-labelledby="di-overview-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Reveal className={styles.head}>
              <SectionHeader
                titleId="di-overview-title"
                sans="What is a"
                accent="dental implant?"
                plain
              />
            </Reveal>

            <Reveal className={styles.lede} delay={80}>
              <p>
                A dental implant replaces the root of a missing tooth.{" "}
                <Emphasis tone="primary">A small post</Emphasis>, usually made of titanium or a
                similar material, is placed in the jawbone. Once the bone has healed around it,
                it supports a crown, bridge or denture. Because it stands on its own, the
                replacement does not need to lean on the teeth beside it.
              </p>
            </Reveal>

            <div className={styles.scope}>
              <Reveal as="p" className={styles.scopeLead} id="di-scope-lead">
                Dental implants can replace
              </Reveal>
              <Reveal as="ul" className={styles.scopeList} stagger={90} aria-labelledby="di-scope-lead">
                {SCOPE.map(({ title, art }) => (
                  <li className={styles.scopeCard} key={title}>
                    <IllustrationFrame ratio="4 / 3" padding="sm" className={styles.scopeMedia}>
                      {art}
                    </IllustrationFrame>
                    <span className={styles.scopeTitle}>{title}</span>
                  </li>
                ))}
              </Reveal>
              <Reveal className={styles.scopeText} delay={60}>
                <p>They can also be used to make a loose denture feel firmer.</p>
                <p>
                  Dental implant consultations are available at both of our clinics in{" "}
                  <Link className={styles.inlineLink} href={BRANCH_PAGE_HREF.nampally}>
                    Nampally
                  </Link>{" "}
                  and{" "}
                  <Link className={styles.inlineLink} href={BRANCH_PAGE_HREF.mehdipatnam}>
                    Mehdipatnam
                  </Link>
                  , Hyderabad.
                </p>
              </Reveal>
            </div>
          </div>

          <div className={styles.side}>
            <Reveal variant="mask" className={styles.diagram}>
              <div className={styles.diagramCard}>
                <div className={styles.diagramBox}>
                  <IllustrationFrame
                    ratio="4 / 3"
                    padding="md"
                    caption="The parts of a dental implant: the implant post in the jawbone, the abutment, and the crown."
                    note={ILLUSTRATION_NOTE}
                  >
                    <ImplantAnatomy />
                  </IllustrationFrame>
                </div>
              </div>
            </Reveal>

            <Reveal className={styles.partsWrap} delay={80}>
              <article className={styles.parts} aria-labelledby="di-parts-title">
                <h3 id="di-parts-title" className={styles.partsTitle}>
                  The three parts
                </h3>
                <Reveal as="ul" className={styles.partList} stagger={90}>
                  {PARTS.map(({ name, text, Icon }) => (
                    <li className={styles.part} key={name}>
                      <IllustrationFrame ratio="1 / 1" padding="sm" className={styles.partTile}>
                        <Icon />
                      </IllustrationFrame>
                      <span className={styles.partBody}>
                        <span className={styles.partName}>{name}</span>
                        <span className={styles.partText}>{text}</span>
                      </span>
                    </li>
                  ))}
                </Reveal>
              </article>
            </Reveal>
          </div>
        </div>

        <div className={styles.notes}>
          <Reveal className={styles.process}>
            <p>
              Treatment is planned around how you bite and chew, the health of your gums and the
              amount of bone you have. It happens in stages, because the bone needs time to bond
              with the post. This bonding is called{" "}
              <Emphasis tone="secondary">osseointegration</Emphasis>, and it is why implant
              treatment is measured in months rather than a single visit.
            </p>
          </Reveal>
          <Reveal className={styles.closingNote} delay={90}>
            <p>
              An implant is one of{" "}
              <Emphasis tone="quiet">several ways to replace missing teeth</Emphasis>. Bridges and
              dentures remain suitable for many people, and your dentist will explain the choices
              after an examination. If your gums need attention first,{" "}
              <Link className={styles.inlineLink} href={SCALING_HREF}>
                treatment for gum disease
              </Link>{" "}
              may come before an implant. When many teeth are affected, implants may form one part
              of a planned, phased approach known as{" "}
              <Link className={styles.inlineLink} href={FULL_MOUTH_REHAB_HREF}>
                full mouth rehabilitation
              </Link>
              .
            </p>
          </Reveal>
        </div>

        <Reveal className={styles.cards} stagger={110}>
          <article className={styles.card} aria-labelledby="di-when-title">
            <h3 id="di-when-title" className={styles.cardTitle}>
              Who might be offered a dental implant?
            </h3>
            <ul className={styles.dashList}>
              <li>A tooth is missing or cannot be saved.</li>
              <li>A bridge would mean reducing healthy teeth either side.</li>
              <li>A denture feels loose or uncomfortable.</li>
            </ul>
            <p className={styles.cardFoot}>
              Bridges and dentures remain suitable choices for many people.
            </p>
          </article>

          <article className={styles.card} aria-labelledby="di-visit-title">
            <h3 id="di-visit-title" className={styles.cardTitle}>
              What happens at the first visit?
            </h3>
            <ul className={styles.dashList}>
              <li>Your teeth and gums.</li>
              <li>
                The amount and quality of your jawbone, with X-rays and, in some cases, 3D
                imaging.
              </li>
              <li>
                Your medical history, including diabetes, smoking and grinding of teeth.
              </li>
              <li>
                Whether you are ready to commit to cleaning and check-ups over the long term.
              </li>
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
