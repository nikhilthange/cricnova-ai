import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Trophy, Activity, LayoutDashboard, Settings } from 'lucide-react';

const stats = [
  { name: 'Total Users', value: '12,450', icon: Users, color: 'text-blue-500' },
  { name: 'Active Matches', value: '4', icon: Activity, color: 'text-green-500' },
  { name: 'Teams', value: '32', icon: Shield, color: 'text-purple-500' },
  { name: 'Tournaments', value: '8', icon: Trophy, color: 'text-yellow-500' },
];

export default function AdminDashboard() {
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
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, Admin.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 rounded-2xl"
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

        <div className="glass-card p-6 rounded-2xl min-h-[400px] flex items-center justify-center text-slate-500">
          Analytics & System Logs will appear here in Phase 5.
        </div>
      </div>
    </div>
  );
}
