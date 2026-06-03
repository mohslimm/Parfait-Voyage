import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { CustomCursor } from './components/ui/CustomCursor'

// Pages
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
import Reservation from './pages/Reservation'
import Confirmation from './pages/Confirmation'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import CGV from './pages/CGV'
import Privacy from './pages/Privacy'

import { WhatsAppButton } from './components/ui/WhatsAppButton'
import { BackToTop } from './components/ui/BackToTop'
import { SplashScreen } from './components/ui/SplashScreen'
import { useLenis } from './hooks/useLenis'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  useLenis()

  useEffect(() => {
    if (!sessionStorage.getItem('demo_shown') && location.pathname === '/') {
      sessionStorage.setItem('demo_shown', 'true')
      navigate('/dashboard', { replace: true })
    }
  }, [location.pathname, navigate])

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen key="loader" finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <CustomCursor />
      {!isAdmin && <WhatsAppButton />}
      <BackToTop />
      <ScrollToTop />
      
      {!isAdmin && <Navbar />}
      
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isAdmin && <Footer />}
    </div>
  )
}
