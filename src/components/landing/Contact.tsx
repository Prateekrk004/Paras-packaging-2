import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Logo } from "./Logo";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  company: z.string().trim().min(1, "Company is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(6, "Enter a valid phone").max(20),
  requirement: z.string().trim().min(1, "Select a requirement").max(80),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

const requirements = ["Food Packaging", "Corrugated Boxes", "Custom Printed", "Retail", "Industrial", "Eco-Friendly"];

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
                { icon: MapPin, label: "Visit", value: "Plot 14, Industrial Estate, Mumbai 400072, India" },
                { icon: Phone, label: "Call", value: "+91 98765 43210" },
                { icon: Mail, label: "Email", value: "hello@paraspackaging.co" },
                { icon: Clock, label: "Hours", value: "Mon – Sat · 9:30 AM – 7:00 PM IST" },
              ].map((c) => (
                <li key={c.label} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-card ring-1 ring-foreground/10">
                    <c.icon className="h-4.5 w-4.5 text-accent" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-foreground/55">{c.label}</div>
                    <div className="mt-0.5 text-sm text-foreground">{c.value}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 overflow-hidden rounded-2xl border border-foreground/10 shadow-soft">
              <iframe
                title="Paras Packaging location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=72.82%2C19.05%2C72.93%2C19.13&layer=mapnik"
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
                  <Field label="Full name" name="name" placeholder="Your name" />
                  <Field label="Company" name="company" placeholder="Company name" />
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
                <button
                  type="submit"
                  className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground shadow-elegant transition-all hover:bg-accent hover:shadow-glow cursor-pointer"
                >
                  Send enquiry
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="mt-4 text-center text-xs text-foreground/50">We respond within 1 business day. Your data stays private.</p>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
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
