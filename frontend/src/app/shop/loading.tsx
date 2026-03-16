export default function ShopLoading() {
  return (
    <main style={{ paddingTop: 72, background: "var(--cream)", minHeight: "100vh" }}>
      {/* Hero skeleton */}
      <div style={{ padding: "80px clamp(24px,6vw,80px) 60px", maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <div style={{ height: 12, width: 120, background: "rgba(14,16,15,0.08)", margin: "0 auto 16px", borderRadius: 2 }} />
        <div style={{ height: 36, width: 320, maxWidth: "90%", background: "rgba(14,16,15,0.1)", margin: "0 auto 12px", borderRadius: 2 }} />
        <div style={{ height: 48, width: 48, background: "rgba(14,16,15,0.06)", margin: "0 auto", borderRadius: 4 }} />
      </div>

      {/* Featured skeleton */}
      <div style={{ padding: "0 clamp(24px,6vw,80px) 60px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ height: 10, width: 100, background: "rgba(14,16,15,0.08)", marginBottom: 24, borderRadius: 2 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "var(--ink)", minHeight: 360 }}>
          <div style={{ background: "#1C2A1E", aspectRatio: "4/3" }} />
          <div style={{ padding: 48 }}>
            <div style={{ height: 10, width: 140, background: "rgba(255,255,255,0.15)", marginBottom: 16, borderRadius: 2 }} />
            <div style={{ height: 28, width: "80%", background: "rgba(255,255,255,0.2)", marginBottom: 12, borderRadius: 2 }} />
            <div style={{ height: 12, width: 120, background: "rgba(255,255,255,0.1)", marginBottom: 24, borderRadius: 2 }} />
            <div style={{ height: 12, width: "100%", background: "rgba(255,255,255,0.08)", marginBottom: 8, borderRadius: 2 }} />
            <div style={{ height: 12, width: "90%", background: "rgba(255,255,255,0.08)", marginBottom: 32, borderRadius: 2 }} />
            <div style={{ height: 36, width: 120, background: "rgba(255,255,255,0.15)", borderRadius: 2 }} />
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div style={{ padding: "40px clamp(24px,6vw,80px) 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 0, marginBottom: 48, borderBottom: "1px solid rgba(14,16,15,0.12)" }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ height: 44, width: 120, background: "rgba(14,16,15,0.06)", marginRight: 8, borderRadius: 2 }} />
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} style={{ background: "var(--cream-warm)", overflow: "hidden" }}>
              <div style={{ aspectRatio: "4/5", background: "rgba(14,16,15,0.06)" }} />
              <div style={{ padding: 18 }}>
                <div style={{ height: 8, width: 80, background: "rgba(14,16,15,0.08)", marginBottom: 8, borderRadius: 2 }} />
                <div style={{ height: 18, width: "70%", background: "rgba(14,16,15,0.1)", marginBottom: 8, borderRadius: 2 }} />
                <div style={{ height: 20, width: 60, background: "rgba(14,16,15,0.12)", borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
