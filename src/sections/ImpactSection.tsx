"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ImpactSection() {
    return (
        <section
            className="relative w-full py-32"
            style={{ backgroundColor: "#ffffff" }}
        >
            {/* Full-width heading */}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "8.8vw",
                    fontWeight: 700,
                    color: "var(--ink)",
                    textTransform: "uppercase",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    marginBottom: "3rem",
                    whiteSpace: "nowrap",
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                }}
            >
                Why Choose Wildlife
            </motion.h2>

            <div className="max-w-[1480px] mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

                    {/* Left: Two side-by-side images */}
                    <motion.div
                        className="grid grid-cols-2 gap-3"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
                            <img
                                src="https://res.cloudinary.com/duchitv8b/image/upload/f_auto,q_auto/zuigwzkd4t1xvjcccsi7"
                                alt="Artists at work"
                                className="w-full h-full object-cover grayscale"
                            />
                        </div>
                        <div className="w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
                            <img
                                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2445&auto=format&fit=crop"
                                alt="Wildlife artwork detail"
                                className="w-full h-full object-cover grayscale"
                            />
                        </div>
                    </motion.div>

                    {/* Right: Text */}
                    <motion.div
                        className="flex flex-col justify-start"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    >
                        {/* Body copy — paragraph 1 */}
                        <p
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                                fontWeight: 400,
                                lineHeight: 1.75,
                                color: "var(--ink)",
                                marginBottom: 24,
                            }}
                        >
                            Working with wildlife is a true creative partnership. The animals
                            understand nothing of art, and yet they are the most demanding
                            subjects imaginable — unpredictable, alive, indifferent to the
                            artist&apos;s schedule. That tension is what makes every work
                            meaningful.
                        </p>

                        {/* Body copy — paragraph 2 */}
                        <p
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                                fontWeight: 400,
                                lineHeight: 1.75,
                                color: "var(--ink)",
                                marginBottom: 48,
                            }}
                        >
                            These observations allow us to document what each species needs at
                            every moment in the wild. We stay close to the animals — from
                            early-morning habituation walks to hours of stillness at the
                            waterhole — because great art begins with presence and is built
                            through patience.
                        </p>

                        {/* CTA link */}
                        <Link
                            href="/conservation"
                            className="group inline-flex items-center gap-1"
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: 15,
                                fontWeight: 400,
                                color: "var(--ink)",
                                textDecoration: "none",
                                transition: "color 0.2s",
                            }}
                        >
                            More about our conservation work
                            <span
                                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                            >
                                →
                            </span>
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
