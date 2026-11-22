import React from "react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------
   Services.jsx  –  ENG THINKS  (route: /services)
   Stack: React + Tailwind CSS + React Router
   Palette: Navy #0B1F3A | Orange #F97316 | White | Light Grey #F3F4F6

   NOTE: Vision, Mission, Why Choose Us, Workflow and the Expertise
   list live on the Home page, so they are not repeated here.
   This page is the detailed view of every service, grouped by type.

   Fonts (add once to index.html <head> if not already there):
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
------------------------------------------------------------------- */

const heading = { fontFamily: "'Montserrat', sans-serif" };
const body = { fontFamily: "'Poppins', sans-serif" };

const groups = [
  {
    id: "design",
    label: "Design & Analysis",
    intro: "Engineering that sets the foundation of every precast project.",
    items: [
      {
        title: "Structural Design Consultancy",
        text: "Complete structural design for precast concrete elements.",
      },
      {
        title: "Structural Analysis",
        text: "Structural calculations and design verification based on applicable engineering standards.",
      },
      {
        title: "Customized Structural Solutions",
        text: "Design support for unique precast applications based on project requirements.",
      },
      {
        title: "Engineering Consultation",
        text: "Technical guidance throughout the project lifecycle.",
      },
    ],
  },
  {
    id: "drawings",
    label: "Drawings & Detailing",
    intro: "Clear, coordinated drawings for fabrication, production and site execution.",
    items: [
      {
        title: "Precast Detailing",
        text: "Preparation of detailed shop drawings and reinforcement drawings for precast components.",
      },
      {
        title: "Reinforcement Detailing",
        text: "Accurate reinforcement detailing for efficient fabrication and installation.",
      },
      {
        title: "Production Drawings",
        text: "Preparation of manufacturing drawings for precast production teams.",
      },
      {
        title: "Erection Drawings",
        text: "Detailed installation drawings for site execution.",
      },
    ],
  },
  {
    id: "estimation",
    label: "Estimation",
    intro: "Material quantities you can plan and budget around.",
    items: [
      {
        title: "Quantity Estimation",
        text: "Material quantity calculations and BOQ preparation.",
      },
    ],
  },
];

const ArrowIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M10.3 3.3a1 1 0 011.4 0l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L13.6 11H4a1 1 0 110-2h9.6l-3.3-3.3a1 1 0 010-1.4z"
      clipRule="evenodd"
    />
  </svg>
);

const Services = () => {
  // running number across all groups (01, 02, 03 ...)
  let counter = 0;

  return (
    <main className="bg-white text-slate-700 overflow-x-hidden" style={body}>
      {/* ---------------- PAGE HEADER ---------------- */}
      <section className="relative bg-[#0B1F3A] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute -top-24 -right-24 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28 lg:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs sm:text-sm tracking-wider uppercase text-orange-300">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Our Services
          </span>
          <h1
            className="mt-6 max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            style={heading}
          >
            Structural Design &amp;{" "}
            <span className="text-orange-500">Precast Detailing</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm sm:text-lg leading-relaxed text-slate-300">
            Technical support for precast concrete projects, from structural design and reinforcement
            detailing to production drawings, erection drawings and quantity estimation.
          </p>

          {/* anchor chips */}
          <div className="mt-8 flex flex-wrap gap-3">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="rounded-full border border-white/25 px-5 py-2 text-xs sm:text-sm font-medium text-white transition hover:border-orange-400 hover:bg-orange-500 hover:text-white"
              >
                {g.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SERVICE GROUPS ---------------- */}
      {groups.map((g, gi) => (
        <section
          key={g.id}
          id={g.id}
          className={`scroll-mt-20 py-16 sm:py-24 ${gi % 2 === 1 ? "bg-[#F3F4F6]" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-14">
            {/* group heading (sticky on desktop) */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <span className="inline-block text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
                  0{gi + 1}
                </span>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-[#0B1F3A]"
                  style={heading}
                >
                  {g.label}
                </h2>
                <div className="mt-4 h-1 w-16 rounded-full bg-orange-500" />
                <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">{g.intro}</p>
              </div>
            </div>

            {/* service cards */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5 sm:gap-6 content-start">
              {g.items.map((s) => {
                counter += 1;
                return (
                  <article
                    key={s.title}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 transition duration-300 hover:-translate-y-1.5 hover:border-orange-400 hover:shadow-2xl"
                  >
                    <span
                      className="absolute right-4 top-2 text-5xl sm:text-6xl font-extrabold text-slate-100 transition group-hover:text-orange-100"
                      style={heading}
                      aria-hidden="true"
                    >
                      {String(counter).padStart(2, "0")}
                    </span>
                    <div className="relative">
                      <div className="mb-5 h-1 w-10 rounded-full bg-orange-500 transition-all duration-300 group-hover:w-16" />
                      <h3 className="text-lg font-bold leading-snug text-[#0B1F3A]" style={heading}>
                        {s.title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">{s.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* ---------------- SCOPE NOTE ---------------- */}
      <section className="bg-white pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start rounded-2xl border border-orange-200 bg-orange-50 p-6 sm:p-8">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B1F3A] text-lg font-bold text-orange-500"
              style={heading}
            >
              i
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0B1F3A]" style={heading}>
                Note
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
                We provide design and detailing consultancy only. Manufacturing and installation are
                carried out by the client's selected vendors or contractors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="px-5 sm:px-8 pb-16 sm:pb-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1F3A] to-[#14315c] px-6 py-12 text-center text-white shadow-2xl sm:px-14 sm:py-16">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-500/25 blur-2xl" />
          <h2 className="relative text-2xl sm:text-4xl font-extrabold" style={heading}>
            Need engineering support for your project?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-300">
            Share your requirements and ENG THINKS will help you with the right structural design and
            detailing package.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contactus"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600 hover:shadow-lg"
            >
              Get Consultation
            </Link>
            <Link
              to="/aboutus"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              About ENG THINKS <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;