import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "./Card";
import { cn } from "../../lib/utils";

export default function MatchCard({ match }) {
  const isLive = match.status === "LIVE";
  
  return (
    <Link to={`/matches/${match.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 dark:hover:border-blue-500/50 hover:border-blue-500 cursor-pointer h-full flex flex-col justify-between">
        <div className="flex justify-between items-center p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {match.venue || "T20 World Cup"}
          </span>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5",
            isLive ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
            match.status === "COMPLETED" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
            "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          )}>
            {isLive && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
            {match.status}
          </span>
        </div>
        
        <CardContent className="p-4 pt-5">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              {match.team1?.logo?.startsWith('http') ? (
                <img src={match.team1.logo} alt={match.team1?.code} className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-full bg-slate-100 dark:bg-slate-800 p-1" />
              ) : (
                <span className="text-2xl">{match.team1?.logo || "🏏"}</span>
              )}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{match.team1?.code || match.team1}</h4>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{match.score1}</p>
              </div>
            </div>
            <div className="text-xs font-bold text-slate-400 dark:text-slate-500">VS</div>
            <div className="flex items-center gap-3 flex-row-reverse text-right">
              {match.team2?.logo?.startsWith('http') ? (
                <img src={match.team2.logo} alt={match.team2?.code} className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-full bg-slate-100 dark:bg-slate-800 p-1" />
              ) : (
                <span className="text-2xl">{match.team2?.logo || "🏏"}</span>
              )}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{match.team2?.code || match.team2}</h4>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{match.score2}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center flex items-center justify-between">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 truncate pr-4">
              {match.result || match.toss || match.date}
            </p>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
