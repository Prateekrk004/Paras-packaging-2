import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark-gradient text-white/80">
      {/* Background ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.62 0.155 40 / 0.5), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Top Header & WhatsApp Action Card */}
        <div className="grid gap-8 border-b border-white/10 py-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <Logo invert className="h-12 w-auto" />
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
              House of Packaging Material — Est. since 1953. Protecting, preserving, and elevating brands across India with sustainable, durable, and premium food and industrial packaging solutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
            <div className="flex-1">
              <h4 className="font-display text-sm font-medium text-white">Need Custom Packaging?</h4>
              <p className="text-xs text-white/60 mt-0.5">Connect directly with our team on WhatsApp</p>
            </div>
            <a
              href="https://wa.me/919035554232"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-medium text-white shadow-elegant transition-all hover:bg-[#1ebd59] hover:shadow-glow cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Products Column */}
          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-white/90">Our Catalogue</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              {[
                "Premium Paper Products",
                "Bio Cornstarch Products",
                "Biodegradable Kraft & White",
                "Paper Bags & Pouches",
                "PET Bottles & Jars",
                "Catering & Bakery Supplies",
                "Sweet & Rigid Boxes",
                "Plastic Packaging",
              ].map((item) => (
                <li key={item}>
                  <a href="#categories" className="transition-colors hover:text-white hover:underline underline-offset-4">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-white/90">Quick Links</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              {[
                { label: "Explore Catalogue", href: "#categories" },
                { label: "Why Choose Us", href: "#why" },
                { label: "Eco & Sustainability", href: "#sustainability" },
                { label: "Manufacturing Process", href: "#process" },
                { label: "Industries Served", href: "#industries" },
                { label: "Contact & Location", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-white hover:underline underline-offset-4">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-white/90">Contact & Location</h4>
            <ul className="mt-4 space-y-3.5 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                <span className="leading-relaxed">
                  444/1, Avenue Rd, opp. to shivam trading co, Medarpet, Old Tharagupet, Dodpete, Nagarathpete, Bengaluru, Karnataka 560002
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href="tel:+919035554232" className="hover:text-white transition-colors">
                  +91 90355 54232
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-accent" />
                <span>Mon – Sat · 9:30 AM – 8:30 PM IST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Paras Packaging & Co. All rights reserved.</p>
          <p className="text-white/40">Established since 1953 · Bengaluru, India</p>
        </div>
      </div>
    </footer>
  );
}
