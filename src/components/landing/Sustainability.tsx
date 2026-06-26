import { motion } from "framer-motion";
import { Recycle, TreePine, Sprout, Droplets } from "lucide-react";
import { Counter } from "./Counter";

const img = "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1200";

const pillars = [
  { icon: Recycle, title: "100% Recyclable Materials", desc: "Mono-material paperboard and corrugated stock that re-enters the loop." },
  { icon: TreePine, title: "FSC Certified Sourcing", desc: "Pulp from responsibly managed forests, traceable end-to-end." },
  { icon: Sprout, title: "Compostable Alternatives", desc: "PLA-lined trays and cups that break down in industrial composting." },
  { icon: Droplets, title: "Low-impact Production", desc: "Water-based inks, reduced VOCs and 30% lower water footprint." },
];

export function Sustainability() {
  return (
    <section id="sustainability" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-elegant ring-1 ring-foreground/10">
            <img src={img} alt="Sustainable packaging" width={1600} height={1000} loading="lazy" className="aspect-[5/4] w-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-tr from-success/30 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-8 -right-4 glass rounded-2xl p-5 shadow-elegant sm:-right-8">
            <div className="flex items-end gap-3">
              <span className="font-display text-5xl font-semibold text-success">
                <Counter to={72} />%
              </span>
              <span className="pb-2 text-xs text-foreground/65">reduction in plastic<br />usage since 2020</span>
            </div>
          </div>
        </motion.div>

        <div>
          <span className="text-xs font-medium uppercase tracking-[0.22em]" style={{ color: "var(--success)" }}>Sustainability</span>
          <h2 className="font-display mt-3 text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-tight">
            Packaging for a <span className="italic" style={{ color: "var(--success)" }}>sustainable future.</span>
          </h2>
          <p className="mt-5 max-w-lg text-foreground/65">
            We design every product with end-of-life in mind — combining material science,
            responsible sourcing and circular thinking to lower your brand's footprint.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-foreground/10 bg-card/70 p-5 backdrop-blur"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg" style={{ background: "color-mix(in oklab, var(--success) 18%, transparent)", color: "var(--success)" }}>
                  <p.icon className="h-5 w-5" />
                </div>
                <h4 className="mt-3 font-medium">{p.title}</h4>
                <p className="mt-1 text-sm text-foreground/60">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
