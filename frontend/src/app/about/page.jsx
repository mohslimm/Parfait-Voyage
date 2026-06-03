"use client";
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem } from '@/animations/variants'
import { Eye, Gem, HeartHandshake, Clock, Shield, Map } from 'lucide-react'
import Link from 'next/link'
import { WaveDivider } from '@/components/ui/WaveDivider'

export default function About() {
  return (
    <div className="bg-[#FAF7F2] pt-32">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#0A0A0F]">
        <img
          src="/istanbul.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[4px] kenburns"
          alt="Notre Histoire"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="container-custom relative z-10 text-center">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest font-body mb-4"
          >
            Qui sommes-nous ?
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Notre Passion,<br />Votre Destination.
          </motion.h1>
        </div>
      </section>

      {/* Intro Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest font-body mb-4">Notre histoire</p>
              <h2 className="font-display text-4xl font-bold text-[#0A0A0F] mb-6">
                Une vision née à Alger,<br />pour explorer le monde.
              </h2>
              <div className="space-y-4 text-[#0A0A0F]/70 font-body text-lg leading-relaxed">
                <p>
                  Fondée en 2012, <span className="font-semibold text-primary">Parfait Voyage</span> est née d'une volonté simple : offrir aux voyageurs algériens une expérience de voyage premium, sans compromis sur la qualité et la transparence.
                </p>
                <p>
                  Nous ne sommes pas juste une agence de voyage. Nous sommes des architectes d'expériences. De la Casbah d'Alger aux gratte-ciels de Dubaï, des plages de Turquie aux temples de Bali, nous sélectionnons chaque destination avec une attention méticuleuse.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 mt-10 pt-10 border-t border-[#0A0A0F]/10">
                <div>
                  <p className="font-display text-4xl font-bold text-primary">12+</p>
                  <p className="text-sm font-body text-[#0A0A0F]/50 mt-1">Années d'excellence</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-primary">50k+</p>
                  <p className="text-sm font-body text-[#0A0A0F]/50 mt-1">Rêves réalisés</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative lg:ml-8"
            >
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-premium">
                <img
                  src="/zanzibar.jpg"
                  className="w-full h-full object-cover"
                  alt="L'équipe Parfait Voyage"
                />
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
              </div>
              {/* Floating quote card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-premium max-w-[260px] hidden sm:block border border-[#E8E2D9]/50"
              >
                <div className="text-[#C9A96E] text-3xl font-display mb-2">"</div>
                <p className="font-body text-[#0A0A0F]/70 text-sm italic leading-relaxed">
                  Rendre le monde accessible à chaque algérien, avec le confort qu'il mérite.
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#a8834a] flex items-center justify-center text-white text-xs font-bold">DG</div>
                  <p className="font-display font-bold text-[#0A0A0F] text-sm">Directeur Général</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Values — Bento */}
      <section className="section-padding bg-[#FAF7F2]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest font-body mb-3">
              Nos Valeurs
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A0A0F]">
              L'ADN de Parfait Voyage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">
            {/* Large card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-primary rounded-3xl p-8 md:row-span-2 flex flex-col justify-between relative overflow-hidden border border-white/10 group"
            >
              <img src="/istanbul.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.15] transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] pointer-events-none z-0" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/10 text-[#C9A96E] group-hover:scale-110 transition-transform duration-500">
                  <Shield className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white mb-3">Transparence totale</h3>
                  <p className="text-sm font-body text-white/70 leading-relaxed">Des prix clairs en Dinars Algériens, sans frais cachés ni mauvaises surprises au moment du départ.</p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.08, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden border border-primary/10 group"
            >
              <img src="/dubai.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.08] transition-transform duration-700 group-hover:scale-105" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/5 text-primary group-hover:scale-110 transition-transform duration-500">
                  <Gem className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-primary mb-3">Excellence</h3>
                  <p className="text-sm font-body text-primary/60 leading-relaxed">Hébergements 4★ et 5★, guides experts, vols réguliers — nous ne transigeons jamais sur le confort.</p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.16, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-[#FAF7F2] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden border border-primary/5 group"
            >
              <img src="/zanzibar.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12] transition-transform duration-700 group-hover:scale-105" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/5 text-primary group-hover:scale-110 transition-transform duration-500">
                  <HeartHandshake className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-primary mb-3">Proximité</h3>
                  <p className="text-sm font-body text-primary/60 leading-relaxed">Que vous soyez à Alger, Oran ou Constantine, nos conseillers sont à votre écoute 24h/24 et 7j/7.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action — image banner */}
      <section className="relative py-28 overflow-hidden bg-[#FAF7F2]">
        <img src="/maldives.jpg" className="absolute inset-0 w-full h-full object-cover opacity-[0.12] blur-sm mix-blend-multiply" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent" />
        <div className="container-custom text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest font-body mb-3"
          >
            Rejoignez-nous
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-[#0A0A0F] mb-6"
          >
            Rejoignez l'aventure
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#0A0A0F]/60 font-body text-lg mb-10 max-w-lg mx-auto"
          >
            Découvrez pourquoi des milliers d'algériens nous choisissent pour leurs moments les plus précieux.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-2xl font-bold font-body text-lg hover:bg-accent-light transition-colors shadow-gold"
            >
              Explorer nos offres
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary/20 text-primary rounded-2xl font-semibold font-body text-lg hover:bg-primary/5 transition-colors"
            >
              Nous contacter
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
