import type { ReactNode } from "react";
import Link from "next/link";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
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
} from "./ImplantIllustrations";
import { IllustrationFrame } from "./IllustrationFrame";
import { SectionHeader } from "./SectionHeader";
import styles from "./ImplantsOverview.module.css";

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

function ScopeFrame({ children }: { children: ReactNode }) {
  return (
    <IllustrationFrame ratio="4 / 3" padding="sm">
      {children}
    </IllustrationFrame>
  );
}

/* The sentence "Dental implants can replace a single missing tooth, several
   teeth, or support a full arch of teeth." is split into a lead-in and three
   small cards. `media` is the (future) artwork slot: it renders only when
   artwork is supplied, so the card is complete without it. */
const SCOPE: { title: string; media?: ReactNode }[] = [
  { title: "A single missing tooth", media: <ScopeFrame><ScopeSingle /></ScopeFrame> },
  { title: "Several teeth", media: <ScopeFrame><ScopeBridge /></ScopeFrame> },
  { title: "Support a full arch of teeth", media: <ScopeFrame><ScopeArch /></ScopeFrame> },
];

/* Pattern: ExperienceIntro two-column intro, regrouped. Left: heading, a
   larger lede, the "what implants can replace" cards, the osseointegration
   paragraph as a highlighted card and the "one of several ways" paragraph
   as a closing note. Right: the anatomy diagram, then the dark "three
   parts" card. Below: the matched pair of cards. */
export function ImplantsOverview() {
  return (
    <section className={styles.section} aria-labelledby="di-overview-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <SectionHeader
              titleId="di-overview-title"
              sans="What is a"
              accent="dental implant?"
            />

            <p className={styles.lede}>
              A dental implant replaces the root of a missing tooth.{" "}
              <EditorialHighlight tone="primary">A small post</EditorialHighlight>
              , usually made of titanium or a similar material, is placed in the
              jawbone. Once the bone has healed around it, it supports a crown,
              bridge or denture. Because it stands on its own, the replacement
              does not need to lean on the teeth beside it.
            </p>

            <div className={styles.scope}>
              <p className={styles.scopeLead} id="di-scope-lead">
                Dental implants can replace
              </p>
              <ul className={styles.scopeList} aria-labelledby="di-scope-lead">
                {SCOPE.map(({ title, media }) => (
                  <li className={styles.scopeCard} key={title}>
                    {media ? <div className={styles.scopeMedia}>{media}</div> : null}
                    <span className={styles.scopeTitle}>{title}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.denture}>
                They can also be used to make a loose denture feel firmer.
              </p>
              <p className={styles.consult}>
                Dental implant consultations are available at both of our clinics
                in{" "}
                <Link className={styles.inlineLink} href={BRANCH_PAGE_HREF.nampally}>
                  Nampally
                </Link>{" "}
                and{" "}
                <Link className={styles.inlineLink} href={BRANCH_PAGE_HREF.mehdipatnam}>
                  Mehdipatnam
                </Link>
                , Hyderabad.
              </p>
            </div>

            <div className={styles.process}>
              <p>
                Treatment is planned around how you bite and chew, the health of
                your gums and the amount of bone you have. It happens in stages,
                because the bone needs time to bond with the post. This bonding is
                called{" "}
                <EditorialHighlight tone="secondary">osseointegration</EditorialHighlight>
                , and it is why implant treatment is measured in months rather than
                a single visit.
              </p>
            </div>

            <p className={styles.closingNote}>
              An implant is one of{" "}
              <EditorialHighlight tone="quiet">
                several ways to replace missing teeth
              </EditorialHighlight>
              . Bridges and dentures remain suitable for many people, and your
              dentist will explain the choices after an examination. If your gums
              need attention first,{" "}
              <Link className={styles.inlineLink} href={SCALING_HREF}>
                treatment for gum disease
              </Link>{" "}
              may come before an implant. When many teeth are affected, implants
              may form one part of a planned, phased approach known as{" "}
              <Link className={styles.inlineLink} href={FULL_MOUTH_REHAB_HREF}>
                full mouth rehabilitation
              </Link>
              .
            </p>
          </div>

          <div className={styles.side}>
            <IllustrationFrame
              ratio="4 / 3"
              padding="md"
              caption="The parts of a dental implant: the implant post in the jawbone, the abutment, and the crown."
              note={ILLUSTRATION_NOTE}
            >
              <ImplantAnatomy />
            </IllustrationFrame>

            <article className={styles.parts} aria-labelledby="di-parts-title">
              <h3 id="di-parts-title" className={styles.partsTitle}>
                The three parts
              </h3>
              <ul className={styles.partList}>
                {PARTS.map(({ name, text, Icon }) => (
                  <li className={styles.part} key={name}>
                    <IllustrationFrame
                      ratio="1 / 1"
                      padding="sm"
                      className={styles.partTile}
                    >
                      <Icon />
                    </IllustrationFrame>
                    <span className={styles.partBody}>
                      <span className={styles.partName}>{name}</span>
                      <span className={styles.partText}>{text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        <div className={styles.cards}>
          <article className={styles.card} aria-labelledby="di-when-title">
            <h3 id="di-when-title" className={styles.cardTitle}>
              Who might be offered a dental implant?
            </h3>
            <ul className={`${styles.dashList} ${styles.hasFoot}`}>
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
                The amount and quality of your jawbone, with X-rays and, in some
                cases, 3D imaging.
              </li>
              <li>
                Your medical history, including diabetes, smoking and grinding of
                teeth.
              </li>
              <li>
                Whether you are ready to commit to cleaning and check-ups over the
                long term.
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

