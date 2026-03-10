"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function S8Process() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const { t }  = useLanguage();

  return (
    <section id="process" ref={ref} style={{ backgroundColor: "var(--cream)" }}>

      {/* Header */}
      <div className="max-w-[1480px] mx-auto px-8 lg:px-16 py-24 grid lg:grid-cols-2 gap-16 lg:gap-28"
        style={{ borderBottom: "1px solid rgba(14,16,15,0.07)" }}>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>
            {t.process.label}
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,60px)", fontWeight: 300, lineHeight: 1.05, color: "var(--ink)", marginBottom: 28 }}>
            {t.process.headline}
          </h2>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(17px,1.5vw,21px)", fontWeight: 300, color: "rgba(14,16,15,0.6)", lineHeight: 1.85 }}>
            {t.process.body1}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col justify-center">
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(17px,1.5vw,21px)", fontWeight: 300, color: "rgba(14,16,15,0.55)", lineHeight: 1.85, marginBottom: 28 }}>
            {t.process.body2}
          </p>
          <blockquote style={{ borderLeft: "2px solid var(--ochre)", paddingLeft: 20, marginTop: 8 }}>
            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(18px,1.6vw,22px)", fontWeight: 300, color: "rgba(14,16,15,0.7)", lineHeight: 1.7 }}>
              {t.process.quote}
            </p>
          </blockquote>
        </motion.div>
      </div>

      {/* Materials grid */}
      <div className="max-w-[1480px] mx-auto px-8 lg:px-16 py-16 grid grid-cols-2 md:grid-cols-3 gap-0">
        {t.process.materials.map((m, i) => (
          <motion.div key={m.name}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
            className="group cursor-default px-8 py-10 transition-colors duration-300 hover:bg-[var(--cream-warm)]"
            style={{
              borderRight: (i % 3 < 2) ? "1px solid rgba(14,16,15,0.07)" : "none",
              borderBottom: i < 3 ? "1px solid rgba(14,16,15,0.07)" : "none",
            }}>
            <div className="flex items-start justify-between mb-5">
              <p style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400, color: "var(--ink)" }}>{m.name}</p>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ochre)", border: "1px solid var(--ochre)", padding: "3px 8px", whiteSpace: "nowrap" as const }}>
                {m.grade}
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 15, fontWeight: 300, color: "rgba(14,16,15,0.5)", lineHeight: 1.8 }}>
              {m.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
