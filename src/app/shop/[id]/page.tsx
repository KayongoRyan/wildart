"use client";
import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { works } from "@/lib/works";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/cartStore";
import CartToast from "@/components/CartToast";

export default function WorkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const work = works.find((w) => w.id === id);

  if (!work) notFound();

  const addItem = useCartStore((s) => s.addItem);
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
    <main style={{ paddingTop: 64, background: "var(--cream)" }}>

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

      {/* Main product section */}
      <section style={{ padding: "0 clamp(24px,6vw,80px) 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

          {/* Artwork image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                aspectRatio: "3/4",
                background: "#1C2A1E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span style={{ fontSize: "clamp(140px,18vw,240px)", opacity: 0.12 }}>{work.emoji}</span>

              {!work.available && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(14,16,15,0.55)",
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
            </div>

            {/* Medium label below image */}
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--warm-grey)", marginTop: 16 }}>
              {work.medium} on acid-free cotton paper · {work.size}
            </p>
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ paddingTop: 16 }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ochre)",
                marginBottom: 16,
              }}
            >
              Original Work · {work.year}
            </p>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px,5vw,64px)",
                fontWeight: 400,
                lineHeight: 1.0,
                color: "var(--ink)",
                marginBottom: 8,
              }}
            >
              {work.title}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 18,
                fontWeight: 300,
                color: "var(--warm-grey)",
                marginBottom: 32,
              }}
            >
              {work.animal} — {work.artist}
            </p>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(14,16,15,0.1)", marginBottom: 32 }} />

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "rgba(14,16,15,0.65)",
                lineHeight: 1.9,
                marginBottom: 40,
              }}
            >
              {work.description}
            </p>

            {/* Details grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px 32px",
                marginBottom: 40,
                padding: "24px",
                background: "var(--cream-warm)",
              }}
            >
              {[
                { label: "Medium", value: work.medium },
                { label: "Size", value: work.size },
                { label: "Artist", value: work.artist },
                { label: "Year", value: String(work.year) },
                { label: "Subject", value: work.animal },
                { label: "Availability", value: work.available ? "Available" : "Sold" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 4 }}>{label}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: work.available && label === "Availability" ? "var(--sage)" : "var(--ink)" }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Price & CTA — bold, Nothing-style */}
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(36px,4vw,48px)",
                  fontWeight: 500,
                  color: work.available ? "var(--ochre)" : "var(--warm-grey)",
                }}
              >
                {work.available ? `$${work.price.toLocaleString()}` : "—"}
              </p>

              {work.available ? (
                <button
                  onClick={handleAddToCart}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    background: "var(--ochre)",
                    color: "#fff",
                    padding: "16px 40px",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  className="hover:!bg-[var(--ochre-light)]"
                >
                  Add to Cart
                </button>
              ) : (
                <Link
                  href="/commission"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    background: "var(--ink)",
                    color: "#fff",
                    padding: "16px 40px",
                    textDecoration: "none",
                  }}
                >
                  Commission Similar Work
                </Link>
              )}
            </div>

            {/* Shipping note */}
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--warm-grey)", marginTop: 20, lineHeight: 1.7 }}>
              Ships from Kigali, Rwanda · Insured worldwide shipping · Certificate of authenticity included
            </p>
          </motion.div>
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
                      {r.available ? `$${r.price.toLocaleString()}` : "—"}
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
