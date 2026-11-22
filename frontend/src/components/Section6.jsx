import { Link } from "react-router-dom";

/* ---------- Line-drawing icons (elevation / section sketches) ---------- */
const Icon = ({ children }) => (
  <svg
    viewBox="0 0 64 40"
    className="h-10 w-16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const icons = {
  boundary: (
    <Icon>
      <path d="M2 36H62" />
      <rect x="4" y="10" width="5" height="26" />
      <rect x="29" y="10" width="6" height="26" />
      <rect x="55" y="10" width="5" height="26" />
      <rect x="9" y="16" width="20" height="20" />
      <rect x="35" y="16" width="20" height="20" />
    </Icon>
  ),
  compound: (
    <Icon>
      <path d="M2 36H62" />
      <rect x="4" y="12" width="5" height="24" />
      <rect x="29" y="12" width="6" height="24" />
      <rect x="55" y="12" width="5" height="24" />
      <path d="M9 18H29M9 24H29M9 30H29M35 18H55M35 24H55M35 30H55" />
      <path d="M9 12L13 6L17 12L21 6L25 12M35 12L39 6L43 12L47 6L51 12" />
    </Icon>
  ),
  retaining: (
    <Icon>
      <path d="M2 36H62" />
      <path d="M22 4V32H50V36H18V4Z" />
      <path d="M26 8L32 14M26 16L32 22M26 24L32 30M38 8L44 14M38 16L44 22" strokeDasharray="2 3" />
    </Icon>
  ),
  wallPanel: (
    <Icon>
      <path d="M2 36H62" />
      <rect x="16" y="4" width="32" height="32" />
      <path d="M16 12H48M16 28H48" strokeDasharray="3 3" />
      <circle cx="24" cy="8" r="1.5" />
      <circle cx="40" cy="8" r="1.5" />
      <path d="M26 20H38" />
    </Icon>
  ),
  column: (
    <Icon>
      <path d="M2 36H62" />
      <rect x="18" y="31" width="28" height="5" />
      <rect x="26" y="6" width="12" height="25" />
      <rect x="20" y="2" width="24" height="4" />
    </Icon>
  ),
  beam: (
    <Icon>
      <path d="M2 36H62" />
      <rect x="6" y="18" width="6" height="18" />
      <rect x="52" y="18" width="6" height="18" />
      <rect x="12" y="14" width="40" height="10" />
      <path d="M16 19H48" strokeDasharray="3 3" />
    </Icon>
  ),
  slab: (
    <Icon>
      <path d="M2 36H62" />
      <rect x="6" y="20" width="6" height="16" />
      <rect x="52" y="20" width="6" height="16" />
      <rect x="4" y="14" width="56" height="6" />
      <path d="M10 17H54" strokeDasharray="2 3" />
    </Icon>
  ),
  stairs: (
    <Icon>
      <path d="M4 36H60" />
      <path d="M6 36V30H16V24H26V18H36V12H46V6H58V36" />
      <path d="M6 36L58 6" strokeDasharray="3 3" />
    </Icon>
  ),
  culvert: (
    <Icon>
      <path d="M2 36H62" />
      <rect x="10" y="6" width="44" height="30" />
      <rect x="19" y="14" width="26" height="22" />
    </Icon>
  ),
  manhole: (
    <Icon>
      <ellipse cx="32" cy="8" rx="16" ry="4" />
      <path d="M16 8V32C16 34.2 23.2 36 32 36C40.8 36 48 34.2 48 32V8" />
      <ellipse cx="32" cy="8" rx="9" ry="2" />
      <path d="M24 16H40M24 24H40" strokeDasharray="2 3" />
    </Icon>
  ),
  drainage: (
    <Icon>
      <path d="M2 36H62" />
      <path d="M10 8V30H54V8" />
      <path d="M18 8V24H46V8" />
      <path d="M18 8H10M54 8H46" />
    </Icon>
  ),
  utility: (
    <Icon>
      <path d="M2 36H62" />
      <rect x="14" y="14" width="36" height="22" />
      <rect x="10" y="9" width="44" height="5" />
      <path d="M24 24H40" />
      <path d="M32 9V4M26 4H38" />
    </Icon>
  ),
  custom: (
    <Icon>
      <path d="M32 3L58 14V28L32 37L6 28V14Z" strokeDasharray="3 3" />
      <path d="M6 14L32 25L58 14M32 25V37" />
    </Icon>
  ),
};

/* ---------- Content (from the company profile) ---------- */
const groups = [
  {
    title: "Walls",
    items: [
      { name: "Boundary walls", icon: icons.boundary },
      { name: "Compound walls", icon: icons.compound },
      { name: "Retaining walls", icon: icons.retaining },
    ],
  },
  {
    title: "Structural elements",
    items: [
      { name: "Wall panels", icon: icons.wallPanel },
      { name: "Columns", icon: icons.column },
      { name: "Beams", icon: icons.beam },
      { name: "Slabs", icon: icons.slab },
      { name: "Staircases", icon: icons.stairs },
    ],
  },
  {
    title: "Drainage and utilities",
    items: [
      { name: "Box culverts", icon: icons.culvert },
      { name: "Manholes", icon: icons.manhole },
      { name: "Drainage products", icon: icons.drainage },
      { name: "Utility structures", icon: icons.utility },
    ],
  },
  {
    title: "Made to your brief",
    items: [{ name: "Customized precast concrete elements", icon: icons.custom }],
  },
];

const gridBg = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
  backgroundSize: "32px 32px",
};

export default function Section6() {
  return (
    <section
      id="expertise"
      className="relative overflow-hidden bg-[#0B1F3A] text-white"
      style={gridBg}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + scope note */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Precast elements we design and detail
              </h2>

              <p className="mt-6 max-w-md text-base leading-relaxed text-slate-300">
                From a standard wall panel to a one-off structural element, we
                provide engineering and detailing support built around how
                precast components are produced and installed.
              </p>

              <div className="mt-8 max-w-md border-l-4 border-orange-500 bg-white/5 py-4 pl-5 pr-4">
                <p className="text-sm font-semibold text-white">Our scope</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">
                  We provide design and detailing consultancy only.
                  Manufacturing and installation are carried out by the
                  client&rsquo;s selected vendors or contractors.
                </p>
              </div>

              <Link
                to="/contactus"
                className="mt-10 inline-flex items-center rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A]"
              >
                Get consultation
              </Link>
            </div>
          </div>

          {/* Right: grouped element register */}
          <div className="space-y-10 lg:col-span-7">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="border-b border-white/15 pb-3 text-lg font-semibold text-white">
                  {group.title}
                </h3>

                <ul
                  className={`mt-5 grid gap-4 ${
                    group.items.length === 1
                      ? "grid-cols-1"
                      : "grid-cols-1 sm:grid-cols-2"
                  }`}
                >
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="group flex items-center gap-5 border border-white/15 bg-[#0B1F3A]/70 px-5 py-4 transition-colors hover:border-orange-500"
                    >
                      <span className="shrink-0 text-orange-400 transition-colors group-hover:text-orange-300">
                        {item.icon}
                      </span>
                      <span className="text-base font-medium text-slate-100">
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}