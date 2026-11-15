import React, { useCallback, useEffect, useRef, useState } from 'react'

/* ------------------------------------------------------------------
   MEDIA FOLDERS (paths from the public folder, WITHOUT "public")
------------------------------------------------------------------- */
const IMG = '/media'
const VID = '/media'

/* ------------------------------------------------------------------
   MEDIA LIST: reorder, add or remove items here.
   - type: 'image' or 'video'
   - src: file path (case-sensitive, must match the real filename)
   - poster: optional preview image for a video
   - title / caption: optional text shown with the slide
------------------------------------------------------------------- */
const MEDIA_ITEMS = [
  // { type: 'video', src: `${VID}/Beam.mp4`, title: 'Beam Design', caption: 'Accurate beam design and detailing.' },
  { type: 'image', src: `${IMG}/SLAB_1.png`, title: 'Slab Detailing', caption: 'Precise slab layouts for faster construction.' },
  { type: 'image', src: `${IMG}/SLAB_2.png`, title: 'Slab Detailing', caption: 'Clear drawings that reduce site errors.' },
  // { type: 'video', src: `${VID}/SLAB.mp4`, title: 'Slab Walkthrough', caption: 'From design to detailing.' },
  { type: 'image', src: `${IMG}/SLAB_3.png`, title: 'Slab Detailing', caption: 'Practical solutions for modern construction.' },
  { type: 'image', src: `${IMG}/SLAB_4.png`, title: 'Slab Detailing', caption: 'Built for speed, safety and efficiency.' },
  // { type: 'video', src: `${VID}/STAIRCASE.mp4`, title: 'Staircase Design', caption: 'Structural staircase solutions.' },
  { type: 'image', src: `${IMG}/STAIRCASE_1.png`, title: 'Staircase Detailing', caption: 'Accurate staircase design and reinforcement.' },
  { type: 'image', src: `${IMG}/STAIRCASE_2.png`, title: 'Staircase Detailing', caption: 'Practical engineering that moves projects forward.' },
]

const IMAGE_DURATION = 2000 // ms each image stays on screen
const SWIPE_THRESHOLD = 50 // px
const ERROR_SKIP_DELAY = 2000 // ms before skipping a video that failed to load
const SLIDE_MS = 800 // laptop slide transition length

/* Laptop (1024px and up): new slide enters from the right, old one exits left.
   Going back reverses it. Small screens use a soft fade instead. */
const SLIDE_CSS = `
@media (min-width: 1024px) {
  @keyframes s2-enter-right { from { transform: translate3d(100%,0,0) } to { transform: translate3d(0,0,0) } }
  @keyframes s2-exit-left   { from { transform: translate3d(0,0,0) }    to { transform: translate3d(-100%,0,0) } }
  @keyframes s2-enter-left  { from { transform: translate3d(-100%,0,0) } to { transform: translate3d(0,0,0) } }
  @keyframes s2-exit-right  { from { transform: translate3d(0,0,0) }    to { transform: translate3d(100%,0,0) } }
  .s2-enter-right { animation: s2-enter-right ${SLIDE_MS}ms cubic-bezier(.77,0,.18,1) both }
  .s2-exit-left   { animation: s2-exit-left   ${SLIDE_MS}ms cubic-bezier(.77,0,.18,1) both }
  .s2-enter-left  { animation: s2-enter-left  ${SLIDE_MS}ms cubic-bezier(.77,0,.18,1) both }
  .s2-exit-right  { animation: s2-exit-right  ${SLIDE_MS}ms cubic-bezier(.77,0,.18,1) both }
}
@media (prefers-reduced-motion: reduce) {
  .s2-enter-right, .s2-exit-left, .s2-enter-left, .s2-exit-right { animation: none !important }
}
`

