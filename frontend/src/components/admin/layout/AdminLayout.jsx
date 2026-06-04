'use client';

import { useAdminStore } from '@/store/adminStore';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { sidebarCollapsed, isAuthenticated, setAuthenticated } = useAdminStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (pathname.includes('/admin/login')) return;
      // Prevent redundant network calls on every client-side navigation if already authenticated
      if (isAuthenticated) return;
      
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include'
        });
        const data = await res.json();
        if (data.success) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          router.push('/admin/login');
        }
      } catch (e) {
        setAuthenticated(false);
        router.push('/admin/login');
      }
    };
    
    checkAuth();
  }, [pathname, router, setAuthenticated]);

  // Prevent rendering the dashboard layout if on the login page
  if (pathname.includes('/admin/login')) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[var(--color-admin-bg)] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  return (
    <div className="flex h-screen bg-[var(--color-admin-bg)] text-[var(--color-admin-text)] overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-w-0 bg-[var(--color-admin-bg)] relative">
        <AdminTopbar />
        <main className="flex-1 overflow-auto p-4 md:p-8 lg:p-12">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
