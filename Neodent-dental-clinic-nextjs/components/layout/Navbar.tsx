"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { clinicLocations, clinicTreatments, clinicLocationSlugs } from "@/lib/clinic-data";
import { navItems } from "@/lib/site-data";

type GroupId = "treatments" | "clinics" | "doctors";

const navigationGroups = [
  {
    id: "treatments",
    label: "Treatments",
    href: "/treatments",
    overview: "All treatments",
    links: clinicTreatments.map(({ id, title, href }) => ({ id, label: title, href })),
  },
  {
    id: "clinics",
    label: "Clinics",
    href: "/clinic",
    overview: "All clinics",
    links: clinicLocationSlugs.map((slug) => ({
      id: slug,
      label: clinicLocations[slug].name,
      href: `/clinic/${slug}`,
    })),
  },
  {
    id: "doctors",
    label: "Doctors",
    href: "/doctors",
    overview: "Our doctors",
    links: [
      {
        id: "dr-miftah-ur-rahman",
        label: "Dr. Md. Miftah Ur Rahman",
        href: "/doctors/dr-miftah-ur-rahman",
      },
    ],
  },
] as const;

const primaryLinks = navItems.filter((item) =>
  ["Home", "About", "Contact"].includes(item.label),
);

function pathIsCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

interface NavbarProps {
  /** Keep the bar transparent over a dark opening hero until scroll. */
  overHero?: boolean;
}

export function Navbar({ overHero = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<GroupId | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const groupButtonRefs = useRef<Partial<Record<GroupId, HTMLButtonElement | null>>>({});
  const mobileGroupButtonRefs = useRef<Partial<Record<GroupId, HTMLButtonElement | null>>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if ((openGroup || menuOpen) && !headerRef.current?.contains(event.target as Node)) {
        setOpenGroup(null);
        setMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || (!openGroup && !menuOpen)) return;
      event.preventDefault();
      if (openGroup) {
        setOpenGroup(null);
        const isMobile = window.matchMedia("(max-width: 900px)").matches;
        (isMobile
          ? mobileGroupButtonRefs.current[openGroup]
          : groupButtonRefs.current[openGroup]
        )?.focus();
      } else {
        setMenuOpen(false);
        mobileToggleRef.current?.focus();
      }
    };

    if (openGroup || menuOpen) {
      document.addEventListener("pointerdown", closeOnOutsidePointer);
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [openGroup, menuOpen]);

  // Internal pages use the solid header from the start for reliable contrast.
  const isInternalPage = pathname !== "/";
  const navScrolled = scrolled || (isInternalPage && !overHero);

  const closeMenus = () => {
    setMenuOpen(false);
    setOpenGroup(null);
  };

  const toggleGroup = (id: GroupId) => {
    setOpenGroup((current) => (current === id ? null : id));
  };

  const isGroupActive = (href: string) => pathIsCurrent(pathname, href);

  return (
    <header
      ref={headerRef}
      className={`nav ${navScrolled ? "scrolled" : ""}`}
      data-testid="navigation-header"
    >
      <div className="container nav-inner">
        <BrandLockup onClick={closeMenus} testId="link-home-brand" />

        <nav className="nav-links" aria-label="Primary navigation">
          {primaryLinks.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathIsCurrent(pathname, item.href) ? "active" : ""}
              aria-current={pathIsCurrent(pathname, item.href) ? "page" : undefined}
              data-testid={`link-nav-${item.label.toLowerCase()}`}
            >
              {item.label}
            </Link>
          ))}

          {navigationGroups.map((group) => {
            const expanded = openGroup === group.id;
            const active = isGroupActive(group.href);
            return (
              <div className={`nav-group ${expanded ? "open" : ""}`} key={group.id}>
                <button
                  ref={(node) => {
                    groupButtonRefs.current[group.id] = node;
                  }}
                  className={`nav-group-trigger ${active ? "active" : ""}`}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`desktop-${group.id}-panel`}
                  onClick={() => toggleGroup(group.id)}
                  data-testid={`button-nav-${group.id}`}
                >
                  {group.label}
                  <ChevronDown size={13} aria-hidden="true" />
                </button>
                {expanded && (
                  <div
                    className={`nav-dropdown nav-dropdown-${group.id}`}
                    id={`desktop-${group.id}-panel`}
                    aria-label={`${group.label} links`}
                  >
                    <Link
                      className="nav-dropdown-heading"
                      href={group.href}
                      onClick={closeMenus}
                    >
                      <span className="nav-dropdown-kicker">Explore</span>
                      <span className="nav-dropdown-title">{group.label}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                    <div className="nav-dropdown-links">
                      <Link href={group.href} onClick={closeMenus}>
                        {group.overview}
                        <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                      {group.links.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={closeMenus}
                          aria-current={pathIsCurrent(pathname, item.href) ? "page" : undefined}
                        >
                          {item.label}
                          <ArrowRight size={13} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {primaryLinks.slice(2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathIsCurrent(pathname, item.href) ? "active" : ""}
              aria-current={pathIsCurrent(pathname, item.href) ? "page" : undefined}
              data-testid={`link-nav-${item.label.toLowerCase()}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <AppButton href="/contact" variant="primary">
          Talk to Neodent
        </AppButton>

        <button
          ref={mobileToggleRef}
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            setMenuOpen((open) => !open);
            setOpenGroup(null);
          }}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <nav
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        inert={!menuOpen}
      >
        {primaryLinks.slice(0, 2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathIsCurrent(pathname, item.href) ? "active" : ""}
            aria-current={pathIsCurrent(pathname, item.href) ? "page" : undefined}
            onClick={closeMenus}
          >
            {item.label}
          </Link>
        ))}

        {navigationGroups.map((group) => {
          const expanded = openGroup === group.id;
          return (
            <div className={`mobile-nav-group ${expanded ? "open" : ""}`} key={group.id}>
              <button
                ref={(node) => {
                  mobileGroupButtonRefs.current[group.id] = node;
                }}
                type="button"
                className={`mobile-nav-group-trigger ${isGroupActive(group.href) ? "active" : ""}`}
                aria-expanded={expanded}
                aria-controls={`mobile-${group.id}-links`}
                onClick={() => toggleGroup(group.id)}
              >
                {group.label}
                <ChevronDown size={15} aria-hidden="true" />
              </button>
              {expanded && (
                <div className="mobile-nav-group-links" id={`mobile-${group.id}-links`}>
                  <Link href={group.href} onClick={closeMenus}>
                    {group.overview}
                  </Link>
                  {group.links.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={closeMenus}
                      aria-current={pathIsCurrent(pathname, item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {primaryLinks.slice(2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathIsCurrent(pathname, item.href) ? "active" : ""}
            aria-current={pathIsCurrent(pathname, item.href) ? "page" : undefined}
            onClick={closeMenus}
          >
            {item.label}
          </Link>
        ))}
        <AppButton href="/contact" variant="dark" onClick={closeMenus}>
          Talk to Neodent
        </AppButton>
      </nav>
    </header>
  );
}
