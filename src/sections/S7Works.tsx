"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const tabIds = ["all", "graphite", "charcoal", "ink", "mixed"];

const works = [
  { id: "1", title: "Amahoro",      kw: "Amahoro",      artist: "Christine Mukamana", medium: "graphite",  price: 480, animal: "Mountain Gorilla", emoji: "ðŸ¦", available: true  },
  { id: "2", title: "Isoko",        kw: "Isoko",        artist: "Josue Habimana",     medium: "ink",       price: 560, animal: "Elephant",         emoji: "ðŸ˜", available: true  },
  { id: "3", title: "Ubwoba",       kw: "Ubwoba",       artist: "Rigobert Nzeyimana", medium: "charcoal",  price: 620, animal: "Lion",             emoji: "ðŸ¦", available: true  },
  { id: "4", title: "Igikara",      kw: "Igikara",      artist: "Rigobert Nzeyimana", medium: "mixed",     price: 440, animal: "Eagle",            emoji: "ðŸ¦…", available: true  },
  { id: "5", title: "Inyana",       kw: "Inyana",       artist: "Christine Mukamana", medium: "charcoal",  price: 320, animal: "Gorilla Juvenile",  emoji: "ðŸ¦", available: true  },
  { id: "6", title: "Urukundo",     kw: "Urukundo",     artist: "Christine Mukamana", medium: "graphite",  price: 390, animal: "Mountain Gorilla", emoji: "ðŸ¦", available: false },
  { id: "7", title: "Agaciro",      kw: "Agaciro",      artist: "Josue Habimana",     medium: "ink",       price: 510, animal: "Elephant",         emoji: "ðŸ˜", available: true  },
  { id: "8", title: "Intwari",      kw: "Intwari",      artist: "Rigobert Nzeyimana", medium: "charcoal",  price: 580, animal: "Leopard",          emoji: "ðŸ†", available: true  },
];

export default function S7Works() {
  const [active, setActive] = useState("all");
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });
  const { t }  = useLanguage();

  const filtered = active === "all" ? works : works.filter((w) => w.medium === active);

  return (
    <section id="works" ref={ref} style={{ backgroundColor: "var(--cream-warm)" }}>

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
                className="group cursor-pointer"
              >
                {/* Image card */}
                <div
                  className="relative overflow-hidden mb-4"
                  style={{
                    aspectRatio: "3/4",
                    backgroundColor: "#1C2A1E",
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
                        {t.common.addToCart}
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

                {/* Info */}
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 20,
                    fontWeight: 300,
                    color: "var(--ink)",
                    lineHeight: 1.2,
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
                    marginBottom: 6,
                  }}
                >
                  {work.artist}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 400,
                    color: work.available ? "var(--ochre)" : "rgba(14,16,15,0.3)",
                  }}
                >
                  {work.available ? `$${work.price.toLocaleString()}` : "â€”"}
                </p>
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
          <a
            href="#"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--ink)",
              borderBottom: "1px solid var(--ink)",
              paddingBottom: 3,
              transition: "color 0.3s, border-color 0.3s",
            }}
            className="hover:!text-[var(--ochre)] hover:!border-[var(--ochre)]"
          >
            {t.works.viewAll} ({works.length}) \u2192</a>
        </motion.div>
      </div>
    </section>
  );
}

