"use client";
import { motion } from 'framer-motion'
import { FilterBar } from '@/components/destination/FilterBar'
import { DestinationGrid } from '@/components/destination/DestinationGrid'
import { useFilters } from '@/hooks/useFilters'
import { clipPathReveal, fadeInUp } from '@/animations/variants'

export default function Destinations() {
  const { filters, updateFilter, resetFilters, filtered } = useFilters()

  return (
    <div className="bg-[#FAF7F2] pt-32">
      {/* Header */}
      <section className="relative py-28 flex items-center justify-center overflow-hidden bg-[#0A0A0F]">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[4px] kenburns"
          alt="Destinations"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-custom relative z-10 text-center">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest font-body mb-3"
          >
            Découvrez le monde
          </motion.p>
          <motion.h1
            variants={clipPathReveal}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Toutes nos Destinations
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="text-white/70 font-body text-lg max-w-lg mx-auto"
          >
            {filtered.length} destinations disponibles — depuis Alger, Oran, Constantine et Annaba.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <div className="container-custom py-12">
        <FilterBar filters={filters} updateFilter={updateFilter} />

        <div className="flex items-center justify-between mb-6">
          <p className="text-[#0A0A0F]/60 text-sm font-body">
            <span className="font-semibold text-[#0A0A0F]">{filtered.length}</span> destinations trouvées
          </p>
          {(filters.category !== 'Tous' || filters.departure !== 'Tous' || filters.search) && (
            <button
              onClick={resetFilters}
              className="text-sm text-[#D21034] hover:text-[#a8001f] font-medium font-body transition-colors"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        <DestinationGrid destinations={filtered} />
      </div>
    </div>
  )
}
