export default function CareerLoading() {
  return (
    <main style={{ paddingTop: 72, background: "var(--cream)", minHeight: "100vh" }}>
      <div style={{ padding: "80px clamp(24px,6vw,80px) 60px", maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <div style={{ height: 12, width: 100, background: "rgba(14,16,15,0.08)", margin: "0 auto 16px", borderRadius: 2 }} />
        <div style={{ height: 40, width: 280, maxWidth: "90%", background: "rgba(14,16,15,0.1)", margin: "0 auto 12px", borderRadius: 2 }} />
        <div style={{ height: 48, width: 48, background: "rgba(14,16,15,0.06)", margin: "0 auto", borderRadius: 4 }} />
      </div>
      <div style={{ padding: "40px clamp(24px,6vw,80px) 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {[1, 2].map((i) => (
            <div key={i} style={{ background: "var(--cream-warm)", padding: 40, borderRadius: 2 }}>
              <div style={{ height: 40, width: 40, background: "rgba(14,16,15,0.08)", marginBottom: 20, borderRadius: 4 }} />
              <div style={{ height: 24, width: "60%", background: "rgba(14,16,15,0.1)", marginBottom: 16, borderRadius: 2 }} />
              <div style={{ height: 12, width: "100%", background: "rgba(14,16,15,0.06)", marginBottom: 8, borderRadius: 2 }} />
              <div style={{ height: 12, width: "95%", background: "rgba(14,16,15,0.06)", marginBottom: 8, borderRadius: 2 }} />
              <div style={{ height: 12, width: "80%", background: "rgba(14,16,15,0.06)", marginBottom: 24, borderRadius: 2 }} />
              <div style={{ height: 44, width: 160, background: "rgba(14,16,15,0.1)", borderRadius: 2 }} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
