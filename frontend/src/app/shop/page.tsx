"use client";
import { Suspense, useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useCartStore } from "@/store/cartStore";
import CartToast from "@/components/CartToast";
import { useCurrency } from "@/context/CurrencyContext";
import { works, type Work } from "@/lib/works";

const featured = {
  id: "featured-1",
  title: "Gorilla Family",
  artist: "Christine Mukamana",
  medium: "Mixed Media",
  price: 3200,
  size: "120×150cm",
  emoji: "🦍",
  desc: "A matriarch with two juveniles at rest in the bamboo zone — Christine's most ambitious work of 2024. Rendered over six weeks on 300gsm acid-free cotton paper using graphite, charcoal, and raw pigment washes.",
};

const newArrivals = [
  { id: "s1", title: "Bull Elephant at Akagera", medium: "Ink",      price: 1950, size: "80×100cm", available: true,  emoji: "🐘", artist: "Josue Habimana" },
  { id: "s2", title: "Leopard on Acacia",        medium: "Charcoal", price: 1400, size: "60×80cm",  available: true,  emoji: "🐆", artist: "Rigobert Nzeyimana" },
  { id: "s3", title: "Silverback Portrait II",   medium: "Graphite", price: 1200, size: "50×70cm",  available: true,  emoji: "🦍", artist: "Christine Mukamana" },
  { id: "s4", title: "Hippo Pair",               medium: "Ink",      price: 1750, size: "80×100cm", available: false, emoji: "🦛", artist: "Josue Habimana" },
];

const collections = [
  { name: "Virunga Series", count: 8, desc: "Works inspired by the mountain gorillas and forest life of Volcanoes National Park.", emoji: "🦍", bg: "#1C2A1E" },
  { name: "Akagera Plains", count: 6, desc: "Elephants, buffalo, and hippos from Rwanda's savanna park in the east.",             emoji: "🐘", bg: "#2A1E10" },
  { name: "Sky Studies",    count: 4, desc: "Raptors and waterfowl — crowned cranes, martial eagles, and fish eagles.",           emoji: "🦅", bg: "#1A1810" },
];

const prints = [
  { id: "p1", title: "Silverback at Dawn", price: 120, size: "50×70cm", edition: "Ed. 25", emoji: "🦍" },
  { id: "p2", title: "The Matriarch",      price: 140, size: "60×80cm", edition: "Ed. 20", emoji: "🐘" },
  { id: "p3", title: "Eagle's Eye",        price: 95,  size: "40×56cm", edition: "Ed. 30", emoji: "🦅" },
  { id: "p4", title: "Leopard Study",      price: 130, size: "50×70cm", edition: "Ed. 25", emoji: "🐆" },
];

const photography = [
  { id: "ph1", title: "Virunga Mist", artist: "SAWA Studio", price: 85, size: "40×60cm", emoji: "🦍" },
  { id: "ph2", title: "Akagera Golden Hour", artist: "SAWA Studio", price: 95, size: "50×70cm", emoji: "🐘" },
  { id: "ph3", title: "Crane at Dawn", artist: "SAWA Studio", price: 75, size: "40×56cm", emoji: "🦢" },
];

