"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";

type EventItem = {
  id: string;
  title: string;
  dates: string;
  artist: string;
  type: "exhibition" | "workshop" | "open-day";
  videoUrl?: string;
  photos: string[];
  description?: string;
};

const upcomingEvents: EventItem[] = [
  {
    id: "virunga-studies",
    title: "Virunga Studies",
    dates: "January 24 – March 10, 2026",
    artist: "Christine Mukamana",
    type: "exhibition",
    videoUrl: "https://www.youtube.com/embed/2vlC5T3n4dI",
    photos: ["🦍", "🐘", "🦅", "🦁", "🦢", "🐆"],
    description: "A solo exhibition of graphite and charcoal works from the Virunga Massif. Christine's most intimate studies of mountain gorillas and forest life.",
  },
  {
    id: "studio-open-days",
    title: "Studio Open Days",
    dates: "Every Saturday",
    artist: "SAWA Studio",
    type: "open-day",
    photos: ["🦍", "🐘", "🦅"],
    description: "Visit the studio, meet the artists, and watch works in progress. No booking required.",
  },
];

const pastEvents: EventItem[] = [
  {
    id: "akagera-2025",
    title: "Akagera Plains",
    dates: "September – November 2025",
    artist: "Josue Habimana",
    type: "exhibition",
    videoUrl: "https://www.youtube.com/embed/2vlC5T3n4dI",
    photos: ["🐘", "🦛", "🦁", "🐆", "🦅", "🦢"],
    description: "Ink and watercolour studies from Rwanda's savanna park. Elephants, buffalo, and the golden light of the plains.",
  },
  {
    id: "charcoal-workshop-2025",
    title: "Charcoal & Texture Workshop",
    dates: "July 2025",
    artist: "Rigobert Nzeyimana",
    type: "workshop",
    photos: ["🦁", "🐆", "🦅"],
    description: "A three-day intensive on charcoal technique and big-cat portraiture. Limited to 8 participants.",
  },
];

function EventCard({
  event,
  isPast,
  onView,
  t,
}: {
  event: EventItem;
  isPast: boolean;
  onView: () => void;
  t: { viewEvent: string; viewExhibition: string; pastLabel: string; exhibitionLabel: string };
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="group flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 min-h-[280px] sm:min-h-[320px]"
      style={{
        background: "#1A1E1A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", right: 24, bottom: 24, fontSize: 120, opacity: 0.04 }}>🦍</div>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>
        {isPast ? t.pastLabel : t.exhibitionLabel}
      </p>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
        {event.dates}
      </p>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 300, color: "var(--cream)", marginBottom: 12, textAlign: "center", lineHeight: 1.1 }}>
        {event.title}
      </h3>
      <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>
        {event.artist}
      </p>
      <button
        onClick={onView}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          background: "none",
          border: "none",
          borderBottom: "1px solid var(--ochre)",
          color: "var(--ochre)",
          paddingBottom: 4,
          cursor: "pointer",
          transition: "opacity 0.2s",
        }}
        className="hover:opacity-80"
      >
        {event.type === "exhibition" ? t.viewExhibition : t.viewEvent}
      </button>
    </motion.div>
  );
}

function EventDetail({ event, onClose, t }: { event: EventItem; onClose: () => void; t: { photos: string; video: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 sm:p-8 md:p-10 lg:p-12"
      style={{
        background: "var(--cream)",
        borderTop: "1px solid rgba(14,16,15,0.08)",
      }}
    >
      {event.description && (
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--warm-grey)", lineHeight: 1.8, marginBottom: 40, maxWidth: 640 }}>
          {event.description}
        </p>
      )}

      {event.videoUrl && (
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>
            {t.video}
          </p>
          <div style={{ aspectRatio: "16/9", background: "#1A1E1A", borderRadius: 4, overflow: "hidden" }}>
            <iframe
              src={event.videoUrl}
              title={event.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </div>
      )}

      <div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 16 }}>
          {t.photos}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
          {event.photos.map((emoji, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "4/3",
                background: "#1C2A1E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
                opacity: 0.9,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: 32,
          fontFamily: "var(--font-sans)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          background: "none",
          border: "1px solid rgba(14,16,15,0.2)",
          color: "var(--warm-grey)",
          padding: "10px 24px",
          cursor: "pointer",
        }}
        className="hover:opacity-70"
      >
        Close
      </button>
    </motion.div>
  );
}

export default function EventsPage() {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const allEvents = [...upcomingEvents, ...pastEvents];
  const expandedEvent = expandedId ? allEvents.find((e) => e.id === expandedId) : null;

  return (
    <main className="pt-[72px]" style={{ background: "var(--cream)" }}>
      <PageHero
        label="Events"
        headline={<>Exhibitions, workshops,<br />and studio open days.</>}
        subtitle="Join us in Musanze for exhibitions, artist-led workshops, and weekly open studio visits."
        emoji="🦍"
      />

      {/* Upcoming Events */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20" style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ochre)", marginBottom: 40 }}>
          {t.events.upcoming}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {upcomingEvents.map((event) => (
            <div key={event.id}>
              <EventCard
                event={event}
                isPast={false}
                onView={() => setExpandedId(expandedId === event.id ? null : event.id)}
                t={t.events}
              />
              <AnimatePresence>
                {expandedId === event.id && (
                  <EventDetail event={event} onClose={() => setExpandedId(null)} t={t.events} />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-16 pb-12 sm:pb-16 md:pb-24" style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--warm-grey)", marginBottom: 40 }}>
          {t.events.past}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {pastEvents.map((event) => (
            <div key={event.id}>
              <EventCard
                event={event}
                isPast
                onView={() => setExpandedId(expandedId === event.id ? null : event.id)}
                t={t.events}
              />
              <AnimatePresence>
                {expandedId === event.id && (
                  <EventDetail event={event} onClose={() => setExpandedId(null)} t={t.events} />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
