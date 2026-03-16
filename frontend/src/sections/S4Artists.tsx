"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { artists } from "@/lib/artists";

export default function S4Artists() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { t } = useLanguage();

  return (
    <section id="artists" ref={ref} className="flex flex-col justify-center py-12 sm:py-16 md:py-20 lg:py-24" style={{ minHeight: "calc(100vh - 72px)", backgroundColor: "var(--cream)" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 24 }}>
          Featured artists
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {artists.map((a) => (
            <Link key={a.name} href={`/artists/${a.slug}`} className="block text-center group" style={{ textDecoration: "none" }}>
              <div className="mb-4" style={{ fontSize: 48, opacity: 0.2 }}>{a.emoji}</div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400, color: "var(--ink)", marginBottom: 4 }}>{a.name}</p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--warm-grey)" }}>{a.role}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/shop" style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--ink)", paddingBottom: 3 }} className="hover:text-[var(--ochre)] hover:border-[var(--ochre)]">
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}
