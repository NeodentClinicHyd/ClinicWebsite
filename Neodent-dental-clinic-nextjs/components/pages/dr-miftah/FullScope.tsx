import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { featuredTreatmentTitle } from "@/lib/featured-treatment-catalog";
import { SectionHead } from "./SectionHead";
import { SCOPE_ICONS } from "./ScopeIcons";
import styles from "./FullScope.module.css";

/* ------------------------------------------------------------------
   04 Full scope (pattern P6). Light band. Seven treatment cards in a
   4 + 3 flow (the second row grows to fill), each one whole link to its
   treatment page. "Care shaped around individual needs" is now the
   section's supporting line instead of an eighth, mostly empty cell.
   The DOM order inside each link (number, icon, title, tags, link text)
   is the old one, so the link text is unchanged; CSS places the parts.
   ------------------------------------------------------------------ */

const SCOPE_ROWS = [
  {
    number: "01",
    title: featuredTreatmentTitle("composite-build-up"),
    verb: "REPAIR",
    href: "/treatments/composite-build-up",
    focus: false,
  },
  {
    number: "02",
    title: featuredTreatmentTitle("dental-implants"),
    verb: "REPLACE",
    href: "/treatments/dental-implants",
    focus: true,
  },
  {
    number: "03",
    title: featuredTreatmentTitle("root-canal-treatment"),
    verb: "PRESERVE",
    href: "/treatments/root-canal-treatment",
    focus: false,
  },
  {
    number: "04",
    title: featuredTreatmentTitle("braces-orthodontics"),
    verb: "ALIGN",
    href: "/treatments/braces-and-orthodontics",
    focus: false,
  },
  {
    number: "05",
    title: featuredTreatmentTitle("smile-design"),
    verb: "REFINE",
    href: "/treatments/smile-design",
    focus: true,
  },
  {
    number: "06",
    title: featuredTreatmentTitle("full-mouth-rehabilitation"),
    verb: "REBUILD",
    href: "/treatments/full-mouth-rehabilitation",
    focus: true,
  },
  {
    number: "07",
    title: featuredTreatmentTitle("scaling-polishing"),
    verb: "MAINTAIN",
    href: "/treatments/scaling-and-polishing",
    focus: false,
  },
];

export function FullScope() {
  return (
    <section
      id="clinical-focus"
      className={styles.section}
      aria-labelledby="miftah-scope-title"
    >
      <div className={styles.container}>
        <SectionHead
          eyebrow="04 / FULL SCOPE"
          id="miftah-scope-title"
          title="Clinical care across key concerns."
          lede="Care shaped around individual needs"
        />
        <Reveal as="div" className={styles.grid} stagger={80}>
          {SCOPE_ROWS.map((row) => (
            <a className={styles.tile} key={row.number} href={row.href}>
              <span className={styles.number} aria-hidden="true">
                {row.number}
              </span>
              <span className={styles.icon} aria-hidden="true">
                {SCOPE_ICONS[row.number]}
              </span>
              <span className={styles.title}>{row.title}</span>
              {row.focus && <span className={styles.focus}>&#9679; SPECIALIST FOCUS</span>}
              <span className={styles.verb}>{row.verb}</span>
              <span className={styles.link}>
                View treatment <ArrowRight size={14} aria-hidden="true" />
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
