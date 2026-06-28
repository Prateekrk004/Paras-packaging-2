import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Package, MessageCircle } from "lucide-react";
import { useRef } from "react";
import { Counter } from "./Counter";
import { TextAnimate } from "@/registry/magicui/text-animate";

const heroImg = "https://i.ibb.co/m564FSnP/Whats-App-Image-2026-06-28-at-22-39-16.jpg";
const ecoImg = "https://i.ibb.co/sptG8d72/Whats-App-Image-2026-06-28-at-22-40-27.jpg";
const customImg = "https://i.ibb.co/4ZwJdtM0/Whats-App-Image-2026-06-28-at-22-40-12.jpg";
const industrialImg = "https://i.ibb.co/bM70scRz/Whats-App-Image-2026-06-28-at-22-40-41.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

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
            <TextAnimate animation="slideLeft" by="character" as="span" delay={0.1}>
              Paras
            </TextAnimate>{" "}
            <TextAnimate animation="slideLeft" by="character" as="span" className="text-accent" delay={0.25}>
              Packaging
            </TextAnimate>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 max-w-xl text-base text-foreground/70 sm:text-lg"
          >
            <TextAnimate
              animation="slideLeft"
              by="character"
              as="span"
              delay={0.45}
              stagger={0.008}
            >
              Delivering innovative food packaging, industrial packaging, and custom branded solutions trusted by businesses across FMCG, retail, and manufacturing.
            </TextAnimate>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="https://wa.me/919844250447"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-medium text-white shadow-elegant transition-all hover:scale-[1.02] hover:bg-[#1ebd59] hover:shadow-glow"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
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

        {/* Right: floating 4-image grid/bento layout */}
        <div className="relative mx-auto h-[480px] w-full max-w-xl sm:h-[580px] lg:h-[660px]">
          {/* Bento Column 1: Left column (56% of container width) */}
          <div className="absolute left-0 top-0 w-[56%] h-full flex flex-col gap-4 z-10 hover:z-20 transition-all duration-300">
            {/* Card 1: Top Left */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              whileHover={{
                scale: 1.06,
                rotate: -1.8,
                zIndex: 20,
                boxShadow: "0 40px 80px -20px color-mix(in oklab, var(--brand) 55%, transparent)",
              }}
              transition={{
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                default: {
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                  mass: 0.8,
                }
              }}
              className="h-[55%] w-full overflow-hidden rounded-3xl shadow-elegant ring-1 ring-foreground/10 bg-card cursor-pointer"
            >
              <img
                src={heroImg}
                alt="Premium food packaging"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Card 3: Bottom Left */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              whileHover={{
                scale: 1.06,
                rotate: 1.2,
                zIndex: 20,
                boxShadow: "0 40px 80px -20px color-mix(in oklab, var(--brand) 55%, transparent)",
              }}
              transition={{
                y: {
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                },
                default: {
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                  mass: 0.8,
                }
              }}
              className="h-[41%] w-full overflow-hidden rounded-2xl shadow-elegant ring-1 ring-foreground/10 bg-card cursor-pointer"
            >
              <img
                src={ecoImg}
                alt="Eco-friendly packaging"
                width={1200}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Bento Column 2: Right column (40% of container width, slightly offset vertically) */}
          <div className="absolute right-0 top-0 w-[40%] h-full flex flex-col gap-4 pt-10 z-10 hover:z-20 transition-all duration-300">
            {/* Card 2: Top Right */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              whileHover={{
                scale: 1.06,
                rotate: 1.8,
                zIndex: 20,
                boxShadow: "0 40px 80px -20px color-mix(in oklab, var(--brand) 55%, transparent)",
              }}
              transition={{
                y: {
                  duration: 5.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.25,
                },
                default: {
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                  mass: 0.8,
                }
              }}
              className="h-[40%] w-full overflow-hidden rounded-2xl shadow-elegant ring-1 ring-foreground/10 bg-card cursor-pointer"
            >
              <img
                src={customImg}
                alt="Custom branded packaging"
                width={1200}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Card 4: Bottom Right */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              whileHover={{
                scale: 1.06,
                rotate: -1.2,
                zIndex: 20,
                boxShadow: "0 40px 80px -20px color-mix(in oklab, var(--brand) 55%, transparent)",
              }}
              transition={{
                y: {
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.75,
                },
                default: {
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                  mass: 0.8,
                }
              }}
              className="h-[51%] w-full overflow-hidden rounded-3xl shadow-elegant ring-1 ring-foreground/10 bg-card cursor-pointer"
            >
              <img
                src={industrialImg}
                alt="Industrial packaging"
                width={1200}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{
              scale: { delay: 0.7, duration: 0.6 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
            }}
            className="absolute left-[-15px] top-[48%] z-10 glass rounded-2xl px-4 py-3 shadow-soft"
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
