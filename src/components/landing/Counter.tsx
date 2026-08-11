import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function Counter({ to, duration = 1600 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [hasTriggered, setHasTriggered] = useState(false);
  const [v, setV] = useState(0);

  useEffect(() => {
    if (inView) {
      setHasTriggered(true);
      return;
    }

    // Fallback viewport check for mobile browsers/edge cases where IntersectionObserver
    // fails or is delayed due to parent transforms/animations
    const checkInView = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isInViewport =
          rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom > 0;
        if (isInViewport) {
          setHasTriggered(true);
        }
      }
    };

    checkInView();
    const timer = setTimeout(checkInView, 400);
    const timer2 = setTimeout(() => {
      // Ultimate safety fallback: ensure counter always starts even if IntersectionObserver fails
      setHasTriggered(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [inView]);

  useEffect(() => {
    if (!hasTriggered) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasTriggered, to, duration]);

  return <span ref={ref}>{v.toLocaleString()}</span>;
}
