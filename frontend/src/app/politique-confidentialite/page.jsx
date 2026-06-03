"use client";
import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations/variants'

export default function PolitiqueConfidentialite() {
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
              Politique de <span className="italic text-[#c5a059]">Confidentialité</span>
            </h1>
            <p className="text-[#0A0A0F]/50 font-body">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          </div>

          <div className="prose prose-lg max-w-none font-body text-[#0A0A0F]/70 prose-headings:font-display prose-headings:text-[#0A0A0F] prose-a:text-[#c5a059] prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:font-semibold">
            <h2>1. Collecte des Données Personnelles</h2>
            <p>
              Dans le cadre de son activité d'agence de voyage, Parfait Voyages est amenée à collecter des données personnelles (nom, prénom, adresse, email, numéro de téléphone, numéro de passeport, etc.) nécessaires à l'organisation de vos séjours et à la gestion de vos réservations.
            </p>

            <h2>2. Utilisation des Données</h2>
            <p>
              Les données personnelles que nous collectons sont utilisées dans les buts suivants :
            </p>
            <ul>
              <li>Gestion et confirmation de vos réservations de voyage.</li>
              <li>Communication avec vous concernant votre séjour.</li>
              <li>Envoi d'offres promotionnelles et newsletters (uniquement si vous y avez consenti).</li>
              <li>Amélioration de notre service client et personnalisation de votre expérience.</li>
            </ul>

            <h2>3. Partage des Données</h2>
            <p>
              Pour assurer le bon déroulement de votre voyage, certaines de vos données peuvent être transmises à nos prestataires partenaires (compagnies aériennes, hôtels, agences locales). Nous nous assurons que ces partenaires respectent également la confidentialité de vos informations. Nous ne vendrons ni ne louerons jamais vos données à des tiers à des fins commerciales.
            </p>

            <h2>4. Sécurité des Données</h2>
            <p>
              Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées afin de garantir un niveau de sécurité adapté au risque, et de protéger vos données contre toute perte, accès non autorisé ou altération.
            </p>

            <h2>5. Vos Droits</h2>
            <p>
              Vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition concernant vos données personnelles. Vous pouvez exercer ce droit à tout moment en nous contactant directement à l'adresse <strong>contact@parfaitvoyages.dz</strong>.
            </p>

            <h2>6. Cookies</h2>
            <p>
              Notre site web utilise des cookies pour améliorer la navigation, mémoriser vos préférences et réaliser des statistiques d'audience. Vous avez la possibilité de désactiver les cookies depuis les paramètres de votre navigateur.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
