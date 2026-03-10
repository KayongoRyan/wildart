"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const tabs = [
  {
    id: "gorillas",
    label: "Gorillas",
    title: "Mountain Gorilla",
    kinyarwanda: "Ingagi",
    body: "The mountain gorilla lives only here â€” in the Virungas, a chain of volcanoes straddling Rwanda, Uganda and DRC. Christine draws them from habituation zones she has visited since childhood. The silverback carries the whole group's story in his posture. She has learned to read it.",
    stat1: { value: "880", unit: "individuals left in the wild" },
    stat2: { value: "3,000m", unit: "altitude â€” their home" },
    emoji: "ðŸ¦",
    bg: "#1C2A1E",
  },
  {
    id: "elephants",
    label: "Elephants",
    title: "African Elephant",
    kinyarwanda: "Inzovu",
    body: "Josue spent years as a ranger guide in Akagera National Park before he picked up a pen. His elephants move across the paper with the slow confidence of animals who remember every waterhole for a hundred kilometres. Memory is his subject.",
    stat1: { value: "415k", unit: "African elephants remain" },
    stat2: { value: "40yrs", unit: "matriarch memory span" },
    emoji: "ðŸ˜",
    bg: "#2A2010",
  },
  {
    id: "big-cats",
    label: "Big Cats",
    title: "Lion & Leopard",
    kinyarwanda: "Intare n'Ingwe",
    body: "Rigobert works in deep shadow. His charcoal technique â€” pressing hard on rough paper, lifting with an eraser â€” gives his big cats a cinematic quality: half-emerged from darkness, as they always are in the real savannah. Fear is not the point. Awe is.",
    stat1: { value: "20k", unit: "lions in Africa today" },
    stat2: { value: "90%", unit: "population lost in 75 years" },
    emoji: "ðŸ¦",
    bg: "#2A1A08",
  },
  {
    id: "eagles",
    label: "Eagles",
    title: "Crowned Eagle",
    kinyarwanda: "Inkona",
    body: "The crowned eagle is Africa's most powerful aerial predator. Rigobert draws it in mixed media â€” ink underline, charcoal shadow â€” catching the moment just before the stoop, when the world below the raptor narrows to a single point of focus.",
    stat1: { value: "1,500m", unit: "wingspan impression" },
    stat2: { value: "15yrs", unit: "lifespan in the wild" },
    emoji: "ðŸ¦…",
    bg: "#0F1E2A",
  },
];

export default function S3Collection() {
  const [active, setActive] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  const tab = tabs[active];

  return (
    <section id="collection" ref={ref} style={{ backgroundColor: "var(--cream-warm)" }}>

      {/* Section header */}
      <div className="max-w-[1480px] mx-auto px-8 lg:px-16 pt-24 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ochre)",
                marginBottom: 12,
              }}
            >
              Essence of the Wild
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px,4vw,60px)",
                fontWeight: 300,
                lineHeight: 1.05,
                color: "var(--ink)",
              }}
            >
              Collection
            </h2>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex gap-0"
          >
            {tabs.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  borderBottom: `2px solid ${active === i ? "var(--ochre)" : "transparent"}`,
                  color: active === i ? "var(--ochre)" : "var(--warm-grey)",
                  transition: "all 0.25s",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                {t.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main panel â€” full-bleed content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 min-h-[580px]"
        >
          {/* Left â€” dark image panel */}
          <div
            className="relative flex items-center justify-center overflow-hidden min-h-[360px]"
            style={{ backgroundColor: tab.bg }}
          >
            {/* Animal graphic */}
            <span
              style={{
                fontSize: "clamp(200px,28vw,380px)",
                opacity: 0.07,
                filter: "grayscale(1)",
                userSelect: "none",
              }}
            >
              {tab.emoji}
            </span>

            {/* Radial depth */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,144,58,0.06) 0%, transparent 65%)" }}
            />

            {/* Bottom label */}
            <div className="absolute bottom-8 left-8">
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(32px,4vw,52px)",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.12)",
                  lineHeight: 1,
                }}
              >
                {tab.kinyarwanda}
              </p>
            </div>
          </div>

          {/* Right â€” text panel */}
          <div className="flex flex-col justify-center px-10 lg:px-16 py-14" style={{ backgroundColor: "var(--cream)" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ochre)",
                marginBottom: 16,
              }}
            >
              {tab.label}
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px,3vw,46px)",
                fontWeight: 300,
                color: "var(--ink)",
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              {tab.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(16px,1.4vw,19px)",
                fontWeight: 300,
                color: "rgba(14,16,15,0.6)",
                lineHeight: 1.85,
                marginBottom: 40,
                maxWidth: 520,
              }}
            >
              {tab.body}
            </p>

            {/* Two stats */}
            <div className="grid grid-cols-2 gap-6">
              {[tab.stat1, tab.stat2].map((s, i) => (
                <div
                  key={i}
                  className="pt-5"
                  style={{ borderTop: "1px solid rgba(14,16,15,0.08)" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(28px,2.5vw,38px)",
                      fontWeight: 300,
                      color: "var(--ink)",
                      lineHeight: 1,
                      marginBottom: 6,
                    }}
                  >
                    {s.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--warm-grey)",
                    }}
                  >
                    {s.unit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

