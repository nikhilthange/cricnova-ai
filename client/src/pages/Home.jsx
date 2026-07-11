import { useState, useEffect } from "react";
import { getAllMatches, getLiveMatches } from "../services/matchService";
import { getAllPlayers } from "../services/playerService";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Activity, CalendarDays } from "lucide-react";
import Button from "../components/ui/Button";
import MatchCard from "../components/ui/MatchCard";
import { Skeleton } from "../components/ui/Skeleton";

export default function Home() {
  const [data, setData] = useState({ matches: [], live: [], players: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [matchesRes, liveRes, playersRes] = await Promise.all([
          getAllMatches(),
          getLiveMatches(),
          getAllPlayers(),
        ]);
        
        setData({
          matches: matchesRes.data || [],
          live: liveRes.data || [],
          players: playersRes.data || [],
        });
      } catch (error) {
        console.error("Failed to load home data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const recentMatches = data.matches.filter(m => m.status === "COMPLETED").slice(0, 3);
  const upcomingMatches = data.matches.filter(m => m.status === "UPCOMING").slice(0, 3);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            AI-Powered Analytics
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Cricket</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Experience cricket like never before with real-time stats, AI-driven predictions, and immersive live scores.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/live">
              <Button size="lg" className="w-full sm:w-auto rounded-full bg-blue-600 hover:bg-blue-700 text-white border-0">
                View Live Scores <Activity className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/players">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                Player Rankings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 space-y-20">
        
        {/* Live Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <Activity className="text-red-500" /> Live Now
            </h2>
            <Link to="/live" className="text-blue-600 hover:text-blue-700 font-medium flex items-center text-sm">
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-[200px]" />)
            ) : data.live.length > 0 ? (
              data.live.map(match => <MatchCard key={match.id} match={match} />)
            ) : (
              <div className="col-span-full p-8 text-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400">No live matches at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Recent Results */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <Trophy className="text-yellow-500" /> Recent Results
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-[200px]" />)
            ) : recentMatches.length > 0 ? (
              recentMatches.map(match => <MatchCard key={match.id} match={match} />)
            ) : (
              <p className="text-slate-500">No recent results.</p>
            )}
          </div>
        </section>

        {/* Upcoming Matches */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <CalendarDays className="text-blue-500" /> Upcoming Matches
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-[200px]" />)
            ) : upcomingMatches.length > 0 ? (
              upcomingMatches.map(match => <MatchCard key={match.id} match={match} />)
            ) : (
              <p className="text-slate-500">No upcoming matches.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
