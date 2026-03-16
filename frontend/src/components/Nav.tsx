"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, type Lang } from "@/context/LanguageContext";
import { useCurrency, CurrencyCode } from "@/context/CurrencyContext";
import { useCartStore } from "@/store/cartStore";

const LANGUAGES: { code: Lang; label: string; native: string }[] = [
    { code: "en", label: "English", native: "EN" },
    { code: "fr", label: "Français", native: "FR" },
    { code: "es", label: "Español", native: "ES" },
];

const CURRENCIES: { code: CurrencyCode; label: string; symbol: string }[] = [
    { code: "USD", label: "US Dollar", symbol: "$" },
    { code: "EUR", label: "Euro", symbol: "€" },
    { code: "GBP", label: "British Pound", symbol: "£" },
    { code: "RWF", label: "Rwandan Franc", symbol: "RWF" },
];

export default function Nav() {
    const [open, setOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [currencyOpen, setCurrencyOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

    const pathname = usePathname();
    const { lang, setLang, t } = useLanguage();
    const { currency, setCurrency } = useCurrency();
    const langRef = useRef<HTMLDivElement>(null);
    const currencyRef = useRef<HTMLDivElement>(null);
    const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.qty, 0));
    const cartLabel = cartCount > 9 ? "9+" : String(cartCount);

    const { scrollY } = useScroll();

    // Hide navbar when scrolled past 50px
    useMotionValueEvent(scrollY, "change", (latest) => {
        setHidden(latest > 50);
    });

    // Close dropdowns on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
            if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) setCurrencyOpen(false);
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const textColor = "rgba(255,255,255,0.65)";
    const iconColor = "#fff";

    const navLinks = [
        { label: t.nav.studio, href: "/studio" },
        { label: t.nav.wild, href: "/wild" },
        { label: t.nav.tuzivugire, href: "/tuzivugire" },
        { label: t.nav.commission, href: "/commission" },
        { label: t.nav.shop, href: "/shop" },
    ];

    const currentLang = LANGUAGES.find((l) => l.code === lang)!;
    const currentCurrency = CURRENCIES.find((c) => c.code === currency)!;

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0, opacity: 1, pointerEvents: "auto" },
                    hidden: { y: "-100%", opacity: 0, pointerEvents: "none" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-[9000]"
                style={{
                    height: 64,
                    backgroundColor: "transparent",
                    backdropFilter: "none",
                    borderBottom: "1px solid transparent",
                }}
            >
                <div className="h-full pt-8 pb-4 max-w-[1480px] mx-auto px-8 grid grid-cols-3 items-start">

                    {/* Left: Home link */}
                    <nav className="hidden lg:flex items-start">
                        <Link
                            href="/"
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: 15,
                                fontWeight: pathname === "/" ? 500 : 400,
                                color: textColor,
                                textDecoration: "none",
                                transition: "color 0.3s",
                            }}
                            className="hover:!text-white"
                        >
                            Home
                        </Link>
                    </nav>

                    {/* Centre: Logo Name placeholder for alignment */}
                    <div className="hidden lg:flex justify-center items-start">
                        <Link
                            href="/"
                            style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 400,
                                letterSpacing: "0.28em",
                                color: "#fff",
                                textTransform: "uppercase",
                                textDecoration: "none",
                            }}
                            className="hover:opacity-70 transition-opacity text-lg sm:text-xl lg:text-[22px]"
                        >
                            SAWA
                        </Link>
                    </div>

                    {/* Right: stacked links + currency + lang + cart */}
                    <div className="hidden lg:flex flex-col items-start justify-start ml-auto gap-1">
                        {[
                            { label: "The Studio", href: "/studio" },
                            { label: "Conservation", href: "/conservation" },
                            { label: "Commission", href: "/commission" },
                            { label: "Careers", href: "/career" },
                        ].map(({ label, href }) => {
                            const active = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: 16,
                                        fontWeight: 400,
                                        color: "rgba(255, 255, 255, 0.65)",
                                        textDecoration: "none",
                                        transition: "color 0.3s",
                                    }}
                                    className="hover:!text-white"
                                >
                                    {label}
                                </Link>
                            );
                        })}

                        {/* Currency + Lang + Cart row */}
                        <div className="flex items-center gap-4 mt-1">

                            {/* Currency dropdown */}
                            <div ref={currencyRef} style={{ position: "relative" }}>
                                <button
                                    onClick={() => setCurrencyOpen((v) => !v)}
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: 11,
                                        fontWeight: 400,
                                        letterSpacing: "0.14em",
                                        textTransform: "uppercase",
                                        color: currencyOpen ? "var(--ochre)" : textColor,
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "color 0.3s",
                                        padding: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 5,
                                    }}
                                    className="hover:!text-[var(--ochre)]"
                                    aria-label="Change currency"
                                >
                                    {currentCurrency.code}
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                        style={{ transform: currencyOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}>
                                        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {currencyOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                            transition={{ duration: 0.18 }}
                                            style={{
                                                position: "absolute",
                                                top: "calc(100% + 12px)",
                                                right: 0,
                                                background: "rgba(245,240,232,0.98)",
                                                backdropFilter: "blur(16px)",
                                                border: "1px solid rgba(14,16,15,0.08)",
                                                minWidth: 160,
                                                boxShadow: "0 8px 32px rgba(14,16,15,0.12)",
                                            }}
                                        >
                                            {CURRENCIES.map((c) => (
                                                <button
                                                    key={c.code}
                                                    onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }}
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
                                                        borderBottom: "1px solid rgba(14,16,15,0.05)",
                                                        transition: "background 0.15s",
                                                    }}
                                                    className="hover:!bg-[var(--cream-warm)]"
                                                >
                                                    <span>{c.code}</span>
                                                    <span style={{ fontSize: 11, color: "rgba(14,16,15,0.4)", textTransform: "none", letterSpacing: 0 }}>{c.label}</span>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Cart — only visible when items are in the cart */}
                            <AnimatePresence>
                                {cartCount > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                                    >
                                        <Link
                                            href="/cart"
                                            aria-label={`Cart (${cartCount})`}
                                            style={{ color: iconColor, position: "relative", display: "inline-flex", transition: "color 0.4s" }}
                                            className="hover:opacity-80"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                                <line x1="3" y1="6" x2="21" y2="6" />
                                                <path d="M16 10a4 4 0 01-8 0" />
                                            </svg>
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
                                                    width: 16,
                                                    height: 16,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontFamily: "var(--font-sans)",
                                                    fontSize: 9,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {cartLabel}
                                            </motion.span>
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile: cart + hamburger */}
                    <div className="lg:hidden flex items-center justify-end gap-5 col-start-3">
                        <Link href="/cart" aria-label={`Cart (${cartCount})`} style={{ color: iconColor, position: "relative", display: "inline-flex", transition: "color 0.4s" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                            {cartCount > 0 && (
                                <span style={{
                                    position: "absolute", top: -6, right: -6,
                                    background: "var(--ochre)", color: "#fff", borderRadius: "50%",
                                    width: 15, height: 15, display: "flex", alignItems: "center",
                                    justifyContent: "center", fontSize: 9, fontWeight: 600,
                                }}>
                                    {cartLabel}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setOpen(true)}
                            className="flex flex-col gap-[5px] cursor-pointer bg-transparent border-none"
                            aria-label="Open menu"
                        >
                            {[0, 1, 2].map((i) => (
                                <span key={i} className="block w-6 h-px transition-colors"
                                    style={{ backgroundColor: iconColor }} />
                            ))}
                        </button>
                    </div>
                </div>
            </motion.header>

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
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-6 right-8 text-white/40 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                            aria-label="Close"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        <ul className="flex flex-col items-center justify-center flex-1 gap-8 p-0 m-0 list-none">
                            {navLinks.map(({ label, href }, i) => (
                                <motion.li
                                    key={href}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.08 }}
                                >
                                    <Link
                                        href={href}
                                        onClick={() => setOpen(false)}
                                        style={{
                                            fontFamily: "var(--font-display)",
                                            fontSize: "clamp(28px,5vw,42px)",
                                            fontWeight: 300,
                                            color: pathname === href ? "var(--ochre)" : "rgba(245,240,232,0.75)",
                                            textDecoration: "none",
                                        }}
                                        className="hover:text-[var(--ochre)] transition-colors"
                                    >
                                        {label}
                                    </Link>
                                </motion.li>
                            ))}

                            {/* Mobile language + currency selectors */}
                            <motion.li
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 + navLinks.length * 0.08 }}
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 8 }}
                            >
                                <div style={{ display: "flex", gap: 16 }}>
                                    {[
                                        { code: "en", native: "EN" },
                                        { code: "fr", native: "FR" },
                                        { code: "es", native: "ES" }
                                    ].map((l) => (
                                        <button
                                            key={l.code}
                                            onClick={() => { setLang(l.code as Lang); setOpen(false); }}
                                            style={{
                                                fontFamily: "var(--font-sans)", fontSize: 13, letterSpacing: "0.18em",
                                                textTransform: "uppercase", background: "none", border: "none", cursor: "pointer",
                                                color: lang === l.code ? "var(--ochre)" : "rgba(245,240,232,0.35)",
                                                borderBottom: lang === l.code ? "1px solid var(--ochre)" : "1px solid transparent",
                                                paddingBottom: 2, transition: "color 0.2s",
                                            }}
                                        >
                                            {l.native}
                                        </button>
                                    ))}
                                </div>
                                <div style={{ display: "flex", gap: 12 }}>
                                    {CURRENCIES.map((c) => (
                                        <button
                                            key={c.code}
                                            onClick={() => { setCurrency(c.code); setOpen(false); }}
                                            style={{
                                                fontFamily: "var(--font-sans)", fontSize: 12, letterSpacing: "0.14em",
                                                textTransform: "uppercase", background: "none", border: "none", cursor: "pointer",
                                                color: currency === c.code ? "var(--ochre)" : "rgba(245,240,232,0.35)",
                                                transition: "color 0.2s",
                                            }}
                                        >
                                            {c.code}
                                        </button>
                                    ))}
                                </div>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll-to-top button — appears when nav is hidden */}
            <AnimatePresence>
                {hidden && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="fixed bottom-8 right-8 z-[9000] w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-none cursor-pointer hover:scale-105 transition-transform"
                        style={{ background: "var(--ochre)", color: "#fff" }}
                        aria-label="Scroll to top"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
