export default function DonationLoading() {
  return (
    <main style={{ paddingTop: 72, background: "var(--cream)", minHeight: "100vh" }}>
      {/* Hero skeleton */}
      <div style={{ padding: "80px clamp(24px,6vw,80px) 60px", maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <div style={{ height: 12, width: 140, background: "rgba(14,16,15,0.08)", margin: "0 auto 16px", borderRadius: 2 }} />
        <div style={{ height: 48, width: 320, maxWidth: "90%", background: "rgba(14,16,15,0.1)", margin: "0 auto 12px", borderRadius: 2 }} />
        <div style={{ height: 48, width: 280, maxWidth: "85%", background: "rgba(14,16,15,0.08)", margin: "0 auto 24px", borderRadius: 2 }} />
        <div style={{ height: 16, width: 480, maxWidth: "95%", background: "rgba(14,16,15,0.06)", margin: "0 auto", borderRadius: 2 }} />
      </div>

      {/* Tiers skeleton */}
      <div style={{ padding: "0 clamp(24px,6vw,80px) 60px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ background: "var(--cream-warm)", padding: 32, borderRadius: 2, textAlign: "center" }}>
              <div style={{ height: 40, width: 40, background: "rgba(14,16,15,0.08)", margin: "0 auto 16px", borderRadius: 4 }} />
              <div style={{ height: 24, width: 60, background: "rgba(14,16,15,0.1)", margin: "0 auto 8px", borderRadius: 2 }} />
              <div style={{ height: 12, width: "90%", background: "rgba(14,16,15,0.06)", margin: "0 auto", borderRadius: 2 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Form skeleton */}
      <div style={{ padding: "40px clamp(24px,6vw,80px) 80px", maxWidth: 600, margin: "0 auto" }}>
        <div style={{ height: 10, width: 100, background: "rgba(14,16,15,0.08)", marginBottom: 24, borderRadius: 2 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ height: 48, background: "rgba(14,16,15,0.06)", borderRadius: 2 }} />
          ))}
        </div>
        <div style={{ height: 52, width: 120, background: "rgba(14,16,15,0.1)", marginTop: 32, borderRadius: 2 }} />
      </div>
    </main>
  );
}
