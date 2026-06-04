'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, MapPin, Calendar, CreditCard, Tag } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';

export function ClientProfileModal({ isOpen, onClose, client }) {
  const { reservations } = useAdminStore();
  
  if (!client) return null;

  // Find reservations for this client
  const clientReservations = reservations.filter(r => r.client.id === client.id || r.client.email === client.email);
  const isVip = client.tags?.includes('VIP');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-[var(--color-admin-surface)] border border-[var(--color-admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-admin-border)] bg-[var(--color-admin-surface-2)]">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold font-mono shrink-0 ${isVip ? 'bg-gradient-to-br from-amber-500 to-amber-700' : 'bg-gradient-to-br from-indigo-900 to-slate-800'}`}>
                  {client.firstName.charAt(0)}{client.lastName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-[var(--color-admin-text)] flex items-center gap-2">
                    {client.firstName} {client.lastName}
                    {isVip && (
                      <span className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-[var(--color-accent)]/20">
                        VIP
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-[var(--color-admin-text-muted)] mt-1 font-mono">
                    {client.id}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-[var(--color-admin-surface-3)] rounded-lg transition-colors text-[var(--color-admin-text-muted)] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
              
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-[var(--color-admin-surface-2)] rounded-xl border border-[var(--color-admin-border-2)]">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-admin-bg)] flex items-center justify-center text-[var(--color-accent)] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-[var(--color-admin-text-faint)] uppercase tracking-wider">Email</p>
                    <p className="text-sm font-medium text-[var(--color-admin-text)] truncate">{client.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[var(--color-admin-surface-2)] rounded-xl border border-[var(--color-admin-border-2)]">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-admin-bg)] flex items-center justify-center text-[var(--color-accent)] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--color-admin-text-faint)] uppercase tracking-wider">Téléphone</p>
                    <p className="text-sm font-medium font-mono text-[var(--color-admin-text)]">{client.phone || 'Non renseigné'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[var(--color-admin-surface-2)] rounded-xl border border-[var(--color-admin-border-2)]">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-admin-bg)] flex items-center justify-center text-[var(--color-accent)] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--color-admin-text-faint)] uppercase tracking-wider">Ville</p>
                    <p className="text-sm font-medium text-[var(--color-admin-text)]">{client.city || 'Non renseignée'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[var(--color-admin-surface-2)] rounded-xl border border-[var(--color-admin-border-2)]">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-admin-bg)] flex items-center justify-center text-[var(--color-accent)] shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--color-admin-text-faint)] uppercase tracking-wider">Dernière activité</p>
                    <p className="text-sm font-medium text-[var(--color-admin-text)]">
                      {new Date(client.lastActivity).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-r from-[var(--color-admin-surface-2)] to-transparent p-5 rounded-xl border border-[var(--color-admin-border-2)] flex justify-between items-center">
                <div>
                  <p className="text-sm text-[var(--color-admin-text-muted)] flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[var(--color-accent)]" /> Total Dépensé
                  </p>
                  <p className="text-2xl font-mono font-bold text-[var(--color-admin-text)] mt-1">
                    {new Intl.NumberFormat('fr-DZ').format(client.totalSpent)} DA
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[var(--color-admin-text-muted)]">Réservations</p>
                  <p className="text-2xl font-bold text-[var(--color-admin-text)] mt-1">{client.totalReservations}</p>
                </div>
              </div>

              {/* Historique des réservations */}
              <div>
                <h3 className="text-sm font-bold text-[var(--color-admin-text)] mb-3">Historique des Réservations ({clientReservations.length})</h3>
                <div className="space-y-3">
                  {clientReservations.length === 0 ? (
                    <p className="text-sm text-[var(--color-admin-text-muted)] p-4 bg-[var(--color-admin-surface-2)] rounded-lg text-center border border-[var(--color-admin-border-2)]">
                      Aucune réservation trouvée pour ce client.
                    </p>
                  ) : (
                    clientReservations.map(res => (
                      <div key={res.id} className="flex items-center justify-between p-4 bg-[var(--color-admin-surface-2)] rounded-xl border border-[var(--color-admin-border-2)]">
                        <div className="flex items-center gap-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={res.destination?.image} alt="" className="w-10 h-10 rounded object-cover" />
                          <div>
                            <p className="text-sm font-medium text-[var(--color-admin-text)]">{res.destination?.name}</p>
                            <p className="text-xs text-[var(--color-admin-text-muted)] font-mono">{res.ref}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-[var(--color-admin-text)]">{new Intl.NumberFormat('fr-DZ').format(res.totalPrice)} DA</p>
                          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                            res.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 
                            res.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                            res.status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                            'bg-blue-500/10 text-blue-500'
                          }`}>
                            {res.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-[var(--color-admin-border)] bg-[var(--color-admin-surface)] flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-[var(--color-admin-surface-2)] hover:bg-[var(--color-admin-surface-3)] text-white text-sm font-medium rounded-lg transition-colors"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
