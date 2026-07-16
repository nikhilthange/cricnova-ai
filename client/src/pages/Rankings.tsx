import { useState } from "react";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "../lib/utils";

const mockRankings = {
  teams: {
    tests: [
      { rank: 1, team: "Australia", flag: "https://flagcdn.com/au.svg", rating: 124, points: 3715, trend: "up" },
      { rank: 2, team: "India", flag: "https://flagcdn.com/in.svg", rating: 120, points: 3434, trend: "same" },
      { rank: 3, team: "England", flag: "https://flagcdn.com/gb-eng.svg", rating: 105, points: 3798, trend: "down" },
      { rank: 4, team: "South Africa", flag: "https://flagcdn.com/za.svg", rating: 103, points: 2894, trend: "up" },
      { rank: 5, team: "New Zealand", flag: "https://flagcdn.com/nz.svg", rating: 96, points: 2595, trend: "down" }
    ],
    odis: [
      { rank: 1, team: "India", flag: "https://flagcdn.com/in.svg", rating: 121, points: 5313, trend: "same" },
      { rank: 2, team: "Australia", flag: "https://flagcdn.com/au.svg", rating: 118, points: 4125, trend: "up" },
      { rank: 3, team: "South Africa", flag: "https://flagcdn.com/za.svg", rating: 110, points: 3848, trend: "same" },
      { rank: 4, team: "Pakistan", flag: "https://flagcdn.com/pk.svg", rating: 106, points: 3179, trend: "down" },
      { rank: 5, team: "New Zealand", flag: "https://flagcdn.com/nz.svg", rating: 102, points: 3574, trend: "same" }
    ]
  },
  players: {
    batting: [
      { rank: 1, name: "Babar Azam", country: "PAK", rating: 824, trend: "same" },
      { rank: 2, name: "Shubman Gill", country: "IND", rating: 801, trend: "up" },
      { rank: 3, name: "Virat Kohli", country: "IND", rating: 768, trend: "same" },
      { rank: 4, name: "Harry Tector", country: "IRE", rating: 746, trend: "up" },
      { rank: 5, name: "Daryl Mitchell", country: "NZ", rating: 728, trend: "down" }
    ],
    bowling: [
      { rank: 1, name: "Keshav Maharaj", country: "SA", rating: 716, trend: "up" },
      { rank: 2, name: "Josh Hazlewood", country: "AUS", rating: 688, trend: "down" },
      { rank: 3, name: "Adam Zampa", country: "AUS", rating: 686, trend: "same" },
      { rank: 4, name: "Mohammed Siraj", country: "IND", rating: 678, trend: "same" },
      { rank: 5, name: "Jasprit Bumrah", country: "IND", rating: 665, trend: "up" }
    ]
  }
};

export default function Rankings() {
  const [format, setFormat] = useState<"tests" | "odis">("tests");
  const [category, setCategory] = useState<"teams" | "batting" | "bowling">("teams");

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            ICC Rankings
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Official Men's Cricket Ratings</p>
        </div>
        
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button 
            onClick={() => setFormat("tests")}
            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", format === "tests" ? "bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white")}
          >
            TEST
          </button>
          <button 
            onClick={() => setFormat("odis")}
            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", format === "odis" ? "bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white")}
          >
            ODI
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto custom-scrollbar">
        {["teams", "batting", "bowling"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat as any)}
            className={cn(
              "pb-4 text-sm font-semibold capitalize whitespace-nowrap transition-all border-b-2",
              category === cat 
                ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400" 
                : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold text-center w-16">Pos</th>
                <th className="p-4 font-semibold">{category === "teams" ? "Team" : "Player"}</th>
                <th className="p-4 font-semibold text-right">Rating</th>
                {category === "teams" && <th className="p-4 font-semibold text-right hidden sm:table-cell">Points</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {category === "teams" 
                ? mockRankings.teams[format].map((item) => (
                  <tr key={item.team} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="p-4 text-center font-bold text-slate-700 dark:text-slate-300">
                      <div className="flex items-center justify-center gap-2">
                        {item.rank}
                        {item.trend === "up" && <TrendingUp className="w-3 h-3 text-green-500" />}
                        {item.trend === "down" && <TrendingDown className="w-3 h-3 text-red-500" />}
                        {item.trend === "same" && <Minus className="w-3 h-3 text-slate-300" />}
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                      <img src={item.flag} alt={item.team} className="w-8 h-6 rounded shadow-sm object-cover" />
                      {item.team}
                    </td>
                    <td className="p-4 text-right font-bold text-blue-600 dark:text-blue-400">{item.rating}</td>
                    <td className="p-4 text-right text-slate-500 hidden sm:table-cell">{item.points}</td>
                  </tr>
                ))
                : mockRankings.players[category as "batting" | "bowling"].map((item) => (
                  <tr key={item.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="p-4 text-center font-bold text-slate-700 dark:text-slate-300">
                      <div className="flex items-center justify-center gap-2">
                        {item.rank}
                        {item.trend === "up" && <TrendingUp className="w-3 h-3 text-green-500" />}
                        {item.trend === "down" && <TrendingDown className="w-3 h-3 text-red-500" />}
                        {item.trend === "same" && <Minus className="w-3 h-3 text-slate-300" />}
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        {item.name}
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">{item.country}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right font-bold text-blue-600 dark:text-blue-400">{item.rating}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
