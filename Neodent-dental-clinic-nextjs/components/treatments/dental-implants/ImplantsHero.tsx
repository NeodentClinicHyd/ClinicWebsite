import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AppButton } from "@/components/ui/AppButton";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { BRANCH_PAGE_HREF, BREADCRUMBS } from "@/lib/dental-implants-page";
import { ctaTelPhone, mehdipatnamTreatmentRoomOneImage } from "@/lib/site-data";
import styles from "./ImplantsHero.module.css";

/* Pattern: home Hero (charcoal ground, sans headline with one red serif
   accent phrase, `.hero-lead` lede, primary + ghost buttons) with the
   Slide 01 two-column split. The photograph is the non-patient Mehdipatnam
   treatment room 1 (4032x3024), bled to the right edge of the viewport.
   It is the only eager / high-priority image on the page. */
export function ImplantsHero() {
  return (
    <section className={styles.hero} aria-labelledby="di-hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Breadcrumbs items={BREADCRUMBS} tone="dark" />
          <h1 id="di-hero-title" className={styles.title}>
            <span className={styles.sans}>Dental implants,</span>{" "}
            <span className={styles.accent}>planned in stages.</span>
          </h1>
          <p className={`${styles.lede} section-lede section-lede--on-dark`}>
            A dental implant is a small titanium post that supports a
            replacement tooth or denture. It is a{" "}
            <EditorialHighlight tone="primary" onDark>
              staged treatment
            </EditorialHighlight>{" "}
            that depends on{" "}
            <EditorialHighlight tone="secondary" onDark>
              healthy gums and enough bone
            </EditorialHighlight>
            , and it needs long-term cleaning and check-ups. Your dentist can tell you whether it suits you after an
            examination.
          </p>
          <div className={styles.actions}>
            <AppButton href="/contact" variant="primary">
              Send an enquiry
            </AppButton>
            <AppButton href={ctaTelPhone} variant="ghost">
              Call us
            </AppButton>
          </div>
          <p className={styles.consult}>
            <span>Consultations at both clinics:</span>
            <Link className={styles.consultLink} href={BRANCH_PAGE_HREF.nampally}>
              Nampally
            </Link>
            <Link className={styles.consultLink} href={BRANCH_PAGE_HREF.mehdipatnam}>
              Mehdipatnam
            </Link>
          </p>
        </div>

        <figure className={styles.visual}>
          <div className={styles.frame}>
            <Image
              className={styles.photo}
              src={mehdipatnamTreatmentRoomOneImage}
              alt="Treatment room with two dental chairs and wooden cabinets, Neodent Dental Hospital, Mehdipatnam"
              fill
              sizes="(max-width: 900px) 100vw, 56vw"
              priority
            />
          </div>
          <figcaption className={styles.meta}>
            <b>Treatment room</b>
            <span>Mehdipatnam</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
