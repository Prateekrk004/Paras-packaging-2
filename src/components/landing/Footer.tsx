import { ArrowRight } from "lucide-react";
import { Logo } from "./Logo";

const Social = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
    <path d={d} />
  </svg>
);
const ICONS = {
  instagram: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.26.07 1.64.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.26.06-1.64.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.22-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.05-.41-2.22C2.21 15.6 2.2 15.22 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41C8.4 2.21 8.78 2.2 12 2.2zm0 1.8c-3.15 0-3.5 0-4.74.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.27.83-.39.39-.63.76-.83 1.27-.15.39-.33.97-.38 2.04C2.21 15.6 2.2 15.22 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41C15.5 4 15.15 4 12 4zm0 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zm5.85-2.15a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z",
  linkedin: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.06c.53-1 1.82-2.06 3.75-2.06 4 0 4.74 2.64 4.74 6.07V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.86V21h-4V9z",
  facebook: "M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.93.26-1.57 1.6-1.57h1.7V4.27c-.3-.04-1.32-.13-2.5-.13-2.48 0-4.18 1.51-4.18 4.3v2.36H7.4V14h2.7v8h3.4z",
  twitter: "M22 5.92c-.74.33-1.53.55-2.36.65a4.1 4.1 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6.99 4.1 4.1 0 0 0-7.1 3.74A11.6 11.6 0 0 1 3.4 4.78a4.1 4.1 0 0 0 1.27 5.48 4.1 4.1 0 0 0 3.29 4.02 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.4a11.6 11.6 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.67v-.53A8.3 8.3 0 0 0 22 5.92z",
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark-gradient text-white/80">
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
           style={{ background: "radial-gradient(circle, oklch(0.62 0.155 40 / 0.5), transparent 70%)" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Newsletter */}
        <div className="grid gap-10 border-b border-white/10 py-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Logo invert className="h-12 w-auto" />
            <p className="mt-5 max-w-md text-sm text-white/65">
              House of packaging material. Protecting, preserving and elevating brands across India and beyond.
            </p>
          </div>
          <form className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Subscribe to our newsletter"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/45 focus:outline-none"
            />
            <button className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:shadow-glow cursor-pointer">
              Join <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 py-14 sm:grid-cols-4">
          <Col title="Products" items={["Food Packaging", "Corrugated Boxes", "Custom Printed", "Retail", "Industrial", "Eco-Friendly"]} />
          <Col title="Industries" items={["Food & Beverage", "Restaurants", "Retail", "FMCG", "E-Commerce", "Pharma"]} />
          <Col title="Company" items={["About", "Process", "Sustainability", "Careers", "Press", "Contact"]} />
          <div>
            <h4 className="font-display text-sm font-medium uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li>Plot 14, Industrial Estate,<br />Mumbai 400072, India</li>
              <li>+91 98765 43210</li>
              <li>hello@paraspackaging.co</li>
            </ul>
            <div className="mt-6 flex gap-2">
              {(["instagram","linkedin","facebook","twitter"] as const).map((k) => (
                <a key={k} href="#" aria-label={k} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 transition-all hover:border-accent hover:bg-accent hover:text-accent-foreground">
                  <Social d={ICONS[k]} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-7 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Paras Packaging & Co. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-medium uppercase tracking-wider text-white">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm text-white/65">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="transition-colors hover:text-white">{i}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
