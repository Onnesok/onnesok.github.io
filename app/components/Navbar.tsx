"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import SiteSearch, { type SiteSearchControl } from "./SiteSearch";
import { profile } from "../data/profile";

const links = [
  ["Research", "research"],
  ["Projects", "projects"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Achievements", "achievements"],
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const menuDialog = useRef<HTMLDialogElement>(null);
  const searchControl = useRef<SiteSearchControl>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef("");
  const scrollLocked = useRef(false);
  const pathname = usePathname();

  const closeNavigation = useCallback(() => {
    if (!menuDialog.current?.open) return;
    menuDialog.current.close();
    if (scrollLocked.current) {
      document.body.style.overflow = previousOverflow.current;
      scrollLocked.current = false;
    }
    setOpen(false);
  }, []);

  function openNavigation() {
    if (menuDialog.current?.open) return;
    previousOverflow.current = document.body.style.overflow;
    scrollLocked.current = true;
    document.body.style.overflow = "hidden";
    menuDialog.current?.showModal();
    setOpen(true);
  }

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -65% 0px", threshold: 0 },
    );
    for (const id of ["home", ...links.map(([, id]) => id), "contact"]) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1025px)");
    const resize = () => {
      if (desktop.matches) closeNavigation();
    };
    desktop.addEventListener("change", resize);
    return () => desktop.removeEventListener("change", resize);
  }, [closeNavigation]);

  useEffect(
    () => () => {
      if (scrollLocked.current) {
        document.body.style.overflow = previousOverflow.current;
        scrollLocked.current = false;
      }
    },
    [],
  );

  const href = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);
  const current = (id: string) =>
    (pathname === "/" && active === id) ||
    (id === "projects" && pathname.startsWith("/projects")) ||
    (id === "achievements" && pathname.startsWith("/awards"));
  const navigationLinks = (mobile: boolean) =>
    links.map(([label, id]) => (
      <Link
        key={id}
        href={id === "projects" && pathname !== "/" ? "/projects/" : href(id)}
        onClick={closeNavigation}
        aria-current={current(id) ? "location" : undefined}
      >
        <span>{label}</span>
        {mobile && <ArrowUpRight size={22} aria-hidden="true" />}
      </Link>
    ));

  return (
    <>
      <header
        className={`site-header ${scrolled || open ? "is-scrolled" : ""}`}
      >
        <Link href="/" className="monogram" aria-label="Ratul Hasan home">
          <span className="brand-initials">RH</span>
          <span className="brand-name">Ratul Hasan</span>
        </Link>
        <nav
          className="main-nav"
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {navigationLinks(false)}
          <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
            CV <ArrowUpRight size={13} />
          </a>
        </nav>
        <div className="header-actions">
          <SiteSearch onOpen={closeNavigation} controllerRef={searchControl} />
          <Link href={href("contact")} className="header-contact">
            Let’s talk <ArrowUpRight size={15} />
          </Link>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={openNavigation}
          >
            <Menu size={21} />
          </button>
        </div>
      </header>
      <dialog
        ref={menuDialog}
        id="mobile-navigation"
        className="mobile-nav-dialog"
        aria-labelledby="mobile-menu-title"
        onCancel={(event) => {
          event.preventDefault();
          closeNavigation();
        }}
        onClose={() => {
          if (menuDialog.current?.open) return;
          if (scrollLocked.current) {
            document.body.style.overflow = previousOverflow.current;
            scrollLocked.current = false;
          }
          setOpen(false);
        }}
      >
        <div className="mobile-menu-header">
          <Link
            href="/"
            className="mobile-menu-brand"
            aria-label="Ratul Hasan home"
            onClick={closeNavigation}
          >
            RH<span>Ratul Hasan</span>
          </Link>
          <div className="mobile-menu-controls">
            <button
              className="mobile-menu-search"
              aria-label="Search site"
              onClick={() => searchControl.current?.open()}
            >
              <Search size={18} />
              <span>Search</span>
            </button>
            <button
              className="mobile-menu-close"
              aria-label="Close navigation"
              onClick={closeNavigation}
            >
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="mobile-menu-body">
          <h2 id="mobile-menu-title">Navigation</h2>
          <nav className="mobile-menu-links" aria-label="Mobile navigation">
            {navigationLinks(true)}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeNavigation}
            >
              <span>View CV</span>
              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
          </nav>
          <div className="mobile-menu-footer">
            <Link
              href={href("contact")}
              className="scene-button"
              onClick={closeNavigation}
            >
              Let’s talk <ArrowUpRight size={17} />
            </Link>
            <a href={`mailto:${profile.email}`} onClick={closeNavigation}>
              {profile.email}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
