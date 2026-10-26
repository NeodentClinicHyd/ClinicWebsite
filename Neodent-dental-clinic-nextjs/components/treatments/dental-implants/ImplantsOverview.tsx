import Link from "next/link";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import {
  BRANCH_PAGE_HREF,
  FULL_MOUTH_REHAB_HREF,
  SCALING_HREF,
} from "@/lib/dental-implants-page";
import {
  ImplantAnatomy,
  IllustrationPlate,
  PartIconAbutment,
  PartIconCrown,
  PartIconImplant,
} from "./ImplantIllustrations";
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

/* Pattern: ExperienceIntro. Two-column intro (heading + four paragraphs on
   the left; the anatomy drawing on a light plate with the dark "three
   parts" card beneath it on the right), then two cards that differ in
   surface, radius and bullet. */
export function ImplantsOverview() {
  return (
    <section className={styles.section} aria-labelledby="di-overview-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <h2 id="di-overview-title" className={styles.title}>
              <span>What is a</span>
              <span className={styles.accent}>dental implant?</span>
            </h2>
            <p className={`${styles.lede} section-lede`}>
              A dental implant replaces the root of a missing tooth.{" "}
              <EditorialHighlight tone="primary">A small post</EditorialHighlight>
              , usually made of titanium or a similar material, is placed in the
              jawbone. Once the bone has healed around it, it supports a crown,
              bridge or denture. Because it stands on its own, the replacement
              does not need to lean on the teeth beside it.
            </p>
            <p className={`${styles.lede} section-lede`}>
              Dental implants can replace a single missing tooth, several teeth,
              or support a full arch of teeth. They can also be used to make a
              loose denture feel firmer. Dental implant consultations are
              available at both of our clinics in{" "}
              <Link className={styles.inlineLink} href={BRANCH_PAGE_HREF.nampally}>
                Nampally
              </Link>{" "}
              and{" "}
              <Link className={styles.inlineLink} href={BRANCH_PAGE_HREF.mehdipatnam}>
                Mehdipatnam
              </Link>
              , Hyderabad.
            </p>
            <p className={`${styles.lede} section-lede`}>
              Treatment is planned around how you bite and chew, the health of
              your gums and the amount of bone you have. It happens in stages,
              because the bone needs time to bond with the post. This bonding is
              called{" "}
              <EditorialHighlight tone="secondary">osseointegration</EditorialHighlight>
              , and it is why implant treatment is measured in months rather than
              a single visit.
            </p>
            <p className={`${styles.lede} section-lede`}>
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
            <figure className={styles.visual}>
              <div className={styles.frame}>
                <IllustrationPlate className={styles.plate}>
                  <ImplantAnatomy />
                </IllustrationPlate>
              </div>
              <figcaption className={styles.figcaption}>
                The parts of a dental implant: the implant post in the jawbone,
                the abutment, and the crown.
              </figcaption>
            </figure>

            <article className={styles.parts} aria-labelledby="di-parts-title">
              <h3 id="di-parts-title" className={styles.partsTitle}>
                The three parts
              </h3>
              <ul className={styles.partList}>
                {PARTS.map(({ name, text, Icon }) => (
                  <li className={styles.part} key={name}>
                    <span className={styles.iconPlate} aria-hidden="true">
                      <Icon />
                    </span>
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
          <article className={`${styles.card} ${styles.when}`} aria-labelledby="di-when-title">
            <h3 id="di-when-title" className={styles.cardTitle}>
              Who might be offered a dental implant?
            </h3>
            <ul className={styles.dashList}>
              <li>A tooth is missing or cannot be saved.</li>
              <li>A bridge would mean reducing healthy teeth either side.</li>
              <li>A denture feels loose or uncomfortable.</li>
            </ul>
            <p className={styles.closing}>
              Bridges and dentures remain suitable choices for many people.
            </p>
          </article>

          <article className={`${styles.card} ${styles.visit}`} aria-labelledby="di-visit-title">
            <h3 id="di-visit-title" className={styles.cardTitle}>
              What happens at the first visit?
            </h3>
            <ul className={styles.dotList}>
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
