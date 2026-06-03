import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Stepper } from '../components/booking/Stepper'
import { BookingSummary } from '../components/booking/BookingSummary'
import { useBookingStore } from '../store/bookingStore'
import { useAuthStore } from '../store/authStore'
import { generateRef } from '../utils/generateRef'
import { fadeInUp, staggerContainer } from '../animations/variants'
import { Reveal } from '../components/ui/Reveal'
import { getImg } from '../utils/unsplash'

export default function Reservation() {
  const navigate = useNavigate()
  const store = useBookingStore()
  const addBooking = useAuthStore((s) => s.addBooking)

  const handleComplete = () => {
    const ref = generateRef()
    const destination = store.destination

    if (destination) {
      const basePrice = destination.price * (store.adults + store.children * 0.5)
      const extrasTotal = store.selectedExtras.reduce((acc, id) => {
        const found = store.extras.find((e) => e.id === id)
        return acc + (found ? found.price : 0)
      }, 0)

      addBooking({
        ref,
        destination: destination.name,
        country: destination.country,
        status: 'confirmé',
        departure: store.departureDate || 'À définir',
        returnDate: store.returnDate || 'À définir',
        travelers: store.adults + store.children,
        totalPrice: basePrice + extrasTotal,
        airline: destination.airline,
        departureCity: store.departureCity,
        createdAt: new Date().toISOString().split('T')[0],
      })
    }

    store.reset()
    navigate(`/confirmation?ref=${ref}&dest=${encodeURIComponent(destination?.name || '')}`)
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen relative overflow-hidden">
      {/* ─── BACKGROUND ATMOSPHERE (Changed fixed to absolute) ────────── */}
      <div className="absolute inset-0 z-0">
        <img 
          src={getImg('luxury,travel,resort', 1920, 1080)} 
          className="w-full h-full object-cover opacity-10 blur-xl scale-110"
          alt="bg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/50 to-[#FAF7F2]" />
      </div>

      <div className="relative z-10 pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          {!store.destination ? (
            /* ─── EMPTY STATE — SUGGESTIONS ────── */
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-5xl mx-auto text-center py-20 min-h-[60vh] flex flex-col justify-center"
            >
              <Reveal>
                <p className="text-[#006233] text-xs font-bold uppercase tracking-[0.4em] mb-6">Préparez votre départ</p>
                <h1 className="font-display text-5xl md:text-7xl font-bold text-[#0A0A0F] mb-8 leading-tight">
                  Où souhaitez-vous <br /><span className="gradient-text-green">vous évader ?</span>
                </h1>
              </Reveal>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
                {[
                  { name: 'Dubai', img: getImg('dubai,luxury', 800, 600), desc: 'Luxe & Modernité' },
                  { name: 'Maldives', img: getImg('maldives,resort', 800, 600), desc: 'Paradis Tropical' }
                ].map((s, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -15, scale: 1.02 }}
                    className="relative h-72 rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl transition-all duration-500"
                    onClick={() => navigate('/destinations')}
                  >
                    <img src={s.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={s.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-10 left-10 text-left">
                      <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{s.desc}</p>
                      <h3 className="text-white text-3xl font-display font-bold">{s.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-20">
                <button
                  onClick={() => navigate('/destinations')}
                  className="px-16 py-6 bg-[#0A0A0F] text-white rounded-2xl font-bold font-body text-sm uppercase tracking-widest hover:bg-[#006233] transition-all shadow-2xl active:scale-95"
                >
                  Découvrir toutes les destinations
                </button>
              </div>
            </motion.div>
          ) : (
            /* ─── MAIN BOOKING UI ─────────────── */
            <div className="w-full">
              <div className="mb-16 text-center lg:text-left">
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[#006233] text-xs font-bold uppercase tracking-[0.4em] mb-4"
                >
                  Finalisation du séjour
                </motion.p>
                <Reveal>
                  <h1 className="font-display text-4xl md:text-6xl font-bold text-[#0A0A0F]">
                    Configurez votre <span className="gradient-text-green">Voyage</span>
                  </h1>
                </Reveal>
              </div>

              <div className="grid lg:grid-cols-12 gap-10 items-start">
                {/* Stepper — The Engine */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-8 bg-white/70 backdrop-blur-3xl p-10 md:p-16 rounded-[3.5rem] shadow-2xl shadow-black/5 border border-white"
                >
                  <Stepper onComplete={handleComplete} />
                </motion.div>

                {/* Summary — The Floating Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="lg:col-span-4"
                >
                  <BookingSummary />
                  
                  {/* Trust Badge */}
                  <div className="mt-8 p-8 bg-[#006233] rounded-[2.5rem] text-white overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                      <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    </div>
                    <h4 className="font-display font-bold text-lg mb-2 relative z-10">Paiement 100% Sécurisé</h4>
                    <p className="text-white/70 text-sm font-body relative z-10">Vos données sont protégées par un cryptage de grade bancaire.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}