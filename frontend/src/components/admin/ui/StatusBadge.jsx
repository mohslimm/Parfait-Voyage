'use client';

import { Clock, CheckCircle, XCircle, Archive, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_CONFIG = {
  pending:   { label: 'En attente', color: 'text-amber-500', bg: 'bg-amber-500/15', border: 'border-amber-500/20', icon: Clock },
  confirmed: { label: 'Confirmée',  color: 'text-green-500', bg: 'bg-green-500/15', border: 'border-green-500/20', icon: CheckCircle },
  cancelled: { label: 'Annulée',    color: 'text-red-500',   bg: 'bg-red-500/15',   border: 'border-red-500/20',   icon: XCircle },
  completed: { label: 'Terminée',   color: 'text-slate-400', bg: 'bg-slate-500/15', border: 'border-slate-500/20', icon: Archive },
};

export function StatusBadge({ status, variant = 'pill', interactive = false, onStatusChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = config.icon;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Define valid transitions
  const validTransitions = {
    pending: ['confirmed', 'cancelled'],
    confirmed: ['completed', 'cancelled'],
    cancelled: [],
    completed: []
  };

  const handleSelect = (newStatus) => {
    if (onStatusChange) onStatusChange(newStatus);
    setIsOpen(false);
  };

  const allowedStatuses = validTransitions[status] || [];

  const BadgeContent = () => {
    if (variant === 'dot') {
      return (
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${config.bg.replace('/15', '')} border border-[var(--color-admin-bg)]`}></span>
          <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
        </div>
      );
    }
    
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${config.bg} ${config.border} ${config.color} text-[11px] font-semibold tracking-wide uppercase`}>
        <Icon className="w-3 h-3" />
        {config.label}
        {interactive && allowedStatuses.length > 0 && <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />}
      </div>
    );
  };

  if (!interactive || allowedStatuses.length === 0) {
    return <BadgeContent />;
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none hover:opacity-80 transition-opacity">
        <BadgeContent />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full mt-1 left-0 z-50 w-36 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl overflow-hidden py-1"
          >
            {allowedStatuses.map(s => {
              const opt = STATUS_CONFIG[s];
              const OptIcon = opt.icon;
              return (
                <button
                  key={s}
                  onClick={() => handleSelect(s)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors text-left"
                >
                  <OptIcon className={`w-3.5 h-3.5 ${opt.color}`} />
                  {opt.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
