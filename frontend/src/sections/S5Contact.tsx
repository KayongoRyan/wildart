"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function S5Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const { t }  = useLanguage();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" ref={ref} style={{ backgroundColor: "var(--cream-warm)" }}>
      <div className="max-w-[1480px] mx-auto px-8 lg:px-16 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-[560px]"
        >
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 24 }}>
            {t.contact.label}
          </p>
          {sent ? (
            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 18, color: "var(--ochre)" }}>Thank you.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--warm-grey)", display: "block", marginBottom: 8 }}>{t.contact.name}</label>
                <input id="contact-name" name="name" required type="text"
                  style={{ fontFamily: "var(--font-sans)", fontSize: 16, padding: "14px 18px", width: "100%", background: "var(--cream)", border: "1px solid rgba(14,16,15,0.12)", color: "var(--ink)", outline: "none" }}
                  className="focus:border-[var(--ochre)] transition-colors" />
              </div>
              <div>
                <label htmlFor="contact-email" style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--warm-grey)", display: "block", marginBottom: 8 }}>{t.contact.email}</label>
                <input id="contact-email" name="email" required type="email"
                  style={{ fontFamily: "var(--font-sans)", fontSize: 16, padding: "14px 18px", width: "100%", background: "var(--cream)", border: "1px solid rgba(14,16,15,0.12)", color: "var(--ink)", outline: "none" }}
                  className="focus:border-[var(--ochre)] transition-colors" />
              </div>
              <div>
                <label htmlFor="contact-message" style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--warm-grey)", display: "block", marginBottom: 8 }}>{t.contact.message}</label>
                <textarea id="contact-message" name="message" rows={5} required
                  style={{ fontFamily: "var(--font-sans)", fontSize: 16, padding: "14px 18px", width: "100%", background: "var(--cream)", border: "1px solid rgba(14,16,15,0.12)", color: "var(--ink)", outline: "none", resize: "vertical" }}
                  className="focus:border-[var(--ochre)] transition-colors" />
              </div>
              <button
                type="submit"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  padding: "16px 40px",
                  background: "var(--ochre)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
                className="hover:!bg-[var(--ochre-light)] transition-colors"
              >
                {t.contact.send}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
