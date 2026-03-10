"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function S4Wild() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section id="wild" ref={ref} className="overflow-hidden" style={{ backgroundColor: "var(--cream)" }}>

      {/* Top band â€” full-bleed dark */}
      <div
        className="relative py-24 lg:py-32 px-8 lg:px-16 overflow-hidden"
        style={{ backgroundColor: "var(--ink)" }}
      >
        {/* Large background animal */}
        <div
          className="absolute inset-0 flex items-center justify-end pointer-events-none select-none"
          aria-hidden="true"
        >
          <span style={{ fontSize: "clamp(280px,42vw,600px)", opacity: 0.04, marginRight: "-5%" }}>ðŸ˜</span>
        </div>

        <div className="relative z-10 max-w-[1480px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">

          {/* Label */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ochre)",
                marginBottom: 12,
              }}
            >
              Lightness of Observation
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px,4vw,56px)",
                fontWeight: 300,
                lineHeight: 1.08,
                color: "#fff",
              }}
            >
              The Wild
            </motion.h2>
          </div>

          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(18px,1.8vw,24px)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
                marginBottom: 32,
              }}
            >
              Here, the wild is not a destination. It is a neighbour. The Virunga volcanoes rise above Musanze at night. In the morning, the forest mist rolls down into the streets. Every artwork begins before the pen touches paper â€” it begins with hours of watching.
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px,2vw,28px)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.4,
                marginBottom: 40,
              }}
            >
              Immerse yourself in the intimacy of the wild. Not a safari â€” a study. Not a photograph â€” a conversation between the artist and the animal, conducted in silence and graphite dust.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45 }}
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(16px,1.3vw,18px)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.38)",
                lineHeight: 1.8,
              }}
            >
              Acacia groves and bamboo slopes, savannah at dusk and high-altitude frost. Rwanda holds three of Africa's distinct ecosystems within two hours of Musanze. Our artists move through all of them.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Bottom band â€” three columns on cream */}
      <div className="max-w-[1480px] mx-auto px-8 lg:px-16 py-20 grid sm:grid-cols-3 gap-0" style={{ borderTop: "1px solid rgba(14,16,15,0.06)" }}>
        {[
          { emoji: "ðŸŒ¿", label: "Virunga Volcanoes", desc: "Mountain gorilla habitat. The artists visit habituation groups three times weekly." },
          { emoji: "ðŸŒ¾", label: "Akagera Savannah",  desc: "Home to elephant, lion, hippo and buffalo. Three-hour drive east of Musanze." },
          { emoji: "ðŸ¦…", label: "Nyungwe Forest",    desc: "Canopy walks above the oldest rainforest in Central Africa. Eagles, chimps, colobus." },
        ].map(({ emoji, label, desc }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 + i * 0.1 }}
            className="px-8 py-10 group cursor-default transition-colors"
            style={{ borderRight: i < 2 ? "1px solid rgba(14,16,15,0.06)" : "none" }}
          >
            <span className="block text-4xl mb-5 transition-transform duration-300 group-hover:scale-110">
              {emoji}
            </span>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 400,
                color: "var(--ink)",
                marginBottom: 10,
              }}
            >
              {label}
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 15,
                fontWeight: 300,
                color: "rgba(14,16,15,0.5)",
                lineHeight: 1.8,
              }}
            >
              {desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

