"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useCartStore } from "@/store/cartStore";
import CartToast from "@/components/CartToast";

const artworks = [
  { id: 1,  title: "Silverback at Dawn",       animal: "Mountain Gorilla", artist: "Christine Mukamana",  medium: "Graphite",    price: 1200, size: "60×80cm",   available: true,  featured: true,  emoji: "🦍" },
  { id: 2,  title: "The Matriarch",             animal: "African Elephant", artist: "Josue Habimana",      medium: "Ink",         price: 1800, size: "80×100cm",  available: true,  featured: true,  emoji: "🐘" },
  { id: 3,  title: "Golden Hour",               animal: "Golden Monkey",   artist: "Christine Mukamana",  medium: "Charcoal",    price: 950,  size: "50×70cm",   available: false, featured: false, emoji: "🐒" },
  { id: 4,  title: "Leopard Study II",          animal: "Leopard",         artist: "Rigobert Nzeyimana",  medium: "Charcoal",    price: 1400, size: "60×80cm",   available: true,  featured: false, emoji: "🐆" },
  { id: 5,  title: "The Pride",                 animal: "Lion",            artist: "Rigobert Nzeyimana",  medium: "Mixed Media", price: 2200, size: "100×120cm", available: true,  featured: true,  emoji: "🦁" },
  { id: 6,  title: "Buffalo Crossing",          animal: "Buffalo",         artist: "Josue Habimana",      medium: "Ink",         price: 1100, size: "60×80cm",   available: false, featured: false, emoji: "🐃" },
  { id: 7,  title: "Crowned Crane in Flight",   animal: "Crowned Crane",   artist: "Christine Mukamana",  medium: "Graphite",    price: 780,  size: "40×60cm",   available: true,  featured: false, emoji: "🦢" },
  { id: 8,  title: "Hippo at Dusk",             animal: "Hippopotamus",    artist: "Josue Habimana",      medium: "Charcoal",    price: 1600, size: "80×100cm",  available: true,  featured: false, emoji: "🦛" },
  { id: 9,  title: "Gorilla Family",            animal: "Mountain Gorilla", artist: "Christine Mukamana", medium: "Mixed Media", price: 3200, size: "120×150cm", available: true,  featured: true,  emoji: "🦍" },
  { id: 10, title: "Eagle's Eye",               animal: "Eagle",           artist: "Rigobert Nzeyimana",  medium: "Graphite",    price: 890,  size: "50×70cm",   available: false, featured: false, emoji: "🦅" },
  { id: 11, title: "Chimpanzee Portrait",       animal: "Chimpanzee",      artist: "Christine Mukamana",  medium: "Charcoal",    price: 1050, size: "50×70cm",   available: true,  featured: false, emoji: "🐵" },
  { id: 12, title: "Elephant Herd",             animal: "African Elephant", artist: "Josue Habimana",     medium: "Mixed Media", price: 4500, size: "150×200cm", available: true,  featured: true,  emoji: "🐘" },
];

const filters = ["All", "Mountain Gorilla", "African Elephant", "Lion", "Leopard", "Eagle", "Other"];
const mediums = ["All Media", "Graphite", "Charcoal", "Ink", "Mixed Media"];