function WorkCard({ work, formatPrice }: { work: Work; formatPrice: (n: number) => string }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.25 }}
      className="group" style={{ background: "var(--cream-warm)", overflow: "hidden" }}>
      <Link href={`/shop/${work.id}`} prefetch={true} style={{ textDecoration: "none", display: "block" }}>
        <div style={{ aspectRatio: "4/5", background: "#1C2A1E", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <span className="transition-transform duration-700 group-hover:scale-110 inline-block" style={{ fontSize: 100, opacity: 0.12 }}>{work.emoji}</span>
          {!work.available && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(14,16,15,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.25)", padding: "7px 18px" }}>Sold</p>
            </div>
          )}
          {work.available && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
              style={{ background: "linear-gradient(to top, rgba(14,16,15,0.75) 0%, transparent 50%)" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", background: "var(--ochre)", color: "#fff", padding: "10px 20px", width: "100%", textAlign: "center", display: "block" }}>
                View Details
              </span>
            </div>
          )}
        </div>
        <div style={{ padding: "18px 20px 22px" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 6 }}>{work.medium} · {work.size}</p>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 300, color: "var(--ink)", marginBottom: 4 }}>{work.kw}</h3>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--warm-grey)", marginBottom: 10 }}>{work.artist}</p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: work.available ? "var(--ink)" : "var(--warm-grey)" }}>
            {work.available ? formatPrice(work.price) : "Sold"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function WildArtworkCard({ work, onAdd, formatPrice }: { work: Work; onAdd: (w: Work) => void; formatPrice: (n: number) => string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }} className="group"
      style={{ background: "var(--cream-warm)", overflow: "hidden", cursor: "pointer", position: "relative" }}>
      <div style={{ aspectRatio: "4/5", background: "#E8E0D0", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
        <span className="transition-transform duration-700 group-hover:scale-110 inline-block" style={{ fontSize: "clamp(80px,12vw,140px)", opacity: 0.25 }}>{work.emoji}</span>
        {!work.available && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(14,16,15,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.3)", padding: "8px 20px" }}>Sold</p>
          </div>
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
          style={{ background: "linear-gradient(to top, rgba(14,16,15,0.8) 0%, transparent 50%)" }}>
          {work.available && (
            <button
              onClick={(e) => { e.stopPropagation(); onAdd(work); }}
              style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", background: "var(--ochre)", color: "#fff", padding: "10px 22px", border: "none", cursor: "pointer", width: "100%", textAlign: "center", display: "block" }}
              className="hover:opacity-90 transition-opacity">
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <div style={{ padding: "20px 20px 24px" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 6 }}>{work.medium} · {work.size}</p>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: "var(--ink)", marginBottom: 4, lineHeight: 1.2 }}>{work.kw}</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--warm-grey)", marginBottom: 12 }}>{work.artist}</p>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: work.available ? "var(--ink)" : "var(--warm-grey)" }}>
          {work.available ? formatPrice(work.price) : "Sold"}
        </p>
      </div>
    </motion.div>
  );
}

function Card({ art, onAdd, formatPrice }: { art: typeof newArrivals[0]; onAdd: (art: typeof newArrivals[0]) => void; formatPrice: (n: number) => string }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.25 }}
      className="group" style={{ background: "var(--cream-warm)", overflow: "hidden" }}>
      <div style={{ aspectRatio: "4/5", background: "#E0D8C8", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <span className="transition-transform duration-700 group-hover:scale-110 inline-block" style={{ fontSize: 100, opacity: 0.22 }}>{art.emoji}</span>
        {!art.available && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(14,16,15,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.25)", padding: "7px 18px" }}>Sold</p>
          </div>
        )}
        {art.available && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
            style={{ background: "linear-gradient(to top, rgba(14,16,15,0.75) 0%, transparent 50%)" }}>
            <button
              onClick={() => onAdd(art)}
              style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", background: "var(--ochre)", color: "#fff", padding: "10px 20px", border: "none", cursor: "pointer", width: "100%", textAlign: "center", display: "block" }}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
      <div style={{ padding: "18px 20px 22px" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 6 }}>{art.medium} · {art.size}</p>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 300, color: "var(--ink)", marginBottom: 4 }}>{art.title}</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--warm-grey)", marginBottom: 10 }}>{art.artist}</p>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: art.available ? "var(--ink)" : "var(--warm-grey)" }}>
          {art.available ? formatPrice(art.price) : "Sold"}
        </p>
      </div>
    </motion.div>
  );
}

