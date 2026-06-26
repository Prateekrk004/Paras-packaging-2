import { motion } from "framer-motion";
import { Utensils, ChefHat, ShoppingBag, Package, ShoppingCart, Factory, Truck, Pill } from "lucide-react";

const items = [
  { icon: Utensils, label: "Food & Beverage" },
  { icon: ChefHat, label: "Restaurants" },
  { icon: ShoppingBag, label: "Retail" },
  { icon: Package, label: "FMCG" },
  { icon: ShoppingCart, label: "E‑Commerce" },
  { icon: Factory, label: "Manufacturing" },
  { icon: Truck, label: "Logistics" },
  { icon: Pill, label: "Pharmaceuticals" },
];

export function Industries() {
  return (
    <section id="industries" className="relative bg-secondary/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Industries we serve</span>
          <h2 className="font-display mt-3 text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-tight">
            Partnering with sectors <span className="italic text-accent">that move the world.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-card/70 p-7 text-center backdrop-blur transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft"
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-foreground/80 transition-all group-hover:bg-orange-gradient group-hover:text-white">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display mt-4 text-base font-medium">{it.label}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
