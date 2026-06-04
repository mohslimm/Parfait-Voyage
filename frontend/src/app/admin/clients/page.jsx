'use client';

import { useAdminStore } from '@/store/adminStore';
import { DataTable } from '@/components/admin/ui/DataTable';
import { ActionMenu } from '@/components/admin/ui/ActionMenu';
import { NewClientModal } from '@/components/admin/ui/NewClientModal';
import { ClientProfileModal } from '@/components/admin/ui/ClientProfileModal';
import { Eye, Edit, Phone, MessageCircle, Mail, Trash2, CalendarX, Plus, Download } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AdminClients() {
  const { clients, deleteClient, createClient } = useAdminStore();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClientProfile, setSelectedClientProfile] = useState(null);

  const filteredData = clients.filter(c => 
    c.firstName.toLowerCase().includes(search.toLowerCase()) || 
    c.lastName.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const handleExportCSV = () => {
    if (filteredData.length === 0) {
      toast.error('Aucune donnée à exporter');
      return;
    }

    const headers = ['ID,Prénom,Nom,Email,Téléphone,Ville,Réservations,Dépensé,Tags'];
    const rows = filteredData.map(c => 
      `${c.id},${c.firstName},${c.lastName},${c.email},${c.phone},${c.city},${c.totalReservations},${c.totalSpent},"${c.tags?.join(', ')}"`
    );
    
    const csvContent = headers.concat(rows).join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' }); // \uFEFF pour l'UTF-8 dans Excel
    
    const link = document.createElement('url'); // dummy tag
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clients_parfait_voyages_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    
    URL.revokeObjectURL(url);
    toast.success('Export réussi');
  };

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          className="rounded border-[var(--color-admin-border-2)] bg-[var(--color-admin-bg)] accent-[var(--color-accent)] w-4 h-4 cursor-pointer"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="rounded border-[var(--color-admin-border-2)] bg-[var(--color-admin-bg)] accent-[var(--color-accent)] w-4 h-4 cursor-pointer"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      accessorKey: 'client',
      header: 'Client',
      cell: ({ row }) => {
        const isVip = row.original.tags?.includes('VIP');
        return (
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold font-mono shrink-0 ${isVip ? 'bg-gradient-to-br from-amber-500 to-amber-700' : 'bg-gradient-to-br from-indigo-900 to-slate-800'}`}>
              {row.original.firstName.charAt(0)}{row.original.lastName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-[var(--color-admin-text)] text-sm">
                  {row.original.firstName} {row.original.lastName}
                </p>
                {isVip && (
                  <span className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-[var(--color-accent)]/20">
                    VIP
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[var(--color-admin-text-muted)]">{row.original.id}</p>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ getValue }) => <span className="text-sm text-[var(--color-admin-text-muted)]">{getValue()}</span>
    },
    {
      accessorKey: 'phone',
      header: 'Téléphone',
      cell: ({ getValue }) => <span className="text-sm font-mono text-[var(--color-admin-text-muted)]">{getValue()}</span>
    },
    {
      accessorKey: 'city',
      header: 'Ville',
      cell: ({ getValue }) => <span className="text-sm text-[var(--color-admin-text)]">{getValue()}</span>
    },
    {
      accessorKey: 'totalReservations',
      header: 'Réservations',
      cell: ({ getValue }) => (
        <span className="text-sm font-semibold bg-[var(--color-admin-surface-2)] px-2 py-1 rounded text-[var(--color-admin-text)]">
          {getValue()}
        </span>
      )
    },
    {
      accessorKey: 'totalSpent',
      header: 'Total Dépensé',
      cell: ({ getValue, row }) => {
        const spent = getValue();
        const isHighValue = spent > 500000;
        return (
          <span className={`font-mono text-sm ${isHighValue ? 'font-semibold text-[var(--color-accent)]' : 'text-[var(--color-admin-text)]'}`}>
            {new Intl.NumberFormat('fr-DZ').format(spent)} DA
          </span>
        );
      }
    },
    {
      accessorKey: 'lastActivity',
      header: 'Dernière Activité',
      cell: ({ getValue }) => (
        <span className="text-[11px] text-[var(--color-admin-text-muted)]">
          {new Date(getValue()).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      )
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <ActionMenu items={[
          { icon: Eye, label: 'Voir profil complet', onClick: () => setSelectedClientProfile(row.original) },
          { icon: Plus, label: 'Nouvelle réservation', onClick: () => toast.info('Ouvrir modal de réservation') },
          { separator: true },
          { icon: Phone, label: 'Appeler', onClick: () => window.location.href = `tel:${row.original.phone}` },
          { icon: MessageCircle, label: 'WhatsApp', onClick: () => toast.info('Ouvrir WhatsApp') },
          { icon: Mail, label: 'Envoyer email', onClick: () => window.location.href = `mailto:${row.original.email}` },
          { separator: true },
          { icon: Trash2, label: 'Supprimer', destructive: true, onClick: () => {
            if (confirm(`Voulez-vous supprimer le client ${row.original.firstName} ?`)) {
              deleteClient(row.original.id);
              toast.success('Client supprimé');
            }
          } },
        ]} />
      )
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-admin-text)]">Clients</h1>
          <p className="text-sm text-[var(--color-admin-text-muted)] mt-1">Gérez votre base de données clients ({clients.length} total).</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] text-[var(--color-admin-text)] rounded-lg text-sm hover:bg-[var(--color-admin-surface-3)] transition-colors"
          >
            <Download className="w-4 h-4" /> Exporter
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)] text-black font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Nouveau client
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[var(--color-admin-surface)] border border-[var(--color-admin-border)] rounded-xl p-4 flex flex-wrap gap-4 items-center shadow-card">
        <div className="flex-1 min-w-[200px]">
          <input 
            type="text" 
            placeholder="Rechercher nom, email, téléphone..." 
            className="w-full max-w-md bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-sm text-[var(--color-admin-text)] placeholder:text-[var(--color-admin-text-faint)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-sm text-[var(--color-admin-text)] outline-none">
            <option>Ville</option>
            <option>Alger</option>
            <option>Oran</option>
          </select>
          <select className="bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-sm text-[var(--color-admin-text)] outline-none">
            <option>Tags</option>
            <option>VIP</option>
            <option>Regular</option>
          </select>
          <select className="bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-sm text-[var(--color-admin-text)] outline-none hidden sm:block">
            <option>Activité</option>
            <option>Récent</option>
            <option>Inactif</option>
          </select>
        </div>
      </div>

      <DataTable columns={columns} data={filteredData} />
      
      <NewClientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={(client) => {
          createClient(client);
          toast.success('Client ajouté avec succès');
        }}
      />

      <ClientProfileModal 
        isOpen={!!selectedClientProfile} 
        onClose={() => setSelectedClientProfile(null)} 
        client={selectedClientProfile} 
      />
    </div>
  );
}
