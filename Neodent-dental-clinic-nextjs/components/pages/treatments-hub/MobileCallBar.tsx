"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { ctaTelPhone } from "@/lib/site-data";

/* Fixed mobile call bar (same markup as before). While the header's own
   call button is on screen the bar slides away, so two identical red
   buttons are never visible together (global .mobile-bar[data-hidden]). */
export function MobileCallBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    const target = document.querySelector("[data-hub-primary-cta]");
    if (!bar || !target || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        bar.dataset.hidden = entry.isIntersecting ? "true" : "false";
      },
      { threshold: 0.6 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mobile-bar">
      <AppButton href={ctaTelPhone} variant="primary">
        <Phone size={14} /> Call Neodent <ArrowRight size={14} />
      </AppButton>
    </div>
  );
}
