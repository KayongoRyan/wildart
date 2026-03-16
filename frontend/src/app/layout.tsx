import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { LanguageProvider } from "@/context/LanguageContext";
import { CurrencyProvider } from "@/context/CurrencyContext";

export const metadata: Metadata = {
  title: "SAWA — Studio of African Wildlife Art",
  description: "Original hand-drawn wildlife art from Musanze, Rwanda. Mountain gorillas, elephants, big cats — documented in graphite and charcoal by three artists living beside the Virungas.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="relative">
        <LanguageProvider>
          <CurrencyProvider>
            <Nav />
            {children}
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
