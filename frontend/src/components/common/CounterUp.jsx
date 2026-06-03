"use client";
import { motion } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'

export function CounterUp({ target, suffix = '', prefix = '', label, icon: Icon, duration = 2 }) {
  const { ref, count, isInView } = useCountUp(target, duration)

  return (
    <div ref={ref} className="flex flex-col items-center text-center group">
      {Icon && (
        <motion.div
          animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-6 shadow-premium transition-all duration-300 group-hover:border-[#c5a059]/30 group-hover:bg-[#c5a059]/10"
        >
          <Icon className="w-8 h-8 text-[#c5a059]" />
        </motion.div>
      )}
      <div className="font-display text-5xl font-bold text-white tabular-nums tracking-tight">
        {prefix}{count.toLocaleString('fr-DZ')}{suffix}
      </div>
      <p className="text-[#f0ede8]/60 text-sm font-semibold uppercase tracking-wider font-body mt-3">{label}</p>
    </div>
  )
}
