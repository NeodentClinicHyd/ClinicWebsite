"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Phone, MessageCircle } from "lucide-react";
import { telPhone, whatsappConsultLink } from "@/lib/site-data";
import styles from "./QuestionsContact.module.css";

const faqs = [
  {
    question: "How do I know which dental treatment I need?",
    answer: "Treatment recommendations are based on a clinical assessment of your dental condition. During a consultation, the dentist will evaluate your oral health and discuss suitable treatment options with you based on your specific concerns and goals.",
  },
  {
    question: "What is full mouth rehabilitation?",
    answer: "Full mouth rehabilitation is a comprehensive approach to restoring oral health and function when multiple teeth are affected. It may involve a combination of treatments such as dental implants, crowns, bridges and other restorative procedures, planned together to address the overall condition.",
  },
  {
    question: "When are dental implants considered?",
    answer: "Dental implants may be considered as a treatment option for replacing one or more missing teeth. The suitability of implants depends on factors including the condition of the jawbone, overall oral health, and individual patient factors, which are assessed during consultation.",
  },
  {
    question: "What is root canal treatment?",
    answer: "Root canal treatment is a procedure aimed at addressing problems within the inner portion of an affected tooth. The goal is to preserve the natural tooth where clinically appropriate, rather than extracting it.",
  },
  {
    question: "What is smile designing?",
    answer: "Smile designing refers to the aesthetic planning and treatment focused on improving the appearance of the smile. This may involve procedures such as veneers, crowns, orthodontics or other cosmetic dental work, depending on the patient's goals and clinical suitability.",
  },
  {
    question: "Can multiple dental treatments be planned together?",
    answer: "Yes, in cases where multiple dental concerns need to be addressed, treatments can be coordinated as part of a comprehensive treatment plan. The sequence and approach will depend on your specific condition and priorities.",
  },
];

export function QuestionsContact() {
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="questions-title"
    >
      <div className={styles.container}>
        {/* Questions / FAQ */}
        <div className={styles.questions}>
          <header className={styles.questionsHeader}>
            <span className={styles.numeral} aria-hidden="true">08</span>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              Common questions
            </div>
            <h2 id="questions-title" className={styles.questionsTitle}>
              Questions<br /><span>about treatment</span>
            </h2>
          </header>

          <div className={styles.accordion}>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.item}>
                <button
                  type="button"
                  className={styles.trigger}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  data-state={openIndex === index ? "open" : "closed"}
                >
                  <span className={styles.question}>{faq.question}</span>
                  <ChevronDown className={styles.icon} />
                </button>
                <div
                  className={styles.content}
                  data-state={openIndex === index ? "open" : "closed"}
                  style={{
                    display: openIndex === index ? "block" : "none",
                  }}
                >
                  <div className={styles.answer}>{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Card */}
        <div className={styles.contact}>
          <header className={styles.contactHeader}>
            <h3 className={styles.contactTitle}>
              Ready to discuss your dental concerns?
            </h3>
            <p className={styles.contactDescription}>
              Call or message us to arrange a consultation. You don't need to know which treatment you need before reaching out.
            </p>
          </header>

          <div className={styles.actions}>
            <a href={telPhone} className={`${styles.button} ${styles.buttonPrimary}`}>
              <Phone size={18} />
              Call NeoDent
            </a>
            <a href={whatsappConsultLink} className={`${styles.button} ${styles.buttonSecondary}`}>
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>

          <div className={styles.divider}>or</div>

          <div className={styles.info}>
            <p className={styles.infoItem}>
              <strong>Mehdipatnam:</strong> 4:30 PM–8:00 PM
            </p>
            <p className={styles.infoItem}>
              <strong>Nampally:</strong> 9:30 AM–8:00 PM
            </p>
            <p className={styles.infoItem}>Sunday holiday</p>
          </div>
        </div>
      </div>
    </section>
  );
}
