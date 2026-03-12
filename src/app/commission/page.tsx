"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const steps = [
  { num: "01", title: "Consultation", body: "Tell us about the animal, size, and feeling you want. We respond within 48 hours with a brief and an estimated timeline." },
  { num: "02", title: "Concept Sketch", body: "Your chosen artist produces 2–3 initial composition sketches. You review and guide the direction before we proceed to final paper." },
  { num: "03", title: "Creation", body: "The work is created over 2–8 weeks depending on scale and complexity. You receive progress photographs at key stages." },
  { num: "04", title: "Delivery", body: "Archival-framed under conservation glass, shipped worldwide or collected from the studio in Musanze. Certificate of authenticity included." },
];

const pricing = [
  { size: "Small",  dims: "30×40cm",   price: "$450–$750",   time: "2–3 weeks" },
  { size: "Medium", dims: "60×80cm",   price: "$900–$1,500", time: "3–5 weeks" },
  { size: "Large",  dims: "100×120cm", price: "$1,800–$3,000", time: "5–8 weeks" },
  { size: "Grand",  dims: "150×200cm", price: "From $4,000",  time: "8–12 weeks" },
];

const animals = ["Mountain Gorilla", "African Elephant", "Lion", "Leopard", "Cheetah", "Eagle", "Buffalo", "Hippopotamus", "Crowned Crane", "Chimpanzee", "Golden Monkey", "Other"];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 16px", fontFamily: "var(--font-sans)", fontSize: 13,
  color: "var(--ink)", background: "var(--cream)", border: "1px solid rgba(14,16,15,0.15)",
  outline: "none", transition: "border-color 0.3s",
};
const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
  color: "var(--warm-grey)", marginBottom: 8, display: "block",
};

export default function CommissionPage() {
  const [form, setForm] = useState({ name: "", email: "", animal: "", medium: "", size: "", budget: "", timeline: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ paddingTop: 72 }}>
      <PageHero
        label="Commission a Piece"
        headline="A work made for you. An animal documented for the world."
        subtitle="Each commissioned work is a collaboration between you and one of our three resident artists. You choose the subject, scale, and medium. They bring the forest."
        emoji="✍️"
      />

      {/* How it works */}
      <section style={{ background: "var(--cream)", padding: "100px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 300, color: "var(--ink)", marginBottom: 72 }}>How the process works</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2 }}>
            {steps.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.1}>
                <div style={{ background: "var(--cream-warm)", padding: "40px 32px", height: "100%" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 52, fontWeight: 300, color: "var(--sand)", marginBottom: 16, lineHeight: 1 }}>{s.num}</p>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 300, color: "var(--ink)", marginBottom: 14 }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(14,16,15,0.6)", lineHeight: 1.85 }}>{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: "var(--forest)", padding: "80px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,44px)", fontWeight: 300, color: "var(--cream)", marginBottom: 48 }}>Pricing guide</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2 }}>
            {pricing.map((p, i) => (
              <FadeIn key={p.size} delay={i * 0.08}>
                <div style={{ background: "rgba(255,255,255,0.04)", padding: "36px 28px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 8 }}>{p.size}</p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 300, color: "var(--cream)", marginBottom: 8 }}>{p.price}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>{p.dims}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.25)", fontStyle: "italic" }}>{p.time}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form" style={{ background: "var(--cream)", padding: "100px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>Begin</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 300, color: "var(--ink)", marginBottom: 48 }}>Tell us about your piece</h2>
          </FadeIn>

          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: "var(--forest)", padding: "64px 48px", textAlign: "center" }}>
              <p style={{ fontSize: 48, marginBottom: 24 }}>🦍</p>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 300, color: "var(--cream)", marginBottom: 16 }}>We received your brief.</h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                One of our artists will be in touch within 48 hours with initial thoughts and next steps. Thank you for trusting us with your vision.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label style={labelStyle}>Your name</label>
                  <input name="name" value={form.name} onChange={handle} required placeholder="Full name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email address</label>
                  <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@example.com" style={inputStyle} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label style={labelStyle}>Animal subject</label>
                  <select name="animal" value={form.animal} onChange={handle} required style={inputStyle}>
                    <option value="">Select an animal</option>
                    {animals.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Preferred medium</label>
                  <select name="medium" value={form.medium} onChange={handle} style={inputStyle}>
                    <option value="">No preference</option>
                    <option>Graphite</option>
                    <option>Charcoal</option>
                    <option>Ink</option>
                    <option>Mixed Media</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                <div>
                  <label style={labelStyle}>Size</label>
                  <select name="size" value={form.size} onChange={handle} style={inputStyle}>
                    <option value="">Select size</option>
                    <option>Small (30×40cm)</option>
                    <option>Medium (60×80cm)</option>
                    <option>Large (100×120cm)</option>
                    <option>Grand (150×200cm)</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Budget (USD)</label>
                  <select name="budget" value={form.budget} onChange={handle} style={inputStyle}>
                    <option value="">Select range</option>
                    <option>$400–$800</option>
                    <option>$800–$1,500</option>
                    <option>$1,500–$3,000</option>
                    <option>$3,000+</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Timeline</label>
                  <select name="timeline" value={form.timeline} onChange={handle} style={inputStyle}>
                    <option value="">No rush</option>
                    <option>1 month</option>
                    <option>2–3 months</option>
                    <option>Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Additional notes</label>
                <textarea name="notes" value={form.notes} onChange={handle} rows={5} placeholder="Describe the mood, composition, or any reference you have in mind..." style={{ ...inputStyle, resize: "vertical" }} />
              </div>

              <button type="submit"
                style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", background: "var(--ink)", color: "#fff", padding: "18px 48px", border: "none", cursor: "pointer", alignSelf: "flex-start", transition: "background 0.3s" }}
                className="hover:!bg-[var(--forest)]">
                Submit Brief
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
