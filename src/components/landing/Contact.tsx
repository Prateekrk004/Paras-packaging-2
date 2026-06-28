import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Logo } from "./Logo";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(6, "Enter a valid phone").max(20),
  requirement: z.string().trim().min(1, "Select a requirement").max(80),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

const requirements = [
  "Premium Paper Products",
  "Bio Cornstarch Products",
  "Biodegradable Products (Brown)",
  "Biodegradable Products (White)",
  "Paper Products (Full Catalogue)",
  "Paper Bags",
  "PET Bottles",
  "Catering Products",
  "Baking / Bakery Items",
  "Sweet Boxes",
  "Rigid Boxes",
  "Plastic Packaging 1",
  "Plastic Packaging 2",
  "Plastic Packaging 3",
  "Plastic Packaging 4",
  "Fruit Punnet Boxes",
  "PET Jars",
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setErr(null);
    setSent(true);
  };

  return (
    <section id="contact" className="relative bg-secondary/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left info */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-auto" />
            </div>
            <span className="mt-8 inline-block text-xs font-medium uppercase tracking-[0.22em] text-accent">Get in touch</span>
            <h2 className="font-display mt-3 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-tight">
              Let&apos;s talk <span className="italic text-accent">packaging.</span>
            </h2>
            <p className="mt-4 max-w-md text-foreground/65">
              Send us your spec sheet, brand guidelines or just a quick brief — our team
              responds within one business day.
            </p>

            <ul className="mt-10 space-y-5">
              {[
                { icon: MapPin, label: "Visit", value: "44/1, Avenue Rd, opp. to shivam trading co, Medarpet, Old Tharagupet, Dodpete, Nagarathpete, Bengaluru, Karnataka 560002" },
                { icon: Phone, label: "Call", value: "+91 98442 50447", href: "tel:+919844250447" },
                { icon: Clock, label: "Hours", value: "Mon – Sat · 9:30 AM – 7:00 PM IST" },
              ].map((c) => (
                <li key={c.label} className="flex items-start gap-4">
                  {c.href ? (
                    <a
                      href={c.href}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-card ring-1 ring-foreground/10 hover:bg-accent/10 transition-colors"
                      title={`Call ${c.value}`}
                    >
                      <c.icon className="h-4.5 w-4.5 text-accent" />
                    </a>
                  ) : (
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-card ring-1 ring-foreground/10">
                      <c.icon className="h-4.5 w-4.5 text-accent" />
                    </span>
                  )}
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-foreground/55">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="mt-0.5 inline-block text-sm text-foreground hover:text-accent transition-colors">
                        {c.value}
                      </a>
                    ) : (
                      <div className="mt-0.5 text-sm text-foreground">{c.value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 overflow-hidden rounded-2xl border border-foreground/10 shadow-soft">
              <iframe
                title="Paras Packaging location"
                src="https://maps.google.com/maps?q=Paras%20packaging%20%26%20co%2C%2044%2F1%2C%20Avenue%20Rd%2C%20opp.%20to%20shivam%20trading%20co%2C%20Medarpet%2C%20Old%20Tharagupet%2C%20Dodpete%2C%20Nagarathpete%2C%20Bengaluru%2C%20Karnataka%20560002&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="h-56 w-full"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            onSubmit={onSubmit}
            className="rounded-3xl bg-card p-8 shadow-elegant ring-1 ring-foreground/10 sm:p-10"
          >
            {sent ? (
              <div className="grid min-h-[420px] place-items-center text-center">
                <div>
                  <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
                  <h3 className="font-display mt-5 text-2xl font-medium">Thank you.</h3>
                  <p className="mt-2 max-w-sm text-foreground/65">
                    Your enquiry has reached our packaging team. We&apos;ll reply within one business day.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Full name" name="name" placeholder="Your name" className="sm:col-span-2" />
                  <Field label="Email" name="email" type="email" placeholder="you@brand.com" />
                  <Field label="Phone" name="phone" type="tel" placeholder="+91 98765 43210" />
                </div>
                <div className="mt-5">
                  <label className="text-xs font-medium uppercase tracking-wider text-foreground/55">Packaging requirement</label>
                  <select
                    name="requirement"
                    defaultValue=""
                    className="mt-2 w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  >
                    <option value="" disabled>Select category…</option>
                    {requirements.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="mt-5">
                  <label className="text-xs font-medium uppercase tracking-wider text-foreground/55">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about your product, quantity, finish…"
                    className="mt-2 w-full resize-none rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  />
                </div>
                {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
                <a
                  href="https://wa.me/919844250447"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground shadow-elegant transition-all hover:bg-accent hover:shadow-glow cursor-pointer"
                >
                  Connect With Us
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <p className="mt-4 text-center text-xs text-foreground/50">We respond within 1 business day. Your data stays private.</p>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder, className }: { label: string; name: string; type?: string; placeholder?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="text-xs font-medium uppercase tracking-wider text-foreground/55">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
