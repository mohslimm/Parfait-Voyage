"use client";
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Mail, Phone, Ticket, Printer, ArrowLeft, LayoutDashboard } from 'lucide-react'

import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { fadeInUp, staggerContainer, staggerItem } from '@/animations/variants'
import { getImg } from '@/utils/unsplash'

// ─── Animated SVG Checkmark ───────────────────
function AnimatedCheck() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20 md:w-24 md:h-24">
      {/* Circle */}
      <motion.circle
        cx="40" cy="40" r="36"
        stroke="currentColor"
        className="text-accent"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      {/* Checkmark */}
      <motion.path
        d="M24 40l10 10 22-22"
        stroke="currentColor"
        className="text-accent"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.7 }}
      />
    </svg>
  )
}

export default function Confirmation() {
  const params = useSearchParams()
  const ref  = params.get('ref')  || 'PV-2026-0000'
  const dest = params.get('dest') || 'votre destination'
  const confettiLaunched = useRef(false)

  useEffect(() => {
    if (confettiLaunched.current) return
    confettiLaunched.current = true

    const timer = setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.4 },
        colors: ['#10356C', '#C09F62', '#061E3F', '#FFFFFF'],
        scalar: 1.2,
      })
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Premium Hero Section */}
      <div className="relative pt-32 pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="flex justify-center mb-8"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center backdrop-blur-sm shadow-[0_0_40px_rgba(192,159,98,0.15)]">
                <AnimatedCheck />
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Réservation Confirmée
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="text-white/70 font-body text-lg md:text-xl font-light"
            >
              Félicitations. Votre voyage vers <span className="text-accent font-medium">{dest}</span> est officiellement réservé.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom -mt-12 relative z-20">
        <div className="max-w-3xl mx-auto">
          
          {/* Ticket / Reservation Reference */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-primary/5 overflow-hidden flex flex-col sm:flex-row mb-12"
          >
            <div className="bg-primary/5 p-8 sm:w-1/3 flex flex-col justify-center items-center border-b sm:border-b-0 sm:border-r border-dashed border-primary/20 relative">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background rounded-full hidden sm:block" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background rounded-full hidden sm:block" />
              <p className="text-xs font-body text-text-muted uppercase tracking-[0.2em] mb-2 font-semibold">
                Dossier N°
              </p>
              <p className="font-mono text-2xl font-bold text-primary tracking-tight">
                {ref}
              </p>
            </div>
            <div className="p-8 sm:w-2/3 flex flex-col justify-center">
              <h3 className="font-display text-2xl font-semibold text-text-primary mb-2">Gardez ce numéro précieusement</h3>
              <p className="text-sm text-text-muted font-body leading-relaxed">
                Il vous sera demandé lors de vos échanges avec notre service client et pour accéder au suivi de votre voyage depuis votre espace personnel.
              </p>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-display text-3xl font-semibold text-text-primary mb-8 text-center">
              Les prochaines étapes
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Mail,
                  title: 'Confirmation',
                  desc: 'Un récapitulatif complet vous a été envoyé par email.',
                },
                {
                  icon: Phone,
                  title: 'Conseiller',
                  desc: 'Un expert vous contactera sous 24h pour les détails.',
                },
                {
                  icon: Ticket,
                  title: 'Documents',
                  desc: 'Vos billets vous seront transmis 7 jours avant le départ.',
                },
              ].map((step, i) => (
                <motion.div key={i} variants={staggerItem} className="bg-white p-6 rounded-2xl shadow-sm border border-primary/5 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                    <step.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-semibold text-text-primary font-body mb-2">{step.title}</h4>
                  <p className="text-xs text-text-muted font-body leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden border-t border-primary/10 pt-10"
          >
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-primary/20 text-primary rounded-xl font-medium font-body hover:bg-primary/5 hover:border-primary/30 transition-all w-full sm:w-auto"
            >
              <Printer className="w-4 h-4" />
              Imprimer le reçu
            </button>
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl font-medium font-body hover:bg-primary-light transition-colors shadow-premium w-full sm:w-auto"
            >
              <LayoutDashboard className="w-4 h-4" />
              Mon Espace
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-text-muted hover:text-primary transition-colors font-body font-medium w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Link>
          </motion.div>

          {/* Thank You Note */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
            className="mt-16 text-center space-y-3"
          >
            <p className="text-text-muted text-sm font-body font-medium">
              L'équipe de <span className="font-display font-bold text-primary text-lg ml-1">Parfait Voyage</span> vous remercie pour votre confiance.
            </p>
            <p className="text-text-muted/50 text-xs font-arabic tracking-wider">
              شكراً لثقتكم في رحلات مثالية
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
