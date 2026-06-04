'use client';

import { usePathname } from 'next/navigation';

export function MainWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  
  return <main className={isAdmin ? "" : "pt-20 md:pt-24"}>{children}</main>;
}
