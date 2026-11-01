"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
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
import { Reveal } from "@/components/motion/Reveal";
import { AboutBackdrop } from "./AboutBackdrop";
import { SwipeRow } from "./SwipeRow";
import shared from "./AboutShared.module.css";
import styles from "./AboutToday.module.css";

/* ------------------------------------------------------------------
   About -- S11 "Neodent today." (dark)

   Heading, the three paragraphs with both inline links, the two clinic
   cards (name link to the clinic page, locality, phone `tel:` link) and
   the two photos with captions and alts are moved unchanged from the
   previous AboutToday. Phones and addresses still come from
   lib/site-data.ts. The band is now dark (it was beige); the cards are
   dark glass; highlight marks are removed from the dark body text (same
   words, plain). Below 768px the photos are one swipe row. A4 (opening
   hours) is unticked, so no hours are added.
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

const photos = [
  {
    key: "mehdipatnam",
    src: mehdipatnamInteriorImage,
    alt: "Neodent Dental Hospital, Mehdipatnam — the patient waiting lounge",
    caption: "Mehdipatnam",
    source: "Waiting lounge",
    sizes: "(min-width: 1024px) 340px, (min-width: 768px) 40vw, 86vw",
    weight: 62,
  },
  {
    key: "nampally",
    src: nampallyInteriorImage,
    alt: "Neodent Dental Hospital, Nampally — the reception and consultation wing",
    caption: "Nampally",
    source: "Reception",
    sizes: "(min-width: 1024px) 220px, (min-width: 768px) 28vw, 86vw",
    weight: 38,
  },
];

export function AboutToday() {
  return (
    <section
      className={`${shared.section} ${shared.dark} ${styles.today}`}
      id="today"
      aria-labelledby="today-title"
    >
      <AboutBackdrop />
      <div className={shared.container}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <Reveal as="div">
              <h2 id="today-title" className={shared.title}>
                Neodent today.
              </h2>
            </Reveal>
            <Reveal as="div" className={styles.prose} stagger={80}>
              <p className={shared.lede}>
                More than three decades after its founding, Neodent Dental
                Hospital continues to practise across two Hyderabad locations —
                Mehdipatnam, where the practice began, and Nampally. Both
                locations are led by the same clinical philosophy Dr. Mohd.
                Siraj Ur Rahman established in 1994.
              </p>
              <p className={shared.lede}>
                Day-to-day care is carried by the wider Neodent clinical team,
                working alongside Dr. Mohd. Siraj Ur Rahman and Dr. Md. Miftah
                Ur Rahman, with specialist-led, patient-focused care carried
                into every consultation.
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
            </Reveal>

            <Reveal as="ul" stagger={100} className={styles.clinics}>
              {clinics.map((clinic) => (
                <li key={clinic.name} className={styles.clinic}>
                  <div className={`${shared.card} ${styles.clinicCard}`}>
                    <div className={styles.clinicHead}>
                      <h3 className={shared.cardName}>
                        <Link href={clinic.href} className={styles.clinicLink}>
                          {clinic.name}
                        </Link>
                      </h3>
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
            </Reveal>
          </div>

          <div className={styles.media}>
            <SwipeRow
              label="Clinic photographs"
              className={styles.photoRow}
              itemClassName={styles.photoItem}
              items={photos.map((photo, index) => ({
                key: photo.key,
                style: { "--w": photo.weight } as CSSProperties,
                node: (
                  <figure className={shared.figure}>
                    <Reveal variant="mask" delay={index * 100}>
                      <div className={`${styles.photo} ${index === 0 ? styles.lead : styles.side}`}>
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes={photo.sizes}
                          className={styles.image}
                        />
                      </div>
                    </Reveal>
                    <figcaption className={shared.caption}>
                      <span className={shared.source}>{photo.caption}</span>
                      <em className={shared.medium}>{photo.source}</em>
                    </figcaption>
                  </figure>
                ),
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
