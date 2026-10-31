import { Link } from "react-router-dom";
import { COMPANY, heading, body } from "../components/Navbar";

/* -------------------------------------------------------------------------
   ENG THINKS — Home page (Hero section)
   The Navbar is rendered once in main.jsx (outside <App />), so it is not
   included here. It also defines the brand colours (--ink, --accent).
   ------------------------------------------------------------------------- */

const FEATURES = [
  { label: "Accurate Engineering", icon: "target" },
  { label: "Precise Detailing", icon: "ruler" },
  { label: "Practical Solutions", icon: "check" },
];

/* ------------------------------ Small pieces ----------------------------- */

function Icon({ name, className = "h-5 w-5" }) {
  const p = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  if (name === "target")
    return (
      <svg {...p}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    );
  if (name === "ruler")
    return (
      <svg {...p}>
        <path d="M3 17 17 3l4 4L7 21z" />
        <path d="m7 13 2 2M10 10l2 2M13 7l2 2" />
      </svg>
    );
  return (
    <svg {...p}>
      <path d="M4 12.5 9.5 18 20 6.5" />
    </svg>
  );
}


/* --------------------- Hero visual: precast frame drawing ---------------- */

function PrecastDrawing() {
  return (
    <svg
      viewBox="0 0 600 560"
      role="img"
      aria-label="Technical drawing of a precast concrete frame with beams, columns, hollow-core slabs and a reinforcement section detail"
      className="h-auto w-full lg:h-full"
    >
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="var(--d)" strokeOpacity="0.09" />
        </pattern>
        <pattern id="grid-major" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M100 0H0V100" fill="none" stroke="var(--d)" strokeOpacity="0.2" />
        </pattern>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--d)" strokeOpacity="0.35" />
        </pattern>
        <clipPath id="detail-clip">
          <circle cx="498" cy="410" r="52" />
        </clipPath>
      </defs>

      <rect width="600" height="560" fill="url(#grid)" />
      <rect width="600" height="560" fill="url(#grid-major)" />

      {/* Ground */}
      <line x1="40" y1="490" x2="560" y2="490" stroke="var(--d)" strokeWidth="1.5" />
      <path d="M40 490l-12 12M80 490l-12 12M120 490l-12 12M160 490l-12 12M200 490l-12 12M240 490l-12 12M280 490l-12 12M320 490l-12 12M360 490l-12 12M400 490l-12 12M440 490l-12 12M480 490l-12 12M520 490l-12 12M560 490l-12 12" stroke="var(--d)" strokeOpacity="0.3" />

      {/* Frame (lines draw in once) */}
      <g fill="rgba(169,198,238,0.07)" stroke="var(--d)" strokeWidth="1.75" strokeLinejoin="round">
        <rect className="ss-draw" pathLength="1" x="128" y="470" width="86" height="20" />
        <rect className="ss-draw" pathLength="1" x="386" y="470" width="86" height="20" />
        <rect className="ss-draw" pathLength="1" x="152" y="200" width="38" height="270" />
        <rect className="ss-draw" pathLength="1" x="410" y="200" width="38" height="270" />
        <rect className="ss-draw" pathLength="1" x="112" y="328" width="376" height="48" />
        <rect className="ss-draw" pathLength="1" x="96" y="292" width="408" height="36" />
        <rect className="ss-draw" pathLength="1" x="112" y="158" width="376" height="48" />
        <rect className="ss-draw" pathLength="1" x="96" y="122" width="408" height="36" />
      </g>

      {/* Hollow-core voids */}
      <g fill="none" stroke="var(--d)" strokeOpacity="0.5" strokeWidth="1.25" className="ss-fill">
        {[120, 168, 216, 264, 312, 360, 408, 456].map((cx) => (
          <g key={cx}>
            <ellipse cx={cx + 12} cy="140" rx="15" ry="10" />
            <ellipse cx={cx + 12} cy="310" rx="15" ry="10" />
          </g>
        ))}
      </g>

      {/* Corbels */}
      <g fill="var(--accent)" className="ss-fill">
        <path d="M190 376h22l-22 24z" />
        <path d="M410 376h-22l22 24z" />
      </g>

      {/* Span dimension */}
      <g stroke="var(--d)" strokeWidth="1" fill="none" className="ss-fill">
        <path d="M171 520H429M171 510v20M429 510v20" />
        <path d="M171 520l8-4v8zM429 520l-8-4v8z" fill="var(--d)" />
      </g>
      <g className={`${body} ss-fill`} fill="#fff" fontSize="12" fontWeight="500" textAnchor="middle">
        <text x="300" y="525">6000</text>
      </g>

      {/* Height dimension */}
      <g stroke="var(--d)" strokeWidth="1" fill="none" className="ss-fill">
        <path d="M62 122V300M62 340V490M52 122h20M52 490h20" />
        <path d="M62 122l-4 8h8zM62 490l-4-8h8z" fill="var(--d)" />
      </g>
      <g className={`${body} ss-fill`} fill="#fff" fontSize="12" fontWeight="500">
        <text x="62" y="325" textAnchor="middle" transform="rotate(-90 62 320)">7200</text>
      </g>

      {/* Reinforcement section callout */}
      <g className="ss-fill">
        <line x1="429" y1="400" x2="448" y2="410" stroke="var(--accent)" strokeWidth="1.25" />
        <circle cx="429" cy="400" r="3.5" fill="var(--accent)" />
        <circle cx="498" cy="410" r="52" fill="var(--ink)" stroke="var(--d)" strokeWidth="1.75" />
        <g clipPath="url(#detail-clip)">
          <rect x="446" y="358" width="104" height="104" fill="url(#hatch)" />
        </g>
        <rect x="476" y="388" width="44" height="44" fill="var(--ink)" stroke="var(--d)" strokeWidth="1.5" />
        <rect x="481" y="393" width="34" height="34" fill="none" stroke="var(--accent)" strokeWidth="1.75" />
        {[[485, 397], [511, 397], [485, 423], [511, 423]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="3.6" fill="#fff" />
        ))}
      </g>
      <g className={`${body} ss-fill`} fill="#fff" fillOpacity="0.8" fontSize="11" fontWeight="500" textAnchor="middle">
        <text x="498" y="482">4-T20 + T10 @ 150</text>
      </g>

      {/* Title block */}
      <g className="ss-fill">
        <rect x="396" y="40" width="168" height="52" fill="rgba(255,255,255,0.05)" stroke="var(--d)" strokeOpacity="0.6" />
        <line x1="396" y1="62" x2="564" y2="62" stroke="var(--d)" strokeOpacity="0.6" />
        <rect x="396" y="40" width="5" height="52" fill="var(--accent)" />
        <text x="412" y="56" className={body} fontSize="10.5" fontWeight="600" fill="#fff">{COMPANY} / PRECAST FRAME A</text>
        <text x="412" y="80" className={body} fontSize="10.5" fill="#fff" fillOpacity="0.65">Shop drawing, Rev 03</text>
      </g>
    </svg>
  );
}

