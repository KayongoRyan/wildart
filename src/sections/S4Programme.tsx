"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function S4Programme() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const { t } = useLanguage();

  return (
    <section id="programme" ref={ref} style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-[1480px] mx-auto px-8 lg:px-16 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 12 }}>
            {t.programme.label}
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 300, lineHeight: 1.05, color: "var(--ink)", marginBottom: 40 }}>
            {t.programme.headline}
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12">
          {t.programme.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ borderBottom: "1px solid rgba(14,16,15,0.08)", paddingBottom: 24 }}
            >
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 8 }}>{item.dates}</p>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,2.5vw,28px)", fontWeight: 300, color: "var(--ink)" }}>{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
