"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function S1Hero() {
  const { t } = useLanguage();

  return (
    <section
      className="relative flex flex-col items-center justify-center w-full h-full min-h-0 px-4 sm:px-6 md:px-8 lg:px-12"
      style={{
        backgroundColor: "rgba(92, 122, 94, 0.67)",
        animation: "bg-color-transition-hero 8s ease-in-out infinite",
      }}
    >
      <div className="max-w-[900px] mx-auto w-full text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-balance text-lg sm:text-xl md:text-2xl lg:text-[28px]"
          style={{
            fontFamily: "var(--font-display)",
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
