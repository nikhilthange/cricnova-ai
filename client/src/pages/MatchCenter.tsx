import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RunRateChart } from '../components/charts/RunRateChart';
import { WinProbabilityChart } from '../components/charts/WinProbabilityChart';
import { useSocket } from '../context/SocketContext';
import { Trophy, Activity, MessageSquare, Info } from 'lucide-react';
import clsx from 'clsx';

// Mock Data
const mockRRData = Array.from({ length: 20 }, (_, i) => ({
  over: i + 1,
  team1RR: Math.random() * 5 + 5,
  team2RR: Math.random() * 6 + 4,
}));

const mockWinProbData = Array.from({ length: 20 }, (_, i) => {
  const prob1 = 50 + Math.sin(i) * 30 + Math.random() * 10;
  return {
    over: i + 1,
    prob1: Math.min(100, Math.max(0, prob1)),
    prob2: 100 - Math.min(100, Math.max(0, prob1))
  };
});

export default function MatchCenter() {
  const { id } = useParams();
  const { isConnected } = useSocket();
  const [activeTab, setActiveTab] = useState<'scorecard' | 'graphs' | 'commentary' | 'ai-insights'>('graphs');

  const tabs = [
    { id: 'scorecard', label: 'Scorecard', icon: Trophy },
    { id: 'graphs', label: 'Match Graphs', icon: Activity },
    { id: 'commentary', label: 'Commentary', icon: MessageSquare },
    { id: 'ai-insights', label: 'AI Insights', icon: Info },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden">
        {/* Real-time indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="text-sm text-slate-400 font-medium">Live Sync</span>
          <div className={clsx("w-3 h-3 rounded-full", isConnected ? "bg-green-500 shadow-[0_0_10px_#22C55E] animate-pulse" : "bg-red-500")} />
        </div>

        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          India vs Australia
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Final • ICC World Test Championship • The Oval</p>
        
        <div className="mt-8 flex gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#2563EB]">IND 324/4 (82.3)</h2>
            <p className="text-sm text-slate-500 mt-1">Virat Kohli 120* (210) • Jadeja 45* (60)</p>
          </div>
          <div className="flex-1 text-right">
            <h2 className="text-2xl font-bold text-[#22C55E]">AUS 469 & 270/8d</h2>
            <p className="text-sm text-slate-500 mt-1">India needs 91 runs to win</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={clsx(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                activeTab === tab.id 
                  ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/30" 
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'graphs' && (
            <motion.div
              key="graphs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Run Rate Comparison</h3>
                <RunRateChart data={mockRRData} team1Name="IND" team2Name="AUS" />
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Win Probability</h3>
                <WinProbabilityChart data={mockWinProbData} team1Name="IND" team2Name="AUS" />
              </div>
            </motion.div>
          )}

          {activeTab === 'ai-insights' && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white">
                  ✨
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">CricNova AI Analysis</h2>
                  <p className="text-slate-500">Real-time match prediction based on historical data.</p>
                </div>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                  Based on the current pitch deterioration and Kohli's exceptional control against Nathan Lyon (averaging 78.5 in similar conditions), India has a <strong className="text-green-500">72% probability</strong> of successfully chasing this target. Australia's best chance lies in the new ball due in 7 overs. 
                </p>
                <div className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Key Matchups to Watch:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                    <li><strong>Pat Cummins vs Virat Kohli:</strong> Cummins has dismissed Kohli 5 times in 9 innings.</li>
                    <li><strong>Ravindra Jadeja vs Nathan Lyon:</strong> Jadeja strikes at 85 against off-spin in the 4th innings.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {(activeTab === 'scorecard' || activeTab === 'commentary') && (
            <motion.div
              key="other"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-64 text-slate-500"
            >
              Coming Soon in Phase 4
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
