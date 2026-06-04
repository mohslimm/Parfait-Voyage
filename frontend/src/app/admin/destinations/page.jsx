'use client';

import { useAdminStore } from '@/store/adminStore';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Plus, Grid, List, MapPin, MoreHorizontal, Copy, Edit, Trash2, ExternalLink, Star } from 'lucide-react';
import { ActionMenu } from '@/components/admin/ui/ActionMenu';
import { toast } from 'sonner';

export default function AdminDestinations() {
  const { destinations, toggleDestinationStatus, duplicateDestination, deleteDestination } = useAdminStore();
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.country.toLowerCase().includes(search.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-admin-text)]">Destinations</h1>
          <p className="text-sm text-[var(--color-admin-text-muted)] mt-1">Gérez votre catalogue de voyages.</p>
        </div>
        <Link 
          href="/admin/destinations/new"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)] text-black font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Ajouter Destination
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-[var(--color-admin-surface)] border border-[var(--color-admin-border)] rounded-xl p-4 flex flex-wrap gap-4 items-center justify-between shadow-card">
        <div className="flex gap-4 items-center flex-1">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-admin-text-faint)]" />
            <input 
              type="text" 
              placeholder="Rechercher une destination..." 
              className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 pl-9 pr-3 text-sm text-[var(--color-admin-text)] placeholder:text-[var(--color-admin-text-faint)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className="bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-sm text-[var(--color-admin-text)] outline-none hidden md:block">
            <option>Tous les continents</option>
            <option>Europe</option>
            <option>Asie</option>
            <option>Afrique</option>
          </select>
          <select className="bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-sm text-[var(--color-admin-text)] outline-none hidden lg:block">
            <option>Toutes les catégories</option>
            <option>Culturel</option>
            <option>Luxe</option>
          </select>
        </div>

        <div className="flex items-center gap-2 border-l border-[var(--color-admin-border)] pl-4">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'text-[var(--color-admin-text-muted)] hover:text-[var(--color-admin-text)]'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'text-[var(--color-admin-text-muted)] hover:text-[var(--color-admin-text)]'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredDestinations.map(dest => (
            <motion.div 
              key={dest.id}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}
              className={`bg-[var(--color-admin-surface)] border border-[var(--color-admin-border)] rounded-xl overflow-hidden flex flex-col transition-all ${dest.status === 'inactive' ? 'opacity-70 grayscale-[30%]' : ''}`}
            >
              <div className="relative h-48 w-full bg-[var(--color-admin-surface-2)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {dest.badge && (
                  <span className="absolute top-3 left-3 bg-[var(--color-accent)] text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {dest.badge}
                  </span>
                )}
                
                <div className="absolute top-3 right-3">
                  <ActionMenu items={[
                    { icon: Edit, label: 'Modifier', onClick: () => toast.info('Mode d\'édition') },
                    { icon: Copy, label: 'Dupliquer', onClick: () => { duplicateDestination(dest.id); toast.success('Dupliqué avec succès'); } },
                    { icon: ExternalLink, label: 'Prévisualiser', onClick: () => window.open(`/destinations/${dest.slug}`, '_blank') },
                    { separator: true },
                    { icon: Trash2, label: 'Supprimer', destructive: true, onClick: () => {
                      if (confirm('Voulez-vous supprimer définitivement cette destination ?')) {
                        deleteDestination(dest.id);
                        toast.success('Destination supprimée');
                      }
                    } },
                  ]} />
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white leading-tight">{dest.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5 text-white/80 text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>{dest.country}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        toggleDestinationStatus(dest.id);
                        toast.success(`Statut modifié`);
                      }}
                      className={`w-2 h-2 rounded-full ${dest.status === 'active' ? 'bg-green-500' : dest.status === 'inactive' ? 'bg-red-500' : 'bg-amber-500'}`}
                    ></button>
                    <span className="text-xs font-medium text-[var(--color-admin-text-muted)] capitalize">{dest.status}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[var(--color-accent)] font-semibold">
                    <Star className="w-3 h-3 fill-current" />
                    {dest.rating} ({dest.reviews})
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-admin-text-faint)]">Catégorie</span>
                    <span className="text-[var(--color-admin-text)]">{dest.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-admin-text-faint)]">Durée</span>
                    <span className="text-[var(--color-admin-text)]">{dest.duration} jours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-admin-text-faint)]">Réservations</span>
                    <span className="text-[var(--color-admin-text)] font-mono">{dest.totalBookings}</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-[var(--color-admin-border-2)] flex items-center justify-between">
                  <span className="text-[10px] text-[var(--color-admin-text-faint)] uppercase tracking-wide">Prix à partir de</span>
                  <span className="font-mono font-semibold text-lg text-[var(--color-admin-text)]">
                    {new Intl.NumberFormat('fr-DZ').format(dest.price)} DA
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="bg-[var(--color-admin-surface)] border border-[var(--color-admin-border)] rounded-xl shadow-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--color-admin-bg)]/50 text-[var(--color-admin-text-muted)] text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3 font-medium">Destination</th>
                <th className="px-5 py-3 font-medium">Catégorie</th>
                <th className="px-5 py-3 font-medium">Prix Min</th>
                <th className="px-5 py-3 font-medium">Durée</th>
                <th className="px-5 py-3 font-medium">Statut</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-admin-border)]">
              {filteredDestinations.map(dest => (
                <tr key={dest.id} className="hover:bg-[var(--color-admin-surface-3)] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={dest.image} alt={dest.name} className="w-10 h-10 rounded object-cover" />
                      <div>
                        <p className="font-medium text-[var(--color-admin-text)]">{dest.name}</p>
                        <p className="text-xs text-[var(--color-admin-text-muted)]">{dest.country}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[var(--color-admin-text-muted)]">{dest.category}</td>
                  <td className="px-5 py-3 font-mono text-[var(--color-admin-text)]">{new Intl.NumberFormat('fr-DZ').format(dest.price)} DA</td>
                  <td className="px-5 py-3 text-[var(--color-admin-text-muted)]">{dest.duration} jours</td>
                  <td className="px-5 py-3">
                    <button 
                      onClick={() => toggleDestinationStatus(dest.id)}
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        dest.status === 'active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                        dest.status === 'inactive' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                        'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {dest.status}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <ActionMenu items={[
                      { icon: Edit, label: 'Modifier', onClick: () => toast.info('Mode d\'édition') },
                      { icon: Copy, label: 'Dupliquer', onClick: () => duplicateDestination(dest.id) },
                      { separator: true },
                      { icon: Trash2, label: 'Supprimer', destructive: true, onClick: () => deleteDestination(dest.id) },
                    ]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
