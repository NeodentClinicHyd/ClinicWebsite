import { Reveal } from "@/components/motion/Reveal";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { ResponsiveDetails } from "./ResponsiveDetails";
import shared from "./TreatmentsHub.module.css";
import styles from "./HubIntro.module.css";

/* S1. Intro (pattern P3): the serif statement as the lede with the short
   red rule above it, then the three paragraphs in a reading column of at
   most 70 characters. At most two highlights in the section, on light
   text. On phones paragraphs 2 and 3 sit in one disclosure that is open in
   the server HTML. All wording is the old intro's own. */
export function HubIntro() {
  return (
    <section className={`${shared.paper} ${styles.intro}`} aria-label="Introduction">
      <div className={`${shared.container} ${styles.grid}`}>
        <div className={styles.deck}>
          <span className={shared.rule} aria-hidden="true" />
          <Reveal as="p" variant="mask" className={styles.statement}>
            Whether the concern is a missing tooth, damaged or worn teeth, tooth pain,
            difficulty chewing, changes in alignment or the appearance of a smile, the
            right treatment begins with understanding what is happening clinically and
            what the patient wants to achieve.
          </Reveal>
        </div>

        <Reveal stagger={80} className={styles.body}>
          <p className={shared.lede}>
            Every treatment begins with{" "}
            <EditorialHighlight tone="primary">careful assessment</EditorialHighlight>{" "}
            rather than a one-size-fits-all approach. The condition of the teeth and
            gums, bite and function, existing dental work, overall oral health and the
            patient&apos;s treatment goals can all influence the treatment plan.
            Depending on the concern, care may involve restorative dentistry,
            prosthodontics, implant dentistry, orthodontics or cosmetic treatment, with
            the approach shaped around what is clinically appropriate.
          </p>
          <ResponsiveDetails summary="More on how Neodent plans care">
            <p className={shared.lede}>
              For more complex concerns, treatment may involve several stages or more
              than one area of dentistry. Full mouth rehabilitation, for example, can
              require careful coordination of restorative and prosthodontic treatment to
              address multiple functional and dental concerns together. Similarly,
              replacing missing teeth with dental implants involves assessment, planning
              and restoration rather than simply placing an implant.
            </p>
            <p className={shared.lede}>
              Across these treatments, Neodent&apos;s approach remains focused on clear
              clinical explanation, thoughtful planning and care that considers{" "}
              <EditorialHighlight tone="secondary">
                oral health, function and appearance
              </EditorialHighlight>{" "}
              together. With locations in Mehdipatnam and Nampally, Hyderabad, the
              practice provides access to a broad range of specialist-led dental
              treatment within the same clinical environment.
            </p>
          </ResponsiveDetails>
        </Reveal>
      </div>
    </section>
  );
}
