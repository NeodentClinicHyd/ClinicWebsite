import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/site-data";
import styles from "./doctors.module.css";

/* ------------------------------------------------------------------
   Doctors hub (/doctors) - the route referenced by the Dr. Miftah
   page's visible breadcrumb and its BreadcrumbList schema. Lists the
   clinical team using only facts already established elsewhere on
   the site (names, roles, credentials). Server component - no
   interactivity required.
   ------------------------------------------------------------------ */

const title = `Our Doctors | ${SITE_NAME}`;
const description =
  "Meet the clinical team at Neodent Dental Hospital, Hyderabad - founded by Dr. Mohd. Siraj Ur Rahman, with prosthodontist and implantologist Dr. Md. Miftah Ur Rahman.";
const path = "/doctors";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: path,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: path,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${SITE_URL}${path}/#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Doctors",
      item: `${SITE_URL}${path}`,
    },
  ],
};

export default function DoctorsPage() {
  return (
    <div className="site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main>
        <section className={styles.section} aria-labelledby="doctors-title">
          <div className={`container ${styles.container}`}>
            <div className={styles.eyebrow}>Our doctors</div>
            <h1 id="doctors-title" className={styles.title}>
              The clinical team <em>behind Neodent.</em>
            </h1>
            <p className={styles.intro}>
              Specialist-led dental care delivered across two Hyderabad
              locations, led by the clinicians who built the practice.
            </p>

            <div className={styles.cards}>
              <article className={styles.card}>
                <p className={styles.cardRole}>Founder &amp; Director</p>
                <h2 className={styles.cardName}>Dr. Mohd. Siraj Ur Rahman</h2>
                <p className={styles.cardMeta}>
                  Dental Surgeon &middot; Prosthodontist &middot; Implantologist
                </p>
                <p className={styles.cardBody}>
                  Founded Neodent in Hyderabad in 1994 and continues to lead
                  its clinical direction across Mehdipatnam and Nampally.
                </p>
              </article>

              <article className={styles.card}>
                <p className={styles.cardRole}>Prosthodontist &amp; Implantologist</p>
                <h2 className={styles.cardName}>Dr. Md. Miftah Ur Rahman</h2>
                <p className={styles.cardMeta}>
                  BDS, MDS, FICOI &middot; Assistant Professor of Prosthodontics
                </p>
                <p className={styles.cardBody}>
                  Leads implant, prosthodontic and full mouth rehabilitation
                  care at both Neodent branches.
                </p>
                <Link
                  href="/doctors/dr-miftah-ur-rahman"
                  className={styles.cardLink}
                >
                  View full profile <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </article>
            </div>

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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
