"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion'
import { Stepper } from '@/components/booking/Stepper'
import { BookingSummary } from '@/components/booking/BookingSummary'
import { useBookingStore } from '@/store/bookingStore'
import { useAuthStore } from '@/store/authStore'
import { useAdminStore } from '@/store/adminStore'
import { generateRef } from '@/utils/generateRef'
import { fadeInUp } from '@/animations/variants'

export default function Reservation() {
  const router = useRouter()
  const store = useBookingStore()
  const addBooking = useAuthStore((s) => s.addBooking)

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async () => {
    // Generate booking and save
    const ref = generateRef()
    const destination = store.destination

    if (destination) {
      setIsSubmitting(true);
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

      // Add to admin store reservations
      const adminStore = useAdminStore.getState();
      const existingClient = adminStore.clients.find(c => c.email === (store.email || 'contact@client.com'));
      const clientId = existingClient ? existingClient.id : `CLI-${adminStore.clients.length + 1}`;
      
      if (!existingClient) {
        adminStore.createClient({
          id: clientId,
          firstName: store.firstName || 'Nouveau',
          lastName: store.lastName || 'Client',
          email: store.email || 'contact@client.com',
          phone: store.phone || '0500000000',
          city: store.departureCity || 'Alger',
          totalSpent: bookingData.totalPrice,
          totalReservations: 1,
          lastActivity: new Date().toISOString(),
          tags: ['Nouveau']
        });
      } else {
        adminStore.updateClient(clientId, {
          totalSpent: existingClient.totalSpent + bookingData.totalPrice,
          totalReservations: existingClient.totalReservations + 1,
          lastActivity: new Date().toISOString()
        });
      }

      // Add to admin store so it appears in the backend dashboard
      adminStore.createReservation({
        ref: bookingData.ref,
        client: {
          id: clientId,
          name: `${store.firstName || 'Nouveau'} ${store.lastName || 'Client'}`,
          email: store.email || 'contact@client.com',
          phone: store.phone || '0500000000',
        },
        destination: {
          name: destination.name,
          image: destination.image || '',
        },
        dates: {
          start: bookingData.departure,
          end: bookingData.returnDate,
        },
        travelers: bookingData.travelers,
        totalPrice: bookingData.totalPrice,
        status: 'pending', // Overriding 'confirmé' so admin can approve
      });

      // Send to backend API to trigger email and save to DB
      const authUser = useAuthStore.getState().user;
      try {
        const res = await fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: authUser ? authUser.firstName : store.firstName || 'Client',
            lastName: authUser ? authUser.name.replace(authUser.firstName, '').trim() : store.lastName || 'Nouveau',
            email: authUser ? authUser.email : store.email || 'contact@client.com',
            phone: authUser ? authUser.phone : store.phone || '0500000000',
            destination: destination.name,
            date: store.departureDate || 'À définir',
            passengers: store.adults + store.children,
            message: `Ref: ${ref} - Total: ${bookingData.totalPrice} DA`,
          }),
        });

        if (!res.ok) throw new Error('Failed to create booking');
        
        store.reset()
        router.push(`/confirmation?ref=${ref}&dest=${encodeURIComponent(destination?.name || '')}`)
      } catch (err) {
        console.error('Failed to send booking to backend:', err);
        alert('Erreur lors de la réservation. Veuillez réessayer.');
      } finally {
        setIsSubmitting(false);
      }
    }
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
            className="relative mt-16 py-24 md:py-32 px-6 rounded-[40px] overflow-hidden bg-[#060610] flex flex-col items-center justify-center text-center shadow-2xl border border-white/5"
          >
            {/* Background Image with Dark Overlay */}
            <img src="/maldives.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[3px] scale-105" />
            <div className="absolute inset-0 bg-[#060610]/60" />
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#c5a059] opacity-[0.03] blur-[120px] pointer-events-none rounded-full" />
            
            {/* Icon */}
            <div className="relative z-10 w-20 h-20 mx-auto mb-10 rounded-full flex items-center justify-center border border-[#c5a059]/20 bg-[#c5a059]/5 backdrop-blur-md">
              <svg className="w-8 h-8 text-[#c5a059]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            {/* Typography */}
            <div className="relative z-10 max-w-2xl mx-auto mb-12">
              <h2 className="font-display text-4xl md:text-6xl text-white mb-6 leading-tight">
                Choisissez votre prochaine <br/>
                <span className="text-[#c5a059] italic">Destination de Rêve</span>
              </h2>
              <p className="text-white/50 font-body text-lg md:text-xl font-light">
                Sélectionnez d'abord un voyage parmi notre collection exclusive avant de procéder à la réservation.
              </p>
            </div>

            {/* CTA */}
            <div className="relative z-10">
              <a
                href="/destinations"
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#1A1200] rounded-full font-bold font-body text-sm uppercase tracking-widest overflow-hidden transition-transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Explorer la collection</span>
                <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
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
              <Stepper onComplete={handleComplete} isSubmitting={isSubmitting} />
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
