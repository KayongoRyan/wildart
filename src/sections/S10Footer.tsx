import Link from "next/link";

export default function S10Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0A0E0A" }}
    >
      {/* Giant watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(180px,26vw,360px)",
            fontWeight: 300,
            color: "rgba(245,240,232,0.018)",
            lineHeight: 1,
            letterSpacing: "0.08em",
          }}
        >
          SAWA
        </span>
      </div>

      {/* Grid */}
      <div
        className="relative z-10 max-w-[1480px] mx-auto px-8 lg:px-16 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        {/* Brand col */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              fontWeight: 300,
              letterSpacing: "0.1em",
              color: "rgba(245,240,232,0.9)",
              marginBottom: 8,
            }}
          >
            SAWA
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ochre)",
              marginBottom: 16,
            }}
          >
            1Â°30â€²S 29Â°38â€²E
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 14,
              color: "rgba(245,240,232,0.3)",
              lineHeight: 1.8,
            }}
          >
            Studio of African Wildlife Art<br />
            Musanze, Northern Province<br />
            Rwanda
          </p>
        </div>

        {/* Explore col */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
              marginBottom: 20,
            }}
          >
            Explore
          </p>
          <ul className="space-y-3">
            {[
              ["Collection",  "#collection"],
              ["The Wild",    "#wild"      ],
              ["The Artists", "#artists"   ],
              ["The Works",   "#works"     ],
              ["The Process", "#process"   ],
            ].map(([l, h]) => (
              <li key={l}>
                <a
                  href={h}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 16,
                    fontWeight: 300,
                    color: "rgba(245,240,232,0.4)",
                    transition: "color 0.3s",
                  }}
                  className="hover:!text-[rgba(245,240,232,0.85)]"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services col */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
              marginBottom: 20,
            }}
          >
            Services
          </p>
          <ul className="space-y-3">
            {[
              ["Commission a Piece", "#"],
              ["Buy Original Works", "#works"],
              ["Tuzivugire Program", "#"],
              ["WhatsApp Studio â†’",  "https://wa.me/250700000000"],
            ].map(([l, h]) => (
              <li key={l}>
                <a
                  href={h}
                  target={h.startsWith("http") ? "_blank" : undefined}
                  rel={h.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 16,
                    fontWeight: 300,
                    color: l.includes("WhatsApp") ? "var(--ochre)" : "rgba(245,240,232,0.4)",
                    transition: "color 0.3s",
                  }}
                  className="hover:!text-[rgba(245,240,232,0.85)]"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kinyarwanda col */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
              marginBottom: 20,
            }}
          >
            In Kinyarwanda
          </p>
          <ul className="space-y-3">
            {["Amahoro", "Intwari", "Ubwiza", "Guhirwa", "Tuzivugire"].map((w) => (
              <li key={w}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 18,
                    fontWeight: 300,
                    color: "var(--ochre)",
                    opacity: 0.7,
                  }}
                >
                  {w}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 max-w-[1480px] mx-auto px-8 lg:px-16 py-5 flex flex-wrap items-center justify-between gap-4">
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.15)",
          }}
        >
          Â© 2025 SAWA Â· Studio of African Wildlife Art
        </p>
        <div className="flex flex-wrap gap-6">
          {["Privacy", "Terms", "Shipping"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.15)",
                transition: "color 0.3s",
              }}
              className="hover:!text-[rgba(255,255,255,0.5)]"
            >
              {l}
            </a>
          ))}
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.15)",
            }}
          >
            Made in ðŸ‡·ðŸ‡¼ Rwanda
          </span>
        </div>
      </div>
    </footer>
  );
}

