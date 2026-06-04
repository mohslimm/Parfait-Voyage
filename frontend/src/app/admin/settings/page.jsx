'use client';

import { useState } from 'react';
import { Save, Building2, Bell, Shield, Palette, Mail, Phone, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('agency');
  const [testEmail, setTestEmail] = useState('Mohslimm2001@gmail.com');

  const tabs = [
    { id: 'agency', label: 'Infos Agence', icon: Building2 },
    { id: 'contact', label: 'Contact & Réseaux', icon: Phone },
    { id: 'bookings', label: 'Réservations', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité & Accès', icon: Shield },
    { id: 'appearance', label: 'Apparence', icon: Palette },
  ];

  const handleSave = () => {
    toast.success('Paramètres enregistrés avec succès');
  };

  return (
    <div className="flex flex-col gap-6 pb-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-admin-text)]">Paramètres</h1>
          <p className="text-sm text-[var(--color-admin-text-muted)] mt-1">Gérez la configuration générale de votre agence.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)] text-black font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity"
        >
          <Save className="w-4 h-4" /> Enregistrer les modifications
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-4">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeTab === tab.id 
                    ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20' 
                    : 'text-[var(--color-admin-text-muted)] hover:bg-[var(--color-admin-surface-3)] hover:text-[var(--color-admin-text)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[var(--color-admin-surface)] border border-[var(--color-admin-border)] rounded-xl p-6 md:p-8 shadow-card min-h-[500px]">
          
          {activeTab === 'agency' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-admin-text)] mb-4">Informations Générales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-[var(--color-admin-text-muted)]">Nom de l'agence</label>
                    <input type="text" defaultValue="Parfait Voyages" className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-[var(--color-admin-text-muted)]">Slogan</label>
                    <input type="text" defaultValue="Créateurs de souvenirs inoubliables" className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-[var(--color-admin-text-muted)]">Description</label>
                    <textarea rows="4" className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none">Agence de voyages premium basée en Algérie, spécialisée dans les séjours sur mesure et les voyages d'exception.</textarea>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-[var(--color-admin-border-2)]">
                <h2 className="text-lg font-semibold text-[var(--color-admin-text)] mb-4">Localisation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-[var(--color-admin-text-muted)]">Adresse du siège</label>
                    <input type="text" defaultValue="15 Rue de l'Émir Abdelkader, Alger Centre" className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-[var(--color-admin-text-muted)]">Wilaya principale</label>
                    <input type="text" defaultValue="Alger (16)" className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-[var(--color-admin-text-muted)]">Régions desservies</label>
                    <input type="text" defaultValue="Toute l'Algérie" className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-lg font-semibold text-[var(--color-admin-text)] mb-4">Préférences de Notifications</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[var(--color-admin-surface-2)] rounded-lg border border-[var(--color-admin-border-2)]">
                  <div>
                    <h3 className="text-sm font-medium text-[var(--color-admin-text)]">Nouvelle réservation</h3>
                    <p className="text-xs text-[var(--color-admin-text-muted)] mt-1">Recevoir un email dès qu'un client effectue une réservation</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[var(--color-admin-surface-3)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-accent)]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[var(--color-admin-surface-2)] rounded-lg border border-[var(--color-admin-border-2)]">
                  <div>
                    <h3 className="text-sm font-medium text-[var(--color-admin-text)]">Réservations en attente prolongée</h3>
                    <p className="text-xs text-[var(--color-admin-text-muted)] mt-1">Alerte si une réservation est en attente depuis plus de 24h</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[var(--color-admin-surface-3)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-accent)]"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[var(--color-admin-surface-2)] rounded-lg border border-[var(--color-admin-border-2)]">
                  <div>
                    <h3 className="text-sm font-medium text-[var(--color-admin-text)]">Nouveau client inscrit</h3>
                    <p className="text-xs text-[var(--color-admin-text-muted)] mt-1">Notification dashboard pour chaque nouveau compte créé</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-[var(--color-admin-surface-3)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-accent)]"></div>
                  </label>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--color-admin-border-2)] space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-admin-text)]">Email de réception des alertes</h3>
                  <p className="text-xs text-[var(--color-admin-text-muted)] mt-1">
                    C'est l'adresse email exacte où vous recevrez toutes les notifications cochées ci-dessus.
                  </p>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    value={testEmail} 
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="w-full max-w-md bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" 
                  />
                  <button 
                    onClick={() => {
                      if (!testEmail) {
                        toast.error('Veuillez entrer une adresse email');
                        return;
                      }
                      
                      toast.promise(
                        fetch('http://localhost:5000/api/settings/test-email', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email: testEmail })
                        }).then(async (res) => {
                          const data = await res.json();
                          if (!data.success) throw new Error(data.message);
                          return data;
                        }),
                        {
                          loading: 'Envoi du test en cours...',
                          success: 'Email de test envoyé avec succès !',
                          error: (err) => err.message || 'Erreur lors de l\'envoi'
                        }
                      );
                    }}
                    className="px-4 py-2 bg-[var(--color-admin-surface-3)] text-[var(--color-admin-text)] rounded-lg hover:bg-[var(--color-admin-surface-2)] text-sm transition-colors"
                  >
                    Envoyer un test
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {(activeTab !== 'agency' && activeTab !== 'notifications') && (
            <div className="h-full flex items-center justify-center flex-col text-[var(--color-admin-text-muted)] min-h-[300px]">
              <Shield className="w-12 h-12 mb-4 opacity-20" />
              <p>Module en cours de développement</p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
