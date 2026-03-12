"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function S5Exhibition() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const labelStyle = {
    fontFamily: "var(--font-sans)",
    fontSize: 10,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.5)",
  };

  return (
    <section
      id="programme"
      ref={ref}
      className="flex flex-col justify-center"
      style={{
        minHeight: "calc(100vh - 72px)",
        backgroundColor: "var(--ink)",
        padding: "clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ maxWidth: 520 }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ ...labelStyle, marginBottom: 12 }}
          >
            Exhibition
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            style={{ ...labelStyle, marginBottom: 40 }}
          >
            January 24 – March 10, 2026
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5.5vw, 64px)",
              fontWeight: 600,
              color: "var(--cream)",
              lineHeight: 1.05,
              marginBottom: 16,
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
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(16px, 1.8vw, 20px)",
              color: "rgba(255,255,255,0.45)",
              marginBottom: 48,
            }}
          >
            Christine Mukamana
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Link
              href="/studio"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.4)",
                paddingBottom: 4,
                display: "inline-block",
              }}
              className="transition-colors duration-200 hover:!text-[var(--ochre)] hover:!border-[var(--ochre)]"
            >
              View Exhibition
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
