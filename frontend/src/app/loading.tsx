export default function RootLoading() {
  return (
    <main className="flex flex-col w-full">
      {/* Hero skeleton - full screen */}
      <div
        className="fixed top-0 left-0 w-full h-[100svh] z-0 flex items-center justify-center"
        style={{ backgroundColor: "rgba(92, 122, 94, 0.67)" }}
      >
        <div className="max-w-[900px] w-full px-4 text-center">
          <div
            style={{
              height: 32,
              width: "min(90%, 400px)",
              margin: "0 auto",
              background: "rgba(14,16,15,0.15)",
              borderRadius: 4,
            }}
          />
        </div>
      </div>

      {/* Content placeholder */}
      <div className="relative z-20 w-full mt-[100svh] bg-[#042D29] min-h-[60vh]">
        <div className="max-w-[1100px] mx-auto px-6 py-20">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              marginBottom: 60,
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  height: 120,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 4,
                }}
              />
            ))}
          </div>
          <div
            style={{
              height: 200,
              background: "rgba(255,255,255,0.04)",
              borderRadius: 4,
              marginBottom: 60,
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  height: 180,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 4,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
