"use client";
import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const exploreHrefs = ["#collection", "#wild", "#artists", "#works", "#process"];
const programmeHrefs = ["#programme", "/studio", "#works"];
const servicesHrefs = ["/commission", "/shop", "/tuzivugire", "https://wa.me/250700000000"];

export default function S10Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "#0A0E0A" }}>
      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(180px,26vw,360px)", fontWeight: 300, color: "rgba(245,240,232,0.018)", lineHeight: 1, letterSpacing: "0.08em" }}>
          SAWA
        </span>
      </div>

      {/* Grid */}
      <div className="relative z-10 max-w-[1480px] mx-auto px-8 lg:px-16 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>

        {/* Brand + Visit */}
        <div className="lg:col-span-2">
          <p style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 300, letterSpacing: "0.1em", color: "rgba(245,240,232,0.9)", marginBottom: 8 }}>SAWA</p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>1°30′S 29°38′E</p>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 14, color: "rgba(245,240,232,0.3)", lineHeight: 1.8, marginBottom: 20 }}>
            Studio of African Wildlife Art<br />{t.footer.visitInfo.address}
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 6 }}>Hours</p>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 14, color: "rgba(245,240,232,0.4)" }}>{t.footer.visitInfo.hours}</p>
          <a href={`mailto:${t.footer.visitInfo.email}`} style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ochre)", marginTop: 12, display: "inline-block" }} className="hover:opacity-80 transition-opacity">
            {t.footer.visitInfo.email}
          </a>
        </div>

        {/* Programme */}
        <div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 20 }}>
            {t.footer.programme}
          </p>
          <ul className="space-y-3">
            {t.footer.links.programme.map((label, i) => (
              <li key={label}>
                <Link href={programmeHrefs[i] ?? "#"} style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16, fontWeight: 300, color: "rgba(245,240,232,0.4)", transition: "color 0.3s" }}
                  className="hover:!text-[rgba(245,240,232,0.85)]">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 20 }}>
            {t.footer.explore}
          </p>
          <ul className="space-y-3">
            {t.footer.links.explore.map((label, i) => (
              <li key={label}>
                <a href={exploreHrefs[i]} style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16, fontWeight: 300, color: "rgba(245,240,232,0.4)", transition: "color 0.3s" }}
                  className="hover:!text-[rgba(245,240,232,0.85)]">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 20 }}>
            {t.footer.newsletter}
          </p>
          {subscribed ? (
            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16, color: "var(--ochre)" }}>Thank you!</p>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.cta.emailPlaceholder}
                required
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  outline: "none",
                }}
                className="placeholder:text-white/30 focus:border-[var(--ochre)] transition-colors"
              />
              <button
                type="submit"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  padding: "12px 20px",
                  background: "var(--ochre)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                {t.cta.joinBtn}
              </button>
            </form>
          )}
          {/* Social */}
          <div className="flex gap-4 mt-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              style={{ color: "rgba(255,255,255,0.35)", fontSize: 18 }} className="hover:!text-[var(--ochre)] transition-colors">@sawa.studio</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 max-w-[1480px] mx-auto px-8 lg:px-16 py-5 flex flex-wrap items-center justify-between gap-4">
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.15)" }}>
          {t.footer.copyright}
        </p>
        <div className="flex flex-wrap gap-6">
          {t.footer.legal.map((l) => (
            <a key={l} href="#" style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)", transition: "color 0.3s" }}
              className="hover:!text-[rgba(255,255,255,0.5)]">{l}</a>
          ))}
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.15)" }}>
            {t.footer.madeIn}
          </span>
        </div>
      </div>
    </footer>
  );
}
