import { motion } from 'framer-motion'
import { Reveal } from '../components/ui/Reveal'
import { WaveDivider } from '../components/ui/WaveDivider'
import { destinations } from '../data/destinations'
import { Link } from 'react-router-dom'
import { getImg } from '../utils/unsplash'

export default function Offers() {
  const promoOffers = destinations.filter(d => d.popular).slice(0, 4)

  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-20">
      {/* ─── HERO ─────────────────────────────── */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#0A0A0F]">
        <div className="absolute inset-0">
          <img 
            src={getImg('luxury,resort,ocean', 1600, 900)} 
            className="w-full h-full object-cover opacity-40 kenburns"
            alt="Offres Spéciales"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0F]" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#C9A96E] text-xs font-bold uppercase tracking-[0.4em] mb-4"
          >
            Saisissez l'instant
          </motion.p>
          <Reveal>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
              Nos Offres <span className="gradient-text-gold">Exclusives</span>
            </h1>
          </Reveal>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/60 font-body max-w-2xl mx-auto text-lg"
          >
            Découvrez nos sélections de voyages haut de gamme à des tarifs préférentiels. 
            Vols, transferts et hôtels 5 étoiles inclus.
          </motion.p>
        </div>
      </section>

      <WaveDivider color="#FAF7F2" />

      {/* ─── OFFERS GRID ──────────────────────── */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {promoOffers.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-black/5 flex flex-col md:flex-row h-full border border-black/5"
              >
                {/* Image Section */}
                <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                  <img 
                    src={offer.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={offer.title}
                  />
                  <div className="absolute top-4 left-4 bg-[#D21034] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    -20% Promo
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[#006233] text-[10px] font-bold uppercase tracking-widest mb-2">
                      {offer.category} • {offer.duration}
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0A0A0F] mb-4 group-hover:text-[#006233] transition-colors">
                      {offer.title}
                    </h2>
                    <p className="text-[#0A0A0F]/60 text-sm font-body leading-relaxed mb-6">
                      Profitez d'un séjour exceptionnel incluant le vol direct depuis Alger, l'hébergement en demi-pension et les transferts VIP.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-black/5">
                    <div>
                      <p className="text-[#0A0A0F]/40 text-xs font-body line-through">
                        {offer.price * 1.25} DZD
                      </p>
                      <p className="text-[#006233] text-xl font-bold">
                        {offer.price} <span className="text-xs font-normal">DZD / pers</span>
                      </p>
                    </div>
                    <Link
                      to={`/destinations/${offer.id}`}
                      className="w-12 h-12 rounded-full bg-[#0A0A0F] text-white flex items-center justify-center group-hover:bg-[#006233] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LAST MINUTE BANNER ───────────────── */}
      <section className="container-custom mb-20">
        <div className="bg-[#006233] rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 grid md:grid-cols-2 items-center gap-12">
            <div>
              <span className="inline-block px-4 py-1 bg-white/10 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-6">
                Ventes Flash
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Offres de Dernière Minute
              </h2>
              <p className="text-white/70 font-body text-lg mb-8">
                Partez dans moins de 7 jours et profitez de réductions allant jusqu'à <span className="text-white font-bold">-40%</span>.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#006233] rounded-2xl font-bold hover:bg-[#FAF7F2] transition-colors"
              >
                Appeler un conseiller
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={getImg('airplane,luxury,interior', 800, 600)} 
                  className="w-full h-full object-cover"
                  alt="Last Minute"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
