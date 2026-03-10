import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "SAWA — Studio of African Wildlife Art",
  description: "Original hand-drawn wildlife art from Musanze, Rwanda. Mountain gorillas, elephants, big cats — documented in graphite and charcoal by three artists living beside the Virungas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Nav />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
