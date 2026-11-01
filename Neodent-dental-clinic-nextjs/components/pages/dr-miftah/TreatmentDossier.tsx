import type { ReactNode } from "react";
import type { Block, TreatmentDossier } from "@/lib/miftah-treatment-dossiers";
import styles from "./TreatmentDossier.module.css";

/* ------------------------------------------------------------------
   Treatment dossier — presentation of one lib/miftah-treatment-dossiers
   entry. Used twice:
     - inside TreatmentDetailDialog (section headings h3; the dialog
       header carries the h2 title)
     - hidden in Section 03's server HTML (title h3, sections h4), so
       the content is part of the page document without a client
       interaction.
   Provenance: "documented" blocks (facts about Dr. Miftah) are set
   apart with their own label; "unverified" blocks are never rendered.
   ------------------------------------------------------------------ */

type Level = 2 | 3 | 4 | 5;

function Heading({ level, id, className, children }: { level: Level; id?: string; className?: string; children: ReactNode }) {
  const Tag = `h${level}` as "h2" | "h3" | "h4" | "h5";
  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
}

function renderable(block: Block) {
  if (block.source === "unverified") {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[TreatmentDossier] skipped unverified block", block);
    }
    return false;
  }
  return true;
}

function BlockView({ block }: { block: Block }) {
  if (block.kind === "p") return <p className={styles.para}>{block.text}</p>;
  return (
    <ul className={styles.list}>
      {block.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function sectionId(idPrefix: string, dossierId: string, key: string) {
  return `${idPrefix}${dossierId}-${key}`;
}

export function TreatmentDossier({
  dossier,
  idPrefix,
  sectionLevel,
  title,
  renderEvidence,
}: {
  dossier: TreatmentDossier;
  idPrefix: string;
  /** Heading level of the ten section headings. */
  sectionLevel: 3 | 4;
  /** Render the dossier's own title block (hidden SSR copy only). */
  title?: boolean;
  /** Evidence UI rendered inside section 10. */
  renderEvidence?: () => ReactNode;
}) {
  const titleLevel = (sectionLevel - 1) as Level;
  return (
    <article
      className={styles.dossier}
      aria-labelledby={title ? `${idPrefix}${dossier.id}-title` : undefined}
      data-dossier={dossier.id}
    >
      {title && (
        <header className={styles.head}>
          <p className={styles.eyebrow}>{dossier.eyebrow}</p>
          <Heading level={titleLevel} id={`${idPrefix}${dossier.id}-title`} className={styles.title}>
            {dossier.title}
            <span className={styles.subtitle}> — {dossier.subtitle}</span>
          </Heading>
        </header>
      )}
      <p className={styles.intro}>{dossier.intro}</p>

      {dossier.sections.map((section) => {
        const blocks = section.blocks.filter(renderable);
        const documented = blocks.filter((b) => b.source === "documented");
        const general = blocks.filter((b) => b.source !== "documented");
        const id = sectionId(idPrefix, dossier.id, section.key);
        return (
          <section
            key={section.key}
            className={styles.section}
            aria-labelledby={id}
            data-dossier-section={section.key}
          >
            <div className={styles.sectionHead}>
              <span className={styles.sectionNumber} aria-hidden="true">
                {section.number}
              </span>
              <Heading level={sectionLevel} id={id} className={styles.sectionHeading}>
                {section.heading}
              </Heading>
            </div>
            <div className={styles.sectionBody}>
              {general.map((block, i) => (
                <BlockView key={i} block={block} />
              ))}
              {section.steps && (
                <ol className={styles.steps}>
                  {section.steps.map((step) => (
                    <li key={step.number} className={styles.step}>
                      <span className={styles.stepNumber} aria-hidden="true">
                        {step.number}
                      </span>
                      <span className={styles.stepTitle}>{step.title}</span>
                      <span className={styles.stepBody}>{step.body}</span>
                    </li>
                  ))}
                </ol>
              )}
              {documented.length > 0 && (
                <div className={styles.documented} data-provenance="documented">
                  <p className={styles.documentedLabel}>From Dr. Miftah&rsquo;s profile</p>
                  {documented.map((block, i) => (
                    <BlockView key={i} block={block} />
                  ))}
                </div>
              )}
              {section.key === "evidence" && renderEvidence?.()}
            </div>
          </section>
        );
      })}

      <p className={styles.disclaimer}>
        General patient information, not a diagnosis or a treatment
        recommendation. {dossier.cta.note}
      </p>
    </article>
  );
}
