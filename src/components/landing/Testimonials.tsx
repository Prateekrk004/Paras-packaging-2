import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const reviews = [
  {
    name: "Deepak Gowda",
    role: "Google Reviewer (Local Guide)",
    quote: "Very good place for all your packaging requirements. Corrugated boxes, bubble wraps, and tapes are available at wholesale prices. Polite staff and quick response.",
    initial: "D",
  },
  {
    name: "Anil Kumar",
    role: "Google Reviewer",
    quote: "Excellent customer service and top quality materials. They have a wide range of packaging products at very reasonable prices. Highly recommended!",
    initial: "A",
  },
  {
    name: "Sandeep K.",
    role: "Google Reviewer (E-commerce Seller)",
    quote: "Best packaging material shop on Avenue Road. Very prompt service, high quality boxes, and competitive rates. Highly cooperative owner.",
    initial: "S",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

export function Testimonials() {
  const [[page, direction], setPage] = useState([0, 0]);

  const activeIndex = (page % reviews.length + reviews.length) % reviews.length;
  const r = reviews[activeIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 7000);
    return () => clearInterval(timer);
  }, [page]);

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Client voices</span>
          <h2 className="font-display mt-3 text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.02] tracking-tight">
            Trusted by teams that <span className="italic text-accent">ship at scale.</span>
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(e, info) => {
                const swipeThreshold = 50;
                if (info.offset.x < -swipeThreshold) {
                  paginate(1);
                } else if (info.offset.x > swipeThreshold) {
                  paginate(-1);
                }
              }}
              className="relative rounded-3xl glass p-8 shadow-elegant sm:p-12 cursor-grab active:cursor-grabbing select-none touch-pan-y"
            >
              <Quote className="absolute -right-4 -top-4 h-32 w-32 text-accent/10 pointer-events-none" />
              <div className="mb-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-orange-gradient font-display text-lg font-semibold text-white">
                  {r.initial}
                </div>
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-sm text-foreground/60">{r.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous review"
            className="grid h-9 w-9 place-items-center rounded-full border border-foreground/10 bg-card text-foreground/70 hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {reviews.map((_, k) => (
              <button
                key={k}
                aria-label={`Show review ${k + 1}`}
                onClick={() => {
                  const diff = k - activeIndex;
                  if (diff !== 0) {
                    setPage([page + diff, diff]);
                  }
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${k === activeIndex ? "w-10 bg-accent" : "w-2 bg-foreground/20"}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            aria-label="Next review"
            className="grid h-9 w-9 place-items-center rounded-full border border-foreground/10 bg-card text-foreground/70 hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
