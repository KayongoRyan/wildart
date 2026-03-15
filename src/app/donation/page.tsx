"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const tiers = [
  { amount: 50, label: "$50", desc: "Monthly materials for 1 student", emoji: "📚" },
  { amount: 200, label: "$200", desc: "Field trip sponsorship (4 students)", emoji: "🚐" },
  { amount: 600, label: "$600", desc: "Full-year scholarship", emoji: "🎓" },
  { amount: 1000, label: "$1,000+", desc: "Name a studio workstation", emoji: "🖼️" },
];

export default function DonationPage() {
  const [activeTier, setActiveTier] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const amount = activeTier ?? (customAmount ? parseFloat(customAmount) : 0);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function selectTier(amt: number) {
    setActiveTier(amt);
    setCustomAmount("");
  }

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCustomAmount(e.target.value);
    if (e.target.value) setActiveTier(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const amt = activeTier ?? parseFloat(customAmount);
    if (!amt || amt < 1) {
      setError("Please select an amount or enter a custom donation.");
      return;
    }
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please enter your name and email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/donations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name.trim(),
          customerEmail: form.email.trim(),
          customerPhone: form.phone.trim() || undefined,
          amount: amt,
          currency: "USD",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Could not create donation.");
      }
      const { orderId } = await res.json();

      const payRes = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          customerName: form.name.trim(),
          customerEmail: form.email.trim(),
          customerPhone: form.phone.trim() || "",
          amount: amt,
          currency: "USD",
          redirectPath: "/donation-confirmation",
        }),
      });

      if (!payRes.ok) throw new Error("Could not initialize payment.");
      const { paymentLink } = await payRes.json();
      window.location.href = paymentLink;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <main style={{ paddingTop: 72, background: "var(--cream)" }}>
      <PageHero
        label="Support Conservation"
        headline={<>Help us train the<br />next generation.</>}
        subtitle="Your contribution funds field materials, park visit transport, and annual scholarships for young Rwandan wildlife artists. Every dollar makes a difference."
        emoji="✊"
      />

      <section style={{ padding: "clamp(48px, 8vw, 80px) clamp(24px, 6vw, 80px)", maxWidth: 900, margin: "0 auto" }}>
        <form onSubmit={handleSubmit}>
          {/* Amount selection */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>
              Choose your amount
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 24 }}>
              {tiers.map((t) => (
                <motion.button
                  key={t.amount}
                  type="button"
                  onClick={() => selectTier(t.amount)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "24px 20px",
                    background: activeTier === t.amount ? "var(--ink)" : "var(--cream-warm)",
                    border: activeTier === t.amount ? "none" : "1px solid rgba(107, 103, 96, 0.2)",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ fontSize: 28, display: "block", marginBottom: 8 }}>{t.emoji}</span>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 300, color: activeTier === t.amount ? "#fff" : "var(--ochre)", marginBottom: 6 }}>
                    {t.label}
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: activeTier === t.amount ? "rgba(255,255,255,0.7)" : "var(--warm-grey)", lineHeight: 1.4 }}>
                    {t.desc}
                  </p>
                </motion.button>
              ))}
            </div>

            {/* Custom amount */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--warm-grey)" }}>Or enter amount:</span>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(107, 103, 96, 0.25)", background: "var(--cream)" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--warm-grey)", paddingLeft: 16 }}>USD</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={handleCustomChange}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 16,
                    padding: "12px 16px",
                    border: "none",
                    background: "none",
                    width: 140,
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Donor info */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>
              Your details
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
              <div>
                <label style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.1em", color: "var(--warm-grey)", display: "block", marginBottom: 8 }}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    padding: "14px 16px",
                    width: "100%",
                    border: "1px solid rgba(107, 103, 96, 0.25)",
                    background: "var(--cream)",
                    outline: "none",
                  }}
                  className="focus:border-[var(--ochre)] transition-colors"
                />
              </div>
              <div>
                <label style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.1em", color: "var(--warm-grey)", display: "block", marginBottom: 8 }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    padding: "14px 16px",
                    width: "100%",
                    border: "1px solid rgba(107, 103, 96, 0.25)",
                    background: "var(--cream)",
                    outline: "none",
                  }}
                  className="focus:border-[var(--ochre)] transition-colors"
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.1em", color: "var(--warm-grey)", display: "block", marginBottom: 8 }}>
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+250 700 000 000"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    padding: "14px 16px",
                    width: "100%",
                    maxWidth: 280,
                    border: "1px solid rgba(107, 103, 96, 0.25)",
                    background: "var(--cream)",
                    outline: "none",
                  }}
                  className="focus:border-[var(--ochre)] transition-colors"
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.1em", color: "var(--warm-grey)", display: "block", marginBottom: 8 }}>
                  Message (optional)
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="A note to the team..."
                  rows={3}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    padding: "14px 16px",
                    width: "100%",
                    border: "1px solid rgba(107, 103, 96, 0.25)",
                    background: "var(--cream)",
                    outline: "none",
                    resize: "vertical",
                  }}
                  className="focus:border-[var(--ochre)] transition-colors"
                />
              </div>
            </div>
          </div>

          {error && (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#b91c1c", marginBottom: 20 }}>
              {error}
            </p>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
            <button
              type="submit"
              disabled={loading || amount < 1}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background: amount >= 1 ? "var(--ochre)" : "var(--warm-grey)",
                color: "#fff",
                padding: "16px 40px",
                border: "none",
                cursor: amount >= 1 && !loading ? "pointer" : "not-allowed",
                opacity: loading ? 0.6 : 1,
                transition: "background 0.2s",
              }}
              className="hover:!bg-[var(--ochre-light)]"
            >
              {loading ? "Redirecting to payment…" : `Donate ${amount >= 1 ? `$${amount}` : ""}`}
            </button>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--warm-grey)" }}>
              Secured by Flutterwave · MTN MoMo · Airtel · Visa · Mastercard · Bank Transfer
            </p>
          </div>
        </form>
      </section>

      {/* Impact */}
      <section style={{ background: "var(--cream-warm)", padding: "clamp(60px, 10vw, 100px) clamp(24px, 6vw, 80px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>
            Where your donation goes
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 300, color: "var(--ink)", marginBottom: 32, lineHeight: 1.2 }}>
            Art supplies, park visits, and scholarships for young artists in Musanze
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginTop: 48 }}>
            {[
              { n: "6", label: "Students graduated" },
              { n: "12+", label: "Community exhibitions" },
              { n: "3", label: "Resident artists mentoring" },
            ].map((item) => (
              <div key={item.label}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 300, color: "var(--ochre)", marginBottom: 8 }}>{item.n}</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--warm-grey)", letterSpacing: "0.06em" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
