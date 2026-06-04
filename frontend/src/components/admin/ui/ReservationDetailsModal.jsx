'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, MapPin, CreditCard, Clock, FileText } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export function ReservationDetailsModal({ isOpen, onClose, reservation }) {
  if (!reservation) return null;

  const { ref, client, destination, status, departureDate, returnDate, adults, children, totalPrice, createdAt, notes } = reservation;

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
            className="relative w-full max-w-3xl bg-[var(--color-admin-surface)] border border-[var(--color-admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-admin-border)] bg-[var(--color-admin-surface-2)]">
              <div>
                <h2 className="text-xl font-display font-bold text-[var(--color-admin-text)] flex items-center gap-3">
                  Réservation {ref}
                  <StatusBadge status={status} variant="pill" />
                </h2>
                <p className="text-xs text-[var(--color-admin-text-muted)] mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Créée le {new Date(createdAt).toLocaleString('fr-FR')}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-[var(--color-admin-surface-3)] rounded-lg transition-colors text-[var(--color-admin-text-muted)] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-8">
              
              {/* Grid 2 cols */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Client Info */}
                <div className="bg-[var(--color-admin-surface-2)] p-5 rounded-xl border border-[var(--color-admin-border-2)]">
                  <h3 className="text-sm font-bold text-[var(--color-accent)] mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" /> Client
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-[var(--color-admin-text-faint)] uppercase tracking-wider">Nom complet</p>
                      <p className="font-medium text-[var(--color-admin-text)]">{client.firstName} {client.lastName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[var(--color-admin-text-faint)] uppercase tracking-wider">Contact</p>
                      <p className="text-sm text-[var(--color-admin-text-muted)]">{client.email}</p>
                      <p className="text-sm text-[var(--color-admin-text-muted)]">{client.phone || 'Non renseigné'}</p>
                    </div>
                  </div>
                </div>

                {/* Voyage Info */}
                <div className="bg-[var(--color-admin-surface-2)] p-5 rounded-xl border border-[var(--color-admin-border-2)]">
                  <h3 className="text-sm font-bold text-[var(--color-accent)] mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Destination
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={destination.image} alt={destination.name} className="w-12 h-12 rounded object-cover" />
                      <div>
                        <p className="font-medium text-[var(--color-admin-text)]">{destination.name}</p>
                        <p className="text-[10px] text-[var(--color-admin-text-faint)]">{destination.country}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-[10px] text-[var(--color-admin-text-faint)] uppercase tracking-wider">Départ</p>
                        <p className="text-sm text-[var(--color-admin-text)]">{new Date(departureDate).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[var(--color-admin-text-faint)] uppercase tracking-wider">Retour</p>
                        <p className="text-sm text-[var(--color-admin-text)]">{new Date(returnDate).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Passagers & Prix */}
              <div className="bg-[var(--color-admin-surface-2)] p-5 rounded-xl border border-[var(--color-admin-border-2)]">
                <h3 className="text-sm font-bold text-[var(--color-accent)] mb-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Détails Tarifaires
                </h3>
                <div className="flex justify-between items-center pb-4 border-b border-[var(--color-admin-border-2)]">
                  <div>
                    <p className="text-[10px] text-[var(--color-admin-text-faint)] uppercase tracking-wider">Passagers</p>
                    <p className="text-sm text-[var(--color-admin-text)]">{adults} Adulte(s), {children} Enfant(s)</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="font-bold text-[var(--color-admin-text)] uppercase text-sm">Prix Total</span>
                  <span className="font-mono text-xl font-bold text-[#22c55e]">
                    {new Intl.NumberFormat('fr-DZ').format(totalPrice)} DA
                  </span>
                </div>
              </div>

              {/* Notes */}
              {notes && (
                <div className="bg-amber-500/10 p-5 rounded-xl border border-amber-500/20">
                  <h3 className="text-sm font-bold text-amber-500 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Notes de la réservation
                  </h3>
                  <p className="text-sm text-amber-200/80">{notes}</p>
                </div>
              )}

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
