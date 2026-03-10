"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer style={{ background: "var(--ink)", paddingTop: 80, paddingBottom: 48 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 48,
            paddingBottom: 64,
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Brand */}
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 300, letterSpacing: "0.3em", color: "var(--cream)", textTransform: "uppercase", marginBottom: 16 }}>
              SAWA
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxWidth: 200 }}>
              Studio of African Wildlife Art<br />Musanze, Rwanda
            </p>
          </div>

          {/* Studio */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 20 }}>{t.footer.explore}</p>
            {[["The Studio", "/studio"], ["The Wild", "/wild"], ["The Artists", "/studio#artists"]].map(([label, href]) => (
              <Link key={href} href={href} style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 12, textDecoration: "none", transition: "color 0.3s" }}
                className="hover:!text-[var(--ochre)]">{label}</Link>
            ))}
          </div>

          {/* Shop */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 20 }}>{t.footer.services}</p>
            {[["All Works", "/shop"], ["Commission a Piece", "/commission"], ["Cart", "/cart"]].map(([label, href]) => (
              <Link key={href} href={href} style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 12, textDecoration: "none" }}
                className="hover:!text-[var(--ochre)]">{label}</Link>
            ))}
          </div>

          {/* Program */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 20 }}>{t.footer.kinyarwanda}</p>
            {[["Tuzivugire", "/tuzivugire"], ["Support Us", "/tuzivugire#support"], ["Contact", "/commission#contact"]].map(([label, href]) => (
              <Link key={href} href={href} style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 12, textDecoration: "none" }}
                className="hover:!text-[var(--ochre)]">{label}</Link>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ paddingTop: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>
            {t.footer.copyright}
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>
            Musanze · Virunga · Rwanda
          </p>
        </div>
      </div>
    </footer>
  );
}
