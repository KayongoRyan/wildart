"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, Lang } from "@/context/LanguageContext";
import { useCurrency, CurrencyCode } from "@/context/CurrencyContext";
import { useCartStore } from "@/store/cartStore";

const CURRENCIES: { code: CurrencyCode; label: string; symbol: string }[] = [
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "GBP", label: "British Pound", symbol: "£" },
  { code: "RWF", label: "Rwandan Franc", symbol: "RWF" },
];

const LANGUAGES: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "EN" },
  { code: "fr", label: "Français", native: "FR" },
  { code: "es", label: "Español", native: "ES" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const langRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.qty, 0));

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) setCurrencyOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { label: t.nav.studio, href: "/studio" },
    { label: t.nav.career, href: "/career" },
    { label: t.nav.conservation, href: "/conservation" },
    { label: t.nav.commission, href: "/commission" },
    { label: t.nav.shop, href: "/shop" },
  ];

  const currentLang = LANGUAGES.find((l) => l.code === lang)!;
  const cartLabel = cartCount > 9 ? "9+" : String(cartCount);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[9000]"
        style={{
          height: 72,
          backgroundColor: "var(--cream)",
          borderBottom: "1px solid rgba(14,16,15,0.06)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        <div className="h-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center">
          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {navLinks.slice(0, 3).map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    fontWeight: active ? 600 : 400,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: active ? "var(--ochre)" : "var(--ink)",
                    textDecoration: "none",
                    opacity: active ? 1 : 0.7,
                    transition: "color 0.2s, opacity 0.2s",
                  }}
                  className="hover:!text-[var(--ochre)] hover:!opacity-100"
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Logo center */}
          <div className="flex-1 flex justify-center">
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 400,
                letterSpacing: "0.28em",
                color: "var(--ink)",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
              className="hover:opacity-70 transition-opacity"
            >
              SAWA
            </Link>
          </div>

          {/* Right: Nav + Cart + Language */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
            {navLinks.slice(3).map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    fontWeight: active ? 600 : 400,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: active ? "var(--ochre)" : "var(--ink)",
                    textDecoration: "none",
                    opacity: active ? 1 : 0.7,
                    transition: "color 0.2s, opacity 0.2s",
                  }}
                  className="hover:!text-[var(--ochre)] hover:!opacity-100"
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/donation"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#fff",
                background: "var(--ochre)",
                padding: "10px 20px",
                textDecoration: "none",
                transition: "background-color 0.2s",
              }}
              className="hover:!bg-[var(--ochre-light)]"
            >
              {t.nav.donation}
            </Link>
            <Link
              href="/cart"
              aria-label={`Cart (${cartCount})`}
              style={{ color: "var(--ink)", position: "relative", display: "inline-flex" }}
              className="hover:opacity-70 transition-opacity"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <AnimatePresence>
                {(cartCount > 0) && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      background: "var(--ochre)",
                      color: "#fff",
                      borderRadius: "50%",
                      width: 18,
                      height: 18,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-sans)",
                      fontSize: 10,
                      fontWeight: 600,
                    }}
                  >
                    {cartLabel}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <div ref={currencyRef} style={{ position: "relative" }}>
              <button
                onClick={() => setCurrencyOpen((v) => !v)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: currencyOpen ? "var(--ochre)" : "var(--ink)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  opacity: 0.8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
                className="hover:!text-[var(--ochre)] hover:!opacity-100"
                aria-label="Change currency"
              >
                {currency}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: currencyOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
              <AnimatePresence>
                {currencyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      background: "var(--cream)",
                      border: "1px solid rgba(14,16,15,0.08)",
                      minWidth: 160,
                      boxShadow: "0 8px 24px rgba(14,16,15,0.1)",
                    }}
                  >
                    {CURRENCIES.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setCurrency(c.code);
                          setCurrencyOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "12px 16px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "var(--font-sans)",
                          fontSize: 11,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: currency === c.code ? "var(--ochre)" : "var(--ink)",
                          transition: "background 0.15s",
                        }}
                        className="hover:!bg-[var(--cream-warm)]"
                      >
                        <span>{c.code}</span>
                        <span style={{ fontSize: 11, color: "rgba(14,16,15,0.4)", fontStyle: "normal", textTransform: "none", letterSpacing: 0 }}>{c.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div ref={langRef} style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: langOpen ? "var(--ochre)" : "var(--ink)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  opacity: 0.8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
                className="hover:!text-[var(--ochre)] hover:!opacity-100"
                aria-label="Switch language"
              >
                {currentLang.native}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: langOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      background: "var(--cream)",
                      border: "1px solid rgba(14,16,15,0.08)",
                      minWidth: 140,
                      boxShadow: "0 8px 24px rgba(14,16,15,0.1)",
                    }}
                  >
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setLangOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "12px 16px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "var(--font-sans)",
                          fontSize: 11,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: lang === l.code ? "var(--ochre)" : "var(--ink)",
                          transition: "background 0.15s",
                        }}
                        className="hover:!bg-[var(--cream-warm)]"
                      >
                        <span>{l.native}</span>
                        <span style={{ fontSize: 11, color: "rgba(14,16,15,0.4)", fontStyle: "normal", textTransform: "none", letterSpacing: 0 }}>{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-6">
            <Link href="/cart" aria-label={`Cart (${cartCount})`} style={{ color: "var(--ink)", position: "relative" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {(cartCount > 0) && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "var(--ochre)",
                    color: "#fff",
                    borderRadius: "50%",
                    width: 16,
                    height: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    fontWeight: 600,
                  }}
                >
                  {cartLabel}
                </span>
              )}
            </Link>
            <button onClick={() => setOpen(true)} className="flex flex-col gap-1.5" aria-label="Menu">
              <span className="block w-6 h-px" style={{ backgroundColor: "var(--ink)" }} />
              <span className="block w-6 h-px" style={{ backgroundColor: "var(--ink)" }} />
              <span className="block w-6 h-px" style={{ backgroundColor: "var(--ink)" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col"
            style={{ backgroundColor: "var(--cream)" }}
          >
            <div className="flex justify-between items-center p-6" style={{ borderBottom: "1px solid rgba(14,16,15,0.08)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "0.2em", color: "var(--ink)" }}>SAWA</span>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-6">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 18,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: pathname === href ? "var(--ochre)" : "var(--ink)",
                    textDecoration: "none",
                  }}
                  className="hover:!text-[var(--ochre)]"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/donation"
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 18,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#fff",
                  background: "var(--ochre)",
                  padding: "14px 24px",
                  textDecoration: "none",
                  display: "inline-block",
                  marginTop: 8,
                }}
                className="hover:!opacity-90"
              >
                {t.nav.donation}
              </Link>
              <div className="flex flex-col gap-4 pt-4">
                <div className="flex gap-4">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setOpen(false);
                      }}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 12,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: lang === l.code ? "var(--ochre)" : "var(--warm-grey)",
                      }}
                    >
                      {l.native}
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrency(c.code);
                        setOpen(false);
                      }}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 12,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: currency === c.code ? "var(--ochre)" : "var(--warm-grey)",
                      }}
                    >
                      {c.symbol} {c.code}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
