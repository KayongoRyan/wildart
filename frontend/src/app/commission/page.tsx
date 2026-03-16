"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CartToast from "@/components/CartToast";
import { useCurrency } from "@/context/CurrencyContext";
import { useCartStore } from "@/store/cartStore";

const steps = [
  { num: "01", title: "Consultation", body: "Tell us about the animal, size, and feeling you want. We respond within 48 hours with a brief and an estimated timeline." },
  { num: "02", title: "Concept Sketch", body: "Your chosen artist produces 2–3 initial composition sketches. You review and guide the direction before we proceed to final paper." },
  { num: "03", title: "Creation", body: "The work is created over 2–8 weeks depending on scale and complexity. You receive progress photographs at key stages." },
  { num: "04", title: "Delivery", body: "Archival-framed under conservation glass, shipped worldwide or collected from the studio in Musanze. Certificate of authenticity included." },
];

const pricing = [
  { size: "Small",  dims: "30×40cm",   minUsd: 450,   maxUsd: 750,   time: "2–3 weeks" },
  { size: "Medium", dims: "60×80cm",   minUsd: 900,  maxUsd: 1500,  time: "3–5 weeks" },
  { size: "Large",  dims: "100×120cm", minUsd: 1800, maxUsd: 3000,  time: "5–8 weeks" },
  { size: "Grand",  dims: "150×200cm", minUsd: 4000, maxUsd: null,  time: "8–12 weeks" },
];

const animals = ["Mountain Gorilla", "African Elephant", "Lion", "Leopard", "Cheetah", "Eagle", "Buffalo", "Hippopotamus", "Crowned Crane", "Chimpanzee", "Golden Monkey", "Other"];

const wildArtworks = [
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

const wildFilters = ["All", "Mountain Gorilla", "African Elephant", "Lion", "Leopard", "Eagle", "Other"];
const wildMediums = ["All Media", "Graphite", "Charcoal", "Ink", "Mixed Media"];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
}

function ArtworkCard({ art, delay = 0, onAdd }: { art: typeof wildArtworks[0]; delay?: number; onAdd: (art: typeof wildArtworks[0]) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const { formatPrice } = useCurrency();
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group"
      style={{ background: "var(--cream-warm)", overflow: "hidden", cursor: "pointer", position: "relative" }}>
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
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
          style={{ background: "linear-gradient(to top, rgba(14,16,15,0.8) 0%, transparent 50%)" }}>
          {art.available && (
            <button
              onClick={(e) => { e.stopPropagation(); onAdd(art); }}
              style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", background: "var(--ochre)", color: "#fff", padding: "10px 22px", border: "none", cursor: "pointer", width: "100%", textAlign: "center", display: "block" }}
              className="hover:opacity-90 transition-opacity">
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <div style={{ padding: "20px 20px 24px" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 6 }}>{art.medium} · {art.size}</p>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: "var(--ink)", marginBottom: 4, lineHeight: 1.2 }}>{art.title}</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--warm-grey)", marginBottom: 12 }}>{art.artist}</p>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: art.available ? "var(--ink)" : "var(--warm-grey)" }}>
          {art.available ? formatPrice(art.price) : "Sold"}
        </p>
      </div>
    </motion.div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 16px", fontFamily: "var(--font-sans)", fontSize: 13,
  color: "var(--ink)", background: "var(--cream)", border: "1px solid rgba(14,16,15,0.15)",
  outline: "none", transition: "border-color 0.3s",
};
const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
  color: "var(--warm-grey)", marginBottom: 8, display: "block",
};

