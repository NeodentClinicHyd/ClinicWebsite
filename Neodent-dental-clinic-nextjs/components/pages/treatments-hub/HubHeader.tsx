import type { CSSProperties } from "react";
import Link from "next/link";
import { preload } from "react-dom";
import { ArrowRight, Phone } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { ctaTelPhone } from "@/lib/site-data";
import { DOCTORS, HUB_BREADCRUMBS, TREATMENTS } from "@/lib/treatments-hub";
import { Backdrop } from "./Backdrop";
import { HubVideo } from "./HubVideo";
import shared from "./TreatmentsHub.module.css";
import styles from "./HubHeader.module.css";

/* S0. Page header band: dark gradient, red glow behind the video, icon
   pattern that fades to zero before the text column. The breadcrumb is
   the eyebrow. Text, button label and href, video source and poster and
   both caption lines are the old header's own. Added: a secondary
   "Send an enquiry" link, and links on four treatment names that already
   exist as pages (wording unchanged). */

const miftah = DOCTORS.find((d) => d.id === "miftah")!;
const POSTER =
  "/assets/treatment-video/dr-miftah-explains-dmls-crowns-masticatory-efficiency.jpg";
const SRC =
  "/assets/treatment-video/dr-miftah-explains-dmls-crowns-masticatory-efficiency.mp4";

const at = (delay: string, index?: number) =>
  ({ "--d": delay, ...(index === undefined ? {} : { "--i": index }) }) as CSSProperties;

function Name({ slug, children }: { slug: string; children: string }) {
  const href = TREATMENTS.find((t) => t.slug === slug)?.href;
  return href ? (
    <Link href={href} className={styles.nameLink}>
      {children}
    </Link>
  ) : (
    <span className={shared.strong}>{children}</span>
  );
}

export function HubHeader() {
  /* The video poster is the one priority image on the page. */
  preload(POSTER, { as: "image", fetchPriority: "high" });

  return (
    <section
      className={`${shared.dark} ${styles.header}`}
      aria-labelledby="treatments-title"
      data-hub-header
    >
      <Backdrop />
      <div className={`${shared.container} ${styles.inner}`}>
        <div className={styles.copy}>
          <nav className={`${styles.crumbs} ${styles.in}`} aria-label="Breadcrumb" style={at("0ms")}>
            <ol>
              {HUB_BREADCRUMBS.map((item, index) => {
                const last = index === HUB_BREADCRUMBS.length - 1;
                return (
                  <li key={item.path}>
                    {last ? (
                      <span aria-current="page">{item.name}</span>
                    ) : (
                      <>
                        <Link href={item.path}>{item.name}</Link>
                        <span className={styles.sep} aria-hidden="true">
                          /
                        </span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <h1 id="treatments-title" className={styles.title}>
            <span className={styles.line}>
              <span className={styles.lineInner} style={at("0ms", 0)}>
                Dental care for the concerns that
              </span>
            </span>{" "}
            <span className={styles.line}>
              <span className={`${styles.lineInner} ${styles.titleAccent}`} style={at("0ms", 1)}>
                bring you to Neodent.
              </span>
            </span>
          </h1>

          <p className={`${shared.lede} ${styles.lede} ${styles.in}`} style={at("340ms")}>
            From <Name slug="dental-implants">dental implants</Name> and{" "}
            <Name slug="full-mouth-rehabilitation">full mouth rehabilitation</Name> to
            orthodontic alignment,{" "}
            <Name slug="root-canal-treatment">root canal treatment</Name>, crowns, dentures,
            veneers and smile-focused <Name slug="smile-design">cosmetic dentistry</Name>, Neodent
            brings different areas of dental care together around the concerns that matter to
            each patient.
          </p>

          <div className={`${styles.actions} ${styles.in}`} style={at("440ms")} data-hub-primary-cta>
            <AppButton href={ctaTelPhone} variant="primary">
              <Phone size={14} aria-hidden="true" /> Call Neodent{" "}
              <ArrowRight size={14} aria-hidden="true" />
            </AppButton>
            <Link href="/contact" className={shared.outline}>
              Send an enquiry
            </Link>
          </div>
        </div>

        <figure className={styles.media}>
          <div className={styles.mediaIn}>
            <HubVideo
              className={styles.frame}
              src={SRC}
              poster={POSTER}
              label="Dr. Md. Miftah Ur Rahman explains DMLS crowns and masticatory efficiency"
              mode="autoplay"
              hasSpeech
              objectPosition="50% 12%"
            />
          </div>
          <figcaption className={`${styles.caption} ${styles.captionIn}`}>
            <b>{miftah.name}</b>
            <span>BDS · MDS · FICOI (U.S.A.) · Prosthodontist &amp; Implantologist</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
