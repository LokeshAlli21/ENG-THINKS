import React, { useCallback, useEffect, useRef, useState } from 'react'

/* ------------------------------------------------------------------
   MEDIA FOLDERS (paths from the public folder, WITHOUT "public")
------------------------------------------------------------------- */
const IMG = '/media'
const VID = '/media'

/* ------------------------------------------------------------------
   MEDIA LIST: add or remove items here. Order does not matter,
   the slideshow is shuffled on every page load.
   - type: 'image' or 'video'
   - src: file path (case-sensitive, must match the real filename)
   - poster: optional preview image for a video
   - title / caption: optional text shown with the slide
------------------------------------------------------------------- */
const MEDIA_ITEMS = [
  { type: 'video', src: `${VID}/Beam.mp4`, title: 'Beam Design', caption: 'Accurate beam design and detailing.' },
  { type: 'image', src: `${IMG}/SLAB_1.png`, title: 'Slab Detailing', caption: 'Precise slab layouts for faster construction.' },
  { type: 'image', src: `${IMG}/SLAB_2.png`, title: 'Slab Detailing', caption: 'Clear drawings that reduce site errors.' },
  { type: 'video', src: `${VID}/SLAB.mp4`, title: 'Slab Walkthrough', caption: 'From design to detailing.' },
  { type: 'image', src: `${IMG}/SLAB_3.png`, title: 'Slab Detailing', caption: 'Practical solutions for modern construction.' },
  { type: 'image', src: `${IMG}/SLAB_4.png`, title: 'Slab Detailing', caption: 'Built for speed, safety and efficiency.' },
  { type: 'video', src: `${VID}/STAIRCASE.mp4`, title: 'Staircase Design', caption: 'Structural staircase solutions.' },
  { type: 'image', src: `${IMG}/STAIRCASE_1.png`, title: 'Staircase Detailing', caption: 'Accurate staircase design and reinforcement.' },
  { type: 'image', src: `${IMG}/STAIRCASE_2.png`, title: 'Staircase Detailing', caption: 'Practical engineering that moves projects forward.' },
]

const IMAGE_DURATION = 2000 // ms each image stays on screen
const SWIPE_THRESHOLD = 50 // px
const ERROR_SKIP_DELAY = 2000 // ms before skipping a video that failed to play
const SLIDE_MS = 800 // laptop slide transition length
const INITIAL_PARALLEL = 2 // downloads at once until the first item is ready (so it arrives fast)
const PARALLEL = 3 // downloads at once after that

