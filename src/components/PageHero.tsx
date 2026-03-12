"use client";
import { motion } from "framer-motion";

interface PageHeroProps {
  label: string;
  headline: React.ReactNode;
  subtitle?: string;
  emoji?: string;
  children?: React.ReactNode;
}

export default function PageHero({ label, headline, subtitle, emoji = "🦍", children }: PageHeroProps) {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        minHeight: "min(85vh, 720px)",
        background: "linear-gradient(180deg, rgba(92, 122, 94, 0.18) 0%, rgba(92, 122, 94, 0.08) 100%)",
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(200,144,58,0.04) 0%, transparent 70%)" }} />
      <div className={`absolute right-[10%] top-[40%] text-[clamp(120px,25vw,320px)] opacity-[0.04] select-none ${emoji ? "" : "hidden"}`} aria-hidden>{emoji}</div>
      <div className="relative z-10 max-w-[720px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(10px,1.2vw,12px)", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 20 }}
        >
          {label}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4.5vw, 56px)",
            fontWeight: 300,
            lineHeight: 1.15,
            color: "var(--ink)",
            marginBottom: subtitle || children ? 28 : 0,
          }}
        >
          {headline}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(14px, 1.4vw, 18px)",
              fontWeight: 300,
              color: "rgba(14,16,15,0.6)",
              lineHeight: 1.75,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  );
}
