import type { Metadata } from "next";
import "./globals.css";
import { NavbarWrapper } from "@/components/layout/NavbarWrapper";
import { FooterWrapper } from "@/components/layout/FooterWrapper";
import { MainWrapper } from "@/components/layout/MainWrapper";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BackToTop } from "@/components/ui/BackToTop";

import { ClientToaster } from '@/components/ui/ClientToaster';
import { Suspense } from 'react';

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
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen relative" suppressHydrationWarning>
        <ClientToaster position="top-right" richColors toastOptions={{
          style: { fontFamily: 'var(--font-outfit)', borderRadius: '12px' }
        }} />
        <CustomCursor />
        <WhatsAppButton />
        <BackToTop />
        <Suspense fallback={null}>
          <NavbarWrapper />
        </Suspense>
        <MainWrapper>{children}</MainWrapper>
        <FooterWrapper />
      </body>
    </html>
  );
}
