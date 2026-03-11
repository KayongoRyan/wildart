"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CartToastProps {
  visible: boolean;
  title: string;
}

export default function CartToast({ visible, title }: CartToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 9999,
            background: "var(--ink)",
            color: "#fff",
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            gap: 20,
            boxShadow: "0 8px 40px rgba(14,16,15,0.3)",
            minWidth: 280,
          }}
        >
          {/* Checkmark */}
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "var(--ochre)", display: "flex",
            alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7l3 3 6-6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>
              Added to cart
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16, fontWeight: 300, color: "#fff" }}>
              {title}
            </p>
          </div>

          <Link
            href="/cart"
            style={{
              fontFamily: "var(--font-sans)", fontSize: 10,
              letterSpacing: "0.14em", textTransform: "uppercase",
              background: "var(--ochre)", color: "#fff",
              padding: "9px 16px", textDecoration: "none",
              flexShrink: 0, transition: "background-color 0.2s",
            }}
            className="hover:!bg-[var(--ochre-light)]"
          >
            View Cart
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
