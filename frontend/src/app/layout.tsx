import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BackToTop } from "@/components/ui/BackToTop";

import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Parfait Voyages — Votre complice pour des voyages inoubliables",
  description: "Découvrez nos circuits organisés vers Istanbul, Zanzibar, Malaisie, Bali et Dubaï au départ de l'Algérie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen relative">
        <Toaster position="top-right" richColors toastOptions={{
          style: { fontFamily: 'var(--font-outfit)', borderRadius: '12px' }
        }} />
        <CustomCursor />
        <WhatsAppButton />
        <BackToTop />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
