"use client";
import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations/variants'
import { DestinationGrid } from '@/components/destination/DestinationGrid'
import { destinations } from '@/data/destinations'

export default function Offres() {
  // Sélection d'offres promotionnelles à partir des destinations existantes
  const offers = destinations.slice(0, 3).map(d => ({
    ...d,
    badge: 'Offre Spéciale',
    badgeColor: '#D21034',
    originalPrice: d.price + 50000, // Just for display logic if we wanted, but we'll stick to badge
  }))

  return (
    <div className="bg-[var(--color-background)] pt-32 pb-20">
      {/* Hero */}
      <section className="relative py-28 flex items-center justify-center overflow-hidden bg-[#0A0A0F]">
        <img
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[4px] kenburns"
          alt="Offres Exclusives"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="container-custom relative z-10 text-center">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-accent text-sm font-semibold uppercase tracking-widest font-body mb-4"
          >
            Nos Privilèges
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Offres Exclusives
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-white/80 font-body text-lg max-w-xl mx-auto"
          >
            Découvrez nos séjours de rêve à des tarifs exceptionnels. Des expériences uniques, en quantité limitée.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding mt-8">
        <div className="container-custom">
          <div className="mb-12 text-center">
             <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
               Sélections de la semaine
             </h2>
             <p className="mt-4 text-[var(--color-text-primary)]/70 font-body text-lg max-w-2xl mx-auto">
               Nos experts ont négocié pour vous ces tarifs avantageux. Réservez vite avant l'épuisement des places.
             </p>
          </div>
          
          <DestinationGrid destinations={offers} />
        </div>
      </section>
    </div>
  )
}
