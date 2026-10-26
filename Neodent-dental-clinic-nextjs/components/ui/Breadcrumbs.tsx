import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export type BreadcrumbItem = { name: string; path: string };

/**
 * Visible breadcrumb trail. The last item is the current page: it is not
 * a link and carries aria-current="page". Reusable on any internal page.
 * `tone="dark"` is for use directly above a dark hero.
 */
export function Breadcrumbs({
  items,
  tone = "light",
  underFixedNav = false,
}: {
  items: BreadcrumbItem[];
  tone?: "light" | "dark";
  /** Adds the fixed Navbar's height as top padding, for use as the first
   *  element inside <main>. */
  underFixedNav?: boolean;
}) {
  return (
    <nav
      className={`${styles.crumbs} ${tone === "dark" ? styles.dark : ""} ${underFixedNav ? styles.underNav : ""}`}
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
