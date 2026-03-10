"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const exploreHrefs = ["#collection", "#wild", "#artists", "#works", "#process"];
const servicesHrefs = ["#", "#works", "#", "https://wa.me/250700000000"];

export default function S10Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "#0A0E0A" }}>
      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(180px,26vw,360px)", fontWeight: 300, color: "rgba(245,240,232,0.018)", lineHeight: 1, letterSpacing: "0.08em" }}>
          SAWA
        </span>
      </div>

      {/* Grid */}
      <div className="relative z-10 max-w-[1480px] mx-auto px-8 lg:px-16 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>

        {/* Brand */}
        <div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 300, letterSpacing: "0.1em", color: "rgba(245,240,232,0.9)", marginBottom: 8 }}>SAWA</p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>1°30′S 29°38′E</p>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 14, color: "rgba(245,240,232,0.3)", lineHeight: 1.8 }}>
            Studio of African Wildlife Art<br />Musanze, Northern Province<br />Rwanda
          </p>
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

        {/* Services */}
        <div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 20 }}>
            {t.footer.services}
          </p>
          <ul className="space-y-3">
            {t.footer.links.services.map((label, i) => (
              <li key={label}>
                <a href={servicesHrefs[i]}
                  target={servicesHrefs[i].startsWith("http") ? "_blank" : undefined}
                  rel={servicesHrefs[i].startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16, fontWeight: 300, color: label.includes("WhatsApp") || label.includes("Studio") ? "var(--ochre)" : "rgba(245,240,232,0.4)", transition: "color 0.3s" }}
                  className="hover:!text-[rgba(245,240,232,0.85)]">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kinyarwanda */}
        <div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 20 }}>
            {t.footer.kinyarwanda}
          </p>
          <ul className="space-y-3">
            {["Amahoro", "Intwari", "Ubwiza", "Guhirwa", "Tuzivugire"].map((w) => (
              <li key={w}>
                <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 18, fontWeight: 300, color: "var(--ochre)", opacity: 0.7 }}>{w}</span>
              </li>
            ))}
          </ul>
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
