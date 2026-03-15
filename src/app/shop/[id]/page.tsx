"use client";
import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { works } from "@/lib/works";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/cartStore";
import CartToast from "@/components/CartToast";
import { useCurrency } from "@/context/CurrencyContext";

export default function WorkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const work = works.find((w) => w.id === id);

  if (!work) notFound();

  const addItem = useCartStore((s) => s.addItem);
  const { formatPrice, currency, rates } = useCurrency();
  const displayAmount = Math.round(work.price * rates[currency]);
  const currencyLabel = currency === "RWF" ? "RWF" : currency === "USD" ? "$" : currency === "EUR" ? "€" : "£";
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (!toastVisible) return;
    const t = setTimeout(() => setToastVisible(false), 3500);
    return () => clearTimeout(t);
  }, [toastVisible]);

  function handleAddToCart() {
    addItem({
      id: work!.id,
      title: work!.title,
      artist: work!.artist,
      medium: work!.medium,
      size: work!.size,
      price: work!.price,
      qty: 1,
    });
    setToastVisible(false);
    setTimeout(() => setToastVisible(true), 10);
  }

  const related = works.filter((w) => w.id !== work.id && w.medium === work.medium).slice(0, 3);

  return (
    <main style={{ paddingTop: 72, background: "var(--cream)" }}>

      {/* Breadcrumb */}
      <div style={{ padding: "24px clamp(24px,6vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <nav style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/" style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--warm-grey)", textDecoration: "none" }}
            className="hover:text-[var(--ink)]">Home</Link>
          <span style={{ color: "var(--warm-grey)", fontSize: 10 }}>/</span>
          <Link href="/shop" style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--warm-grey)", textDecoration: "none" }}
            className="hover:text-[var(--ink)]">Shop</Link>
          <span style={{ color: "var(--warm-grey)", fontSize: 10 }}>/</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink)" }}>{work.title}</span>
        </nav>
      </div>

      {/* Main product section — framed two-column layout */}
      <section style={{ padding: "0 clamp(24px,6vw,80px) 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            border: "1px solid rgba(245,240,232,0.6)",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "min(85vh, 700px)" }}>

            {/* Left: Artwork on dark green */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "#273329",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(160px, 22vw, 280px)",
                  opacity: 0.18,
                  filter: "grayscale(1)",
                }}
              >
                {work.emoji}
              </span>

              {!work.available && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(14,16,15,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      padding: "10px 24px",
                    }}
                  >
                    Sold
                  </p>
                </div>
              )}
            </motion.div>

            {/* Right: Details on dark grey */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "#111111",
                padding: "clamp(32px, 5vw, 56px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#CD9245",
                  marginBottom: 20,
                }}
              >
                {work.medium.toUpperCase()} · {work.size.toUpperCase()}
              </p>

              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 4.5vw, 56px)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: "#fff",
                  marginBottom: 12,
                }}
              >
                {work.title}
              </h1>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.75)",
                  marginBottom: 28,
                }}
              >
                {work.artist}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.85,
                  marginBottom: 40,
                }}
              >
                {work.description}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {currencyLabel}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(36px, 4vw, 52px)",
                    fontWeight: 600,
                    color: work.available ? "#fff" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {work.available ? displayAmount.toLocaleString() : "—"}
                </span>
              </div>

              {work.available ? (
                <button
                  onClick={handleAddToCart}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    background: "#CD9245",
                    color: "#fff",
                    padding: "18px 36px",
                    border: "none",
                    cursor: "pointer",
                    alignSelf: "flex-start",
                    transition: "background-color 0.3s",
                  }}
                  className="hover:!bg-[#D4A055]"
                >
                  Add to Cart
                </button>
              ) : (
                <Link
                  href="/commission"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    background: "#CD9245",
                    color: "#fff",
                    padding: "18px 36px",
                    textDecoration: "none",
                    alignSelf: "flex-start",
                  }}
                >
                  Commission Similar Work
                </Link>
              )}

              <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 28, lineHeight: 1.7 }}>
                Ships from Kigali, Rwanda · Insured worldwide shipping · Certificate of authenticity included
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related works */}
      {related.length > 0 && (
        <section style={{ padding: "80px clamp(24px,6vw,80px)", background: "var(--cream-warm)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 12 }}>More {work.medium} Works</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,3vw,40px)", fontWeight: 300, color: "var(--ink)", marginBottom: 40 }}>
              You may also like
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
              {related.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/shop/${r.id}`} style={{ textDecoration: "none", display: "block" }} className="group">
                    <div
                      style={{
                        aspectRatio: "3/4",
                        background: "#1C2A1E",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,
                        overflow: "hidden",
                      }}
                    >
                      <span
                        style={{ fontSize: 80, opacity: 0.1, transition: "opacity 0.4s" }}
                        className="group-hover:!opacity-20"
                      >
                        {r.emoji}
                      </span>
                    </div>
                    <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 20, fontWeight: 300, color: "var(--ink)", marginBottom: 4 }}>{r.title}</p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 6 }}>{r.artist}</p>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 18, color: r.available ? "var(--ochre)" : "rgba(14,16,15,0.3)" }}>
                      {r.available ? formatPrice(r.price) : "—"}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <CartToast visible={toastVisible} title={work.title} />
    </main>
  );
}
