import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import MatchCard from "../components/ui/MatchCard";
import { Skeleton } from "../components/ui/Skeleton";
import Button from "../components/ui/Button";
import { ArrowRight, Trophy, TrendingUp, Users } from "lucide-react";
import * as matchService from "../services/matchService";
import * as teamService from "../services/teamService";

import { Match, Team } from "../types";

export default function Home() {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matches = await matchService.getLiveMatches();
        setLiveMatches(matches);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#09090b] via-[#18181b] to-[#3b82f6] opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay opacity-20 z-0"></div>
        
        <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold tracking-wider mb-6 border border-blue-500/30 backdrop-blur-md">
              PREMIUM EXPERIENCE
            </span>
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              The Future of <span className="text-gradient">Cricket</span> is Here.
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed font-light">
              Experience the game like never before. Real-time scores, predictive AI insights, advanced charts, and deep player statistics all in one premium platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-premium hover-lift text-white shadow-xl shadow-purple-500/20 text-lg px-8 border-none">
                Explore Live Matches
              </Button>
              <Button variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800 text-lg px-8 hover-lift glass-panel">
                View AI Predictions
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Matches Section */}
      <section className="py-20 bg-slate-50 dark:bg-[#0F172A] transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </span>
                Trending Live Matches
              </h2>
              <p className="text-slate-500 mt-2">Real-time updates powered by Socket.io</p>
            </div>
            <Link to="/live" className="hidden sm:flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading ? (
              Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-48" />)
            ) : (
              liveMatches.slice(0, 3).map((match) => (
                <motion.div key={match._id} variants={itemVariants}>
                  <MatchCard match={match} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white dark:bg-[#020617] border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Enterprise-Grade Features</h2>
            <p className="text-slate-500">Built with modern tech for the ultimate fan experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="glass-card p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Predictive AI</h3>
              <p className="text-slate-500">Advanced ML models predicting match outcomes and player performances in real-time.</p>
            </motion.div>
            
            <motion.div whileHover={{ y: -5 }} className="glass-card p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trophy size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Deep Analytics</h3>
              <p className="text-slate-500">Interactive wagon wheels, run rate graphs, and Manhattan charts powered by Recharts.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="glass-card p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Global Community</h3>
              <p className="text-slate-500">Real-time chat, live polling, and fantasy team generation using WebSockets.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
