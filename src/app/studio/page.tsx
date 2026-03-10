"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";

const artists = [
  {
    name: "Christine Mukamana",
    role: "Lead Artist & Co-founder",
    since: "2020",
    medium: "Graphite · Charcoal",
    specialty: ["Mountain Gorilla", "Golden Monkey", "Crowned Crane"],
    bio: "Christine grew up walking the forest edges of Musanze, memorising the sounds of the Virunga before she ever held a pencil. Self-taught, she developed a hyper-realist graphite style that captures not just anatomy but the emotional weight of wild animals at rest. Her gorilla portraits have been exhibited in Kigali and featured in conservation publications across East Africa.",
    quote: "We don't draw from photographs. We draw from what we see at dawn.",
    emoji: "🦍",
    bg: "#1C2A1E",
    order: 0,
  },
  {
    name: "Josue Habimana",
    role: "Wildlife Illustrator",
    since: "2021",
    medium: "Ink · Watercolour",
    specialty: ["African Elephant", "Buffalo", "Hippopotamus"],
    bio: "Josue spent three years working as a field guide in Akagera National Park before returning to Musanze to paint. That time in the park transformed his understanding of animal movement — he draws elephants from memory, capturing the exact tilt of a head as a matriarch assesses the horizon. His ink wash technique has become the studio's most requested style among collectors.",
    quote: "I draw from memory and love — both are infinite.",
    emoji: "🐘",
    bg: "#2A1E10",
    order: 1,
  },
  {
    name: "Rigobert Nzeyimana",
    role: "Texture Specialist",
    since: "2022",
    medium: "Charcoal · Mixed Media",
    specialty: ["Lion", "Leopard", "African Eagle"],
    bio: "Rigobert came to SAWA through the Tuzivugire programme, arriving with a sketchbook full of big-cat studies and a fearless approach to scale. His large-format charcoal works — some exceeding 150×200cm — are studies in texture: the grain of a lion's mane rendered hair by hair, the rosettes of a leopard so precise they read as scientific illustration.",
    quote: "Every texture is a story the animal already knows.",
    emoji: "🦁",
    bg: "#1A1810",
    order: 2,
  },
];

const values = [
  { label: "Observation over reference", body: "Every artwork begins with direct observation in the field. We visit Volcanoes National Park, Akagera, and Nyungwe regularly — sketching before we ever touch final paper." },
  { label: "Conservation through art", body: "A portion of every sale funds anti-poaching patrols and ranger education in the Virunga. Art and conservation are not separate activities at SAWA." },
  { label: "Slow making", body: "A single original can take three to eight weeks from first field sketch to final work. We do not rush. The animals deserve patience." },
  { label: "Materials as respect", body: "We use only archival-grade papers, Japanese graphite, and conservation-framed glass. A SAWA work is built to last a century." },
];

function ArtistCard({ a, index }: { a: typeof artists[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const flip = index % 2 !== 0;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={{ background: a.bg, display: "grid", gridTemplateColumns: flip ? "1.5fr 1fr" : "1fr 1.5fr", minHeight: 420, overflow: "hidden" }}>
      {/* Text side */}
      <div style={{ padding: "64px 56px", display: "flex", flexDirection: "column", justifyContent: "center", order: flip ? 2 : 0 }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 12 }}>Since {a.since} · {a.medium}</p>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,42px)", fontWeight: 300, color: "var(--cream)", marginBottom: 8, lineHeight: 1.1 }}>{a.name}</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--ochre)", marginBottom: 24 }}>{a.role}</p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(245,240,232,0.55)", lineHeight: 1.85, marginBottom: 28 }}>{a.bio}</p>
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 17, color: "rgba(245,240,232,0.4)", lineHeight: 1.6 }}>&ldquo;{a.quote}&rdquo;</p>
      </div>
      {/* Visual side */}
      <div style={{ background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", order: flip ? 1 : 0, position: "relative", minHeight: 380 }}>
        <span style={{ fontSize: "clamp(120px,20vw,260px)", opacity: 0.18 }}>{a.emoji}</span>
        <div style={{ position: "absolute", bottom: 32, left: 32, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {a.specialty.map(s => (
            <span key={s} style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.12)", padding: "4px 10px" }}>{s}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, bg = "transparent" }: { children: React.ReactNode; delay?: number; bg?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }} style={{ background: bg }}>
      {children}
    </motion.div>
  );
}

export default function StudioPage() {
  return (
    <main style={{ paddingTop: 64 }}>

      {/* Hero */}
      <section style={{ minHeight: "70vh", background: "var(--forest)", display: "flex", alignItems: "flex-end", padding: "0 clamp(24px,6vw,120px) 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(200,144,58,0.07) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", fontSize: "clamp(200px,40vw,600px)", opacity: 0.05 }}>🦍</div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 20 }}>
            Est. Musanze, Rwanda — 2020
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }}
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(44px,7vw,96px)", fontWeight: 300, lineHeight: 1.0, color: "#fff", marginBottom: 32 }}>
            Three artists.<br />One forest.<br />Infinite subjects.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(16px,1.6vw,22px)", fontWeight: 300, color: "rgba(255,255,255,0.5)", maxWidth: 560, lineHeight: 1.7 }}>
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
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
              {[["1,850m", "Altitude"], ["20 min", "To the park"], ["3", "Artists resident"]].map(([val, lbl]) => (
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
