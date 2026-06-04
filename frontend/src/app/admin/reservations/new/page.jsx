'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MapPin, Users, CreditCard, ChevronRight, ChevronLeft, 
  Search, CheckCircle, Plus, Trash2, ShieldCheck
} from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';
import { toast } from 'sonner';

// Animations
const fadeVariant = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

const steps = [
  { id: 1, title: 'Client', icon: User },
  { id: 2, title: 'Voyage', icon: MapPin },
  { id: 3, title: 'Passagers', icon: Users },
  { id: 4, title: 'Paiement', icon: CreditCard }
];

export default function NewReservationAdmin() {
  const router = useRouter();
  const { clients, destinations, createReservation, createClient } = useAdminStore();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Step 1: Client State ---
  const [clientSearch, setClientSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [isNewClient, setIsNewClient] = useState(false);

  const filteredClients = useMemo(() => {
    if (!clientSearch) return [];
    const lower = clientSearch.toLowerCase();
    return clients.filter(c => 
      c.firstName.toLowerCase().includes(lower) || 
      c.lastName.toLowerCase().includes(lower) || 
      c.email.toLowerCase().includes(lower) ||
      c.phone?.includes(lower)
    ).slice(0, 5);
  }, [clientSearch, clients]);

  // --- Step 2: Trip State ---
  const [selectedDestId, setSelectedDestId] = useState(null);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const selectedDest = destinations.find(d => d.id === selectedDestId);

  // --- Step 3: Passengers State ---
  // Default to empty array, will populate based on adults+children
  const [passengers, setPassengers] = useState([]);

  // Initialize passengers when moving to Step 3
  const handleProceedToPassengers = () => {
    const total = adults + children;
    if (passengers.length !== total) {
      const newPass = Array(total).fill(null).map((_, i) => ({
        id: i,
        type: i < adults ? 'adulte' : 'enfant',
        firstName: i === 0 && selectedClient ? selectedClient.firstName : '',
        lastName: i === 0 && selectedClient ? selectedClient.lastName : '',
        dob: '',
        passportNumber: '',
        passportExpiry: '',
        nationality: 'Algérienne',
        dietaryNotes: ''
      }));
      setPassengers(newPass);
    }
    setCurrentStep(3);
  };

  const updatePassenger = (index, field, value) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  // --- Step 4: Payment State ---
  const basePrice = selectedDest ? selectedDest.price : 0;
  const totalPrice = basePrice * (adults + (children * 0.5)); // Simple calc for demo
  const [deposit, setDeposit] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Especes');

  // --- Submission ---
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // 1. Handle Client Creation if needed
    let finalClientId = selectedClient?.id;
    let finalClient = selectedClient;
    
    if (isNewClient) {
      finalClientId = `CLI-${Date.now()}`;
      finalClient = { ...newClient, id: finalClientId, totalReservations: 1, totalSpent: totalPrice };
      createClient(finalClient);
    }

    // 2. Format passengers data
    const passengerData = passengers.map(p => ({
      ...p,
      isPrimary: p.id === 0
    }));

    // 3. Create Reservation
    const ref = `RES-ADM-${Math.floor(1000 + Math.random() * 9000)}`;
    const reservationData = {
      ref,
      client: finalClient,
      destination: { name: selectedDest.name, image: selectedDest.image || '' },
      departureDate,
      returnDate,
      travelers: adults + children,
      totalPrice,
      depositPaid: deposit,
      paymentMethod,
      passengers: passengerData,
      status: deposit >= totalPrice ? 'confirmé' : 'pending',
      source: 'admin_dashboard'
    };

    try {
      createReservation(reservationData);
      toast.success('Réservation créée avec succès !');
      router.push('/admin/reservations');
    } catch (err) {
      toast.error('Erreur lors de la création');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-16 max-w-5xl mx-auto">
      
      {/* Header & Stepper */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-display text-3xl font-light text-white tracking-tight">
            Nouvelle <span className="italic text-[#c5a059]">Réservation</span>
          </h1>
          <p className="text-sm text-white/40 mt-1">Saisie assistée (Smart Agent) pour les dossiers complexes.</p>
        </div>
        
        <div className="flex items-center justify-between relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-px before:bg-white/10 before:w-full before:-z-10">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isPassed = currentStep > step.id;
            return (
              <div key={step.id} className="flex flex-col items-center gap-2 bg-[#060610] px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isActive ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#c5a059]' : 
                  isPassed ? 'bg-[#c5a059] border-[#c5a059] text-[#1A1200]' : 
                  'bg-[#0f0f20] border-white/10 text-white/30'
                }`}>
                  {isPassed ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-bold ${
                  isActive || isPassed ? 'text-white' : 'text-white/30'
                }`}>{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm min-h-[400px]">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: CLIENT */}
          {currentStep === 1 && (
            <motion.div key="step1" variants={fadeVariant} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-display text-white">Informations du Client</h2>
                <button 
                  onClick={() => setIsNewClient(!isNewClient)}
                  className="text-xs text-[#c5a059] hover:text-white uppercase tracking-wider font-bold transition-colors"
                >
                  {isNewClient ? 'Rechercher un client existant' : '+ Créer un nouveau client'}
                </button>
              </div>

              {!isNewClient ? (
                <div className="space-y-4 max-w-xl">
                  <label className="text-xs text-white/50 uppercase tracking-wider">Recherche (Nom, Email, Tél)</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input 
                      type="text" 
                      value={clientSearch}
                      onChange={(e) => { setClientSearch(e.target.value); setSelectedClient(null); }}
                      placeholder="Ex: Ahmed Benali..."
                      className="w-full bg-[#0a0a14] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>
                  
                  {filteredClients.length > 0 && !selectedClient && (
                    <div className="bg-[#0a0a14] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                      {filteredClients.map(c => (
                        <button 
                          key={c.id} 
                          onClick={() => { setSelectedClient(c); setClientSearch(`${c.firstName} ${c.lastName}`); }}
                          className="w-full text-left p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors flex justify-between items-center"
                        >
                          <div>
                            <p className="text-white font-medium">{c.firstName} {c.lastName}</p>
                            <p className="text-xs text-white/40">{c.email} • {c.phone}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-white/20" />
                        </button>
                      ))}
                    </div>
                  )}

                  {selectedClient && (
                    <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-green-500 font-medium">Client sélectionné</p>
                        <p className="text-xs text-green-500/70">{selectedClient.firstName} {selectedClient.lastName} - {selectedClient.email}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                  <div className="space-y-1">
                    <label className="text-xs text-white/50 uppercase tracking-wider">Prénom *</label>
                    <input type="text" value={newClient.firstName} onChange={e => setNewClient({...newClient, firstName: e.target.value})} className="w-full bg-[#0a0a14] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#c5a059]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-white/50 uppercase tracking-wider">Nom *</label>
                    <input type="text" value={newClient.lastName} onChange={e => setNewClient({...newClient, lastName: e.target.value})} className="w-full bg-[#0a0a14] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#c5a059]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-white/50 uppercase tracking-wider">Email</label>
                    <input type="email" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} className="w-full bg-[#0a0a14] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#c5a059]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-white/50 uppercase tracking-wider">Téléphone *</label>
                    <input type="tel" value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})} className="w-full bg-[#0a0a14] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#c5a059]" />
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 2: TRIP */}
          {currentStep === 2 && (
            <motion.div key="step2" variants={fadeVariant} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-8">
              <h2 className="text-xl font-display text-white mb-2">Configuration du Voyage</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                <div className="space-y-2">
                  <label className="text-xs text-white/50 uppercase tracking-wider">Destination</label>
                  <select 
                    value={selectedDestId || ''} 
                    onChange={e => setSelectedDestId(Number(e.target.value))}
                    className="w-full bg-[#0a0a14] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#c5a059] appearance-none"
                  >
                    <option value="" disabled>Sélectionner un circuit...</option>
                    {destinations.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({new Intl.NumberFormat('fr-DZ').format(d.price)} DA)</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-white/50 uppercase tracking-wider">Départ</label>
                    <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} className="w-full bg-[#0a0a14] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#c5a059]" style={{colorScheme: 'dark'}}/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/50 uppercase tracking-wider">Retour</label>
                    <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} className="w-full bg-[#0a0a14] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#c5a059]" style={{colorScheme: 'dark'}}/>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-white/50 uppercase tracking-wider">Adultes</label>
                    <input type="number" min="1" value={adults} onChange={e => setAdults(Number(e.target.value))} className="w-full bg-[#0a0a14] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#c5a059]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/50 uppercase tracking-wider">Enfants (2-12 ans)</label>
                    <input type="number" min="0" value={children} onChange={e => setChildren(Number(e.target.value))} className="w-full bg-[#0a0a14] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#c5a059]" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PASSENGERS */}
          {currentStep === 3 && (
            <motion.div key="step3" variants={fadeVariant} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-6">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-xl font-display text-white">Détails des Passagers</h2>
                  <p className="text-xs text-white/40 mt-1">Requis pour l'intégration B2B (Amadeus, Compagnies Aériennes)</p>
                </div>
                <div className="bg-[#c5a059]/10 px-3 py-1.5 rounded-full border border-[#c5a059]/20 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                  <span className="text-[10px] text-[#c5a059] font-bold uppercase tracking-widest">Données Sécurisées</span>
                </div>
              </div>

              <div className="space-y-8">
                {passengers.map((p, idx) => (
                  <div key={idx} className="bg-[#0a0a14] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#c5a059]"></div>
                    <h3 className="font-bold text-white mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
                      Passager {idx + 1} <span className="px-2 py-0.5 rounded-full bg-white/10 text-[9px]">{p.type}</span>
                      {idx === 0 && <span className="px-2 py-0.5 rounded-full bg-[#c5a059]/20 text-[#c5a059] text-[9px]">Titulaire</span>}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest">Prénom (sur passeport)</label>
                        <input type="text" value={p.firstName} onChange={e => updatePassenger(idx, 'firstName', e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-[#c5a059]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest">Nom (sur passeport)</label>
                        <input type="text" value={p.lastName} onChange={e => updatePassenger(idx, 'lastName', e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-[#c5a059]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest">Date de naissance</label>
                        <input type="date" value={p.dob} onChange={e => updatePassenger(idx, 'dob', e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-[#c5a059]" style={{colorScheme: 'dark'}}/>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest">N° Passeport</label>
                        <input type="text" value={p.passportNumber} onChange={e => updatePassenger(idx, 'passportNumber', e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#c5a059]" placeholder="Ex: 19AA12345"/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest">Expiration Passeport</label>
                        <input type="date" value={p.passportExpiry} onChange={e => updatePassenger(idx, 'passportExpiry', e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-[#c5a059]" style={{colorScheme: 'dark'}}/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest">Nationalité</label>
                        <input type="text" value={p.nationality} onChange={e => updatePassenger(idx, 'nationality', e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-[#c5a059]" />
                      </div>

                      <div className="space-y-1 md:col-span-3">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest">Allergies / Demandes spéciales</label>
                        <input type="text" value={p.dietaryNotes} onChange={e => updatePassenger(idx, 'dietaryNotes', e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-[#c5a059]" placeholder="Ex: Végétarien, assistance chaise roulante..."/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: PAYMENT */}
          {currentStep === 4 && (
            <motion.div key="step4" variants={fadeVariant} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-6">
              <h2 className="text-xl font-display text-white mb-2">Paiement & Finalisation</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Summary Card */}
                <div className="bg-[#0a0a14] border border-white/5 rounded-2xl p-6 h-fit">
                  <h3 className="text-xs uppercase tracking-widest text-[#c5a059] font-bold mb-4">Récapitulatif</h3>
                  
                  <div className="space-y-3 text-sm text-white/80 border-b border-white/10 pb-4 mb-4">
                    <div className="flex justify-between">
                      <span className="text-white/40">Destination</span>
                      <span className="font-semibold text-white">{selectedDest?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Passagers</span>
                      <span>{adults} Adulte(s), {children} Enfant(s)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Dates</span>
                      <span>{departureDate} au {returnDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Client Titulaire</span>
                      <span>{selectedClient ? `${selectedClient.firstName} ${selectedClient.lastName}` : newClient.firstName}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="text-sm text-white/50">Total TTC</span>
                    <span className="font-mono text-2xl text-white font-bold">{new Intl.NumberFormat('fr-DZ').format(totalPrice)} DA</span>
                  </div>
                </div>

                {/* Payment Form */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs text-white/50 uppercase tracking-wider">Acompte versé (DA)</label>
                    <input 
                      type="number" 
                      min="0"
                      max={totalPrice}
                      value={deposit} 
                      onChange={e => setDeposit(Number(e.target.value))}
                      className="w-full bg-[#0a0a14] border border-white/10 rounded-xl py-3 px-4 text-white font-mono text-xl focus:outline-none focus:border-[#c5a059]" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-white/50 uppercase tracking-wider">Méthode de paiement</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Especes', 'Virement Bancaire', 'Carte CIB', 'Chèque'].map(m => (
                        <button
                          key={m}
                          onClick={() => setPaymentMethod(m)}
                          className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border ${
                            paymentMethod === m 
                              ? 'bg-[#c5a059] border-[#c5a059] text-[#1A1200]' 
                              : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {deposit > 0 && deposit < totalPrice && (
                    <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                      <p className="text-orange-500 text-sm font-medium">Reste à payer : {new Intl.NumberFormat('fr-DZ').format(totalPrice - deposit)} DA</p>
                      <p className="text-orange-500/60 text-xs mt-1">Le dossier sera marqué "En attente".</p>
                    </div>
                  )}
                  {deposit >= totalPrice && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-green-500 text-sm font-medium">Dossier soldé</p>
                        <p className="text-green-500/60 text-xs mt-1">Le dossier sera marqué "Confirmé".</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <button 
          onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : router.push('/admin/reservations')}
          className="px-6 py-2.5 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-xs uppercase tracking-widest font-bold flex items-center gap-2"
        >
          {currentStep === 1 ? 'Annuler' : <><ChevronLeft className="w-4 h-4" /> Précédent</>}
        </button>

        {currentStep < 4 ? (
          <button 
            onClick={() => {
              if (currentStep === 1 && !selectedClient && !isNewClient) return toast.error('Sélectionnez un client');
              if (currentStep === 1 && isNewClient && (!newClient.firstName || !newClient.lastName || !newClient.phone)) return toast.error('Remplissez les champs obligatoires');
              if (currentStep === 2 && !selectedDestId) return toast.error('Sélectionnez une destination');
              if (currentStep === 2 && (!departureDate || !returnDate)) return toast.error('Sélectionnez les dates');
              
              if (currentStep === 2) handleProceedToPassengers();
              else setCurrentStep(currentStep + 1);
            }}
            className="px-8 py-2.5 bg-white text-black hover:bg-gray-200 transition-colors rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2"
          >
            Suivant <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-2.5 bg-gradient-to-r from-[#c5a059] to-[#D4B57A] text-[#1A1200] hover:opacity-90 transition-opacity rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Validation...' : 'Créer le Dossier'} <CheckCircle className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}
