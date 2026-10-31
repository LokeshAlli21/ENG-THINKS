import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/* -------------------------------------------------------------------------
   ENG THINKS — Navbar (reusable on every page)

   USAGE (main.jsx)
     const navs = [
       { label: "Home", path: "/" },
       { label: "About Us", path: "/about" },
       ...
     ];
     <BrowserRouter>
       <Navbar navs={navs} />
       <App />
     </BrowserRouter>

   Optional prop: cta={{ label: "Get Consultation", path: "/contact" }}
   The active link is detected from the current route automatically.

   SETUP
   1. Tailwind CSS and react-router-dom must be installed (npm i react-router-dom).
   2. Add this to index.html <head> (Montserrat for headings, Inter for body):
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet" />
   3. Logo is loaded from /public/logo.png (change LOGO_SRC if needed).
   4. Brand colours (--ink, --accent) are defined in NAVBAR_CSS at the bottom
      of this file. Replace them with the exact colours from your logo.
   ------------------------------------------------------------------------- */

export const COMPANY = "ENG THINKS";
const LOGO_SRC = "/logo.png";

export const DEFAULT_NAVS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Expertise", path: "/expertise" },
  { label: "Why Choose Us", path: "/why-choose-us" },
  { label: "Contact", path: "/contactus" },
];

export const heading = "font-['Montserrat',sans-serif]";
export const body = "font-['Inter',sans-serif]";

/* Brand variables + smooth anchor scrolling (shared by every page that uses the Navbar) */
const NAVBAR_CSS = `
  :root {
    /* Replace with exact colours from the ENG THINKS logo */
    --ink: #0A1A30;     /* deep structural navy */
    --accent: #F0791F;  /* accent for CTAs and highlights */
  }
  html { scroll-behavior: smooth; scroll-padding-top: 96px; }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
  }
`;

function Logo() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className={`${heading} text-lg font-extrabold tracking-tight text-[var(--ink)]`}>
        ENG <span className="text-[var(--accent)]">THINKS</span>
      </span>
    );
  }
  return (
    <img
      src={LOGO_SRC}
      alt={COMPANY}
      width="220"
      height="64"
      onError={() => setFailed(true)}
      className="h-11 w-auto object-contain sm:h-12 lg:h-14"
    />
  );
}


/* ------------------------------- Navbar ---------------------------------- */

export default function Navbar({
  navs = DEFAULT_NAVS,
  cta = { label: "Get Consultation", path: "/contactus" },
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On every route change: close the mobile menu and start the new page at the top
  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);
  const isActive = (path) =>
    path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(path + "/");

  return (
    <>
      <style>{NAVBAR_CSS}</style>
    <header
      className={`fixed inset-x-0 z-50 px-3 transition-all duration-300 sm:px-6 ${
        scrolled ? "top-2" : "top-3 sm:top-5"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border pl-4 pr-2 transition-all duration-300 sm:pl-6 ${
          scrolled
            ? "border-white/60 bg-white/85 py-1 shadow-[0_12px_40px_-12px_rgba(7,17,31,0.45)] backdrop-blur-xl"
            : "border-white/40 bg-white/95 py-1.5 shadow-[0_20px_50px_-20px_rgba(7,17,31,0.5)]"
        }`}
      >
        <Link
          to="/"
          onClick={closeMenu}
          aria-label={`${COMPANY} home`}
          className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          <Logo />
        </Link>

        {/* Desktop links */}
        <ul className={`${body} hidden items-center gap-0.5 lg:flex`}>
          {navs.map((n) => {
            const current = isActive(n.path);
            return (
              <li key={n.path}>
                <Link
                  to={n.path}
                  aria-current={current ? "page" : undefined}
                  className={`block rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
                    current
                      ? "bg-[var(--ink)] text-white"
                      : "text-[var(--ink)]/70 hover:bg-[var(--ink)]/[0.06] hover:text-[var(--ink)]"
                  }`}
                >
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <Link
            to={cta.path}
            className={`${heading} group relative hidden items-center gap-2 overflow-hidden rounded-full bg-[var(--accent)] px-5 py-2.5 text-[13px] font-semibold text-white transition-shadow duration-300 hover:shadow-[0_10px_24px_-8px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] sm:inline-flex`}
          >
            <span className="absolute inset-0 -translate-x-full bg-[var(--ink)] transition-transform duration-300 ease-out group-hover:translate-x-0" />
            <span className="relative">{cta.label}</span>
            <svg className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid h-11 w-11 place-items-center rounded-full bg-[var(--ink)]/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] lg:hidden"
          >
            <span className={`absolute h-0.5 w-5 bg-[var(--ink)] transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-5 bg-[var(--ink)] transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute h-0.5 w-5 bg-[var(--ink)] transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`mx-auto mt-2 grid max-w-6xl transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-3xl bg-white/95 shadow-[0_24px_50px_-20px_rgba(7,17,31,0.5)] backdrop-blur-xl">
          <ul className={`${body} p-3`}>
            {navs.map((n) => (
              <li key={n.path}>
                <Link
                  to={n.path}
                  onClick={closeMenu}
                  tabIndex={open ? 0 : -1}
                  aria-current={isActive(n.path) ? "page" : undefined}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium ${
                    isActive(n.path) ? "bg-[var(--ink)] text-white" : "text-[var(--ink)]"
                  }`}
                >
                  {n.label}
                  {isActive(n.path) && <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-3 pb-3">
            <Link
              to={cta.path}
              onClick={closeMenu}
              tabIndex={open ? 0 : -1}
              className={`${heading} block rounded-full bg-[var(--accent)] px-5 py-3.5 text-center text-sm font-semibold text-white`}
            >
              {cta.label}
            </Link>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}