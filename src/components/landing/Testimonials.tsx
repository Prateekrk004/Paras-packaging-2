import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState } from "react";

const reviews = [
  {
    name: "Aarav Mehta",
    role: "Head of Operations, Nestora Foods",
    quote: "Paras consistently delivers food-grade packaging that exceeds our QA. Their turnaround on custom prints is the fastest we've seen in the industry.",
    initial: "A",
  },
  {
    name: "Priya Sharma",
    role: "Brand Director, Casa Nova Retail",
    quote: "Our unboxing scores jumped after switching to Paras for our retail line. The finish, the structural integrity, the consistency — all premium.",
    initial: "P",
  },
  {
    name: "Rohan Iyer",
    role: "Founder, GreenLeaf Organics",
    quote: "Finally a manufacturer that takes sustainability seriously. Compostable, beautiful and priced fairly. They've become a true partner.",
    initial: "R",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const r = reviews[i];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Client voices</span>
          <h2 className="font-display mt-3 text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.02] tracking-tight">
            Trusted by teams that <span className="italic text-accent">ship at scale.</span>
          </h2>
        </div>

        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl glass p-8 shadow-elegant sm:p-12"
        >
          <Quote className="absolute -right-4 -top-4 h-32 w-32 text-accent/10" />
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

        <div className="mt-8 flex items-center justify-center gap-2">
          {reviews.map((_, k) => (
            <button
              key={k}
              aria-label={`Show review ${k + 1}`}
              onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${k === i ? "w-10 bg-accent" : "w-2 bg-foreground/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
