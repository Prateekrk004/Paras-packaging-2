import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { PdfViewerModal } from "./PdfViewerModal";

interface Category {
  id: string;
  title: string;
  desc: string;
  img: string;
  pdf: string;
  tags: string[];
}

const categories: Category[] = [
  {
    id: "premium-paper-products",
    title: "Premium Paper Products",
    desc: "Luxury paperboard packaging, customized product boxes, and elegant card finishes.",
    img: "https://i.ibb.co/TDpP23Pt/paper-products.jpg",
    pdf: "/catalogs/premium-paper-products.pdf",
    tags: ["Premium", "Custom Print", "Luxury"]
  },
  {
    id: "bio-cornstarch-products",
    title: "Bio Cornstarch Products",
    desc: "100% compostable plates, bowls, and cutlery made from renewable cornstarch material.",
    img: "https://i.ibb.co/yFg7LJZG/bio-cornstarch-image.jpg",
    pdf: "/catalogs/bio-cornstarch-products.pdf",
    tags: ["Cornstarch", "Biodegradable", "Eco"]
  },
  {
    id: "biodegradable-products-brown",
    title: "Biodegradable Products (Brown)",
    desc: "Premium unbleached brown kraft boxes, bowls, and burger clamshells.",
    img: "https://i.ibb.co/v4jTL4Mt/bidegradable-brown.webp",
    pdf: "/catalogs/biodegradable-products-brown.pdf",
    tags: ["Kraft", "Takeaway", "Brown"]
  },
  {
    id: "biodegradable-products-white",
    title: "Biodegradable Products (White)",
    desc: "Hygienic white biodegradable plates, compartment trays, and clamshells.",
    img: "https://i.ibb.co/Gy3b9mj/bidegradable-white.jpg",
    pdf: "/catalogs/biodegradable-products-white.pdf",
    tags: ["White", "Food Grade", "Trays"]
  },
  {
    id: "paper-products-full",
    title: "Paper Products (Full Catalogue)",
    desc: "Comprehensive selection of high-quality paper food-service packaging.",
    img: "https://images.unsplash.com/photo-1564758564527-b97d79cb27c1?auto=format&fit=crop&q=80&w=600",
    pdf: "/catalogs/paper-products-full.pdf",
    tags: ["Complete Range", "F&B", "Cups"]
  },
  {
    id: "paper-bags",
    title: "Paper Bags",
    desc: "Flat-bottomed and twist-handle shopping bags crafted from durable kraft paper.",
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
    pdf: "/catalogs/paper-bags.pdf",
    tags: ["Bags", "Retail", "Carrier"]
  },
  {
    id: "pet-bottles",
    title: "PET Bottles",
    desc: "Crystal clear, impact-resistant bottles for beverages, fresh juices, and milkshakes.",
    img: "https://i.ibb.co/ccQtn2QG/pet-bottle.png",
    pdf: "/catalogs/pet-bottles.pdf",
    tags: ["PET", "Clear", "Liquids"]
  },
  {
    id: "catering-products",
    title: "Catering Products",
    desc: "Professional catering trays, portion cups, plates, and banquet table supplies.",
    img: "https://i.ibb.co/zWLB6r5C/catering-products.jpg",
    pdf: "/catalogs/catering-products.pdf",
    tags: ["Catering", "Supplies", "Events"]
  },
  {
    id: "baking-bakery-items",
    title: "Baking / Bakery Items",
    desc: "Greaseproof baking cups, elegant cake boxes, cupcake trays, and bread wraps.",
    img: "https://i.ibb.co/3Y9CvBT4/baking-pic.jpg",
    pdf: "/catalogs/baking-bakery-items.pdf",
    tags: ["Bakery", "Baking", "Confectionery"]
  },
  {
    id: "sweet-boxes",
    title: "Sweet Boxes",
    desc: "Luxury confectionery boxes with partitions, decorative borders, and traditional patterns.",
    img: "https://i.ibb.co/yFYmc7kC/sweet-box-cover-image.png",
    pdf: "/catalogs/sweet-boxes.pdf",
    tags: ["Mithai", "Gifting", "Traditional"]
  },
  {
    id: "rigid-boxes",
    title: "Rigid Boxes",
    desc: "Heavy-duty premium gift boxes, magnetic fold-flat boxes, and elegant slide sleeves.",
    img: "https://i.ibb.co/HpG0PV7T/rigid-boxes.jpg",
    pdf: "/catalogs/rigid-boxes.pdf",
    tags: ["Rigid", "Luxury", "Gift Box"]
  },
  {
    id: "plastic-packaging-1",
    title: "Plastic Packaging 1",
    desc: "Microwaveable PP plastic round containers and spill-proof leak-resistant lids.",
    img: "https://i.ibb.co/9Hx5YqRf/plastic-comtainers-1.webp",
    pdf: "/catalogs/plastic-packaging-1.pdf",
    tags: ["PP Plastic", "Round Bowls", "Microwave Safe"]
  },
  {
    id: "plastic-packaging-2",
    title: "Plastic Packaging 2",
    desc: "Divided food meal containers, bento-style trays, and multi-compartment lunch supplies.",
    img: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=600",
    pdf: "/catalogs/plastic-packaging-2.pdf",
    tags: ["Meal Prep", "Bento", "Containers"]
  },
  {
    id: "plastic-packaging-3",
    title: "Plastic Packaging 3",
    desc: "Premium plastic cups, transparent portion tubs, and dessert packaging items.",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
    pdf: "/catalogs/plastic-packaging-3.pdf",
    tags: ["Clear Cups", "Desserts", "Portion"]
  },
  {
    id: "plastic-packaging-4",
    title: "Plastic Packaging 4",
    desc: "Heavy-duty plastic transport crates, durable containers, and logistics tubs.",
    img: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=600",
    pdf: "/catalogs/plastic-packaging-4.pdf",
    tags: ["Industrial", "Crates", "Logistics"]
  },
  {
    id: "fruit-punnet-boxes",
    title: "Fruit Punnet Boxes",
    desc: "Vented hinged PET containers designed to extend the shelf life of fresh berries and produce.",
    img: "https://i.ibb.co/JjxNZZ4k/fruit-punnet-boxes.webp",
    pdf: "/catalogs/fruit-punnet-boxes.pdf",
    tags: ["Vented", "Fruits", "PET Containers"]
  },
  {
    id: "pet-jars",
    title: "PET Jars",
    desc: "Wide-mouth plastic screw-on jars for bulk confectionery, cookies, dry ingredients, and spices.",
    img: "https://i.ibb.co/vC3PfPzZ/Gemini-Generated-Image-ae2srpae2srpae2s.png",
    pdf: "/catalogs/pet-jars.pdf",
    tags: ["Jars", "Screw Cap", "Spice Storage"]
  }
];

