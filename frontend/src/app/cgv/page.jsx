"use client";
import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations/variants'

export default function CGV() {
  return (
    <div className="bg-[#FAF7F2] pt-40 pb-20 min-h-screen">
      <div className="container-custom max-w-4xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-[40px] p-10 md:p-16 shadow-card border border-[#c5a059]/10"
        >
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0A0A0F] mb-4">
              Conditions Générales <span className="italic text-[#c5a059]">de Vente</span>
            </h1>
            <p className="text-[#0A0A0F]/50 font-body">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          </div>

          <div className="prose prose-lg max-w-none font-body text-[#0A0A0F]/70 prose-headings:font-display prose-headings:text-[#0A0A0F] prose-a:text-[#c5a059] prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:font-semibold">
            <h2>1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre l'agence Parfait Voyages (ci-après "l'Agence") et toute personne physique ou morale (ci-après "le Client") souhaitant réserver un voyage, un séjour ou une prestation proposée par l'Agence.
            </p>

            <h2>2. Réservation et Paiement</h2>
            <p>
              Toute réservation devient ferme et définitive à compter de la réception d'un acompte de 50% du montant total du voyage, sauf stipulation contraire. Le solde devra être réglé au plus tard 30 jours avant la date de départ. Pour les réservations effectuées à moins de 30 jours du départ, le règlement intégral est exigé.
            </p>

            <h2>3. Annulation par le Client</h2>
            <p>
              Toute demande d'annulation doit être notifiée par écrit (email ou courrier recommandé). Les frais d'annulation sont applicables selon le barème suivant :
            </p>
            <ul>
              <li>Plus de 45 jours avant le départ : 10% du montant total.</li>
              <li>De 45 à 30 jours avant le départ : 30% du montant total.</li>
              <li>De 29 à 15 jours avant le départ : 50% du montant total.</li>
              <li>Moins de 15 jours avant le départ : 100% du montant total.</li>
            </ul>

            <h2>4. Modification ou Annulation par l'Agence</h2>
            <p>
              Si l'Agence se voit contrainte de modifier une partie essentielle du voyage ou de l'annuler (par exemple en cas de force majeure), le Client en sera informé dans les plus brefs délais. Il pourra alors accepter la modification proposée ou obtenir le remboursement intégral des sommes versées.
            </p>

            <h2>5. Formalités Administratives et Sanitaires</h2>
            <p>
              Il appartient au Client de s'assurer qu'il est en règle avec les formalités de police, de douane et de santé exigées pour son voyage. L'Agence ne saurait être tenue responsable si le Client se voit refuser l'embarquement ou l'accès au pays de destination faute de documents valides (passeport, visa, certificats de vaccination).
            </p>

            <h2>6. Responsabilité</h2>
            <p>
              L'Agence agit en qualité d'intermédiaire entre le Client et les différents prestataires (compagnies aériennes, hôtels, transporteurs). Sa responsabilité ne saurait être engagée en cas de défaillance d'un prestataire, de grève, d'intempéries ou de circonstances relevant de la force majeure.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
