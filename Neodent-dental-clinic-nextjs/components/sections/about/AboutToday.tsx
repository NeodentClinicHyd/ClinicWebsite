"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  mehdipatnamInteriorImage,
  mehdipatnamStructuredAddress,
  nampallyInteriorImage,
  nampallyPhone,
  nampallyStructuredAddress,
  nampallyTelPhone,
  phone,
  telPhone,
} from "@/lib/site-data";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { useReveal } from "./useReveal";
import shared from "./shared.module.css";
import styles from "./AboutToday.module.css";

/* ------------------------------------------------------------------
   About -- "Neodent today."

   Pattern: SpacesDesignedAroundCare's branch panel (copy and contact
   facts on the left, a large framed photograph with a smaller one
   beside it on the right) on the ivory ground. Phone numbers come from
   lib/site-data.ts; the inline links in the copy are unchanged.
   ------------------------------------------------------------------ */

const clinics = [
  {
    name: "Mehdipatnam",
    href: "/clinic/mehdipatnam",
    locality: `Mehdipatnam, ${mehdipatnamStructuredAddress.addressLocality}`,
    phone,
    tel: telPhone,
  },
  {
    name: "Nampally",
    href: "/clinic/nampally",
    locality: `Nampally, ${nampallyStructuredAddress.addressLocality}`,
    phone: nampallyPhone,
    tel: nampallyTelPhone,
  },
];

export function AboutToday() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.sand}`}
      id="today"
      aria-labelledby="today-title"
    >
      <div className={shared.container}>
        <div className={styles.layout}>
          <div className={styles.copy} data-reveal>
            <h2 id="today-title" className={shared.title}>
              Neodent <span>today.</span>
            </h2>
            <div className={styles.prose}>
              <p className={shared.lede}>
                More than three decades after its founding, Neodent Dental
                Hospital continues to practise across{" "}
                <EditorialHighlight tone="primary">
                  two Hyderabad locations
                </EditorialHighlight>{" "}
                — Mehdipatnam, where the practice began, and Nampally. Both
                locations are led by the same clinical philosophy Dr. Mohd.
                Siraj Ur Rahman established in 1994.
              </p>
              <p className={shared.lede}>
                Day-to-day care is carried by{" "}
                <EditorialHighlight tone="secondary">
                  the wider Neodent clinical team
                </EditorialHighlight>
                , working alongside Dr. Mohd. Siraj Ur Rahman and Dr. Md.
                Miftah Ur Rahman, with{" "}
                <EditorialHighlight tone="quiet">
                  specialist-led, patient-focused care
                </EditorialHighlight>{" "}
                carried into every consultation.
              </p>
              <p className={shared.lede}>
                To learn more about what Neodent treats, visit{" "}
                <Link className={shared.inlineLink} href="/treatments">
                  our clinical expertise
                </Link>
                , or see both locations in detail on{" "}
                <Link className={shared.inlineLink} href="/clinic">
                  our clinics page
                </Link>
                .
              </p>
            </div>

            <ul className={styles.clinics}>
              {clinics.map((clinic) => (
                <li key={clinic.name} className={styles.clinic}>
                  <div className={shared.card}>
                    <div className={styles.clinicHead}>
                      <div>
                        <h3 className={shared.cardName}>
                          <Link href={clinic.href} className={styles.clinicLink}>
                            {clinic.name}
                          </Link>
                        </h3>
                      </div>
                      <ArrowRight
                        className={styles.clinicArrow}
                        size={16}
                        aria-hidden="true"
                      />
                    </div>
                    <dl className={shared.facts}>
                      <div className={shared.fact}>
                        <dt>Locality</dt>
                        <dd>{clinic.locality}</dd>
                      </div>
                      <div className={shared.fact}>
                        <dt>Phone</dt>
                        <dd className={shared.strong}>
                          <a
                            href={clinic.tel}
                            className={styles.phone}
                            aria-label={`Call Neodent ${clinic.name}`}
                          >
                            {clinic.phone}
                          </a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.media} data-reveal>
            <figure className={`${shared.figure} ${styles.primary}`}>
              <div className={`${shared.photo} ${styles.primaryPhoto}`}>
                <Image
                  src={mehdipatnamInteriorImage}
                  alt="Neodent Dental Hospital, Mehdipatnam — the patient waiting lounge"
                  fill
                  sizes="(min-width: 1024px) 440px, (min-width: 768px) 56vw, 62vw"
                />
              </div>
              <figcaption className={shared.caption}>
                <span className={shared.source}>Mehdipatnam</span>
                <em className={shared.medium}>Waiting lounge</em>
              </figcaption>
            </figure>
            <figure className={`${shared.figure} ${styles.secondary}`}>
              <div className={`${shared.photo} ${styles.secondaryPhoto}`}>
                <Image
                  src={nampallyInteriorImage}
                  alt="Neodent Dental Hospital, Nampally — the reception and consultation wing"
                  fill
                  sizes="(min-width: 1024px) 250px, (min-width: 768px) 32vw, 34vw"
                />
              </div>
              <figcaption className={shared.caption}>
                <span className={shared.source}>Nampally</span>
                <em className={shared.medium}>Reception</em>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
