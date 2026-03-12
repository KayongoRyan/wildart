"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function S1Hero() {
  const { t } = useLanguage();

  return (
    <section
      className="relative flex flex-col items-center justify-center"
      style={{
        minHeight: "calc(100vh - 72px)",
        backgroundColor: "rgba(92, 122, 94, 0.67)",
        animation: "bg-color-transition-hero 8s ease-in-out infinite",
      }}
    >
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
