import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAWA â€” Studio of African Wildlife Art",
  description: "Original hand-drawn wildlife art from Musanze, Rwanda. Mountain gorillas, elephants, big cats â€” documented in graphite and charcoal by three artists living beside the Virungas.",
  openGraph: {
    title: "SAWA â€” Studio of African Wildlife Art",
    description: "Original hand-drawn wildlife art from Musanze, Rwanda.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

