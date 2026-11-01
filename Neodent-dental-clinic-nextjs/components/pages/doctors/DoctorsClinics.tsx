import Link from "next/link";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { clinicLocations } from "@/lib/clinic-data";
import { DOCTORS_CLINICS_HEADING } from "@/lib/pages/doctors-content";
import styles from "./DoctorsClinics.module.css";

/* ------------------------------------------------------------------
   Doctors -- S5 both clinics, one team (light). Two compact clinic
   cards (name, address, hours, phone) read from lib/clinic-data.ts, each
   linking to its clinic page. The old closing line sits directly under
   the cards, same words and same two links ("clinics page" to /clinic,
   "get in touch" to /contact), moved here from the end of the old card
   area. Links are ink with a red underline: small red on charcoal failed
   the contrast rule. Nothing is imported from components/clinic/*.
   ------------------------------------------------------------------ */

const clinics = [clinicLocations.mehdipatnam, clinicLocations.nampally];

export function DoctorsClinics() {
  return (
    <section className={styles.section} id="clinics" aria-labelledby="clinics-title">
      <div className={styles.container}>
        <Reveal as="header" className={styles.header} stagger={80}>
          <p className={styles.eyebrow}>{DOCTORS_CLINICS_HEADING.eyebrow}</p>
          <h2 id="clinics-title" className={styles.title}>
            {DOCTORS_CLINICS_HEADING.title}
          </h2>
          <p className={styles.lede}>{DOCTORS_CLINICS_HEADING.lede}</p>
        </Reveal>

        <Reveal as="ul" className={styles.cards} stagger={100}>
          {clinics.map((clinic) => (
            <li className={styles.cardItem} key={clinic.slug}>
              <article className={styles.card} aria-labelledby={`clinic-${clinic.slug}`}>
                <h3 id={`clinic-${clinic.slug}`} className={styles.name}>
                  {clinic.name}
                </h3>
                <p className={styles.locality}>{clinic.locality}</p>

                <dl className={styles.facts}>
                  <div className={styles.fact}>
                    <dt>
                      <MapPin size={15} aria-hidden="true" /> Address
                    </dt>
                    <dd>{clinic.address}</dd>
                  </div>
                  <div className={styles.fact}>
                    <dt>
                      <Clock size={15} aria-hidden="true" /> Hours
                    </dt>
                    <dd>
                      {clinic.weeklyHours}, {clinic.hours}
                      <br />
                      {clinic.weeklyClosure}
                    </dd>
                  </div>
                  <div className={styles.fact}>
                    <dt>
                      <Phone size={15} aria-hidden="true" /> Phone
                    </dt>
                    <dd>
                      <a className={styles.phone} href={clinic.tel}>
                        {clinic.phone}
                      </a>
                    </dd>
                  </div>
                </dl>

                <Link className={styles.clinicLink} href={`/clinic/${clinic.slug}`}>
                  See the {clinic.name} clinic <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            </li>
          ))}
        </Reveal>

        <Reveal className={styles.closing}>
          <p className={styles.footnote}>
            See both branches on the{" "}
            <Link href="/clinic" className={styles.inline}>
              clinics page
            </Link>{" "}
            or{" "}
            <Link href="/contact" className={styles.inline}>
              get in touch
            </Link>{" "}
            to begin.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
