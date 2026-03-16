"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { apiUrl } from "@/lib/api";

const categories = [
  {
    id: "internship",
    title: "Internship",
    emoji: "🌱",
    description: "Join our studio for 3–6 months. Learn field sketching, wildlife observation, and studio practice alongside our resident artists. Ideal for emerging artists and conservation-minded creatives.",
    cta: "Apply for Internship",
  },
  {
    id: "artists",
    title: "Artists Application",
    emoji: "🎨",
    description: "Apply to become a resident or visiting artist at SAWA. We welcome wildlife artists who work from direct observation and share our commitment to documenting African species.",
    cta: "Apply as Artist",
  },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  color: "var(--ink)",
  background: "var(--cream)",
  border: "1px solid rgba(14,16,15,0.15)",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 10,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--warm-grey)",
  marginBottom: 8,
  display: "block",
};

function FadeIn({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay }} style={{ height: "100%", ...style }}>
      {children}
    </motion.div>
  );
}

function InternshipForm({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    currentStatus: "",
    preferredDuration: "",
    background: "",
    whySawa: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(apiUrl("/career/apply"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "internship" }),
      });
      let data: { error?: string } = {};
      try {
        data = await res.json();
      } catch {
        if (!res.ok) throw new Error("Server error. Please try again or contact us.");
      }
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <label style={labelStyle}>Full name *</label>
          <input name="name" value={form.name} onChange={handle} required placeholder="Your full name" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Email address *</label>
          <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@example.com" style={inputStyle} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <label style={labelStyle}>Phone / WhatsApp</label>
          <input name="phone" value={form.phone} onChange={handle} placeholder="+250 7xx xxx xxx" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>City & country</label>
          <input name="location" value={form.location} onChange={handle} placeholder="e.g. Kigali, Rwanda" style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Current status</label>
        <select name="currentStatus" value={form.currentStatus} onChange={handle} style={inputStyle}>
          <option value="">Select one</option>
          <option value="student">Student</option>
          <option value="emerging">Emerging artist</option>
          <option value="professional">Professional</option>
          <option value="career-change">Career change</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Preferred duration</label>
        <select name="preferredDuration" value={form.preferredDuration} onChange={handle} style={inputStyle}>
          <option value="">Select one</option>
          <option value="3 months">3 months</option>
          <option value="6 months">6 months</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Your background</label>
        <textarea name="background" value={form.background} onChange={handle} rows={4} placeholder="Art training, conservation work, or relevant experience..." style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      <div>
        <label style={labelStyle}>Why SAWA?</label>
        <textarea name="whySawa" value={form.whySawa} onChange={handle} rows={4} placeholder="What draws you to wildlife art and our studio?" style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      {error && <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#c53030" }}>{error}</p>}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button type="submit" disabled={submitting} style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", background: "var(--ochre)", color: "#fff", padding: "14px 32px", border: "none", cursor: submitting ? "wait" : "pointer" }} className="hover:opacity-90">
          {submitting ? "Sending…" : "Submit application"}
        </button>
        <button type="button" onClick={onClose} style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", background: "none", border: "1px solid rgba(14,16,15,0.2)", color: "var(--warm-grey)", padding: "14px 24px", cursor: "pointer" }} className="hover:!text-[var(--ink)]">
          Cancel
        </button>
      </div>
    </form>
  );
}

