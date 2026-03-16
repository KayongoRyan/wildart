"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const tabData = [
  { id: "gorillas",  key: "gorillas" as const, kinyarwanda: "Ingagi",         title: "Mountain Gorilla", stat1: { value: "880",    unit_en: "individuals left in the wild" }, stat2: { value: "3,000m", unit_en: "altitude — their home" }, emoji: "🦍", bg: "#1C2A1E" },
  { id: "elephants", key: "elephants" as const, kinyarwanda: "Inzovu",         title: "African Elephant", stat1: { value: "415k",   unit_en: "African elephants remain" },      stat2: { value: "40yrs",  unit_en: "matriarch memory span" }, emoji: "🐘", bg: "#2A2010" },
  { id: "big-cats",  key: "bigcats" as const,   kinyarwanda: "Intare n'Ingwe", title: "Lion & Leopard",   stat1: { value: "20k",    unit_en: "lions in Africa today" },          stat2: { value: "90%",    unit_en: "population lost in 75 years" }, emoji: "🦁", bg: "#2A1A08" },
  { id: "eagles",    key: "eagles" as const,    kinyarwanda: "Inkona",         title: "Crowned Eagle",    stat1: { value: "1,500m", unit_en: "wingspan impression" },             stat2: { value: "15yrs",  unit_en: "lifespan in the wild" }, emoji: "🦅", bg: "#0F1E2A" },
];

export default function S3Collection() {
  const [active, setActive] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const { t }  = useLanguage();

  const raw = tabData[active];
  const tabKeys = ["gorillas", "elephants", "bigcats", "eagles"] as const;

  return (
    <section id="collection" ref={ref} style={{ backgroundColor: "var(--cream-warm)" }}>

      {/* Section header */}
      <div className="max-w-[1480px] mx-auto px-8 lg:px-16 pt-24 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 12 }}>
              {t.collection.label}
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,60px)", fontWeight: 300, lineHeight: 1.05, color: "var(--ink)" }}>
              {t.collection.label}
            </h2>
          </motion.div>

          {/* Tabs */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="flex gap-0">
            {tabData.map((tab, i) => (
              <button key={tab.id} onClick={() => setActive(i)}
                style={{
                  fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
                  padding: "10px 20px", borderBottom: `2px solid ${active === i ? "var(--ochre)" : "transparent"}`,
                  color: active === i ? "var(--ochre)" : "var(--warm-grey)", transition: "all 0.25s",
                  background: "none", cursor: "pointer",
                }}>
                {t.collection.tabs[tabKeys[i]]}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main panel */}
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 min-h-[580px]">

          {/* Dark image panel */}
          <div className="relative flex items-center justify-center overflow-hidden min-h-[360px]" style={{ backgroundColor: raw.bg }}>
            <span style={{ fontSize: "clamp(200px,28vw,380px)", opacity: 0.07, filter: "grayscale(1)", userSelect: "none" }}>{raw.emoji}</span>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,144,58,0.06) 0%, transparent 65%)" }} />
            <div className="absolute bottom-8 left-8">
              <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(32px,4vw,52px)", fontWeight: 300, color: "rgba(255,255,255,0.12)", lineHeight: 1 }}>
                {raw.kinyarwanda}
              </p>
            </div>
          </div>

          {/* Text panel */}
          <div className="flex flex-col justify-center px-10 lg:px-16 py-14" style={{ backgroundColor: "var(--cream)" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>
              {t.collection.tabs[raw.key]}
            </p>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3vw,46px)", fontWeight: 300, color: "var(--ink)", lineHeight: 1.1, marginBottom: 24 }}>
              {raw.title}
            </h3>
            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(16px,1.4vw,19px)", fontWeight: 300, color: "rgba(14,16,15,0.6)", lineHeight: 1.85, marginBottom: 40, maxWidth: 520 }}>
              {t.collection.bodies[raw.key]}
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[raw.stat1, raw.stat2].map((s, i) => (
                <div key={i} className="pt-5" style={{ borderTop: "1px solid rgba(14,16,15,0.08)" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,2.5vw,38px)", fontWeight: 300, color: "var(--ink)", lineHeight: 1, marginBottom: 6 }}>{s.value}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--warm-grey)" }}>{s.unit_en}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
