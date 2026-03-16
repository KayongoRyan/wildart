"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const WORKS = [
  {
    id: 1,
    title: "Midnight Serenade",
    client: "Vogue Africa",
    image: "https://images.unsplash.com/photo-1713263706477-7cf96c5aa537",
  },
  {
    id: 2,
    title: "Golden Hour Shadows",
    client: "MoMA",
    image: "https://res.cloudinary.com/duchitv8b/image/upload/v1746096991/art-platform/xd0kwkiyod3ibn3qtsee.jpg",
  },
  {
    id: 3,
    title: "Urban Pulse",
    client: "Spotify Studios",
    image: "https://images.unsplash.com/photo-1713263706477-7cf96c5aa537",
  },
];

function WorkItem({ work }: { work: (typeof WORKS)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div
      ref={ref}
      className="relative h-[80vh] md:h-[100svh] w-full overflow-hidden flex items-center justify-center"
    >
      {/* Parallax image */}
      <motion.div
        className="absolute inset-x-0 h-[130%] z-0"
        style={{ top: "-15%", y }}
      >
        <img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Subtle mid-overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Strong gradient at bottom so text is always readable */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-40"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
        }}
      />

      {/* Labels row */}
      <div className="absolute bottom-8 left-8 right-8 z-30 flex justify-between items-end text-[10px] sm:text-xs tracking-[0.1em] uppercase text-white">
        {/* Left: Art piece */}
        <div className="text-left flex flex-col gap-1">
          <span className="text-[9px] sm:text-[10px]" style={{ opacity: 0.65 }}>
            Art Piece
          </span>
          <span style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)", fontWeight: 500 }}>
            {work.title}
          </span>
        </div>

        {/* Right: Client */}
        <div className="text-right flex flex-col gap-1">
          <span className="text-[9px] sm:text-[10px]" style={{ opacity: 0.65 }}>
            Client
          </span>
          <span style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)", fontWeight: 500 }}>
            {work.client}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  return (
    <section className="bg-[#042D29] text-[var(--cream-warm)] flex flex-col items-center">
      <div className="w-full py-8 flex justify-center items-center relative z-10 bg-[#042D29]">
        <span className="text-[10px] md:text-xs tracking-[0.2em] font-sans uppercase">
          Welcome to Africa's best worldlife and contemporary art studio
        </span>
        <div className="absolute bottom-[-4px] w-1 h-1 rounded-full bg-white opacity-50 z-20" />
      </div>

      <div className="w-full flex flex-col">
        {WORKS.map((work) => (
          <WorkItem key={work.id} work={work} />
        ))}
      </div>
    </section>
  );
}
