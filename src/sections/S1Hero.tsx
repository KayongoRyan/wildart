"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function S1Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 sm:py-40 md:py-48 lg:py-56 xl:py-64" style={{ backgroundColor: "rgba(92, 122, 94, 0.27)" }}>
      <div className="max-w-[900px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-balance"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(16px, 2.5vw, 28px)",
            fontWeight: 300,
            lineHeight: 1.4,
            color: "var(--ink)",
          }}
        >
          {t.hero.headline}
        </motion.h1>
      </div>
    </section>
  );
}