/* --------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[var(--ink)] pb-16 pt-32 sm:pt-36 lg:h-[100svh] lg:min-h-[560px] lg:pb-8 lg:pt-24"
    >
      {/* Blueprint grid + soft light */}
      <div
        aria-hidden="true"
        className="ss-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 40% at 85% 25%, rgba(229,115,26,0.16), transparent 70%), radial-gradient(40% 45% at 5% 100%, rgba(80,140,220,0.14), transparent 70%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl items-center lg:max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 xl:gap-16">
        {/* Left */}
        <div className="ss-rise max-w-2xl">
          <p className={`${body} mb-6 inline-flex items-center gap-2.5 lg:mb-4 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-2.5 pr-4 text-[11px] font-semibold tracking-[0.14em] text-white/80 backdrop-blur sm:text-xs lg:text-[11px]`}>
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            PRECISION ENGINEERING FOR MODERN CONSTRUCTION
          </p>

          <h1
            id="hero-heading"
            className={`${heading} text-[clamp(2.25rem,min(4vw,6vh),3.4rem)] font-extrabold leading-[1.03] tracking-[-0.03em] text-white`}
          >
            Fast-Track Structural Solutions for Modern Construction
          </h1>

          <p className={`${body} mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg lg:mt-4 lg:max-w-lg lg:text-[15px]`}>
            {COMPANY} delivers accurate structural design, precast detailing, and practical
            engineering solutions that help construction projects move faster, safer, and more
            efficiently.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-6">
            <Link
              to="/services"
              className={`${heading} group relative inline-flex min-h-[54px] lg:min-h-[46px] items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--accent)] px-8 text-sm lg:px-6 lg:text-[13px] font-semibold text-white transition-shadow duration-300 hover:shadow-[0_16px_32px_-12px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
            >
              <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-300 ease-out group-hover:translate-x-0" />
              <span className="relative transition-colors duration-300 group-hover:text-[var(--ink)]">Explore Our Services</span>
              <svg className="relative h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--ink)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              to="/contactus"
              className={`${heading} inline-flex min-h-[54px] lg:min-h-[46px] items-center justify-center rounded-full border border-white/25 bg-white/[0.04] px-8 text-sm lg:px-6 lg:text-[13px] font-semibold text-white backdrop-blur transition-colors duration-300 hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
            >
              Contact Us
            </Link>
          </div>

          <ul className={`${body} mt-12 grid max-w-xl grid-cols-1 gap-4 border-t border-white/12 pt-7 sm:grid-cols-3 lg:mt-7 lg:pt-5`}>
            {FEATURES.map((f) => (
              <li key={f.label} className="flex items-center gap-3 text-sm font-medium text-white/90 lg:text-[13px]">
                <span className="grid h-10 w-10 shrink-0 lg:h-9 lg:w-9 place-items-center rounded-xl border border-white/15 bg-white/[0.06] text-[var(--accent)]">
                  <Icon name={f.icon} />
                </span>
                {f.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: engineering drawing */}
        <div className="ss-reveal relative mx-auto w-full max-w-[560px] lg:w-fit lg:max-w-full lg:justify-self-center">
          <div className="relative rounded-3xl border border-white/15 bg-white/[0.04] p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-3 lg:aspect-[600/560] lg:h-[min(calc(100svh-12rem),520px)]">
            <div className="overflow-hidden rounded-2xl bg-[#0B1E36]/70 lg:h-full">
              <PrecastDrawing />
            </div>
          </div>

          {/* Floating data chips */}
          <div className={`${body} ss-float absolute -bottom-4 left-3 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white shadow-xl backdrop-blur-xl sm:-left-5`}>
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--accent)]">
              <Icon name="ruler" className="h-5 w-5 text-white" />
            </span>
            <span className="text-xs leading-tight">
              <span className="block font-semibold">Shop &amp; erection drawings</span>
              <span className="text-white/65">Detailed to site tolerance</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Page ---------------------------------- */

export default function Home() {
  return (
    <>
      <style>{`
        :root {
          --d: #A9C6EE;       /* blueprint line colour on dark */
        }

        .ss-grid {
          background-image:
            linear-gradient(to right, rgba(169,198,238,.09) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(169,198,238,.09) 1px, transparent 1px);
          background-size: 56px 56px;
        }

        @keyframes ss-rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        @keyframes ss-reveal { from { opacity: 0; transform: translateY(20px) scale(.98); } to { opacity: 1; transform: none; } }
        @keyframes ss-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes ss-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ss-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

        .ss-rise   { animation: ss-rise .9s cubic-bezier(.2,.7,.2,1) both; }
        .ss-reveal { animation: ss-reveal 1.1s cubic-bezier(.2,.7,.2,1) .2s both; }
        .ss-draw   { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ss-draw 1.6s ease-out .5s forwards; }
        .ss-fill   { animation: ss-fade .8s ease-out 1.4s both; }
        .ss-float  { animation: ss-float 8s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .ss-rise, .ss-reveal, .ss-fill, .ss-float { animation: none; }
          .ss-draw { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>

      <main>
        <Hero />
        <div className="bg-white min-h-[100vh]">
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold">Section 2</h2>
            <p>Content for section 2</p>
            <h4>Im thinking to place a sliding image gallery or video here which have white background</h4>
          </div>
        </div>
      </main>
    </>
  );
}