import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { DOCTORS_AT_WORK } from "@/lib/pages/doctors-content";
import styles from "./DoctorsAtWork.module.css";

/* ------------------------------------------------------------------
   Doctors -- S3 "Dr. Miftah at work" (light). The home page's block:
   one photograph beside the title, paragraph and the link to his
   profile. Strings and image are the home's own (copied into
   doctors-content.ts because the home keeps them inside a component).
   Desktop: photo left, text right. Mobile: photo first (at most 38dvh),
   then the text.

   Motion: the photo is a mask reveal that settles from 1.04 to 1; on
   1024px and wider, where scroll-driven animation is supported and
   motion is allowed, it also drifts at most 24px as the card scrolls
   past (CSS only, on a wrapper so it never fights the settle).
   ------------------------------------------------------------------ */

export function DoctorsAtWork() {
  return (
    <section className={styles.section} aria-labelledby="miftah-at-work">
      <div className={styles.container}>
        <div className={styles.card}>
          <Reveal variant="mask" className={styles.media}>
            <div className={styles.drift}>
              <Image
                className={styles.image}
                src={DOCTORS_AT_WORK.src}
                alt={DOCTORS_AT_WORK.alt}
                width={DOCTORS_AT_WORK.width}
                height={DOCTORS_AT_WORK.height}
                sizes="(max-width: 767px) 92vw, 420px"
              />
            </div>
          </Reveal>
          <Reveal className={styles.text} delay={120}>
            <h2 id="miftah-at-work" className={styles.title}>
              {DOCTORS_AT_WORK.title}
            </h2>
            <p className={styles.copy}>{DOCTORS_AT_WORK.copy}</p>
            <Link className={styles.link} href={DOCTORS_AT_WORK.href}>
              {DOCTORS_AT_WORK.linkText} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
