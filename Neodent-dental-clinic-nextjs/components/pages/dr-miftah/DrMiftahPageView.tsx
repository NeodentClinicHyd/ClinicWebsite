import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { ctaTelPhone } from "@/lib/site-data";
import { DrMiftahHeader } from "./DrMiftahHeader";
import { DrMiftahProfile } from "./DrMiftahProfile";
import styles from "./DrMiftahPage.module.css";

/* ------------------------------------------------------------------
   /doctors/dr-miftah-ur-rahman page wrapper: the same chrome as before
   (Navbar transparent over the dark header, the page's sections, the
   sitewide Footer and the mobile call bar). Metadata and JSON-LD stay in
   app/doctors/dr-miftah-ur-rahman/page.tsx.
   ------------------------------------------------------------------ */

export function DrMiftahPageView() {
  return (
    <div
      className={`site ${styles.page}`}
      /* The global .site clips with overflow: hidden, which makes it a scroll
         container and stops scroll-driven animation from following the page.
         "clip" keeps the same clipping without it (same override as /about
         and /doctors). */
      style={{ overflowX: "clip", overflowY: "visible" }}
    >
      <Navbar overHero />
      <main>
        <DrMiftahHeader />
        <DrMiftahProfile />
      </main>
      <Footer />
      <div className="mobile-bar">
        <AppButton href={ctaTelPhone} variant="primary">
          <Phone size={14} /> Call Neodent <ArrowRight size={14} />
        </AppButton>
      </div>
    </div>
  );
}
