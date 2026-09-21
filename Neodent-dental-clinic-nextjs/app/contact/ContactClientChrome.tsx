"use client";

import { useState } from "react";
import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactEnquiryForm } from "@/components/contact/ContactEnquiryForm";
import { address, ctaPhone, ctaTelPhone, directions, mehdipatnamHours, nampallyAddress, nampallyDirections, nampallyHours, nampallyPhone, nampallyTelPhone, phone, telPhone } from "@/lib/site-data";
import styles from "./contact.module.css";

const steps = [
  ["01", "Choose your branch", "Start with the location that is easiest for you."],
  ["02", "Speak with our team", "Call us and we will guide the next step."],
  ["03", "Arrive with clarity", "Your first visit begins with time to understand."],
];

export function ContactClientChrome() {
  return (
    <div className="site">
      <Navbar />
      <main>
        <section className={styles.hero} aria-labelledby="contact-title">
          <div className={styles.heroInner}>
            <p className={styles.kicker}>Contact / Begin here</p>
            <h1 id="contact-title">Let&apos;s make a <em>beginning.</em></h1>
            <p className={styles.intro}>Good care starts with a conversation. Reach the Neodent team at the branch that suits you, and we&apos;ll take it from there.</p>
            <div className={styles.actions}>
              <a href={ctaTelPhone}><Phone aria-hidden="true" /> Call {ctaPhone}</a>
            </div>
          </div>
          <div className={styles.geometry} aria-hidden="true">
            <span className={styles.ghost}>01</span>
            <span className={styles.verticalRail} />
            <span className={styles.horizontalRail} />
            <span className={styles.arc} />
            <span className={styles.detail} />
            <span className={styles.registrationDot} />
          </div>
        </section>

        <section className={styles.directory} aria-labelledby="directory-title">
          <div className={styles.sectionHead}><p className={styles.kicker}>The directory</p><h2 id="directory-title">Two doors into <em>Neodent.</em></h2></div>
          <div className={styles.branches}>
            <article className={styles.branch}>
              <p className={styles.branchNo}>01 / Mehdipatnam</p><h3>Humayun Nagar</h3><p>{address}</p>
              <div className={styles.branchHours}><Clock3 aria-hidden="true" /> {mehdipatnamHours}</div>
              <div className={styles.branchLinks}><a href={telPhone}><Phone aria-hidden="true" /> {phone}</a><a href={directions} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /> Directions <ArrowUpRight aria-hidden="true" /></a></div>
            </article>
            <article className={styles.branch}>
              <p className={styles.branchNo}>02 / Nampally</p><h3>Medwin Hospital Complex</h3><p>{nampallyAddress}</p>
              <div className={styles.branchHours}><Clock3 aria-hidden="true" /> {nampallyHours}</div>
              <div className={styles.branchLinks}><a href={nampallyTelPhone}><Phone aria-hidden="true" /> {nampallyPhone}</a><a href={nampallyDirections} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /> Directions <ArrowUpRight aria-hidden="true" /></a></div>
            </article>
          </div>
        </section>

        <section className={styles.visit} aria-labelledby="visit-title">
          <div className={styles.visitInner}><p className={styles.kicker}>Before your visit</p><h2 id="visit-title">A little clarity <em>goes a long way.</em></h2><div className={styles.steps}>{steps.map(([number, title, copy]) => <div className={styles.step} key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div><a className={styles.finalLink} href={ctaTelPhone}>Start a conversation <ArrowUpRight aria-hidden="true" /></a><p className={styles.hours}><Clock3 aria-hidden="true" /> Consultation - Rs. 300 - Rs. 500</p></div>
        </section>

        <section className={styles.enquiry} aria-labelledby="enquiry-title">
          <div className={styles.enquiryInner}>
            <div className={styles.enquiryHead}>
              <p className={styles.kicker}>Send an enquiry</p>
              <h2 id="enquiry-title">Have a question? <em>Let&apos;s talk.</em></h2>
              <p className={styles.enquiryIntro}>Have a question about a treatment, clinic location or your next step? Send us a message and the Neodent team will get back to you.</p>
            </div>
            <div className={styles.enquiryFormWrap}>
              <ContactEnquiryForm />
            </div>
          </div>
          <div className={styles.enquiryGeometry} aria-hidden="true">
            <span className={styles.enquiryGhost}>04</span>
            <span className={styles.enquiryRule} />
            <span className={styles.enquiryDot} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ContactClientChrome;
