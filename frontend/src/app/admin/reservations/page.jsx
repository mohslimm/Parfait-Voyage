'use client';

import { useAdminStore } from '@/store/adminStore';
import { DataTable } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { ActionMenu } from '@/components/admin/ui/ActionMenu';
import { ReservationDetailsModal } from '@/components/admin/ui/ReservationDetailsModal';
import { Eye, Edit, Phone, MessageCircle, Printer, Download, Trash2, CalendarX, Mail, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function AdminReservations() {
  const router = useRouter();
  const { reservations, updateReservationStatus, deleteReservation } = useAdminStore();
  const [search, setSearch] = useState('');
  const [selectedResDetails, setSelectedResDetails] = useState(null);

  const filteredData = reservations.filter(res => 
    res.ref.toLowerCase().includes(search.toLowerCase()) || 
    res.client.firstName.toLowerCase().includes(search.toLowerCase()) ||
    res.client.lastName.toLowerCase().includes(search.toLowerCase()) ||
    res.destination.name.toLowerCase().includes(search.toLowerCase())
  );

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
      accessorKey: 'ref',
      header: 'Référence',
      cell: ({ row }) => (
        <button 
          className="font-mono text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors cursor-copy"
          onClick={() => { navigator.clipboard.writeText(row.original.ref); toast.success('Copié !') }}
          title="Cliquer pour copier"
        >
          {row.original.ref}
        </button>
      )
    },
    {
      accessorKey: 'client',
      header: 'Client',
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-900 to-slate-800 flex items-center justify-center text-white text-xs font-bold font-mono shrink-0">
            {row.original.client.firstName.charAt(0)}{row.original.client.lastName.charAt(0)}
          </div>
          <div>
            <p className="text-[var(--color-admin-text)] text-sm font-medium">
              {row.original.client.firstName} {row.original.client.lastName}
            </p>
            <p className="text-[var(--color-admin-text-muted)] text-[10px]">{row.original.client.email}</p>
          </div>
        </div>
      )
    },
    {
      accessorKey: 'destination',
      header: 'Destination',
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-medium text-[var(--color-admin-text)]">{row.original.destination.name}</p>
          <p className="text-[10px] text-[var(--color-admin-text-muted)]">{row.original.destination.country}</p>
        </div>
      )
    },
    {
      accessorKey: 'departureDate',
      header: 'Départ',
      cell: ({ getValue }) => (
        <span className="text-sm text-[var(--color-admin-text)]">
          {new Date(getValue()).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      ),
    },
    {
      accessorKey: 'totalPrice',
      header: 'Total',
      cell: ({ getValue }) => (
        <span className="font-mono font-semibold text-[var(--color-admin-text)]">
          {new Intl.NumberFormat('fr-DZ').format(getValue())} DA
        </span>
      )
    },
    {
      accessorKey: 'status',
      header: 'Statut',
      cell: ({ row }) => (
        <StatusBadge 
          status={row.original.status} 
          variant="pill"
          interactive  
          onStatusChange={(newStatus) => {
            updateReservationStatus(row.original.id, newStatus, 'Status changé depuis la table');
            toast.success(`Statut mis à jour: ${newStatus}`);
          }}
        />
      )
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <ActionMenu items={[
          { icon: Eye, label: 'Voir détails', onClick: () => setSelectedResDetails(row.original) },
          { icon: Edit, label: 'Modifier statut', onClick: () => toast.info('Sélectionnez le statut directement dans la colonne de gauche') },
          { separator: true },
          { icon: Phone, label: 'Contacter client', onClick: () => window.location.href = `tel:${row.original.client.phone || '+213555555555'}` },
          { icon: MessageCircle, label: 'WhatsApp', onClick: () => window.open(`https://wa.me/${(row.original.client.phone || '+213555555555').replace(/[^0-9]/g, '')}`, '_blank') },
          { icon: Mail, label: 'Envoyer email', onClick: () => window.location.href = `mailto:${row.original.client.email}` },
          { separator: true },
          { icon: Trash2, label: 'Supprimer', destructive: true, onClick: () => {
            if (confirm('Voulez-vous supprimer ?')) {
              deleteReservation(row.original.id);
              toast.success('Réservation supprimée');
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
          <h1 className="font-display text-2xl font-bold text-[var(--color-admin-text)]">Réservations</h1>
          <p className="text-sm text-[var(--color-admin-text-muted)] mt-1">Gérez l'ensemble des réservations.</p>
        </div>
        <button 
          onClick={() => router.push('/admin/reservations/new')}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)] text-black font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Nouvelle Réservation
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-[var(--color-admin-surface)] border border-[var(--color-admin-border)] rounded-xl p-4 flex flex-wrap gap-4 items-center justify-between shadow-card">
        <div className="flex gap-4 items-center flex-1">
          <input 
            type="text" 
            placeholder="Rechercher par réf, client..." 
            className="w-full max-w-sm bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-sm text-[var(--color-admin-text)] placeholder:text-[var(--color-admin-text-faint)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 border border-[var(--color-admin-border-2)] text-sm rounded-lg text-[var(--color-admin-text)] hover:bg-[var(--color-admin-surface-2)]">
            Statut
          </button>
          <button className="px-3 py-2 border border-[var(--color-admin-border-2)] text-sm rounded-lg text-[var(--color-admin-text)] hover:bg-[var(--color-admin-surface-2)]">
            Période
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={filteredData} />
      
      <ReservationDetailsModal 
        isOpen={!!selectedResDetails} 
        onClose={() => setSelectedResDetails(null)} 
        reservation={selectedResDetails} 
      />
    </div>
  );
}