/* ------------------------------------------------------------------
   LOADING ALGORITHM
   1. Shuffle the list once (Fisher-Yates).
   2. Download in that order with a small parallel pool, so the first
      items get the full bandwidth instead of all competing at once.
   3. An item joins the playlist only when it is fully usable:
      images are downloaded AND decoded, videos can start playing.
   4. The slideshow plays whatever is ready and loops over it, new
      items are appended as they arrive. The user never sees a blank slide.
------------------------------------------------------------------- */
const shuffle = (list) => {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const loadItem = (item, isFirst, keep) =>
  new Promise((resolve) => {
    if (item.type === 'video') {
      const v = document.createElement('video')
      v.muted = true
      v.playsInline = true
      v.preload = 'auto'
      v.addEventListener('canplay', () => resolve(true), { once: true })
      v.addEventListener('error', () => resolve(false), { once: true })
      v.src = item.src
      v.load()
      keep.push(v)
      if (item.poster) {
        const p = new Image()
        p.src = item.poster
        keep.push(p)
      }
    } else {
      const img = new Image()
      img.decoding = 'async'
      if (isFirst && 'fetchPriority' in img) img.fetchPriority = 'high'
      img.onload = () => {
        const decoded = img.decode ? img.decode().catch(() => {}) : Promise.resolve()
        decoded.then(() => resolve(true))
      }
      img.onerror = () => resolve(false)
      img.src = item.src
      keep.push(img)
    }
  })

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
  // playlist = items that are fully loaded, in the order they became ready
  const [playlist, setPlaylist] = useState([])
  const [loadingDone, setLoadingDone] = useState(false)
  // index = current slide, prev = slide sliding out, dir = 1 (forward) or -1 (back)
  const [state, setState] = useState({ index: 0, prev: null, dir: 1 })
  const [inView, setInView] = useState(true)
  const [failed, setFailed] = useState({})

  const total = playlist.length
  const { index, prev: prevIndex, dir } = state

  const sectionRef = useRef(null)
  const videoRefs = useRef({})
  const touchStartX = useRef(null)

  const active = playlist[index]
  const activeFailed = active?.type === 'video' && failed[active.src]

  // Shuffle + prioritized loading
  useEffect(() => {
    let cancelled = false
    const order = shuffle(MEDIA_ITEMS)
    const keep = [] // keeps detached elements alive while they download
    let cursor = 0
    let running = 0
    let finished = 0
    let okCount = 0

    setPlaylist([])
    setLoadingDone(false)

    const pump = () => {
      if (cancelled) return
      const limit = okCount === 0 ? INITIAL_PARALLEL : PARALLEL
      while (running < limit && cursor < order.length) {
        const item = order[cursor]
        const isFirst = cursor === 0
        cursor++
        running++
        loadItem(item, isFirst, keep).then((ok) => {
          if (cancelled) return
          running--
          finished++
          if (ok) {
            okCount++
            setPlaylist((list) => (list.some((x) => x.src === item.src) ? list : [...list, item]))
          }
          if (finished === order.length) setLoadingDone(true)
          pump()
        })
      }
    }
    pump()

    return () => {
      cancelled = true
      keep.forEach((el) => {
        if (el instanceof HTMLVideoElement) {
          el.removeAttribute('src')
          el.load()
        }
      })
    }
  }, [])

  const goTo = useCallback(
    (target, direction) =>
      setState((s) => {
        if (total < 2) return s
        const i = ((target % total) + total) % total
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

  // Images advance on a timer (starts as soon as a second item is ready)
  useEffect(() => {
    if (!active || active.type !== 'image' || !inView || total < 2) return
    const t = setTimeout(next, IMAGE_DURATION)
    return () => clearTimeout(t)
  }, [index, active, inView, next, total])

  // Only the active video plays
  useEffect(() => {
    playlist.forEach((item, i) => {
      if (item.type !== 'video') return
      const video = videoRefs.current[item.src]
      if (!video) return
      if (i === index && inView && !failed[item.src]) {
        video.play().catch(() => {})
      } else {
        video.pause()
        if (i !== index && i !== prevIndex) video.currentTime = 0
      }
    })
  }, [playlist, index, prevIndex, inView, failed])

  // Skip a video that failed to play
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
      aria-busy={total === 0 && !loadingDone}
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
            {playlist.map((item, i) => (
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
                      if (el) {
                        videoRefs.current[item.src] = el
                        el.muted = true
                      } else {
                        delete videoRefs.current[item.src]
                      }
                    }}
                    src={item.src}
                    poster={item.poster}
                    className="w-full h-full object-contain lg:object-cover"
                    muted
                    playsInline
                    preload="auto"
                    loop={total === 1}
                    onError={() => {
                      console.error(`Video failed to play: ${item.src}`)
                      setFailed((f) => ({ ...f, [item.src]: true }))
                    }}
                    onEnded={() => total > 1 && next()}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title || `Slide ${i + 1}`}
                    className="w-full h-full object-contain lg:object-cover"
                    decoding="async"
                    draggable={false}
                  />
                )}
              </div>
            ))}

            {/* Loading state: shown only until the first item is ready */}
            {total === 0 && (
              <div className="absolute inset-0 z-10 grid place-items-center">
                {loadingDone ? (
                  <p className="px-6 text-center text-sm sm:text-base text-gray-500 lg:text-white/70">
                    The gallery could not be loaded. Please refresh the page.
                  </p>
                ) : (
                  <div
                    className="w-10 h-10 rounded-full border-4 border-gray-300 border-t-gray-700 lg:border-white/25 lg:border-t-white animate-spin"
                    role="status"
                    aria-label="Loading gallery"
                  />
                )}
              </div>
            )}

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
                {active?.title && (
                  <h3 className="text-5xl font-semibold tracking-tight">{active.title}</h3>
                )}
                {active?.caption && (
                  <p className="mt-2 max-w-xl text-lg text-white/80">{active.caption}</p>
                )}
                {total > 1 && (
                  <div className="mt-5 flex gap-2">
                    {playlist.map((item, i) => (
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
          {(active?.title || active?.caption) && (
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
              {playlist.map((item, i) => (
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