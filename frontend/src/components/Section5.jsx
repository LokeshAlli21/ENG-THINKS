const STEPS = [
  {
    title: "Project discussion",
    text: "Understanding client requirements and project scope.",
  },
  {
    title: "Structural analysis",
    text: "Reviewing loads, structural systems, and design criteria.",
  },
  {
    title: "Design development",
    text: "Preparing structural calculations and conceptual layouts.",
  },
  {
    title: "Detailed drawings",
    text: "Developing detailed structural, reinforcement, and shop drawings.",
  },
  {
    title: "Client review",
    text: "Design review and incorporation of feedback.",
  },
  {
    title: "Final submission",
    text: "Delivery of approved engineering documents and detailing package.",
  },
  {
    title: "Ongoing technical support",
    text: "Engineering assistance during manufacturing and site installation, as required.",
  },
];

const heading = { fontFamily: "Montserrat, system-ui, sans-serif" };

export default function Section5() {
  return (
    <section
      className="bg-white py-16 sm:py-20 lg:py-24"
      style={{ fontFamily: "Poppins, system-ui, sans-serif" }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* Heading */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2
              className="text-3xl font-bold text-[#0B2545] sm:text-4xl"
              style={heading}
            >
              Our workflow
            </h2>
            <div className="mt-5 h-1 w-16 rounded-full bg-orange-500" />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-slate-600">
              From the first discussion to site installation, every project
              follows the same seven steps.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <ol className="lg:col-span-8">
          {STEPS.map((step, i) => {
            const isFirstOrMiddle = i < STEPS.length - 1;
            const isLast = !isFirstOrMiddle;
            return (
              <li
                key={step.title}
                className={`relative flex gap-5 sm:gap-7 ${
                  isLast ? "" : "pb-10"
                }`}
              >
                {/* Connecting line */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute left-6 top-12 bottom-0 w-px -translate-x-1/2 bg-slate-300"
                  />
                )}

                {/* Step number */}
                <div
                  className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${
                    isLast
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-[#0B2545] bg-white text-[#0B2545]"
                  }`}
                  style={heading}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="pt-1.5">
                  <h3
                    className="text-lg font-semibold text-[#0B2545] sm:text-xl"
                    style={heading}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
                    {step.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}