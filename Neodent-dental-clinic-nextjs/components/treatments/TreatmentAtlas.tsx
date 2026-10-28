"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { TreatmentAct } from "./TreatmentAct";
import { featuredTreatment, treatmentAtlas, additionalServices } from "@/lib/treatment-data";
import styles from "./TreatmentAtlas.module.css";

/**
 * Section 02 — Treatment Atlas
 * 
 * Editorial treatment atlas matching About page design language.
 * Featured treatment (Full Mouth Rehabilitation) + six supporting treatments
 * + Additional Services appendix.
 */

// Concise patient-facing summaries grounded in the research pack.
const enrichedFeaturedTreatment = {
  ...featuredTreatment,
  description: (
    <p>
      Full mouth rehabilitation is a step-by-step plan for restoring oral
      health, function and appearance when many teeth are affected. Depending
      on the assessment, it may combine restorative, implant, gum or bite-related
      care. The dentist explains what the plan includes, the order of treatment
      and how follow-up will work; there is no single plan that suits everyone.
    </p>
  ),
};

const enrichedTreatmentDetails = [
  {
    ...treatmentAtlas.find((item) => item.id === "dental-implants")!,
    description: (
      <p>
        A dental implant is a small post placed in the jaw to support a
        replacement crown, bridge or denture. It is a staged treatment: an
        assessment helps the dentist consider your oral health and available
        bone, followed by placement, healing and the restoration. The plan and
        timing vary from person to person, and implants need ongoing cleaning
        and check-ups.
      </p>
    ),
  },
  {
    ...treatmentAtlas.find((item) => item.id === "braces-orthodontics")!,
    description: (
      <p>
        Orthodontic treatment gradually moves teeth, usually with braces, and
        is followed by a retention phase to help keep teeth in their new
        positions. An orthodontic assessment considers your teeth, bite and
        goals. Treatment length varies, and careful daily cleaning and keeping
        adjustment appointments are important while treatment is under way.
      </p>
    ),
  },
  {
    ...treatmentAtlas.find((item) => item.id === "root-canal-treatment")!,
    description: (
      <p>
        Root canal treatment addresses inflammation or infection in the soft
        tissue at the centre of a tooth. The dentist cleans and seals the
        canals, then restores the tooth; a filling, onlay or crown may be
        needed. An examination and X-rays help determine whether the tooth can
        be restored and whether root canal treatment is appropriate.
      </p>
    ),
  },
  {
    ...treatmentAtlas.find((item) => item.id === "smile-design")!,
    description: (
      <p>
        Smile design is a planning approach for people who want to change the
        appearance of their teeth. Depending on the concern, options may include
        whitening, bonding, veneers or straightening. The dentist discusses
        what you would like to change, examines your teeth and explains which
        options are suitable and what each involves.
      </p>
    ),
  },
  {
    ...treatmentAtlas.find((item) => item.id === "composite-build-up")!,
    description: (
      <p>
        A composite build-up rebuilds part of a damaged tooth with tooth-coloured
        resin bonded directly to it. A dentist may discuss it for a chip, worn
        area or decay, after checking how much healthy tooth remains and where
        the damage is. A filling, inlay, onlay or crown may be more suitable in
        some cases.
      </p>
    ),
  },
  {
    ...treatmentAtlas.find((item) => item.id === "scaling-polishing")!,
    description: (
      <p>
        Scaling &amp; Polishing is a routine professional clean that removes plaque
        and hardened tartar from the teeth, then polishes their surfaces. It is
        different from deeper cleaning below the gumline, which may be considered
        for gum disease. A dentist or hygienist can check your gums and advise
        whether a routine clean is enough and how often you need one.
      </p>
    ),
  },
];

const enrichedTreatmentAtlas = treatmentAtlas.map(
  (treatment) => enrichedTreatmentDetails.find((item) => item.id === treatment.id)!,
);