function ArtistsForm({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    portfolioUrl: "",
    preferredMedium: "",
    wildlifeExperience: "",
    availability: "",
    aboutPractice: "",
    whySawa: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(apiUrl("/career/apply"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "artists" }),
      });
      let data: { error?: string } = {};
      try {
        data = await res.json();
      } catch {
        if (!res.ok) throw new Error("Server error. Please try again or contact us.");
      }
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <label style={labelStyle}>Full name *</label>
          <input name="name" value={form.name} onChange={handle} required placeholder="Your full name" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Email address *</label>
          <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@example.com" style={inputStyle} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <label style={labelStyle}>Phone / WhatsApp</label>
          <input name="phone" value={form.phone} onChange={handle} placeholder="+250 7xx xxx xxx" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>City & country</label>
          <input name="location" value={form.location} onChange={handle} placeholder="e.g. Musanze, Rwanda" style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Portfolio or website</label>
        <input name="portfolioUrl" type="url" value={form.portfolioUrl} onChange={handle} placeholder="https://yourportfolio.com" style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>Preferred medium</label>
        <select name="preferredMedium" value={form.preferredMedium} onChange={handle} style={inputStyle}>
          <option value="">Select one</option>
          <option value="Graphite">Graphite</option>
          <option value="Charcoal">Charcoal</option>
          <option value="Ink">Ink</option>
          <option value="Mixed Media">Mixed Media</option>
          <option value="Multiple">Multiple</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Experience with wildlife art</label>
        <select name="wildlifeExperience" value={form.wildlifeExperience} onChange={handle} style={inputStyle}>
          <option value="">Select one</option>
          <option value="field-observation">I work from field observation</option>
          <option value="studio-reference">I work from reference in studio</option>
          <option value="both">Both field and studio</option>
          <option value="beginning">Just beginning with wildlife</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>When could you start?</label>
        <input name="availability" value={form.availability} onChange={handle} placeholder="e.g. March 2026, or Flexible" style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>About your practice</label>
        <textarea name="aboutPractice" value={form.aboutPractice} onChange={handle} rows={4} placeholder="How do you work? What subjects interest you? What drives your art?" style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      <div>
        <label style={labelStyle}>Why SAWA?</label>
        <textarea name="whySawa" value={form.whySawa} onChange={handle} rows={4} placeholder="What draws you to our studio and our approach to wildlife art?" style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      {error && <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#c53030" }}>{error}</p>}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button type="submit" disabled={submitting} style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", background: "var(--ochre)", color: "#fff", padding: "14px 32px", border: "none", cursor: submitting ? "wait" : "pointer" }} className="hover:opacity-90">
          {submitting ? "Sending…" : "Submit application"}
        </button>
        <button type="button" onClick={onClose} style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", background: "none", border: "1px solid rgba(14,16,15,0.2)", color: "var(--warm-grey)", padding: "14px 24px", cursor: "pointer" }} className="hover:!text-[var(--ink)]">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function CareerPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const selectedCategory = categories.find((c) => c.id === selected);

  function handleSuccess() {
    setSubmitted(true);
    setSelected(null);
  }

  return (
    <main style={{ paddingTop: 72, background: "var(--cream)" }}>
      <PageHero
        label="Career"
        headline={<>Join the studio.<br />Document the wild.</>}
        subtitle="Whether you're starting out or established, SAWA offers pathways to work alongside our artists in Musanze — at the edge of Volcanoes National Park."
        emoji="🦒"
      />

      {/* Success message */}
      {submitted && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 600, margin: "0 auto", padding: "48px clamp(24px,6vw,80px)" }}>
          <div style={{ background: "var(--forest)", padding: "48px 40px", textAlign: "center" }}>
            <p style={{ fontSize: 48, marginBottom: 20 }}>✓</p>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 300, color: "#fff", marginBottom: 12 }}>Application received</h3>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              Thank you. We review all applications within 2 weeks and will be in touch.
            </p>
          </div>
        </motion.div>
      )}

      {/* Category cards */}
      <section style={{ padding: submitted ? "0 clamp(24px,6vw,80px) 80px" : "80px clamp(24px,6vw,80px)", maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>
            Choose your path
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,40px)", fontWeight: 300, color: "var(--ink)", marginBottom: 48 }}>
            Two ways to join SAWA
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "stretch" }}>
          {categories.map((cat, i) => {
            const isActive = selected === cat.id;
            return (
              <FadeIn key={cat.id} delay={i * 0.1}>
                <button
                  onClick={() => setSelected(isActive ? null : cat.id)}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: 320,
                    textAlign: "left",
                    background: isActive ? "var(--forest)" : "var(--cream-warm)",
                    padding: "40px 32px",
                    border: `2px solid ${isActive ? "var(--ochre)" : "transparent"}`,
                    cursor: "pointer",
                    transition: "background 0.3s, border-color 0.3s, color 0.3s",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  className={isActive ? "" : "hover:!border-[rgba(14,16,15,0.12)] hover:!bg-[var(--cream)]"}
                >
                  <span style={{ fontSize: 40, display: "block", marginBottom: 20 }}>{cat.emoji}</span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 300, color: isActive ? "#fff" : "var(--ink)", marginBottom: 12 }}>
                    {cat.title}
                  </h3>
                  <p style={{ flex: 1, fontFamily: "var(--font-sans)", fontSize: 13, color: isActive ? "rgba(255,255,255,0.6)" : "rgba(14,16,15,0.6)", lineHeight: 1.75, marginBottom: 0 }}>
                    {cat.description}
                  </p>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 20,
                      fontFamily: "var(--font-sans)",
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--ochre)",
                      borderBottom: "1px solid var(--ochre)",
                      paddingBottom: 2,
                    }}
                  >
                    {isActive ? "Hide form" : cat.cta} →
                  </span>
                </button>
              </FadeIn>
            );
          })}
        </div>

        {/* Custom form */}
        <AnimatePresence mode="wait">
          {selectedCategory && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              style={{ marginTop: 48 }}
            >
              <div
                style={{
                  background: "var(--cream-warm)",
                  border: "1px solid rgba(14,16,15,0.08)",
                  padding: "40px 32px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 4 }}>
                      {selectedCategory.title}
                    </p>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 300, color: "var(--ink)" }}>
                      Application form
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--warm-grey)",
                    }}
                    className="hover:!text-[var(--ink)]"
                  >
                    Close ×
                  </button>
                </div>

                {selected === "internship" && <InternshipForm onSuccess={handleSuccess} onClose={() => setSelected(null)} />}
                {selected === "artists" && <ArtistsForm onSuccess={handleSuccess} onClose={() => setSelected(null)} />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </main>
  );
}
