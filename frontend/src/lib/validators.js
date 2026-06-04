import * as z from 'zod';

export const destinationSchema = z.object({
  // Tab 1: Général
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  country: z.string().min(2, 'Pays requis'),
  category: z.string().min(1, 'Catégorie requise'),
  status: z.enum(['active', 'inactive', 'draft']).default('draft'),
  
  // Tab 2: Médias
  image: z.string().url('URL d\'image principale invalide'),
  gallery: z.array(z.string().url('URL invalide')).optional(),

  // Tab 3: Contenu
  description: z.string().min(20, 'Description détaillée requise (min 20 char)'),
  highlights: z.array(z.string().min(3, 'Point fort trop court')).optional(),

  // Tab 4: Itinéraire
  itinerary: z.array(z.object({
    day: z.number().min(1),
    title: z.string().min(2, 'Titre requis'),
    activities: z.string().min(5, 'Description requise')
  })).min(1, 'Au moins un jour est requis'),

  // Tab 5: Tarification
  price: z.number().min(1000, 'Prix minimum de 1000 DA'),
  duration: z.number().min(1, 'Durée invalide (minimum 1 jour)'),
  included: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional()
});
