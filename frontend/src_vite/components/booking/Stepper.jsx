import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBookingStore } from '../../store/bookingStore'
import { formatDA } from '../../utils/formatDA'
import { stepForward, stepBackward } from '../../animations/variants'

// ─── Animated SVG Checkbox ────────────────────
function AnimatedCheckbox({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors duration-200"
      style={{
        borderColor: checked ? '#006233' : '#C9A96E',
        backgroundColor: checked ? '#006233' : 'transparent',
      }}
      data-cursor="pointer"
    >
      <AnimatePresence>
        {checked && (
          <motion.svg
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            viewBox="0 0 12 10"
            fill="none"
            className="w-3 h-2.5"
          >
            <motion.path
              d="M1 5l3.5 3.5L11 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  )
}

// ─── Step 1 ───────────────────────────────────
function Step1({ store }) {
  const cities = [
    { code: 'ALG', label: 'Alger' },
    { code: 'ORN', label: 'Oran' },
    { code: 'CZL', label: 'Constantine' },
    { code: 'AAE', label: 'Annaba' },
  ]

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <label className="text-[10px] font-bold text-[#0A0A0F]/40 uppercase tracking-[0.2em] ml-1">Ville de départ</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cities.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => store.setField('departureCity', c.code)}
              className={`group relative py-6 px-4 rounded-2xl border-2 transition-all duration-300 ${
                store.departureCity === c.code
                  ? 'border-[#006233] bg-[#006233] text-white shadow-xl shadow-[#006233]/20'
                  : 'border-[#E8E2D9] text-[#0A0A0F]/60 hover:border-[#006233]/30'
              }`}
            >
              <span className="block text-xl font-display font-bold mb-1">{c.code}</span>
              <span className={`block text-[10px] uppercase tracking-widest ${store.departureCity === c.code ? 'text-white/60' : 'text-[#0A0A0F]/40'}`}>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-12">
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-[#0A0A0F]/40 uppercase tracking-[0.2em] ml-1">Date de départ</label>
          <input
            type="date"
            value={store.departureDate}
            onChange={(e) => store.setField('departureDate', e.target.value)}
            className="w-full px-0 py-4 bg-transparent border-b-2 border-[#E8E2D9] focus:outline-none focus:border-[#006233] transition-all font-body text-lg text-[#0A0A0F]"
          />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-[#0A0A0F]/40 uppercase tracking-[0.2em] ml-1">Date de retour</label>
          <input
            type="date"
            value={store.returnDate}
            onChange={(e) => store.setField('returnDate', e.target.value)}
            className="w-full px-0 py-4 bg-transparent border-b-2 border-[#E8E2D9] focus:outline-none focus:border-[#006233] transition-all font-body text-lg text-[#0A0A0F]"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-12">
        <div className="space-y-6">
          <label className="text-[10px] font-bold text-[#0A0A0F]/40 uppercase tracking-[0.2em] ml-1">Adultes</label>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => store.setField('adults', Math.max(1, store.adults - 1))}
              className="w-14 h-14 rounded-2xl border-2 border-[#E8E2D9] flex items-center justify-center text-2xl hover:border-[#006233] hover:text-[#006233] transition-all"
            >–</button>
            <span className="font-display text-3xl font-bold w-12 text-center text-[#0A0A0F]">
              {store.adults}
            </span>
            <button
              type="button"
              onClick={() => store.setField('adults', Math.min(10, store.adults + 1))}
              className="w-14 h-14 rounded-2xl border-2 border-[#E8E2D9] flex items-center justify-center text-2xl hover:border-[#006233] hover:text-[#006233] transition-all"
            >+</button>
          </div>
        </div>
        <div className="space-y-6">
          <label className="text-[10px] font-bold text-[#0A0A0F]/40 uppercase tracking-[0.2em] ml-1">Enfants (-12 ans)</label>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => store.setField('children', Math.max(0, store.children - 1))}
              className="w-14 h-14 rounded-2xl border-2 border-[#E8E2D9] flex items-center justify-center text-2xl hover:border-[#006233] hover:text-[#006233] transition-all"
            >–</button>
            <span className="font-display text-3xl font-bold w-12 text-center text-[#0A0A0F]">
              {store.children}
            </span>
            <button
              type="button"
              onClick={() => store.setField('children', Math.min(10, store.children + 1))}
              className="w-14 h-14 rounded-2xl border-2 border-[#E8E2D9] flex items-center justify-center text-2xl hover:border-[#006233] hover:text-[#006233] transition-all"
            >+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Step 2 ───────────────────────────────────
function Step2({ store }) {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <p className="text-[#0A0A0F]/50 font-body text-lg">Sublimez votre expérience avec nos prestations exclusives sur mesure.</p>
      </div>
      <div className="grid gap-4">
        {store.extras.map((extra) => {
          const selected = store.selectedExtras.includes(extra.id)
          return (
            <motion.div
              key={extra.id}
              whileHover={{ x: 10 }}
              onClick={() => store.toggleExtra(extra.id)}
              className={`flex items-center gap-6 p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${
                selected
                  ? 'border-[#006233] bg-[#006233]/5 shadow-lg shadow-[#006233]/5'
                  : 'border-[#E8E2D9] hover:border-[#006233]/20'
              }`}
            >
              <AnimatedCheckbox
                checked={selected}
                onChange={() => store.toggleExtra(extra.id)}
              />
              <div className="flex-1">
                <p className="font-display font-bold text-[#0A0A0F] text-lg">{extra.label}</p>
              </div>
              <span className="font-display font-bold text-[#006233] text-xl">
                +{formatDA(extra.price)}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Step 3 ───────────────────────────────────
function Step3({ store }) {
  const fields = [
    { key: 'firstName', label: 'Prénom', placeholder: 'Ex: Karim', type: 'text' },
    { key: 'lastName',  label: 'Nom de famille', placeholder: 'Ex: Messaoudi', type: 'text' },
    { key: 'email',     label: 'Email de contact', placeholder: 'Ex: karim@email.com', type: 'email' },
    { key: 'phone',     label: 'Numéro de téléphone', placeholder: 'Ex: +213 555 00 00 00', type: 'tel' },
  ]

  return (
    <div className="space-y-12">
      <div className="grid sm:grid-cols-2 gap-12">
        {fields.slice(0, 2).map((f) => (
          <div key={f.key} className="space-y-4">
            <label className="text-[10px] font-bold text-[#0A0A0F]/40 uppercase tracking-[0.2em] ml-1">{f.label}</label>
            <input
              type={f.type}
              value={store[f.key]}
              onChange={(e) => store.setField(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="w-full px-0 py-4 bg-transparent border-b-2 border-[#E8E2D9] focus:outline-none focus:border-[#006233] transition-all font-body text-lg text-[#0A0A0F] placeholder:text-[#0A0A0F]/20"
            />
          </div>
        ))}
      </div>
      {fields.slice(2).map((f) => (
        <div key={f.key} className="space-y-4">
          <label className="text-[10px] font-bold text-[#0A0A0F]/40 uppercase tracking-[0.2em] ml-1">{f.label}</label>
          <input
            type={f.type}
            value={store[f.key]}
            onChange={(e) => store.setField(f.key, e.target.value)}
            placeholder={f.placeholder}
            className="w-full px-0 py-4 bg-transparent border-b-2 border-[#E8E2D9] focus:outline-none focus:border-[#006233] transition-all font-body text-lg text-[#0A0A0F] placeholder:text-[#0A0A0F]/20"
          />
        </div>
      ))}
    </div>
  )
}

// ─── Step 4 ───────────────────────────────────
function Step4({ store }) {
  const methods = [
    { id: 'card',     label: 'Paiement par Carte (CIB / Dahabia)', icon: '💳', sub: 'Traitement instantané' },
    { id: 'virement', label: 'Virement CCP / BaridiMob', icon: '🏦', sub: 'Validation sous 24h' },
    { id: 'especes',  label: 'Paiement en Agence', icon: '💵', sub: 'Alger, Hydra' },
  ]

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <p className="text-[#0A0A0F]/50 font-body text-lg">Choisissez votre mode de règlement sécurisé.</p>
      </div>
      <div className="grid gap-4">
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => store.setField('paymentMethod', m.id)}
            className={`flex items-center gap-6 p-8 rounded-[2.5rem] border-2 text-left transition-all duration-300 ${
              store.paymentMethod === m.id
                ? 'border-[#006233] bg-[#006233]/5 shadow-xl shadow-[#006233]/5'
                : 'border-[#E8E2D9] hover:border-[#006233]/20'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${store.paymentMethod === m.id ? 'bg-[#006233] text-white' : 'bg-[#FAF7F2]'}`}>
              {m.icon}
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-[#0A0A0F] text-lg">{m.label}</p>
              <p className="text-[#0A0A0F]/40 text-xs font-body uppercase tracking-widest">{m.sub}</p>
            </div>
            {store.paymentMethod === m.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 rounded-full bg-[#006233] flex items-center justify-center"
              >
                <svg viewBox="0 0 12 10" fill="none" className="w-4 h-3">
                  <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main Stepper ─────────────────────────────
const STEPS = [
  { id: 1, label: 'Dates' },
  { id: 2, label: 'Options' },
  { id: 3, label: 'Infos' },
  { id: 4, label: 'Paiement' },
]

export function Stepper({ onComplete }) {
  const store = useBookingStore()
  const direction = store.stepDirection
  const variants = direction === 'forward' ? stepForward : stepBackward

  return (
    <div className="space-y-16">
      {/* ─── Progress HUD ─────────────────── */}
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center gap-3 relative z-10">
              <motion.div
                animate={{
                  backgroundColor: store.step >= s.id ? '#006233' : '#E8E2D9',
                  scale: store.step === s.id ? 1.2 : 1,
                  boxShadow: store.step === s.id ? '0 0 20px rgba(0,98,51,0.2)' : 'none'
                }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold"
                style={{ color: store.step >= s.id ? 'white' : '#0A0A0F40' }}
              >
                {store.step > s.id ? (
                  <svg viewBox="0 0 12 10" fill="none" className="w-5 h-4">
                    <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : s.id}
              </motion.div>
              <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${store.step >= s.id ? 'text-[#006233]' : 'text-[#0A0A0F]/30'}`}>
                {s.label}
              </span>
            </div>
          ))}
          {/* Background line */}
          <div className="absolute top-6 left-6 right-6 h-1 bg-[#E8E2D9] -z-10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#006233] to-[#C9A96E]"
              animate={{ width: `${((store.step - 1) / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "circOut" }}
            />
          </div>
        </div>
      </div>

      {/* ─── Step Content ─────────────────── */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={store.step}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mb-12">
              <h3 className="font-display text-3xl font-bold text-[#0A0A0F] mb-2">
                {STEPS[store.step - 1].label}
              </h3>
              <div className="w-12 h-1.5 bg-[#006233] rounded-full" />
            </div>

            {store.step === 1 && <Step1 store={store} />}
            {store.step === 2 && <Step2 store={store} />}
            {store.step === 3 && <Step3 store={store} />}
            {store.step === 4 && <Step4 store={store} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Navigation ───────────────────── */}
      <div className="flex items-center justify-between pt-10 border-t border-[#E8E2D9]/50">
        <motion.button
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={store.prevStep}
          disabled={store.step === 1}
          className="flex items-center gap-3 font-bold text-xs uppercase tracking-widest text-[#0A0A0F]/40 hover:text-[#006233] disabled:opacity-0 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/>
          </svg>
          Retour
        </motion.button>

        {store.step < 4 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={store.nextStep}
            className="group relative px-10 py-5 bg-[#0A0A0F] text-white rounded-2xl font-bold text-xs uppercase tracking-widest overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[#006233] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-3">
              Suivant
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/>
              </svg>
            </span>
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="group relative px-12 py-5 bg-gradient-to-r from-[#006233] to-[#C9A96E] text-white rounded-2xl font-bold text-xs uppercase tracking-widest overflow-hidden shadow-gold"
          >
            <span className="relative z-10">Confirmer la Réservation</span>
          </motion.button>
        )}
      </div>
    </div>
  )
}
