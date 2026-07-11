import { useState, useEffect } from "react";
import { getLiveMatches } from "../services/matchService";
import MatchCard from "../components/ui/MatchCard";
import { Skeleton } from "../components/ui/Skeleton";
import { Activity } from "lucide-react";

export default function LiveScores() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const liveRes = await getLiveMatches();
        setMatches(liveRes.data || []);
      } catch (error) {
        console.error("Failed to load live matches", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
    
    // Poll every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
          <Activity className="text-red-500 w-8 h-8 animate-pulse" /> Live Scores
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Real-time updates from ongoing matches around the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-[200px]" />)
        ) : matches.length > 0 ? (
          matches.map(match => <MatchCard key={match.id} match={match} />)
        ) : (
          <div className="col-span-full p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <Activity className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Live Matches</h3>
            <p className="text-slate-500 dark:text-slate-400">There are no ongoing matches at the moment. Please check the schedule for upcoming games.</p>
          </div>
        )}
      </div>
    </div>
  );
}
