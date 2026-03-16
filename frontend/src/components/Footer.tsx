"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const exploreLinks = [
  { label: "The Studio", href: "/studio" },
  { label: "The Wild", href: "/shop#the-wild" },
  { label: "Artists", href: "/#artists" },
  { label: "Exhibitions", href: "/#programme" },
];

const shopLinks = [
  { label: "All Works", href: "/shop" },
  { label: "Commission", href: "/commission" },
  { label: "Cart", href: "/cart" },
];

const programmeLinks = [
  { label: "Conservation", href: "/conservation" },
  { label: "Support Us", href: "/conservation#support" },
  { label: "Contact", href: "/commission#contact" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="relative overflow-hidden py-32"
      style={{
        backgroundColor: "var(--green)",
        borderTop: "1px solid rgba(255,255,255,0.15)"
      }}
    >
      {/* Subtle watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(120px, 18vw, 280px)",
            fontWeight: 700,
            color: "rgba(245,240,232,0.02)",
            lineHeight: 1,
            letterSpacing: "0.12em",
          }}
        >
          SAWA
        </span>
      </div>

      <div className="relative z-10 max-w-[1480px] mx-auto px-8">
        {/* Main grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 sm:gap-10 md:gap-12 lg:gap-16 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-10 sm:pb-12 md:pb-16"
          style={{
            paddingBottom: "clamp(48px, 6vw, 64px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Brand + Visit */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ marginBottom: 28 }}>
              <img
                src="/assets/sawa-logo2.svg"
                alt="SAWA Logo"
                style={{ height: 40, width: "auto" }}
              />
            </div>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
                marginBottom: 16,
              }}
            >
              Studio of African Wildlife Art
              <br />
              {t.footer.visitInfo.address}
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: 6,
              }}
            >
              Hours
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontStyle: "italic",
                fontSize: 14,
                color: "rgba(255,255,255,0.4)",
                marginBottom: 16,
              }}
            >
              {t.footer.visitInfo.hours}
            </p>
            <a
              href={`mailto:${t.footer.visitInfo.email}`}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "var(--ochre)",
                textDecoration: "none",
              }}
              className="hover:opacity-80 transition-opacity"
            >
              {t.footer.visitInfo.email}
            </a>
          </div>

          {/* Explore */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginBottom: 20,
              }}
            >
              {t.footer.explore}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {exploreLinks.map(({ label, href }) => (
                <li key={href} style={{ marginBottom: 12 }}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                    }}
                    className="hover:!text-[var(--ochre)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginBottom: 20,
              }}
            >
              {t.footer.services}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {shopLinks.map(({ label, href }) => (
                <li key={href} style={{ marginBottom: 12 }}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                    }}
                    className="hover:!text-[var(--ochre)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programme */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginBottom: 20,
              }}
            >
              {t.footer.programme}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {programmeLinks.map(({ label, href }) => (
                <li key={href} style={{ marginBottom: 12 }}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                    }}
                    className="hover:!text-[var(--ochre)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginBottom: 20,
              }}
            >
              Follow
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
              }}
              className="hover:!text-[var(--ochre)] transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.06em",
            }}
          >
            {t.footer.copyright}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
            {t.footer.legal.map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)",
                  textDecoration: "none",
                }}
                className="hover:!text-[rgba(255,255,255,0.5)] transition-colors"
              >
                {l}
              </a>
            ))}
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                color: "rgba(255,255,255,0.25)",
                fontStyle: "italic",
              }}
            >
              {t.footer.madeIn}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}