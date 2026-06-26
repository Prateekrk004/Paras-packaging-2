import { motion } from "framer-motion";
import { Boxes, ShieldCheck, Leaf, BadgeDollarSign, Truck, Award } from "lucide-react";

const features = [
  { icon: Boxes, title: "Custom Manufacturing", desc: "End-to-end in-house production tailored to your spec, structure and finish." },
  { icon: ShieldCheck, title: "High Quality Standards", desc: "Multi-stage QA aligned with FSSAI, ISO and global food-contact norms." },
  { icon: Leaf, title: "Sustainable Materials", desc: "Recyclable, compostable and FSC-certified substrates as standard." },
  { icon: BadgeDollarSign, title: "Competitive Pricing", desc: "Direct-from-mill sourcing and lean manufacturing keep your COGS lean." },
  { icon: Truck, title: "Fast Delivery", desc: "Pan‑India logistics network with export readiness across 20+ countries." },
  { icon: Award, title: "Industry Expertise", desc: "Two decades supplying FMCG, restaurant chains, retail and industrial brands." },
];

export function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden bg-secondary/50 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full opacity-50 blur-3xl"
           style={{ background: "radial-gradient(circle, oklch(0.62 0.155 40 / 0.25), transparent 70%)" }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Why Paras</span>
          <h2 className="font-display mt-3 text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-tight">
            Engineered for performance.<br />
            <span className="italic text-foreground/60">Crafted for brands.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-card/80 p-7 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elegant"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange-gradient text-white shadow-soft">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display mt-5 text-xl font-medium">{f.title}</h3>
              <p className="mt-2 text-sm text-foreground/65">{f.desc}</p>
              <span className="absolute -bottom-12 -right-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "oklch(0.62 0.155 40 / 0.35)" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
