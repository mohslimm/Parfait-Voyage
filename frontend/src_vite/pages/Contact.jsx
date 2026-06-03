import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants'
import { Reveal } from '../components/ui/Reveal'
import { getImg } from '../utils/unsplash'

// ─── Icons ────────────────────────────────────
function LocationIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function SocialIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

// ─── Main Contact Page ────────────────────────
export default function Contact() {
  const [activeFaq, setActiveFaq] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Message envoyé ! Notre équipe vous contactera sous peu.')
  }

  const FAQS = [
    { q: "Quels sont vos délais de réponse ?", a: "Notre équipe de conciergerie s'engage à vous répondre en moins de 2 heures durant les jours ouvrables." },
    { q: "Proposez-vous des facilités de paiement ?", a: "Oui, nous acceptons les paiements via CCP, BaridiMob, ainsi que des règlements échelonnés pour certains forfaits." },
    { q: "Accompagnez-vous pour les demandes de visa ?", a: "Absolument. Nous fournissons une assistance complète : prise de rendez-vous, constitution du dossier et conseils personnalisés." },
  ]

  return (
    <div className="bg-[#FAF7F2] pt-24 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-20 text-center">
        <div className="container-custom">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest font-body mb-3"
          >
            Assistance & Contact
          </motion.p>
          <Reveal>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-[#0A0A0F] mb-6">
              Nous sommes <span className="gradient-text-green">à votre écoute</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <div className="container-custom -mt-24 relative z-20">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* ─── CONTACT INFO ────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1 space-y-6"
          >
            {[
              {
                icon: '📍',
                title: 'Notre Siège',
                content: 'Villa n°03, rue des freres djenadi, Cheraga, Algeria',
                sub: 'Ouvert du Dimanche au Jeudi, 9h-18h',
              },
              {
                icon: '📞',
                title: 'Téléphone',
                content: '+213 541 055 201',
                sub: 'Assistance 24/7 pour les urgences',
              },
              {
                icon: <MailIcon />,
                title: 'Email',
                content: 'alibivoyage@outlook.com',
                sub: 'Réponse sous 2h ouvrées',
              },
              {
                icon: '📱',
                title: 'Réseaux Sociaux',
                content: '@alibi_voyage_dz',
                sub: 'Instagram, Facebook, LinkedIn',
              },
            ].map((info, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl shadow-black/5 border border-white flex flex-col justify-between h-[180px] group hover:border-[#006233]/20 transition-all duration-500"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#006233]/5 text-[#006233] flex items-center justify-center group-hover:bg-[#006233] group-hover:text-white transition-all duration-300">
                    {info.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-bold text-white uppercase tracking-widest ${info.color}`}>
                    {info.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#0A0A0F] mb-1">{info.title}</h3>
                  <p className="font-body text-[#0A0A0F]/60 text-sm">{info.content}</p>
                </div>
              </motion.div>
            ))}

            {/* Social card */}
            <motion.div
              variants={staggerItem}
              className="bg-gradient-to-br from-[#006233] to-[#004d27] p-8 rounded-[2.5rem] text-white"
            >
              <h3 className="font-display text-xl font-bold mb-4">Suivez-nous</h3>
              <div className="flex gap-4">
                {['fb', 'ig', 'li'].map(s => (
                  <div key={s} className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#006233] transition-all cursor-pointer capitalize font-bold text-xs">
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ─── CONTACT FORM ────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white p-12 md:p-20 rounded-[3.5rem] shadow-2xl shadow-black/5 border border-black/5"
          >
            <h2 className="font-display text-3xl font-bold text-[#0A0A0F] mb-8">
              Envoyez-nous un message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#0A0A0F]/70 mb-2 font-body">Nom complet</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 bg-[#FAF7F2] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-primary transition-all font-body"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-[#0A0A0F]/40 uppercase tracking-[0.2em] ml-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-5 py-4 bg-[#FAF7F2] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-primary transition-all font-body"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-[#0A0A0F]/40 uppercase tracking-[0.2em] ml-1">Téléphone</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-5 py-4 bg-[#FAF7F2] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-primary transition-all font-body"
                    placeholder="+213 --- -- -- --"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0A0A0F]/70 mb-2 font-body">Sujet</label>
                  <select className="w-full px-5 py-4 bg-[#FAF7F2] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-primary transition-all font-body appearance-none">
                    <option>Demande de devis</option>
                    <option>Assistance réservation</option>
                    <option>Partenariat</option>
                    <option>Autre</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[#0A0A0F]/40 uppercase tracking-[0.2em] ml-1">Votre message</label>
                <textarea
                  required
                  rows="5"
                  className="w-full px-5 py-4 bg-[#FAF7F2] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-primary transition-all font-body resize-none"
                  placeholder="Comment pouvons-nous vous aider ?"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-5 bg-primary text-white rounded-2xl font-bold font-body text-lg hover:bg-primary-dark transition-all shadow-premium"
              >
                <div className="absolute inset-0 bg-[#006233] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-4">
                  Envoyer mon message
                  <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ─── FAQ SECTION ─────────────────── */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold text-[#0A0A0F]">Questions fréquentes</h2>
            </div>
            
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white rounded-3xl border border-black/5 overflow-hidden">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full p-8 flex items-center justify-between text-left"
                  >
                    <span className="font-display text-lg font-bold text-[#0A0A0F]">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4 text-[#006233]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 9l-7 7-7-7" strokeWidth={2} /></svg>
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-8 pb-8"
                      >
                        <p className="text-[#0A0A0F]/60 font-body leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section — Premium Look */}
      <section className="container-custom mb-20">
        <div className="relative h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12792.420658414436!2d3.0294!3d36.7441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb2f768406795%3A0x600f68e0d37e5e!2sHydra%2C%20Algiers!5e0!3m2!1sen!2sdz!4v1650000000000!5m2!1sen!2sdz"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.5) contrast(1.1)' }}
            allowFullScreen=""
            loading="lazy"
            className="group-hover:grayscale-0 transition-all duration-1000"
          ></iframe>
          <div className="absolute top-10 left-10 p-6 bg-white/90 backdrop-blur-md rounded-[2rem] shadow-xl border border-white">
            <p className="font-display font-bold text-[#0A0A0F]">Parfait Voyages Conciergerie</p>
            <p className="text-xs text-[#0A0A0F]/50">Hydra, Alger • Algérie</p>
          </div>
        </div>
      </section>
    </div>
  )
}
