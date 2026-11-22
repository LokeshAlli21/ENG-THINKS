import React from "react";
import { Link } from "react-router-dom";
import Section7 from "../components/Section7";

/* ------------------------------------------------------------------
   AboutUs.jsx  –  ENG THINKS
   Stack: React + Tailwind CSS + React Router
   Palette: Navy #0B1F3A | Orange #F97316 | White | Light Grey #F3F4F6

   NOTE: Vision, Mission, Why Choose Us, Workflow and the Expertise
   list already live on the Home page, so they are intentionally NOT
   repeated here. This page covers: company story, services overview,
   who we serve, commitment and strengths.

   Fonts (add once to index.html <head> if not already there):
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
------------------------------------------------------------------- */

const heading = { fontFamily: "'Montserrat', sans-serif" };
const body = { fontFamily: "'Poppins', sans-serif" };

const facts = [
  { label: "Established", value: "14 April 2026" },
  { label: "Based in", value: "Solapur, Maharashtra" },
  { label: "Focus", value: "Precast concrete engineering" },
  { label: "Service model", value: "Design & detailing consultancy" },
];

const projectTypes = ["Residential", "Commercial", "Industrial", "Infrastructure"];

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

const clients = [
  "Precast Concrete Manufacturers",
  "Builders & Developers",
  "Civil Contractors",
  "Structural Consultants",
  "Architects",
  "Infrastructure Companies",
  "Government Contractors",
  "Industrial Project Consultants",
];

const commitments = [
  "Technically accurate",
  "Practical and constructible",
  "Cost-effective",
  "Delivered on time",
  "Fully coordinated",
  "Client-focused",
];

const strengths = [
  "Specialized in precast concrete engineering",
  "Experienced structural detailing",
  "Customized design solutions",
  "Fast turnaround time",
  "Technical excellence",
  "Engineering precision",
  "Responsive client support",
  "Cost-conscious design approach",
  "Commitment to quality documentation",
];

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
      clipRule="evenodd"
    />
  </svg>
);

const ArrowIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M10.3 3.3a1 1 0 011.4 0l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L13.6 11H4a1 1 0 110-2h9.6l-3.3-3.3a1 1 0 010-1.4z"
      clipRule="evenodd"
    />
  </svg>
);

const SectionHeader = ({ eyebrow, title, subtitle, light = false, center = true }) => (
  <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-10 sm:mb-14`}>
    <span className="inline-block text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
      {eyebrow}
    </span>
    <h2
      className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight ${
        light ? "text-white" : "text-[#0B1F3A]"
      }`}
      style={heading}
    >
      {title}
    </h2>
    <div className={`h-1 w-16 bg-orange-500 rounded-full mt-4 ${center ? "mx-auto" : ""}`} />
    {subtitle && (
      <p className={`mt-5 text-sm sm:text-base ${light ? "text-slate-300" : "text-slate-600"}`}>{subtitle}</p>
    )}
  </div>
);

const AboutUs = () => {
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
            About Us
          </span>
          <h1
            className="mt-6 max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            style={heading}
          >
            Engineering Expertise.{" "}
            <span className="text-orange-500">Practical Solutions.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm sm:text-lg leading-relaxed text-slate-300">
            ENG THINKS is an engineering consultancy that turns project concepts into accurate,
            constructible precast designs.
          </p>
        </div>
      </section>

      {/* ---------------- OUR STORY ---------------- */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-3">
            <SectionHeader eyebrow="Who We Are" title="A precast-focused engineering consultancy" center={false} />
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-600">
              <p>
                ENG THINKS is a professional engineering consultancy specializing in precast concrete
                structural design, detailing, and technical support for residential, commercial,
                industrial, and infrastructure projects.
              </p>
              <p>
                We partner with precast manufacturers, contractors, developers, architects, and project
                consultants to provide accurate engineering solutions that enable faster, safer, and
                more efficient construction.
              </p>
              <p>
                Our expertise lies in transforming project concepts into detailed engineering drawings
                and practical precast solutions that comply with industry standards while optimizing
                structural performance and project costs.
              </p>
              <p>
                Whether it's a standard precast component or a customized structural element, our focus
                is on delivering technically sound designs, precise detailing, and dependable
                engineering support throughout every stage of the project.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {projectTypes.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs sm:text-sm font-medium text-orange-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-[#F3F4F6] p-5 transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B1F3A] text-lg font-bold text-orange-500"
                  style={heading}
                >
                  0{i + 1}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">{f.label}</p>
                  <p className="text-base font-bold text-[#0B1F3A]" style={heading}>
                    {f.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SERVICES OVERVIEW ---------------- */}
      <Section7 />

      {/* ---------------- WHO WE SERVE ---------------- */}
      <section className="bg-[#0B1F3A] py-16 sm:py-24 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <SectionHeader eyebrow="Our Clients" title="Who We Work With" light />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {clients.map((c) => (
              <div
                key={c}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition hover:border-orange-400 hover:bg-white/10"
              >
                <CheckIcon className="h-5 w-5 shrink-0 text-orange-500" />
                <span className="text-sm sm:text-base font-medium">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- COMMITMENT + STRENGTHS ---------------- */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="rounded-3xl bg-[#0B1F3A] p-7 sm:p-10 text-white shadow-xl">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Our Commitment
            </span>
            <h3 className="mt-3 text-xl sm:text-2xl font-bold" style={heading}>
              Engineering solutions that are
            </h3>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {commitments.map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm sm:text-base">
                  <CheckIcon className="h-5 w-5 shrink-0 text-orange-500" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-slate-300">
              Our goal is to simplify precast construction through dependable engineering expertise
              and professional consultancy services.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-7 sm:p-10 shadow-xl">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Our Strengths
            </span>
            <h3 className="mt-3 text-xl sm:text-2xl font-bold text-[#0B1F3A]" style={heading}>
              What we bring to every project
            </h3>
            <ul className="mt-6 space-y-3">
              {strengths.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm sm:text-base text-slate-600">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="px-5 sm:px-8 pb-16 sm:pb-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1F3A] to-[#14315c] px-6 py-12 text-center text-white shadow-2xl sm:px-14 sm:py-16">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-500/25 blur-2xl" />
          <h2 className="relative text-2xl sm:text-4xl font-extrabold" style={heading}>
            Have a precast project in mind?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-300">
            Talk to ENG THINKS for structural design, precast detailing and engineering consultancy.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contactus"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600 hover:shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              to="/services"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Explore Our Services <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;