"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, Lang } from "@/context/LanguageContext";
import { useCartStore } from "@/store/cartStore";

const LANGUAGES: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "EN" },
  { code: "fr", label: "Français", native: "FR" },
  { code: "es", label: "Español", native: "ES" },
];

export default function Nav() {
  const { scrollY }                   = useScroll();
  const [scrolled, setScrolled]       = useState(false);
  const [open, setOpen]               = useState(false);
  const [langOpen, setLangOpen]       = useState(false);
  const pathname                      = usePathname();
  const { lang, setLang, t }          = useLanguage();
  const langRef                       = useRef<HTMLDivElement>(null);
  const cartCount                     = useCartStore((s) => s.items.reduce((n, i) => n + i.qty, 0));

  const isHome = pathname === "/";
  const solid  = !isHome || scrolled;

  useEffect(() => {
    if (isHome) return scrollY.on("change", (v) => setScrolled(v > 60));
  }, [scrollY, isHome]);

  // Close lang dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const textColor       = solid ? "rgba(14,16,15,0.70)" : "rgba(255,255,255,0.65)";
  const logoColor       = solid ? "var(--ink)"          : "#fff";
  const iconColor       = solid ? "var(--ink)"          : "#fff";
  const activeLinkColor = "var(--ochre)";

  const navLinks = [
    { label: t.nav.studio,     href: "/studio"     },
    { label: t.nav.wild,       href: "/wild"        },
    { label: t.nav.tuzivugire, href: "/tuzivugire"  },
    { label: t.nav.commission, href: "/commission"  },
    { label: t.nav.shop,       href: "/shop"        },
  ];
  const leftLinks  = navLinks.slice(0, 3);
  const rightLinks = navLinks.slice(3);

  const currentLang = LANGUAGES.find(l => l.code === lang)!;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[9000] transition-all duration-500"
        style={{
          height: 64,
          backgroundColor: solid ? "rgba(245,240,232,0.97)" : "transparent",
          backdropFilter:   solid ? "blur(20px)"             : "none",
          borderBottom:     solid ? "1px solid rgba(14,16,15,0.07)" : "1px solid transparent",
        }}
      >
        <div className="h-full max-w-[1480px] mx-auto px-8 grid grid-cols-3 items-center">

          {/* Left links */}
          <nav className="hidden lg:flex items-center gap-7">
            {leftLinks.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} style={{
                  fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: active ? 500 : 400,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: active ? activeLinkColor : textColor,
                  textDecoration: "none", transition: "color 0.3s",
                  borderBottom: active ? "1px solid var(--ochre)" : "1px solid transparent",
                  paddingBottom: 2,
                }} className="hover:!text-[var(--ochre)]">
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Centre logo */}
          <div className="flex justify-center">
            <Link href="/" style={{
              fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 400,
              letterSpacing: "0.3em", color: logoColor, textTransform: "uppercase",
              transition: "color 0.4s", textDecoration: "none",
            }}>
              SAWA
            </Link>
          </div>

          {/* Right links + cart + language */}
          <div className="hidden lg:flex items-center justify-end gap-7">
            {rightLinks.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} style={{
                  fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: active ? 500 : 400,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: active ? activeLinkColor : textColor,
                  textDecoration: "none", transition: "color 0.3s",
                  borderBottom: active ? "1px solid var(--ochre)" : "1px solid transparent",
                  paddingBottom: 2,
                }} className="hover:!text-[var(--ochre)]">
                  {label}
                </Link>
              );
            })}

            {/* Cart */}
            <Link href="/cart" aria-label={`Cart (${cartCount})`}
              className="hover:opacity-70 transition-opacity"
              style={{ color: iconColor, transition: "color 0.4s", position: "relative", display: "inline-flex" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    style={{
                      position: "absolute", top: -6, right: -7,
                      background: "var(--ochre)", color: "#fff",
                      borderRadius: "50%", width: 16, height: 16,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 600,
                      lineHeight: 1,
                    }}
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Language dropdown */}
            <div ref={langRef} style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen(v => !v)}
                style={{
                  fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 400,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: langOpen ? "var(--ochre)" : textColor,
                  background: "none", border: "none", cursor: "pointer",
                  transition: "color 0.3s", padding: 0,
                  display: "flex", alignItems: "center", gap: 5,
                }}
                className="hover:!text-[var(--ochre)]"
                aria-label="Switch language"
              >
                {currentLang.native}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                  style={{ transform: langOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}>
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: "absolute", top: "calc(100% + 12px)", right: 0,
                      background: "rgba(245,240,232,0.98)", backdropFilter: "blur(16px)",
                      border: "1px solid rgba(14,16,15,0.08)", minWidth: 140,
                      boxShadow: "0 8px 32px rgba(14,16,15,0.12)",
                    }}
                  >
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          width: "100%", padding: "12px 16px", background: "none", border: "none",
                          cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 11,
                          letterSpacing: "0.12em", textTransform: "uppercase",
                          color: lang === l.code ? "var(--ochre)" : "var(--ink)",
                          borderBottom: "1px solid rgba(14,16,15,0.05)",
                          transition: "background 0.15s",
                        }}
                        className="hover:!bg-[var(--cream-warm)]"
                      >
                        <span>{l.native}</span>
                        <span style={{ fontSize: 11, color: lang === l.code ? "var(--ochre)" : "rgba(14,16,15,0.4)", fontStyle: "normal", textTransform: "none", letterSpacing: 0 }}>{l.label}</span>
                        {lang === l.code && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 6, flexShrink: 0 }}>
                            <path d="M2 6l3 3 5-5" stroke="var(--ochre)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="lg:hidden flex items-center justify-end gap-5">
            <Link href="/cart" aria-label={`Cart (${cartCount})`}
              style={{ color: iconColor, transition: "color 0.4s", position: "relative", display: "inline-flex" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    style={{
                      position: "absolute", top: -6, right: -7,
                      background: "var(--ochre)", color: "#fff",
                      borderRadius: "50%", width: 16, height: 16,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 600,
                      lineHeight: 1,
                    }}
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button onClick={() => setOpen(true)}
              className="flex flex-col gap-[5px] cursor-pointer" aria-label="Open menu">
              {[0, 1, 2].map((i) => (
                <span key={i} className="block w-6 h-px transition-colors"
                  style={{ backgroundColor: iconColor }} />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex flex-col"
            style={{ backgroundColor: "var(--ink)" }}
          >
            <button onClick={() => setOpen(false)}
              className="absolute top-6 right-8 text-white/40 hover:text-white transition-colors"
              aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <ul className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map(({ label, href }, i) => (
                <motion.li key={href}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}>
                  <Link href={href} onClick={() => setOpen(false)} style={{
                    fontFamily: "var(--font-display)", fontSize: "clamp(28px,5vw,42px)",
                    fontWeight: 300, color: pathname === href ? "var(--ochre)" : "rgba(245,240,232,0.75)",
                    textDecoration: "none",
                  }} className="hover:text-[var(--ochre)] transition-colors">
                    {label}
                  </Link>
                </motion.li>
              ))}

              {/* Mobile language selector */}
              <motion.li
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.06 }}
                style={{ display: "flex", gap: 16, marginTop: 8 }}>
                {LANGUAGES.map((l) => (
                  <button key={l.code}
                    onClick={() => { setLang(l.code); setOpen(false); }}
                    style={{
                      fontFamily: "var(--font-sans)", fontSize: 13, letterSpacing: "0.18em",
                      textTransform: "uppercase", background: "none", border: "none", cursor: "pointer",
                      color: lang === l.code ? "var(--ochre)" : "rgba(245,240,232,0.35)",
                      borderBottom: lang === l.code ? "1px solid var(--ochre)" : "1px solid transparent",
                      paddingBottom: 2, transition: "color 0.2s",
                    }}>
                    {l.native}
                  </button>
                ))}
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
