"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useCurrency } from "@/context/CurrencyContext";

const experiences = [
  {
    id: "studio",
    emoji: "🎨",
    label: "Studio Visit",
    duration: "2 hours",
    priceUsd: 60,
    priceSuffix: " / person",
    maxGuests: 6,
    desc: "Step inside the working studio in Musanze. Watch one of our three artists at work, handle the materials, and hear the stories behind the pieces on the walls. Ends with tea and an open Q&A.",
    includes: ["Guided tour of the studio", "Live drawing demonstration", "Materials handling session", "Tea & conversation with the artist"],
  },
  {
    id: "field",
    emoji: "🦍",
    label: "Field Observation",
    duration: "Full day",
    priceUsd: 220,
    priceSuffix: " / person",
    maxGuests: 4,
    desc: "Join one of our artists on a full-day observation session in the field — gorilla habituation zones, Akagera savanna, or Nyungwe canopy walks. Witness how every artwork begins: with silence, patience, and a sketchbook.",
    includes: ["Pre-dawn departure from Musanze", "Artist-led wildlife observation", "Live field sketching session", "Picnic lunch in the park", "Certificate of participation"],
  },
  {
    id: "private",
    emoji: "🖼️",
    label: "Private Viewing",
    duration: "3 hours",
    priceUsd: 120,
    priceSuffix: " / group",
    maxGuests: 10,
    desc: "An exclusive after-hours viewing of the full SAWA collection — works not yet listed publicly, archive pieces, and works in progress. Ideal for collectors, curators, or anyone considering a commission.",
    includes: ["Full collection access", "Works-in-progress preview", "One-on-one with the artist of your choice", "Complimentary catalogue", "Priority commission slot"],
  },
];

const timeSlots = ["08:00", "10:00", "12:00", "14:00", "16:00"];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 16px",
  fontFamily: "var(--font-sans)", fontSize: 13,
  color: "var(--ink)", background: "var(--cream)",
  border: "1px solid rgba(14,16,15,0.15)",
  outline: "none", transition: "border-color 0.3s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)", fontSize: 10,
  letterSpacing: "0.16em", textTransform: "uppercase",
  color: "var(--warm-grey)", marginBottom: 8, display: "block",
};

