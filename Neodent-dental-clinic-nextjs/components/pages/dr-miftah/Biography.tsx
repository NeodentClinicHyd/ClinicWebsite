import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import styles from "./Biography.module.css";

/* ------------------------------------------------------------------
   02 Biography (pattern P3 lede and depth, with a P5 split).
   Light band. Paragraphs 1 and 2 are visible; 3 and 4 sit in one native
   <details> with the full text in the server HTML. Two highlighted
   phrases only. The operatory photograph carries the treatment-room
   inset on its lower right corner; under 1024 px the two photographs
   become a two-card swipe row (same markup, CSS only).
   ------------------------------------------------------------------ */

const OPERATORY = {
  src: "/assets/dr-miftah/Dr. Md. Miftah Ur Rahman during treatment- Neodent Dental Hospital.jpg",
  width: 704,
  height: 1372,
  alt: "Dr. Md. Miftah Ur Rahman performing a dental treatment procedure at Neodent Dental Hospital, Hyderabad",
};

const TREATMENT_ROOM = {
  src: "/assets/neodent-clinic-mehdipatnam/Neodent dental hospital mehdipatnam treatment room 1.jpeg",
  width: 4032,
  height: 3024,
  alt: "Treatment room interior at Neodent Dental Hospital Mehdipatnam, where Dr. Md. Miftah Ur Rahman practises",
};

export function Biography() {
  return (
    <section className={styles.section} aria-labelledby="miftah-bio-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Reveal as="p" className={styles.eyebrow}>
              02 / BIOGRAPHY
            </Reveal>
            <Reveal as="h2" id="miftah-bio-title" className={styles.title} delay={80}>
              A steady hand. A considered approach.
            </Reveal>
            <Reveal className={styles.body} stagger={80}>
              <p className={styles.lede}>
                Dr. Md. Miftah Ur Rahman is a Prosthodontist and Implantologist
                at Neodent Dental Hospital, practising across both the
                Mehdipatnam and Nampally clinics. His work centres on restoring
                what can be saved and rebuilding what cannot &mdash; implants,
                full-mouth rehabilitation and the prosthodontic work that
                follows.
              </p>
              <p>
                Prosthodontics is the branch of dentistry concerned with
                replacing and restoring teeth. In practice, that means the cases
                other clinics often describe as complicated: a tooth that has
                been recommended for extraction, a bite that no longer meets
                correctly, or a full arch that needs rebuilding rather than
                patching. Much of his day is spent on{" "}
                <EditorialHighlight tone="quiet">
                  planning before treatment begins
                </EditorialHighlight>
                .
              </p>
              <details className={styles.more}>
                <summary className={styles.summary}>
                  More about his practice and training
                </summary>
                <div className={styles.moreBody}>
                  <p>
                    Alongside clinical practice, he holds an academic post as
                    Assistant Professor in the Department of Prosthodontics at
                    SB Patil Dental College &amp; Hospital, where he teaches and
                    conducts seminars for dental students, and he has published
                    clinical research on implant and prosthetic materials.
                  </p>
                  <p>
                    He holds a BDS and an MDS in Prosthodontics &amp;
                    Implantology, along with a FICOI (U.S.A.) fellowship, and
                    brings{" "}
                    <EditorialHighlight tone="quiet">
                      more than fifteen years
                    </EditorialHighlight>{" "}
                    of clinical practice to Neodent. Patients from across
                    Hyderabad visit the Mehdipatnam and Nampally clinics with
                    missing teeth, failing crowns and bridges, worn or collapsed
                    bites, and teeth other clinics have recommended for
                    extraction.
                  </p>
                </div>
              </details>
            </Reveal>
            <Link href="/treatments" className={styles.cta}>
              See the treatments he performs{" "}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <Reveal as="ul" className={styles.media} stagger={150}>
            <li className={styles.plate}>
              <figure className={styles.figure}>
                <div className={styles.frame}>
                  <Image
                    src={OPERATORY.src}
                    alt={OPERATORY.alt}
                    fill
                    sizes="(max-width: 1023px) 80vw, 420px"
                    className={styles.image}
                    style={{ objectPosition: "50% 30%" }}
                  />
                  <span className={styles.tag}>02 / In the operatory</span>
                </div>
                <figcaption className={styles.caption}>
                  <b>Dr. Md. Miftah Ur Rahman</b>
                  <span>
                    In the operatory &middot; Neodent Dental Hospital, Hyderabad
                  </span>
                </figcaption>
              </figure>
            </li>
            <li className={styles.inset}>
              <figure className={styles.figure}>
                <div className={styles.insetFrame}>
                  <Image
                    src={TREATMENT_ROOM.src}
                    alt={TREATMENT_ROOM.alt}
                    fill
                    sizes="(max-width: 1023px) 80vw, 240px"
                    className={styles.image}
                  />
                </div>
                <figcaption className={styles.caption}>
                  <span>Treatment room &middot; Mehdipatnam</span>
                </figcaption>
              </figure>
            </li>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
