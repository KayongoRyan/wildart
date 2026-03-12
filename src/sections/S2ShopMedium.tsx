"use client";
import Link from "next/link";

const mediums = [
  { id: "wild", href: "/shop", emoji: "🦍", bg: "#1C2A1E" },
  { id: "graphite", href: "/shop?medium=graphite", emoji: "✏️", bg: "#1C2A1E" },
  { id: "charcoal", href: "/shop?medium=charcoal", emoji: "🖤", bg: "#2A2010" },
  { id: "ink", href: "/shop?medium=ink", emoji: "🖋️", bg: "#1A1D1A" },
  { id: "mixed", href: "/shop?medium=mixed", emoji: "🎨", bg: "#2A1E18" },
  { id: "shop", href: "/shop", emoji: "🛒", bg: "#2A1E18" },
];

export default function S2ShopMedium() {
  return (
    <section className="flex flex-col justify-center py-16 lg:py-24" style={{ minHeight: "calc(100vh - 72px)", backgroundColor: "var(--cream)" }}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-3 gap-4 lg:gap-6">
          {mediums.map((m) => (
            <Link key={m.id} href={m.href} className="block group" style={{ textDecoration: "none" }} aria-label={`View ${m.id} in shop`}>
              <div className="relative overflow-hidden flex items-center justify-center cursor-pointer" style={{ aspectRatio: "4/5", minHeight: 200, backgroundColor: m.bg }}>
                <span style={{ fontSize: "clamp(64px, 10vw, 120px)", opacity: 0.15 }} className="block group-hover:opacity-25 transition-opacity">{m.emoji}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