export default function BookPage() {
  const { formatPrice } = useCurrency();
  const [selected, setSelected]   = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "", time: "", guests: "1", notes: "",
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSubmitted(true);
  };

  const selectedExp = experiences.find((ex) => ex.id === selected);

  return (
    <main style={{ paddingTop: 72, background: "var(--cream)" }}>
      <PageHero
        label="Experiences · Musanze, Rwanda"
        headline="Come and see where the wild becomes art."
        subtitle="Three artists. One studio. Minutes from Volcanoes National Park. Book a studio visit, a field day, or a private collection viewing."
        emoji="🦍"
      />

      {/* Experience picker */}
      <section style={{ padding: "100px clamp(24px,6vw,80px) 80px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>
            Choose your experience
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 300, color: "var(--ink)", marginBottom: 56 }}>
            Three ways to enter the studio
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 2 }}>
          {experiences.map((ex, i) => {
            const isActive = selected === ex.id;
            return (
              <FadeIn key={ex.id} delay={i * 0.1}>
                <button
                  onClick={() => setSelected(ex.id)}
                  style={{
                    width: "100%", textAlign: "left", background: isActive ? "var(--ink)" : "var(--cream-warm)",
                    padding: "44px 36px", border: `2px solid ${isActive ? "var(--ochre)" : "transparent"}`,
                    cursor: "pointer", transition: "all 0.3s", display: "block",
                  }}
                  className={isActive ? "" : "hover:!border-[rgba(14,16,15,0.12)]"}
                >
                  <span style={{ fontSize: 36, display: "block", marginBottom: 20 }}>{ex.emoji}</span>

                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 10 }}>
                    {ex.duration} · {formatPrice(ex.priceUsd)}{ex.priceSuffix}
                  </p>

                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 300, color: isActive ? "#fff" : "var(--ink)", marginBottom: 16 }}>
                    {ex.label}
                  </h3>

                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: isActive ? "rgba(255,255,255,0.5)" : "rgba(14,16,15,0.55)", lineHeight: 1.8, marginBottom: 28 }}>
                    {ex.desc}
                  </p>

                  <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {ex.includes.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                          <path d="M2.5 7l3 3 6-6" stroke={isActive ? "var(--ochre)" : "var(--sage)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: isActive ? "rgba(255,255,255,0.4)" : "rgba(14,16,15,0.5)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                      style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ochre)" }} />
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ochre)" }}>
                        Selected — scroll down to book
                      </span>
                    </motion.div>
                  )}
                </button>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* What to expect */}
      <section style={{ background: "var(--cream-warm)", padding: "80px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,44px)", fontWeight: 300, color: "var(--ink)", marginBottom: 56 }}>
              What to expect
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2 }}>
            {[
              { icon: "📍", title: "Location", body: "SAWA Studio, Musanze town centre, Northern Province, Rwanda. 15 minutes from Kinigi Gate, Volcanoes National Park." },
              { icon: "🕐", title: "Timing", body: "Morning sessions begin at 08:00. Afternoon sessions from 14:00. Field days depart pre-dawn; we arrange hotel pickup." },
              { icon: "👥", title: "Group sizes", body: "Intimate by design. Studio visits: max 6. Field days: max 4. Private viewings: up to 10. Solo bookings welcome." },
              { icon: "🌦️", title: "All weather", body: "Rwanda's mountains are unpredictable. We run all sessions rain or shine. Field days include ponchos and all gear." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div style={{ padding: "40px 32px", background: "var(--cream)" }}>
                  <span style={{ fontSize: 28, display: "block", marginBottom: 18 }}>{item.icon}</span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: "var(--ink)", marginBottom: 12 }}>{item.title}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(14,16,15,0.55)", lineHeight: 1.85 }}>{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section id="booking-form" style={{ padding: "100px clamp(24px,6vw,80px)", maxWidth: 860, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>Reserve your place</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 300, color: "var(--ink)", marginBottom: 12 }}>
            Book your experience
          </h2>
          {!selected && (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--warm-grey)", marginBottom: 48 }}>
              Select an experience above, then complete the form below.
            </p>
          )}
          {selected && (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--warm-grey)", marginBottom: 48 }}>
              Booking: <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{selectedExp?.label}</strong>
              {selectedExp && ` · ${formatPrice(selectedExp.priceUsd)}${selectedExp.priceSuffix}`}
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ochre)", fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.12em", marginLeft: 12, padding: 0 }}>
                Change ×
              </button>
            </p>
          )}
        </FadeIn>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: "var(--forest)", padding: "72px 56px", textAlign: "center" }}
          >
            <span style={{ fontSize: 52, display: "block", marginBottom: 24 }}>🌿</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 300, color: "#fff", marginBottom: 16 }}>
              Your booking is confirmed.
            </h3>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, maxWidth: 480, margin: "0 auto 40px" }}>
              We&rsquo;ve sent a confirmation to <strong style={{ color: "rgba(255,255,255,0.75)" }}>{form.email}</strong>. One of our team will be in touch within 24 hours to finalise your visit details.
            </p>
            <Link
              href="/"
              style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", background: "var(--ochre)", color: "#fff", padding: "14px 36px", textDecoration: "none" }}
              className="hover:!bg-[var(--ochre-light)]"
            >
              Back to Home
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>

            {/* Experience selector (in-form) */}
            <div>
              <label style={labelStyle}>Experience</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
                {experiences.map((ex) => (
                  <button
                    key={ex.id} type="button"
                    onClick={() => setSelected(ex.id)}
                    style={{
                      padding: "14px 12px", border: `1px solid ${selected === ex.id ? "var(--ochre)" : "rgba(14,16,15,0.15)"}`,
                      background: selected === ex.id ? "rgba(200,144,58,0.06)" : "var(--cream)",
                      cursor: "pointer", transition: "all 0.2s",
                      fontFamily: "var(--font-sans)", fontSize: 11,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: selected === ex.id ? "var(--ochre)" : "var(--warm-grey)",
                    }}
                  >
                    {ex.emoji} {ex.label}
                  </button>
                ))}
              </div>
              {!selected && (
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(200,144,58,0.8)", marginTop: 8 }}>
                  Please select an experience to continue.
                </p>
              )}
            </div>

            {/* Name + email */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <label style={labelStyle}>Full name</label>
                <input name="name" value={form.name} onChange={handle} required placeholder="Your full name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email address</label>
                <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@example.com" style={inputStyle} />
              </div>
            </div>

            {/* Phone + guests */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <label style={labelStyle}>Phone / WhatsApp</label>
                <input name="phone" value={form.phone} onChange={handle} placeholder="+250 7xx xxx xxx" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Number of guests</label>
                <select name="guests" value={form.guests} onChange={handle} style={inputStyle}>
                  {Array.from({ length: selected ? (experiences.find(e => e.id === selected)?.maxGuests ?? 6) : 6 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date + time */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <label style={labelStyle}>Preferred date</label>
                <input
                  name="date" type="date" value={form.date} onChange={handle} required
                  min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Preferred time</label>
                <select name="time" value={form.time} onChange={handle} required style={inputStyle}>
                  <option value="">Select a slot</option>
                  {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label style={labelStyle}>Additional notes (optional)</label>
              <textarea
                name="notes" value={form.notes} onChange={handle} rows={4}
                placeholder="Accessibility needs, special requests, or anything else we should know..."
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            {/* Price summary */}
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: "var(--cream-warm)", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 4 }}>
                    {selectedExp?.label}
                  </p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 300, color: "var(--ink)" }}>
                    {selectedExp && `${formatPrice(selectedExp.priceUsd)}${selectedExp.priceSuffix}`}
                  </p>
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--warm-grey)" }}>
                  Payment on arrival · No deposit required
                </p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={!selected}
              style={{
                fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
                background: selected ? "var(--ochre)" : "rgba(14,16,15,0.12)",
                color: selected ? "#fff" : "rgba(14,16,15,0.3)",
                padding: "18px 56px", border: "none",
                cursor: selected ? "pointer" : "not-allowed",
                alignSelf: "flex-start", transition: "background 0.3s",
              }}
              className={selected ? "hover:!bg-[var(--ochre-light)]" : ""}
            >
              Confirm Booking
            </button>

            <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--warm-grey)", lineHeight: 1.7 }}>
              No payment required upfront. We&rsquo;ll confirm availability within 24 hours and collect on the day.
            </p>
          </form>
        )}
      </section>

      {/* CTA strip */}
      <section style={{ background: "var(--ink)", padding: "72px clamp(24px,6vw,80px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
        <div>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 300, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
            Prefer a commission instead?
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,3vw,40px)", fontWeight: 300, color: "var(--cream)" }}>
            Take the wild home with you.
          </p>
        </div>
        <Link
          href="/commission"
          style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", background: "var(--ochre)", color: "#fff", padding: "16px 40px", textDecoration: "none", flexShrink: 0 }}
          className="hover:!bg-[var(--ochre-light)]"
        >
          Start a Commission
        </Link>
      </section>

      <Footer />
    </main>
  );
}
