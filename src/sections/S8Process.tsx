"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const materials = [
  { name: "Graphite",    grade: "H2 â†’ 8B",  desc: "The foundation. Christine grades each pencil before a session, selecting hardness by animal â€” H4 for elephant hide, 6B for gorilla fur." },
  { name: "Charcoal",   grade: "Compressed", desc: "Rigobert favours compressed over vine for his big cats. The density allows for deep, velvety shadows that no graphite can match." },
  { name: "Ink",        grade: "Carbon",     desc: "Josue uses Japanese carbon ink for his elephant studies â€” permanent, deep, with a slight sheen that catches light on thick paper." },
  { name: "Paper",      grade: "200â€“300 gsm", desc: "Fabriano Artistico 300gsm cold-press. Heavy enough to take abuse. The tooth holds graphite dust the way high-altitude moss holds mist." },
  { name: "Blending",   grade: "Tortillon", desc: "Hand-rolled paper stumps, not fingers. Fingerprints leave oil. The tortillon leaves nothing but smoothness." },
  { name: "Erasers",    grade: "Kneaded",   desc: "The kneaded eraser is a drawing tool as much as a correction tool â€” used to lift graphite into highlights, to suggest the whites of eyes." },
];

export default function S8Process() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section id="process" ref={ref} style={{ backgroundColor: "var(--cream)" }}>

      {/* Header */}
      <div
        className="max-w-[1480px] mx-auto px-8 lg:px-16 py-24 grid lg:grid-cols-2 gap-16 lg:gap-28"
        style={{ borderBottom: "1px solid rgba(14,16,15,0.07)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ochre)",
              marginBottom: 16,
            }}
          >
            Beauty in the Essence of Things
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px,4vw,60px)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "var(--ink)",
              marginBottom: 28,
            }}
          >
            The Process
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(17px,1.5vw,21px)",
              fontWeight: 300,
              color: "rgba(14,16,15,0.6)",
              lineHeight: 1.85,
            }}
          >
            Our tools are chosen with a precise understanding of the animal and the light. Each material was tested in the field before it was accepted into the studio. Time, observation, and repetition â€” this is how the wild is translated to paper.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col justify-center"
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(17px,1.5vw,21px)",
              fontWeight: 300,
              color: "rgba(14,16,15,0.55)",
              lineHeight: 1.85,
              marginBottom: 28,
            }}
          >
            The three artists at SAWA work together with deliberate attention to material and duration â€” time that will soon become history, a story of habitat observed and documented with fidelity. Natural graphite, warm charcoal, aged ink, and textured heavy paper. This is how we create a visual and tactile record of animals that may not exist in the same numbers a generation from now.
          </p>

          <blockquote
            style={{
              borderLeft: "2px solid var(--ochre)",
              paddingLeft: 20,
              marginTop: 8,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(18px,1.6vw,22px)",
                fontWeight: 300,
                color: "rgba(14,16,15,0.7)",
                lineHeight: 1.7,
              }}
            >
              Muted observation, patient stillness, smooth lines. The discipline of looking is the new luxury.
            </p>
          </blockquote>
        </motion.div>
      </div>

      {/* Materials grid */}
      <div className="max-w-[1480px] mx-auto px-8 lg:px-16 py-16 grid grid-cols-2 md:grid-cols-3 gap-0">
        {materials.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
            className="group cursor-default px-8 py-10 transition-colors duration-300 hover:bg-[var(--cream-warm)]"
            style={{
              borderRight: (i % 3 < 2) ? "1px solid rgba(14,16,15,0.07)" : "none",
              borderBottom: i < 3 ? "1px solid rgba(14,16,15,0.07)" : "none",
            }}
          >
            <div className="flex items-start justify-between mb-5">
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontWeight: 400,
                  color: "var(--ink)",
                }}
              >
                {m.name}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ochre)",
                  border: "1px solid var(--ochre)",
                  padding: "3px 8px",
                  whiteSpace: "nowrap",
                }}
              >
                {m.grade}
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 15,
                fontWeight: 300,
                color: "rgba(14,16,15,0.5)",
                lineHeight: 1.8,
              }}
            >
              {m.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

