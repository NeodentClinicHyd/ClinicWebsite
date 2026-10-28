import { ArrowRight, Phone } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { ctaTelPhone } from "@/lib/site-data";
import { DOCTORS, HUB_BREADCRUMBS } from "@/lib/treatments-hub";
import styles from "./hub.module.css";

/* Hero (home Hero slide 01: charcoal, gridlines, framed clinical video,
   Level-2 headline with the red serif accent) followed by the ivory editorial intro that carries
   the rest of the page's opening text (home ExperienceIntro). All of the
   words are the previous hero's own: the first sentence is the lede,
   the second sentence is the deck, and the three remaining paragraphs
   are the intro columns. */

const miftah = DOCTORS.find((d) => d.id === "miftah")!;

export function HubHero() {
  return (
    <section aria-labelledby="treatments-title">
      <div className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={`${styles.container} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <div className={styles.crumbs}>
              <Breadcrumbs items={HUB_BREADCRUMBS} tone="dark" />
            </div>
            <h1 id="treatments-title" className={styles.heroTitle}>
              Dental care for the concerns that <span>bring you to Neodent.</span>
            </h1>
            <p className={`${styles.heroLede} section-lede section-lede--on-dark`}>
              From{" "}
              <EditorialHighlight tone="primary" onDark>
                dental implants
              </EditorialHighlight>{" "}
              and{" "}
              <EditorialHighlight tone="secondary" onDark>
                full mouth rehabilitation
              </EditorialHighlight>{" "}
              to orthodontic alignment, root canal treatment, crowns, dentures, veneers
              and smile-focused{" "}
              <EditorialHighlight tone="quiet" onDark>
                cosmetic dentistry
              </EditorialHighlight>
              , Neodent brings different areas of dental care together around the
              concerns that matter to each patient.
            </p>
            <div className={styles.heroActions}>
              <AppButton href={ctaTelPhone} variant="primary">
                <Phone size={14} aria-hidden="true" /> Call Neodent{" "}
                <ArrowRight size={14} aria-hidden="true" />
              </AppButton>
            </div>
          </div>

          <figure className={styles.visual} style={{ margin: 0 }}>
            <span className={styles.visualFrame} aria-hidden="true" />
            <span className={`${styles.tick} ${styles.tickA}`} aria-hidden="true" />
            <span className={`${styles.tick} ${styles.tickB}`} aria-hidden="true" />
            <div className={styles.portrait}>
              <video
                className={styles.heroVideo}
                poster="/assets/treatment-video/dr-miftah-explains-dmls-crowns-masticatory-efficiency.jpg"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                aria-label="Dr. Md. Miftah Ur Rahman explains DMLS crowns and masticatory efficiency"
              >
                <source
                  src="/assets/treatment-video/dr-miftah-explains-dmls-crowns-masticatory-efficiency.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <figcaption className={styles.visualCaption}>
              <b>{miftah.name}</b>
              <span>BDS · MDS · FICOI (U.S.A.) · Prosthodontist &amp; Implantologist</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className={styles.intro}>
        <div className={`${styles.container} ${styles.introGrid}`}>
          <div className={styles.introDeck}>
            <span className={styles.rule} aria-hidden="true" />
            <p>
              Whether the concern is a missing tooth, damaged or worn teeth, tooth pain,
              difficulty chewing, changes in alignment or the appearance of a smile, the
              right treatment begins with understanding what is happening clinically and
              what the patient wants to achieve.
            </p>
          </div>
          <div className={styles.introBody}>
            <p className="section-lede">
              Every treatment begins with{" "}
              <EditorialHighlight tone="primary">careful assessment</EditorialHighlight>{" "}
              rather than a one-size-fits-all approach. The condition of the teeth and
              gums,{" "}
              <EditorialHighlight tone="secondary">bite and function</EditorialHighlight>,
              existing dental work, overall oral health and the patient&apos;s treatment
              goals can all influence the treatment plan. Depending on the concern, care
              may involve restorative dentistry, prosthodontics, implant dentistry,
              orthodontics or{" "}
              <EditorialHighlight tone="quiet">cosmetic treatment</EditorialHighlight>,
              with the approach shaped around what is clinically appropriate.
            </p>
            <p className="section-lede">
              For more complex concerns, treatment may involve several stages or more than
              one area of dentistry. Full mouth rehabilitation, for example, can require
              careful coordination of restorative and prosthodontic treatment to address
              multiple functional and dental concerns together. Similarly, replacing
              missing teeth with dental implants involves assessment, planning and
              restoration rather than simply placing an implant.
            </p>
            <p className="section-lede">
              Across these treatments, Neodent&apos;s approach remains focused on clear
              clinical explanation, thoughtful planning and care that considers{" "}
              <EditorialHighlight tone="primary">
                oral health, function and appearance
              </EditorialHighlight>{" "}
              together. With locations in{" "}
              <EditorialHighlight tone="secondary">
                Mehdipatnam and Nampally, Hyderabad
              </EditorialHighlight>
              , the practice provides access to a broad range of{" "}
              <EditorialHighlight tone="quiet">
                specialist-led dental treatment
              </EditorialHighlight>{" "}
              within the same clinical environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
