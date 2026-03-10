"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function S2Intro() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="py-28 lg:py-40 px-8"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-[1480px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">

          {/* Left â€” label stack */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ochre)",
                marginBottom: 12,
              }}
            >
              The Studio
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                width: 40,
                height: 1,
                backgroundColor: "var(--ochre)",
                transformOrigin: "left",
              }}
            />
          </div>

          {/* Right â€” large editorial text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px,3.5vw,50px)",
                fontWeight: 300,
                lineHeight: 1.25,
                color: "var(--ink)",
                marginBottom: 32,
              }}
            >
              Open the studio door<br />and step into the wild
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15 }}
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(17px,1.6vw,22px)",
                fontWeight: 300,
                color: "rgba(14,16,15,0.55)",
                lineHeight: 1.8,
                maxWidth: 620,
                marginBottom: 24,
              }}
            >
              A place apart from the world, where the silence of dawn in the bamboo zone speaks louder than any city. Here, in Musanze, Rwanda â€” three artists press graphite and charcoal to paper and pull the living forest onto the page.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.25 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(16px,1.4vw,19px)",
                fontWeight: 300,
                color: "rgba(14,16,15,0.45)",
                lineHeight: 1.8,
                maxWidth: 620,
              }}
            >
              SAWA draws the wild not from photographs, but from what we see at dawn â€” the silverback's exhale in cold mountain air, the matriarch's tracks still wet beside the watering hole. Every line is earned in the field.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