function ShopContent() {
  const searchParams             = useSearchParams();
  const mediumParam              = searchParams.get("medium");
  const artistParam              = searchParams.get("artist");
  const [tab, setTab]            = useState<"originals" | "prints" | "featured">("originals");
  const [toastTitle, setToastTitle] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const addItem                  = useCartStore((s) => s.addItem);
  const { formatPrice }         = useCurrency();

  const filteredWorks = works.filter((w) => {
    if (mediumParam) {
      const m = mediumParam.toLowerCase();
      if (m === "mixed") {
        if (!w.medium.toLowerCase().includes("mixed")) return false;
      } else if (w.medium.toLowerCase() !== m) return false;
    }
    if (artistParam && !w.artist.toLowerCase().includes(artistParam.toLowerCase())) return false;
    return true;
  });

  const [wildFilter, setWildFilter] = useState("All");
  const [wildMedium, setWildMedium] = useState("All Media");
  const wildFilters = ["All", ...new Set(works.map((w) => w.animal))].filter(Boolean);
  const wildMediums = ["All Media", ...new Set(works.map((w) => w.medium))].filter(Boolean);
  const filteredWild = works.filter((w) => {
    const animalMatch = wildFilter === "All" || w.animal === wildFilter;
    const mediumMatch = wildMedium === "All Media" || w.medium === wildMedium;
    return animalMatch && mediumMatch;
  });

  useEffect(() => {
    if (!toastVisible) return;
    const t = setTimeout(() => setToastVisible(false), 3500);
    return () => clearTimeout(t);
  }, [toastVisible]);

  function handleAdd(item: { id: string; title: string; artist?: string; medium: string; size: string; price: number }) {
    addItem({
      id: item.id,
      title: item.title,
      artist: item.artist ?? "WildArt",
      medium: item.medium,
      size: item.size,
      price: item.price,
      qty: 1,
    });
    setToastTitle(item.title);
    setToastVisible(false);
    setTimeout(() => setToastVisible(true), 10);
  }

  function handleAddWork(work: Work) {
    handleAdd({
      id: work.id,
      title: work.title,
      artist: work.artist,
      medium: work.medium,
      size: work.size,
      price: work.price,
    });
  }

  return (
    <main className="pt-[72px]" style={{ background: "var(--cream)" }}>
      <PageHero
        label="The Shop"
        headline="Collect African wildlife art. Support African wildlife."
        emoji="🦍"
      />

      {/* Original works from the field */}
      <section id="the-wild" className="px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20" style={{ background: "var(--cream-warm)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>The Wild</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,44px)", fontWeight: 300, color: "var(--ink)", marginBottom: 24 }}>
            Original works from the field
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(14,16,15,0.6)", lineHeight: 1.8, marginBottom: 40 }}>
            Every piece in this collection began as a field sketch — observed directly in Volcanoes, Akagera, or Nyungwe National Parks.
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
            {wildFilters.map((f) => (
              <button key={f} onClick={() => setWildFilter(f)}
                style={{
                  fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
                  padding: "10px 16px",
                  border: wildFilter === f ? "none" : "1px solid rgba(107, 103, 96, 0.25)",
                  background: wildFilter === f ? "var(--ink)" : "var(--cream)",
                  color: wildFilter === f ? "#fff" : "var(--warm-grey)", cursor: "pointer", transition: "all 0.2s",
                }}>
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
            {wildMediums.map((m) => (
              <button key={m} onClick={() => setWildMedium(m)}
                style={{
                  fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
                  padding: "10px 16px",
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
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 300, color: "var(--warm-grey)" }}>No works match this filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {filteredWild.map((work, i) => (
                <WildArtworkCard key={work.id} work={work} onAdd={handleAddWork} formatPrice={formatPrice} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured piece */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-24" style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 32 }}>Featured Work</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ background: "var(--ink)" }}>
          <div style={{ background: "#1C2A1E", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 280 }} className="min-h-[280px] md:min-h-[360px]">
            <span style={{ fontSize: "clamp(120px,20vw,220px)", opacity: 0.2 }}>{featured.emoji}</span>
          </div>
          <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 12 }}>{featured.medium} · {featured.size}</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 300, color: "var(--cream)", marginBottom: 8, lineHeight: 1.1 }}>{featured.title}</h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>{featured.artist}</p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.85, marginBottom: 32 }}>{featured.desc}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,36px)", fontWeight: 300, color: "var(--cream)" }}>{formatPrice(featured.price)}</p>
              <button
                onClick={() => handleAdd({ id: featured.id, title: featured.title, artist: featured.artist, medium: featured.medium, size: featured.size, price: featured.price })}
                style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", background: "var(--ochre)", color: "#fff", padding: "14px 32px", border: "none", cursor: "pointer" }}
                className="hover:!bg-[var(--ochre-light)]">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Originals / Prints / Featured Work tabs */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 pb-16 sm:pb-20 md:pb-24" style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="flex flex-wrap gap-0 mb-8 sm:mb-12 border-b border-[rgba(14,16,15,0.12)] overflow-x-auto no-scrollbar">
          {(["originals", "prints", "featured"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", padding: "12px 16px", background: "none", border: "none", cursor: "pointer", borderBottom: `2px solid ${tab === t ? "var(--ink)" : "transparent"}`, color: tab === t ? "var(--ink)" : "var(--warm-grey)", transition: "all 0.2s", whiteSpace: "nowrap" }} className="sm:text-[11px] sm:px-7 sm:py-3.5">
              {t === "originals" ? "Originals" : t === "prints" ? "Prints" : "Featured"}
            </button>
          ))}
        </div>

        {tab === "originals" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 2 }}>
            {filteredWorks.length > 0 ? filteredWorks.map((w) => <WorkCard key={w.id} work={w} formatPrice={formatPrice} />) : (
              <p style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--warm-grey)", gridColumn: "1 / -1" }}>No works match this filter.</p>
            )}
          </div>
        ) : tab === "prints" ? (
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--warm-grey)", lineHeight: 1.7, marginBottom: 40 }}>
              Limited edition giclée prints on 310gsm Hahnemühle Photo Rag. Each edition is hand-signed and numbered by the artist. Once sold out, editions are closed permanently.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2 }}>
              {prints.map((p, i) => (
                <motion.div key={p.title}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.2, delay: i * 0.03 }}
                  className="group" style={{ background: "var(--cream-warm)", overflow: "hidden" }}>
                  <div style={{ aspectRatio: "4/5", background: "#DDD5C2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 80, opacity: 0.18 }} className="group-hover:scale-110 transition-transform duration-700 inline-block">{p.emoji}</span>
                  </div>
                  <div style={{ padding: "16px 18px 20px" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 6 }}>{p.edition} · {p.size}</p>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 300, color: "var(--ink)", marginBottom: 10 }}>{p.title}</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: "var(--ink)" }}>{formatPrice(p.price)}</p>
                      <button
                        onClick={() => handleAdd({ id: p.id, title: p.title, medium: "Print", size: p.size, price: p.price })}
                        style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", background: "var(--ink)", color: "#fff", padding: "7px 14px", border: "none", cursor: "pointer" }}>
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
            {/* Photography */}
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 24 }}>Photography</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2 }}>
                {photography.map((ph, i) => (
                  <motion.div key={ph.id}
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.2, delay: i * 0.03 }}
                    className="group" style={{ background: "var(--cream-warm)", overflow: "hidden" }}>
                    <div style={{ aspectRatio: "4/5", background: "#1C2A1E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 80, opacity: 0.18 }} className="group-hover:scale-110 transition-transform duration-700 inline-block">{ph.emoji}</span>
                    </div>
                    <div style={{ padding: "16px 18px 20px" }}>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 6 }}>Photography · {ph.size}</p>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 300, color: "var(--ink)", marginBottom: 6 }}>{ph.title}</h3>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--warm-grey)", marginBottom: 12 }}>{ph.artist}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: "var(--ink)" }}>{formatPrice(ph.price)}</p>
                        <button
                          onClick={() => handleAdd({ id: ph.id, title: ph.title, artist: ph.artist, medium: "Photography", size: ph.size, price: ph.price })}
                          style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", background: "var(--ink)", color: "#fff", padding: "7px 14px", border: "none", cursor: "pointer" }}>
                          Add
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Collection */}
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 24 }}>Collection</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2 }}>
                {collections.map((c, i) => (
                  <motion.div key={c.name}
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.2, delay: i * 0.04 }}
                    className="group cursor-pointer"
                    style={{ background: c.bg, padding: "48px 36px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", right: 20, bottom: 10, fontSize: 80, opacity: 0.12, transition: "opacity 0.4s, transform 0.4s" }} className="group-hover:opacity-25 group-hover:scale-110">{c.emoji}</div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 12 }}>{c.count} works</p>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 300, color: "var(--cream)", marginBottom: 12 }}>{c.name}</h3>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{c.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Commission CTA */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20 text-center" style={{ background: "var(--forest)" }}>
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(20px,3vw,36px)", fontWeight: 300, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>Can&rsquo;t find what you&rsquo;re looking for?</p>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,54px)", fontWeight: 300, color: "var(--cream)", marginBottom: 40 }}>Commission it directly from the artist.</p>
        <Link href="/commission" style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", background: "var(--ochre)", color: "#fff", padding: "16px 44px", textDecoration: "none" }}
          className="hover:!bg-[var(--ochre-light)]">Start a Commission</Link>
      </section>

      <Footer />
      <CartToast visible={toastVisible} title={toastTitle} />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <main style={{ paddingTop: 72, background: "var(--cream)", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--warm-grey)" }}>Loading…</p>
      </main>
    }>
      <ShopContent />
    </Suspense>
  );
}
