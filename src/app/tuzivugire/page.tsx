"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useCountUp } from "@/hooks/useCountUp";

const impacts = [
  { value: 34, label: "Young artists trained", suffix: "" },
  { value: 12, label: "Scholarships awarded", suffix: "" },
  { value: 6,  label: "Community exhibitions", suffix: "" },
  { value: 80, label: "Artworks created by students", suffix: "+" },
];

const steps = [
  { num: "01", title: "Selection", body: "Each year we accept 8–10 students aged 14–22 from Musanze and surrounding districts, selected by portfolio and personal statement. No prior formal training required — only genuine curiosity." },
  { num: "02", title: "Field Study", body: "Students join our weekly park visits, learning to observe animals at rest, in motion, and in family groups. A sketchbook is mandatory; phones are not. The eye must learn to see before the hand can draw." },
  { num: "03", title: "Studio Practice", body: "Three days a week in the studio alongside the resident artists. Students work from their field sketches, learning graphite handling, tonal range, and compositional structure through direct mentorship." },
  { num: "04", title: "Exhibition & Income", body: "Graduating students show their work in SAWA's annual exhibition. Sold pieces generate income for the student. The best graduates are invited to join the studio as apprentice artists." },
];

const students = [
  { name: "Aline Uwimana", year: "Class of 2023", specialty: "Charcoal gorilla studies", quote: "I used to walk past the park every day without looking. Tuzivugire taught me to look.", emoji: "🦍" },
  { name: "Emmanuel Niyonzima", year: "Class of 2024", specialty: "Ink elephant portraits", quote: "I never thought art could be a career. Now it is.", emoji: "🐘" },
  { name: "Vestine Mukeshimana", year: "Class of 2023", specialty: "Mixed media bird studies", quote: "The crane in my first piece took three weeks. I would spend three months on it now.", emoji: "🦢" },
];

function StatCard({ value, label, suffix }: { value: number; label: string; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(inView ? value : 0, 2000);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,6vw,80px)", fontWeight: 300, color: "var(--ochre)", lineHeight: 1 }}>
        {count}{suffix}
      </p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: 8 }}>{label}</p>
    </div>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
}

export default function TuzivugirePage() {
  return (
    <main style={{ paddingTop: 72 }}>
      <PageHero
        label="Tuzivugire — Let Us Speak Out"
        headline={<>A program for<br />young Rwandan<br />wildlife artists.</>}
        subtitle={'In Kinyarwanda, Tuzivugire means "let us speak out." This programme gives young artists from the Musanze region the tools, mentorship, and platform to speak through their art — about the animals they live beside, and the landscapes they stand to lose.'}
        emoji="✊"
      >
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginTop: 32 }}>
          <a href="#support" style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", background: "var(--ochre)", color: "#fff", padding: "14px 36px", textDecoration: "none" }}>Support the Programme</a>
          <a href="#how-it-works" style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink)", borderBottom: "1px solid var(--ink)", paddingBottom: 2, textDecoration: "none" }}>How it works</a>
        </motion.div>
      </PageHero>

      {/* Stats */}
      <section style={{ background: "var(--ink)", padding: "80px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 48 }}>
          {impacts.map((s) => <StatCard key={s.label} value={s.value} label={s.label} suffix={s.suffix} />)}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ background: "var(--cream)", padding: "100px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>The Programme</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,4vw,56px)", fontWeight: 300, color: "var(--ink)", marginBottom: 72, lineHeight: 1.05 }}>From observation<br />to exhibition</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 48 }}>
            {steps.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.1}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 300, color: "var(--sand)", marginBottom: 12, lineHeight: 1 }}>{s.num}</p>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 300, color: "var(--ink)", marginBottom: 16 }}>{s.title}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "rgba(14,16,15,0.6)", lineHeight: 1.85 }}>{s.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Student voices */}
      <section style={{ background: "var(--ink)", padding: "100px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>Student Voices</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 300, color: "var(--cream)", marginBottom: 64, lineHeight: 1.05 }}>The artists we are training</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 2 }}>
            {students.map((s, i) => (
              <FadeIn key={s.name} delay={i * 0.12}>
                <div style={{ background: "rgba(255,255,255,0.03)", padding: "48px 40px", border: "1px solid rgba(255,255,255,0.05)", height: "100%" }}>
                  <div style={{ fontSize: 56, marginBottom: 24, opacity: 0.4 }}>{s.emoji}</div>
                  <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 20, fontWeight: 300, color: "var(--cream)", lineHeight: 1.6, marginBottom: 28 }}>&ldquo;{s.quote}&rdquo;</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--ochre)" }}>{s.name}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{s.year} · {s.specialty}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section id="support" style={{ background: "var(--cream-warm)", padding: "100px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>Support</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,52px)", fontWeight: 300, color: "var(--ink)", lineHeight: 1.05, marginBottom: 24 }}>Help us train the<br />next generation.</h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "rgba(14,16,15,0.6)", lineHeight: 1.85, marginBottom: 40 }}>
              Your contribution funds field materials, park visit transport, and annual scholarships for students who cannot afford supplies. Every $50 funds one student&rsquo;s materials for a month. Every $600 sponsors a full-year scholarship.
            </p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <a href="mailto:studio@sawa.rw?subject=Tuzivugire%20Donation"
                style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", background: "var(--ink)", color: "#fff", padding: "14px 36px", textDecoration: "none" }}>
                Donate
              </a>
              <Link href="/commission" style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink)", borderBottom: "1px solid var(--ink)", paddingBottom: 2, textDecoration: "none" }}>
                Commission a piece (10% donated)
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[["$50", "Monthly materials for 1 student"], ["$200", "Field trip sponsorship (4 students)"], ["$600", "Full-year scholarship"], ["$1,000+", "Name a studio workstation"]].map(([amount, desc]) => (
                <div key={amount} style={{ background: "var(--cream)", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 300, color: "var(--ochre)" }}>{amount}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--warm-grey)", maxWidth: 200, textAlign: "right" }}>{desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
