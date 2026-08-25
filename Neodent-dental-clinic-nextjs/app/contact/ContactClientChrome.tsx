"use client";

import { useState } from "react";
import { ArrowUpRight, Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { address, directions, nampallyAddress, nampallyDirections, nampallyTelPhone, phone, telPhone, whatsappConsultLink } from "@/lib/site-data";
import styles from "./contact.module.css";

const steps = [
  ["01", "Choose your branch", "Start with the location that is easiest for you."],
  ["02", "Speak with our team", "Call or WhatsApp and we will guide the next step."],
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
            <p className={styles.intro}>Good care starts with a conversation. Reach the NeoDent team at the branch that suits you, and we&apos;ll take it from there.</p>
            <div className={styles.actions}>
              <a href={telPhone}><Phone aria-hidden="true" /> Call {phone}</a>
              <a href={whatsappConsultLink}><MessageCircle aria-hidden="true" /> WhatsApp us</a>
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
          <div className={styles.sectionHead}><p className={styles.kicker}>The directory</p><h2 id="directory-title">Two doors into <em>NeoDent.</em></h2></div>
          <div className={styles.branches}>
            <article className={styles.branch}>
              <p className={styles.branchNo}>01 / Mehdipatnam</p><h3>Humayun Nagar</h3><p>{address}</p>
              <div className={styles.branchLinks}><a href={telPhone}><Phone aria-hidden="true" /> {phone}</a><a href={directions} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /> Directions <ArrowUpRight aria-hidden="true" /></a></div>
            </article>
            <article className={styles.branch}>
              <p className={styles.branchNo}>02 / Nampally</p><h3>Medwin Hospital Complex</h3><p>{nampallyAddress}</p>
              <div className={styles.branchLinks}><a href={nampallyTelPhone}><Phone aria-hidden="true" /> +91 9030598081</a><a href={nampallyDirections} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /> Directions <ArrowUpRight aria-hidden="true" /></a></div>
            </article>
          </div>
        </section>

        <section className={styles.visit} aria-labelledby="visit-title">
          <div className={styles.visitInner}><p className={styles.kicker}>Before your visit</p><h2 id="visit-title">A little clarity <em>goes a long way.</em></h2><div className={styles.steps}>{steps.map(([number, title, copy]) => <div className={styles.step} key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div><a className={styles.finalLink} href={whatsappConsultLink}>Start a conversation <ArrowUpRight aria-hidden="true" /></a><p className={styles.hours}><Clock3 aria-hidden="true" /> Open daily · 4:00 pm — 9:00 pm</p></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ContactClientChrome;
