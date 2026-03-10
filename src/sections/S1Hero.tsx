"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function S1Hero() {
  const { t } = useLanguage();
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--forest)" }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(14,16,15,0.3) 0%, rgba(14,16,15,0.15) 40%, rgba(14,16,15,0.75) 100%)",
        }}
      />

      {/* Large background animal silhouette */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span style={{ fontSize: "clamp(300px,55vw,800px)", opacity: 0.04, filter: "grayscale(1)" }}>🦍</span>
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,144,58,0.07) 0%, transparent 65%)" }}
      />

      {/* Content — centred */}
      <div className="relative z-10 flex flex-col items-center text-center w-full px-8 lg:px-16">
        <div className="max-w-[820px]">

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px,4vw,56px)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: 28,
            }}
          >
            {t.hero.headline}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(15px,1.5vw,21px)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.65,
              maxWidth: 520,
              margin: "0 auto 44px",
            }}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            <a
              href="#collection"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                backgroundColor: "var(--ochre)",
                color: "#fff",
                padding: "16px 52px",
                display: "inline-block",
                transition: "background-color 0.3s",
              }}
              className="hover:!bg-[var(--ochre-light)]"
            >
              {t.hero.cta}
            </a>
            <a
              href="#works"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                borderBottom: "1px solid rgba(255,255,255,0.25)",
                paddingBottom: 2,
                transition: "color 0.3s, border-color 0.3s",
              }}
              className="hover:!text-white hover:!border-white"
            >
              {t.hero.viewAll}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 right-10 flex flex-col items-center gap-3 z-10"
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-10"
          style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
        />
      </motion.div>
    </section>
  );
}
