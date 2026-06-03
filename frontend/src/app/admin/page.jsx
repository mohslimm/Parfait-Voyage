"use client";
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BellRing, CheckCircle2, XCircle,
  Clock, Plane, Users, TrendingUp, RefreshCw, ChevronDown,
  Calendar, Phone, Mail, MapPin, Hash, AlertCircle, Lock, ArrowRight
} from 'lucide-react'
import { toast } from 'sonner'

// ─── Constants ────────────────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
const POLL_INTERVAL_MS = 15_000

const STATUS_MAP = {
  pending:   { label: 'En attente',  color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  Icon: Clock },
  confirmed: { label: 'Confirmée',   color: '#22c55e', bg: 'rgba(34,197,94,0.12)',   Icon: CheckCircle2 },
  cancelled: { label: 'Annulée',     color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   Icon: XCircle },
}

const STAGGER = {
  container: { animate: { transition: { staggerChildren: 0.06 } } },
  item: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
}

// ─── Helpers ──────────────────────────────────────────────────────
function fmtDate(iso) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('fr-DZ', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(iso))
}

function fmtDA(n) {
  return new Intl.NumberFormat('fr-DZ').format(n) + ' DA'
}

// ─── Sub-components ───────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color, delta }) {
  return (
    <motion.div
      variants={STAGGER.item}
      className="bg-[#0f0f20] border border-white/5 rounded-2xl p-6 flex items-start gap-4"
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
        <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-white/40 text-xs font-body uppercase tracking-wider mb-1">{label}</p>
        <p className="text-white font-display text-2xl font-bold">{value}</p>
        {delta !== undefined && (
          <p className="text-xs font-body mt-1" style={{ color: delta >= 0 ? '#22c55e' : '#ef4444' }}>
            {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)} nouvelles aujourd'hui
          </p>
        )}
      </div>
    </motion.div>
  )
}

function StatusBadge({ status }) {
  const s = STATUS_MAP[status] ?? STATUS_MAP.pending
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-body"
      style={{ color: s.color, background: s.bg }}
    >
      <s.Icon className="w-3 h-3" strokeWidth={2} />
      {s.label}
    </span>
  )
}

