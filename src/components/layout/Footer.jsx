import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const footerLinks = {
  Destinations: [
    { label: 'Istanbul',    path: '/destinations/1' },
    { label: 'Dubaï',       path: '/destinations/2' },
    { label: 'Paris',       path: '/destinations/3' },
    { label: 'Maldives',   path: '/destinations/4' },
    { label: 'Barcelone',  path: '/destinations/6' },
  ],
  Services: [
    { label: 'Voyages sur mesure', path: '/destinations' },
    { label: 'Lune de miel',       path: '/destinations?cat=Romantique' },
    { label: 'Voyages d\'affaires', path: '/destinations' },
    { label: 'Groupes & Familles', path: '/destinations' },
    { label: 'Excursions locales', path: '/destinations' },
  ],
  Agence: [
    { label: 'À propos',    path: '/' },
    { label: 'Contact',     path: '/' },
    { label: 'Blog voyage', path: '/' },
    { label: 'FAQ',         path: '/' },
    { label: 'Partenaires', path: '/' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#0A0A0F] text-white border-t border-white/5">
      {/* 1. Improved Flag Stripe */}
      <div className="h-1.5 flex w-full">
        <div className="h-full flex-1 bg-[#006233]" />
        <div className="h-full flex-1 bg-white" />
        <div className="h-full flex-1 bg-[#D21034]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 2. Better Grid Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#006233] to-[#004d27] flex items-center justify-center shadow-lg shadow-emerald-900/20">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-white text-xl tracking-tight">Parfait</span>
                <span className="font-display text-[#C9A96E] text-[10px] tracking-[0.3em] uppercase font-medium">Voyages</span>
              </div>
            </Link>
            
            <p className="text-white/60 text-sm leading-relaxed max-w-sm font-body">
              Agence de voyage algérienne haut de gamme. Nous créons des expériences inoubliables depuis Alger, Oran, Constantine et Annaba.
            </p>

            <div className="pt-2">
              <span className="text-[#C9A96E] text-xl font-arabic block mb-1">رحلات مثالية</span>
              <p className="text-white/30 text-[10px] uppercase tracking-widest font-body">Agrément ONAT N° 2024-0847</p>
            </div>

            <div className="flex items-center gap-3">
              {['facebook', 'instagram', 'whatsapp', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#006233]/20 hover:border-[#006233] transition-all duration-300"
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-1">
              <h3 className="font-bold text-white text-xs uppercase tracking-[0.2em] mb-6 font-body opacity-90">
                {title}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-white/40 hover:text-[#C9A96E] text-sm font-body transition-colors duration-200 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 3. Newsletter Section - Centered and Refined */}
        <div className="mt-20 pt-12 border-t border-white/5">
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-2xl font-semibold text-white mb-2">
                Rejoignez le club Parfait
              </h3>
              <p className="text-white/50 text-sm font-body max-w-md">
                Recevez nos itinéraires secrets et offres exclusives directement dans votre boîte mail.
              </p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#006233]/50 focus:border-[#006233] transition-all w-full sm:w-80 font-body"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-[#006233] hover:bg-[#007a3f] text-white rounded-2xl text-sm font-semibold transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/20 text-[11px] font-body">
            © {new Date().getFullYear()} PARFAIT VOYAGES. TOUS DROITS RÉSERVÉS. ALGER, ALGÉRIE.
          </p>
          <div className="flex items-center gap-8">
            {['Confidentialité', 'CGV', 'Mentions'].map((item) => (
              <a key={item} href="#" className="text-white/20 hover:text-white/60 text-[11px] font-body transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ name }) {
  const icons = {
    facebook:  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
    whatsapp:  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>,
    linkedin:  <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white/50">
      {icons[name]}
    </svg>
  )
}