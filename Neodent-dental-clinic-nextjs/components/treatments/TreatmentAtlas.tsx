"use client";

import { useEffect, useRef, useState } from "react";
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

// Fill in treatment descriptions with EditorialHighlight integration
const enrichedFeaturedTreatment = {
  ...featuredTreatment,
  description: (
    <p>
      Full mouth rehabilitation provides{" "}
      <EditorialHighlight tone="primary">
        comprehensive restoration
      </EditorialHighlight>{" "}
      for patients with multiple missing, damaged or severely compromised teeth.
      This coordinated treatment approach brings together{" "}
      <EditorialHighlight tone="secondary">
        restorative dentistry, dental implants and prosthodontic solutions
      </EditorialHighlight>{" "}
      to address{" "}
      <EditorialHighlight tone="quiet">
        oral health, function and appearance
      </EditorialHighlight>
      . Treatment planning considers the condition of remaining teeth, bite
      relationships, jaw function and the patient's functional and aesthetic
      goals. Full mouth rehabilitation often involves staged treatment, with
      care sequenced to rebuild oral health systematically.
    </p>
  ),
};

const enrichedTreatmentAtlas = [
  {
    ...treatmentAtlas[0], // Dental Implants
    description: (
      <p>
        Dental implants provide a solution for{" "}
        <EditorialHighlight tone="primary">
          replacing missing teeth
        </EditorialHighlight>
        , offering stability and function. An implant is a titanium post
        surgically placed into the jawbone, which integrates with the bone over
        time through osseointegration. Once healed, the implant can support a
        custom crown, bridge or denture. Treatment planning involves{" "}
        <EditorialHighlight tone="secondary">
          clinical assessment and imaging
        </EditorialHighlight>{" "}
        to evaluate bone quality and the patient's overall oral health. Dental
        implants may replace a single tooth, multiple teeth or serve as anchors
        for{" "}
        <EditorialHighlight tone="quiet">
          full-arch rehabilitation
        </EditorialHighlight>
        . At NeoDent Dental Hospitals, Mehdipatnam and Nampally, implant
        treatment follows careful planning to support appropriate placement.
      </p>
    ),
  },
  {
    ...treatmentAtlas[1], // Orthodontics
    description: (
      <p>
        Orthodontic treatment addresses concerns related to{" "}
        <EditorialHighlight tone="primary">
          tooth alignment, spacing and bite irregularities
        </EditorialHighlight>
        . Misaligned teeth can affect chewing function, oral hygiene and the
        appearance of the smile. Treatment may involve{" "}
        <EditorialHighlight tone="secondary">
          braces or clear aligners
        </EditorialHighlight>{" "}
        that apply controlled pressure to gradually move teeth into improved
        positions. The duration and approach depend on the severity of
        misalignment, the patient's age and specific treatment goals.
        Orthodontic care at NeoDent begins with{" "}
        <EditorialHighlight tone="quiet">
          clinical assessment, imaging and treatment planning
        </EditorialHighlight>{" "}
        to determine the most appropriate approach for each patient's
        orthodontic concerns.
      </p>
    ),
  },
  {
    ...treatmentAtlas[2], // Root Canal Treatment
    description: (
      <p>
        Root canal treatment addresses{" "}
        <EditorialHighlight tone="primary">
          infection or damage within a tooth's pulp
        </EditorialHighlight>{" "}
        — the soft tissue containing nerves and blood vessels inside the tooth.
        When a tooth becomes infected due to deep decay, cracks or trauma, root
        canal treatment may allow the natural tooth to be preserved rather than
        extracted. The procedure involves removing the infected pulp,{" "}
        <EditorialHighlight tone="secondary">
          cleaning and disinfecting the root canal system
        </EditorialHighlight>
        , and sealing the space to prevent further infection. Following
        treatment, the tooth may require a crown for structural protection.
        Treatment planning considers the tooth's condition, the extent of
        infection and whether{" "}
        <EditorialHighlight tone="quiet">
          preservation is clinically appropriate
        </EditorialHighlight>
        .
      </p>
    ),
  },
  {
    ...treatmentAtlas[3], // Smile Design & Cosmetic Dentistry
    description: (
      <p>
        Smile design and cosmetic dentistry focus on improving the{" "}
        <EditorialHighlight tone="primary">
          appearance, balance and harmony of the smile
        </EditorialHighlight>{" "}
        through restorative and aesthetic treatment. This may involve addressing
        concerns like discolored, chipped, misshapen or poorly aligned teeth.
        Treatment options include{" "}
        <EditorialHighlight tone="secondary">
          veneers, crowns, tooth reshaping, whitening and composite bonding
        </EditorialHighlight>
        , selected based on the specific concern and the patient's aesthetic
        goals. Smile design planning considers tooth proportions, gum line
        symmetry and facial features to create natural-looking results. At
        NeoDent Dental Hospitals, cosmetic treatment is planned through{" "}
        <EditorialHighlight tone="quiet">
          careful assessment and communication
        </EditorialHighlight>{" "}
        about expected outcomes.
      </p>
    ),
  },
  {
    ...treatmentAtlas[4], // Dentures & Prosthodontics
    description: (
      <p>
        Dentures and prosthodontic treatment replace{" "}
        <EditorialHighlight tone="primary">
          multiple missing teeth
        </EditorialHighlight>{" "}
        through removable or fixed dental prostheses. Complete dentures replace
        all teeth in an arch, while partial dentures replace some teeth.
        Implant-supported dentures can offer improved stability compared to
        conventional removable dentures. Prosthodontic treatment planning
        involves assessing{" "}
        <EditorialHighlight tone="secondary">
          remaining teeth, bone structure and bite relationships
        </EditorialHighlight>
        . Custom prostheses are fabricated to restore{" "}
        <EditorialHighlight tone="quiet">
          chewing ability and support facial structure
        </EditorialHighlight>
        . At NeoDent, denture and prosthodontic care includes impression-taking,
        bite registration and adjustments to support comfortable function.
      </p>
    ),
  },
  {
    ...treatmentAtlas[5], // Veneers
    description: (
      <p>
        Veneers are{" "}
        <EditorialHighlight tone="primary">
          thin shells of porcelain or composite resin
        </EditorialHighlight>{" "}
        bonded to the front surface of teeth to improve their appearance. They
        can address concerns like discoloration, chips, gaps or minor
        misalignment. Veneer treatment involves{" "}
        <EditorialHighlight tone="secondary">
          tooth preparation, impression-taking and custom fabrication
        </EditorialHighlight>{" "}
        to match the desired shade and shape. Porcelain veneers offer durability
        and natural translucency, while composite veneers can be completed more
        quickly. Treatment planning considers the condition of existing teeth,
        the patient's aesthetic goals and the{" "}
        <EditorialHighlight tone="quiet">
          clinical appropriateness
        </EditorialHighlight>{" "}
        of veneer treatment.
      </p>
    ),
  },
];

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
            Seven areas of <span>clinical focus.</span>
          </h2>
          <p className={styles.lede}>
            NeoDent approaches different dental concerns through{" "}
            <EditorialHighlight tone="primary">
              clinical assessment and treatment planning
            </EditorialHighlight>
            , drawing on a range of{" "}
            <EditorialHighlight tone="secondary">
              restorative, implant, orthodontic, prosthodontic and cosmetic
              treatment options
            </EditorialHighlight>
            . The seven areas outlined below represent the primary clinical
            focuses at{" "}
            <EditorialHighlight tone="quiet">
              NeoDent Dental Hospitals, Mehdipatnam and Nampally
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
              OTHER DENTAL SERVICES
            </div>
            <h3 className={styles.additionalTitle}>
              Beyond the featured <span>seven.</span>
            </h3>
            <p className={styles.additionalLede}>
              Beyond the primary treatment areas, NeoDent provides a broader
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
                NeoDent Legacy
              </p>
              <p className={styles.closingCardStatement}>
                <span className={styles.closingCardSupport}>Changing smiles</span>
                <span className={styles.closingCardEmphasis}>since decades</span>
              </p>
              <span className={styles.closingCardSignature} aria-hidden="true" />
              <p className={styles.closingCardAttribution}>— NeoDent Dental Hospitals</p>
              <p className={styles.closingCardLocation}>Mehdipatnam · Nampally</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
