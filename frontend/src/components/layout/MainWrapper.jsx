'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SplashScreen } from '@/components/ui/SplashScreen';

export function MainWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const [isLoading, setIsLoading] = useState(true);

  // Pour éviter l'hydratation mismatch, et s'assurer que ça ne tourne que côté client
  useEffect(() => {
    if (isAdmin) {
      setIsLoading(false);
    }
  }, [isAdmin]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && !isAdmin && (
          <SplashScreen key="splash" finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      <main className={isAdmin ? "" : "pt-20 md:pt-24"}>
        {children}
      </main>
    </>
  );
}
