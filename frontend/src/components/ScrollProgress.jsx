import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollProgress() {
  const barRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]); // recalculate when the page (and its height) changes

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[60] h-1 w-full"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-orange-500"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}