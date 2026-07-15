import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMatchById } from "../services/matchService";
import { Skeleton } from "../components/ui/Skeleton";
import { ArrowLeft, Activity, Trophy } from "lucide-react";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

export default function MatchDetails() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getMatchById(id);
        setMatch(res.data);
      } catch (error) {
        console.error("Failed to load match details", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="w-32 h-10 mb-6" />
        <Skeleton className="w-full h-[300px] mb-8" />
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  if (!match) {
    return <div className="text-center py-20">Match not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="mb-6">
        <Link to="/live">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to matches
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full">
            {match.venue || "International Stadium"}
          </span>
          {match.status === "LIVE" && (
            <span className="text-sm font-medium px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE
            </span>
          )}
        </div>
      </div>

      {/* Main Scorecard */}
      <Card className="mb-8 overflow-hidden glass-card">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-6 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            
            {/* Team 1 */}
            <div className="flex flex-col items-center md:items-start flex-1">
              {match.team1?.logo?.startsWith('http') ? (
                <img src={match.team1.logo} alt={match.team1?.code} className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full bg-slate-100 dark:bg-slate-800 p-2 mx-auto mb-4" />
              ) : (
                <div className="text-6xl mb-4">{match.team1?.logo || "🏏"}</div>
              )}
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{match.team1?.name || match.team1}</h2>
              <div className="text-4xl md:text-5xl font-black text-blue-200">{match.score1}</div>
            </div>
            
            {/* VS */}
            <div className="flex flex-col items-center justify-center flex-none px-8">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 shadow-xl mb-4">
                <span className="font-black text-xl italic text-white/70">VS</span>
              </div>
              {match.status === "COMPLETED" && (
                <div className="flex items-center text-yellow-400 gap-1 font-bold">
                  <Trophy className="w-5 h-5" /> Match Ended
                </div>
              )}
            </div>

            {/* Team 2 */}
            <div className="flex flex-col items-center md:items-end flex-1">
              {match.team2?.logo?.startsWith('http') ? (
                <img src={match.team2.logo} alt={match.team2?.code} className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full bg-slate-100 dark:bg-slate-800 p-2 mx-auto mb-4" />
              ) : (
                <div className="text-6xl mb-4">{match.team2?.logo || "🏏"}</div>
              )}
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{match.team2?.name || match.team2}</h2>
              <div className="text-4xl md:text-5xl font-black text-purple-200">{match.score2}</div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-white/20 text-center relative z-10">
            <p className="text-lg font-medium text-white/90">
              {match.result || match.toss || match.date}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h3 className="font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" /> Momentum & Predictor
            </h3>
          </div>
          <CardContent className="p-6">
            <div className="mb-4 flex justify-between text-sm font-medium">
              <span>{match.team1?.code || match.team1}</span>
              <span>{match.team2?.code || match.team2}</span>
            </div>
            <div className="w-full h-4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
              <div 
                className="h-full bg-blue-500 transition-all duration-1000"
                style={{ width: `${match.momentum || 50}%` }}
              />
              <div 
                className="h-full bg-purple-500 transition-all duration-1000"
                style={{ width: `${100 - (match.momentum || 50)}%` }}
              />
            </div>
            <div className="mt-4 text-center text-sm text-slate-500">
              Win Probability: {match.momentum || 50}% vs {100 - (match.momentum || 50)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h3 className="font-bold">Key Stats</h3>
          </div>
          <CardContent className="p-6">
            <ul className="space-y-4">
              <li className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Current Run Rate</span>
                <span className="font-bold">8.5</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Required Run Rate</span>
                <span className="font-bold">9.2</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Projected Score</span>
                <span className="font-bold">185</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
