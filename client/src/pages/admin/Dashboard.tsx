import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Trophy, Activity, LayoutDashboard, Settings, Loader2, CheckCircle2, AlertCircle, Info, Server } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as adminService from '../../../services/adminService';

const defaultStats = [
  { id: 'users', name: 'Total Users', value: '...', icon: Users, color: 'text-blue-500' },
  { id: 'matches', name: 'Active Matches', value: '...', icon: Activity, color: 'text-green-500' },
  { id: 'teams', name: 'Teams', value: '...', icon: Shield, color: 'text-purple-500' },
  { id: 'tournaments', name: 'Tournaments', value: '...', icon: Trophy, color: 'text-yellow-500' },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminService.getDashboardData();
        if (response && response.data) {
          setStatsData(response.data);
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <Server className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const currentStats = defaultStats.map(stat => {
    if (!statsData) return stat;
    
    let newValue = stat.value;
    if (stat.id === 'users') newValue = statsData.stats.totalUsers.toLocaleString();
    if (stat.id === 'matches') newValue = statsData.stats.activeMatches.toString();
    if (stat.id === 'teams') newValue = statsData.stats.teams.toString();
    if (stat.id === 'tournaments') newValue = statsData.stats.tournaments.toString();

    return { ...stat, value: newValue };
  });

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 hidden md:block">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
          <LayoutDashboard className="text-blue-500" /> Admin Panel
        </h2>
        <nav className="space-y-2">
          {['Dashboard', 'Manage Users', 'Manage Matches', 'Manage Teams', 'Analytics', 'Settings'].map((item, idx) => (
            <button key={idx} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${idx === 0 ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
              {idx === 0 ? <LayoutDashboard size={18} /> : idx === 5 ? <Settings size={18} /> : <Shield size={18} />}
              <span className="font-medium">{item}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Overview</h1>
            <p className="text-slate-500 mt-1">Welcome back, Admin. Here is what's happening today.</p>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {currentStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-800 ${stat.color}`}>
                        <Icon size={24} />
                      </div>
                    </div>
                    <h3 className="text-slate-500 font-medium">{stat.name}</h3>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
                  </motion.div>
                )
              })}
            </div>

            {/* Charts & Logs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">User Growth & API Usage</h3>
                <div className="h-[300px] w-full">
                  {statsData?.analytics && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={statsData.analytics} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis yAxisId="left" stroke="#64748b" />
                        <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                        />
                        <Line yAxisId="left" type="monotone" dataKey="users" name="New Users" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line yAxisId="right" type="monotone" dataKey="apiCalls" name="API Calls" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </motion.div>

              {/* System Logs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
                <div className="space-y-6">
                  {statsData?.logs?.map((log: any) => (
                    <div key={log.id} className="flex gap-4">
                      <div className="mt-1">{getStatusIcon(log.status)}</div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-slate-900 dark:text-white">{log.action}</h4>
                          <span className="text-xs text-slate-500">{log.time}</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-snug">{log.detail}</p>
                      </div>
                    </div>
                  ))}
                  
                  {(!statsData?.logs || statsData.logs.length === 0) && (
                    <div className="text-center py-10 text-slate-500">No recent activity</div>
                  )}
                </div>
              </motion.div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
