"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const links = [
  { label: "Collection",  href: "#collection" },
  { label: "The Wild",    href: "#wild"       },
  { label: "The Place",   href: "#place"      },
  { label: "The Artists", href: "#artists"    },
  { label: "The Works",   href: "#works"      },
  { label: "The Process", href: "#process"    },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 60));
  }, [scrollY]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[9000] transition-all duration-500"
        style={{
          height: 64,
          backgroundColor: scrolled ? "rgba(245,240,232,0.96)" : "transparent",
          backdropFilter:   scrolled ? "blur(20px)" : "none",
          borderBottom:     scrolled ? "1px solid rgba(14,16,15,0.06)" : "1px solid transparent",
        }}
      >
        <div className="h-full max-w-[1480px] mx-auto px-8 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: "0.22em",
              color: scrolled ? "var(--ink)" : "#fff",
              textTransform: "uppercase",
              transition: "color 0.4s",
            }}
          >
            SAWA
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: scrolled ? "rgba(14,16,15,0.55)" : "rgba(255,255,255,0.6)",
                  transition: "color 0.3s",
                }}
                className="hover:!text-[var(--ochre)] transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-6">
            <a
              href="#works"
              className="hidden lg:inline-flex items-center gap-2 transition-all duration-300 hover:opacity-75"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: scrolled ? "var(--ink)" : "#fff",
                borderBottom: `1px solid ${scrolled ? "var(--ink)" : "rgba(255,255,255,0.5)"}`,
                paddingBottom: 2,
              }}
            >
              View Collection
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden flex flex-col gap-[5px] cursor-pointer"
              aria-label="Open menu"
            >
              {[0,1,2].map((i) => (
                <span
                  key={i}
                  className="block w-6 h-px transition-colors"
                  style={{ backgroundColor: scrolled ? "var(--ink)" : "#fff" }}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
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
              className="absolute top-6 right-8 text-white/40 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <ul className="flex flex-col items-center justify-center flex-1 gap-8">
              {links.map(({ label, href }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                >
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(28px,5vw,42px)",
                      fontWeight: 300,
                      color: "rgba(245,240,232,0.75)",
                    }}
                    className="hover:text-[var(--ochre)] transition-colors"
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

