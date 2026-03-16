export default function ConservationLoading() {
  return (
    <main style={{ paddingTop: 72, minHeight: "100vh" }}>
      {/* Hero skeleton */}
      <div style={{ padding: "80px clamp(24px,6vw,80px) 60px", maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <div style={{ height: 12, width: 180, background: "rgba(14,16,15,0.08)", margin: "0 auto 16px", borderRadius: 2 }} />
        <div style={{ height: 48, width: 280, maxWidth: "90%", background: "rgba(14,16,15,0.1)", margin: "0 auto 12px", borderRadius: 2 }} />
        <div style={{ height: 48, width: 260, maxWidth: "85%", background: "rgba(14,16,15,0.08)", margin: "0 auto 12px", borderRadius: 2 }} />
        <div style={{ height: 48, width: 240, maxWidth: "80%", background: "rgba(14,16,15,0.08)", margin: "0 auto 24px", borderRadius: 2 }} />
        <div style={{ height: 16, width: 520, maxWidth: "95%", background: "rgba(14,16,15,0.06)", margin: "0 auto 16px", borderRadius: 2 }} />
        <div style={{ height: 16, width: 480, maxWidth: "90%", background: "rgba(14,16,15,0.05)", margin: "0 auto 32px", borderRadius: 2 }} />
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{ height: 44, width: 180, background: "rgba(14,16,15,0.1)", borderRadius: 2 }} />
          <div style={{ height: 44, width: 140, background: "rgba(14,16,15,0.06)", borderRadius: 2 }} />
        </div>
      </div>

      {/* Stats skeleton */}
      <div style={{ background: "var(--ink)", padding: "80px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 48 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ height: 56, width: 80, background: "rgba(255,255,255,0.1)", margin: "0 auto 12px", borderRadius: 2 }} />
              <div style={{ height: 12, width: 100, background: "rgba(255,255,255,0.08)", margin: "0 auto", borderRadius: 2 }} />
            </div>
          ))}
        </div>
      </div>

      {/* How it works skeleton */}
      <div style={{ background: "var(--cream)", padding: "80px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ height: 10, width: 100, background: "rgba(14,16,15,0.08)", marginBottom: 16, borderRadius: 2 }} />
          <div style={{ height: 40, width: 320, background: "rgba(14,16,15,0.1)", marginBottom: 60, borderRadius: 2 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 48 }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div style={{ height: 40, width: 48, background: "rgba(14,16,15,0.08)", marginBottom: 16, borderRadius: 2 }} />
                <div style={{ height: 24, width: "70%", background: "rgba(14,16,15,0.1)", marginBottom: 12, borderRadius: 2 }} />
                <div style={{ height: 12, width: "100%", background: "rgba(14,16,15,0.06)", marginBottom: 8, borderRadius: 2 }} />
                <div style={{ height: 12, width: "95%", background: "rgba(14,16,15,0.06)", marginBottom: 8, borderRadius: 2 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
