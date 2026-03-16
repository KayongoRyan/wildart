<<<<<<< HEAD:src/app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
=======
import type { Metadata, Viewport } from "next";
>>>>>>> origin/master:frontend/src/app/layout.tsx
import "./globals.css";
import Nav from "@/components/Nav";
import { LanguageProvider } from "@/context/LanguageContext";
import { CurrencyProvider } from "@/context/CurrencyContext";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-poppins",
    display: "swap",
});

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
<<<<<<< HEAD:src/app/layout.tsx
        <html lang="en" className={poppins.variable}>
            <body className={poppins.className}>
=======
    <html lang="en" data-scroll-behavior="smooth">
                    <body className="relative">
>>>>>>> origin/master:frontend/src/app/layout.tsx
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
