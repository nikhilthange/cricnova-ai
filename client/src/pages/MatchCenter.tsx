import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RunRateChart } from '../components/charts/RunRateChart';
import { WinProbabilityChart } from '../components/charts/WinProbabilityChart';
import { useSocket } from '../context/SocketContext';
import { Trophy, Activity, MessageSquare, Info, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import api from '../services/api';

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
  const [activeTab, setActiveTab] = useState<'scorecard' | 'graphs' | 'commentary' | 'ai-insights'>('scorecard');
  
  const [matchInfo, setMatchInfo] = useState<any>(null);
  const [scorecard, setScorecard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [infoRes, scoreRes] = await Promise.all([
          api.get(`/api/matches/info/${id}`).catch(() => ({ data: null })),
          api.get(`/api/matches/scorecard/${id}`).catch(() => ({ data: null }))
        ]);
        setMatchInfo(infoRes.data);
        setScorecard(scoreRes.data);
      } catch (error) {
        console.error("Failed to fetch match details", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const tabs = [
    { id: 'scorecard', label: 'Scorecard', icon: Trophy },
    { id: 'graphs', label: 'Match Graphs', icon: Activity },
    { id: 'commentary', label: 'Commentary', icon: MessageSquare },
    { id: 'ai-insights', label: 'AI Insights', icon: Info },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!matchInfo) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-slate-500">
        Failed to load match details. Please try again later.
      </div>
    );
  }

  // Extract data safely
  const title = matchInfo.name || "Match Info";
  const venue = matchInfo.venue || "Venue TBD";
  const status = matchInfo.status || "Match Scheduled";
  
  const team1Name = matchInfo.teamInfo?.[0]?.name || matchInfo.teams?.[0] || "Team 1";
  const team1Code = matchInfo.teamInfo?.[0]?.shortname || team1Name.substring(0,3);
  const team2Name = matchInfo.teamInfo?.[1]?.name || matchInfo.teams?.[1] || "Team 2";
  const team2Code = matchInfo.teamInfo?.[1]?.shortname || team2Name.substring(0,3);

  const score1 = matchInfo.score?.[0] ? `${matchInfo.score[0].r}/${matchInfo.score[0].w} (${matchInfo.score[0].o})` : "Yet to bat";
  const score2 = matchInfo.score?.[1] ? `${matchInfo.score[1].r}/${matchInfo.score[1].w} (${matchInfo.score[1].o})` : "";

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
          {title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">{matchInfo.matchType?.toUpperCase()} • {venue}</p>
        
        <div className="mt-8 flex gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#2563EB]">{team1Code} {score1}</h2>
          </div>
          <div className="flex-1 text-right">
            <h2 className="text-2xl font-bold text-[#22C55E]">{team2Code} {score2}</h2>
            <p className="text-sm text-slate-500 mt-1">{status}</p>
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
                "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap",
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
          
          {activeTab === 'scorecard' && (
            <motion.div
              key="scorecard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {!scorecard || !scorecard.scorecard ? (
                 <div className="glass-card p-8 rounded-2xl text-center text-slate-500 flex flex-col items-center">
                    <AlertCircle className="w-12 h-12 text-slate-400 mb-4" />
                    <p>Scorecard details are currently unavailable for this match.</p>
                 </div>
              ) : (
                scorecard.scorecard.map((inning: any, idx: number) => (
                  <div key={idx} className="glass-card p-6 rounded-2xl overflow-x-auto mb-6">
                    <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                      {inning.inning} - {inning.totals?.R}/{inning.totals?.W} ({inning.totals?.O} ov)
                    </h3>
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="py-2 text-slate-500 font-medium">Batsman</th>
                          <th className="py-2 text-slate-500 font-medium">R</th>
                          <th className="py-2 text-slate-500 font-medium">B</th>
                          <th className="py-2 text-slate-500 font-medium">4s</th>
                          <th className="py-2 text-slate-500 font-medium">6s</th>
                          <th className="py-2 text-slate-500 font-medium">SR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inning.batting?.map((batter: any, bIdx: number) => (
                          <tr key={bIdx} className="border-b border-slate-100 dark:border-slate-800/50">
                            <td className="py-3">
                              <span className="font-medium text-slate-900 dark:text-white">{batter.batsman?.name || batter.batsman}</span>
                              <div className="text-xs text-slate-500">{batter.dismissalText || 'not out'}</div>
                            </td>
                            <td className="py-3 font-medium">{batter.r}</td>
                            <td className="py-3">{batter.b}</td>
                            <td className="py-3">{batter["4s"]}</td>
                            <td className="py-3">{batter["6s"]}</td>
                            <td className="py-3">{batter.sr}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))
              )}
            </motion.div>
          )}

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
                <RunRateChart data={mockRRData} team1Name={team1Code} team2Name={team2Code} />
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Win Probability</h3>
                <WinProbabilityChart data={mockWinProbData} team1Name={team1Code} team2Name={team2Code} />
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
                  <p className="text-slate-500">Match prediction based on historical data. (Mock Data)</p>
                </div>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                  Based on current conditions, {team1Name} has a <strong className="text-green-500">72% probability</strong> of winning.
                </p>
                <div className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Key Matchups to Watch:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                    <li>Watch out for key bowlers in the middle overs.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'commentary' && (
            <motion.div
              key="commentary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-64 text-slate-500 glass-card rounded-2xl"
            >
              <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
              <p>Ball-by-ball commentary is not available in the current API tier.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
