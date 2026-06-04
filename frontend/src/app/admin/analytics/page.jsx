'use client';

import { useAdminStore } from '@/store/adminStore';
import { StatCard } from '@/components/admin/ui/StatCard';
import { 
  TrendingUp, TrendingDown, DollarSign, CalendarCheck, 
  Percent, Users, Download
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { monthlyRevenue, mockDestinations } from '@/data/adminMockData';
import { useState } from 'react';

// Recharts Custom Tooltip
const CustomTooltip = ({ active, payload, label, suffix = '' }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--color-admin-surface-3)] border border-[var(--color-admin-border-2)] p-3 rounded-lg shadow-xl">
        <p className="text-[var(--color-admin-text)] text-sm font-semibold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-mono" style={{ color: entry.color }}>
            {entry.name}: {new Intl.NumberFormat('fr-DZ').format(entry.value)} {suffix}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminAnalytics() {
  const [activePeriod, setActivePeriod] = useState('6m');
  
  // Data for Charts
  const topDestinations = [...mockDestinations].sort((a, b) => b.totalBookings - a.totalBookings).slice(0, 5);
  const pieData = topDestinations.map(d => ({ name: d.name, value: d.totalBookings }));
  const COLORS = ['#C9A96E', '#0b3b8f', '#22c55e', '#f59e0b', '#14b8a6'];

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-admin-text)]">Analytique</h1>
          <p className="text-sm text-[var(--color-admin-text-muted)] mt-1">Performances financières et commerciales.</p>
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="flex gap-1 bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] rounded-lg p-1">
            {['7j', '30j', '3m', '6m', '12m'].map(period => (
              <button 
                key={period} 
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${activePeriod === period ? 'bg-[var(--color-accent)] text-black' : 'text-[var(--color-admin-text-muted)] hover:text-[var(--color-admin-text)]'}`}
                onClick={() => setActivePeriod(period)}
              >
                {period}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-[var(--color-admin-surface-2)] border border-[var(--color-admin-border-2)] text-[var(--color-admin-text)] rounded-lg text-sm hover:bg-[var(--color-admin-surface-3)] transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Revenus Période" value="22 520 000" prefix="DA" trend={18.2} trendLabel="vs précédente" icon={DollarSign} colorScheme="gold" />
        <StatCard title="Réservations" value="160" trend={12.5} trendLabel="vs précédente" icon={CalendarCheck} colorScheme="blue" />
        <StatCard title="Panier Moyen" value="140 750" prefix="DA" trend={5.4} trendLabel="vs précédente" icon={TrendingUp} colorScheme="green" />
        <StatCard title="Taux d'Annulation" value="4.2" prefix="%" trend={-1.2} trendLabel="vs précédente" icon={Percent} colorScheme="amber" />
      </div>

      {/* Main Chart */}
      <div className="bg-[var(--color-admin-surface)] border border-[var(--color-admin-border)] rounded-xl p-5 shadow-card">
        <h3 className="font-semibold text-[var(--color-admin-text)] mb-6">Comparatif Revenus vs Objectifs</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="var(--color-admin-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="var(--color-admin-text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
              <Tooltip content={<CustomTooltip suffix="DA" />} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', color: 'var(--color-admin-text-muted)' }}/>
              <Area yAxisId="left" type="monotone" dataKey="revenue" name="Revenus Réels" stroke="var(--color-accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              <Area yAxisId="left" type="monotone" dataKey="objectif" name="Objectif" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--color-admin-surface)] border border-[var(--color-admin-border)] rounded-xl p-5 shadow-card flex flex-col">
          <h3 className="font-semibold text-[var(--color-admin-text)] mb-6">Réservations par Destination (Top 5)</h3>
          <div className="h-[300px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={topDestinations} margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="var(--color-admin-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip suffix=" résas" />} cursor={{ fill: 'var(--color-admin-surface-3)' }} />
                <Bar dataKey="totalBookings" name="Réservations" fill="var(--color-primary)" radius={[0, 4, 4, 0]}>
                  {topDestinations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--color-accent)' : 'var(--color-primary)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--color-admin-surface)] border border-[var(--color-admin-border)] rounded-xl p-5 shadow-card flex flex-col">
          <h3 className="font-semibold text-[var(--color-admin-text)] mb-6">Tops Destinations (Volume)</h3>
          <div className="h-[300px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-admin-surface-3)', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px', color: 'var(--color-admin-text-muted)' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