function StatusSelect({ bookingId, current, onUpdate }) {
  const [loading, setLoading] = useState(false)
  const statuses = ['pending', 'confirmed', 'cancelled']

  const handle = async (newStatus) => {
    if (newStatus === current) return
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      const data = await res.json()
      if (data.success) {
        onUpdate(bookingId, newStatus)
        toast.success('Statut mis à jour', { description: STATUS_MAP[newStatus].label })
      } else {
        toast.error('Erreur lors de la mise à jour')
      }
    } catch {
      toast.error('Impossible de joindre le serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <select
        value={current}
        disabled={loading}
        onChange={(e) => handle(e.target.value)}
        className="appearance-none text-xs font-semibold font-body px-3 py-1.5 pr-7 rounded-xl border transition-all cursor-pointer outline-none disabled:opacity-50"
        style={{
          color: STATUS_MAP[current]?.color ?? '#fff',
          background: STATUS_MAP[current]?.bg ?? 'rgba(255,255,255,0.05)',
          borderColor: STATUS_MAP[current]?.color ? STATUS_MAP[current].color + '40' : 'rgba(255,255,255,0.1)',
        }}
      >
        {statuses.map((s) => (
          <option key={s} value={s} style={{ background: '#0f0f20', color: '#f0ede8' }}>
            {STATUS_MAP[s].label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: STATUS_MAP[current]?.color }} />
    </div>
  )
}

function BookingRow({ booking, onUpdate }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      variants={STAGGER.item}
      layout
      className="bg-[#0f0f20] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10"
    >
      {/* Main row */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left p-5 flex items-center gap-4 flex-wrap"
      >
        <div className="w-10 h-10 rounded-xl bg-[#c5a059]/10 flex items-center justify-center flex-shrink-0">
          <Plane className="w-4 h-4 text-[#c5a059]" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-body font-semibold text-white text-sm">
              {booking.firstName} {booking.lastName}
            </p>
            <StatusBadge status={booking.status} />
          </div>
          <p className="text-white/40 text-xs font-body mt-0.5">
            {booking.destination} · {fmtDate(booking.date)} · {booking.passengers} passager{booking.passengers > 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-4 ml-auto flex-shrink-0">
          <StatusSelect bookingId={booking._id} current={booking.status} onUpdate={onUpdate} />
          <p className="font-mono text-[#c5a059] text-sm font-bold hidden sm:block">
            {fmtDA(booking.passengers * 185000)}
          </p>
          <ChevronDown
            className="w-4 h-4 text-white/30 transition-transform duration-300"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </div>
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-white/5"
          >
            <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { Icon: Mail,     label: 'Email',       value: booking.email },
                { Icon: Phone,    label: 'Téléphone',   value: booking.phone },
                { Icon: MapPin,   label: 'Destination', value: booking.destination },
                { Icon: Calendar, label: 'Date départ', value: fmtDate(booking.date) },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-white/40" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs font-body">{label}</p>
                    <p className="text-white/80 text-sm font-body font-medium">{value || '—'}</p>
                  </div>
                </div>
              ))}
            </div>
            {booking.message && (
              <div className="px-5 pb-5">
                <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                  <p className="text-white/30 text-xs font-body mb-1">Message</p>
                  <p className="text-white/70 text-sm font-body">{booking.message}</p>
                </div>
              </div>
            )}
            <div className="px-5 pb-4">
              <p className="text-white/20 text-xs font-mono">
                Créé le {fmtDate(booking.createdAt)} · ID: {booking._id}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────
export default function AdminDashboard() {
  const [isAuthenticated, setIsAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)

  const [bookings, setBookings] = useState([])
  const [status, setStatus] = useState('loading')
  const [filter, setFilter] = useState('all')
  const [lastCount, setLastCount] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  // Check session on mount
  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsAuth(true)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    // Simple frontend protection for now
    if (password === 'admin' || password === 'admin123') {
      sessionStorage.setItem('admin_auth', 'true')
      setIsAuth(true)
      setLoginError(false)
      toast.success('Bienvenue', { description: 'Connexion réussie au dashboard.' })
    } else {
      setLoginError(true)
      toast.error('Accès refusé', { description: 'Mot de passe incorrect.' })
    }
  }

  const fetchBookings = useCallback(async (silent = false) => {
    if (!silent) setStatus('loading')
    else setRefreshing(true)

    try {
      const res = await fetch(`${API_BASE}/api/bookings`)
      const data = await res.json()
      if (data.success) {
        const newBookings = data.bookings
        // Notify if there are new reservations since last poll
        if (silent && newBookings.length > lastCount) {
          const diff = newBookings.length - lastCount
          toast('🔔 Nouvelle réservation !', {
            description: `${diff} nouvelle${diff > 1 ? 's' : ''} demande${diff > 1 ? 's' : ''} reçue${diff > 1 ? 's' : ''}.`,
            duration: 8000,
          })
        }
        setBookings(newBookings)
        setLastCount(newBookings.length)
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setRefreshing(false)
    }
  }, [lastCount])

  // Initial fetch
  useEffect(() => {
    if (isAuthenticated) fetchBookings(false)
  }, [isAuthenticated, fetchBookings])

  // Polling for real-time notifications
  useEffect(() => {
    if (!isAuthenticated) return
    const id = setInterval(() => fetchBookings(true), POLL_INTERVAL_MS)
    return () => clearInterval(id)
  }, [isAuthenticated, fetchBookings])

  const handleStatusUpdate = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
    )
  }

  // Stats
  const pending   = bookings.filter((b) => b.status === 'pending').length
  const confirmed = bookings.filter((b) => b.status === 'confirmed').length
  const cancelled = bookings.filter((b) => b.status === 'cancelled').length
  const todayCount = bookings.filter((b) => {
    const d = new Date(b.createdAt)
    const today = new Date()
    return d.toDateString() === today.toDateString()
  }).length

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060610] flex items-center justify-center p-6 relative overflow-hidden" style={{ fontFamily: 'Outfit, sans-serif' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#0a0a14] border border-white/10 p-10 rounded-[32px] shadow-2xl relative z-10"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#c5a059]/10 flex items-center justify-center mb-8 mx-auto">
            <Lock className="w-8 h-8 text-[#c5a059]" strokeWidth={1.5} />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Accès Restreint
            </h1>
            <p className="text-white/40 text-sm">
              Veuillez vous identifier pour accéder au dashboard administrateur de Parfait Voyage.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
                className={`w-full px-5 py-4 bg-[#0f0f20] border ${loginError ? 'border-[#ef4444]' : 'border-white/10'} rounded-2xl focus:outline-none focus:border-[#c5a059] transition-all text-white placeholder:text-white/20`}
                placeholder="••••••••"
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-4 bg-[#c5a059] text-[#1A1200] rounded-2xl font-bold text-sm hover:bg-[#e8c77a] transition-all flex items-center justify-center gap-2 group"
            >
              Déverrouiller
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#060610] text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
      {/* Header */}
      <div className="border-b border-white/5 bg-[#0a0a14]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059]/15 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-[#c5a059]" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-white font-semibold text-base leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Dashboard Admin
              </h1>
              <p className="text-white/30 text-xs font-body">Parfait Voyage</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {pending > 0 && (
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-full"
              >
                <BellRing className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span className="text-[#f59e0b] text-xs font-semibold">{pending} en attente</span>
              </motion.div>
            )}
            <button
              onClick={() => fetchBookings(false)}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-body transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* Stats */}
        <motion.div
          variants={STAGGER.container}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard icon={Plane}       label="Total réservations"  value={bookings.length} color="#c5a059" delta={todayCount} />
          <StatCard icon={Clock}       label="En attente"          value={pending}          color="#f59e0b" />
          <StatCard icon={CheckCircle2} label="Confirmées"         value={confirmed}        color="#22c55e" />
          <StatCard icon={XCircle}     label="Annulées"            value={cancelled}        color="#ef4444" />
        </motion.div>

        {/* Filters + List */}
        <div className="space-y-4">
          {/* Filter tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { key: 'all',       label: 'Toutes',     count: bookings.length },
              { key: 'pending',   label: 'En attente', count: pending },
              { key: 'confirmed', label: 'Confirmées', count: confirmed },
              { key: 'cancelled', label: 'Annulées',   count: cancelled },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="px-4 py-2 rounded-xl text-sm font-body font-medium transition-all flex items-center gap-2"
                style={{
                  background: filter === key ? 'rgba(197,160,89,0.15)' : 'rgba(255,255,255,0.04)',
                  color: filter === key ? '#c5a059' : 'rgba(240,237,232,0.45)',
                  border: `1px solid ${filter === key ? 'rgba(197,160,89,0.3)' : 'rgba(255,255,255,0.07)'}`,
                }}
              >
                {label}
                <span className="text-xs px-1.5 py-0.5 rounded-md bg-white/5">{count}</span>
              </button>
            ))}
          </div>

          {/* Booking list */}
          {status === 'loading' && (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 bg-[#0f0f20] rounded-2xl animate-pulse" />
              ))}
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#ef4444]/10 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-[#ef4444]" strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold font-body mb-1">Impossible de charger les réservations</p>
                <p className="text-white/40 text-sm font-body">Vérifiez que le backend est démarré sur le port 5000.</p>
              </div>
              <button
                onClick={() => fetchBookings(false)}
                className="px-6 py-2.5 bg-[#c5a059] text-[#1A1200] rounded-xl font-semibold font-body text-sm hover:bg-[#e8c77a] transition-colors"
              >
                Réessayer
              </button>
            </div>
          )}

          {status === 'success' && filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Plane className="w-7 h-7 text-white/20" strokeWidth={1.5} />
              </div>
              <p className="text-white/50 font-body">Aucune réservation dans cette catégorie.</p>
            </div>
          )}

          {status === 'success' && filtered.length > 0 && (
            <motion.div
              variants={STAGGER.container}
              initial="initial"
              animate="animate"
              className="space-y-3"
            >
              {filtered.map((booking) => (
                <BookingRow key={booking._id} booking={booking} onUpdate={handleStatusUpdate} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
