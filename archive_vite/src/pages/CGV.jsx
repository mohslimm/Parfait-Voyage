import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CGV() {
  return (
    <div className="pt-24 pb-16 bg-[#FAF7F2] min-h-screen">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm"
        >
          <h1 className="font-display text-4xl font-bold text-[#0A0A0F] mb-6">Conditions Générales de Vente</h1>
          <div className="prose prose-stone max-w-none">
            <p className="text-[#0A0A0F]/70 font-body">
              En cours de rédaction. Veuillez consulter notre agence pour plus de détails.
            </p>
          </div>
          <div className="mt-8">
            <Link to="/" className="text-primary hover:underline font-medium">Retour à l'accueil</Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
