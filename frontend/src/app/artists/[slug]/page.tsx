"use client";
import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { artists, getArtistBySlug } from "@/lib/artists";
import { works } from "@/lib/works";
import { useCurrency } from "@/context/CurrencyContext";

export default function ArtistProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const artist = getArtistBySlug(slug);
  const { formatPrice } = useCurrency();

  if (!artist) notFound();

  const artistWorks = works.filter((w) => w.artist === artist.name && w.available);

  return (
    <main className="pt-[72px]" style={{ background: "var(--cream)" }}>
      {/* Hero */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-24"
        style={{
          background: artist.bg,
          minHeight: "min(70vh, 560px)",
        }}
      >
        <div className="order-2 md:order-1">
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>
            Featured Artist
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,64px)", fontWeight: 300, color: "var(--cream)", lineHeight: 1.05, marginBottom: 12 }}>
            {artist.name}
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ochre)", marginBottom: 24 }}>
            {artist.role} · Since {artist.since}
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 32 }}>
            {artist.medium}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {artist.specialty.map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "6px 12px",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center relative order-1 md:order-2 py-8 md:py-0">
          <span style={{ fontSize: "clamp(120px,20vw,280px)", opacity: 0.18 }}>{artist.emoji}</span>
        </div>
      </section>

      {/* Bio */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20" style={{ maxWidth: 800, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "rgba(14,16,15,0.7)", lineHeight: 1.9, marginBottom: 40 }}>
          {artist.bio}
        </p>
        <blockquote style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22, fontWeight: 300, color: "var(--ink)", lineHeight: 1.6, borderLeft: "3px solid var(--ochre)", paddingLeft: 24, margin: 0 }}>
          &ldquo;{artist.quote}&rdquo;
        </blockquote>
      </section>

      {/* Works by this artist */}
      {artistWorks.length > 0 && (
        <section className="px-4 sm:px-6 md:px-8 lg:px-16 pb-16 sm:pb-20 md:pb-24" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 24 }}>
            Works by {artist.name}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 2 }}>
            {artistWorks.map((w) => (
              <Link key={w.id} href={`/shop/${w.id}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "var(--cream-warm)", overflow: "hidden" }} className="group">
                  <div style={{ aspectRatio: "4/5", background: "#1C2A1E", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <span className="group-hover:scale-110 transition-transform duration-700 inline-block" style={{ fontSize: 100, opacity: 0.12 }}>{w.emoji}</span>
                  </div>
                  <div style={{ padding: "18px 20px 22px" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 6 }}>{w.medium} · {w.size}</p>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 300, color: "var(--ink)", marginBottom: 4 }}>{w.kw}</h3>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 300, color: "var(--ink)" }}>{formatPrice(w.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <Link
              href={`/shop?artist=${encodeURIComponent(artist.name)}`}
              style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink)", borderBottom: "1px solid var(--ink)", paddingBottom: 4, textDecoration: "none" }}
              className="hover:!text-[var(--ochre)] hover:!border-[var(--ochre)]"
            >
              View all works →
            </Link>
          </div>
        </section>
      )}

      {/* Other artists */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20" style={{ background: "var(--cream-warm)", borderTop: "1px solid rgba(14,16,15,0.06)" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 32 }}>
          Other artists
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
          {artists.filter((a) => a.slug !== artist.slug).map((a) => (
            <Link key={a.slug} href={`/artists/${a.slug}`} style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 24px", background: "var(--cream)", border: "1px solid rgba(14,16,15,0.08)", transition: "border-color 0.2s" }} className="hover:!border-[var(--ochre)]">
                <span style={{ fontSize: 36, opacity: 0.4 }}>{a.emoji}</span>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 300, color: "var(--ink)", marginBottom: 2 }}>{a.name}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--warm-grey)" }}>{a.role}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20 text-center" style={{ background: "var(--ink)" }}>
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 300, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
          Commission a piece from {artist.name.split(" ")[0]}.
        </p>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/commission" style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", background: "var(--ochre)", color: "#fff", padding: "14px 36px", textDecoration: "none" }} className="hover:!opacity-90">
            Start a Commission
          </Link>
          <Link href="/shop" style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--cream)", borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: 4, textDecoration: "none" }} className="hover:!text-[var(--ochre)] hover:!border-[var(--ochre)]">
            Browse the Shop
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