const Chevron = ({ dir }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d={dir === 'prev' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
  </svg>
)

function Section2() {
  const total = MEDIA_ITEMS.length
  // index = current slide, prev = slide sliding out, dir = 1 (forward) or -1 (back)
  const [state, setState] = useState({ index: 0, prev: null, dir: 1 })
  const [inView, setInView] = useState(true)
  const [failed, setFailed] = useState({})

  const { index, prev: prevIndex, dir } = state

  const sectionRef = useRef(null)
  const videoRefs = useRef([])
  const touchStartX = useRef(null)

  const active = MEDIA_ITEMS[index]
  const activeFailed = active?.type === 'video' && failed[active.src]

  const goTo = useCallback(
    (target, direction) =>
      setState((s) => {
        const i = (target + total) % total
        if (i === s.index) return s
        return { index: i, prev: s.index, dir: direction ?? (i > s.index ? 1 : -1) }
      }),
    [total]
  )
  const next = useCallback(() => goTo(state.index + 1, 1), [goTo, state.index])
  const prev = useCallback(() => goTo(state.index - 1, -1), [goTo, state.index])

  // Only pauses while the section is scrolled out of view; resumes when it returns
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Images advance on a timer
  useEffect(() => {
    if (!active || active.type !== 'image' || !inView || total < 2) return
    const t = setTimeout(next, IMAGE_DURATION)
    return () => clearTimeout(t)
  }, [index, active, inView, next, total])

  // Only the active video plays
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      if (i === index && inView && !failed[MEDIA_ITEMS[i].src]) {
        video.play().catch(() => {})
      } else {
        video.pause()
        if (i !== index && i !== prevIndex) video.currentTime = 0
      }
    })
  }, [index, prevIndex, inView, failed])

  // Skip a video that failed to load
  useEffect(() => {
    if (!activeFailed || total < 2) return
    const t = setTimeout(next, ERROR_SKIP_DELAY)
    return () => clearTimeout(t)
  }, [activeFailed, next, total])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(diff) > SWIPE_THRESHOLD) diff < 0 ? next() : prev()
    touchStartX.current = null
  }

  if (total === 0) return null

  // Laptop slide animation classes (no effect below 1024px)
  const slideClass = (i) => {
    if (i === index) return prevIndex === null ? '' : dir === 1 ? 's2-enter-right' : 's2-enter-left'
    if (i === prevIndex) return dir === 1 ? 's2-exit-left' : 's2-exit-right'
    return 'lg:hidden'
  }

  const smallArrow =
    'absolute top-1/2 -translate-y-1/2 z-20 grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 text-gray-900 shadow-md hover:bg-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:hidden'
  const bigArrow =
    'grid place-items-center w-14 h-14 rounded-full bg-white/15 text-white backdrop-blur-md ring-1 ring-white/25 hover:bg-white/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-16 sm:py-24 lg:py-0 lg:h-[100dvh] lg:overflow-hidden lg:bg-neutral-950 lg:text-white outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Project media gallery"
    >
      <style>{SLIDE_CSS}</style>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:h-full lg:max-w-none lg:px-0">
        {/* Heading (small screens) */}
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-14 lg:hidden">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-gray-900">
            Our work in action
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-500">
            A glimpse of the structural and precast projects we deliver.
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden rounded-2xl bg-gray-50 ring-1 ring-gray-200 lg:h-full lg:rounded-none lg:bg-neutral-950 lg:ring-0">
          <div className="relative aspect-video w-full lg:aspect-auto lg:h-full">
            {MEDIA_ITEMS.map((item, i) => (
              <div
                key={item.src}
                className={`absolute inset-0 will-change-transform transition-opacity duration-500 ease-in-out ${slideClass(i)} ${
                  i === index ? 'opacity-100 z-10' : 'opacity-0 lg:opacity-100 z-0'
                }`}
                aria-hidden={i !== index}
              >
                {item.type === 'video' ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el
                      if (el) el.muted = true
                    }}
                    src={item.src}
                    poster={item.poster}
                    className="w-full h-full object-contain lg:object-cover"
                    muted
                    playsInline
                    preload={i === index || i === (index + 1) % total ? 'auto' : 'none'}
                    loop={total === 1}
                    onError={() => {
                      console.error(`Video failed to load: ${item.src}`)
                      setFailed((f) => ({ ...f, [item.src]: true }))
                    }}
                    onEnded={() => total > 1 && next()}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title || `Slide ${i + 1}`}
                    className="w-full h-full object-contain lg:object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                )}
              </div>
            ))}

            {/* Laptop: readability gradients */}
            <div className="hidden lg:block pointer-events-none absolute inset-x-0 top-0 z-20 h-44 bg-gradient-to-b from-black/60 to-transparent" />
            <div className="hidden lg:block pointer-events-none absolute inset-x-0 bottom-0 z-20 h-72 bg-gradient-to-t from-black/75 to-transparent" />

            {/* Laptop: heading */}
            <div className="hidden lg:block absolute top-0 inset-x-0 z-30 px-16 pt-12 pointer-events-none">
              <h2 className="text-3xl font-semibold tracking-tight">Our work in action</h2>
              <p className="mt-1 max-w-md text-base text-white/70">
                A glimpse of the structural and precast projects we deliver.
              </p>
            </div>

            {activeFailed && (
              <div className="absolute inset-0 z-30 grid place-items-center bg-gray-50 lg:bg-neutral-950 px-6 text-center">
                <p className="text-gray-500 lg:text-white/70 text-sm sm:text-base">
                  This video can’t be played. Moving to the next slide.
                </p>
              </div>
            )}

            {/* Small screens: side arrows */}
            {total > 1 && (
              <>
                <button onClick={prev} aria-label="Previous slide" className={`${smallArrow} left-3 sm:left-5`}>
                  <Chevron dir="prev" />
                </button>
                <button onClick={next} aria-label="Next slide" className={`${smallArrow} right-3 sm:right-5`}>
                  <Chevron dir="next" />
                </button>
              </>
            )}

            {/* Laptop: caption, dots and arrows */}
            <div className="hidden lg:flex absolute bottom-0 inset-x-0 z-30 items-end justify-between gap-6 px-16 pb-12">
              <div className="min-w-0">
                {active.title && (
                  <h3 className="text-5xl font-semibold tracking-tight">{active.title}</h3>
                )}
                {active.caption && (
                  <p className="mt-2 max-w-xl text-lg text-white/80">{active.caption}</p>
                )}
                {total > 1 && (
                  <div className="mt-5 flex gap-2">
                    {MEDIA_ITEMS.map((item, i) => (
                      <button
                        key={item.src}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        aria-current={i === index}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === index ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              {total > 1 && (
                <div className="flex shrink-0 gap-3">
                  <button onClick={prev} aria-label="Previous slide" className={bigArrow}>
                    <Chevron dir="prev" />
                  </button>
                  <button onClick={next} aria-label="Next slide" className={bigArrow}>
                    <Chevron dir="next" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Small screens: caption + dots below the slide */}
        <div className="lg:hidden">
          {(active.title || active.caption) && (
            <div className="mt-6 text-center min-h-[4rem]" aria-live="polite">
              {active.title && (
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{active.title}</h3>
              )}
              {active.caption && (
                <p className="mt-1 text-sm sm:text-base text-gray-500">{active.caption}</p>
              )}
            </div>
          )}
          {total > 1 && (
            <div className="mt-2 flex justify-center gap-2">
              {MEDIA_ITEMS.map((item, i) => (
                <button
                  key={item.src}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-6 bg-gray-900' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Section2