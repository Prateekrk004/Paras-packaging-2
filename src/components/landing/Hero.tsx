import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Package } from "lucide-react";
import { useRef } from "react";
import { Counter } from "./Counter";

const heroImg = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1200";
const ecoImg = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800";
const customImg = "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=800";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden bg-warm-mesh pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* animated mesh blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-mesh absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full opacity-50 blur-3xl"
             style={{ background: "radial-gradient(circle, oklch(0.62 0.155 40 / 0.35), transparent 70%)" }} />
        <div className="animate-mesh absolute -right-40 top-20 h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl"
             style={{ background: "radial-gradient(circle, oklch(0.315 0.035 30 / 0.45), transparent 70%)", animationDelay: "-6s" }} />
        <div className="animate-mesh absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full opacity-50 blur-3xl"
             style={{ background: "radial-gradient(circle, oklch(0.945 0.012 60 / 0.9), transparent 70%)", animationDelay: "-12s" }} />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-card/60 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/70 backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            House of Packaging Material — Est. since 2003
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-6 text-[clamp(2.75rem,6.5vw,5.5rem)] font-medium leading-[0.98] tracking-tight text-foreground"
          >
            Packaging that{" "}
            <span className="italic text-accent">protects</span>,
            <br className="hidden sm:block" /> preserves & elevates
            <br className="hidden sm:block" />
            <span className="relative inline-block">
              brands.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M2 9 C 60 2, 140 2, 198 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-xl text-base text-foreground/70 sm:text-lg"
          >
            Delivering innovative food packaging, industrial packaging and custom branded
            solutions trusted by businesses across FMCG, retail and manufacturing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-elegant transition-all hover:scale-[1.02] hover:bg-accent hover:shadow-glow"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card/60 px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-all hover:border-foreground/30 hover:bg-card"
            >
              <Package className="h-4 w-4" />
              Explore Products
            </a>
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-foreground/10 pt-8"
          >
            {[
              { v: 20, suffix: "+", label: "Years experience" },
              { v: 500, suffix: "+", label: "Happy clients" },
              { v: 50, suffix: "M+", label: "Units delivered" },
            ].map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-medium text-foreground sm:text-4xl">
                  <Counter to={s.v} />{s.suffix}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-foreground/55">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right: floating image collage */}
        <div className="relative mx-auto h-[460px] w-full max-w-xl sm:h-[560px] lg:h-[640px]">
          <motion.div style={{ y: yA }} className="absolute right-0 top-4 w-[78%] overflow-hidden rounded-3xl shadow-elegant ring-1 ring-foreground/10">
            <img src={heroImg} alt="Premium kraft packaging" width={1600} height={1200} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
          <motion.div style={{ y: yB }} className="animate-float absolute -left-2 bottom-16 w-[52%] overflow-hidden rounded-2xl shadow-elegant ring-1 ring-foreground/10">
            <img src={customImg} alt="Custom branded packaging" width={1200} height={1200} loading="lazy" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
          <motion.div style={{ y: yC }} className="animate-float absolute right-6 bottom-0 w-[44%] overflow-hidden rounded-2xl shadow-elegant ring-1 ring-foreground/10" >
            <img src={ecoImg} alt="Eco-friendly packaging" width={1200} height={1200} loading="lazy" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="absolute left-2 top-10 glass rounded-2xl px-4 py-3 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-gradient text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <div className="font-display text-sm font-semibold">ISO‑certified</div>
                <div className="text-[11px] text-foreground/60">Quality assured</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
