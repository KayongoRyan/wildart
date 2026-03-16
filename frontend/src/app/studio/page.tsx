"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { artists } from "@/lib/artists";

const values = [
  { label: "Observation over reference", body: "Every artwork begins with direct observation in the field. We visit Volcanoes National Park, Akagera, and Nyungwe regularly — sketching before we ever touch final paper." },
  { label: "Conservation through art", body: "A portion of every sale funds anti-poaching patrols and ranger education in the Virunga. Art and conservation are not separate activities at SAWA." },
  { label: "Slow making", body: "A single original can take three to eight weeks from first field sketch to final work. We do not rush. The animals deserve patience." },
  { label: "Materials as respect", body: "We use only archival-grade papers, Japanese graphite, and conservation-framed glass. A SAWA work is built to last a century." },
];

function ArtistCard({ a, index }: { a: (typeof artists)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <Link href={`/artists/${a.slug}`} style={{ textDecoration: "none" }} className="block">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="overflow-hidden bg-[var(--ink)]"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          {a.image ? (
            <Image
              src={a.image}
              alt={a.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
              className="object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          ) : (
            <div style={{ background: a.bg }} className="flex h-full w-full items-center justify-center">
              <span className="text-[clamp(80px,15vw,160px)] opacity-30">{a.emoji}</span>
            </div>
          )}
        </div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(18px, 2vw, 24px)",
            fontWeight: 300,
            color: "var(--cream)",
            padding: "20px 0 0",
            lineHeight: 1.2,
          }}
        >
          {a.name}
        </p>
      </motion.div>
    </Link>
  );
}

function FadeIn({ children, delay = 0, bg = "transparent" }: { children: React.ReactNode; delay?: number; bg?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay }} style={{ background: bg }}>
      {children}
    </motion.div>
  );
}

export default function StudioPage() {
  return (
    <main style={{ paddingTop: 72 }}>

      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          minHeight: "min(85vh, 720px)",
          background: "linear-gradient(180deg, rgba(92, 122, 94, 0.18) 0%, rgba(92, 122, 94, 0.08) 100%)",
          padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(200,144,58,0.04) 0%, transparent 70%)" }} />
        <div className="absolute right-[10%] top-[40%] text-[clamp(120px,25vw,320px)] opacity-[0.04] select-none" aria-hidden>🦍</div>
        <div className="relative z-10 max-w-[720px]">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.25 }}
            style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(10px,1.2vw,12px)", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 20 }}
          >
            Est. Musanze, Rwanda — 2020
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4.5vw, 56px)",
              fontWeight: 300,
              lineHeight: 1.15,
              color: "var(--ink)",
              marginBottom: 28,
            }}
          >
            Five artists.<br />One forest.<br />Infinite subjects.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(14px, 1.4vw, 18px)",
              fontWeight: 300,
              color: "rgba(14,16,15,0.6)",
              lineHeight: 1.75,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            SAWA Studio was founded at the edge of Volcanoes National Park by artists who believed that African wildlife deserved to be documented not by cameras, but by hands.
          </motion.p>
        </div>
      </section>

      {/* Intro prose */}
      <FadeIn bg="var(--cream)">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px clamp(24px,6vw,80px)", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>The Studio</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3vw,44px)", fontWeight: 300, lineHeight: 1.1, color: "var(--ink)" }}>What we believe</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "rgba(14,16,15,0.65)", lineHeight: 1.9 }}>
              SAWA — meaning &ldquo;equal&rdquo; in Swahili — was built on a simple conviction: that the mountain gorilla, the forest elephant, the crowned crane, deserve the same reverence that European artists gave to the human form. Not as trophies. Not as symbols. As individuals with faces, gestures, and presence.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "rgba(14,16,15,0.65)", lineHeight: 1.9 }}>
              We work in graphite, charcoal, ink, and mixed media — materials chosen because they reward slowness. You cannot rush graphite. That slowness is the point.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Artist Profiles */}
      <section id="artists" style={{ background: "var(--ink)", padding: "100px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(24px,6vw,80px)" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>The Artists</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,58px)", fontWeight: 300, color: "var(--cream)", marginBottom: 80 }}>Meet the hands behind the work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {artists.map((a, i) => <ArtistCard key={a.name} a={a} index={i} />)}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <FadeIn bg="var(--cream)">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px clamp(24px,6vw,80px)" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>How we work</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,3.5vw,52px)", fontWeight: 300, color: "var(--ink)", marginBottom: 64 }}>The principles that guide every work</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 48 }}>
            {values.map((v, i) => (
              <div key={v.label}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 8 }}>0{i + 1}</p>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 300, color: "var(--ink)", marginBottom: 14, lineHeight: 1.2 }}>{v.label}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(14,16,15,0.55)", lineHeight: 1.85 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Location */}
      <FadeIn bg="var(--forest)">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px clamp(24px,6vw,80px)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 20 }}>Find Us</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,4vw,56px)", fontWeight: 300, color: "var(--cream)", lineHeight: 1.05, marginBottom: 32 }}>Musanze,<br />Northern Rwanda</h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(245,240,232,0.55)", lineHeight: 1.85, marginBottom: 40 }}>
              The studio sits 20 minutes from the Volcanoes National Park gate, at 1,850m above sea level. Collectors who visit in person can meet the artists, see works in progress, and arrange a guided walk through the bamboo zones where Christine sketches at dawn.
            </p>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[["1,850m", "Altitude"], ["20 min", "To the park"], ["5", "Artists resident"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 300, color: "var(--ochre)" }}>{val}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{lbl}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.25)", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <span style={{ fontSize: 120, opacity: 0.12 }}>🌋</span>
            <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(255,255,255,0.06)" }} />
            <p style={{ position: "absolute", bottom: 20, left: 20, fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Virunga Massif · Rwanda</p>
          </div>
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn bg="var(--cream)">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px clamp(24px,6vw,80px)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 300, color: "var(--ink)", maxWidth: 500, lineHeight: 1.1 }}>
            Commission a piece from the forest.
          </h2>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <Link href="/commission" style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", background: "var(--ochre)", color: "#fff", padding: "14px 36px", textDecoration: "none" }}
              className="hover:!bg-[var(--ochre-light)]">Start a Commission</Link>
            <Link href="/shop" style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink)", borderBottom: "1px solid var(--ink)", paddingBottom: 2, textDecoration: "none" }}
              className="hover:!text-[var(--ochre)] hover:!border-[var(--ochre)]">Browse the Shop</Link>
          </div>
        </div>
      </FadeIn>

      <Footer />
    </main>
  );
}
