const REASONS = [
    {
      title: "Specialized precast engineering",
      text: "Focused expertise in precast concrete structural systems.",
      paths: ["M12 2 2 7l10 5 10-5-10-5Z", "m2 17 10 5 10-5", "m2 12 10 5 10-5"],
    },
    {
      title: "Accurate detailing",
      text: "Clear, coordinated drawings that reduce site errors and improve execution.",
      circle: true,
      paths: ["m9 12 2 2 4-4"],
    },
    {
      title: "Customized engineering",
      text: "Every project is designed to its specific structural and architectural requirements.",
      paths: [
        "M4 21v-7", "M4 10V3", "M12 21v-9", "M12 8V3", "M20 21v-5", "M20 12V3",
        "M1 14h6", "M9 8h6", "M17 16h6",
      ],
    },
    {
      title: "Cost optimization",
      text: "Efficient designs that reduce material usage while maintaining structural safety.",
      paths: ["M22 17l-8.5-8.5-5 5L2 7", "M16 17h6v-6"],
    },
    {
      title: "Timely delivery",
      text: "Design packages delivered within the agreed project timelines.",
      circle: true,
      paths: ["M12 6v6l4 2"],
    },
    {
      title: "Technical support",
      text: "Continuous engineering assistance during design review and project execution.",
      paths: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"],
    },
    {
      title: "Professional approach",
      text: "Transparent communication and client-focused service throughout the project.",
      paths: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", "m9 12 2 2 4-4"],
    },
  ];
  
  const heading = { fontFamily: "Montserrat, system-ui, sans-serif" };
  
  function Icon({ item, size = 24 }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {item.circle && <circle cx="12" cy="12" r="10" />}
        {item.paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    );
  }
  
  export default function Section4() {
    return (
      <section
        id="section4"
        className="relative overflow-hidden bg-[#0B2545] py-16 text-white sm:py-20 lg:py-28"
        style={{ fontFamily: "Poppins, system-ui, sans-serif" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "linear-gradient(to bottom, black, transparent 90%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 90%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl"
        />
  
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
          {/* Heading */}
          <div className="mb-10 max-w-2xl lg:mb-14">
            <h2
              className="text-3xl font-bold sm:text-4xl lg:text-5xl"
              style={heading}
            >
              Why choose us
            </h2>
            <div className="mt-5 h-1 w-16 rounded-full bg-orange-500" />
            <p className="mt-6 text-base leading-relaxed text-slate-300">
              Engineering and detailing support built around how precast
              components are actually produced and installed.
            </p>
          </div>
  
          {/* Rows */}
          <ul className="border-t border-white/15">
            {REASONS.map((r) => (
              <li
                key={r.title}
                className="group relative grid items-center gap-4 border-b border-white/15 px-2 py-6 transition-colors duration-300 hover:bg-white/[0.04] sm:px-4 md:grid-cols-12 md:gap-8 md:py-7"
              >
                {/* Orange hover marker */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-orange-500 transition-transform duration-300 group-hover:scale-y-100 motion-reduce:transition-none"
                />
  
                <div className="flex items-center gap-4 md:col-span-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/20 text-orange-400 transition-colors duration-300 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white">
                    <Icon item={r} />
                  </div>
                  <h3
                    className="text-lg font-semibold sm:text-xl"
                    style={heading}
                  >
                    {r.title}
                  </h3>
                </div>
  
                <p className="text-sm leading-relaxed text-slate-300 md:col-span-7 md:text-base">
                  {r.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }