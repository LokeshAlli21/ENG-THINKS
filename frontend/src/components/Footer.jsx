import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/*
  If these already live in your Navbar/constants file, delete the three
  declarations below and import them instead, e.g.
  import { COMPANY, DEFAULT_NAVS } from "./Navbar";
*/
const COMPANY = "ENG THINKS";
const LOGO_SRC = "/logo.png";
const DEFAULT_NAVS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/aboutus" },
  { label: "Services", path: "/services" },
  { label: "Expertise", path: "/", section: "expertise" },
  { label: "Why Choose Us", path: "/", section: "section4" },
  { label: "Contact", path: "/contactus" },
];

const SERVICES = [
  { label: "Structural Design", path: "/services", section: "design" },
  { label: "Structural Analysis", path: "/services", section: "design" },
  { label: "Precast Detailing", path: "/services", section: "drawings" },
  { label: "Reinforcement Detailing", path: "/services", section: "drawings" },
  { label: "Shop & Erection Drawings", path: "/services", section: "drawings" },
  { label: "Production Drawings", path: "/services", section: "drawings" },
  { label: "BOQ & Quantity Estimation", path: "/services", section: "estimation" },
  { label: "Engineering Consultation", path: "/services", section: "design" },
  { label: "Custom Precast Engineering", path: "/services", section: "design" },
];

const PHONE_DISPLAY = "+91 XXXXXXXXXX";  // +91 77985 67781
const PHONE_TEL = "+91XXXXXXXXXX";  // +91 77985 67781

const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const focusRing =
  "rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400";

export default function Footer({
  company = COMPANY,
  logoSrc = LOGO_SRC,
  navs = DEFAULT_NAVS,
}) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer
      className="bg-[#0B2545] text-slate-300"
      style={{ fontFamily: "Poppins, system-ui, sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Link
              to="/"
              onClick={scrollTop}
              className={`inline-flex items-center gap-3 ${focusRing}`}
              aria-label={`${company} home`}
            >
              <img
                src={logoSrc}
                alt=""
                onError={(e) => (e.currentTarget.style.display = "none")}
                className="h-11 w-auto rounded bg-white p-1.5"
              />
              <span
                className="text-xl font-extrabold tracking-wide text-white"
                style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
              >
                {company}
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Structural design and precast detailing consultancy.
            </p>

            <div className="mt-5 space-y-1 text-sm">
              <p>Solapur, Maharashtra</p>
              <a
                href={`tel:${PHONE_TEL}`}
                className={`inline-block text-orange-400 hover:text-orange-300 ${focusRing}`}
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav className="lg:col-span-3" aria-label="Footer">
            <h3 className="mb-4 font-semibold text-white">Quick links</h3>
            <ul className="space-y-2.5 text-sm">
              {navs.map((n) => (
                <li key={n.path}>
                  <Link
                    to={n.path}
                    onClick={() => {
                      if (n.section) {
                        setTimeout(() => {
                          document.getElementById(n.section)?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }, 100);
                      } else {
                        scrollTop();
                      }
                    }}
                    className={`transition-colors hover:text-orange-400 ${focusRing}`}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          {/* <div className="lg:col-span-4">
            <Link to="/services" className="transition hover:text-orange-400">
                    <h3 className="mb-4 font-semibold text-white">Services</h3>
            </Link>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link to="/services" className="transition hover:text-orange-400">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
          <div className="lg:col-span-4">
  <h3 className="mb-4 font-semibold text-white">
    <Link
      to="/services"
      onClick={scrollTop}
      className={`transition-colors hover:text-orange-400 ${focusRing}`}
    >
      Services
    </Link>
  </h3>
  <ul className="space-y-2.5 text-sm">
    {SERVICES.map((s) => (
      <li key={s.label}>
        <Link
          to={s.path}
          onClick={() => {
            if (s.section) {
              setTimeout(() => {
                document.getElementById(s.section)?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            } else {
              scrollTop();
            }
          }}
          className={`transition-colors hover:text-orange-400 ${focusRing}`}
        >
          {s.label}
        </Link>
      </li>
    ))}
  </ul>
</div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {company}. All rights reserved.
          </p>
        </div>
      </div>

      {/* Fixed back-to-top button */}
      <button
        type="button"
        onClick={scrollTop}
        aria-label="Back to top"
        className={`fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-all duration-300 hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </footer>
  );
}