export function TreatmentAtlas() {
  const [visible, setVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [featuredVisible, setFeaturedVisible] = useState(false);
  const [additionalVisible, setAdditionalVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLElement>(null);
  const additionalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const featured = featuredRef.current;
    if (!featured) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturedVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(featured);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const additional = additionalRef.current;
    if (!additional) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAdditionalVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(additional);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      id="treatment-atlas"
      aria-labelledby="treatment-atlas-title"
    >
      {/* Background geometry */}
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.numeral}>02</span>
        <span className={styles.verticalRail} />
        <span className={styles.registrationDot} />
      </div>

      <div className={styles.container}>
        {/* ---- Opening Editorial ----------------------------------------- */}
        <header
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.headerVisible : ""}`}
        >
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            02 / Dental Treatments
          </div>
          <h2 id="treatment-atlas-title" className={styles.title}>
            Featured dental <span>treatments.</span>
          </h2>
          <p className={styles.lede}>
            Neodent approaches different dental concerns through{" "}
            <EditorialHighlight tone="primary">
              clinical assessment and treatment planning
            </EditorialHighlight>
            , drawing on a range of{" "}
            <EditorialHighlight tone="secondary">
              restorative, implant, orthodontic, prosthodontic and cosmetic
              treatment options
            </EditorialHighlight>
            . These featured treatments represent the primary clinical
            focuses at{" "}
            <EditorialHighlight tone="quiet">
              Neodent Dental Hospital, Mehdipatnam and Nampally
            </EditorialHighlight>
            .
          </p>
        </header>

        {/* ---- Featured Treatment: Full Mouth Rehabilitation ------------- */}
        <article
          ref={featuredRef}
          className={`${styles.featured} ${featuredVisible ? styles.featuredVisible : ""}`}
          id={enrichedFeaturedTreatment.id}
        >
          <div className={styles.featuredContent}>
            <header className={styles.featuredHeader}>
              <div className={styles.featuredEyebrow}>
                {enrichedFeaturedTreatment.eyebrow}
              </div>
              <h2 className={styles.featuredTitle}>
                {enrichedFeaturedTreatment.title}
              </h2>
            </header>

            <div className={styles.featuredText}>
              {enrichedFeaturedTreatment.description}
            </div>

            {enrichedFeaturedTreatment.doctorHref && (
              <a className={styles.featuredDoctorLink} href={enrichedFeaturedTreatment.doctorHref}>
                Treated by Dr. Md. Miftah Ur Rahman <ArrowRight size={13} aria-hidden="true" />
              </a>
            )}

            {enrichedFeaturedTreatment.metadata && (
              <dl className={styles.featuredMetadata}>
                {enrichedFeaturedTreatment.metadata.map((item, i) => (
                  <div key={i} className={styles.metadataItem}>
                    <dt className={styles.metadataLabel}>{item.label}</dt>
                    <dd className={styles.metadataValue}>{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {enrichedFeaturedTreatment.beforeAfter && (
            <figure className={styles.featuredEvidence}>
              <div className={styles.featuredBeforeAfter}>
                <div className={styles.featuredCaseImage}>
                  <img
                    src={enrichedFeaturedTreatment.beforeAfter.beforeSrc}
                    alt={`${enrichedFeaturedTreatment.title} - ${enrichedFeaturedTreatment.beforeAfter.beforeLabel}`}
                    className={styles.featuredImage}
                  />
                  <span className={styles.featuredCaseLabel}>
                    {enrichedFeaturedTreatment.beforeAfter.beforeLabel}
                  </span>
                </div>
                <div className={styles.featuredCaseImage}>
                  <img
                    src={enrichedFeaturedTreatment.beforeAfter.afterSrc}
                    alt={`${enrichedFeaturedTreatment.title} - ${enrichedFeaturedTreatment.beforeAfter.afterLabel}`}
                    className={styles.featuredImage}
                  />
                  <span className={styles.featuredCaseLabel}>
                    {enrichedFeaturedTreatment.beforeAfter.afterLabel}
                  </span>
                </div>
              </div>
              <figcaption className={styles.featuredCaption}>
                {enrichedFeaturedTreatment.beforeAfter.caption}
              </figcaption>
            </figure>
          )}
        </article>

        {/* ---- Treatment Atlas Acts ------------------------------------ */}
        <div className={styles.treatmentAtlas}>
          {enrichedTreatmentAtlas.map((treatment, index) => (
            <div key={treatment.id} className={styles.treatmentActWrapper}>
              <div className={styles.treatmentSeam} aria-hidden="true">
                <span className={styles.hairline} />
              </div>
              <TreatmentAct treatment={treatment} index={index} />
            </div>
          ))}
        </div>

        {/* ---- Additional Services Appendix ---------------------------- */}
        <div
          ref={additionalRef}
          className={`${styles.additional} ${additionalVisible ? styles.additionalVisible : ""}`}
        >
          <div className={styles.additionalSeam} aria-hidden="true">
            <span className={styles.hairline} />
          </div>

          <header className={styles.additionalHeader}>
            <div className={styles.additionalEyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              RESTORATIVE · COSMETIC · PREVENTIVE · SURGICAL
            </div>
            <h3 className={styles.additionalTitle}>
              Additional dental <span>services.</span>
            </h3>
            <p className={styles.additionalLede}>
              Alongside the featured treatments, Neodent provides a broader
              range of restorative, cosmetic, preventive and surgical dental
              services. These supporting services can form part of routine care
              or be considered alongside more comprehensive treatment, depending
              on the patient's clinical needs.
            </p>
          </header>

          <div className={styles.serviceCategories}>
            {additionalServices.map((group, index) => (
              <div key={index} className={styles.serviceCategory}>
                <div className={styles.categoryIndex}>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className={styles.categoryContent}>
                  <h4 className={styles.categoryTitle}>{group.title}</h4>
                  <div className={styles.categoryRule} aria-hidden="true" />
                  <ul className={styles.serviceList}>
                    {group.services.map((service, i) => (
                      <li key={i}>{service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.additionalSeam} aria-hidden="true">
            <span className={styles.hairline} />
          </div>

          <div className={styles.closingCard}>
            <div className={styles.closingCardAtmosphere} aria-hidden="true">
              <span className={styles.closingCardRegister} />
              <span className={styles.closingCardArc} />
            </div>
            <div className={styles.closingCardContent}>
              <p className={styles.closingCardEyebrow}>
                <span className={styles.closingCardRule} aria-hidden="true" />
                Neodent Legacy
              </p>
              <p className={styles.closingCardStatement}>
                <span className={styles.closingCardSupport}>Changing smiles</span>
                <span className={styles.closingCardEmphasis}>since decades</span>
              </p>
              <span className={styles.closingCardSignature} aria-hidden="true" />
              <p className={styles.closingCardAttribution}>— Neodent Dental Hospital</p>
              <p className={styles.closingCardLocation}>Mehdipatnam · Nampally</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
