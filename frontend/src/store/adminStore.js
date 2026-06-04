import { create } from 'zustand';
import { mockReservations, mockDestinations, mockClients } from '../data/adminMockData';

export const useAdminStore = create((set, get) => ({
  reservations: mockReservations,
  destinations: mockDestinations,
  clients: mockClients,
  
  // CRUD réservations
  updateReservationStatus: (id, status, note) => set(state => ({
    reservations: state.reservations.map(r => 
      r.id === id ? { 
        ...r, 
        status,
        updatedAt: new Date().toISOString(),
        statusHistory: [...r.statusHistory, { status, timestamp: new Date().toISOString(), note }]
      } : r
    )
  })),
  createReservation: (data) => set(state => ({
    reservations: [{ 
      id: `RES-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      ...data,
      createdAt: new Date().toISOString(),
      statusHistory: [{ status: 'pending', timestamp: new Date().toISOString(), note: 'Réservation créée' }]
    }, ...state.reservations]
  })),
  deleteReservation: (id) => set(state => ({
    reservations: state.reservations.filter(r => r.id !== id)
  })),
  
  // CRUD destinations
  createDestination: (data) => set(state => ({
    destinations: [...state.destinations, { id: state.destinations.length + 1, ...data }]
  })),
  updateDestination: (id, data) => set(state => ({
    destinations: state.destinations.map(d => d.id === id ? { ...d, ...data } : d)
  })),
  deleteDestination: (id) => set(state => ({
    destinations: state.destinations.filter(d => d.id !== id)
  })),
  toggleDestinationStatus: (id) => set(state => ({
    destinations: state.destinations.map(d => {
      if (d.id === id) {
        const newStatus = d.status === 'active' ? 'inactive' : 'active';
        return { ...d, status: newStatus };
      }
      return d;
    })
  })),
  duplicateDestination: (id) => set(state => {
    const destToDuplicate = state.destinations.find(d => d.id === id);
    if (!destToDuplicate) return state;
    return {
      destinations: [...state.destinations, { ...destToDuplicate, id: state.destinations.length + 1, name: `${destToDuplicate.name} (Copy)`, status: 'draft' }]
    };
  }),
  
  // CRUD clients
  createClient: (data) => set(state => ({
    clients: [{ ...data, id: `CLI-${state.clients.length + 1}` }, ...state.clients]
  })),
  updateClient: (id, data) => set(state => ({
    clients: state.clients.map(c => c.id === id ? { ...c, ...data } : c)
  })),
  deleteClient: (id) => set(state => ({
    clients: state.clients.filter(c => c.id !== id)
  })),
  updateClientNotes: (id, notes) => set(state => ({
    clients: state.clients.map(c => c.id === id ? { ...c, notes } : c)
  })),
  
  // UI state
  selectedReservations: [],
  setSelectedReservations: (ids) => set({ selectedReservations: ids }),
  clearSelection: () => set({ selectedReservations: [] }),
  
  sidebarCollapsed: false,
  toggleSidebar: () => set(state => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  
  // Auth state
  isAuthenticated: false,
  setAuthenticated: (status) => set({ isAuthenticated: status }),
}));
