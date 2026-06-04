export const monthlyRevenue = [
  { month: 'Sep 2024', revenue: 2840000, bookings: 18, objectif: 3000000 },
  { month: 'Oct 2024', revenue: 3120000, bookings: 22, objectif: 3500000 },
  { month: 'Nov 2024', revenue: 3650000, bookings: 26, objectif: 3500000 },
  { month: 'Déc 2024', revenue: 4200000, bookings: 31, objectif: 4000000 },
  { month: 'Jan 2025', revenue: 3890000, bookings: 28, objectif: 4000000 },
  { month: 'Fév 2025', revenue: 4820000, bookings: 35, objectif: 4000000 },
];

export const mockClients = Array.from({ length: 200 }).map((_, i) => ({
  id: `CLI-${i + 1}`,
  firstName: ['Karim', 'Yasmine', 'Moussa', 'Amira', 'Rachid', 'Sonia', 'Ahmed', 'Fatima', 'Nassim'][i % 9],
  lastName: ['Benali', 'Djaber', 'Saidi', 'Brahimi', 'Khelil', 'Haddad', 'Mansouri', 'Ait', 'Belkacem'][i % 9],
  email: `client${i}@example.dz`,
  phone: `+213 555 ${Math.floor(100000 + Math.random() * 900000)}`,
  city: ['Alger', 'Oran', 'Constantine', 'Annaba', 'Setif', 'Tlemcen'][i % 6],
  totalReservations: Math.floor(Math.random() * 5),
  totalSpent: Math.floor(Math.random() * 1000000),
  tags: i % 10 === 0 ? ['VIP'] : ['Regular'],
  notes: '',
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  lastActivity: new Date(Date.now() - Math.random() * 1000000000).toISOString()
}));

export const mockDestinations = [
  {
    id: 1,
    slug: 'istanbul',
    name: 'Istanbul',
    country: 'Turquie',
    continent: 'Europe',
    category: 'Culturel',
    status: 'active',
    price: 185000,
    priceMax: 220000,
    image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa',
    imageLarge: 'https://images.unsplash.com/photo-1527838832700-5059252407fa',
    gallery: [],
    description: 'Découvrez la magie d\'Istanbul.',
    highlights: ['Mosquée Bleue', 'Grand Bazaar'],
    included: ['Vol', 'Hôtel', 'Transfert'],
    notIncluded: ['Assurance', 'Excursions extra'],
    itinerary: [],
    badge: 'Best-seller',
    featured: true,
    popular: true,
    rating: 4.9,
    reviews: 342,
    duration: 7,
    airline: 'Turkish Airlines',
    departures: ['ALG', 'ORN'],
    departureDates: [],
    maxSeats: 30,
    totalBookings: 42,
    totalRevenue: 7770000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    slug: 'dubai',
    name: 'Dubaï',
    country: 'Émirats Arabes Unis',
    continent: 'Moyen-Orient',
    category: 'Luxe',
    status: 'active',
    price: 320000,
    priceMax: 450000,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    imageLarge: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    gallery: [],
    description: 'Luxe et démesure à Dubaï.',
    highlights: ['Burj Khalifa', 'Safari Désert'],
    included: ['Vol', 'Hôtel 5 étoiles', 'Transfert VIP'],
    notIncluded: ['Assurance'],
    itinerary: [],
    featured: true,
    popular: true,
    rating: 4.8,
    reviews: 215,
    duration: 6,
    airline: 'Emirates',
    departures: ['ALG'],
    departureDates: [],
    maxSeats: 20,
    totalBookings: 38,
    totalRevenue: 12160000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockReservations = Array.from({ length: 60 }).map((_, i) => {
  const statusRnd = Math.random();
  const status = statusRnd < 0.3 ? 'pending' : statusRnd < 0.75 ? 'confirmed' : statusRnd < 0.9 ? 'completed' : 'cancelled';
  const dest = mockDestinations[i % mockDestinations.length];
  const client = mockClients[i];
  
  return {
    id: `RES-${i + 1}`,
    ref: `PV-2025-${String(i + 1).padStart(3, '0')}`,
    status,
    destination: {
      id: dest.id,
      name: dest.name,
      country: dest.country,
      category: dest.category,
      image: dest.image
    },
    departureDate: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
    returnDate: new Date(Date.now() + Math.random() * 10000000000 + 7 * 86400000).toISOString(),
    departureCity: 'ALG',
    adults: 2,
    children: i % 3 === 0 ? 1 : 0,
    extras: [],
    basePrice: dest.price,
    extrasTotal: 0,
    totalPrice: dest.price * 2,
    client: client,
    notes: i % 5 === 0 ? 'Client VIP' : '',
    statusHistory: [
      { status: 'pending', timestamp: new Date(Date.now() - 100000000).toISOString() }
    ],
    createdAt: new Date(Date.now() - 100000000).toISOString(),
    updatedAt: new Date(Date.now() - 50000000).toISOString(),
  };
});
