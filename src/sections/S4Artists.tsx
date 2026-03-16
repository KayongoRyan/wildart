"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { artists } from "@/lib/artists";

// Unsplash portrait images mapped by artist slug
const ARTIST_IMAGES: Record<string, string> = {
  "christine-mukamana":
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop",
  "josue-habimana":
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop",
  "rigobert-nzeyimana":
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop",

};

export default function S4Artists() {
  return (
    <section
      className="relative w-full py-32 border-t border-white/10"
      style={{ backgroundColor: "var(--ink)", color: "#f2f2eb" }}
    >
      <div className="max-w-[1480px] mx-auto px-8">

        {/* Top split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-24 items-start">
          {/* Left: Title */}
          <motion.h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            Featured <br className="hidden md:block" />Artists
          </motion.h2>

          {/* Right: Copy */}
          <motion.p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.875rem, 1.5vw, 1.05rem)",
              fontWeight: 400,
              lineHeight: 1.8,
              color: "rgba(242,242,235,0.75)",
              maxWidth: 520,
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            We are a collective of artists united by a shared passion to redefine
            perceptions of wildlife through art. Our group comprises artists who
            practice various disciplines — graphite, ink, charcoal and mixed media —
            all rooted in direct observation of Rwanda's wildlife.
          </motion.p>
        </div>

        {/* Horizontal scrolling artist cards */}
        <div
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {artists.map((a, idx) => (
            <motion.div
              key={a.slug}
              className="snap-start shrink-0"
              style={{
                width: "clamp(260px, 30vw, 380px)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <Link
                href={`/artists/${a.slug}`}
                className="flex flex-col group"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {/* Portrait image */}
                <div
                  className="relative w-full overflow-hidden mb-6"
                  style={{
                    aspectRatio: "4/5",
                    backgroundColor: a.bg,
                    borderRadius: 2,
                  }}
                >
                  {ARTIST_IMAGES[a.slug] ? (
                    <img
                      src={ARTIST_IMAGES[a.slug]}
                      alt={a.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale"
                    />
                  ) : (
                    <span
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ fontSize: 64, opacity: 0.15 }}
                    >
                      {a.emoji}
                    </span>
                  )}
                </div>

                {/* Name & role */}
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 18,
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                    marginBottom: 4,
                    color: "#f2f2eb",
                  }}
                >
                  {a.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(242,242,235,0.45)",
                  }}
                >
                  {a.role}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all artists CTA */}
        <div className="mt-12 flex justify-end">
          <Link
            href="/studio"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "var(--ochre)",
              textDecoration: "none",
              borderBottom: "1px solid var(--ochre)",
              paddingBottom: 3,
              display: "inline-block",
            }}
          >
            View all artists →
          </Link>
        </div>

      </div>
    </section>
  );
}
