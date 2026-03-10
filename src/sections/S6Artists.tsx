"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const artists = [
  {
    name:      "Christine Mukamana",
    role:      "Lead Artist",
    since:     "Since 2020",
    specialty: ["Mountain Gorilla", "Golden Monkey"],
    medium:    "Graphite · Charcoal",
    quote:     "We don't draw from photographs. We draw from what we see at dawn.",
    emoji:     "🦍",
    bg:        "#1C2A1E",
  },
  {
    name:      "Josue Habimana",
    role:      "Wildlife Illustrator",
    since:     "Since 2021",
    specialty: ["African Elephant", "Buffalo", "Hippo"],
    medium:    "Ink · Watercolour",
    quote:     "I draw from memory and love — both are infinite.",
    emoji:     "🐘",
    bg:        "#2A2010",
  },
  {
    name:      "Rigobert Nzeyimana",
    role:      "Texture Specialist",
    since:     "Since 2022",
    specialty: ["Lion", "Leopard", "Eagle"],
    medium:    "Charcoal · Mixed Media",
    quote:     "Every texture is a story the animal already knows.",
    emoji:     "🦁",
    bg:        "#1A1810",
  },
];

export default function S6Artists() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      style={{ background: "var(--ink)", paddingTop: 120, paddingBottom: 120 }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingLeft: 40,
          paddingRight: 40,
          marginBottom: 72,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--ochre)",
            marginBottom: 16,
          }}
        >
          {t.artists.label}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "var(--cream)",
            maxWidth: 700,
          }}
        >
          {t.artists.headline}
        </motion.h2>
      </div>

      {/* Artist Cards */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingLeft: 40,
          paddingRight: 40,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 2,
        }}
      >
        {artists.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 * i }}
            className="group"
            style={{
              background: a.bg,
              padding: "64px 48px",
              cursor: "default",
              minHeight: 480,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Large emoji silhouette */}
            <div
              style={{
                position: "absolute",
                top: 32,
                right: 32,
                fontSize: 96,
                opacity: 0.15,
                lineHeight: 1,
                transition: "opacity 0.5s, transform 0.5s",
              }}
              className="group-hover:opacity-30 group-hover:scale-110"
            >
              {a.emoji}
            </div>

            {/* Since tag */}
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
              {t.artists.since} {a.since}
            </p>

            {/* Name */}
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 2.5vw, 30px)",
                fontWeight: 300,
                color: "var(--cream)",
                lineHeight: 1.2,
                marginBottom: 8,
              }}
            >
              {a.name}
            </h3>

            {/* Role */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                color: "var(--sand)",
                marginBottom: 16,
              }}
            >
              {a.role} — {a.medium}
            </p>

            {/* Specialties */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              {a.specialty.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    padding: "4px 10px",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Quote — revealed on hover via CSS group */}
            <p
              className="mt-0 max-h-0 overflow-hidden opacity-0 group-hover:max-h-[80px] group-hover:mt-3 group-hover:opacity-100 transition-all duration-500"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 16,
                fontWeight: 300,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.6,
              }}
            >
              &ldquo;{a.quote}&rdquo;
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
