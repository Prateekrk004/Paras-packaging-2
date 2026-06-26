import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const manufacturing = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200";

export function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2rem] bg-dark-gradient p-10 shadow-elegant sm:p-16 lg:p-20"
        >
          {/* background image */}
          <div className="absolute inset-0 -z-10 opacity-25 mix-blend-luminosity">
            <img src={manufacturing} alt="" width={1600} height={1000} loading="lazy" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-50 blur-3xl"
               style={{ background: "radial-gradient(circle, oklch(0.62 0.155 40 / 0.6), transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full opacity-40 blur-3xl"
               style={{ background: "radial-gradient(circle, oklch(0.62 0.155 40 / 0.4), transparent 70%)" }} />

          <div className="relative max-w-3xl text-white">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-white/60">Let&apos;s build</span>
            <h2 className="font-display mt-3 text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[1.02] tracking-tight">
              Ready to upgrade your <span className="italic text-accent">packaging</span> solutions?
            </h2>
            <p className="mt-5 max-w-xl text-white/75">
              Tell us about your product. We&apos;ll send samples, a structural concept and a transparent quote within 48 hours.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground shadow-glow transition-all hover:scale-[1.02]">
                Get a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="tel:+919876543210" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur hover:bg-white/10">
                <Phone className="h-4 w-4" />
                Contact our team
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
