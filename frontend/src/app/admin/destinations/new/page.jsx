'use client';

import { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';
import { destinationSchema } from '@/lib/validators';

export default function DestinationForm() {
  const router = useRouter();
  const { createDestination } = useAdminStore();
  const [activeTab, setActiveTab] = useState('general');

  const { register, control, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      status: 'draft',
      itinerary: [{ day: 1, title: '', activities: '' }]
    }
  });

  const imageUrl = watch('image');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('image', reader.result, { shouldValidate: true });
        toast.success('Image chargée avec succès (Base64)');
      };
      reader.readAsDataURL(file);
    }
  };

  const { fields: itineraryFields, append: appendItinerary, remove: removeItinerary } = useFieldArray({
    control,
    name: "itinerary"
  });

  const onSubmit = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      createDestination({
        ...data,
        rating: 0,
        reviews: 0,
        totalBookings: 0
      });
      toast.success('Destination créée avec succès');
      router.push('/admin/destinations');
    } catch (error) {
      toast.error('Erreur lors de la création');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/destinations" className="p-2 bg-[var(--color-admin-surface)] border border-[var(--color-admin-border)] rounded-lg hover:bg-[var(--color-admin-surface-2)] transition-colors text-[var(--color-admin-text)]">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-admin-text)]">Nouvelle Destination</h1>
          <p className="text-sm text-[var(--color-admin-text-muted)] mt-1">Création d'un nouveau produit de voyage.</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={() => router.push('/admin/destinations')} className="px-4 py-2 border border-[var(--color-admin-border-2)] text-[var(--color-admin-text)] font-medium rounded-lg text-sm hover:bg-[var(--color-admin-surface-2)] transition-colors">
            Annuler
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)] text-black font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : <Save className="w-4 h-4" />}
            Enregistrer
          </button>
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
          Le formulaire contient des erreurs. Veuillez vérifier les différents onglets.
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 mt-4">
        {/* Navigation Tabs */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1">
          {[
            { id: 'general', label: 'Général' },
            { id: 'media', label: 'Médias' },
            { id: 'content', label: 'Contenu' },
            { id: 'itinerary', label: 'Itinéraire' },
            { id: 'pricing', label: 'Tarification' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                activeTab === tab.id 
                  ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20' 
                  : 'text-[var(--color-admin-text-muted)] hover:bg-[var(--color-admin-surface-3)] hover:text-[var(--color-admin-text)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[var(--color-admin-surface)] border border-[var(--color-admin-border)] rounded-xl p-6 md:p-8 shadow-card min-h-[500px]">
          
          {/* TAB: GENERAL */}
          <div className={activeTab === 'general' ? 'block' : 'hidden'}>
            <h2 className="text-lg font-semibold text-[var(--color-admin-text)] mb-6">Général</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-[var(--color-admin-text-muted)]">Nom de la destination</label>
                <input 
                  {...register('name')}
                  className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" 
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[var(--color-admin-text-muted)]">Pays / Région</label>
                <input 
                  {...register('country')}
                  className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" 
                />
                {errors.country && <p className="text-red-500 text-xs">{errors.country.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[var(--color-admin-text-muted)]">Catégorie</label>
                <select 
                  {...register('category')}
                  className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none"
                >
                  <option value="">Sélectionnez...</option>
                  <option value="Luxe">Luxe</option>
                  <option value="Aventure">Aventure</option>
                  <option value="Culturel">Culturel</option>
                </select>
                {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[var(--color-admin-text-muted)]">Statut initial</label>
                <select 
                  {...register('status')}
                  className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none"
                >
                  <option value="draft">Brouillon</option>
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
            </div>
          </div>

          {/* TAB: MEDIA */}
          <div className={activeTab === 'media' ? 'block' : 'hidden'}>
            <h2 className="text-lg font-semibold text-[var(--color-admin-text)] mb-6">Médias & Images</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-[var(--color-admin-text-muted)]">Image Principale (URL ou Fichier)</label>
                <div className="flex gap-4">
                  <input 
                    {...register('image')}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" 
                  />
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button type="button" className="px-4 py-2 bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg text-sm text-[var(--color-admin-text)] hover:bg-[var(--color-admin-surface-3)]">
                      Parcourir...
                    </button>
                  </div>
                </div>
                {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
              </div>
              
              {/* Preview */}
              {imageUrl ? (
                <div className="w-full h-64 border border-[var(--color-admin-border-2)] rounded-xl overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt="Prévisualisation" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-md">Aperçu</div>
                </div>
              ) : (
                <div className="w-full h-64 border-2 border-dashed border-[var(--color-admin-border-2)] rounded-xl flex flex-col items-center justify-center text-[var(--color-admin-text-muted)] bg-[var(--color-admin-surface-2)]">
                  <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                  <p className="text-sm">Aucune image sélectionnée</p>
                  <p className="text-xs opacity-50 mt-1">Collez une URL Unsplash ou choisissez un fichier</p>
                </div>
              )}
            </div>
          </div>

          {/* TAB: CONTENT */}
          <div className={activeTab === 'content' ? 'block' : 'hidden'}>
            <h2 className="text-lg font-semibold text-[var(--color-admin-text)] mb-6">Contenu</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-[var(--color-admin-text-muted)]">Description Détaillée</label>
                <textarea 
                  rows="6"
                  {...register('description')}
                  className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none"
                />
                {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
              </div>
            </div>
          </div>

          {/* TAB: ITINERARY */}
          <div className={activeTab === 'itinerary' ? 'block' : 'hidden'}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[var(--color-admin-text)]">Itinéraire</h2>
              <button 
                type="button"
                onClick={() => appendItinerary({ day: itineraryFields.length + 1, title: '', activities: '' })}
                className="flex items-center gap-2 px-3 py-1.5 bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded text-sm text-[var(--color-admin-text)] hover:bg-[var(--color-admin-surface-3)]"
              >
                <Plus className="w-4 h-4" /> Ajouter un jour
              </button>
            </div>
            
            <div className="space-y-6">
              {itineraryFields.map((field, index) => (
                <div key={field.id} className="p-4 bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-xl relative">
                  <button 
                    type="button" 
                    onClick={() => removeItinerary(index)}
                    className="absolute top-4 right-4 text-red-500 hover:bg-red-500/10 p-1.5 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-[var(--color-admin-text-muted)]">Jour</label>
                      <input 
                        type="number"
                        {...register(`itinerary.${index}.day`, { valueAsNumber: true })}
                        className="w-full bg-[var(--color-admin-bg)] border border-[var(--color-admin-border-2)] rounded-lg py-1.5 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-3">
                      <label className="text-xs text-[var(--color-admin-text-muted)]">Titre de l'étape</label>
                      <input 
                        {...register(`itinerary.${index}.title`)}
                        placeholder="Ex: Arrivée à l'aéroport"
                        className="w-full bg-[var(--color-admin-bg)] border border-[var(--color-admin-border-2)] rounded-lg py-1.5 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" 
                      />
                      {errors.itinerary?.[index]?.title && <p className="text-red-500 text-xs">{errors.itinerary[index].title.message}</p>}
                    </div>
                    <div className="space-y-2 md:col-span-4">
                      <label className="text-xs text-[var(--color-admin-text-muted)]">Activités (Description)</label>
                      <textarea 
                        rows="2"
                        {...register(`itinerary.${index}.activities`)}
                        className="w-full bg-[var(--color-admin-bg)] border border-[var(--color-admin-border-2)] rounded-lg py-1.5 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" 
                      />
                    </div>
                  </div>
                </div>
              ))}
              {errors.itinerary && <p className="text-red-500 text-xs">{errors.itinerary.message}</p>}
            </div>
          </div>

          {/* TAB: PRICING */}
          <div className={activeTab === 'pricing' ? 'block' : 'hidden'}>
            <h2 className="text-lg font-semibold text-[var(--color-admin-text)] mb-6">Tarification & Détails</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-[var(--color-admin-text-muted)]">Prix à partir de (DA)</label>
                <input 
                  type="number"
                  placeholder="Ex: 150000"
                  {...register('price', { valueAsNumber: true })}
                  className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" 
                />
                {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[var(--color-admin-text-muted)]">Durée (Jours)</label>
                <input 
                  type="number"
                  placeholder="Ex: 7"
                  {...register('duration', { valueAsNumber: true })}
                  className="w-full bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg py-2 px-3 text-[var(--color-admin-text)] focus:border-[var(--color-accent)] focus:outline-none" 
                />
                {errors.duration && <p className="text-red-500 text-xs">{errors.duration.message}</p>}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </form>
  );
}