export function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);

  const handleSelectCategory = (cat: Category) => {
    setSelectedCategory(cat);
    setIsViewerOpen(true);
  };

  return (
    <section id="categories" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-foreground/10 pb-10">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Our Catalogue</span>
            <h2 className="font-display mt-3 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-tight">
              Explore our <span className="italic text-accent">product range.</span>
            </h2>
          </div>
          <p className="max-w-md text-foreground/65 text-sm sm:text-base">
            Click any category to open and view the corresponding high-resolution product catalogue directly in our interactive reader.
          </p>
        </div>

        {/* Categories Grid (Always Displayed) */}
        <div className="mt-14 min-h-[500px]">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {categories.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: Math.min(12, i) * 0.04 }}
                onClick={() => handleSelectCategory(c)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-card border border-foreground/10 p-4 shadow-soft transition-all duration-300 hover:shadow-elegant hover:border-accent/40 cursor-pointer"
                id={`category-card-${c.id}`}
              >
                <div>
                  {/* Card Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary/35">
                    <img
                      src={c.img}
                      alt={c.title}
                      loading="lazy"
                      width={600}
                      height={450}
                      className="h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    {/* PDF Badge overlay */}
                    <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-accent shadow-sm border border-foreground/5 backdrop-blur">
                      <FileText className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="mt-5">
                    <div className="flex flex-wrap gap-1 mb-2.5">
                      {c.tags.map((t) => (
                        <span key={t} className="rounded-full bg-secondary/80 text-foreground/70 px-2 py-0.5 text-[10px] font-medium tracking-wide">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-display text-xl font-bold leading-tight group-hover:text-accent transition-colors">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-xs text-foreground/60 leading-relaxed line-clamp-2">
                      {c.desc}
                    </p>
                  </div>
                </div>

                {/* View Action Button at bottom */}
                <div className="mt-5 border-t border-foreground/5 pt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground/45 group-hover:text-accent transition-colors">
                    View Catalogue
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* PDF.js Fullscreen Modal Viewer Overlay */}
      <PdfViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        pdfUrl={selectedCategory?.pdf || ""}
        title={selectedCategory?.title || ""}
        description={selectedCategory?.desc || ""}
      />
    </section>
  );
}
