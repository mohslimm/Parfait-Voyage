import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockBookings } from '../data/bookings'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLogged: false,
      bookings: mockBookings,

      login: (data, password) => {
        // Handle both (email, pass) and ({email, name, ...}) patterns
        const email = typeof data === 'string' ? data : data.email
        const name = typeof data === 'object' && data.name ? data.name : (email ? email.split('@')[0].replace(/\./g, ' ') : 'Voyageur')
        
        const user = {
          id: 1,
          email: email || 'demo@voyage.dz',
          name: name,
          firstName: typeof data === 'object' && data.firstName ? data.firstName : name.split(' ')[0],
          avatar: null,
          memberSince: typeof data === 'object' && data.memberSince ? data.memberSince : '2024',
          phone: '+213 555 123 456',
        }
        set({ user, isLogged: true })
        return { success: true }
      },

      register: (data) => {
        const user = {
          id: Date.now(),
          email: data.email,
          name: `${data.firstName} ${data.lastName}`,
          firstName: data.firstName,
          avatar: null,
          memberSince: new Date().getFullYear().toString(),
          phone: data.phone || '',
        }
        set({ user, isLogged: true })
        return { success: true }
      },

      logout: () => set({ user: null, isLogged: false }),

      addBooking: (booking) =>
        set((state) => ({ bookings: [booking, ...state.bookings] })),
    }),
    {
      name: 'parfait-voyages-auth',
    }
  )
)
