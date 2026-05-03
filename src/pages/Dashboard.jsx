import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { formatDA } from '../utils/formatDA'
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants'
import { getImg } from '../utils/unsplash'

const STATUS_COLORS = {
  confirmé: { bg: '#006233/10', text: '#006233', label: 'Confirmé' },
  terminé:  { bg: '#C9A96E/10', text: '#a8834a', label: 'Terminé' },
  annulé:   { bg: '#D21034/10', text: '#D21034', label: 'Annulé' },
}

export default function Dashboard() {
  const { user, isLogged, bookings, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedBooking, setSelectedBooking] = useState(null)

  if (!isLogged) return <Navigate to="/login" replace />

  const upcoming  = bookings.filter((b) => b.status === 'confirmé')
  const completed = bookings.filter((b) => b.status === 'terminé')

  const TABS = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
    { id: 'bookings', label: 'Réservations', icon: '✈️' },
    { id: 'catalog',  label: 'Catalogue', icon: '📦' },
    { id: 'messages', label: 'Messages', icon: '📩' },
    { id: 'settings', label: 'Mon Profil', icon: '⚙️' },
  ]

  // Mock data for Admin sections
  const mockDestinations = [
    { id: 1, name: 'Dubaï, UAE', price: 285000, status: 'Active', bookings: 42 },
    { id: 2, name: 'Maldives', price: 450000, status: 'Active', bookings: 18 },
    { id: 3, name: 'Paris, France', price: 195000, status: 'Pause', bookings: 25 },
  ]

  const mockMessages = [
    { id: 1, from: 'Amine K.', subject: 'Demande VIP Maldives', date: 'Il y a 2h', status: 'Nouveau' },
    { id: 2, from: 'Sarah L.', subject: 'Question Visa France', date: 'Hier', status: 'Lu' },
  ]

  return (
    <div className="flex min-h-screen bg-[#FAF7F2]">
      {/* ─── MODAL: BOOKING DETAILS ──────── */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12"
          >
            <div className="absolute inset-0 bg-[#0A0A0F]/90 backdrop-blur-xl" onClick={() => setSelectedBooking(null)} />
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
            >
              {/* Left Side: Destination Preview */}
              <div className="w-full lg:w-2/5 relative h-48 lg:h-auto">
                 <img src={getImg(selectedBooking.destination, 800, 1200)} className="w-full h-full object-cover" alt="" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#006233] to-transparent opacity-60" />
                 <div className="absolute bottom-8 left-8 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 text-white/70">Dossier de Voyage</p>
                    <h2 className="text-3xl font-display font-bold">{selectedBooking.destination}</h2>
                 </div>
              </div>

              {/* Right Side: Details */}
              <div className="flex-1 p-8 lg:p-12 overflow-y-auto custom-scrollbar">
                 <div className="flex justify-between items-start mb-10">
                    <div>
                       <span className="text-[10px] font-bold text-[#0A0A0F]/30 uppercase tracking-[0.4em] mb-2 block">Référence</span>
                       <p className="font-mono font-bold text-[#0A0A0F]">{selectedBooking.ref}</p>
                    </div>
                    <button onClick={() => setSelectedBooking(null)} className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center hover:bg-red-50 text-[#0A0A0F]/40 hover:text-red-500 transition-all">✕</button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Client Info */}
                    <div className="space-y-6">
                       <h3 className="text-xs font-bold uppercase tracking-widest text-[#006233]">Informations Client</h3>
                       <div className="space-y-4">
                          <div>
                             <p className="text-[10px] text-[#0A0A0F]/40 uppercase font-bold tracking-widest mb-1">Passager Principal</p>
                             <p className="font-display font-bold text-[#0A0A0F]">{user.name}</p>
                          </div>
                          <div>
                             <p className="text-[10px] text-[#0A0A0F]/40 uppercase font-bold tracking-widest mb-1">Téléphone</p>
                             <a href="tel:+213555123456" className="font-body font-bold text-[#006233] hover:underline">+213 555 123 456</a>
                          </div>
                          <div>
                             <p className="text-[10px] text-[#0A0A0F]/40 uppercase font-bold tracking-widest mb-1">Email</p>
                             <p className="font-body text-[#0A0A0F]">{user.email}</p>
                          </div>
                       </div>
                    </div>

                    {/* Payment Info */}
                    <div className="space-y-6">
                       <h3 className="text-xs font-bold uppercase tracking-widest text-[#006233]">Paiement & Statut</h3>
                       <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8E2D9]/50">
                          <div className="flex justify-between mb-4">
                             <span className="text-[10px] text-[#0A0A0F]/40 font-bold uppercase">Méthode</span>
                             <span className="text-[10px] text-[#006233] font-bold uppercase">BaridiMob / CCP</span>
                          </div>
                          <div className="flex justify-between mb-4">
                             <span className="text-[10px] text-[#0A0A0F]/40 font-bold uppercase">Montant</span>
                             <span className="font-mono font-bold text-[#0A0A0F]">{formatDA(selectedBooking.totalPrice)}</span>
                          </div>
                          <div className="pt-4 border-t border-[#E8E2D9] flex justify-between items-center">
                             <span className="text-[10px] text-[#0A0A0F]/40 font-bold uppercase">Statut</span>
                             <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                                selectedBooking.status === 'confirmé' ? 'bg-[#006233] text-white' : 'bg-[#C9A96E] text-white'
                             }`}>
                                {selectedBooking.status}
                             </span>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Travel Details */}
                 <div className="mt-12 pt-10 border-t border-[#E8E2D9]">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#006233] mb-6">Détails du Séjour</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                       <div>
                          <p className="text-[10px] text-[#0A0A0F]/40 uppercase font-bold tracking-widest mb-1">Départ</p>
                          <p className="font-body font-bold text-[#0A0A0F] text-sm">{selectedBooking.departure}</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-[#0A0A0F]/40 uppercase font-bold tracking-widest mb-1">Retour</p>
                          <p className="font-body font-bold text-[#0A0A0F] text-sm">{selectedBooking.returnDate}</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-[#0A0A0F]/40 uppercase font-bold tracking-widest mb-1">Voyageurs</p>
                          <p className="font-body font-bold text-[#0A0A0F] text-sm">{selectedBooking.travelers} Adulte(s)</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-[#0A0A0F]/40 uppercase font-bold tracking-widest mb-1">Compagnie</p>
                          <p className="font-body font-bold text-[#0A0A0F] text-sm">{selectedBooking.airline}</p>
                       </div>
                    </div>
                 </div>

                 <div className="mt-12 flex gap-4">
                    <button className="flex-1 py-4 bg-[#0A0A0F] text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#006233] transition-all">Imprimer le Voucher</button>
                    <button className="px-8 py-4 border border-[#E8E2D9] text-[#0A0A0F]/60 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#FAF7F2] transition-all">Annuler Dossier</button>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIDEBAR ─────────────────────── */}
      <aside className="w-80 bg-[#0A0A0F] hidden lg:flex flex-col border-r border-white/5 p-8 fixed h-full z-20">
        <div className="mb-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006233] to-[#004d27] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-white text-lg tracking-tight">Parfait</span>
              <span className="font-display text-[#C9A96E] text-[8px] tracking-[0.3em] uppercase">Voyages</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white shadow-xl'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`text-xl ${activeTab === tab.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>{tab.icon}</span>
              <span className="font-body font-bold text-sm tracking-wide">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div layoutId="tab-active" className="ml-auto w-1.5 h-1.5 rounded-full bg-[#006233]" />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-4 px-4">
            <div className="w-10 h-10 rounded-xl bg-[#C9A96E] flex items-center justify-center text-white font-bold font-display">
              {user?.firstName?.[0] || 'V'}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-bold truncate">{user?.name}</p>
              <p className="text-[#006233] text-[9px] font-bold uppercase tracking-widest">Admin Agence</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm"
          >
            <span>🚪</span> Déconnexion
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ────────────────── */}
      <main className="flex-1 lg:ml-80">
        <div className="p-8 lg:p-16 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <p className="text-[#006233] text-xs font-bold uppercase tracking-[0.4em] mb-4">Tableau de Bord Administratif</p>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0A0A0F]">
                      Espace <span className="gradient-text-green">Gestion</span>
                    </h1>
                  </div>
                  <button className="px-8 py-4 bg-[#0A0A0F] text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#006233] transition-all shadow-2xl">
                    Exporter Rapport mensuel
                  </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Réservations', value: '142', icon: '📈', color: '#006233' },
                    { label: 'Chiffre d\'Affaires', value: '4.2M DA', icon: '💰', color: '#C9A96E', mono: true },
                    { label: 'Nouveaux Messages', value: '05', icon: '📩', color: '#0A0A0F' },
                    { label: 'Destinations Actives', value: '12', icon: '📍', color: '#D21034' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      variants={staggerItem}
                      className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-black/5 border border-[#E8E2D9]/50 group hover:border-[#006233]/30 transition-all"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                        {stat.icon}
                      </div>
                      <p className={`font-bold text-[#0A0A0F] ${stat.mono ? 'font-mono text-sm' : 'font-display text-2xl'}`}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-[#0A0A0F]/40 font-body mt-2 uppercase tracking-widest">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Latest Bookings Preview */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-display text-2xl font-bold text-[#0A0A0F]">Alertes Récentes</h2>
                    <button onClick={() => setActiveTab('bookings')} className="text-[#006233] text-xs font-bold uppercase tracking-widest hover:underline">
                      Tout gérer →
                    </button>
                  </div>
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking) => (
                      <BookingCard key={booking.ref} booking={booking} onClick={() => setSelectedBooking(booking)} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'bookings' && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div>
                  <p className="text-[#006233] text-xs font-bold uppercase tracking-[0.4em] mb-4">Opérations</p>
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0A0A0F]">
                    Suivi des <span className="gradient-text-green">Dossiers</span>
                  </h1>
                </div>

                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <BookingCard key={booking.ref} booking={booking} full onClick={() => setSelectedBooking(booking)} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'catalog' && (
              <motion.div
                key="catalog"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-12"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[#006233] text-xs font-bold uppercase tracking-[0.4em] mb-4">Inventaire</p>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0A0A0F]">Gestion <span className="gradient-text-green">Catalogue</span></h1>
                  </div>
                  <button className="px-6 py-3 bg-[#006233] text-white rounded-xl font-bold text-xs uppercase tracking-widest">+ Ajouter une offre</button>
                </div>

                <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-[#E8E2D9]/50">
                  <table className="w-full text-left">
                    <thead className="bg-[#FAF7F2] border-b border-[#E8E2D9]">
                      <tr>
                        <th className="px-8 py-5 text-[10px] font-bold text-[#0A0A0F]/40 uppercase tracking-widest">Destination</th>
                        <th className="px-8 py-5 text-[10px] font-bold text-[#0A0A0F]/40 uppercase tracking-widest">Prix (DA)</th>
                        <th className="px-8 py-5 text-[10px] font-bold text-[#0A0A0F]/40 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-5 text-[10px] font-bold text-[#0A0A0F]/40 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E2D9]">
                      {mockDestinations.map((d) => (
                        <tr key={d.id} className="group hover:bg-[#FAF7F2]/50 transition-colors">
                          <td className="px-8 py-6">
                            <p className="font-display font-bold text-[#0A0A0F]">{d.name}</p>
                            <p className="text-[10px] text-[#0A0A0F]/40">{d.bookings} réservations</p>
                          </td>
                          <td className="px-8 py-6 font-mono text-sm font-bold text-[#006233]">{formatDA(d.price)}</td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                              d.status === 'Active' ? 'bg-[#006233]/10 text-[#006233]' : 'bg-[#D21034]/10 text-[#D21034]'
                            }`}>
                              {d.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="text-[#C9A96E] hover:text-[#a8834a] font-bold text-xs mr-4 uppercase">Éditer</button>
                            <button className="text-[#0A0A0F]/30 hover:text-red-500 font-bold text-xs uppercase transition-colors">Supprimer</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div>
                  <p className="text-[#006233] text-xs font-bold uppercase tracking-[0.4em] mb-4">Communications</p>
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0A0A0F]">Boîte <span className="gradient-text-green">Réception</span></h1>
                </div>

                <div className="grid gap-4">
                  {mockMessages.map((m) => (
                    <div key={m.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-[#E8E2D9]/50 flex items-center justify-between group hover:border-[#006233]/30 transition-all">
                      <div className="flex items-center gap-6">
                         <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📩</div>
                         <div>
                            <div className="flex items-center gap-3 mb-1">
                               <h4 className="font-display font-bold text-[#0A0A0F]">{m.from}</h4>
                               {m.status === 'Nouveau' && <span className="bg-[#D21034] w-2 h-2 rounded-full" />}
                            </div>
                            <p className="text-sm font-body text-[#0A0A0F]/60">{m.subject}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-bold text-[#0A0A0F]/30 uppercase tracking-widest mb-2">{m.date}</p>
                         <button className="px-4 py-2 bg-[#0A0A0F] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#006233] transition-colors">Répondre</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl"
              >
                <p className="text-[#006233] text-xs font-bold uppercase tracking-[0.4em] mb-4">Profil & Sécurité</p>
                <h1 className="font-display text-4xl font-bold text-[#0A0A0F] mb-12">Mon <span className="gradient-text-green">Compte</span></h1>
                
                <div className="space-y-8 bg-white p-10 rounded-[3rem] shadow-xl border border-[#E8E2D9]/50">
                  <div className="flex items-center gap-6 pb-8 border-b border-[#E8E2D9]">
                    <div className="w-24 h-24 rounded-3xl bg-[#C9A96E] flex items-center justify-center text-4xl text-white font-bold font-display shadow-gold">
                      {user?.firstName?.[0]}
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-[#0A0A0F]">{user?.name}</h3>
                      <p className="text-[#0A0A0F]/50 font-body">{user?.email}</p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div>
                      <label className="text-[10px] font-bold text-[#0A0A0F]/30 uppercase tracking-widest block mb-2">Rôle</label>
                      <p className="font-body text-[#006233] font-bold">Administrateur Agence</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#0A0A0F]/30 uppercase tracking-widest block mb-2">Accès système</label>
                      <p className="font-body text-[#0A0A0F]">Complet (Full Access)</p>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-[#FAF7F2] text-[#0A0A0F] rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#E8E2D9] transition-all">
                    Paramètres Avancés
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

function BookingCard({ booking, full, onClick }) {
  const statusConfig = STATUS_COLORS[booking.status] || STATUS_COLORS.confirmé

  return (
    <motion.div
      variants={fadeInUp}
      onClick={onClick}
      className="bg-white rounded-[2.5rem] p-6 lg:p-8 shadow-xl shadow-black/5 border border-[#E8E2D9]/50 flex items-center gap-8 group hover:border-[#006233]/20 transition-all overflow-hidden relative cursor-pointer"
    >
      <div className="w-20 h-20 rounded-3xl overflow-hidden flex-shrink-0 relative">
        <img src={getImg(booking.destination.toLowerCase(), 400, 400)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={booking.destination} />
        <div className="absolute inset-0 bg-[#006233]/10" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-bold text-[#0A0A0F]/40 uppercase tracking-widest">{booking.ref}</span>
          <span
            className="text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest"
            style={{ backgroundColor: statusConfig.bg, color: statusConfig.text }}
          >
            {statusConfig.label}
          </span>
        </div>
        <h3 className="font-display text-xl font-bold text-[#0A0A0F] mb-1">{booking.destination}</h3>
        <p className="text-sm text-[#0A0A0F]/50 font-body">
          {booking.departure} — {booking.returnDate}
        </p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="font-mono font-bold text-[#006233] text-xl mb-1">{formatDA(booking.totalPrice)}</p>
        <div className="flex items-center justify-end gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center">
             <span className="text-[8px]">✈️</span>
          </div>
          <p className="text-[10px] text-[#0A0A0F]/40 font-bold uppercase tracking-widest">{booking.airline}</p>
        </div>
      </div>
    </motion.div>
  )
}
