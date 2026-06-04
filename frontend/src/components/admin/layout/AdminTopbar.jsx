'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Search, Bell, Menu, Check, LogOut, Plane } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';
import { useNotifications } from '@/hooks/useNotifications';
import { useState, useRef, useEffect } from 'react';

export function AdminTopbar() {
  const pathname = usePathname();
  const { toggleSidebar } = useAdminStore();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const handleLogout = () => {
    useAdminStore.getState().setAuthenticated(false);
    router.push('/admin/login');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Basic breadcrumb generation
  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    if (paths.length <= 1) return 'Tableau de bord';
    
    const map = {
      'reservations': 'Réservations',
      'destinations': 'Destinations',
      'clients': 'Clients',
      'analytics': 'Analytique',
      'settings': 'Paramètres',
      'new': 'Nouvelle'
    };
    
    return paths.map(p => map[p] || p).join(' / ');
  };

  return (
    <header className="h-16 shrink-0 bg-white/[0.02] backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      
      {/* Left side: Logo & Breadcrumbs */}
      <div className="flex items-center gap-4 md:gap-6">
        <button className="md:hidden p-1.5 -ml-1.5 rounded-md hover:bg-white/5" onClick={toggleSidebar}>
          <Menu className="w-5 h-5 text-white/80" />
        </button>
        
        <div className="flex items-center gap-3">
          <img 
            src="/parfait-voyage-logo-sans-cercle.png" 
            alt="Parfait Voyage" 
            className="h-8 md:h-10 w-auto object-contain brightness-0 invert opacity-90" 
          />
          <div className="hidden sm:flex items-baseline">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#c5a059]">
              Admin
            </span>
          </div>
        </div>

        <div className="hidden md:block w-px h-6 bg-white/10 mx-2"></div>
        
        <span className="text-xs font-medium text-white/40 tracking-widest uppercase hidden md:block">
          {getBreadcrumbs()}
        </span>
      </div>

      {/* Right side: Search, Notifications, Profile */}
      <div className="flex items-center gap-3 md:gap-5">
        
        <div className="relative hidden lg:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input 
            type="text" 
            placeholder="Recherche rapide..." 
            className="w-64 bg-white/[0.03] border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]/50 focus:bg-white/[0.05] transition-all"
          />
        </div>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="relative p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <Bell className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#c5a059] shadow-[0_0_8px_rgba(197,160,89,0.8)]"></span>
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-h-96 overflow-y-auto bg-[#0a0a14] border border-white/10 rounded-xl shadow-2xl z-50">
              <div className="p-4 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#0a0a14]/90 backdrop-blur">
                <span className="text-xs uppercase tracking-widest font-bold text-white/80">Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="text-[10px] text-[#c5a059] hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider">
                    <Check className="w-3 h-3" /> Tout lire
                  </button>
                )}
              </div>
              <div className="flex flex-col">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-white/40">
                    Aucune nouvelle notification
                  </div>
                ) : (
                  notifications.map(n => (
                    <button 
                      key={n._id} 
                      onClick={() => !n.read && markAsRead(n._id)}
                      className={`text-left p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors ${n.read ? 'opacity-50' : 'bg-[#c5a059]/5'}`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-semibold text-white/90">{n.title}</span>
                        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] shrink-0 mt-1" />}
                      </div>
                      <p className="text-[11px] text-white/50 mt-1.5 line-clamp-2 leading-relaxed">{n.message}</p>
                      <span className="text-[9px] text-white/30 mt-2 block tracking-wider uppercase font-mono">
                        {new Date(n.createdAt).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="h-5 w-px bg-white/10"></div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-medium text-white/90">M. Slimani</span>
            <span className="text-[9px] text-white/40 font-mono tracking-wider">Super Admin</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#14142a] to-[#0a0a14] border border-white/10 flex items-center justify-center text-white text-xs font-bold font-mono">
            MS
          </div>
          <button 
            title="Déconnexion" 
            onClick={handleLogout}
            className="p-1.5 rounded-full hover:bg-red-500/10 hover:text-red-400 text-white/40 transition-colors ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
