import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { doctorImage } from "@/lib/site-data";
import styles from "./TreatmentDoctorCard.module.css";

type TreatmentDoctor = {
  name: string;
  designation: string;
  qualifications: string;
  treatmentLabel: string;
  profileHref: string;
  imageAlt: string;
};

/** Shared doctor portrait and profile card used on every treatment page. */
export function TreatmentDoctorCard({
  doctor,
  headingId,
  treatmentCopy,
}: {
  doctor: TreatmentDoctor;
  headingId: string;
  treatmentCopy: ReactNode;
}) {
  return (
    <aside className={styles.card} aria-labelledby={headingId}>
      <div className={styles.portrait}>
        <Image
          className={styles.portraitImage}
          src={doctorImage}
          alt={doctor.imageAlt}
          fill
          sizes="(max-width: 1023px) 92vw, 36vw"
        />
        <div className={styles.identity}>
          <h3 id={headingId} className={styles.name}>{doctor.name}</h3>
          <p className={styles.designation}>{doctor.designation}</p>
        </div>
      </div>

      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt>Qualifications</dt>
          <dd className={styles.qualification}>{doctor.qualifications}</dd>
        </div>
        <div className={styles.fact}>
          <dt>{doctor.treatmentLabel}</dt>
          <dd>{treatmentCopy}</dd>
        </div>
      </dl>

      <div className={styles.action}>
        <AppButton href={doctor.profileHref} variant="primary">
          View profile <ArrowRight size={15} aria-hidden="true" />
        </AppButton>
      </div>
    </aside>
  );
}
