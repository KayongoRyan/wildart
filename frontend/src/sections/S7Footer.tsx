"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function S7Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12" style={{ backgroundColor: "var(--ink)" }}>
      <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>Explore</p>
            <Link href="/shop" style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 8, textDecoration: "none" }} className="hover:!text-[var(--ochre)]">Artwork</Link>
            <Link href="/#artists" style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 8, textDecoration: "none" }} className="hover:!text-[var(--ochre)]">Artists</Link>
            <Link href="/#programme" style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none" }} className="hover:!text-[var(--ochre)]">Exhibitions</Link>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>Company</p>
            <Link href="/studio" style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 8, textDecoration: "none" }} className="hover:!text-[var(--ochre)]">Our story</Link>
            <Link href="/#artists" style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 8, textDecoration: "none" }} className="hover:!text-[var(--ochre)]">Our artists</Link>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>Hours</p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Mon–Sat 10am–6pm</p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Sun 12pm–6pm</p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>Follow</p>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none" }} className="hover:!text-[var(--ochre)]">Instagram</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24 }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
