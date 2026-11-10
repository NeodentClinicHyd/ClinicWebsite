import Image from "next/image";
import { ArrowRight, Eye, Fingerprint, Smile, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { Reveal } from "@/components/motion/Reveal";
import { INVISALIGN, type InvisalignIcon } from "@/lib/braces-orthodontics-page";
import { SectionHeader } from "./SectionHeader";
import styles from "./InvisalignProvider.module.css";

const ICONS: Record<InvisalignIcon, LucideIcon> = {
  eye: Eye,
  removable: UtensilsCrossed,
  custom: Fingerprint,
  smooth: Smile,
};

/* 4b. Invisalign provider (ivory), directly after Types of braces (dark) and
   before Stages (tan). Same construction as the other sections: a full-width
   header (the page's chapter title with the red italic closing line, and the
   intro paragraph), then the content below.
   Desktop: the four features are a ruled list on the left; the photograph,
   the closing statement and the CTA are stacked on the right, so both
   columns end together. The DOM order is the reading order on a phone:
   header, photograph, features, closing statement, CTA.
   The photograph is the supplied file, served as-is and never cropped (its
   logo and tagline sit at the top-left). The CTA reuses the page's existing
   booking block (#get-in-touch, ContactNextStep). */
export function InvisalignProvider() {
  return (
    <section className={styles.section} aria-labelledby="brc-invisalign-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="brc-invisalign-title"
            sans={INVISALIGN.sans}
            accent={INVISALIGN.accent}
          >
            <p className="section-lede">{INVISALIGN.description}</p>
          </SectionHeader>
        </Reveal>

        <div className={styles.grid}>
          <Reveal variant="mask" className={styles.media}>
            <div className={styles.frame}>
              <Image
                className={styles.photo}
                src={INVISALIGN.image.src}
                alt={INVISALIGN.image.alt}
                width={INVISALIGN.image.width}
                height={INVISALIGN.image.height}
                sizes="(max-width: 1023px) 92vw, 640px"
                loading="lazy"
                unoptimized
              />
            </div>
          </Reveal>

          <Reveal as="ul" stagger={90} className={styles.features}>
            {INVISALIGN.features.map(({ icon, title, text }) => {
              const Icon = ICONS[icon];
              return (
                <li className={styles.feature} key={title}>
                  <Icon className={styles.icon} size={22} strokeWidth={1.6} aria-hidden="true" />
                  <div>
                    <h3 className={styles.featureTitle}>{title}</h3>
                    <p className={styles.featureText}>{text}</p>
                  </div>
                </li>
              );
            })}
          </Reveal>

          <Reveal className={styles.closeRow} delay={80}>
            <p className={styles.closing}>{INVISALIGN.closing}</p>
            <div className={styles.cta}>
              <AppButton href={INVISALIGN.cta.href} variant="primary">
                <span>
                  {INVISALIGN.cta.label}
                  <span className={styles.srOnly}>{INVISALIGN.cta.hiddenSuffix}</span>
                </span>
                <ArrowRight size={15} aria-hidden="true" />
              </AppButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
