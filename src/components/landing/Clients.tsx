import { motion } from "framer-motion";

interface ClientLogo {
  name: string;
  logoUrl: string;
}

const clients: ClientLogo[] = [
  {
    name: "Kanti Sweets",
    logoUrl: "https://i.ibb.co/GvnNf2zt/1630666159398-e-2147483647-v-beta-t-Uqwfm-Tt3-Dhi-JMeyk-Sx-Hkfk-Ph-MZKB8ljc-XM3-VA-UWV-c.jpg",
  },
  {
    name: "Asha Sweets",
    logoUrl: "https://i.ibb.co/zDSjsKM/asha-sweet-center-doddakannelli-bangalore-sweet-shops-78fc4kctts.jpg",
  },
  {
    name: "Swiggy",
    logoUrl: "https://i.ibb.co/TMThk3yv/Swiggy-logo.png",
  },
  {
    name: "Eat Fit",
    logoUrl: "https://i.ibb.co/PvYkjxzN/images-q-tbn-ANd9-Gc-RNQ3x-M51k-y9-Ca-Qi-P2n-RZfg4-DYEu-Rh-Yw9k9dx-2h-XHAY-IG8wi-Vtpv-EY-s-10.jpg",
  },
  {
    name: "Shiv Sagar",
    logoUrl: "https://i.ibb.co/twLyWBBn/shiv-sagar-logo.png",
  },
  {
    name: "Filter Coffee",
    logoUrl: "https://i.ibb.co/JjcZDL7w/filter-coffee-logo-template-hand-260nw-2652153677.jpg",
  },
  {
    name: "Levista",
    logoUrl: "https://i.ibb.co/Q3ZNXhcD/images-q-tbn-ANd9-Gc-RNV4-Est-K1-Ta7n7-PE4-Nb-Lbyl-TJu-Cbd-I8-KCmqmkrl6-Zvtuyypt-CGQ2-Ox-NU-s-10.jpg",
  },
  {
    name: "KMF (Nandini)",
    logoUrl: "https://i.ibb.co/Z1Mgr6MT/images-q-tbn-ANd9-Gc-Q7-Qay7jxk-IWus-ZNJNCRB-h-Ys-QE7jkr4-Ex-Mb-Q1z-VTx-I3-Rj-KPgt-U2w-L9-MHi0-s-10.jpg",
  },
];

export function Clients() {
  // Duplicate client list to ensure a completely seamless infinite loop
  const marqueeList = [...clients, ...clients, ...clients];

  return (
    <section id="clients" className="relative overflow-hidden py-20 sm:py-28 bg-background border-y border-foreground/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            OUR CLIENTS
          </span>
          <h2 className="font-display mt-3 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-foreground">
            Trusted by Businesses Across Industries
          </h2>
          <p className="mt-4 text-base sm:text-lg text-foreground/70">
            Proudly serving businesses with packaging solutions trusted across food service, retail, FMCG, hospitality, and manufacturing.
          </p>
        </div>
      </div>

      {/* Marquee Container with Left & Right Gradient Mask for Smooth Fading */}
      <div className="relative w-full overflow-hidden py-4 group">
        {/* Gradient overlays for seamless edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20 sm:w-36 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20 sm:w-36 bg-gradient-to-l from-background to-transparent" />

        {/* Marquee Track moving LEFT -> RIGHT seamlessly */}
        <div className="flex w-max animate-marquee-right group-hover:[animation-play-state:paused] ease-linear">
          {marqueeList.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="mx-4 sm:mx-6 flex items-center justify-center shrink-0 rounded-2xl border border-foreground/10 bg-white/95 dark:bg-card/90 px-6 sm:px-10 py-5 sm:py-6 h-28 sm:h-36 min-w-[200px] sm:min-w-[260px] shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md"
            >
              <img
                src={client.logoUrl}
                alt={client.name}
                loading="lazy"
                className="max-h-20 sm:max-h-24 w-auto max-w-[170px] sm:max-w-[220px] object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
