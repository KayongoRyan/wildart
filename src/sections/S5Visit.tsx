"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function S5Visit() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const { t } = useLanguage();

  const mapUrl = "https://www.google.com/maps/search/Musanze,+Rwanda";

  return (
    <section id="visit" ref={ref} style={{ backgroundColor: "var(--ink)" }}>
      <div className="max-w-[1480px] mx-auto px-8 lg:px-16 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 20 }}>
            {t.visit.label}
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 18, color: "rgba(245,240,232,0.7)", marginBottom: 20 }}>{t.visit.hours}</p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(245,240,232,0.5)", marginBottom: 16 }}>{t.visit.address}</p>
          <a href={`mailto:${t.visit.email}`} style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ochre)", display: "inline-block", marginBottom: 24 }} className="hover:opacity-80">
            {t.visit.email}
          </a>
          <br />
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--cream)",
              border: "1px solid rgba(245,240,232,0.3)",
              padding: "12px 24px",
              textDecoration: "none",
              display: "inline-block",
            }}
            className="hover:!border-[var(--ochre)] hover:!text-[var(--ochre)] transition-colors"
          >
            {t.visit.mapLink}
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ aspectRatio: "16/10", backgroundColor: "rgba(28,42,30,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <span style={{ fontSize: "clamp(80px,15vw,140px)", opacity: 0.08 }}>📍</span>
        </motion.div>
      </div>
    </section>
  );
}
