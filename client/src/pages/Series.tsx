import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Activity, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { Card, CardContent } from '../components/ui/Card';

export default function Series() {
  const [seriesList, setSeriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await axios.get('/api/series');
        // Sort by start date, newest first (or ongoing first)
        const sorted = (res.data || []).sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        setSeriesList(sorted);
      } catch (error) {
        console.error("Failed to fetch series:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, []);

  const getStatusColor = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now >= start && now <= end) return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    if (now < start) return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
  };

  const getStatusText = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now >= start && now <= end) return "Ongoing";
    if (now < start) return "Upcoming";
    return "Completed";
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-blue-500" />
            Cricket Series & Tournaments
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Stay updated with all ongoing and upcoming international cricket series.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seriesList.map((series, idx) => (
          <motion.div
            key={series.id || idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="h-full hover:shadow-xl hover:border-blue-500/50 transition-all duration-300">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${getStatusColor(series.startDate, series.endDate)}`}>
                  {getStatusText(series.startDate, series.endDate)}
                </span>
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {series.startDate} - {series.endDate}
                </span>
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 min-h-[56px]">
                  {series.name}
                </h3>
                
                <div className="grid grid-cols-4 gap-2 mb-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Matches</p>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{series.matches}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">T20</p>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{series.t20}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">ODI</p>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{series.odi}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Test</p>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{series.test}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-slate-400" />
                    {series.squads} Squads
                  </span>
                  {/* For future navigation to series details */}
                  <div className="text-blue-500 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                    View
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {seriesList.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 glass-card rounded-2xl">
            No series data currently available.
          </div>
        )}
      </div>
    </div>
  );
}
