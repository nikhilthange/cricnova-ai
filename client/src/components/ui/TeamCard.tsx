import { useState } from "react";
import { useStore } from "../../store/useStore";
import { Card, CardContent } from "./Card";
import Button from "./Button";
import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

export default function TeamCard({ team }: { team: any }) {
  const { favoriteTeams, toggleFavoriteTeam } = useStore();
  const isFavorite = favoriteTeams.find((t: any) => t._id === team._id);

  const toggleFavorite = (e: any) => {
    e.preventDefault();
    toggleFavoriteTeam(team);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className={cn("h-20 relative", team.colorClass || "bg-gradient-to-r from-blue-600 to-indigo-700")}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full"
          onClick={toggleFavorite}
        >
          <Star className={cn("h-5 w-5", isFavorite ? "fill-yellow-400 text-yellow-400" : "")} />
        </Button>
      </div>
      <CardContent className="pt-12 pb-6 relative text-center">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl shadow-sm">
          {team.logo || "🏏"}
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{team.name}</h3>
        <p className="text-sm font-medium text-slate-500 mb-4">{team.code}</p>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs text-slate-500">Ranking</div>
            <div className="font-semibold text-slate-900 dark:text-white">#{team.ranking || "-"}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Win Rate</div>
            <div className="font-semibold text-slate-900 dark:text-white">{team.winRate || "-"}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
