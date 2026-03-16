"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useCurrency } from "@/context/CurrencyContext";
import { apiUrl } from "@/lib/api";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const { formatPrice } = useCurrency();
  const [donation, setDonation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const sub = subtotal();
  const donationAmt = donation ? Math.round(sub * 0.05 * 100) / 100 : 0;
  const shipping = sub >= 2000 ? 0 : 120;
  const total = sub + donationAmt + shipping;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    setError("");

    try {
      // Step 1 — create order in MongoDB
      const orderRes = await fetch(apiUrl("/orders/create"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          items,
          subtotal: sub,
          shipping,
          donation: donationAmt,
          total,
          currency: "USD",
        }),
      });

      if (!orderRes.ok) throw new Error("Could not create order.");
      const { orderId } = await orderRes.json();

      // Step 2 — initialize payment session with Flutterwave
      const payRes = await fetch(apiUrl("/payments/initialize"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          amount: total,
          currency: "USD",
        }),
      });

      if (!payRes.ok) throw new Error("Could not initialize payment.");
      const { paymentLink } = await payRes.json();

      // Step 3 — redirect user to Flutterwave hosted payment page
      window.location.href = paymentLink;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: "var(--cream)" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>Your cart is empty.</p>
        <Link href="/shop" className="px-6 py-3 text-white text-sm tracking-widest uppercase" style={{ background: "var(--charcoal)" }}>
          Browse the Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6" style={{ background: "var(--cream)" }}>
      <div className="max-w-5xl mx-auto">
        <h1 className="mb-10" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,48px)", color: "var(--charcoal)" }}>
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ── Left: customer details ── */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xs tracking-widest uppercase" style={{ color: "var(--ochre)" }}>Your Details</h2>

            {[
              { label: "Full Name", name: "name", type: "text", placeholder: "Christine Uwimana" },
              { label: "Email Address", name: "email", type: "email", placeholder: "you@example.com" },
              { label: "Phone (for Mobile Money)", name: "phone", type: "tel", placeholder: "+250 7XX XXX XXX" },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name} className="flex flex-col gap-1">
                <label className="text-xs tracking-widest uppercase" style={{ color: "var(--charcoal)", opacity: 0.6 }}>{label}</label>
                <input
                  required
                  type={type}
                  name={name}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="border-b bg-transparent py-3 text-base outline-none focus:border-b-2 transition-all"
                  style={{ borderColor: "var(--charcoal)", color: "var(--charcoal)", fontFamily: "var(--font-sans)" }}
                />
              </div>
            ))}

            {/* Donation toggle */}
            <label className="flex items-start gap-3 cursor-pointer mt-2">
              <input
                type="checkbox"
                checked={donation}
                onChange={(e) => setDonation(e.target.checked)}
                className="mt-1 accent-ochre"
              />
              <span className="text-sm" style={{ color: "var(--charcoal)" }}>
                Add <strong>5%</strong> to support the <strong>Conservation</strong> youth artists programme
                {donation && <span className="ml-1 opacity-60">(+{formatPrice(donationAmt)})</span>}
              </span>
            </label>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 py-4 text-white text-sm tracking-widest uppercase transition-opacity disabled:opacity-50"
              style={{ background: "var(--charcoal)" }}
            >
              {loading ? "Redirecting to payment…" : "Pay with Flutterwave →"}
            </button>

            <p className="text-xs opacity-50 text-center" style={{ color: "var(--charcoal)" }}>
              Secured by Flutterwave · MTN MoMo · Airtel · Visa · Mastercard · Bank Transfer
            </p>
          </div>

          {/* ── Right: order summary ── */}
          <div className="flex flex-col gap-4 p-8 h-fit" style={{ background: "var(--warm-white)", border: "1px solid rgba(0,0,0,0.08)" }}>
            <h2 className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--ochre)" }}>Order Summary</h2>

            <div className="flex flex-col gap-4 divide-y" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start pt-3 first:pt-0 text-sm">
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--charcoal)" }}>{item.title}</p>
                    <p className="opacity-50 text-xs mt-0.5">{item.artist} · {item.medium}</p>
                  </div>
                  <span style={{ color: "var(--charcoal)" }}>{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-4 text-sm border-t mt-2" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <Row label="Subtotal" value={formatPrice(sub)} />
              {donation && <Row label="Conservation (5%)" value={`+${formatPrice(donationAmt)}`} />}
              <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
              <Row label="Total" value={formatPrice(total)} bold />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-semibold text-base pt-2 border-t" : "opacity-70"}`} style={{ borderColor: "rgba(0,0,0,0.08)" }}>
      <span style={{ color: "var(--charcoal)" }}>{label}</span>
      <span style={{ color: "var(--charcoal)" }}>{value}</span>
    </div>
  );
}
