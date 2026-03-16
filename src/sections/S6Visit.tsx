"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function S6Visit() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section
      className="w-full py-32" // Matched py-32 from S4Artists
      style={{
        backgroundColor: "var(--green)",
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* Container matched to S4Artists: max-w-[1480px], mx-auto, px-8 */}
      <div className="max-w-[1480px] mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-5 gap-12 items-center">

        {/* Left Side: Headline & Text */}
        <div className="md:col-span-3">
          <h2 style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 600,
            color: "var(--cream)",
            lineHeight: 1.1,
            marginBottom: 20
          }}>
            Subscribe to our newsletter
          </h2>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "16px",
            color: "rgba(255,255,255,0.85)",
            maxWidth: "440px",
            lineHeight: 1.6
          }}>
            Join our newsletter to get exclusive insights, timely updates, and expert tips that help you stay connected.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-2">
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--cream)",
            marginBottom: 12,
            fontWeight: 500
          }}>
            Stay Informed
          </p>

          {subscribed ? (
            <div style={{ padding: "14px 0" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 18, color: "var(--cream)" }}>
                ✓ Thank you for subscribing!
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubscribed(true); }}
              className="flex flex-col sm:flex-row gap-3 w-full"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  flex: 1,
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  padding: "16px 20px",
                  borderRadius: "40px",
                  border: "none",
                  background: "var(--cream)",
                  color: "var(--ink)",
                  outline: "none"
                }}
              />
              <button
                type="submit"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  padding: "16px 32px",
                  borderRadius: "40px",
                  background: "var(--ochre)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                Subscribe
              </button>
            </form>
          )}

          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            color: "rgba(255,255,255,0.7)",
            marginTop: 16
          }}>
            By subscribing you agree to our <span style={{ textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span>
          </p>
        </div>

      </div>
    </section>
  );
}