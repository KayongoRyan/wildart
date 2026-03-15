"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCurrency } from "@/context/CurrencyContext";
import { getNewInWorks } from "@/lib/works";

export default function S3NewIn() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const works = getNewInWorks(4);

  return (
    <section ref={ref} className="flex flex-col justify-center py-16 lg:py-24" style={{ minHeight: "calc(100vh - 72px)", backgroundColor: "var(--cream-warm)" }}>
      <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
        <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 24 }}>
          {t.works.newIn}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {works.map((w) => (
            <Link key={w.id} href={`/shop/${w.id}`} className="block group" style={{ textDecoration: "none" }}>
              <div className="relative overflow-hidden mb-3" style={{ aspectRatio: "3/4", backgroundColor: "#1C2A1E" }}>
                <span style={{ fontSize: "clamp(60px,10vw,100px)", opacity: 0.1 }} className="absolute inset-0 flex items-center justify-center group-hover:opacity-[0.18] transition-opacity">{w.emoji}</span>
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 400, color: "var(--ink)", marginBottom: 4 }}>{w.kw}</p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 4 }}>{w.year} | Rwanda | {w.medium}</p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--warm-grey)" }}>{w.size}</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 400, color: "var(--ochre)", marginTop: 4 }}>{formatPrice(w.price)}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/shop" style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", backgroundColor: "var(--ink)", color: "#fff", padding: "14px 32px", textDecoration: "none" }} className="hover:opacity-90">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
