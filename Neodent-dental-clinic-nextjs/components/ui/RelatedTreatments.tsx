import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./RelatedTreatments.module.css";

export type RelatedTreatment = {
  title: string;
  description: string;
  href: string;
};

/**
 * Reusable related-treatment cards in the home "What can we help you
 * with" card style: title, one line, small red arrow. Each card is one
 * link whose accessible name is its title + description. Titles are h3
 * (host supplies the h2).
 */
export function RelatedTreatments({
  items,
  compact = false,
}: {
  items: RelatedTreatment[];
  /** Tighter cards (about 100px tall) for slim bands. */
  compact?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <ul className={`${styles.grid} ${compact ? styles.compact : ""}`}>
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
    </ul>
  );
}
