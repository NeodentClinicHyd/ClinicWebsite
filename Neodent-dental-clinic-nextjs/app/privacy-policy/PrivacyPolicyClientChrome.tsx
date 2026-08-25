import { ArrowUpRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ctaPhone, ctaTelPhone } from "@/lib/site-data";
import styles from "./privacy-policy.module.css";

/* ------------------------------------------------------------------
   Client-side chrome for /privacy-policy.

   Reuses the sitewide Navbar and Footer exactly as About/Contact
   already do -- neither is modified here. This page carries no
   booking CTA and no marketing section: it is a formal document
   rendered inside the site's existing editorial system (dark hero,
   ivory reading surface, red hairlines, serif display type, mono
   uppercase labels), not a new landing page.

   Content follows the clinic's actual, verifiable practices. Where
   a specific process is not established elsewhere in this codebase
   (e.g. a dedicated privacy inbox, a fixed retention period, named
   third-party processors), the copy deliberately uses conservative,
   non-absolute language rather than inventing detail. ------------------------------------------------------------------ */

type Chapter = {
  number: string;
  title: string;
  body: React.ReactNode;
};

const chapters: Chapter[] = [
  {
    number: "01",
    title: "Information We May Collect",
    body: (
      <>
        <p>Depending on how you interact with NeoDent, this may include:</p>
        <dl className={styles.termList}>
          <div>
            <dt>Contact information</dt>
            <dd>Name, phone number, email address and your preferred clinic or branch.</dd>
          </div>
          <div>
            <dt>Enquiry information</dt>
            <dd>
              Details you share when you contact us about treatments, clinic locations, timings,
              consultations or general questions.
            </dd>
          </div>
          <div>
            <dt>Appointment-related information</dt>
            <dd>Details necessary to coordinate an appointment or respond to a request, where applicable.</dd>
          </div>
          <div>
            <dt>Website / technical information</dt>
            <dd>
              Where applicable: browser type, device information, IP address, pages visited and general
              website usage or analytics information.
            </dd>
          </div>
        </dl>
      </>
    ),
  },
  {
    number: "02",
    title: "How We Use Information",
    body: (
      <p>
        Information we collect may be used to respond to enquiries, communicate with patients or
        visitors, coordinate appointments where applicable, provide and manage dental care, maintain
        necessary clinical and administrative records, improve the website and visitor experience,
        maintain website security, prevent misuse or abuse, and comply with applicable legal requirements.
      </p>
    ),
  },
  {
    number: "03",
    title: "Patient Confidentiality",
    body: (
      <>
        <p className={styles.callout}>Your dental treatment is private.</p>
        <p>
          NeoDent does not publicly disclose or publish identifiable information about a patient&apos;s
          diagnosis, treatment, clinical records, treatment plans, clinical photographs or treatment
          journey without appropriate authorization, except where disclosure is required or permitted by
          applicable law.
        </p>
        <p>
          Patient-related information is otherwise handled for legitimate clinical, administrative and
          operational purposes connected with your care.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Patient Photographs & Clinical Images",
    body: (
      <ul className={styles.list}>
        <li>Identifiable patient photographs are not published publicly without appropriate consent or authorization.</li>
        <li>Clinical photographs and diagnostic images may be used for treatment and documentation purposes.</li>
        <li>Appropriately de-identified or anonymised material may be used for educational purposes where appropriate.</li>
        <li>
          Patient testimonials, case stories or identifiable treatment imagery are published only where
          appropriate authorization has been obtained.
        </li>
      </ul>
    ),
  },
  {
    number: "05",
    title: "When Information May Be Shared",
    body: (
      <>
        <p>NeoDent does not sell personal or patient information.</p>
        <p>Information may be shared where reasonably necessary with:</p>
        <ul className={styles.list}>
          <li>Authorised clinic staff.</li>
          <li>Healthcare professionals involved in your care.</li>
          <li>Service providers supporting our website, technology or communications.</li>
          <li>Payment or other operational providers, where applicable.</li>
          <li>Authorities, where required or permitted by law.</li>
        </ul>
      </>
    ),
  },
  {
    number: "06",
    title: "Third-Party Services",
    body: (
      <p>
        Our website may contain or use third-party services such as YouTube embedded media, analytics
        services, maps, communication tools and external links. These third-party services may process
        information under their own privacy policies and terms, separate from this one.
      </p>
    ),
  },
  {
    number: "07",
    title: "Cookies & Website Analytics",
    body: (
      <p>
        Cookies or similar technologies may be used, where applicable, for website functionality,
        performance, traffic measurement, understanding how visitors use the website, and improving the
        overall experience.
      </p>
    ),
  },
  {
    number: "08",
    title: "Data Security",
    body: (
      <p>
        NeoDent takes reasonable technical and organisational measures intended to protect personal
        information from unauthorized access, misuse, loss, alteration or disclosure.
      </p>
    ),
  },
  {
    number: "09",
    title: "Data Retention",
    body: (
      <p>
        Personal information is retained only for as long as reasonably necessary for the purpose for
        which it was collected, for clinical or administrative requirements, to maintain appropriate
        records, or to meet applicable legal obligations.
      </p>
    ),
  },
  {
    number: "10",
    title: "Privacy Requests",
    body: (
      <p>
        You may contact NeoDent regarding your personal information or any privacy concerns, including
        requests relating to access, correction, withdrawal of consent, questions about processing, or
        privacy complaints. See &ldquo;Questions About Privacy?&rdquo; below for how to reach us.
      </p>
    ),
  },
  {
    number: "11",
    title: "Children & Minors",
    body: (
      <p>
        Where information relates to a child or minor, it is handled through the appropriate parent,
        guardian or other lawful representative and in accordance with applicable requirements.
      </p>
    ),
  },
  {
    number: "12",
    title: "Reviews, Testimonials & Public Content",
    body: (
      <p>
        Public reviews and testimonials are treated separately from confidential clinical records.
        NeoDent does not publicly disclose a patient&apos;s treatment details merely because the person
        has visited the clinic. Identifiable patient stories, photographs or treatment information used
        for public-facing content are supported by appropriate authorization.
      </p>
    ),
  },
  {
    number: "13",
    title: "Changes to This Privacy Policy",
    body: (
      <p>
        NeoDent may update this Privacy Policy from time to time to reflect changes in our services,
        technology, legal requirements or privacy practices. The updated version will be published on
        this page with a revised date.
      </p>
    ),
  },
];

export function PrivacyPolicyClientChrome() {
  return (
    <div className="site">
      <Navbar />
      <main>
        <section className={styles.hero} aria-labelledby="privacy-title">
          <div className={styles.heroInner}>
            <p className={styles.kicker}>Privacy policy</p>
            <h1 id="privacy-title">Privacy Policy</h1>
            <p className={styles.intro}>Your privacy matters to NeoDent.</p>
          </div>
          <div className={styles.geometry} aria-hidden="true">
            <span className={styles.ghost}>Privacy</span>
            <span className={styles.verticalRail} />
            <span className={styles.horizontalRail} />
            <span className={styles.registrationDot} />
          </div>
        </section>

        <section className={styles.body} aria-labelledby="privacy-intro-title">
          <div className={styles.bodyInner}>
            <h2 id="privacy-intro-title" className={styles.srOnly}>
              Introduction
            </h2>
            <p className={styles.leadParagraph}>
              NeoDent Dental Hospitals respects the privacy of patients, visitors and people who contact
              us through our website. This Privacy Policy explains, in clear terms, the types of
              information we may collect, why we use it, how we protect it, and the circumstances in
              which it may be shared.
            </p>

            <ol className={styles.chapters}>
              {chapters.map((chapter) => (
                <li className={styles.chapter} key={chapter.number}>
                  <span className={styles.chapterNumber} aria-hidden="true">
                    {chapter.number}
                  </span>
                  <div className={styles.chapterContent}>
                    <h3>{chapter.title}</h3>
                    {chapter.body}
                  </div>
                </li>
              ))}
            </ol>

            <div className={styles.closing}>
              <h3>Questions About Privacy?</h3>
              <p>
                If you have questions or concerns about this Privacy Policy or how your information is
                handled, you can reach the NeoDent team directly.
              </p>
              <div className={styles.closingActions}>
                <a href={ctaTelPhone}>
                  <Phone aria-hidden="true" /> Call {ctaPhone}
                </a>
                <a href="/contact">
                  Visit Contact <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>

            <p className={styles.lastUpdated}>Last updated: 26 August 2026</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default PrivacyPolicyClientChrome;
