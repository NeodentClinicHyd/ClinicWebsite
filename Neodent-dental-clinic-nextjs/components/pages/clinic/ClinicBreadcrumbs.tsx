import Link from "next/link";
import { CLINIC_BREADCRUMBS } from "@/lib/pages/clinic-content";
import styles from "./ClinicBreadcrumbs.module.css";

/* Visible breadcrumb "Home / Clinics" under the header (PAGE_PLAN Q6,
   approved). The BreadcrumbList JSON-LD in app/clinic/page.tsx is built
   from the same CLINIC_BREADCRUMBS array, so it matches word for word. */

export function ClinicBreadcrumbs() {
  return (
    <nav className={styles.crumbs} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {CLINIC_BREADCRUMBS.map((item, index) => {
          const last = index === CLINIC_BREADCRUMBS.length - 1;
          return (
            <li key={item.path} className={styles.item}>
              {last ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <>
                  <Link href={item.path} className={styles.link}>
                    {item.name}
                  </Link>
                  <span className={styles.sep} aria-hidden="true">
                    /
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
