const brands = [
  "NESTORA", "GREENLEAF", "PACIFIC&CO", "URBN MARKET", "CASA NOVA",
  "BOLD FOODS", "VERDA", "HARVEST", "ATLAS LOGISTICS", "BLUEPINE",
];

export function TrustWall() {
  return (
    <section className="border-y border-foreground/10 bg-secondary/60 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-foreground/55">
          Trusted by businesses across food, retail, manufacturing, logistics & FMCG
        </p>
      </div>
      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-secondary/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-secondary/60 to-transparent" />
        <div className="animate-marquee flex w-max gap-16 whitespace-nowrap">
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="font-display text-2xl font-semibold tracking-wider text-foreground/40 transition-colors hover:text-foreground/80">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
