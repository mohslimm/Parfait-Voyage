'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAdminStore } from '@/store/adminStore';
import { 
  Plane, PanelLeftClose, LayoutDashboard, 
  CalendarCheck, MapPin, Users, BarChart3, 
  Settings, LogOut 
} from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, reservations } = useAdminStore();
  
  const pendingCount = reservations.filter(r => r.status === 'pending').length;

  const NAV_LINKS = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin', end: true },
    { icon: CalendarCheck, label: 'Réservations', path: '/admin/reservations', badge: pendingCount },
    { icon: MapPin, label: 'Destinations', path: '/admin/destinations' },
    { icon: Users, label: 'Clients', path: '/admin/clients' },
    { icon: BarChart3, label: 'Analytique', path: '/admin/analytics' },
    { icon: Settings, label: 'Paramètres', path: '/admin/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-[#060610]/80 backdrop-blur-sm z-[40] md:hidden transition-opacity duration-300 ${
          sidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        onClick={toggleSidebar}
      />

      <aside
        className={`fixed md:relative top-0 left-0 h-full flex flex-col bg-[var(--color-admin-surface)] border-r border-[var(--color-admin-border)] z-[50] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          sidebarCollapsed 
            ? '-translate-x-full md:translate-x-0 w-[240px] md:w-[64px]' 
            : 'translate-x-0 w-[240px]'
        }`}
      >
        <div className="h-6 shrink-0"></div>

        <nav className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto overflow-x-hidden min-w-[240px]">
          {NAV_LINKS.map((link) => {
            const isActive = link.end ? pathname === link.path : pathname.startsWith(link.path);
            const Icon = link.icon;
            
            return (
              <Link 
                key={link.path} 
                href={link.path}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    toggleSidebar();
                  }
                }}
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors relative ${
                  isActive 
                    ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent-light)]' 
                    : 'text-[var(--color-admin-text-muted)] hover:bg-white/5 hover:text-[var(--color-admin-text)]'
                }`}
              >
                {isActive && (
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--color-accent)] rounded-r-full"
                  />
                )}
                <Icon className="w-5 h-5 shrink-0" />
                <span 
                  className={`text-sm font-medium whitespace-nowrap flex-1 transition-opacity duration-300 ${
                    sidebarCollapsed ? 'opacity-100 md:opacity-0' : 'opacity-100'
                  }`}
                >
                  {link.label}
                </span>
                {(!sidebarCollapsed || (sidebarCollapsed && typeof window !== 'undefined' && window.innerWidth < 768)) && link.badge > 0 && (
                  <span className="bg-[var(--color-status-pending)] text-[var(--color-admin-bg)] text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 mr-4 md:mr-0">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--color-admin-border)] shrink-0 min-w-[240px] hidden md:block">
          <button 
            onClick={toggleSidebar}
            className="flex items-center gap-3 px-4 py-2 w-full text-left text-[var(--color-admin-text-muted)] hover:text-white transition-colors"
          >
            <PanelLeftClose className={`w-5 h-5 shrink-0 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>
              Réduire
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
