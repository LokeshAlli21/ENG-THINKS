const VISION =
  "To become a trusted engineering consultancy recognized for excellence in precast structural design, innovation, and reliable technical solutions across the construction industry.";

const MISSION = [
  "Deliver accurate and economical structural designs.",
  "Provide high-quality detailing services with precision.",
  "Support clients with practical engineering solutions.",
  "Build long-term relationships through professionalism and reliability.",
  "Contribute to faster and more efficient construction practices.",
];

export default function Section3() {
  return (
    <section
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
      style={{ fontFamily: "Poppins, system-ui, sans-serif" }}
    >
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-5 lg:gap-8 lg:px-10">
        {/* Vision */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0B2545] p-8 text-white sm:p-10 lg:col-span-2">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative">
            <h2
              className="flex items-center gap-3 text-2xl font-bold sm:text-3xl"
              style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
            >
              <span
                className="h-7 w-1.5 rounded-full bg-orange-500"
                aria-hidden="true"
              />
              Our vision
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-200 sm:text-xl">
              {VISION}
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 lg:col-span-3">
          <h2
            className="flex items-center gap-3 text-2xl font-bold text-[#0B2545] sm:text-3xl"
            style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}
          >
            <span
              className="h-7 w-1.5 rounded-full bg-orange-500"
              aria-hidden="true"
            />
            Our mission
          </h2>

          <ul className="mt-6 divide-y divide-slate-200">
            {MISSION.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 py-4 text-base leading-relaxed text-slate-700 first:pt-0 last:pb-0"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-orange-500"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}