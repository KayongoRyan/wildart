"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";

const initialItems = [
  { id: 1, title: "Silverback at Dawn", artist: "Christine Mukamana", medium: "Graphite", size: "60×80cm", price: 1200, qty: 1, emoji: "🦍" },
  { id: 2, title: "The Matriarch",      artist: "Josue Habimana",     medium: "Ink",      size: "80×100cm", price: 1800, qty: 1, emoji: "🐘" },
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [donation, setDonation] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id));
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const donationAmt = donation ? Math.round(subtotal * 0.05) : 0;
  const shipping = subtotal > 2000 ? 0 : 120;
  const total = subtotal + donationAmt + shipping;

  return (
    <main style={{ paddingTop: 64, background: "var(--cream)", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ padding: "60px clamp(24px,6vw,80px) 40px", maxWidth: 1100, margin: "0 auto", borderBottom: "1px solid rgba(14,16,15,0.08)" }}>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 12 }}>Your Collection</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,60px)", fontWeight: 300, color: "var(--ink)" }}>
          Cart {items.length > 0 && <span style={{ color: "var(--warm-grey)", fontSize: "0.6em" }}>({items.length})</span>}
        </motion.h1>
      </div>

      {items.length === 0 ? (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "120px clamp(24px,6vw,80px)", textAlign: "center" }}>
          <p style={{ fontSize: 64, marginBottom: 24 }}>🦍</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 300, color: "var(--ink)", marginBottom: 16 }}>Your cart is empty.</h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--warm-grey)", marginBottom: 40 }}>Explore original wildlife works by our three resident artists.</p>
          <Link href="/shop" style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", background: "var(--ochre)", color: "#fff", padding: "14px 36px", textDecoration: "none" }}>
            Browse the Shop
          </Link>
        </div>
      ) : (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px clamp(24px,6vw,80px) 100px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 48, alignItems: "start" }}>

          {/* Cart items */}
          <div>
            {items.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 24, padding: "28px 0", borderBottom: "1px solid rgba(14,16,15,0.08)" }}>

                {/* Thumbnail */}
                <div style={{ background: "#DDD5C2", aspectRatio: "4/5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 40, opacity: 0.4 }}>{item.emoji}</span>
                </div>

                {/* Details */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 6 }}>{item.medium} · {item.size}</p>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 300, color: "var(--ink)", marginBottom: 4 }}>{item.title}</h3>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--warm-grey)", marginBottom: 16 }}>{item.artist}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 300, color: "var(--ink)" }}>${item.price.toLocaleString()}</p>
                    <button onClick={() => remove(item.id)}
                      style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--warm-grey)", background: "none", border: "none", cursor: "pointer", borderBottom: "1px solid rgba(14,16,15,0.2)", paddingBottom: 2 }}
                      className="hover:text-red-500 transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Tuzivugire donation opt-in */}
            <div style={{ marginTop: 32, background: "var(--forest)", padding: "28px 32px" }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 16, cursor: "pointer" }}>
                <input type="checkbox" checked={donation} onChange={e => setDonation(e.target.checked)}
                  style={{ width: 16, height: 16, marginTop: 2, accentColor: "var(--ochre)", flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500, color: "var(--cream)", marginBottom: 6 }}>
                    Add 5% to Tuzivugire — ${Math.round(subtotal * 0.05)}
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                    Funds art materials and park-visit transport for young artists in our education programme. Optional but meaningful.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Order summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ background: "var(--cream-warm)", padding: "36px 32px", position: "sticky", top: 88 }}>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 300, color: "var(--ink)", marginBottom: 32 }}>Order Summary</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
              {[
                ["Subtotal", `$${subtotal.toLocaleString()}`],
                ["Shipping", shipping === 0 ? "Free" : `$${shipping}`],
                ...(donation ? [["Tuzivugire (5%)", `$${donationAmt}`]] : []),
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--warm-grey)" }}>{label}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--ink)" }}>{val}</p>
                </div>
              ))}
            </div>

            {shipping === 0 && (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--sage)", marginBottom: 16, padding: "8px 12px", background: "rgba(92,122,94,0.1)" }}>
                ✓ Free worldwide shipping on orders over $2,000
              </p>
            )}

            {/* Promo */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              <input value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Promo code"
                style={{ flex: 1, padding: "10px 14px", fontFamily: "var(--font-sans)", fontSize: 12, border: "1px solid rgba(14,16,15,0.15)", background: "var(--cream)", color: "var(--ink)", outline: "none" }} />
              <button onClick={() => setPromoApplied(true)}
                style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", background: "var(--ink)", color: "#fff", padding: "10px 16px", border: "none", cursor: "pointer" }}>
                Apply
              </button>
            </div>
            {promoApplied && <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--sage)", marginBottom: 16 }}>Promo code accepted.</p>}

            <div style={{ borderTop: "1px solid rgba(14,16,15,0.1)", paddingTop: 20, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 300, color: "var(--ink)" }}>Total</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 300, color: "var(--ink)" }}>${total.toLocaleString()}</p>
              </div>
            </div>

            <Link href="/commission" style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", background: "var(--ink)", color: "#fff", padding: "18px 24px", textDecoration: "none", textAlign: "center", marginBottom: 12, transition: "background 0.3s" }}
              className="hover:!bg-[var(--forest)]">
              Proceed to Checkout
            </Link>
            <Link href="/shop" style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--warm-grey)", textDecoration: "none", textAlign: "center", paddingTop: 8 }}
              className="hover:!text-[var(--ink)]">
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      )}

      <Footer />
    </main>
  );
}
