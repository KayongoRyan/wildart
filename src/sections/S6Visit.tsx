"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function S6Visit() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-[1200px] mx-auto px-8 lg:px-16 grid md:grid-cols-2 gap-16">
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,48px)", fontWeight: 300, color: "var(--ink)", marginBottom: 24 }}>Visit us</h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--ink)", marginBottom: 16 }}>Musanze, Rwanda</p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--warm-grey)", marginBottom: 8 }}>Monday–Saturday 10am–6pm</p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--warm-grey)", marginBottom: 16 }}>Sunday 12pm–6pm</p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--warm-grey)" }}>Free entry</p>
        </div>
        <div>
          <h3 style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>Newsletter</h3>
          {subscribed ? (
            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16, color: "var(--ochre)" }}>Thank you!</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubscribed(true); }} className="flex flex-col gap-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required
                style={{ fontFamily: "var(--font-sans)", fontSize: 14, padding: "12px 16px", border: "1px solid rgba(14,16,15,0.2)", background: "var(--cream)", outline: "none" }} />
              <button type="submit" style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", padding: "12px 24px", background: "var(--ink)", color: "#fff", border: "none", cursor: "pointer", alignSelf: "flex-start" }}>Sign Up</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
