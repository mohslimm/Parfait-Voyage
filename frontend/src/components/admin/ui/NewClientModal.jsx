'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, User, Mail, Phone, MapPin } from 'lucide-react';

export function NewClientModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    tags: 'Regular'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: [formData.tags],
      totalReservations: 0,
      totalSpent: 0,
      notes: '',
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    });
    setFormData({ firstName: '', lastName: '', email: '', phone: '', city: '', tags: 'Regular' });
    onClose();
  };

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
            className="relative w-full max-w-lg bg-[var(--color-admin-surface)] border border-[var(--color-admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-admin-border)] bg-[var(--color-admin-surface-2)]">
              <div>
                <h2 className="text-xl font-display font-bold text-[var(--color-admin-text)]">
                  Nouveau Client
                </h2>
                <p className="text-xs text-[var(--color-admin-text-muted)] mt-1">
                  Ajouter un profil client à la base de données.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-[var(--color-admin-surface-3)] rounded-lg transition-colors text-[var(--color-admin-text-muted)] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex flex-col gap-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-[var(--color-admin-text-muted)] flex items-center gap-2">
                    <User className="w-4 h-4" /> Prénom
                  </label>
                  <input 
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[var(--color-admin-text-muted)] flex items-center gap-2">
                    <User className="w-4 h-4" /> Nom
                  </label>
                  <input 
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[var(--color-admin-text-muted)] flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </label>
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-[var(--color-admin-text-muted)] flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Téléphone
                  </label>
                  <input 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+213 555 000 000"
                    className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[var(--color-admin-text-muted)] flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Ville
                  </label>
                  <input 
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[var(--color-admin-text-muted)] flex items-center gap-2">
                  Tag
                </label>
                <select 
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none"
                >
                  <option value="Regular">Regular</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 mt-2 flex justify-end gap-3 border-t border-[var(--color-admin-border-2)]">
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-transparent text-[var(--color-admin-text-muted)] hover:text-white transition-colors text-sm font-medium"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-black text-sm font-bold rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" /> Enregistrer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
