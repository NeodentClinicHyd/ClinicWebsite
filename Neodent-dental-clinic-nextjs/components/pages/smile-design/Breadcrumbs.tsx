import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export type BreadcrumbItem = { name: string; path: string };

/**
 * Visible breadcrumb trail (fork of components/ui/Breadcrumbs.tsx for the
 * smile design page). The last item is the current page: it
 * is not a link and carries aria-current="page". `tone="dark"` is for use
 * directly above a dark header.
 */
export function Breadcrumbs({
  items,
  tone = "light",
}: {
  items: BreadcrumbItem[];
  tone?: "light" | "dark";
}) {
  return (
    <nav
      className={`${styles.crumbs} ${tone === "dark" ? styles.dark : ""}`}
      aria-label="Breadcrumb"
    >
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li className={styles.item} key={item.path}>
              {isLast ? (
                <span aria-current="page" className={styles.current}>
                  {item.name}
                </span>
              ) : (
                <>
                  <Link className={styles.link} href={item.path}>
                    {item.name}
                  </Link>
                  <span className={styles.sep} aria-hidden="true">
                    ›
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
