"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function S9CTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const { t } = useLanguage();

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: "var(--forest)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(200,144,58,0.08) 0%, transparent 65%)" }} />

      <div className="relative z-10 max-w-[1480px] mx-auto px-8 lg:px-16 py-28 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28">

          {/* Commission CTA */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 20 }}>
              {t.cta.commissionLabel}
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,72px)", fontWeight: 300, lineHeight: 0.95, color: "#fff", marginBottom: 28 }}>
              {t.cta.commissionH2.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(16px,1.5vw,20px)", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.85, maxWidth: 460, marginBottom: 36 }}>
              {t.cta.commissionBody}
            </p>
            <div className="space-y-3">
              {t.cta.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 13, color: "var(--ochre)", minWidth: 20 }}>{i + 1}</span>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>{step}</p>
                </div>
              ))}
            </div>
            <a href="#" style={{ display: "inline-block", marginTop: 36, fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", backgroundColor: "var(--ochre)", color: "#fff", padding: "14px 32px", transition: "background-color 0.3s" }}
              className="hover:!bg-[var(--ochre-light)]">
              {t.cta.commissionCta}
            </a>
          </motion.div>

          {/* Collector circle */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.15 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 20 }}>
              {t.cta.circleLabel}
            </p>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3vw,44px)", fontWeight: 300, lineHeight: 1.1, color: "#fff", marginBottom: 20 }}>
              {t.cta.circleH3.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h3>
            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(15px,1.3vw,18px)", fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 32 }}>
              {t.cta.circleBody}
            </p>

            {status === "sent" ? (
              <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 20, color: "var(--ochre)" }}>
                {t.cta.circleWelcome}
              </p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email) setStatus("sent"); }} className="flex gap-0">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.cta.emailPlaceholder} required
                  style={{ flex: 1, fontFamily: "var(--font-display)", fontSize: 16, fontStyle: "italic", color: "#fff", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", padding: "14px 18px", outline: "none" }} />
                <button type="submit"
                  style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", backgroundColor: "var(--ochre)", color: "#fff", padding: "14px 24px", border: "none", cursor: "pointer", transition: "background-color 0.3s" }}>
                  {t.cta.joinBtn}
                </button>
              </form>
            )}

            <div className="grid grid-cols-3 gap-4 mt-10">
              {t.cta.perks.map((p) => (
                <div key={p} className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{p}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