function ArtworkCard({ art, delay = 0, onAdd }: { art: typeof artworks[0]; delay?: number; onAdd: (art: typeof artworks[0]) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group"
      style={{ background: "var(--cream-warm)", overflow: "hidden", cursor: "pointer", position: "relative" }}>

      {/* Image area */}
      <div style={{ aspectRatio: "4/5", background: "#E8E0D0", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
        <span className="transition-transform duration-700 group-hover:scale-110 inline-block" style={{ fontSize: "clamp(80px,12vw,140px)", opacity: 0.25 }}>{art.emoji}</span>
        {!art.available && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(14,16,15,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.3)", padding: "8px 20px" }}>Sold</p>
          </div>
        )}
        {art.featured && art.available && (
          <div style={{ position: "absolute", top: 16, left: 16, background: "var(--ochre)", padding: "4px 12px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "#fff" }}>Featured</p>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
          style={{ background: "linear-gradient(to top, rgba(14,16,15,0.8) 0%, transparent 50%)" }}>
          {art.available && (
            <button
              onClick={(e) => { e.stopPropagation(); onAdd(art); }}
              style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", background: "var(--ochre)", color: "#fff", padding: "10px 22px", border: "none", cursor: "pointer", width: "100%", textAlign: "center", display: "block" }}
              className="hover:opacity-90 transition-opacity"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "20px 20px 24px" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 6 }}>{art.medium} · {art.size}</p>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: "var(--ink)", marginBottom: 4, lineHeight: 1.2 }}>{art.title}</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--warm-grey)", marginBottom: 12 }}>{art.artist}</p>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: art.available ? "var(--ink)" : "var(--warm-grey)" }}>
          {art.available ? `$${art.price.toLocaleString()}` : "Sold"}
        </p>
      </div>
    </motion.div>
  );
}

export default function WildPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeMedium, setActiveMedium] = useState("All Media");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!toastVisible) return;
    const t = setTimeout(() => setToastVisible(false), 3500);
    return () => clearTimeout(t);
  }, [toastVisible]);

  function handleAddToCart(art: typeof artworks[0]) {
    addItem({
      id: `wild-${art.id}`,
      title: art.title,
      artist: art.artist,
      medium: art.medium,
      size: art.size,
      price: art.price,
      qty: 1,
    });
    setToastTitle(art.title);
    setToastVisible(false);
    setTimeout(() => setToastVisible(true), 10);
  }

  const filtered = artworks.filter(a => {
    const animalMatch = activeFilter === "All" || a.animal === activeFilter ||
      (activeFilter === "Other" && !["Mountain Gorilla", "African Elephant", "Lion", "Leopard", "Eagle"].includes(a.animal));
    const mediumMatch = activeMedium === "All Media" || a.medium === activeMedium;
    return animalMatch && mediumMatch;
  });

  return (
    <main style={{ paddingTop: 72, background: "var(--cream)" }}>
      <PageHero
        label="The Wild"
        headline={<>Original works from<br />the field</>}
        subtitle="Every piece in this collection began as a field sketch — observed directly in Volcanoes, Akagera, or Nyungwe National Parks."
        emoji="🦍"
      />

      {/* Filters */}
      <div style={{ padding: "clamp(48px, 8vw, 80px) clamp(24px,6vw,80px) 48px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Animal filter row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
                padding: "10px 20px",
                border: activeFilter === f ? "none" : "1px solid rgba(107, 103, 96, 0.25)",
                background: activeFilter === f ? "var(--ink)" : "var(--cream)",
                color: activeFilter === f ? "#fff" : "var(--warm-grey)", cursor: "pointer", transition: "all 0.2s",
              }}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
        {/* Media filter row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {mediums.map(m => (
            <button key={m} onClick={() => setActiveMedium(m)}
              style={{
                fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
                padding: "10px 20px",
                border: activeMedium === m ? "none" : "1px solid rgba(107, 103, 96, 0.25)",
                background: activeMedium === m ? "var(--ochre)" : "var(--cream)",
                color: activeMedium === m ? "#fff" : "var(--warm-grey)", cursor: "pointer", transition: "all 0.2s",
              }}>
              {m.toUpperCase()}
            </button>
          ))}
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--warm-grey)", marginLeft: "auto", letterSpacing: "0.06em" }}>{filtered.length} works</p>
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: "0 clamp(24px,6vw,80px) 120px", maxWidth: 1200, margin: "0 auto" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 300, color: "var(--warm-grey)" }}>No works match this filter.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2 }}>
            {filtered.map((art, i) => <ArtworkCard key={art.id} art={art} delay={i * 0.04} onAdd={handleAddToCart} />)}
          </div>
        )}
      </div>

      <Footer />
      <CartToast visible={toastVisible} title={toastTitle} />
    </main>
  );
}
