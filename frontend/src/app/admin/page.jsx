'use client';
import Link from 'next/link';

import { useAdminStore } from '@/store/adminStore';
import { StatCard } from '@/components/admin/ui/StatCard';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { 
  CalendarCheck, DollarSign, Clock, Users, 
  MapPin, RefreshCw, CheckCircle, ArrowRight 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { monthlyRevenue } from '@/data/adminMockData';
import { motion } from 'framer-motion';

// Recharts Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f0f20]/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl">
        <p className="text-white/60 text-[10px] uppercase tracking-widest mb-2 font-semibold">{label}</p>
        <p className="text-[#c5a059] font-mono text-lg font-bold">
          {new Intl.NumberFormat('fr-DZ').format(payload[0].value)} DA
        </p>
      </div>
    );
  }
  return null;
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function AdminDashboard() {
  const { reservations, clients, destinations } = useAdminStore();

  // Basic KPI computations
  const pendingReservations = reservations.filter(r => r.status === 'pending');
  
  // Recent 5 reservations
  const recentReservations = [...reservations]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Category distribution for Pie Chart
  const categoryCounts = destinations.reduce((acc, dest) => {
    acc[dest.category] = (acc[dest.category] || 0) + 1;
    return acc;
  }, {});
  
  const pieData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
  const COLORS = ['#c5a059', '#14142a', '#e8c77a', '#22c55e', '#3b82f6'];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8 pb-16"
    >
      {/* Editorial Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-6">
        <div className="max-w-2xl">
          <p className="text-[#c5a059] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Parfait Voyages</p>
          <h1 className="font-display text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
            Vue d'<span className="italic text-[#e8c77a]">Ensemble</span>
          </h1>
          <p className="text-white/40 text-sm mt-3 font-light leading-relaxed">
            Votre centre de commandement. Surveillez vos revenus, gérez vos voyageurs et analysez vos performances en temps réel.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/destinations/new" className="group relative overflow-hidden flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c5a059] to-[#D4B57A] text-[#1A1200] font-bold text-xs uppercase tracking-widest rounded-full transition-transform hover:scale-105">
            <span className="relative z-10">Créer un voyage</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Réservations du jour" 
          value={12} 
          trend={8.3} 
          trendLabel="vs hier" 
          icon={CalendarCheck} 
          colorScheme="blue" 
          sparklineData={[5, 8, 12, 7, 10, 15, 12]}
        />
        <StatCard 
          title="Revenus mensuels" 
          value="4 820 000" 
          prefix="DA"
          trend={23.1} 
          trendLabel="vs mois dernier" 
          icon={DollarSign} 
          colorScheme="gold" 
          sparklineData={[20, 25, 30, 28, 35, 45, 48]}
        />
        <StatCard 
          title="Dossiers en attente" 
          value={pendingReservations.length} 
          trend={-12} 
          trendLabel="traitement rapide" 
          icon={Clock} 
          colorScheme="amber" 
          sparklineData={[15, 12, 10, 14, 11, 9, 8]}
        />
        <StatCard 
          title="Base Clients" 
          value={clients.length} 
          trend={14.2} 
          trendLabel="vs an dernier" 
          icon={Users} 
          colorScheme="green" 
          sparklineData={[180, 185, 188, 192, 195, 198, 200]}
        />
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-display text-xl text-white">Performances <span className="italic text-white/50">Financières</span></h3>
            <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold">6 Derniers Mois</span>
          </div>
          
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c5a059" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#c5a059" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(197, 160, 89, 0.2)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="revenue" stroke="#c5a059" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-sm flex flex-col">
          <h3 className="font-display text-xl text-white mb-6">Répartition par <span className="italic text-white/50">Thème</span></h3>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f0f20', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#c5a059', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-light font-display text-white">{destinations.length}</span>
              <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Total</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Reservations Table */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h3 className="font-display text-xl text-white">Dernières <span className="italic text-white/50">Réservations</span></h3>
            <button className="text-[10px] uppercase tracking-widest font-bold text-[#c5a059] hover:text-white transition-colors flex items-center gap-1">
              Voir l'historique <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-[10px] uppercase tracking-widest text-white/30 bg-black/20">
                <tr>
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Destination</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Montant</th>
                  <th className="px-6 py-4 font-semibold">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#14142a] to-[#0a0a14] flex items-center justify-center text-white/70 text-xs font-mono font-bold border border-white/5">
                          {res.client.firstName.charAt(0)}{res.client.lastName.charAt(0)}
                        </div>
                        <span className="font-medium text-white/90 group-hover:text-[#c5a059] transition-colors">{res.client.firstName} {res.client.lastName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/60">{res.destination.name}</td>
                    <td className="px-6 py-4 text-white/40 text-xs">{new Date(res.departureDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}</td>
                    <td className="px-6 py-4 font-mono font-medium text-white/80">{new Intl.NumberFormat('fr-DZ').format(res.totalPrice)} DA</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={res.status} variant="dot" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="font-display text-xl text-white mb-6">Fil d'<span className="italic text-white/50">Activité</span></h3>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            
            {/* Timeline Item 1 */}
            <div className="relative flex items-start gap-4 z-10">
              <div className="w-10 h-10 rounded-full bg-[#0a0a14] border-2 border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                <CalendarCheck className="w-4 h-4 text-[#c5a059]" />
              </div>
              <div className="flex-1 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                <p className="text-sm font-medium text-white/90">Nouvelle demande</p>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">Yasmine Benali souhaite réserver le circuit Safari Kenya.</p>
                <span className="inline-block mt-3 text-[9px] uppercase tracking-widest text-[#c5a059] font-bold">Il y a 12 min</span>
              </div>
            </div>
            
            {/* Timeline Item 2 */}
            <div className="relative flex items-start gap-4 z-10">
              <div className="w-10 h-10 rounded-full bg-[#0a0a14] border-2 border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                <CheckCircle className="w-4 h-4 text-green-500/80" />
              </div>
              <div className="flex-1 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                <p className="text-sm font-medium text-white/90">Dossier confirmé</p>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">Le paiement de la réservation #PV-2024-089 a été validé.</p>
                <span className="inline-block mt-3 text-[9px] uppercase tracking-widest text-green-500/80 font-bold">Il y a 1 heure</span>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex items-start gap-4 z-10">
              <div className="w-10 h-10 rounded-full bg-[#0a0a14] border-2 border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                <Users className="w-4 h-4 text-blue-400/80" />
              </div>
              <div className="flex-1 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                <p className="text-sm font-medium text-white/90">Nouveau profil</p>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">Moussa Djaber a complété son profil passager.</p>
                <span className="inline-block mt-3 text-[9px] uppercase tracking-widest text-blue-400/80 font-bold">Il y a 3 heures</span>
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}
