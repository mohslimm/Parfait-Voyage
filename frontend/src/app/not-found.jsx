"use client";
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold text-primary mb-4">404</h1>
        <p className="text-xl font-body text-[#0A0A0F]/70 mb-8">Page introuvable</p>
        <Link href="/" className="px-6 py-3 bg-primary text-white rounded-xl font-body hover:bg-primary-light transition-colors">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
