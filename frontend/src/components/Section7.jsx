import React from "react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------
   Section7.jsx  –  "What We Do / Our Services"
   Standalone, reusable section (used in AboutUs.jsx, can also be
   dropped into any other page).
   Stack: React + Tailwind CSS + React Router
   Fonts: Montserrat (headings) + Poppins (body) – loaded in index.html
------------------------------------------------------------------- */

const heading = { fontFamily: "'Montserrat', sans-serif" };

const services = [
  { title: "Structural Design Consultancy", text: "Complete structural design for precast concrete elements." },
  { title: "Precast Detailing", text: "Detailed shop drawings and reinforcement drawings for precast components." },
  { title: "Reinforcement Detailing", text: "Accurate reinforcement detailing for efficient fabrication and installation." },
  { title: "Structural Analysis", text: "Structural calculations and design verification based on applicable engineering standards." },
  { title: "Production Drawings", text: "Manufacturing drawings for precast production teams." },
  { title: "Erection Drawings", text: "Detailed installation drawings for site execution." },
  { title: "Quantity Estimation", text: "Material quantity calculations and BOQ preparation." },
  { title: "Engineering Consultation", text: "Technical guidance throughout the project lifecycle." },
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

const Section7 = () => {
  return (
    <section className="bg-[#F3F4F6] py-16 sm:py-24" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
            What We Do
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-[#0B1F3A]"
            style={heading}
          >
            Our Services
          </h2>
          <div className="h-1 w-16 bg-orange-500 rounded-full mt-4 mx-auto" />
          <p className="mt-5 text-sm sm:text-base text-slate-600">
            End-to-end engineering support for precast concrete structures.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-orange-400 hover:shadow-2xl"
            >
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 font-bold text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white"
                style={heading}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mb-2 text-base font-bold text-[#0B1F3A]" style={heading}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Link */}
        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-semibold text-[#0B1F3A] transition hover:text-orange-500"
          >
            View all services <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section7;