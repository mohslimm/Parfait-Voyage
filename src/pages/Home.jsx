import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { SearchBar } from '../components/common/SearchBar'
import { DestinationGrid } from '../components/destination/DestinationGrid'
import { ReviewCard } from '../components/common/ReviewCard'
import { CounterUp } from '../components/common/CounterUp'
import { WaveDivider } from '../components/ui/WaveDivider'
import { Reveal } from '../components/ui/Reveal'
import { destinations } from '../data/destinations'
import { reviews } from '../data/reviews'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { staggerContainer, staggerItem, clipPathReveal, fadeInUp } from '../animations/variants'
import { getImg } from '../utils/unsplash'

// ─── Floating Circles ─────────────────────────
const CIRCLES = [
  { size: 300, x: '10%',  y: '20%',  opacity: 0.08, class: 'float-1', delay: 0 },
  { size: 200, x: '75%',  y: '10%',  opacity: 0.06, class: 'float-2', delay: 1 },
  { size: 150, x: '85%',  y: '60%',  opacity: 0.10, class: 'float-3', delay: 2 },
  { size: 100, x: '20%',  y: '70%',  opacity: 0.07, class: 'float-1', delay: 0.5 },
  { size: 250, x: '50%',  y: '80%',  opacity: 0.05, class: 'float-2', delay: 1.5 },
  { size: 80,  x: '60%',  y: '30%',  opacity: 0.09, class: 'float-3', delay: 0.3 },
  { size: 120, x: '35%',  y: '15%',  opacity: 0.06, class: 'float-1', delay: 2.5 },
  { size: 90,  x: '90%',  y: '85%',  opacity: 0.08, class: 'float-2', delay: 1.8 },
  { size: 180, x: '5%',   y: '50%',  opacity: 0.06, class: 'float-3', delay: 0.7 },
  { size: 70,  x: '45%',  y: '45%',  opacity: 0.10, class: 'float-1', delay: 3 },
  { size: 130, x: '70%',  y: '75%',  opacity: 0.07, class: 'float-2', delay: 2.2 },
  { size: 160, x: '25%',  y: '90%',  opacity: 0.05, class: 'float-3', delay: 1.2 },
]

// ─── Split Text Hero ──────────────────────────
const WORDS = ["Explorez", "le Monde", "depuis l'Algérie"]

function SplitText() {
  return (
    <motion.h1
      className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight hero-title"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
      }}
    >
      {WORDS.map((word, i) => (
        <motion.span
          key={i}
          className="block"
          variants={{
            hidden:  { y: 40, opacity: 0, filter: 'blur(8px)' },
            visible: {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {i === 2 ? (
            <span className="gradient-text-gold">{word}</span>
          ) : word}
        </motion.span>
      ))}
    </motion.h1>
  )
}

// ─── Bento "Pourquoi nous" ────────────────────
const WHY_US = [
  {
    id: 'exp',
    title: 'Expertise locale',
    desc: '12 ans d\'expérience au service des voyageurs algériens avec une connaissance profonde des besoins locaux.',
    icon: 'ExpertiseIcon',
    className: 'lg:col-span-2 lg:row-span-2',
    bg: 'from-[#006233] to-[#004d27]',
    light: false,
    image: getImg('sahara,algeria,luxury', 800, 800),
    badge: 'Depuis 2012',
    meta: 'Agrément ONAT N° 2024-0847'
  },
  {
    id: 'price',
    title: 'Meilleurs prix',
    desc: 'Tarifs en dinars, sans frais cachés. Paiement flexible.',
    icon: 'PriceIcon',
    className: 'lg:col-span-1',
    bg: 'from-white to-[#F8F5F0]',
    light: true,
    badge: 'Taxes Incluses',
    meta: 'Paiement CCP / BaridiMob'
  },
  {
    id: 'support',
    title: 'Support 24/7',
    desc: 'Une équipe dédiée disponible par téléphone et WhatsApp.',
    icon: 'SupportIcon',
    className: 'lg:col-span-1',
    bg: 'from-[#FAF7F2] to-[#F0EBE1]',
    light: true,
    badge: 'Réponse < 5min',
    meta: 'Alger • Oran • Constantine'
  },
  {
    id: 'visa',
    title: 'Assistance visa',
    desc: 'Accompagnement complet et préparation de dossier.',
    icon: 'VisaIcon',
    className: 'lg:col-span-1',
    bg: 'from-[#FAF7F2] to-[#F0EBE1]',
    light: true,
    badge: '98% Succès',
    meta: 'Schengen • Turquie • Dubaï'
  },
  {
    id: 'custom',
    title: 'Voyages sur mesure',
    desc: 'Itinéraires uniques créés selon vos envies.',
    icon: 'CustomIcon',
    className: 'lg:col-span-1',
    bg: 'from-[#0A0A0F] to-[#1a1a24]',
    light: false,
    image: getImg('luxury,travel,resort', 600, 600),
    badge: 'Premium',
    meta: 'Hôtels 5★ uniquement'
  },
]

// ─── Bento Icons Components ───────────────────
function ExpertiseIcon({ light }) {
  return (
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${light ? 'bg-[#006233]/10 text-[#006233]' : 'bg-white/10 text-white'} mb-6 backdrop-blur-md`}>
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
      </svg>
    </div>
  )
}

function PriceIcon({ light }) {
  return (
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${light ? 'bg-[#006233]/10 text-[#006233]' : 'bg-white/10 text-white'} mb-6`}>
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  )
}

