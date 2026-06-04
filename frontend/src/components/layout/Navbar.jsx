"use client";
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname as useLocation, useSearchParams } from 'next/navigation'

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { drawerVariant, fadeInDown, staggerContainer, staggerItem } from '@/animations/variants'
import { useAuth } from '@/hooks/useAuth'

const navLinks = [
  { label: 'Accueil',       path: '/' },
  { label: 'Destinations',  path: '/destinations' },
  { label: 'Offres',        path: '/offres' },
  { label: 'À propos',      path: '/about' },
  { label: 'Contact',       path: '/contact' },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const navBg = useTransform(scrollY, [0, 80], ['rgba(250, 247, 242, 0.90)', 'rgba(250, 247, 242, 0.65)'])
  const navBlur = useTransform(scrollY, [0, 80], ['blur(12px)', 'blur(24px)'])

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const searchParams = useSearchParams()
  const { isLogged, user, logout } = useAuth()

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 60))
    return unsub
  }, [scrollY])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const isHome = location === '/'

  return (
    <>
      <motion.nav
        style={{
          backgroundColor: isHome ? navBg : 'rgba(250, 247, 242, 0.75)',
          backdropFilter: isHome ? navBlur : 'blur(24px)',
          boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)' : '0 2px 10px rgba(0,0,0,0.02)',
        }}
        className="fixed top-0 left-0 right-0 z-[100] transition-shadow duration-500 border-b border-black/5"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <motion.div variants={fadeInDown} initial="hidden" animate="visible">
              <Link 
                href="/" 
                className="flex items-center gap-2 group"
                onClick={(e) => {
                  if (location === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
              >
                <img src="/parfait-voyage-logo-sans-cercle.png" alt="Parfait Voyage Logo" className="h-16 md:h-24 w-auto object-contain relative z-10 group-hover:scale-105 transition-transform" />
              </Link>
            </motion.div>

            {/* Desktop links */}
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="hidden md:flex items-center gap-1"
            >
              {navLinks.map((link) => {
                const [pathPart, queryPart] = link.path.split('?')
                let active = false
                if (queryPart && searchParams.get('cat')) {
                  active = location === pathPart && searchParams.get('cat') === queryPart.split('=')[1]
                } else if (!queryPart && !searchParams.get('cat')) {
                  active = location === pathPart
                }

                return (
                  <motion.li key={link.path} variants={staggerItem}>
                    <Link
                      href={link.path}
                      onClick={(e) => {
                        if (link.path === '/' && location === '/') {
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                      }}
                      className="relative px-4 py-2 text-sm font-medium font-body text-[var(--color-text-primary)]/80 hover:text-accent transition-colors rounded-xl"
                      data-cursor="pointer"
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-5 bg-accent rounded-full"
                        />
                      )}
                    </Link>
                  </motion.li>
                )
              })}
            </motion.ul>

            {/* CTA + Auth */}
            <div className="hidden md:flex items-center gap-3">
              {isLogged ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-xl transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                      {user?.firstName?.[0]?.toUpperCase() ?? 'U'}
                    </div>
                    {user?.firstName}
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-500 hover:text-red-500 transition-colors px-2"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-[var(--color-text-primary)]/80 hover:text-accent px-3 py-2 transition-colors"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/reservation"
                    className="pulse-soft inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#1A1200] text-sm font-semibold hover:scale-105 transition-all shadow-premium"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Réserver
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-xl hover:bg-[#E8E2D9] transition-colors"
              data-cursor="pointer"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <motion.span
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                  className="block h-0.5 w-full bg-[#0A0A0F] rounded origin-center"
                />
                <motion.span
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  className="block h-0.5 w-full bg-[#0A0A0F] rounded"
                />
                <motion.span
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                  className="block h-0.5 w-full bg-[#0A0A0F] rounded origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={drawerVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-16 left-0 right-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-xl border-b border-[#E8E2D9] shadow-xl md:hidden"
          >
            <div className="container-custom py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="px-4 py-3 rounded-xl font-medium text-[#0A0A0F]/80 hover:bg-[#006233]/5 hover:text-[#006233] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-[#E8E2D9] flex flex-col gap-3">
                {isLogged ? (
                  <button
                    onClick={logout}
                    className="text-left px-4 py-3 text-red-500 font-medium"
                  >
                    Déconnexion
                  </button>
                ) : (
                  <>
                    <Link href="/login" className="px-4 py-3 text-[#0A0A0F]/70 font-medium">
                      Connexion
                    </Link>
                    <Link
                      href="/reservation"
                      className="px-6 py-3 bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#1A1200] rounded-xl font-semibold text-center hover:scale-105 transition-transform"
                    >
                      Réserver un voyage
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
