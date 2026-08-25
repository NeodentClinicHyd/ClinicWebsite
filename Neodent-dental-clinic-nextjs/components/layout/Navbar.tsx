"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { navItems } from "@/lib/site-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On internal pages, force scrolled state for dark text visibility
  const isInternalPage = pathname !== "/";
  const navScrolled = scrolled || isInternalPage;

  const closeMenu = () => setMenuOpen(false);

  // Check if a nav item is active
  const isActive = (href: string) => {
    // Exact match for routes
    if (href.startsWith("/")) {
      return pathname === href;
    }
    // Hash anchor active only on homepage
    if (pathname === "/" && href.startsWith("#")) {
      // Could check scroll position here for homepage sections
      // For now, no active state for hash anchors
      return false;
    }
    return false;
  };

  return (
    <header
      className={`nav ${navScrolled ? "scrolled" : ""}`}
      data-testid="navigation-header"
    >
      <div className="container nav-inner">
        <BrandLockup onClick={closeMenu} testId="link-home-brand" />
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
              data-testid={`link-nav-${item.label.toLowerCase()}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <AppButton href="/contact" variant="primary">
          Talk to NeoDent
        </AppButton>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? "active" : ""}
            onClick={closeMenu}
            data-testid={`link-mobile-${item.label.toLowerCase()}`}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
        <AppButton href="/contact" variant="dark" onClick={closeMenu}>
          Talk to NeoDent
        </AppButton>
      </div>
    </header>
  );
}
