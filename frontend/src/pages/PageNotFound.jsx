import { Link, useNavigate } from 'react-router-dom'

const shortcuts = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/projects', label: 'Projects' },
  { path: '/contactus', label: 'Contact' },
]

function PageNotFound() {
  const navigate = useNavigate()

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 sm:py-12 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(99,102,241,0.16),_transparent_45%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-size-[44px_44px] mask-[radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />

      <section className="relative z-10 grid w-full max-w-5xl gap-6 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-medium tracking-[0.2em] text-sky-300 uppercase">
            Error 404
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-white sm:mt-5 sm:text-5xl md:text-6xl">
            This page drifted off the blueprint.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:mt-4 sm:text-lg lg:mx-0">
            The route you asked for does not exist. Head back to the homepage, or jump to a section that does.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <Link
              to="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-sky-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              Back to home
            </Link>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Go back
            </button>
          </div>

          <nav aria-label="Helpful links" className="mt-8">
            <p className="text-xs font-medium tracking-wider text-slate-400 uppercase">
              Try one of these
            </p>
            <ul className="mt-3 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {shortcuts.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="inline-flex min-h-10 items-center rounded-full border border-white/10 bg-slate-900/60 px-4 text-sm text-slate-200 transition hover:border-sky-400/40 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative aspect-square w-full max-w-[200px] sm:max-w-[300px] lg:max-w-[420px]">
            <div className="absolute inset-6 rounded-full bg-sky-500/20 blur-3xl" />
            <svg
              viewBox="0 0 320 320"
              role="img"
              aria-labelledby="not-found-art"
              className="relative h-full w-full drop-shadow-2xl"
            >
              <title id="not-found-art">Broken compass illustration</title>
              <circle cx="160" cy="160" r="118" fill="none" stroke="rgba(148,163,184,0.28)" strokeWidth="2" />
              <circle cx="160" cy="160" r="86" fill="rgba(15,23,42,0.72)" stroke="rgba(56,189,248,0.45)" strokeWidth="2" />
              <path
                d="M160 78 L172 148 L160 160 L148 148 Z"
                fill="#38bdf8"
              />
              <path
                d="M160 242 L148 172 L160 160 L172 172 Z"
                fill="#64748b"
              />
              <text
                x="160"
                y="172"
                textAnchor="middle"
                fill="white"
                fontSize="54"
                fontWeight="700"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
              >
                404
              </text>
            </svg>
          </div>
        </div>
      </section>
    </main>
  )
}

export default PageNotFound