export default function CommissionPage() {
  const { formatPrice } = useCurrency();
  const addItem = useCartStore((s) => s.addItem);
  const [form, setForm] = useState({ name: "", email: "", animal: "", medium: "", size: "", budget: "", timeline: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [wildFilter, setWildFilter] = useState("All");
  const [wildMedium, setWildMedium] = useState("All Media");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState("");

  useEffect(() => {
    if (!toastVisible) return;
    const t = setTimeout(() => setToastVisible(false), 3500);
    return () => clearTimeout(t);
  }, [toastVisible]);

  function handleAddToCart(art: typeof wildArtworks[0]) {
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

  const filteredWild = wildArtworks.filter((a) => {
    const animalMatch = wildFilter === "All" || a.animal === wildFilter ||
      (wildFilter === "Other" && !["Mountain Gorilla", "African Elephant", "Lion", "Leopard", "Eagle"].includes(a.animal));
    const mediumMatch = wildMedium === "All Media" || a.medium === wildMedium;
    return animalMatch && mediumMatch;
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="pt-[72px]">
      <PageHero
        label="Commission a Piece"
        headline="A work made for you. An animal documented for the world."
        subtitle="Each commissioned work is a collaboration between you and one of our three resident artists. You choose the subject, scale, and medium. They bring the forest."
        emoji="✍️"
      />

      {/* How it works */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-24" style={{ background: "var(--cream)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 300, color: "var(--ink)", marginBottom: 72 }}>How the process works</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2 }}>
            {steps.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.1}>
                <div style={{ background: "var(--cream-warm)", padding: "40px 32px", height: "100%" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 52, fontWeight: 300, color: "var(--sand)", marginBottom: 16, lineHeight: 1 }}>{s.num}</p>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 300, color: "var(--ink)", marginBottom: 14 }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(14,16,15,0.6)", lineHeight: 1.85 }}>{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* The Wild — Original works from the field */}
      <section id="the-wild" className="px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20" style={{ background: "var(--cream-warm)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>The Wild</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,44px)", fontWeight: 300, color: "var(--ink)", marginBottom: 24 }}>
              Original works from the field
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(14,16,15,0.6)", lineHeight: 1.8, marginBottom: 40 }}>
              Every piece in this collection began as a field sketch — observed directly in Volcanoes, Akagera, or Nyungwe National Parks.
            </p>
          </FadeIn>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
            {wildFilters.map((f) => (
              <button key={f} onClick={() => setWildFilter(f)}
                style={{
                  fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
                  padding: "10px 20px",
                  border: wildFilter === f ? "none" : "1px solid rgba(107, 103, 96, 0.25)",
                  background: wildFilter === f ? "var(--ink)" : "var(--cream)",
                  color: wildFilter === f ? "#fff" : "var(--warm-grey)", cursor: "pointer", transition: "all 0.2s",
                }}>
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
            {wildMediums.map((m) => (
              <button key={m} onClick={() => setWildMedium(m)}
                style={{
                  fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
                  padding: "10px 20px",
                  border: wildMedium === m ? "none" : "1px solid rgba(107, 103, 96, 0.25)",
                  background: wildMedium === m ? "var(--ochre)" : "var(--cream)",
                  color: wildMedium === m ? "#fff" : "var(--warm-grey)", cursor: "pointer", transition: "all 0.2s",
                }}>
                {m.toUpperCase()}
              </button>
            ))}
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--warm-grey)", marginLeft: "auto", letterSpacing: "0.06em" }}>{filteredWild.length} works</p>
          </div>

          {filteredWild.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 300, color: "var(--warm-grey)" }}>No works match this filter.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2 }}>
              {filteredWild.map((art, i) => <ArtworkCard key={art.id} art={art} delay={i * 0.04} onAdd={handleAddToCart} />)}
            </div>
          )}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20" style={{ background: "var(--forest)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,44px)", fontWeight: 300, color: "var(--cream)", marginBottom: 48 }}>Pricing guide</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2 }}>
            {pricing.map((p, i) => (
              <FadeIn key={p.size} delay={i * 0.08}>
                <div style={{ background: "rgba(255,255,255,0.04)", padding: "36px 28px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 8 }}>{p.size}</p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 300, color: "var(--cream)", marginBottom: 8 }}>
                    {p.maxUsd != null ? `${formatPrice(p.minUsd)}–${formatPrice(p.maxUsd)}` : `From ${formatPrice(p.minUsd)}`}
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>{p.dims}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.25)", fontStyle: "italic" }}>{p.time}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form" style={{ background: "var(--cream)", padding: "100px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>Begin</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 300, color: "var(--ink)", marginBottom: 48 }}>Tell us about your piece</h2>
          </FadeIn>

          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: "var(--forest)", padding: "64px 48px", textAlign: "center" }}>
              <p style={{ fontSize: 48, marginBottom: 24 }}>🦍</p>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 300, color: "var(--cream)", marginBottom: 16 }}>We received your brief.</h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                One of our artists will be in touch within 48 hours with initial thoughts and next steps. Thank you for trusting us with your vision.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label style={labelStyle}>Your name</label>
                  <input name="name" value={form.name} onChange={handle} required placeholder="Full name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email address</label>
                  <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@example.com" style={inputStyle} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label style={labelStyle}>Animal subject</label>
                  <select name="animal" value={form.animal} onChange={handle} required style={inputStyle}>
                    <option value="">Select an animal</option>
                    {animals.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Preferred medium</label>
                  <select name="medium" value={form.medium} onChange={handle} style={inputStyle}>
                    <option value="">No preference</option>
                    <option>Graphite</option>
                    <option>Charcoal</option>
                    <option>Ink</option>
                    <option>Mixed Media</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                <div>
                  <label style={labelStyle}>Size</label>
                  <select name="size" value={form.size} onChange={handle} style={inputStyle}>
                    <option value="">Select size</option>
                    <option>Small (30×40cm)</option>
                    <option>Medium (60×80cm)</option>
                    <option>Large (100×120cm)</option>
                    <option>Grand (150×200cm)</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Budget (USD)</label>
                  <select name="budget" value={form.budget} onChange={handle} style={inputStyle}>
                    <option value="">Select range</option>
                    <option>$400–$800</option>
                    <option>$800–$1,500</option>
                    <option>$1,500–$3,000</option>
                    <option>$3,000+</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Timeline</label>
                  <select name="timeline" value={form.timeline} onChange={handle} style={inputStyle}>
                    <option value="">No rush</option>
                    <option>1 month</option>
                    <option>2–3 months</option>
                    <option>Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Additional notes</label>
                <textarea name="notes" value={form.notes} onChange={handle} rows={5} placeholder="Describe the mood, composition, or any reference you have in mind..." style={{ ...inputStyle, resize: "vertical" }} />
              </div>

              <button type="submit"
                style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", background: "var(--ink)", color: "#fff", padding: "18px 48px", border: "none", cursor: "pointer", alignSelf: "flex-start", transition: "background 0.3s" }}
                className="hover:!bg-[var(--forest)]">
                Submit Brief
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
      <CartToast visible={toastVisible} title={toastTitle} />
    </main>
  );
}
