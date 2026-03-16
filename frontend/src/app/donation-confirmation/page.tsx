"use client";
import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCurrency } from "@/context/CurrencyContext";
import { apiUrl } from "@/lib/api";

interface OrderData {
  paymentStatus: "pending" | "paid" | "failed";
  customerName: string;
  total: number;
  currency: string;
  items: { title: string; artist: string; price: number; qty: number }[];
  createdAt: string;
}

export default function DonationConfirmationPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--ink)", opacity: 0.5 }}>
          Confirming your donation…
        </p>
      </main>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}

function ConfirmationContent() {
  const params = useSearchParams();
  const { formatPrice } = useCurrency();
  const txRef = params.get("tx_ref");
  const urlStatus = params.get("status");

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!txRef) {
      setError("No transaction reference found.");
      setLoading(false);
      return;
    }

    let attempts = 0;
    const poll = async () => {
      attempts++;
      try {
        const res = await fetch(apiUrl(`/orders/status?tx_ref=${txRef}`));
        if (!res.ok) throw new Error("Donation not found.");
        const data: OrderData = await res.json();

        if (data.paymentStatus === "pending" && attempts < 5) {
          setTimeout(poll, 2000);
          return;
        }

        setOrder(data);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Could not load donation.");
      } finally {
        setLoading(false);
      }
    };

    poll();
  }, [txRef]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--ink)", opacity: 0.5 }}>
          Confirming your donation…
        </p>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6" style={{ background: "var(--cream)" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--ink)" }}>
          {error || "Something went wrong."}
        </p>
        <Link href="/donation" style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ochre)", textDecoration: "none" }}>
          Return to Donation
        </Link>
      </main>
    );
  }

  const paid = order.paymentStatus === "paid" || urlStatus === "successful";

  return (
    <main className="min-h-screen pt-28 pb-20 px-6" style={{ background: "var(--cream)" }}>
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        <div
          style={{
            padding: "48px 32px",
            textAlign: "center",
            background: paid ? "var(--cream-warm)" : "rgba(220, 38, 38, 0.08)",
            border: paid ? "1px solid rgba(107, 103, 96, 0.15)" : "1px solid rgba(220, 38, 38, 0.2)",
          }}
        >
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: paid ? "var(--ochre)" : "#b91c1c", marginBottom: 16 }}>
            {paid ? "Donation confirmed" : "Payment failed"}
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "var(--ink)", lineHeight: 1.2 }}>
            {paid
              ? `Thank you, ${order.customerName.split(" ")[0]}.`
              : "Your donation was not completed."}
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--warm-grey)", marginTop: 16, lineHeight: 1.7 }}>
            {paid
              ? "Your contribution will fund materials, field trips, and scholarships for young Rwandan wildlife artists. We'll send a receipt to your email."
              : "No payment was taken. Please try again or contact us to donate via bank transfer."}
          </p>
        </div>

        {paid && (
          <div style={{ padding: 32, background: "var(--cream-warm)", border: "1px solid rgba(107, 103, 96, 0.1)" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>
              Your donation
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid rgba(107, 103, 96, 0.1)" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--ink)" }}>Conservation Programme</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 300, color: "var(--ochre)" }}>
                {formatPrice(order.total)}
              </p>
            </div>
            {txRef && (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--warm-grey)", marginTop: 16 }}>
                Reference: {txRef}
              </p>
            )}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {paid ? (
            <>
              <Link
                href="/conservation"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  background: "var(--ink)",
                  color: "#fff",
                  padding: "16px 24px",
                  textAlign: "center",
                  textDecoration: "none",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                Learn about Conservation
              </Link>
              <Link
                href="/"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  border: "1px solid var(--ink)",
                  padding: "16px 24px",
                  textAlign: "center",
                  textDecoration: "none",
                }}
                className="hover:bg-[var(--ink)] hover:text-[var(--cream)] transition-colors"
              >
                Back to Home
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/donation"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  background: "var(--ochre)",
                  color: "#fff",
                  padding: "16px 24px",
                  textAlign: "center",
                  textDecoration: "none",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                Try Again
              </Link>
              <a
                href="https://wa.me/250700000000"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  border: "1px solid var(--ink)",
                  padding: "16px 24px",
                  textAlign: "center",
                  textDecoration: "none",
                }}
                className="hover:bg-[var(--ink)] hover:text-[var(--cream)] transition-colors"
              >
                Contact via WhatsApp
              </a>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
