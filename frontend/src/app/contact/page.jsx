"use client";
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem } from '@/animations/variants'
import { MapPin, Phone, Mail, AtSign, ChevronDown } from 'lucide-react'
import { toast } from 'sonner'

const CONTACT_INFO = [
  {
    Icon: MapPin,
    title: 'Notre Siège',
    content: 'Villa n°03, rue des freres djenadi, Cheraga, Alger',
    sub: 'Ouvert du Dimanche au Jeudi, 9h–18h',
    iconBg: 'bg-primary/8',
    iconColor: 'text-primary',
  },
  {
    Icon: Phone,
    title: 'Téléphone',
    content: '+213 541 055 201',
    sub: 'Assistance 24/7 pour les urgences',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  {
    Icon: Mail,
    title: 'Email',
    content: 'alibivoyage@outlook.com',
    sub: 'Réponse sous 2h ouvrées',
    iconBg: 'bg-primary/8',
    iconColor: 'text-primary',
  },
  {
    Icon: AtSign,
    title: 'Réseaux Sociaux',
    content: '@alibi_voyage_dz',
    sub: 'Instagram, Facebook, LinkedIn',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
  },
]

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message envoyé !', {
      description: 'Notre équipe vous contactera sous peu.',
    })
    e.target.reset()
  }

  return (
    <div className="bg-[#FAF7F2] pt-32 pb-20">
      {/* Hero banner with image */}
      <section className="relative py-28 flex items-center justify-center overflow-hidden bg-[#0A0A0F]">
        <img
          src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=1600&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[4px] kenburns"
          alt="Contactez-nous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/60 to-transparent" />
        <div className="container-custom relative z-10 text-center">
          <motion.p
            variants={fadeInUp} initial="hidden" animate="visible"
            className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest font-body mb-3"
          >
            Contactez-nous
          </motion.p>
          <motion.h1
            variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Parlons de votre projet
          </motion.h1>
          <motion.p
            variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
            className="text-white/70 font-body text-lg max-w-xl mx-auto"
          >
            Besoin d'un devis sur mesure ou d'une assistance ? Nos conseillers sont à votre disposition.
          </motion.p>
        </div>
      </section>

      <div className="container-custom mt-16">
        <div className="grid lg:grid-cols-3 gap-10 items-start">

          {/* Contact Info */}
          <motion.div
            variants={staggerContainer} initial="hidden" animate="visible"
            className="lg:col-span-1 space-y-4"
          >
            {CONTACT_INFO.map(({ Icon, title, content, sub, iconBg, iconColor }, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-white p-6 rounded-3xl shadow-card border border-[#E8E2D9]/50 group transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBg} ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#0A0A0F] mb-1">{title}</h3>
                    <p className="font-body text-[#0A0A0F] font-semibold text-sm">{content}</p>
                    <p className="text-xs font-body text-[#0A0A0F]/50 mt-0.5">{sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white p-10 rounded-[40px] shadow-premium border border-[#E8E2D9]/30"
          >
            <p className="text-[#C9A96E] text-xs font-semibold uppercase tracking-widest font-body mb-2">Formulaire de contact</p>
            <h2 className="font-display text-3xl font-bold text-[#0A0A0F] mb-8">
              Envoyez-nous un message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A0A0F]/50 font-body">Nom complet</label>
                  <input
                    type="text" required
                    className="w-full px-5 py-4 bg-[#FAF7F2] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all font-body text-[#0A0A0F] placeholder:text-[#0A0A0F]/30 text-sm"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A0A0F]/50 font-body">Email</label>
                  <input
                    type="email" required
                    suppressHydrationWarning
                    className="w-full px-5 py-4 bg-[#FAF7F2] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all font-body text-[#0A0A0F] placeholder:text-[#0A0A0F]/30 text-sm"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A0A0F]/50 font-body">Téléphone</label>
                  <input
                    type="tel" required
                    className="w-full px-5 py-4 bg-[#FAF7F2] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all font-body text-[#0A0A0F] placeholder:text-[#0A0A0F]/30 text-sm"
                    placeholder="+213 --- -- -- --"
                  />
                </div>
                <div className="space-y-1.5 relative">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A0A0F]/50 font-body">Sujet</label>
                  <div className="relative">
                    <select className="w-full px-5 py-4 bg-[#FAF7F2] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all font-body text-[#0A0A0F] text-sm appearance-none cursor-pointer">
                      <option>Demande de devis</option>
                      <option>Assistance réservation</option>
                      <option>Partenariat</option>
                      <option>Autre</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0A0A0F]/40 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A0A0F]/50 font-body">Message</label>
                <textarea
                  required rows="5"
                  className="w-full px-5 py-4 bg-[#FAF7F2] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all font-body text-[#0A0A0F] placeholder:text-[#0A0A0F]/30 text-sm resize-none"
                  placeholder="Comment pouvons-nous vous aider ?"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl font-bold font-body text-base hover:shadow-premium transition-all flex items-center justify-center gap-2"
              >
                Envoyer le message
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Map */}
      <section className="container-custom mt-16">
        <div className="h-[400px] rounded-[40px] overflow-hidden shadow-card border-4 border-white">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12789.702758414436!2d3.0489!3d36.7723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb2f768406795%3A0x600f68e0d37e5e!2sAlgiers%20Centre%2C%20Algiers!5e0!3m2!1sen!2sdz!4v1650000000000!5m2!1sen!2sdz"
            width="100%" height="100%"
            style={{ border: 0 }}
            allowFullScreen="" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  )
}
