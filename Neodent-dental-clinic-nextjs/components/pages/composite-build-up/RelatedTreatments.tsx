import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./RelatedTreatments.module.css";

export type RelatedTreatment = {
  title: string;
  description: string;
  href: string;
};

/**
 * Related-treatment cards (fork of components/ui/RelatedTreatments.tsx, the
 * compact variant): title, one line, small red arrow, equal heights, revealed
 * one after another. Each card is one link whose accessible name is its title
 * and description. Titles are h3 (the host supplies the h2).
 */
export function RelatedTreatments({ items }: { items: RelatedTreatment[] }) {
  if (items.length === 0) return null;

  return (
    <Reveal as="ul" className={styles.grid} stagger={100}>
      {items.map((item) => (
        <li key={item.title} className={styles.cell}>
          <Link className={styles.card} href={item.href}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.text}>{item.description}</p>
            <span className={styles.more} aria-hidden="true">
              <ArrowRight size={16} />
            </span>
          </Link>
        </li>
      ))}
    </Reveal>
  );
}
