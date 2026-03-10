"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 20,  suffix: " min",  label: "to Volcanoes National Park" },
  { value: 3,   suffix: " hrs",  label: "drive to Kigali" },
  { value: 2500, suffix: "m",    label: "altitude Â· Musanze" },
];

function Stat({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCountUp(value, 1800, { start });
  return (
    <div className="text-center px-6 py-12">
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(52px,7vw,90px)",
          fontWeight: 300,
          lineHeight: 1,
          color: "var(--ink)",
        }}
      >
        {count}{suffix}
      </p>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--warm-grey)",
          marginTop: 12,
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function S5Place() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="place" ref={ref} style={{ backgroundColor: "var(--cream-warm)" }}>

      {/* Stats row */}
      <div
        className="max-w-[1480px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-3"
        style={{ borderBottom: "1px solid rgba(14,16,15,0.07)" }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.12 }}
            style={{ borderRight: i < 2 ? "1px solid rgba(14,16,15,0.07)" : "none" }}
          >
            <Stat {...s} start={inView} />
          </motion.div>
        ))}
      </div>

      {/* Two-column editorial */}
      <div className="max-w-[1480px] mx-auto px-8 lg:px-16 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 lg:gap-28">

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
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
            Essence of Place
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px,4vw,56px)",
              fontWeight: 300,
              lineHeight: 1.08,
              color: "var(--ink)",
            }}
          >
            Musanze, Rwanda
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(17px,1.5vw,21px)",
              fontWeight: 300,
              color: "rgba(14,16,15,0.6)",
              lineHeight: 1.85,
              marginBottom: 24,
            }}
          >
            Musanze sits at the foot of the Virunga Massif in Rwanda's Northern Province. At this altitude, mornings are cold and clear. The forest line begins at the edge of town. Mountain gorillas are not a myth here â€” they are a fact of life, visible on the hillsides above the market.
          </p>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(19px,1.8vw,24px)",
              fontWeight: 300,
              color: "rgba(14,16,15,0.8)",
              lineHeight: 1.5,
              marginBottom: 24,
            }}
          >
            Breathe in the altitude and the mist. Do you feel the stillness? Don't look away. As the gorilla group moves through the bamboo, every moment shifts â€” a glance, a sound, a play-charge that becomes a yawn. Set your attention and hold it.
          </h3>

          {/* Location tag */}
          <div className="flex items-center gap-3 mt-8">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "var(--ochre)" }}
            />
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--warm-grey)",
              }}
            >
              1Â°30â€²S 29Â°38â€²E Â· Musanze, Northern Province, Rwanda
            </p>
          </div>

          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(16px,1.3vw,18px)",
              fontWeight: 300,
              color: "rgba(14,16,15,0.4)",
              lineHeight: 1.8,
              marginTop: 28,
            }}
          >
            Easy reach of the park that belongs, in some sense, to all of us. A landscape of velvet green that belongs only to those willing to climb for it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

