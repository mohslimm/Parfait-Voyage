"use client";
import { useRouter } from 'next/navigation'

import { motion } from 'framer-motion'
import { Stepper } from '@/components/booking/Stepper'
import { BookingSummary } from '@/components/booking/BookingSummary'
import { useBookingStore } from '@/store/bookingStore'
import { useAuthStore } from '@/store/authStore'
import { generateRef } from '@/utils/generateRef'
import { fadeInUp } from '@/animations/variants'

export default function Reservation() {
  const router = useRouter()
  const store = useBookingStore()
  const addBooking = useAuthStore((s) => s.addBooking)

  const handleComplete = () => {
    // Generate booking and save
    const ref = generateRef()
    const destination = store.destination

    if (destination) {
      const basePrice = destination.price * (store.adults + store.children * 0.5)
      const extrasTotal = store.selectedExtras.reduce((acc, id) => {
        const found = store.extras.find((e) => e.id === id)
        return acc + (found ? found.price : 0)
      }, 0)

      const bookingData = {
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
      }

      // Add to local state (for instant UI update/dashboard)
      addBooking(bookingData)

      // Send to backend API to trigger email and save to DB
      const authUser = useAuthStore.getState().user;
      fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: authUser ? authUser.firstName : 'Client',
          lastName: authUser ? authUser.name.replace(authUser.firstName, '').trim() : 'Nouveau',
          email: authUser ? authUser.email : 'contact@client.com',
          phone: authUser ? authUser.phone : '0500000000',
          destination: destination.name,
          date: store.departureDate || 'À définir',
          passengers: store.adults + store.children,
          message: `Ref: ${ref} - Total: ${bookingData.totalPrice} DA`,
        }),
      }).catch((err) => console.error('Failed to send booking to backend:', err))
    }

    store.reset()
    router.push(`/confirmation?ref=${ref}&dest=${encodeURIComponent(destination?.name || '')}`)
  }

  return (
    <div className="bg-[#FAF7F2] pt-24 pb-20">
      {/* Header */}
      <div className="relative py-28 flex items-center justify-center overflow-hidden bg-[#0A0A0F]">
        <img 
          src="/zanzibar.jpg" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[3px] kenburns"
          alt="Finalisez votre voyage"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/60 to-transparent" />
        <div className="container-custom text-center relative z-10">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest font-body mb-3"
          >
            Réservation
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-white"
          >
            Finalisez votre voyage
          </motion.h1>
          {store.destination && (
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-white/70 font-body text-lg mt-2"
            >
              {store.destination.name}, {store.destination.country}
            </motion.p>
          )}
        </div>
      </div>

      <div className="container-custom">
        {!store.destination ? (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="relative text-center py-28 overflow-hidden rounded-[40px] bg-primary"
          >
            <img src="/maldives.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <svg className="w-12 h-12 text-[#C9A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Choisissez d'abord votre destination
              </h2>
              <p className="text-white/60 font-body text-lg mb-8 max-w-md mx-auto">
                Parcourez nos destinations et cliquez sur « Réserver ce voyage ».
              </p>
              <a
                href="/destinations"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A96E] text-white rounded-2xl font-semibold font-body hover:bg-[#dbbf8a] transition-colors"
              >
                Voir les destinations
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Stepper */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-card"
            >
              <Stepper onComplete={handleComplete} />
            </motion.div>

            {/* Summary */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              className="lg:col-span-2"
            >
              <BookingSummary />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
