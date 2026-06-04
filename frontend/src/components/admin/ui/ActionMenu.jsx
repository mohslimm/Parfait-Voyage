'use client';

import { MoreHorizontal } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ActionMenu({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (onClick) => {
    setIsOpen(false);
    if (onClick) onClick();
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-1.5 rounded-md text-[var(--color-admin-text-muted)] hover:text-[var(--color-admin-text)] hover:bg-[var(--color-admin-surface-3)] transition-colors focus:outline-none"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 mt-1 w-48 rounded-lg shadow-xl bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] overflow-hidden z-50 py-1"
          >
            {items.map((item, index) => {
              if (item.separator) {
                return <div key={`sep-${index}`} className="h-px bg-[var(--color-admin-border-2)] my-1"></div>;
              }

              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleAction(item.onClick)}
                  disabled={item.disabled}
                  className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors
                    ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[var(--color-admin-surface-3)]'}
                    ${item.destructive ? 'text-red-500 hover:text-red-400' : 'text-[var(--color-admin-text)]'}
                  `}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold bg-[var(--color-admin-bg)] px-1.5 py-0.5 rounded text-[var(--color-admin-text-muted)]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
