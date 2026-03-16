"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function S5Exhibition() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const labelStyle = {
    fontFamily: "'Poppins', var(--font-sans), sans-serif",
    fontSize: 10,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.5)",
  };

  return (
    <section
      id="programme"
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        height: "auto",
        maxHeight: "580px", // Slightly tighter to keep it compact
        backgroundColor: "var(--ink)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Left column: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[35vh] md:h-[580px] w-full bg-[#1A1810]"
        >
          <img
            src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop"
            alt="Artist at work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/15" />
        </motion.div>

        {/* Right column: Content */}
        <div className="flex flex-col justify-center py-10 px-8 lg:px-20 xl:px-32">
          <div className="max-w-[480px]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ ...labelStyle, marginBottom: 8 }}
            >
              Exhibition
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              style={{ ...labelStyle, marginBottom: 20 }}
            >
              January 24 – March 10, 2026
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                fontFamily: "'Poppins', var(--font-sans), sans-serif",
                fontSize: "clamp(30px, 3.8vw, 44px)",
                fontWeight: 600,
                color: "var(--cream)",
                lineHeight: 1.1,
                marginBottom: 10,
                letterSpacing: "-0.02em",
              }}
            >
              Virunga Studies
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{
                fontFamily: "'Poppins', var(--font-sans), sans-serif",
                fontSize: "15px",
                color: "rgba(255,255,255,0.45)",
                marginBottom: 14,
              }}
            >
              Christine Mukamana
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.32 }}
              style={{
                fontFamily: "'Poppins', var(--font-sans), sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.55)",
                marginBottom: 28,
              }}
            >
              A solo exhibition of graphite and charcoal works documenting the
              mountain gorilla families of Volcanoes National Park.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 28,
                alignItems: "center",
              }}
            >
              <Link
                href="/booking"
                style={{
                  fontFamily: "'Poppins', var(--font-sans), sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#fff",
                  background: "var(--ochre)",
                  padding: "14px 48px", // Increased width
                  minWidth: "160px",   // Ensures consistent "CTA" presence
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                className="transition-all duration-200 hover:!opacity-90 hover:tracking-widest"
              >
                Book
              </Link>
              <Link
                href="/events"
                style={{
                  fontFamily: "'Poppins', var(--font-sans), sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.3)",
                  paddingBottom: 4,
                  display: "inline-block",
                }}
                className="transition-colors duration-200 hover:!text-[var(--ochre)] hover:!border-[var(--ochre)]"
              >
                View More
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}