'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';
import { toast } from 'sonner';

export default function AdminLogin() {
  const router = useRouter();
  const { setAuthenticated } = useAdminStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        setAuthenticated(true);
        toast.success('Connexion réussie');
        router.push('/admin');
      } else {
        toast.error(data.message || 'Identifiants incorrects');
        setLoading(false);
      }
    } catch (error) {
      toast.error('Erreur de connexion au serveur');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-admin-bg)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-accent)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-[var(--color-admin-surface)] border border-[var(--color-admin-border)] rounded-2xl p-8 shadow-2xl relative z-10">
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[var(--color-admin-surface-2)] rounded-2xl border border-[var(--color-admin-border-2)] flex items-center justify-center mb-4 shadow-inner">
              <Shield className="w-8 h-8 text-[var(--color-accent)]" />
            </div>
            <h1 className="font-display text-2xl font-bold text-[var(--color-admin-text)]">Accès Sécurisé</h1>
            <p className="text-sm text-[var(--color-admin-text-muted)] mt-1">Dashboard Administrateur Parfait Voyages</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--color-admin-text-muted)] ml-1">Adresse Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-admin-text-faint)]" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@parfaitvoyages.dz"
                  className="w-full bg-[var(--color-admin-bg)] border border-[var(--color-admin-border-2)] rounded-xl py-3 pl-10 pr-4 text-[var(--color-admin-text)] placeholder:text-[var(--color-admin-text-faint)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--color-admin-text-muted)] ml-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-admin-text-faint)]" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[var(--color-admin-bg)] border border-[var(--color-admin-border-2)] rounded-xl py-3 pl-10 pr-4 text-[var(--color-admin-text)] placeholder:text-[var(--color-admin-text-faint)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-[var(--color-admin-border-2)] bg-[var(--color-admin-bg)] accent-[var(--color-accent)] w-4 h-4" />
                <span className="text-xs text-[var(--color-admin-text-muted)]">Se souvenir de moi</span>
              </label>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-6 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)] text-black font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>Connexion <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[10px] text-[var(--color-admin-text-faint)]">
              IP enregistrée : 192.168.1.1 <br/>
              Tentatives sécurisées.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
