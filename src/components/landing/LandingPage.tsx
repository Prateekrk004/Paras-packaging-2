import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Categories } from "./Categories";
import { WhyUs } from "./WhyUs";
import { Sustainability } from "./Sustainability";
import { Process } from "./Process";
import { Industries } from "./Industries";
import { Testimonials } from "./Testimonials";
import { CTA } from "./CTA";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <WhyUs />
        <Sustainability />
        <Process />
        <Industries />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
