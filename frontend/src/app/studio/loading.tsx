export default function StudioLoading() {
  return (
    <main style={{ paddingTop: 72, minHeight: "100vh" }}>
      {/* Hero skeleton */}
      <div
        style={{
          minHeight: "min(85vh, 720px)",
          background: "linear-gradient(180deg, rgba(92, 122, 94, 0.18) 0%, rgba(92, 122, 94, 0.08) 100%)",
          padding: "clamp(80px, 12vw, 160px) clamp(24px, 6vw, 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ height: 12, width: 180, background: "rgba(14,16,15,0.08)", marginBottom: 20, borderRadius: 2 }} />
        <div style={{ height: 48, width: 320, maxWidth: "90%", background: "rgba(14,16,15,0.1)", marginBottom: 12, borderRadius: 2 }} />
        <div style={{ height: 48, width: 280, maxWidth: "85%", background: "rgba(14,16,15,0.08)", marginBottom: 12, borderRadius: 2 }} />
        <div style={{ height: 48, width: 260, maxWidth: "80%", background: "rgba(14,16,15,0.08)", marginBottom: 28, borderRadius: 2 }} />
        <div style={{ height: 16, width: 400, maxWidth: "95%", background: "rgba(14,16,15,0.06)", borderRadius: 2 }} />
      </div>

      {/* Content skeleton */}
      <div style={{ background: "var(--cream)", padding: "80px clamp(24px,6vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80 }}>
          <div>
            <div style={{ height: 10, width: 80, background: "rgba(14,16,15,0.08)", marginBottom: 16, borderRadius: 2 }} />
            <div style={{ height: 32, width: "90%", background: "rgba(14,16,15,0.1)", borderRadius: 2 }} />
          </div>
          <div>
            <div style={{ height: 14, width: "100%", background: "rgba(14,16,15,0.06)", marginBottom: 12, borderRadius: 2 }} />
            <div style={{ height: 14, width: "95%", background: "rgba(14,16,15,0.06)", marginBottom: 12, borderRadius: 2 }} />
          </div>
        </div>
      </div>

      {/* Artist cards skeleton */}
      <div style={{ background: "var(--ink)", padding: "60px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ height: 10, width: 80, background: "rgba(255,255,255,0.15)", marginBottom: 16, borderRadius: 2 }} />
          <div style={{ height: 40, width: 360, background: "rgba(255,255,255,0.1)", marginBottom: 60, borderRadius: 2 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ minHeight: 320, background: "rgba(0,0,0,0.2)", borderRadius: 2 }} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
