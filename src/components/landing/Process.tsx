import { motion } from "framer-motion";
import { MessageSquare, PenTool, FlaskConical, Factory, ShieldCheck, Truck } from "lucide-react";

const steps = [
  { n: "01", icon: MessageSquare, title: "Consultation", desc: "We learn your product, audience and supply chain." },
  { n: "02", icon: PenTool, title: "Packaging Design", desc: "Structural and print design tailored to your brand." },
  { n: "03", icon: FlaskConical, title: "Sampling", desc: "Physical prototypes for fit, finish and feel." },
  { n: "04", icon: Factory, title: "Production", desc: "Precision manufacturing at our in-house facility." },
  { n: "05", icon: ShieldCheck, title: "Quality Assurance", desc: "Multi-stage QA with batch traceability." },
  { n: "06", icon: Truck, title: "Delivery", desc: "On-time, on-spec dispatch across India & export." },
];

export function Process() {
  return (
    <section id="process" className="relative bg-secondary/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent">How we work</span>
            <h2 className="font-display mt-3 text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.02] tracking-tight">
              From brief to <span className="italic text-accent">batch.</span>
            </h2>
          </div>
          <p className="max-w-md text-foreground/65">A clear, six-step process designed for speed, accountability and zero surprises.</p>
        </div>

        <div className="relative mt-16">
          {/* connector line */}
          <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative"
              >
                <div className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-full bg-background ring-2 ring-accent/40">
                  <s.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="mt-5 text-center">
                  <div className="font-display text-xs font-semibold uppercase tracking-wider text-foreground/45">{s.n}</div>
                  <h3 className="font-display mt-1 text-lg font-medium">{s.title}</h3>
                  <p className="mx-auto mt-1.5 max-w-[220px] text-sm text-foreground/60">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