function SupportIcon({ light }) {
  return (
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${light ? 'bg-[#006233]/10 text-[#006233]' : 'bg-white/10 text-white'} mb-6`}>
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    </div>
  )
}

function VisaIcon({ light }) {
  return (
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${light ? 'bg-[#006233]/10 text-[#006233]' : 'bg-white/10 text-white'} mb-6`}>
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
  )
}

function CustomIcon({ light }) {
  return (
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${light ? 'bg-[#C9A96E]/20 text-[#C9A96E]' : 'bg-white/10 text-[#C9A96E]'} mb-6 backdrop-blur-md`}>
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
      </svg>
    </div>
  )
}

const BENTO_ICONS = {
  ExpertiseIcon,
  PriceIcon,
  SupportIcon,
  VisaIcon,
  CustomIcon
}

// ─── Stats data ───────────────────────────────
const STATS = [
  { target: 500,   suffix: '+',  label: 'Destinations proposées', icon: GlobeIcon },
  { target: 15000, suffix: '+',  label: 'Voyageurs satisfaits',   icon: UsersIcon },
  { target: 12,    suffix: '',   label: 'Ans d\'expérience',      icon: TrophyIcon },
  { target: 98,    suffix: '%',  label: 'Taux de satisfaction',   icon: HeartIcon },
]

// ─── Icons ────────────────────────────────────
function GlobeIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  )
}
function UsersIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
    </svg>
  )
}
function TrophyIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
    </svg>
  )
}
function HeartIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
    </svg>
  )
}

// ─── Main Home Page ───────────────────────────
export default function Home() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 150])

  const { ref: destRef, isInView: destInView } = useScrollAnimation()
  const { ref: statsRef, isInView: statsInView } = useScrollAnimation()
  const { ref: reviewsRef, isInView: reviewsInView } = useScrollAnimation()

  // Testimonials carousel
  const [activeReview, setActiveReview] = useState(0)
  const [dragging, setDragging] = useState(false)
  const reviewRef = useRef(null)

  const featured = destinations.filter((d) => d.featured).slice(0, 6)
  const popular  = destinations.filter((d) => d.popular).slice(0, 6)

  return (
    <div className="bg-[#FAF7F2]">
      {/* ─── HERO ─────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0F]"
      >
        {/* Video background */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            poster={getImg('hero,travel,aerial', 1600, 900)}
          >
            <source
              src="https://cdn.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4"
              type="video/mp4"
            />
          </video>
          {/* Fallback image with Ken Burns */}
          <div className="absolute inset-0">
            <img
              src={getImg('hero,travel,aerial', 1600, 900)}
              alt="Voyages depuis l'Algérie"
              className="w-full h-full object-cover kenburns opacity-60"
            />
          </div>
          {/* Deep overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/60 via-[#0A0A0F]/40 to-[#0A0A0F]/80" />
        </motion.div>

        {/* Floating circles */}
        {CIRCLES.map((c, i) => (
          <div
            key={i}
            className={`absolute rounded-full border border-white ${c.class} pointer-events-none`}
            style={{
              width: c.size,
              height: c.size,
              left: c.x,
              top: c.y,
              opacity: c.opacity,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}

        {/* Hero content */}
        <div className="container-custom relative z-10 text-center pt-80 pb-16">

          <SplitText />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-6 text-white/70 text-lg font-body max-w-xl mx-auto leading-relaxed"
          >
            Vols, hôtels et expériences inoubliables — tout inclus, en dinars algériens.
            Depuis <span className="text-[#C9A96E]">Alger, Oran, Constantine</span> et Annaba.
          </motion.p>

          {/* Search Bar */}
          <div className="mt-10 max-w-3xl mx-auto px-4">
            <SearchBar />
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <span className="text-white/40 text-xs font-body tracking-widest uppercase">
              Défiler
            </span>
            <svg
              className="w-5 h-5 text-white/40 scroll-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/>
            </svg>
          </motion.div>
        </div>

        {/* Algerian flag gradient strip at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#006233] via-white to-[#D21034] opacity-60" />
      </section>

      {/* Wave */}
      <div className="bg-[#0A0A0F]">
        <WaveDivider color="#FAF7F2" />
      </div>

      {/* ─── FEATURED DESTINATIONS ────────────── */}
      <section className="section-padding">
        <div className="container-custom">
          <div ref={destRef} className="mb-12">
            {/* Clip path reveal title */}
            <div className="flex items-end gap-6 mb-4">
              <div>
                <motion.p
                  variants={fadeInUp}
                  initial="hidden"
                  animate={destInView ? 'visible' : 'hidden'}
                  className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest font-body mb-2"
                >
                  Nos sélections
                </motion.p>
                <Reveal>
                  <motion.h2
                    variants={clipPathReveal}
                    initial="hidden"
                    animate={destInView ? 'visible' : 'hidden'}
                    className="font-display text-4xl md:text-5xl font-bold text-[#0A0A0F]"
                  >
                    Destinations à la une
                  </motion.h2>
                </Reveal>
              </div>
            </div>
            {/* Decorative line */}
            <motion.div
              className="deco-line"
              initial={{ width: 0 }}
              animate={destInView ? { width: 60 } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </div>

          {/* Mobile: horizontal scroll, Desktop: grid */}
          <div className="md:hidden">
            <DestinationGrid destinations={featured} horizontal />
          </div>
          <div className="hidden md:block">
            <DestinationGrid destinations={featured} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <Link
              to="/destinations"
              className="group relative inline-flex items-center gap-3 px-8 py-4 border-2 border-[#006233] text-[#006233] rounded-2xl font-semibold font-body hover:bg-[#006233] hover:text-white transition-all duration-300"
              data-cursor="pointer"
            >
              Voir toutes les destinations
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Wave */}
      <WaveDivider color="#0A0A0F" />

      {/* ─── STATS ────────────────────────────── */}
      <section className="bg-[#0A0A0F] section-padding">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest font-body mb-3">
              Ils nous font confiance
            </p>
            <Reveal delay={0.2}>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                Des chiffres qui parlent
              </h2>
            </Reveal>
          </div>
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <CounterUp
                  target={stat.target}
                  suffix={stat.suffix}
                  label={stat.label}
                  icon={stat.icon}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave */}
      <WaveDivider color="#FAF7F2" flip />

      {/* ─── WHY US — BENTO ───────────────────── */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-20">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#C9A96E] text-xs font-bold uppercase tracking-[0.3em] mb-4"
            >
              Notre différence
            </motion.p>
            <Reveal>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-[#0A0A0F] tracking-tight">
                Pourquoi choisir <br className="hidden md:block" />
                <span className="gradient-text-green">Parfait Voyages ?</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
            {WHY_US.map((item, i) => {
              const IconComp = BENTO_ICONS[item.icon]
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`relative group bg-gradient-to-br ${item.bg} rounded-[2.5rem] p-10 ${item.className} flex flex-col justify-between overflow-hidden border ${item.light ? 'border-black/5 shadow-lg shadow-black/5' : 'border-white/5'} transition-all duration-500`}
                >
                  {/* Background Image for Large Cards */}
                  {item.image && (
                    <div className="absolute inset-0 z-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover opacity-20 grayscale group-hover:scale-110 group-hover:opacity-30 transition-all duration-700" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-80`} />
                    </div>
                  )}

                  {/* Decorative Glow */}
                  <div className={`absolute top-0 right-0 w-48 h-48 blur-[80px] rounded-full ${item.light ? 'bg-[#006233]/5' : 'bg-white/5'} translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700`} />
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <IconComp light={item.light} />
                    {item.badge && (
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${item.light ? 'bg-[#006233] text-white' : 'bg-[#C9A96E] text-[#0A0A0F]'}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className={`font-display text-3xl font-bold mb-4 tracking-tight ${item.light ? 'text-[#0A0A0F]' : 'text-white'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm font-body leading-relaxed mb-6 max-w-[320px] ${item.light ? 'text-[#0A0A0F]/60' : 'text-white/60'}`}>
                      {item.desc}
                    </p>
                    
                    <div className="pt-4 border-t border-current opacity-10 flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${item.light ? 'text-[#0A0A0F]' : 'text-white'}`}>
                        {item.meta}
                      </span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Wave */}
      <WaveDivider color="#FAF7F2" />

      {/* ─── TESTIMONIALS ─────────────────────── */}
      <section className="section-padding bg-gradient-to-b from-[#FAF7F2] to-[#f0ebe1]">
        <div className="container-custom">
          <div className="text-center mb-14" ref={reviewsRef}>
            <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest font-body mb-3">
              Avis voyageurs
            </p>
            <Reveal>
              <motion.h2
                variants={clipPathReveal}
                initial="hidden"
                animate={reviewsInView ? 'visible' : 'hidden'}
                className="font-display text-4xl md:text-5xl font-bold text-[#0A0A0F]"
              >
                Ce qu'ils en disent
              </motion.h2>
            </Reveal>
          </div>

          {/* Carousel */}
          <motion.div
            ref={reviewRef}
            className="flex gap-6 overflow-x-hidden pb-4"
            drag="x"
            dragConstraints={{ left: -(reviews.length - 1) * 360, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            style={{ cursor: dragging ? 'grabbing' : 'grab' }}
          >
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </motion.div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {reviews.slice(0, 6).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveReview(i)}
                className="rounded-full"
                animate={{
                  width:           activeReview === i ? 24 : 8,
                  height:          8,
                  backgroundColor: activeReview === i ? '#006233' : '#C9A96E',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                data-cursor="pointer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────── */}
      <section className="bg-gradient-to-r from-[#006233] to-[#004d27] py-20">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Prêt pour votre prochain voyage ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 font-body text-lg mb-8 max-w-lg mx-auto"
          >
            Obtenez un devis personnalisé gratuitement en moins de 2 minutes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/reservation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A96E] text-white rounded-2xl font-bold font-body text-lg hover:bg-[#dbbf8a] transition-colors shadow-gold"
            >
              Réserver maintenant
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
            <a
              href="tel:+213555000000"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-semibold font-body text-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              +213 555 000 000
            </a>
          </motion.div>
          <p className="mt-6 text-white/50 text-sm font-arabic text-center">
            رحلة أحلامك تبدأ من هنا
          </p>
        </div>
      </section>
    </div>
  )
}
