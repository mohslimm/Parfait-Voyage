'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function StatCard({ title, value, trend, trendLabel, icon: Icon, colorScheme, sparklineData, prefix = '' }) {
  const isPositive = trend >= 0;
  
  // Mapping colors based on colorScheme prop
  const colors = {
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', stroke: '#3b82f6' },
    gold: { bg: 'bg-[var(--color-accent)]/10', text: 'text-[var(--color-accent)]', stroke: '#C9A96E' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-500', stroke: '#f59e0b' },
    green: { bg: 'bg-green-500/10', text: 'text-green-500', stroke: '#22c55e' }
  };

  const scheme = colors[colorScheme] || colors.blue;

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Subtle Glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity ${scheme.bg.replace('/10', '')}`} />
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[var(--color-admin-text-muted)] text-sm font-medium mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <h3 className="font-mono text-2xl font-semibold text-[var(--color-admin-text)]">
              {prefix} {value}
            </h3>
          </div>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${scheme.bg} ${scheme.text}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-center justify-between relative z-10 mt-6">
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </span>
          <span className="text-white/40 tracking-wide uppercase text-[9px]">{trendLabel}</span>
        </div>
        
        {sparklineData && sparklineData.length > 0 && (
          <div className="w-20 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData.map((val, i) => ({ value: val, index: i }))}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={scheme.stroke} 
                  strokeWidth={2} 
                  dot={false} 
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </motion.div>
  );
}
