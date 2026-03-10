"use client";
import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

interface OrderData {
  paymentStatus: "pending" | "paid" | "failed";
  customerName: string;
  total: number;
  currency: string;
  items: { title: string; artist: string; price: number; qty: number }[];
  createdAt: string;
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--charcoal)", opacity: 0.5 }}>
          Loading…
        </p>
      </main>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}

function ConfirmationContent() {
  const params = useSearchParams();
  const txRef = params.get("tx_ref");
  const urlStatus = params.get("status");

  const clearCart = useCartStore((s) => s.clearCart);
  const cleared = useRef(false);

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!txRef) {
      setError("No transaction reference found.");
      setLoading(false);
      return;
    }

    // Poll the DB to confirm status (never trust URL alone)
    let attempts = 0;
    const poll = async () => {
      attempts++;
      try {
        const res = await fetch(`/api/orders/status?tx_ref=${txRef}`);
        if (!res.ok) throw new Error("Order not found.");
        const data: OrderData = await res.json();

        // Webhook may arrive slightly after redirect — retry up to 5×
        if (data.paymentStatus === "pending" && attempts < 5) {
          setTimeout(poll, 2000);
          return;
        }

        setOrder(data);

        if (data.paymentStatus === "paid" && !cleared.current) {
          clearCart();
          cleared.current = true;
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Could not load order.");
      } finally {
        setLoading(false);
      }
    };

    poll();
  }, [txRef, clearCart]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--charcoal)", opacity: 0.5 }}>
          Confirming your payment…
        </p>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6" style={{ background: "var(--cream)" }}>
        <p className="text-xl" style={{ fontFamily: "var(--font-display)", color: "var(--charcoal)" }}>
          {error || "Something went wrong."}
        </p>
        <Link href="/shop" className="text-sm tracking-widest uppercase underline" style={{ color: "var(--ochre)" }}>
          Return to Shop
        </Link>
      </main>
    );
  }

  const paid = order.paymentStatus === "paid" || urlStatus === "successful";

  return (
    <main className="min-h-screen pt-28 pb-20 px-6" style={{ background: "var(--cream)" }}>
      <div className="max-w-2xl mx-auto flex flex-col gap-10">

        {/* Status banner */}
        <div className={`px-8 py-10 text-center ${paid ? "" : "border border-red-200 bg-red-50"}`}
          style={paid ? { background: "var(--warm-white)", border: "1px solid rgba(0,0,0,0.08)" } : {}}>
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: paid ? "var(--ochre)" : "#dc2626" }}>
            {paid ? "Payment confirmed" : "Payment failed"}
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,4vw,40px)", color: "var(--charcoal)" }}>
            {paid
              ? `Thank you, ${order.customerName.split(" ")[0]}.`
              : "Your payment was not completed."}
          </h1>
          <p className="mt-3 text-sm opacity-60" style={{ color: "var(--charcoal)" }}>
            {paid
              ? "Your artwork is confirmed. We will be in touch within 24 hours with shipping details."
              : "No payment was taken. Please try again or contact us on WhatsApp."}
          </p>
        </div>

        {/* Order receipt (only on success) */}
        {paid && (
          <div className="flex flex-col gap-4 p-8" style={{ background: "var(--warm-white)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <h2 className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--ochre)" }}>Your Order</h2>
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm pb-3 border-b last:border-0" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", color: "var(--charcoal)" }}>{item.title}</p>
                  <p className="text-xs opacity-50 mt-0.5">{item.artist} · qty {item.qty}</p>
                </div>
                <span style={{ color: "var(--charcoal)" }}>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold pt-2" style={{ color: "var(--charcoal)" }}>
              <span>Total paid</span>
              <span>{order.currency} {order.total.toFixed(2)}</span>
            </div>
            {txRef && (
              <p className="text-xs opacity-40 mt-1" style={{ color: "var(--charcoal)" }}>
                Reference: {txRef}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          {paid ? (
            <>
              <Link href="/shop" className="flex-1 py-4 text-center text-sm tracking-widest uppercase" style={{ background: "var(--charcoal)", color: "#fff" }}>
                Continue Shopping
              </Link>
              <Link href="/" className="flex-1 py-4 text-center text-sm tracking-widest uppercase border" style={{ borderColor: "var(--charcoal)", color: "var(--charcoal)" }}>
                Back to Home
              </Link>
            </>
          ) : (
            <>
              <Link href="/checkout" className="flex-1 py-4 text-center text-sm tracking-widest uppercase" style={{ background: "var(--charcoal)", color: "#fff" }}>
                Try Again
              </Link>
              <a href="https://wa.me/250700000000" target="_blank" rel="noreferrer"
                className="flex-1 py-4 text-center text-sm tracking-widest uppercase border"
                style={{ borderColor: "var(--charcoal)", color: "var(--charcoal)" }}>
                WhatsApp Studio
              </a>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
