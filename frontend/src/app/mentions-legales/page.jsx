"use client";
import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations/variants'

export default function MentionsLegales() {
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
              Mentions <span className="italic text-[#c5a059]">Légales</span>
            </h1>
            <p className="text-[#0A0A0F]/50 font-body">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          </div>

          <div className="prose prose-lg max-w-none font-body text-[#0A0A0F]/70 prose-headings:font-display prose-headings:text-[#0A0A0F] prose-a:text-[#c5a059] prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:font-semibold">
            <h2>1. Éditeur du Site</h2>
            <p>
              Le site <strong>Parfait Voyages</strong> est édité par l'agence Parfait Voyages, agence de tourisme et de voyages.
            </p>
            <ul>
              <li><strong>Siège social :</strong> Chéraga, Alger, Algérie</li>
              <li><strong>Numéro d'agrément ONAT :</strong> 2024-0847</li>
              <li><strong>Email :</strong> contact@parfaitvoyages.dz</li>
              <li><strong>Téléphone :</strong> +213 (0) XX XX XX XX</li>
            </ul>

            <h2>2. Hébergement</h2>
            <p>
              Ce site est hébergé par Netlify Inc.<br/>
              Adresse : 44 Montgomery Street, Suite 300, San Francisco, California 94104.<br/>
              Site web : <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">www.netlify.com</a>
            </p>

            <h2>3. Propriété Intellectuelle</h2>
            <p>
              L'ensemble du contenu présent sur ce site (textes, images, logos, vidéos, icônes) est la propriété exclusive de Parfait Voyages, sauf mention contraire. Toute reproduction, distribution, modification, ou publication de ces différents éléments est strictement interdite sans notre accord exprès par écrit.
            </p>

            <h2>4. Données Personnelles</h2>
            <p>
              Conformément à la réglementation en vigueur, Parfait Voyages s'engage à protéger la vie privée de ses utilisateurs. Les informations collectées via nos formulaires de contact et de réservation sont destinées au seul usage de l'agence pour le traitement des demandes. Pour plus d'informations, veuillez consulter notre <a href="/politique-confidentialite">Politique de Confidentialité</a>.
            </p>

            <h2>5. Limite de Responsabilité</h2>
            <p>
              Parfait Voyages s'efforce de fournir des informations aussi précises que possible sur le site. Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
