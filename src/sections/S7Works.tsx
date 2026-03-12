"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { works, getNewInWorks } from "@/lib/works";

const tabIds = ["all", "graphite", "charcoal", "ink", "mixed"];
const mediumCards = [
  { id: "graphite", labelKey: 1, emoji: "✏️", bg: "#1C2A1E" },
  { id: "charcoal", labelKey: 2, emoji: "🖤", bg: "#2A2010" },
  { id: "ink", labelKey: 3, emoji: "🖋️", bg: "#1A1D1A" },
  { id: "mixed", labelKey: 4, emoji: "🎨", bg: "#2A1E18" },
];

export default function S7Works() {
  const [active, setActive] = useState("all");
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });
  const { t }  = useLanguage();
  const newIn  = getNewInWorks(4);

  const filtered = active === "all"
    ? works
    : works.filter((w) => (active === "mixed" && w.medium.toLowerCase().includes("mixed")) || w.medium.toLowerCase() === active);

  return (
    <section id="works" ref={ref} style={{ backgroundColor: "var(--cream-warm)" }}>

      {/* Shop by Medium — Banana Hill style */}
      <div className="max-w-[1480px] mx-auto px-8 lg:px-16 pt-24 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 24 }}
        >
          {t.works.shopByMedium}
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mediumCards.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/shop?medium=${m.id}`}
                className="block group overflow-hidden"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="relative flex items-center justify-center"
                  style={{ aspectRatio: "4/3", backgroundColor: m.bg }}
                >
                  <span style={{ fontSize: "clamp(48px,8vw,80px)", opacity: 0.15 }} className="group-hover:opacity-25 transition-opacity">{m.emoji}</span>
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink)", marginTop: 12, textAlign: "center" }}>
                  {t.works.filters[m.labelKey]}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            href="/shop"
            style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink)", borderBottom: "1px solid var(--ink)", paddingBottom: 3, textDecoration: "none" }}
            className="hover:!text-[var(--ochre)] hover:!border-[var(--ochre)]"
          >
            {t.works.shopAll} →
          </Link>
        </motion.div>
      </div>

      {/* New in — horizontal strip */}
      <div className="max-w-[1480px] mx-auto px-8 lg:px-16 pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 20 }}
        >
          {t.works.newIn}
        </motion.p>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {newIn.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
              className="flex-shrink-0 w-[240px] md:w-[280px]"
            >
              <Link href={`/shop/${work.id}`} className="block group" style={{ textDecoration: "none" }}>
                <div className="relative overflow-hidden mb-3" style={{ aspectRatio: "3/4", backgroundColor: "#1C2A1E" }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ fontSize: "clamp(60px,10vw,100px)", opacity: 0.1 }} className="group-hover:!opacity-[0.18] transition-opacity">{work.emoji}</span>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4" style={{ background: "linear-gradient(to top, rgba(14,16,15,0.85) 0%, transparent 50%)" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#fff" }}>View</span>
                  </div>
                </div>
                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 18, fontWeight: 300, color: "var(--ink)", marginBottom: 4 }}>{work.kw}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 4 }}>{work.artist} · {work.year}</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 400, color: "var(--ochre)" }}>${work.price.toLocaleString()}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div
        className="max-w-[1480px] mx-auto px-8 lg:px-16 pt-24 pb-0"
        style={{ borderBottom: "1px solid rgba(14,16,15,0.07)" }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-0">
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
              {t.works.label}
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
              {t.works.headline}
            </h2>
          </motion.div>

          {/* Tab row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex gap-0 flex-wrap"
          >
            {tabIds.map((id, i) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "14px 20px",
                  borderBottom: `2px solid ${active === id ? "var(--ochre)" : "transparent"}`,
                  color: active === id ? "var(--ochre)" : "var(--warm-grey)",
                  transition: "all 0.25s",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                {t.works.filters[i]}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Works grid */}
      <div className="max-w-[1480px] mx-auto px-8 lg:px-16 py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {filtered.map((work, i) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <Link
                  href={`/shop/${work.id}`}
                  style={{ textDecoration: "none", display: "block" }}
                  className="group cursor-pointer"
                >
                  {/* Image card — bolder, Nothing-style */}
                  <div
                    className="relative overflow-hidden mb-4"
                    style={{
                      aspectRatio: "3/4",
                      backgroundColor: "var(--forest)",
                      border: "1px solid rgba(14,16,15,0.06)",
                    }}
                  >
                    {/* Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        style={{
                          fontSize: "clamp(80px,10vw,120px)",
                          opacity: !work.available ? 0.04 : 0.08,
                          filter: "grayscale(1)",
                          transition: "opacity 0.4s",
                        }}
                        className="group-hover:!opacity-[0.14]"
                      >
                        {work.emoji}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5"
                      style={{ background: "linear-gradient(to top, rgba(14,16,15,0.8) 0%, transparent 60%)" }}
                    >
                      {!work.available ? (
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: 10,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.4)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            padding: "6px 12px",
                          }}
                        >
                          {t.common.sold}
                        </span>
                      ) : (
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: 10,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            backgroundColor: "var(--ochre)",
                            color: "#fff",
                            padding: "8px 14px",
                          }}
                        >
                          View Details
                        </span>
                      )}
                    </div>

                    {/* Sold overlay */}
                    {!work.available && (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: "rgba(14,16,15,0.4)" }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: 9,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.35)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            padding: "6px 14px",
                          }}
                        >
                          {t.common.sold}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info — minimal, price leads */}
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(22px,2vw,26px)",
                      fontWeight: 400,
                      color: "var(--ink)",
                      lineHeight: 1.15,
                      marginBottom: 4,
                    }}
                  >
                    {work.kw}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--warm-grey)",
                      marginBottom: 8,
                    }}
                  >
                    {work.artist}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(20px,2vw,24px)",
                      fontWeight: 500,
                      color: work.available ? "var(--ochre)" : "rgba(10,12,10,0.25)",
                    }}
                  >
                    {work.available ? `$${work.price.toLocaleString()}` : "—"}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            href="/shop"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--ink)",
              borderBottom: "1px solid var(--ink)",
              paddingBottom: 3,
              transition: "color 0.3s, border-color 0.3s",
              textDecoration: "none",
            }}
            className="hover:!text-[var(--ochre)] hover:!border-[var(--ochre)]"
          >
            {t.works.viewAll} ({works.length}) →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
