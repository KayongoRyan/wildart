"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const mediums = [
  { id: "graphite", labelKey: 1, emoji: "✏️", bg: "#1C2A1E" },
  { id: "charcoal", labelKey: 2, emoji: "🖤", bg: "#2A2010" },
  { id: "ink", labelKey: 3, emoji: "🖋️", bg: "#1A1D1A" },
  { id: "mixed", labelKey: 4, emoji: "🎨", bg: "#2A1E18" },
];

const filterLabels = ["Graphite", "Charcoal", "Ink", "Mixed Media"];

export default function S2ShopMedium() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-16 lg:py-24" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
        <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 24 }}>
          {t.works.shopByMedium}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mediums.map((m, i) => (
            <Link key={m.id} href={`/shop?medium=${m.id}`} className="block group" style={{ textDecoration: "none" }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", backgroundColor: m.bg }}>
                <span style={{ fontSize: "clamp(48px,8vw,80px)", opacity: 0.15 }} className="block text-center pt-8 group-hover:opacity-25 transition-opacity">{m.emoji}</span>
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink)", marginTop: 12, textAlign: "center" }}>
                {filterLabels[m.labelKey - 1]}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/shop" style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--ink)", paddingBottom: 3 }} className="hover:text-[var(--ochre)] hover:border-[var(--ochre)]">
            {t.works.shopAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
