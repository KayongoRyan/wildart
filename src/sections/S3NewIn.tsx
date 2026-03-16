"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCurrency } from "@/context/CurrencyContext";
import { getNewInWorks } from "@/lib/works";

// Unsplash images mapped by work id as visual stand-ins
const WORK_IMAGES: Record<string, string> = {
  "1": "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2445&auto=format&fit=crop",
  "2": "https://images.unsplash.com/photo-1544965850-6f87e2213197?q=80&w=2687&auto=format&fit=crop",
  "3": "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=2530&auto=format&fit=crop",
  "4": "https://images.unsplash.com/photo-1518998053401-b3b4486fb708?q=80&w=2682&auto=format&fit=crop",
  "5": "https://images.unsplash.com/photo-1540324155970-14120ecb9623?q=80&w=2647&auto=format&fit=crop",
  "6": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=2572&auto=format&fit=crop",
  "7": "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2670&auto=format&fit=crop",
  "8": "https://images.unsplash.com/photo-1504826260979-ea187c3a0671?q=80&w=2682&auto=format&fit=crop",
};

const CATEGORIES = ["NEW", "ORIGINAL", "PRINT", "CANVAS", "VIEW ALL"];

export default function S3NewIn() {
  const [activeCategory, setActiveCategory] = useState("NEW");
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const works = getNewInWorks(8);

  return (
    <section
      className="relative w-full py-24"
      style={{ backgroundColor: "#f5f0e8", color: "var(--ink)" }}
    >
      <div className="max-w-[1480px] mx-auto px-8">
        {/* Header: Title + Category filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(2.8rem, 7vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Artworks
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="flex flex-wrap items-center gap-6"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: activeCategory === cat ? "var(--ochre)" : "var(--ink)",
                  transition: "color 0.2s",
                  padding: 0,
                }}
                className="hover:!text-[var(--ochre)]"
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {works.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <Link
                href={`/shop/${w.id}`}
                className="flex flex-col group"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {/* Image with hover zoom */}
                <div
                  className="relative w-full overflow-hidden mb-4"
                  style={{
                    aspectRatio: "4/3",
                    backgroundColor: "#1C2A1E",
                    borderRadius: 2,
                  }}
                >
                  {WORK_IMAGES[w.id] ? (
                    <img
                      src={WORK_IMAGES[w.id]}
                      alt={w.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  ) : (
                    <span
                      className="absolute inset-0 flex items-center justify-center group-hover:opacity-[0.18] transition-opacity"
                      style={{ fontSize: "clamp(60px,10vw,100px)", opacity: 0.1 }}
                    >
                      {w.emoji}
                    </span>
                  )}

                  {/* Sold overlay */}
                  {!w.available && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: "rgba(10,12,10,0.45)" }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: 11,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "#fff",
                        }}
                      >
                        Sold
                      </span>
                    </div>
                  )}
                </div>

                {/* Text */}
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 16,
                    fontWeight: 600,
                    lineHeight: 1.3,
                    marginBottom: 4,
                    color: "var(--ink)",
                  }}
                >
                  {w.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--warm-grey)",
                    marginBottom: 4,
                  }}
                >
                  {w.medium} · {w.size}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "var(--ink)",
                  }}
                >
                  {formatPrice(w.price)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Shop all CTA */}
        <div className="text-center mt-16">
          <Link
            href="/shop"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 500,
              backgroundColor: "var(--ink)",
              color: "#fff",
              padding: "14px 40px",
              textDecoration: "none",
              display: "inline-block",
              transition: "opacity 0.2s",
            }}
            className="hover:opacity-80"
          >
            Shop All Works
          </Link>
        </div>
      </div>
    </section>
  );
}
